// 종합 결과 생성기 - 사주/성명학/관상/MBTI 교차 분석
// API 없이 데이터 기반으로 풍부한 결과 생성

import { SajuResult, analyzeOhaengBalance } from './saju-calculator';
import { NameAnalysisResult } from './name-calculator';
import { mbtiTypes } from '../data/mbti/types';
import { ohaengSangsaeng, ohaengSanggeuk } from '../data/saju/ohaeng';
import { guardians, getGuardianByOhaeng, Guardian } from '../data/guardian';
import { cheonganData } from '../data/saju/cheongan';

export interface FaceAnalysisResult {
  faceShape?: string;
  mainFeatures: string[];
  score: number;
  summary: string;
}

// 상세 섹션 인터페이스
export interface ResultSection {
  icon: string;
  title: string;
  content: string;
  subItems?: { label: string; value: string }[];
}

export interface ComprehensiveResult {
  scores: {
    saju: number;
    name: number;
    face: number;
    mbti: number;
    total: number;
  };
  analysisBox: {
    ilgan: string;
    wolji: string;
    wongyeok: number;
    hyeongyeok: number;
    soundOhaeng: string;
    mbtiOhaeng?: string;
  };
  summaryLines: string[];
  // 상세 섹션들 (풍부한 내용)
  ohaengAnalysis: ResultSection;
  ilganAnalysis: ResultSection;
  careerSection: ResultSection;
  wealthSection: ResultSection;
  loveSection: ResultSection;
  healthSection: ResultSection;
  luckySection: ResultSection;
  nameDetailSection: ResultSection;
  mbtiSajuSection?: ResultSection;
  guardian: Guardian;
  missingItems: {
    mbti: boolean;
    time: boolean;
    photo: boolean;
  };
}

// ===== 헬퍼 함수들 =====

function getStrongestOhaeng(balance: Record<string, number>): string {
  return Object.entries(balance).sort((a, b) => b[1] - a[1])[0]?.[0] || '토';
}

function getWeakestOhaeng(balance: Record<string, number>): string {
  const nonZero = Object.entries(balance).filter(([, v]) => v > 0);
  if (nonZero.length === 0) return '수';
  return nonZero.sort((a, b) => a[1] - b[1])[0]?.[0] || '수';
}

function mbtiToOhaeng(mbtiType: string): string {
  return mbtiTypes[mbtiType]?.ohaeng || '토';
}

function getIlganHanja(name: string): string {
  const map: Record<string, string> = {
    '갑': '甲', '을': '乙', '병': '丙', '정': '丁', '무': '戊',
    '기': '己', '경': '庚', '신': '辛', '임': '壬', '계': '癸',
  };
  return map[name] || name;
}

function getJijiHanja(name: string): string {
  const map: Record<string, string> = {
    '자': '子', '축': '丑', '인': '寅', '묘': '卯', '진': '辰',
    '사': '巳', '오': '午', '미': '未', '신': '申', '유': '酉',
    '술': '戌', '해': '亥',
  };
  return map[name] || name;
}

function calcSajuScore(saju: SajuResult): number {
  const balance = analyzeOhaengBalance(saju);
  const total = Object.values(balance).reduce((a, b) => a + b, 0);
  if (total === 0) return 70;
  const maxVal = Math.max(...Object.values(balance));
  const minVal = Math.min(...Object.values(balance).filter(v => v > 0));
  const balanceScore = minVal > 0 ? 100 - (maxVal - minVal) * 8 : 65;
  return Math.max(50, Math.min(95, balanceScore));
}

// ===== 오행 균형 분석 섹션 =====
function buildOhaengAnalysis(saju: SajuResult): ResultSection {
  const balance = analyzeOhaengBalance(saju);
  const strong = getStrongestOhaeng(balance);
  const weak = getWeakestOhaeng(balance);

  const ohaengDesc: Record<string, string> = {
    목: '목(木)의 기운 - 성장, 창의, 인자함',
    화: '화(火)의 기운 - 열정, 표현, 예의',
    토: '토(土)의 기운 - 균형, 신뢰, 포용',
    금: '금(金)의 기운 - 원칙, 결단, 의리',
    수: '수(水)의 기운 - 지혜, 유연, 학문',
  };

  const yongshinDesc: Record<string, Record<string, string>> = {
    목: { 용신: '수(水)', 설명: '수 기운이 목을 키워주어 에너지를 보충합니다' },
    화: { 용신: '목(木)', 설명: '목 기운이 화를 살려 활력을 높여줍니다' },
    토: { 용신: '화(火)', 설명: '화 기운이 토를 단단하게 해 기반을 강화합니다' },
    금: { 용신: '토(土)', 설명: '토 기운이 금을 낳아 안정적인 발전을 돕습니다' },
    수: { 용신: '금(金)', 설명: '금 기운이 수를 생성해 깊은 통찰력을 더합니다' },
  };

  const subItems = Object.entries(balance)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => ({ label: ohaengDesc[k] || k, value: '★'.repeat(v) + '☆'.repeat(Math.max(0, 4 - v)) }));

  const yong = yongshinDesc[weak] || { 용신: '토(土)', 설명: '토 기운으로 균형을 맞추면 좋습니다' };

  const content = `사주의 오행 구성을 분석한 결과, ${ohaengDesc[strong] || strong}이 가장 강한 경향이 있습니다. ` +
    `이 기운이 삶의 전반적인 방향성에 영향을 미치는 경향이 있습니다. ` +
    `반면 ${ohaengDesc[weak] || weak}은 상대적으로 약한 편이어서, ` +
    `용신(用神)인 ${yong.용신}의 기운을 활용하면 균형을 맞추는 데 도움이 됩니다. ${yong.설명}. ` +
    `일상에서 용신 오행에 해당하는 색상, 방향, 음식 등을 가까이하면 기운의 균형을 높이는 데 도움이 될 수 있습니다.`;

  return {
    icon: '⚖️',
    title: '오행 균형 분석',
    content,
    subItems,
  };
}

// ===== 일간(日干) 상세 분석 섹션 =====
function buildIlganAnalysis(saju: SajuResult): ResultSection {
  const ilgan = saju.ilgan;
  const ilganKey = Object.keys(cheonganData).find(k => cheonganData[k].name === ilgan) || '';
  const data = ilganKey ? cheonganData[ilganKey] : null;

  const ilganDeep: Record<string, string> = {
    갑: '갑목(甲木)은 양목(陽木)의 기운으로, 대나무나 큰 나무처럼 곧게 자라는 성질이 있습니다. 목표를 향해 직진하는 추진력이 강하고, 새로운 분야를 개척하는 것을 즐기는 경향이 있습니다. 리더십이 뛰어나고 인자한 마음을 가진 경향이 있으나, 고집이 강해질 때는 주변과 소통하는 것이 중요합니다. 봄의 기운처럼 항상 새로운 시작을 추구하는 경향이 있습니다.',
    을: '을목(乙木)은 음목(陰木)의 기운으로, 풀이나 꽃처럼 유연하게 환경에 적응하는 성질이 있습니다. 섬세한 감수성과 뛰어난 적응력을 가진 경향이 있으며, 인간관계에서 따뜻하고 배려 깊은 모습을 보이는 경향이 있습니다. 예술적 감각이 발달하는 경향이 있고, 힘든 상황에서도 부드럽게 살아남는 생명력이 있습니다.',
    병: '병화(丙火)는 양화(陽火)의 기운으로, 태양처럼 밝고 따뜻한 에너지를 가진 경향이 있습니다. 주변을 환하게 밝히는 사교성과 표현력이 뛰어난 경향이 있으며, 어디서나 중심이 되는 경향이 있습니다. 긍정적이고 열정적인 에너지로 사람들에게 활력을 불어넣는 경향이 있으나, 가끔 충동적인 면을 조절하는 것이 좋습니다.',
    정: '정화(丁火)는 음화(陰火)의 기운으로, 촛불이나 등불처럼 은은하고 지속적인 불빛의 성질이 있습니다. 섬세하고 예의 바른 성품을 가진 경향이 있으며, 예술과 문학적 감각이 뛰어난 경향이 있습니다. 내면의 따뜻함으로 주변 사람들에게 꾸준한 위로와 빛이 되어주는 경향이 있습니다.',
    무: '무토(戊土)는 양토(陽土)의 기운으로, 큰 산처럼 묵직하고 안정적인 성질이 있습니다. 포용력이 크고 신뢰감을 주는 경향이 있으며, 어떤 상황에서도 중심을 잡는 능력이 있습니다. 조직을 이끌고 사람들을 품어주는 리더십이 강한 경향이 있으나, 때로는 변화를 유연하게 받아들이는 것이 성장에 도움이 됩니다.',
    기: '기토(己土)는 음토(陰土)의 기운으로, 비옥한 밭처럼 모든 것을 키워주는 성질이 있습니다. 꼼꼼하고 성실한 성품을 가진 경향이 있으며, 사람들을 돌보고 화합을 이끄는 역할을 잘 하는 경향이 있습니다. 실용적이고 현실적인 판단력을 가진 경향이 있으며, 꾸준한 노력으로 탄탄한 기반을 만들어가는 경향이 있습니다.',
    경: '경금(庚金)은 양금(陽金)의 기운으로, 단단한 바위나 원석처럼 강하고 직선적인 성질이 있습니다. 원칙을 중시하고 의리가 강하며, 강한 결단력과 추진력을 가진 경향이 있습니다. 정의감이 강하고 불의를 참지 못하는 경향이 있으나, 때로는 유연성을 발휘하는 것이 더 좋은 결과를 가져다줄 수 있습니다.',
    신: '신금(辛金)은 음금(陰金)의 기운으로, 보석이나 날카로운 칼날처럼 정교하고 섬세한 성질이 있습니다. 예리한 분석력과 완벽주의적 성향을 가진 경향이 있으며, 높은 기준을 유지하는 경향이 있습니다. 깔끔하고 심미적인 감각이 발달하는 경향이 있으며, 자신만의 독특한 세계를 구축하는 것을 즐기는 경향이 있습니다.',
    임: '임수(壬水)는 양수(陽水)의 기운으로, 큰 강이나 바다처럼 넓고 깊은 성질이 있습니다. 뛰어난 통찰력과 전략적 사고를 가진 경향이 있으며, 큰 그림을 보는 능력이 있습니다. 지식과 학문에 대한 깊은 관심을 가진 경향이 있으며, 풍부한 상상력으로 창의적인 해결책을 찾는 경향이 있습니다.',
    계: '계수(癸水)는 음수(陰水)의 기운으로, 이슬이나 샘물처럼 맑고 순수한 성질이 있습니다. 섬세한 감수성과 직관력이 뛰어난 경향이 있으며, 깊은 내면 세계를 가진 경향이 있습니다. 학문적 탐구심이 강하고 지적 호기심이 풍부한 경향이 있으며, 조용히 자신만의 방식으로 깊이 있는 성과를 내는 경향이 있습니다.',
  };

  const desc = ilganDeep[ilgan] || `${ilgan} 일간의 기운을 가지고 있습니다.`;
  const careerHint = data?.career?.join(', ') || '다양한 분야';
  const relationHint = data?.relationship || '진실한 소통을 중시하는 경향이 있습니다';

  const content = `${desc} 직업적으로는 ${careerHint} 분야에서 본연의 기운을 잘 발휘하는 경향이 있습니다. 대인관계에서는 ${relationHint}.`;

  return {
    icon: '🌟',
    title: `일간(日干) 분석 - ${ilgan}(${getIlganHanja(ilgan)})`,
    content,
    subItems: data ? [
      { label: '오행 속성', value: data.ohaeng + (data.eumsang === 'yang' ? ' 양(陽)' : ' 음(陰)') },
      { label: '핵심 기운', value: data.meaning },
    ] : undefined,
  };
}

// ===== 직업·재능 섹션 =====
function buildCareerSection(ohaeng: string, mbtiType?: string): ResultSection {
  const careerMap: Record<string, { main: string; fields: string[]; talent: string; advice: string }> = {
    목: {
      main: '성장과 창의를 중시하는 직업군에서 능력을 발휘하는 경향이 있습니다.',
      fields: ['교육·강의', '출판·저술', '환경·생태', '의료·치유', '컨설팅'],
      talent: '새로운 아이디어를 현실로 만드는 창의적 실행력이 강한 경향이 있습니다. 사람들을 성장시키고 이끄는 역할에서 두각을 나타내는 경향이 있으며, 장기적인 비전을 세우고 추진하는 능력이 있습니다.',
      advice: '초반에 기반을 탄탄히 쌓는 것이 중요합니다. 서두르기보다는 꾸준히 전문성을 키워나가면 30대 후반부터 안정적인 성과를 거두는 경향이 있습니다. 수(水) 기운의 파트너나 멘토와 협력하면 시너지 효과가 나타나는 경향이 있습니다.',
    },
    화: {
      main: '사람들과 소통하고 영향력을 발휘하는 분야에서 능력을 발휘하는 경향이 있습니다.',
      fields: ['미디어·엔터테인먼트', '마케팅·PR', '서비스업', '요식업', '강연·코칭'],
      talent: '뛰어난 표현력과 에너지로 사람들의 마음을 움직이는 능력이 있습니다. 대중 앞에서 존재감을 발휘하고, 트렌드를 빠르게 캐치하여 새로운 기회를 만드는 경향이 있습니다.',
      advice: '충동적인 결정보다는 계획적인 접근이 장기적으로 유리합니다. 목(木) 기운의 조언자를 곁에 두면 방향성을 잡는 데 도움이 됩니다. 재물 관리에 특별히 신경 쓰는 것이 좋습니다.',
    },
    토: {
      main: '안정성과 신뢰를 기반으로 하는 직업군에서 뛰어난 성과를 내는 경향이 있습니다.',
      fields: ['부동산·금융', '행정·공무원', '건설·인테리어', '농업·식품', 'HR·총무'],
      talent: '묵묵히 맡은 일을 해내는 성실함과 사람들에게 신뢰를 주는 포용력이 강한 경향이 있습니다. 조직의 중심을 잡고 오랫동안 안정적으로 성과를 쌓아가는 경향이 있습니다.',
      advice: '새로운 변화나 도전에 조금 더 열린 자세를 취하면 더 큰 성과를 기대할 수 있습니다. 화(火) 기운의 에너지를 접하면 활력을 얻는 경향이 있습니다.',
    },
    금: {
      main: '정확성과 원칙을 요구하는 분야에서 뛰어난 역량을 발휘하는 경향이 있습니다.',
      fields: ['법조·법률', '군경·보안', '제조·엔지니어링', 'IT·개발', '금융·투자'],
      talent: '냉철한 판단력과 강한 실행력을 가진 경향이 있습니다. 원칙에 따라 일을 처리하고, 어떤 상황에서도 흔들리지 않는 결단력으로 중요한 순간에 빛을 발하는 경향이 있습니다.',
      advice: '지나친 완벽주의가 스트레스가 될 수 있습니다. 토(土) 기운의 안정감을 가진 파트너와 협업하면 균형 잡힌 성과를 거두는 경향이 있습니다.',
    },
    수: {
      main: '지식과 통찰을 바탕으로 하는 직업군에서 두각을 나타내는 경향이 있습니다.',
      fields: ['학문·연구', '철학·심리', '전략기획', '작가·저술', '외교·국제'],
      talent: '깊은 사색과 통찰력으로 남들이 보지 못하는 것을 발견하는 경향이 있습니다. 장기적인 전략을 수립하고 복잡한 문제를 해결하는 능력이 탁월한 경향이 있습니다.',
      advice: '아이디어를 실행으로 연결하는 추진력을 기르는 것이 중요합니다. 금(金) 기운의 결단력 있는 파트너와 함께하면 큰 성과를 거둘 수 있는 경향이 있습니다.',
    },
  };

  const data = careerMap[ohaeng] || careerMap['토'];
  const mbtiAdd = mbtiType ? ` MBTI ${mbtiType}의 특성이 더해져 ${mbtiTypes[mbtiType]?.career?.slice(0, 2).join(', ')} 분야에서도 유리한 기운이 있습니다.` : '';

  return {
    icon: '💼',
    title: '직업·재능 운세',
    content: `${data.main} ${data.talent} ${data.advice}${mbtiAdd}`,
    subItems: [
      { label: '유리한 직업군', value: data.fields.join(', ') },
    ],
  };
}

// ===== 재물 섹션 =====
function buildWealthSection(saju: SajuResult, ohaeng: string): ResultSection {
  const balance = analyzeOhaengBalance(saju);
  const geum = balance['금'] || 0;
  const to = balance['토'] || 0;

  const wealthMap: Record<string, { level: string; detail: string; advice: string }> = {
    high: {
      level: '안정적인 재물 기운',
      detail: '금(金)과 토(土)의 기운이 충분하여 재물을 모으는 데 유리한 기운입니다. 성실한 노력이 결실로 이어지는 경향이 있으며, 꾸준히 축적하는 방식이 잘 맞는 경향이 있습니다.',
      advice: '단기적인 투기보다 장기적인 안정 투자가 더 유리한 경향이 있습니다. 부동산, 적금, 펀드 등 안정적인 재테크가 체질에 맞는 경향이 있습니다. 40대 이후 재물이 더욱 안정되는 경향이 있습니다.',
    },
    mid: {
      level: '중간 수준의 재물 기운',
      detail: '재물 기운이 균형 잡혀 있습니다. 노력한 만큼 보상이 따르는 경향이 있으며, 무리한 욕심을 부리지 않으면 꾸준히 안정을 유지하는 경향이 있습니다.',
      advice: '지출 관리에 특별히 신경 쓰는 것이 좋습니다. 충동적인 소비를 줄이고 비상금을 확보해두는 것이 안정에 도움이 됩니다. 금(金) 기운이 강한 파트너와의 사업이 유리한 경향이 있습니다.',
    },
    low: {
      level: '명예/학문에 유리한 기운',
      detail: '재물보다는 명예나 학문적 성취에 더 강한 기운을 가진 경향이 있습니다. 돈을 위해 일하기보다 좋아하는 일에 집중할 때 결과적으로 풍요로움이 따르는 경향이 있습니다.',
      advice: '전문성을 높이는 것이 장기적으로 재물과 연결되는 경향이 있습니다. 토(土) 기운을 보완하면 재물 기운이 높아질 수 있습니다. 파트너십을 통해 재물 기운을 보완하는 것도 좋은 방법입니다.',
    },
  };

  const level = geum + to >= 3 ? 'high' : geum + to >= 1 ? 'mid' : 'low';
  const data = wealthMap[level];

  const ohaengMoneyTip: Record<string, string> = {
    목: '동쪽 방향의 사업이나 봄에 시작하는 프로젝트에서 재물 기운이 높은 경향이 있습니다.',
    화: '서비스업이나 사람을 많이 만나는 일에서 재물 기운이 활발해지는 경향이 있습니다.',
    토: '부동산이나 실물 자산에서 안정적인 수익을 기대할 수 있는 경향이 있습니다.',
    금: 'IT, 제조, 금융 분야에서 재물 기운이 강하게 발휘되는 경향이 있습니다.',
    수: '지식 기반의 수익(강의, 저술, 컨설팅)에서 장기적인 재물이 축적되는 경향이 있습니다.',
  };

  return {
    icon: '💰',
    title: '재물·경제 운세',
    content: `${data.detail} ${data.advice} ${ohaengMoneyTip[ohaeng] || ''}`,
    subItems: [
      { label: '재물 기운', value: data.level },
    ],
  };
}

// ===== 연애·인연 섹션 =====
function buildLoveSection(ohaeng: string, mbtiType?: string): ResultSection {
  const loveMap: Record<string, { style: string; ideal: string; tip: string; challenge: string }> = {
    목: {
      style: '성장을 함께 추구하는 관계를 중시하는 경향이 있습니다. 서로 발전시켜주는 파트너십을 원하는 경향이 있습니다.',
      ideal: '지적이고 진취적인 파트너와 잘 맞는 경향이 있습니다. 함께 꿈을 향해 나아갈 수 있는 사람이 좋은 인연이 될 수 있습니다.',
      tip: '솔직한 표현이 관계를 더 깊게 만듭니다. 감정을 쌓아두지 말고 때맞게 대화하는 것이 좋습니다.',
      challenge: '지나친 성장 욕구가 파트너에게 부담이 될 수 있어 상대방의 속도를 존중하는 것이 중요합니다.',
    },
    화: {
      style: '열정적이고 표현력이 풍부한 연애 스타일을 가진 경향이 있습니다. 감정을 솔직하게 나누는 것을 중요하게 여기는 경향이 있습니다.',
      ideal: '활동적이고 긍정적인 에너지의 파트너와 잘 맞는 경향이 있습니다. 함께 새로운 경험을 즐길 수 있는 사람이 좋은 인연입니다.',
      tip: '감정의 온도 차이를 인식하고, 상대방이 쉴 때는 공간을 주는 배려가 필요합니다.',
      challenge: '감정 기복이 관계에 영향을 줄 수 있습니다. 안정적인 기반을 만들어가는 노력이 장기적인 관계에 중요합니다.',
    },
    토: {
      style: '안정적이고 신뢰를 바탕으로 한 관계를 추구하는 경향이 있습니다. 천천히 쌓아가는 깊은 인연을 소중히 여기는 경향이 있습니다.',
      ideal: '성실하고 책임감 있는 파트너와 잘 맞는 경향이 있습니다. 일상의 소소한 행복을 함께 나눌 수 있는 사람이 좋은 인연입니다.',
      tip: '감정 표현을 조금 더 적극적으로 하는 것이 관계를 더 따뜻하게 만들 수 있습니다.',
      challenge: '변화를 두려워하면 관계가 정체될 수 있습니다. 때로는 새로운 것을 함께 시도하는 것이 좋습니다.',
    },
    금: {
      style: '진지하고 의리 있는 관계를 추구하는 경향이 있습니다. 한번 마음을 열면 깊고 변함없는 유대를 형성하는 경향이 있습니다.',
      ideal: '신뢰할 수 있고 원칙이 있는 파트너와 잘 맞는 경향이 있습니다. 서로 존중하며 각자의 공간을 지켜주는 관계가 좋습니다.',
      tip: '감정을 조금 더 유연하게 표현하면 관계가 더 따뜻해질 수 있습니다. 완벽한 파트너를 찾기보다 함께 성장하는 과정을 즐기세요.',
      challenge: '높은 기준이 때로 파트너에게 부담이 될 수 있습니다. 서로의 다름을 인정하는 유연성이 필요합니다.',
    },
    수: {
      style: '지적 공감대를 나눌 수 있는 깊이 있는 관계를 원하는 경향이 있습니다. 표면적인 관계보다 진정성 있는 연결을 추구합니다.',
      ideal: '지적 호기심이 풍부하고 대화가 통하는 파트너와 잘 맞는 경향이 있습니다. 서로의 내면 세계를 이해해주는 사람이 좋은 인연입니다.',
      tip: '감정보다 이성적 판단을 앞세우는 경향이 있을 수 있습니다. 상대방의 감정적 필요에도 귀 기울이는 노력이 관계를 깊게 만듭니다.',
      challenge: '내면을 잘 드러내지 않는 성향이 오해를 낳을 수 있습니다. 신뢰하는 사람에게는 감정을 조금 더 열어 보이는 것이 도움이 됩니다.',
    },
  };

  const data = loveMap[ohaeng] || loveMap['토'];
  const mbtiLoveAdd = mbtiType ? ` MBTI ${mbtiType}의 특성상 ${mbtiTypes[mbtiType]?.relation || '진실한 관계를 소중히 여기는 경향이 있습니다'}.` : '';

  return {
    icon: '❤️',
    title: '연애·인연 운세',
    content: `${data.style} ${data.ideal} ${data.tip} ${data.challenge}${mbtiLoveAdd}`,
    subItems: [
      { label: '연애 스타일', value: data.style.split('.')[0] },
    ],
  };
}

// ===== 건강 섹션 =====
function buildHealthSection(ohaeng: string): ResultSection {
  const healthMap: Record<string, { organ: string; risk: string; tip: string; food: string; exercise: string }> = {
    목: {
      organ: '간·담낭·근육·눈',
      risk: '간 기능, 눈 피로, 근육 경직에 주의하는 것이 좋습니다. 스트레스가 쌓이면 간 기능에 영향을 줄 수 있습니다.',
      tip: '규칙적인 운동과 충분한 수면이 목(木) 기운을 건강하게 유지하는 데 도움이 됩니다. 녹색 채소를 자주 섭취하면 좋습니다.',
      food: '브로콜리, 시금치, 녹차, 키위 등 녹색 식품이 도움이 됩니다.',
      exercise: '요가, 스트레칭, 등산, 산책 등 몸을 유연하게 하는 운동이 좋습니다.',
    },
    화: {
      organ: '심장·소장·혈액순환·혀',
      risk: '심장과 순환계에 주의가 필요합니다. 지나친 흥분이나 스트레스가 심장에 부담을 줄 수 있습니다.',
      tip: '적절한 휴식과 명상으로 마음의 열기를 식히는 것이 좋습니다. 붉은 식품이 심장 기운에 도움이 됩니다.',
      food: '토마토, 딸기, 석류, 빨간 파프리카 등이 도움이 됩니다.',
      exercise: '수영, 가벼운 유산소 운동, 명상, 호흡 운동이 좋습니다.',
    },
    토: {
      organ: '위·비장·소화기계·입',
      risk: '소화 기능과 위장에 주의하는 것이 좋습니다. 스트레스가 소화에 영향을 줄 수 있으며, 과식을 피하는 것이 좋습니다.',
      tip: '규칙적인 식사 시간과 균형 잡힌 식단이 중요합니다. 노란색 식품이 비장 기운을 돕습니다.',
      food: '현미, 고구마, 호박, 생강 등이 소화기에 도움이 됩니다.',
      exercise: '걷기, 타이치, 필라테스 등 균형 있는 운동이 좋습니다.',
    },
    금: {
      organ: '폐·대장·호흡기·피부·코',
      risk: '폐와 호흡기, 피부에 주의가 필요합니다. 건조한 환경에서는 호흡기 관리가 중요합니다.',
      tip: '신선한 공기와 규칙적인 호흡 운동이 금(金) 기운에 도움이 됩니다. 흰색 식품이 폐 기운을 보강합니다.',
      food: '마늘, 양파, 배, 연근, 도라지 등이 호흡기에 도움이 됩니다.',
      exercise: '달리기, 수영, 호흡 운동, 유산소 운동이 좋습니다.',
    },
    수: {
      organ: '신장·방광·뼈·귀·생식기',
      risk: '신장과 방광, 뼈 건강에 주의가 필요합니다. 과로와 수분 부족이 신장에 영향을 줄 수 있습니다.',
      tip: '충분한 수분 섭취와 적절한 휴식이 수(水) 기운을 건강하게 유지합니다. 검은색 식품이 신장 기운에 도움이 됩니다.',
      food: '검은콩, 흑미, 블루베리, 검은깨, 미역 등이 도움이 됩니다.',
      exercise: '수영, 요가, 명상, 스트레칭 등이 좋습니다.',
    },
  };

  const data = healthMap[ohaeng] || healthMap['토'];

  return {
    icon: '🌿',
    title: '건강·체질 분석',
    content: `${data.risk} ${data.tip}`,
    subItems: [
      { label: '유의 신체 부위', value: data.organ },
      { label: '도움이 되는 식품', value: data.food },
      { label: '추천 운동', value: data.exercise },
    ],
  };
}

// ===== 개운법 섹션 =====
function buildLuckySection(ohaeng: string, guardian: Guardian): ResultSection {
  const luckyMap: Record<string, { color: string; direction: string; season: string; tip: string[]; item: string }> = {
    목: {
      color: '초록, 청록, 파랑',
      direction: '동쪽',
      season: '봄 (3~5월)',
      tip: [
        '초록색 소품이나 식물을 책상 위나 거실에 두면 기운이 높아지는 경향이 있습니다',
        '동쪽 방향으로 머리를 두고 자거나 동쪽 창문을 통해 아침 햇살을 받으면 좋습니다',
        '새로운 시작(창업, 이사, 새 프로젝트)은 봄에 하면 유리한 기운입니다',
        '나무와 관련된 것(목공, 가드닝, 등산)이 마음의 안정에 도움이 됩니다',
      ],
      item: '초록색 식물, 나무 소품, 에메랄드 계열 액세서리',
    },
    화: {
      color: '빨강, 주황, 자주',
      direction: '남쪽',
      season: '여름 (6~8월)',
      tip: [
        '밝은 색상의 인테리어가 활력과 긍정적 에너지를 높여줍니다',
        '남쪽 방향에 밝은 조명을 두면 기운이 활성화되는 경향이 있습니다',
        '중요한 발표나 미팅은 오전 10시~오후 2시 사이가 유리한 경향이 있습니다',
        '따뜻한 색상의 의상이 사람들에게 좋은 인상을 주는 경향이 있습니다',
      ],
      item: '빨간 소품, 촛불, 따뜻한 색감의 액세서리',
    },
    토: {
      color: '황금, 노랑, 베이지, 갈색',
      direction: '중앙',
      season: '환절기 (3, 6, 9, 12월)',
      tip: [
        '노란색이나 베이지 계열의 소품으로 공간을 정돈하면 안정감이 높아집니다',
        '흙과 관련된 취미(도예, 가드닝, 텃밭)가 심신 안정에 도움이 됩니다',
        '집 중앙을 깔끔하게 유지하면 기운이 고르게 퍼지는 경향이 있습니다',
        '규칙적인 생활 리듬이 토 기운을 강화시키는 경향이 있습니다',
      ],
      item: '황토색 도자기, 수정, 황금빛 소품',
    },
    금: {
      color: '흰색, 은색, 금색',
      direction: '서쪽',
      season: '가을 (9~11월)',
      tip: [
        '깔끔하고 미니멀한 공간 정돈이 금 기운을 높여줍니다',
        '서쪽 방향에 금속 소품이나 거울을 두면 좋습니다',
        '중요한 결단이나 계획 수립은 가을에 하면 좋은 기운입니다',
        '하얀색 의상이 청결하고 신뢰감 있는 이미지를 줍니다',
      ],
      item: '흰색 또는 은색 소품, 금속 액세서리, 수정 계열',
    },
    수: {
      color: '검정, 진남색, 짙은 파랑',
      direction: '북쪽',
      season: '겨울 (12~2월)',
      tip: [
        '물 관련 소품(어항, 분수, 물 그림)이 수 기운을 높여줍니다',
        '북쪽 방향에 공부방이나 서재를 두면 집중력이 높아지는 경향이 있습니다',
        '명상이나 독서가 수 기운의 깊이를 더하는 경향이 있습니다',
        '감사 일기를 쓰거나 자기성찰의 시간을 갖는 것이 도움이 됩니다',
      ],
      item: '검정 또는 남색 소품, 물 관련 아이템, 청금석 계열',
    },
  };

  const data = luckyMap[ohaeng] || luckyMap['토'];

  return {
    icon: '🎯',
    title: '개운법 & 행운 아이템',
    content: `수호신 ${guardian.nameKo}(${guardian.nameEn})의 기운을 받아 ${guardian.luckyMessage} ${data.tip.join(' ')}`,
    subItems: [
      { label: '행운 색상', value: data.color },
      { label: '행운 방향', value: data.direction },
      { label: '행운 계절', value: data.season },
      { label: '추천 아이템', value: data.item },
      { label: '행운 숫자', value: guardian.luckyNumber.join(', ') },
    ],
  };
}

// ===== 성명학 상세 섹션 =====
function buildNameDetailSection(name: NameAnalysisResult): ResultSection {
  const ratingText: Record<string, string> = {
    great: '매우 좋은 기운(대길)',
    good: '좋은 기운(길)',
    neutral: '무난한 기운(평)',
    caution: '주의가 필요한 기운(주의)',
    avoid: '피하는 것이 좋은 기운(흉)',
  };

  const soundDesc: Record<string, string> = {
    '상생': '소리오행이 서로를 생해주는 관계(상생)로, 이름의 기운이 조화롭게 흐르는 경향이 있습니다.',
    '중화': '소리오행이 균형을 이루는 중화 관계로, 이름이 안정적인 기운을 가지고 있습니다.',
    '상극': '소리오행이 서로 극하는 관계(상극)가 있어, 이름 기운에서 긴장감이 발생할 수 있습니다. 이를 보완하는 방법으로 유리한 오행의 색상이나 소품을 활용하면 도움이 됩니다.',
  };

  const wonRating = name.suriAnalysis?.wongyeok?.rating || 'neutral';
  const hyeongRating = name.suriAnalysis?.hyeongyeok?.rating || 'neutral';
  const soundRelation = name.soundOhaengRelation || '중화';
  const soundKey = soundRelation.includes('상생') ? '상생' : soundRelation.includes('상극') ? '상극' : '중화';

  const content = `이름 "${name.name}"의 성명학 분석 결과입니다. ` +
    `원격(성+이름 전체) ${name.wongyeok}수는 ${ratingText[wonRating] || ''}을 나타내며, ` +
    `${name.suriAnalysis?.wongyeok?.summary || ''}. ` +
    `형격(이름만) ${name.hyeongyeok}수는 ${ratingText[hyeongRating] || ''}을 나타냅니다. ` +
    `소리오행은 ${name.soundOhaengList?.join('-') || ''} 구성으로, ` +
    `${soundDesc[soundKey] || '이름의 기운을 분석합니다.'}`;

  return {
    icon: '✍️',
    title: '성명학 상세 분석',
    content,
    subItems: [
      { label: '원격(원국)', value: `${name.wongyeok}수 - ${ratingText[wonRating] || ''}` },
      { label: '형격(성격)', value: `${name.hyeongyeok}수 - ${ratingText[hyeongRating] || ''}` },
      { label: '소리오행', value: `${name.soundOhaengList?.join(' → ') || ''} (${soundKey})` },
      { label: '총 획수', value: `${name.totalStrokes}획` },
    ],
  };
}

// ===== MBTI + 사주 연계 섹션 =====
function buildMbtiSajuSection(mbtiType: string, ohaeng: string): ResultSection {
  const mbtiInfo = mbtiTypes[mbtiType];
  if (!mbtiInfo) return {
    icon: '🧠',
    title: 'MBTI 연계 분석',
    content: 'MBTI 정보를 기반으로 분석합니다.',
  };

  const combinationDesc: Record<string, string> = {
    '금-금': '날카로운 분석력과 강한 원칙이 시너지를 이루는 경향이 있습니다. 목표 달성에 강력한 기운이 있으나, 유연성을 기르는 것이 좋습니다.',
    '금-목': '날카로운 금 기운과 창의적인 목 기운이 만나 독특한 균형을 이루는 경향이 있습니다. 분석력과 창의성이 함께 발휘될 때 큰 성과를 내는 경향이 있습니다.',
    '금-화': '결단력 있는 금 기운과 열정적인 화 기운이 조합되어 추진력이 강한 경향이 있습니다. 이 에너지를 잘 조절하면 큰 성취를 이룰 수 있습니다.',
    '금-토': '원칙적인 금 기운과 안정적인 토 기운이 조화를 이루어 신뢰받는 경향이 있습니다. 실용적이고 체계적인 일 처리 능력이 강한 경향이 있습니다.',
    '금-수': '예리한 금 기운과 깊은 수 기운이 만나 통찰력이 뛰어난 경향이 있습니다. 학문이나 연구 분야에서 특히 두각을 나타내는 경향이 있습니다.',
    '목-목': '성장 지향적인 기운이 더욱 강화되는 경향이 있습니다. 창의성과 인간애가 넘치지만 때로는 현실적인 판단도 중요합니다.',
    '목-화': '창의적인 목 기운과 열정적인 화 기운이 만나 강한 표현력을 가진 경향이 있습니다. 예술, 교육, 커뮤니케이션 분야에서 빛을 발하는 경향이 있습니다.',
    '목-토': '성장하는 목 기운과 안정적인 토 기운이 균형을 이루는 경향이 있습니다. 창의성과 현실감각이 조화롭게 발휘될 때 최고의 성과가 나옵니다.',
    '목-수': '창의적인 목 기운이 수 기운의 지원을 받아 더욱 강화되는 경향이 있습니다. 학습능력과 창의성이 함께 발달하는 경향이 있습니다.',
    '목-금': '자유로운 목 기운과 원칙적인 금 기운 사이의 균형이 독특한 개성을 만들어내는 경향이 있습니다.',
    '화-화': '열정과 표현력이 극대화되는 경향이 있습니다. 사람들을 끌어당기는 카리스마가 강하지만 에너지 조절이 중요합니다.',
    '화-목': '열정적인 화 기운이 목 기운의 성장 에너지를 받아 더욱 발전하는 경향이 있습니다. 긍정적이고 성장 지향적인 에너지가 넘칩니다.',
    '화-토': '열정적인 화 기운과 안정적인 토 기운이 만나 균형 잡힌 에너지를 발휘하는 경향이 있습니다.',
    '화-금': '열정적인 화 기운이 원칙적인 금 기운과 만나 목표 지향적인 추진력을 발휘하는 경향이 있습니다.',
    '화-수': '열정적인 화 기운과 사려 깊은 수 기운이 균형을 이루어 독특한 매력을 발휘하는 경향이 있습니다.',
    '토-토': '안정감과 신뢰가 더욱 강화되는 경향이 있습니다. 조직에서 없어서는 안 될 존재가 되는 경향이 있습니다.',
    '토-목': '안정적인 토 기운이 창의적인 목 기운을 만나 실용적인 창의성을 발휘하는 경향이 있습니다.',
    '토-화': '안정적인 토 기운이 활발한 화 기운을 받아 따뜻하고 포용력 있는 에너지를 발휘하는 경향이 있습니다.',
    '토-금': '안정적인 토 기운과 원칙적인 금 기운이 만나 신뢰받는 리더십을 발휘하는 경향이 있습니다.',
    '토-수': '안정적인 토 기운과 지혜로운 수 기운이 조화를 이루어 실용적 지혜를 발휘하는 경향이 있습니다.',
    '수-수': '지혜와 학문의 기운이 더욱 강화되는 경향이 있습니다. 깊이 있는 통찰력이 탁월하지만 실행력을 기르는 것이 중요합니다.',
    '수-목': '지혜로운 수 기운이 성장하는 목 기운을 만나 이상적인 학자형 타입의 경향이 있습니다.',
    '수-화': '깊은 수 기운과 열정적인 화 기운이 만나 내면의 깊이와 외면의 활력을 동시에 가진 경향이 있습니다.',
    '수-토': '지혜로운 수 기운과 안정적인 토 기운이 조화를 이루어 현명한 판단력을 발휘하는 경향이 있습니다.',
    '수-금': '지혜로운 수 기운이 금 기운의 지원을 받아 더욱 날카로워지는 경향이 있습니다.',
  };

  const combKey = `${ohaeng}-${mbtiInfo.ohaeng}`;
  const combDesc = combinationDesc[combKey] || `사주 ${ohaeng} 기운과 MBTI ${mbtiType}의 특성이 조화를 이루고 있습니다.`;

  const content = `MBTI ${mbtiType}(${mbtiInfo.nickname})의 특성과 사주 ${ohaeng} 기운의 교차 분석입니다. ${combDesc} ` +
    `${mbtiInfo.strengths?.[0] || ''} ${mbtiInfo.growthPoints?.[0] || ''}`;

  return {
    icon: '🧠',
    title: `MBTI·사주 융합 분석 (${mbtiType} × ${ohaeng})`,
    content,
    subItems: [
      { label: 'MBTI 유형', value: `${mbtiType} - ${mbtiInfo.nickname}` },
      { label: 'MBTI 오행', value: mbtiInfo.ohaeng },
      { label: '사주 일간 오행', value: ohaeng },
      { label: '조합 특성', value: combDesc.split('.')[0] },
    ],
  };
}

// ===== 메인 generateResult 함수 =====
export function generateResult(params: {
  saju: SajuResult;
  name: NameAnalysisResult;
  face?: FaceAnalysisResult;
  mbtiType?: string;
}): ComprehensiveResult {
  const { saju, name, face, mbtiType } = params;

  const balance = analyzeOhaengBalance(saju);
  const strongOhaeng = getStrongestOhaeng(balance);

  const sajuScore = calcSajuScore(saju);
  const nameScore = name.score;
  const faceScore = face ? face.score : 75;
  const mbtiScore = mbtiType ? 78 : 0;

  let total: number;
  if (face && mbtiType) {
    total = Math.round(sajuScore * 0.4 + nameScore * 0.3 + faceScore * 0.2 + mbtiScore * 0.1);
  } else if (face) {
    total = Math.round(sajuScore * 0.45 + nameScore * 0.35 + faceScore * 0.2);
  } else if (mbtiType) {
    total = Math.round(sajuScore * 0.5 + nameScore * 0.35 + mbtiScore * 0.15);
  } else {
    total = Math.round(sajuScore * 0.55 + nameScore * 0.45);
  }

  const guardian = getGuardianByOhaeng(strongOhaeng);

  const analysisBox = {
    ilgan: `일간: ${saju.ilgan}(${getIlganHanja(saju.ilgan)})`,
    wolji: `월지: ${saju.month.jiji}(${getJijiHanja(saju.month.jiji)})`,
    wongyeok: name.wongyeok,
    hyeongyeok: name.hyeongyeok,
    soundOhaeng: (name.soundOhaengList?.join('-') || '') +
      (name.soundOhaengRelation?.includes('상생') ? ' (상생)' :
       name.soundOhaengRelation?.includes('중화') ? ' (중화)' : ' (상극)'),
    mbtiOhaeng: mbtiType ? `MBTI: ${mbtiType} → 오행 ${mbtiToOhaeng(mbtiType)} 매핑` : undefined,
  };

  const wonRating = name.suriAnalysis?.wongyeok?.rating || 'neutral';
  const summaryLines = [
    `${saju.ilgan} 일간으로 ${strongOhaeng} 기운이 강한 경향이 있습니다`,
    `성명의 기운이 ${wonRating === 'great' || wonRating === 'good' ? '좋은' : '중립적인'} 방향으로 작용하는 경향이 있습니다`,
    `수호신 ${guardian.nameKo}(${guardian.emoji})의 기운이 함께합니다. ${guardian.luckyMessage}`,
  ];

  return {
    scores: { saju: sajuScore, name: nameScore, face: faceScore, mbti: mbtiScore, total },
    analysisBox,
    summaryLines,
    ohaengAnalysis: buildOhaengAnalysis(saju),
    ilganAnalysis: buildIlganAnalysis(saju),
    careerSection: buildCareerSection(strongOhaeng, mbtiType),
    wealthSection: buildWealthSection(saju, strongOhaeng),
    loveSection: buildLoveSection(strongOhaeng, mbtiType),
    healthSection: buildHealthSection(strongOhaeng),
    luckySection: buildLuckySection(strongOhaeng, guardian),
    nameDetailSection: buildNameDetailSection(name),
    mbtiSajuSection: mbtiType ? buildMbtiSajuSection(mbtiType, strongOhaeng) : undefined,
    guardian,
    missingItems: {
      mbti: !mbtiType,
      time: !saju.hour,
      photo: !face,
    },
  };
}
