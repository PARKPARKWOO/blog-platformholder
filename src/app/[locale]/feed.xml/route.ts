import { isValidLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dict";
import { getAllPosts } from "@/lib/posts";
import { buildRss, SITE_URL } from "@/lib/rss";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) {
    return new Response("Not Found", { status: 404 });
  }
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const posts = await getAllPosts(locale);

  const xml = buildRss(
    {
      title: `${dict.site.name} — ${dict.site.tagline}`,
      description: dict.site.description,
      link: `${SITE_URL}/${locale}`,
      selfLink: `${SITE_URL}/${locale}/feed.xml`,
      language: locale,
    },
    posts
  );

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
