import sitemap from "@/app/sitemap";

/**
 * /sitemap-naver.xml — 네이버 서치어드바이저 전용 사이트맵
 *
 * 기본 `/sitemap.xml` 은 URL 마다 `xmlns:xhtml` + `<xhtml:link rel="alternate" hreflang=...>`
 * 를 실어 ko·en 대응 관계를 선언한다. sitemaps.org 규격상 유효하고 구글은 이 신호를 쓰지만,
 * 네이버 서치어드바이저는 확장 네임스페이스가 붙은 사이트맵을
 * "사이트맵 형식이 올바르지 않습니다" 로 거부한다.
 *
 * hreflang 을 버리면 구글 쪽 다국어 신호가 사라지므로, 원본은 그대로 두고
 * **확장 없는 코어 사이트맵**을 따로 낸다. URL 목록은 `sitemap.ts` 를 그대로 재사용하므로
 * 두 파일이 어긋날 일이 없다 — 글이 늘면 양쪽에 동시에 반영된다.
 *
 * 네이버 서치어드바이저 제출 시에는 도메인이 접두사로 고정돼 있으므로
 * 경로만 입력한다: `sitemap-naver.xml`
 */
export const dynamic = "force-static";

const XML_ESCAPE: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => XML_ESCAPE[c] ?? c);
}

/** `string | Date` 를 사이트맵이 받는 `YYYY-MM-DD` 로 맞춘다 */
function toW3CDate(value: string | Date | undefined): string | undefined {
  if (!value) return undefined;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime())
      ? undefined
      : value.toISOString().slice(0, 10);
  }
  // 이미 YYYY-MM-DD 거나 ISO 타임스탬프 — 앞 10자가 곧 날짜다
  const trimmed = value.trim();
  return /^\d{4}-\d{2}-\d{2}/.test(trimmed) ? trimmed.slice(0, 10) : undefined;
}

export async function GET(): Promise<Response> {
  const entries = await sitemap();

  const urls = entries
    .map((entry) => {
      const parts = [`    <loc>${escapeXml(entry.url)}</loc>`];

      const lastmod = toW3CDate(entry.lastModified);
      if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
      if (entry.changeFrequency)
        parts.push(`    <changefreq>${entry.changeFrequency}</changefreq>`);
      if (typeof entry.priority === "number")
        parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);

      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");

  // 확장 네임스페이스 없음 — 코어 sitemaps.org 0.9 스키마만 쓴다
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
