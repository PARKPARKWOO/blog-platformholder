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

test("accepts one complete bilingual pair", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "content-audit-"));
  for (const locale of ["ko", "en"]) {
    await mkdir(path.join(root, `content/${locale}/bbr`), { recursive: true });
    await writeFile(path.join(root, `content/${locale}/bbr/sample.mdx`), post(locale));
  }
  const result = await auditContent(root);
  assert.deepEqual(result.errors, []);
  assert.equal(result.publishedCount, 2);
  assert.equal(result.pairCount, 1);
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
  const result = await auditContent(root);
  assert(result.errors.some((error) => error.includes("canonical")));
  assert(result.errors.some((error) => error.includes("feature_truth_synced_at")));
  assert(result.errors.some((error) => error.includes("AI disclosure")));
});
