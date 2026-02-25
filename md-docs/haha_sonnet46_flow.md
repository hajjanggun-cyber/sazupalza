# � [최우선] 사이트 구조 개편 계획
> 작성: 2026-02-25 | 상태: **기획 완료, 개발 대기 중**

---

## 개편 배경

현재는 사주·관상·성명학·MBTI를 **무조건 통합 분석**으로만 결과를 줌.
→ 사용자가 "사주만" 또는 "관상만" 원할 경우 불필요한 입력을 강요함.
→ 블로그 30개 글이 메인 페이지에서 전혀 노출되지 않음.

---

## 목표: 신규 메인 페이지 구조

```
┌─────────────────────────────────────────┐
│  [HERO] 짧고 강렬한 타이틀 + 뱃지       │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  🔶 분석 유형 선택                       │
│                                         │
│  ┌──────┐  ┌──────┐  ┌──────┐          │
│  │ 🌟   │  │ 👁️  │  │ ✍️  │           │
│  │ 사주 │  │ 관상 │  │성명학│           │
│  └──────┘  └──────┘  └──────┘          │
│                                         │
│  ┌──────┐  ┌──────────────────────┐    │
│  │ 🧠   │  │ ⭐ 통합 분석 (추천)  │    │
│  │ 성격 │  │   4가지 한 번에!     │    │
│  └──────┘  └──────────────────────┘    │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  📚 카테고리별 블로그 대표글             │
│  사주(9) 관상(7) 성명학(6) 성격(5) 복합(3) │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  후기 / 광고 / FAQ (현재 유지)          │
└─────────────────────────────────────────┘
```

---

## 분석 유형별 필요 입력값 (최소화 원칙)

| 분석 유형 | 필요 입력 | 현재 대비 |
|-----------|-----------|-----------|
| 🌟 **사주** | 이름 + 생년월일 + 생시 | 사진/MBTI 제거 |
| 👁️ **관상** | 사진 1장 | 나머지 전부 제거 |
| ✍️ **성명학** | 이름 + 생년월일 | 사진/MBTI/생시 제거 |
| 🧠 **성격 분석** | 20문항 자체 테스트 | MBTI 저작권 회피 ✅ |
| ⭐ **통합 분석** | 현재와 동일 (5단계) | 유지 |

---

## MBTI 저작권 해결 방법

```
"MBTI" 명칭 대신 → "16가지 성격 유형 분석"
Myers-Briggs 문항 대신 → 자체 20문항 테스트

결과는 기존 4가지 축(E/I, N/S, T/F, J/P)으로 동일하게 매핑
→ 법적으로 안전, 사용자에게는 동일한 결과
```

---

## 변경될 URL 구조

```
현재:
  /{locale}/           → 통합 분석 폼 (하나뿐)
  /{locale}/result/{id}→ 통합 결과

변경 후:
  /{locale}/                → 새 메인 (서비스 선택 허브)
  /{locale}/combined        → 통합 분석 폼 (현재 기능 그대로)
  /{locale}/saju-analysis   → 사주 단독 분석 폼
  /{locale}/gwansang-analysis → 관상 단독 분석 폼
  /{locale}/seongmyeong-analysis → 성명학 단독 분석 폼
  /{locale}/personality     → 성격 유형 자체 테스트

블로그 (현재 경로 유지):
  /{locale}/saju/{slug}
  /{locale}/gwansang/{slug}  등
```

> ⚠️ **주의**: 현재 `/saju`, `/face-reading` 등이 이미 블로그 경로로 사용 중  
> → 분석 폼 경로는 `-analysis` 접미사 붙여서 충돌 방지

---

## 작업 난이도 및 순서

| 순서 | 작업 | 난이도 | 예상 시간 |
|------|------|--------|-----------|
| 1 | 메인 페이지 UI 개편 (카드 선택 + 블로그 대표글) | ⭐⭐⭐ | 1~2시간 |
| 2 | 사주 단독 분석 페이지 | ⭐⭐ | 30분 |
| 3 | 관상 단독 분석 페이지 | ⭐⭐ | 30분 |
| 4 | 성명학 단독 분석 페이지 | ⭐⭐ | 30분 |
| 5 | 성격 자체 테스트 20문항 | ⭐⭐⭐⭐ | 3~4시간 |

**추천 작업 순서**: 1 → 2 → 3 → 4 → (나중에) 5

---

## AI에게 작업 시킬 때 명령어

```
haha_sonnet46_flow.md 파일 최상단의 [사이트 구조 개편 계획]을 읽고,
아래 순서로 개발을 진행해줘:

1단계: app/[locale]/page.tsx를 개편해서
  - 서비스 선택 카드 5개 (사주/관상/성명학/성격/통합) 섹션 추가
  - 카테고리별 블로그 대표글 섹션 추가 (lib/blog/index.ts 데이터 활용)
  - 기존 AnalysisForm은 통합 분석 경로(/combined)로 이동

작업 완료 후 git push까지 진행해줘.
```

---
---

# �🗺️ Sajupalza 프로젝트 완전 플로우 가이드
> 작성: Antigravity (Claude Sonnet 4.6) | 날짜: 2026-02-25  
> **직접 코드를 읽고 검증한 내용입니다. 추측 없음.**

---

## 목차
1. [프로젝트 한 줄 요약](#1-프로젝트-한-줄-요약)
2. [전체 폴더 구조](#2-전체-폴더-구조)
3. [사이트 대문: 어떻게 시작되나?](#3-사이트-대문-어떻게-시작되나)
4. [다국어 처리: 언어는 어떻게 바뀌나?](#4-다국어-처리-언어는-어떻게-바뀌나)
5. [핵심 플로우: 사용자가 분석하기를 누르면?](#5-핵심-플로우-사용자가-분석하기를-누르면)
6. [계산 엔진: 사주·성명학 어떻게 계산하나?](#6-계산-엔진-사주성명학-어떻게-계산하나)
7. [블로그 시스템: 글은 어떻게 관리되나?](#7-블로그-시스템-글은-어떻게-관리되나)
8. [광고(AdSense) 위치](#8-광고adsense-위치)
9. [파일 수정 시 무엇을 건드려야 하나?](#9-파일-수정-시-무엇을-건드려야-하나)

---

## 1. 프로젝트 한 줄 요약

> **사주팔자·관상·성명학·MBTI를 종합 분석해 주는 무료 운세 서비스.**  
> Next.js(웹 프레임워크) + Tailwind CSS + next-intl(다국어) 조합.  
> 회원가입 없음. 서버에 개인정보 저장 없음. 모든 계산은 브라우저에서 처리.

---

## 2. 전체 폴더 구조

```
sajupalza/
│
├── app/                        ← 📄 화면(페이지) 담당
│   ├── layout.tsx                 ← 전체 사이트 공통 레이아웃 (폰트, 메타 등)
│   ├── globals.css                ← 전체 사이트 공통 CSS 스타일
│   ├── robots.ts                  ← 검색엔진 크롤링 규칙
│   ├── sitemap.ts                 ← 검색엔진 사이트맵 자동 생성
│   │
│   └── [locale]/                  ← 언어별 폴더 (ko/en/ja/zh 자동 분기)
│       ├── layout.tsx                ← 언어별 레이아웃
│       ├── page.tsx                  ← 🏠 메인 홈페이지 (대문)
│       ├── result/
│       │   ├── page.tsx              ← 구형 URL → 신형 URL 리다이렉트
│       │   └── [id]/page.tsx         ← 🎯 분석 결과 페이지
│       ├── saju/
│       │   ├── page.tsx              ← 사주 카테고리 블로그 목록
│       │   └── [slug]/page.tsx       ← 사주 개별 블로그 글
│       ├── face/                     ← 관상 관련 페이지
│       ├── face-reading/             ← 관상 블로그 카테고리
│       ├── name/                     ← 성명학 관련 페이지
│       ├── name-reading/             ← 성명학 블로그 카테고리
│       ├── mbti/                     ← MBTI 관련 페이지
│       ├── compatibility/            ← 궁합 페이지
│       ├── contact/                  ← 문의 페이지
│       ├── privacy/                  ← 개인정보처리방침
│       └── terms/                    ← 이용약관
│
├── components/                 ← 🧩 재사용 가능한 UI 부품들
│   ├── AnalysisForm.tsx           ← 5단계 입력 폼 (메인 핵심 컴포넌트)
│   ├── AnalysisLoading.tsx        ← 계산 중 로딩 화면
│   ├── BlogPostPage.tsx           ← 블로그 글 상세 페이지 렌더러
│   ├── Navigation.tsx             ← 상단 네비게이션 바
│   ├── Footer.tsx                 ← 하단 푸터
│   ├── AdSense.tsx                ← 구글 애드센스 광고 컴포넌트
│   ├── ScrollToTop.tsx            ← 맨 위로 스크롤 버튼
│   └── steps/                     ← 입력 5단계 각각의 컴포넌트
│       ├── Step1Name.tsx              ← 1단계: 이름 입력
│       ├── Step2Birth.tsx             ← 2단계: 생년월일 + 음력/양력 선택
│       ├── Step3MBTI.tsx              ← 3단계: MBTI 선택
│       ├── Step4Time.tsx              ← 4단계: 태어난 시간 입력
│       └── Step5Photo.tsx             ← 5단계: 사진 업로드 (관상 분석용)
│
├── lib/                        ← 🧠 데이터와 계산 로직
│   ├── blog/                      ← 블로그 콘텐츠 데이터
│   │   ├── types.ts                   ← BlogPost 타입 정의
│   │   ├── index.ts                   ← 모든 posts 파일 통합 export
│   │   ├── saju-posts.ts              ← 사주 블로그 글 (1~9번)
│   │   ├── seongmyeong-posts.ts       ← 성명학 블로그 글 (10~15번)
│   │   ├── gwansang-posts.ts          ← 관상 블로그 글 (16~22번)
│   │   ├── mbti-posts.ts              ← MBTI 블로그 글 (23~27번)
│   │   └── bokhap-posts.ts            ← 복합 블로그 글 (28~30번)
│   ├── calculator/                ← 계산 엔진
│   │   ├── saju-calculator.ts         ← 생년월일시 → 사주팔자 계산
│   │   ├── name-calculator.ts         ← 이름 획수 → 성명학 점수 계산
│   │   └── result-generator.ts        ← 全데이터 → 최종 결과 문장 생성 (가장 큰 파일 73KB)
│   └── data/                      ← 사주 계산에 필요한 기초 데이터 (15개 파일)
│
├── messages/                   ← 🌍 다국어 번역 파일
│   ├── ko.json                    ← 한국어 텍스트
│   ├── en.json                    ← 영어 텍스트
│   ├── ja.json                    ← 일본어 텍스트
│   └── zh.json                    ← 중국어 텍스트
│
├── middleware.ts               ← 🚦 URL 언어 감지 및 분기 (next-intl)
├── i18n.ts                     ← 다국어 설정
├── next.config.js              ← Next.js 환경 설정
└── tailwind.config.ts          ← CSS 디자인 시스템 설정
```

---

## 3. 사이트 대문: 어떻게 시작되나?

사용자가 `sajupalza.com` 에 접속하면 아래 순서로 진행됩니다.

```
1. middleware.ts 실행
   → 사용자 브라우저 언어 감지 (기본값: 한국어 'ko')
   → URL을 /ko/ 형태로 분기

2. app/[locale]/page.tsx 실행
   → 메인 홈 화면 렌더링
   → 포함된 섹션들:
      ① 상단 광고 (AdSense)
      ② HERO 섹션 (제목 + 이미지)
      ③ AnalysisForm (5단계 입력 폼) ← 핵심
      ④ 중간 광고 (AdSense)
      ⑤ 서비스 소개 카드 4개 (사주/성명학/관상/MBTI)
      ⑥ 샘플 결과 미리보기
      ⑦ 사용자 후기
      ⑧ 하단 광고 (AdSense)
      ⑨ FAQ 섹션
```

**실제 지원 언어 (middleware.ts 확인):**
```
ko (한국어) - 기본값
en (영어)
ja (일본어)
zh (중국어)
```

---

## 4. 다국어 처리: 언어는 어떻게 바뀌나?

### URL 구조
```
sajupalza.com/ko/...   → 한국어
sajupalza.com/en/...   → 영어
sajupalza.com/ja/...   → 일본어
sajupalza.com/zh/...   → 중국어
```

### 텍스트 번역 흐름
```
messages/ko.json  ←→  코드에서 t('키이름') 함수로 호출
                        예: t('home.heroTitle') → "사주팔자로 보는 내 운명"
                            t('home.heroTitle') → "My Destiny via Saju" (영어일 때)
```

### 번역 관련 파일을 수정할 때
- UI 텍스트 변경 → `messages/ko.json` (또는 en/ja/zh.json) 수정
- 새 텍스트 키 추가 → 4개 언어 json 파일 모두에 동일한 키 추가 필요

---

## 5. 핵심 플로우: 사용자가 분석하기를 누르면?

이것이 이 프로젝트의 가장 중요한 흐름입니다.

```
[Step 1] 이름 입력          → Step1Name.tsx
[Step 2] 생년월일 입력       → Step2Birth.tsx (음력/양력 선택 포함)
[Step 3] MBTI 선택          → Step3MBTI.tsx
[Step 4] 태어난 시간 입력    → Step4Time.tsx
[Step 5] 사진 업로드         → Step5Photo.tsx (관상 분석용 AI 처리)
         ↓
[분석하기 버튼 클릭]
         ↓
[데이터 → Base64 인코딩]
  입력값을 JSON으로 모은 뒤 → btoa() 함수로 암호화
  예: {name:"홍길동", year:1990, month:3, day:15, mbti:"ENFP", ...}
      → "eyJuYW1lIjoi7ZmN6ri464Ko..." (Base64 문자열)
         ↓
[URL 이동]
  → /{locale}/result/{Base64문자열}
  예: /ko/result/eyJuYW1lIjoi7ZmN6ri464Ko...
         ↓
[app/[locale]/result/[id]/page.tsx 실행]
  → URL에서 [id] 추출 → atob()로 디코딩 → 원래 데이터 복원
  → lib/calculator/ 의 계산 함수들 호출
         ↓
[계산 결과 화면 출력]
  → 사주점수, 성명학점수, 관상점수, MBTI 분석 결과 카드로 표시
```

> 💡 **왜 URL에 데이터를 담나?**  
> 서버에 개인정보를 저장하지 않기 위해서입니다.  
> URL을 공유하면 누구나 같은 결과를 볼 수 있고, 새로고침해도 결과가 유지됩니다.

> 💡 **`app/[locale]/result/page.tsx`는 뭐하는 파일?**  
> 구형 URL 형식(`?name=홍길동&year=1990...`) 으로 접속한 사람을  
> 신형 URL로 리다이렉트만 해주는 중간 다리 역할입니다. 실제 결과는 `[id]/page.tsx`에서 처리.

---

## 6. 계산 엔진: 사주·성명학 어떻게 계산하나?

```
lib/calculator/
├── saju-calculator.ts    (6KB)
│   역할: 생년월일시 → 천간/지지/오행 계산
│   사용: lib/data/ 폴더의 기초 데이터(천간표, 지지표 등) 활용
│
├── name-calculator.ts    (5KB)
│   역할: 이름 한자 획수 → 원격/형격/이격/정격 점수 계산
│         이름 한글 소리 → 소리오행(목화토금수) 분류
│
└── result-generator.ts   (73KB ← 가장 큰 파일!)
    역할: 위 두 계산기의 결과 + MBTI + 사진분석 결과를
          사람이 읽을 수 있는 한국어/영어 문장으로 변환
          수호신 결정, 종합점수 산출, 조언 문장 생성 등 담당
```

> 💡 **result-generator.ts가 73KB인 이유:**  
> 16가지 사주 케이스, 81수리 해석, MBTI 16유형 매핑,  
> 수호신 4종(청룡/백호/주작/현무) 판정 로직 등  
> 모든 결과 문장 데이터가 이 파일 하나에 담겨 있습니다.

---

## 7. 블로그 시스템: 글은 어떻게 관리되나?

블로그는 데이터베이스가 없습니다. **TypeScript 파일이 곧 블로그 글 저장소**입니다.

### 구조 이해
```
lib/blog/
├── types.ts          ← BlogPost 타입 정의 (아래 참조)
├── index.ts          ← 모든 posts 파일을 하나로 합쳐서 export
├── saju-posts.ts     ← 글 데이터 배열
├── seongmyeong-posts.ts
├── gwansang-posts.ts
├── mbti-posts.ts
└── bokhap-posts.ts
```

### 글 하나의 데이터 구조 (BlogPost 타입)
```typescript
{
  slug: 'intro',              // URL 주소 이름 → /ko/saju/intro
  title: '사주란 무엇인가?',   // SEO 제목
  seoTitle: '...',            // 한국어 검색 최적화 제목
  seoTitleEn: '...',          // 영어 검색 최적화 제목
  description: '...',         // 한국어 메타 설명 (검색 결과 미리보기)
  descriptionEn: '...',       // 영어 메타 설명
  keywords: ['...'],          // 한국어 SEO 키워드
  keywordsEn: ['...'],        // 영어 SEO 키워드
  publishedAt: '2026-02-22',  // 게시일
  category: 'saju',          // 카테고리 (URL의 두 번째 경로)
  contentKo: `<section>...`, // 한국어 HTML 본문 (2,500자 이상 목표)
  contentEn: `<section>...`, // 영어 HTML 본문 (독립 SEO 아티클)
  toc: [{ id, title }],      // 한국어 목차 (id = contentKo의 h2 id와 일치해야 함!)
  tocEn: [{ id, title }],    // 영어 목차 (id = contentEn의 h2 id와 일치해야 함!)
  faq: [{ q, a }],           // 한국어 FAQ
  faqEn: [{ q, a }],         // 영어 FAQ
  relatedPosts: [{ slug, title, category }],  // 관련 글 링크
}
```

### 블로그 글의 URL 생성 규칙
```
/{locale}/{category}/{slug}

예시:
sajupalza.com/ko/saju/intro          ← 한국어 사주 입문글
sajupalza.com/en/saju/intro          ← 영어 사주 입문글
sajupalza.com/ko/gwansang/wealth-face ← 한국어 관상 재물운글
sajupalza.com/ja/mbti/intro          ← 일본어 MBTI 글
```

### 글이 화면에 나타나는 흐름
```
사용자 → /ko/saju/intro 접속
         ↓
app/[locale]/saju/[slug]/page.tsx 실행
         ↓
getPostBySlug('saju', 'intro') 함수 호출 (lib/blog/index.ts)
         ↓
saju-posts.ts 배열에서 slug === 'intro' 찾기
         ↓
찾은 데이터를 BlogPostPage.tsx 컴포넌트에 전달
         ↓
화면에 블로그 글 렌더링
```

### ⚠️ 새 카테고리 파일 추가 시 반드시 해야 할 것
```
1. lib/blog/jeom-posts.ts 생성   ← 글 데이터 파일
2. lib/blog/index.ts 수정        ← import + allPosts 배열에 추가
3. app/[locale]/jeom/ 폴더 확인  ← 라우팅 페이지 파일 있는지 확인
```

---

## 8. 광고(AdSense) 위치

메인 페이지(`app/[locale]/page.tsx`)에 AdSense 광고가 3곳 배치됩니다:

```
[상단 헤더 아래]  → AdSense slot="1234567890"  (가로형 배너)
[입력폼과 서비스소개 사이] → slot="0987654321" (직사각형)
[후기와 FAQ 사이] → slot="1122334455"         (직사각형)
```

> AdSense 광고 ID/슬롯은 `components/AdSense.tsx`에서 관리합니다.

---

## 9. 파일 수정 시 무엇을 건드려야 하나?

| 하고 싶은 것 | 수정할 파일 |
|---|---|
| 홈 화면 UI 텍스트 변경 | `messages/ko.json` (+ en/ja/zh) |
| 홈 화면 레이아웃 변경 | `app/[locale]/page.tsx` |
| 입력 폼(5단계) 수정 | `components/steps/Step?.tsx` |
| 결과 화면 디자인 수정 | `app/[locale]/result/[id]/page.tsx` |
| 사주 계산 로직 변경 | `lib/calculator/saju-calculator.ts` |
| 결과 문장/점수 변경 | `lib/calculator/result-generator.ts` |
| 블로그 글 추가/수정 | `lib/blog/[카테고리]-posts.ts` |
| 블로그 카테고리 추가 | `lib/blog/index.ts` + 새 파일 |
| 전체 색상 테마 변경 | `tailwind.config.ts` + `globals.css` |
| 상단 메뉴 변경 | `components/Navigation.tsx` |
| 검색엔진 크롤링 설정 | `app/robots.ts` |
| 사이트맵 주소 추가 | `app/sitemap.ts` |

---

## 💡 이 프로젝트의 핵심 특징 요약

```
✅ 서버에 아무것도 저장 안 함  → URL Base64 인코딩으로 데이터 전달
✅ 4개 언어 지원               → [locale] 폴더 + messages/*.json
✅ 블로그는 DB 없음             → lib/blog/*.ts 파일이 곧 DB
✅ 계산은 모두 프론트엔드에서   → lib/calculator/ 순수 함수들
✅ SEO 최적화                   → 각 페이지 메타데이터, sitemap.ts, robots.ts
✅ 구글 애드센스                → AdSense.tsx 컴포넌트로 중앙 관리
```

---

*작성: Antigravity (Claude Sonnet 4.6) | 2026-02-25*  
*코드 직접 열람 확인 파일: middleware.ts, app/[locale]/page.tsx, app/[locale]/result/page.tsx, lib/blog/index.ts, lib/calculator/ 3개 파일, components/ 전체 목록, messages/ 폴더*
