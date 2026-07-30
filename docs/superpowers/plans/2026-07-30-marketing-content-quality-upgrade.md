# Marketing Content Quality Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve all 21 published Korean posts and their 21 English counterparts without changing public URLs, then verify content truth, bilingual parity, editorial quality, and the production build before requesting deployment approval.

**Architecture:** Treat Korean MDX as the editorial source and English MDX as a fact-equivalent localization. Add a deterministic Node audit for structural requirements, use `marketing/services/*/feature-truth.md` as the product-claim boundary, and edit high-risk claims under a cite-or-soften rule. Keep marketing-source changes isolated from the deployable blog repository because they are separate Git repositories.

**Tech Stack:** Next.js 16, React 19, MDX, YAML frontmatter via `gray-matter`, Node.js built-in test runner, ESLint, Vercel.

## Global Constraints

- Preserve every published `service/slug`, canonical URL, hreflang URL, and original `publishedAt` value.
- Exclude every path containing `/_drafts/` or `/_memo/`.
- Use only reachable features allowed by the latest service `feature-truth.md`; do not turn implemented-but-unreleased functions into present-tense product claims.
- For numeric, legal, health, platform-policy, or research claims: link a direct primary/official source that supports the exact sentence, or remove the number and soften the claim.
- Add AI-assistance disclosure to all 42 edited posts because this revision itself materially uses AI assistance.
- Keep Korean and English facts, numbers, limitations, feature state, and CTA behavior equivalent; localization may change phrasing only.
- Keep title and description length as audit warnings, not build failures, until the Korean-specific policy conflict in `publisher-meta.md` is resolved.
- Do not modify or stage unrelated dirty files in `/Users/park/Desktop/project/marketing`.
- Do not push, deploy, submit IndexNow URLs, connect accounts, or use production credentials before the final user confirmation.

---

## File Map

**Marketing source repository** (`/Users/park/Desktop/project/marketing`)

- Modify: `services/bbr/messaging.md` — replace stale shipped-language and unsupported promises with current pre-release-safe messaging.
- Read only: `brand/publisher-meta.md` and every target service's `feature-truth.md`, `brand.md`, `audience.md`, `messaging.md`, and `channels.md`.

**Deployable blog repository** (`/Users/park/Desktop/project/blog-platformholder`)

- Create: `scripts/audit-content.mjs` — deterministic bilingual/frontmatter/disclosure/canonical auditor.
- Create: `scripts/audit-content.test.mjs` — fixture tests for audit failures and success.
- Modify: `package.json` — add `audit:content` and `test:audit-content` scripts.
- Modify: `content/{ko,en}/bbr/*.mdx` — five bilingual BBR pairs.
- Modify: `content/{ko,en}/find-my-pet/*.mdx` — eight bilingual Find-My-Pet pairs.
- Modify: `content/{ko,en}/mirror-view/*.mdx` — five bilingual Mirror View pairs.
- Modify: `content/{ko,en}/resell-ops/*.mdx` excluding `_drafts` — two bilingual Resell Ops pairs.
- Modify: `content/{ko,en}/platformholder/hello.mdx` — one bilingual portfolio introduction pair.
- Create: `docs/audits/2026-07-30-content-quality-upgrade.md` — sources used, panel rounds, validation results, and remaining limitations.

---

### Task 1: Add a Deterministic Content Audit

**Files:**

- Create: `scripts/audit-content.mjs`
- Create: `scripts/audit-content.test.mjs`
- Modify: `package.json`

**Interfaces:**

- Produces: `auditContent(rootDir: string): Promise<{ errors: string[]; warnings: string[]; publishedCount: number; pairCount: number }>`
- CLI success output: `PASS: 42 published posts; 21 bilingual pairs`
- CLI failure behavior: print every error to stderr and exit with status `1`

- [ ] **Step 1: Write fixture tests for missing locale pairs, bad canonical URLs, missing sync metadata, and missing disclosures**

```js
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
title: \"Title\"
slug: sample
service: bbr
type: article
publishedAt: \"2026-05-04\"
updatedAt: \"2026-07-30\"
author: platformholder
tags: [sample]
description: \"Description\"
canonical: https://blog.platformholder.site/${locale}/blog/bbr/sample
hreflang:
  ko: https://blog.platformholder.site/ko/blog/bbr/sample
  en: https://blog.platformholder.site/en/blog/bbr/sample
feature_truth_synced_at: \"2026-07-28\"
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
      .replace('feature_truth_synced_at: \"2026-07-28\"\n', "");
    await writeFile(path.join(root, `content/${locale}/bbr/sample.mdx`), broken);
  }
  const result = await auditContent(root);
  assert(result.errors.some((error) => error.includes("canonical")));
  assert(result.errors.some((error) => error.includes("feature_truth_synced_at")));
  assert(result.errors.some((error) => error.includes("AI disclosure")));
});
```

- [ ] **Step 2: Run the tests and confirm they fail because the audit module does not exist**

Run: `node --test scripts/audit-content.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `scripts/audit-content.mjs`.

- [ ] **Step 3: Implement the audit module**

Create `scripts/audit-content.mjs` with this implementation:

```js
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

function charCount(value) {
  return Array.from(typeof value === "string" ? value : "").length;
}

async function publishedFiles(rootDir, locale) {
  const localeDir = path.join(rootDir, "content", locale);
  const services = await readdir(localeDir, { withFileTypes: true });
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

export async function auditContent(rootDir) {
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

    for (const field of REQUIRED) {
      if (!Object.prototype.hasOwnProperty.call(record.data, field)) {
        errors.push(`${label}: missing ${field}`);
      }
    }

    if (record.data.slug !== record.slug) errors.push(`${label}: slug does not match filename`);
    if (record.data.service !== record.service) errors.push(`${label}: service does not match directory`);
    if (dateString(record.data.updatedAt) !== "2026-07-30") {
      errors.push(`${label}: updatedAt must be 2026-07-30`);
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
```

- [ ] **Step 4: Add package scripts**

```json
"test:audit-content": "node --test scripts/audit-content.test.mjs",
"audit:content": "node scripts/audit-content.mjs"
```

- [ ] **Step 5: Run the test suite and the audit**

Run: `npm run test:audit-content`

Expected: PASS, 3 tests and 0 failures.

Run: `npm run audit:content`

Expected before content edits: FAIL with missing metadata/disclosure errors. Record the baseline error count in the audit report.

- [ ] **Step 6: Commit the audit tooling**

```bash
git add package.json scripts/audit-content.mjs scripts/audit-content.test.mjs
git commit -m "test: add bilingual content quality audit"
```

---

### Task 2: Repair the BBR Messaging Source

**Files:**

- Modify: `/Users/park/Desktop/project/marketing/services/bbr/messaging.md`
- Read: `/Users/park/Desktop/project/marketing/services/bbr/feature-truth.md`

**Interfaces:**

- Produces: one safe messaging source that future content can use without reintroducing app-store, certified-trainer, health-sync, or real-time-notification claims.

- [ ] **Step 1: Capture the stale-claim baseline**

Run:

```bash
rg -n "매주 월요일|인증 트레이너|3초 로그인|5분 만에|HealthKit|Health Connect|실시간 알림|지금 바로|시작하세요" /Users/park/Desktop/project/marketing/services/bbr/messaging.md
```

Expected: matches in the current Why, What, How, and CTA sections.

- [ ] **Step 2: Rewrite the messaging into explicit availability tiers**

Use this structure and meaning:

- `현재 블로그에서 말할 수 있는 것`: PocketFit display name, knowledge-only workout planning and equipment guidance, and the reachable trainer-web public demo where relevant.
- `앱 출시 후 전환할 메시지`: weekly plan generation from available days/time and recent records; routine/history/rival capabilities only after store availability is verified.
- `금지`: app installation CTA, Monday scheduling, three-second login, five-minute completion, certified-trainer marketplace, automatic HealthKit/Health Connect aggregation, real-time WebSocket promise, user-count/testimonial claims.
- Master line for the current blog: `운동을 시작하기 전에 필요한 판단을, 짧고 실행 가능한 가이드로 정리합니다.`
- Future-use line, explicitly labeled post-launch: `가능한 요일과 시간을 입력하면 최근 기록을 참고한 한 주 계획을 만드는 PocketFit.`

- [ ] **Step 3: Re-run the stale-claim scan**

Expected: zero matches outside the clearly labeled `금지 표현` section.

- [ ] **Step 4: Review only the intended marketing diff**

Run:

```bash
git -C /Users/park/Desktop/project/marketing diff -- services/bbr/messaging.md
git -C /Users/park/Desktop/project/marketing status --short
```

Expected: the diff contains only `services/bbr/messaging.md`; unrelated pre-existing dirty files remain unstaged.

- [ ] **Step 5: Commit only BBR messaging**

```bash
git -C /Users/park/Desktop/project/marketing add services/bbr/messaging.md
git -C /Users/park/Desktop/project/marketing commit -m "fix: align BBR messaging with current feature truth"
```

---

### Task 3: Normalize Metadata and Disclosures Across 42 Posts

**Files:**

- Modify: all published `content/{ko,en}/{bbr,find-my-pet,mirror-view,resell-ops,platformholder}/*.mdx`
- Exclude: every `_drafts` and `_memo` path

**Interfaces:**

- Consumes: audit rules from Task 1.
- Produces: 21 exact bilingual pairs that pass structural validation.

- [ ] **Step 1: Apply exact common metadata**

For all 42 published files:

```yaml
updatedAt: "2026-07-30"
author: platformholder
```

For product services, add or update:

```yaml
feature_truth_synced_at: "2026-07-28" # bbr and find-my-pet
feature_truth_synced_at: "2026-07-25" # mirror-view and resell-ops
feature_truth_refs: []                 # keep non-empty existing arrays when the body claims those features
```

For `platformholder/hello.mdx`, use:

```yaml
publisher_meta_synced_at: "2026-07-30"
```

- [ ] **Step 2: Normalize canonical and hreflang pairs**

Every pair must use:

```yaml
canonical: https://blog.platformholder.site/{locale}/blog/{service}/{slug}
hreflang:
  ko: https://blog.platformholder.site/ko/blog/{service}/{slug}
  en: https://blog.platformholder.site/en/blog/{service}/{slug}
```

- [ ] **Step 3: Add exact end disclosures**

Korean final paragraph:

```markdown
*이 글은 AI 보조 도구를 활용해 작성했으며, platformholder가 사실 확인과 편집을 진행했습니다.*
```

English final paragraph:

```markdown
*This article was drafted with AI assistance and fact-checked and edited by platformholder.*
```

Remove older disclosure variants so each post has exactly one disclosure.

- [ ] **Step 4: Run structural validation**

Run: `npm run audit:content`

Expected: `PASS: 42 published posts; 21 bilingual pairs`, followed only by title/description length warnings.

- [ ] **Step 5: Commit metadata and disclosure normalization**

```bash
git add content/ko content/en
git commit -m "content: normalize bilingual publishing metadata"
```

---

### Task 4: Edit the Five BBR Article Pairs

**Files:**

- Modify: `content/{ko,en}/bbr/beginner-3-day-split.mdx`
- Modify: `content/{ko,en}/bbr/create-weekly-pt-plan.mdx`
- Modify: `content/{ko,en}/bbr/how-to-set-rival-routine.mdx`
- Modify: `content/{ko,en}/bbr/running-crew-meets-ai-coach.mdx`
- Modify: `content/{ko,en}/bbr/why-weekly-planning-fails.mdx`

**Interfaces:**

- Produces: knowledge-first fitness guidance with no current-use PocketFit claim and no unsupported universal prescription.

- [ ] **Step 1: Build a claim ledger before editing**

Record every sentence containing time, weight, repetition, recovery, price, percentage, injury, performance, or research language in `docs/audits/2026-07-30-content-quality-upgrade.md`. For each sentence choose exactly one disposition: `cited`, `softened`, or `removed`.

- [ ] **Step 2: Apply the cite-or-soften rules to both languages**

- Replace universal `48시간`/`48 hours` recovery claims with schedule guidance that leaves at least one day between training the same area and tells readers to adjust for soreness, fatigue, injury history, and professional advice.
- Replace automatic `2.5~5kg`/`2.5–5 kg` increases with `the smallest available increment only after all target repetitions remain controlled`; do not imply the rule applies to every exercise or trainee.
- Remove uncited PT price ranges, accountability success percentages, and performance guarantees.
- Keep pain-led openings and practical logs/checklists, but reduce repeated bold inline-header lists and forced groups of three.
- Keep `feature_truth_refs: []` because these posts remain product-free knowledge articles until the mobile app is actually available.

- [ ] **Step 3: Check the BBR corpus for forbidden current-product language**

Run:

```bash
rg -n "앱을 설치|스토어|지금 시작|매주 월요일|인증 트레이너|실시간 알림|install the app|app store|start now|every Monday|certified trainer|real-time notification" content/ko/bbr content/en/bbr
```

Expected: zero promotional matches; explanatory warnings in comments are acceptable only when not rendered.

- [ ] **Step 4: Run audit and build**

Run: `npm run audit:content`

Expected: PASS.

Run: `npm run build`

Expected: exit status `0` with all BBR routes generated.

- [ ] **Step 5: Commit the BBR revisions**

```bash
git add content/ko/bbr content/en/bbr docs/audits/2026-07-30-content-quality-upgrade.md
git commit -m "content: strengthen bilingual BBR guidance"
```

---

### Task 5: Separate Search Intent and Evidence the Eight Find-My-Pet Pairs

**Files:**

- Modify: all eight published files under `content/{ko,en}/find-my-pet/`

**Interfaces:**

- Produces: one pillar guide and seven focused supporting articles with direct government/legal sources where exact rules are stated.

- [ ] **Step 1: Assign a non-overlapping role to every article**

- `lost-pet-5-step-guide`: pillar and ordered response checklist.
- `why-first-hour-matters`: immediate actions and coordination, without a universal “golden hour” guarantee.
- `how-far-do-lost-pets-travel`: expand outward from the loss point based on sightings and terrain, without a universal radius.
- `check-shelter-notices-by-region`: official notices, adjacent districts, shelter contact details, and directly sourced notice-period language.
- `how-to-write-a-flyer`: identification details, contact-safety choices, printable distribution.
- `beginner-pet-prep`: identification tag, registered microchip information, current photos, and service readiness.
- `saw-a-stray-what-to-do`: safe observation, reporting, and avoiding unsupported ownership assumptions.
- `holiday-season-pet-safety`: prevention checklist tied to doors, travel, visitors, and identification.

- [ ] **Step 2: Apply deterministic evidence rules**

- Use `animal.go.kr` or the current Korean statute page for registration, public notice, and protection-period rules; link the exact supporting page rather than only the homepage when available.
- Remove fixed `500m–1km`, `5km`, and universal `1–2시간` claims unless a primary study directly supports that exact context.
- Do not claim every lost animal hides nearby or follows one movement pattern; separate dogs, cats, unfamiliar terrain, and active sightings where evidence allows.
- Preserve a clear emergency sequence: secure the loss point, collect a current photo and exact location/time, publish/report, check official notices, and coordinate sightings.
- Keep product CTAs only for currently reachable Find-My-Pet web actions allowed by the latest feature truth; retain exact non-app wording.

- [ ] **Step 3: Add an internal-link map in both languages**

The pillar links to each focused guide once in context. Every focused guide links back to the pillar and to at most one adjacent guide. Use locale-matching relative paths so Korean pages never send readers to English and vice versa.

- [ ] **Step 4: Verify product-truth keys and links**

Run:

```bash
rg -n "feature_truth_refs|findmypet\.platformholder\.site|animal\.go\.kr" content/ko/find-my-pet content/en/find-my-pet
npm run audit:content
npm run build
```

Expected: all three commands succeed; every rendered product claim has a matching non-empty feature key and every exact legal/numeric claim has a direct supporting source or has been softened.

- [ ] **Step 5: Commit the Find-My-Pet revisions**

```bash
git add content/ko/find-my-pet content/en/find-my-pet docs/audits/2026-07-30-content-quality-upgrade.md
git commit -m "content: evidence bilingual lost-pet guidance"
```

---

### Task 6: Edit Mirror View, Resell Ops, and the Portfolio Introduction

**Files:**

- Modify: all five published pairs under `content/{ko,en}/mirror-view/`
- Modify: both published pairs under `content/{ko,en}/resell-ops/`
- Modify: `content/{ko,en}/platformholder/hello.mdx`

**Interfaces:**

- Produces: career advice framed as a review heuristic, pre-launch reseller guidance without platform-policy claims, and a current portfolio introduction.

- [ ] **Step 1: Edit Mirror View advice**

- Change universal resume rules such as a mandatory one-page limit into explicit starting heuristics that defer to the employer's application instructions.
- Remove claims that imply a known recruiter reading time, hiring outcome, or universal ATS behavior unless directly sourced.
- Preserve worksheets, question-generation methods, and before/after examples.
- Keep current `feature_truth_refs`; do not add product CTAs to knowledge-only posts while authenticated web behavior remains unverified.

- [ ] **Step 2: Edit Resell Ops guidance**

- Describe duplicate-sale and reconciliation scenarios as operational risks, not measured frequency or guaranteed outcomes.
- Remove uncited statements about channel ranking, visibility, penalties, or policy enforcement.
- Preserve the manual spreadsheet workaround and pre-launch open-chat invitation.
- Keep the non-affiliation and no-automation-bypass language required by the Resell Ops brand guide.

- [ ] **Step 3: Rewrite the portfolio introduction in both languages**

The new introduction must:

- Start with the reader's problem: useful guidance is often mixed with unavailable product promises.
- Explain that the blog publishes practical guides backed by the current state of PocketFit, Mirror View, Find-My-Pet, and Resell Ops.
- State that product availability differs by service and each article follows the current feature truth.
- Link to the four service blog indexes, not to unavailable product surfaces.
- Remove the legacy “one-person development log” positioning and old BBR/Mirror-View descriptions.

- [ ] **Step 4: Run the full content audit and production build**

Run: `npm run audit:content`

Expected: PASS with 42 posts and 21 pairs.

Run: `npm run lint`

Expected: exit status `0`, no ESLint errors.

Run: `npm run build`

Expected: exit status `0`, all localized routes generated.

- [ ] **Step 5: Commit this editorial group**

```bash
git add content/ko/mirror-view content/en/mirror-view content/ko/resell-ops content/en/resell-ops content/ko/platformholder content/en/platformholder docs/audits/2026-07-30-content-quality-upgrade.md
git commit -m "content: revise career reseller and portfolio articles"
```

---

### Task 7: Run the Content-Ops Quality Loop and Drift Checks

**Files:**

- Modify: any published content file that fails a panel round
- Modify: `docs/audits/2026-07-30-content-quality-upgrade.md`
- Create: `/Users/park/Desktop/project/marketing/reports/qc/bbr-drift-20260730.md`
- Create: `/Users/park/Desktop/project/marketing/reports/qc/mirror-view-drift-20260730.md`
- Create: `/Users/park/Desktop/project/marketing/reports/qc/find-my-pet-drift-20260730.md`

**Interfaces:**

- Produces: up to three documented panel rounds and current drift reports for the three services supported by `source-command-marketing-prd-sync`.

- [ ] **Step 1: Assemble and document the nine-expert panel**

Use: Content Strategist, Search Intent Editor, Audience Empathy Reviewer, Actionability Editor, Product Truth Reviewer, Evidence/Risk Reviewer, CTA Editor, Brand Voice Reviewer, and AI Writing Detector weighted 1.5×.

- [ ] **Step 2: Score the full corpus with the content-quality rubric**

Score Hook Power, Voice Authenticity, Value Density, and Engagement Potential out of 25. Record expert scores, aggregate, top three weaknesses, and exact edits in the audit report.

- [ ] **Step 3: Revise and repeat when the weighted aggregate is below 90**

Run at most three rounds. Each round edits only the three highest-impact weaknesses. If round three remains below 90, keep the best version and document the precise constraint instead of padding the score.

- [ ] **Step 4: Run source-command marketing drift scans**

For BBR, Mirror View, and Find-My-Pet, compare published claims and `feature_truth_synced_at` values with the current `feature-truth.md`. Each report must list FAIL, WARN, and PASS files and must not overwrite unrelated existing reports.

- [ ] **Step 5: Run final automated checks**

```bash
npm run test:audit-content
npm run audit:content
npm run lint
npm run build
git diff --check
```

Expected: every command exits `0`; audit reports 42 posts and 21 pairs; no whitespace errors.

- [ ] **Step 6: Commit final editorial and report adjustments without staging unrelated marketing files**

```bash
git add content docs/audits/2026-07-30-content-quality-upgrade.md
git commit -m "content: pass final editorial quality gate"
```

In the marketing repository, stage only the three new `*-drift-20260730.md` files and any task-owned BBR messaging change not already committed.

---

### Task 8: Prepare the Deployment Handoff

**Files:**

- Read only: both repository statuses, commit logs, Vercel project metadata, and the production URL after deployment.

**Interfaces:**

- Produces: a user-facing deployment request containing commit SHAs, verification output, panel score, changed-post count, and unresolved risks.

- [ ] **Step 1: Confirm clean task-owned state**

Run:

```bash
git -C /Users/park/Desktop/project/blog-platformholder status --short
git -C /Users/park/Desktop/project/blog-platformholder log --oneline --decorate -8
git -C /Users/park/Desktop/project/marketing status --short
```

Expected: blog repository is clean. Marketing may still show the user's unrelated pre-existing changes; none are staged by this task.

- [ ] **Step 2: Report evidence and request deployment approval**

Report the fresh audit, test, lint, build, panel, and drift results. Ask one explicit question authorizing `git push origin main` and the resulting Vercel production deployment.

- [ ] **Step 3: Push only after approval**

Run: `git push origin main`

Expected: GitHub accepts the commits and advances `origin/main`.

- [ ] **Step 4: Verify Vercel and public pages**

Check the Vercel deployment status and fetch the Korean and English home pages plus one revised page per service. Verify HTTP 200, revised title, canonical, hreflang, and disclosure.

- [ ] **Step 5: Offer IndexNow separately**

Run `npm run indexnow -- --dry-run` only for a preview. Submit with `npm run indexnow` only after a separate user confirmation because it notifies external search engines.
