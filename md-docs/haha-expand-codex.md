# SajuPalza SEO / Trust Execution Report
## QA Follow-up (2026-03-04 18:15:51 KST, UTC+09:00)

- Blog cover and OG image URLs were corrected to use the actual `opengraph-image` route.
- Shared navigation and analysis entry links now use the default-locale-safe path helper, so Korean links resolve without forcing `/ko`.
- Manual device QA is still required for private result links.

### Shared Link QA Checklist

1. Open a result link again on the same device and same browser.
   Expected: the saved private result opens normally.
2. Open the same result link after clearing browser storage on that device.
   Expected: the private-result fallback screen appears, not a blank page.
3. Open the same result link on a different device or different browser.
   Expected: the private-result fallback screen appears, with working buttons for a new analysis and the editorial policy page.
4. Share the link through KakaoTalk and open the preview.
   Expected: no personal name or birth date appears in the preview image or summary text.
5. Tap the "start a new analysis" button from the fallback screen in Korean.
   Expected: it opens the non-`/ko` Korean path.


- 작성일: 2026-03-04
- 작성시각: 16:47:25 (KST, UTC+09:00)
- 작성자: Codex (GPT-5)
- 기준: 현재 로컬 워크스페이스 코드 기준

---

## 핵심 요약

현재 프로젝트는 단순 SEO 장치 보강 수준을 넘어, 검색 신뢰와 애드센스 수익을 위해 필요한 핵심 구조를 상당 부분 정리한 상태다.

이미 반영된 핵심 축은 다음과 같다.
- 사주 계산 정확도 보강
- 다국어 메타 정리
- 개인정보 노출 제거
- 공유 UX 재설계
- 블로그 과장 문구 완화
- 대표 이미지 및 OG 이미지 보강
- 결과 이후 재순환 동선 강화
- About / Editorial Policy 신뢰 페이지 구축

남은 핵심 과제는 기술 구조보다 콘텐츠 품질과 운영 디테일에 가깝다.
- 고위험 본문 문장 수동 정리 확대
- 남은 인코딩 흔적 정리
- 실제 공유 링크 동선 테스트
- 카니벌라이제이션 및 허브 페이지 품질 정리

---

## 이번에 실제로 한 일

### 1. 사주 계산 신뢰성 보강
- 음력/윤달 입력이 실제 계산에 반영되도록 수정
- 절기 기준 월주/연주 계산 보강
- 결과 페이지가 `lunar`, `leapMonth`를 실제 전달하도록 정리

### 2. 다국어 SEO 메타 정리
- `ko / en / x-default` 기준 `canonical`, `alternates.languages` 통일
- 주요 홈, 분석, 정적 페이지 메타 일관성 정리
- 블로그 상세 페이지 메타를 공통 생성 방식으로 정리

### 3. 발행일 / 수정일 운영 신호 정리
- 블로그 글 `publishedAt` 분산 적용 로직 추가
- `updatedAt` 자동 보강 로직 추가
- 사이트맵 `lastModified`가 더 자연스러운 수정 신호를 쓰도록 정리

### 4. 내부 링크 URL 패턴 통일
- 블로그 본문 HTML 내부 링크를 렌더링 시점에 정규화
- `/ko/...`, `/en/...`, 비로케일 경로 혼재 문제 완화

### 5. 결과 URL 개인정보 노출 제거
- Base64 결과 URL 구조 제거
- 브라우저 저장소 + 토큰 기반 구조로 전환
- 이름/생년월일이 URL과 공유 링크에 직접 노출되지 않도록 변경

### 6. 공유 UX 재설계
- 결과 링크 공유가 아니라 분석 시작 페이지 공유로 변경
- 결과 페이지, FAQ, Privacy, Terms, 시작 페이지 문구를 현재 동작에 맞게 통일
- 결과 OG 이미지를 개인정보 없는 일반형으로 교체

### 7. 프라이버시 / 정책 문구 정합성 수정
- `privacy`, `terms`, `contact` 문구를 실제 저장 구조와 맞춤
- `messages/ko.json`, `messages/en.json`의 짧은 안내 문구도 현재 동작 기준으로 수정

### 8. 결과 문구 1차 완화
- 결과 UI의 `상위 X%`, `정확도 %` 같은 표현을 참고형 문구로 완화
- 희소성, 완성도, 공유 문구를 신뢰 중심 표현으로 조정

### 9. 블로그 과장 카피 완화 레이어 추가
- `lib/blog/content-sanitizer.ts` 추가
- 블로그 본문과 FAQ에 공통 문구 완화 레이어 적용
- `shockingly accurate`, `guarantees`, `ultimate`, `absolute`, `explosive` 계열 표현을 점진적으로 완화

### 10. 블로그 신뢰 신호 보강
- 글 상단 대표 커버 이미지 노출
- 에디토리얼 리뷰 박스 추가
- 편집팀, 최종 검토일, 해석 주의 문구 추가

### 11. 블로그 이미지 SEO 보강
- 글별 동적 OG 커버 이미지 추가 (`1200x630`)
- 블로그 메타를 공통화해 `openGraph`, `twitter`, `authors`, 이미지 메타 일관화
- 글 본문 상단에도 동일 커버 노출

### 12. 결과 페이지 재순환 구조 강화
- `components/ResultNextSteps.tsx` 추가
- 종합, 사주, 관상, MBTI, 성명학 결과 페이지에 다음 분석 및 가이드 이동 블록 추가
- 결과 직후 다른 분석, 허브, 운영 원칙 페이지로 넘어갈 수 있도록 구성

### 13. About / Editorial Policy 페이지 추가
- `app/[locale]/about/page.tsx` 추가
- 운영 원칙, 편집 기준, 개인정보 방향, 광고 운영 원칙 정리
- 운영 주체, 수익 구조, 콘텐츠 검토 방식, 문의 응답 기준 명시

### 14. 신뢰 링크 노출 확대
- 푸터에 `운영 원칙 / About` 링크 추가
- 상단 네비게이션에 `운영 원칙 / About` 링크 추가
- 홈, 시작 페이지, 결과 페이지 재순환 박스에 `운영 원칙 보기` 링크 추가

### 15. 공유 링크 복원 실패 UX 개선
- `components/ResultUnavailableState.tsx` 추가
- 다른 기기나 저장소 삭제 상태에서 결과 복원 실패 시, 빈 화면 대신 안내 UI 표시
- 실패 이유, 개인정보 보호 이유, 다음 행동 버튼을 함께 제공

### 16. 고위험 본문 문장 수동 완화
- `gwansang-posts.ts`의 인기/노후 보장형 문장 완화
- `seongmyeong-posts.ts`의 사업명 성공 보장형 문장 완화
- `saju-posts.ts`의 은퇴/건강/충돌 예언형 문장 완화

### 17. 인코딩 흔적 1차 정리
- `app/[locale]/result/[id]/page.tsx`의 깨진 주석을 사람이 읽을 수 있는 주석으로 교체
- 기능 변경 없이 유지보수 가독성 개선

### 18. 검증
- 단계별로 `next lint` 통과
- 단계별로 `npx tsc --noEmit` 통과

---

## 지금 기준 성과

### SEO 관점
- 다국어 메타 구조가 이전보다 훨씬 안정적임
- 글별 대표 이미지와 큰 OG 이미지가 생겨 공유 CTR과 이미지 신호가 개선됨
- 내부 링크 구조가 정리되어 크롤링 품질이 개선됨
- 발행일 / 수정일 신호가 이전보다 운영형 구조에 가까워짐

### 애드센스 / 신뢰 관점
- 결과 URL 개인정보 노출 문제가 제거됨
- 정책 문구와 실제 동작의 충돌이 크게 줄어듦
- 과장형 문구를 일부 완화해 승인 / 신뢰 리스크를 낮춤
- 결과 후 즉시 이탈만 하던 흐름을 다른 분석과 콘텐츠로 더 연결하게 됨

### E-E-A-T 관점
- About / Editorial Policy 페이지가 생겨 운영 기준 설명 가능
- 편집팀, 검토일, 운영 원칙 노출 증가
- 단순 운세 생성 사이트보다 운영 기준이 있는 콘텐츠 서비스 구조에 가까워짐

---

## 앞으로 해야 할 일

### 1. 블로그 본문 과장 카피 3차 수동 정리
- 현재는 공통 치환 + 대표 위험 문장 수동 수정까지 반영된 상태
- 하지만 성명학, 관상, 일부 사주 장문 글은 여전히 원문 수동 재작성 필요성이 큼
- 특히 “보장”, “확정”, “질병 예언”, “사업 성공 확정” 계열 문장을 직접 더 줄여야 함

### 2. 남은 인코딩 흔적 정리
- `result/[id]`는 1차 정리 완료
- `saju-result`, `gwansang-result`, `personality-result`, `seongmyeong-result`에도 깨진 주석/문자열 흔적이 일부 남아 있음
- 유지보수성과 소스 품질 측면에서 단계적으로 정리 필요

### 3. 공유 링크 실제 동선 테스트
- 현재는 복원 실패 시 안내 UI가 뜨도록 개선됨
- 그래도 실제로 다른 브라우저, 다른 기기, 시크릿 모드에서
  - 어떤 화면이 뜨는지
  - 버튼이 자연스럽게 이어지는지
  - 사용자가 혼란스러워하지 않는지
  를 수동 점검하는 것이 좋음

### 4. 허브 페이지 설명력 보강
- 홈, 카테고리 허브, 분석 시작 페이지의 원본 설명 밀도를 더 높일 수 있음
- “이 서비스를 어떻게 읽어야 하는지”를 상단에서 더 명확히 안내하면 신뢰가 더 올라감

### 5. 카니벌라이제이션 점검
- 유사 주제 글이 서로 검색 유입을 나눠 먹는 구조는 아직 정밀 점검 전
- 카테고리별 대표 글과 보조 글의 역할 정리가 필요

### 6. 이미지 전략 2차 확장
- 현재는 글별 OG 커버 중심
- 다음 단계로는 카테고리 대표 이미지, 허브 썸네일, Discover 대응형 이미지 확장이 가능

### 7. Search Console / 실제 검색 성과 확인
- 코드 레벨 최적화는 상당 부분 진행됨
- 다음은 실제 인덱싱, CTR, 이미지 노출, 쿼리 분산 상태를 운영 데이터로 확인해야 함

---

## 지금 기준 추천 우선순위

1. 남은 인코딩 흔적 정리
2. 공유 링크 실제 동선 테스트
3. 블로그 본문 과장 카피 3차 수동 정리
4. 허브 페이지 설명력 보강
5. 카니벌라이제이션 점검
6. 이미지 전략 2차 확장
7. Search Console 지표 확인

---

## 한 줄 결론

현재 코드는 SEO, 프라이버시, 공유 UX, 이미지 메타, 신뢰 신호 측면에서 핵심 구조를 많이 정리한 상태다. 다음 단계의 중심은 기술 기능 추가보다, 남아 있는 콘텐츠 품질 문제와 운영 디테일을 더 정교하게 다듬는 일이다.
