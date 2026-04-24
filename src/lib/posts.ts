import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n";
import {
  isValidService,
  type ServiceSlug,
  VISIBLE_SERVICES,
  SERVICE_ORDER,
} from "./services";

export interface HowToStep {
  name: string;
  text: string;
}

export interface PostMeta {
  slug: string;
  service: ServiceSlug;
  title: string;
  description?: string;
  publishedAt: string;
  tags: string[];
  locale: Locale;
  canonical?: string;
  hreflang?: Partial<Record<Locale, string>>;
  ogImage?: string;
  type?: "article" | "howto";
  howToSteps?: HowToStep[];
  totalTime?: string;
  author?: string;
  url: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function buildUrl(locale: Locale, service: ServiceSlug, slug: string) {
  return `/${locale}/blog/${service}/${slug}`;
}

function parsePostMeta(
  locale: Locale,
  service: ServiceSlug,
  slug: string,
  data: Record<string, unknown>
): PostMeta {
  return {
    slug,
    service,
    title: typeof data.title === "string" ? data.title : slug,
    description: typeof data.description === "string" ? data.description : undefined,
    publishedAt: typeof data.publishedAt === "string" ? data.publishedAt : "",
    tags: Array.isArray(data.tags)
      ? (data.tags.filter((t) => typeof t === "string") as string[])
      : [],
    locale,
    canonical: typeof data.canonical === "string" ? data.canonical : undefined,
    hreflang: (data.hreflang as PostMeta["hreflang"]) ?? undefined,
    ogImage: typeof data.ogImage === "string" ? data.ogImage : undefined,
    type: data.type === "howto" ? "howto" : "article",
    howToSteps: Array.isArray(data.howToSteps)
      ? (data.howToSteps.filter(
          (s): s is HowToStep =>
            typeof s === "object" && s !== null && "name" in s && "text" in s
        ) as HowToStep[])
      : undefined,
    totalTime: typeof data.totalTime === "string" ? data.totalTime : undefined,
    author: typeof data.author === "string" ? data.author : undefined,
    url: buildUrl(locale, service, slug),
  };
}

async function listServiceDirs(locale: Locale): Promise<ServiceSlug[]> {
  const dir = path.join(CONTENT_DIR, locale);
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isDirectory() && isValidService(e.name))
      .map((e) => e.name as ServiceSlug);
  } catch {
    return [];
  }
}

export async function getAllPosts(locale: Locale): Promise<PostMeta[]> {
  const services = await listServiceDirs(locale);
  const all: PostMeta[] = [];

  for (const service of services) {
    const dir = path.join(CONTENT_DIR, locale, service);
    let files: string[];
    try {
      files = await fs.readdir(dir);
    } catch {
      continue;
    }
    for (const file of files) {
      if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue;
      const raw = await fs.readFile(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      const slug = file.replace(/\.mdx?$/, "");
      all.push(parsePostMeta(locale, service, slug, data));
    }
  }

  return all.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPostsByService(
  locale: Locale,
  service: ServiceSlug
): Promise<PostMeta[]> {
  const all = await getAllPosts(locale);
  return all.filter((p) => p.service === service);
}

export async function getPost(
  locale: Locale,
  service: ServiceSlug,
  slug: string
): Promise<{ meta: PostMeta; content: string } | null> {
  const candidates = [
    path.join(CONTENT_DIR, locale, service, `${slug}.mdx`),
    path.join(CONTENT_DIR, locale, service, `${slug}.md`),
  ];
  for (const filepath of candidates) {
    try {
      const raw = await fs.readFile(filepath, "utf8");
      const { data, content } = matter(raw);
      return { meta: parsePostMeta(locale, service, slug, data), content };
    } catch {
      continue;
    }
  }
  return null;
}

export async function getPostsByTag(locale: Locale, tag: string): Promise<PostMeta[]> {
  const posts = await getAllPosts(locale);
  return posts.filter((p) => p.tags.includes(tag));
}

export async function getAllTags(locale: Locale): Promise<string[]> {
  const posts = await getAllPosts(locale);
  const set = new Set<string>();
  for (const p of posts) for (const t of p.tags) set.add(t);
  return Array.from(set).sort();
}

export async function getRelatedPosts(
  locale: Locale,
  service: ServiceSlug,
  excludeSlug: string,
  limit = 3
): Promise<PostMeta[]> {
  const posts = await getPostsByService(locale, service);
  return posts.filter((p) => p.slug !== excludeSlug).slice(0, limit);
}

export function sortPostsByService(posts: PostMeta[]): PostMeta[] {
  const orderMap = new Map(SERVICE_ORDER.map((s, i) => [s, i]));
  return [...posts].sort((a, b) => {
    const sa = orderMap.get(a.service) ?? 99;
    const sb = orderMap.get(b.service) ?? 99;
    if (sa !== sb) return sa - sb;
    return b.publishedAt.localeCompare(a.publishedAt);
  });
}

export function readingTime(totalTimeIso?: string): string | null {
  if (!totalTimeIso) return null;
  const m = totalTimeIso.match(/PT(\d+)M/);
  if (!m) return null;
  return `${m[1]} min`;
}

export { VISIBLE_SERVICES };
