import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, locales } from "@/lib/i18n";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export async function generateStaticParams() {
  const params: { locale: string; tag: string }[] = [];
  for (const locale of locales) {
    const tags = await getAllTags(locale);
    for (const tag of tags) {
      params.push({ locale, tag });
    }
  }
  return params;
}

export default async function TagPage({ params }: PageProps<"/[locale]/tags/[tag]">) {
  const { locale, tag } = await params;
  if (!isValidLocale(locale)) notFound();
  const posts = await getPostsByTag(locale, tag);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">#{tag}</h1>
      <p className="text-sm text-neutral-500 mb-8">
        {posts.length} {posts.length === 1 ? "post" : "posts"}
      </p>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/${locale}/blog/${post.slug}`} className="group">
              <h2 className="font-medium group-hover:underline">{post.title}</h2>
              <p className="text-xs text-neutral-400 mt-1">
                {post.publishedAt}
                {post.service ? ` · ${post.service}` : ""}
              </p>
              {post.description && (
                <p className="text-neutral-600 text-sm mt-1">{post.description}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
