export interface FaceCombo {
  parts: {
    forehead: string;
    eyes: string;
    nose: string;
  };
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  personality: string;
  personalityEn: string;
  career: string;
  careerEn: string;
  caution: string;
  cautionEn: string;
}

export const FACE_COMBOS: FaceCombo[] = [
  {
    parts: { forehead: '넓은 이마', eyes: '크고 또렷한 눈', nose: '높은 콧대' },
    title: '두뇌형 리더',
    titleEn: 'The Intellectual Leader',
    summary: '뛰어난 지적 능력과 강력한 추진력을 바탕으로 조직을 이끄는 카리스마 넘치는 유형입니다.',
    summaryEn: 'A charismatic type who leads organizations based on outstanding intellectual ability and strong drive.',
    personality: '넓은 이마가 주는 거시적인 기획력과 크고 또렷한 눈의 통찰력이 만나 미래를 내다보는 안목이 탁월합니다. 여기에 높은 콧대의 굳건한 자존심과 추진력이 더해져, 한 번 세운 목표는 흔들림 없이 밀어붙입니다. 감성이 풍부하면서도 논리적이어서 타인을 매료시키고 강하게 이끄는 타고난 리더의 기질을 뿜어냅니다.',
    personalityEn: 'The macroscopic planning ability from a broad forehead meets the insight of large, clear eyes to provide excellent foresight. Added to this is the firm pride and drive of a high nose bridge, pushing through goals once set without wavering. Rich in emotion yet logical, you exude the traits of a born leader who fascinates and strongly guides others.',
    career: '대기업 임원, 전략 기획자, 정치인, 벤처 사업가 등 큰 조직을 운영하고 새로운 비전을 제시하는 직업에 최적화되어 있습니다.',
    careerEn: 'Optimized for jobs that run large organizations and present new visions, such as corporate executive, strategic planner, politician, and venture entrepreneur.',
    caution: '강한 자존심과 자기 확신이 때로는 독단으로 비칠 수 있으니, 주변의 조언에 귀를 열고 수용하는 유연성을 기르세요.',
    cautionEn: 'Strong pride and self-assurance can sometimes appear dogmatic, so develop the flexibility to open your ears and accept advice from those around you.'
  },
  {
    parts: { forehead: '넓은 이마', eyes: '크고 또렷한 눈', nose: '부드러운 코' },
    title: '공감형 비저너리',
    titleEn: 'Empathetic Visionary',
    summary: '뛰어난 통찰력과 따뜻한 포용력으로 사람들의 마음을 움직이며 미래를 개척하는 유형입니다.',
    summaryEn: 'A type that moves people\'s hearts and pioneers the future with excellent insight and warm inclusiveness.',
    personality: '넓은 이마와 또렷한 눈이 결합하여 창의적인 아이디어와 예술적 감수성이 매우 풍부합니다. 여기에 부드러운 코가 주는 협동심과 유연성이 더해져, 독단적이지 않고 타인과 교감하며 뜻을 모으는 능력이 탁월합니다. 날카로운 지성을 지녔으나 태도가 온화하여 어딜 가나 좋은 평판과 인기를 얻습니다.',
    personalityEn: 'A broad forehead and clear eyes combine to provide rich creative ideas and artistic sensibility. Added to this is the cooperativeness and flexibility of a soft nose, giving you excellent ability to empathize and gather consensus without being dogmatic. Possessing sharp intellect but a gentle attitude, you gain good reputation and popularity wherever you go.',
    career: '교육자, 심리 상담가, 문화예술 기획자, 인사(HR) 담당자 등 사람의 가능성을 키우고 소통하는 분야에서 크게 성공합니다.',
    careerEn: 'You succeed greatly in fields that develop human potential and communicate, such as educator, psychological counselor, cultural arts planner, and HR manager.',
    caution: '사람을 향한 깊은 공감 능력이 자칫 감정적 피로로 이어질 수 있으니, 자신만의 객관적인 기준을 명확히 세우는 것이 중요합니다.',
    cautionEn: 'Deep empathetic ability towards people can easily lead to emotional fatigue, so it is important to clearly establish your own objective standards.'
  },
  {
    parts: { forehead: '넓은 이마', eyes: '가는 눈', nose: '높은 콧대' },
    title: '냉철한 전략가',
    titleEn: 'Cool-headed Strategist',
    summary: '예리한 분석력과 거시적 안목을 동시에 갖추고 목표를 향해 치밀하게 전진하는 유형입니다.',
    summaryEn: 'A type that advances meticulously towards goals, possessing both sharp analytical skills and a macroscopic perspective.',
    personality: '넓은 이마의 기획력에 가는 눈이 주는 고도의 집중력과 분석력이 합쳐져 사물의 본질을 차갑고 정확하게 꿰뚫어 봅니다. 높은 콧대가 의미하는 독립심과 강한 결단력이 시너지를 내어, 위기 상황에서도 감정에 흔들리지 않고 냉철한 해결책을 도출합니다. 철저한 계산과 치밀한 준비로 실수를 용납하지 않는 완벽주의자입니다.',
    personalityEn: 'The planning ability of a broad forehead combines with the high concentration and analytical skills of thin eyes to coldly and accurately pierce the essence of things. The independence and strong decisiveness meant by a high nose bridge create synergy, deriving cool-headed solutions without being swayed by emotions even in crises. You are a perfectionist who does not tolerate mistakes through thorough calculation and meticulous preparation.',
    career: '금융 투자자, 법조인, 전문 연구원, IT 최고 기술 책임자 등 정밀한 판단과 고도의 전문성이 요구되는 분야에 매우 적합합니다.',
    careerEn: 'Highly suitable for fields requiring precise judgment and high expertise, such as financial investor, lawyer, professional researcher, and IT Chief Technology Officer.',
    caution: '지나친 완벽주의와 차가운 이성이 주변 사람들을 긴장하게 만들 수 있으니, 의식적으로 따뜻한 미소와 칭찬을 나누어 보세요.',
    cautionEn: 'Excessive perfectionism and cold reason can make people around you tense, so consciously share warm smiles and compliments.'
  },
  {
    parts: { forehead: '넓은 이마', eyes: '가는 눈', nose: '부드러운 코' },
    title: '실용적 조율자',
    titleEn: 'Practical Coordinator',
    summary: '뛰어난 두뇌와 분석력을 지녔으나 유연하고 부드러운 태도로 실속을 챙기는 지혜로운 유형입니다.',
    summaryEn: 'A wise type who possesses an excellent brain and analytical skills but takes care of practical benefits with a flexible and soft attitude.',
    personality: '넓은 이마와 가는 눈의 만남으로 지적 능력이 우수하고 상황을 예리하게 판단하지만, 겉으로는 부드러운 코의 포용력을 보여줍니다. 날카로운 분석을 바탕으로 하되 상대방을 자극하지 않고 타협점을 찾아내는 탁월한 중재 능력을 발휘합니다. 나서서 주도하기보다는 뒤에서 흐름을 읽고 실용적인 이익을 조용히 취하는 외유내강형입니다.',
    personalityEn: 'With the meeting of a broad forehead and thin eyes, intellectual ability is excellent and you judge situations sharply, but outwardly you show the inclusiveness of a soft nose. Based on sharp analysis, you exhibit excellent mediation skills to find a compromise without provoking the opponent. Rather than stepping forward to lead, you are an iron hand in a velvet glove type who reads the flow from behind and quietly takes practical profits.',
    career: '외교관, 전문 협상가, 재무 회계 관리자, 행정 실무자 등 예리한 상황 파악과 원만한 대인 관계가 동시에 필요한 직무에 제격입니다.',
    careerEn: 'Perfect for jobs requiring both sharp situation awareness and smooth interpersonal relationships simultaneously, such as diplomat, professional negotiator, financial accounting manager, and administrative practitioner.',
    caution: '타인과 충돌을 피하려다 정작 자신의 진짜 목소리를 잃어버릴 수 있으니, 결정적일 때는 단호하게 의견을 표출하는 용기가 필요합니다.',
    cautionEn: 'Trying to avoid conflict with others may cause you to lose your true voice, so you need the courage to express your opinion firmly when it counts.'
  },
  {
    parts: { forehead: '표준 이마', eyes: '크고 또렷한 눈', nose: '높은 콧대' },
    title: '행동하는 매력가',
    titleEn: 'Attractive Achiever',
    summary: '안정적인 현실 감각 위에서 자신의 매력을 적극적으로 발산하며 목표를 성취하는 유형입니다.',
    summaryEn: 'A type that achieves goals by actively radiating their charm based on a stable sense of reality.',
    personality: '표준 이마가 주는 중용과 안정감 덕분에 무리한 도박보다는 현실적인 길을 걷습니다. 하지만 크고 또렷한 눈의 풍부한 감수성과 높은 콧대의 굳건한 추진력이 화학반응을 일으켜, 자신이 맡은 분야에서 강렬한 존재감을 뽐냅니다. 안정된 삶의 테두리 안에서 예술적 기질이나 화려한 매력을 과감하게 펼치며 대중의 시선을 사로잡습니다.',
    personalityEn: 'Thanks to the moderation and stability from a standard forehead, you walk a realistic path rather than taking unreasonable gambles. However, the rich sensibility of large, clear eyes and the firm drive of a high nose bridge trigger a chemical reaction, showing off an intense presence in your field. Within the boundaries of a stable life, you boldly unfold your artistic temperament or flashy charm, captivating the public\'s eyes.',
    career: '방송연예계 종사자, 유명 강사, 세일즈 마스터, 디자인 디렉터 등 실용성을 바탕으로 자신을 어필하는 직업에서 큰 성과를 거둡니다.',
    careerEn: 'You achieve great results in jobs that appeal to yourself based on practicality, such as broadcasting and entertainment worker, famous instructor, sales master, and design director.',
    caution: '자존심과 표현 욕구가 강해 현실의 안정을 뒤흔들 수 있으니, 항상 초심의 꾸준함과 겸손함을 유지하는 것이 좋습니다.',
    cautionEn: 'Strong pride and desire for expression can shake the stability of reality, so it is good to always maintain the steadiness and humility of your initial mindset.'
  },
  {
    parts: { forehead: '표준 이마', eyes: '크고 또렷한 눈', nose: '부드러운 코' },
    title: '친화적 평화주의자',
    titleEn: 'Friendly Pacifist',
    summary: '풍부한 감성과 따뜻한 포용력으로 주변에 편안함을 주며 조화로운 삶을 살아가는 유형입니다.',
    summaryEn: 'A type that lives a harmonious life, giving comfort to surroundings with rich emotion and warm inclusiveness.',
    personality: '표준 이마와 부드러운 코의 조합이 흙처럼 편안하고 안정적인 바탕을 만들어줍니다. 여기에 크고 또렷한 눈이 생기와 따뜻한 감수성을 불어넣어, 사람들과 얽히고설키며 살아가는 데 천부적인 소질을 보입니다. 경쟁이나 갈등을 싫어하며, 타인의 아픔에 깊이 공감하고 배려하는 성품으로 어딜 가나 환영받는 분위기 메이커입니다.',
    personalityEn: 'The combination of a standard forehead and soft nose creates a comfortable and stable foundation like earth. Added to this, large and clear eyes breathe vitality and warm sensibility, showing a natural talent for living intertwined with people. Disliking competition or conflict, you deeply empathize with and consider others\' pain, making you a welcomed mood maker wherever you go.',
    career: '사회복지사, 서비스업 관리자, 유아 교육자, 간호사 등 사람을 돌보고 편안하게 해주는 헌신적인 업무에서 진가를 발휘합니다.',
    careerEn: 'You show your true value in devoted work that cares for and comforts people, such as social worker, service industry manager, early childhood educator, and nurse.',
    caution: '좋은 게 좋은 거라는 식의 태도로 인해 정작 맺고 끊음이 불분명해질 수 있으니, 공과 사를 명확히 구분하는 결단력을 더해보세요.',
    cautionEn: 'An attitude of just accepting things as good can make your cut-offs unclear, so try to add decisiveness to clearly distinguish between public and private matters.'
  },
  {
    parts: { forehead: '표준 이마', eyes: '가는 눈', nose: '높은 콧대' },
    title: '뚝심의 장인',
    titleEn: 'Artisan of Perseverance',
    summary: '흔들림 없는 현실 감각과 예리한 집중력으로 한 분야를 깊이 파고들어 대성하는 유형입니다.',
    summaryEn: 'A type that achieves great success by delving deeply into one field with an unshakeable sense of reality and sharp concentration.',
    personality: '표준 이마의 꾸준함과 높은 콧대의 굳건한 자존심이 만나 바위 같은 뚝심을 만들어냅니다. 여기에 가는 눈의 치밀한 분석력이 더해져, 헛된 환상에 빠지지 않고 자신이 정한 현실적인 목표를 향해 집요하게 파고듭니다. 남의 시선이나 화려함에는 관심이 없으며, 오직 실력과 결과물로 자신을 증명하려는 강력한 장인 정신이 돋보입니다.',
    personalityEn: 'The steadiness of a standard forehead and the firm pride of a high nose bridge meet to create rock-like perseverance. With the added meticulous analytical skills of thin eyes, you do not fall into vain illusions but persistently delve towards the realistic goals you have set. Uninterested in others\' gazes or flashiness, your strong craftsmanship to prove yourself solely through skills and results stands out.',
    career: '전문 기술 명장, 정밀 공학자, 외과의사, 회계사 등 극도의 정밀함과 끈기가 요구되는 특수 전문 분야에서 최고의 자리에 오릅니다.',
    careerEn: 'You reach the top position in special professional fields requiring extreme precision and perseverance, such as technical master, precision engineer, surgeon, and accountant.',
    caution: '너무 한 가지에만 몰두하여 주변 상황이나 타인의 감정을 놓치기 쉬우니, 가끔은 시야를 넓혀 세상을 부드럽게 바라보는 여유를 가지세요.',
    cautionEn: 'Focusing too much on one thing makes it easy to miss surrounding situations or others\' emotions, so occasionally broaden your perspective and take the time to look at the world softly.'
  },
  {
    parts: { forehead: '표준 이마', eyes: '가는 눈', nose: '부드러운 코' },
    title: '성실한 관리자',
    titleEn: 'Diligent Manager',
    summary: '꼼꼼한 실무 능력과 원만한 대인 관계로 조직의 기반을 묵묵히 다지는 든든한 유형입니다.',
    summaryEn: 'A reliable type who silently solidifies the foundation of an organization with meticulous practical skills and smooth interpersonal relationships.',
    personality: '표준 이마와 부드러운 코가 어우러져 무리한 모험을 피하고 안정을 최우선으로 추구하는 성향이 강합니다. 그러나 가는 눈의 예리함이 결합하여 결코 어수룩하지 않으며, 매사를 꼼꼼하고 실속 있게 처리하는 흠잡을 데 없는 실무 능력을 보여줍니다. 튀지 않고 묵묵히 자신의 자리를 지키며, 조직이나 가정을 원활하게 굴러가게 만드는 윤활유 같은 존재입니다.',
    personalityEn: 'The blending of a standard forehead and a soft nose creates a strong tendency to avoid unreasonable adventures and prioritize stability. However, combined with the sharpness of thin eyes, you are never clumsy, showing flawless practical skills in handling everything meticulously and profitably. You silently guard your place without standing out, acting as a lubricant that makes the organization or family run smoothly.',
    career: '공무원, 총무 및 인사 관리자, 은행원, 사무직 종사자 등 체계적이고 안정적인 시스템 내에서 관리와 보존을 담당하는 역할에 제격입니다.',
    careerEn: 'Perfect for roles in charge of management and preservation within a systematic and stable system, such as civil servant, general affairs and HR manager, banker, and office worker.',
    caution: '현상 유지에만 만족하면 더 큰 발전의 기회를 놓칠 수 있으니, 자신을 믿고 때로는 새로운 변화를 시도해 보는 용기를 발휘해 보세요.',
    cautionEn: 'Satisfying only with maintaining the status quo may cause you to miss opportunities for greater development, so trust yourself and occasionally exert the courage to try new changes.'
  }
];
