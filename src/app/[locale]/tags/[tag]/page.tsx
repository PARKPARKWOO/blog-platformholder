import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, locales } from "@/lib/i18n";
import { getAllTags, getPostsByTag } from "@/lib/posts";

/**
 * 라우트 파라미터로 들어온 태그를 실제 태그 문자열로 되돌린다.
 *
 * ⚠️ `params.tag` 는 **퍼센트 인코딩된 채로** 들어온다. `generateStaticParams` 에는
 *    원본("실종강아지")을 넣지만, 렌더 시점에 받는 값은 URL 세그먼트 그대로다.
 *    이걸 디코딩하지 않으면 두 가지가 동시에 깨진다 —
 *      ① `p.tags.includes(tag)` 가 절대 매치되지 않아 **모든 한글 태그가 0건**이 된다
 *      ② h1 에 `%EC%8B%A4%EC%A2%85...` 이 그대로 노출된다
 *    2026-08-02 실측: ko 태그 100개 중 95개(한글 슬러그 전부)가 빈 페이지였다.
 *
 * ASCII 태그("KREAM")는 디코딩해도 그대로라 안전하고, 깨진 인코딩이 들어오면
 * `decodeURIComponent` 가 URIError 를 던지므로 원본을 그대로 쓴다.
 */
function decodeTag(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export async function generateStaticParams() {
  const params: { locale: string; tag: string }[] = [];
  for (const locale of locales) {
    const tags = await getAllTags(locale);
    for (const tag of tags) {
      params.push({ locale, tag });
    }
  }
  return params;
}

/**
 * 태그 페이지는 **색인하지 않는다**(`index: false, follow: true`).
 *
 * 글이 23편인데 태그는 로케일당 100개다. 대부분 글 1~2편짜리라 전형적인 thin content 이고,
 * 사이트맵에 넣으면 구글이 보는 URL 의 절대다수가 얇은 목록 페이지가 된다
 * (2026-08-02 실측: 사이트맵 260개 중 200개가 태그). 애드센스 심사에서 "가치 있는
 * 콘텐츠 부족"으로 잡히는 모양이 정확히 이것이다.
 *
 * `follow: true` 라 링크는 계속 따라가므로 글 발견 경로로서의 역할은 유지된다.
 * 같은 판단을 `blog/[service]` 의 준비 중 서비스에도 이미 적용해 두었다.
 */
export async function generateMetadata(
  { params }: PageProps<"/[locale]/tags/[tag]">
): Promise<Metadata> {
  const { locale, tag } = await params;
  if (!isValidLocale(locale)) return {};

  const decoded = decodeTag(tag);
  const posts = await getPostsByTag(locale, decoded);
  const path = `/${locale}/tags/${encodeURIComponent(decoded)}`;

  return {
    title: `#${decoded}`,
    description:
      locale === "ko"
        ? `${decoded} 태그가 붙은 글 ${posts.length}편.`
        : `${posts.length} post${posts.length === 1 ? "" : "s"} tagged ${decoded}.`,
    robots: { index: false, follow: true },
    alternates: { canonical: path },
  };
}

export default async function TagPage({ params }: PageProps<"/[locale]/tags/[tag]">) {
  const { locale, tag } = await params;
  if (!isValidLocale(locale)) notFound();

  const decoded = decodeTag(tag);
  const posts = await getPostsByTag(locale, decoded);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">#{decoded}</h1>
      <p className="text-sm text-neutral-500 mb-8">
        {posts.length} {posts.length === 1 ? "post" : "posts"}
      </p>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            {/* ⚠️ 링크는 반드시 `post.url` 을 쓴다. `/${locale}/blog/${post.slug}` 로 직접
                조립하면 **서비스 세그먼트가 빠져 전부 404** 다. 실제 경로는
                `/{locale}/blog/{service}/{slug}` 이고 그걸 만드는 곳이 posts.ts 의
                `buildUrl()` 하나뿐이다. 2026-08-02 이전까지 태그 페이지의 모든 글 링크가
                이 이유로 죽어 있었다. */}
            <Link href={post.url} className="group">
              <h2 className="font-medium group-hover:underline">{post.title}</h2>
              <p className="text-xs text-neutral-400 mt-1">
                {post.publishedAt}
                {post.service ? ` · ${post.service}` : ""}
              </p>
              {post.description && (
                <p className="text-neutral-600 text-sm mt-1">{post.description}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
