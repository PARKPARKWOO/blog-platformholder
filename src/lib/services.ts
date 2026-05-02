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
    name: "PocketFit",
    tagline: {
      ko: "주머니에 넣어 다니는 AI 피트니스 코치 (iOS · Android)",
      en: "Fitness that fits in your pocket (iOS · Android)",
    },
    description: {
      ko: "복잡한 헬스 앱은 많습니다. PocketFit은 주머니에 들어가는 만큼만 보여줍니다. AI가 매주 PT를 짜주고, 라이벌이 옆에 있고, 어디서든 5분 안에 시작할 수 있는 가벼운 피트니스 앱.",
      en: "Most fitness apps overload you. PocketFit shows only what fits in your pocket — AI weekly PT plans, rivals beside you, start anywhere in 5 minutes.",
    },
    emoji: "📱",
    color: "#0F1113",
    bgSoft: "#F7F8FA",
  },
  "mirror-view": {
    slug: "mirror-view",
    name: "Mirror-View",
    tagline: {
      ko: "이력서·공고 기반 AI 면접 연습 앱 (iOS · Android)",
      en: "AI interview prep tailored to your resume (iOS · Android app)",
    },
    description: {
      ko: "이력서와 지원 공고를 업로드하면 맞춤 면접 질문·이력서 리뷰·약점 분석을 한 루프로 제공합니다. iOS·Android 모바일 앱으로 제공됩니다.",
      en: "Upload your resume and a job posting — get tailored interview questions, resume reviews, and weakness analysis. iOS · Android mobile app.",
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
