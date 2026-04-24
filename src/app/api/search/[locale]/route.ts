import { NextResponse } from "next/server";
import { isValidLocale, locales, type Locale } from "@/lib/i18n";
import { getAllPosts } from "@/lib/posts";
import { SERVICES } from "@/lib/services";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return new NextResponse("Not Found", { status: 404 });
  const locale = raw as Locale;
  const posts = await getAllPosts(locale);
  const index = posts.map((p) => ({
    title: p.title,
    description: p.description ?? "",
    tags: p.tags,
    service: p.service,
    serviceName: SERVICES[p.service].name,
    url: p.url,
    publishedAt: p.publishedAt,
  }));
  return NextResponse.json(index, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
  });
}
