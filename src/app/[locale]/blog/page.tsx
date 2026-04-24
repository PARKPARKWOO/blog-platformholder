import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dict";
import { getAllPosts, getPostsByService } from "@/lib/posts";
import { SERVICES, VISIBLE_SERVICES } from "@/lib/services";
import { PostCard } from "@/components/PostCard";

export async function generateMetadata(
  { params }: PageProps<"/[locale]/blog">
): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const title = locale === "ko" ? "블로그 · platformholder" : "Blog · platformholder";
  return {
    title,
    description: dict.site.description,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { ko: "/ko/blog", en: "/en/blog" },
    },
  };
}

export default async function BlogIndex({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  const servicesWithCount = await Promise.all(
    VISIBLE_SERVICES.map(async (slug) => {
      const posts = await getPostsByService(locale, slug);
      return { service: SERVICES[slug], count: posts.length };
    })
  );

  const latest = (await getAllPosts(locale)).slice(0, 6);

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">
          {locale === "ko" ? "블로그" : "Blog"}
        </h1>
        <p className="mt-2 text-neutral-600">{dict.site.description}</p>
      </header>

      <section>
        <h2 className="text-lg font-semibold mb-4">
          {locale === "ko" ? "서비스별 모음" : "Browse by service"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicesWithCount.map(({ service, count }) => (
            <Link
              key={service.slug}
              href={`/${locale}/blog/${service.slug}`}
              className="block rounded-xl p-5 transition hover:shadow-sm border border-neutral-200"
              style={{ background: service.bgSoft }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{service.emoji}</span>
                <h3 className="font-semibold" style={{ color: service.color }}>
                  {service.name}
                </h3>
                <span className="ml-auto text-xs text-neutral-500">
                  {count} {count === 1 ? "post" : "posts"}
                </span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {service.tagline[locale]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">
          {locale === "ko" ? "최근 글" : "Recent posts"}
        </h2>
        {latest.length === 0 ? (
          <p className="text-neutral-500">
            {locale === "ko" ? "아직 글이 없어요." : "No posts yet."}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {latest.map((p) => (
              <PostCard key={`${p.service}/${p.slug}`} post={p} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
