import type { FaqItem } from "@/lib/posts";

/**
 * 글 하단 FAQ 섹션.
 *
 * 같은 값이 FAQPage 구조화 데이터로도 나간다 (src/components/JsonLd.tsx).
 * 화면에 없는 FAQ 를 FAQPage 로 내보내는 것은 검색엔진 정책 위반 소지가 있으므로
 * 구조화 데이터와 화면은 항상 같은 소스(`PostMeta.faq`)에서 함께 렌더한다.
 *
 * - `<details open>` 로 기본 펼침 — 질문·답변 텍스트가 초기 HTML 에 그대로 들어간다.
 *   (JS 로 나중에 삽입하지 않는다. 크롤러가 원문을 읽어야 한다)
 * - 각 항목의 `id` 로 딥링크(`...#faq-...`) 가능.
 */

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

/** 질문 기반 앵커. 중복·빈 슬러그는 순번으로 보정한다 */
function buildIds(items: FaqItem[]): string[] {
  const used = new Set<string>();
  return items.map((item, i) => {
    const base = slugify(item.question);
    // `faq-` 접두사로 본문 heading id(rehype-slug) 와 충돌하지 않게 한다
    let id = base ? `faq-${base}` : `faq-${i + 1}`;
    if (used.has(id)) id = `${id}-${i + 1}`;
    used.add(id);
    return id;
  });
}

export function PostFaq({
  items,
  title,
  id = "faq",
}: {
  items?: FaqItem[];
  title: string;
  id?: string;
}) {
  const faq = (items ?? []).filter(
    (item) => item.question.trim().length > 0 && item.answer.trim().length > 0
  );
  if (faq.length === 0) return null;
  const ids = buildIds(faq);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mt-16 scroll-mt-24 border-t border-neutral-200 pt-10 dark:border-neutral-800"
    >
      <h2 id={`${id}-title`} className="mb-6 text-lg font-semibold">
        {title}
      </h2>
      <div className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
        {faq.map((item, i) => (
          <details key={ids[i]} id={ids[i]} open className="group scroll-mt-24 py-4">
            {/* 기본 디스클로저 삼각형 제거 — Safari 는 ::-webkit-details-marker 를 따로 숨겨야 한다 */}
            <summary className="flex cursor-pointer list-none items-start gap-2.5 text-[0.98rem] font-semibold text-neutral-900 marker:content-none [&::-webkit-details-marker]:hidden dark:text-neutral-100">
              <span
                aria-hidden
                className="mt-[0.3em] shrink-0 text-teal-600 transition-transform group-open:rotate-90 dark:text-teal-400"
              >
                ▸
              </span>
              <span>{item.question.trim()}</span>
            </summary>
            <div className="mt-2.5 space-y-2.5 pl-[1.4rem] text-[0.95rem] leading-relaxed text-neutral-700 dark:text-neutral-300">
              {item.answer
                .trim()
                .split(/\n{2,}/)
                .map((paragraph, p) => (
                  <p key={p} className="whitespace-pre-line">
                    {paragraph.trim()}
                  </p>
                ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
