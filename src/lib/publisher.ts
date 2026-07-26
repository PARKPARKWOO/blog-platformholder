// 퍼블리셔 컨택 정보 (블로그 footer · about 등에서 사용)
// 노출돼도 무방한 공개 정보만 (개인 휴대폰·집 주소 등은 절대 X)

export interface ContactLink {
  label: string;
  href: string;
  display: string;
  aria: string;
  external?: boolean;
}

/**
 * 카카오 오픈채팅 초대 링크. 전 서비스 공통 마케팅·문의·런칭 알림 채널이다.
 * 공개 초대 링크이므로 저장소에 두어도 무방하다 (비밀값 아님).
 *
 * 값이 비어 있으면 오픈채팅 관련 UI 가 전부 렌더되지 않는다.
 *   - footer 채널 블록 · `CONTACT_LINKS` 항목 · 본문 `<KakaoChatCta />` → 렌더 안 함
 *   - `/r/kakao` → 404
 * 존재하지 않는 링크로 유도하지 않기 위한 의도적 동작이며, 방을 닫으면 이 상수를 비우면 된다.
 *
 * 배포 환경변수 `NEXT_PUBLIC_KAKAO_OPEN_CHAT` 로 덮어쓸 수 있다.
 * ⚠️ `NEXT_PUBLIC_` 접두사라 빌드 타임에 인라인된다 — 환경변수만 바꾸고 재배포하지 않으면 반영되지 않는다.
 */
const KAKAO_OPEN_CHAT_FALLBACK = "https://open.kakao.com/o/sfs44IFi";

/**
 * 오픈채팅 URL 을 검증한다. 검증을 통과하지 못하면 빈 문자열(= 기능 비활성)을 반환한다.
 *
 * 문자열 `"undefined"` 를 명시적으로 걸러내는 이유: 값이 채워지지 않은 채로 템플릿이 전개되면
 * 그대로 href 에 박혀 모든 페이지에 깨진 외부 링크가 생기고, `SiteJsonLd` 의 ContactPoint.url 에도
 * 유효하지 않은 URL 이 들어간다.
 */
function normalizeOpenChatUrl(raw: string | undefined): string {
  const value = raw?.trim() ?? "";
  if (!value || value === "undefined" || value === "null") return "";

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return "";
  }
  if (parsed.protocol !== "https:") return "";
  if (parsed.hostname !== "open.kakao.com") return "";
  return parsed.toString();
}

export const PUBLISHER = {
  name: "platformholder",
  email: "wy9295@naver.com",
  linkedin: "https://www.linkedin.com/in/wooyoung-park-a42179263",
  kakaoOpenChat: normalizeOpenChatUrl(
    process.env.NEXT_PUBLIC_KAKAO_OPEN_CHAT ?? KAKAO_OPEN_CHAT_FALLBACK
  ),
};

/** 오픈채팅 단축 링크 경로. `marketing/stack.md` 의 `/r/[slug]` 자체 구현 방침을 따른다. */
export const KAKAO_CHAT_PATH = "/r/kakao";

export interface KakaoChatLinkParams {
  /** utm_source — 유입 매체. 기본 `blog` */
  source?: string;
  /** utm_medium — 노출 위치. 기본 `referral` */
  medium?: string;
  /** utm_campaign — 캠페인 슬러그 (예: `bbr-launch-2026q3`) */
  campaign?: string;
  /** utm_content — 같은 캠페인 내 소재 구분 (예: 글 slug) */
  content?: string;
}

/** 오픈채팅 링크를 노출해도 되는 상태인지. false 면 관련 UI 를 렌더하지 않는다. */
export function isKakaoChatEnabled(): boolean {
  return PUBLISHER.kakaoOpenChat.length > 0;
}

/**
 * UTM 이 붙은 오픈채팅 링크를 만든다.
 *
 * 오픈카톡 초대 URL 은 쿼리 파라미터를 보존한다는 보장이 없으므로 **UTM 은 자체 리다이렉트
 * 경로(`/r/kakao`)에만 남기고** 최종 목적지에는 붙이지 않는다. 즉 여기서 만든 링크의 쿼리는
 * 우리 서버 로그까지만 도달한다.
 *
 * @example kakaoChatUrl({ medium: "post", campaign: "bbr-2026q3", content: "beginner-3-day-split" })
 *          // => "/r/kakao?utm_source=blog&utm_medium=post&utm_campaign=bbr-2026q3&utm_content=beginner-3-day-split"
 */
export function kakaoChatUrl(params: KakaoChatLinkParams = {}): string {
  const { source = "blog", medium = "referral", campaign, content } = params;

  const query = new URLSearchParams();
  if (source) query.set("utm_source", source);
  if (medium) query.set("utm_medium", medium);
  if (campaign) query.set("utm_campaign", campaign);
  if (content) query.set("utm_content", content);

  const qs = query.toString();
  return qs ? `${KAKAO_CHAT_PATH}?${qs}` : KAKAO_CHAT_PATH;
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: "Email",
    href: `mailto:${PUBLISHER.email}`,
    display: PUBLISHER.email,
    aria: "Send email to platformholder",
  },
  {
    label: "LinkedIn",
    href: PUBLISHER.linkedin,
    display: "LinkedIn",
    aria: "Visit platformholder LinkedIn profile",
    external: true,
  },
  // 링크 미확보 상태에서는 목록에 넣지 않는다 (깨진 CTA 방지)
  ...(isKakaoChatEnabled()
    ? [
        {
          label: "KakaoOpenChat",
          href: kakaoChatUrl({ medium: "footer", campaign: "contact" }),
          display: "Kakao OpenChat",
          aria: "Join platformholder Kakao open chat (opens in a new tab)",
          external: true,
        } satisfies ContactLink,
      ]
    : []),
];
