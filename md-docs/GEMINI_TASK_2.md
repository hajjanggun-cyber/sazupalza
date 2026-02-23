# Gemini 추가 작업 지시서 - 한국어 잔존 텍스트 제거

## 상황 요약

1차 작업(`result-generator.ts` 수정) 후에도 영문 출력에 한국어가 섞여 나오고 있음.
원인은 `result-generator.ts`가 데이터를 가져오는 **원본 데이터 파일들이 한국어 전용**이기 때문.

---

## 수정 대상 파일 (3개)

```
lib/data/saju/cheongan.ts     ← 천간 10개 데이터
lib/data/mbti/types.ts        ← MBTI 16유형 데이터
lib/calculator/result-generator.ts ← 1차 수정한 파일 (일부 추가 수정)
```

---

## 현재 한국어가 섞여 나오는 위치 (출력 기준)

```
1. Core Energy 항목      → cheongan.ts의 meaning 필드 (한국어)
2. 직업군 (career fields) → cheongan.ts의 career 배열 (한국어)
3. 관계 특성             → cheongan.ts의 relationship 필드 (한국어)
4. MBTI 직업군           → mbti/types.ts의 career 배열 (한국어)
5. MBTI 관계 특성        → mbti/types.ts의 relation 필드 (한국어)
6. 분석 근거 박스 라벨   → result-generator.ts analysisBox의 '일간:', '월지:' (한국어)
```

---

## 작업 1: cheongan.ts 수정

### 인터페이스에 영문 필드 추가

```typescript
// 기존 인터페이스
export interface Cheongan {
  key: string;
  name: string;
  hanja: string;
  ohaeng: string;
  eumsang: 'eum' | 'yang';
  meaning: string;
  traits: string[];
  strengths: string[];
  growthPoints: string[];
  career: string[];
  relationship: string;
}

// 수정 후
export interface Cheongan {
  key: string;
  name: string;
  hanja: string;
  ohaeng: string;
  eumsang: 'eum' | 'yang';
  meaning: string;
  meaningEn: string;      // 추가
  traits: string[];
  strengths: string[];
  growthPoints: string[];
  career: string[];
  careerEn: string[];     // 추가
  relationship: string;
  relationshipEn: string; // 추가
}
```

### 각 천간별 영문 데이터 추가

```typescript
gap: {
  // 기존 필드 유지...
  meaningEn: 'Yang Wood (陽木) - Great Tree, Energy of Growth',
  careerEn: ['Management', 'Education', 'Pioneer Fields'],
  relationshipEn: 'You tend to prefer honest and direct communication',
},
eul: {
  meaningEn: 'Yin Wood (陰木) - Grass and Flowers, Energy of Flexibility',
  careerEn: ['Arts', 'Service Industry', 'Counseling'],
  relationshipEn: 'You tend to be deeply considerate with outstanding empathy',
},
byeong: {
  meaningEn: 'Yang Fire (陽火) - Sun, Energy of Brightness',
  careerEn: ['Entertainment', 'Education', 'Marketing', 'Service'],
  relationshipEn: 'You tend to brighten those around you with vibrant energy',
},
jeong: {
  meaningEn: 'Yin Fire (陰火) - Candlelight, Energy of Warmth',
  careerEn: ['Arts', 'Healthcare', 'Research', 'Counseling'],
  relationshipEn: 'You tend to form deep bonds with sincere interest and care',
},
mu: {
  meaningEn: 'Yang Earth (陽土) - Mountain and Ground, Energy of Stability',
  careerEn: ['Management', 'Real Estate', 'Finance', 'Administration'],
  relationshipEn: 'You tend to be a trustworthy and stabilizing presence',
},
gi: {
  meaningEn: 'Yin Earth (陰土) - Fields and Farmland, Energy of Practicality',
  careerEn: ['Agriculture', 'Food Industry', 'Service', 'Administration'],
  relationshipEn: 'You tend to nurture relationships with diligence and care',
},
gyeong: {
  meaningEn: 'Yang Metal (陽金) - Steel and Rock, Energy of Decisiveness',
  careerEn: ['Law', 'Military & Security', 'Finance', 'Manufacturing'],
  relationshipEn: 'You tend to be a loyal and dependable partner',
},
sin: {
  meaningEn: 'Yin Metal (陰金) - Jewel and Blade, Energy of Precision',
  careerEn: ['Healthcare', 'Law', 'Design', 'Research'],
  relationshipEn: 'You tend to hold high standards and pursue genuine relationships',
},
im: {
  meaningEn: 'Yang Water (陽水) - Great River and Ocean, Energy of Wisdom',
  careerEn: ['Academia', 'Philosophy', 'IT', 'Strategic Planning'],
  relationshipEn: 'You tend to build bonds through deep conversation and intellectual exchange',
},
gye: {
  meaningEn: 'Yin Water (陰水) - Dew and Spring, Energy of Sensitivity',
  careerEn: ['Arts', 'Counseling', 'Healthcare', 'Education'],
  relationshipEn: 'You tend to form deep bonds with rich sensitivity and outstanding empathy',
},
```

---

## 작업 2: mbti/types.ts 수정

### 인터페이스에 영문 필드 추가

```typescript
// 기존
export interface MbtiType {
  type: string;
  ohaeng: string;
  nickname: string;
  traits: string[];
  strengths: string[];
  growthPoints: string[];
  career: string[];
  relation: string;
  sajuNote: string;
}

// 수정 후
export interface MbtiType {
  type: string;
  ohaeng: string;
  nickname: string;
  nicknameEn: string;  // 추가
  traits: string[];
  strengths: string[];
  growthPoints: string[];
  career: string[];
  careerEn: string[];  // 추가
  relation: string;
  relationEn: string;  // 추가
  sajuNote: string;
}
```

### 16개 유형별 영문 데이터 추가

```typescript
INTJ: {
  nicknameEn: 'The Architect',
  careerEn: ['Strategic Planning', 'R&D', 'Architecture', 'IT Development', 'Law'],
  relationEn: 'You tend to prefer a small number of deep relationships',
},
INTP: {
  nicknameEn: 'The Logician',
  careerEn: ['Academic Research', 'Philosophy', 'Programming', 'Mathematics', 'Science'],
  relationEn: 'You tend to cherish relationships that provide intellectual stimulation',
},
ENTJ: {
  nicknameEn: 'The Commander',
  careerEn: ['Executive Leadership', 'Consulting', 'Law', 'Strategic Planning', 'Entrepreneurship'],
  relationEn: 'You tend to seek goal-oriented partnerships',
},
ENTP: {
  nicknameEn: 'The Debater',
  careerEn: ['Entrepreneurship', 'Marketing', 'Law', 'Creative Industries', 'Consulting'],
  relationEn: 'You tend to enjoy stimulating and dynamic relationships',
},
INFJ: {
  nicknameEn: 'The Advocate',
  careerEn: ['Counseling', 'Writing', 'Education', 'Social Work', 'Healthcare'],
  relationEn: 'You tend to value deep, meaningful connections',
},
INFP: {
  nicknameEn: 'The Mediator',
  careerEn: ['Writing', 'Arts', 'Counseling', 'Education', 'Social Work'],
  relationEn: 'You tend to seek authentic and value-aligned relationships',
},
ENFJ: {
  nicknameEn: 'The Protagonist',
  careerEn: ['Teaching', 'Coaching', 'HR', 'Social Work', 'Media'],
  relationEn: 'You tend to actively nurture warm and caring relationships',
},
ENFP: {
  nicknameEn: 'The Campaigner',
  careerEn: ['Creative Arts', 'Marketing', 'Journalism', 'Coaching', 'Entertainment'],
  relationEn: 'You tend to value relationships full of emotion and inspiration',
},
ISTJ: {
  nicknameEn: 'The Logistician',
  careerEn: ['Accounting', 'Administration', 'Law', 'Military', 'Finance'],
  relationEn: 'You tend to build trust through reliability and consistency',
},
ISFJ: {
  nicknameEn: 'The Defender',
  careerEn: ['Healthcare', 'Education', 'Social Work', 'Administration', 'Childcare'],
  relationEn: 'You tend to show loyalty and dedicated care in relationships',
},
ESTJ: {
  nicknameEn: 'The Executive',
  careerEn: ['Management', 'Military', 'Law', 'Finance', 'Administration'],
  relationEn: 'You tend to value clear roles and responsibilities in relationships',
},
ESFJ: {
  nicknameEn: 'The Consul',
  careerEn: ['Healthcare', 'Education', 'HR', 'Service', 'Event Planning'],
  relationEn: 'You tend to create harmony and take care of those around you',
},
ISTP: {
  nicknameEn: 'The Virtuoso',
  careerEn: ['Engineering', 'IT', 'Mechanical', 'Military', 'Sports'],
  relationEn: 'You tend to prefer relationships that respect each other\'s independence',
},
ISFP: {
  nicknameEn: 'The Adventurer',
  careerEn: ['Arts', 'Design', 'Healthcare', 'Nature-related', 'Crafts'],
  relationEn: 'You tend to express care through actions rather than words',
},
ESTP: {
  nicknameEn: 'The Entrepreneur',
  careerEn: ['Sales', 'Entrepreneurship', 'Sports', 'Marketing', 'Emergency Services'],
  relationEn: 'You tend to enjoy exciting and active relationships',
},
ESFP: {
  nicknameEn: 'The Entertainer',
  careerEn: ['Entertainment', 'Hospitality', 'Education', 'Sales', 'Event Planning'],
  relationEn: 'You tend to bring joy and excitement to relationships',
},
```

---

## 작업 3: result-generator.ts 추가 수정

### 3-1. buildIlganAnalysis 수정

```typescript
// 기존 (locale 분기 없이 한국어 데이터 직접 사용)
const careerHint = data?.career?.join(', ') || '다양한 분야';
const relationHint = data?.relationship || '진실한 소통을 중시하는 경향이 있습니다';

// 수정 후
const careerHint = locale === 'ko'
  ? (data?.career?.join(', ') || '다양한 분야')
  : (data?.careerEn?.join(', ') || 'Various Fields');
const relationHint = locale === 'ko'
  ? (data?.relationship || '진실한 소통을 중시하는 경향이 있습니다')
  : (data?.relationshipEn || 'You tend to value sincere communication');
```

### 3-2. buildIlganAnalysis subItems 수정

```typescript
// 기존
subItems: data ? [
  { label: '오행 속성', value: data.ohaeng + (data.eumsang === 'yang' ? ' 양(陽)' : ' 음(陰)') },
  { label: '핵심 기운', value: data.meaning },
] : undefined,

// 수정 후
subItems: data ? [
  {
    label: locale === 'ko' ? '오행 속성' : 'Element',
    value: data.ohaeng + (data.eumsang === 'yang' ? ' 양(陽)' : ' 음(陰)')
  },
  {
    label: locale === 'ko' ? '핵심 기운' : 'Core Energy',
    value: locale === 'ko' ? data.meaning : (data.meaningEn || data.meaning)
  },
] : undefined,
```

### 3-3. buildCareerSection MBTI 추가 텍스트 수정

```typescript
// 기존
const mbtiAdd = mbtiType
  ? ` MBTI ${mbtiType}의 특성이 더해져 ${mbtiTypes[mbtiType]?.career?.slice(0, 2).join(', ')} 분야에서도 유리한 기운이 있습니다.`
  : '';

// 수정 후
const mbtiAdd = mbtiType
  ? locale === 'ko'
    ? ` MBTI ${mbtiType}의 특성이 더해져 ${mbtiTypes[mbtiType]?.career?.slice(0, 2).join(', ')} 분야에서도 유리한 기운이 있습니다.`
    : ` Combined with your MBTI ${mbtiType} characteristics, you also have favorable energy in fields such as ${mbtiTypes[mbtiType]?.careerEn?.slice(0, 2).join(', ') || mbtiTypes[mbtiType]?.career?.slice(0, 2).join(', ')}.`
  : '';
```

### 3-4. buildLoveSection MBTI 추가 텍스트 수정

```typescript
// 기존
const mbtiLoveAdd = mbtiType
  ? ` MBTI ${mbtiType}의 특성상 ${mbtiTypes[mbtiType]?.relation || '진실한 관계를 소중히 여기는 경향이 있습니다'}.`
  : '';

// 수정 후
const mbtiLoveAdd = mbtiType
  ? locale === 'ko'
    ? ` MBTI ${mbtiType}의 특성상 ${mbtiTypes[mbtiType]?.relation || '진실한 관계를 소중히 여기는 경향이 있습니다'}.`
    : ` Reflecting MBTI ${mbtiType} traits, ${mbtiTypes[mbtiType]?.relationEn || mbtiTypes[mbtiType]?.relation || 'you tend to value genuine relationships'}.`
  : '';
```

### 3-5. buildMbtiSajuSection 수정

```typescript
// 기존
const content = `MBTI ${mbtiType}(${mbtiInfo.nickname})의 특성과 사주 ...`

// 수정 후
const content = locale === 'ko'
  ? `MBTI ${mbtiType}(${mbtiInfo.nickname})의 특성과 사주 ${ohaeng} 기운의 교차 분석입니다. ${combDesc} ${mbtiInfo.strengths?.[0] || ''} ${mbtiInfo.growthPoints?.[0] || ''}`
  : `This is a fusion analysis of MBTI ${mbtiType} (${mbtiInfo.nicknameEn || mbtiInfo.nickname}) traits and the ${ohaeng} energy from your Four Pillars. ${combDesc} ${mbtiInfo.strengths?.[0] || ''} ${mbtiInfo.growthPoints?.[0] || ''}`;
```

```typescript
// subItems 수정
subItems: [
  { label: locale === 'ko' ? 'MBTI 유형' : 'MBTI Type', value: `${mbtiType} - ${locale === 'ko' ? mbtiInfo.nickname : (mbtiInfo.nicknameEn || mbtiInfo.nickname)}` },
  { label: locale === 'ko' ? 'MBTI 오행' : 'MBTI Element', value: mbtiInfo.ohaeng },
  { label: locale === 'ko' ? '사주 일간 오행' : 'Day Stem Element', value: ohaeng },
  { label: locale === 'ko' ? '조합 특성' : 'Combination Trait', value: combDesc.split('.')[0] },
],
```

### 3-6. analysisBox 라벨 수정 (generateResult 내부)

```typescript
// 기존
const analysisBox = {
  ilgan: `일간: ${saju.ilgan}(${getIlganHanja(saju.ilgan)})`,
  wolji: `월지: ${saju.month.jiji}(${getJijiHanja(saju.month.jiji)})`,
  ...
  soundOhaeng: (name.soundOhaengList?.join('-') || '') +
    (name.soundOhaengRelation?.includes('상생') ? ' (상생)' :
     name.soundOhaengRelation?.includes('중화') ? ' (중화)' : ' (상극)'),
  mbtiOhaeng: mbtiType ? `MBTI: ${mbtiType} → 오행 ${mbtiToOhaeng(mbtiType)} 매핑` : undefined,
};

// 수정 후
const soundRelationLabel = locale === 'ko'
  ? (name.soundOhaengRelation?.includes('상생') ? ' (상생)' : name.soundOhaengRelation?.includes('중화') ? ' (중화)' : ' (상극)')
  : (name.soundOhaengRelation?.includes('상생') ? ' (Mutual Generation)' : name.soundOhaengRelation?.includes('중화') ? ' (Neutral)' : ' (Mutual Overcoming)');

const analysisBox = {
  ilgan: locale === 'ko'
    ? `일간: ${saju.ilgan}(${getIlganHanja(saju.ilgan)})`
    : `Day Stem: ${saju.ilgan}(${getIlganHanja(saju.ilgan)})`,
  wolji: locale === 'ko'
    ? `월지: ${saju.month.jiji}(${getJijiHanja(saju.month.jiji)})`
    : `Month Branch: ${saju.month.jiji}(${getJijiHanja(saju.month.jiji)})`,
  wongyeok: name.wongyeok,
  hyeongyeok: name.hyeongyeok,
  soundOhaeng: (name.soundOhaengList?.join('-') || '') + soundRelationLabel,
  mbtiOhaeng: mbtiType
    ? locale === 'ko'
      ? `MBTI: ${mbtiType} → 오행 ${mbtiToOhaeng(mbtiType)} 매핑`
      : `MBTI: ${mbtiType} → Element ${mbtiToOhaeng(mbtiType)} Mapping`
    : undefined,
};
```

---

## 주의사항

1. **기존 한국어 필드는 절대 삭제하지 않는다** - `career`, `relationship`, `relation` 등 기존 필드 유지
2. **영문 필드만 추가**한다 - `careerEn`, `relationshipEn`, `relationEn`, `meaningEn`, `nicknameEn`
3. **TypeScript 컴파일 오류 없어야 한다**
4. 작업 완료 후 반드시 `npm run build` 실행하여 확인

---

## 완료 기준

`/en/result/[id]` 접속 시 한국어가 단 한 글자도 섞이지 않아야 함.
(단, 한자(甲, 癸, 子 등)는 유지해도 됨 — 동양 문화적 요소이므로)
