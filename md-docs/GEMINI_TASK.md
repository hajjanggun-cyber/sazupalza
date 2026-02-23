# Gemini 작업 지시서 - 결과 페이지 다국어(영문) 지원

## 프로젝트 개요

- **서비스**: 사주/관상/성명학/MBTI 종합 분석 (sajupalza.cc)
- **기술 스택**: Next.js 14 App Router + next-intl + TypeScript
- **배포**: Vercel (GitHub 자동 배포)
- **지원 언어**: ko(한국어) / en(영어) / ja(일본어) / zh(중국어)

---

## 문제 상황

현재 `/en` 등 영문 접속 시 UI 텍스트는 영어로 나오지만,
**분석 결과 본문 텍스트가 전부 한국어로 하드코딩**되어 있음.

---

## 수정 대상 파일

```
lib/calculator/result-generator.ts  ← 이 파일 하나만 수정
```

총 624줄. 이 파일 외 다른 파일은 건드리지 않는다.

---

## 구현 전략 (반드시 이 방법으로 구현)

### 핵심 원칙
`generateResult()` 함수에 `locale` 파라미터를 추가하고,
각 섹션 빌더 함수에도 `locale`을 전달하여
`locale === 'ko'`이면 한국어, 그 외에는 영어 텍스트를 반환한다.

### 패턴 (모든 텍스트 처리에 이 패턴 사용)

```typescript
// 기존
const title = '직업·재능 운세';

// 수정 후
const title = locale === 'ko' ? '직업·재능 운세' : 'Career & Talent Fortune';
```

---

## generateResult 함수 시그니처 변경

```typescript
// 기존
export function generateResult(params: {
  saju: SajuResult;
  name: NameAnalysisResult;
  face?: FaceAnalysisResult;
  mbtiType?: string;
}): ComprehensiveResult

// 수정 후
export function generateResult(params: {
  saju: SajuResult;
  name: NameAnalysisResult;
  face?: FaceAnalysisResult;
  mbtiType?: string;
  locale?: string;  // 추가
}): ComprehensiveResult
```

내부에서 `const locale = params.locale || 'ko';` 로 기본값 처리.

---

## 각 섹션 빌더 함수 시그니처 변경

모든 빌더 함수에 `locale: string` 파라미터 추가:

```typescript
// 기존
function buildOhaengAnalysis(saju: SajuResult): ResultSection
function buildIlganAnalysis(saju: SajuResult): ResultSection
function buildCareerSection(ohaeng: string, mbtiType?: string): ResultSection
function buildWealthSection(saju: SajuResult, ohaeng: string): ResultSection
function buildLoveSection(ohaeng: string, mbtiType?: string): ResultSection
function buildHealthSection(ohaeng: string): ResultSection
function buildLuckySection(ohaeng: string, guardian: Guardian): ResultSection
function buildNameDetailSection(name: NameAnalysisResult): ResultSection
function buildMbtiSajuSection(mbtiType: string, ohaeng: string): ResultSection

// 수정 후 (locale을 마지막 파라미터로 추가)
function buildOhaengAnalysis(saju: SajuResult, locale: string): ResultSection
function buildIlganAnalysis(saju: SajuResult, locale: string): ResultSection
function buildCareerSection(ohaeng: string, locale: string, mbtiType?: string): ResultSection
function buildWealthSection(saju: SajuResult, ohaeng: string, locale: string): ResultSection
function buildLoveSection(ohaeng: string, locale: string, mbtiType?: string): ResultSection
function buildHealthSection(ohaeng: string, locale: string): ResultSection
function buildLuckySection(ohaeng: string, guardian: Guardian, locale: string): ResultSection
function buildNameDetailSection(name: NameAnalysisResult, locale: string): ResultSection
function buildMbtiSajuSection(mbtiType: string, ohaeng: string, locale: string): ResultSection
```

---

## 섹션별 영문 번역 기준

### 1. buildOhaengAnalysis - 오행 균형 분석

**섹션 제목**
- ko: `'오행 균형 분석'`
- en: `'Five Elements Balance Analysis'`

**오행 설명 (ohaengDesc)**
```
목 → 'Wood (木) Energy - Growth, Creativity, Benevolence'
화 → 'Fire (火) Energy - Passion, Expression, Courtesy'
토 → 'Earth (土) Energy - Balance, Trust, Embrace'
금 → 'Metal (金) Energy - Principle, Decisiveness, Loyalty'
수 → 'Water (水) Energy - Wisdom, Flexibility, Learning'
```

**용신 설명 (yongshinDesc)**
```
목: { yongshin: 'Water (水)', desc: 'Water energy nourishes Wood, replenishing your vital energy' }
화: { yongshin: 'Wood (木)', desc: 'Wood energy fuels Fire, enhancing your vitality' }
토: { yongshin: 'Fire (火)', desc: 'Fire energy strengthens Earth, consolidating your foundation' }
금: { yongshin: 'Earth (土)', desc: 'Earth energy generates Metal, supporting steady growth' }
수: { yongshin: 'Metal (金)', desc: 'Metal energy produces Water, deepening your insight' }
```

**본문 템플릿**
- ko: `사주의 오행 구성을 분석한 결과, ${desc}이 가장 강한 경향이 있습니다...`
- en: `Based on your Four Pillars analysis, ${desc} tends to be the strongest element...`

---

### 2. buildIlganAnalysis - 일간 분석

**섹션 제목**
- ko: `` `일간(日干) 분석 - ${ilgan}(${hanja})` ``
- en: `` `Day Stem (日干) Analysis - ${ilgan}(${hanja})` ``

**일간 설명 (ilganDeep) - 10개 천간 영문 번역**
```
갑(Jiǎ Wood): 'Gab-Wood (甲木) represents Yang Wood energy, like a tall tree growing straight and strong. You tend to have powerful drive toward goals and enjoy pioneering new fields. Leadership comes naturally, along with a kind heart...'

을(Yǐ Wood): 'Eul-Wood (乙木) represents Yin Wood energy, like grass or flowers adapting flexibly to the environment. You tend to have delicate sensitivity and excellent adaptability, showing warmth in relationships...'

병(Bǐng Fire): 'Byeong-Fire (丙火) represents Yang Fire energy, like the sun — bright and warm. You tend to have outstanding sociability and expressiveness, naturally becoming the center of attention...'

정(Dīng Fire): 'Jeong-Fire (丁火) represents Yin Fire energy, like a candle or lantern — gentle and sustained. You tend to have a refined and courteous character with excellent artistic and literary sensibility...'

무(Wù Earth): 'Mu-Earth (戊土) represents Yang Earth energy, like a great mountain — solid and stable. You tend to have great capacity for acceptance and inspire trust. Strong leadership in guiding organizations...'

기(Jǐ Earth): 'Gi-Earth (己土) represents Yin Earth energy, like fertile farmland — nurturing everything. You tend to be meticulous and diligent, skilled at caring for others and fostering harmony...'

경(Gēng Metal): 'Gyeong-Metal (庚金) represents Yang Metal energy, like solid rock or raw ore — strong and direct. You tend to prioritize principles, have strong loyalty, decisive determination and drive...'

신(Xīn Metal): 'Sin-Metal (辛金) represents Yin Metal energy, like a jewel or sharp blade — precise and refined. You tend to have sharp analytical skills and a perfectionist streak...'

임(Rén Water): 'Im-Water (壬水) represents Yang Water energy, like a great river or ocean — broad and deep. You tend to have outstanding insight and strategic thinking...'

계(Guǐ Water): 'Gye-Water (癸水) represents Yin Water energy, like dew or a spring — clear and pure. You tend to have delicate sensitivity and intuition with a rich inner world...'
```

**subItems 레이블**
- ko: `'오행 속성'`, `'핵심 기운'`
- en: `'Element'`, `'Core Energy'`

**본문 템플릿**
- ko: `${desc} 직업적으로는 ${careerHint} 분야에서 본연의 기운을 잘 발휘하는 경향이 있습니다...`
- en: `${desc} Professionally, you tend to express your natural energy well in ${careerHint}...`

---

### 3. buildCareerSection - 직업·재능

**섹션 제목**
- ko: `'직업·재능 운세'`
- en: `'Career & Talent Fortune'`

**careerMap 영문**
```
목(Wood):
  main: 'You tend to excel in fields that value growth and creativity.'
  fields: ['Education & Coaching', 'Publishing & Writing', 'Environment & Ecology', 'Healthcare & Healing', 'Consulting']
  talent: 'You tend to have strong creative execution that turns new ideas into reality. You tend to stand out in roles that develop and lead others, with the ability to set and pursue long-term visions.'
  advice: 'Building a solid foundation early on is important. Rather than rushing, steadily developing expertise tends to bring stable results from your late 30s. Collaborating with Water-energy partners or mentors tends to create synergy.'

화(Fire):
  main: 'You tend to excel in fields involving communication and influence with people.'
  fields: ['Media & Entertainment', 'Marketing & PR', 'Service Industry', 'Food & Restaurant', 'Speaking & Coaching']
  talent: 'You have the ability to move people\'s hearts with outstanding expressiveness and energy. You tend to make your presence felt in public and quickly catch trends to create new opportunities.'
  advice: 'A planned approach rather than impulsive decisions tends to be advantageous long-term. Having a Wood-energy advisor nearby helps with direction. Special attention to financial management is advisable.'

토(Earth):
  main: 'You tend to achieve excellent results in careers based on stability and trust.'
  fields: ['Real Estate & Finance', 'Administration & Civil Service', 'Construction & Interior', 'Agriculture & Food', 'HR & General Affairs']
  talent: 'You tend to have diligence in quietly accomplishing your duties and great capacity to inspire trust in others. You tend to remain the stable center of an organization and steadily build results over time.'
  advice: 'Taking a more open attitude toward new changes and challenges can lead to greater achievements. Encountering Fire-energy tends to bring vitality.'

금(Metal):
  main: 'You tend to demonstrate outstanding capabilities in fields requiring precision and principles.'
  fields: ['Law & Legal', 'Military & Security', 'Manufacturing & Engineering', 'IT & Development', 'Finance & Investment']
  talent: 'You tend to have cold-headed judgment and strong execution. You tend to shine in critical moments with decisiveness that doesn\'t waver even in difficult situations.'
  advice: 'Excessive perfectionism can become stressful. Collaborating with Earth-energy partners who offer stability tends to produce balanced results.'

수(Water):
  main: 'You tend to stand out in careers based on knowledge and insight.'
  fields: ['Academia & Research', 'Philosophy & Psychology', 'Strategic Planning', 'Writing & Authorship', 'Diplomacy & International Affairs']
  talent: 'You tend to discover what others cannot see through deep contemplation and insight. You tend to excel at formulating long-term strategies and solving complex problems.'
  advice: 'Developing execution to connect ideas into action is important. Working with a decisive Metal-energy partner tends to bring great achievements.'
```

**subItems 레이블**
- ko: `'유리한 직업군'`
- en: `'Favorable Career Fields'`

---

### 4. buildWealthSection - 재물

**섹션 제목**
- ko: `'재물·경제 운세'`
- en: `'Wealth & Finance Fortune'`

**wealthMap 영문**
```
high:
  level: 'Stable Wealth Energy'
  detail: 'With sufficient Metal and Earth energy, you have favorable energy for accumulating wealth. Diligent effort tends to bear fruit, and a steady accumulation approach tends to suit you well.'
  advice: 'Long-term stable investment tends to be more favorable than short-term speculation. Real estate, savings, and funds tend to suit your constitution. Wealth tends to become more stable after your 40s.'

mid:
  level: 'Moderate Wealth Energy'
  detail: 'Your wealth energy is balanced. Rewards tend to follow effort, and you tend to maintain steady stability without excessive greed.'
  advice: 'Special attention to expense management is advisable. Reducing impulsive spending and securing emergency funds helps maintain stability. Business with Metal-energy partners tends to be favorable.'

low:
  level: 'Honor/Academic Fortune Favorable'
  detail: 'You tend to have stronger energy for honor or academic achievement than for wealth. Wealth tends to follow when you focus on what you love rather than working solely for money.'
  advice: 'Raising expertise tends to connect to wealth in the long run. Supplementing Earth energy can enhance wealth energy. Complementing wealth energy through partnerships is also a good approach.'
```

**ohaengMoneyTip 영문**
```
목: 'Business in the eastern direction or projects started in spring tend to have higher wealth energy.'
화: 'Wealth energy tends to be activated in service industries or work involving many people.'
토: 'Stable returns can be expected from real estate or tangible assets.'
금: 'Wealth energy tends to be strongly expressed in IT, manufacturing, and finance sectors.'
수: 'Long-term wealth tends to accumulate from knowledge-based income (teaching, writing, consulting).'
```

**subItems 레이블**
- ko: `'재물 기운'`
- en: `'Wealth Energy'`

---

### 5. buildLoveSection - 연애

**섹션 제목**
- ko: `'연애·인연 운세'`
- en: `'Love & Relationship Fortune'`

**loveMap 영문**
```
목(Wood):
  style: 'You tend to value relationships that pursue growth together. You tend to want partnerships that develop each other.'
  ideal: 'You tend to match well with intellectual and progressive partners. Someone who can move forward toward dreams together can be a good match.'
  tip: 'Honest expression deepens the relationship. It\'s better to communicate in a timely manner rather than letting emotions build up.'
  challenge: 'Excessive growth desire may burden the partner — respecting the other person\'s pace is important.'

화(Fire):
  style: 'You tend to have a passionate and expressive romantic style. You tend to value sharing feelings honestly.'
  ideal: 'You tend to match well with active, positive-energy partners. Someone who can enjoy new experiences together is a good match.'
  tip: 'Being aware of emotional temperature differences and giving space when the other person needs rest shows consideration.'
  challenge: 'Emotional fluctuations can affect the relationship. Building a stable foundation is important for long-term relationships.'

토(Earth):
  style: 'You tend to pursue stable relationships based on trust. You tend to cherish deep connections built slowly over time.'
  ideal: 'You tend to match well with diligent, responsible partners. Someone who can share the small joys of everyday life is a good match.'
  tip: 'Being a little more proactive in emotional expression can make the relationship warmer.'
  challenge: 'Fear of change can cause relationships to stagnate. Trying new things together occasionally is good.'

금(Metal):
  style: 'You tend to pursue serious and loyal relationships. Once your heart opens, you tend to form deep and unwavering bonds.'
  ideal: 'You tend to match well with trustworthy partners who have principles. A relationship where each respects the other\'s space is good.'
  tip: 'Expressing emotions a bit more flexibly can warm the relationship. Enjoy the process of growing together rather than seeking a perfect partner.'
  challenge: 'High standards may sometimes burden the partner. Flexibility in accepting differences is needed.'

수(Water):
  style: 'You tend to want deep relationships where intellectual empathy can be shared. You pursue genuine connection over superficial relationships.'
  ideal: 'You tend to match well with partners rich in intellectual curiosity and with whom conversation flows. Someone who understands your inner world is a good match.'
  tip: 'You may tend to prioritize rational judgment over emotion. Making an effort to listen to the partner\'s emotional needs also deepens the relationship.'
  challenge: 'Not revealing your inner self well can cause misunderstandings. Showing emotions a bit more openly to trusted people is helpful.'
```

**subItems 레이블**
- ko: `'연애 스타일'`
- en: `'Relationship Style'`

---

### 6. buildHealthSection - 건강

**섹션 제목**
- ko: `'건강·체질 분석'`
- en: `'Health & Constitution Analysis'`

**healthMap 영문**
```
목(Wood):
  organ: 'Liver, Gallbladder, Muscles, Eyes'
  risk: 'It is advisable to pay attention to liver function, eye fatigue, and muscle stiffness. Stress buildup can affect liver function.'
  tip: 'Regular exercise and sufficient sleep help maintain healthy Wood energy. Frequently consuming green vegetables is beneficial.'
  food: 'Green foods such as broccoli, spinach, green tea, and kiwi are helpful.'
  exercise: 'Exercises that keep the body flexible such as yoga, stretching, hiking, and walking are good.'

화(Fire):
  organ: 'Heart, Small Intestine, Blood Circulation, Tongue'
  risk: 'Attention to the heart and circulatory system is needed. Excessive excitement or stress can burden the heart.'
  tip: 'Cooling the mind\'s heat through adequate rest and meditation is advisable. Red foods benefit heart energy.'
  food: 'Tomatoes, strawberries, pomegranates, and red peppers are helpful.'
  exercise: 'Swimming, light aerobic exercise, meditation, and breathing exercises are good.'

토(Earth):
  organ: 'Stomach, Spleen, Digestive System, Mouth'
  risk: 'It is advisable to pay attention to digestive function and the stomach. Stress can affect digestion, and it is good to avoid overeating.'
  tip: 'Regular meal times and a balanced diet are important. Yellow foods support spleen energy.'
  food: 'Brown rice, sweet potatoes, pumpkin, and ginger are helpful for digestion.'
  exercise: 'Balanced exercises such as walking, tai chi, and pilates are good.'

금(Metal):
  organ: 'Lungs, Large Intestine, Respiratory System, Skin, Nose'
  risk: 'Attention to the lungs, respiratory system, and skin is needed. Respiratory care is important in dry environments.'
  tip: 'Fresh air and regular breathing exercises benefit Metal energy. White foods strengthen lung energy.'
  food: 'Garlic, onion, pear, lotus root, and bellflower root are helpful for the respiratory system.'
  exercise: 'Running, swimming, breathing exercises, and aerobic exercise are good.'

수(Water):
  organ: 'Kidneys, Bladder, Bones, Ears, Reproductive System'
  risk: 'Attention to kidney, bladder, and bone health is needed. Overwork and dehydration can affect the kidneys.'
  tip: 'Sufficient water intake and adequate rest keep Water energy healthy. Black foods benefit kidney energy.'
  food: 'Black beans, black rice, blueberries, black sesame, and seaweed are helpful.'
  exercise: 'Swimming, yoga, meditation, and stretching are good.'
```

**subItems 레이블**
- ko: `'유의 신체 부위'`, `'도움이 되는 식품'`, `'추천 운동'`
- en: `'Body Parts to Watch'`, `'Beneficial Foods'`, `'Recommended Exercise'`

---

### 7. buildLuckySection - 개운법

**섹션 제목**
- ko: `'개운법 & 행운 아이템'`
- en: `'Fortune Tips & Lucky Items'`

**luckyMap 영문**
```
목(Wood):
  color: 'Green, Teal, Blue'
  direction: 'East'
  season: 'Spring (March–May)'
  tip: [
    'Placing green accessories or plants on your desk or in the living room tends to increase your energy',
    'Sleeping with your head facing east or receiving morning sunlight through eastern windows is beneficial',
    'New beginnings (starting a business, moving, new projects) in spring tend to have favorable energy',
    'Things related to wood (woodworking, gardening, hiking) help bring peace of mind'
  ]
  item: 'Green plants, wooden accessories, emerald-toned jewelry'

화(Fire):
  color: 'Red, Orange, Purple'
  direction: 'South'
  season: 'Summer (June–August)'
  tip: [
    'Bright-colored interior decor increases vitality and positive energy',
    'Placing bright lighting in the southern direction tends to activate energy',
    'Important presentations or meetings between 10am–2pm tend to be more favorable',
    'Warm-colored clothing tends to make a good impression on people'
  ]
  item: 'Red accessories, candles, warm-toned jewelry'

토(Earth):
  color: 'Gold, Yellow, Beige, Brown'
  direction: 'Center'
  season: 'Seasonal transitions (March, June, Sept, Dec)'
  tip: [
    'Organizing the space with yellow or beige accessories increases the sense of stability',
    'Earth-related hobbies (pottery, gardening, home farming) help calm the mind and body',
    'Keeping the center of the home clean allows energy to spread evenly',
    'A regular daily rhythm tends to strengthen Earth energy'
  ]
  item: 'Ochre-colored ceramics, crystals, golden accessories'

금(Metal):
  color: 'White, Silver, Gold'
  direction: 'West'
  season: 'Autumn (September–November)'
  tip: [
    'A clean and minimal space organization increases Metal energy',
    'Placing metallic accessories or mirrors in the western direction is good',
    'Autumn is favorable energy for important decisions or planning',
    'White clothing gives a clean and trustworthy image'
  ]
  item: 'White or silver accessories, metal items, crystal-toned jewelry'

수(Water):
  color: 'Black, Deep Navy, Dark Blue'
  direction: 'North'
  season: 'Winter (December–February)'
  tip: [
    'Water-related accessories (fish tanks, fountains, water paintings) increase Water energy',
    'Having a study or library in the northern direction tends to improve concentration',
    'Meditation or reading tends to deepen Water energy',
    'Writing a gratitude journal or having time for self-reflection is helpful'
  ]
  item: 'Black or navy accessories, water-related items, lapis lazuli-toned jewelry'
```

**subItems 레이블**
- ko: `'행운 색상'`, `'행운 방향'`, `'행운 계절'`, `'추천 아이템'`, `'행운 숫자'`
- en: `'Lucky Color'`, `'Lucky Direction'`, `'Lucky Season'`, `'Recommended Items'`, `'Lucky Numbers'`

**본문 템플릿**
- ko: `` `수호신 ${guardian.nameKo}(${guardian.nameEn})의 기운을 받아 ${guardian.luckyMessage}` ``
- en: `` `Receiving the energy of guardian ${guardian.nameEn} (${guardian.nameKo}), ${guardian.luckyMessageEn ?? guardian.luckyMessage}` ``

---

### 8. buildNameDetailSection - 성명학

**섹션 제목**
- ko: `'성명학 상세 분석'`
- en: `'Name Analysis Detail'`

**ratingText 영문**
```
great: 'Very auspicious energy (Great Fortune)'
good: 'Auspicious energy (Fortune)'
neutral: 'Neutral energy (Balanced)'
caution: 'Energy requiring caution (Caution)'
avoid: 'Energy best avoided (Inauspicious)'
```

**soundDesc 영문**
```
상생: 'The sound elements support each other (Mutual Generation), indicating the name\'s energy flows harmoniously.'
중화: 'The sound elements form a balanced neutral relationship, giving the name stable energy.'
상극: 'There is a conflicting relationship (Mutual Overcoming) among the sound elements, which may create tension. Using colors or accessories of favorable elements as a complement can be helpful.'
```

**본문 템플릿**
- ko: `` `이름 "${name.name}"의 성명학 분석 결과입니다...` ``
- en: `` `Here is the name analysis result for "${name.name}"...` ``

**subItems 레이블**
- ko: `'원격(원국)'`, `'형격(성격)'`, `'소리오행'`, `'총 획수'`
- en: `'Won-Gyeok (Total)'`, `'Hyeong-Gyeok (Name)'`, `'Sound Elements'`, `'Total Strokes'`

---

### 9. buildMbtiSajuSection - MBTI 융합

**섹션 제목**
- ko: `` `MBTI·사주 융합 분석 (${mbtiType} × ${ohaeng})` ``
- en: `` `MBTI & Four Pillars Fusion Analysis (${mbtiType} × ${ohaeng})` ``

**combinationDesc - 25개 조합 영문 번역**

금-금: `'Sharp analysis and strong principles create synergy. There tends to be powerful energy for goal achievement, but developing flexibility is advisable.'`
금-목: `'The sharp Metal energy and creative Wood energy tend to create a unique balance. Sharp analysis and creativity tend to produce great results when expressed together.'`
금-화: `'Decisive Metal energy combined with passionate Fire energy tends to create strong drive. Managing this energy well can lead to great achievements.'`
금-토: `'Principled Metal energy and stable Earth energy tend to harmonize, inspiring trust. Practical and systematic work abilities tend to be strong.'`
금-수: `'Sharp Metal energy and deep Water energy tend to create outstanding insight. You tend to stand out particularly in academic or research fields.'`
목-목: `'Growth-oriented energy tends to be further amplified. Creativity and humanity abound, but realistic judgment is also important at times.'`
목-화: `'Creative Wood energy and passionate Fire energy create strong expressiveness. You tend to shine in arts, education, and communication fields.'`
목-토: `'Growing Wood energy and stable Earth energy tend to balance. Best results emerge when creativity and practicality are harmoniously expressed.'`
목-수: `'Creative Wood energy tends to be further strengthened with Water energy support. Learning ability and creativity tend to develop together.'`
목-금: `'Free Wood energy and principled Metal energy tend to create a unique personality in the balance between them.'`
화-화: `'Passion and expressiveness tend to be maximized. Charisma that attracts people is strong, but managing energy is important.'`
화-목: `'Passionate Fire energy tends to develop further receiving Wood energy\'s growth power. Positive and growth-oriented energy abounds.'`
화-토: `'Passionate Fire energy and stable Earth energy tend to combine to express balanced energy.'`
화-금: `'Passionate Fire energy and principled Metal energy tend to combine to express goal-oriented drive.'`
화-수: `'Passionate Fire energy and thoughtful Water energy tend to balance, expressing unique charm.'`
토-토: `'Stability and trust tend to be further strengthened. You tend to become an indispensable presence in an organization.'`
토-목: `'Stable Earth energy meeting creative Wood energy tends to express practical creativity.'`
토-화: `'Stable Earth energy receiving active Fire energy tends to express warm and inclusive energy.'`
토-금: `'Stable Earth energy and principled Metal energy tend to combine to express trusted leadership.'`
토-수: `'Stable Earth energy and wise Water energy tend to harmonize to express practical wisdom.'`
수-수: `'The energy of wisdom and learning tends to be further amplified. Insight tends to be outstanding, but developing execution ability is important.'`
수-목: `'Wise Water energy meeting growing Wood energy tends to represent the ideal scholar type.'`
수-화: `'Deep Water energy and passionate Fire energy tend to combine, having both inner depth and outward vitality.'`
수-토: `'Wise Water energy and stable Earth energy tend to harmonize to express wise judgment.'`
수-금: `'Wise Water energy tends to become sharper with Metal energy support.'`

**subItems 레이블**
- ko: `'MBTI 유형'`, `'MBTI 오행'`, `'사주 일간 오행'`, `'조합 특성'`
- en: `'MBTI Type'`, `'MBTI Element'`, `'Day Stem Element'`, `'Combination Trait'`

---

### 10. generateResult 내부 - 요약 줄 & analysisBox

**summaryLines**
```typescript
// ko
`${saju.ilgan} 일간으로 ${strongOhaeng} 기운이 강한 경향이 있습니다`
`성명의 기운이 ${...} 방향으로 작용하는 경향이 있습니다`
`수호신 ${guardian.nameKo}(${guardian.emoji})의 기운이 함께합니다. ${guardian.luckyMessage}`

// en
`Your Day Stem is ${saju.ilgan}, with a strong tendency toward ${strongOhaeng} energy`
`The energy of your name tends to work in a ${...} direction`
`Guardian ${guardian.nameEn} (${guardian.emoji}) is with you. ${guardian.luckyMessageEn ?? guardian.luckyMessage}`
```

**analysisBox 레이블 (한자/기호는 그대로 유지)**
- analysisBox의 텍스트 값 자체는 한국어/한자 혼용이므로 변경하지 않는다.
- 이 부분은 "사주 계산 데이터"이므로 번역 대상이 아님.

---

## generateResult 호출부 수정

`result-generator.ts`를 import하는 파일에서
`generateResult()` 호출 시 `locale` 전달이 필요하다.

해당 파일을 찾는 방법:
```bash
grep -r "generateResult" --include="*.tsx" --include="*.ts" .
```

찾은 파일에서:
```typescript
// 기존
generateResult({ saju, name, face, mbtiType })

// 수정 후 (locale은 next-intl의 useLocale() 또는 params.locale로 획득)
generateResult({ saju, name, face, mbtiType, locale })
```

---

## 주의사항 (절대 하지 말 것)

1. **한자(漢字)는 번역하지 않는다** - `甲`, `庚金`, `子` 등 한자는 그대로 유지
2. **계산 로직은 건드리지 않는다** - 점수 계산, 오행 분석 로직 변경 금지
3. **파일 구조 변경 금지** - 새 파일 생성 금지, `result-generator.ts` 하나만 수정
4. **ja/zh는 이번에 구현하지 않는다** - `locale === 'ko'`이면 한국어, 나머지는 모두 영어
5. **TypeScript 타입 에러 발생 금지** - 컴파일 오류 없이 완성할 것
6. **기존 한국어 텍스트 삭제 금지** - 반드시 `locale === 'ko' ? 한국어 : 영어` 형태 유지

---

## 완성 후 검증 방법

```bash
npm run build
```

빌드가 통과하면 성공. 오류 시 TypeScript 타입 문제부터 확인.

---

## 최종 목표 상태

- `/ko/result/[id]` → 전체 결과가 한국어로 출력
- `/en/result/[id]` → 전체 결과가 영어로 출력
- `/ja/result/[id]` → 영어로 출력 (일본어는 추후 과제)
- `/zh/result/[id]` → 영어로 출력 (중국어는 추후 과제)
