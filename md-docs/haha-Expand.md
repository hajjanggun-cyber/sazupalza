# 📘 Sajupalza 블로그 콘텐츠 확장 완전 가이드
> 작성일: 2026-02-25 | 최종 업데이트: 1~30번 완료 기준

---

## 📌 목차
1. [현재 완료 현황 (1~30번)](#1-현재-완료-현황-1~30번)
2. [파일 구조 및 카테고리 맵](#2-파일-구조-및-카테고리-맵)
3. [각 포스트 상세 목록](#3-각-포스트-상세-목록)
4. [새 카테고리 추가 작업 단계](#4-새-카테고리-추가-작업-단계)
5. [AI 명령어 템플릿](#5-ai-명령어-템플릿)
6. [품질 검수 체크리스트](#6-품질-검수-체크리스트)
7. [커밋 메시지 네이밍 규칙](#7-커밋-메시지-네이밍-규칙)
8. [효율적인 작업 순서](#8-효율적인-작업-순서)

---

## 1. 현재 완료 현황 (1~30번)

| 번호 | 파일 | 카테고리 | 주제 | 슬러그 | 한국어 2500자+ | 영어 SEO 아티클 |
|------|------|----------|------|--------|:--------------:|:---------------:|
| 1  | saju-posts.ts        | saju        | 사주팔자란 무엇인가?         | intro                | ✅ | ⚠️ 기본 |
| 2  | saju-posts.ts        | saju        | 음력과 양력, 생시의 중요성   | lunar-solar-calendar | ✅ | ⚠️ 기본 |
| 3  | saju-posts.ts        | saju        | 사주 일주 완전정복           | day-pillar           | ✅ | ⚠️ 기본 |
| 4  | saju-posts.ts        | saju        | 사주 신살 총정리             | saju-spirits         | ✅ | ⚠️ 기본 |
| 5  | saju-posts.ts        | saju        | 사주 용신 찾기               | lucky-element        | ✅ | ⚠️ 기본 |
| 6  | saju-posts.ts        | saju        | 사주 공망의 의미             | void-luck            | ✅ | ⚠️ 기본 |
| 7  | saju-posts.ts        | saju        | 사주 관성으로 보는 직업운    | career-star          | ✅ | ⚠️ 기본 |
| 8  | saju-posts.ts        | saju        | 띠별 2026년 운세             | zodiac-2026          | ✅ | ⚠️ 기본 |
| 9  | saju-posts.ts        | saju        | 운명은 바꿀 수 있는가?       | destiny-change       | ✅ | ⚠️ 기본 |
| 10 | seongmyeong-posts.ts | seongmyeong | 성명학 비기 (한자 획수)      | intro                | ✅ | ⚠️ 기본 |
| 11 | seongmyeong-posts.ts | seongmyeong | 작명의 기술                  | name-creation        | ✅ | ⚠️ 기본 |
| 12 | seongmyeong-posts.ts | seongmyeong | 이름 오행 (소리 오행)        | name-five-elements   | ✅ | ⚠️ 기본 |
| 13 | seongmyeong-posts.ts | seongmyeong | 개명 가이드                  | name-change          | ✅ | ⚠️ 기본 |
| 14 | seongmyeong-posts.ts | seongmyeong | 자녀 작명 완벽 가이드        | baby-naming          | ✅ | ⚠️ 기본 |
| 15 | seongmyeong-posts.ts | seongmyeong | 성명학 수리 81수 정리        | numerology-81        | ✅ | ⚠️ 기본 |
| 16 | gwansang-posts.ts    | gwansang    | 관상학 입문                  | intro                | ✅ | ✅ SEO 독립 완료 |
| 17 | gwansang-posts.ts    | gwansang    | 재물 관상 (코, 입, 귀)       | wealth-face          | ✅ | ✅ SEO 독립 완료 |
| 18 | gwansang-posts.ts    | gwansang    | 눈썹 관상                    | eyebrow-reading      | ✅ | ✅ SEO 독립 완료 |
| 19 | gwansang-posts.ts    | gwansang    | 관상과 건강                  | health-face          | ✅ | ✅ SEO 독립 완료 |
| 20 | gwansang-posts.ts    | gwansang    | 얼굴의 점 관상학             | mole-reading         | ✅ | ✅ SEO 독립 완료 |
| 21 | gwansang-posts.ts    | gwansang    | 관상 이마 완전정복           | forehead-reading     | ✅ | ✅ SEO 독립 완료 |
| 22 | gwansang-posts.ts    | gwansang    | 관상 자가진단                | self-diagnosis       | ✅ | ✅ SEO 독립 완료 |
| 23 | mbti-posts.ts        | mbti        | MBTI 유래와 동양 철학        | intro                | ✅ | ✅ SEO 독립 완료 |
| 24 | mbti-posts.ts        | mbti        | MBTI와 사주 오행 상관관계    | saju-five-elements   | ✅ | ✅ SEO 독립 완료 |
| 25 | mbti-posts.ts        | mbti        | MBTI 궁합 (오행 극복법)      | mbti-compatibility   | ✅ | ✅ SEO 독립 완료 |
| 26 | mbti-posts.ts        | mbti        | MBTI E·I 유형별 개운법       | fortune-improvement  | ✅ | ✅ SEO 독립 완료 |
| 27 | mbti-posts.ts        | mbti        | MBTI별 사주 궁합표           | compatibility-table  | ✅ | ✅ SEO 독립 완료 |
| 28 | bokhap-posts.ts      | bokhap      | 손금 기초 (관상과 함께 보기) | palmistry            | ✅ | ✅ SEO 독립 완료 |
| 29 | bokhap-posts.ts      | bokhap      | 사주·관상·성명학·MBTI 비교   | eastern-western      | ✅ | ✅ SEO 독립 완료 |
| 30 | bokhap-posts.ts      | bokhap      | 사랑의 운명 (일주와 MBTI)    | love-destiny         | ✅ | ✅ SEO 독립 완료 |

> **⚠️ 기본**: contentEn이 요약본 수준. 향후 SEO 확장 대상  
> **✅ SEO 독립 완료**: 미국 독자 타겟 독립 아티클 + CTA + 내부링크 모두 완비

---

## 2. 파일 구조 및 카테고리 맵

```
lib/blog/
├── types.ts               ← BlogPost 타입 정의
├── index.ts               ← 모든 posts 파일 import/export 통합
├── saju-posts.ts          ← 카테고리: 'saju'        (1~9번,   9개)
├── seongmyeong-posts.ts   ← 카테고리: 'seongmyeong' (10~15번, 6개)
├── gwansang-posts.ts      ← 카테고리: 'gwansang'    (16~22번, 7개)
├── mbti-posts.ts          ← 카테고리: 'mbti'        (23~27번, 5개)
└── bokhap-posts.ts        ← 카테고리: 'bokhap'      (28~30번, 3개)
```

### BlogPost 타입 구조 (types.ts 기준)
```typescript
{
  slug: string;
  title: string;
  seoTitle: string;         // 한국어 SEO 제목
  seoTitleEn: string;       // 영어 SEO 제목
  description: string;      // 한국어 메타 설명
  descriptionEn: string;    // 영어 메타 설명
  keywords: string[];       // 한국어 키워드
  keywordsEn: string[];     // 영어 키워드
  publishedAt: string;      // 'YYYY-MM-DD'
  category: string;         // 파일별 카테고리 값
  contentKo: string;        // 한국어 HTML 본문
  contentEn: string;        // 영어 HTML 본문
  toc: { id: string; title: string }[];     // 한국어 목차
  tocEn: { id: string; title: string }[];   // 영어 목차
  faq: { q: string; a: string }[];         // 한국어 FAQ
  faqEn: { q: string; a: string }[];       // 영어 FAQ
  relatedPosts: { slug: string; title: string; category: string }[];
}
```

---

## 3. 각 포스트 상세 목록

### 📂 saju-posts.ts (category: 'saju')
| # | slug | 제목 | 영어 확장 필요 |
|---|------|------|:-:|
| 1 | intro | 사주팔자란 무엇인가? 음양오행 원리 가이드 | ⚠️ |
| 2 | lunar-solar-calendar | 음력·양력·생시: 사주의 정확도를 결정하는 3요소 | ⚠️ |
| 3 | day-pillar | 사주 일주 완전정복: 나의 운명의 주인공 | ⚠️ |
| 4 | saju-spirits | 사주 신살 총정리: 도화살·역마살·천을귀인 | ⚠️ |
| 5 | lucky-element | 사주 용신 찾기: 내 인생을 바꾸는 오행 | ⚠️ |
| 6 | void-luck | 사주 공망의 의미: 비어있는 운의 비밀 | ⚠️ |
| 7 | career-star | 사주 관성으로 보는 직업운과 승진 타이밍 | ⚠️ |
| 8 | zodiac-2026 | 2026년 병오년 띠별 운세 완전분석 | ⚠️ |
| 9 | destiny-change | 운명은 바꿀 수 있는가? 개운의 철학 | ⚠️ |

### 📂 seongmyeong-posts.ts (category: 'seongmyeong')
| # | slug | 제목 | 영어 확장 필요 |
|---|------|------|:-:|
| 10 | intro | 성명학 비기: 한자 획수로 보는 이름의 운명 | ⚠️ |
| 11 | name-creation | 작명의 기술: 태어난 계절에 맞는 이름 짓기 | ⚠️ |
| 12 | name-five-elements | 소리 오행: 한글 발음으로 보는 이름의 기운 | ⚠️ |
| 13 | name-change | 개명 가이드: 이름을 바꾸면 운명도 바뀐다 | ⚠️ |
| 14 | baby-naming | 자녀 작명 완벽 가이드: 사주와 성명학 통합 | ⚠️ |
| 15 | numerology-81 | 성명학 수리 81수 완전정복 | ⚠️ |

### 📂 gwansang-posts.ts (category: 'gwansang') ✅ 완료
| # | slug | 제목 |
|---|------|------|
| 16 | intro | 관상학 입문: 얼굴로 보는 운명 완전 가이드 |
| 17 | wealth-face | 재물 관상: 코·입·귀로 보는 돈복 |
| 18 | eyebrow-reading | 눈썹 관상: 눈썹으로 보는 직업운과 인간관계 |
| 19 | health-face | 얼굴색과 기색으로 보는 건강운 |
| 20 | mole-reading | 점 관상: 길한 점과 흉한 점의 비밀 |
| 21 | forehead-reading | 이마 관상 완전정복 |
| 22 | self-diagnosis | 거울로 보는 성공 관상 자가진단 |

### 📂 mbti-posts.ts (category: 'mbti') ✅ 완료
| # | slug | 제목 |
|---|------|------|
| 23 | intro | MBTI 유래와 동양 철학: 융의 심리학과 동양 철학 |
| 24 | saju-five-elements | MBTI 16유형과 사주 오행 상관관계 |
| 25 | mbti-compatibility | MBTI 궁합 완전정복: 오행으로 극복하는 법 |
| 26 | fortune-improvement | MBTI E·I 유형별 개운법: 맞춤형 행운 루틴 |
| 27 | compatibility-table | MBTI별 사주 일주 궁합표 완전분석 |

### 📂 bokhap-posts.ts (category: 'bokhap') ✅ 완료
| # | slug | 제목 |
|---|------|------|
| 28 | palmistry | 손금 기초: 관상과 함께 보는 생명선·두뇌선·감정선 |
| 29 | eastern-western | 사주·관상·성명학·MBTI 완벽 통합 비교 가이드 |
| 30 | love-destiny | 사랑의 운명: 일주와 MBTI로 찾는 천생연분 |

---

## 4. 새 카테고리 추가 작업 단계

새 카테고리 파일을 생성하기 전 아래 기획표를 먼저 완성하세요:

```
카테고리명(한국어): 점
카테고리명(영문코드): jeom
파일명: jeom-posts.ts
포스트 목록:
  31 | jeom-posts.ts | 타로카드 입문           | tarot-intro
  32 | jeom-posts.ts | 타로 메이저 아르카나    | tarot-major
  33 | jeom-posts.ts | 주역 64괘 입문          | iching-intro
  34 | jeom-posts.ts | 토정비결 완전정복       | tojeong
  35 | jeom-posts.ts | 꿈해몽 완전정복         | dream-reading
```

> 슬러그 기획이 끝난 후 아래 AI 명령어를 사용하세요.

---

## 5. AI 명령어 템플릿

---

### 🔵 [명령어 A] 새 카테고리 파일 처음 생성할 때

```
sajupalza 프로젝트의 lib/blog/ 폴더에 새 카테고리 파일을 생성해줘.

📁 파일명: jeom-posts.ts
📋 기존 파일(bokhap-posts.ts)의 BlogPost 타입 구조를 그대로 따를 것.
    lib/blog/types.ts의 BlogPost 인터페이스 참조.

추가할 포스트:
- 31번: slug='tarot-intro',    제목='타로카드 입문 가이드'
- 32번: slug='tarot-major',    제목='메이저 아르카나 22장 완전정복'
- 33번: slug='zodiac-divination', 제목='십이지신점 보는 법'
(추가 목록 계속...)

각 포스트 작성 규칙:
1. contentKo: 한국어 2,500자 이상, 전문 명리학 칼럼 수준, <section>/<h2>/<h3> 구조
2. contentEn: 영어 독립 SEO 아티클 (단순 번역 금지, 미국 독자 타겟, 700단어 이상)
3. CTA 버튼: 한국어는 href="/ko", 영어는 href="/en"
4. 내부링크: 관련 슬러그로 실제 경로 연결 (div 블록 또는 본문 내)
5. toc id === contentKo h2 id 완전 일치 필수
6. tocEn id === contentEn h2 id 완전 일치 필수
7. faq 3개 이상 / faqEn 3개 이상
8. publishedAt: '2026-03-01'
9. category: 'jeom'

작성 후 lib/blog/index.ts에 import 및 export 배열에도 추가해줘.
마지막에 git add → commit → push 진행해줘.
커밋 메시지: "feat: jeom 카테고리 신규 생성 - 슬러그 5개"
```

---

### 🔵 [명령어 B] 기존 카테고리에 슬러그 추가할 때

```
sajupalza 프로젝트의 lib/blog/gwansang-posts.ts 파일에
아래 포스트들을 배열 끝에 추가해줘.

추가할 포스트:
- 슬러그: 'eye-reading',       제목: '눈 관상 완전정복: 눈으로 보는 성격과 재물운'
- 슬러그: 'cheek-reading',     제목: '볼(뺨) 관상과 재물운: 광대뼈의 비밀'
- 슬러그: 'jawline-reading',   제목: '턱선으로 보는 말년운과 주거 이동수'

각 포스트 작성 규칙:
1. contentKo: 한국어 2,500자 이상, 전문 관상 칼럼 수준
2. contentEn: 영어 독립 SEO 아티클 (단순 번역 금지, 미국 독자용, 700단어 이상)
3. 내부링크: gwansang 카테고리 기존 슬러그 중 연관된 것 참조 (intro, wealth-face 등)
4. CTA 버튼, toc/tocEn, faq/faqEn 모두 완비
5. publishedAt: '2026-03-05'
6. category: 'gwansang'

추가 완료 후 git add → commit → push 진행해줘.
커밋 메시지: "feat: gwansang 눈/볼/턱선 관상 슬러그 3개 추가"
```

---

### 🔵 [명령어 C] 기존 포스트 contentEn SEO 확장할 때 (1~15번 영어 확장용)

```
sajupalza 프로젝트의 lib/blog/saju-posts.ts 파일에서,
아래 슬러그들의 contentEn을 SEO 독립 아티클로 완전히 재작성해줘.

대상 슬러그: ['intro', 'day-pillar', 'lucky-element']

각 contentEn 작성 기준:
- 미국 독자를 타겟으로 한 독립 SEO 아티클 (단순 번역 절대 금지)
- 700단어 이상
- h2 섹션 3개 이상, 각 섹션에 h3 소제목 포함
- 본문 중간 CTA 버튼 1개 (href="/en")
- 내부링크 블록: 관련 영어 포스트 2개 이상 (실제 slug 경로로)
- tocEn의 id가 contentEn h2 id와 정확히 일치 확인
- 미국 문화에 맞는 사례와 표현 사용 (한국 고유 용어는 영어로 설명 추가)

작업 후 git add → commit → push까지 진행해줘.
커밋 메시지: "feat: saju intro/day-pillar/lucky-element 영어 SEO 독립 아티클 확장"
```

---

### 🔵 [명령어 D] 구조 검수 요청할 때

```
sajupalza 프로젝트의 lib/blog/[파일명].ts 파일에서
아래 항목들을 전체 검수해줘:

검수 항목:
1. 각 포스트의 toc[].id 값이 contentKo 내 <h2 id="..."> 값과 완전 일치하는지
2. 각 포스트의 tocEn[].id 값이 contentEn 내 <h2 id="..."> 값과 완전 일치하는지
3. relatedPosts의 slug가 실제 존재하는 slug인지
4. faq와 faqEn이 각각 2개 이상 있는지
5. contentKo CTA href="/ko" 인지 / contentEn CTA href="/en" 인지
6. publishedAt 형식이 'YYYY-MM-DD'인지

불일치 항목 발견 시 즉시 수정하고 git push까지 해줘.
```

---

## 6. 품질 검수 체크리스트

AI 작업 완료 후 반드시 아래 항목을 확인하세요:

### 구조 검수
```
□ toc[].id === contentKo 본문 <h2 id="..."> 완전 일치
□ tocEn[].id === contentEn 본문 <h2 id="..."> 완전 일치
□ contentKo CTA: href="/ko"
□ contentEn CTA: href="/en"
□ faq 2개 이상 / faqEn 2개 이상
□ relatedPosts slug → 실제 존재하는 슬러그인지 확인
□ publishedAt 형식: 'YYYY-MM-DD'
□ category 값 오타 없음 (소문자, 영문)
□ 새 파일 생성 시 lib/blog/index.ts에 import + export 추가됐는지 확인
```

### SEO 품질 기준
```
□ contentKo: 공백 제외 2,500자 이상
□ contentEn: 700단어 이상 (독립 아티클, 직역 금지)
□ h2 섹션 최소 3개 이상
□ h3 소제목 각 섹션 최소 1개 이상
□ 내부링크 최소 2개 (div 블록 형태 또는 본문 내)
□ CTA 버튼 본문 중간에 1개 이상
□ 영어 아티클: 미국 독자 대상 사례/표현 사용 여부
□ 영어 아티클: 한국 고유 용어 영어 설명 병기 여부
```

---

## 7. 커밋 메시지 네이밍 규칙

```bash
# 새 카테고리 파일 생성
feat: [카테고리명] 카테고리 신규 생성 - 슬러그 [N]개

예) feat: jeom 카테고리 신규 생성 - 슬러그 5개
예) feat: tarot 카테고리 신규 생성 - 슬러그 7개

# 기존 카테고리에 슬러그 추가
feat: [카테고리명] [주제들] 슬러그 [N]개 추가

예) feat: gwansang 눈/볼/턱선 관상 슬러그 3개 추가
예) feat: saju 2027년 운세/여행운 슬러그 2개 추가

# SEO 콘텐츠 확장 (영어 아티클 업그레이드)
feat: [카테고리명] [번호범위]번 영어 SEO 독립 아티클 확장

예) feat: saju 1~5번 영어 SEO 독립 아티클 확장
예) feat: seongmyeong 10~15번 영어 SEO 독립 아티클 확장

# 버그/구조 수정
fix: [파일명] toc id 불일치 수정
fix: [파일명] relatedPosts 존재하지 않는 slug 제거
```

---

## 8. 효율적인 작업 순서

```
1단계: 기획 (직접 작성)
   ① 새 카테고리명 (한국어 + 영문 코드) 결정
   ② 슬러그 목록 표로 정리 (번호 | 파일명 | 한국어 제목 | slug)
   ③ 각 포스트의 핵심 h2 섹션 제목 3~4개 미리 정하기 (toc 기준)

2단계: AI에 파일 생성 요청 (명령어 A 또는 B 사용)
   ① 한 번에 3~5개 슬러그만 요청 (10개 이상 → 품질 저하 위험)
   ② 요청 후 반드시 구조 검수 (명령어 D) 실행

3단계: SEO 확장 (명령어 C 사용, 필요 시)
   ① contentKo가 2,500자 미만이면 확장 요청
   ② contentEn이 번역 수준이면 독립 아티클로 재작성 요청

4단계: 검수 및 수정
   ① 체크리스트 6개 항목 확인
   ② toc/tocEn id 불일치가 가장 흔한 오류 → 반드시 확인

5단계: Git Push
   ① 카테고리 단위로 커밋 묶기
   ② 커밋 메시지 네이밍 규칙 준수
```

---

## 9. 앞으로 확장 예정 현황 (업데이트용)

| 번호 | 파일 | 카테고리 | 주제 | 슬러그 | 상태 |
|------|------|----------|------|--------|------|
| 31~ | jeom-posts.ts | jeom | (기획 중) | - | 🔲 예정 |
| ~   | 추가 카테고리 | - | - | - | 🔲 예정 |

> 이 표를 작업 완료 시마다 업데이트하세요.

---

## 10. 자주 발생하는 오류 & 해결법

| 오류 | 원인 | 해결 |
|------|------|------|
| toc id가 화면에 안 나타남 | toc[].id ≠ h2 id | 명령어 D로 검수 요청 |
| 영문 목차가 비어 있음 | tocEn 누락 | tocEn 배열 추가 요청 |
| 관련 포스트 링크 404 | relatedPosts slug 오타 | 실제 slug와 대조 확인 |
| 영어 콘텐츠가 너무 짧음 | 번역 수준으로 작성됨 | 명령어 C로 재작성 요청 |
| 새 카테고리 페이지 안 뜸 | index.ts에 export 누락 | index.ts 확인 후 추가 |
| CTA 버튼 언어 반대 | Ko에 /en, En에 /ko | 수동 또는 명령어 D 검수 |

---

*최종 업데이트: 2026-02-25 | 작성자: Antigravity (AI Assistant)*  
*다음 작업 시 이 파일을 AI에게 먼저 보여주고 시작하세요.*
