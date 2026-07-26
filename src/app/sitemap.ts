import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags, lastModifiedOf } from "@/lib/posts";
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
    const tags = await getAllTags(locale);
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

    for (const tag of tags) {
      entries.push({
        url: `${BASE}/${locale}/tags/${tag}`,
        lastModified: latest(
          posts.filter((p) => p.tags.includes(tag)).map(lastModifiedOf)
        ),
        changeFrequency: "weekly",
        priority: 0.4,
      });
    }
  }

  return entries;
}
