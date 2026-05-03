# Sajupalza Post Codex Lite

Updated At: 2026-05-03 KST

이 파일은 `md-docs/post-codex-command.md`의 실행용 압축본이다.
평소 글 작성은 이 파일과 `md-docs/now-posting-current.md`를 먼저 본다.
판단이 애매하거나 규칙 충돌이 있으면 원본 `md-docs/post-codex-command.md`를 우선한다.

---

## 0. Start Here

1. `md-docs/now-posting-current.md`에서 첫 번째 `[ ]` 항목 확인
2. 기존 유사 포스트와 slug 충돌 확인
3. 개별 발행할 글인지, 통합 글로 묶어야 하는지 판단
4. 메인 키워드/하위 키워드 배치표 작성
5. 작성 파일과 category 확정
6. KO/EN 제목, 설명, keywords, 본문, FAQ, relatedPosts 작성
7. 내부 링크와 relatedPosts 실존 여부 확인
8. `npm run build` 실행
9. 완료 후 `now-posting-current.md`와 원본 `now-posting.md` 갱신

절대 원칙:
- 한 글은 하나의 메인 검색 의도만 담당한다.
- 제목, slug, 첫 문단, H2, FAQ, 내부 링크 앵커가 같은 검색 의도를 향해야 한다.
- 단독 글로 고유 정보와 실전 예시를 충분히 만들 수 없으면 억지로 쪼개지 않고 통합 글로 묶는다.
- `title`, `seoTitle`, `seoTitleEn`은 전체 블로그의 실제 포스트 기준으로 고유해야 한다.
- `keywords`, `keywordsEn`은 구글 랭킹 신호가 아니라 내부 정렬/카니발리제이션 점검용이다.
- KO/EN은 같은 slug의 같은 주제를 각 언어권 검색 표현에 맞게 작성한다.
- 반복 문제를 고친다는 이유로 CSS, inline style, gradient, padding, border 값을 글마다 임의로 바꾸지 않는다.

---

## 1. Google / AdSense 공식 기준

SEO, 콘텐츠 품질, AdSense 수익화 판단이 애매하면 아래 Google 공식 문서를 우선한다.

검색 공식 문서:
- Search Essentials: https://developers.google.com/search/docs/essentials
- SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Title links: https://developers.google.com/search/docs/appearance/title-link
- Meta descriptions / snippets: https://developers.google.com/search/docs/appearance/snippet
- Link best practices: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Structured data: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Helpful content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Generative AI content guidance: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- Spam policies / scaled content abuse: https://developers.google.com/search/docs/advanced/guidelines/auto-gen-content

AdSense 공식 문서:
- Pages ready for AdSense: https://support.google.com/adsense/answer/7299563
- AdSense eligibility: https://support.google.com/adsense/answer/9724
- Site not ready to show ads: https://support.google.com/adsense/answer/12176698
- AdSense Program policies: https://support.google.com/adsense/answer/48182
- Connect your site to AdSense: https://support.google.com/adsense/answer/7584263
- AdSense site management: https://support.google.com/adsense/answer/12131223
- Check AdSense site status: https://support.google.com/adsense/answer/12170222

적용:
- 제목은 페이지마다 고유하고 실제 본문 내용을 정확히 설명한다.
- 메타 설명은 페이지별 고유 요약으로 작성하고 키워드 목록처럼 쓰지 않는다.
- 내부 링크는 크롤링 가능한 `<a href="...">`와 의미 있는 앵커 텍스트를 쓴다.
- 구조화 데이터는 사용자에게 보이는 실제 내용과 일치할 때만 사용한다.
- 콘텐츠는 검색 순위 조작보다 방문자에게 실제 도움이 되는 고유 정보와 충분한 설명을 우선한다.
- AI 사용 자체가 문제가 아니라, 사용자 가치 없이 대량 생성된 저가치 페이지가 문제다.
- AdSense 관점에서는 고유 콘텐츠, 명확한 내비게이션, 좋은 사용자 경험, 정책 준수, 광고와 콘텐츠의 구분이 중요하다.
- 특정 수정이 구글 1위, 즉시 색인, 리치결과 노출을 보장한다고 쓰지 않는다.

---

## 1-A. AdSense 수익화 기준

목표:
- 검색 유입을 늘리되, AdSense 승인과 장기 수익화에 불리한 저가치·반복·오해 유도 콘텐츠를 만들지 않는다.
- 광고 클릭 유도보다 독자가 오래 읽고 다른 글로 이동할 이유를 만드는 것을 우선한다.

콘텐츠 기준:
- 각 글은 검색자가 들어왔을 때 바로 문제를 해결할 수 있어야 한다.
- 다른 글과 겹치지 않는 고유한 해석 포인트, 예시, 표, 체크리스트, 주의사항을 포함한다.
- 단순 정의 글이라도 실제 적용 방법, 예외, 오해, 한계를 함께 설명한다.
- 글마다 상단/중간/하단 내부 링크가 자연스럽게 이어져 세션 흐름을 만든다.
- 민감한 주제는 단정하지 않고 참고 정보로 표현한다.

AdSense 준비 기준:
- 페이지는 공개 접근 가능해야 하며 로그인, 비밀번호, 차단된 robots 규칙에 막히면 안 된다.
- 사이트 내비게이션은 명확해야 하며, 존재하지 않는 글이나 잘못된 경로로 연결하지 않는다.
- 광고 위치는 메뉴, 다운로드 버튼, 필수 내비게이션처럼 오해될 위치를 피한다.
- 광고 위아래에는 충분한 콘텐츠 맥락이 있어야 하며, 광고 클릭을 유도하는 문구를 쓰지 않는다.
- `ads.txt`, AdSense 코드, 사이트 접근성 문제는 콘텐츠 품질 문제와 별도로 확인한다.

수익화 관점의 글 작성 원칙:
- 체류 시간을 늘리기 위해 억지로 늘리지 않는다. 대신 표, 사례, 비교, FAQ로 정보 밀도를 높인다.
- 클릭률만 노린 제목보다 검색 의도와 본문 약속이 일치하는 제목을 쓴다.
- 같은 시리즈라도 글마다 독자가 얻는 정보가 달라야 한다.
- 내부 링크는 관련글 나열이 아니라 다음 행동을 제안하는 흐름으로 배치한다.
- 글 하나가 끝났을 때 독자가 다음 글, 분석 페이지, 관련 시리즈로 이동할 명확한 이유가 있어야 한다.

금지:
- 광고 클릭을 직접 유도하는 문장
- 광고와 콘텐츠/내비게이션을 혼동시키는 배치
- 검색어만 바꾼 대량 생성형 글
- 다른 글을 요약하거나 표현만 바꾼 저가치 재작성
- 실제 경험이나 상담 사례가 없는데 경험담처럼 쓰기
- 의료·투자·법률·결혼·이직 결정을 사주만으로 확정하게 만드는 표현

---

## 2. 프로젝트 구조

사이트:
- `https://sajupalza.cc`

작성 파일:
- 사주: `lib/blog/saju-posts.ts`, category `saju`, URL `/saju/[slug]`
- 성명학: `lib/blog/seongmyeong-posts.ts`, category `seongmyeong`, URL `/name-reading/[slug]`
- 관상: `lib/blog/gwansang-posts.ts`, category `face-reading`, URL `/face-reading/[slug]`
- MBTI: `lib/blog/mbti-posts.ts`, category `mbti`, URL `/mbti/[slug]`
- 궁합·복합: `lib/blog/bokhap-posts.ts`, category `bokhap`, URL `/compatibility/[slug]`

주의:
- 기존 글의 category는 함부로 바꾸지 않는다.
- `relatedPosts.category`는 URL 경로가 아니라 대상 포스트 객체의 실제 category와 맞춘다.
- 내부 HTML 링크에서 사주 글은 `/saju/[slug]`, EN은 렌더러가 `/en/saju/[slug]`로 정규화할 수 있는 구조를 우선한다.
- `/ko/blog/...`, `/en/blog/...` 같은 레거시성 경로를 새 글에 쓰지 않는다.

---

## 3. 필수 필드

포스트 1개에는 아래를 함께 작성한다.

- `slug`
- `title`
- `seoTitle`
- `seoTitleEn`
- `description`
- `descriptionEn`
- `keywords`
- `keywordsEn`
- `publishedAt`
- `updatedAt` 필요 시
- `category`
- `contentKo`
- `contentEn`
- `toc`
- `tocEn`
- `faq`
- `faqEn`
- `relatedPosts`

필수 검수:
- slug와 실제 주제가 일치하는가
- KO/EN 제목과 본문 의도가 같은가
- `title`, `seoTitle`, `seoTitleEn`이 실제 포스트 제목 기준으로 완전 중복되지 않는가
- `title`이 시리즈명 + 반복 후위어가 아니라 해당 글의 차별 포인트를 앞쪽에 드러내는가
- `toc.id`와 본문 `<h2 id="...">`가 일치하는가
- FAQ가 본문 반복이 아니라 오해, 예외, 한계를 보완하는가
- `relatedPosts`가 실제 존재하는 포스트를 가리키는가
- `relatedPosts.title` 반복을 실제 포스트 `title` 중복으로 오진하지 않았는가

---

## 4. 키워드 배치

작성 전 배치표:
- 메인 키워드 KO / EN
- 제외할 검색 의도 2~3개
- H2별 하위 키워드 1~2개
- FAQ에 넣을 질문형 키워드
- 내부 링크 앵커에 사용할 문맥형 키워드
- `description`에 넣을 클릭 전 요약 포인트

규칙:
- 메인 키워드는 H1/제목, `seoTitle`, 첫 문단, 최소 1개 H2, FAQ 1개에 자연스럽게 들어간다.
- 하위 키워드는 H2, H3, 본문 예시, FAQ, 내부 링크 앵커에 분산한다.
- 같은 키워드를 문단마다 반복하지 않는다.
- 하위 키워드는 메인 의도를 보조하는 범위에서만 쓴다.
- 별도 글로 분리해야 할 의도는 현재 글에 넣지 않는다.

---

## 4-A. 개별 발행 vs 통합 발행

개별 포스트로 발행하려면 아래를 통과해야 한다.

- 기존 글과 다른 검색 의도 1개가 명확하다.
- 같은 카테고리 기존 글과 다른 H2 질문을 4개 이상 만들 수 있다.
- 해당 글만의 예시, 오해 교정, 한계 설명, 비교 포인트가 있다.
- `title`, `seoTitle`, `description`이 이름과 후위어만 바꾼 구조가 아니다.
- KO/EN 모두 각 언어권 독자가 따로 얻을 정보가 있다.

통과하지 못하면 얇은 개별 글을 만들지 않는다. 하나의 통합형 pillar 글로 묶고, TOC로 하위 주제에 이동하게 만든다. 통합 글 안의 특정 하위 주제가 Search Console에서 별도 쿼리로 반복 노출될 때만 나중에 분리한다.

---

## 5. 본문 작성 형식

HTML 문자열로 작성한다.

내부 분량 하한선:
- KO 본문: 최소 2,000자 이상, 권장 2,500자 이상
- EN 본문: 1,000 words 이상
- Google/AdSense 공식 문서에는 고정 최소 글자 수가 없으므로, 이 기준은 Sajupalza 내부 품질 하한선이다.
- 분량을 채우기 위해 같은 의미를 반복하지 말고 예시, 비교, 표, 체크리스트, 예외, 한계 설명을 추가한다.

기본 구조:
- `<section>`
- `<h2 id="...">`
- `<h3>` 필요 시
- `<p>`
- `<ul><li>` 필요 시
- FAQ 데이터 별도 작성

권장 흐름:
1. 첫 문단에서 검색 의도 즉시 해결
2. 상단 관련글 또는 안내 블록
3. H2 4~6개
4. 실전 예시, 표, 체크리스트, 비교 중 주제에 맞는 장치 사용
5. 중간 CTA 1회
6. 하단 관련글
7. FAQ 2~3개

금지:
- 추상적인 인사말로 시작
- 제목을 바로 아래 문단에서 같은 말로 반복
- 모든 H2를 같은 길이와 같은 패턴으로 작성
- `정의 -> 특징 -> 결론`만 모든 글에 반복
- 3문장 이상 같은 단어로 시작
- 4문장 이상 비슷한 길이의 문장 연속

---

## 6. SEO 규칙

제목:
- 검색 의도를 바로 드러낸다.
- `title`, `seoTitle`, `seoTitleEn`은 페이지마다 고유해야 한다.
- `title`도 `seoTitle`처럼 전체 블로그 중복 검사를 한다.
- 공통 시리즈명이나 `완벽 가이드`, `총정리`, `완전정복`, `완전 해설`, `ultimate guide`, `complete guide` 같은 후위어보다 해당 글의 차별 포인트를 앞쪽에 둔다.
- 시리즈 글이라도 일간명/일주명/주제명만 바꾼 반복 제목 금지.
- 같은 카테고리나 연속 발행 글에서 같은 후위어를 반복하지 않는다.
- 클릭만 노린 과장 제목 금지.

첫 문단:
- 메인 키워드 1개와 보조 키워드 1개 정도를 자연스럽게 넣는다.
- 이 글이 무엇을 해결하는지 즉시 보여준다.

메타 설명:
- 실제 다루는 범위를 요약한다.
- 제목과 다른 내용을 약속하지 않는다.
- 키워드 나열 금지.
- `3,000자`, `2,500자`, `1,000 words`, `전문 데이터`, `전문 해설`처럼 분량이나 품질을 과시하지 않는다.

키워드 배열:
- `keywords`, `keywordsEn`은 내부 관리용이다.
- 인기 있어 보이는 키워드를 억지로 넣지 않는다.
- 배열에 넣은 표현은 본문 적절한 위치에서 자연스럽게 소화한다.

Search Console 액션:
- 노출 많고 CTR 낮음: `seoTitle`, `description` 우선 수정
- 평균 순위 8~20위: H2, FAQ, 실전 예시, 내부 링크 보강
- 같은 쿼리에 URL 2개 노출: 제목, 첫 문단, H2, 앵커 텍스트로 의도 분리
- 색인 지연: sitemap, 내부 링크, 본문 정보 밀도, 중복 여부 확인

AdSense / 수익화 액션:
- 광고 노출 대비 체류가 낮으면 도입부, 목차, 첫 H2의 즉답성을 개선한다.
- 페이지 이탈이 높으면 중간 내부 링크와 다음 단계 CTA를 더 구체적으로 만든다.
- 얇은 글이 많으면 새 글 발행보다 기존 글의 예시, 표, FAQ, 한계 설명을 보강한다.
- 승인 또는 재검토 전에는 site not ready 항목을 콘텐츠, 접근성, 정책, 광고 코드로 나누어 확인한다.

---

## 7. 저가치 콘텐츠 방지

DO:
- 각 H2는 서로 다른 역할과 해석 포인트를 가진다.
- 사주 글은 천간, 지지, 일간, 오행, 십성, 합충형파해, 대운, 세운, 월별 흐름, 실전 예시, 오해 교정 중 주제에 맞는 구체 항목을 넣는다.
- 운세 해석은 확정 예언이 아니라 구조와 흐름을 읽는 참고 정보로 쓴다.
- 건강, 투자, 결혼, 이직은 실제 결정의 보조 참고로만 표현한다.
- 왜 그렇게 해석하는지 원리 설명을 최소 1개 H2에 넣는다.
- Search helpful content 기준에 맞게 독자가 직접 얻는 정보, 충분한 설명, 고유한 관점, 신뢰 가능한 한계를 포함한다.
- AdSense pages ready 기준에 맞게 고유하고 관련성 높은 콘텐츠, 명확한 탐색 경로, 좋은 읽기 경험을 제공한다.

NOT:
- 글자 수를 채우기 위해 같은 의미 반복
- `무조건`, `반드시`, `100%`, `확실히 돈 번다`, `꼭 결혼한다`, `병이 생긴다` 같은 단정 표현
- 직접 경험이 없는데 1인칭 경험처럼 쓰기
- FAQ를 본문 문장만 질문형으로 바꿔 반복
- AI 티가 나는 같은 H2 순서, 같은 FAQ 패턴, 같은 CTA 문구 반복
- 검색 순위 조작이 주목적인 대량 생성, 저가치 변형, 키워드만 다른 복제 글
- AdSense 정책상 광고 클릭을 유도하거나 사용자를 오도하는 문구와 배치

---

## 8. 내부 링크와 relatedPosts

원칙:
- 링크 문구의 검색 의도 일치가 가장 중요하다.
- 본문 중간 링크와 하단 관련글은 연결 이유가 분명해야 한다.
- 앵커 텍스트는 대상 글의 메인 주제를 흐리지 않게 쓴다.
- `relatedPosts`도 내부 링크 신호의 일부로 본다.
- `relatedPosts.title`은 대상 글을 가리키는 라벨이므로 반복될 수 있다. 다만 대상 글의 현재 canonical 제목과 검색 의도에 맞아야 한다.
- CTA와 관련글 박스 반복은 문구, 역할, 위치, 앞뒤 문맥으로 줄인다. CSS나 공통 class를 임의로 바꾸지 않는다.

앵커 예시:
- `lucky-element`: 용신, 균형, 부족한 기운, 개운
- `career-star`: 관성, 직업운, 조직 적성, 사회적 성공
- `lunar-solar-calendar`: 음력 양력, 절기, 생시, 시간 보정

금지:
- `여기`, `관련글`, `click here`, `자세히 보기`만 단독 사용
- 대상 글 메인 의도와 다른 키워드로 반복 호출
- 모든 링크를 너무 짧은 1~2단어 앵커로만 처리
- 모든 링크를 과도하게 긴 문장형 앵커로 처리

검증:
- `relatedPosts.slug`와 `relatedPosts.category`가 실제 포스트와 일치해야 한다.
- 가능하면 `getPostBySlug(related.category, related.slug)`로 찾을 수 있어야 한다.
- 실제 포스트 `title` 중복과 `relatedPosts.title` 라벨 반복을 구분한다.

---

## 9. 시리즈 카니발리제이션

기존 이론 글 vs 2026 실전 글:
- `wealth-luck`: 재성 이론 / `wealth-fortune-2026`: 2026 재물 시기 실전
- `health-saju`: 오행 체질·질병 시기 이론 / `health-fortune-2026`: 2026 건강 주의 시기 실전
- `love-marriage`: 연애·결혼 이론 / `love-fortune-2026`, `marriage-fortune-2026`: 2026 연애·결혼 시기 실전
- `career-star`: 관성·직업 이론 / `career-change-2026`: 2026 이직·창업 시기 실전
- `day-pillar`: 일주 이론 / `iljoo-fortune-2026`: 2026 일주별 흐름 실전

일간 시리즈:
- 각 일간 고유 키워드를 제목과 첫 문단에 넣는다.
- 직업·연애 예시는 일간마다 다르게 쓴다.
- 2026 운세는 병오 세운과의 관계를 일간별로 다르게 분석한다.

일주 시리즈:
- 각 일주의 고유 특성 키워드를 `seoTitle`에 반영한다.
- 오(午) 포함 일주는 병오년과의 관계를 반드시 차별화한다.
- 모든 일주 글을 같은 H2 4개로 복제하지 않는다.

오행 과다 시리즈:
- 각 오행의 대표 감정/신체 부위를 제목과 첫 문단에 넣는다.
- 대처법은 어떤 오행으로 균형 잡는지 글마다 다르게 명시한다.

---

## 10. 시리즈 H2 질문 설계

이 섹션은 복사할 H2 제목 목록이 아니다. 시리즈 글을 쓰기 전에 어떤 질문을 다룰지 정하는 압축 규칙이다.

공통:
- 직전 같은 시리즈 3개 글의 H2, 첫 문단, FAQ, CTA를 먼저 확인한다.
- H2는 4~6개만 고르고, 각 H2가 서로 다른 질문에 답하게 만든다.
- `성격 특징`, `직업 적성`, `연애 스타일`, `운세 흐름` 같은 범용 제목을 반복하지 않는다.
- 본문이나 목차에 번호형 H2 템플릿을 복사하지 않는다.

일간:
- 해당 일간의 가장 큰 현실 긴장, 결핍, 강점, 오해를 먼저 잡는다.
- 오행·음양 설명은 정의형으로 고정하지 말고 실제 선택, 관계, 일, 감정 패턴과 연결한다.
- 2026을 다루면 병오 세운과의 관계가 왜 다르게 읽히는지 설명한다.

일주:
- 천간과 지지의 결합이 만드는 고유한 관계 습관, 방어 방식, 직업 압박, 감정 소모를 찾는다.
- 직업, 재물, 연애, 결혼을 모두 고정 항목으로 넣지 말고 검색 의도에 맞는 것만 앞세운다.
- 오(午) 포함 일주는 병오년과의 동일 지지, 충돌, 과열, 동기화 관점을 차별화한다.

오행 과다:
- 해당 오행 과다가 감정, 행동, 생활 패턴, 몸의 긴장으로 어떻게 보이는지 설명한다. 의료 판단처럼 단정하지 않는다.
- 대처법은 어떤 오행을 어떤 생활/선택/관계 방식으로 조절하는지 구체화한다.

2026 운세:
- 기존 이론 글은 내부 링크로 넘기고, 새 글은 2026 병오년에서 달라지는 판단에 집중한다.
- 강한 시기, 조심할 시기, 월별 흐름, 관련 조합, 판단 기준 중 검색 의도에 맞는 것만 선택한다.

십성:
- 정의는 필요한 만큼만 쓰고, 과다/부족/균형이 실제 선택과 관계에서 어떻게 드러나는지 설명한다.
- 직업운, 인간관계, 연애를 고정 순서로 반복하지 말고 해당 십성의 핵심 현실 장면을 먼저 잡는다.

---

## 11. 연도 키워드 전략

- `-2026` slug 글은 2026 검색 의도를 담당하는 기존 글로 보존한다.
- 2027 글이 필요하면 새 slug와 새 글로 분리 발행한다.
- `wealth-fortune-2026` slug를 유지한 채 제목만 2027로 바꾸지 않는다.
- 매년 갱신할 evergreen 글은 처음부터 slug에서 연도를 빼고 설계한다.

---

## 12. 완료 전 체크

- slug와 실제 주제가 일치하는가
- KO/EN 제목과 본문 의도가 같은가
- 개별 발행 기준을 통과했는가, 통과하지 못하면 통합 글로 묶었는가
- 실제 포스트의 `title`, `seoTitle`, `seoTitleEn`이 완전 중복되지 않는가
- KO 본문이 최소 2,000자 이상, 가능하면 2,500자 이상이며, EN 본문이 1,000 words 이상인가
- 메인 키워드가 제목, 첫 문단, H2, FAQ에 자연스럽게 들어갔는가
- 하위 키워드가 각 H2에 분산됐는가
- `description`이 실제 본문을 요약하는가
- `description`에 분량이나 품질을 과시하는 표현이 없는가
- `keywords`를 구글 랭킹 신호처럼 과신하지 않았는가
- `toc`와 `<h2 id>`가 일치하는가
- FAQ가 본문 반복이 아니라 추가 정보를 주는가
- relatedPosts가 실제 존재하고 앵커가 주제와 맞는가
- `relatedPosts.title` 반복을 실제 포스트 `title` 중복으로 오진하지 않았는가
- 기존 글과 카니발리제이션이 없는가
- 단정 표현과 저가치 반복 패턴을 피했는가
- 시리즈 H2 질문 설계 문장을 그대로 복사하지 않았는가
- 반복을 고치려고 CSS, inline style, gradient, border, padding 값을 임의로 바꾸지 않았는가
- Google 공식 문서 기준의 helpful content, AI content, spam policy, AdSense 준비 기준을 위반하지 않는가
- 광고와 콘텐츠/내비게이션이 혼동되지 않는 구조인가
- 독자가 다음 글이나 분석 페이지로 이동할 자연스러운 내부 링크 흐름이 있는가
- 고유 정보, 실전 예시, 예외/한계 설명이 들어가 있는가
- `publishedAt` / `updatedAt` 형식이 `YYYY-MM-DD`인가
- `npm run build`를 실행했거나 실행 불가 사유를 기록했는가
- `now-posting-current.md`와 `now-posting.md` 완료 상태를 함께 갱신했는가

---

## 13. URL / Build 검증

필수:
- `npm run build`
- 새 slug가 sitemap에 포함될 수 있는 category와 slug 조합인지 확인
- KO URL과 EN URL 모두 생성되는 구조인지 확인
- `relatedPosts` 대상 조합이 실제 포스트를 찾을 수 있는지 확인
- 내부 링크에 `/ko/blog/...`, `/en/blog/...` 같은 잘못된 레거시 경로가 없는지 확인
- AdSense 코드, 광고 위치, 페이지 접근성, robots 차단 여부는 콘텐츠 품질과 별도로 확인

URL:
- KO 사주: `https://sajupalza.cc/saju/[slug]`
- EN 사주: `https://sajupalza.cc/en/saju/[slug]`
- 성명학: `/name-reading/[slug]`
- 관상: `/face-reading/[slug]`
- MBTI: `/mbti/[slug]`
- 궁합·복합: `/compatibility/[slug]`

로컬 빌드로 Search Console 색인 여부는 확인할 수 없다. 색인 문제는 별도 후속 작업으로 분리한다.
