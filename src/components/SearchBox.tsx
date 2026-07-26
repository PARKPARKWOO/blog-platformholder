"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useId, useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

/**
 * SiteJsonLd 의 `WebSite.potentialAction` 이 `/{locale}/search?q={search_term_string}` 을
 * 선언한다. 이 컴포넌트가 그 계약의 이행부다 — 파라미터 이름을 바꾸면 구조화 데이터
 * (src/components/SiteJsonLd.tsx) 도 같이 바꿔야 한다.
 */
const QUERY_PARAM = "q";
/** 타이핑 중 URL 을 매 글자 갱신하지 않기 위한 디바운스 */
const URL_SYNC_DELAY_MS = 250;
const DEFAULT_RESULTS = 10;
const MAX_RESULTS = 20;

interface IndexItem {
  title: string;
  description: string;
  tags: string[];
  service: string;
  serviceName: string;
  url: string;
  publishedAt: string;
}

const COPY = {
  ko: {
    label: "글 검색",
    placeholder: "키워드로 검색 (예: 면접, PT, 실종)",
    loading: "인덱스 불러오는 중...",
    results: (n: number) => `${n}개 결과`,
    empty: "일치하는 결과가 없어요.",
    submit: "검색",
  },
  en: {
    label: "Search posts",
    placeholder: "Search keywords (e.g. interview, PT, lost pet)",
    loading: "Loading index...",
    results: (n: number) => `${n} ${n === 1 ? "result" : "results"}`,
    empty: "No matches found.",
    submit: "Search",
  },
} as const satisfies Record<Locale, unknown>;

const inputClass =
  "w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500";

/**
 * `useSearchParams` 는 프리렌더된 라우트에서 가장 가까운 Suspense 경계까지를
 * 클라이언트 렌더로 돌린다. 경계가 없으면 프로덕션 빌드가 실패하므로
 * (node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-search-params.md)
 * 페이지가 아니라 이 모듈 안에서 경계를 만든다.
 */
export function SearchBox({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={<SearchBoxShell locale={locale} />}>
      <SearchBoxInner locale={locale} />
    </Suspense>
  );
}

/** 하이드레이션 전 정적 HTML. JS 없이도 GET 폼이 `?q=` 로 제출된다 */
function SearchBoxShell({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  return (
    <div>
      <form role="search" action={`/${locale}/search`} method="get">
        <label htmlFor="site-search-shell" className="sr-only">
          {t.label}
        </label>
        <input
          id="site-search-shell"
          name={QUERY_PARAM}
          type="search"
          placeholder={t.placeholder}
          className={inputClass}
        />
      </form>
      <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{t.loading}</p>
    </div>
  );
}

function SearchBoxInner({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const inputId = useId();
  const searchParams = useSearchParams();
  // 검색엔진·공유 링크가 `?q=...` 로 진입하면 그 값으로 시작해 즉시 검색한다
  const urlQuery = searchParams.get(QUERY_PARAM)?.trim() ?? "";

  const [query, setQuery] = useState(urlQuery);
  const [index, setIndex] = useState<IndexItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  // 마지막으로 URL 과 맞춰 둔 값. 입력 → URL / URL → 입력 이 서로를 되받아치지 않게 한다
  const syncedRef = useRef(urlQuery);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/search/${locale}`);
        const data = (await res.json()) as IndexItem[];
        if (!cancelled) {
          setIndex(data);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  // URL → 입력값. 뒤로가기·공유 링크 등 바깥에서 바뀐 경우에만 반영한다
  useEffect(() => {
    if (urlQuery === syncedRef.current) return;
    syncedRef.current = urlQuery;
    setQuery(urlQuery);
  }, [urlQuery]);

  // 입력값 → URL. 공유·북마크가 가능해진다. 히스토리를 늘리지 않도록 replaceState
  // (node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md)
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed === syncedRef.current) return;
    const timer = setTimeout(() => writeQueryToUrl(trimmed, syncedRef), URL_SYNC_DELAY_MS);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => {
    if (!index) return [];
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, DEFAULT_RESULTS);
    const words = q.split(/\s+/).filter(Boolean);
    return index
      .map((item) => {
        const haystack = [
          item.title,
          item.description,
          item.serviceName,
          item.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase();
        let score = 0;
        for (const w of words) {
          if (!haystack.includes(w)) return null;
          if (item.title.toLowerCase().includes(w)) score += 5;
          if (item.tags.join(" ").toLowerCase().includes(w)) score += 3;
          score += 1;
        }
        return { item, score };
      })
      .filter((x): x is { item: IndexItem; score: number } => x !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS)
      .map((x) => x.item);
  }, [index, query]);

  return (
    <div>
      <form
        role="search"
        // JS 가 아직 없거나 실패해도 `?q=` 로 되돌아오는 경로를 남긴다
        action={`/${locale}/search`}
        method="get"
        onSubmit={(e) => {
          e.preventDefault();
          writeQueryToUrl(query.trim(), syncedRef);
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          {t.label}
        </label>
        <input
          id={inputId}
          name={QUERY_PARAM}
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.placeholder}
          aria-describedby={`${inputId}-status`}
          className={inputClass}
        />
        <button type="submit" className="sr-only">
          {t.submit}
        </button>
      </form>
      <p
        id={`${inputId}-status`}
        role="status"
        aria-live="polite"
        className="mt-2 text-xs text-neutral-500 dark:text-neutral-400"
      >
        {loading ? t.loading : t.results(results.length)}
      </p>

      <ul className="mt-6 space-y-5">
        {results.map((item) => (
          <li key={item.url}>
            <Link href={item.url} className="block group">
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                <span className="font-medium">{item.serviceName}</span>
                <span>·</span>
                <span>{item.publishedAt}</span>
              </div>
              <h3 className="font-semibold group-hover:underline">{item.title}</h3>
              {item.description && (
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
                  {item.description}
                </p>
              )}
            </Link>
          </li>
        ))}
        {!loading && results.length === 0 && query.trim() && (
          <li className="text-sm text-neutral-500 dark:text-neutral-400">{t.empty}</li>
        )}
      </ul>
    </div>
  );
}

function writeQueryToUrl(value: string, syncedRef: { current: string }) {
  if (value === syncedRef.current) return;
  syncedRef.current = value;
  const params = new URLSearchParams(window.location.search);
  if (value) params.set(QUERY_PARAM, value);
  else params.delete(QUERY_PARAM);
  const qs = params.toString();
  window.history.replaceState(
    null,
    "",
    qs ? `${window.location.pathname}?${qs}` : window.location.pathname
  );
}
