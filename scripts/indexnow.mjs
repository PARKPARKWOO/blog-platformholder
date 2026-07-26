#!/usr/bin/env node
/**
 * IndexNow 제출 스크립트.
 *
 * sitemap 의 URL 목록을 읽어 https://api.indexnow.org/indexnow 로 통보한다.
 * IndexNow 참여 엔진(Bing·Yandex·Seznam·Naver 등)에 한 번에 전파된다.
 * Google 은 IndexNow 에 참여하지 않으므로 Google 대응은 기존 sitemap + lastmod 경로를
 * 그대로 유지한다. 이 스크립트는 sitemap 을 대체하지 않고 보조한다.
 *
 * 사용법:
 *   npm run indexnow -- --dry-run          # 최근 7일 변경분, 제출 없이 목록만 출력
 *   npm run indexnow                        # 최근 7일 변경분 제출
 *   npm run indexnow -- --since=30d         # 최근 30일 변경분 제출
 *   npm run indexnow -- --all --dry-run     # 전량(227건) 미리보기
 *   npm run indexnow -- --all               # 전량 제출 (최초 1회 또는 대규모 개편 시에만)
 *
 * 원칙:
 *   - 색인 대상만 보낸다. /llms.txt, /llms-full.txt, raw 라우트는 sitemap 에서
 *     의도적으로 뺐고 여기서도 한 번 더 거른다.
 *   - 같은 URL 을 의미 없이 반복 제출하지 않는다. 기본 모드는 변경분(lastmod 기준)이다.
 *   - 실패해도 배포를 깨뜨리지 않는다. 항상 exit 0 이고 에러는 로그로만 남긴다.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "blog.platformholder.site";
const SITE = `https://${HOST}`;

/**
 * IndexNow 키. 비밀값이 아니다 — 도메인 소유 증명용이라 공개가 전제이고,
 * 같은 값이 public/{키}.txt 로 호스팅된다. 값을 바꾸려면 키 파일도 함께 바꿔야 한다.
 */
const KEY = (process.env.INDEXNOW_KEY || "8f3c1d5a7b9e40628ad14c6f2be7d093").trim();

const ENDPOINT = "https://api.indexnow.org/indexnow";
/** 규격상 한 요청당 최대 10,000 URL */
const MAX_URLS_PER_REQUEST = 10000;
const DEFAULT_SINCE = "7d";
const REQUEST_TIMEOUT_MS = 20000;

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const KEY_FILE = path.join(ROOT, "public", `${KEY}.txt`);
/** next build 가 prerender 한 sitemap 본문 (네트워크 없이 읽을 수 있는 1순위 소스) */
const BUILD_SITEMAP = path.join(ROOT, ".next", "server", "app", "sitemap.xml.body");
const LIVE_SITEMAP = `${SITE}/sitemap.xml`;

/**
 * 색인 대상이 아닌 경로. sitemap 에는 애초에 없지만, sitemap 이 바뀌어도
 * 원문·피드·이미지 라우트가 새어 나가지 않도록 방어적으로 한 번 더 거른다.
 */
const NON_INDEXABLE = [
  /\/raw\/?$/,
  /\/llms(-full)?\.txt$/,
  /\/feed\.xml$/,
  /^\/(og|api|r)\//,
];

const log = (...args) => console.log("[indexnow]", ...args);
const warn = (...args) => console.warn("[indexnow]", ...args);

function usage() {
  console.log(`
사용법: node scripts/indexnow.mjs [옵션]

  --dry-run          제출하지 않고 대상 URL 만 출력한다
  --all              sitemap 의 모든 URL 을 제출한다 (기본은 변경분만)
  --since=<7d|48h>   변경분 판정 기준 기간 (기본 ${DEFAULT_SINCE}). lastmod 가 이 기간 안이면 변경분
  --sitemap=<경로|URL> sitemap 소스 지정 (기본: .next 빌드 산출물 → 없으면 라이브 sitemap)
  --verbose          대상 URL 을 전부 출력한다
  --help             이 도움말
`);
}

function parseArgs(argv) {
  const opts = {
    all: false,
    dryRun: false,
    since: DEFAULT_SINCE,
    sitemap: null,
    verbose: false,
    help: false,
  };
  for (const arg of argv) {
    if (arg === "--all") opts.all = true;
    else if (arg === "--dry-run") opts.dryRun = true;
    else if (arg === "--verbose") opts.verbose = true;
    else if (arg === "--help" || arg === "-h") opts.help = true;
    else if (arg.startsWith("--since=")) opts.since = arg.slice("--since=".length);
    else if (arg.startsWith("--sitemap=")) opts.sitemap = arg.slice("--sitemap=".length);
    else warn(`알 수 없는 옵션 무시: ${arg}`);
  }
  return opts;
}

/** `7d` / `48h` / `90m` → ms. 해석 실패 시 null */
function parseSince(value) {
  const m = /^(\d+)([dhm])$/.exec(String(value).trim());
  if (!m) return null;
  const n = Number(m[1]);
  const unit = { d: 86400000, h: 3600000, m: 60000 }[m[2]];
  return n * unit;
}

async function readSitemap(source) {
  if (source) {
    if (/^https?:\/\//.test(source)) return fetchSitemap(source);
    const text = await fs.readFile(path.resolve(ROOT, source), "utf8");
    return { text, from: source };
  }
  try {
    const text = await fs.readFile(BUILD_SITEMAP, "utf8");
    return { text, from: path.relative(ROOT, BUILD_SITEMAP) };
  } catch {
    log(`빌드 산출물 없음 (${path.relative(ROOT, BUILD_SITEMAP)}) — 라이브 sitemap 을 받는다`);
    return fetchSitemap(LIVE_SITEMAP);
  }
}

async function fetchSitemap(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`sitemap 응답 ${res.status} ${res.statusText} (${url})`);
  return { text: await res.text(), from: url };
}

function decodeXml(value) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

/**
 * <url> 블록에서 loc/lastmod 만 뽑는다. alternates(xhtml:link) 는 <loc> 가 아니므로
 * 자연히 제외되고, 제출 대상은 정규 URL 하나로 유지된다.
 */
function parseSitemap(xml) {
  const entries = [];
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = /<loc>([\s\S]*?)<\/loc>/.exec(block);
    if (!loc) continue;
    const lastmod = /<lastmod>([\s\S]*?)<\/lastmod>/.exec(block);
    entries.push({
      url: decodeXml(loc[1]).trim(),
      lastmod: lastmod ? decodeXml(lastmod[1]).trim() : undefined,
    });
  }
  return entries;
}

/**
 * 호스트·색인 가능 여부 검사 + 정규화.
 * sitemap 은 한글 태그 경로를 그대로 담고 있어서 WHATWG URL 로 퍼센트 인코딩까지 맞춘다.
 */
function normalize(entries) {
  const seen = new Set();
  const kept = [];
  const dropped = [];
  for (const entry of entries) {
    let parsed;
    try {
      parsed = new URL(entry.url);
    } catch {
      dropped.push({ url: entry.url, reason: "URL 파싱 실패" });
      continue;
    }
    if (parsed.host !== HOST) {
      dropped.push({ url: entry.url, reason: `호스트 불일치 (${parsed.host})` });
      continue;
    }
    if (NON_INDEXABLE.some((re) => re.test(parsed.pathname))) {
      dropped.push({ url: entry.url, reason: "색인 대상 아님" });
      continue;
    }
    if (seen.has(parsed.href)) continue;
    seen.add(parsed.href);
    kept.push({ url: parsed.href, lastmod: entry.lastmod });
  }
  return { kept, dropped };
}

/** lastmod 가 cutoff 이후인 것만. lastmod 가 없으면 변경분으로 보지 않는다 */
function selectChanged(entries, cutoff) {
  const changed = [];
  let undated = 0;
  for (const entry of entries) {
    if (!entry.lastmod) {
      undated += 1;
      continue;
    }
    const ts = Date.parse(entry.lastmod);
    if (Number.isNaN(ts)) {
      undated += 1;
      continue;
    }
    if (ts >= cutoff) changed.push(entry);
  }
  return { changed, undated };
}

function chunk(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

async function verifyKeyFile() {
  try {
    const body = await fs.readFile(KEY_FILE, "utf8");
    if (body.trim() !== KEY) {
      warn(`키 파일 본문이 키와 다르다: ${path.relative(ROOT, KEY_FILE)}`);
      return false;
    }
    return true;
  } catch {
    warn(`키 파일이 없다: ${path.relative(ROOT, KEY_FILE)} — 검증에 실패한다`);
    return false;
  }
}

/** 성공 여부만 돌려주고 절대 throw 하지 않는다 */
async function submit(urlList) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  };
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    // 200 = 수락, 202 = 키 검증 대기. 4xx 는 재시도해도 결과가 같으니 로그만 남긴다.
    if (res.status === 200 || res.status === 202) {
      log(`OK ${res.status} — ${urlList.length}건 제출${res.status === 202 ? " (키 검증 대기)" : ""}`);
      return true;
    }
    const hint =
      {
        400: "요청 형식 오류",
        403: "키가 유효하지 않다 (키 파일이 라이브에서 200 으로 서빙되는지 확인)",
        404: "keyLocation 에서 키 파일을 찾지 못했다",
        422: "URL 이 host 와 맞지 않거나 키가 일치하지 않는다",
        429: "요청이 너무 잦다 (스팸으로 간주됨)",
      }[res.status] || "예상치 못한 응답";
    const body = (await res.text().catch(() => "")).slice(0, 500);
    warn(`실패 ${res.status} — ${hint}${body ? ` / 응답: ${body}` : ""}`);
    return false;
  } catch (err) {
    warn(`요청 실패 — ${err instanceof Error ? err.message : String(err)}`);
    return false;
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    usage();
    return;
  }

  if (!/^[0-9a-fA-F]{8,128}$/.test(KEY)) {
    warn("키 형식이 잘못됐다 (16진수 8~128자여야 한다). 중단한다");
    return;
  }

  const keyFileOk = await verifyKeyFile();

  let sitemap;
  try {
    sitemap = await readSitemap(opts.sitemap);
  } catch (err) {
    warn(`sitemap 을 읽지 못했다 — ${err instanceof Error ? err.message : String(err)}`);
    return;
  }

  const parsed = parseSitemap(sitemap.text);
  if (parsed.length === 0) {
    warn(`sitemap 에서 URL 을 찾지 못했다 (${sitemap.from})`);
    return;
  }
  const { kept, dropped } = normalize(parsed);
  log(`sitemap: ${sitemap.from} — URL ${parsed.length}건, 제출 후보 ${kept.length}건`);
  if (dropped.length > 0) {
    log(`제외 ${dropped.length}건: ${dropped.slice(0, 5).map((d) => `${d.url} (${d.reason})`).join(", ")}`);
  }

  let targets;
  if (opts.all) {
    targets = kept;
    log(`모드: --all — 전량 ${targets.length}건`);
  } else {
    const sinceMs = parseSince(opts.since);
    if (sinceMs === null) {
      warn(`--since 값을 해석하지 못했다: ${opts.since} — 기본값 ${DEFAULT_SINCE} 를 쓴다`);
    }
    const window = sinceMs ?? parseSince(DEFAULT_SINCE);
    const cutoff = Date.now() - window;
    const { changed, undated } = selectChanged(kept, cutoff);
    targets = changed;
    log(
      `모드: 변경분 (--since=${sinceMs === null ? DEFAULT_SINCE : opts.since}, cutoff ${new Date(cutoff).toISOString().slice(0, 10)}) — ${targets.length}건` +
        (undated > 0 ? ` / lastmod 없음 ${undated}건 제외` : "")
    );
  }

  if (targets.length === 0) {
    log("제출할 변경분이 없다. 종료");
    return;
  }

  const preview = opts.verbose ? targets : targets.slice(0, 20);
  for (const t of preview) log(`  · ${t.url}${t.lastmod ? ` (lastmod ${t.lastmod})` : ""}`);
  if (!opts.verbose && targets.length > preview.length) {
    log(`  · … 외 ${targets.length - preview.length}건 (--verbose 로 전체 출력)`);
  }

  const batches = chunk(targets.map((t) => t.url), MAX_URLS_PER_REQUEST);

  if (opts.dryRun) {
    log("--dry-run — 실제 제출은 하지 않는다");
    log(`payload: host=${HOST}, key=${KEY}, keyLocation=${SITE}/${KEY}.txt`);
    log(`요청 ${batches.length}회 (요청당 최대 ${MAX_URLS_PER_REQUEST}건)`);
    return;
  }

  if (!keyFileOk) {
    warn("키 파일 확인에 실패해서 제출하지 않는다 (검증 실패로 신뢰도만 깎인다)");
    return;
  }

  let ok = 0;
  for (const [i, batch] of batches.entries()) {
    log(`제출 ${i + 1}/${batches.length} — ${batch.length}건`);
    if (await submit(batch)) ok += 1;
  }
  log(`완료: ${ok}/${batches.length} 요청 성공`);
}

// 어떤 경우에도 배포 파이프라인을 깨뜨리지 않는다
main()
  .catch((err) => warn(`예상치 못한 오류 — ${err instanceof Error ? err.stack : String(err)}`))
  .finally(() => process.exit(0));
