import "server-only";
import type { Locale } from "./i18n";

const dictionaries = {
  ko: () => import("../../messages/ko.json").then((m) => m.default),
  en: () => import("../../messages/en.json").then((m) => m.default),
} as const;

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["ko"]>> & {
  site: { name: string; tagline: string; description: string };
};

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]() as Promise<Dictionary>;
