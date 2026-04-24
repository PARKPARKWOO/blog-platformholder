"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="w-8 h-8 rounded-full text-neutral-500"
      >
        ·
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";
  return (
    <button
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-8 h-8 inline-flex items-center justify-center rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
