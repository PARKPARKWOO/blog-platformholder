# Translation Memo — beginner-pet-prep (ko → en)

Source: /Users/park/Desktop/project/blog-platformholder/content/ko/find-my-pet/beginner-pet-prep.mdx
Target: /Users/park/Desktop/project/blog-platformholder/content/en/find-my-pet/beginner-pet-prep.mdx
Translated: 2026-05-04
Translator: claude-sonnet-4-6 (Translator Agent)

---

## SEO Keyword Mapping (ko → en)

| Korean original | English rendering | Notes |
|---|---|---|
| 반려동물입양 | pet adoption, new pet owner | Widened slightly — "beginner pet owner" also appears in title |
| 인식표 | ID tag | "identification tag" in full, "ID tag" throughout body |
| 내장칩 | microchip | Standard English veterinary term |
| 동물보호관리시스템 | animal.go.kr — Korea's national animal protection database | Domain name retained; explained in full on first mention |
| 골든타임 | golden window / golden hours | "골든타임" is a Konglish loanword; rendered as "golden window" for naturalness, consistent with lost-pet-5-step-guide.mdx |
| 식별 가능한 사진 | identification photos / distinctive markings | "식별 가능" split across different contexts |
| 실종 신고 | missing notice / file a missing notice | Avoids heavy legal connotation of "report" in casual contexts |
| 카카오 OpenChat | Kakao OpenChat (Korea's most-used messenger) | First full mention includes parenthetical; no further explanation |
| 보호자 | owner / pet owner | "Guardian" was considered but "owner" is standard English |
| 사례금 | reward | Direct equivalent |

---

## Title Rewrite

Korean: "반려동물 키우기 시작했다면 — 만일을 대비한 4가지 준비 (인식표·내장칩·사진 보관·Find-My-Pet 등록)"

English: "4 Things Every New Pet Owner Should Prepare — ID Tag, Microchip, Photos, and Find-My-Pet"

Rationale: The Korean title reads as a conditional ("If you're starting to raise a pet..."). English SEO favors a clear noun phrase leading with a number. "Every new pet owner" addresses the same persona without burying the value in a conditional clause. "Find-My-Pet" is retained at the end per brand rules.

---

## Description Rewrite

Korean (157 chars): "첫 반려동물을 맞이했다면 인식표·내장칩·식별 사진·Find-My-Pet 사전 등록, 이 4가지를 지금 준비해두세요. 만일의 실종 순간 1분 안에 움직일 수 있어요."

English (154 chars): "Just adopted a pet? Set up an ID tag, microchip registration, identification photos, and a Find-My-Pet account now — so you're ready to act in minutes if they ever go missing."

Rationale: Opens with a question hook ("Just adopted?") that matches search intent for "new pet owner checklist" and "pet adoption preparation" queries. The em-dash structure mirrors the reference file (lost-pet-5-step-guide). Avoids guarantees per publisher-meta rules.

---

## Cultural / Contextual Adaptations

### 동물보호관리시스템 (animal.go.kr)
Korean readers know this system by name. English readers need context. Solution: referenced as "animal.go.kr — Korea's national animal protection database" on first use, then abbreviated to "animal.go.kr" and "the registry" thereafter. The disclaimer about Find-My-Pet not being an official partner is preserved verbatim (feature-truth.md prohibition).

### 카카오 로그인
"카카오로 30초 가입" → "Sign in with Kakao takes about 30 seconds" + one-sentence explanation of what Kakao is (Korea's dominant messaging platform). Only added on the first explanatory use in Step 4 body text; CTA buttons use the shorter form per brand.md standard CTA table ("Sign in with Kakao").

### 골든타임
Rendered as "golden window" throughout (not "golden time," which is Konglish). Consistent with lost-pet-5-step-guide.mdx which uses "golden hours" — minor variation to fit sentence rhythm; meaning is identical.

### 해요체 tone → English 2nd-person
Korean original uses 해요체 throughout, with direct soft commands. English equivalent: second-person ("you"), present tense, soft imperative ("take three shots," "store them"). No passive constructions inserted; kept active and direct per brand.md English tone rule ("부드러운 명령형").

### Opening paragraph
Korean opens with a lyrical, empathetic description of the first day home. English preserves the emotional beat but compresses it slightly — English long-form blog readers tolerate shorter warm-ups before the utility content.

---

## Paraphrase / Liberal Rendering Log

| Section | Korean intent | English rendering | Reason |
|---|---|---|---|
| Intro | "눈을 못 떼게 되죠" (can't take your eyes off them) | "it's impossible to look away" | Idiomatic equivalence |
| Pain section | "패닉 상태에서 1분 1초가 아깝다" (every second is precious in a panic state) | "every second in a panic is a second not spent searching" | More concrete and actionable in English |
| Step 1 callout | "글자가 새겨진 형태가 인쇄·스티커보다 오래 유지" | "Engraved text outlasts printed or sticker-style tags" | Direct; added "rain, scratches, daily wear" to explain why without adding a new claim |
| Step 4 body | "체감이 다릅니다" (the feeling/experience is different) | "is a different experience entirely" | Maintained meaning; English doesn't need to hedge with "체감" |
| Closing line | "동네가 같이 찾아드릴게요" (the neighborhood will find them with you) | "Your neighborhood is here to help." | Brand slogan paraphrase. Direct translation ("A neighborhood will look together with you") reads awkwardly; this mirrors brand.md slogan "You don't have to look alone." |

---

## Feature Truth Compliance

All four `feature_truth_refs` verified against feature-truth.md ✅ Shipped:
- `guide_page` — referenced as "5-step guide" via cross-link
- `post_create` — described in Step 4 (photo, time, location, contact, reward fields)
- `post_image_upload` — "up to 3 images, jpg/jpeg/png/gif" stated in Step 3 callout
- `kakao_login` — described in Step 4

No 🚧 In Development features mentioned.
No ❌ Removed/Deprecated features mentioned (LocalStorage auth absent, old Vercel domain absent).
"Official partner" language absent.
No success guarantees ("100% find," "guaranteed reunion") present.
