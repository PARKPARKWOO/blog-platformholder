const SITE_URL = "https://blog.platformholder.site";
const PUBLISHER_URL = "https://platformholder.site";

export function SiteJsonLd({
  locale,
  siteName,
  description,
}: {
  locale: string;
  siteName: string;
  description: string;
}) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: PUBLISHER_URL,
    sameAs: [SITE_URL],
    description,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
    description,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: PUBLISHER_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
