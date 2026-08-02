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
 * Google AdSense 로더. 루트 레이아웃의 `<head>` 안에서 **한 번만** 렌더한다.
 *
 * ── `next/script` 를 쓰지 않는 이유 (2026-08-02 변경) ──────────────────────────
 * 원래는 `<Script strategy="afterInteractive">` 였다. 근거는 "AdSense 문서는 `<head>`
 * 상단을 권하지만 그러면 첫 페인트를 막아 LCP 가 나빠지고, 소유권 확인은 ads.txt 와
 * `google-adsense-account` 메타로도 되니 로더 위치가 심사를 막지 않는다" 였고,
 * 주석에 **"스크립트 미탐지로 반려되면 그때 올린다"** 는 조건을 달아 뒀다.
 *
 * 그 조건이 실제로 왔다. 2026-08-02 실측 —
 *   · 사이트 상태가 "준비 중"에서 넘어가지 않고 광고 요청에 빈 응답만 돌아옴
 *   · **서버가 보내는 원본 HTML 에 `<script src=...adsbygoogle.js>` 태그가 0개**
 *     (있는 건 `<link rel="preload">` 하나뿐. 실제 스크립트 URL 은 `__next_f.push([...])`
 *      안의 **문자열**로만 존재해, JS 를 실행하지 않으면 어디에도 광고 코드가 없다)
 * 구글이 공식으로 밝힌 "준비 중" 장기 체류 원인 1번이 정확히 이것이다 —
 * "Ad code missing or incomplete — Did you paste the code into the HTML of your site?"
 *
 * `beforeInteractive` 로 올리는 방법도 있지만 그건 **루트 레이아웃에만** 놓을 수 있고
 * (next/script 문서), 이 프로젝트는 `app/layout.tsx` 없이 `app/[locale]/layout.tsx` 가
 * 사실상 루트 역할을 하는 구조라 그 제약에 딱 맞는지 보장하기 어렵다. 무엇보다
 * 필요한 건 "서버 HTML 에 태그가 있다" 하나뿐이라, 평범한 `<script>` 엘리먼트가
 * 가장 확실하고 의존성도 없다.
 *
 * ⚠️ 대가: 200KB 스크립트가 첫 페인트 앞에 온다. `async` 라 파싱을 막지는 않지만
 *    대역폭과 메인스레드를 가져간다. **승인이 나면 되돌리는 것을 검토할 것** —
 *    승인 상태는 유지되므로 그때는 다시 늦게 불러도 된다.
 *
 * ── ads.txt 를 여기 두지 않는 이유 ──────────────────────────────────────────
 * 루트 도메인(`platformholder.site`) 하나가 전 서브도메인을 커버하고, IAB 스펙상
 * 루트가 `subdomain=` 으로 선언하지 않은 서브도메인의 ads.txt 는 크롤조차 되지 않는다.
 * (루트 파일은 `server-deploy` 의 `apex-static` 이 서빙한다)
 */
export default function AdSenseScript() {
  // 미설정이면 아무것도 렌더하지 않는다. 프리뷰에서 빈 요청을 보내지 않기 위함이다.
  if (!ADSENSE_CLIENT) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}

export { ADSENSE_CLIENT };
