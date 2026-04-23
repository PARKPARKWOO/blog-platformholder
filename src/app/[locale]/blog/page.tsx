import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dict";
import { getAllPosts } from "@/lib/posts";

export default async function BlogIndex({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const posts = await getAllPosts(locale);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">{dict.nav.blog}</h1>
      {posts.length === 0 ? (
        <p className="text-neutral-500">{dict.blog.noPosts}</p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/${locale}/blog/${post.slug}`} className="block group">
                <h2 className="text-lg font-medium group-hover:underline">{post.title}</h2>
                <p className="text-xs text-neutral-400 mt-1">
                  {post.publishedAt}
                  {post.service ? ` · ${post.service}` : ""}
                  {post.tags.length > 0 ? ` · ${post.tags.join(", ")}` : ""}
                </p>
                {post.description && (
                  <p className="text-neutral-600 text-sm mt-2">{post.description}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
