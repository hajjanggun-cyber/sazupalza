import { BlogPost } from './types';

export const bokhapPosts: BlogPost[] = [
  {
    slug: 'palmistry',
    title: 'Korean Palmistry Guide: Reading Life, Heart, and Brain Lines',
    seoTitle: '손금 기초 가이드: 생명선·감정선·두뇌선으로 보는 운명',
    seoTitleEn: 'Korean Palmistry Guide: Reading Life, Heart, and Brain Lines',
    description: '손바닥에 새겨진 인생의 지도! 손금의 3대 핵심 선을 분석하고, 관상과 함께 보았을 때 더욱 정확해지는 한국 전통 손금 보는 법을 공개합니다.',
    descriptionEn: 'Discover the secrets of Korean palm reading. Learn how to analyze life, emotion, and brain lines to understand your fortune and character.',
    keywords: ['손금 기초', '생명선 보는법', '감정선 관상', '두뇌선 의미', '한국 손금'],
    keywordsEn: ['Korean palm reading', 'Korean palmistry', 'Korean hand fortune', 'K-drama palm reading', 'palm reading life line'],
    publishedAt: '2026-02-22',
    category: 'bokhap',
    contentKo: `
<section>
<p>손금은 손바닥에 투영된 뇌의 지도이며, 관상과 함께 볼 때 그 해석이 더욱 정밀해집니다. 손바닥의 언덕과 골짜기는 인생의 굴곡을, 선의 깊이는 에너지의 강도를 의미합니다.</p>

<h2 id="life-line">생명선: 건강과 활력의 척도</h2>
<p>엄지 손가락을 감싸고 도는 생명선은 수명뿐만 아니라 삶을 대하는 에너지의 총량을 보여줍니다. 선이 길고 굵을수록 면역력과 생활력이 강하며, 끊어지거나 섬 문양은 건강상의 주의 신호입니다.</p>

<h2 id="heart-line">감정선: 사랑과 감성의 패턴</h2>
<p>새끼손가락 아래에서 시작해 검지나 중지 쪽으로 향하는 감정선은 타인과의 관계 맺는 방식을 보여줍니다. 끝이 위로 올라가면 열정적이고 적극적인 사랑을, 직선에 가까우면 이성적이고 차분한 감정을 나타냅니다.</p>

<h2 id="head-line">두뇌선: 사고방식과 적성</h2>
<p>생명선과 시작점을 공유하며 손바닥을 가로지르는 두뇌선은 지적 능력과 적성을 나타냅니다. 월구(손바닥 바깥쪽 아래)로 깊게 휘어지면 예술적 상상력이 뛰어나고, 직선으로 뻗으면 논리적이고 실용적인 사고에 능합니다.</p>

<p><strong>결론</strong><br/>
손금은 고정된 것이 아니라, 뇌의 가소성처럼 나의 생각과 행동에 따라 변합니다. 매일 손을 주무르며 긍정적인 선을 만들어가는 것이 최고의 손금 개운법입니다.</p>
</section>
    `,
    contentEn: `
<section>
<p>In Korean tradition, palmistry is known as <strong>Sujang-sul</strong>, a deep analysis of energy lines in sync with facial features. The hills and valleys of your palm map the terrain of your life.</p>

<h2 id="life-line">The Life Line: Vitality and Health</h2>
<p>Wrapping around the thumb, the Life Line indicates not just longevity but the quality of your vitality. A deep, unbroken line suggests strong immunity and resilience.</p>

<h2 id="heart-line">The Heart Line: Emotional Patterns</h2>
<p>Starting under the pinky finger, this line reveals how you process emotions. A line curving upward suggests passionate expression, while a straight line indicates rational emotional control.</p>

<h2 id="head-line">The Head Line: Intellect and Aptitude</h2>
<p>Crossing the center of the palm, the Head Line reflects your thinking style. A curve toward the moon mount indicates creativity, while a straight line suggests logical pragmatism.</p>

<p><strong>Conclusion:</strong> Lines change with your mindset. Massage your hands daily to cultivate positive energy flow.</p>
</section>
    `,
    toc: [
      { id: 'life-line', title: '생명선: 건강과 활력' },
      { id: 'heart-line', title: '감정선: 사랑의 패턴' },
      { id: 'head-line', title: '두뇌선: 사고와 적성' },
    ],
    tocEn: [
      { id: 'life-line', title: 'The Life Line' },
      { id: 'heart-line', title: 'The Heart Line' },
      { id: 'head-line', title: 'The Head Line' },
    ],
    faq: [],
    faqEn: [],
    relatedPosts: [
      { slug: 'eastern-western', title: 'Saju vs MBTI: Comparing Eastern and Western Personality Analysis', category: 'bokhap' },
    ],
  },
  {
    slug: 'eastern-western',
    title: 'Saju vs MBTI: Comparing Eastern and Western Personality Analysis',
    seoTitle: '사주·관상·성명학·MBTI 비교: 동서양 운명 분석법의 모든 것',
    seoTitleEn: 'Saju vs MBTI: Comparing Eastern and Western Personality Analysis',
    description: '나를 아는 네 가지 방법! 사주, 관상, 성명학 그리고 MBTI까지. 동서양의 대표적인 성격 및 운명 분석법의 공통점과 차이점을 심층 비교 분석합니다.',
    descriptionEn: 'Explore the unique fusion of Eastern tradition and Western psychology in Korea. Compare Saju, Gwansang, Naming, and MBTI for a holistic self-understanding.',
    keywords: ['사주 MBTI 비교', '관상학 특징', '성명학 원리', '동서양 심리분석', '운명 분석법'],
    keywordsEn: ['Korean fortune telling comparison', 'Saju vs MBTI', 'Korean eastern western culture', 'K-culture personality fortune', 'Korean face reading analysis'],
    publishedAt: '2026-02-22',
    category: 'bokhap',
    contentKo: `
<section>
<p>사주는 시간, 관상은 형체, MBTI는 심리를 다루는 서로 다른 렌즈입니다. 이들을 통합적으로 활용할 때 비로소 입체적인 자기 이해가 가능합니다.</p>

<h2 id="saju-vs-mbti">사주와 MBTI: 숙명과 경향성</h2>
<p>사주는 태어난 순간 부여받은 기운의 설계도(하드웨어)라면, MBTI는 살아가며 형성된 심리적 선호(소프트웨어)입니다. 사주가 '왜 그런 기질을 가졌는가'를 설명한다면, MBTI는 '그래서 어떻게 행동하는가'를 보여줍니다.</p>

<h2 id="face-reading-role">관상학의 역할: 드러난 운명</h2>
<p>관상은 내면의 기운이 밖으로 드러난 형상입니다. 사주가 보이지 않는 코드라면, 관상은 보이는 모니터입니다. MBTI가 바뀌듯 관상도 마음가짐에 따라 변할 수 있습니다.</p>

<p><strong>결론</strong><br/>
어느 하나가 우월한 것이 아닙니다. 동양의 통찰과 서양의 분석을 함께 활용하여 나라는 우주를 탐구해 보세요.</p>
</section>
    `,
    contentEn: `
<section>
<p>While Saju focuses on cosmic timing, MBTI analyzes psychological preferences. Combining these creates a holistic system for self-mastery.</p>

<h2 id="saju-vs-mbti">Saju vs MBTI: Fate vs Tendency</h2>
<p>Saju is the hardware (blueprint) assigned at birth, while MBTI is the software (preferences) developed over time. Saju explains the "Why," and MBTI explains the "How."</p>

<h2 id="face-reading-role">The Role of Face Reading</h2>
<p>Face reading is the visible monitor of your internal energy. Just as MBTI can shift, your face changes with your mindset.</p>

<p><strong>Conclusion:</strong> Use both Eastern insight and Western analysis to fully explore the universe within you.</p>
</section>
    `,
    toc: [
      { id: 'saju-vs-mbti', title: '사주와 MBTI 비교' },
      { id: 'face-reading-role', title: '관상학의 역할' },
    ],
    tocEn: [
      { id: 'saju-vs-mbti', title: 'Saju vs MBTI' },
      { id: 'face-reading-role', title: 'Role of Face Reading' },
    ],
    faq: [],
    faqEn: [],
    relatedPosts: [
      { slug: 'love-destiny', title: 'Korean Soulmate Destiny: Finding True Love via Saju and MBTI', category: 'bokhap' },
    ],
  },
  {
    slug: 'love-destiny',
    title: 'Korean Soulmate Destiny: Finding True Love via Saju and MBTI',
    seoTitle: '사랑의 운명: 사주 일주와 MBTI로 천생연분 궁합 찾기',
    seoTitleEn: 'Korean Soulmate Destiny: Finding True Love via Saju and MBTI',
    description: '당신의 천생연분은 어디에 있을까요? 사주 일주의 기운과 MBTI 성격 유형을 결합하여 과학적이고 철학적으로 나의 운명적 상대를 찾는 법을 제안합니다.',
    descriptionEn: 'Discover your Korean soulmate destiny. Learn how to find your fated love using the combined power of Saju Day Pillars and MBTI personality types.',
    keywords: ['천생연분 궁합', '사주 일주 사랑', 'MBTI 연애운', '운명적 만남', '일주 궁합표'],
    keywordsEn: ['Korean soulmate destiny', 'K-drama fated love', 'Korean fate love fortune', 'find soulmate Korean way', 'MBTI Saju compatibility'],
    publishedAt: '2026-02-22',
    category: 'bokhap',
    contentKo: `
<section>
<p>진정한 사랑은 타고난 기운의 합(合)과 후천적인 소통의 노력이 만날 때 완성됩니다. 이를 찾는 한국적인 방법을 소개합니다.</p>

<h2 id="finding-soulmate">천생연분을 알아보는 법</h2>
<p>MBTI의 대화 코드가 통하고, 사주 일주의 오행이 서로를 보완해 줄 때 우리는 강한 끌림을 느낍니다. 머리로 이해되는 사람보다 기운으로 편안한 사람이 오래 갑니다.</p>

<h2 id="practical-love-tips">실전 연애 개운법</h2>
<p>나에게 부족한 오행을 가진 사람을 만나는 것이 최고의 개운입니다. 내가 화(火)가 부족하다면 열정적인 사람 곁에 머무르세요.</p>

<p><strong>결론</strong><br/>
운명은 기다리는 것이 아니라, 나를 알고 상대를 알아가는 과정에서 발견됩니다.</p>
</section>
    `,
    contentEn: `
<section>
<p>True love in Korea is seen as a combination of fated Inyeon and psychological compatibility. Here is how to find it.</p>

<h2 id="finding-soulmate">Recognizing Your Soulmate</h2>
<p>When MBTI communication styles align and Saju elements complement each other, a deep bond forms. Trust the energy comfort over logical checklists.</p>

<h2 id="practical-love-tips">Practical Love Tips</h2>
<p>Meeting someone who has the element you lack is the best luck improvement. If you lack Fire, stay close to passionate people.</p>

<p><strong>Conclusion:</strong> Destiny is discovered through the process of knowing yourself and others.</p>
</section>
    `,
    toc: [
      { id: 'finding-soulmate', title: '천생연분 알아보기' },
      { id: 'practical-love-tips', title: '실전 연애 개운법' },
    ],
    tocEn: [
      { id: 'finding-soulmate', title: 'Recognizing Soulmate' },
      { id: 'practical-love-tips', title: 'Love Tips' },
    ],
    faq: [],
    faqEn: [],
    relatedPosts: [
      { slug: 'palmistry', title: 'Korean Palmistry Guide: Reading Life, Heart, and Brain Lines', category: 'bokhap' },
    ],
  },
];
