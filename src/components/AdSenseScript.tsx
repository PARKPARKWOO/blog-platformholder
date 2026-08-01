import Script from "next/script";

/**
 * AdSense 게시자 ID. `find-my-pet-fe` 와 **같은 env 이름**을 쓴다 —
 * 두 사이트가 같은 계정 하나로 돌아가므로 이름이 갈리면 한쪽만 켜진 상태를
 * 눈치채지 못한다.
 *
 * `??` 가 아니라 `||` 인 이유: env 는 "없음"이 아니라 **빈 문자열**로 오는 경우가 흔하다.
 * Vercel 대시보드에 키만 미리 만들어 두면 빈 값이 되는데, `??` 는 그걸 통과시켜
 * `client=` 가 빈 채로 요청이 나간다.
 */
const ADSENSE_CLIENT = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "").trim();

/**
 * Google AdSense 로더. 루트 레이아웃에서 **한 번만** 삽입한다.
 *
 * - 미설정이면 아무것도 렌더하지 않는다. 승인 전이나 프리뷰에서 빈 요청을 보내지 않기 위함이다.
 * - `ads.txt` 는 여기 두지 않는다. **루트 도메인(`platformholder.site`) 하나가 전 서브도메인을
 *   커버**하고, IAB 스펙상 루트가 `subdomain=` 으로 선언하지 않은 서브도메인의 ads.txt 는
 *   크롤조차 되지 않는다. (루트 파일은 `server-deploy` 의 `apex-static` 이 서빙한다)
 *
 * strategy 를 `afterInteractive` 로 두는 이유 — 이 블로그는 SEO 투자 자산이다.
 * AdSense 문서는 `<head>` 상단을 권하지만 그러면 광고 스크립트가 첫 페인트를 막아 LCP 가 나빠지고,
 * **Core Web Vitals 는 실제 검색 랭킹 신호다.** 소유권 확인은 `/ads.txt` 와
 * `google-adsense-account` 메타 태그로도 되므로 로더 위치가 심사를 막지 않는다.
 * 스크립트 미탐지로 반려되면 그때 올린다.
 */
export default function AdSenseScript() {
  if (!ADSENSE_CLIENT) return null;

  return (
    <Script
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
    />
  );
}

export { ADSENSE_CLIENT };
