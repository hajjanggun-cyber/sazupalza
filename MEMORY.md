# sajupalza 프로젝트 메모

- 기준 일시: 2026-03-09
- 목적: 프로젝트 구조와 운영 방식만 빠르게 확인하기 위한 메모

## 1. 프로젝트 개요

- 프로젝트명: `sajupalza`
- 성격:
  - 사주
  - 성명학
  - 관상
  - MBTI
  - 궁합/복합
  콘텐츠와 분석 도구를 함께 운영하는 Next.js 사이트
- 운영 특징:
  - 다국어 라우팅 사용
  - 블로그 콘텐츠를 TypeScript 파일로 관리
  - 분석 결과 페이지 운영
  - AdSense 적용

## 2. 기술 스택

- Next.js 14.2.5
- App Router
- Tailwind CSS
- next-intl
- TypeScript
- face-api.js

## 3. 주요 경로 구조

### 공통

- `app/layout.tsx`
- `app/globals.css`
- `app/robots.ts`
- `app/sitemap.ts`
- `app/[locale]/layout.tsx`

### 주요 페이지

- `app/[locale]/page.tsx`
- `app/[locale]/combined/page.tsx`
- `app/[locale]/saju/page.tsx`
- `app/[locale]/name-reading/page.tsx`
- `app/[locale]/face-reading/page.tsx`
- `app/[locale]/mbti/page.tsx`
- `app/[locale]/compatibility/page.tsx`

### 분석 페이지

- `app/[locale]/saju-analysis/page.tsx`
- `app/[locale]/gwansang-analysis/page.tsx`
- `app/[locale]/seongmyeong-analysis/page.tsx`
- `app/[locale]/personality-analysis/page.tsx`

### 결과 페이지

- `app/[locale]/result/[id]/page.tsx`
- `app/[locale]/saju-result/[id]/page.tsx`
- `app/[locale]/gwansang-result/[id]/page.tsx`
- `app/[locale]/seongmyeong-result/[id]/page.tsx`
- `app/[locale]/personality-result/[id]/page.tsx`

## 4. 블로그 데이터 구조

블로그는 DB가 아니라 TypeScript 파일로 관리한다.

- `lib/blog/saju-posts.ts`
- `lib/blog/seongmyeong-posts.ts`
- `lib/blog/gwansang-posts.ts`
- `lib/blog/mbti-posts.ts`
- `lib/blog/bokhap-posts.ts`
- `lib/blog/index.ts`
- `lib/blog/types.ts`

### BlogPost 핵심 필드

- `slug`
- `title`
- `seoTitle`
- `seoTitleEn`
- `description`
- `descriptionEn`
- `keywords`
- `keywordsEn`
- `publishedAt`
- `category`
- `contentKo`
- `contentEn`
- `toc`
- `tocEn`
- `faq`
- `faqEn`
- `relatedPosts`

### URL 규칙

```text
/{locale}/{category}/{slug}
```

예:

- `/ko/saju/intro`
- `/en/saju/intro`
- `/ko/face-reading/wealth-face`

## 5. 다국어 운영

- 주요 locale:
  - `ko`
  - `en`
- 메시지 파일:
  - `messages/ko.json`
  - `messages/en.json`

참고:

- UI 문구 변경은 메시지 파일 먼저 확인
- 페이지 메타는 각 page 파일의 `generateMetadata` 먼저 확인

## 6. SEO 운영 메모

- 사이트맵:
  - `app/sitemap.ts`
- robots:
  - `app/robots.ts`
- 블로그 메타:
  - 각 카테고리/상세 page의 `generateMetadata`

중요 원칙:

- slug와 본문 주제가 일치해야 함
- 한글/영문 메타 정합성을 유지해야 함
- 내부 링크 문구와 목적지 주제가 일치해야 함
- 날짜만 바꾸는 업데이트는 지양

## 7. AdSense 운영 메모

- 헤드 스크립트:
  - `app/[locale]/layout.tsx`
- 광고 컴포넌트:
  - `components/AdSense.tsx`
- `ads.txt`:
  - `public/ads.txt`

현재 운영 원칙:

- 자동광고 스크립트는 유지
- 수동 광고는 환경변수로 제어
- 빈 광고 wrapper가 남지 않도록 페이지 구조 확인

## 8. 계산/결과 로직 위치

- `lib/calculator/saju-calculator.ts`
- `lib/calculator/name-calculator.ts`
- `lib/calculator/result-generator.ts`

결과 페이지 수정 시 같이 확인할 것:

- 계산 로직
- 결과 문구
- UI 페이지

## 9. 수정 시 자주 보는 파일

- 홈/메타: `app/[locale]/page.tsx`
- 사주 카테고리: `app/[locale]/saju/page.tsx`
- 블로그 상세 렌더링: `components/BlogPostPage.tsx`
- 네비게이션: `components/Navigation.tsx`
- 전역 스타일: `app/globals.css`
- 블로그 데이터: `lib/blog/*-posts.ts`

## 10. 현재 운영상 중요 메모

- `lunar-solar-calendar`, `lucky-element`, `career-star`는 2026-03-09에 매핑 정리 완료
- 이후 우선 점검 대상은 위 3개 글로 연결되는 내부 링크와 `relatedPosts`
- 홈과 `/saju` 메타는 `2026 무료 사주` 방향으로 조정됨
- `/en/combined`는 색인 친화 보강 작업 반영됨

## 11. 문서 역할 구분

- `MEMORY.md`
  - 프로젝트 구조/운영 메모
- `md-docs/haha_flow.md`
  - 포스팅 작성 규칙
- `md-docs/now-posting.md`
  - 현재 게시 글 목록과 운영 메모
- `md-docs/posting-category.md`
  - 카테고리 구조와 키워드 정리
