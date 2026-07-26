/**
 * 글 상단 TL;DR 블록.
 *
 * `PostMeta.keyTakeaways` 는 JSON-LD `abstract` 로도 나간다 (src/components/JsonLd.tsx).
 * 구조화 데이터에만 있고 화면에 없는 요약은 독자에게 아무 값도 주지 못하므로
 * 같은 값을 본문 앞에 함께 렌더한다. 값이 없는 글(기존 글)에서는 통째로 빠진다.
 */
export function KeyTakeaways({
  items,
  title,
  id = "key-takeaways",
}: {
  items?: string[];
  title: string;
  id?: string;
}) {
  const takeaways = (items ?? []).map((t) => t.trim()).filter(Boolean);
  if (takeaways.length === 0) return null;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="not-prose my-8 scroll-mt-24 rounded-xl border border-teal-200 bg-teal-50/70 px-5 py-4 dark:border-teal-900 dark:bg-teal-950/40"
    >
      <h2
        id={`${id}-title`}
        className="flex items-center gap-2 text-sm font-semibold text-teal-800 dark:text-teal-300"
      >
        <span aria-hidden>📌</span>
        {title}
      </h2>
      <ul className="mt-3 space-y-2 text-[0.95rem] leading-relaxed text-neutral-800 dark:text-neutral-200">
        {takeaways.map((takeaway, i) => (
          <li key={i} className="flex gap-2.5">
            <span
              aria-hidden
              className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500 dark:bg-teal-400"
            />
            <span>{takeaway}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
