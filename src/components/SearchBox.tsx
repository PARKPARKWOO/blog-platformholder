"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";

interface IndexItem {
  title: string;
  description: string;
  tags: string[];
  service: string;
  serviceName: string;
  url: string;
  publishedAt: string;
}

export function SearchBox({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<IndexItem[] | null>(null);
  const [loading, setLoading] = useState(true);

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

  const results = useMemo(() => {
    if (!index) return [];
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 10);
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
      .slice(0, 20)
      .map((x) => x.item);
  }, [index, query]);

  return (
    <div>
      <input
        type="search"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={
          locale === "ko"
            ? "키워드로 검색 (예: 면접, PT, 실종)"
            : "Search keywords (e.g. interview, PT, lost pet)"
        }
        className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
        {loading
          ? locale === "ko"
            ? "인덱스 불러오는 중..."
            : "Loading index..."
          : `${results.length} ${
              locale === "ko" ? "개 결과" : results.length === 1 ? "result" : "results"
            }`}
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
        {!loading && results.length === 0 && query && (
          <li className="text-sm text-neutral-500 dark:text-neutral-400">
            {locale === "ko" ? "일치하는 결과가 없어요." : "No matches found."}
          </li>
        )}
      </ul>
    </div>
  );
}
