import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

function getLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((entry) => entry.split(";")[0].trim().toLowerCase());
    for (const lang of preferred) {
      if (lang.startsWith("ko")) return "ko";
      if (lang.startsWith("en")) return "en";
    }
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (hasLocale) return;

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next|api|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|txt|xml|json|woff|woff2|ttf|otf)).*)",
  ],
};
