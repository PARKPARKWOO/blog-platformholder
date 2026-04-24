import { isValidLocale, locales, type Locale } from "@/lib/i18n";
import { getPostsByService } from "@/lib/posts";
import {
  isValidService,
  VISIBLE_SERVICES,
  SERVICES,
  type ServiceSlug,
} from "@/lib/services";
import { buildRss, SITE_URL } from "@/lib/rss";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const out: { locale: string; service: string }[] = [];
  for (const locale of locales) {
    for (const service of VISIBLE_SERVICES) {
      out.push({ locale, service });
    }
  }
  return out;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string; service: string }> }
) {
  const { locale: rawLocale, service: rawService } = await params;
  if (!isValidLocale(rawLocale) || !isValidService(rawService)) {
    return new Response("Not Found", { status: 404 });
  }
  const locale = rawLocale as Locale;
  const service = rawService as ServiceSlug;
  const svc = SERVICES[service];
  const posts = await getPostsByService(locale, service);

  const xml = buildRss(
    {
      title: `${svc.name} — ${svc.tagline[locale]}`,
      description: svc.description[locale],
      link: `${SITE_URL}/${locale}/blog/${service}`,
      selfLink: `${SITE_URL}/${locale}/blog/${service}/feed.xml`,
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
