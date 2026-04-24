import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dict";
import { getAllPosts } from "@/lib/posts";
import { SiteJsonLd } from "@/components/SiteJsonLd";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const posts = await getAllPosts(locale);

  return (
    <div className="space-y-12">
      <SiteJsonLd
        locale={locale}
        siteName={dict.site.name}
        description={dict.site.description}
      />
      <section>
        <h1 className="text-3xl font-bold tracking-tight">
          {dict.site.name}
          <span className="block text-lg font-normal text-neutral-600 mt-2">
            {dict.site.tagline}
          </span>
        </h1>
        <p className="mt-4 text-neutral-600 leading-relaxed">{dict.site.description}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">{dict.blog.all}</h2>
        {posts.length === 0 ? (
          <p className="text-neutral-500 text-sm">{dict.blog.noPosts}</p>
        ) : (
          <ul className="space-y-6">
            {posts.slice(0, 5).map((post) => (
              <li key={post.slug} className="group">
                <Link href={`/${locale}/blog/${post.slug}`} className="block">
                  <h3 className="font-medium group-hover:underline">{post.title}</h3>
                  {post.description && (
                    <p className="text-neutral-600 text-sm mt-1">{post.description}</p>
                  )}
                  <p className="text-neutral-400 text-xs mt-2">
                    {post.publishedAt}
                    {post.service ? ` · ${post.service}` : ""}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
