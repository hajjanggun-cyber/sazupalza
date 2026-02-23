# Gemini 3차 작업 지시서 - 잔존 한국어 완전 제거

## 아직 남아있는 한국어 목록 (출력 기준 정확한 위치)

```
① Core Energy 값         → 음수(陰水) - 이슬과 샘물, 감성의 기운
② Career MBTI 직업군     → 영업, 기업가
③ Love MBTI 관계 특성    → 활발하고 즐거운 관계를 선호하는 경향이 있습니다
④ 성명학 summary         → 중단과 좌절의 기운
⑤ Sound Elements 관계    → (중화) — subItem 표시값
⑥ MBTI 별명              → 모험을 즐기는 사업가
⑦ MBTI 강점 문장         → 빠른 상황 파악과 즉각적인 행동으로 문제를 해결하는 경향이 있습니다
⑧ MBTI 성장 문장         → 장기적인 결과를 고려한 신중한 결정을 내리는 연습이 도움이 됩니다
```

---

## 수정 파일 목록

```
lib/data/name/suri81.ts                 ← ④ 수정
lib/data/mbti/types.ts                  ← ②③⑥ 수정 (2차에서 누락된 부분 확인)
lib/calculator/result-generator.ts     ← ①②③⑤⑥⑦⑧ 수정
```

---

## 수정 1: suri81.ts — summaryEn 필드 추가

### 인터페이스 수정

```typescript
export interface Suri {
  number: number;
  name: string;
  rating: 'great' | 'good' | 'neutral' | 'caution' | 'avoid';
  summary: string;
  summaryEn: string;  // ← 추가
  description: string;
}
```

### 81개 항목 전체에 summaryEn 추가

```typescript
1:  summaryEn: 'Energy of Beginnings and Creation',
2:  summaryEn: 'Energy of Separation and Conflict',
3:  summaryEn: 'Energy of Honor and Advancement',
4:  summaryEn: 'Energy of Stability and Practicality',
5:  summaryEn: 'Energy of Abundance and Prosperity',
6:  summaryEn: 'Energy of Harmony and Accord',
7:  summaryEn: 'Energy of Wisdom and Analysis',
8:  summaryEn: 'Energy of Progress and Achievement',
9:  summaryEn: 'Energy of Wisdom and Completion',
10: summaryEn: 'Energy of Emptiness and Uncertainty',
11: summaryEn: 'Energy of Idealism vs. Reality',
12: summaryEn: 'Energy of Hardship and Trials',
13: summaryEn: 'Energy of Wisdom and Talent',
14: summaryEn: 'Energy of Separation and Solitude',
15: summaryEn: 'Energy of Fortune and Prosperity',
16: summaryEn: 'Energy of Virtue and Trust',
17: summaryEn: 'Energy of Strength and Independence',
18: summaryEn: 'Energy of Progress and Success',
19: summaryEn: 'Energy of Obstacles and Anxiety',
20: summaryEn: 'Energy of Emptiness and Futility',
21: summaryEn: 'Energy of Leadership and Authority',
22: summaryEn: 'Energy of Interruption and Setback',
23: summaryEn: 'Energy of Fame and Recognition',
24: summaryEn: 'Energy of Rising to Prominence',
25: summaryEn: 'Energy of Stability and Strength',
26: summaryEn: 'Energy of Heroic Achievement',
27: summaryEn: 'Energy of Discord and Opposition',
28: summaryEn: 'Energy of Turbulence and Change',
29: summaryEn: 'Energy of Success and Prosperity',
30: summaryEn: 'Energy of Neutrality and Uncertainty',
31: summaryEn: 'Energy of Reputation and Wisdom',
32: summaryEn: 'Energy of Fortune and Opportunity',
33: summaryEn: 'Energy of Leadership and Creativity',
34: summaryEn: 'Energy of Ruin and Downfall',
35: summaryEn: 'Energy of Gentleness and Peace',
36: summaryEn: 'Energy of Heroism with Ups and Downs',
37: summaryEn: 'Energy of Virtue and Integrity',
38: summaryEn: 'Energy of Artistic Talent',
39: summaryEn: 'Energy of Wealth and Prosperity',
40: summaryEn: 'Energy of Anxiety and Restlessness',
41: summaryEn: 'Energy of Supreme Honor',
42: summaryEn: 'Energy of Hardship and Perseverance',
43: summaryEn: 'Energy of Confusion and Disorder',
44: summaryEn: 'Energy of Obstacles and Interference',
45: summaryEn: 'Energy of the Great Earth\'s Embrace',
46: summaryEn: 'Energy of Adversity and Trials',
47: summaryEn: 'Energy of Social Advancement',
48: summaryEn: 'Energy of Virtue and Renown',
49: summaryEn: 'Energy of Change and Adaptation',
50: summaryEn: 'Energy of Neutrality',
51: summaryEn: 'Energy of Mixed Success and Failure',
52: summaryEn: 'Energy of Foresight and Insight',
53: summaryEn: 'Energy of Internal Conflict',
54: summaryEn: 'Energy of Rise and Fall',
55: summaryEn: 'Energy of Anxiety and Unrest',
56: summaryEn: 'Energy of Sorrow and Regret',
57: summaryEn: 'Energy of Effort and Achievement',
58: summaryEn: 'Energy of Late-Blooming Fortune',
59: summaryEn: 'Energy of Emptiness and Futility',
60: summaryEn: 'Energy of Wavering and Instability',
61: summaryEn: 'Energy of Prosperity and Advancement',
62: summaryEn: 'Energy of Decline and Stagnation',
63: summaryEn: 'Energy of Progress and Flourishing',
64: summaryEn: 'Energy of Hardship and Adversity',
65: summaryEn: 'Energy of Thriving and Flourishing',
66: summaryEn: 'Energy of Decline and Fading',
67: summaryEn: 'Energy of Auspiciousness and Fortune',
68: summaryEn: 'Energy of Steady and Stable Growth',
69: summaryEn: 'Energy of Decline and Ending',
70: summaryEn: 'Energy of Emptiness and Vanity',
71: summaryEn: 'Energy of Fading and Retreat',
72: summaryEn: 'Energy of Fluctuation and Change',
73: summaryEn: 'Energy of Calm and Auspiciousness',
74: summaryEn: 'Energy of Decline and Regression',
75: summaryEn: 'Energy of Mixed Fortune',
76: summaryEn: 'Energy of Parting and Separation',
77: summaryEn: 'Energy of Partial Fortune',
78: summaryEn: 'Energy of Difficulty First, Fortune Later',
79: summaryEn: 'Energy of Final Misfortune',
80: summaryEn: 'Energy of Emptiness and Void',
81: summaryEn: 'Energy of Return to the Origin',
```

---

## 수정 2: mbti/types.ts — 누락 필드 확인 및 추가

2차 작업에서 `nicknameEn`, `careerEn`, `relationEn`을 추가했을 것임.
**아래 16개 유형에 해당 필드가 없으면 반드시 추가할 것.**

특히 ESTP 확인:
```typescript
ESTP: {
  nicknameEn: 'The Entrepreneur',
  careerEn: ['Sales', 'Entrepreneurship', 'Sports', 'Marketing', 'Emergency Services'],
  relationEn: 'You tend to enjoy exciting and active relationships',
  // ... 기존 필드 유지
},
```

16개 전체 nicknameEn 목록 (누락 시 추가):
```
INTJ → 'The Architect'
INTP → 'The Logician'
ENTJ → 'The Commander'
ENTP → 'The Debater'
INFJ → 'The Advocate'
INFP → 'The Mediator'
ENFJ → 'The Protagonist'
ENFP → 'The Campaigner'
ISTJ → 'The Logistician'
ISFJ → 'The Defender'
ESTJ → 'The Executive'
ESFJ → 'The Consul'
ISTP → 'The Virtuoso'
ISFP → 'The Adventurer'
ESTP → 'The Entrepreneur'
ESFP → 'The Entertainer'
```

---

## 수정 3: result-generator.ts — 6곳 정밀 수정

### ① Core Energy 값 (buildIlganAnalysis subItems)

**문제**: `data.meaning` (한국어)을 그대로 사용하고 있음
**위치**: `buildIlganAnalysis` 함수의 `subItems` 반환부

```typescript
// 현재 (문제)
{ label: locale === 'ko' ? '핵심 기운' : 'Core Energy', value: data.meaning }

// 수정 후
{
  label: locale === 'ko' ? '핵심 기운' : 'Core Energy',
  value: locale === 'ko' ? data.meaning : (data.meaningEn || data.meaning)
}
```

---

### ② Career MBTI 직업군 (buildCareerSection)

**문제**: `mbtiTypes[mbtiType]?.career` (한국어 배열)를 그대로 사용
**위치**: `buildCareerSection` 함수의 `mbtiAdd` 변수

```typescript
// 현재 (문제 — en인데 한국어 career 배열 사용)
const mbtiAdd = mbtiType
  ? ` Combined with your MBTI ${mbtiType} characteristics, you also have favorable energy in fields such as ${mbtiTypes[mbtiType]?.career?.slice(0, 2).join(', ')}.`
  : '';

// 수정 후
const mbtiCareerFields = locale === 'ko'
  ? mbtiTypes[mbtiType]?.career?.slice(0, 2).join(', ')
  : (mbtiTypes[mbtiType]?.careerEn?.slice(0, 2).join(', ') || mbtiTypes[mbtiType]?.career?.slice(0, 2).join(', '));

const mbtiAdd = mbtiType
  ? locale === 'ko'
    ? ` MBTI ${mbtiType}의 특성이 더해져 ${mbtiCareerFields} 분야에서도 유리한 기운이 있습니다.`
    : ` Combined with your MBTI ${mbtiType} characteristics, you also have favorable energy in fields such as ${mbtiCareerFields}.`
  : '';
```

---

### ③ Love MBTI 관계 특성 (buildLoveSection)

**문제**: `mbtiTypes[mbtiType]?.relation` (한국어)을 en에서도 사용
**위치**: `buildLoveSection` 함수의 `mbtiLoveAdd` 변수

```typescript
// 수정 후
const mbtiLoveAdd = mbtiType
  ? locale === 'ko'
    ? ` MBTI ${mbtiType}의 특성상 ${mbtiTypes[mbtiType]?.relation || '진실한 관계를 소중히 여기는 경향이 있습니다'}.`
    : ` Reflecting MBTI ${mbtiType} traits, ${mbtiTypes[mbtiType]?.relationEn || mbtiTypes[mbtiType]?.relation || 'you tend to value genuine relationships'}.`
  : '';
```

---

### ④ 성명학 summary (buildNameDetailSection)

**문제**: `name.suriAnalysis?.wongyeok?.summary` (한국어)가 본문에 삽입됨
**위치**: `buildNameDetailSection` 함수의 `content` 생성부

현재 코드 패턴을 찾아서 아래처럼 수정:

```typescript
// suri81 데이터에서 summaryEn을 가져오는 import 추가 (파일 상단)
import { suriData } from '../data/name/suri81';

// buildNameDetailSection 내부에서
const wonSummary = locale === 'ko'
  ? (name.suriAnalysis?.wongyeok?.summary || '')
  : (suriData[name.wongyeok]?.summaryEn || name.suriAnalysis?.wongyeok?.summary || '');

// content 문자열에서 wongyeok summary 삽입 부분을 wonSummary로 교체
```

**주의**: `suriData`가 이미 import되어 있는지 확인. 없으면 상단에 추가.

---

### ⑤ Sound Elements subItem의 (중화) (buildNameDetailSection)

**문제**: subItems의 Sound Elements 값에 `(중화)` 한국어가 남아있음

```typescript
// 현재 (문제)
{ label: locale === 'ko' ? '소리오행' : 'Sound Elements',
  value: `${name.soundOhaengList?.join(' → ') || ''} (${soundKey})` }

// 수정 후
const soundKeyEn: Record<string, string> = {
  '상생': 'Mutual Generation',
  '중화': 'Neutral',
  '상극': 'Mutual Overcoming',
};

{ label: locale === 'ko' ? '소리오행' : 'Sound Elements',
  value: `${name.soundOhaengList?.join(' → ') || ''} (${locale === 'ko' ? soundKey : (soundKeyEn[soundKey] || soundKey)})` }
```

---

### ⑥⑦⑧ MBTI 별명 + 강점 + 성장 (buildMbtiSajuSection)

**문제**:
- `mbtiInfo.nickname` → 한국어 별명
- `mbtiInfo.strengths?.[0]` → 한국어 강점 문장
- `mbtiInfo.growthPoints?.[0]` → 한국어 성장 포인트 문장

**수정 후 content 생성 로직**:

```typescript
const content = locale === 'ko'
  ? `MBTI ${mbtiType}(${mbtiInfo.nickname})의 특성과 사주 ${ohaeng} 기운의 교차 분석입니다. ${combDesc} ${mbtiInfo.strengths?.[0] || ''} ${mbtiInfo.growthPoints?.[0] || ''}`
  : `This is a fusion analysis of MBTI ${mbtiType} (${mbtiInfo.nicknameEn || mbtiInfo.nickname}) traits and the ${ohaeng} energy from your Four Pillars. ${combDesc}`;
```

> **핵심**: en에서는 `mbtiInfo.strengths?.[0]`와 `mbtiInfo.growthPoints?.[0]`를 아예 붙이지 않는다.
> combDesc(조합 설명)만으로 충분하며, 한국어 문장이 섞이는 것보다 낫다.

**subItems 수정**:

```typescript
subItems: [
  {
    label: locale === 'ko' ? 'MBTI 유형' : 'MBTI Type',
    value: `${mbtiType} - ${locale === 'ko' ? mbtiInfo.nickname : (mbtiInfo.nicknameEn || mbtiInfo.nickname)}`
  },
  { label: locale === 'ko' ? 'MBTI 오행' : 'MBTI Element', value: mbtiInfo.ohaeng },
  { label: locale === 'ko' ? '사주 일간 오행' : 'Day Stem Element', value: ohaeng },
  { label: locale === 'ko' ? '조합 특성' : 'Combination Trait', value: combDesc.split('.')[0] },
],
```

---

## 최종 검증 절차

### 1단계: 빌드 확인
```bash
npm run build
```
오류 없이 통과해야 함.

### 2단계: 출력 확인 항목 (en 접속 기준)

아래 항목이 전부 영어로 나와야 함:

```
□ Core Energy 값          → 'Yin Water (陰水) - Dew and Spring, Energy of Sensitivity'
□ Career MBTI 직업군      → 'Sales, Entrepreneurship'  (영어)
□ Love MBTI 관계          → 'You tend to enjoy exciting...'  (영어)
□ 성명학 summary           → 'Energy of Interruption and Setback'  (영어)
□ Sound Elements 관계      → '(Neutral)' 또는 '(Mutual Generation)'  (영어)
□ MBTI 별명               → 'ESTP - The Entrepreneur'  (영어)
□ MBTI 강점/성장 문장      → 영어 또는 제거됨 (한국어 없음)
```

### 3단계: ko 접속 확인
한국어 접속 시 기존과 동일하게 한국어로 출력되어야 함.

---

## 절대 하지 말 것

- 기존 한국어 필드 삭제 금지 (`summary`, `nickname`, `relation`, `career` 등)
- 새 파일 생성 금지
- 계산 로직 변경 금지
- TypeScript 컴파일 오류 유발 금지
