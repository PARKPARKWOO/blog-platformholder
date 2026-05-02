// 퍼블리셔 컨택 정보 (블로그 footer · about 등에서 사용)
// 노출돼도 무방한 공개 정보만 (개인 휴대폰·집 주소 등은 절대 X)

export interface ContactLink {
  label: string;
  href: string;
  display: string;
  aria: string;
  external?: boolean;
}

export const PUBLISHER = {
  name: "platformholder",
  email: "wy9295@naver.com",
  linkedin: "https://www.linkedin.com/in/parkparkwoo",
  github: "https://github.com/PARKPARKWOO",
};

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
  {
    label: "GitHub",
    href: PUBLISHER.github,
    display: "GitHub",
    aria: "Visit platformholder GitHub",
    external: true,
  },
];
