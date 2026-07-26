import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { isValidLocale } from "@/lib/i18n";
import {
  getService,
  isPreparing,
  isValidService,
  PREPARING_SERVICES,
  VISIBLE_SERVICES,
  type ServiceMeta,
} from "@/lib/services";
import { getPostsByService } from "@/lib/posts";
import { isKakaoChatEnabled, kakaoChatUrl } from "@/lib/publisher";
import { PostCard } from "@/components/PostCard";

export async function generateStaticParams() {
  const params: { locale: string; service: string }[] = [];
  for (const locale of ["ko", "en"]) {
    // 준비 중 서비스는 네비·sitemap 에는 없지만 링크로 접근하므로 페이지는 함께 생성한다
    for (const service of [...VISIBLE_SERVICES, ...PREPARING_SERVICES]) {
      params.push({ locale, service });
    }
  }
  return params;
}

export async function generateMetadata(
  { params }: PageProps<"/[locale]/blog/[service]">
): Promise<Metadata> {
  const { locale, service } = await params;
  if (!isValidLocale(locale) || !isValidService(service)) return {};
  const svc = getService(service);
  if (!svc) return {};
  const title = `${svc.name} — ${svc.tagline[locale]}`;
  const url = `https://blog.platformholder.site/${locale}/blog/${service}`;
  return {
    title,
    description: svc.description[locale],
    // 글 0개인 준비 중 서비스 인덱스는 thin content 라 색인하지 않는다.
    // 첫 글이 발행되면 status 를 live 로 바꿔 색인 대상으로 되돌린다.
    ...(isPreparing(svc)
      ? { robots: { index: false, follow: true } }
      : {}),
    alternates: {
      canonical: `/${locale}/blog/${service}`,
      languages: {
        ko: `/ko/blog/${service}`,
        en: `/en/blog/${service}`,
      },
    },
    openGraph: {
      title,
      description: svc.description[locale],
      url,
      siteName: "platformholder",
      type: "website",
      locale,
    },
  };
}

export default async function ServiceIndex({
  params,
}: PageProps<"/[locale]/blog/[service]">) {
  const { locale, service } = await params;
  if (!isValidLocale(locale) || !isValidService(service)) notFound();
  const svc = getService(service);
  if (!svc) notFound();
  const preparing = isPreparing(svc);
  const posts = preparing ? [] : await getPostsByService(locale, service);

  return (
    <>
      <nav className="text-sm text-neutral-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-neutral-900">
          {locale === "ko" ? "홈" : "Home"}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${locale}/blog`} className="hover:text-neutral-900">
          {locale === "ko" ? "블로그" : "Blog"}
        </Link>
      </nav>

      <header
        className="rounded-xl p-6 mb-10"
        style={{ background: svc.bgSoft }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{svc.emoji}</span>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: svc.color }}>
            {svc.name}
          </h1>
          {preparing && (
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full border"
              style={{ color: svc.color, borderColor: `${svc.color}55` }}
            >
              {locale === "ko" ? "준비 중" : "In development"}
            </span>
          )}
        </div>
        <p className="text-base text-neutral-700 leading-relaxed">
          {svc.tagline[locale]}
        </p>
        <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
          {svc.description[locale]}
        </p>
        {svc.url && (
          <a
            href={svc.url}
            target="_blank"
            rel="noopener"
            className="inline-block mt-4 text-sm font-medium underline underline-offset-4"
            style={{ color: svc.color }}
          >
            {locale === "ko" ? "서비스 바로가기 →" : "Visit service →"}
          </a>
        )}
      </header>

      {preparing ? (
        <PreparingNotice svc={svc} locale={locale} />
      ) : (
        <section>
          <h2 className="text-lg font-semibold mb-6">
            {locale === "ko" ? `${svc.name} 글` : `${svc.name} posts`}
            <span className="ml-2 text-sm font-normal text-neutral-500">
              ({posts.length})
            </span>
          </h2>
          {posts.length === 0 ? (
            <p className="text-neutral-500 text-sm">
              {locale === "ko" ? "아직 글이 없어요." : "No posts yet."}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} locale={locale} showService={false} />
              ))}
            </div>
          )}
        </section>
      )}

      <SubProductList svc={svc} locale={locale} />
    </>
  );
}

/** 글이 0개인 준비 중 서비스에 글 목록 대신 보여주는 안내 */
function PreparingNotice({ svc, locale }: { svc: ServiceMeta; locale: Locale }) {
  // 다른 CTA 와 동일하게 `/r/kakao` 리다이렉트를 거친다 (UTM 이 우리 로그에 남는다).
  // 링크 미확보 시에는 null → 링크 대신 "준비 중" 문구만 보여준다.
  const openChat = isKakaoChatEnabled()
    ? kakaoChatUrl({
        medium: "service-index",
        campaign: `${svc.slug}-launch`,
      })
    : null;

  return (
    <section className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
      <h2 className="text-lg font-semibold mb-3">
        {locale === "ko" ? "아직 준비 중이에요" : "Still in development"}
      </h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {locale === "ko"
          ? `${svc.name} 은(는) 개발 중이라 아직 이용할 수 없고, 블로그에 실을 글도 준비되지 않았습니다.`
          : `${svc.name} is still in development — it is not available yet, and there are no posts here so far.`}
      </p>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {locale === "ko"
          ? "개발 기록과 런칭 소식은 준비되는 대로 이 페이지에 올립니다."
          : "Development notes and launch news will be posted on this page as they are ready."}
      </p>
      {openChat ? (
        <a
          href={openChat}
          target="_blank"
          rel="noopener"
          className="inline-block mt-4 text-sm font-medium underline underline-offset-4"
          style={{ color: svc.color }}
        >
          {locale === "ko"
            ? "오픈채팅으로 런칭 알림 받기 →"
            : "Get launch updates on KakaoTalk open chat →"}
        </a>
      ) : (
        <p className="mt-4 text-sm text-neutral-500">
          {locale === "ko"
            ? "런칭 알림용 오픈채팅방은 준비 중입니다. 열리면 이 자리에 링크를 올릴게요."
            : "A KakaoTalk open chat for launch updates is being set up — the link will appear here."}
        </p>
      )}
    </section>
  );
}

/** 부모 서비스에 딸린 하위 프로덕트 소개 (별도 서비스 페이지를 만들지 않는다) */
function SubProductList({ svc, locale }: { svc: ServiceMeta; locale: Locale }) {
  const items = svc.subProducts ?? [];
  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-lg font-semibold mb-4">
        {locale === "ko" ? "함께 만들고 있는 것" : "Also part of this service"}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((sub) => (
          <div
            key={sub.name}
            className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold" style={{ color: svc.color }}>
                {sub.name}
              </h3>
              {sub.status === "preparing" && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-neutral-300 text-neutral-500 dark:border-neutral-700">
                  {locale === "ko" ? "준비 중" : "In development"}
                </span>
              )}
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {sub.tagline[locale]}
            </p>
            {/* url 은 접속되는 주소가 확인된 경우에만 채운다 — 죽은 링크 노출 금지 */}
            {sub.url && (
              <a
                href={sub.url}
                target="_blank"
                rel="noopener"
                className="inline-block mt-3 text-sm font-medium underline underline-offset-4"
                style={{ color: svc.color }}
              >
                {locale === "ko" ? "바로가기 →" : "Open →"}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
