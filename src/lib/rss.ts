import type { Locale } from "./i18n";
import type { PostMeta } from "./posts";
import { SERVICES } from "./services";

export const SITE_URL = "https://blog.platformholder.site";
export const FEED_SIZE = 20;

const xmlEscape = (s: string) =>
  s.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!)
  );

const toRfc822 = (v: string) => {
  const d = v ? new Date(v) : new Date();
  return (isNaN(d.getTime()) ? new Date() : d).toUTCString();
};

interface FeedMeta {
  title: string;
  description: string;
  link: string;
  selfLink: string;
  language: Locale;
}

export function buildRss(meta: FeedMeta, posts: PostMeta[]): string {
  const items = posts
    .slice(0, FEED_SIZE)
    .map((p) => {
      const url = p.canonical ?? `${SITE_URL}${p.url}`;
      const category = SERVICES[p.service]?.name ?? p.service;
      return `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc822(p.publishedAt)}</pubDate>
      ${p.description ? `<description><![CDATA[${p.description}]]></description>` : ""}
      <category>${xmlEscape(category)}</category>
      ${p.tags.map((t) => `<category>${xmlEscape(t)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${xmlEscape(meta.title)}</title>
    <link>${meta.link}</link>
    <description>${xmlEscape(meta.description)}</description>
    <language>${meta.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js · platformholder</generator>
    <atom:link href="${meta.selfLink}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}
