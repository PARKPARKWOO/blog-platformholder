import type { PostMeta } from "@/lib/posts";
import { getService } from "@/lib/services";

const SITE_NAME = "platformholder";
const SITE_URL = "https://blog.platformholder.site";

interface Props {
  meta: PostMeta;
}

export function PostJsonLd({ meta }: Props) {
  const url = meta.canonical ?? `${SITE_URL}${meta.url}`;
  const author = meta.author ?? "platformholder";
  const svc = getService(meta.service);

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": meta.type === "howto" ? "HowTo" : "Article",
    name: meta.title,
    headline: meta.title,
    description: meta.description,
    image: meta.ogImage ? [meta.ogImage] : undefined,
    datePublished: meta.publishedAt || undefined,
    dateModified: meta.publishedAt || undefined,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: "https://platformholder.site",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: meta.locale,
  };

  if (meta.type === "howto" && meta.howToSteps && meta.howToSteps.length > 0) {
    articleSchema.totalTime = meta.totalTime;
    articleSchema.step = meta.howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    }));
  } else {
    articleSchema.articleSection = svc?.name ?? meta.service;
    articleSchema.keywords = meta.tags.join(", ");
  }

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
