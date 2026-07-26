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
    // `r/` = 마케팅 단축 링크(`/r/[slug]`). 로케일 prefix 가 없는 게 정상이므로
    // 로케일 리다이렉트 대상에서 제외한다. 제외하지 않으면 `/r/kakao` 가
    // `/ko/r/kakao` 로 넘어가 404 가 된다.
    "/((?!_next|api|r/|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|txt|xml|json|woff|woff2|ttf|otf)).*)",
  ],
};
