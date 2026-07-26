import "server-only";
import type { FaqItem, PostMeta } from "@/lib/posts";
import { SERVICES, type ServiceSlug } from "@/lib/services";

/**
 * GEO(Generative Engine Optimization) 라우트 공용 유틸.
 *
 * `_geo` 는 언더스코어로 시작하는 private folder 라서 라우팅 대상이 아니다.
 * (Next.js App Router 규칙 — node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md)
 *
 * 여기서 참조하는 다른 모듈은 전부 읽기 전용이다. `updatedAt` / `keyTakeaways` / `faq` 는
 * `PostMeta` 의 선택 필드로 정식 선언돼 있으므로 타입 그대로 읽고, 값이 없는 글
 * (= 프론트매터에 해당 키가 없는 기존 글) 은 아래 헬퍼가 빈 값으로 폴백한다.
 */

export const SITE = "https://blog.platformholder.site";

/** 글 HTML canonical. frontmatter 의 canonical 이 있으면 그것을 그대로 쓴다 */
export function canonicalUrlOf(post: PostMeta): string {
  const declared = post.canonical;
  if (typeof declared === "string" && declared.startsWith("http")) return declared;
  return `${SITE}${post.url}`;
}

/** 같은 글의 마크다운 원문 주소. HTML 경로 뒤에 `/raw` 를 붙인 형태 */
export function rawUrlOf(post: PostMeta): string {
  return `${SITE}${post.url}/raw`;
}

export function serviceLabel(service: ServiceSlug | string): string {
  const svc = SERVICES[service as ServiceSlug];
  return svc ? `${svc.name} (${service})` : String(service);
}

/* ------------------------------------------------------------------ *
 * PostMeta 선택 필드 접근
 * ------------------------------------------------------------------ */

function optionalString(value: string | undefined): string | undefined {
  return value !== undefined && value.trim().length > 0 ? value.trim() : undefined;
}

/** `updatedAt` 이 없는 글(= 개정 이력이 없는 기존 글)에서는 undefined */
export function updatedAtOf(post: PostMeta): string | undefined {
  return optionalString(post.updatedAt);
}

/** `keyTakeaways` 가 없는 글에서는 빈 배열 → 호출부의 요약 블록이 통째로 빠진다 */
export function keyTakeawaysOf(post: PostMeta): string[] {
  return (post.keyTakeaways ?? []).filter((v) => v.trim().length > 0);
}

/** `faq` 가 없는 글에서는 빈 배열 → 호출부의 FAQ 섹션이 통째로 빠진다 */
export function faqOf(post: PostMeta): FaqItem[] {
  return post.faq ?? [];
}

/** 목록용 한 줄 설명. description 이 없으면 undefined */
export function summaryOf(post: PostMeta): string | undefined {
  const description = optionalString(post.description);
  if (description) return description.replace(/\s+/g, " ");
  const takeaway = keyTakeawaysOf(post)[0];
  return takeaway ? takeaway.replace(/\s+/g, " ") : undefined;
}

/* ------------------------------------------------------------------ *
 * MDX → 평문 마크다운
 * ------------------------------------------------------------------ */

// 한 줄을 통째로 차지하는 여는 태그: `  <Callout type="tip" title="...">`
const OPEN_TAG = /^(\s*)<([A-Z][A-Za-z0-9]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>\s*$/;
// 한 줄을 통째로 차지하는 닫는 태그: `  </Callout>`
const CLOSE_TAG = /^\s*<\/([A-Z][A-Za-z0-9]*)\s*>\s*$/;
const FENCE = /^\s*(?:```|~~~)/;
// 줄 안에 남아 있는 JSX 조각 (드물지만 방어적으로 제거)
const INLINE_JSX = /<\/?[A-Z][A-Za-z0-9]*(?:"[^"]*"|'[^']*'|[^>"'])*\/?>/g;
// `{/* ... */}` MDX 주석 (한 줄짜리만)
const MDX_COMMENT = /\{\s*\/\*.*?\*\/\s*\}/g;

function readAttr(attrs: string, name: string): string | undefined {
  const match = attrs.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`));
  if (!match) return undefined;
  const value = (match[1] ?? match[2] ?? "").trim();
  return value.length > 0 ? value : undefined;
}

interface Frame {
  tag: string;
  /** 자식 줄에서 걷어낼 들여쓰기 칸 수. 첫 자식 줄을 보고 결정한다 */
  dedent: number | null;
  /** 자식 줄 앞에 붙일 접두사 (Callout → 인용문 `> `) */
  prefix: string;
}

interface Rendered {
  lines: string[];
  prefix: string;
}

/**
 * 컴포넌트 여는 태그를 평문 마크다운으로 바꾼다.
 * 렌더 결과(Callout.tsx / Steps.tsx)와 의미가 어긋나지 않는 범위에서만 변환한다.
 * - Callout → 인용문 + `[TYPE] 제목` 라벨 (Callout 은 라벨 + 본문 박스로 렌더된다)
 * - Step    → h3 제목 (Step.tsx 가 title 을 <h3> 로 렌더한다)
 * - Steps   → 태그만 제거 (ol 래퍼라 평문에서는 의미 없음)
 * - 그 외   → 태그만 제거하고 자식 본문은 그대로 남긴다
 */
function renderOpenTag(tag: string, attrs: string): Rendered {
  if (tag === "Callout") {
    const type = (readAttr(attrs, "type") ?? "note").toUpperCase();
    const title = readAttr(attrs, "title");
    const label = title ? `**[${type}] ${title}**` : `**[${type}]**`;
    return { lines: [`> ${label}`, ">"], prefix: "> " };
  }
  if (tag === "Step") {
    const title = readAttr(attrs, "title");
    return { lines: title ? ["", `### ${title}`, ""] : [], prefix: "" };
  }
  return { lines: [], prefix: "" };
}

function lastIndexOfTag(stack: Frame[], tag: string): number {
  for (let i = stack.length - 1; i >= 0; i -= 1) {
    if (stack[i].tag === tag) return i;
  }
  return -1;
}

/**
 * MDX 본문에서 컴포넌트 태그를 걷어내고 평문 마크다운으로 만든다.
 *
 * 핵심은 들여쓰기 정리다. `<Step>` 안의 본문은 4칸 들여쓰기로 쓰여 있는데,
 * 태그만 지우면 그 4칸이 마크다운 코드블록으로 해석돼 원문이 망가진다.
 * 그래서 각 블록의 첫 자식 줄에서 기준 들여쓰기를 잡아 함께 제거한다.
 */
export function flattenMdx(source: string): string {
  const out: string[] = [];
  const stack: Frame[] = [];
  let inFence = false;

  const ancestorPrefix = () => stack.map((frame) => frame.prefix).join("");

  for (const rawLine of source.replace(/\r\n?/g, "\n").split("\n")) {
    const isFenceLine = FENCE.test(rawLine);

    if (!inFence && !isFenceLine) {
      const close = CLOSE_TAG.exec(rawLine);
      if (close) {
        const index = lastIndexOfTag(stack, close[1]);
        if (index >= 0) stack.length = index;
        continue;
      }

      const open = OPEN_TAG.exec(rawLine);
      if (open) {
        const [, indent, tag, attrs, selfClosing] = open;
        const parent = stack[stack.length - 1];
        if (parent && parent.dedent === null) parent.dedent = indent.length;

        const prefix = ancestorPrefix();
        const rendered = renderOpenTag(tag, attrs);
        for (const line of rendered.lines) {
          out.push(line.length > 0 ? prefix + line : prefix.trimEnd());
        }
        if (!selfClosing) stack.push({ tag, dedent: null, prefix: rendered.prefix });
        continue;
      }
    }

    // 일반 본문 줄
    const frame = stack[stack.length - 1];
    const isBlank = rawLine.trim().length === 0;
    if (frame && frame.dedent === null && !isBlank) {
      frame.dedent = rawLine.length - rawLine.trimStart().length;
    }

    let line = rawLine;
    const dedent = frame?.dedent ?? 0;
    if (dedent > 0) {
      const leading = line.length - line.trimStart().length;
      line = line.slice(Math.min(dedent, leading));
    }
    if (!inFence && !isFenceLine) {
      line = line.replace(MDX_COMMENT, "").replace(INLINE_JSX, "");
    }

    const prefix = ancestorPrefix();
    out.push(line.trim().length === 0 ? prefix.trimEnd() : prefix + line);

    if (isFenceLine) inFence = !inFence;
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/* ------------------------------------------------------------------ *
 * 글 단위 마크다운 조립
 * ------------------------------------------------------------------ */

export interface PostMarkdownOptions {
  /** 제목 줄에 쓸 heading 접두사. 기본 `#` */
  heading?: string;
  /** 본문 포함 여부. llms.txt 목록에서는 false */
  includeBody?: boolean;
}

/** 제목 + 메타데이터 헤더. 인용 시 출처가 살아 있도록 canonical 을 항상 넣는다 */
export function postHeaderLines(post: PostMeta, heading = "#"): string[] {
  const canonical = canonicalUrlOf(post);
  const lines: string[] = [`${heading} ${post.title}`, ""];

  const description = summaryOf(post);
  if (description) lines.push(`> ${description}`, "");

  lines.push(`- canonical: ${canonical}`);
  lines.push(`- 마크다운 원문: ${rawUrlOf(post)}`);
  lines.push(`- 서비스: ${serviceLabel(post.service)}`);
  lines.push(`- 언어: ${post.locale}`);
  if (post.publishedAt) lines.push(`- 발행일: ${post.publishedAt}`);

  const updatedAt = updatedAtOf(post);
  if (updatedAt && updatedAt !== post.publishedAt) {
    lines.push(`- 최종 수정일: ${updatedAt}`);
  }
  if (post.tags.length > 0) lines.push(`- 태그: ${post.tags.join(", ")}`);
  lines.push(`- 출처 표기: platformholder blog — ${canonical}`);

  return lines;
}

/** 글 하나를 마크다운 문서 한 편으로 만든다 (raw 라우트 · llms-full.txt 공용) */
export function buildPostMarkdown(
  post: PostMeta,
  content: string,
  options: PostMarkdownOptions = {}
): string {
  const heading = options.heading ?? "#";
  const blocks: string[] = [postHeaderLines(post, heading).join("\n")];

  const takeaways = keyTakeawaysOf(post);
  if (takeaways.length > 0) {
    blocks.push(["**핵심 요약**", "", ...takeaways.map((t) => `- ${t}`)].join("\n"));
  }

  if (options.includeBody !== false) {
    blocks.push("---");
    blocks.push(flattenMdx(content));
  }

  const faq = faqOf(post);
  if (faq.length > 0) {
    const faqLines = ["## FAQ"];
    for (const item of faq) {
      faqLines.push("", `**Q. ${item.question}**`, "", item.answer);
    }
    blocks.push(faqLines.join("\n"));
  }

  return blocks.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
}
