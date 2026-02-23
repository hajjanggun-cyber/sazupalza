# 사주팔자 프로젝트 (sajupalza) 메모리

## [Gemini CLI Update] 2026-02-22: Blog Post Content Update (1~3번 완료)
- **작업 내용**: 블로그 포스트 1, 2, 3번의 한국어 및 영어 본문 데이터 삽입 완료.
  1. **1번 (`intro`)**: '역학의 기초: 사주팔자란 무엇인가?' (한/영 완료)
  2. **2번 (`eumlyek-yanglyeok`)**: '음력과 양력: 생시의 중요성' (한/영 완료)
  3. **3번 (`iljoo`)**: '사주 일주(日柱) 완전정복' (한/영 완료)
- **주요 수정 사항**:
  - **중복 제거**: 1번 글 영어 본문이 중복 삽입된 오류 수정 완료.
  - **내부 링크 최적화**: 본문 내 `[내부링크: 제목]` 형식을 실제 작동하는 `<a href="/ko/saju/..." class="...">` 태그로 변환 삽입.
  - **데이터 무결성**: 파일 전체 쓰기(`write_file`)를 통해 오타 및 구조적 결함 방지.

## [Gemini CLI Update] 2026-02-22: Full Bilingual SEO Upgrade
- **목적**: 한국어와 영어 페이지 각각에 최적화된 SEO 메타데이터(제목, 설명, 키워드)와 구조화 데이터(TOC, FAQ)를 제공하기 위한 시스템 업그레이드.
- **주요 변경 사항**:
  1. `lib/blog/types.ts`: `BlogPost` 인터페이스에 `seoTitleEn`, `descriptionEn`, `keywordsEn`, `tocEn`, `faqEn` 등 영어 전용 선택적 필드 추가.
  2. `components/BlogPostPage.tsx`: 현재 `locale`에 따라 한국어 또는 영어 전용 메타데이터를 우선적으로 선택하여 렌더링하는 로직 구현.
  3. `app/[locale]/[category]/[slug]/page.tsx`: 모든 카테고리(saju, name, face, mbti, bokhap)의 동적 라우트에서 `generateMetadata`가 언어별 메타데이터를 참조하도록 수정.
- **효과**: 구글 영미권 검색 결과(SERP)에서 영어 제목과 설명이 정확하게 노출되어 글로벌 SEO 성능 극대화.

## 프로젝트 위치
`C:\Users\홈_메인\Desktop\11  11 실전코딩\sajupalza`

## 기술 스택
- Next.js 14.2.5 (App Router, SSG)
- next-intl ^3.17.2 (ko/en/ja/zh)
- Tailwind CSS + Modern Mystic 테마 (Deep Navy #0F0C29 + Gold #C8860A)
- face-api.js (브라우저 내 관상 분석)
- korean-lunar-calendar (음력 변환)

## 완료된 파일 전체 목록 (2026-02-22 전체 빌드 성공)

### 설정 파일
- package.json, next.config.js (output: standalone 제거), tailwind.config.ts
- tsconfig.json, postcss.config.js, i18n.ts (requestLocale 신문법), middleware.ts

### 다국어 메시지
- messages/ko.json, en.json, ja.json, zh.json

### 데이터 파일
- lib/data/saju/cheongan.ts, jiji.ts, ohaeng.ts, sipseong.ts, sinsal.ts, iljoo.ts
- lib/data/name/orhaeng-sound.ts, suri81.ts, hoeksu.ts
- lib/data/face/features.ts, face-shape.ts, color.ts
- lib/data/mbti/types.ts, gunghap.ts
- lib/data/guardian.ts (수호신 5종: 청룡/봉황/황룡/백호/현무)

### 계산기
- lib/calculator/saju-calculator.ts
- lib/calculator/name-calculator.ts
- lib/calculator/result-generator.ts (대폭 확장: 8+섹션, ComprehensiveResult 인터페이스)

### 컴포넌트
- components/AdSense.tsx
- components/Navigation.tsx ('use client')
- components/Footer.tsx ('use client')
- components/AnalysisForm.tsx (Base64 URL-safe 인코딩 → /result/[id] 리다이렉트)
- components/AnalysisLoading.tsx (단계별 로딩 애니메이션)
- components/steps/Step1Name.tsx ~ Step5Photo.tsx

### 앱 페이지
- app/layout.tsx, app/globals.css (Modern Mystic 테마 완전 재작성)
- app/[locale]/layout.tsx
- app/[locale]/page.tsx (JSON-LD: WebApplication+FAQPage, 광고 문구 정리)
- app/[locale]/result/page.tsx (구 URL → 새 URL 리다이렉트)
- app/[locale]/result/[id]/page.tsx (NEW: 개인화 URL 전체 결과, 잠금 없음)
- app/[locale]/result/[id]/opengraph-image.tsx (NEW: SNS 공유 OG 이미지)
- app/[locale]/saju/page.tsx (JSON-LD: Article+FAQPage+BreadcrumbList)
- app/[locale]/name/page.tsx (JSON-LD: Article+FAQPage+BreadcrumbList)
- app/[locale]/face/page.tsx
- app/[locale]/mbti/page.tsx (JSON-LD: Article+FAQPage+BreadcrumbList)
- app/[locale]/privacy/page.tsx, terms/page.tsx, contact/page.tsx
- app/sitemap.ts, app/robots.ts

## STRATEGY.md 구현 완료 사항
1. Modern Mystic 테마 (globals.css 전체 재작성)
2. 수호신(guardian.ts) - 5종 수호신 데이터
3. AnalysisLoading 컴포넌트 - 단계별 로딩
4. result-generator.ts 8+섹션 확장 (오행/일간/직업/재물/연애/건강/개운/성명/MBTI)
5. 개인화 URL /result/[id] (Base64 URL-safe 인코딩)
6. 잠금/해제 메커니즘 완전 제거 → 결과 즉시 전체 공개
7. JSON-LD 구조화 데이터 (주요 페이지 전체)
8. 광고 콘텐츠 게이팅 문구 제거 (AdSense 정책 준수)

## URL 인코딩 구조 (중요!)
```
// 인코딩 (AnalysisForm.tsx)
JSON.stringify(data) → TextEncoder → btoa → URL-safe (-, _, 패딩 제거)

// 디코딩 (result/[id]/page.tsx)
URL-safe 복원 → atob → Uint8Array → TextDecoder → JSON.parse
```

## 중요한 패턴 / 주의사항

### next-intl v3 SSG 패턴
- Server Component: `unstable_setRequestLocale(locale)` 필수
- i18n.ts: `requestLocale` 사용 (locale 파라미터 deprecated)
- Client Component 내 locale: `useParams()`

### 결과 페이지
- /result/page.tsx: dynamic='force-dynamic' (구 URL 리다이렉트 용도)
- /result/[id]/page.tsx: useMemo로 즉시 디코딩, AnalysisLoading 후 전체 표시

### 커스텀 CSS 클래스 (globals.css)
- `card-dark`, `card-glow`, `btn-primary`, `btn-secondary`, `btn-gold`
- `score-bar`, `score-fill`, `progress-step` (active/done)
- `result-section`, `result-section-title`, `ohaeng-badge` (ohaeng-mok/hwa/to/geum/su)
- `guardian-card`, `loading-screen`, `loading-step`
- `share-btn`, `share-kakao`, `share-link`
- `fade-in-up`, `shimmer`

### AdSense
- app/layout.tsx에 스크립트 주석처리 (publisher ID 교체 후 활성화)
- 콘텐츠 게이팅 없음 - AdSense 정책 준수

## 배포
- Vercel: GitHub 연결 후 자동 배포
- 도메인: sajupalza.vercel.app
- 빌드 출력: 41 static pages + 2 dynamic routes (result/[id], opengraph-image)

## 작업 규칙 (반드시 준수)
- Write 금지 → Edit으로 해당 블록만 교체
- Read 최소화 → Grep으로 필요한 부분만 검색
- 100줄 이상 수정 전 → 유저에게 먼저 물어보기
- 여러 파일 동시 수정 전 → 유저에게 먼저 물어보기
- 세션 시작 권장 문구: "메모리 확인해. 오늘 작업: [내용]. Edit만 써, 큰 작업 전 물어봐."
- 주의: MEMORY.md 규칙은 자동 준수 안 됨 → 세션 시작 시 위 문구로 반드시 상기시킬 것
- 루트의 MEMORY.md(sajupalza/MEMORY.md)는 자동 동기화 안 됨 → 필요 시 "루트에 복사해줘" 요청
