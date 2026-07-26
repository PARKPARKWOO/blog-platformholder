import { locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dict";
import { getAllPosts, getPost, type PostMeta } from "@/lib/posts";
import { PUBLISHER } from "@/lib/publisher";
import { SERVICE_ORDER } from "@/lib/services";
import { SITE, buildPostMarkdown, updatedAtOf } from "@/app/_geo/markdown";

/**
 * /llms-full.txt — 모든 글의 메타데이터 + 본문 마크다운 전문 번들.
 *
 * 글 사이에는 고정 구분선을 넣고, 각 글 블록 첫머리에 canonical URL 을 둔다.
 * 번들 중간을 잘라서 인용해도 출처가 함께 붙어 나오게 하기 위함이다.
 * MDX 컴포넌트 태그(<Callout> / <Steps> / <Step>)는 평문 마크다운으로 정리된다.
 */
export const dynamic = "force-static";

const SEPARATOR = "=".repeat(80);

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

/** 로케일 안에서는 서비스 순서 → 최신순으로 정렬한다 */
function ordered(posts: PostMeta[]): PostMeta[] {
  const rank = new Map(SERVICE_ORDER.map((slug, index) => [slug, index]));
  return [...posts].sort((a, b) => {
    const ra = rank.get(a.service) ?? 99;
    const rb = rank.get(b.service) ?? 99;
    if (ra !== rb) return ra - rb;
    return b.publishedAt.localeCompare(a.publishedAt);
  });
}

export async function GET() {
  const koDict = await getDictionary("ko");
  const byLocale = new Map<Locale, PostMeta[]>();
  for (const locale of locales) {
    byLocale.set(locale, ordered(await getAllPosts(locale)));
  }
  const allPosts = locales.flatMap((locale) => byLocale.get(locale) ?? []);

  const head: string[] = [];
  head.push("# platformholder blog — 전체 본문 번들 (llms-full.txt)");
  head.push("");
  head.push(`> ${koDict.site.description}`);
  head.push("");
  head.push(`- 사이트: ${SITE}`);
  head.push(`- 요약본(글 목록만): ${SITE}/llms.txt`);
  head.push(`- 사이트맵: ${SITE}/sitemap.xml`);
  head.push(
    `- 수록 글: ${allPosts.length}편 (${locales
      .map((locale) => `${locale} ${(byLocale.get(locale) ?? []).length}편`)
      .join(" · ")})`
  );
  const latest = latestDate(allPosts);
  if (latest) head.push(`- 가장 최근 글 날짜: ${latest}`);
  head.push(
    `- 구분선: 글과 글 사이는 \`${"=".repeat(8)}...\` 80자 구분선으로 나뉩니다. 각 글 블록 첫머리의 canonical URL 이 그 글의 출처입니다.`
  );
  head.push(
    "- 본문 정리: 원문은 MDX 입니다. 컴포넌트 태그는 평문 마크다운으로 바꿨습니다 — Callout 은 `> **[TYPE] 제목**` 인용문, Steps/Step 은 `### 단계 제목` 으로 나옵니다."
  );
  head.push(
    "- 인용 정책: 글 제목과 canonical URL 을 함께 표기해 주세요. 전문 재배포는 사전 문의 바랍니다 — " +
      `${PUBLISHER.email}`
  );

  const blocks: string[] = [head.join("\n")];

  for (const locale of locales) {
    const posts = byLocale.get(locale) ?? [];
    if (posts.length === 0) continue;

    blocks.push([SEPARATOR, `## 언어: ${LOCALE_LABEL[locale]} — ${posts.length}편`].join("\n"));

    for (const meta of posts) {
      // 본문은 getPost 로 다시 읽는다 (getAllPosts 는 frontmatter 만 파싱한다)
      const loaded = await getPost(locale, meta.service, meta.slug);
      if (!loaded) continue;
      blocks.push(
        [
          SEPARATOR,
          "",
          buildPostMarkdown(loaded.meta, loaded.content, { heading: "#" }),
        ].join("\n")
      );
    }
  }

  blocks.push([SEPARATOR, "", "이상 전체 본문 번들 끝.", `출처: platformholder blog — ${SITE}`].join("\n"));

  const body = blocks.join("\n\n").replace(/\n{4,}/g, "\n\n\n").trim() + "\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
