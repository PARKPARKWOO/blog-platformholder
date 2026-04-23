import type { PostMeta } from "@/lib/posts";

const SITE_NAME = "platformholder";
const SITE_URL = "https://blog.platformholder.site";

interface Props {
  meta: PostMeta;
}

export function PostJsonLd({ meta }: Props) {
  const url = meta.canonical ?? `${SITE_URL}/${meta.locale}/blog/${meta.slug}`;
  const author = meta.author ?? "platformholder";

  const articleSchema = {
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
    ...(meta.type === "howto" && meta.howToSteps && meta.howToSteps.length > 0
      ? {
          totalTime: meta.totalTime,
          step: meta.howToSteps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.name,
            text: s.text,
          })),
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}
