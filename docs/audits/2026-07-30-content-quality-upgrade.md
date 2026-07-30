# Content quality upgrade audit — 2026-07-30

## Scope

This audit covers the five published Korean/English BBR article pairs revised on 2026-07-30. Korean remains the editorial source; English must be fact-equivalent. These are product-free knowledge articles, so every file keeps `feature_truth_refs: []` and makes no current-use PocketFit claim.

## Source map

Only direct research, official clinical/public-health guidance, or official standards are used for health, fitness, performance, or research claims.

| ID | Source | What it supports |
|---|---|---|
| S1 | [NIDDK, Staying Active at Any Size](https://www.niddk.nih.gov/health-information/weight-management/staying-active-at-any-size) | Official guidance to train major muscle groups, avoid training the same muscles on consecutive days, and use a manageable 8–12-repetition load as a general starting point. |
| S2 | [Physical Activity Guidelines for Americans, 2nd ed.](https://health.gov/paguidelines/second-edition/pdf/Physical_Activity_Guidelines_2nd_edition.pdf) | Official guidance to increase activity gradually and perform muscle-strengthening activity on at least two days per week. |
| S3 | [WHO Guidelines on Physical Activity and Sedentary Behaviour](https://www.who.int/publications/i/item/9789240014886) | Official recommendation for adults to perform muscle-strengthening activity involving major muscle groups on two or more days per week. |
| S4 | [ACSM progression models position stand](https://pubmed.ncbi.nlm.nih.gov/11828249/) | Official standard: exercise order and individualized progression; a 2–10% load increase was described only when the current workload can be exceeded by one or two repetitions, and recommendations must be interpreted by goals, capacity, and training status. |
| S5 | [ACSM 2026 resistance-training position stand](https://pubmed.ncbi.nlm.nih.gov/41843416/) | Current official position stand: progressive resistance training works across varied prescriptions; several prescription variables have outcome-specific effects, so one universal split, rep range, or set prescription is not justified. |
| S6 | [Hagger et al., multilab preregistered ego-depletion replication](https://pubmed.ncbi.nlm.nih.gov/27474142/) | Direct preregistered research finding a small effect with a confidence interval spanning zero; supports treating the fuel-tank model of willpower as unsettled. |
| S7 | [Zhang et al., randomized social-network exercise trial](https://pubmed.ncbi.nlm.nih.gov/27617191/) | Direct randomized trial in university students: social-comparison network conditions increased exercise-class attendance in that setting; does not establish a universal buddy effect. |
| S8 | [Keogh et al., running ground-reaction-force study](https://pubmed.ncbi.nlm.nih.gov/11415629/) | Direct laboratory study: measured vertical ground-reaction force varied with speed and approached about 2.5 times body weight at 6.0 m/s in 23 recreational athletes. |
| S9 | [Run Clever randomized trial](https://pubmed.ncbi.nlm.nih.gov/29527322/) | Direct randomized trial finding no clear injury-risk difference between progression focused on running intensity and progression focused on running volume. |
| S10 | [Strengthening-plus-running randomized pilot](https://pubmed.ncbi.nlm.nih.gov/38251299/) | Direct pilot trial finding no significant running-injury or maximal-aerobic-speed advantage from the strengthening intervention; supports removing injury-prevention guarantees. |
| S11 | [CDC, Steps for Getting Started With Physical Activity](https://www.cdc.gov/healthy-weight-growth/physical-activity/getting-started.html) | Official guidance to start slowly, build difficulty gradually, and ask a health professional when activity choice depends on health or injury concerns. |

## Pre-edit claim ledger

The following ledger was written before article edits. A row covers the fact-equivalent Korean and English sentences in frontmatter and body unless a locale is named. Examples inside logs and tables are included where they contain time, load, repetitions, recovery, injury, performance, percentage, price, or research language. Each row has exactly one disposition.

### `beginner-3-day-split`

| Risky claim in the published pair | Disposition | Basis / edit instruction |
|---|---|---|
| A chest/back/legs split with a fixed 48-hour interval is the beginner default and naturally guarantees recovery. | softened | Replace the universal 48-hour rule with at least one day between training the same area; adjust for soreness, fatigue, injury history, and professional advice (S1). |
| A 45–60-minute session should contain 3–4 exercises, beginning with 1–2 compound movements and followed by two isolation movements. | softened | Keep as an editable example, not an optimal or injury-reducing prescription; cite S4 for exercise-order context. |
| Machine setup has exactly four checks and correct axis alignment removes most mistakes or injury risk. | removed | Machine geometry and manufacturer instructions vary; no direct source supports the universal checklist. Replace with machine label/staff guidance and a light test set. |
| Ten clean repetitions identifies the correct starting load; the final one or two repetitions should be difficult. | cited | Retain only as general NIDDK starting guidance, not an individualized prescription (S1). |
| Logging load, sets, and repetitions is mandatory and lack of logging causes a plateau. | softened | Logging is a practical comparison tool; remove causal and mandatory language. |
| After four weeks, every completed target should trigger an automatic 2.5–5 kg increase. | softened | Use the smallest available increment only after all target repetitions stay controlled; the increment is exercise- and trainee-dependent (S4). |
| Pain should trigger an exercise swap or volume reduction. | softened | Do not prescribe around injury; stop or modify the painful movement and seek qualified advice when pain persists, is severe, or affects daily activity (S11). |
| Feet, pads, axes, pulleys, and handles follow five universal setup-error patterns, including a 1 cm pad rule and fixed cable/handle heights. | removed | Unsourced equipment-specific rules are not universal. |
| A first-use machine can be safely checked in 30 seconds with 2–3 light repetitions. | softened | Remove the time guarantee; keep a no-load/light-load range-of-motion check plus manufacturer/staff instruction. |
| Example log numbers (40 kg, 10 kg, 35 kg, 3 sets, repetition counts, machine notch numbers) are suitable targets. | softened | Mark them as fictional formatting examples, not targets. |
| A setup note reduces setup time from 30 seconds to 5 seconds. | removed | Unsupported performance/time claim. |
| Four weeks at three sessions dictates keeping the split; four sessions dictates upper/lower; two dictates full body. | softened | Present schedule choices as templates, not deterministic rules; preserve at least one day between the same area and cover major muscle groups over the week (S1–S3). |
| Volume should always rise by sets, then repetitions, then exercises. | softened | Keep one-variable-at-a-time as a troubleshooting convention, not a physiological rule. |

### `create-weekly-pt-plan`

| Risky claim in the published pair | Disposition | Basis / edit instruction |
|---|---|---|
| A complete weekly plan takes 15 minutes initially and 3 minutes thereafter. | removed | Unsupported time guarantee; `totalTime` remains structured metadata from the normalized interface, but body and description no longer promise completion time. |
| The past four-week average plus exactly one session is the correct next target. | softened | Use recent attendance as evidence and increase only if recovery and schedule allow (S2, S11). |
| Fifteen-minute blocks, 45–60 minutes, or 30/45/60/90-minute choices determine exercise count and cover most goals. | softened | Time blocks are planning examples, not physiological thresholds. |
| Frequency dictates one universal split: two full body, three chest/back/legs, four upper/lower, five-plus body-part specialization. | softened | Offer options, require weekly major-muscle coverage and recovery; no split is universally optimal (S3, S5). |
| Three-day splits guarantee at least 48 hours of recovery. | softened | Replace with at least one day before repeating the same area and individual recovery adjustments (S1). |
| Compound-first ordering reduces injury probability. | cited | Keep only the quality-of-effort rationale; S4 supports large/multi-joint before small/single-joint, but not an injury-probability claim. |
| Ten repetitions and a difficult final one or two repetitions identify the right beginner load. | cited | General starting reference only (S1); technique and comfort take priority. |
| A 60 kg × 8 result has only two next choices: 60 kg × 9 or 62.5 kg × 7. | removed | False precision and not universal across exercises. |
| Strength is 3–6 reps, hypertrophy 6–12, endurance 12–20, with fixed set and rest ranges. | softened | Remove rigid goal table; prescriptions overlap and vary by outcome and trainee (S4, S5). |
| Beginners should always start at 8–12 repetitions regardless of goal. | cited | Retain as a general public-health starting range, not a rule (S1). |
| Four exercises at three sets and two-minute rests necessarily exceed twenty minutes; four exercises in 60 minutes require 60–90-second rests. | removed | Arithmetic ignores set duration and transition time; the resulting prescription is not universal. |
| On short days, accessories then sets must be removed while compounds must always remain; a 20-minute/three-set session preserves progress. | softened | Keep as a planning example; remove performance hierarchy and time guarantee. |
| After one of three sessions, scheduling five the next week usually fails; two half-weeks require reducing the target. | softened | Keep “do not cram missed work” as conservative planning advice; remove predicted failure and exact trigger. |
| Every completed target should trigger 2.5–5 kg more load. | softened | Smallest available increment only after controlled target repetitions; not for every exercise or trainee (S4). |
| Four-week stalls diagnose exercise order, high starting load, fatigue, or rest creep. | softened | Present these as questions to inspect, not diagnoses. |

### `how-to-set-rival-routine`

| Risky claim in the published pair | Disposition | Basis / edit instruction |
|---|---|---|
| Solo commitments usually last one week, and an unstructured buddy plan rarely survives two weeks. | removed | Unsupported universal retention claims. |
| People respond more strongly to others’ expectations than their own. | softened | Social comparison affected class attendance in one student RCT; do not state a universal psychological law (S7). |
| One to three partners works, while five or more dilutes accountability and reduces effect. | softened | Treat one partner or a small group as a coordination choice, not an efficacy threshold. |
| Selecting and setting up the challenge takes 2, 3, 5, 10, 30, or 60 minutes. | removed | Unsupported time promises. |
| A four-week, three-times-per-week attendance goal has better adherence than adding 5 kg. | softened | Recommend an observable process goal for easier scoring, not superior retention. |
| Result goals fail more often before a habit exists. | removed | No direct source supports the exact claim. |
| Splitting records across two places causes logging to stop in week three. | softened | One log is a simplicity convention; remove causal timing claim. |
| Weekly nudges work, daily nudges damage relationships, and announced rules prevent most conflict. | softened | Frame as consent and boundary choices, not measured effects. |
| Food, drinks, or a penalty meal is the strongest reinforcement. | removed | Unsupported behavior claim; avoid coercive penalties. |
| Exactly five spreadsheet columns and three operating rules keep a challenge alive for four weeks; extra columns lower survival. | softened | Keep the minimal template without retention claims. |
| Injury or illness is the most common challenge-ending event; substitute unaffected exercise or three weekly walks/stretch sessions. | removed | Do not prescribe activity around injury. Pause or revise only with appropriate professional guidance (S11). |
| Percentage improvement removes skill-gap problems. | softened | Use individual process goals; remove percentage-performance scoring. |
| Week three is a predictable slump and week four fills through deadline pressure. | removed | Unsupported timing/behavior claim. |
| Four weeks is the minimum for habit formation, three months raises dropout, and four weeks is a completion sweet spot. | removed | Habit formation varies substantially; four weeks remains an administrative review window only. |
| Three four-week cycles produce major change in twelve weeks. | removed | Performance guarantee. |
| The next cycle should raise frequency from three to four or load by 2.5–5 kg. | softened | Change only one planning variable when useful; load uses the smallest available increment after controlled target repetitions (S4). |
| Social comparison/competition universally increases exercise. | cited | State only that one 790-student randomized trial found greater class attendance in its comparison conditions; applicability to other populations and informal challenges is uncertain (S7). |

### `running-crew-meets-ai-coach`

| Risky claim in the published pair | Disposition | Basis / edit instruction |
|---|---|---|
| Running crews visibly increased among Korean workers in the last 1–2 years. | removed | Current trend claim lacks a direct primary/official source. |
| Group guilt raises attendance, pace partners improve persistence, and meals/drinks create community. | softened | Describe possible reasons people join; do not claim measured outcomes. |
| Running repeatedly loads one leg with 2–3 times body weight. | cited | Narrow to one small laboratory study: vertical force approached 2.5× body weight at 6.0 m/s and varied with speed (S8). |
| Weak glutes/core/hamstrings shift remaining force into joints and cause runner’s knee, shin pain, and Achilles problems. | removed | Mechanistic and causal injury claim is not established by the selected direct evidence. |
| Running without strength inevitably costs a month and strength work prevents injury. | removed | Performance/injury guarantee contradicted by limited direct trial evidence (S10). |
| Every runner needs one or two 30–40-minute strength sessions. | softened | WHO recommends major-muscle strengthening on two or more days for adults generally; duration and runner-specific dose are individualized (S3). |
| One squat/hinge, one core, and one calf/ankle movement is a complete runner session; three sets of ten is the correct dose. | softened | Keep as an editable example only; no completeness claim (S5). |
| Strength the day before a long run or on interval day causes form breakdown; Tue/Thu around Mon/Wed/Fri running is optimal. | softened | Offer spacing as a fatigue-management experiment, adjusted by soreness and key-session quality. |
| The sample week’s 5–10 km runs and 40-minute strength blocks are suitable targets. | softened | Mark clearly as placeholders, not prescriptions. |
| The eight-week progression, fixed deload week, 3 × 12/10, two sets, and automatic 2.5–5 kg increase minimize schedule conflict. | removed | Unsupported universal periodization and fixed progression. Replace with a simple record-and-adjust loop. |
| Never increase running volume and strength load in the same week. | softened | One-variable-at-a-time is a troubleshooting convention, not an injury-prevention law. |
| The 10% mileage rule is an injury-prevention ceiling; three build weeks plus a 20–30% reduction is safer. | removed | Randomized evidence does not establish the 10% rule or the proposed cycle as protective (S9). |
| Strength work makes legs heavy for one or two days and improves the repeatable mileage range. | softened | Ask the reader to observe individual next-day fatigue; remove universal performance benefit. |
| Four-week load, 30-to-45-second plank, and weekday patterns diagnose fatigue and prove progress. | softened | Keep as fictional log examples and questions, not diagnostic or performance thresholds. |
| Strength training prevents running injury or improves maximal aerobic speed. | cited | Explicitly state that a small randomized pilot found no significant advantage for either outcome and that strength should not be sold as insurance (S10). |

### `why-weekly-planning-fails`

| Risky claim in the published pair | Disposition | Basis / edit instruction |
|---|---|---|
| Weekly planning always contains seven decisions and takes one hour. | softened | Seven is an editorial checklist, not research; remove the time claim. |
| Decision fatigue after a work week makes people default to the same routine and causes plateaus or skipped weeks. | softened | Present as a possible experience; the resource-depletion model is unsettled (S6). |
| Six of seven decisions follow automatically from session count and minutes. | softened | Use the two inputs to narrow options, not determine them. |
| Fixed 2/3/4/5-day split and 30/45/60-minute volume table is universally correct. | removed | Replace with non-prescriptive templates and major-muscle/recovery checks (S1, S3, S5). |
| Korean PT commonly costs ₩50,000–100,000 per session or ₩400,000–800,000 monthly. | removed | Uncited current price range. |
| In-person form feedback is overwhelmingly better and planning is merely a calculation. | softened | Distinguish observation from planning without comparative superiority. |
| Logging makes load selection automatic and is the cheapest investment. | softened | Logging supplies a comparison point; it does not remove judgment. |
| A 60 kg × 8 bench result should become 60 kg × 9 or 62.5 kg × 7. | removed | False precision. |
| Completing 8–12 repetitions across all sets should automatically add 2.5–5 kg. | softened | Smallest available increment only after controlled targets; exercise and trainee context matters (S4). |
| After one missed week, reduce load exactly 10%; after two, halve exercises. | removed | Unsupported return-to-training prescription. |
| Pain on two sessions means swap the exercise and observe for two weeks. | removed | Numeric pain rule can delay evaluation; stop/modify and seek professional advice as appropriate (S11). |
| Writing rules reduces planning from an hour to ten minutes and leaves only two judgments. | removed | Unsupported time/performance guarantee. |
| This decision burden is the largest reason workouts are missed. | softened | Reframe as one addressable barrier, not the dominant cause. |

## Post-edit claim ledger summary

The pre-edit ledger contains 73 claim groups: 7 retained with direct citations, 41 softened into bounded guidance or examples, and 25 removed. The revised articles also cite limitations where the evidence is negative or context-specific:

- recovery is “do not train the same area on consecutive days,” with soreness, fatigue, injury history, and professional advice overriding the calendar;
- load progression uses the smallest available increment after controlled target repetitions, never an automatic `2.5–5 kg` jump;
- PT price ranges, accountability percentages, time-to-plan guarantees, fixed return percentages, habit-formation timing, and performance guarantees are absent;
- the running article explicitly reports that a small randomized pilot found no significant injury or maximal-aerobic-speed advantage from its strengthening condition;
- the social-comparison article identifies the student/class/incentive context before offering any practical inference;
- all ten files remain product-free with `feature_truth_refs: []`.

## Content-ops panel

Panel assembled for the ten-file corpus:

| Expert | Lens |
|---|---|
| Fitness safety editor | Checks pain, injury, recovery, progression, and return-to-training boundaries. |
| Evidence auditor | Checks that exact numeric/research language is supported by a direct study, official guidance, or official standard. |
| Instructional editor | Checks whether a reader can use the logs, tables, and decision sequences without treating examples as prescriptions. |
| PocketFit brand voice | Checks light, friendly, practical Korean tone and the absence of product claims. |
| Bilingual localization editor | Checks Korean-source/English fact equivalence, source parity, and matching caveats. |
| Search-intent editor | Checks that each preserved slug/title answers its original planning question. |
| Product-truth gate | Checks for current-use PocketFit, app-store, trainer-certification, or real-time-notification claims. |
| AI writing detector (1.5×) | Checks banned vocabulary, formulaic groups of three, excessive bold inline headers, em-dash density, and generic conclusions. |

### Round 1 — 92/100 — PASS

| Expert | Score | Key feedback |
|---|---:|---|
| Fitness safety editor | 94 | Pain rules no longer use arbitrary session counts; recovery guidance is bounded and refers out appropriately. |
| Evidence auditor | 93 | Direct sources sit next to exact claims, including negative trial findings and the ego-depletion replication. |
| Instructional editor | 91 | Editable tables and logs remain actionable without presenting fictional values as targets. |
| PocketFit brand voice | 92 | Korean copy is short, practical, and non-promotional; some necessary evidence paragraphs are denser than the brand norm. |
| Bilingual localization editor | 95 | Heading order, source set, numbers, limitations, and final disclosures are fact-equivalent across all five pairs. |
| Search-intent editor | 90 | Preserved titles/slugs still resolve their original query; evidence corrections make a few answers less absolute but more trustworthy. |
| Product-truth gate | 98 | No rendered product-use claim; all `feature_truth_refs` arrays remain empty. |
| AI writing detector (1.5×) | 91 | No banned-vocabulary hits, no decorative emoji, reduced bold-header lists, and restrained conclusions. |

**Weighted aggregate:** 92.9/100. All experts reached 90+, so no recursive rewrite round was required.

**Remaining editorial tradeoffs:** The preserved SEO titles still contain fixed time frames such as “four weeks” and “two strength sessions.” The bodies now state that these are planning frames, not universal physiological prescriptions. Existing `totalTime` metadata is preserved as requested and is not repeated as a performance promise in the body.

## Validation

Run from `/Users/park/Desktop/project/blog-platformholder`:

| Command | Result |
|---|---|
| `rg -n "앱을 설치|스토어|지금 시작|매주 월요일|인증 트레이너|실시간 알림|install the app|app store|start now|every Monday|certified trainer|real-time notification" content/ko/bbr content/en/bbr` | Two matches, both inside non-rendered Korean maintenance comments that warn not to mention real-time notifications. Zero rendered/promotional matches. |
| `npm run audit:content` | PASS: 42 published posts; 21 bilingual pairs. Length warnings only, including pre-existing corpus warnings. |
| `npm run build` (sandbox) | Failed before compilation because Turbopack could not bind an internal port (`Operation not permitted`). This is an execution-sandbox restriction, not a content error. |
| `npm run build` (approved outside sandbox) | Exit 0. Compiled, TypeScript passed, and 327 static pages generated. All BBR service and article route families were included. Existing warnings: workspace-root inference, CSS `@import` order, and broad NFT trace. |
| `git diff 795c139 -- content/ko/bbr content/en/bbr \| rg '^[-+](slug:|publishedAt:|canonical:|  ko: https://|  en: https://|feature_truth_refs:)'` | Zero output: slugs, publication dates, canonical/hreflang values, and empty feature-truth arrays remain unchanged. |
| English humanizer banned-vocabulary scan | Zero matches across the five English files. |
| KO/EN unique-source comparison per slug | Exact source-set parity for all five pairs. |

### Final brand QC

The first read-only BBR brand-QC pass blocked publication on four concrete issues: the CTA component's default `utm_medium="post"` was outside the publisher UTM allowlist; the Korean rival title contained an unsupported comparative adherence claim; the ledger total was miscounted; and that title created a bilingual claim mismatch.

The ten CTAs now explicitly use `medium="referral"`, the Korean title is non-comparative, and the ledger is corrected to 73 groups. A second read-only brand-QC pass returned **PASS** for all ten articles and this audit, confirming UTM compliance, product-free status, empty feature refs, bilingual equivalence, disclosures, and deterministic audit success.

After those fixes, `npm run audit:content` passed again and the approved outside-sandbox `npm run build` again exited 0 with 327 static pages generated.

## Remaining limitations

- The cited research populations are bounded: university students for social comparison, 23 recreational athletes for ground-reaction force, and a small novice-runner pilot for strengthening. Each article now names those boundaries.
- Official public-health guidance is not an individualized training prescription. The articles say so and refer pain, injury history, and health conditions to qualified professionals.
- The forbidden-language command intentionally sees two non-rendered maintenance comments. Removing those warnings would weaken future product-truth safeguards; rendered content has zero matches.
- Build warnings originate in existing project configuration/CSS and were not changed in this content-only task.
