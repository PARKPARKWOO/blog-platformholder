# Resell Ops Marketing Truth Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Resell Ops marketing SSOT consistently support KREAM-specific editorial content, an August 2026 planned opening, and 30-day free use without presenting unimplemented automation as live.

**Architecture:** `feature-truth.md` remains the fact authority. Brand, audience, messaging, channels, and positioning consume the same status vocabulary and CTA. A manual drift report records the unsupported Resell Ops sync route and proves that platform-specific editorial use is distinct from affiliation or product naming.

**Tech Stack:** Markdown/YAML frontmatter, ripgrep-based drift checks, Git.

## Global Constraints

- Status stays `PRE_LAUNCH` and shipped feature count stays `0`.
- Approved target wording is `2026년 8월 오픈 예정`; no exact date is added.
- `StandingSellRule` is a planned, unimplemented T2 capability.
- 30-day free use is owner-bound and lifetime-once; no `15+15`, cash coupon, price discount, or instant activation claim.
- KREAM may appear in factual editorial titles, body text, slugs, SEO keywords, and tags.
- KREAM may not appear in the Resell Ops product name, account handle, or artwork; logo/BI and official/partner/affiliation claims remain prohibited.
- Bounded pre-approved scheduled sale is distinct from bot-evasion, purchase automation, server-side unattended browsing, or aggressive infinite repetition.
- Existing unrelated Find-My-Pet and publisher changes in `/Users/park/Desktop/project/marketing` must remain untouched and unstaged.

---

## File Structure

- `/Users/park/Desktop/project/marketing/services/resell-ops/feature-truth.md`: launch status, 30-day trial fact, planned StandingSellRule, numeric source map, allowed/forbidden claims.
- `/Users/park/Desktop/project/marketing/services/resell-ops/audience.md`: platform-specific search intent and seller pain.
- `/Users/park/Desktop/project/marketing/services/resell-ops/brand.md`: naming boundary, CTA standard, planned-feature wording.
- `/Users/park/Desktop/project/marketing/services/resell-ops/messaging.md`: August opening and preregistration message hierarchy.
- `/Users/park/Desktop/project/marketing/services/resell-ops/channels.md`: blog/open-chat operating rule.
- `/Users/park/Desktop/project/marketing/services/resell-ops/positioning.md`: PRE_LAUNCH truth and bounded seller-operation automation.
- `/Users/park/Desktop/project/marketing/reports/qc/resell-ops-drift-20260801.md`: manual PRD-to-marketing drift evidence.

### Task 1: Update feature truth and create a drift record

**Files:**
- Modify: `/Users/park/Desktop/project/marketing/services/resell-ops/feature-truth.md:1-270`
- Create: `/Users/park/Desktop/project/marketing/reports/qc/resell-ops-drift-20260801.md`

**Interfaces:**
- Consumes: 30-day backend/PRD facts and PRD `requirements.md §4.8 StandingSellRule`.
- Produces: feature IDs `license_grant_gate` and `standing_sell_rule_planned` for blog frontmatter and editorial review.

- [ ] **Step 1: Refresh the feature-truth header without fabricating clean PRD commits**

Set the sync date to `2026-08-01`. Use the actual committed revision only where it contains the referenced fact. If the PRD trial hunk commit from the product plan exists, record that commit. For `StandingSellRule`, whose worktree change pre-dated this task, write `working-tree evidence reviewed 2026-08-01` in prose rather than inventing a commit hash.

- [ ] **Step 2: Change the license fact to 30 days**

Replace the license entry with this exact status contract:

```markdown
- **라이선스 원장(LicenseGrant)과 실행 gate** (`license_grant_gate`) — 신규 TRIAL은 owner당 평생 1회·30일이며, SUBSCRIPTION / FIXED_TERM과 함께 만료·철회·유예 시 `READ_ONLY`로 신규 Job을 차단한다. 백엔드 발급 로직은 구현됐지만 self-service 신청 UI와 공개 배포물은 없다. 카피 키워드: `출시 후 30일 무료 이용 안내`. 금지: `지금 체험 시작`, `15일+15일`, 즉시 활성화 약속. 출처: `LicenseService.TRIAL_DAYS`, requirements §4.9 / §5 Phase 1C.
```

Update the numeric source row to:

```markdown
| 무료체험 기간 | 30일 (owner당 평생 1회) | `LicenseService.TRIAL_DAYS`, requirements §1 |
```

- [ ] **Step 3: Add the planned scheduled-sale fact**

Under `📅 Planned`, add:

```markdown
- **조건부 즉시판매** (`standing_sell_rule_planned`) — 사용자가 SKU·채널, 구매입찰 하한가, 요일·타임존·시간창, 최대 수량·일일 체결 횟수, 만료를 사전 승인하고 조건이 맞을 때 즉시판매하는 목표 기능. 실행 직전 가격·재고 재확인, 불확실 결과 재시도 금지, 사용자·운영자 kill switch가 필수다. **2026년 8월 오픈 목표이나 현재 코드와 API 계약은 없고 KREAM `listing.read`·`listing.create`도 `DISABLED`다.** 허용 카피: `출시 시 제공 예정`, `시간창과 하한가를 미리 승인하는 방식으로 개발 중`. 금지 카피: `지금 예약 가능`, `무조건 체결`, `KREAM 공식 연동`. 출처: requirements §4.8, kream.md capability matrix.
```

Change the Planned heading from “콘텐츠 등장 전면 금지” to “현재 기능처럼 홍보 금지; 승인된 로드맵 설명은 미구현·예정 표시가 있을 때만 허용”.

- [ ] **Step 4: Correct the automation boundary**

Replace broad bans on all unattended operation with this distinction:

```markdown
- 허용 예정 범위: 사용자가 미리 승인한 시간창·하한가·수량·횟수·만료 envelope 안의 판매자 운영 작업.
- 계속 금지: 구매·응모·재고 선점, 탐지 회피, OTP/CAPTCHA 자동 처리, 서버 원격 브라우저, 결과 불확실 mutation 재실행, 요청 제한을 무시한 24시간 공격적 반복.
```

- [ ] **Step 5: Write the drift report**

The report must contain these sections and determinations:

```markdown
# Resell Ops marketing drift report — 2026-08-01

## Sources reviewed
- prd/resell-ops/requirements.md §1, §2.2, §4.8, §4.9, §5 Phase 1C/3
- prd/resell-ops/api-spec.md trial issuance contract
- prd/resell-ops/connectors/kream.md capability matrix and T2 release checklist
- resell-platform-backend LicenseService and LicenseIntegrationTest

## Decisions
- PRE_LAUNCH and shipped count 0 remain unchanged.
- Trial changes from 15 to 30 days for new grants.
- 2026년 8월 is a target, not a completed launch fact.
- standing_sell_rule_planned is allowed only with current-unimplemented wording.
- KREAM is allowed for factual editorial targeting, never for product naming or affiliation.

## Unsupported automation note
source-command-marketing-prd-sync has no Resell Ops route, so the same PRD-first checks were performed manually; no unsupported service result is claimed.

## Remaining gates
- StandingSellRule code/API
- KREAM T2 policy and technical release checklist
- signed installers and production auth/step-up
- non-affiliation/privacy launch gates
```

- [ ] **Step 6: Validate Task 1**

```bash
rg -n "15일 무료체험|평생 1회·15일|무료체험 기간 \| 15일" services/resell-ops/feature-truth.md
rg -n "standing_sell_rule_planned|2026년 8월 오픈 목표|DISABLED|현재 코드와 API 계약은 없" services/resell-ops/feature-truth.md reports/qc/resell-ops-drift-20260801.md
```

Expected: first command has no matches; second command shows the planned status and disabled capability evidence.

### Task 2: Align audience, brand, messaging, channel, and positioning policies

**Files:**
- Modify: `/Users/park/Desktop/project/marketing/services/resell-ops/audience.md:1-150`
- Modify: `/Users/park/Desktop/project/marketing/services/resell-ops/brand.md:1-190`
- Modify: `/Users/park/Desktop/project/marketing/services/resell-ops/messaging.md:80-140`
- Modify: `/Users/park/Desktop/project/marketing/services/resell-ops/channels.md:1-180`
- Modify: `/Users/park/Desktop/project/marketing/services/resell-ops/positioning.md:1-130`

**Interfaces:**
- Consumes: `feature-truth.md` entries `license_grant_gate` and `standing_sell_rule_planned`.
- Produces: one consistent editorial and CTA contract for every Resell Ops channel.

- [ ] **Step 1: Add the two KREAM seller jobs to the audience**

Add these search moments without numeric frequency claims:

```markdown
- 보관판매 후 판매입찰 가격 위치와 보관기간·비용·예상 실수령을 반복 확인하는 판매자
- 새벽 등 특정 시간대 구매입찰에 대응하려고 직접 기다리는 판매자
```

Replace the platform-name keyword ban with:

```markdown
- 플랫폼명은 공식 기능을 설명하는 사실 기반 제목·본문·slug·SEO 키워드·태그에 사용할 수 있다.
- 플랫폼명을 제품명·계정 핸들·해시태그에 결합하거나 제휴·공식 관계처럼 보이게 사용하는 것은 금지한다.
```

- [ ] **Step 2: Update the brand guide**

Keep product naming and BI restrictions. Add:

```markdown
- 편집 예외: `KREAM 보관판매`, `KREAM 즉시판매`처럼 공식 기능을 설명하는 콘텐츠 제목·본문·slug·검색 태그는 허용한다.
- 자동화 표현: `시간창·하한가·수량을 미리 승인하는 조건부 즉시판매를 개발 중`은 허용한다. `매크로`, `무조건 체결`, `24시간 무감독 반복`, `공식 연동`은 금지한다.
```

Replace 15-day forbidden CTA examples with `30일 무료 이용 지금 시작` as the forbidden current-use form, while allowing `출시 후 30일 무료 이용 안내`.

- [ ] **Step 3: Set the messaging hierarchy**

Add the campaign master copy:

```markdown
> Resell Ops는 현재 개발 중이며 2026년 8월 오픈 예정입니다. 카카오 오픈채팅으로 사전예약하면 출시 후 30일 무료 이용을 안내해 드립니다.
```

For feature copy, require:

```markdown
> 새벽 즉시판매를 위해 한 시각에 무조건 실행하는 매크로가 아니라, 요일·타임존·시간창과 구매입찰 하한가·수량·횟수·만료를 미리 승인하는 방식으로 개발 중입니다. 현재는 사용할 수 없으며 출시 시 제공 예정입니다.
```

Change the objection response for “언제 나오나요” to `2026년 8월 오픈 예정이며 정확한 날짜는 아직 확정하지 않았습니다. 출시 게이트를 통과하지 못하면 예정 문구를 갱신합니다.`

- [ ] **Step 4: Align channels and positioning**

In `channels.md`, change `출시 날짜를 약속하지 않는다` to `정확한 날짜를 약속하지 않는다. 2026년 8월은 예정으로만 안내한다.` Add the 30-day preregistration benefit to the open-chat role and fixed notice.

In `positioning.md`, keep `PRE_LAUNCH`, shipped count 0, and no live product URL. State that seller-operation automation is the product goal but every mutation remains behind capability, approval, freshness, reconciliation, and kill-switch gates.

- [ ] **Step 5: Run a cross-document drift scan**

```bash
rg -n "15일 무료체험|15일 \(owner당|출시 날짜를 약속하지|채널명을 키워드·태그|콘텐츠 등장 전면 금지" services/resell-ops
rg -n "2026년 8월 오픈 예정|30일 무료|standing_sell_rule_planned|시간창|하한가|현재.*미구현|제휴 관계가 없" services/resell-ops
rg -n "지금 사용|연동 완료|무조건 체결|수익 보장|공식 파트너" services/resell-ops
```

Expected: the first command has no stale policy matches. The second shows consistent approved facts. Any third-command match must occur only in a clearly labeled forbidden-example block.

- [ ] **Step 6: Review and commit only Resell Ops files**

```bash
git diff --check
git diff -- services/resell-ops reports/qc/resell-ops-drift-20260801.md
git add services/resell-ops/audience.md services/resell-ops/brand.md services/resell-ops/channels.md services/resell-ops/feature-truth.md services/resell-ops/messaging.md services/resell-ops/positioning.md reports/qc/resell-ops-drift-20260801.md
git diff --cached --check
git commit -m "docs: align Resell Ops August prelaunch messaging"
```

Expected: the commit excludes `brand/publisher-meta.md`, every Find-My-Pet file, and all unrelated pre-existing reports.
