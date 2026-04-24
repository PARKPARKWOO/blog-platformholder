export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  // 코드 블록 안의 # 은 제외
  const withoutCodeBlocks = markdown.replace(/```[\s\S]*?```/g, "");
  const lines = withoutCodeBlocks.split("\n");
  for (const line of lines) {
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!m) continue;
    const level = m[1].length as 2 | 3;
    // frontmatter 등 공백 줄 뒤의 heading만 대상. frontmatter는 앞서 matter로 분리됨
    const text = m[2].replace(/[\[\]]/g, "").replace(/`/g, "").trim();
    items.push({ id: slugify(text), text, level });
  }
  return items;
}

export const TOC_MIN_ITEMS = 3;
