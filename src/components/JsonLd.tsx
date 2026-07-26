import type { PostMeta } from "@/lib/posts";
import { getService } from "@/lib/services";
import { PUBLISHER } from "@/lib/publisher";

const SITE_NAME = "platformholder";
const SITE_URL = "https://blog.platformholder.site";

interface Props {
  meta: PostMeta;
}

export function PostJsonLd({ meta }: Props) {
  const url = meta.canonical ?? `${SITE_URL}${meta.url}`;
  const author = meta.author ?? PUBLISHER.name;
  const svc = getService(meta.service);

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": meta.type === "howto" ? "HowTo" : "Article",
    "@id": `${url}#article`,
    name: meta.title,
    headline: meta.title,
    description: meta.description,
    image: meta.ogImage ? [meta.ogImage] : undefined,
    datePublished: meta.publishedAt || undefined,
    dateModified: meta.updatedAt || meta.publishedAt || undefined,
    author: {
      "@type": "Person",
      name: author,
      // 게스트 저자 글에 퍼블리셔 프로필을 붙이지 않는다
      url: author === PUBLISHER.name ? PUBLISHER.linkedin : undefined,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: "https://platformholder.site",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: meta.locale,
    isAccessibleForFree: true,
    articleSection: svc?.name ?? meta.service,
    keywords: meta.tags.length > 0 ? meta.tags.join(", ") : undefined,
    wordCount: meta.wordCount,
    abstract: meta.keyTakeaways?.join(" "),
  };

  if (meta.type === "howto" && meta.howToSteps && meta.howToSteps.length > 0) {
    articleSchema.totalTime = meta.totalTime;
    articleSchema.step = meta.howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    }));
  }

  const faqSchema =
    meta.faq && meta.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          inLanguage: meta.locale,
          isPartOf: { "@id": url },
          mainEntity: meta.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: meta.locale === "ko" ? "홈" : "Home",
        item: `${SITE_URL}/${meta.locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: meta.locale === "ko" ? "블로그" : "Blog",
        item: `${SITE_URL}/${meta.locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: svc?.name ?? meta.service,
        item: `${SITE_URL}/${meta.locale}/blog/${meta.service}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: meta.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbSchema) }}
      />
    </>
  );
}

// frontmatter 값이 그대로 들어가므로 `<` 를 이스케이프해 script 조기 종료를 막는다
export function ldJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
