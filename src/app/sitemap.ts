import type { MetadataRoute } from "next";
import { getAllPosts, lastModifiedOf } from "@/lib/posts";
import { locales } from "@/lib/i18n";
import { VISIBLE_SERVICES } from "@/lib/services";

const BASE = "https://blog.platformholder.site";

function latest(dates: (string | undefined)[]): string | undefined {
  let max: string | undefined;
  for (const d of dates) {
    if (!d) continue;
    if (!max || d.localeCompare(max) > 0) max = d;
  }
  return max;
}

// 모든 로케일에 동일 경로가 존재하는 페이지에만 쓴다 (태그 상세는 로케일마다 다름)
function localeAlternates(suffix: string): Record<string, string> {
  return Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}${suffix}`]));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const posts = await getAllPosts(locale);
    const siteLastMod = latest(posts.map(lastModifiedOf));

    entries.push({
      url: `${BASE}/${locale}`,
      lastModified: siteLastMod,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: localeAlternates("") },
    });
    entries.push({
      url: `${BASE}/${locale}/blog`,
      lastModified: siteLastMod,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: { languages: localeAlternates("/blog") },
    });
    entries.push({
      url: `${BASE}/${locale}/tags`,
      lastModified: siteLastMod,
      changeFrequency: "weekly",
      priority: 0.5,
      alternates: { languages: localeAlternates("/tags") },
    });

    // 서비스 인덱스 페이지
    for (const svc of VISIBLE_SERVICES) {
      entries.push({
        url: `${BASE}/${locale}/blog/${svc}`,
        lastModified: latest(
          posts.filter((p) => p.service === svc).map(lastModifiedOf)
        ),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: localeAlternates(`/blog/${svc}`) },
      });
    }

    for (const post of posts) {
      entries.push({
        url: `${BASE}${post.url}`,
        lastModified: lastModifiedOf(post),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: post.hreflang
          ? { languages: post.hreflang as Record<string, string> }
          : undefined,
      });
    }

    /* 태그 상세 페이지는 사이트맵에 넣지 않는다.
     *
     * 글이 로케일당 23편인데 태그는 100개다. 대부분 글 1~2편짜리 목록이라 얇고,
     * 넣으면 **사이트맵의 절대다수가 태그가 된다** — 2026-08-02 실측으로 260개 중
     * 200개(76.9%)였다. 구글이 이 사이트를 크롤할 때 보는 URL 4개 중 3개가 얇은
     * 목록이라는 뜻이고, 애드센스 심사에서 "가치 있는 콘텐츠 부족"으로 잡히는
     * 모양이 정확히 이것이다.
     *
     * 페이지 자체는 살아 있고 `/tags` 인덱스에서 링크된다. 다만 색인 대상이 아니므로
     * `tags/[tag]/page.tsx` 도 `robots: { index: false, follow: true }` 를 낸다.
     * 둘 중 하나만 바꾸면 신호가 어긋나니 **항상 같이 바꿀 것.**
     */
  }

  return entries;
}
