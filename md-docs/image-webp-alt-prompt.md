=======

Updated At: 2026-03-11 16:26 KST

=======

# Image WebP Alt Prompt

이 문서는 `sajupalza` 프로젝트에서 이미지 변환, 경로 반영, alt 문구 점검을 할 때 쓰는 작업용 문서다.
프로젝트 전체 SEO 기준은 `md-docs/post-codex-command.md`를 따른다.

## 1. 이 문서의 역할

- 이미지 파일을 게시용 `.webp`로 변환한다.
- 현재 프로젝트 구조에 맞는 경로로 반영한다.
- 이미지 alt를 실제 이미지 설명 중심으로 점검하고 필요하면 보정한다.

## 2. 대상 주소 확인

작업 전에 아래를 먼저 확인한다.

- 대상 주소 또는 카테고리/slug
- 이미지 파일 경로
- 이미지가 들어갈 위치
- KO/EN 분리 여부

현재 사이트 주소 예시:
- 카테고리: `https://sajupalza.cc/saju`
- 영어 카테고리: `https://sajupalza.cc/en/saju`
- 포스트: `https://sajupalza.cc/saju/lucky-element`
- 영어 포스트: `https://sajupalza.cc/en/saju/lucky-element`

카테고리 예시:
- `/saju`
- `/face-reading`
- `/name-reading`
- `/compatibility`
- `/mbti`

카테고리 적용 원칙:
- 대상 주소의 카테고리가 바뀌면 저장 경로, 반영 경로, alt 문맥도 그 카테고리에 맞춰 바꾼다.
- 예: `https://sajupalza.cc/face-reading` 또는 `https://sajupalza.cc/face-reading/[slug]` 작업이면 `face-reading` 기준으로 경로와 alt를 작성한다.
- 예: `https://sajupalza.cc/mbti` 또는 `https://sajupalza.cc/mbti/[slug]` 작업이면 `mbti` 기준으로 경로와 alt를 작성한다.
- `saju` 규칙을 다른 카테고리에 그대로 복붙하지 않는다.

## 3. 현재 프로젝트 기준 주의점

- 예전 `hub`, `MDX`, `kstyleshot` 기준 문서는 이 프로젝트에 그대로 쓰면 안 된다.
- 현재 블로그 포스트 본문은 `lib/blog/*-posts.ts` 안의 HTML 문자열 구조다.
- 대표 커버 이미지는 정적 `/images/...webp` 파일이 아니라 동적 OG 이미지 경로를 쓰는 경우가 있다.
- 따라서 "이미지 추가"가 무엇을 뜻하는지 먼저 구분해야 한다.

이미지 유형:
1. 본문 inline 이미지
2. 포스트 대표 커버 대체용 이미지
3. 공유용 OG 이미지 관련 작업
4. 서비스 UI용 이미지

## 4. 변환 규칙

- 원본 확장자(`png`, `jpg`, `jpeg`)를 먼저 확인한다.
- 최종 게시용 파일은 기본적으로 `.webp`를 우선한다.
- 원본 파일은 요청 범위 안에서만 다룬다.
- 현재 요청과 직접 관련 없는 이미지 파일은 건드리지 않는다.

기본 원칙:
- 파일은 `public/images/...` 아래에서 관리한다.
- 실제 반영 경로는 `/images/...webp` 형식을 사용한다.
- 원본 확장자를 본문이나 문서에 최종 경로로 남기지 않는다.

## 5. 경로 규칙

### 5-1. 본문 inline 이미지

- 저장 경로: `public/images/[category]/[slug]/`
- 반영 경로: `/images/[category]/[slug]/[file-name].webp`
- `[category]`에는 실제 대상 주소의 카테고리명을 그대로 넣는다.

예시:
- 저장 경로: `public/images/saju/lucky-element/`
- 반영 경로: `/images/saju/lucky-element/five-elements-balance-ko.webp`
- 저장 경로: `public/images/face-reading/wealth-face/`
- 반영 경로: `/images/face-reading/wealth-face/nose-wealth-zone-ko.webp`

### 5-2. 카테고리 수준 이미지

- 저장 경로: `public/images/[category]/`
- 반영 경로: `/images/[category]/[file-name].webp`

예시:
- `public/images/saju/`
- `/images/saju/category-intro.webp`

### 5-3. 대표 커버 / OG 관련

- 현재 포스트 커버는 `lib/blog/metadata.ts`와 `app/[locale]/blog-og/[category]/[slug]/opengraph-image.tsx` 구조를 먼저 확인한다.
- 무조건 정적 파일을 넣는다고 가정하지 않는다.
- 커버 교체 작업이면 먼저 현재 렌더 구조를 확인한 뒤 진행한다.

## 6. alt 작성 규칙

- alt는 비워두지 않는다.
- alt는 실제 이미지 설명을 우선한다.
- 키워드는 필요할 때만 1개 정도 자연스럽게 포함한다.
- 제목 복붙, H2 복붙, 키워드 나열은 금지다.
- 같은 글 안의 모든 이미지 alt를 같은 문장 패턴으로 반복하지 않는다.

좋은 alt 기준:
- 짧고 구체적일 것
- 실제 화면 요소를 설명할 것
- 분위기보다 정보 전달이 우선일 것
- 이미지별로 서로 다른 포인트를 잡을 것

피해야 할 alt:
- 제목 그대로 복사
- `사주 용신 이미지`, `관성 사진`, `운세 배경` 같은 빈 문구
- 감상문처럼 긴 문장
- 모든 이미지에 메인 키워드 반복

권장 방향:
- 장소/대상/구성/비교 포인트 중 1~2개를 구체적으로 넣는다.
- 영어 alt는 너무 길지 않게 유지한다.
- alt 문맥은 대상 카테고리에 맞춘다.
  - `saju`: 용신, 관성, 생시, 오행 등 사주 해석 문맥
  - `face-reading`: 코, 이마, 눈, 입, 얼굴형 등 관상 문맥
  - `name-reading`: 획수, 음오행, 이름 구조 등 성명학 문맥
  - `compatibility`: 궁합 비교, 관계 구조, 두 사람 조합 문맥
  - `mbti`: 성격 유형, 행동 패턴, 심리 성향 문맥

## 7. 작업 순서

1. 대상 주소 또는 카테고리/slug 확인
2. 이미지 용도 확인
3. 원본 파일 경로와 확장자 확인
4. `.webp` 변환
5. `public/images/...` 저장 경로 확정
6. 실제 사용 코드 또는 본문 반영 위치 확인
7. alt 작성 또는 보정
8. 필요 시 원본 삭제 여부 확인
9. 최종 반영 경로 보고

## 8. 최종 보고 항목

최종 보고에는 아래를 포함한다.

- 대상 주소 또는 대상 카테고리/slug
- 반영한 파일 경로
- `.webp` 변환 여부
- alt 반영 문구
- 원본 유지/삭제 여부

## 9. 요청 예시

```text
& 'C:\Users\수성길메인\Desktop\11  11 실전코딩\sajupalza\md-docs\image-webp-alt-prompt.md'

대상 주소:
https://sajupalza.cc/saju/lucky-element

또는 대상 카테고리:
https://sajupalza.cc/saju

파일:
& 'C:\...\five-elements-balance-ko.png'
& 'C:\...\five-elements-balance-en.jpg'

삽입 위치:
본문 중간

ALT
한글:
영문:
```

=======
