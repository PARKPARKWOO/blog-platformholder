# Resell Ops Product Truth and 30-Day Trial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Change newly issued Resell Ops trials from 15 days to 30 days and synchronize the PRD without implying that KREAM scheduled instant sale is already implemented.

**Architecture:** `LicenseService` remains the authority for trial duration and the default product code. One integration test locks the duration and code. The Resell Ops requirements and API specification mirror the implemented 30-day boundary while keeping `StandingSellRule` in the unimplemented T2 track.

**Tech Stack:** Kotlin 1.9, Spring Boot 3.5, JUnit 5/MockMvc, Gradle, Markdown PRD.

## Global Constraints

- New `TRIAL` grants last exactly `30 × 24 hours` from `startsAt`.
- The default trial product code is `TRIAL_30D`.
- Trial remains owner-bound, lifetime-once, non-renewable, and payment-reference-free.
- Existing historical grants are not rewritten or migrated.
- `StandingSellRule` stays `❌ 미구현`; its KREAM online capabilities remain `DISABLED`.
- Public target wording is `2026년 8월 오픈 예정`; no exact August date is invented.
- Do not modify `gradle.properties`.
- `/Users/park/Desktop/project/prd` already contains unrelated user changes. Preserve them and stage only the 30-day/launch-target hunks created by this plan.

---

## File Structure

- `/Users/park/Desktop/project/resell-platform-backend/src/test/kotlin/com/resellplatform/backend/api/LicenseIntegrationTest.kt`: executable contract for the new trial duration and product code.
- `/Users/park/Desktop/project/resell-platform-backend/src/main/kotlin/com/resellplatform/backend/service/LicenseService.kt`: duration constant and default product code for future trial issuance.
- `/Users/park/Desktop/project/prd/resell-ops/requirements.md`: product decision, phase status, release test, and legal-gate wording.
- `/Users/park/Desktop/project/prd/resell-ops/api-spec.md`: API calculation and integration-test status.
- `/Users/park/Desktop/project/prd/resell-ops/connectors/kream.md`: read-only verification target; no capability is enabled by this change.

### Task 1: Lock the 30-day trial contract in the backend

**Files:**
- Modify: `/Users/park/Desktop/project/resell-platform-backend/src/test/kotlin/com/resellplatform/backend/api/LicenseIntegrationTest.kt:76-113`
- Modify: `/Users/park/Desktop/project/resell-platform-backend/src/main/kotlin/com/resellplatform/backend/service/LicenseService.kt:465-468,537-539`

**Interfaces:**
- Consumes: `LicenseService.issue(operatorId, IssueLicenseRequest)` and the existing `/api/v1/resell/internal/licenses` integration fixture.
- Produces: a new trial with `expiresAt = startsAt.plusDays(30)` and default `productCode = "TRIAL_30D"`.

- [ ] **Step 1: Change the integration test first**

Replace the test name and the two expectations with:

```kotlin
@Test
fun `trial requires a registered id is exactly thirty days and keeps one grant`() {
    // Keep the existing request, duplicate-grant, and paymentReference assertions.
    val issued = issue(mapOf("licenseUserId" to licenseUserId, "planType" to "TRIAL"))
    val startsAt = OffsetDateTime.parse(issued.path("startsAt").asText())
    val expiresAt = OffsetDateTime.parse(issued.path("expiresAt").asText())
    assertEquals(Duration.ofDays(30), Duration.between(startsAt, expiresAt))
    assertEquals("TRIAL_30D", issued.path("productCode").asText())
}
```

Only replace the existing name, `Duration.ofDays(15)`, and `TRIAL_15D`; do not delete the surrounding assertions.

- [ ] **Step 2: Run the focused test and verify red**

Run from `/Users/park/Desktop/project/resell-platform-backend`:

```bash
./gradlew test --tests '*LicenseIntegrationTest'
```

Expected: FAIL in the renamed trial test because the service still returns a 15-day expiry and `TRIAL_15D`.

- [ ] **Step 3: Implement the minimum production change**

Use these exact values in `LicenseService.kt`:

```kotlin
private fun defaultProductCode(planType: String): String = when (planType) {
    TRIAL -> "TRIAL_30D"
    SUBSCRIPTION -> "SUBSCRIPTION"
    FIXED_TERM -> "FIXED_TERM"
    else -> error("validated plan type")
}

companion object {
    private const val TRIAL_DAYS = 30L
    // Keep every other constant unchanged.
}
```

- [ ] **Step 4: Run the focused test and full regression suite**

```bash
./gradlew test --tests '*LicenseIntegrationTest'
./gradlew test
```

Expected: both commands exit `0`; the focused class passes the 30-day duration and product-code assertions.

- [ ] **Step 5: Scan all product repositories for stale product behavior**

Run from `/Users/park/Desktop/project`:

```bash
rg -n "TRIAL_15D|TRIAL_DAYS = 15|Duration\.ofDays\(15\)|exactly fifteen days" resell-platform-backend resell-platform-client backoffice-bff backoffice-frontend --glob '!**/node_modules/**' --glob '!**/build/**' --glob '!**/dist/**'
```

Expected: no matches.

- [ ] **Step 6: Commit the backend change**

```bash
git add src/main/kotlin/com/resellplatform/backend/service/LicenseService.kt src/test/kotlin/com/resellplatform/backend/api/LicenseIntegrationTest.kt
git diff --cached --check
git commit -m "feat: extend Resell Ops trial to 30 days"
```

Expected: only the two license files are committed. Preserve the pre-existing untracked spec under `docs/superpowers/specs/`.

### Task 2: Synchronize Resell Ops PRD through the manual PRD-sync route

**Files:**
- Modify: `/Users/park/Desktop/project/prd/resell-ops/requirements.md:35,596,719,773,1157,1236`
- Modify: `/Users/park/Desktop/project/prd/resell-ops/api-spec.md:1492,3547`
- Verify only: `/Users/park/Desktop/project/prd/resell-ops/connectors/kream.md:96-126,368-394`

**Interfaces:**
- Consumes: the committed backend behavior from Task 1 and the already-defined `StandingSellRule` requirements.
- Produces: documentation that says 30 days for implemented trial issuance and keeps scheduled instant sale as an August 2026 target with unmet T2 gates.

- [ ] **Step 1: Record the dirty baseline before editing**

```bash
git status --short
git diff -- resell-ops/requirements.md resell-ops/api-spec.md resell-ops/connectors/kream.md
```

Expected: existing Resell Ops changes are present. Save the output in the task log; do not reset, restore, or stage it.

- [ ] **Step 2: Update every authoritative 15-day statement**

Apply these semantic replacements while preserving the surrounding Korean prose and tables:

```text
owner당 평생 1회, 활성 시작시각부터 정확히 15일
→ owner당 평생 1회, 활성 시작시각부터 정확히 30일

startsAt부터 정확히 15×24시간
→ startsAt부터 정확히 30×24시간

15일 무료체험 / startsAt + 15일
→ 30일 무료체험 / startsAt + 30일

owner당 1회 15일 체험
→ owner당 1회 30일 체험

expiresAt=startsAt+15×24시간
→ expiresAt=startsAt+30×24시간

trial 15일 경계
→ trial 30일 경계
```

- [ ] **Step 3: Add the bounded August target to the existing StandingSellRule status**

In the Phase 3 `조건부 즉시판매` row, append this sentence without changing `❌ 미구현`:

```text
2026년 8월 오픈 목표이나 T2 release checklist와 선행 도메인이 모두 충족되기 전에는 제공 상태로 전환하지 않는다.
```

In §4.8 `선행 조건`, add:

```text
마케팅의 "2026년 8월 오픈 예정"은 목표 일정이며 구현 완료 근거가 아니다. 실제 오픈은 이 선행 조건과 KREAM T2 release checklist를 모두 통과한 뒤에만 선언한다.
```

- [ ] **Step 4: Verify that no API or connector status was falsely promoted**

```bash
rg -n "15일|15×24|startsAt\+15|trial 15일" resell-ops/requirements.md resell-ops/api-spec.md
rg -n "StandingSellRule|조건부 즉시판매|2026년 8월|❌ 미구현" resell-ops/requirements.md
rg -n "listing\.create|listing\.read|kream\.storage\.read|DISABLED" resell-ops/connectors/kream.md
```

Expected: the first command returns no stale trial statements; the second shows both the August target and `❌ 미구현`; the third shows every relevant online capability still `DISABLED`.

- [ ] **Step 5: Partially stage only this task's PRD hunks**

```bash
git add -p resell-ops/requirements.md resell-ops/api-spec.md
git diff --cached --check
git diff --cached --stat
git diff --cached
```

Accept only hunks containing the 30-day changes or the two bounded August-target sentences. Reject all pre-existing connector-session, wire-guard, assignment, and other unrelated hunks. Do not stage `resell-ops/connectors/kream.md` because this plan does not change it.

- [ ] **Step 6: Commit only the synchronized facts**

```bash
git commit -m "docs: set Resell Ops trial to 30 days"
git status --short
```

Expected: the commit contains only the selected trial/launch-target lines. Pre-existing user changes remain in the worktree after the commit.

- [ ] **Step 7: Report the manual sync limitation**

Record that `source-command-prd-sync` has no explicit Resell Ops service mapping. The same code-first workflow was applied manually to `prd/resell-ops/requirements.md` and `api-spec.md`; no unsupported service alias was invented.
