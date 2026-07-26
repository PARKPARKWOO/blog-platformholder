import { isValidLocale, locales } from "@/lib/i18n";
import { getAllPosts, getPost } from "@/lib/posts";
import { isValidService } from "@/lib/services";
import { buildPostMarkdown, canonicalUrlOf } from "@/app/_geo/markdown";

/**
 * /{locale}/blog/{service}/{slug}/raw — 글 1건의 마크다운 원문.
 *
 * AI 크롤러와 사람이 HTML 을 파싱하지 않고 원문을 그대로 가져갈 수 있게 한다.
 * 주소는 글 HTML 주소 뒤에 `/raw` 를 붙인 형태라 서로 변환하기 쉽다.
 *
 * 경로에 로케일이 먼저 오는 이유: src/app/proxy.ts 가 로케일 없는 경로를
 * `/{locale}` 로 리다이렉트하기 때문에, `/raw/...` 로 시작하면 리다이렉트를 맞는다.
 */
export const dynamic = "force-static";

export async function generateStaticParams() {
  const params: { locale: string; service: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const post of await getAllPosts(locale)) {
      params.push({ locale, service: post.service, slug: post.slug });
    }
  }
  return params;
}

const notFound = () =>
  new Response("Not Found\n", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string; service: string; slug: string }> }
) {
  const { locale, service, slug } = await params;
  if (!isValidLocale(locale) || !isValidService(service)) return notFound();

  const post = await getPost(locale, service, slug);
  if (!post) return notFound();

  const canonical = canonicalUrlOf(post.meta);
  const body = buildPostMarkdown(post.meta, post.content, { heading: "#" }) + "\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      // 원문이 HTML 글과 중복 색인되지 않도록 canonical 을 HTTP 헤더로 알린다
      Link: `<${canonical}>; rel="canonical"`,
    },
  });
}
