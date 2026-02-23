# 🔮 사주팔자 (SajuPalza) 프로젝트 분석 리포트

본 문서는 `sajupalza` 프로젝트의 전체적인 구조와 설계를 누구나 쉽게 이해할 수 있도록 정리한 기술 분석 보고서입니다.

---

## 1. 프로젝트 개요 (Overview)
**사주팔자(SajuPalza)**는 사용자의 생년월일, 이름, 얼굴 사진 등을 분석하여 사주, 관상, 성명학, 궁합 등 다양한 운세 서비스를 제공하는 Next.js 기반의 웹 애플리케이션입니다. 다국어 지원(i18n)을 통해 글로벌 사용자에게 서비스를 제공하는 것을 목표로 합니다.

---

## 2. 주요 기술 스택 (Tech Stack)
- **Framework:** Next.js 14.2.5 (App Router 기반)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (반응형 및 테마 관리)
- **Internationalization:** `next-intl` (한국어, 영어 등 다국어 지원)
- **Specialized Libs:**
  - `face-api.js`: 브라우저 기반 얼굴 인식 및 분석
  - `korean-lunar-calendar`: 음력/양력 날짜 변환 및 사주 계산 보조
- **Deployment:** Vercel (예상)

---

## 3. 핵심 디렉토리 구조 및 역할 (Directory Structure)

### 📂 `app/[locale]`
- **역할:** 다국어 라우팅을 포함한 실제 페이지 구성
- **주요 경로:**
  - `/saju`: 사주 분석 입력 페이지
  - `/face`: 관상(얼굴) 분석 페이지
  - `/name`: 성명학 분석 페이지
  - `/mbti`: MBTI 기반 운세 페이지
  - `/result/[id]`: 분석 결과를 고유 ID별로 시각화하여 보여주는 페이지

### 📂 `components`
- **역할:** UI 구성 요소의 모듈화
- **핵심 컴포넌트:**
  - `AnalysisForm.tsx`: 사용자 데이터 입력을 위한 공통 폼
  - `AnalysisLoading.tsx`: 데이터 처리 중 보여주는 애니메이션/로딩 화면
  - `Navigation.tsx`, `Footer.tsx`: 공통 레이아웃 요소
  - `AdSense.tsx`: 수익화를 위한 구글 애드센스 연동

### 📂 `lib`
- **역할:** 비즈니스 로직 및 유틸리티 함수
- **세부 구조:**
  - `calculator/saju-calculator.ts`: 만세력 및 사주 오행 계산 로직
  - `calculator/name-calculator.ts`: 성명학 획수 및 수리 분석 로직
  - `calculator/result-generator.ts`: 분석된 데이터를 바탕으로 결과 텍스트 생성

### 📂 `messages`
- **역할:** 다국어 번역 리소스 관리 (JSON 파일 형태)

---

## 4. 데이터 흐름 및 작동 원리 (Workflow)

1.  **데이터 입력 (Input):** 사용자가 `/saju`나 `/face` 페이지에서 정보를 입력하거나 사진을 업로드합니다.
2.  **분석 요청 (Process):** 입력된 데이터는 `lib/calculator` 내의 분석 엔진으로 전달됩니다.
3.  **결과 생성 (Generation):**
    - 사주의 경우 생년월일시를 바탕으로 오행(목, 화, 토, 금, 수) 분포를 계산합니다.
    - 관상의 경우 `face-api.js`가 얼굴 특징점을 추출하여 성향을 매칭합니다.
4.  **결과 표시 (Display):** 분석된 결과 데이터는 고유 URL(예: `/result/saju_12345`)로 라우팅되어 사용자에게 시각적으로 표시됩니다.

---

## 5. 프로젝트의 특징 및 강점
- **App Router 최적화:** Next.js 14의 최신 기능을 사용하여 서버 컴포넌트와 클라이언트 컴포넌트를 적절히 분리하여 성능을 최적화했습니다.
- **다국어 확장성:** `next-intl`을 구조적으로 적용하여 새로운 언어 추가가 용이합니다.
- **클라이언트 사이드 AI:** `face-api.js`를 활용하여 별도의 서버 비용 없이 브라우저 내에서 직접 얼굴 분석을 수행합니다.

---

*본 문서는 Gemini CLI에 의해 자동 생성되었습니다. (2026. 02. 23)*
