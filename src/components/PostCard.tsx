import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { readingTime } from "@/lib/posts";
import { ServiceBadge } from "./ServiceBadge";
import type { Locale } from "@/lib/i18n";

export function PostCard({
  post,
  locale,
  showService = true,
}: {
  post: PostMeta;
  locale: Locale;
  showService?: boolean;
}) {
  const reading = readingTime(post.totalTime);
  return (
    <article className="group">
      {showService && (
        <div className="mb-3">
          <ServiceBadge service={post.service} locale={locale} />
        </div>
      )}
      <Link href={post.url} className="block">
        <h3 className="font-semibold text-base leading-snug group-hover:underline">
          {post.title}
        </h3>
        {post.description && (
          <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-2">
            {post.description}
          </p>
        )}
        <p className="mt-3 text-xs text-neutral-500">
          {post.publishedAt}
          {reading ? ` · ${reading} read` : ""}
        </p>
      </Link>
    </article>
  );
}
