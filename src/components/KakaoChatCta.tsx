import { getDictionary } from "@/lib/dict";
import { defaultLocale, isValidLocale } from "@/lib/i18n";
import { isKakaoChatEnabled, kakaoChatUrl } from "@/lib/publisher";

/**
 * `card`    — 제목 + 설명 + 버튼. 글 하단 마무리용 (기본값)
 * `compact` — 한 줄 + 작은 버튼. 본문 중간 삽입용
 */
export type KakaoChatCtaVariant = "card" | "compact";

export interface KakaoChatCtaProps {
  /** 문구 로케일. MDX 에서 생략하면 기본 로케일(ko)로 렌더된다. */
  locale?: string;
  variant?: KakaoChatCtaVariant;
  /** utm_campaign — 캠페인 슬러그 */
  campaign?: string;
  /** utm_content — 보통 글 slug */
  content?: string;
  /** utm_source. 기본 `blog` */
  source?: string;
  /** utm_medium. 기본 `post` */
  medium?: string;
}

// 카카오 브랜드 옐로우 위에는 반드시 어두운 라벨색을 쓴다 (light/dark 양쪽 동일).
const BRAND_YELLOW = "#FEE500";
const BRAND_LABEL = "#191919";

const buttonBase =
  "inline-flex items-center gap-1.5 rounded-lg font-semibold no-underline transition " +
  "hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100";

/**
 * 글 본문·하단에 수동으로 넣는 오픈채팅 인라인 CTA.
 *
 * 글마다 자동 삽입하지 않는다. 글 성격에 맞을 때만 직접 배치한다.
 * 오픈채팅 링크가 아직 없으면 아무것도 렌더하지 않는다.
 */
export async function KakaoChatCta({
  locale,
  variant = "card",
  campaign,
  content,
  source = "blog",
  medium = "post",
}: KakaoChatCtaProps) {
  if (!isKakaoChatEnabled()) return null;

  const resolved = locale && isValidLocale(locale) ? locale : defaultLocale;
  const dict = await getDictionary(resolved);
  const t = dict.kakaoChat;
  const href = kakaoChatUrl({ source, medium, campaign, content });

  const link = (sizing: string) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.ariaLabel}
      className={`${buttonBase} ${sizing}`}
      style={{ backgroundColor: BRAND_YELLOW, color: BRAND_LABEL }}
    >
      <span aria-hidden>💬</span>
      {t.button}
    </a>
  );

  if (variant === "compact") {
    return (
      <div className="not-prose my-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          {t.ctaTitle}
        </p>
        {link("px-3 py-1.5 text-xs")}
      </div>
    );
  }

  return (
    <aside className="not-prose my-8 rounded-xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        {t.ctaTitle}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {t.ctaBody}
      </p>
      <div className="mt-4">{link("px-4 py-2.5 text-sm")}</div>
    </aside>
  );
}
