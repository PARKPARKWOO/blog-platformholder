import { PUBLISHER, isKakaoChatEnabled } from "@/lib/publisher";
import { ldJson } from "./JsonLd";

const SITE_URL = "https://blog.platformholder.site";
const PUBLISHER_URL = "https://platformholder.site";
const ORG_ID = `${PUBLISHER_URL}/#organization`;

export function SiteJsonLd({
  locale,
  siteName,
  description,
}: {
  locale: string;
  siteName: string;
  description: string;
}) {
  // 구조화 데이터에는 리다이렉트(`/r/kakao`)가 아니라 실제 컨택 엔드포인트를 넣는다.
  // 링크 미확보 시에는 키 자체를 빼서 빈 url 이 노출되지 않게 한다.
  const contactPoint: Record<string, unknown> = {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: PUBLISHER.email,
    availableLanguage: ["ko", "en"],
    ...(isKakaoChatEnabled() ? { url: PUBLISHER.kakaoOpenChat } : {}),
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteName,
    url: PUBLISHER_URL,
    sameAs: [SITE_URL, PUBLISHER.linkedin],
    description,
    contactPoint: [contactPoint],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/${locale}#website`,
    name: siteName,
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
    description,
    publisher: {
      "@id": ORG_ID,
      "@type": "Organization",
      name: siteName,
      url: PUBLISHER_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(website) }}
      />
    </>
  );
}
