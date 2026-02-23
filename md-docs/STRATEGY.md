# 전략 보완 문서 v1.0
# (GPT + Gemini + Claude 분석 통합)
# GUIDE.md + BLOG-PROMPT.md와 함께 사용

---

## 이 문서 사용법

```
GUIDE.md       → 전체 구조/설정
BLOG-PROMPT.md → 블로그 글 + 데이터 파일
이 문서        → 전략/디자인/SEO 고도화
```

Claude CLI에서:
"GUIDE.md와 STRATEGY.md를 읽고
 두 파일의 내용을 모두 반영해서 만들어줘"

---

## 1. 포지셔닝 전략

### 한국어 타겟 키워드
```
전환성 키워드 (메인 페이지 집중)
→ 무료 사주풀이
→ 사주 무료 보기
→ 무료 관상 보기
→ 이름 운세 무료
→ 무료 사주 (검색량 최고)

정보성 키워드 (블로그 글 집중)
→ 사주팔자란 무엇인가
→ 관상 보는 법
→ MBTI 궁합
→ 음력 생일 사주
→ 사주 용신 찾기
```

### 영어권 타겟 키워드
```
메인 공략 키워드
→ Korean astrology (검색량 높음)
→ Four Pillars of Destiny
→ Bazi reading (중화권 + 서구권)
→ Face reading AI
→ Asian fortune reading
→ Free saju reading
→ Korean fortune telling free

주의사항:
→ "Saju" 단독 사용 금지 (검색량 낮음)
→ 반드시 "Korean" 또는 "Four Pillars"와 함께
→ "Bazi"는 중화권에서 사주와 동일 개념
   → 영어 페이지에 Bazi도 함께 표기 권장
```

### 검색 의도별 페이지 분리 (중요)
```
정보성 키워드 → 블로그 글 페이지로 공략
               "사주팔자란 무엇인가" 검색
               → 블로그 글 유입
               → 본문 중간 CTA 버튼 클릭
               → 메인 페이지 이동

전환성 키워드 → 메인 페이지로 공략
               "무료 사주풀이" 검색
               → 메인 페이지 직접 유입
               → 바로 분석 시작

이 두 가지를 혼용하면 SEO 희석됨
반드시 페이지별로 분리해서 공략
```

---

## 2. UI/UX 디자인 컨셉: Modern Mystic

### 핵심 방향
```
전통 무속 느낌 ❌ → Modern Mystic ✅

색상:
→ 메인: 딥 네이비 (#0F0C29)
→ 포인트: 골드 그라데이션 (#C8860A ~ #F5D77E)
→ 배경: 다크 그라데이션
   (#0F0C29 → #302B63 → #24243E)
→ 텍스트: 화이트 + 연한 골드

느낌:
→ 애플 스타일 미니멀 + 신비로운 그라데이션
→ 50대 ~ MZ세대 모두 거부감 없이 접근
→ 영어권에서도 세련되게 보임
```

### Face ID 스타일 스캔 애니메이션
```
구현 방법: Lottie Files 사용 (무료)
→ lottiefiles.com에서 무료 애니메이션 다운로드
→ "face scan" "face recognition" 검색
→ Next.js에 lottie-react 라이브러리로 적용

npm install lottie-react

효과:
→ "이 앱이 뭔가 대단한 기술을 쓰는 것 같다"
→ 기술적 신뢰도 상승
→ 체류시간 증가

사용 위치:
→ Step 5 사진 입력 단계
→ 카메라 촬영 시 스캔 애니메이션 오버레이
→ 분석 중 로딩 화면
```

### Claude CLI 프롬프트
```
components/FaceScan.tsx 컴포넌트를 만들어줘.

lottie-react 라이브러리 사용
얼굴 스캔 애니메이션 컴포넌트

[기능]
- 카메라 미리보기 위에 스캔 라인 애니메이션 오버레이
- 스캔 완료 시 "분석 완료" 텍스트 표시
- 딥 네이비 배경 (#0F0C29)
- 골드 색상 스캔 라인 (#F5D77E)

[Lottie 애니메이션]
- public/animations/face-scan.json 파일 사용
- lottiefiles.com에서 무료 다운로드 후 저장
- 루프 재생

모바일 우선 반응형 Tailwind CSS
```

---

## 3. 개인화 결과 페이지 URL (수익 + SEO 핵심)

### 왜 중요한가
```
기존 설계
내사이트.com/result → 모든 사람 같은 URL
→ 공유 불가 → 바이럴 없음

개선안
내사이트.com/result/ab3x9k → 고유 URL
→ 카카오톡/인스타 공유 가능
→ 공유된 링크 = 백링크 = SEO 상승
→ 친구 클릭 → 유입 → 광고 노출
→ 완전 무료 바이럴 마케팅
```

### 구현 방법
```
서버 저장 없이 구현하는 방법:
→ 입력값을 URL-safe Base64로 인코딩
→ URL에 포함시키기
→ 결과 페이지에서 디코딩해서 재계산

예시:
입력: 이름=홍길동, 생일=1990-03-15, MBTI=INTJ
인코딩: 내사이트.com/result/aG9uZy0xOTkw...

장점:
→ 서버 저장 없음 (개인정보 정책 유지)
→ URL 공유 가능
→ 같은 URL = 항상 같은 결과 (신뢰도)
```

### Claude CLI 프롬프트
```
결과 페이지를 개인화 URL 방식으로 구현해줘.

app/[locale]/result/[id]/page.tsx

[구현 방법]
1. 입력값을 URL-safe Base64로 인코딩
2. /result/[인코딩된값] URL 생성
3. 결과 페이지에서 URL 파라미터 디코딩
4. 디코딩된 값으로 분석 재실행
5. 항상 같은 입력 = 항상 같은 결과

[주의사항]
- 서버에 저장하지 않음 (개인정보 정책 유지)
- URL이 너무 길어지지 않게 최소 정보만 인코딩
- 이름/생년월일/MBTI/시간 여부만 인코딩

[공유 버튼]
- 카카오톡 공유 버튼 (Web Share API, 무료)
- 링크 복사 버튼
- 공유 시 OG 이미지 자동 생성

서버리스, Next.js App Router, TypeScript
```

---

## 4. SNS 공유 최적화 OG 이미지

### 공유 시 보이는 화면 설계
```
카카오톡/인스타/X(트위터)에서
링크 공유 시 자동으로 보이는 이미지:

┌─────────────────────────────┐
│  🔮 나의 종합 운세 분석     │
│                             │
│  경금일간 · INTJ · 이름82점 │
│                             │
│  종합 운세 점수             │
│  ████████████  82점         │
│                             │
│  → 나도 무료로 분석받기     │
│  내사이트.com               │
└─────────────────────────────┘

효과:
→ 공유 자체가 광고 효과
→ 호기심 유발 → 클릭률 극대화
→ 자연스러운 바이럴
```

### Claude CLI 프롬프트
```
결과 페이지에 동적 OG 이미지를 추가해줘.

app/[locale]/result/[id]/opengraph-image.tsx

[OG 이미지 내용]
- 배경: 딥 네이비 그라데이션
- 상단: "🔮 나의 종합 운세 분석" (골드 텍스트)
- 중간: 일간 + MBTI + 이름 점수 표시
- 하단: 종합 점수 바 + 사이트 URL
- 크기: 1200x630 (표준 OG 크기)

[공유 버튼]
- 카카오톡 공유: window.Kakao 없이
  navigator.share() Web Share API 사용 (무료)
- 링크 복사 버튼
- 클릭 시 "복사됨!" 피드백

Next.js의 ImageResponse 사용
```

---

## 5. 로딩 화면 연출 (신뢰도 상승)

### 단순 스피너 → 분석 과정 표시
```
분석 중 로딩 화면:

"📊 사주 계산 중...       ✓ 완료"
"📝 성명학 분석 중...     ✓ 완료"
"👁 관상 데이터 매핑 중... ✓ 완료"
"🧠 MBTI 교차 분석 중...  ✓ 완료"
"✨ 종합 리포트 생성 중..."

효과:
→ "뭔가 대단한 걸 분석하는 느낌"
→ 기술적 신뢰도 상승
→ 이탈률 감소
→ 기대감 상승 → 결과 페이지 집중도 향상
```

### Claude CLI 프롬프트
```
components/AnalysisLoading.tsx 컴포넌트를 만들어줘.

[단계별 로딩 표시]
입력된 항목만 표시 (선택 미입력 항목 제외)

항목별 순서:
1. "사주 계산 중..." → 800ms 후 "✓ 완료"
2. "성명학 분석 중..." → 600ms 후 "✓ 완료"
3. "관상 매핑 중..." → (사진 있을 때만)
4. "MBTI 교차 분석 중..." → (MBTI 있을 때만)
5. "종합 리포트 생성 중..." → 완료 후 결과 페이지 이동

[디자인]
- 배경: 딥 네이비 (#0F0C29)
- 텍스트: 화이트
- 완료 체크: 골드 (#F5D77E)
- 각 항목 페이드인 애니메이션
- 진행 상태바 하단에 표시

Tailwind CSS, 모바일 우선 반응형
```

---

## 6. 오행별 수호신 이미지 (API 없이 구현)

### 유료 API 없이 구현하는 방법
```
방법: 미리 제작한 이미지를 오행 조합에 매핑

오행 조합별 이미지 (25가지)
목(木) 강한 타입 → 청룡 이미지
화(火) 강한 타입 → 봉황 이미지
토(土) 강한 타입 → 황룡 이미지
금(金) 강한 타입 → 백호 이미지
수(水) 강한 타입 → 현무 이미지
목화 균형 타입 → ...
(오행 조합에 따라 25~30개 이미지 준비)

제작 방법:
→ 무료 이미지 생성 도구로 1회 제작
   (Bing Image Creator, Adobe Firefly 무료 플랜 등)
→ 프롬프트: "Korean mythical creature,
   watercolor style, mystical, modern minimal"
→ WebP 변환 후 public/images/guardians/ 저장
→ 한 번만 만들면 이후 비용 0원
```

### Claude CLI 프롬프트
```
lib/data/guardian.ts 파일을 만들어줘.

오행 조합별 수호신 이미지 매핑 데이터

[구조]
- 주요 오행 기준으로 5가지 기본 수호신
  목(木) → 청룡 (blue-dragon)
  화(火) → 봉황 (phoenix)
  토(土) → 황룡 (golden-dragon)
  금(金) → 백호 (white-tiger)
  수(水) → 현무 (black-tortoise)

- 이미지 경로: /images/guardians/[이름].webp
- 수호신 이름 (한국어/영어)
- 수호신 특성 설명 (100자)
- 개운 메시지 (50자)

결과 페이지 하단에:
"🔮 당신의 수호신: 백호"
이미지 + 설명 + 개운 메시지 표시

TypeScript export const 형식
```

---

## 7. MBTI + 사주 융합 콘텐츠 (킬러 콘텐츠)

### 왜 중요한가
```
기존 시장에 없는 차별화된 콘텐츠
→ 구글이 'Unique Content'로 높은 점수 부여
→ 타 사이트에서 복사 불가
→ 자연스러운 백링크 유입
```

### 추가할 블로그 글 주제 (기존 30개 외 추가)
```
31. MBTI ENFP + 재다신약 사주 → 에너지는 넘치지만 실속 부족 타입
32. MBTI INTJ + 경금 일간 → 냉철한 전략가의 완벽한 조합
33. MBTI INFP + 을목 일간 → 감수성 풍부한 예술가 타입
34. MBTI ESTJ + 무토 일간 → 타고난 관리자의 현실적 리더십
35. 사주 일간별 MBTI 분포 분석 → 갑목 일간은 ENTJ가 많다?

이 시리즈:
→ "MBTI + 사주" 조합 키워드 선점
→ 영어로도 번역 시 글로벌 트래픽 확보
→ SNS 공유 유발 ("나 이거 완전 맞아!")
```

---

## 8. 연도별 운세 페이지 전략

### 매년 반복되는 트래픽 황금 전략
```
매년 11~12월에 다음 해 페이지 미리 게시:

한국어:
→ app/[locale]/saju/2026-fortune/page.tsx
→ "2026년 병오년 띠별 운세 완벽 정리"
→ "2026년 사주로 보는 직업운/재물운/연애운"

영어:
→ "2026 Korean Astrology Forecast"
→ "2026 Four Pillars Yearly Fortune"

효과:
→ 매년 새 트래픽 폭발 (1~2월 집중)
→ 기존 사용자 재방문 유도
→ 광고 수익 연간 반복
→ 경쟁사 대비 먼저 올리면 선점 효과
```

---

## 9. 핵심 SEO 보완 사항

### 메타데이터 강화
```
모든 페이지 generateMetadata()에 추가:

영어 페이지 title 예시:
"Free Korean Four Pillars Reading | Saju Analysis"

영어 페이지 description 예시:
"Get your free Korean astrology (Saju) reading.
Combine Four Pillars of Destiny, face reading,
name numerology and MBTI for complete analysis."

한국어 페이지 title 예시:
"무료 사주풀이 | 사주+관상+성명학+MBTI 통합 분석"
```

### 구조화 데이터 추가
```
모든 블로그 글에 JSON-LD 추가:
→ Article 스키마
→ FAQPage 스키마 (FAQ 섹션)
→ BreadcrumbList 스키마

메인 페이지:
→ WebApplication 스키마
→ Organization 스키마

효과:
→ 구글 리치 결과 노출 가능
→ CTR(클릭률) 30~50% 상승
```

### Claude CLI 프롬프트
```
app/[locale]/saju/page.tsx에
JSON-LD 구조화 데이터를 추가해줘.

[추가할 스키마]
1. Article 스키마
   - headline: 글 제목
   - datePublished: 발행일
   - dateModified: 수정일
   - author: 사이트명

2. FAQPage 스키마
   - FAQ 섹션 3개 Q&A 자동 연결

3. BreadcrumbList 스키마
   - 홈 > 사주 > 현재 글

모든 블로그 글 페이지에 공통 적용
```

---

## 10. 최종 추가 체크리스트

```
디자인
□ Modern Mystic 컬러 팔레트 적용
□ Face ID 스캔 애니메이션 (Lottie)
□ 딥 네이비 + 골드 그라데이션

URL + 공유
□ 개인화 결과 URL (/result/[id])
□ OG 이미지 동적 생성
□ 카카오톡 공유 버튼
□ 링크 복사 버튼

로딩 + 신뢰도
□ 단계별 분석 로딩 화면
□ 수호신 이미지 오행별 매핑

콘텐츠
□ MBTI + 사주 융합 글 시리즈 추가
□ 연도별 운세 페이지 전략
□ Bazi 키워드 영어 페이지에 추가

SEO 고도화
□ JSON-LD 구조화 데이터 전 페이지
□ 전환성/정보성 키워드 페이지 분리
□ 영어 키워드: Korean astrology / Four Pillars
```
