import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import matter from "gray-matter";

const LOCALES = ["ko", "en"];
const REQUIRED = [
  "title", "slug", "service", "publishedAt", "updatedAt", "author",
  "tags", "description", "canonical", "hreflang",
];
const PRODUCT_SERVICES = new Set(["bbr", "find-my-pet", "mirror-view", "resell-ops"]);
const DISCLOSURE = {
  ko: "*이 글은 AI 보조 도구를 활용해 작성했으며, platformholder가 사실 확인과 편집을 진행했습니다.*",
  en: "*This article was drafted with AI assistance and fact-checked and edited by platformholder.*",
};

function dateString(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return typeof value === "string" ? value.trim() : "";
}

function isValidDateValue(value) {
  const normalized = dateString(value);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) return false;
  const parsed = new Date(`${normalized}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === normalized;
}

function charCount(value) {
  return Array.from(typeof value === "string" ? value : "").length;
}

async function publishedFiles(rootDir, locale) {
  const localeDir = path.join(rootDir, "content", locale);
  let services;
  try {
    services = await readdir(localeDir, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  const files = [];
  for (const serviceEntry of services) {
    if (!serviceEntry.isDirectory() || serviceEntry.name.startsWith("_")) continue;
    const serviceDir = path.join(localeDir, serviceEntry.name);
    const entries = await readdir(serviceDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile() || !/\.mdx?$/.test(entry.name)) continue;
      files.push({
        locale,
        service: serviceEntry.name,
        slug: entry.name.replace(/\.mdx?$/, ""),
        file: path.join(serviceDir, entry.name),
      });
    }
  }
  return files;
}

export async function auditContent(
  rootDir,
  { expectedPublishedCount = 42, expectedPairCount = 21 } = {},
) {
  const errors = [];
  const warnings = [];
  const records = [];

  for (const locale of LOCALES) {
    for (const item of await publishedFiles(rootDir, locale)) {
      const raw = await readFile(item.file, "utf8");
      const { data, content } = matter(raw);
      records.push({ ...item, data, content });
    }
  }

  const byLocale = new Map(LOCALES.map((locale) => [locale, new Set()]));
  for (const record of records) {
    const id = `${record.service}/${record.slug}`;
    byLocale.get(record.locale).add(id);
    const label = `${record.locale}/${id}`;

    const hasField = (field) => Object.prototype.hasOwnProperty.call(record.data, field);
    for (const field of REQUIRED) {
      if (!hasField(field)) {
        errors.push(`${label}: missing ${field}`);
      }
    }

    for (const field of ["title", "description"]) {
      if (hasField(field) && (typeof record.data[field] !== "string" || !record.data[field].trim())) {
        errors.push(`${label}: ${field} must not be empty`);
      }
    }
    if (hasField("author") && record.data.author !== "platformholder") {
      errors.push(`${label}: author must be platformholder`);
    }
    if (hasField("tags") && (
      !Array.isArray(record.data.tags)
      || record.data.tags.length === 0
      || record.data.tags.some((tag) => typeof tag !== "string" || !tag.trim())
    )) {
      errors.push(`${label}: tags must be a non-empty array of non-empty strings`);
    }
    if (hasField("publishedAt") && !isValidDateValue(record.data.publishedAt)) {
      errors.push(`${label}: publishedAt must be a valid YYYY-MM-DD date`);
    }

    if (record.data.slug !== record.slug) errors.push(`${label}: slug does not match filename`);
    if (record.data.service !== record.service) errors.push(`${label}: service does not match directory`);
    if (hasField("updatedAt") && !isValidDateValue(record.data.updatedAt)) {
      errors.push(`${label}: updatedAt must be a valid YYYY-MM-DD date`);
    } else if (
      hasField("updatedAt")
      && isValidDateValue(record.data.publishedAt)
      && dateString(record.data.updatedAt) < dateString(record.data.publishedAt)
    ) {
      errors.push(`${label}: updatedAt must not precede publishedAt`);
    }

    const expectedCanonical = `https://blog.platformholder.site/${record.locale}/blog/${id}`;
    if (record.data.canonical !== expectedCanonical) errors.push(`${label}: canonical must be ${expectedCanonical}`);
    for (const locale of LOCALES) {
      const expected = `https://blog.platformholder.site/${locale}/blog/${id}`;
      if (record.data.hreflang?.[locale] !== expected) {
        errors.push(`${label}: hreflang.${locale} must be ${expected}`);
      }
    }

    if (PRODUCT_SERVICES.has(record.service)) {
      if (!dateString(record.data.feature_truth_synced_at)) {
        errors.push(`${label}: missing feature_truth_synced_at`);
      }
      if (!Array.isArray(record.data.feature_truth_refs)) {
        errors.push(`${label}: feature_truth_refs must be an array`);
      }
    } else if (record.service === "platformholder") {
      if (dateString(record.data.publisher_meta_synced_at) !== "2026-07-30") {
        errors.push(`${label}: publisher_meta_synced_at must be 2026-07-30`);
      }
    }

    if (!record.content.trimEnd().endsWith(DISCLOSURE[record.locale])) {
      errors.push(`${label}: missing final AI disclosure`);
    }

    const titleLength = charCount(record.data.title);
    const descriptionLength = charCount(record.data.description);
    if (titleLength < 50 || titleLength > 60) warnings.push(`${label}: title length ${titleLength}`);
    if (descriptionLength < 150 || descriptionLength > 160) {
      warnings.push(`${label}: description length ${descriptionLength}`);
    }
  }

  for (const id of byLocale.get("ko")) {
    if (!byLocale.get("en").has(id)) errors.push(`missing en pair: ${id}`);
  }
  for (const id of byLocale.get("en")) {
    if (!byLocale.get("ko").has(id)) errors.push(`missing ko pair: ${id}`);
  }

  const pairCount = [...byLocale.get("ko")].filter((id) => byLocale.get("en").has(id)).length;
  if (records.length !== expectedPublishedCount) {
    errors.push(`expected ${expectedPublishedCount} published posts; found ${records.length}`);
  }
  if (pairCount !== expectedPairCount) {
    errors.push(`expected ${expectedPairCount} bilingual pairs; found ${pairCount}`);
  }
  return { errors, warnings, publishedCount: records.length, pairCount };
}

async function main() {
  const result = await auditContent(process.cwd());
  for (const warning of result.warnings) console.warn(`WARN: ${warning}`);
  if (result.errors.length > 0) {
    for (const error of result.errors) console.error(`ERROR: ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(`PASS: ${result.publishedCount} published posts; ${result.pairCount} bilingual pairs`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
