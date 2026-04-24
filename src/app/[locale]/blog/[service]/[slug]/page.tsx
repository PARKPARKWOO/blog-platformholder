import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { isValidLocale, locales } from "@/lib/i18n";
import { getAllPosts, getPost, getRelatedPosts, readingTime } from "@/lib/posts";
import { PostJsonLd } from "@/components/JsonLd";
import { ServiceBadge } from "@/components/ServiceBadge";
import { PostCard } from "@/components/PostCard";
import { TableOfContents } from "@/components/TableOfContents";
import { mdxComponents } from "@/components/mdx";
import { getService, isValidService } from "@/lib/services";
import { extractToc, TOC_MIN_ITEMS } from "@/lib/toc";

export async function generateStaticParams() {
  const params: { locale: string; service: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = await getAllPosts(locale);
    for (const post of posts) {
      params.push({ locale, service: post.service, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata(
  { params }: PageProps<"/[locale]/blog/[service]/[slug]">
): Promise<Metadata> {
  const { locale, service, slug } = await params;
  if (!isValidLocale(locale) || !isValidService(service)) return {};
  const post = await getPost(locale, service, slug);
  if (!post) return {};
  const url =
    post.meta.canonical ??
    `https://blog.platformholder.site/${locale}/blog/${service}/${slug}`;
  const ogImage =
    post.meta.ogImage ?? `https://blog.platformholder.site/og/${service}/${slug}`;
  return {
    title: post.meta.title,
    description: post.meta.description,
    keywords: post.meta.tags,
    authors: [{ name: post.meta.author ?? "platformholder" }],
    alternates: {
      canonical: post.meta.canonical ?? `/${locale}/blog/${service}/${slug}`,
      languages: post.meta.hreflang,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url,
      siteName: "platformholder",
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.meta.title }],
      type: "article",
      publishedTime: post.meta.publishedAt,
      locale,
      tags: post.meta.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
      images: [ogImage],
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/[locale]/blog/[service]/[slug]">) {
  const { locale, service, slug } = await params;
  if (!isValidLocale(locale) || !isValidService(service)) notFound();
  const post = await getPost(locale, service, slug);
  if (!post) notFound();
  const svc = getService(service);
  if (!svc) notFound();

  const related = await getRelatedPosts(locale, service, slug, 3);
  const reading = readingTime(post.meta.totalTime);
  const toc = extractToc(post.content);
  const showToc = toc.length >= TOC_MIN_ITEMS;

  return (
    <div className={showToc ? "lg:grid lg:grid-cols-[1fr_240px] lg:gap-10" : ""}>
      <div>
        <PostJsonLd meta={post.meta} />
        <nav className="not-prose text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          <Link href={`/${locale}`} className="hover:text-neutral-900 dark:hover:text-neutral-100">
            {locale === "ko" ? "홈" : "Home"}
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${locale}/blog`} className="hover:text-neutral-900 dark:hover:text-neutral-100">
            {locale === "ko" ? "블로그" : "Blog"}
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${locale}/blog/${service}`} className="hover:text-neutral-900 dark:hover:text-neutral-100">
            {svc.name}
          </Link>
        </nav>

        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-img:rounded-lg">
          <div className="not-prose mb-4">
            <ServiceBadge service={service} locale={locale} />
          </div>
          <h1 className="!mb-3 !mt-0">{post.meta.title}</h1>
          <p className="not-prose text-sm text-neutral-500 dark:text-neutral-400">
            {post.meta.publishedAt}
            {reading ? ` · ${reading} read` : ""}
          </p>
          {post.meta.description && (
            <p className="not-prose mt-3 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {post.meta.description}
            </p>
          )}
          <hr className="my-8 border-neutral-200 dark:border-neutral-800" />
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }}
          />
        </article>

        {related.length > 0 && (
          <section className="mt-16 border-t border-neutral-200 dark:border-neutral-800 pt-10">
            <h2 className="text-lg font-semibold mb-6">
              {locale === "ko" ? `${svc.name} 관련 글 더 보기` : `More from ${svc.name}`}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} locale={locale} />
              ))}
            </div>
          </section>
        )}
      </div>

      {showToc && (
        <aside className="hidden lg:block pt-2">
          <TableOfContents items={toc} locale={locale} />
        </aside>
      )}
    </div>
  );
}
