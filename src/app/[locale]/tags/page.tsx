import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dict";
import { getAllTags } from "@/lib/posts";

export default async function TagsIndex({ params }: PageProps<"/[locale]/tags">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const tags = await getAllTags(locale);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">{dict.blog.tags}</h1>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag}>
            <Link
              href={`/${locale}/tags/${tag}`}
              className="px-3 py-1.5 text-sm border border-neutral-200 rounded-full hover:bg-neutral-100"
            >
              #{tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
