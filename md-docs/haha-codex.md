# 코드 검수 보고서 (haha-codex)

## 요약
이 프로젝트는 Next.js + next-intl 기반의 사주/관상/이름/MBTI 통합 분석 서비스로 보입니다. 그러나 현재 코드베이스에는 **치명적인 파싱/컴파일 오류로 보이는 손상(문자 인코딩 깨짐, JSX/TS 구문 파손)**이 광범위하게 존재합니다. 이 상태라면 `next build` 단계에서 즉시 실패할 가능성이 매우 높습니다.

또한 일부 핵심 계산 모듈(`lib/calculator/*`)과 주요 페이지(`app/*`)에서 **문자열 리터럴과 JSX 태그가 깨져 있어 런타임 이전에 컴파일이 불가능**합니다. 우선적으로 파일 인코딩/손상 복구가 필요합니다.

## 치명적 이슈 (빌드 불가 수준)
1. **문자 인코딩/파일 손상으로 인한 TS/JSX 구문 오류 다발**
`app/layout.tsx`, `app/[locale]/page.tsx`, `app/[locale]/result/page.tsx`, `app/[locale]/result/[id]/page.tsx`, `components/AnalysisForm.tsx`, `components/steps/Step5Photo.tsx`, `lib/calculator/saju-calculator.ts`, `lib/calculator/name-calculator.ts`, `lib/calculator/result-generator.ts` 등에서 **닫히지 않는 문자열, 깨진 JSX 종료 태그, 잘못된 객체 키/식별자**가 관찰됩니다.
예시 패턴:
- `??/span>` 형태의 JSX 종료 태그 손상
- `'??;` 처럼 닫히지 않는 문자열 리터럴
- `siteName: '...` 이후 닫는 따옴표/괄호 누락
- `return '...;` 형태의 문장 종료 오류
이 상태는 컴파일러가 파일을 파싱할 수 없으므로 실행 자체가 불가능합니다.

2. **핵심 계산 로직 파일 파손**
`lib/calculator/saju-calculator.ts`, `lib/calculator/name-calculator.ts`, `lib/calculator/result-generator.ts`는 전체 시스템의 결과 생성 핵심입니다. 현재 파일 내 다수 문자열/키가 깨져 있어 로직 자체가 동작 불가능합니다. 특히 사주 계산은 숫자/순서 테이블이 정확해야 하므로, 문자 손상은 즉시 결과 오류로 이어집니다.

3. **결과 페이지 렌더링 불가**
`app/[locale]/result/[id]/page.tsx`에서 JSX 태그 파손과 텍스트 손상이 확인됩니다. 이 파일은 결과 렌더의 핵심이며, 현재 상태로는 페이지 로딩이 불가능합니다.

## 중대 이슈 (동작 오류 가능)
1. **문자열 깨짐으로 인한 UX/SEO 손상**
`app/layout.tsx`, `app/[locale]/page.tsx`의 `metadata`, OpenGraph, JSON-LD 텍스트가 깨져 있습니다. 설령 빌드가 되더라도 검색 노출/카드/메타 텍스트가 모두 깨진 상태로 노출됩니다.

2. **locale 및 URL/공유 처리 연계 취약**
`app/[locale]/result/page.tsx`는 query를 base64url로 변환하여 리다이렉트합니다. 이 로직 자체는 정상 구조이나, 텍스트/태그 손상으로 컴파일이 안 되는 상태입니다.

## 코드 흐름 (프로세스 요약)
### 1) 국제화/라우팅
- `middleware.ts`에서 locale을 `ko/en/ja/zh`로 라우팅 (`next-intl` 미들웨어).
- `i18n.ts`에서 locale에 맞는 `messages/*.json` 로드.
- `app/[locale]/layout.tsx`에서 locale 유효성 검사 및 `NextIntlClientProvider` 세팅.

### 2) 메인 페이지
- `app/[locale]/page.tsx`에서 Home 렌더링.
- `components/Navigation.tsx`, `components/Footer.tsx`, `components/AdSense.tsx` 포함.
- JSON-LD(WebApplication/FAQ) 삽입.
- 핵심 입력 UI는 `components/AnalysisForm.tsx`에서 제공.

### 3) 입력 흐름 (5단계)
- `components/AnalysisForm.tsx`
  - Step1 이름 입력
  - Step2 생년월일 (`components/steps/Step2Birth.tsx`)
  - Step3 MBTI (`components/steps/Step3MBTI.tsx`)
  - Step4 출생 시간 (`components/steps/Step4Time.tsx`)
  - Step5 사진 업로드/분석 (`components/steps/Step5Photo.tsx`)
- 사진 분석 결과는 `sessionStorage['faceAnalysisResult']`에 저장.
- 입력 데이터는 base64url로 인코딩되어 `/${locale}/result/[id]`로 이동.

### 4) 결과 페이지
- `app/[locale]/result/page.tsx`는 기존 query 파라미터 접근을 base64url 형태로 리다이렉트.
- `app/[locale]/result/[id]/page.tsx`에서 base64url 디코딩 후 분석 실행.

### 5) 계산/결과 생성
- `lib/calculator/saju-calculator.ts`: 사주 8자 계산
- `lib/calculator/name-calculator.ts`: 이름 획수/81수리 등 계산
- `components/steps/Step5Photo.tsx`: face-api 기반 관상 요약
- `lib/calculator/result-generator.ts`: 종합 스코어 및 섹션별 설명 생성
- `lib/data/*`: 오행/십성/관상/MBTI 등 데이터 테이블

## 권장 조치 (우선순위)
1. **파일 인코딩/손상 복구**
- 모든 TS/TSX 파일을 UTF-8로 통일하고 손상된 문자열을 복원해야 합니다.
- 특히 `lib/calculator/*`와 `app/*` 파일을 최우선 복구해야 합니다.

2. **컴파일 오류 정리 후 빌드 검증**
- 인코딩 복구 후 `next build`로 컴파일 검증을 수행해야 합니다.
- 컴파일 통과 전까지는 런타임 이슈 분석이 의미 없습니다.

3. **텍스트/메타 데이터 재검수**
- `metadata`, JSON-LD, UI 문자열이 깨져 있어 SEO/UX 품질이 크게 저하됩니다.

## 확인한 파일 레퍼런스
- `app/layout.tsx`
- `app/[locale]/layout.tsx`
- `app/[locale]/page.tsx`
- `app/[locale]/result/page.tsx`
- `app/[locale]/result/[id]/page.tsx`
- `components/AnalysisForm.tsx`
- `components/steps/Step2Birth.tsx`
- `components/steps/Step5Photo.tsx`
- `lib/calculator/saju-calculator.ts`
- `lib/calculator/name-calculator.ts`
- `lib/calculator/result-generator.ts`

## 테스트/빌드 실행 여부
- 빌드/테스트는 실행하지 못했습니다.
- 현재 상태는 정적 분석만으로도 **구문 오류가 다수 확인**되는 수준입니다.
