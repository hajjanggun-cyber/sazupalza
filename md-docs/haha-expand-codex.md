# Codex 작업 지시서: 자원오행(字源五行) 구현

## 개요

성명학 결과 페이지에 **자원오행(字源五行)** 분석을 추가한다.
현재는 소리오행(음오행, 초성 기반)만 표시되어 있으며,
자원오행(획수 기반)을 새로 계산하고 UI에 표시해야 한다.

---

## 자원오행 규칙

각 글자의 획수 끝자리(1의 자리)로 오행을 결정한다:

| 획수 끝자리 | 오행 |
|------------|------|
| 1, 6       | 수(水) |
| 2, 7       | 화(火) |
| 3, 8       | 목(木) |
| 4, 9       | 금(金) |
| 0, 5       | 토(土) |

예시:
- 획수 7 → 끝자리 7 → **화(火)**
- 획수 12 → 끝자리 2 → **화(火)**
- 획수 11 → 끝자리 1 → **수(水)**
- 획수 9 → 끝자리 9 → **금(金)**
- 획수 10 → 끝자리 0 → **토(土)**
- 획수 5 → 끝자리 5 → **토(土)**

---

## 수정할 파일: 2개

### 파일 1: `lib/calculator/name-calculator.ts`

#### 변경 1A: `NameAnalysisResult` 인터페이스에 필드 2개 추가

기존 인터페이스 (line 6~22):
```typescript
export interface NameAnalysisResult {
  name: string;
  strokes: number[];
  totalStrokes: number;
  wongyeok: number;
  hyeongyeok: number;
  igyeok: number;
  jeonggyeok: number;
  soundOhaengList: string[];
  soundOhaengRelation: string;
  suriAnalysis: {
    wongyeok: { number: number; name: string; rating: string; summary: string };
    hyeongyeok: { number: number; name: string; rating: string; summary: string };
  };
  score: number;
  summary: string;
}
```

수정 후:
```typescript
export interface NameAnalysisResult {
  name: string;
  strokes: number[];
  totalStrokes: number;
  wongyeok: number;
  hyeongyeok: number;
  igyeok: number;
  jeonggyeok: number;
  soundOhaengList: string[];
  soundOhaengRelation: string;
  jawonohaengList: string[];    // 자원오행 리스트 (획수 기반)
  jawonohaengRelation: string;  // 자원오행 상생/상극/중화
  suriAnalysis: {
    wongyeok: { number: number; name: string; rating: string; summary: string };
    hyeongyeok: { number: number; name: string; rating: string; summary: string };
  };
  score: number;
  summary: string;
}
```

#### 변경 1B: `calculateName` 함수 내부 — 자원오행 계산 로직 추가

`// 소리오행 분석` 블록(line 104~110) **바로 아래**에 다음 코드를 삽입한다:

```typescript
  // 자원오행 분석 (획수 끝자리 기반)
  const strokeToOhaeng = (s: number): string => {
    const last = s % 10;
    if (last === 1 || last === 6) return '수';
    if (last === 2 || last === 7) return '화';
    if (last === 3 || last === 8) return '목';
    if (last === 4 || last === 9) return '금';
    return '토';
  };
  const jawonohaengList = strokes.map(strokeToOhaeng);
  const jawonohaengRelation = analyzeSoundRelation(jawonohaengList);
```

#### 변경 1C: `return` 문에 두 필드 추가

기존 return 문 (line 130~156):
```typescript
  return {
    name,
    strokes,
    totalStrokes,
    wongyeok,
    hyeongyeok,
    igyeok,
    jeonggyeok,
    soundOhaengList,
    soundOhaengRelation,
    suriAnalysis: {
      ...
    },
    score,
    summary,
  };
```

수정 후 — `soundOhaengRelation,` 바로 뒤에 두 줄 추가:
```typescript
  return {
    name,
    strokes,
    totalStrokes,
    wongyeok,
    hyeongyeok,
    igyeok,
    jeonggyeok,
    soundOhaengList,
    soundOhaengRelation,
    jawonohaengList,
    jawonohaengRelation,
    suriAnalysis: {
      wongyeok: {
        number: wongyeokSuri.number,
        name: wongyeokSuri.name,
        rating: wongyeokSuri.rating,
        summary: wongyeokSuri.summary,
      },
      hyeongyeok: {
        number: hyeongyeokSuri.number,
        name: hyeongyeokSuri.name,
        rating: hyeongyeokSuri.rating,
        summary: hyeongyeokSuri.summary,
      },
    },
    score,
    summary,
  };
```

---

### 파일 2: `app/[locale]/seongmyeong-result/[id]/page.tsx`

#### 변경 위치

소리오행 섹션 (`{/* 소리오행 흐름 */}`, 약 line 242~274) **바로 뒤**,
4격 수리 섹션 (`{/* 4격 수리 */}`, 약 line 276) **바로 앞**에
자원오행 섹션을 삽입한다.

삽입할 JSX 코드 (아래 코드 전체를 붙여넣기):

```tsx
                        {/* 자원오행 흐름 */}
                        <div className="card-dark p-5 mb-6">
                            <h2 className="text-base font-bold text-yellow-300 mb-1">✏️ 자원오행(字源五行) 흐름</h2>
                            <p className="text-yellow-200/50 text-xs mb-4">각 글자의 획수 끝자리로 결정되는 오행입니다</p>
                            <div className="flex items-center justify-center gap-1 flex-wrap">
                                {inputData.name?.split('').map((char, i) => {
                                    const stroke = koResult!.strokes[i] || 0;
                                    const ohaeng = koResult!.jawonohaengList[i];
                                    return (
                                        <div key={i} className="flex flex-col items-center">
                                            <div className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center ${
                                                ohaeng === '목' ? 'text-green-400 bg-green-900/20 border-green-500/40' :
                                                ohaeng === '화' ? 'text-red-400 bg-red-900/20 border-red-500/40' :
                                                ohaeng === '토' ? 'text-yellow-400 bg-yellow-900/20 border-yellow-500/40' :
                                                ohaeng === '금' ? 'text-gray-300 bg-gray-800/30 border-gray-500/40' :
                                                ohaeng === '수' ? 'text-blue-400 bg-blue-900/20 border-blue-500/40' :
                                                'border-yellow-700/20 bg-white/5 text-yellow-100'
                                            }`}>
                                                <span className="text-xl font-bold text-yellow-100">{char}</span>
                                                <span className="text-xs">{ohaeng || '—'}</span>
                                            </div>
                                            <span className="text-yellow-200/50 text-xs mt-1">{stroke}획</span>
                                            {i < (inputData.name?.length || 0) - 1 && (
                                                <span className={`text-lg mt-1 ${
                                                    koResult!.jawonohaengRelation.includes('상생') ? 'text-green-400' :
                                                    koResult!.jawonohaengRelation.includes('상극') ? 'text-red-400' :
                                                    'text-yellow-600'
                                                }`}>
                                                    {koResult!.jawonohaengRelation.includes('상생') ? '→' :
                                                     koResult!.jawonohaengRelation.includes('상극') ? '╳' : '—'}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={`mt-4 rounded-lg px-4 py-3 text-center text-sm ${
                                koResult!.jawonohaengRelation.includes('상생') ? 'bg-green-900/20 border border-green-700/30 text-green-300' :
                                koResult!.jawonohaengRelation.includes('상극') ? 'bg-red-900/20 border border-red-700/30 text-red-300' :
                                'bg-yellow-900/20 border border-yellow-700/30 text-yellow-300'
                            }`}>
                                <strong>{koResult!.jawonohaengRelation}</strong> —
                                {koResult!.jawonohaengRelation.includes('상생') ? ' 획수 기운이 서로 보완하는 이상적인 흐름입니다' :
                                 koResult!.jawonohaengRelation.includes('상극') ? ' 획수 기운에 긴장이 있으나 강한 의지력의 원천이 됩니다' :
                                 ' 획수 기운이 균형 잡힌 중립적인 관계입니다'}
                            </div>
                        </div>
```

---

## 삽입 위치 정확한 앵커

`page.tsx`에서 아래 코드 블록을 찾는다:

```tsx
                        {/* 4격 수리 */}
                        <div className="card-dark p-5 mb-6">
                            <h2 className="text-base font-bold text-yellow-300 mb-4">📐 4격(格) 수리 배치</h2>
```

이 `{/* 4격 수리 */}` 주석 **바로 위**에 자원오행 섹션 JSX를 삽입한다.

---

## 점수(score) 계산에 자원오행 반영 (선택 사항)

현재 점수 계산 (name-calculator.ts line 116~123):
```typescript
  const ratingScore: Record<string, number> = {
    great: 90, good: 75, neutral: 60, caution: 40, avoid: 20
  };
  const wonScore = ratingScore[wongyeokSuri.rating] || 60;
  const hyScore = ratingScore[hyeongyeokSuri.rating] || 60;
  const soundScore = soundOhaengRelation.includes('상생') ? 90 : soundOhaengRelation.includes('중화') ? 70 : 50;
  const score = Math.round((wonScore * 0.4 + hyScore * 0.4 + soundScore * 0.2));
```

자원오행을 점수에 반영하려면 다음과 같이 수정한다
(소리오행과 자원오행을 각각 10%씩 반영):

```typescript
  const ratingScore: Record<string, number> = {
    great: 90, good: 75, neutral: 60, caution: 40, avoid: 20
  };
  const wonScore = ratingScore[wongyeokSuri.rating] || 60;
  const hyScore = ratingScore[hyeongyeokSuri.rating] || 60;
  const soundScore = soundOhaengRelation.includes('상생') ? 90 : soundOhaengRelation.includes('중화') ? 70 : 50;
  const jawonScore = jawonohaengRelation.includes('상생') ? 90 : jawonohaengRelation.includes('중화') ? 70 : 50;
  const score = Math.round((wonScore * 0.4 + hyScore * 0.3 + soundScore * 0.15 + jawonScore * 0.15));
```

**이 변경은 선택 사항이다.** 점수 가중치를 바꾸면 기존 사용자 결과가 달라지므로
일단 점수는 그대로 두고, 자원오행을 표시만 해도 충분하다.
Codex가 판단해서 적용 여부를 결정할 것.

---

## TypeScript 오류 방지 주의사항

1. `page.tsx`에서 `koResult!.jawonohaengList`와 `koResult!.jawonohaengRelation`을 사용할 때
   `koResult`가 null일 수 있으므로 이미 `{isKo && koResult && (<>...</>)}` 블록 안에서만
   사용하면 된다. 단, 내부에서 non-null assertion `!`이 필요할 경우 `koResult!.` 사용.

2. `name-calculator.ts`의 `analyzeSoundRelation` 함수를 자원오행에도 재사용하므로
   함수명을 바꾸거나 복사할 필요 없다. 그대로 호출한다.

3. `estimateStrokeCount` (hoeksu.ts)를 별도로 import할 필요 없다.
   이미 `name-calculator.ts`의 `estimateStrokes` 함수로 계산된 `strokes` 배열을
   그대로 재사용한다.

---

## 검증 체크리스트

작업 완료 후 다음을 확인한다:

- [ ] `npx tsc --noEmit` 실행 시 TypeScript 오류 없음
- [ ] `lib/calculator/name-calculator.ts`의 `NameAnalysisResult` 인터페이스에
      `jawonohaengList: string[]`와 `jawonohaengRelation: string` 추가됨
- [ ] `calculateName` 함수가 `jawonohaengList`, `jawonohaengRelation`을 return함
- [ ] `app/[locale]/seongmyeong-result/[id]/page.tsx`의 한국어 섹션에
      소리오행 섹션과 4격 수리 섹션 **사이**에 자원오행 섹션이 표시됨
- [ ] 자원오행 섹션에서 각 글자 아래 획수(n획)가 표시됨
- [ ] 자원오행 섹션에서 오행 색상이 소리오행과 동일한 컬러 시스템을 사용함
      (목=초록, 화=빨강, 토=노랑, 금=회색, 수=파랑)
- [ ] 영어 섹션(`!isKo` 블록)은 건드리지 않음 (자원오행은 한국어 전용)

---

## 수정 금지 사항

- 소리오행 섹션 코드를 건드리지 말 것
- 4격 수리 섹션 코드를 건드리지 말 것
- 영어(numerology) 섹션을 건드리지 말 것
- 기존 `score` 계산 가중치는 건드리지 말 것 (선택 사항이므로)
- `estimateStrokes` 함수나 기존 `strokes` 계산 로직을 바꾸지 말 것
