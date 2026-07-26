import type { Locale } from "./i18n";

export type ServiceSlug =
  | "bbr"
  | "mirror-view"
  | "find-my-pet"
  | "public-data"
  | "resell-ops"
  | "platformholder";

/**
 * live      = 실제로 쓸 수 있거나 최소한 글이 발행된 서비스
 * preparing = 개발 중 + 글 0개. 색인 대상이 아니다 (thin content 방지)
 */
export type ServiceStatus = "live" | "preparing";

/** 서비스 안에 딸린 하위 프로덕트. 별도 서비스로 등록하지 않고 부모 서비스 페이지에서만 소개한다 */
export interface SubProduct {
  name: string;
  tagline: Record<Locale, string>;
  /** 실제로 접속되는 주소가 확인된 경우에만 채운다. 확인 전에는 비워 둔다 */
  url?: string;
  status: ServiceStatus;
}

export interface ServiceMeta {
  slug: ServiceSlug;
  name: string;
  tagline: Record<Locale, string>;
  description: Record<Locale, string>;
  emoji: string;
  color: string;
  bgSoft: string;
  url?: string;
  /** 생략 시 "live" 로 본다 */
  status?: ServiceStatus;
  subProducts?: SubProduct[];
  hidden?: boolean;
}

export const SERVICES: Record<ServiceSlug, ServiceMeta> = {
  bbr: {
    slug: "bbr",
    name: "PocketFit",
    // ⛔ 2026-07-25: 앱은 어느 스토어에도 출시되지 않았다. "(iOS · Android)" 표기는 허위였다.
    //    근거: marketing/services/bbr/feature-truth.md 금기 표현 + marketing/reports/qc/bbr-drift-20260725.md
    //    (applicationId 가 Flutter 기본값 com.example.health, release 빌드가 signingConfigs.debug)
    //    스토어 등록이 끝나면 그때 표기를 되돌린다.
    tagline: {
      ko: "주머니에 넣어 다니는 AI 피트니스 코치 (출시 준비 중)",
      en: "Fitness that fits in your pocket (launching soon)",
    },
    description: {
      ko: "복잡한 헬스 앱은 많습니다. PocketFit은 주머니에 들어가는 만큼만 보여줍니다. AI가 매주 PT를 짜주고, 라이벌이 옆에 있고, 어디서든 5분 안에 시작할 수 있는 가벼운 피트니스 앱을 만들고 있습니다. 아직 앱 스토어에 출시되지 않았고, 공개 소식은 이 블로그에서 먼저 전해드립니다.",
      en: "Most fitness apps overload you. PocketFit aims to show only what fits in your pocket — AI weekly PT plans, rivals beside you, start anywhere in 5 minutes. It is not on the app stores yet; launch news lands on this blog first.",
    },
    emoji: "📱",
    color: "#0F1113",
    bgSoft: "#F7F8FA",
    subProducts: [
      {
        // 트레이너용 멀티테넌트 웹. 별도 서비스가 아니라 PocketFit 의 하위 프로덕트다.
        // 2026-07-25 기준 공개 URL 없음 (브랜치 미머지 + Vercel 미연결) → status preparing / url 비움.
        // 근거: marketing/reports/qc/bbr-drift-20260725.md
        // 접속되는 주소가 확인되면 그때 url 을 채우고 status 를 live 로 바꾼다.
        name: "PocketFit for Trainers",
        tagline: {
          ko: "트레이너가 회원을 관리하는 웹 콘솔 (배포 준비 중)",
          en: "A web console for trainers to manage their members (deployment pending)",
        },
        status: "preparing",
      },
    ],
  },
  "mirror-view": {
    slug: "mirror-view",
    name: "Mirror-View",
    // ⛔ 2026-07-25: 앱은 미출시이고, 이력서 리뷰·퀴즈·면접질문·약점분석은 전부 앱 전용이라
    //    현재 사용자가 도달할 수 없다(feature-truth ✅ Shipped 는 STT 1건뿐).
    //    옛 표기 "iOS · Android 앱으로 제공됩니다" 는 허위였다.
    //    근거: marketing/services/mirror-view/feature-truth.md,
    //          marketing/reports/qc/mirror-view-drift-20260725.md (FAIL 9 / PASS 0)
    tagline: {
      ko: "이력서·공고 기반 AI 면접 연습 (개발 중 · 웹에서 음성 연습만 공개)",
      en: "AI interview prep tailored to your resume (in development)",
    },
    description: {
      ko: "이력서와 지원 공고로 맞춤 면접 질문·이력서 리뷰·약점 분석을 한 루프로 묶는 것을 목표로 개발 중입니다. 지금 공개된 것은 웹에서 브라우저만으로 답변을 음성→텍스트로 옮겨보는 연습 화면(WebGPU 지원 브라우저 한정)뿐이고, 나머지 기능은 앱과 함께 준비 중입니다.",
      en: "In development: a single loop that turns your resume and a job posting into tailored interview questions, resume reviews, and weakness analysis. What is public today is a browser-only speech-to-text practice screen (WebGPU-capable browsers); the rest ships with the app.",
    },
    emoji: "🪞",
    color: "#1B375E",
    bgSoft: "#F5F7FA",
  },
  "find-my-pet": {
    slug: "find-my-pet",
    name: "Find-My-Pet",
    tagline: {
      ko: "잃어버린 반려동물을 동네가 함께 찾는 곳",
      en: "A neighborhood that helps you find your missing pet",
    },
    description: {
      ko: "한 번 등록하면 공개 목록·카카오 지도·정부 공공데이터에 동시에 노출되는 반려동물 실종 대응 플랫폼.",
      en: "Register once and appear on the public list, Kakao map, and public-data search — a lost-pet platform built for the first golden hour.",
    },
    emoji: "🐾",
    color: "#E76F51",
    bgSoft: "#FDF8F3",
    url: "https://findmypet.platformholder.site",
  },
  // 아래 두 서비스는 아직 글이 0개다. 글 0개 인덱스가 색인되면 thin content 로 SEO 에 해가 되므로
  // hidden: true 로 네비게이션·sitemap 에서 빼 둔다. 첫 글 발행 시 hidden 제거.
  "public-data": {
    slug: "public-data",
    name: "Public Data Service",
    tagline: {
      ko: "매진 열차 좌석을 대신 지켜보는 공공데이터 감시 서비스 (개발 중)",
      en: "A public-data watcher for sold-out trains (in development)",
    },
    description: {
      ko: "매진된 코레일 열차의 좌석 상태를 주기적으로 확인하고, 자리가 보이면 텔레그램으로 한 번 알리는 것을 목표로 개발 중인 공공데이터 감시 서비스. 자동 예매·결제·계정 연동은 하지 않으며 알림까지가 서비스의 역할입니다. 아직 이용할 수 없고, 코레일·공공데이터포털 등 어떤 기관과도 제휴·승인 관계가 없는 개인 프로젝트입니다.",
      en: "A public-data monitoring service in development: it aims to check sold-out Korail train seats on a periodic schedule and send a single Telegram alert once a seat shows up. It does not book, pay, or store rail accounts — the alert is where our part ends. Not yet available, and not affiliated with or endorsed by Korail or any government body.",
    },
    emoji: "📡",
    color: "#116A5B",
    bgSoft: "#F3F8F6",
    // 2026-07-25 첫 글 2편(ko/en) 발행으로 hidden 해제. 제품은 여전히 프리런칭이라
    // status 는 "preparing" 유지 — 인덱스 페이지의 "준비 중" 안내가 계속 필요하다.
    status: "preparing",
  },
  "resell-ops": {
    slug: "resell-ops",
    name: "Resell Ops",
    tagline: {
      ko: "개인 리셀러의 재고·정산 원장을 하나로 모으는 도구 (개발 중)",
      en: "One ledger for a solo reseller's stock and settlements (in development)",
    },
    description: {
      ko: "매입·재고·주문·정산·손익을 하나의 원장에 모으는 개인·소규모 리셀러용 ERP + 다중 채널 OMS를 만들고 있습니다. 실행은 사용자 컴퓨터에서 이뤄지고, 채널 비밀번호·쿠키·세션은 서버에 저장하지 않는 설계입니다. 구매·응모·선점 자동화는 만들지 않습니다. 개발 중이라 아직 설치할 수 있는 배포물은 없습니다.",
      en: "Building a local-execution-first ERP + multi-channel OMS for solo and small-team resellers — one ledger for purchases, stock, orders, settlements, and margins. Execution runs on your own computer, and channel passwords, cookies, and sessions are not stored on our servers. We do not build purchase, raffle, or stock-grabbing automation. Still in development; there is no installable build yet.",
    },
    emoji: "📦",
    color: "#146B4A",
    bgSoft: "#F3F8F5",
    // 2026-07-25 첫 글 2편(ko/en) 발행으로 hidden 해제. 제품은 여전히 프리런칭이라
    // status 는 "preparing" 유지 — 인덱스 페이지의 "준비 중" 안내가 계속 필요하다.
    status: "preparing",
  },
  platformholder: {
    slug: "platformholder",
    name: "platformholder",
    tagline: {
      ko: "블로그 메타·공지",
      en: "Blog meta · announcements",
    },
    description: {
      ko: "블로그 운영·퍼블리셔 소개·공지사항.",
      en: "Blog operations, publisher info, and announcements.",
    },
    emoji: "📝",
    color: "#64748b",
    bgSoft: "#F8FAFC",
    hidden: true,
  },
};

export const SERVICE_ORDER: ServiceSlug[] = [
  "bbr",
  "mirror-view",
  "find-my-pet",
  "public-data",
  "resell-ops",
  "platformholder",
];

/** 네비게이션·홈 카드·sitemap 노출 대상. hidden 서비스는 여기서 빠진다 */
export const VISIBLE_SERVICES: ServiceSlug[] = SERVICE_ORDER.filter(
  (s) => !SERVICES[s].hidden
);

/** status 미지정은 live 로 본다 */
export function serviceStatus(svc: ServiceMeta): ServiceStatus {
  return svc.status ?? "live";
}

export function isPreparing(svc: ServiceMeta): boolean {
  return serviceStatus(svc) === "preparing";
}

/**
 * 준비 중 서비스. 색인(sitemap)·네비 대상은 아니지만 링크로 공유할 수 있어야 해서
 * 인덱스 페이지는 그대로 만들어 둔다 (페이지에 noindex 메타가 붙는다).
 */
export const PREPARING_SERVICES: ServiceSlug[] = SERVICE_ORDER.filter((s) =>
  isPreparing(SERVICES[s])
);

export function isValidService(value: string): value is ServiceSlug {
  return value in SERVICES;
}

export function getService(slug: string): ServiceMeta | null {
  return isValidService(slug) ? SERVICES[slug] : null;
}
