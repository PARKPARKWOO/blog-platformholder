import Link from "next/link";
import { getService } from "@/lib/services";
import type { Locale } from "@/lib/i18n";

export function ServiceBadge({
  service,
  locale,
}: {
  service: string;
  locale: Locale;
}) {
  const svc = getService(service);
  if (!svc) return null;
  return (
    <Link
      href={`/${locale}/blog/${svc.slug}`}
      className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border"
      style={{
        background: svc.bgSoft,
        color: svc.color,
        borderColor: `${svc.color}33`,
      }}
    >
      <span>{svc.emoji}</span>
      <span>{svc.name}</span>
    </Link>
  );
}
