"use client";
import type { TocItem } from "@/lib/toc";
import { useEffect, useState } from "react";

export function TableOfContents({
  items,
  locale,
}: {
  items: TocItem[];
  locale: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0 }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="text-sm sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto"
    >
      <div className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
        {locale === "ko" ? "목차" : "On this page"}
      </div>
      <ul className="space-y-1.5 border-l border-neutral-200 dark:border-neutral-800">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "pl-6" : "pl-3"}
          >
            <a
              href={`#${item.id}`}
              className={`block py-0.5 -ml-px border-l transition ${
                active === item.id
                  ? "border-teal-600 text-teal-700 dark:text-teal-400 font-medium"
                  : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
