"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "./AdSenseScript";

/**
 * AdSense 디스플레이 광고 슬롯.
 *
 * 렌더 조건: `NEXT_PUBLIC_ADSENSE_CLIENT` 와 slot 이 **둘 다** 있어야 한다.
 * 하나만 있으면 아무것도 렌더하지 않는다 — 빈 `<ins>` 를 남기면 AdSense 가
 * "광고를 요청했으나 채우지 못함"으로 집계하고, 심사에서도 감점 요인이다.
 *
 * ── CLS 를 막는 게 이 컴포넌트의 실제 일이다 ────────────────────────────────
 * 광고는 비동기로 들어와 자리를 밀어낸다. **CLS 는 실제 검색 랭킹 신호**이고
 * 이 블로그는 SEO 투자 자산이라, 높이를 **미리 선점**해서 삽입 시점에 레이아웃이
 * 움직이지 않게 한다. `min-height` 없이 넣으면 광고가 뜨는 순간 본문이 아래로
 * 점프하고 그게 그대로 점수에 잡힌다.
 *
 * `data-full-width-responsive` 는 켜두되 컨테이너 폭을 본문에 맞춰 제한한다 —
 * 전체 폭으로 퍼지면 읽기 흐름을 끊는다.
 */
export default function AdSlot({
  slot,
  className = "",
  minHeight = 280,
}: {
  slot: string;
  className?: string;
  minHeight?: number;
}) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || !slot || pushed.current) return;
    // React 18 StrictMode 는 effect 를 두 번 돌린다. 두 번 push 하면
    // "adsbygoogle.push() error: All ins elements ... already have ads" 가 난다.
    pushed.current = true;
    try {
      ((window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle ||= []).push({});
    } catch {
      /* 애드블록·네트워크 차단 시 조용히 넘어간다. 본문에는 영향이 없어야 한다 */
    }
  }, [slot]);

  if (!ADSENSE_CLIENT || !slot) return null;

  return (
    <div
      className={`not-prose my-10 ${className}`}
      style={{ minHeight }}
      aria-label="광고"
    >
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", minHeight }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
