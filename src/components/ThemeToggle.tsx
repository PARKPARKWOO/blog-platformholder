"use client";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

/*
 * 서버 렌더 시점에는 실제 테마를 알 수 없어(로컬스토리지·시스템 설정은 브라우저에만 있다)
 * 하이드레이션 전까지는 자리표시자 버튼을 렌더한다.
 *
 * `useEffect(() => setMounted(true))` 대신 `useSyncExternalStore` 를 쓰는 이유:
 * effect 안에서 동기 setState 를 하면 연쇄 렌더가 발생해 react-hooks/set-state-in-effect
 * 에 걸린다. useSyncExternalStore 는 하이드레이션 렌더에 getServerSnapshot(false) 을,
 * 그 이후 클라이언트 렌더에 getSnapshot(true) 을 쓰므로 동작은 같고 경고는 없다.
 */
const subscribeToNothing = () => () => {};
const isClient = () => true;
const isServer = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeToNothing, isClient, isServer);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="w-8 h-8 rounded-full text-neutral-500"
      >
        ·
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";
  return (
    <button
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-8 h-8 inline-flex items-center justify-center rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
