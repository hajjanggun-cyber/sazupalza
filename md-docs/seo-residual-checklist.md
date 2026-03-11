# SEO 잔여 이슈 체크리스트

- 기준일: 2026-03-11
- 기준 코드: 현재 워크트리
- 목적: 이미 해결된 이슈와 아직 검증이 필요한 이슈를 분리해, 실제 남은 SEO 작업만 추리기

## 1. 현재 코드상 해결 또는 구현 확인됨

### 1-1. slug-title mismatch

- `lunar-solar-calendar`는 현재 달력/절기/생시 주제로 정상 매핑됨
- `lucky-element`는 현재 용신/오행 균형 주제로 정상 매핑됨
- `career-star`는 현재 관성/직업운 주제로 정상 매핑됨

확인 파일:
- `lib/blog/saju-posts.ts`

### 1-2. 내부 링크 locale 정규화

- 본문 HTML에 `/saju/...`, `/ko/saju/...`, `/en/saju/...`가 섞여 있어도 렌더링 시 locale 기준으로 정규화됨
- 따라서 "소스 문자열 혼재"와 "최종 HTML 혼재"는 구분해서 봐야 함

확인 파일:
- `components/BlogPostPage.tsx`
- `lib/seo.ts`

### 1-3. FAQ JSON-LD

- 블로그 포스트 페이지에서 `FAQPage` JSON-LD를 실제 출력함
- FAQ 배열만 있으면 구조화 데이터 생성됨

확인 파일:
- `components/BlogPostPage.tsx`

### 1-4. sitemap

- `app/sitemap.ts`에서 정적 페이지 + 전체 포스트 + `ko/en` alternates + `lastModified` 생성 중
- "sitemap 파일이 없다"는 지적은 현재 코드 기준으로는 해당 없음

확인 파일:
- `app/sitemap.ts`

## 2. 실제로 남아 있는 우선 점검 항목

### 2-1. Search Console 기준 실제 카니발리제이션

중요도: 매우 높음

설명:
- 코드상 `lucky-element`와 `career-star`는 분리되어 있음
- 하지만 구글이 실제로 어떤 쿼리에 어떤 URL을 대표 페이지로 선택하는지는 Search Console로만 판단 가능

우선 확인 쿼리:
- `관성`
- `사주 관성`
- `사주 직업운`
- `천직 찾기`
- `용신`
- `사주 용신`
- `사주 직업`

확인 포인트:
- 동일 쿼리에 두 URL이 번갈아 노출되는지
- 클릭/노출이 한 URL로 안정적으로 수렴하는지
- 의도와 다른 URL이 대표 노출되는지

대상 URL:
- `/saju/lucky-element`
- `/saju/career-star`

### 2-2. 내부 링크 앵커 텍스트 정리

중요도: 높음

설명:
- 링크 포맷 문제보다 더 중요한 것은 링크 문구의 주제 일관성
- 다른 글에서 `career-star`를 너무 넓은 의미로 연결하거나, `lucky-element`를 직업/성공 시기 문맥으로 과도하게 연결하면 신호가 섞일 수 있음

정리 원칙:
- `lucky-element`: 용신, 오행 균형, 부족한 기운, 개운 방향
- `career-star`: 관성, 직업운, 사회적 역할, 조직 적성, 성공 시기

우선 점검 파일:
- `lib/blog/saju-posts.ts`
- `lib/blog/mbti-posts.ts`
- `lib/blog/bokhap-posts.ts`

### 2-3. relatedPosts 문구 재점검

중요도: 높음

설명:
- `relatedPosts`는 내부 링크 구조와 함께 주제 신호를 반복 강화함
- slug는 맞아도 title 문구가 다른 검색 의도를 끌어오면 랭킹 신호가 퍼질 수 있음

체크 기준:
- 연결 이유가 본문 주제와 맞는가
- 관련글 제목이 대상 포스트의 핵심 검색 의도와 일치하는가
- 한 포스트가 여러 의미로 반복 호출되고 있지 않은가

## 3. 콘텐츠 품질 감사 대상

### 3-1. 얇은 글 후보 실측

중요도: 중간

후보:
- `love-marriage`
- `wealth-luck`
- `health-saju`

주의:
- 제목만 보고 얇다고 단정하지 말 것
- 실제 본문 길이, 섹션 수, FAQ 수, 중복 문장 비율, 내부 링크 수로 판단할 것

체크 항목:
- 본문이 최소한 독립 검색 의도를 충족하는가
- H2/H3가 충분히 분화되어 있는가
- FAQ가 본문 반복이 아닌 추가 정보를 제공하는가
- 결론부가 상투적 반복으로 끝나지 않는가

### 3-2. 허브 페이지 품질

중요도: 중간

대상:
- `/saju`
- `/face-reading`
- `/name-reading`
- `/compatibility`
- `/mbti`

체크 항목:
- 카드 목록만 있는지, 설명형 인트로가 충분한지
- 카테고리 대표 키워드를 실제 본문에서 설명하는지
- 하위 글을 묶는 주제 구조가 명확한지

## 4. 운영 체크 항목

### 4-1. sitemap 운영 검증

중요도: 중간

코드는 구현되어 있지만, 아래는 별도 확인 필요:
- Search Console에 실제 제출했는지
- 제외 URL이 없는지
- `Discovered - currently not indexed`가 많은지
- `Duplicate, Google chose different canonical` 이슈가 있는지

### 4-2. 내부 운영 문서 최신화

중요도: 높음

설명:
- 기존 문서에 남아 있는 "slug-title mismatch" 기록이 현재 코드와 다를 수 있음
- 내부 문서가 오래되면 다음 작업 우선순위가 계속 왜곡됨

우선 갱신 대상:
- `md-docs/now-posting.md`

## 5. 실행 순서

1. Search Console에서 `lucky-element` / `career-star` 실제 쿼리 충돌 여부 확인
2. `relatedPosts`와 본문 앵커 텍스트를 주제 기준으로 재정리
3. 얇은 글 후보 3개 실측 감사
4. 허브 페이지 설명부 보강 여부 판단
5. `now-posting.md`를 현재 상태 기준으로 갱신

## 6. 한 줄 결론

- 지금 가장 위험한 것은 "이미 고친 문제를 다시 고치는 것"이 아니라, Search Console 데이터 없이 카니발리제이션을 추정으로 다루는 것이다.
