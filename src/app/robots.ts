import type { MetadataRoute } from "next";

const SITE = "https://blog.platformholder.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 일반 검색엔진
      { userAgent: "*", allow: "/" },
      // 네이버 검색봇 (명시적 허용으로 일부 환경에서 크롤링 개선)
      { userAgent: "Yeti", allow: "/" },
      { userAgent: "Yeti-Mobile", allow: "/" },
      { userAgent: "NaverBot", allow: "/" },
      // 다음 검색봇
      { userAgent: "Daumoa", allow: "/" },
      // Bing
      { userAgent: "bingbot", allow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
