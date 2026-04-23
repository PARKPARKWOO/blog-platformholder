import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { isValidLocale, locales } from "@/lib/i18n";
import { getAllPosts, getPost } from "@/lib/posts";
import { PostJsonLd } from "@/components/JsonLd";
import { mdxComponents } from "@/components/mdx";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = await getAllPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata(
  { params }: PageProps<"/[locale]/blog/[slug]">
): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const post = await getPost(locale, slug);
  if (!post) return {};
  const url = post.meta.canonical ?? `https://blog.platformholder.site/${locale}/blog/${slug}`;
  return {
    title: post.meta.title,
    description: post.meta.description,
    keywords: post.meta.tags,
    authors: [{ name: post.meta.author ?? "platformholder" }],
    alternates: {
      canonical: post.meta.canonical ?? `/${locale}/blog/${slug}`,
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

export default async function PostPage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const post = await getPost(locale, slug);
  if (!post) notFound();

  return (
    <>
      <PostJsonLd meta={post.meta} />
      <article className="prose prose-neutral max-w-none prose-headings:scroll-mt-20 prose-img:rounded-lg">
        <h1 className="!mb-3">{post.meta.title}</h1>
        <p className="not-prose text-sm text-neutral-500">
          {post.meta.publishedAt}
          {post.meta.service ? ` · ${post.meta.service}` : ""}
          {post.meta.totalTime ? ` · 읽는 데 ${post.meta.totalTime.replace("PT", "").toLowerCase()}` : ""}
        </p>
        {post.meta.description && (
          <p className="not-prose mt-3 text-lg text-neutral-600 leading-relaxed">
            {post.meta.description}
          </p>
        )}
        <hr className="my-8 border-neutral-200" />
        <MDXRemote source={post.content} components={mdxComponents} />
      </article>
    </>
  );
}
