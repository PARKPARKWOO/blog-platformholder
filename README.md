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
