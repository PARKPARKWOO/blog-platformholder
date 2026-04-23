import type { ReactNode } from "react";

type Variant = "tip" | "note" | "warning" | "important";

const styles: Record<Variant, { wrap: string; label: string; icon: string }> = {
  tip: {
    wrap: "border-l-4 border-emerald-400 bg-emerald-50 text-emerald-950",
    label: "text-emerald-700",
    icon: "💡",
  },
  note: {
    wrap: "border-l-4 border-sky-400 bg-sky-50 text-sky-950",
    label: "text-sky-700",
    icon: "📝",
  },
  warning: {
    wrap: "border-l-4 border-amber-400 bg-amber-50 text-amber-950",
    label: "text-amber-700",
    icon: "⚠️",
  },
  important: {
    wrap: "border-l-4 border-rose-400 bg-rose-50 text-rose-950",
    label: "text-rose-700",
    icon: "❗",
  },
};

const labelText: Record<Variant, string> = {
  tip: "Tip",
  note: "Note",
  warning: "주의",
  important: "중요",
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const s = styles[type];
  return (
    <div
      className={`not-prose my-6 rounded-r-lg p-4 pl-5 ${s.wrap}`}
    >
      <div className={`flex items-center gap-2 text-sm font-semibold ${s.label}`}>
        <span aria-hidden>{s.icon}</span>
        <span>{title ?? labelText[type]}</span>
      </div>
      <div className="mt-2 text-[0.95rem] leading-relaxed [&>p]:my-2 [&>ul]:my-2 [&>ol]:my-2">
        {children}
      </div>
    </div>
  );
}
