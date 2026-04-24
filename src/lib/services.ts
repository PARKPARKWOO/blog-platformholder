import type { Locale } from "./i18n";

export type ServiceSlug =
  | "bbr"
  | "mirror-view"
  | "find-my-pet"
  | "platformholder";

export interface ServiceMeta {
  slug: ServiceSlug;
  name: string;
  tagline: Record<Locale, string>;
  description: Record<Locale, string>;
  emoji: string;
  color: string;
  bgSoft: string;
  url?: string;
  hidden?: boolean;
}

export const SERVICES: Record<ServiceSlug, ServiceMeta> = {
  bbr: {
    slug: "bbr",
    name: "BBR",
    tagline: {
      ko: "AI 코치와 라이벌이 있는 헬스 앱",
      en: "AI coach and rivals keep you moving",
    },
    description: {
      ko: "매주 월요일 AI가 맞춤 PT 계획을 자동 생성하고, 친구 라이벌·인증 트레이너까지 한 앱에서 연결합니다.",
      en: "Every Monday, AI generates a tailored PT plan. Rivals and certified trainers — all in one app.",
    },
    emoji: "💪",
    color: "#0F1113",
    bgSoft: "#F7F8FA",
    url: "https://bbr.platformholder.site",
  },
  "mirror-view": {
    slug: "mirror-view",
    name: "Mirror-View",
    tagline: {
      ko: "이력서·공고 기반 AI 면접 연습",
      en: "AI interview prep tailored to your resume",
    },
    description: {
      ko: "이력서와 지원 공고를 업로드하면 맞춤 면접 질문·이력서 리뷰·약점 분석을 한 루프로 제공합니다.",
      en: "Upload your resume and a job posting — get tailored interview questions, resume reviews, and weakness analysis in one loop.",
    },
    emoji: "🪞",
    color: "#1B375E",
    bgSoft: "#F5F7FA",
    url: "https://mirror-view.platformholder.site",
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
  "platformholder",
];

export const VISIBLE_SERVICES: ServiceSlug[] = SERVICE_ORDER.filter(
  (s) => !SERVICES[s].hidden
);

export function isValidService(value: string): value is ServiceSlug {
  return value in SERVICES;
}

export function getService(slug: string): ServiceMeta | null {
  return isValidService(slug) ? SERVICES[slug] : null;
}
