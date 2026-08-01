# Resell Ops KREAM Blog Cluster Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish two Korean/English KREAM seller-problem article pairs, synchronize existing Resell Ops CTAs, and verify all four new posts at a 90+ content-quality threshold.

**Architecture:** Korean is the editorial source and English is a fact-equivalent localization. The content audit accepts per-article valid update dates and tracks corpus growth one bilingual pair at a time. Marketing truth IDs and official KREAM sources bound every product and platform claim.

**Tech Stack:** MDX, Next.js 16, Node test runner, gray-matter, ESLint, TypeScript, npm.

## Global Constraints

- New slugs are `kream-storage-sale-bid-checks` and `kream-scheduled-instant-sale` in both locales.
- New posts use `publishedAt: "2026-08-01"` and `updatedAt: "2026-08-01"`; materially revised existing posts keep their original `publishedAt` and use `updatedAt: "2026-08-01"`.
- Current copy says `개발 중`, `2026년 8월 오픈 예정`, and `출시 시 제공 예정`; it never says the feature is usable now.
- The offer is `출시 후 30일 무료 이용 안내`, never 15 days, `15+15`, cash value, discount percentage, or instant activation.
- KREAM official FAQ supports platform mechanics. No unsupported competition-rate, revenue, success-rate, or time-saving number is used.
- KREAM logo, BI, product screenshot, official/partner/affiliation wording, and branded merchandise imagery are not used.
- Both articles carry non-affiliation, policy-risk, sensitive-data, and AI-assistance disclosures.
- The final `content-ops` panel has 9 lenses, Humanizer/AI Writing Detector weighted 1.5×, every expert at least 90, and at most three rounds.
- External push, deployment, and IndexNow wait for a separate explicit approval after local verification.

---

## File Structure

- `/Users/park/Desktop/project/blog-platformholder/scripts/audit-content.mjs`: corpus totals and date validation.
- `/Users/park/Desktop/project/blog-platformholder/scripts/audit-content.test.mjs`: red/green tests for update dates and corpus totals.
- `/Users/park/Desktop/project/blog-platformholder/content/{ko,en}/resell-ops/kream-storage-sale-bid-checks.mdx`: storage-sale problem pair.
- `/Users/park/Desktop/project/blog-platformholder/content/{ko,en}/resell-ops/kream-scheduled-instant-sale.mdx`: scheduled instant-sale problem pair.
- `/Users/park/Desktop/project/blog-platformholder/content/{ko,en}/resell-ops/resell-settlement-excel-limits.mdx`: existing CTA sync.
- `/Users/park/Desktop/project/blog-platformholder/content/{ko,en}/resell-ops/reseller-multi-channel-inventory.mdx`: existing CTA sync.
- `/Users/park/Desktop/project/blog-platformholder/docs/audits/2026-08-01-resell-ops-kream-content-quality.md`: sources, claim ledger, all scoring rounds, and validation evidence.

### Task 1: Make article update dates durable instead of globally frozen

**Files:**
- Modify: `/Users/park/Desktop/project/blog-platformholder/scripts/audit-content.test.mjs:1-130`
- Modify: `/Users/park/Desktop/project/blog-platformholder/scripts/audit-content.mjs:100-118`

**Interfaces:**
- Consumes: frontmatter `publishedAt` and `updatedAt` values parsed by `gray-matter`.
- Produces: errors for invalid dates or `updatedAt < publishedAt`; accepts valid per-article update dates.

- [ ] **Step 1: Add failing date tests**

Add:

```javascript
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
```

- [ ] **Step 2: Verify the first new test is red**

```bash
npm run test:audit-content
```

Expected: FAIL because `updatedAt` is still required to equal `2026-07-30`.

- [ ] **Step 3: Replace the frozen-date check**

Use:

```javascript
if (hasField("updatedAt") && !isValidDateValue(record.data.updatedAt)) {
  errors.push(`${label}: updatedAt must be a valid YYYY-MM-DD date`);
} else if (
  hasField("updatedAt")
  && isValidDateValue(record.data.publishedAt)
  && dateString(record.data.updatedAt) < dateString(record.data.publishedAt)
) {
  errors.push(`${label}: updatedAt must not precede publishedAt`);
}
```

Delete only the old exact-`2026-07-30` article check. Keep the separate `publisher_meta_synced_at` rule unchanged.

- [ ] **Step 4: Verify green and commit**

```bash
npm run test:audit-content
npm run audit:content
git add scripts/audit-content.mjs scripts/audit-content.test.mjs
git diff --cached --check
git commit -m "test: allow article-specific update dates"
```

Expected: tests pass and the existing corpus still reports `42 published posts; 21 bilingual pairs`.

### Task 2: Add the KREAM storage-sale article pair

**Files:**
- Create: `/Users/park/Desktop/project/blog-platformholder/content/ko/resell-ops/kream-storage-sale-bid-checks.mdx`
- Create: `/Users/park/Desktop/project/blog-platformholder/content/en/resell-ops/kream-storage-sale-bid-checks.mdx`
- Modify: `/Users/park/Desktop/project/blog-platformholder/scripts/audit-content.mjs:50-55`
- Modify: `/Users/park/Desktop/project/blog-platformholder/scripts/audit-content.test.mjs:46-64`

**Interfaces:**
- Consumes: marketing truth `license_grant_gate`, official KREAM selling FAQ, and official seller-grade/fee FAQ.
- Produces: one fact-equivalent bilingual pair and corpus defaults `44 posts / 22 pairs`.

- [ ] **Step 1: Change corpus expectations first**

Change the default signature to:

```javascript
{ expectedPublishedCount = 44, expectedPairCount = 22 } = {}
```

Update the two production-default test assertions from `42/21` to `44/22`.

- [ ] **Step 2: Verify production audit is red before adding posts**

```bash
npm run test:audit-content
npm run audit:content
```

Expected: unit tests pass; production audit fails with `expected 44 published posts; found 42` and `expected 22 bilingual pairs; found 21`.

- [ ] **Step 3: Write the Korean source article**

Use this exact frontmatter identity:

```yaml
title: "KREAM 보관판매, 판매입찰 가격을 몇 번 확인하세요?"
slug: kream-storage-sale-bid-checks
service: resell-ops
type: article
publishedAt: "2026-08-01"
updatedAt: "2026-08-01"
author: platformholder
tags: [resell-ops, KREAM, 보관판매, 판매입찰, 리셀운영]
description: "KREAM 보관판매에서 판매입찰 가격을 반복 확인하게 되는 이유와 보관기간·비용·예상 실수령을 함께 기록하는 수동 점검법을 정리했습니다."
canonical: https://blog.platformholder.site/ko/blog/resell-ops/kream-storage-sale-bid-checks
hreflang:
  ko: https://blog.platformholder.site/ko/blog/resell-ops/kream-storage-sale-bid-checks
  en: https://blog.platformholder.site/en/blog/resell-ops/kream-storage-sale-bid-checks
keyTakeaways:
  - "보관판매의 운영 부담은 상품 수 자체보다 판매입찰 가격 위치와 관측 시각을 다시 확인하는 데서 생길 수 있다."
  - "입찰가만 보지 말고 예상 실수령, 보관기한, 비용 정책을 같은 기록에서 확인한다."
  - "경쟁 강도나 가격 확인 빈도는 공식 자료로 확인되지 않았으므로 보편적인 수치로 단정하지 않는다."
  - "Resell Ops의 관련 화면은 개발 목표이며 현재 사용할 수 없다."
faq:
  - question: "KREAM 보관판매 상품은 언제 판매입찰할 수 있나요?"
    answer: "공식 FAQ에 따르면 보관이 완료된 뒤 원하는 가격으로 판매입찰할 수 있습니다. 실제 상품 상태와 최신 정책은 KREAM 화면과 공식 안내에서 다시 확인해야 합니다."
  - question: "판매입찰 가격은 얼마나 자주 확인해야 하나요?"
    answer: "모든 판매자에게 맞는 횟수는 확인된 바 없습니다. 가격과 관측 시각, 예상 실수령, 보관기한을 함께 적고 본인의 의사결정 시점에 갱신하는 편이 낫습니다."
  - question: "Resell Ops에서 KREAM 보관판매를 지금 관리할 수 있나요?"
    answer: "아닙니다. Resell Ops는 현재 개발 중이며 관련 온라인 조회·실행 기능은 사용할 수 없습니다. 2026년 8월 오픈을 목표로 준비 중입니다."
feature_truth_refs:
  - license_grant_gate
feature_truth_synced_at: "2026-08-01"
```

Write these sections in this order:

1. A first-person-neutral hook about reopening the sell-bid screen after a previous price decision.
2. `상품 수보다 가격 위치가 문제입니다`: explain changing sell-bid position without claiming measured competition intensity.
3. `공식적으로 확인되는 범위`: cite KREAM's official selling FAQ and fee/grade FAQ; state that storage completion allows a sell bid, maximum storage is 120 days, and current fee terms must be rechecked because policies change.
4. `수동으로 남길 다섯 칸`: product/size, observed sell bid, observation time, estimated proceeds under dated assumptions, and storage deadline/fee checkpoint.
5. `Resell Ops가 줄이려는 확인`: planned observation/cost/storage view, explicitly unavailable now.
6. `2026년 8월 오픈 예정`: open-chat preregistration and 30-day free-use notice.
7. FAQ and links to the existing settlement/inventory articles.
8. Non-affiliation/policy-risk notice and exact Korean AI disclosure as the final line.

Do not write “상품이 많아져서 힘들다”, “경쟁이 치열하다” as a universal fact, or any rank/price-refresh frequency.

- [ ] **Step 4: Localize the English pair**

Use title `KREAM Storage Sales: How Often Do You Recheck Your Sell Bid?`, description `A practical record for rechecking KREAM storage-sale bids alongside observation time, estimated proceeds, storage deadlines, and current fee terms.`, the same slug/canonical structure, English tags, `publishedAt`/`updatedAt` `2026-08-01`, `locale="en"` on `KakaoChatCta`, identical sources, identical status, and identical August/30-day facts. Translate `판매입찰` contextually as `sell bid`; do not imply KREAM operates globally for every reader. Localize every key takeaway and FAQ above without changing its claim strength.

- [ ] **Step 5: Add the exact CTA contract**

Both locales must state immediately above the component:

```text
Resell Ops는 현재 개발 중이며 2026년 8월 오픈 예정입니다. 카카오 오픈채팅으로 사전예약하면 출시 후 30일 무료 이용을 안내해 드립니다.
```

The English sentence must be fact-equivalent. Use:

```mdx
<KakaoChatCta medium="referral" campaign="resell-ops-prelaunch-2026q3" content="kream-storage-sale-bid-checks" />
```

and add `locale="en"` in the English file.

- [ ] **Step 6: Verify and commit the pair**

```bash
npm run test:audit-content
npm run audit:content
git add scripts/audit-content.mjs scripts/audit-content.test.mjs content/ko/resell-ops/kream-storage-sale-bid-checks.mdx content/en/resell-ops/kream-storage-sale-bid-checks.mdx
git diff --cached --check
git commit -m "content: add KREAM storage-sale guide"
```

Expected: `PASS: 44 published posts; 22 bilingual pairs` plus non-blocking length warnings only.

### Task 3: Add the scheduled instant-sale article pair

**Files:**
- Create: `/Users/park/Desktop/project/blog-platformholder/content/ko/resell-ops/kream-scheduled-instant-sale.mdx`
- Create: `/Users/park/Desktop/project/blog-platformholder/content/en/resell-ops/kream-scheduled-instant-sale.mdx`
- Modify: `/Users/park/Desktop/project/blog-platformholder/scripts/audit-content.mjs:50-55`
- Modify: `/Users/park/Desktop/project/blog-platformholder/scripts/audit-content.test.mjs:46-64`

**Interfaces:**
- Consumes: marketing truth `standing_sell_rule_planned`, PRD `StandingSellRule`, and official KREAM selling FAQ.
- Produces: one fact-equivalent bilingual pair and final corpus defaults `46 posts / 23 pairs`.

- [ ] **Step 1: Raise the expected totals to 46/23 and verify red**

Set the defaults and production test assertions to `46` and `23`. Run:

```bash
npm run test:audit-content
npm run audit:content
```

Expected: unit tests pass; production audit fails with `found 44` and `found 22`.

- [ ] **Step 2: Write the Korean source article**

Use this exact frontmatter identity:

```yaml
title: "KREAM 새벽 즉시판매, 알람 없이 예약할 수 있을까?"
slug: kream-scheduled-instant-sale
service: resell-ops
type: article
publishedAt: "2026-08-01"
updatedAt: "2026-08-01"
author: platformholder
tags: [resell-ops, KREAM, 즉시판매, 판매예약, 리셀운영]
description: "KREAM 즉시판매를 특정 시각의 무조건 실행이 아니라 시간창·하한가·수량 제한을 미리 승인하는 방식으로 설계한 이유와 현재 상태를 설명합니다."
canonical: https://blog.platformholder.site/ko/blog/resell-ops/kream-scheduled-instant-sale
hreflang:
  ko: https://blog.platformholder.site/ko/blog/resell-ops/kream-scheduled-instant-sale
  en: https://blog.platformholder.site/en/blog/resell-ops/kream-scheduled-instant-sale
keyTakeaways:
  - "목표 기능은 한 시각에 무조건 실행하는 예약이 아니라 요일·타임존·시간창과 구매입찰 하한가를 함께 승인하는 조건부 즉시판매다."
  - "최대 수량, 일일 체결 횟수, 만료를 고정하고 규칙이 바뀌면 다시 승인한다."
  - "실행 직전 가격과 재고를 재확인하며 결과가 불확실하면 자동 재시도하지 않는다."
  - "이 기능은 현재 미구현이고 KREAM 온라인 capability도 비활성이다."
faq:
  - question: "즉시판매를 특정 시각에 동작하게 할 수 있나요?"
    answer: "출시 목표는 요일·타임존·시작과 종료 시각을 가진 시간창을 승인하는 방식입니다. 그 시간창 안에서도 구매입찰가가 하한가 이상일 때만 실행하므로 특정 한 시각의 무조건 실행과는 다릅니다."
  - question: "새벽에 사람이 확인하지 않아도 체결되나요?"
    answer: "목표 설계에서는 승인된 경계 안이면 사람 개입 없이 체결할 수 있습니다. 대신 가격·재고 재확인, 수량·횟수 제한, 만료, 중지 장치가 필수입니다. 현재는 구현되지 않았습니다."
  - question: "이 기능을 지금 사용할 수 있나요?"
    answer: "아닙니다. 현재 요구사항만 정의됐고 KREAM 온라인 조회·실행 capability도 비활성입니다. 2026년 8월 오픈 시 제공하는 것을 목표로 개발 중입니다."
feature_truth_refs:
  - standing_sell_rule_planned
  - license_grant_gate
feature_truth_synced_at: "2026-08-01"
```

Write these sections:

1. Hook: waiting for a selected time window, without claiming how many sellers do this.
2. `한 시각 예약이 아니라 조건을 승인합니다`: distinguish a single blind click from a day/timezone window plus floor bid.
3. A parameter table with SKU/channel, floor price/currency, weekday/timezone/start/end, max quantity, daily execution count, and expiry.
4. `실행 직전에 다시 확인할 것`: FRESH observation, bid recheck, exclusive stock reservation, no automatic retry for unknown outcome, user/operator kill switch.
5. `현재는 사용할 수 없습니다`: code/API absent and KREAM capabilities disabled.
6. `2026년 8월 오픈 예정`: open-chat preregistration and 30-day free-use notice.
7. FAQ answering “특정 시각에 동작하나요?” with “approved time window; not unconditional exact-time execution”.
8. Official KREAM source link, internal links, non-affiliation/policy-risk notice, and exact AI disclosure.

Do not say `새벽즉판`, `무조건 체결`, `잠자는 동안 알아서`, or `KREAM 연동 완료` as product claims.

- [ ] **Step 3: Localize the English pair**

Use title `Can a KREAM Instant Sale Run in a Scheduled Window?`, description `How a planned KREAM instant-sale rule uses a weekday, timezone, time window, bid floor, quantity limits, and expiry instead of a blind exact-time action.`, `publishedAt`/`updatedAt` `2026-08-01`, the same slug and sources, and translate the product contract as `weekday + timezone + time window + bid floor + quantity/execution/expiry limits`. Keep “planned for launch, not available now.” Localize every key takeaway and FAQ above without strengthening the promise.

- [ ] **Step 4: Add and verify the exact CTA**

Use campaign `resell-ops-prelaunch-2026q3`, content `kream-scheduled-instant-sale`, medium `referral`, and English locale on the English component. Include the same August target and 30-day benefit sentence in both locales.

- [ ] **Step 5: Verify and commit the pair**

```bash
npm run test:audit-content
npm run audit:content
git add scripts/audit-content.mjs scripts/audit-content.test.mjs content/ko/resell-ops/kream-scheduled-instant-sale.mdx content/en/resell-ops/kream-scheduled-instant-sale.mdx
git diff --cached --check
git commit -m "content: add scheduled instant-sale guide"
```

Expected: `PASS: 46 published posts; 23 bilingual pairs` plus non-blocking length warnings only.

### Task 4: Synchronize the existing Resell Ops article CTAs

**Files:**
- Modify: `/Users/park/Desktop/project/blog-platformholder/content/ko/resell-ops/resell-settlement-excel-limits.mdx`
- Modify: `/Users/park/Desktop/project/blog-platformholder/content/en/resell-ops/resell-settlement-excel-limits.mdx`
- Modify: `/Users/park/Desktop/project/blog-platformholder/content/ko/resell-ops/reseller-multi-channel-inventory.mdx`
- Modify: `/Users/park/Desktop/project/blog-platformholder/content/en/resell-ops/reseller-multi-channel-inventory.mdx`

**Interfaces:**
- Consumes: approved August/30-day CTA contract.
- Produces: six published Resell Ops articles with the same launch status and benefit facts.

- [ ] **Step 1: Update dates and truth references**

Set `updatedAt` and `feature_truth_synced_at` to `2026-08-01`. Add `license_grant_gate` to each existing `feature_truth_refs` array; do not add `standing_sell_rule_planned` to articles that do not mention it.

- [ ] **Step 2: Replace the old open-chat lead-in**

Keep each article's product-specific paragraph, then add the approved August/30-day sentence immediately before its existing `KakaoChatCta`. Do not alter slug, `publishedAt`, canonical, or hreflang.

- [ ] **Step 3: Add relevant cluster links**

The settlement article links to the storage-sale guide where it discusses dated fee assumptions. The multi-channel inventory article links to the scheduled-sale guide where it discusses stock reservation. Each English article links to the English path.

- [ ] **Step 4: Verify immutable search assets and commit**

```bash
npm run audit:content
git diff -- content/ko/resell-ops content/en/resell-ops | rg '^[-+](slug:|publishedAt:|canonical:|  ko: https://|  en: https://)'
git add content/ko/resell-ops/resell-settlement-excel-limits.mdx content/en/resell-ops/resell-settlement-excel-limits.mdx content/ko/resell-ops/reseller-multi-channel-inventory.mdx content/en/resell-ops/reseller-multi-channel-inventory.mdx
git diff --cached --check
git commit -m "content: align Resell Ops preregistration CTAs"
```

Expected: audit passes; the immutable-field scan has no output.

### Task 5: Run content-ops scoring, site validation, and deployment gate

**Files:**
- Create: `/Users/park/Desktop/project/blog-platformholder/docs/audits/2026-08-01-resell-ops-kream-content-quality.md`
- Modify if scoring requires: the four new MDX files only, up to three rounds.

**Interfaces:**
- Consumes: all four new articles, marketing feature truth, official KREAM sources, and the content-ops rubric.
- Produces: a durable claim ledger, all score rounds, final 90+ gate, and reproducible command results.

- [ ] **Step 1: Build the source and claim ledger**

List at least these direct sources:

```text
https://kream.co.kr/faq?category=selling&list=true
https://kream.co.kr/faq/221/
```

For each platform fact, record `retained with official source`, `softened`, or `removed`. Record product claims separately against `license_grant_gate` and `standing_sell_rule_planned`.

- [ ] **Step 2: Score round 1 with all nine lenses**

Record Hook, Voice, Value Density, and Engagement out of 25 for each article, plus expert scores for content strategy, SEO intent, seller empathy, practical value, PRD truth, evidence/policy risk, CTA, brand voice, and Humanizer/AI detector at 1.5×. If any expert is below 90, name the largest three defects and edit only those defects.

- [ ] **Step 3: Repeat at most two more rounds**

Include every round in the audit. Stop early only when every expert reaches at least 90. If the third round still fails, block deployment and document the exact remaining scores.

- [ ] **Step 4: Run deterministic validation**

```bash
npm run test:audit-content
npm run audit:content
npm run lint
npm run build
rg -n "15일|15-day|15 days|15\+15|지금 사용|연동 완료|무조건 체결|수익 보장" content/ko/resell-ops content/en/resell-ops --glob '*.mdx'
rg -n "2026년 8월 오픈 예정|30일 무료|August 2026|30 days" content/ko/resell-ops content/en/resell-ops --glob '*.mdx'
```

Expected: all npm commands exit `0`; stale/forbidden scan has no rendered claim matches; approved launch/benefit scan finds every published Resell Ops pair.

- [ ] **Step 5: Commit the audit and any scoring edits**

```bash
git add docs/audits/2026-08-01-resell-ops-kream-content-quality.md content/ko/resell-ops/kream-storage-sale-bid-checks.mdx content/en/resell-ops/kream-storage-sale-bid-checks.mdx content/ko/resell-ops/kream-scheduled-instant-sale.mdx content/en/resell-ops/kream-scheduled-instant-sale.mdx
git diff --cached --check
git commit -m "docs: record Resell Ops content quality audit"
```

If no article changed during scoring, commit only the audit file.

- [ ] **Step 6: Stop for external deployment approval**

Report repository commits, the full validation results, every content-ops round, and remaining T2 launch gates. Do not push, deploy, or submit IndexNow until the user explicitly approves those external actions.
