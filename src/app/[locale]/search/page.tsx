import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, locales } from "@/lib/i18n";
import { SearchBox } from "@/components/SearchBox";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: PageProps<"/[locale]/search">
): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const title = locale === "ko" ? "검색 · platformholder" : "Search · platformholder";
  return {
    title,
    alternates: {
      canonical: `/${locale}/search`,
      languages: { ko: "/ko/search", en: "/en/search" },
    },
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ params }: PageProps<"/[locale]/search">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">
        {locale === "ko" ? "검색" : "Search"}
      </h1>
      <SearchBox locale={locale} />
    </div>
  );
}
