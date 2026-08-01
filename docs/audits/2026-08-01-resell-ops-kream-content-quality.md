# Resell Ops KREAM content quality audit — 2026-08-01

## Result

**PASS — final weighted panel result 94.6/100.** Every article finishes with every one of the nine expert lenses at 90 or above. The Korean storage-sale article and both scheduled instant-sale articles passed in Round 1. The English storage-sale article required one evidence-backed wording fix and passed in Round 2.

This is an internal editorial quality gate, not independent validation and not approval to publish externally. Push, deployment, and IndexNow remain outside this audit.

## Scope

Base revision: `d31b12d7962ebf395615be378eee9020dd3cd505`.

| ID | Localized article |
|---|---|
| KS-KO | `content/ko/resell-ops/kream-storage-sale-bid-checks.mdx` |
| KS-EN | `content/en/resell-ops/kream-storage-sale-bid-checks.mdx` |
| KI-KO | `content/ko/resell-ops/kream-scheduled-instant-sale.mdx` |
| KI-EN | `content/en/resell-ops/kream-scheduled-instant-sale.mdx` |

No approved launch fact, Korean wording, platform-policy claim, product capability claim, CTA, or protected metadata was changed. The only article edit was the KS-EN FAQ question, in frontmatter and rendered copy:

> `When can a KREAM storage-sale item receive a sell bid?`
> → `When can I place a sell bid for a KREAM storage-sale item?`

## Sources reviewed

### Direct official KREAM sources

| ID | Direct source | Facts used |
|---|---|---|
| KREAM-S1 | [KREAM selling FAQ](https://kream.co.kr/faq?category=selling&list=true) | Instant sale versus sell bid; storage-sale flow; seller placement of a chosen-price sell bid after storage; maximum storage period; extension and cost cautions. |
| KREAM-S2 | [KREAM seller-grade and fee FAQ](https://kream.co.kr/faq/221/) | Seller-grade and fee policy effective 2026-03-02; storage deposit and warehouse-fee categories; explicit policy-change caution. |

The source pages were rechecked on 2026-08-01. KREAM-S1 says an instant sale uses the highest existing buy bid, while a sell bid is registered by the seller at the seller's chosen ask. It also says a storage-sale item may be listed by the seller at a chosen price after warehouse storage is complete. KREAM-S2 labels its terms effective 2026-03-02 and says the policy may change.

### Product and editorial truth

| ID | Source | Boundary checked |
|---|---|---|
| PT1 | `marketing/services/resell-ops/feature-truth.md`, `license_grant_gate` | PRE_LAUNCH; owner-lifetime-once 30-day trial for new grants; backend issuance exists, but no self-service UI or public distribution; allowed wording is information about 30 days of free use after launch, never immediate activation. |
| PT2 | `marketing/services/resell-ops/feature-truth.md`, `standing_sell_rule_planned` | Planned seller-approved SKU/channel, displayed buy-bid floor, weekday/timezone/window, quantity/count/expiry envelope; final price and inventory recheck; no retry for uncertain outcomes; user/operator kill switches; no current code or API; KREAM online capabilities disabled. |
| PRD1 | `prd/resell-ops/requirements.md` §4.8 | `StandingSellRule` and `StandingApproval` semantics, required parameters, freshness, exclusive inventory reservation, reconciliation, and preconditions. |
| PRD2 | `prd/resell-ops/connectors/kream.md` capability matrix and T2 release checklist | `listing.read`, `listing.create`, and storage capabilities remain `DISABLED`; the T2 policy, security, contract, privacy, signing, and release gates remain open. |
| ED1 | `marketing/services/resell-ops/{audience,brand,messaging,channels,positioning}.md` | Seller pain, non-affiliation, PRE_LAUNCH voice, August 2026 target wording, Kakao Open Chat preregistration, and sensitive-data boundary. |

### Content-ops references

- `content-ops/scoring-rubrics/content-quality.md` for Hook Power, Voice Authenticity, Value Density, and Engagement Potential.
- `content-ops/experts/humanizer.md` for the Humanizer/AI detector, weighted 1.5×.
- `content-ops/references/patterns.md`; it contained no learned rejection patterns.
- `content-ops/experts/seo-strategy.md` for search-intent, direct-evidence, specificity, risk, and feasibility checks.

## Platform claim ledger

Every material KREAM fact considered for these articles has one disposition below.

| Key platform fact considered | Articles | Disposition | Reason and source |
|---|---|---|---|
| A storage sale sends an item before a transaction, inspects it, stores it, and then permits a sell bid. | KS pair | retained with official source | KREAM-S1 directly describes that sequence; both locales preserve it without adding automation. |
| After storage is complete, the seller can place a sell bid at a chosen price. | KS pair | retained with official source | KREAM-S1 makes the seller the actor. The KS-EN Round 1 FAQ inverted that actor; Round 2 corrects both copies of the question. |
| An instant sale sells into the highest existing buy bid. | Both pairs | retained with official source | KREAM-S1 directly distinguishes this from a seller-created sell bid. |
| A sell bid is the seller's chosen ask and can transact when a buyer wants that price. | Both pairs | retained with official source | KREAM-S1 supports the mechanism. Copy avoids promising that a buyer will appear. |
| Storage has a maximum period of 120 days. | KS pair | retained with official source | KREAM-S1 states the maximum. The articles tell the reader to verify the item-level expiry before acting. |
| Storage renews in 30-day units and the current policy includes warehouse fees. | KS pair | softened | The articles retain the 30-day unit but say fees may apply and require a current item/policy check; they do not freeze today's automatic-renewal mechanics or amount as permanent. |
| The storage application currently uses a refundable per-item deposit. | KS pair | softened | KREAM-S1 and KREAM-S2 support the current deposit. The articles use the broader, dated category “storage application costs” and do not reproduce an amount or refund guarantee. |
| The first 30 storage days and early recovery have current detailed fee rules. | KS pair | removed | Exact amounts and edge conditions are volatile and not needed for the manual-record lesson; readers are sent to current official terms. |
| The seller policy has five grades, current fee rates, caps, and premium-category values. | KS pair | softened | The articles retain only that grades and fees are listed under terms effective 2026-03-02. Exact rates, thresholds, caps, and category values are removed. |
| Seller-grade, benefit, and fee policies may change. | KS pair | retained with official source | Both official pages carry change cautions; both locales state that current KREAM guidance takes priority. |
| Storage-sale settlement can occur the next business day after a match. | KS pair | removed | KREAM-S1 currently states it, but it is not necessary for the article's price-check record and would add a volatile settlement promise. |
| Exact deposits, warehouse fees, recovery shipping fees, and penalty percentages are permanent values. | KS pair | removed | Neither article makes that claim. Numeric policy values were intentionally omitted and date-bounded. |
| KREAM provides or approves a Resell Ops integration. | Both pairs | removed | The articles explicitly deny affiliation/approval and say current online lookup and execution are unavailable. |

## Product claim ledger

Product claims are separated from KREAM platform facts.

| Truth ID | Product claim in the articles | Disposition | Evidence |
|---|---|---|---|
| `license_grant_gate` | Resell Ops is in development and has no current installable public distribution or related online KREAM execution. | retained against product truth | PT1 and the PRE_LAUNCH header state no public distribution and no current-use product claim. |
| `license_grant_gate` | Kakao Open Chat preregistration provides information about 30 days of free use after launch. | retained against product truth | PT1 and ED1 approve this exact future-benefit boundary. Both locales deny immediate activation. |
| `license_grant_gate` | A visitor can start or activate a 30-day trial now. | removed | PT1 forbids immediate-use wording. The articles contain no download, activation, or self-service claim. |
| `standing_sell_rule_planned` | The planned rule approves SKU/channel, displayed buy-bid floor, weekday/timezone/window, maximum quantity, daily execution count, and expiry. | retained against product truth | PT2 and PRD1 enumerate these required parameters. |
| `standing_sell_rule_planned` | Any parameter change invalidates the previous approval. | retained against product truth | PRD1 binds approval to the rule-parameter digest and requires approval again after a change. |
| `standing_sell_rule_planned` | Execution requires fresh data, exclusive inventory reservation, and a final price/inventory recheck. | retained against product truth | PT2 and PRD1 explicitly require these gates. |
| `standing_sell_rule_planned` | An `UNKNOWN` result is not automatically retried; reconciliation and user/operator kill switches are required. | retained against product truth | PT2 and PRD1 support both controls. |
| `standing_sell_rule_planned` | The feature exists in code or API and KREAM online capabilities are enabled. | removed | PT2 and PRD2 say there is no current implementation and `listing.read`/`listing.create` remain `DISABLED`. |
| `standing_sell_rule_planned` | August 2026 is a target, not an exact-date or passed-gate promise. | retained against product truth | PT2 and PRD1 §4.8 require planned/unimplemented wording and all T2 gates before declaring availability. |
| `standing_sell_rule_planned` | A blind one-time macro should execute unconditionally. | removed | The articles use “무조건 실행” and “매크로” only to deny and contrast that behavior with the approved envelope. |

## Expert panel and scoring method

| Expert lens | What it checked |
|---|---|
| Content strategy | Problem-to-evidence-to-action structure and cluster role. |
| SEO intent | KREAM seller query alignment, locale-specific terms, headings, FAQ wording, and internal links. |
| Seller empathy | Natural seller agency, repeated-check pain, overnight-operation pain, and avoidance of invented universal behavior. |
| Practical value | A reader-usable manual record or explicit decision/safety model. |
| PRD truth | Current versus planned status, feature-truth keys, launch target, trial wording, and capability state. |
| Evidence/policy risk | Actor, mechanism, source date, numeric volatility, affiliation, and policy-change boundaries. |
| CTA | PRE_LAUNCH preregistration only, benefit wording, and sensitive-data guard. |
| Brand voice | Restrained, direct, non-affiliated, no outcome guarantee, and approved comparative language. |
| Humanizer/AI detector | The 24 Humanizer patterns and banned vocabulary. Weighted 1.5×. |

Each expert scores 0–100. The weighted result is `(sum of eight ordinary lenses + 1.5 × Humanizer) / 9.5`. Passing requires every expert, not merely the aggregate, to reach at least 90. Content-quality dimensions are separately scored out of 25 and sum to 100.

## Round 1

### Content-quality rubric

| Article | Hook /25 | Voice /25 | Value Density /25 | Engagement /25 | Total /100 | Result |
|---|---:|---:|---:|---:|---:|---|
| KS-KO | 22 | 23 | 24 | 22 | 91 | Pass |
| KS-EN | 22 | 22 | 24 | 22 | 90 | Rubric pass; expert-panel fix required |
| KI-KO | 23 | 23 | 25 | 22 | 93 | Pass |
| KI-EN | 22 | 23 | 25 | 22 | 92 | Pass |

### KS-KO — Round 1 weighted 94.2

| Expert | Score | Reason/evidence |
|---|---:|---|
| Content strategy | 94 | Repeated rechecking pain leads to official scope, a five-field manual record, product boundary, and CTA. |
| SEO intent | 94 | Title, description, headings, and FAQ directly answer Korean KREAM 보관판매/판매입찰 queries. |
| Seller empathy | 93 | Opens from a plausible first-person recheck and refuses to invent a universal cadence. |
| Practical value | 95 | The five-field table and decision-point refresh rule are usable without the future product. |
| PRD truth | 96 | Current unavailability and future 30-day information are explicit; no enabled KREAM capability is implied. |
| Evidence/policy risk | 96 | Mechanism, 120-day maximum, 30-day units, effective date, and volatility are source-bounded. |
| CTA | 94 | CTA is preregistration only and is followed by a concrete sensitive-data warning. |
| Brand voice | 95 | Direct, non-affiliated, restrained, and free of outcome promises. |
| Humanizer/AI detector ×1.5 | 92 | Specific seller observation and concrete fields outweigh the necessary compliance repetition; no decorative AI vocabulary pattern was found. |

All lenses reached 90, so KS-KO stopped after Round 1.

### KS-EN — Round 1 weighted 92.2 — needs work

| Expert | Score | Reason/evidence |
|---|---:|---|
| Content strategy | 94 | The same problem/source/checklist/product-state progression remains coherent. |
| SEO intent | 88 | The FAQ asks when an item can “receive a sell bid,” not when the seller can place one; this misses the natural seller-action query. |
| Seller empathy | 89 | The passive item-centered question weakens seller agency and sounds unlike the question a seller would ask. |
| Practical value | 95 | The manual record is still specific and actionable. |
| PRD truth | 96 | PRE_LAUNCH, no current online function, and after-launch benefit language all match PT1. |
| Evidence/policy risk | 87 | Both structured and rendered FAQ questions invert the actor from KREAM-S1, even though the answers correctly say the seller places the bid. |
| CTA | 94 | Preregistration and sensitive-data restrictions are properly bounded. |
| Brand voice | 95 | Clear, cautious, and non-affiliated with no guarantee. |
| Humanizer/AI detector ×1.5 | 92 | No banned-vocabulary hit or formulaic conclusion; the one awkward FAQ line is semantic, not a broad AI-writing pattern. |

Largest three defects:

1. **Actor inversion:** KREAM-S1 says the seller places the bid after storage; “item receive a sell bid” assigns the action to the item.
2. **Search-intent mismatch:** a seller naturally asks “When can I place a sell bid…?”; the baseline phrasing is not the direct English query.
3. **Duplicate propagation:** the same ambiguity appears in both frontmatter FAQ data and the rendered FAQ, so structured and visible content both need the identical correction.

Change made: replaced both question copies with `When can I place a sell bid for a KREAM storage-sale item?`. No answer, policy claim, Korean copy, or other article text changed.

### KI-KO — Round 1 weighted 94.9

| Expert | Score | Reason/evidence |
|---|---:|---|
| Content strategy | 96 | Overnight pain leads to mechanism distinction, approval envelope, execution sequence, current-state warning, and CTA. |
| SEO intent | 94 | The title and FAQ answer the Korean scheduled/overnight KREAM instant-sale intent while correcting the “exact-time macro” assumption. |
| Seller empathy | 94 | Recognizes the cost of waiting overnight but does not promise unattended success. |
| Practical value | 96 | Parameter table and six-step pre/post-execution sequence make the safety model reviewable today. |
| PRD truth | 98 | Parameters, approval invalidation, freshness, reservation, recheck, reconciliation, kill switches, and unimplemented status match PT2/PRD1. |
| Evidence/policy risk | 98 | KREAM mechanics are limited to KREAM-S1; planned product mechanics are separately attributed and capability state is explicit. |
| CTA | 95 | Future benefit, no immediate activation, and data-minimization warning are adjacent to the CTA. |
| Brand voice | 94 | “무조건 실행” and “매크로” appear only in explicit denial/comparison; non-affiliation and account-risk cautions remain. |
| Humanizer/AI detector ×1.5 | 91 | Concrete examples and technical specificity sound authored; repeated safety structures are functional but keep the score below the other lenses. |

All lenses reached 90, so KI-KO stopped after Round 1.

### KI-EN — Round 1 weighted 94.9

| Expert | Score | Reason/evidence |
|---|---:|---|
| Content strategy | 96 | It has a complete problem, evidence, planned-design, risk, availability, and conversion arc. |
| SEO intent | 95 | “KREAM instant sale,” “scheduled window,” and the FAQ match the intended English seller query without implying current availability. |
| Seller empathy | 93 | The overnight alarm scenario is concrete and the copy respects the seller's approval boundaries. |
| Practical value | 96 | The parameter matrix and ordered safety sequence let a reader evaluate the planned rule. |
| PRD truth | 98 | Every planned parameter and safety gate maps to PT2/PRD1; disabled capabilities are named. |
| Evidence/policy risk | 98 | Platform and product claims are separated; no partnership, enabled integration, exact date, or result is promised. |
| CTA | 95 | It asks only for preregistration and explicitly denies instant account or execution permission. |
| Brand voice | 94 | Restrained and explanatory; the macro comparison is a boundary, not promotional automation language. |
| Humanizer/AI detector ×1.5 | 91 | No banned vocabulary or generic conclusion. Two standalone “not only” literals are ordinary comparisons, not the flagged “not only…but” construction. |

All lenses reached 90, so KI-EN stopped after Round 1.

## Round 2

Only KS-EN required a second round. The other three articles were not rewritten or rescored after passing all lenses in Round 1.

### KS-EN content-quality rubric

| Hook /25 | Voice /25 | Value Density /25 | Engagement /25 | Total /100 |
|---:|---:|---:|---:|---:|
| 22 | 23 | 24 | 22 | 91 |

### KS-EN — Round 2 weighted 94.3 — pass

| Expert | Score | Reason/evidence |
|---|---:|---|
| Content strategy | 94 | Structure is unchanged and remains coherent. |
| SEO intent | 94 | The FAQ now uses the direct seller-action query “When can I place a sell bid…?” |
| Seller empathy | 94 | First-person seller agency now matches how a reader would ask the operational question. |
| Practical value | 95 | Manual record and decision-point guidance remain intact. |
| PRD truth | 96 | Product-state and benefit boundaries remain unchanged and correct. |
| Evidence/policy risk | 96 | Frontmatter and rendered FAQ now agree with KREAM-S1 that the seller places the bid after storage. |
| CTA | 94 | PRE_LAUNCH CTA and data warning remain correctly bounded. |
| Brand voice | 95 | The correction is natural, direct, and does not introduce promotion or affiliation. |
| Humanizer/AI detector ×1.5 | 92 | The awkward passive actor is gone; no Humanizer banned-vocabulary or formulaic-conclusion defect remains. |

No expert remained below 90. The recursive loop stopped after two rounds.

## Final score

| Article | Final round | Content-quality total | Weighted expert result | Minimum expert | Gate |
|---|---:|---:|---:|---:|---|
| KS-KO | 1 | 91 | 94.2 | 92 | Pass |
| KS-EN | 2 | 91 | 94.3 | 92 | Pass |
| KI-KO | 1 | 93 | 94.9 | 91 | Pass |
| KI-EN | 1 | 92 | 94.9 | 91 | Pass |
| **Final mean** | — | **91.8** | **94.6** | **91** | **Pass** |

## Humanizer and literal-context review

The English Humanizer banned-vocabulary scan returned no matches. A separate negative-parallelism scan returned two `not only` literals:

- KI-EN heading: “Approve conditions, not only one clock time.”
- KS-EN field description: “not only a product name.”

Neither uses the Humanizer's flagged paired construction (`not only ... but ...`), and both make a concrete comparison, so no deduction was applied for Pattern 9. The scheduled articles still score 91 because their necessarily repeated approval/safety structures are more formal than the storage articles.

## Deterministic validation

| Command | Exit | Result |
|---|---:|---|
| `npm run test:audit-content` | 0 | 11 tests passed; 0 failed. |
| `npm run audit:content` | 0 | **PASS: 46 published posts; 23 bilingual pairs.** Existing title/description length warnings only. |
| `npm run lint` | 0 | ESLint completed with no findings. |
| `npm run build`, sandbox attempt | 1 | Environment failure before compilation: Turbopack could not bind an internal local port (`Operation not permitted`). This is recorded as a failed sandbox attempt, not hidden as a warning. |
| `npm run build`, approved out-of-sandbox rerun | 0 | Compiled, TypeScript passed, and 355 static pages generated. |
| Required stale/forbidden `rg` scan | 0 | Two literal `지금 사용` matches, both FAQ questions asking whether the unavailable feature can be used now; each is immediately answered “아닙니다.” No stale trial-duration, completed-integration, unconditional-match, or profit-guarantee claim was found. |
| Required approved launch/benefit `rg` scan | 0 | Found August 2026 and 30-day future-benefit wording across every published Resell Ops Korean/English pair. |
| Supplemental `지금 사용|무조건 실행|매크로` context scan | 0 | `무조건 실행` appears twice in KI-KO as a denial of blind exact-time action; `매크로` appears once as a comparison the design explicitly differs from; `지금 사용` appears only in the two current-availability questions. |
| `git diff --check` before staging | 0 | No whitespace errors. |

### Build warnings, separate from failures

The successful build emitted three warnings that pre-exist this audit's content-only scope:

1. Next.js inferred `/Users/park/Desktop/package-lock.json` as the workspace root because multiple lockfiles exist.
2. Generated CSS reported an `@import` ordering warning for the Pretendard import.
3. Turbopack reported an unexpectedly broad NFT trace through `next.config.ts` and the feed route.

The earlier sandbox build's port-bind denial is a failure and is therefore listed separately in the validation table rather than being reclassified as a warning.

## Deployment gate

The **local content deployment gate is ready**: all four articles finish at 90+ on every expert lens; 46 posts and 23 bilingual pairs are confirmed; tests, audit, lint, the final production build, scans, and whitespace checks pass.

External deployment is not approved by this audit. Remaining T2/product gates include StandingSellRule code and API, KREAM T2 policy/technical checklist, signed installers and production authentication/step-up, capability allowlisting and limits, privacy/legal review, non-affiliation approval, and safe reconciliation/kill-switch evidence. Push, deployment, and IndexNow require explicit external approval.

## Feedback-to-source

No originating content-generation skill was supplied for these already-authored articles, so there is no skill file to change. The reusable editorial rule is recorded here: in KREAM storage-sale copy, preserve the seller as the actor — the seller **places** a sell bid after storage; the item does not “receive” one.
