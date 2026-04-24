import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dict";
import { getAllPosts } from "@/lib/posts";
import { SiteJsonLd } from "@/components/SiteJsonLd";
import { PostCard } from "@/components/PostCard";
import { SERVICES, VISIBLE_SERVICES } from "@/lib/services";

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
        <h2 className="text-lg font-semibold mb-4">
          {locale === "ko" ? "서비스" : "Services"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VISIBLE_SERVICES.map((slug) => {
            const svc = SERVICES[slug];
            return (
              <Link
                key={slug}
                href={`/${locale}/blog/${slug}`}
                className="block rounded-xl p-5 border border-neutral-200 transition hover:shadow-sm"
                style={{ background: svc.bgSoft }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{svc.emoji}</span>
                  <h3 className="font-semibold" style={{ color: svc.color }}>
                    {svc.name}
                  </h3>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {svc.tagline[locale]}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">{dict.blog.all}</h2>
        {posts.length === 0 ? (
          <p className="text-neutral-500 text-sm">{dict.blog.noPosts}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.slice(0, 6).map((post) => (
              <PostCard key={`${post.service}/${post.slug}`} post={post} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
