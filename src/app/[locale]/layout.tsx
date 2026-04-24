import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dict";
import { SERVICES, VISIBLE_SERVICES } from "@/lib/services";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: LayoutProps<"/[locale]">
): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const fullTitle = `${dict.site.name} — ${dict.site.tagline}`;
  const url = `https://blog.platformholder.site/${locale}`;
  return {
    metadataBase: new URL("https://blog.platformholder.site"),
    title: { default: fullTitle, template: `%s · ${dict.site.name}` },
    description: dict.site.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ko: "/ko",
        en: "/en",
      },
    },
    openGraph: {
      title: fullTitle,
      description: dict.site.description,
      url,
      siteName: dict.site.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: dict.site.description,
    },
    robots: { index: true, follow: true },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      other: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION
        ? { "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION }
        : undefined,
    },
    other: {
      "alternate-rss": `https://blog.platformholder.site/${locale}/feed.xml`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${dict.site.name} — ${dict.site.tagline}`}
          href={`/${locale}/feed.xml`}
        />
      </head>
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <header className="border-b border-neutral-200">
          <nav className="max-w-3xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3 text-sm">
            <Link href={`/${locale}`} className="font-semibold">
              {dict.site.name}
            </Link>
            <div className="flex items-center gap-4">
              <Link href={`/${locale}/blog`} className="hover:underline">
                {dict.nav.blog}
              </Link>
              <Link href={`/${locale}/tags`} className="hover:underline">
                {dict.nav.tags}
              </Link>
              <Link
                href={locale === "ko" ? "/en" : "/ko"}
                className="text-neutral-500 hover:text-neutral-900"
              >
                {locale === "ko" ? "EN" : "KO"}
              </Link>
            </div>
          </nav>
          <nav className="max-w-3xl mx-auto px-4 pb-3 flex flex-wrap gap-2 text-xs">
            {VISIBLE_SERVICES.map((slug) => {
              const svc = SERVICES[slug];
              return (
                <Link
                  key={slug}
                  href={`/${locale}/blog/${slug}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border transition hover:shadow-sm"
                  style={{
                    background: svc.bgSoft,
                    color: svc.color,
                    borderColor: `${svc.color}33`,
                  }}
                >
                  <span>{svc.emoji}</span>
                  <span className="font-medium">{svc.name}</span>
                </Link>
              );
            })}
          </nav>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-10">{children}</main>
        <footer className="border-t border-neutral-200 mt-20">
          <div className="max-w-3xl mx-auto px-4 py-6 text-sm text-neutral-500">
            {dict.footer.built}
          </div>
        </footer>
      </body>
    </html>
  );
}
