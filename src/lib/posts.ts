import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n";

export interface HowToStep {
  name: string;
  text: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description?: string;
  publishedAt: string;
  service?: string;
  tags: string[];
  locale: Locale;
  canonical?: string;
  hreflang?: Partial<Record<Locale, string>>;
  ogImage?: string;
  type?: "article" | "howto";
  howToSteps?: HowToStep[];
  totalTime?: string;
  author?: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function parsePostMeta(
  locale: Locale,
  slug: string,
  data: Record<string, unknown>
): PostMeta {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    description: typeof data.description === "string" ? data.description : undefined,
    publishedAt: typeof data.publishedAt === "string" ? data.publishedAt : "",
    service: typeof data.service === "string" ? data.service : undefined,
    tags: Array.isArray(data.tags) ? (data.tags.filter((t) => typeof t === "string") as string[]) : [],
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
  };
}

export async function getAllPosts(locale: Locale): Promise<PostMeta[]> {
  const dir = path.join(CONTENT_DIR, locale);
  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }

  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), "utf8");
        const { data } = matter(raw);
        const slug = file.replace(/\.mdx?$/, "");
        return parsePostMeta(locale, slug, data);
      })
  );

  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPost(
  locale: Locale,
  slug: string
): Promise<{ meta: PostMeta; content: string } | null> {
  const candidates = [
    path.join(CONTENT_DIR, locale, `${slug}.mdx`),
    path.join(CONTENT_DIR, locale, `${slug}.md`),
  ];
  for (const filepath of candidates) {
    try {
      const raw = await fs.readFile(filepath, "utf8");
      const { data, content } = matter(raw);
      return { meta: parsePostMeta(locale, slug, data), content };
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
  for (const p of posts) {
    for (const t of p.tags) set.add(t);
  }
  return Array.from(set).sort();
}
