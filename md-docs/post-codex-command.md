Updated At: 2026-03-11 KST

# Sajupalza Unified Post Command

이 문서는 `sajupalza` 프로젝트의 블로그 포스트 작성, 수정, 검수, SEO 점검을 위한 마스터 운영 문서다.
예전 프로젝트 규칙은 제거하고, 현재 코드 구조와 실제 남아 있는 SEO 이슈 기준으로 다시 정리한다.

관련 운영 문서:
- `md-docs/now-posting.md`
- `md-docs/seo-residual-checklist.md`
- `md-docs/posting-category.md`

---

## 0. Start Here

작업 시작 전에 아래 순서만 먼저 본다.

1. `## 0-A. Critical Constraints`
2. `## 1. Project Structure`
3. `## 2. Post Required Fields`
4. `## 5. SEO Rules`
5. `## 6. Internal Linking Rules`
6. `## 8. Completion Rules`

작업 중 멈칫할 때 다시 볼 항목:
- 무엇을 지켜야 하는지: `## 0-A. Critical Constraints`
- 어떤 필드를 채워야 하는지: `## 2. Post Required Fields`
- 검색 의도 정렬: `## 5. SEO Rules`
- 링크와 관련글 정리: `## 6. Internal Linking Rules`
- 마무리 체크: `## 8. Completion Rules`

---

## 0-A. Critical Constraints

아래 항목은 우선순위가 가장 높은 필수 규칙이다.

### [C1] slug와 주제는 반드시 일치해야 한다

[DO]
- `slug`, `seoTitle`, 본문 첫 문단, H2 구조가 같은 검색 의도를 가리키게 만든다.
- 이미 다른 포스트가 먹고 있는 메인 검색 의도와 충돌하지 않게 한다.

[NOT]
- 달력 글 slug에 용신 제목을 넣는 식의 mismatch 금지
- 같은 주제를 다른 slug에서 중복 확장 금지

### [C2] 현재 프로젝트 구조를 기준으로 작업한다

[DO]
- 최종 데이터는 `lib/blog/*-posts.ts` 구조를 기준으로 작성한다.
- 현재 사이트 라우트와 렌더링 방식을 기준으로 판단한다.

[NOT]
- 예전 `.mdx` 워크플로우, 예전 프로젝트 경로, 예전 라우트 규칙을 그대로 가져오지 않는다.

### [C3] KO/EN은 같은 포스트 쌍으로 관리한다

[DO]
- `contentKo`, `contentEn`, `seoTitle`, `seoTitleEn`, `description`, `descriptionEn`, `keywords`, `keywordsEn`, `toc`, `tocEn`, `faq`, `faqEn`을 같이 본다.
- 같은 slug에서 KO/EN 주제가 달라지지 않게 한다.

[NOT]
- 한쪽 언어만 다른 검색 의도로 흘러가게 두지 않는다.

### [C4] 카니발리제이션을 먼저 피한다

[DO]
- 새 글 또는 수정 글이 기존 어떤 포스트의 메인 쿼리와 겹치는지 먼저 본다.
- `lucky-element`와 `career-star`처럼 인접한 주제는 의도를 분리한다.

[NOT]
- "좋아 보이는 키워드"를 여러 글에 반복 배치하지 않는다.

### [C5] 이미 해결된 문제를 다시 고치지 않는다

[DO]
- 실제 코드와 `md-docs/seo-residual-checklist.md`를 먼저 확인한다.
- 예전 메모보다 현재 워크트리 상태를 우선한다.

[NOT]
- outdated 문서를 그대로 믿고 이미 수정된 문제를 다시 손대지 않는다.

---

## 1. Project Structure

사이트:
- `https://sajupalza.cc`

핵심 데이터 파일:
- `lib/blog/saju-posts.ts`
- `lib/blog/seongmyeong-posts.ts`
- `lib/blog/gwansang-posts.ts`
- `lib/blog/mbti-posts.ts`
- `lib/blog/bokhap-posts.ts`

주요 렌더링 파일:
- `components/BlogPostPage.tsx`
- `app/[locale]/saju/[slug]/page.tsx`
- `app/[locale]/name-reading/[slug]/page.tsx`
- `app/[locale]/face-reading/[slug]/page.tsx`
- `app/[locale]/mbti/[slug]/page.tsx`
- `app/[locale]/compatibility/[slug]/page.tsx`

SEO 관련 파일:
- `app/sitemap.ts`
- `app/robots.ts`
- `lib/seo.ts`
- `lib/blog/metadata.ts`

카테고리 경로:
- `saju` -> `/saju/[slug]`
- `seongmyeong` -> `/name-reading/[slug]`
- `gwansang` -> `/face-reading/[slug]`
- `mbti` -> `/mbti/[slug]`
- `bokhap` -> `/compatibility/[slug]`

---

## 2. Post Required Fields

포스트 1개를 완성하려면 아래 필드를 같이 본다.

1. `slug`
2. `title`
3. `seoTitle`
4. `seoTitleEn`
5. `description`
6. `descriptionEn`
7. `keywords`
8. `keywordsEn`
9. `publishedAt`
10. `updatedAt` 필요 시
11. `category`
12. `contentKo`
13. `contentEn`
14. `toc`
15. `tocEn`
16. `faq`
17. `faqEn`
18. `relatedPosts`

필수 판단:
- slug가 실제 주제를 대표하는가
- KO/EN 모두 같은 주제를 가리키는가
- `toc`의 `id`와 본문 `<h2 id="...">`가 일치하는가
- `faq`가 본문 반복이 아니라 추가 정보를 제공하는가
- `relatedPosts`가 실제 검색 의도 기준으로 연결되는가

---

## 3. Writing Format Rules

본문 작성 규칙:
- `contentKo`, `contentEn`은 HTML 문자열 형식으로 작성한다.
- 기본 구조는 `<section>`, `<h2 id="...">`, `<h3>`, `<p>`, 필요 시 `<ul><li>`를 사용한다.
- 첫 문단은 추상적 인사말보다 검색 의도를 바로 설명하는 문장으로 시작한다.
- 본문은 정의 -> 해석 원리 -> 실전 적용 -> 주의점 -> 결론 흐름을 기본으로 둔다.

권장 구조:
1. 첫 문단: 검색 의도 즉시 설명
2. 상단 관련글 또는 안내 블록
3. H2 4~6개
4. 중간 CTA 또는 서비스 연결 1회
5. 하단 관련글 2개
6. FAQ 2~3개

금지:
- 모든 H2 아래를 같은 길이, 같은 톤으로 기계적으로 반복
- 의미 없는 미사여구만 길게 늘리기
- 키워드만 나열하는 문장

---

## 4. Topic Separation Rules

주제 분리는 SEO 기본 규칙으로 본다.

### `lucky-element`

핵심 의도:
- 용신
- 오행 균형
- 부족한 기운
- 개운 방향

피해야 할 방향:
- 직업운 중심 글처럼 보이게 만들기
- 관성 해설을 메인처럼 끌어오기

### `career-star`

핵심 의도:
- 관성
- 직업운
- 조직 적성
- 사회적 역할
- 성공 시기

피해야 할 방향:
- 용신 일반론처럼 넓게 퍼지기
- 오행 균형 글과 구분이 안 되게 만들기

### `lunar-solar-calendar`

핵심 의도:
- 음력/양력
- 절기
- 입춘
- 생시
- 시간 보정

피해야 할 방향:
- 용신, 직업운, 연애운 제목으로 흐르기

---

## 5. SEO Rules

### 5-1. 제목

- `seoTitle`은 검색어 의도를 바로 드러내야 한다.
- 클릭만 노린 과장 제목보다, 사용자가 얻을 정보가 명확해야 한다.
- 연도 키워드는 실제 연도성 글에만 사용한다.

### 5-2. 첫 문단

- 메인 키워드 1개와 보조 키워드 1개 정도를 자연스럽게 포함한다.
- 첫 문단에서 "이 글이 무엇을 해결하는지"를 즉시 보여준다.

### 5-3. H2/H3

- H2 중 최소 1개 이상은 메인 검색 의도와 직접 연결되게 잡는다.
- H3는 보조 키워드 또는 실전 해석 단위로 사용한다.

### 5-4. 메타 설명

- 클릭 유도만 하지 말고, 글에서 실제 다루는 범위를 요약한다.
- 제목과 다른 내용을 약속하지 않는다.

### 5-5. 키워드 배열

- `keywords`는 주제 범위를 벗어나지 않게 유지한다.
- 개수보다 주제 정합성이 더 중요하다.

### 5-6. 남아 있는 실제 SEO 우선순위

1. Search Console 기준 실제 카니발리제이션 확인
2. 앵커 텍스트와 `relatedPosts` 정리
3. 얇은 글 후보 실측
4. 허브 페이지 설명력 점검

자세한 내용은:
- `md-docs/seo-residual-checklist.md`

---

## 6. Internal Linking Rules

핵심:
- 링크 포맷보다 더 중요한 것은 링크 문구의 검색 의도 일치다.

원칙:
- 본문 중간 링크와 하단 관련글은 실제 연결 이유가 분명해야 한다.
- 앵커 텍스트는 대상 글의 메인 주제를 흐리지 않게 쓴다.
- `relatedPosts`도 내부 링크 신호의 일부로 본다.

주의:
- 현재 렌더러가 내부 링크를 locale 기준으로 정규화하므로, 소스 문자열 혼재만 보고 문제라고 단정하지 않는다.
- 대신 최종 의도는 locale 일관성과 주제 일관성이다.

앵커 텍스트 예시 원칙:
- `lucky-element` 링크 문구: 용신, 균형, 부족한 기운, 개운
- `career-star` 링크 문구: 관성, 직업운, 조직 적성, 사회적 성공
- `lunar-solar-calendar` 링크 문구: 음력 양력, 절기, 생시, 시간 보정

금지:
- `여기`, `관련글`, `click here`처럼 비어 있는 문구만 쓰기
- 대상 글 메인 의도와 다른 키워드로 반복 호출하기

---

## 7. FAQ / Structured Data Rules

- FAQ는 2~3개 정도를 기본으로 본다.
- 질문은 실제 검색자가 던질 법한 형태로 쓴다.
- 답변은 본문 반복이 아니라 예외, 오해, 실전 적용을 보완해야 한다.
- 현재 블로그 포스트 페이지는 FAQ JSON-LD를 출력하고 있으므로, 데이터 품질이 더 중요하다.

주의:
- FAQ 리치결과 노출은 자동 보장으로 보면 안 된다.
- FAQ가 있다고 CTR이 무조건 오른다고 가정하지 않는다.

---

## 8. Completion Rules

포스트 작성 또는 수정 후 아래를 확인한다.

1. slug와 실제 주제가 일치하는지
2. KO/EN 제목과 본문 의도가 같은지
3. `toc`와 `<h2 id>`가 일치하는지
4. `description`이 실제 본문을 요약하는지
5. `faq`가 추가 정보를 주는지
6. `relatedPosts`와 앵커 텍스트가 주제와 맞는지
7. 기존 포스트와 키워드 충돌이 없는지
8. 필요하면 `updatedAt` 반영 여부를 판단했는지
9. 운영 문서 업데이트가 필요한지 확인했는지

업데이트 대상 문서:
- `md-docs/now-posting.md`
- `md-docs/seo-residual-checklist.md`
- 필요 시 `md-docs/haha-imsi`

---

## 9. Search Console Check Rules

코드만으로 판단하지 말고, 아래는 Search Console에서 확인한다.

확인 항목:
- 어떤 쿼리에 어떤 URL이 노출되는지
- 같은 쿼리에 두 페이지가 번갈아 뜨는지
- `Discovered - currently not indexed`가 많은지
- canonical 충돌이 있는지
- `2026`성 글이 제때 색인되는지

우선 점검 URL:
- `/saju/lucky-element`
- `/saju/career-star`
- `/saju/lunar-solar-calendar`
- `/saju/zodiac-2026`

우선 점검 쿼리:
- `사주 용신`
- `용신 찾기`
- `사주 직업운`
- `관성 뜻`
- `음력 양력 사주`
- `생시 모르면 사주`
- `2026 운세`

---

## 10. Image Rules

- 대표 이미지와 본문 설명 이미지는 검색 유입과 체류시간에 도움될 수 있다.
- 이미지 추가 자체는 애드센스 승인 후에도 문제 아님.
- 다만 의미 없는 장식 이미지 남발은 피한다.

원칙:
- 글 주제와 직접 연결된 이미지만 넣는다.
- 용량 최적화가 우선이다.
- 파일명과 `alt`는 검색 의도와 맞게 쓴다.
- 핵심 글부터 순차적으로 추가한다.

---

## 11. What Not To Overreact To

- "애드센스 승인 후 수정하면 안 된다"는 식의 속설
- 이미 해결된 문제를 계속 1순위로 보는 것
- FAQ 리치결과를 자동 기대하는 것
- 샌드박스 기간 숫자를 확정 사실처럼 다루는 것

현실적인 원칙:
- 대수술은 피하되, 검색 의도 정렬과 품질 개선은 바로 한다.

---

## 12. Default Work Order

포스트 작업 기본 순서:

1. 기존 유사 포스트 확인
2. slug와 검색 의도 확정
3. `seoTitle`, `description`, `keywords` 초안 작성
4. KO/EN 본문 작성 또는 수정
5. `toc`, `faq`, `relatedPosts` 정리
6. 내부 링크 문구 점검
7. 카니발리제이션 재확인
8. 운영 문서 반영 필요 여부 판단

---

## 13. One-Line Principle

이 프로젝트에서 가장 중요한 것은 "많이 쓰는 것"보다 "각 포스트가 어떤 검색 의도를 담당하는지 명확하게 유지하는 것"이다.
