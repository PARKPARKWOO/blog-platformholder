# blog-platformholder

platformholder 서비스 포트폴리오(BBR, Mirror-View 등)의 통합 블로그. `blog.platformholder.site` 배포 대상.

## Stack

- Next.js 16 App Router + React 19
- TypeScript · Tailwind CSS 4
- MDX (`@next/mdx` + gray-matter)
- 네이티브 i18n (ko / en), proxy.ts 기반 로케일 라우팅
- Vercel Hobby 배포

## 구조

```
src/
├── app/
│   ├── [locale]/              # 로케일 라우트
│   │   ├── layout.tsx         # root layout (html·body)
│   │   ├── page.tsx           # 홈
│   │   ├── blog/
│   │   │   ├── page.tsx       # 글 목록
│   │   │   └── [slug]/page.tsx
│   │   └── tags/
│   │       ├── page.tsx
│   │       └── [tag]/page.tsx
│   ├── proxy.ts               # Next.js 16: 로케일 리다이렉트
│   ├── sitemap.ts
│   └── robots.ts
└── lib/
    ├── i18n.ts
    ├── dict.ts
    └── posts.ts

content/
├── ko/
└── en/

messages/
├── ko.json
└── en.json
```

## 개발

```bash
npm install
npm run dev
# http://localhost:3000 → /ko 로 자동 리다이렉트
```

## 콘텐츠 작성

`content/{locale}/{slug}.mdx` 파일 추가. frontmatter 규격은 마케팅 에이전트가 생성하는 형식과 동일.

## IndexNow (Bing·Yandex·Naver 등)

변경된 URL 을 검색엔진에 직접 통보한다. Google 은 IndexNow 에 참여하지 않으므로 Google
대응은 기존 `sitemap.xml` + `lastmod` 경로를 그대로 유지한다 (IndexNow 는 sitemap 을
대체하지 않는다). 키 파일은 `public/8f3c1d5a7b9e40628ad14c6f2be7d093.txt` 이고, 키는
비밀값이 아니라 도메인 소유 증명용이라 공개가 전제다. 제출 대상은 sitemap 에서 뽑으므로
`/llms.txt`·`/llms-full.txt`·raw 라우트는 자연히 빠지고, 스크립트에서 한 번 더 거른다.

```bash
npm run indexnow -- --dry-run       # 최근 7일 변경분 미리보기 (제출 없음)
npm run indexnow                    # 최근 7일 변경분 제출
npm run indexnow -- --since=30d     # 기간 조정
npm run indexnow -- --all           # 전량 제출 (최초 1회·대규모 개편 때만)
```

sitemap 소스는 `.next/server/app/sitemap.xml.body`(빌드 산출물)를 먼저 보고, 없으면 라이브
`sitemap.xml` 을 받는다. 실패해도 항상 exit 0 이라 배포를 깨지 않는다. 자세한 옵션은
`npm run indexnow -- --help`.

## 배포 (TODO)

1. GitHub 저장소 push
2. Vercel 연결 (프로젝트 root: 현재 디렉토리)
3. 커스텀 도메인 `blog.platformholder.site` 추가
4. DNS `blog` CNAME → `cname.vercel-dns.com`

## 현재 TODO

- [ ] MDX 실제 렌더링 연결 (현재는 raw markdown 표시) — `next-mdx-remote` 또는 Velite 도입
- [ ] OG 이미지 템플릿 자동 생성 (`@vercel/og`)
- [ ] Google Analytics 4
- [ ] 네이버 Search Advisor
- [ ] JSON-LD (Article·BlogPosting)
- [ ] Vercel Speed Insights
