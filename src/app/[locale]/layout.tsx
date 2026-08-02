import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dict";
import { SERVICES, VISIBLE_SERVICES } from "@/lib/services";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import AdSenseScript from "@/components/AdSenseScript";
import {
  CONTACT_LINKS,
  isKakaoChatEnabled,
  kakaoChatUrl,
} from "@/lib/publisher";

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
      other: {
        "naver-site-verification":
          process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION ??
          "a2423298e713e77c08b20501163dfa6510b4355c",
      },
    },
    other: {
      "alternate-rss": `https://blog.platformholder.site/${locale}/feed.xml`,
      // AdSense 소유 확인. 로더 스크립트를 afterInteractive 로 내렸기 때문에
      // (LCP 보호) 크롤러가 스크립트를 못 볼 수 있어, 비용 0 인 메타 태그를 함께 둔다.
      // 미설정이면 아래에서 통째로 제외한다 — 빈 값을 내보내면 형식 오류로 읽힌다.
      ...(process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim()
        ? { "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_CLIENT.trim() }
        : {}),
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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${dict.site.name} — ${dict.site.tagline}`}
          href={`/${locale}/feed.xml`}
        />
        {/* 애드센스 로더는 반드시 여기(서버 렌더 <head>) 에 있어야 한다.
            body 끝에서 next/script 로 늦게 불러오면 서버가 보내는 HTML 에는
            태그가 아예 없고, 그게 사이트 심사가 "준비 중"에서 멈춘 원인이었다.
            자세한 근거는 components/AdSenseScript.tsx 주석. */}
        <AdSenseScript />
      </head>
      <body className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 antialiased">
        <ThemeProvider>
        <header className="border-b border-neutral-200 dark:border-neutral-800">
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
                href={`/${locale}/search`}
                aria-label="Search"
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                🔍
              </Link>
              <Link
                href={locale === "ko" ? "/en" : "/ko"}
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                {locale === "ko" ? "EN" : "KO"}
              </Link>
              <ThemeToggle />
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
        <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>
        <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-20">
          {/* 전 서비스 공통 소통 채널. 링크 미확보 시 렌더하지 않는다 (publisher.ts 참고) */}
          {isKakaoChatEnabled() && (
            <div className="max-w-5xl mx-auto px-4 pt-8">
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900">
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {dict.kakaoChat.footerTitle}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {dict.kakaoChat.footerBody}
                  </p>
                </div>
                <a
                  href={kakaoChatUrl({ medium: "footer", campaign: "global" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={dict.kakaoChat.ariaLabel}
                  className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100"
                  style={{ backgroundColor: "#FEE500", color: "#191919" }}
                >
                  <span aria-hidden>💬</span>
                  {dict.kakaoChat.button}
                </a>
              </div>
            </div>
          )}
          <div className="max-w-5xl mx-auto px-4 py-8 grid gap-6 sm:grid-cols-2 text-sm text-neutral-500 dark:text-neutral-400">
            <div>
              <p className="font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {dict.footer.built}
              </p>
              <p className="text-xs leading-relaxed">
                {locale === "ko"
                  ? "컨택하고 싶으시면 아래로 연락주세요."
                  : "Want to get in touch? Reach me below."}
              </p>
            </div>
            <div className="flex flex-wrap items-start gap-x-5 gap-y-2 sm:justify-end">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.aria}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="hover:text-neutral-900 dark:hover:text-neutral-100 transition"
                >
                  {link.display}
                </a>
              ))}
              <a
                href={`/${locale}/feed.xml`}
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition"
              >
                RSS
              </a>
            </div>
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
