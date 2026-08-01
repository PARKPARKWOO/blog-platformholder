# Resell Ops KREAM content quality audit — 2026-08-01

## Corrected result

**PASS — final content-quality mean 91.8/100; final weighted expert mean 94.6/100.** Every article finishes with every one of the nine expert lenses at 90 or above.

This audit includes an independent-review correction to the initial Task 5 audit in commit `efdcfafe21501133b0e8a9330c7ba19abcf489df`. The initial audit correctly found the English storage FAQ actor defect, but it incorrectly treated a planned five-field Resell Ops view as supported. That product-view claim had no feature-truth or PRD source. The corrected scoring trail below does not erase the initial record:

- both storage articles fail corrected Round 1 on PRD truth and evidence/policy risk;
- the English article also fails on the original “item receive a sell bid” actor defect;
- English Round 2 fixes the actor but still fails the product-source gate;
- the Korean article passes Round 2 and the English article passes Round 3 only after the unsupported view promise is removed;
- both scheduled instant-sale articles remain Round 1 passes.

This is an internal editorial gate, not independent product validation and not approval to publish externally. No push, deployment, or IndexNow submission is authorized here.

## Scope and change history

Task 5 base: `d31b12d7962ebf395615be378eee9020dd3cd505`.

| ID | Localized article |
|---|---|
| KS-KO | `content/ko/resell-ops/kream-storage-sale-bid-checks.mdx` |
| KS-EN | `content/en/resell-ops/kream-storage-sale-bid-checks.mdx` |
| KI-KO | `content/ko/resell-ops/kream-scheduled-instant-sale.mdx` |
| KI-EN | `content/en/resell-ops/kream-scheduled-instant-sale.mdx` |

The initial Task 5 commit changed the KS-EN FAQ question in frontmatter and rendered content:

> `When can a KREAM storage-sale item receive a sell bid?`
> → `When can I place a sell bid for a KREAM storage-sale item?`

The independent-review remediation changes only KS-KO and KS-EN:

- removes the key-takeaway promise that a related Resell Ops view is a development goal;
- removes the body promise of one Resell Ops view combining observed bid, observation time, cost assumptions, estimated proceeds, and storage deadline;
- identifies those five fields as a manual record a seller can create and use today;
- states separately that Resell Ops has no public installer/distribution and that no KREAM online lookup or execution function is available now.

No new `feature_truth_refs` key was added. The two scheduled articles, approved August/30-day CTA language, Korean scheduled-sale wording, official KREAM claims, canonical metadata, and localization links are unchanged.

## Sources reviewed

### Direct official KREAM sources

| ID | Direct source | Facts used |
|---|---|---|
| KREAM-S1 | [KREAM selling FAQ](https://kream.co.kr/faq?category=selling&list=true) | Instant sale versus sell bid; storage-sale flow; seller placement of a chosen-price sell bid after storage; maximum storage period; extension and cost cautions. |
| KREAM-S2 | [KREAM seller-grade and fee FAQ](https://kream.co.kr/faq/221/) | Seller-grade and fee policy effective 2026-03-02; storage deposit and warehouse-fee categories; explicit policy-change caution. |

The pages were rechecked on 2026-08-01. KREAM-S1 makes the seller the actor who places a sell bid after storage. KREAM-S2 labels its terms effective 2026-03-02 and says the policy may change.

### Product and editorial truth

| ID | Source | Exact boundary |
|---|---|---|
| PT1 | `marketing/services/resell-ops/feature-truth.md`, `license_grant_gate` | PRE_LAUNCH; no self-service UI or public distribution; a new trial grant is owner-lifetime-once and 30 days; allowed CTA is information about 30 days of free use after launch. **It does not support a specific storage-operation view.** |
| PT2 | `marketing/services/resell-ops/feature-truth.md`, `standing_sell_rule_planned` | Planned scheduled-sale approval envelope, final checks, no uncertain retry, kill switches, unimplemented state, and disabled KREAM listing capabilities. |
| PRD1 | `prd/resell-ops/requirements.md` §4.8 | `StandingSellRule`/`StandingApproval` parameters, freshness, exclusive reservation, reconciliation, and implementation preconditions. |
| PRD2 | `prd/resell-ops/connectors/kream.md` capability matrix and T2 release checklist | `listing.read`, `listing.create`, and storage capabilities remain `DISABLED`. This supports “no current KREAM online lookup/execution,” **not a future combined Resell Ops view.** |
| ED1 | `marketing/services/resell-ops/{audience,brand,messaging,channels,positioning}.md` | Seller pain, non-affiliation, PRE_LAUNCH voice, August 2026 target, Kakao Open Chat preregistration, and sensitive-data boundary. |

### Content-ops references

- `content-ops/scoring-rubrics/content-quality.md` for Hook, Voice, Value Density, and Engagement.
- `content-ops/experts/humanizer.md` for the Humanizer/AI detector, weighted 1.5×.
- `content-ops/references/patterns.md`; it contained no learned rejection patterns.
- `content-ops/experts/seo-strategy.md` for direct evidence, search intent, specificity, feasibility, and risk.

## Platform claim ledger

Every material KREAM fact considered for these articles has one disposition.

| Key platform fact considered | Articles | Disposition | Reason and source |
|---|---|---|---|
| A storage sale sends an item before a transaction, inspects it, stores it, and then permits a sell bid. | KS pair | retained with official source | KREAM-S1 directly describes this sequence. |
| After storage is complete, the seller can place a sell bid at a chosen price. | KS pair | retained with official source | KREAM-S1 makes the seller the actor; the KS-EN FAQ was corrected in initial Task 5 Round 2. |
| An instant sale sells into the highest existing buy bid. | Both pairs | retained with official source | KREAM-S1 directly distinguishes it from a seller-created sell bid. |
| A sell bid is the seller's chosen ask and can transact when a buyer wants that price. | Both pairs | retained with official source | KREAM-S1 supports the mechanism; no buyer-appearance or match guarantee is added. |
| Storage has a maximum period of 120 days. | KS pair | retained with official source | KREAM-S1 states the maximum; the articles require an item-level expiry recheck. |
| Storage renews in 30-day units and the current policy includes warehouse fees. | KS pair | softened | The 30-day unit remains, but the articles say fees may apply and require current item/policy verification instead of freezing a permanent amount or process. |
| The storage application currently uses a refundable per-item deposit. | KS pair | softened | KREAM-S1/S2 support the current deposit; the articles retain only a dated storage-cost category and do not copy an amount or refund guarantee. |
| The first 30 storage days and early recovery have detailed current fee rules. | KS pair | removed | Volatile amounts and edge conditions are unnecessary for the manual checklist; official terms take priority. |
| The seller policy has five grades, rates, caps, and premium-category values. | KS pair | softened | The articles retain only the existence of seller grades/fees under terms effective 2026-03-02. Exact values are removed. |
| Seller-grade, benefit, and fee policies may change. | KS pair | retained with official source | Both official pages carry change cautions; both locales defer to current official guidance. |
| Storage-sale settlement can occur the next business day after a match. | KS pair | removed | It is not necessary for the price-check record and would add a volatile settlement promise. |
| Exact deposits, warehouse fees, recovery shipping fees, and penalty percentages are permanent values. | KS pair | removed | No article makes this claim; exact values are omitted and date-bounded. |
| KREAM provides or approves a Resell Ops integration. | Both pairs | removed | Both pairs deny affiliation/approval and state current online capability limits. |

## Product claim ledger

Product evidence is deliberately split by source. No single truth ID is stretched to cover the removed view.

| Evidence ID | Product claim considered | Disposition | Evidence boundary |
|---|---|---|---|
| `license_grant_gate` | Resell Ops has no current public installer/distribution or self-service activation. | retained against product truth | PT1 directly supports PRE_LAUNCH/public-distribution status. |
| `license_grant_gate` | Preregistration provides information about 30 days of free use after launch, not immediate activation. | retained against product truth | PT1 and ED1 support the future benefit and denial of current activation. |
| PRD2 | KREAM online lookup and execution are not available now. | retained against connector PRD | `listing.read`, `listing.create`, and storage capabilities remain `DISABLED`. |
| No supporting key | Resell Ops plans one view combining observed bid, observation time, cost assumptions, estimated proceeds, and storage deadline. | **removed as unsupported** | PT1 says nothing about this view, and PRD2 proves only disabled current capabilities. No replacement feature-truth key was invented. |
| `standing_sell_rule_planned` | The planned scheduled rule approves SKU/channel, displayed buy-bid floor, weekday/timezone/window, maximum quantity, daily count, and expiry. | retained against product truth | PT2 and PRD1 enumerate these parameters. |
| `standing_sell_rule_planned` | Any parameter change invalidates prior approval. | retained against product truth | PRD1 binds approval to the parameter digest. |
| `standing_sell_rule_planned` | Execution requires fresh data, inventory reservation, and final price/inventory checks. | retained against product truth | PT2/PRD1 directly require those gates. |
| `standing_sell_rule_planned` | An `UNKNOWN` result is not automatically retried; reconciliation and user/operator kill switches are required. | retained against product truth | PT2/PRD1 support both controls. |
| `standing_sell_rule_planned` | The scheduled feature exists in code/API or KREAM capabilities are enabled. | removed | PT2/PRD2 state the opposite. |
| `standing_sell_rule_planned` | August 2026 is an exact-date or passed-gate promise. | removed | It is a target; all T2 gates must pass before availability is declared. |
| `standing_sell_rule_planned` | A blind exact-time macro should execute unconditionally. | removed | “무조건 실행” and “매크로” remain only in explicit denial/comparison. |

## Expert panel and scoring method

| Expert lens | What it checked |
|---|---|
| Content strategy | Problem-to-evidence-to-action structure and cluster role. |
| SEO intent | Seller query alignment, locale-specific terms, headings, FAQ wording, and internal links. |
| Seller empathy | Natural seller agency and avoidance of invented universal behavior. |
| Practical value | A usable manual record or a reviewable decision/safety model. |
| PRD truth | Exact current/planned state and whether each product claim has a supporting truth source. |
| Evidence/policy risk | Actor, mechanism, date, numeric volatility, affiliation, and source-to-claim fit. |
| CTA | PRE_LAUNCH preregistration, benefit wording, and sensitive-data guard. |
| Brand voice | Restrained, direct, non-affiliated, and free of outcome guarantees. |
| Humanizer/AI detector | The 24 Humanizer patterns and banned vocabulary. Weighted 1.5×. |

Weighted result: `(sum of eight ordinary lenses + 1.5 × Humanizer) / 9.5`. Passing requires every expert, not merely the aggregate, to reach 90. Content-quality dimensions are separately scored out of 25.

## Superseded initial assessment — retained for correction history

Commit `efdcfafe21501133b0e8a9330c7ba19abcf489df` recorded these results:

| Article/state | Content total | Weighted experts | Minimum expert | Initial conclusion | Corrected status |
|---|---:|---:|---:|---|---|
| KS-KO Round 1, unsupported view present | 91 | 94.2 | 92 | Pass | Over-supported; PRD truth/evidence should have failed. |
| KS-EN Round 1, actor defect + unsupported view | 90 | 92.2 | 87 | Actor fix required | Incomplete diagnosis; product-source gap was also present. |
| KS-EN Round 2, actor fixed + unsupported view | 91 | 94.3 | 92 | Pass | Incorrect stop; actor fix did not resolve the unsupported view. |
| KI-KO Round 1 | 93 | 94.9 | 91 | Pass | Unchanged and still valid. |
| KI-EN Round 1 | 92 | 94.9 | 91 | Pass | Unchanged and still valid. |

The error was not a new KREAM-policy discovery. It was a source-to-product-claim mismatch: the initial audit treated “development goal” plus “not available” as sufficient support for a specific future view. A non-availability caveat cannot supply evidence for the future UI claim it qualifies.

## Authoritative corrected Round 1

### Content-quality rubric

| Article | Hook /25 | Voice /25 | Value Density /25 | Engagement /25 | Total /100 | Result |
|---|---:|---:|---:|---:|---:|---|
| KS-KO | 22 | 23 | 21 | 21 | 87 | Fix required |
| KS-EN | 22 | 22 | 21 | 20 | 85 | Fix required |
| KI-KO | 23 | 23 | 25 | 22 | 93 | Pass |
| KI-EN | 22 | 23 | 25 | 22 | 92 | Pass |

### KS-KO corrected Round 1 — weighted 90.5 — needs work

| Expert | Score | Reason/evidence |
|---|---:|---|
| Content strategy | 92 | The source/checklist/CTA arc works, but the unsupported product-view bridge weakens the editorial contract. |
| SEO intent | 94 | Korean storage-sale and sell-bid intent is directly answered. |
| Seller empathy | 93 | The repeated-check pain and refusal to invent cadence remain credible. |
| Practical value | 92 | The five-field manual checklist is useful, but it is unnecessarily attached to an unverified future UI. |
| PRD truth | 82 | Neither `license_grant_gate` nor the connector PRD defines the promised combined Resell Ops view. |
| Evidence/policy risk | 84 | “Development goal” is still a positive product claim and has no direct product source. |
| CTA | 94 | Preregistration and sensitive-data wording remain bounded. |
| Brand voice | 91 | Current unavailability is candid, but candor does not cure the unsupported roadmap detail. |
| Humanizer/AI detector ×1.5 | 92 | Concrete seller observation and fields remain human-sounding; no banned-vocabulary defect. |

Largest three defects:

1. The article promises a specific one-screen storage workflow without a feature-truth or PRD claim.
2. `license_grant_gate` is used beyond its actual scope; it supports distribution/trial boundaries, not storage UI.
3. The paragraph mixes a useful manual record with a future product promise, reducing value density and evidence clarity.

Change required for KS-KO Round 2: remove the view promise; keep the five fields as a manual record; state public-distribution and disabled KREAM capability facts from their separate sources.

### KS-EN corrected Round 1 — weighted 88.6 — needs work

| Expert | Score | Reason/evidence |
|---|---:|---|
| Content strategy | 92 | The article has a strong manual-record arc, but the unsupported product-view bridge remains. |
| SEO intent | 88 | “When can an item receive a sell bid?” misses the natural seller-action query. |
| Seller empathy | 89 | The passive item-centered question weakens seller agency. |
| Practical value | 92 | The checklist is usable, but the unverified product view adds no supported practical value. |
| PRD truth | 80 | The combined view has no truth key or PRD contract. |
| Evidence/policy risk | 78 | Two independent source defects exist: actor inversion against KREAM-S1 and an unsupported product-view claim. |
| CTA | 94 | PRE_LAUNCH benefit and sensitive-data restrictions are correct. |
| Brand voice | 91 | Restrained overall, but “development goal” gives unsupported roadmap specificity. |
| Humanizer/AI detector ×1.5 | 92 | The FAQ defect is semantic rather than a broad AI-writing pattern. |

Largest three defects:

1. The future combined-view promise has no product source.
2. The FAQ makes the item, rather than the seller, the sell-bid actor.
3. The article conflates PT1 distribution/trial evidence with PRD2 disabled-capability evidence and still derives a UI neither source defines.

Changes required: fix the FAQ actor in both copies, then remove the unsupported view rather than treating its non-availability caveat as proof.

### KI-KO Round 1 — weighted 94.9 — pass

| Expert | Score | Reason/evidence |
|---|---:|---|
| Content strategy | 96 | Overnight pain leads to mechanism, approval envelope, execution sequence, current-state warning, and CTA. |
| SEO intent | 94 | Korean scheduled/overnight KREAM instant-sale intent is answered without implying current availability. |
| Seller empathy | 94 | It recognizes overnight waiting without promising unattended success. |
| Practical value | 96 | The parameter table and six-step safety sequence are reviewable today. |
| PRD truth | 98 | Parameters, invalidation, freshness, reservation, recheck, reconciliation, kill switches, and status match PT2/PRD1. |
| Evidence/policy risk | 98 | KREAM mechanics and planned product mechanics are separately attributed. |
| CTA | 95 | Future benefit and no-immediate-activation boundaries are adjacent to the CTA. |
| Brand voice | 94 | “무조건 실행” and “매크로” occur only in denial/comparison. |
| Humanizer/AI detector ×1.5 | 91 | Concrete examples and technical specificity offset necessary repeated safety structures. |

### KI-EN Round 1 — weighted 94.9 — pass

| Expert | Score | Reason/evidence |
|---|---:|---|
| Content strategy | 96 | Complete problem, evidence, planned design, risk, availability, and conversion arc. |
| SEO intent | 95 | “KREAM instant sale” and “scheduled window” match English seller intent. |
| Seller empathy | 93 | The overnight alarm scenario respects seller approval boundaries. |
| Practical value | 96 | The parameter matrix and safety sequence make the planned rule reviewable. |
| PRD truth | 98 | Every scheduled parameter and gate maps to PT2/PRD1. |
| Evidence/policy risk | 98 | No partnership, enabled integration, exact date, or result is promised. |
| CTA | 95 | Preregistration only; instant account/execution activation is denied. |
| Brand voice | 94 | Restrained and explanatory. |
| Humanizer/AI detector ×1.5 | 91 | No banned vocabulary or generic conclusion; safety repetition is functional. |

## Round 2

### KS-KO Round 2 after removing the view — weighted 94.3 — pass

Content quality: Hook 22, Voice 23, Value Density 24, Engagement 22 — **91/100**.

| Expert | Score | Reason/evidence |
|---|---:|---|
| Content strategy | 94 | The article now moves directly from official facts to a manual record and a separate current-state boundary. |
| SEO intent | 94 | Search alignment is unchanged and direct. |
| Seller empathy | 94 | The seller owns and can use the record today; no speculative product bridge remains. |
| Practical value | 95 | Five concrete fields stand on their own as a current manual checklist. |
| PRD truth | 96 | PT1 supports no public distribution/trial wording; PRD2 separately supports no KREAM online lookup/execution. |
| Evidence/policy risk | 96 | The unsupported future UI is absent and each remaining product statement has a bounded source. |
| CTA | 94 | Approved August/30-day preregistration copy is preserved. |
| Brand voice | 95 | Direct, non-affiliated, and clear about current unavailability. |
| Humanizer/AI detector ×1.5 | 92 | Specific fields and straightforward boundaries remain human-sounding. |

No expert remains below 90. KS-KO stops at Round 2.

### KS-EN Round 2 after actor fix only — weighted 90.4 — needs work

Content quality: Hook 22, Voice 23, Value Density 21, Engagement 20 — **86/100**.

| Expert | Score | Reason/evidence |
|---|---:|---|
| Content strategy | 92 | The actor correction improves the FAQ, but the unsupported product-view bridge remains. |
| SEO intent | 94 | The question now uses the direct seller-action query. |
| Seller empathy | 94 | First-person seller agency is restored. |
| Practical value | 92 | The checklist is useful, but the future view still lacks support. |
| PRD truth | 80 | Actor correction does not create evidence for the combined Resell Ops view. |
| Evidence/policy risk | 84 | KREAM actor evidence is fixed; product-source fit still fails. |
| CTA | 94 | PRE_LAUNCH CTA remains correct. |
| Brand voice | 91 | Honest non-availability wording remains, but unsupported roadmap specificity persists. |
| Humanizer/AI detector ×1.5 | 92 | The awkward passive actor is gone; no Humanizer defect appears. |

Largest three remaining defects:

1. The combined five-field product view still has no source.
2. `license_grant_gate` supports PRE_LAUNCH/public distribution and trial benefit only.
3. PRD2 supports disabled current KREAM capabilities only; it cannot substantiate the future view.

Round 2 change made: only the actor fix. Because PRD truth and evidence/policy risk remain below 90, the initial audit's stop at Round 2 was incorrect.

## Round 3

### KS-EN Round 3 after removing the view — weighted 94.3 — pass

Content quality: Hook 22, Voice 23, Value Density 24, Engagement 22 — **91/100**.

| Expert | Score | Reason/evidence |
|---|---:|---|
| Content strategy | 94 | Official facts lead directly to the manual record and separately sourced current-state boundary. |
| SEO intent | 94 | The seller-action FAQ and storage-sale terminology remain direct. |
| Seller empathy | 94 | The seller can use the record now without being sold an unverified UI. |
| Practical value | 95 | The five-field checklist is concrete and independent of future product delivery. |
| PRD truth | 96 | PT1 and PRD2 are used only within their exact boundaries. |
| Evidence/policy risk | 96 | Both actor and product-source defects are resolved. |
| CTA | 94 | Approved August/30-day preregistration copy remains intact. |
| Brand voice | 95 | Clear current unavailability, no affiliation, and no speculative feature promise. |
| Humanizer/AI detector ×1.5 | 92 | Direct, concrete, and free of banned-vocabulary/formulaic-conclusion defects. |

No expert remains below 90. KS-EN stops at Round 3, within the three-round maximum.

## Final scores

| Article | Final round | Hook | Voice | Value | Engagement | Content total | Final expert vector: strategy / SEO / empathy / practical / PRD / evidence / CTA / brand / Humanizer | Weighted | Minimum | Gate |
|---|---:|---:|---:|---:|---:|---:|---|---:|---:|---|
| KS-KO | 2 | 22 | 23 | 24 | 22 | 91 | 94 / 94 / 94 / 95 / 96 / 96 / 94 / 95 / 92 | 94.3 | 92 | Pass |
| KS-EN | 3 | 22 | 23 | 24 | 22 | 91 | 94 / 94 / 94 / 95 / 96 / 96 / 94 / 95 / 92 | 94.3 | 92 | Pass |
| KI-KO | 1 | 23 | 23 | 25 | 22 | 93 | 96 / 94 / 94 / 96 / 98 / 98 / 95 / 94 / 91 | 94.9 | 91 | Pass |
| KI-EN | 1 | 22 | 23 | 25 | 22 | 92 | 96 / 95 / 93 / 96 / 98 / 98 / 95 / 94 / 91 | 94.9 | 91 | Pass |
| **Mean** | — | — | — | — | — | **91.8** | — | **94.6** | **91** | **Pass** |

## Humanizer and literal-context review

The English Humanizer banned-vocabulary scan returned no matches. Two standalone `not only` literals remain concrete comparisons, not the flagged `not only ... but ...` formula. Humanizer remains 91–92 because the necessary approval/safety language is more formal than the narrative sections.

The forbidden-phrase scan is not empty. It returns two `지금 사용` matches in KI-KO FAQ questions. Both ask whether the unavailable feature can be used now and are immediately answered `아닙니다`. Supplemental context scanning finds `무조건 실행` twice and `매크로` once in KI-KO; all are explicit denial/comparison, not positive product claims.

## Deterministic validation after remediation

| Command | Exit | Result |
|---|---:|---|
| `npm run test:audit-content` | 0 | 11 tests passed; 0 failed. |
| `npm run audit:content` | 0 | **PASS: 46 published posts; 23 bilingual pairs.** Non-fatal metadata-length warnings only; five relate to the new posts (Korean scheduled title/description, Korean storage title/description, and English storage description). |
| `npm run lint` | 0 | ESLint completed with no findings. |
| `npm run build`, approved out-of-sandbox run | 0 | Compiled, TypeScript passed, and 355 static pages generated. |
| Required stale/forbidden `rg` scan | 0 | Two negative `지금 사용` questions; no positive stale/forbidden claim. |
| Required approved launch/benefit `rg` scan | 0 | August 2026 and 30-day future-benefit wording found across every published Resell Ops pair. |
| Removed-view scan for `관련 화면|related Resell Ops view|plans a view|한 화면에서 검토|development goal` | 1 | Expected zero matches in the two storage articles. |
| Manual/current-boundary scan | 0 | Both locales contain the five-field manual-record boundary, no public distribution, and no current KREAM online lookup/execution. |
| `git diff --check` before staging | 0 | No whitespace errors. |

### Build warnings, separate from failures

The successful remediation build emitted the same three pre-existing warnings:

1. Next.js inferred `/Users/park/Desktop/package-lock.json` as workspace root because multiple lockfiles exist.
2. Generated CSS reported an `@import` ordering warning for Pretendard.
3. Turbopack reported an unexpectedly broad NFT trace through `next.config.ts` and the feed route.

The initial Task 5 execution had a separate sandbox build failure because Turbopack could not bind an internal port; its approved rerun passed. The remediation build was run directly in the approved environment and exited 0.

## Deployment gate

The **local content deployment gate is ready** after remediation: all final experts are 90+, 46 posts and 23 pairs are confirmed, and tests, corpus audit, lint, production build, scans, and diff checks pass.

External deployment is not approved. StandingSellRule code/API, KREAM T2 policy and technical gates, signed installers, production auth/step-up, capability limits, privacy/legal review, non-affiliation approval, reconciliation, and kill-switch evidence remain required. Push, deployment, and IndexNow require explicit approval.

## Feedback-to-source

No originating content-generation skill was supplied. The reusable editorial rule is: a non-availability caveat does not substantiate the future product feature it qualifies. Use `license_grant_gate` only for distribution/trial boundaries, use PRD2 only for disabled KREAM capabilities, and remove any more specific product UI claim unless a direct truth source exists.
