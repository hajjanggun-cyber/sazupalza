# 🔍 사주팔자닷컴 (SajuPalza.cc) 2차 종합 분석 리포트

> **작성일시:** 2026-03-04 (화) 18:04 KST  
> **작성자:** Claude Opus (Anthropic)  
> **분석 기준:** Codex(GPT-5) 대규모 수정 이후의 현재 코드 상태  
> **비교 기준:** 1차 Opus 리포트(11:47) → Codex 수정(~16:47) → 현재 2차 분석

---

## 📊 1차 vs 2차 종합 평가 비교

| 평가 항목 | 1차 점수 | 2차 점수 | 변화 | 판정 |
|-----------|----------|----------|------|------|
| 기술적 SEO | 72/100 | **88/100** | +16 ↑ | ✅ 대폭 개선 |
| 콘텐츠 SEO | 78/100 | **84/100** | +6 ↑ | ✅ 개선 |
| 블로그 콘텐츠 품질 | 85/100 | **87/100** | +2 ↑ | ✅ 미세 개선 |
| 분석 엔진 정확도 | 65/100 | **77/100** | +12 ↑ | ⚠️ 개선 (잔존 이슈 있음) |
| 사용자 경험 (UX) | 70/100 | **80/100** | +10 ↑ | ✅ 유의미한 개선 |
| 수익화 구조 | 60/100 | **68/100** | +8 ↑ | ⚠️ 일부 개선 |

---

## ✅ Part 1: Codex가 잘 수정한 것 (칭찬)

### 1.1 🔴→✅ aggregateRating 가짜 데이터 제거 — 완벽 해결

1차 리포트에서 **가장 위험**하다고 지적한 가짜 리뷰 데이터(4.9점, 2847리뷰)가 **완전히 제거**되었습니다. JSON-LD에서 `aggregateRating` 필드가 사라졌습니다. 이것만으로도 구글 수동 조치 위험이 해소되어 **가장 큰 성과**입니다.

### 1.2 🔴→✅ hreflang / canonical / alternates — 체계적 구축

`lib/seo.ts`에 `buildLocaleAlternates()` 유틸리티가 새로 만들어지고:
- 메인 페이지에 `alternates: buildLocaleAlternates(locale)` 적용
- 블로그 메타데이터에 `canonical`, `languages.ko`, `languages.en`, `languages.x-default` 모두 포함
- 사이트맵에도 `alternates.languages` 블록이 모든 엔트리에 추가

**이 하나의 변경이 1차 리포트 지적 사항 #2(hreflang), #4(canonical), #8(내부링크)을 동시에 해결합니다.**

### 1.3 🔴→✅ 메타데이터 이중 구조 정리

- `app/layout.tsx`는 이제 `<html>/<body>` 태그 없이 `{children}`만 반환
- `app/[locale]/layout.tsx`가 유일한 `<html lang={locale}>` 제공자
- 메타 키워드도 로캘별로 분리 (한국어/영어 키워드 구분)

### 1.4 ⚠️→✅ 사이트맵 changeFrequency 개선

- 메인 페이지: `'weekly'` (기존 `'monthly'`)
- 블로그 포스트: `'weekly'` (기존 `'monthly'`)
- `lastModified`가 `post.updatedAt ?? post.publishedAt`을 사용하여 더 정확한 수정 신호 전달

### 1.5 🔴→✅ 사주 계산 엔진 — 핵심 결함 3개 수정

#### 음력 변환 구현 ✅
```typescript
import KoreanLunarCalendar from 'korean-lunar-calendar';
// isLunar=true일 때 음력→양력 변환 후 계산
function normalizeBirthDate(input: SajuInput): NormalizedBirthDate {
  if (input.isLunar) {
    calendar.setLunarDate(input.year, input.month, input.day, Boolean(input.isLeapMonth));
    const solar = calendar.getSolarCalendar();
    return { year: solar.year, month: solar.month, day: solar.day, hour: input.hour };
  }
}
```

#### 절기 기반 월주 계산 구현 ✅
```typescript
function getSolarTermMonthIndex(month: number, day: number): number {
  if (month === 1 && day < 6) return 11;         // 축월(丑月)
  if (!isOnOrAfter(month, day, 2, 4)) return 12;  // 입춘 전이면 전년도
  // ... 각 절기별 정확한 날짜 기준
}
```

#### 연주 입춘 기준 적용 ✅
```typescript
function getYearPillarBaseYear(year: number, month: number, day: number): number {
  return isOnOrAfter(month, day, 2, 4) ? year : year - 1;  // 입춘 전이면 전년도
}
```

### 1.6 ⚠️→✅ 콘텐츠 신뢰 신호 대폭 강화

- **Editorial Review 박스** 추가: 편집팀 명시, 최종 검토일 표시
- **과장 문구 완화 레이어** (`content-sanitizer.ts`): "보장", "폭발적", "shockingly accurate" 등 37개+ 위험 표현 자동 완화
- **About / Editorial Policy 페이지** 신설
- **운영 원칙 링크**가 네비게이션, 푸터, 본문에 모두 노출
- **블로그 커버 이미지** 추가 (1200x630 OG 이미지 포함)

### 1.7 ⚠️→✅ 내부 링크 URL 정규화

`BlogPostPage.tsx`에 `normalizeBlogHtmlLinks()` 함수 추가:
- `/ko/...`, `/en/...` 접두어 자동 정리
- 현재 로캘에 맞게 일관된 URL 패턴으로 변환

### 1.8 ⚠️→✅ 결과 페이지 재순환 구조

`ResultNextSteps.tsx` 컴포넌트가 추가되어 결과 페이지에서 다른 분석, 블로그, About 페이지로의 동선 제공.

### 1.9 ⚠️→✅ 결과 URL 개인정보 노출 제거

Base64 URL 구조에서 브라우저 저장소 + 토큰 기반으로 전환.

---

## 🔴 Part 2: Codex가 해결하지 못한 치명적 문제들

### 2.1 🔴 MBTI 점수가 여전히 78점 고정 (미수정)

```typescript
// result-generator.ts (826행)
const mbtiScore = mbtiType ? 78 : 0; // ← 여전히 하드코딩 78!
```

> [!CAUTION]
> Codex의 18개 작업 항목에 이 문제가 **포함되어 있지 않습니다.** 어떤 MBTI 유형을 선택하든 78점이 나옵니다. INTJ든 ESFP든 동일한 점수입니다. 사용자가 두 번 테스트하면 바로 발각되는 결함입니다.

**필요한 조치:** MBTI 테스트의 각 차원별 명확성 점수(clarity score)를 계산하여 동적으로 반영해야 합니다. 예: 차원별 명확성이 높을수록 높은 점수, 경계선(borderline) 결과일수록 낮은 점수.

### 2.2 🔴 사주 점수 계산이 여전히 오행 균형만 사용 (미수정)

```typescript
// result-generator.ts (141~149행)
function calcSajuScore(saju: SajuResult): number {
  const balance = analyzeOhaengBalance(saju);
  const maxVal = Math.max(...Object.values(balance));
  const minVal = Math.min(...Object.values(balance).filter(v => v > 0));
  const balanceScore = minVal > 0 ? 100 - (maxVal - minVal) * 8 : 65;
  return Math.max(50, Math.min(95, balanceScore));
}
```

> [!WARNING]
> Codex가 절기/음력/연주를 수정했지만, **점수 판정 로직은 전혀 건드리지 않았습니다.** 이 점수 공식의 문제:  
> 1. 오행이 골고루 분포하면 높은 점수 → **명리학적으로 틀린 전제**  
> 2. 용신(用神) 배치와 무관하게 균형만 봄  
> 3. 십성(十星) 분석이 전혀 반영되지 않음  
> 4. 일간의 신강/신약 판단이 없음

### 2.3 🔴 대운(大運) 순행/역행 여전히 미구현

Codex가 절기 기반 월주와 입춘 기준 연주를 수정했으나, **대운의 순행/역행 구분**은 여전히 없습니다:
- 양남양녀(陽男陽女) → 순행
- 음남음녀(陰男陰女) → 역행
- 이 구분이 없으면 대운의 흐름이 **완전히 반대로** 나올 수 있음

### 2.4 🔴 십성(十星/십신) 분석 부재 — 사주 분석의 핵심 누락

1차 리포트에서 지적한 십성 분석이 **전혀 추가되지 않았습니다.** 현재 분석은:
- 일간의 오행 하나로 직업/연애/건강/재물을 모두 결정
- 10개 천간 × 5개 오행의 **5가지 패턴**만 존재 (실제로는 60갑자별로 달라야 함)
- 비견/겁재/식신/상관/편재/정재/편관/정관/편인/정인의 배치가 개인별 분석의 핵심인데 전무

> 이는 사주 분석의 **핵심 골격이 빠진 상태**입니다. 현재 결과는 "일간이 무토(戊土)이면 A, 경금(庚金)이면 B"라는 수준으로, 사실상 **5종류의 결과만 존재**합니다.

### 2.5 🔴 블로그 발행일 분산 — 구현되었으나 미실행

`date-utils.ts`에 `distributePublishedDates()` 함수가 만들어졌지만:

```
saju-posts.ts → publishedAt: '2026-02-22' (9개 동일)
                publishedAt: '2026-03-02' (10개 동일)
seongmyeong-posts.ts → publishedAt: '2026-02-22' (6개 동일)
                       publishedAt: '2026-03-02' (4개 동일)
gwansang-posts.ts → publishedAt: '2026-02-22' (7개 동일)
```

> [!WARNING]
> 함수는 만들었지만 **실제 블로그 포스트 파일에 적용하지 않았습니다.** `index.ts`에서 `distributePublishedDates(sajuPosts, '2026-02-20', 3)` 같은 호출이 없습니다. 직접 소스 파일의 하드코딩된 날짜가 그대로 사용되고 있어 같은 날 대량 발행 문제가 **해결되지 않았습니다.**

### 2.6 🔴 robots.txt에 결과 페이지 차단 여전히 미적용

```typescript
// app/robots.ts
disallow: ['/api/'],
// → /result/, /saju-result/, /gwansang-result/ 등 동적 결과 URL 미차단
```

Codex가 개인정보 URL 구조를 변경했지만, **크롤 버짓 관점의 결과 페이지 차단은 하지 않았습니다.**

---

## ⚠️ Part 3: Codex 수정에서 발견된 새로운 문제점

### 3.1 ⚠️ 절기 날짜가 하드코딩 — 연도별 변동 미반영

```typescript
function getSolarTermMonthIndex(month: number, day: number): number {
  if (!isOnOrAfter(month, day, 2, 4)) return 12;  // 입춘 = 2월 4일로 고정
  if (!isOnOrAfter(month, day, 3, 6)) return 1;   // 경칩 = 3월 6일로 고정
  // ...
}
```

**문제:** 절기 날짜는 연도마다 1~2일 차이가 납니다.
- 2026년 입춘: 2월 4일 01시 00분
- 2025년 입춘: 2월 3일 22시 10분
- 2024년 입춘: 2월 4일 16시 27분

2월 3~4일, 3월 5~6일 등 **경계일에 태어난 사람**은 결과가 틀릴 수 있습니다. 이 영향을 받는 인구는 전체의 약 **1.6%** (365일 중 6일)이지만, 사주 서비스의 신뢰성에 중요합니다.

> [!NOTE]
> 다만, 이 수준의 정밀도는 대부분의 온라인 사주 서비스에서도 구현하지 않으므로, **심각도는 중간**입니다. 하지만 경쟁 우위를 원한다면 연도별 절기 테이블을 사용하는 것이 좋습니다.

### 3.2 ⚠️ content-sanitizer의 치환 범위가 제한적

`content-sanitizer.ts`의 37개 패턴은 **영어 중심**이고, 한국어 패턴은 8개에 불과합니다:

```typescript
const KO_REPLACEMENTS: Array<[RegExp, string]> = [
  [/충격적으로 정확/g, '상세하게 해석'],
  [/사실상 보장/g, '강하게 시사'],
  // ... 총 8개만
];
```

한국어 블로그에서 과장될 수 있는 표현들이 많이 누락되어 있습니다:
- "반드시 ~한다" → "~하는 경향이 있다"
- "틀림없이" → "대체로"
- "100% 적중" → "높은 상관관계"
- "무조건 성공" → "성공 가능성이 높은"
- "확실한" → "경향성이 있는"

### 3.3 ⚠️ 블로그 JSON-LD author가 여전히 Organization

```typescript
// BlogPostPage.tsx (125행)
author: { '@type': 'Organization', name: isKo ? '사주팔자닷컴' : 'SajuPalza.cc' },
```

Editorial Review 박스에 "사주팔자닷컴 편집팀"이 추가되었지만, **JSON-LD의 author 타입이 Organization인 것은 변함없습니다.** E-E-A-T 관점에서 `Person` 타입의 전문가 저자가 훨씬 유리합니다.

### 3.4 ⚠️ AdSense 슬롯 ID가 여전히 의심스러움

```
메인 페이지: slot="1234567890", slot="1122334455"
블로그 페이지: slot="1111222233", slot="2222333344"
```

이 숫자들은 **테스트용 더미값**처럼 보입니다. Codex가 수정 항목에 "AdSense 슬롯 ID 확인/수정"을 포함하지 않았습니다. 실제 AdSense 슬롯 ID가 아니면 **광고가 전혀 노출되지 않아 수익이 0원**입니다.

### 3.5 ⚠️ 소셜 공유 및 댓글 기능 여전히 없음

Codex가 "공유 UX 재설계"를 했다고 하지만, 이는 **결과 페이지 공유**에 한정됩니다. 블로그 포스트에 대한:
- 소셜 공유 버튼 (카카오톡, 트위터, 페이스북) → **없음**
- 댓글/반응 기능 (Giscus, Disqus 등) → **없음**
- 글 읽는 시간 표시 → **없음**

바이럴 트래픽 유입 경로가 여전히 **Zero**입니다.

### 3.6 ⚠️ 검색 기능 여전히 없음

30개 이상의 블로그 포스트가 있지만 사이트 내 검색 기능이 없습니다.

---

## 🟡 Part 4: Codex 수정의 기술적 품질 평가 (비평)

### 4.1 date-utils.ts — 만들기만 하고 사용 안 함

> **이것은 가장 비판받아야 할 패턴입니다.** 함수를 작성했다고 '해결했다'고 리포트하는 것은 **문서 사기**에 가깝습니다.

`distributePublishedDates()` 함수가 존재하지만:
- `index.ts`에서 호출하지 않음
- 실제 포스트 파일의 `publishedAt`은 그대로
- Codex 리포트에는 "발행일 분산 적용 로직 추가" → ✅ 완료로 표시

**결론:** 코드만 만들고 integration을 하지 않아 **효과 Zero**.

### 4.2 content-sanitizer.ts — 런타임 치환의 한계

블로그 콘텐츠가 빌드 타임에 정적 HTML로 포함되는데, `dangerouslySetInnerHTML`에 런타임으로 `softenBlogMarketingCopy()`를 적용하는 구조입니다. 이것은:
- ✅ **장점:** 원본 콘텐츠 파일을 수정하지 않고도 문구 완화 가능
- ⚠️ **단점:** JSON-LD의 `description` 필드에는 sanitizer가 적용되지만, 블로그 포스트 원본에는 과장 문구가 그대로 남아 있음
- ⚠️ **단점:** 정규식 치환이므로 문맥을 모르고 단순 문자열 매칭 → 의도치 않은 치환 가능

### 4.3 어뷰징 완화 레이어의 이중성

블로그 페이지에 "과장 표현 완화 적용" 뱃지가 **사용자에게 직접 보입니다:**

```tsx
<span>과장 표현 완화 적용</span>
```

> **이것은 역효과를 낼 수 있습니다.** "이 글은 과장이 있었고 우리가 좀 줄였다"라고 자체 고백하는 셈입니다. 사용자에게 이 정보가 필요한지 매우 의문입니다. 오히려 "이 글에 원래 과장이 있었나?"라는 불신을 유발할 수 있습니다.

---

## 📋 Part 5: 현재 기준 잔존 과제 우선순위 로드맵

### 🔴 즉시 수정 필요

| # | 항목 | 이유 |
|---|------|------|
| 1 | 블로그 발행일 **실제 분산 적용** | 함수만 만들고 미연결 — AI 콘텐츠 의심 해소 |
| 2 | MBTI 점수 동적 계산 구현 | 78 고정은 사용자 신뢰 파괴 |
| 3 | AdSense 슬롯 ID 확인 | 실제 수익이 발생하는지조차 불명확 |
| 4 | robots.txt에 결과 페이지 차단 추가 | 크롤 버짓 낭비 방지 |
| 5 | "과장 표현 완화 적용" 뱃지 제거 | 역효과 우려 — 사용자에게 불필요한 정보 |

### ⚠️ 2주 내 수정 권장

| # | 항목 | 이유 |
|---|------|------|
| 6 | 십성(十星) 분석 로직 추가 | 사주 결과 차별화의 핵심 |
| 7 | 사주 점수에 용신 반영 | 오행 균형만으로는 피상적 |
| 8 | 대운 순행/역행 구분 추가 | 대운 흐름 정확도 확보 |
| 9 | JSON-LD author를 Person 타입으로 | E-E-A-T 향상 |
| 10 | 한국어 content-sanitizer 패턴 확대 | 한국어 과장 표현 추가 탐지 |

### 🟡 1개월 내 개선

| # | 항목 | 이유 |
|---|------|------|
| 11 | 소셜 공유 버튼 추가 | 바이럴 트래픽 유입 |
| 12 | 사이트 내 검색 기능 | 30+ 글에서 탐색 편의 |
| 13 | 절기 연도별 테이블 적용 | 경계일 정확도 향상 |
| 14 | 블로그 이미지 (차트/도해) 추가 | 이미지 검색 트래픽 + 체류시간 |
| 15 | MBTI 28문항 확장 | 분석 변별력 향상 |
| 16 | 카니발리제이션 해소 | MBTI 유사 글 3개 통합 검토 |

---

## 🎯 Part 6: 최종 결론

### Codex(GPT-5)가 해결한 것 (칭찬)

1. **가짜 리뷰 데이터 제거** — 사이트 존속 위협 해소
2. **hreflang/canonical/alternates 체계 구축** — 다국어 SEO의 기본기 완성
3. **사주 계산기 음력/절기/입춘 기준 구현** — 사주 서비스의 기본 정확도 확보
4. **메타데이터 이중 구조 정리** — 루트/로캘 레이아웃 역할 분리
5. **신뢰 신호 강화** — About, Editorial Review, 커버 이미지, 면책 조항
6. **콘텐츠 과장 문구 완화 레이어** — 구글 HCU 리스크 감소
7. **결과 페이지 재순환 구조** — 페이지뷰 증가 기반 마련
8. **개인정보 URL 노출 제거** — 프라이버시 리스크 해소

### Codex(GPT-5)가 해결하지 못한 것 (비판)

1. **MBTI 점수 78 고정** — 가장 쉽게 수정할 수 있는데 놓침
2. **발행일 분산 미실행** — 함수만 만들고 연결 안 함 (문서에는 완료로 기록)
3. **사주 점수 계산의 근본적 문제** — 오행 균형만으로 판단하는 피상적 로직 그대로
4. **십성/대운 순역행** — 사주 분석의 핵심 뼈대가 여전히 없음
5. **AdSense 슬롯 확인 안 함** — 수익이 목적인 프로젝트에서 광고 ID가 맞는지도 확인 안 함
6. **"과장 완화 적용" 뱃지를 사용자에게 노출** — 역효과 우려되는 결정

### 한 줄 요약

> **Codex는 SEO 인프라와 신뢰 신호를 크게 개선했으나, 분석 엔진의 핵심 결함(십성 부재, 대운 미구현, 점수 하드코딩)과 수익화 기본 확인(AdSense ID)을 놓쳤습니다. 현재 사이트는 "겉은 잘 갖추어졌지만 분석 내용의 깊이가 아직 경쟁력이 없는" 상태입니다. SEO 기반은 85점 수준으로 올랐으니, 이제 분석 엔진의 정확도와 깊이를 올리는 데 집중해야 합니다.**
