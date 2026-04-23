import type { ReactNode } from "react";

export function Steps({ children }: { children: ReactNode }) {
  return (
    <ol className="not-prose my-8 space-y-6 [counter-reset:step]">
      {children}
    </ol>
  );
}

export function Step({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="relative pl-12 [counter-increment:step] before:content-[counter(step)] before:absolute before:left-0 before:top-0 before:flex before:items-center before:justify-center before:w-9 before:h-9 before:rounded-full before:bg-emerald-600 before:text-white before:font-semibold before:text-sm">
      <h3 className="text-base font-semibold text-neutral-900 mt-1 mb-2">{title}</h3>
      <div className="text-[0.95rem] leading-relaxed text-neutral-700 [&>p]:my-2 [&>ul]:my-2 [&>ol]:my-2 [&_a]:text-teal-700 [&_a:hover]:text-teal-900 [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </li>
  );
}
