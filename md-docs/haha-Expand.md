# 사주팔자 데이터 확충 - 제미나이 프롬프트 모음

> 목적: API 없이 순수 정적 데이터 확충으로 결과 세밀도 향상
> 작업 완료 후 각 파일에 직접 붙여넣기

---

## 공통 주의사항

- **한번에 전체 요청 금지** → 품질이 급격히 떨어짐
- 각 항목마다 **기존 예시 코드를 같이 붙여넣기** → 형식 맞춤
- **모든 필드는 한국어(ko)와 영어(En suffix) 두 버전을 동시에 작성**
  - 예: `personality` (한국어) + `personalityEn` (영어)
  - 단, `hanja`, `relation` 같은 고유명사/분류값은 한국어만

---

## 작업 순서 추천

| 순서 | 항목 | 제미나이 요청 횟수 | 대상 파일 |
|------|------|-----------------|-----------|
| 1 | 60갑자 일주 | 10번 (일간별) | `lib/calculator/saju-result-generator.ts` |
| 2 | 대운-세운 교차 | 1번 | `lib/calculator/saju-result-generator.ts` |
| 3 | 성명+사주 조합 | 1번 | `lib/calculator/result-generator.ts` |
| 4 | 신살 조합 | 2~3번 | `lib/data/saju/sinsal.ts` |
| 5 | 관상 복합 | 1번 | `lib/data/face/features.ts` |

---

## 1. 60갑자 일주 (천간10 × 지지12)

**요청 단위:** 천간 하나씩 6개 묶음 × 10번
**을~계 일간은 [갑] 부분만 바꿔서 10번 반복**

```
너는 한국 전통 사주명리학 전문가야.
아래 TypeScript 인터페이스와 기존 예시를 보고,
[갑] 일간의 6개 일주를 전부 작성해줘.

인터페이스:
interface IljooProfile {
  hanja: string;           // 한자 (예: "甲子")
  nickname: string;        // 별칭 한국어 (예: "지혜의 씨앗형")
  nicknameEn: string;      // 별칭 영어 (예: "Seed of Wisdom")
  personality: string;     // 성격 서술 한국어 3~4문장
  personalityEn: string;   // 성격 서술 영어 3~4문장
  strength: string;        // 강점 한국어 2~3문장
  strengthEn: string;      // 강점 영어 2~3문장
  weakness: string;        // 약점 한국어 2~3문장
  weaknessEn: string;      // 약점 영어 2~3문장
  career: string;          // 적합 직업 한국어 3~5개 + 이유 1문장
  careerEn: string;        // 적합 직업 영어 3~5개 + 이유 1문장
  love: string;            // 연애 스타일 한국어 2문장
  loveEn: string;          // 연애 스타일 영어 2문장
  special: string;         // 이 일주만의 특징 한국어 1문장
  specialEn: string;       // 이 일주만의 특징 영어 1문장
}

작성할 60갑자 목록 (갑 일간):
갑자(甲子), 갑인(甲寅), 갑진(甲辰), 갑오(甲午), 갑신(甲申), 갑술(甲戌)

출력 형식:
export const ILJOO_PROFILES: Record<string, IljooProfile> = {
  '갑자': {
    hanja: '甲子',
    nickname: '...',
    nicknameEn: '...',
    personality: '...',
    personalityEn: '...',
    strength: '...',
    strengthEn: '...',
    weakness: '...',
    weaknessEn: '...',
    career: '...',
    careerEn: '...',
    love: '...',
    loveEn: '...',
    special: '...',
    specialEn: '...',
  },
  '갑인': { ... },
  ...
}

기존 예시 (이 수준의 문체와 길이로 작성):
'갑': {
  personality: '甲木(갑목)은 봄의 새싹이자 곧게 솟는 나무의 기운입니다.
  겉으로는 자신감 넘치고 당당해 보이지만, 내면에는 타인의 인정을
  갈망하는 섬세한 면이 있습니다...',
  strength: '탁월한 추진력과 리더십. 어떤 상황에서도 포기하지 않는 불굴의 의지.',
  weakness: '자기 주장이 너무 강해 협력이 어려울 때가 있음...',
}

주의사항:
- 바넘 효과(너무 일반적)를 피하고 이 일주만의 구체적 특성 서술
- 긍정적 표현 위주이되, 약점은 솔직하게
- 영어는 직역이 아닌 자연스러운 표현으로
- TypeScript 코드로만 출력, 설명 없이
```

---

## 2. 신살 조합 효과

**요청 단위:** 1번에 8~10개 조합

```
너는 한국 전통 사주명리학 전문가야.
아래 신살 조합이 사주에 동시에 존재할 때의 특수 해석을 작성해줘.

출력 인터페이스:
interface SinsalCombo {
  combo: string[];      // 신살 이름 배열 (한국어 고정)
  title: string;        // 조합 제목 한국어 (예: "예술적 방랑자")
  titleEn: string;      // 조합 제목 영어 (예: "The Artistic Wanderer")
  effect: string;       // 조합 효과 한국어 3~4문장
  effectEn: string;     // 조합 효과 영어 3~4문장
  career: string;       // 직업/방향 한국어 2문장
  careerEn: string;     // 직업/방향 영어 2문장
  caution: string;      // 주의사항 한국어 1~2문장
  cautionEn: string;    // 주의사항 영어 1~2문장
}

작성할 조합 목록:
1. 역마살 + 화개살
2. 역마살 + 도화살
3. 도화살 + 귀인
4. 화개살 + 귀인
5. 역마살 + 귀인
6. 백호살 + 역마살
7. 고신살 + 과망살
8. 도화살 + 공망
9. 역마살 + 공망
10. 백호살 + 도화살

현재 신살 개별 설명 (참고):
역마살: 이동과 변화의 기운. 한 곳에 정착하기보다 끊임없이 움직이며 경험을 쌓는 유형
화개살: 예술과 영성의 기운. 종교·철학·예술 분야와 인연이 깊음
도화살: 인기와 매력의 기운. 이성과 대중의 시선을 끄는 강한 끌림의 에너지
귀인(천을귀인): 귀인의 도움을 받는 길한 기운
공망: 특정 영역에서 기운이 약해지는 현상

출력 형식:
export const SINSAL_COMBOS: SinsalCombo[] = [
  {
    combo: ['역마살', '화개살'],
    title: '...',
    titleEn: '...',
    effect: '...',
    effectEn: '...',
    career: '...',
    careerEn: '...',
    caution: '...',
    cautionEn: '...',
  },
  ...
]

주의사항:
- 단순 합산이 아닌 조합의 시너지/충돌 서술
- 구체적 삶의 패턴으로 설명 (예: "30대에 갑자기 귀농하거나...")
- 영어는 직역이 아닌 자연스러운 표현으로
- TypeScript 코드로만 출력, 설명 없이
```

---

## 3. 대운-세운 교차

**요청 단위:** 5×5 = 25개 조합, 한번에 가능

```
너는 한국 전통 사주명리학 전문가야.
대운의 오행과 세운의 오행이 교차할 때의 해석 텍스트를 작성해줘.
오행은 목·화·토·금·수 5가지, 조합은 25가지야.

출력 인터페이스:
interface DaewoonSewoonCombo {
  theme: string;      // 핵심 테마 한국어 (예: "폭발적 성장기")
  themeEn: string;    // 핵심 테마 영어 (예: "Period of Explosive Growth")
  detail: string;     // 구체적 해석 한국어 3~4문장 (직업운·재물운·관계운 포함)
  detailEn: string;   // 구체적 해석 영어 3~4문장
  advice: string;     // 핵심 조언 한국어 1문장
  adviceEn: string;   // 핵심 조언 영어 1문장
}

출력 형식:
export const DAEWOON_SEWOON_CROSS: Record<string, Record<string, DaewoonSewoonCombo>> = {
  '목': {  // 대운 오행
    '목': { theme: '...', themeEn: '...', detail: '...', detailEn: '...', advice: '...', adviceEn: '...' },
    '화': { ... },
    '토': { ... },
    '금': { ... },
    '수': { ... },
  },
  '화': { ... },
  '토': { ... },
  '금': { ... },
  '수': { ... },
}

작성 기준:
- 목-목(같은 오행): 해당 오행 기운 극대화, 과잉 주의
- 목-화(상생): 흐름이 좋고 확장되는 시기
- 목-금(상극): 긴장과 충돌, 변화 압박
- 오행 상생: 목→화→토→금→수→목
- 오행 상극: 목→토, 화→금, 토→수, 금→목, 수→화

주의사항:
- 단순 "좋다/나쁘다"가 아닌 구체적 삶의 변화 서술
- 상극이라도 무조건 부정적이지 않게, 성장의 기회로도 서술
- 영어는 직역이 아닌 자연스러운 표현으로
- TypeScript 코드로만 출력, 설명 없이
```

---

## 4. 성명 오행 + 사주 오행 조합

**요청 단위:** 한번에 가능 (25개 조합)

```
너는 한국 성명학·사주명리학 전문가야.
성명의 수리 오행과 사주 일간 오행이 상생/상극할 때의 해석을 작성해줘.

출력 인터페이스:
interface NameSajuCombo {
  relation: '상생' | '상극' | '비화';  // 관계 (한국어 고정)
  title: string;      // 조합 제목 한국어 (예: "이름이 사주를 키우는 구조")
  titleEn: string;    // 조합 제목 영어 (예: "Name Nurtures Destiny")
  effect: string;     // 구체적 해석 한국어 3~4문장
  effectEn: string;   // 구체적 해석 영어 3~4문장
  advice: string;     // 실용적 조언 한국어 1~2문장
  adviceEn: string;   // 실용적 조언 영어 1~2문장
}

작성할 조합 (사주 오행 → 이름 오행):
목→목(비화), 목→화(상생), 목→토(상극-사주가 극함), 목→금(상극-이름이 극함), 목→수(상생-이름이 생함)
화→화(비화), 화→토(상생), 화→금(상극), 화→수(상극), 화→목(상생)
토→토(비화), 토→금(상생), 토→수(상극), 토→목(상극), 토→화(상생)
금→금(비화), 금→수(상생), 금→목(상극), 금→화(상극), 금→토(상생)
수→수(비화), 수→목(상생), 수→화(상극), 수→금(상생), 수→토(상극)

출력 형식:
export const NAME_SAJU_COMBO: Record<string, Record<string, NameSajuCombo>> = {
  '목': {
    '목': { relation: '비화', title: '...', titleEn: '...', effect: '...', effectEn: '...', advice: '...', adviceEn: '...' },
    '화': { relation: '상생', ... },
    '토': { relation: '상극', ... },
    '금': { relation: '상극', ... },
    '수': { relation: '상생', ... },
  },
  '화': { ... },
  '토': { ... },
  '금': { ... },
  '수': { ... },
}

주의사항:
- 상극이어도 "개명하면 해결" 같은 단순 결론 금지
- 구체적으로 어떤 영역에 영향(직업/재물/건강/관계)이 나타나는지 서술
- 영어는 직역이 아닌 자연스러운 표현으로
- TypeScript 코드로만 출력, 설명 없이
```

---

## 5. 관상 복합 해석

**요청 단위:** 이마2 × 눈2 × 코2 = 8가지 조합, 한번에 가능

```
너는 한국 전통 관상학 전문가야.
얼굴 부위 조합별 종합 해석을 작성해줘.

현재 시스템의 부위별 유형:
- 이마: 넓은 이마(화), 표준 이마(토)
- 눈: 크고 또렷한 눈(화), 가는 눈(금)
- 코: 높은 콧대(금), 부드러운 코(토)

출력 인터페이스:
interface FaceCombo {
  parts: {
    forehead: string;  // '넓은 이마' | '표준 이마' (한국어 고정 - 키값으로 사용)
    eyes: string;      // '크고 또렷한 눈' | '가는 눈'
    nose: string;      // '높은 콧대' | '부드러운 코'
  };
  title: string;          // 관상 유형명 한국어 (예: "두뇌형 리더")
  titleEn: string;        // 관상 유형명 영어 (예: "The Intellectual Leader")
  summary: string;        // 핵심 요약 한국어 1문장
  summaryEn: string;      // 핵심 요약 영어 1문장
  personality: string;    // 성격 해석 한국어 3문장
  personalityEn: string;  // 성격 해석 영어 3문장
  career: string;         // 직업 적성 한국어 2문장
  careerEn: string;       // 직업 적성 영어 2문장
  caution: string;        // 보완점 한국어 1문장
  cautionEn: string;      // 보완점 영어 1문장
}

이마2 × 눈2 × 코2 = 8가지 조합을 전부 작성해줘:
1. 넓은 이마 + 크고 또렷한 눈 + 높은 콧대
2. 넓은 이마 + 크고 또렷한 눈 + 부드러운 코
3. 넓은 이마 + 가는 눈 + 높은 콧대
4. 넓은 이마 + 가는 눈 + 부드러운 코
5. 표준 이마 + 크고 또렷한 눈 + 높은 콧대
6. 표준 이마 + 크고 또렷한 눈 + 부드러운 코
7. 표준 이마 + 가는 눈 + 높은 콧대
8. 표준 이마 + 가는 눈 + 부드러운 코

출력 형식:
export const FACE_COMBOS: FaceCombo[] = [
  {
    parts: { forehead: '넓은 이마', eyes: '크고 또렷한 눈', nose: '높은 콧대' },
    title: '...',
    titleEn: '...',
    summary: '...',
    summaryEn: '...',
    personality: '...',
    personalityEn: '...',
    career: '...',
    careerEn: '...',
    caution: '...',
    cautionEn: '...',
  },
  ...
]

주의사항:
- 외모 비하 절대 금지, 모든 표현 중립적·긍정적
- 각 부위 의미를 단순 합산하지 말고 조합의 시너지 서술
- 영어는 직역이 아닌 자연스러운 표현으로
- TypeScript 코드로만 출력, 설명 없이
```

---

---

# ⚠️ 재작업 요청 - 4번·5번 전면 재작성 (2개 파일 완전히 잘못됨)

> 이전 출력물에서 두 파일이 인터페이스 구조와 데이터 내용 모두 사양과 다르게 작성되었습니다.
> 아래 지시사항을 **정확히** 따라 파일 전체를 새로 작성해 주세요.

---

## ❌ 재작업 A: `lib/data/saju/sinsal-combo.ts` 전면 재작성

### 무엇이 틀렸나

**[오류 1] 인터페이스 구조 완전히 틀림**

이전에 출력한 잘못된 인터페이스:
```typescript
// ❌ 이전 잘못된 코드
export interface SinsalCombo {
  name: string;      // ← 틀림
  nameEn: string;    // ← 틀림 (이런 필드 없음)
  effect: string;
  effectEn: string;
  // title, titleEn, career, careerEn, caution, cautionEn 누락
}
```

**[오류 2] 데이터 내용(조합 목록) 완전히 틀림**

이전에 출력한 잘못된 조합 목록 (이것들은 전부 버려야 함):
- 천을귀인 + 도화살 ← 사양에 없음
- 백호대살 + 괴강살 ← 사양에 없음
- 역마살 + 지살 ← 사양에 없음
- 화개살 + 도화살 ← 사양에 없음
- 홍염살 + 도화살 ← 사양에 없음
- 천을귀인 + 문창귀인 ← 사양에 없음
- 양인살 + 백호대살 ← 사양에 없음
- 현침살 + 귀문관살 ← 사양에 없음
- 고신살(과숙살) + 화개살 ← 사양에 없음
- 건록 + 도화살 ← 사양에 없음

### 올바른 인터페이스 (반드시 이대로)

```typescript
export interface SinsalCombo {
  combo: string[];      // 신살 이름 배열 (한국어 고정, 반드시 배열)
  title: string;        // 조합 제목 한국어
  titleEn: string;      // 조합 제목 영어
  effect: string;       // 조합 효과 한국어 3~4문장
  effectEn: string;     // 조합 효과 영어 3~4문장
  career: string;       // 직업/방향 한국어 2문장
  careerEn: string;     // 직업/방향 영어 2문장
  caution: string;      // 주의사항 한국어 1~2문장
  cautionEn: string;    // 주의사항 영어 1~2문장
}
```

### 올바른 조합 목록 (정확히 이 10개만, 순서 그대로)

```
1. combo: ['역마살', '화개살']
2. combo: ['역마살', '도화살']
3. combo: ['도화살', '귀인']       ← '귀인'은 '천을귀인'을 뜻함
4. combo: ['화개살', '귀인']
5. combo: ['역마살', '귀인']
6. combo: ['백호살', '역마살']
7. combo: ['고신살', '과망살']     ← '과숙살'이 아닌 '과망살'
8. combo: ['도화살', '공망']
9. combo: ['역마살', '공망']
10. combo: ['백호살', '도화살']
```

### 올바른 출력 형식 (이 구조 그대로)

```typescript
export const SINSAL_COMBOS: SinsalCombo[] = [
  {
    combo: ['역마살', '화개살'],
    title: '예술적 방랑자',
    titleEn: 'The Artistic Wanderer',
    effect: '...(한국어 3~4문장)...',
    effectEn: '...(영어 3~4문장)...',
    career: '...(한국어 2문장)...',
    careerEn: '...(영어 2문장)...',
    caution: '...(한국어 1~2문장)...',
    cautionEn: '...(영어 1~2문장)...',
  },
  {
    combo: ['역마살', '도화살'],
    title: '...',
    // ... 나머지 9개도 동일 구조
  },
  // ... 총 10개
];
```

### 작성 기준

- 각 신살의 의미:
  - 역마살: 이동과 변화의 기운, 한 곳에 정착 못 함
  - 화개살: 예술·영성·종교·철학과 인연이 깊음
  - 도화살: 인기·매력·대중의 시선을 끄는 에너지
  - 귀인(천을귀인): 귀인의 도움을 받는 길한 기운
  - 백호살: 강렬한 생사의 기운, 강한 카리스마
  - 고신살: 고독·독립·이별의 기운
  - 과망살: 고립·단절의 기운 (과숙살 아님, 과망살)
  - 공망: 특정 영역에서 기운이 비거나 약해지는 현상
- 단순 합산이 아닌 조합 시너지/충돌 서술
- 구체적 삶의 패턴으로 설명 (예: "30대에 갑자기 귀농하거나...")
- 상극 조합도 무조건 부정적이지 않게, 성장의 기회로도 서술
- TypeScript 코드로만 출력, 설명 없이

---

## ❌ 재작업 B: `lib/data/face/face-combo.ts` 전면 재작성

### 무엇이 틀렸나

**[오류 1] 인터페이스 구조 완전히 틀림**

이전에 출력한 잘못된 인터페이스:
```typescript
// ❌ 이전 잘못된 코드
export interface FaceCombo {
  parts: string[];     // ← 틀림 (배열이 아닌 객체여야 함)
  title: string;
  titleEn: string;
  synergy: string;     // ← 틀림 (이런 필드 없음)
  synergyEn: string;   // ← 틀림 (이런 필드 없음)
  // summary, summaryEn, personality, personalityEn, career, careerEn, caution, cautionEn 전부 누락
}
```

**[오류 2] 데이터 내용(조합 목록) 완전히 틀림**

이전에 출력한 잘못된 조합 (전부 버려야 함):
- 이마 + 눈 ← 2부위 조합, 사양과 다름
- 눈 + 입 ← '입'은 사양에 없는 부위
- 코 + 턱 ← '턱'은 사양에 없는 부위
- 눈썹 + 눈 ← '눈썹'은 사양에 없는 부위
- 귀 + 입 ← '귀', '입' 전부 사양에 없는 부위
- 이마 + 턱 ← '턱'은 사양에 없는 부위
- 관골(광대) + 코 ← '관골'은 사양에 없는 부위
- 미간(인당) + 눈 ← '미간'은 사양에 없는 부위

### 올바른 인터페이스 (반드시 이대로)

```typescript
export interface FaceCombo {
  parts: {
    forehead: string;  // 반드시 '넓은 이마' 또는 '표준 이마' 둘 중 하나
    eyes: string;      // 반드시 '크고 또렷한 눈' 또는 '가는 눈' 둘 중 하나
    nose: string;      // 반드시 '높은 콧대' 또는 '부드러운 코' 둘 중 하나
  };
  title: string;          // 관상 유형명 한국어
  titleEn: string;        // 관상 유형명 영어
  summary: string;        // 핵심 요약 한국어 1문장
  summaryEn: string;      // 핵심 요약 영어 1문장
  personality: string;    // 성격 해석 한국어 3문장
  personalityEn: string;  // 성격 해석 영어 3문장
  career: string;         // 직업 적성 한국어 2문장
  careerEn: string;       // 직업 적성 영어 2문장
  caution: string;        // 보완점 한국어 1문장
  cautionEn: string;      // 보완점 영어 1문장
}
```

### 올바른 조합 목록 (정확히 이 8개만, 순서 그대로)

사용 가능한 값은 다음 3가지 부위, 각 2가지 유형뿐 - 다른 값 절대 사용 금지:
- forehead: `'넓은 이마'` 또는 `'표준 이마'`
- eyes: `'크고 또렷한 눈'` 또는 `'가는 눈'`
- nose: `'높은 콧대'` 또는 `'부드러운 코'`

```
1. { forehead: '넓은 이마', eyes: '크고 또렷한 눈', nose: '높은 콧대' }
2. { forehead: '넓은 이마', eyes: '크고 또렷한 눈', nose: '부드러운 코' }
3. { forehead: '넓은 이마', eyes: '가는 눈',       nose: '높은 콧대' }
4. { forehead: '넓은 이마', eyes: '가는 눈',       nose: '부드러운 코' }
5. { forehead: '표준 이마', eyes: '크고 또렷한 눈', nose: '높은 콧대' }
6. { forehead: '표준 이마', eyes: '크고 또렷한 눈', nose: '부드러운 코' }
7. { forehead: '표준 이마', eyes: '가는 눈',       nose: '높은 콧대' }
8. { forehead: '표준 이마', eyes: '가는 눈',       nose: '부드러운 코' }
```

### 올바른 출력 형식 (이 구조 그대로)

```typescript
export const FACE_COMBOS: FaceCombo[] = [
  {
    parts: { forehead: '넓은 이마', eyes: '크고 또렷한 눈', nose: '높은 콧대' },
    title: '두뇌형 리더',
    titleEn: 'The Intellectual Leader',
    summary: '...(한국어 1문장)...',
    summaryEn: '...(영어 1문장)...',
    personality: '...(한국어 3문장)...',
    personalityEn: '...(영어 3문장)...',
    career: '...(한국어 2문장)...',
    careerEn: '...(영어 2문장)...',
    caution: '...(한국어 1문장)...',
    cautionEn: '...(영어 1문장)...',
  },
  {
    parts: { forehead: '넓은 이마', eyes: '크고 또렷한 눈', nose: '부드러운 코' },
    // ... 동일 구조
  },
  // ... 총 8개 (위 목록 순서 그대로)
];
```

### 각 부위 의미 참고 (조합 시너지 작성용)

- 넓은 이마(화): 지적 능력, 선견지명, 초년 복, 기획력
- 표준 이마(토): 안정감, 현실감각, 꾸준함, 중용
- 크고 또렷한 눈(화): 통찰력, 감수성, 표현력, 개방성
- 가는 눈(금): 분석력, 신중함, 집중력, 실용성
- 높은 콧대(금): 자존심, 재물운, 독립심, 추진력
- 부드러운 코(토): 포용력, 협동심, 유연성, 안정지향

### 작성 기준

- 3개 부위 각각의 의미를 단순 합산하지 말고 조합의 화학반응·시너지를 서술
- 외모 비하 표현 절대 금지, 모든 유형 긍정적·중립적으로
- caution은 단점 지적이 아닌 "더 발전하려면" 방향으로 서술
- TypeScript 코드로만 출력, 설명 없이

---

## 최종 확인 체크리스트 (출력 전 자가 검증)

재작업 완료 후 제출 전에 반드시 확인:

- [ ] `sinsal-combo.ts`: `combo`가 `string[]` 배열인가? (`name: string` 아님)
- [ ] `sinsal-combo.ts`: `title`, `titleEn`, `career`, `careerEn`, `caution`, `cautionEn` 9개 필드 전부 있는가?
- [ ] `sinsal-combo.ts`: 조합이 정확히 10개인가?
- [ ] `sinsal-combo.ts`: 역마살+화개살로 시작해 백호살+도화살로 끝나는가?
- [ ] `face-combo.ts`: `parts`가 `{ forehead, eyes, nose }` 객체인가? (`string[]` 배열 아님)
- [ ] `face-combo.ts`: `summary`, `personality`, `career`, `caution` (ko+En) 8개 필드 전부 있는가?
- [ ] `face-combo.ts`: 조합이 정확히 8개인가?
- [ ] `face-combo.ts`: forehead/eyes/nose 값이 지정된 4개의 한국어 문자열만 사용했는가?
