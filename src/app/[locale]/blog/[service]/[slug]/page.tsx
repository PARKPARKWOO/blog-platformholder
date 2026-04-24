import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { isValidLocale, locales } from "@/lib/i18n";
import { getAllPosts, getPost, getRelatedPosts, readingTime } from "@/lib/posts";
import { PostJsonLd } from "@/components/JsonLd";
import { ServiceBadge } from "@/components/ServiceBadge";
import { PostCard } from "@/components/PostCard";
import { mdxComponents } from "@/components/mdx";
import { getService, isValidService } from "@/lib/services";

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
      images: post.meta.ogImage ? [post.meta.ogImage] : undefined,
      type: "article",
      publishedTime: post.meta.publishedAt,
      locale,
      tags: post.meta.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
      images: post.meta.ogImage ? [post.meta.ogImage] : undefined,
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

  return (
    <>
      <PostJsonLd meta={post.meta} />
      <nav className="not-prose text-sm text-neutral-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-neutral-900">
          {locale === "ko" ? "홈" : "Home"}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${locale}/blog`} className="hover:text-neutral-900">
          {locale === "ko" ? "블로그" : "Blog"}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${locale}/blog/${service}`} className="hover:text-neutral-900">
          {svc.name}
        </Link>
      </nav>

      <article className="prose prose-neutral max-w-none prose-headings:scroll-mt-20 prose-img:rounded-lg">
        <div className="not-prose mb-4">
          <ServiceBadge service={service} locale={locale} />
        </div>
        <h1 className="!mb-3 !mt-0">{post.meta.title}</h1>
        <p className="not-prose text-sm text-neutral-500">
          {post.meta.publishedAt}
          {reading ? ` · ${reading} read` : ""}
        </p>
        {post.meta.description && (
          <p className="not-prose mt-3 text-lg text-neutral-600 leading-relaxed">
            {post.meta.description}
          </p>
        )}
        <hr className="my-8 border-neutral-200" />
        <MDXRemote source={post.content} components={mdxComponents} />
      </article>

      {related.length > 0 && (
        <section className="mt-16 border-t border-neutral-200 pt-10">
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
    </>
  );
}
