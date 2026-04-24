import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { locales } from "@/lib/i18n";
import { VISIBLE_SERVICES } from "@/lib/services";

const BASE = "https://blog.platformholder.site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({ url: `${BASE}/${locale}`, changeFrequency: "weekly", priority: 1 });
    entries.push({ url: `${BASE}/${locale}/blog`, changeFrequency: "daily", priority: 0.9 });
    entries.push({ url: `${BASE}/${locale}/tags`, changeFrequency: "weekly", priority: 0.5 });

    // 서비스 인덱스 페이지
    for (const svc of VISIBLE_SERVICES) {
      entries.push({
        url: `${BASE}/${locale}/blog/${svc}`,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    const posts = await getAllPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${BASE}${post.url}`,
        lastModified: post.publishedAt || undefined,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: post.hreflang
          ? { languages: post.hreflang as Record<string, string> }
          : undefined,
      });
    }

    const tags = await getAllTags(locale);
    for (const tag of tags) {
      entries.push({
        url: `${BASE}/${locale}/tags/${tag}`,
        changeFrequency: "weekly",
        priority: 0.4,
      });
    }
  }

  return entries;
}
