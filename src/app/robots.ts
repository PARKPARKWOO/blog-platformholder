import type { MetadataRoute } from "next";

const SITE = "https://blog.platformholder.site";

/**
 * AI 검색·학습 크롤러 명시 허용 목록.
 *
 * `User-agent: *` 만으로도 규격상 전부 통과하지만, 자기 UA 그룹이 있으면
 * 그 그룹만 읽고 와일드카드는 무시하는 크롤러가 있다. 그래서 봇별로
 * allow 그룹을 따로 만들어 둔다. 차단(disallow) 규칙은 두지 않는다.
 *
 * 그룹 구분은 운영사 기준이며, 각 봇의 실제 동작(학습용/검색 인덱싱용/
 * 사용자 요청 시 단건 조회용)은 운영사 문서를 따른다.
 */
const AI_CRAWLERS: string[] = [
  // OpenAI — 학습 / 검색 인덱싱 / 사용자 요청 단건 조회
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google — Gemini 학습·grounding 옵트인 토큰 (Googlebot 은 `*` 로 이미 허용)
  "Google-Extended",
  // Apple — Siri·Spotlight 및 Apple Intelligence 학습 옵트인 토큰
  "Applebot",
  "Applebot-Extended",
  // Common Crawl — 여러 모델의 공개 학습 코퍼스 원천
  "CCBot",
  // Meta
  "meta-externalagent",
  // Amazon
  "Amazonbot",
  // ByteDance
  "Bytespider",
  // 기타 AI 검색·수집 서비스
  "cohere-ai",
  "DuckAssistBot",
  "YouBot",
  "Diffbot",
  "Timpibot",
];

/*
 * AI 에이전트용 진입점 (robots.txt 규격에는 이 둘을 가리키는 필드가 없어 주석으로 남긴다)
 *
 *   /llms.txt       — 사이트·서비스·전체 글 목록 요약 (text/plain, 빌드 시 정적 생성)
 *   /llms-full.txt  — 모든 글의 메타데이터 + 본문 마크다운 전문 번들
 *   /{locale}/blog/{service}/{slug}/raw
 *                   — 글 1건의 마크다운 원문 (text/markdown). HTML 주소 뒤에 `/raw`
 *
 * 위 경로는 전부 이 robots.txt 에서 허용 상태다. sitemap.xml 에는 넣지 않는다
 * (원문이 HTML 글과 중복 색인되는 것을 피하기 위함).
 * 전체 목록은 /llms.txt 안에서 확인할 수 있고, raw 응답에는 원문 HTML 을 가리키는
 * `Link: <...>; rel="canonical"` 헤더가 붙는다.
 */
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
      // AI 검색·학습 크롤러 (전부 명시적 allow)
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
