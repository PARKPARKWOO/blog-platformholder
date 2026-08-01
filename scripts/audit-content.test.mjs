import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { auditContent } from "./audit-content.mjs";

const disclosure = {
  ko: "*이 글은 AI 보조 도구를 활용해 작성했으며, platformholder가 사실 확인과 편집을 진행했습니다.*",
  en: "*This article was drafted with AI assistance and fact-checked and edited by platformholder.*",
};

function post(locale, disclosureLine = disclosure[locale]) {
  return `---
title: "Title"
slug: sample
service: bbr
type: article
publishedAt: "2026-05-04"
updatedAt: "2026-07-30"
author: platformholder
tags: [sample]
description: "Description"
canonical: https://blog.platformholder.site/${locale}/blog/bbr/sample
hreflang:
  ko: https://blog.platformholder.site/ko/blog/bbr/sample
  en: https://blog.platformholder.site/en/blog/bbr/sample
feature_truth_synced_at: "2026-07-28"
feature_truth_refs: []
---

Body.

${disclosureLine}
`;
}

test("reports a missing English pair", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "content-audit-"));
  await mkdir(path.join(root, "content/ko/bbr"), { recursive: true });
  await writeFile(path.join(root, "content/ko/bbr/sample.mdx"), post("ko"));
  const result = await auditContent(root);
  assert(result.errors.some((error) => error.includes("missing en pair: bbr/sample")));
});

test("rejects an empty production corpus", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "content-audit-"));
  const result = await auditContent(root);

  assert(result.errors.some((error) => error.includes("expected 46 published posts; found 0")));
  assert(result.errors.some((error) => error.includes("expected 23 bilingual pairs; found 0")));
});

test("rejects a smaller bilingual corpus with production defaults", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "content-audit-"));
  for (const locale of ["ko", "en"]) {
    await mkdir(path.join(root, `content/${locale}/bbr`), { recursive: true });
    await writeFile(path.join(root, `content/${locale}/bbr/sample.mdx`), post(locale));
  }
  const result = await auditContent(root);

  assert(result.errors.some((error) => error.includes("expected 46 published posts; found 2")));
  assert(result.errors.some((error) => error.includes("expected 23 bilingual pairs; found 1")));
});

test("accepts one complete bilingual pair with explicit fixture counts", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "content-audit-"));
  for (const locale of ["ko", "en"]) {
    await mkdir(path.join(root, `content/${locale}/bbr`), { recursive: true });
    await writeFile(path.join(root, `content/${locale}/bbr/sample.mdx`), post(locale));
  }
  const result = await auditContent(root, { expectedPublishedCount: 2, expectedPairCount: 1 });
  assert.deepEqual(result.errors, []);
  assert.equal(result.publishedCount, 2);
  assert.equal(result.pairCount, 1);
});

test("rejects empty required string values", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "content-audit-"));
  for (const locale of ["ko", "en"]) {
    await mkdir(path.join(root, `content/${locale}/bbr`), { recursive: true });
    const broken = post(locale)
      .replace('title: "Title"', 'title: ""')
      .replace('description: "Description"', 'description: "   "');
    await writeFile(path.join(root, `content/${locale}/bbr/sample.mdx`), broken);
  }

  const result = await auditContent(root, { expectedPublishedCount: 2, expectedPairCount: 1 });
  assert(result.errors.some((error) => error.includes("title must not be empty")));
  assert(result.errors.some((error) => error.includes("description must not be empty")));
});

test("rejects an author other than platformholder", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "content-audit-"));
  for (const locale of ["ko", "en"]) {
    await mkdir(path.join(root, `content/${locale}/bbr`), { recursive: true });
    const broken = post(locale).replace("author: platformholder", "author: guest");
    await writeFile(path.join(root, `content/${locale}/bbr/sample.mdx`), broken);
  }

  const result = await auditContent(root, { expectedPublishedCount: 2, expectedPairCount: 1 });
  assert(result.errors.some((error) => error.includes("author must be platformholder")));
});

test("rejects an invalid published date", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "content-audit-"));
  for (const locale of ["ko", "en"]) {
    await mkdir(path.join(root, `content/${locale}/bbr`), { recursive: true });
    const broken = post(locale).replace('publishedAt: "2026-05-04"', 'publishedAt: "2026-02-30"');
    await writeFile(path.join(root, `content/${locale}/bbr/sample.mdx`), broken);
  }

  const result = await auditContent(root, { expectedPublishedCount: 2, expectedPairCount: 1 });
  assert(result.errors.some((error) => error.includes("publishedAt must be a valid YYYY-MM-DD date")));
});

test("accepts a valid article-specific updatedAt", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "content-audit-"));
  for (const locale of ["ko", "en"]) {
    await mkdir(path.join(root, `content/${locale}/bbr`), { recursive: true });
    const updated = post(locale).replace('updatedAt: "2026-07-30"', 'updatedAt: "2026-08-01"');
    await writeFile(path.join(root, `content/${locale}/bbr/sample.mdx`), updated);
  }
  const result = await auditContent(root, { expectedPublishedCount: 2, expectedPairCount: 1 });
  assert.deepEqual(result.errors, []);
});

test("rejects updatedAt before publishedAt", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "content-audit-"));
  for (const locale of ["ko", "en"]) {
    await mkdir(path.join(root, `content/${locale}/bbr`), { recursive: true });
    const broken = post(locale).replace('updatedAt: "2026-07-30"', 'updatedAt: "2026-05-03"');
    await writeFile(path.join(root, `content/${locale}/bbr/sample.mdx`), broken);
  }
  const result = await auditContent(root, { expectedPublishedCount: 2, expectedPairCount: 1 });
  assert(result.errors.some((error) => error.includes("updatedAt must not precede publishedAt")));
});

test("rejects empty tags", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "content-audit-"));
  for (const locale of ["ko", "en"]) {
    await mkdir(path.join(root, `content/${locale}/bbr`), { recursive: true });
    const broken = post(locale).replace("tags: [sample]", "tags: []");
    await writeFile(path.join(root, `content/${locale}/bbr/sample.mdx`), broken);
  }

  const result = await auditContent(root, { expectedPublishedCount: 2, expectedPairCount: 1 });
  assert(result.errors.some((error) => error.includes("tags must be a non-empty array")));
});

test("rejects malformed canonical, missing truth sync, and missing disclosure", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "content-audit-"));
  for (const locale of ["ko", "en"]) {
    await mkdir(path.join(root, `content/${locale}/bbr`), { recursive: true });
    const broken = post(locale, "")
      .replace(`https://blog.platformholder.site/${locale}/blog/bbr/sample`, "https://example.com/bad")
      .replace('feature_truth_synced_at: "2026-07-28"\n', "");
    await writeFile(path.join(root, `content/${locale}/bbr/sample.mdx`), broken);
  }
  const result = await auditContent(root, { expectedPublishedCount: 2, expectedPairCount: 1 });
  assert(result.errors.some((error) => error.includes("canonical")));
  assert(result.errors.some((error) => error.includes("feature_truth_synced_at")));
  assert(result.errors.some((error) => error.includes("AI disclosure")));
});
