import { PUBLISHER, isKakaoChatEnabled } from "@/lib/publisher";

/**
 * 마케팅 단축 링크: `/r/kakao` → 카카오 오픈채팅
 *
 * - UTM 은 **이 경로의 쿼리로만** 남는다. 오픈카톡 초대 URL 이 쿼리를 보존한다는 보장이 없어
 *   목적지로 전달하지 않는다. (`kakaoChatUrl()` 주석 참고)
 * - 목적지는 `PUBLISHER.kakaoOpenChat` 상수 하나로 고정한다. 요청 쿼리에서 목적지를 읽지 않으므로
 *   open redirect 가 될 수 없다.
 * - 이 버전의 Route Handler 는 기본적으로 캐시되지 않는다. 목적지를 바꿨을 때 중간 캐시에 옛 주소가
 *   남지 않도록 `no-store` 를 명시한다. (`export const dynamic` 은 Next 16 에서 Cache Components
 *   활성화 시 제거된 옵션이라 사용하지 않는다.)
 */
export function GET() {
  // 🚧 링크 미확보 상태. 존재하지 않는 방으로 보내는 대신 404 로 끝낸다.
  if (!isKakaoChatEnabled()) {
    return new Response("Kakao open chat link is not configured yet.", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: PUBLISHER.kakaoOpenChat,
      "Cache-Control": "no-store",
    },
  });
}
