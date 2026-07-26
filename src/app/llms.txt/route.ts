import { locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dict";
import { getAllPosts, type PostMeta } from "@/lib/posts";
import { PUBLISHER } from "@/lib/publisher";
import { SERVICES, SERVICE_ORDER, VISIBLE_SERVICES } from "@/lib/services";
import {
  SITE,
  canonicalUrlOf,
  rawUrlOf,
  summaryOf,
  updatedAtOf,
} from "@/app/_geo/markdown";

/**
 * /llms.txt — AI 에이전트용 사이트 요약 (제안 표준: https://llmstxt.org)
 *
 * 내용은 전부 getAllPosts / SERVICES 에서 뽑는다. 하드코딩된 글·서비스 목록은 없다.
 * 빌드 시점에 한 번 생성된다.
 */
export const dynamic = "force-static";

const LOCALE_LABEL: Record<Locale, string> = {
  ko: "한국어 (ko)",
  en: "English (en)",
};

function latestDate(posts: PostMeta[]): string | undefined {
  let max: string | undefined;
  for (const post of posts) {
    for (const value of [post.publishedAt, updatedAtOf(post)]) {
      if (!value) continue;
      if (!max || value.localeCompare(max) > 0) max = value;
    }
  }
  return max;
}

export async function GET() {
  const byLocale = new Map<Locale, PostMeta[]>();
  for (const locale of locales) {
    byLocale.set(locale, await getAllPosts(locale));
  }
  const allPosts = locales.flatMap((locale) => byLocale.get(locale) ?? []);
  const koDict = await getDictionary("ko");
  const enDict = await getDictionary("en");

  const lines: string[] = [];

  /* ---------------- 헤더 ---------------- */
  lines.push("# platformholder blog");
  lines.push("");
  lines.push(`> ${koDict.site.description}`);
  lines.push(`> (EN) ${enDict.site.description}`);
  lines.push("");
  lines.push(`- 사이트: ${SITE}`);
  lines.push(
    `- 발행 언어: ${locales.map((l) => LOCALE_LABEL[l]).join(" · ")} — 같은 글을 두 언어로 발행합니다`
  );
  lines.push(`- 발행자: ${PUBLISHER.name}`);
  lines.push(`- 전체 글 수: ${allPosts.length}편`);
  const latest = latestDate(allPosts);
  if (latest) lines.push(`- 가장 최근 글 날짜: ${latest}`);
  lines.push(`- 사이트맵: ${SITE}/sitemap.xml`);
  lines.push(`- RSS: ${locales.map((l) => `${SITE}/${l}/feed.xml`).join(" · ")}`);
  lines.push(`- 전체 본문 번들: ${SITE}/llms-full.txt`);
  lines.push("");

  /* ---------------- 읽는 법 ---------------- */
  const sample = allPosts.find((p) => p.locale === "ko") ?? allPosts[0];
  lines.push("## 읽는 법");
  lines.push("");
  lines.push(
    "- 글 HTML 주소 뒤에 `/raw` 를 붙이면 같은 글의 마크다운 원문을 받을 수 있습니다 (`text/markdown`). HTML 파싱이 필요 없습니다."
  );
  if (sample) {
    lines.push(`  - 예: ${canonicalUrlOf(sample)} → ${rawUrlOf(sample)}`);
  }
  lines.push(
    "- 모든 글을 한 파일로 받으려면 `/llms-full.txt` 를 쓰세요. 글마다 구분선과 canonical URL 이 들어 있습니다."
  );
  lines.push(
    "- 아래 목록의 URL 이 그 글의 canonical 입니다. 인용할 때 이 주소를 그대로 쓰면 됩니다."
  );
  lines.push("");

  /* ---------------- 서비스 ---------------- */
  // 글이 1편 이상 있고 숨김 처리되지 않은 서비스만 싣는다 (빈 인덱스 안내 방지)
  const servicesWithPosts = SERVICE_ORDER.filter(
    (slug) =>
      VISIBLE_SERVICES.includes(slug) &&
      allPosts.some((post) => post.service === slug)
  );

  if (servicesWithPosts.length > 0) {
    lines.push("## 서비스");
    lines.push("");
    lines.push("이 블로그가 다루는 서비스입니다. 각 서비스별 글 인덱스가 따로 있습니다.");
    lines.push("");
    for (const slug of servicesWithPosts) {
      const svc = SERVICES[slug];
      lines.push(`### ${svc.name} (${slug})`);
      lines.push(`- 한 줄 소개: ${svc.tagline.ko}`);
      if (svc.url) lines.push(`- 서비스 URL: ${svc.url}`);
      for (const locale of locales) {
        const count = (byLocale.get(locale) ?? []).filter(
          (post) => post.service === slug
        ).length;
        if (count === 0) continue;
        lines.push(
          `- 블로그 인덱스 (${locale}): ${SITE}/${locale}/blog/${slug} — ${count}편 · RSS ${SITE}/${locale}/blog/${slug}/feed.xml`
        );
      }
      lines.push("");
    }
  }

  /* ---------------- 문서 ---------------- */
  lines.push("## 문서");
  lines.push("");
  for (const locale of locales) {
    const posts = byLocale.get(locale) ?? [];
    if (posts.length === 0) continue;

    lines.push(`### ${LOCALE_LABEL[locale]}`);
    lines.push("");

    const grouped = SERVICE_ORDER.map((slug) => ({
      slug,
      posts: posts.filter((post) => post.service === slug),
    })).filter((group) => group.posts.length > 0);

    for (const group of grouped) {
      lines.push(`#### ${SERVICES[group.slug].name}`);
      for (const post of group.posts) {
        const summary = summaryOf(post);
        lines.push(
          `- [${post.title}](${canonicalUrlOf(post)})${summary ? `: ${summary}` : ""}`
        );
      }
      lines.push("");
    }
  }

  /* ---------------- 정책 ---------------- */
  lines.push("## 정책");
  lines.push("");
  lines.push(
    "- 인용·요약 시 글 제목과 canonical URL 을 함께 표기해 주세요. 답변에 링크를 남겨 주시면 독자가 원문을 확인할 수 있습니다."
  );
  lines.push(
    "- 저작권: 별도 표기가 없는 한 이 블로그의 글·이미지 저작권은 platformholder 에게 있습니다. 출처를 표기한 인용·요약·발췌는 허용합니다. 전문 재배포·상업적 재가공은 아래 연락처로 먼저 문의해 주세요."
  );
  lines.push(
    "- 크롤링: robots.txt 에서 주요 AI 검색·학습 크롤러를 명시적으로 허용하고 있습니다. 차단 규칙은 두지 않았습니다 — " +
      `${SITE}/robots.txt`
  );
  lines.push(
    "- 정확도: 제품 기능 설명은 각 글의 발행일·수정일 시점 기준입니다. 최신 상태는 위 서비스 URL 에서 확인해 주세요."
  );
  lines.push(`- 연락처: ${PUBLISHER.email} · ${PUBLISHER.linkedin}`);
  lines.push("");

  const body = lines.join("\n").replace(/\n{3,}/g, "\n\n").trimStart();

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
