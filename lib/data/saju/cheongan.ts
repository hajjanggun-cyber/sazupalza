// 천간(天干) 10개 - 삼명통회/자평진전/적천수 원리 기반
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

export const cheonganData: Record<string, Cheongan> = {
  gap: {
    key: 'gap', name: '갑', hanja: '甲', ohaeng: '목', eumsang: 'yang',
    meaning: '양목(陽木) - 큰 나무, 성장의 기운',
    traits: ['리더십이 강한 경향이 있습니다', '추진력이 있는 경향이 있습니다', '직선적인 경향이 있습니다'],
    strengths: ['새로운 일을 시작하는 데 유리한 기운입니다', '목표를 향해 꾸준히 나아가는 경향이 있습니다'],
    growthPoints: ['때로는 고집이 강해질 수 있어 유연성을 기르는 것이 좋습니다', '타인의 의견을 경청하는 연습이 도움이 될 수 있습니다'],
    career: ['경영', '교육', '개척이 필요한 분야'],
    relationship: '솔직하고 직접적인 소통을 선호하는 경향이 있습니다',
  },
  eul: {
    key: 'eul', name: '을', hanja: '乙', ohaeng: '목', eumsang: 'eum',
    meaning: '음목(陰木) - 풀과 꽃, 유연함의 기운',
    traits: ['섬세한 경향이 있습니다', '적응력이 뛰어난 경향이 있습니다', '감수성이 풍부한 경향이 있습니다'],
    strengths: ['인간관계에 유리한 기운입니다', '예술적 감각에 유리한 기운입니다'],
    growthPoints: ['결정을 내리는 데 시간이 걸릴 수 있어 결단력을 기르면 좋습니다'],
    career: ['예술', '서비스업', '상담'],
    relationship: '배려심이 깊고 공감 능력이 뛰어난 경향이 있습니다',
  },
  byeong: {
    key: 'byeong', name: '병', hanja: '丙', ohaeng: '화', eumsang: 'yang',
    meaning: '양화(陽火) - 태양, 밝음의 기운',
    traits: ['활발한 경향이 있습니다', '열정적인 경향이 있습니다', '표현력이 풍부한 경향이 있습니다'],
    strengths: ['사람들과 어울리는 데 유리한 기운입니다', '발표와 표현에 유리한 기운입니다'],
    growthPoints: ['때로는 충동적인 면이 있어 신중함을 기르는 것이 좋습니다'],
    career: ['연예', '교육', '마케팅', '서비스'],
    relationship: '밝고 활발한 에너지로 주변을 즐겁게 하는 경향이 있습니다',
  },
  jeong: {
    key: 'jeong', name: '정', hanja: '丁', ohaeng: '화', eumsang: 'eum',
    meaning: '음화(陰火) - 촛불, 따뜻함의 기운',
    traits: ['따뜻한 경향이 있습니다', '섬세한 경향이 있습니다', '집중력이 좋은 경향이 있습니다'],
    strengths: ['깊이 있는 인간관계에 유리한 기운입니다', '예술적 표현에 유리한 기운입니다'],
    growthPoints: ['때로는 과도하게 걱정하는 경향이 있어 마음의 여유를 갖는 것이 좋습니다'],
    career: ['예술', '의료', '연구', '상담'],
    relationship: '진심 어린 관심과 배려로 깊은 유대감을 형성하는 경향이 있습니다',
  },
  mu: {
    key: 'mu', name: '무', hanja: '戊', ohaeng: '토', eumsang: 'yang',
    meaning: '양토(陽土) - 산과 대지, 안정의 기운',
    traits: ['신뢰감 있는 경향이 있습니다', '안정적인 경향이 있습니다', '포용력이 있는 경향이 있습니다'],
    strengths: ['조직 관리에 유리한 기운입니다', '중재자 역할에 유리한 기운입니다'],
    growthPoints: ['변화에 적응하는 속도를 높이는 연습이 도움이 될 수 있습니다'],
    career: ['경영', '부동산', '금융', '행정'],
    relationship: '믿음직하고 안정감을 주는 존재가 되는 경향이 있습니다',
  },
  gi: {
    key: 'gi', name: '기', hanja: '己', ohaeng: '토', eumsang: 'eum',
    meaning: '음토(陰土) - 밭과 논, 실용의 기운',
    traits: ['실용적인 경향이 있습니다', '세심한 경향이 있습니다', '성실한 경향이 있습니다'],
    strengths: ['세밀한 계획 수립에 유리한 기운입니다', '실질적인 문제 해결에 강한 경향이 있습니다'],
    growthPoints: ['때로는 소심해질 수 있어 자신감을 키우는 것이 좋습니다'],
    career: ['농업', '식품', '서비스', '행정'],
    relationship: '성실하고 꼼꼼하게 관계를 가꾸어 나가는 경향이 있습니다',
  },
  gyeong: {
    key: 'gyeong', name: '경', hanja: '庚', ohaeng: '금', eumsang: 'yang',
    meaning: '양금(陽金) - 강철과 바위, 결단의 기운',
    traits: ['결단력이 강한 경향이 있습니다', '의리를 중시하는 경향이 있습니다', '정의감이 강한 경향이 있습니다'],
    strengths: ['어려운 결정을 내리는 데 유리한 기운입니다', '조직에서 리더십을 발휘하기에 유리한 기운입니다'],
    growthPoints: ['때로는 너무 엄격할 수 있어 유연성을 기르는 것이 좋습니다'],
    career: ['법조', '군경', '금융', '제조업'],
    relationship: '의리 있고 믿음직한 파트너가 되는 경향이 있습니다',
  },
  sin: {
    key: 'sin', name: '신', hanja: '辛', ohaeng: '금', eumsang: 'eum',
    meaning: '음금(陰金) - 보석과 칼날, 정밀함의 기운',
    traits: ['완벽주의적인 경향이 있습니다', '예리한 경향이 있습니다', '미적 감각이 있는 경향이 있습니다'],
    strengths: ['정밀한 작업에 유리한 기운입니다', '분석력이 뛰어난 경향이 있습니다'],
    growthPoints: ['완벽을 추구하다 스트레스를 받을 수 있어 적당한 기준을 설정하는 것이 좋습니다'],
    career: ['의료', '법조', '디자인', '연구'],
    relationship: '높은 기준을 가지고 있으며 진실한 관계를 추구하는 경향이 있습니다',
  },
  im: {
    key: 'im', name: '임', hanja: '壬', ohaeng: '수', eumsang: 'yang',
    meaning: '양수(陽水) - 큰 강과 바다, 지혜의 기운',
    traits: ['지혜로운 경향이 있습니다', '통찰력이 있는 경향이 있습니다', '자유로운 경향이 있습니다'],
    strengths: ['큰 그림을 보는 데 유리한 기운입니다', '창의적 사고에 유리한 기운입니다'],
    growthPoints: ['때로는 집중력이 분산될 수 있어 한 가지에 집중하는 연습이 도움이 될 수 있습니다'],
    career: ['학문', '철학', 'IT', '전략기획'],
    relationship: '깊은 대화와 지적 교류를 통해 유대감을 쌓는 경향이 있습니다',
  },
  gye: {
    key: 'gye', name: '계', hanja: '癸', ohaeng: '수', eumsang: 'eum',
    meaning: '음수(陰水) - 이슬과 샘물, 감성의 기운',
    traits: ['감성적인 경향이 있습니다', '직관력이 뛰어난 경향이 있습니다', '섬세한 경향이 있습니다'],
    strengths: ['예술적 감수성에 유리한 기운입니다', '타인의 감정을 이해하는 데 유리한 기운입니다'],
    growthPoints: ['감정에 쉽게 영향을 받을 수 있어 심리적 안정을 위한 루틴을 갖는 것이 좋습니다'],
    career: ['예술', '상담', '의료', '교육'],
    relationship: '감수성이 풍부하고 공감 능력이 뛰어나 깊은 유대감을 형성하는 경향이 있습니다',
  },
};
