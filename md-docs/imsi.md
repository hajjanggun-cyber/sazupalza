# 단계별 배포 구조 작업 현황 (Ads & SEO)

**최근 업데이트 (Last Updated):** 2026-09-29 23:48:53 KST

---

## 🚀 오늘 수행한 작업 (Stage 1 완료 대기 상태)

지시하신 단계별 배포 구조(Phased Deployment) 계획에 따라 **단계 1(Stage 1)**에 해당하는 작업을 로컬 브랜치(`stage1`)에서 모두 수행했습니다. (현재 병합/푸시 금지 지시에 따라 커밋까지만 완료된 상태입니다.)

**세부 수행 내역:**
1. **버전 관리:**
   - 기존 작업 내역 백업 브랜치(`backup/ads-seo-before-stage1`) 생성.
   - `main` 브랜치에서 분기하여 `stage1` 새 브랜치 생성.
   - `main`에서 의도치 않게 삭제되었던 유틸리티 스크립트 7종 원복 처리.
2. **(b) 홈 플래그 / 편수 계산 반영:**
   - 홈 화면의 `totalPosts`를 동적 칼럼 편수 합산으로 계산.
   - `SHOW_HERO_TOP_AD = false` (상단 광고 미노출), `SHOW_HERO_BOTTOM_AD = true` (하단 광고 노출) 플래그 적용 완료.
3. **(a) 문구/라벨 시인성 및 (a2) 간격 정리 반영:**
   - `AdSense.tsx`의 "ADVERTISEMENT" 라벨 클래스를 `text-xs opacity-60`으로 수정하여 시인성 확보.
   - 결과 5종 페이지 하단 광고의 여백을 모바일 기준 64px 이상이 되도록 `mt-12 mb-16 pt-8` 등으로 확장.
   - 중간 광고 영역에 `my-12` 적용.
   - 입력 페이지 4종 하단 광고(`0987654321`)에 리터럴 `\n` 오류가 발생하지 않도록 JSX 태그로 `my-12` 직접 감싸기 완료. (personality-analysis 제외)
4. **결과 페이지 텍스트/보안 점검:**
   - `ResultUnavailableState.tsx`의 Fallback 텍스트(PRIVATE RESULT / 기기 종속 안내 문구)가 원본 그대로 유지됨을 Playwright 캡처 및 화면 렌더링 검사(`innerText.includes('\n')` 등)로 이중 확인.
   - 자동 광고 스크립트(`app/[locale]/layout.tsx`) 동작 원리 재점검 (홈 화면 라이브러리 위 여백을 구글 알고리즘이 임의로 채우는 방식 확인).

---

## 📋 앞으로 수행해야 할 스텝 (Next Steps)

현재 로컬에서 코딩 작업이 끝난 상태입니다. 대표님의 승인(병합/푸시 지시)이 떨어지면 다음 단계들을 차례로 수행해야 합니다.

### [Phase 1] Stage 1 라이브 반영 및 모니터링
1. **병합 및 배포:** 현재 대기 중인 `stage1` 브랜치를 `main`으로 병합(Merge)하고 원격 저장소에 푸시(Push)하여 라이브에 배포.
2. **기준선 기록 (Baseline Logging):** 배포 직전/직후의 기준 지표(RPM, 뷰어빌리티, 세션당 페이지뷰, 국가별 유입 트래픽)를 캡처하여 기록.
3. **1차 관찰 (1~2주):** 트래픽 양에 따라 1~2주간 애드센스 대시보드 지표를 관찰하고 Stage 1의 효과(RPM 방어 등) 확인.

### [Phase 2] Stage 2 단독 배포 (noindex)
1. **단독 브랜치 생성:** Stage 1 관찰이 끝난 후, 검색 엔진 유입 품질 개선을 위해 `stage2` 브랜치를 분기.
2. **코드 적용:** 5종 결과 페이지(사주, 관상, 성명학, MBTI, 종합)에만 `<meta name="robots" content="noindex, nofollow" />` (또는 Next.js Metadata API) 적용.
3. **모니터링 (CTR 대신 검색 콘솔):** Google Search Console을 통해 결과 페이지 색인 제외 여부와, 칼럼/입력 페이지로의 오가닉 검색 유입(Organic Traffic) 변화 추이 추적.

### [Phase 3] Stage 3 배포 (CLS 처리 및 슬롯 구조 개편)
1. **단독 브랜치 생성:** Stage 2 적용 완료 후 `stage3` 브랜치 분기.
2. **코드 적용:** 
   - (c) CLS(누적 레이아웃 이동) 방지를 위한 `minHeightMap` 로직 적용 (비동기 광고 로딩 전 빈 공간 확보).
   - (e) 구글 애드센스 실제 광고 단위(Slot ID) 구조화 맵핑 반영.
3. **모니터링 (2~4주):** 반영 후 Search Console 및 Core Web Vitals 리포트에 CLS 개선 결과가 수집되기까지 약 28일 관찰.
