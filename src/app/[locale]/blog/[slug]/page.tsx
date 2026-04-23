import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { isValidLocale, locales } from "@/lib/i18n";
import { getAllPosts, getPost } from "@/lib/posts";
import { PostJsonLd } from "@/components/JsonLd";

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
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: {
      canonical: post.meta.canonical ?? `/${locale}/blog/${slug}`,
      languages: post.meta.hreflang,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      images: post.meta.ogImage ? [post.meta.ogImage] : undefined,
      type: "article",
      publishedTime: post.meta.publishedAt,
      locale,
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
      <article className="prose prose-neutral max-w-none prose-headings:scroll-mt-20">
        <h1>{post.meta.title}</h1>
        <p className="text-sm text-neutral-500 mt-0">
          {post.meta.publishedAt}
          {post.meta.service ? ` · ${post.meta.service}` : ""}
          {post.meta.totalTime ? ` · ${post.meta.totalTime}` : ""}
        </p>
        <div className="mt-8">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </>
  );
}
