# Translation Memo — beginner-resume-checklist

- Source: /Users/park/Desktop/project/blog-platformholder/content/ko/mirror-view/beginner-resume-checklist.mdx (ko)
- Target: /Users/park/Desktop/project/blog-platformholder/content/en/mirror-view/beginner-resume-checklist.mdx (en)
- Translator run: 2026-05-04

---

## SEO keyword mapping (ko → en)

| Korean original | English equivalent placed in article |
|---|---|
| 이력서 작성 체크리스트 | resume checklist (title, intro) |
| 신입 취준생 | first-time job seekers, entry-level candidates |
| AI 이력서 리뷰 | AI resume review |
| JD 키워드 매칭 | job description keyword alignment / JD keyword matching |
| 약점 분석 | weakness keywords, weakness profile |
| 취준 루틴 | job search routine (implicit in cycle/iteration framing) |
| 맞춤 면접 | personalized interview questions (cross-link) |

Target-locale SEO keywords seeded from audience.md (en):
"AI interview practice", "resume review AI", "job interview simulator", "mock interview online", "personalized interview questions" — seeded via cross-links and supporting prose rather than forced insertion, since this article is focused on the checklist/resume-review angle.

---

## Cultural adaptation decisions

### 취준생 / 신입 공채
"취준생" (job-preparation student, a Korean term for someone actively studying and preparing for employment during a dedicated job-hunting period) is mapped to "first-time job seekers" and "entry-level candidates". No parenthetical Korean gloss inserted because the concept translates cleanly and the article targets an English-speaking audience who would not benefit from the gloss.

Korean mass-recruitment cycles ("공채", company-wide cohort hiring that runs on fixed national schedules, particularly common at large Korean conglomerates) are not mentioned in the source article at the section level, so no footnote was required. The concept is implicit in the article's framing of "applying to specific job postings" which translates naturally to US job-search norms.

### 이력서 vs. resume / CV
"이력서" is rendered as "resume" throughout (US English standard). "CV" does not appear in this article because the context is entry-level / industry (not academic or international research). This matches the translation guide instruction.

### JD
"JD" is spelled out as "job description (JD)" on first use (in the Step 1 howToSteps text and in the checklist section header "Job description (JD) keyword alignment"). Subsequent uses retain the abbreviation where space and flow call for it.

### 파일명 convention
The Korean source shows: "이름_직무_이력서.pdf". Rendered as "FirstName_LastName_Role_Resume.pdf" — the US naming convention equivalent. This is an adaptation, not a fabrication; the intent (distinguishable file name) is preserved exactly.

### 신입·인턴 1페이지 권장
Retained as "one page is the standard for entry-level and internship candidates" — the norm holds in US hiring as well, so no cultural caveat needed.

### Score callout (25 / 15~24 / 15 미만)
Translated directly. Numbers and thresholds unchanged. Framing adapted from Korean advisory tone to English second-person direct ("You're ready for…", "Focus on sections D and G…").

---

## Free creative adaptation (의역) list

| Source (ko) | Translation choice | Reason |
|---|---|---|
| "채우다 멈추다를 반복하게 됩니다" | "you fill a section, second-guess it, rewrite it, and end up going in circles" | Literal: "you repeat filling and stopping". Expanded to capture the psychological loop more vividly in English. |
| "빈칸을 채웠다는 사실로 완성 여부를 판단합니다" | "they tend to judge completeness by whether the fields are filled in rather than whether the content is strong" | Added the contrast clause ("rather than…") to make the distinction land in English without the surrounding Korean context. |
| "채웠지만 흐릿한 이력서" | "a resume that looks complete but reads as vague" | "흐릿한" (blurry/fuzzy) rendered as "vague" in the English register of resume critique. |
| "30초 훑어보게 했을 때 어떤 사람인지 설명할 수 있는지" | "asked someone to skim the resume for 30 seconds and then describe what kind of candidate you are" | Added "candidate" to clarify context for an English reader who may not default to the hiring-lens reading. |
| "내가 쓴 것에 익숙해져서 보이지 않는 부분이 생깁니다" | "you read what you meant to say, not what's actually on the page" | Classic English idiom for writer's blind spot; more idiomatic than literal translation. |
| Closing line "차근차근 하나씩 점검해보세요" | "Work through it one section at a time." | "차근차근" (step-by-step, steadily) → "one section at a time". Brand tone: calm encouragement, not cheerleader energy. |

---

## Feature-truth compliance notes

All Mirror-View feature references in the translated article are restricted to ✅ Shipped items:
- `document_upload` — resume PDF upload referenced in Step 1
- `ai_resume_review` — core feature of Steps 3–4; described as async, 1–3 min, strengths/weaknesses/suggestions output
- `daily_quota` — "2 free reviews per day, +1 with rewarded ad (up to 3)" — matches §9 quota_policy
- `weakness_profile` — "top-5 recurring weakness keywords" home widget, after 5+ cumulative sessions — matches §4-1
- `jd_create` — JD text paste / URL input referenced in Step 2

Prohibited language confirmed absent:
- No "guaranteed offer", "pass rate", "lands you the job"
- No "replaces a professional consultant" — opposite phrase included: "not a replacement for a human career advisor or professional resume consultant"
- No specific company names used as interview hacks
- No competing service named or implied
- No claim that chat is available in the app (not mentioned)
- No live interview scoring / facial analysis claim (not mentioned)

---

## UTM parameters

All Mirror-View links carry:
- utm_source=blog
- utm_medium=organic
- utm_campaign=mv-launch-2026q2
- utm_content=howto-step1 (Step 1 link) / howto-step5 (Step 5 link)

Matches the ko source utm_content keys exactly per the translation guide instruction.

---

## hreflang cross-reference status

- en file: hreflang.ko and hreflang.en both present in frontmatter ✅
- ko source file: hreflang.en already present in original frontmatter ✅ (pre-existing — no update needed)
