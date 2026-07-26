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

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PostMeta {
  slug: string;
  service: ServiceSlug;
  title: string;
  description?: string;
  publishedAt: string;
  /** 본문 개정일. 없으면 publishedAt 을 최종 수정일로 본다 (lastModifiedOf) */
  updatedAt?: string;
  tags: string[];
  locale: Locale;
  canonical?: string;
  hreflang?: Partial<Record<Locale, string>>;
  ogImage?: string;
  type?: "article" | "howto";
  howToSteps?: HowToStep[];
  faq?: FaqItem[];
  /** 글 상단 TL;DR 요약. JSON-LD abstract 로도 나간다 */
  keyTakeaways?: string[];
  totalTime?: string;
  author?: string;
  /** 본문을 함께 읽은 경우에만 채워진다 (getPost) */
  wordCount?: number;
  url: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function buildUrl(locale: Locale, service: ServiceSlug, slug: string) {
  return `/${locale}/blog/${service}/${slug}`;
}

// YAML 은 따옴표 없는 `2026-05-04` 를 Date 로 파싱한다. 문자열/Date 둘 다 YYYY-MM-DD 로 정규화
function parseDate(value: unknown): string | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && value.trim().length > 0) return value.trim();
  return undefined;
}

/**
 * frontmatter 의 문자열 필드 정규화.
 *
 * 빈 문자열(`ogImage: ""` 처럼 키만 있고 값이 없는 경우)은 `undefined` 로 낮춘다.
 * `""` 를 그대로 두면 `meta.ogImage ?? 폴백` 같은 nullish 폴백이 살아나지 않아
 * 공유 카드 이미지가 빈 URL 로 깨진다.
 */
function parseOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parseStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value.filter((v): v is string => typeof v === "string" && v.length > 0);
  return items.length > 0 ? items : undefined;
}

function parseFaq(value: unknown): FaqItem[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value.filter(
    (f): f is FaqItem =>
      typeof f === "object" &&
      f !== null &&
      typeof (f as Partial<FaqItem>).question === "string" &&
      typeof (f as Partial<FaqItem>).answer === "string"
  );
  return items.length > 0 ? items : undefined;
}

// 마크다운 장식·코드 블록을 걷어낸 뒤 공백 토큰 수를 센다 (한국어는 어절 기준)
function countWords(markdown: string): number {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`\n]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~|-]+/g, " ");
  return plain.split(/\s+/).filter(Boolean).length;
}

/** 최종 수정일. updatedAt 이 없으면 publishedAt 으로 폴백 */
export function lastModifiedOf(post: PostMeta): string | undefined {
  return post.updatedAt || post.publishedAt || undefined;
}

function parsePostMeta(
  locale: Locale,
  service: ServiceSlug,
  slug: string,
  data: Record<string, unknown>,
  content?: string
): PostMeta {
  return {
    slug,
    service,
    title: parseOptionalString(data.title) ?? slug,
    description: parseOptionalString(data.description),
    publishedAt: parseDate(data.publishedAt) ?? "",
    updatedAt: parseDate(data.updatedAt),
    tags: Array.isArray(data.tags)
      ? (data.tags.filter((t) => typeof t === "string") as string[])
      : [],
    locale,
    canonical: parseOptionalString(data.canonical),
    hreflang: (data.hreflang as PostMeta["hreflang"]) ?? undefined,
    // 빈 값이면 undefined → 동적 OG 라우트(/og/{service}/{slug}) 폴백이 살아난다
    ogImage: parseOptionalString(data.ogImage),
    type: data.type === "howto" ? "howto" : "article",
    howToSteps: Array.isArray(data.howToSteps)
      ? (data.howToSteps.filter(
          (s): s is HowToStep =>
            typeof s === "object" && s !== null && "name" in s && "text" in s
        ) as HowToStep[])
      : undefined,
    faq: parseFaq(data.faq),
    keyTakeaways: parseStringArray(data.keyTakeaways),
    totalTime: parseOptionalString(data.totalTime),
    author: parseOptionalString(data.author),
    wordCount: content !== undefined ? countWords(content) : undefined,
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
      return { meta: parsePostMeta(locale, service, slug, data, content), content };
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
