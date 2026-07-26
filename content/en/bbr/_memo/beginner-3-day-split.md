# Translation Memo — beginner-3-day-split

- Source: `/Users/park/Desktop/project/blog-platformholder/content/ko/bbr/beginner-3-day-split.mdx`
- Target: `/Users/park/Desktop/project/blog-platformholder/content/en/bbr/beginner-3-day-split.mdx`
- Target locale: `en`
- Translated: 2026-05-04

---

## Service name decision

`brand.md` lists "PocketFit" as the display name, but user instruction mandates **BBR / BBR (Barbell Robot)** as source-of-truth per `feature-truth.md`. All occurrences use "BBR" throughout. First mention expanded to "BBR (Barbell Robot)" in the intro link, then "BBR" thereafter.

---

## SEO keyword mapping (ko → en)

| ko keyword | en keyword used |
|---|---|
| 헬스 입문 / 헬린이 | fitness beginner / gym newcomer |
| 3분할 루틴 | 3-day split / beginner 3-day split |
| 분할루틴 | split routine |
| 기구 사용법 | equipment setup guide / how to use gym equipment |
| 운동기록 | workout log / gym log |
| 점진적 과부하 | progressive overload |
| AI PT 계획 | AI PT plan / AI-generated weekly PT plan |
| 헬스장 | the gym |

Title rewritten from direct translation ("Beginner's 3-Day Routine for Gym Beginners — Starting First 4 Weeks with BBR") to SEO-optimised: **"Beginner's 3-Day Split — Your First 4 Weeks with BBR"** — targets "3-day split" and "beginner workout routine" English search intent.

Description rewritten for 150–160 char English SEO: emphasises "beginner 3-day split", "chest, back, and legs", "5-step guide", BBR.

---

## Cultural / contextual adaptations

| ko concept | en handling |
|---|---|
| "헬스장에서 매번 직원을 부르기도 눈치 보입니다" | "asking a staff member every single time feels awkward" — direct cultural equivalent, no note needed |
| "헬스장 도착 후 '뭐 할까' 고민" | "standing at the entrance thinking 'what should I do today'" — same anxiety, natural EN phrasing |
| 가슴 / 등 / 하체 | chest / back / legs — standard EN fitness terminology, direct mapping |
| 벤치프레스, 랫풀다운 etc. | retained as-is — internationally standard exercise names |
| 오운완 | not present in source body; n/a |
| 취준 | not present; n/a |
| 카카오 로그인 | kept as "Kakao sign-in" — Kakao is a proper noun; English-reading audience in target market (Korean diaspora / global BBR users) recognises it. No further explanation added as source doesn't include one. |

---

## Intentional departures from literal translation

1. **Opening paragraph restructured**: ko starts with a scene-setting moment then three separate sentences. EN merges into a tighter two-sentence hook before breaking into the problem statement — avoids mechanical sentence-by-sentence structure.

2. **Callout "입문자에게 3분할이 맞는 이유"** title → **"Why a 3-day split works well for beginners"** — literal but SEO-friendly. Body hedging ("초보자 기준으로 일반적으로 추천되는") rendered as "a commonly recommended starting point" with added "That said, how your body responds varies" to preserve the nuance.

3. **Step 1 Callout** ko: "3초 시작" → EN: "In seconds" — "3 seconds" is a brand expression from brand.md CTA table; retained as concept but not as literal "3-second" claim since it's a tone/feel phrase.

4. **Closing paragraph** restructured from three short ko sentences into a tighter compound sentence to avoid choppy EN prose while preserving all three ideas: unfamiliarity with equipment / no routine / restarting every time.

5. **Final CTA paragraph** ("루틴을 저장하고 기록을 쌓는 첫걸음") → "Save your routine. Start your log. The first step is the only hard one." — equivalent motivational register without mechanical translation.

---

## Feature truth compliance checks

| Feature referenced | feature-truth status | Claim in EN text |
|---|---|---|
| `equipment_catalog` | ✅ Shipped | "23 pieces of equipment across 6 categories" |
| `equipment_setup_guide` | ✅ Shipped | "5–10 step setup guide, 4–8 safety notes, step-by-step images (avg 4 photos)" |
| `equipment_exercise_link` | ✅ Shipped | "'Exercises you can do with this' list" |
| `routine` | ✅ Shipped | "Save three routines, drag to reorder" |
| `history_log` | ✅ Shipped | "Log weight, sets, reps / previous records pre-fill" |
| `history_view` | ✅ Shipped | "calendar view / weekly and monthly views" |
| `ai_pt_plan` | ✅ Shipped | "Gemini-based AI returns a plan" / "most recent 14 days factored in" |
| `kakao_login` | ✅ Shipped | "Kakao sign-in / no separate signup screen" |

No 🚧 or ❌ features referenced. No result guarantees added. No "iOS fully supported" claim. No payment/session/gym-domain claims. No trainer marketplace.

---

## Auth expression

ko: "별도 회원가입 없이" / "별도 가입 화면이 없습니다"
→ EN: "There's no separate signup screen" (Step 1 Callout) and "no separate signup" (final CTA)
Old expression "no email signup" avoided.

---

## UTM parameters

All UTM links preserved with identical `utm_content` keys to ko original:
- `utm_content=intro` — body intro link
- `utm_content=howto-step4` — Step 4 log link
- `utm_content=final-cta` — bottom CTA
`utm_campaign=bbr-launch-2026q2` on all.

---

## hreflang cross-reference status

- EN file: `hreflang.ko` + `hreflang.en` both set
- ko file: already contained `hreflang.en: https://blog.platformholder.site/en/blog/bbr/beginner-3-day-split` — no update needed
- Mutual cross-reference: COMPLETE
