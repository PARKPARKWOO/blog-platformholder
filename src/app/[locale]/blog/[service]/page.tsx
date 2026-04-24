import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { getService, isValidService, VISIBLE_SERVICES } from "@/lib/services";
import { getPostsByService } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export async function generateStaticParams() {
  const params: { locale: string; service: string }[] = [];
  for (const locale of ["ko", "en"]) {
    for (const service of VISIBLE_SERVICES) {
      params.push({ locale, service });
    }
  }
  return params;
}

export async function generateMetadata(
  { params }: PageProps<"/[locale]/blog/[service]">
): Promise<Metadata> {
  const { locale, service } = await params;
  if (!isValidLocale(locale) || !isValidService(service)) return {};
  const svc = getService(service);
  if (!svc) return {};
  const title = `${svc.name} — ${svc.tagline[locale]}`;
  const url = `https://blog.platformholder.site/${locale}/blog/${service}`;
  return {
    title,
    description: svc.description[locale],
    alternates: {
      canonical: `/${locale}/blog/${service}`,
      languages: {
        ko: `/ko/blog/${service}`,
        en: `/en/blog/${service}`,
      },
    },
    openGraph: {
      title,
      description: svc.description[locale],
      url,
      siteName: "platformholder",
      type: "website",
      locale,
    },
  };
}

export default async function ServiceIndex({
  params,
}: PageProps<"/[locale]/blog/[service]">) {
  const { locale, service } = await params;
  if (!isValidLocale(locale) || !isValidService(service)) notFound();
  const svc = getService(service);
  if (!svc) notFound();
  const posts = await getPostsByService(locale, service);

  return (
    <>
      <nav className="text-sm text-neutral-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-neutral-900">
          {locale === "ko" ? "홈" : "Home"}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${locale}/blog`} className="hover:text-neutral-900">
          {locale === "ko" ? "블로그" : "Blog"}
        </Link>
      </nav>

      <header
        className="rounded-xl p-6 mb-10"
        style={{ background: svc.bgSoft }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{svc.emoji}</span>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: svc.color }}>
            {svc.name}
          </h1>
        </div>
        <p className="text-base text-neutral-700 leading-relaxed">
          {svc.tagline[locale]}
        </p>
        <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
          {svc.description[locale]}
        </p>
        {svc.url && (
          <a
            href={svc.url}
            target="_blank"
            rel="noopener"
            className="inline-block mt-4 text-sm font-medium underline underline-offset-4"
            style={{ color: svc.color }}
          >
            {locale === "ko" ? "서비스 바로가기 →" : "Visit service →"}
          </a>
        )}
      </header>

      <section>
        <h2 className="text-lg font-semibold mb-6">
          {locale === "ko" ? `${svc.name} 글` : `${svc.name} posts`}
          <span className="ml-2 text-sm font-normal text-neutral-500">
            ({posts.length})
          </span>
        </h2>
        {posts.length === 0 ? (
          <p className="text-neutral-500 text-sm">
            {locale === "ko" ? "아직 글이 없어요." : "No posts yet."}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} locale={locale} showService={false} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
