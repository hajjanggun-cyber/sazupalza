# 포스팅 카테고리 구조 정리

- 기준 일시: 2026-03-09 17:30 +09:00
- 기준 소스:
  - `lib/blog/saju-posts.ts`
  - `lib/blog/seongmyeong-posts.ts`
  - `lib/blog/gwansang-posts.ts`
  - `lib/blog/mbti-posts.ts`
  - `lib/blog/bokhap-posts.ts`
- 전체 포스팅 수: 55

## 오늘 수정 완료

- 완료 일시: 2026-03-09
- 완료 1: `lunar-solar-calendar`
  - slug와 주제가 맞지 않던 문제 정리 완료
  - 현재 기준 주제: 음력·양력·절기·생시 보정
- 완료 2: `lucky-element`
  - slug와 주제가 맞지 않던 문제 정리 완료
  - 현재 기준 주제: 용신(用神), 사주의 균형을 잡는 핵심 기운
- 완료 3: `career-star`
  - `lucky-element`와 겹치던 직업운/관성 주제 분리 정리 완료
  - 현재 기준 주제: 관성(官星), 직업운, 직종 적성, 성공 시기
- 정리 의미:
  - 위 3개는 오늘 `본문/제목/메타 매핑` 수정이 끝난 상태
  - 앞으로는 이 3개 글 자체를 다시 뜯는 것이 아니라, 이 글들로 연결되는 `내부 링크 문구`와 `relatedPosts`를 점검하는 단계

## 전체 구조 요약

| 카테고리 | 경로 | 글 수 | 성격 |
| --- | --- | ---: | --- |
| 사주 | `/saju` | 18 | 메인 허브, 가장 큰 검색 유입 축 |
| 성명학 | `/name-reading` | 10 | 이름 풀이, 작명, 개명, 수리 |
| 관상 | `/face-reading` | 12 | 얼굴 부위별 관상, 재물/건강/성격 |
| MBTI | `/mbti` | 9 | MBTI와 사주 오행 결합형 콘텐츠 |
| 궁합/복합 | `/compatibility` | 6 | 궁합, 비교, 통합 해석 콘텐츠 |

## 1. 사주 / Saju

- 경로: `/saju`
- 소스: `lib/blog/saju-posts.ts`
- 글 수: 18

### 한국어

- 메인 허브 키워드:
  - 사주팔자
  - 무료 사주
  - 사주 분석
  - 음양오행
  - 운세
- 세부 주제군:
  - 기초 개념: 사주팔자란 무엇인가, 음양오행, 신살, 공망
  - 입력/기술: 음력 양력, 절기력, 생시, 시차 보정
  - 핵심 해석: 일주, 용신, 관성, 재성
  - 시기 해석: 대운, 세운, 2026 운세
  - 구조 해석: 년주, 월주, 시주
  - 실전 분야: 연애운, 결혼운, 재물운, 건강
  - 특수 주제: 형충파해, 개운, 운명 변화
- 대표 키워드 묶음:
  - 사주 용신
  - 사주 직업운
  - 사주 재물운
  - 사주 건강
  - 사주 연애운
  - 사주 대운
  - 사주 세운
  - 2026 띠별 운세

### 영어

- 메인 허브 키워드:
  - Korean astrology
  - Saju
  - Four Pillars of Destiny
  - fortune reading
- 세부 주제군:
  - basics of Saju
  - lunar vs solar calendar
  - day pillar
  - Yongshin / lucky element
  - career luck / Gwanseong
  - major fortune cycles
  - annual fortune
  - wealth star
  - health constitution
- 대표 키워드 묶음:
  - What is Saju-Palja
  - Lunar vs Solar Calendar in Saju
  - What is Yongshin
  - Career Luck in Saju
  - Wealth Star in Saju
  - Annual Fortune in Saju
  - Major Fortune Cycles

### 메모

- 현재 사이트에서 가장 중요한 메인 카테고리입니다.
- evergreen 글과 연도형 글이 같이 섞여 있습니다.
- 최근 점검 대상 핵심 slug:
  - `lunar-solar-calendar`
  - `lucky-element`
  - `career-star`

## 2. 성명학 / Name Reading

- 경로: `/name-reading`
- 소스: `lib/blog/seongmyeong-posts.ts`
- 글 수: 10

### 한국어

- 메인 허브 키워드:
  - 이름 풀이
  - 성명학
  - 작명
  - 개명
  - 이름 획수
- 세부 주제군:
  - 기초 개념: 성명학이란 무엇인가
  - 작명: 사주 보완 작명, 아기 이름 짓기
  - 오행: 이름 오행, 소리 오행
  - 수리: 81수리, 이름 획수
  - 실전 응용: 개명, 성씨별 작명, 상호 작명
  - 사례형: 유명인 이름 분석
- 대표 키워드 묶음:
  - 이름 오행 분석
  - 작명 가이드
  - 개명 가이드
  - 성명학 81수리
  - 이름 획수 계산
  - 아기 이름 짓기
  - 상호 작명

### 영어

- 메인 허브 키워드:
  - Korean name reading
  - Seongmyeonghak
  - name numerology
  - naming guide
- 세부 주제군:
  - what is Seongmyeonghak
  - naming with Saju
  - sound harmony
  - name change guide
  - baby naming
  - stroke count numerology
  - business name numerology
- 대표 키워드 묶음:
  - The Power of Names in Korean Culture
  - Balancing Destiny via Saju and Elements
  - Name Change Guide
  - Baby Naming Guide
  - Numerology 81
  - Korean Name Stroke Count

### 메모

- 상업성 키워드와 정보형 키워드가 잘 섞여 있습니다.
- `이름 풀이 무료`, `작명`, `개명`, `상호 작명` 계열로 롱테일 확장성이 좋습니다.

## 3. 관상 / Face Reading

- 경로: `/face-reading`
- 소스: `lib/blog/gwansang-posts.ts`
- 글 수: 12

### 한국어

- 메인 허브 키워드:
  - 관상
  - 관상학
  - 얼굴 관상
  - 재물 관상
  - 건강 관상
- 세부 주제군:
  - 입문: 관상학 기초
  - 재물운: 부자 얼굴, 코/입/귀
  - 부위별 관상: 눈썹, 이마, 눈, 코, 입, 귀
  - 건강: 얼굴색, 기색
  - 외형 분석: 얼굴형, 점 관상
  - 셀프 분석: 거울 자가진단
- 대표 키워드 묶음:
  - 관상학 입문
  - 재물 관상
  - 눈썹 관상
  - 얼굴색 관상
  - 점 관상
  - 이마 관상
  - 얼굴형 관상
  - 코 관상
  - 입 관상
  - 귀 관상

### 영어

- 메인 허브 키워드:
  - Korean face reading
  - Gwansang
  - physiognomy
  - facial fortune
- 세부 주제군:
  - intro to Gwansang
  - wealth face
  - eyebrow reading
  - health via face glow
  - mole reading
  - forehead reading
  - self-diagnosis
  - face shape reading
  - eye reading
  - nose reading
  - mouth reading
  - ear reading
- 대표 키워드 묶음:
  - Intro to Korean Face Reading
  - Korean Wealth Face Guide
  - Korean Eyebrow Reading
  - Korean Mole Reading
  - Face Shape Reading in Gwansang
  - Korean Nose Reading
  - Korean Ear Reading

### 메모

- 부위별 세분화가 잘 되어 있어서 이미지 검색/정보형 유입에 강합니다.
- `재물`, `건강`, `성격`, `수명`처럼 검색 의도가 비교적 분명합니다.

## 4. MBTI / MBTI

- 경로: `/mbti`
- 소스: `lib/blog/mbti-posts.ts`
- 글 수: 9

### 한국어

- 메인 허브 키워드:
  - MBTI
  - MBTI 궁합
  - MBTI 직업
  - MBTI 사주
  - MBTI 오행
- 세부 주제군:
  - 기초: MBTI 유래, 칼 융
  - 융합: MBTI와 사주 오행
  - 관계: MBTI 궁합, MBTI별 사주 궁합표
  - 실전: E/I 유형별 개운법
  - 개별 타입: INFJ 사주 특징
  - 목적형: MBTI 직업 추천, MBTI 연애 궁합
- 대표 키워드 묶음:
  - MBTI 유래
  - MBTI 오행
  - MBTI 궁합
  - MBTI 사주 궁합표
  - MBTI 개운법
  - INFJ 사주
  - MBTI 직업 추천
  - MBTI 연애 궁합

### 영어

- 메인 허브 키워드:
  - MBTI
  - personality type
  - MBTI and Saju
  - MBTI compatibility
- 세부 주제군:
  - origins of MBTI
  - MBTI & Five Elements
  - MBTI compatibility guide
  - luck improvement by type
  - MBTI & Saju match table
  - MBTI career guide
  - MBTI love guide
- 대표 키워드 묶음:
  - Origins of MBTI
  - MBTI & Korean Five Elements
  - MBTI Compatibility Guide
  - MBTI Luck Improvement
  - MBTI & Saju Match Table
  - MBTI Career Guide
  - MBTI Love Guide

### 메모

- 사주 카테고리와 내부적으로 강하게 연결되는 브릿지 역할을 합니다.
- 영어권에서도 상대적으로 이해하기 쉬운 키워드가 많아 해외 유입 테스트용으로도 좋습니다.

## 5. 궁합/복합 / Compatibility

- 경로: `/compatibility`
- 소스: `lib/blog/bokhap-posts.ts`
- 글 수: 6

### 한국어

- 메인 허브 키워드:
  - 궁합
  - 사주 궁합
  - 친구 궁합
  - 동업자 궁합
  - 통합 분석
- 세부 주제군:
  - 손금/복합: 손금 기초
  - 비교형: 사주·관상·성명학·MBTI 비교
  - 연애형: 천생연분, 커플 궁합
  - 관계형: 친구 궁합
  - 비즈니스형: 동업자 궁합
- 대표 키워드 묶음:
  - 손금 보는 법
  - 사주와 MBTI 비교
  - 천생연분 찾기
  - 커플 궁합
  - 친구 궁합
  - 동업자 궁합

### 영어

- 메인 허브 키워드:
  - compatibility
  - soulmate
  - couple Saju
  - business partner Saju
  - integrated analysis
- 세부 주제군:
  - palmistry basics
  - integrated analysis comparison
  - soulmate via Saju and MBTI
  - couple compatibility
  - friendship compatibility
  - business partner compatibility
- 대표 키워드 묶음:
  - Palmistry Basics
  - Saju, Gwansang, and MBTI Compared
  - Finding Your Soulmate
  - Couple Saju Compatibility
  - Friendship Compatibility
  - Business Partner Saju

### 메모

- 글 수는 가장 적지만 전환형 키워드가 많습니다.
- `연애`, `친구`, `동업`처럼 목적이 뚜렷해 CTR 개선 여지가 큽니다.

## 운영 관점 메모

- 사주:
  - 메인 유입 축
  - evergreen + 연도형 혼합
  - 내부 링크 정합성 관리가 가장 중요
- 성명학:
  - 상업/실전 키워드 강점
  - 이름 풀이 무료, 작명, 개명 쪽 확장 좋음
- 관상:
  - 부위별 세분화가 잘 되어 있음
  - 이미지/설명형 검색과 궁합이 좋음
- MBTI:
  - 대중성 강함
  - 사주와 연결하는 브릿지 카테고리
- 궁합/복합:
  - 글 수는 적지만 클릭 유도력이 높은 편
  - 전환형 제목 테스트에 적합

## 앞으로 수정할 것

1. `saju` 카테고리 내부 링크 점검
   - `career-star`, `lucky-element`, `lunar-solar-calendar`로 연결되는 앵커 텍스트가 실제 주제와 맞는지 확인
2. `relatedPosts` 문구 점검
   - 예전 제목이나 엇갈린 주제 문구가 남아 있는지 재확인
3. `bokhap`, `mbti` 카테고리 링크 점검
   - 특히 `/saju/career-star`를 가리키는 링크 문구가 `직업운/관성` 주제와 일치하는지 확인
4. CTR 개선용 제목 후보 정리
   - `관상`, `MBTI`, `궁합` 카테고리에서 노출 대비 클릭률 개선 여지가 큰 제목 따로 추출
5. 신규 포스팅 우선 주제 선정
   - `사주 직업`
   - `이름 풀이 무료`
   - `사주 음력 양력`
   - `용신 찾는 법`
# 메모

- 시간 표기는 한국 시간 `KST` 기준으로 본다.
- 현재 상세 작업 기준 문서:
  - `md-docs/post-codex-command.md`
  - `md-docs/seo-residual-checklist.md`
