# Antigravity (Claude Sonnet 4.6) 작업 보고서
> 작성일: 2026-02-24 | 작성 AI: Antigravity (Claude claude-sonnet-4-5)

---

## 🔍 오늘 수행한 분석 및 수정 내역

### 1. 문제 진단 — 사이트 영문 MBTI 섹션 비어있음

**증상:**
- `https://sajupalza.cc/en/mbti/saju-five-elements` 접속 시 본문 내용이 없음
- 제목이 한국어(`MBTI와 사주 오행: 16가지 성격 유형과 오행의 상관관계`)로 표시됨
- 관련 글 링크 제목도 한국어
- 날짜(`2026-02-22 · MBTI`)가 여전히 표시됨 (제미나이가 삭제했다고 했으나 미반영)

**원인 추적 과정:**
1. 실제 사이트 HTTP 내용 분석
2. 로컬 소스코드(`mbti-posts.ts`, `BlogPostPage.tsx`) 확인
3. git log 확인 → 로컬 코드와 배포 사이트 내용이 다름을 확인
4. TypeScript 오류 검사 실행 → **근본 원인 발견!**

---

### 2. 🎯 근본 원인 — TypeScript 빌드 오류 9개

```
lib/blog/bokhap-posts.ts(14,5): error TS2322
  Type '"bokhap"' is not assignable to type '"saju" | "name-reading" | "face-reading" | "mbti" | "compatibility"'

lib/blog/seongmyeong-posts.ts(14,5): error TS2322
  Type '"seongmyeong"' is not assignable to type ... (6개)
```

**왜 문제가 됐나:**
- `bokhap-posts.ts` → `category: 'bokhap'` 사용
- `seongmyeong-posts.ts` → `category: 'seongmyeong'` 사용
- `lib/blog/types.ts`에는 이 카테고리들이 정의 안 됨
- → Vercel 빌드 **매번 실패** → 마지막 성공 빌드(구버전) 계속 서빙
- → 제미나이가 아무리 코드 고쳐도 사이트에 전혀 반영 안 됨!

---

### 3. ✅ 수정 완료 내역

#### 커밋 1: `925912b`
**파일:** `lib/blog/types.ts`

```typescript
// 수정 전
category: 'saju' | 'name-reading' | 'face-reading' | 'mbti' | 'compatibility';

// 수정 후
category: 'saju' | 'name-reading' | 'face-reading' | 'mbti' | 'compatibility' | 'bokhap' | 'seongmyeong' | 'gwansang';
```
→ TypeScript 빌드 오류 9개 → **0개** 해결

---

#### 커밋 2: `84776fb`
**파일:** `components/steps/Step4Time.tsx`, `components/steps/Step5Photo.tsx`

제미나이가 로케일 판별을 위해 사용한 꼼수 코드 교체:

```typescript
// 수정 전 (제미나이 꼼수 - 런타임 오류 위험)
const isEn = t('nav.logo') === 'SajuPalza';

// 수정 후 (공식 next-intl 방식)
const locale = useLocale();
const isEn = locale !== 'ko';
```
→ 런타임 오류 방지, 코드 안정성 향상

---

### 4. 현재 상태 (2026-02-24 17:00 기준)

```
GitHub: ✅ push 완료 (HEAD: 84776fb)
Vercel: ⏳ 빌드 진행 중 또는 완료 대기
사이트: ❌ 아직 구버전 서빙 중
```

**집에서 확인할 것:**
- Vercel 대시보드 → sazupalza 프로젝트 → 최신 배포 상태
- ✅ Ready: 사이트 접속해서 영문 본문 확인
- ❌ Error: 빌드 로그 에러 내용 확인 후 다음 세션에 수정

---

## 📋 앞으로 수정해야 할 것들

### 🔴 최우선 (빌드 성공 후 확인)

1. **Vercel 빌드 성공 여부 확인**
   - 성공하면: `/en/mbti` 및 하위 페이지 영문 표시 확인
   - 실패하면: 빌드 로그 에러 캡처 → 추가 수정 필요

2. **영문 메타 태그 확인**
   - `/en/mbti/saju-five-elements` 페이지의 `<title>` 태그가 한국어로 배포됨
   - `seoTitleEn`이 제대로 반영되는지 확인 필요

---

### 🟡 이후 수정 필요 (우선순위 높음)

3. **`BlogPostPage.tsx` 날짜 표시 문제**
   - 현재 사이트에서 `2026-02-22 · MBTI` 형식으로 날짜가 표시됨
   - 제미나이가 삭제했다고 했으나 미반영 상태
   - 빌드 성공 후 사이트 확인 필요. 만약 여전히 보이면 → `BlogPostPage.tsx` 재확인

4. **관련 글 제목 영문화 확인**
   - 현재 사이트: `[→ MBTI 유래]`, `[→ MBTI 궁합 완전정복]` (한국어)
   - `mbti-posts.ts`의 `relatedPosts`에는 영문 title이 있음
   - 빌드 성공 후 자동 해결될 가능성 높음

5. **전체 카테고리 영문 페이지 점검**
   - `/en/saju/*`, `/en/name/*`, `/en/face/*` 등 다른 섹션도 동일 점검 필요

---

### 🟢 중장기 작업 (선택적)

6. **`result-generator.ts` 영문화 완성도 검증**
   - 분석 결과 페이지(`/en/result/[id]`)의 영문 출력 품질 확인
   - 수호신 메시지, 직업 분석, 오행 설명 등의 번역 품질 검토

7. **일본어/중국어(ja/zh) 지원**
   - 현재 ko/en만 실질적으로 지원
   - `messages/ja.json`, `messages/zh.json` 내용 보강 필요

8. **광고(AdSense) 실적 확인**
   - 사이트가 정상 작동하는지 확인 후 광고 노출 점검

---

## 💡 다음 세션에서 AI에게 전달할 것

```
Vercel 빌드 결과:
- ✅ 성공 시: "빌드 성공, /en/mbti 페이지 영문 표시 확인. 
   이제 [남은 문제들] 수정해줘"
- ❌ 실패 시: "빌드 에러 로그: [로그 내용]"
```

---

## 📂 오늘 수정된 파일 목록

| 파일 경로 | 수정 내용 |
|---|---|
| `lib/blog/types.ts` | category 유니온 타입에 bokhap, seongmyeong, gwansang 추가 |
| `components/steps/Step4Time.tsx` | useLocale() 교체, en 필드 추가 |
| `components/steps/Step5Photo.tsx` | useLocale() 교체, 관상 영문 처리 |

---

> 📝 **메모**: 제미나이는 코드를 수정했지만 Vercel 빌드가 계속 실패하는 원인(types.ts 타입 불일치)을 찾지 못했음. 
> 앞으로 새 카테고리를 추가할 때는 **반드시 `lib/blog/types.ts`의 category 유니온에도 추가**할 것!
