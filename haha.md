# 🚀 Saju Palza Project Progress Report (haha.md)
1    │ saju-posts.ts        │ 사주팔자란 무엇인가?         │ intro                │
  │ 2    │ saju-posts.ts        │ 음력과 양력, 생시의 중요성   │ lunar-solar-calendar │
  │ 3    │ saju-posts.ts        │ 사주 일주 완전정복           │ day-pillar           │
  │ 4    │ saju-posts.ts        │ 사주 신살 총정리             │ saju-spirits         │
  │ 5    │ saju-posts.ts        │ 사주 용신 찾기               │ lucky-element        │
  │ 6    │ saju-posts.ts        │ 사주 공망의 의미             │ void-luck            │
  │ 7    │ saju-posts.ts        │ 사주 관성으로 보는 직업운    │ career-star          │
  │ 8    │ saju-posts.ts        │ 띠별 2026년 운세             │ zodiac-2026          │
  │ 9    │ saju-posts.ts        │ 운명은 바꿀 수 있는가?       │ destiny-change       │
  │ 10   │ seongmyeong-posts.ts │ 성명학 비기 (한자 획수)      │ intro                │
  │ 11   │ seongmyeong-posts.ts │ 작명의 기술                  │ name-creation        │
  │ 12   │ seongmyeong-posts.ts │ 이름 오행 (소리 오행)        │ name-five-elements   │
  │ 13   │ seongmyeong-posts.ts │ 개명 가이드                  │ name-change          │
  │ 14   │ seongmyeong-posts.ts │ 자녀 작명 완벽 가이드        │ baby-naming          │
  │ 15   │ seongmyeong-posts.ts │ 성명학 수리 81수 정리        │ numerology-81        │
  │ 16   │ gwansang-posts.ts    │ 관상학 입문                  │ intro                │
  │ 17   │ gwansang-posts.ts    │ 재물 관상 (코, 입, 귀)       │ wealth-face          │
  │ 18   │ gwansang-posts.ts    │ 눈썹 관상                    │ eyebrow-reading      │
  │ 19   │ gwansang-posts.ts    │ 관상과 건강                  │ health-face          │
  │ 20   │ gwansang-posts.ts    │ 얼굴의 점 관상학             │ mole-reading         │
  │ 21   │ gwansang-posts.ts    │ 관상 이마 완전정복           │ forehead-reading     │
  │ 22   │ gwansang-posts.ts    │ 관상 자가진단                │ self-diagnosis       │
  │ 23   │ mbti-posts.ts        │ MBTI 유래와 동양 철학        │ intro                │
  │ 24   │ mbti-posts.ts        │ MBTI와 사주 오행 상관관계    │ saju-five-elements   │
  │ 25   │ mbti-posts.ts        │ MBTI 궁합 (오행 극복법)      │ mbti-compatibility   │
  │ 26   │ mbti-posts.ts        │ MBTI E·I 유형별 개운법       │ fortune-improvement  │
  │ 27   │ mbti-posts.ts        │ MBTI별 사주 궁합표           │ compatibility-table  │
  │ 28   │ bokhap-posts.ts      │ 손금 기초 (관상과 함께 보기) │ palmistry            │
  │ 29   │ bokhap-posts.ts      │ 사주·관상·성명학·MBTI 비교   │ eastern-western      │
  │ 30   │ bokhap-posts.ts      │ 사랑의 운명 (일주와 MBTI)    │ love-destiny         




---
## 💡 Claude에게 명령할 때 토큰 아끼는 방법 (항상 이렇게 해줘)

1. **파일 전체 수정 금지** → "이 함수만 수정해줘", "이 블록만 바꿔줘"
2. **Write 금지, Edit만 사용** → 특정 old_string → new_string 교체
3. **Read 최소화** → "grep으로 이 함수 위치 찾아줘" 먼저
4. **큰 작업 전엔 먼저 물어보기** → "어떻게 하면 토큰 적게 쓸 수 있어?" 먼저 확인
5. **파일명·함수명 직접 지정** → "result-generator.ts의 buildCareerSection 함수만 수정해줘"
6. **세션 시작 시 이렇게 말하기**: "메모리 확인해. 오늘 작업: [내용]. Edit만 써, 큰 작업 전 물어봐."

---
## 📝 블로그 글 작성 워크플로우 (claude.ai에서 진행)

### 사용 프롬프트 (번호만 바꿔서 30번 반복)
```
당신은 한국어 SEO 전문 콘텐츠 라이터입니다.

## 주제
[번호]번: [제목 붙여넣기]

## 작성 조건
1. 분량: 최소 2,000자 이상, 전문적이면서도 일반인이 읽기 쉬운 어조
2. 구조: H2 태그 최소 4개, 각 H2 아래 H3 소제목 2~3개씩
3. 도입부: 첫 문단(100자 이내)에 핵심 키워드 자연스럽게 포함
4. 키워드: 핵심 키워드 최소 5회 이상 반복, 밀도 1~2%
5. CTA: 본론 중간에 [CTA 버튼: 무료 통합 컨설팅 받아보기] 표시
6. 내부링크: [내부링크: 관련글 제목] 형태로 2~3곳
7. FAQ: 하단에 Q&A 형식 3개 (schema.org FAQPage용)
8. 메타 정보 (글 맨 아래): [SEO 제목] / [메타 디스크립션] / [핵심 키워드 5개]
9. 금지: 출처 없는 수치, 불확실한 표현, 단조로운 반복 구조
출력: 마크다운, H1 1개, CTA→내부링크→FAQ→메타정보 순서

------------------- 제미나이가 위의거 수정한 버젼  -----------------
당신은 한국어 SEO 전문 콘텐츠 라이터이자 웹 데이터 설계자입니다. 
아래 주제에 대해 블로그 콘텐츠를 작성하되, 반드시 [출력 형식]에 맞춰 데이터를 제공해주세요.

## 주제
[번호]번: [제목] (슬러그: [슬러그이름])

## 작성 조건
1. 분량: 한글 기준 최소 2,000자 이상 (전문적이면서 일반인이 읽기 쉬운 어조)
2. 본문 구조: 
   - H2 태그 최소 4개 이상 사용
   - 각 H2 아래 H3 소제목 2~3개씩 구성
   - 모든 본문은 마크다운이 아닌 HTML 태그(<h2>, <h3>, <p>, <ul>, <li> 등)로 작성
3. 도입부 조건: 첫 문단(100자 이내)에 핵심 키워드를 자연스럽게 포함하고 독자의 공감을 유도
4. 키워드: 핵심 키워드 최소 5회 이상 반복, 연관 키워드 활용, 밀도 1~2% 유지
5. 다국어: 한국어(ko)와 영어(en) 본문을 동일한 구조로 동시 작성
6. 핵심 장치:
   - 본문 중간(절반 지점)에 <div class="cta-container"><button>[CTA 버튼: 무료 통합 컨설팅 받아보기]</button></div> 삽입
   - 본문 내 연관 글로 연결되는 내부 링크 2~3곳 표시 (형식: [내부링크: 관련글 제목])
7. FAQ 섹션: 글 하단에 실제 검색 의도를 반영한 FAQ 3개를 Q&A 형식으로 작성

## 출력 형식 (반드시 아래 순서와 구조를 지켜주세요)

### 1. [기본 정보]
- Slug: [해당 슬러그]
- Category: [saju / name / face / mbti / bokhap 중 선택]
- PublishedAt: 2026-02-22

### 2. [메타 정보]
- SEO Title: (60자 이내)
- Meta Description: (160자 이내)
- Keywords: (쉼표로 구분된 5개 키워드)

### 3. [데이터 리스트]
- TOC (목차): [{ "id": "section1", "title": "1. 제목" }, ...] 형식으로 전체 구성
- FAQ: [{ "q": "질문", "a": "답변" }, ...] 형식으로 3개 추출
- Related Posts: 관련글 제목 2개

### 4. [본문 - HTML 형식]
- contentKo: (한국어 본문 전체를 HTML 태그로 작성)
- contentEn: (영어 본문 전체를 HTML 태그로 작성)
------------------
```

### 30개 주제 목록
- 1번: 역학의 기초: 사주팔자란 무엇인가? 음양오행의 원리 완벽 해설
- 2번: 음력과 양력: 사주 볼 때 정확한 생시를 알아야 하는 이유
- 3번: 사주 일주 완전정복: 나의 본질과 배우자 복을 읽는 법
- 4번: 사주 신살 총정리: 도화살·역마살이 현대 사회에서 장점이 되는 법
- 5번: 사주 용신 찾기: 내 사주에서 가장 필요한 기운과 활용법
- 6번: 사주 공망: 비어있는 운의 의미와 공망을 채우는 실전법
- 7번: 사주 관성으로 보는 직업운: 내게 맞는 직장과 직종 찾기
- 8번: 띠별 2025년 운세: 사주 오행으로 보는 12띠 올해의 흐름
- 9번: 운명의 변화: 사주는 정해져 있지만 운명은 바꿀 수 있는가?
- 10번: 성명학 비기: 이름의 한자 획수가 인생에 미치는 영향
- 11번: 작명의 기술: 태어난 계절에 부족한 기운을 이름으로 채우기
- 12번: 이름 오행: 초성으로 보는 소리 오행의 상생·상극 완벽 정리
- 13번: 개명 가이드: 개명을 고민할 때 반드시 체크해야 할 수리 길흉표
- 14번: 자녀 작명 완벽 가이드: 사주 오행과 성명학을 동시에 만족하는 이름 짓기
- 15번: 성명학 수리 81수 핵심 정리: 좋은 획수 조합과 피해야 할 조합
- 16번: 관상학 입문: 이목구비로 보는 성격·재물·건강운 기초
- 17번: 재물 관상 완벽 정리: 코·입·귀로 보는 돈복 3요소
- 18번: 눈썹 관상: 눈썹 모양으로 읽는 리더십·형제운·수명의 비밀
- 19번: 관상과 건강: 얼굴색과 기색으로 보는 현재 기운과 건강 신호
- 20번: 얼굴의 점 관상학: 빼야 할 점과 반드시 남겨야 할 점 구분법
- 21번: 관상 이마 완전정복: 이마 넓이와 형태로 보는 초년운과 부모복
- 22번: 관상 자가진단: 거울 보며 확인하는 나의 5년 후 성공운
- 23번: MBTI 유래: 칼 융의 분석심리학과 동양 철학의 놀라운 접점
- 24번: MBTI와 사주 오행: 16가지 성격 유형과 오행의 상관관계 분석
- 25번: MBTI 궁합 완전정복: 최악의 궁합을 사주 오행으로 극복하는 법
- 26번: MBTI E·I 유형별 개운법: 성격 유형에 맞게 운을 여는 실전 방법
- 27번: MBTI별 사주 궁합표: 16유형과 잘 맞는 일주 완전 정리
- 28번: 손금 기초: 관상과 함께 보면 강력해지는 생명선·감정선·두뇌선
- 29번: 사주·관상·성명학·MBTI 비교: 네 가지 분석법의 공통점과 차이점
- 30번: 사랑의 운명: 사주 일주와 MBTI로 보는 나의 천생연분 찾기

### URL 구조 (Claude Code에서 만들 파일 위치)
- 1~9번 → app/[locale]/saju/[slug]/page.tsx
- 10~15번 → app/[locale]/seongmyeong/[slug]/page.tsx
- 16~22번 → app/[locale]/gwansang/[slug]/page.tsx
- 23~27번 → app/[locale]/mbti/[slug]/page.tsx
- 28~30번 → app/[locale]/bokhap/[slug]/page.tsx

---
## ⚠️ 다음 세션 우선 작업 (토큰 여유 있을 때)

### 🔴 [영어 번역] result-generator.ts 한글 하드코딩 → 영어 지원
- **파일**: `lib/calculator/result-generator.ts`
- **문제**: 섹션 제목, 본문 내용, subItem 라벨 전부 한글 하드코딩 → 영어 로케일에서도 한글 표시됨
- **해결 방법**: `generateResult(params, locale: string)` locale 파라미터 추가 후 영어 텍스트 맵 별도 작성
- **예상 작업량**: 500~600줄 추가, 대용량 작업 (토큰 20% 이상 소모)
- **호출 위치**: `app/[locale]/result/[id]/page.tsx` 에서도 locale 전달 필요

---

이 작업 보고서는 터미널의 Claude CLI가 토큰 제한으로 중단되기 전까지 완료한 작업 내용과 현재 프로젝트 상태를 요약한 것입니다.

## 📅 마지막 업데이트: 2026-02-22
- **중단 시점**: 2026-02-22 오전 1시경 (토큰 제한 도달)
- **주요 성과**: Next.js 프로젝트 기본 구조 및 핵심 분석 로직 구축 완료

---

## ✅ 완료된 작업 (Completed Tasks)

### 1. 프로젝트 초기 설정 (Initialization)
- **프레임워크**: Next.js 14.2.5 (App Router 사용)
- **설정 파일**: `package.json`, `next.config.js`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.js` 생성 완료
- **다국어 지원 (i18n)**: `next-intl` 라이브러리를 사용한 한국어(KO), 영어(EN), 일본어(JA), 중국어(ZH) 설정 완료 (`i18n.ts`, `middleware.ts`)

### 2. 핵심 계산 로직 (Core Calculators)
- `lib/calculator/saju-calculator.ts`: 생년월일시를 입력받아 간지(천간/지지)와 오행 분석
- `lib/calculator/name-calculator.ts`: 한글 이름 획수 및 소리오행 분석
- `lib/calculator/result-generator.ts`: 사주, 성명학, 관상, MBTI 데이터를 종합하여 결과 메시지 생성

### 3. UI/UX 및 컴포넌트 (UI Components)
- **전역 스타일**: `app/globals.css` (Dark Gold 테마 적용)
- **레이아웃**: `Navigation`, `Footer`, `AdSense` 컴포넌트 구축
- **다단계 입력 폼**: `components/steps/` 디렉토리에 Step 1(이름) ~ Step 5(사진 캡처) 컴포넌트 완성
- **분석 폼 컨테이너**: `components/AnalysisForm.tsx` 작성

### 4. 앱 페이지 (App Pages)
- **메인 페이지**: `app/[locale]/page.tsx` (반응형 랜딩 페이지 및 입력 폼 포함)
- **결과 페이지**: `app/[locale]/result/page.tsx` (종합 분석 결과 리포트 출력)

### 5. 데이터 파일 (Data Asset Files)
- **사주 데이터**: `lib/data/saju/` (천간, 지지, 오행, 십성, 신살, 일주 데이터 일부)
- **성명학 데이터**: `lib/data/name/` (소리오행, 81수리, 한글 획수 데이터)

---

## 🚧 진행 중/남은 작업 (Remaining Tasks)

1. **데이터 보강 (Data Completion)**:
   - 관상(Face Reading) 분석 기준 데이터 보강
   - MBTI 유형별 사주 해석 매칭 데이터 정교화
   - 수호신(Guardian) 관련 분석 데이터 및 매퍼(`mappers.ts`) 완성

2. **서브 페이지 완성**:
   - `privacy`, `terms`, `contact` 등 약관 및 연락처 페이지 내용 채우기
   - `saju`, `name`, `face`, `mbti` 단독 분석 페이지 기능 확인

3. **기능 검증 및 폴리싱**:
   - `face-api.js`를 이용한 관상 분석 로직 실제 동작 확인
   - 다국어 번역 메시지(messages/*.json) 누락분 점검
   - 최종 코드 리뷰 및 린트 오류 수정

---

## 📁 주요 디렉토리 구조
```
sajupalza/
├── app/                  # Next.js App Router (Locale 기반)
├── components/           # UI 컴포넌트 및 입력 스텝
├── lib/
│   ├── calculator/       # 핵심 분석 계산 로직
│   └── data/             # 명리학/성명학 등 기초 데이터
├── messages/             # i18n 번역 파일 (ko, en, ja, zh)
└── public/               # 정적 애셋
```

---
**보고서 끝.** 이 파일을 참고하여 다음 Claude 세션에서 작업을 이어서 진행하세요.
