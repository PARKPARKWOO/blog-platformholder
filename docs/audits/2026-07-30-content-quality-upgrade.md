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
| S8 | [Keller et al., running ground-reaction-force study](https://pubmed.ncbi.nlm.nih.gov/11415629/) | Direct laboratory study: measured vertical ground-reaction force varied with speed and approached about 2.5 times body weight at 6.0 m/s in 23 recreational athletes. |
| S9 | [Run Clever randomized trial](https://pubmed.ncbi.nlm.nih.gov/29527322/) | The cited trial did not test or validate either a universal 10%-per-week rule or a fixed three-build-weeks/one-down-week formula. |
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
| The 10% mileage rule is an injury-prevention ceiling; three build weeks plus a 20–30% reduction is safer. | removed | The cited trial did not test or validate either fixed formula (S9). |
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

## Content-ops self-assessment panel

The following panel is an internal editorial self-assessment of the ten-file corpus. It is not an independent review and has no durable external scoring artifact.

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

### Self-assessment round 1 — 92/100 — PASS

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

**Weighted self-assessment aggregate:** 92.9/100. All simulated lenses reached 90+, so no recursive rewrite round was required. This score is an editorial heuristic, not an independently verified measurement.

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

### Final brand-QC self-assessment

The first internal read-only BBR brand-QC self-assessment blocked publication on four concrete issues: the CTA component's default `utm_medium="post"` was outside the publisher UTM allowlist; the Korean rival title contained an unsupported comparative adherence claim; the ledger total was miscounted; and that title created a bilingual claim mismatch.

The ten CTAs now explicitly use `medium="referral"` and descriptive pair-aligned campaign slugs in the `bbr-{campaign}-{yyyyqN}` format. The Korean title is non-comparative, and the ledger is corrected to 73 groups. A second internal read-only brand-QC self-assessment returned **PASS** for all ten articles and this audit after checking UTM compliance, product-free status, empty feature refs, bilingual equivalence, disclosures, and deterministic audit success.

After those fixes, `npm run audit:content` passed again and the approved outside-sandbox `npm run build` again exited 0 with 327 static pages generated.

## Remaining limitations

- The cited research populations are bounded: university students for social comparison, 23 recreational athletes for ground-reaction force, and a small novice-runner pilot for strengthening. Each article now names those boundaries.
- Official public-health guidance is not an individualized training prescription. The articles say so and refer pain, injury history, and health conditions to qualified professionals.
- The forbidden-language command intentionally sees two non-rendered maintenance comments. Removing those warnings would weaken future product-truth safeguards; rendered content has zero matches.
- Build warnings originate in existing project configuration/CSS and were not changed in this content-only task.

---

# Find-My-Pet search-intent and evidence upgrade

## Scope and editorial roles

This section covers the eight published Korean/English Find-My-Pet pairs revised on 2026-07-30. Korean and English carry equivalent facts, limitations, sources, feature claims, and internal-link destinations.

| Slug | Non-overlapping role |
|---|---|
| `lost-pet-5-step-guide` | Pillar: ordered response checklist from the last-seen point through reporting, sharing, shelter checks, sightings, and closure. |
| `why-first-hour-matters` | Immediate fact preservation and role coordination, without a universal golden-hour promise. |
| `how-far-do-lost-pets-travel` | Expansion from the loss point using outdoor history, terrain, and sightings, without a universal radius. |
| `check-shelter-notices-by-region` | Active official notices, adjacent districts, shelter contacts, and the separate seven-day notice and ten-day ownership rules. |
| `how-to-write-a-flyer` | Identifying information, contact-safety choices, permission-based print distribution, and collection. |
| `beginner-pet-prep` | Readable ID tag, registered microchip data, current photographs, and reporting/service readiness. |
| `saw-a-stray-what-to-do` | Safe observation, public missing-post checks, and official reporting without assumptions about ownership or abandonment. |
| `holiday-season-pet-safety` | Prevention around doors, visitors, transport, unfamiliar accommodation, and identification. |

## Direct source map

Legal, reporting, behavioral, distance, urgency, and identification claims use current government/statute pages or primary research. Secondary rescue blogs, news summaries, and unsourced radius rules were not used.

| ID | Direct source | What it supports and does not support |
|---|---|---|
| FMP-S1 | [Korea Animal Protection Act, Articles 39–43, effective 2026-07-07](https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1028318771) | A person who finds a lost or abandoned animal may report it to a local government or animal shelter; notice for at least seven days; return while protected; possible local-government ownership ten days after the notice date when the owner remains unknown. It does not govern an owner's registered-animal loss report or make seven and ten days one universal “shelter period.” |
| FMP-S2 | [Korea Animal Protection Act, Article 15](https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1028318041) | Registration of covered animals and reporting a registered animal as lost or reporting changed registration details. |
| FMP-S3 | [Animal Protection Act Enforcement Decree, Article 11](https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1028781975) | An owner phone-number change is among the registration changes that must be reported. |
| FMP-S4 | [Ministry of Agriculture, Food and Rural Affairs, lost/abandoned-animal reporting guidance, 2026-03-17](https://mafra.go.kr/bbs/home/792/577317/artclView.do) | National-system online reporting, the 1577-0954 connection line, 24-hour online intake, and official handover even after personal rescue. |
| FMP-S5 | [Ministry of Agriculture, Food and Rural Affairs, holiday pet guidance, 2026-02-12](https://www.mafra.go.kr/home/5109/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGaG9tZSUyRjc5MiUyRjU3Njk2MiUyRmFydGNsVmlldy5kbyUzRg%3D%3D) | Preparing a separate space during holiday visits and using the national system for lost/found reporting. It does not support a fixed pre-visit walk duration. |
| FMP-S6 | [Weiss, Slater, and Lord, Frequency of Lost Dogs and Cats and Methods Used to Locate Them](https://pmc.ncbi.nlm.nih.gov/articles/PMC4494319/) | Primary US household survey showing species differences in recovery methods. It does not establish a Korean universal recovery rate, radius, or time window. |
| FMP-S7 | [Huang et al., Search Methods Used to Locate Missing Cats and Locations Where Missing Cats Are Found](https://pmc.ncbi.nlm.nih.gov/articles/PMC5789300/) | Primary retrospective survey: physical searching and found distance varied with prior outdoor access. The articles state the self-selected, recall-survey limits and do not transplant its distance percentiles into a universal radius. |
| FMP-S8 | [Lord et al., Search and identification methods that owners use to find a lost dog](https://experts.arizona.edu/en/publications/search-and-identification-methods-that-owners-use-to-find-a-lost-/) | Primary one-county study identifying animal-agency contact, identification, and neighborhood signs as different recovery routes. It does not establish a universal flyer count, radius, reading time, or success rate. |
| FMP-S9 | [Lancaster et al., Problems Associated with Microchip Data of Stray Dogs and Cats Entering RSPCA Queensland Shelters](https://pmc.ncbi.nlm.nih.gov/articles/PMC4494412/) | Primary shelter-admission analysis of inaccurate microchip registry data and owner contact. It is not a study of Korea's registration system and is not presented as one. |

## Pre-edit risky-claim ledger

Each row covers equivalent claims in Korean and English frontmatter, FAQs, HowTo JSON-LD fields, key takeaways, and body content. Structured metadata was treated as rendered content.

| Article | Risky pre-edit claim group | Disposition | Basis and resulting edit |
|---|---|---|---|
| Pillar | Every pet stays within a fixed short radius for a universal first one-to-two-hour period. | removed | No selected direct source supports a universal combined-species radius or time window. The response now begins at the last-seen point and updates from terrain and sightings. |
| Pillar | Dogs and cats share one hiding and movement pattern. | softened + cited | FMP-S6 and FMP-S7 support separating species and outdoor history; study limits are stated. |
| Pillar | Current Find-My-Pet post, status, radius-map, share, sighting, and notice behavior. | retained + keyed | Retained only against `post_create`, `post_status_change`, `search_radius_map`, `sighting_report`, `share_buttons`, and `abandoned_notice_status`; registration path returned HTTP 200. |
| First hour | The first hour is a universal reunion guarantee or scientifically fixed golden hour. | removed | Reframed as an operational coordination window, not a biological or outcome guarantee. |
| First hour | Every lost animal hides close by and should be handled with the same search method. | softened + cited | FMP-S6 and FMP-S7 show species and outdoor-history differences, not one rule. |
| First hour | Flyers, insurers, registries, and ads can always wait an exact number of hours without effect. | removed | No direct source supports that delay or outcome claim. |
| Distance | Universal 500 m–1 km and 5 km search rules in frontmatter, FAQs, and body. | removed | FMP-S7 is context-specific and explicitly shows variation; no fixed number remains in published files. |
| Distance | A cat will stay close or a dog will move far as a species-wide rule. | softened + cited | Prior outdoor access, terrain, roads, and actual sightings now determine expansion; FMP-S6 and FMP-S7 limitations are visible. |
| Distance | Find-My-Pet's three-band map is a reliable boundary. | retained with limitation + keyed | `search_radius_map`, `time_phase_ui`, `breed_master`, `post_create`, `post_detail`, and `kakao_map_view`; copy repeatedly says “reference estimate, not a boundary.” |
| Shelter notices | “The notice period is ten days.” | corrected + cited | FMP-S1 separates at least seven days of notice under Article 40 from possible ownership acquisition ten days after the notice date under Article 43. |
| Shelter notices | Checking every day for the first ten days is universally the most important routine. | softened | Readers are told to keep a checking record, include adjacent districts, and act directly on specific sightings without ranking one method universally. |
| Shelter notices | Hourly public-data synchronization and closed notices as a known outcome. | corrected + keyed | Removed the sync-frequency promise; closed status is not interpreted. Regional pages and alerts remain under current shipped keys. |
| Flyer | One photo, five fields, three-second readability, a fixed print count, fixed radius, and current print prices are universal. | removed | FMP-S8 does not support those design, quantity, distance, speed, or price claims. |
| Flyer | Particular street fixtures are always legal or illegal posting sites nationwide. | softened | Readers must obtain site/manager permission and follow removal conditions; no nationwide legal conclusion remains. |
| Flyer | Flyer creation requires an owned missing post and offers only three A4 templates. | corrected + keyed | Current `flyer_standalone` and `flyer_print`: public `/flyer`, no sign-in or missing post required, six paper sizes and six templates; route returned HTTP 200. |
| Beginner prep | Every step takes five minutes, an ID tag must be fitted on one exact day, and photos must be replaced monthly. | removed | Readiness uses readability, attachment security, appearance change, and identification value rather than unsupported timing. |
| Beginner prep | A microchip is useful without current registry details or functions like tracking. | corrected + cited | FMP-S2, FMP-S3, and FMP-S9; the chip is described as an identifier, not GPS, and contact information must be current. |
| Beginner prep | Current web, image, public-list, detail, login, sighting, and in-app notification actions. | retained + keyed | Retained against nine current feature keys, including `post_list_public`, `post_detail`, and `notification_page`; public home returned HTTP 200. |
| Loose animal | A universal three-minute capture flow, chasing behavior claim, and exact per-step completion times. | removed | Replaced with safety, observation, and reporting; no behavior guarantee or timing promise remains. |
| Loose animal | A finder may report to the local government/shelter, use the national system, and must use the official process after personal rescue. | cited | FMP-S1 and FMP-S4 provide the direct current basis. |
| Loose animal | Current public search, nearby filter, detail, sighting, notification, bookmark, and Kakao login behavior. | retained + keyed | Preserved feature references remain supported; `/search` returned HTTP 200. |
| Holiday safety | Holiday risk is proven to rise universally, and a fixed pre-visit walk reduces escape behavior. | removed | FMP-S5 supports a separate space, not the risk comparison or fixed exercise prescription. |
| Holiday safety | Separate visitor space, current registration contact, and actual travel-location reporting. | cited | FMP-S2, FMP-S3, and FMP-S5. |
| Holiday safety | Find-My-Pet is a reachable web service and missing-post creation requires Kakao sign-in. | retained + keyed | `post_create` and `kakao_login`; public home and registration routes returned HTTP 200. |

**Disposition summary:** 24 pre-edit claim groups: 8 removed, 5 softened, and 11 corrected, directly cited, or retained with matching feature-truth keys.

## Internal-link map

Links below are body links, excluding canonical and hreflang metadata. Each locale mirrors the same map.

| Source | Pillar/back link | At most one adjacent support link |
|---|---|---|
| Pillar | n/a | Links once each to all seven focused guides in context. |
| First hour | Pillar | Distance |
| Distance | Pillar | Shelter notices |
| Shelter notices | Pillar | Distance |
| Flyer | Pillar | First hour |
| Beginner prep | Pillar | Holiday safety |
| Loose animal | Pillar | Shelter notices |
| Holiday safety | Pillar | Beginner prep |

All Korean body links use `/ko/blog/find-my-pet/...`; all English body links use `/en/blog/find-my-pet/...`.

## Feature-truth and public-route checks

The marketing repository was read-only throughout this task. Feature checks use the 2026-07-28 Find-My-Pet feature-truth digest plus direct public HTTP checks.

| Article | Retained feature keys | Public action retained |
|---|---|---|
| Pillar | `post_create`, `post_status_change`, `search_radius_map`, `sighting_report`, `share_buttons`, `abandoned_notice_status` | `/register` |
| First hour | `post_create`, `post_list_public`, `post_detail`, `share_buttons`, `kakao_login` | `/register` |
| Distance | `search_radius_map`, `time_phase_ui`, `breed_master`, `post_create`, `post_detail`, `kakao_map_view` | `/register` |
| Shelter notices | Existing nine keys preserved | `/abandonment/region` |
| Flyer | `flyer_standalone`, `flyer_print` | `/flyer` |
| Beginner prep | `post_create`, `post_image_upload`, `kakao_login`, `sighting_report`, `in_app_notification`, `notification_bell`, `post_list_public`, `post_detail`, `notification_page` | `/` |
| Loose animal | Existing nine keys preserved | `/search` |
| Holiday safety | `post_create`, `kakao_login` | `/` |

Direct checks on 2026-07-30 returned HTTP 200 for `/`, `/flyer`, `/abandonment/region`, `/guide`, `/search`, and `/register`. These checks establish reachability, not an operating-status or outcome guarantee.

## Find-My-Pet content-ops self-assessment

The scoring panel is an internal editorial heuristic, not independent validation.

| Expert | Lens |
|---|---|
| Korean lost-pet service editor | Calm, practical, non-blaming response language. |
| Animal-protection-law editor | Current notice, ownership, registration, and reporting wording. |
| Veterinary-behavior evidence auditor | Species, outdoor-history, distance, and urgency boundaries. |
| Public-safety editor | Finder safety, official reporting, and no ownership assumptions. |
| Product-truth gate | Reachable actions and matching shipped keys. |
| Search-intent editor | Eight distinct roles without duplicate universal checklists. |
| Bilingual localization editor | Fact, limitation, source, and link equivalence. |
| AI writing detector (1.5×) | Banned vocabulary, formulaic claims, excessive bolding, and generic conclusions. |

### Internal self-assessment round 1 — 92.0/100 — PASS

| Expert | Score | Key feedback |
|---|---:|---|
| Korean lost-pet service editor | 92 | Urgent copy is calm and avoids blame or despair. |
| Animal-protection-law editor | 94 | Seven-day notice and ten-day ownership provisions are separated and linked to the live statute. |
| Veterinary-behavior evidence auditor | 90 | Universal distance and time rules are gone; retrospective-study limits are visible. |
| Public-safety editor | 92 | Loose-animal guidance avoids ownership assumptions and directs hazardous cases to authorities. |
| Product-truth gate | 95 | Every product action has a non-empty current key and a directly checked route. |
| Search-intent editor | 90 | Pillar and seven support roles are distinct and linked deterministically. |
| Bilingual localization editor | 94 | Sources, numbers, cautions, feature claims, and internal map match across locales. |
| AI writing detector (1.5×) | 90 | No English banned-vocabulary hits; lists are functional, not decorative. Some repeated “do not” safety phrasing is necessary. |

**Internal self-assessment aggregate:** 92.0/100. This editorial heuristic is not independent proof. All panel lenses reached 90+, so no recursive content-ops rewrite round was required.

## Find-My-Pet validation

Validation results and the final commit are also recorded in the task report at `.superpowers/sdd/task-5-report.md`.

| Check | Result |
|---|---|
| `rg -n "feature_truth_refs\|findmypet\\.platformholder\\.site\|animal\\.go\\.kr" content/ko/find-my-pet content/en/find-my-pet` | Exit 0; product claims and feature-reference blocks were enumerated. Direct legal support uses current statute links rather than a generic `animal.go.kr` homepage. |
| Fixed radius/time scan over the 16 published files | Zero matches for the removed 500 m–1 km, 5 km, universal one-to-two-hour, first-30-minute, and golden-hour phrases. |
| Internal-link script, body only | Both locales: pillar has seven unique focused links; every focused guide has exactly two unique links, one to the pillar and one adjacent guide. |
| Preserved-feature comparison to `ab04c018` | Every previously non-empty feature-reference set is preserved without a missing key; previously empty files now carry keys for retained product claims. |
| Feature-key scan against read-only `marketing/services/find-my-pet/feature-truth.md` | Every referenced key was found in the current digest. Marketing files remained untouched. |
| KO/EN direct-source comparison per slug | Exact source-set parity for all eight pairs. |
| English content-ops banned-vocabulary scan | Zero matches across the eight published English files. |
| `npm run audit:content` | Exit 0: PASS for 42 published posts and 21 bilingual pairs. Length warnings only. |
| `npm run build` in sandbox | Failed before compilation because Turbopack could not bind an internal port (`Operation not permitted`). |
| `npm run build` outside sandbox | Exit 0: compiled successfully, TypeScript passed, and 333 static pages generated. Existing warnings: inferred workspace root, CSS `@import` order, and broad NFT trace. |
| `git diff --check` | Exit 0. |
| Protected metadata diff against `ab04c018` | Zero output for changes to slug, `publishedAt`, canonical, and hreflang values. |

## Find-My-Pet remaining limitations

- FMP-S6 through FMP-S9 are non-Korean studies with specific survey or shelter contexts. The articles name those boundaries and do not transplant their rates or distances.
- Public-route HTTP 200 checks do not prove a specific user account, notification delivery, or operational deployment SHA.
- Shelter notice status does not establish an animal's current outcome; the shelter remains the authoritative contact.
- Search-radius UI is a product estimate and is never presented as a biological boundary.
