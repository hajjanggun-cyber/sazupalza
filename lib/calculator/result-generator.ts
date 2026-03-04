// 종합 결과 생성기 - 사주/성명학/관상/MBTI 교차 분석
// API 없이 데이터 기반으로 풍부한 결과 생성

import { SajuResult, analyzeOhaengBalance } from './saju-calculator';
import { NameAnalysisResult } from './name-calculator';
import { mbtiTypes } from '../data/mbti/types';
import { ohaengSangsaeng, ohaengSanggeuk } from '../data/saju/ohaeng';
import { guardians, getGuardianByOhaeng, Guardian } from '../data/guardian';
import { cheonganData } from '../data/saju/cheongan';
import { suriData } from '../data/name/suri81';
import { NAME_SAJU_COMBO } from '../data/name/name-saju-combo';
import { FACE_COMBOS } from '../data/face/face-combo';
import {
  analyzeTenGodProfile,
  describeTenGodNarrative,
  type MbtiConfidence,
  calculateAdvancedSajuScore,
  calculateMbtiScore,
  determineSajuScoringFocus,
  estimateDayMasterStrength,
} from './saju-scoring';

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
  faceSection?: ResultSection;
  guardian: Guardian;
  missingItems: {
    mbti: boolean;
    time: boolean;
    photo: boolean;
  };
}

// ===== 헬퍼 함수들 =====

// 영문 번역 헬퍼 함수 (외부 데이터를 수정하지 않고 파일 내에서 처리)
function translateData(text: string, locale: string): string {
  if (locale === 'ko') return text;
  
  const dict: Record<string, string> = {
    // 오행
    '목': 'Wood', '화': 'Fire', '토': 'Earth', '금': 'Metal', '수': 'Water',
    // 천간 의미
    '양목(陽木) - 큰 나무, 성장의 기운': 'Yang Wood (陽木) - Great Tree, Energy of Growth',
    '음목(陰木) - 풀과 꽃, 유연함의 기운': 'Yin Wood (陰木) - Grass & Flowers, Energy of Flexibility',
    '양화(陽火) - 태양, 밝음의 기운': 'Yang Fire (丙火) - The Sun, Energy of Brightness',
    '음화(陰火) - 촛불, 따뜻함의 기운': 'Yin Fire (丁火) - Candle, Energy of Warmth',
    '양토(陽土) - 큰 산, 안정의 기운': 'Yang Earth (戊토) - Great Mountain, Energy of Stability',
    '음토(陰土) - 밭, 포용의 기운': 'Yin Earth (己土) - Farmland, Energy of Embrace',
    '양금(陽金) - 원석, 결단의 기운': 'Yang Metal (庚金) - Raw Ore, Energy of Decisiveness',
    '음금(陰金) - 보석, 섬세함의 기운': 'Yin Metal (辛金) - Jewel, Energy of Refinement',
    '양수(陽水) - 강과 바다, 통찰의 기운': 'Yang Water (壬水) - River & Ocean, Energy of Insight',
    '음수(陰수) - 이슬과 샘물, 감성의 기운': 'Yin Water (癸水) - Dew & Spring, Energy of Sensitivity',
    // 직업군 및 키워드
    '경영': 'Management', '교육': 'Education', '개척이 필요한 분야': 'Pioneering Fields',
    '예술': 'Arts', '서비스업': 'Service Industry', '상담': 'Counseling',
    '연예': 'Entertainment', '마케팅': 'Marketing', '서비스': 'Service',
    '의료': 'Healthcare', '연구': 'Research', '금융': 'Finance', '부동산': 'Real Estate',
    '행정': 'Administration', '기술': 'Technology', '기계': 'Machinery', '전략': 'Strategy',
    'IT': 'IT', '디자인': 'Design', '철학': 'Philosophy', '문학': 'Literature',
    '교사': 'Teacher', '코치': 'Coach',
    // 대인관계 및 특성 (mbti/types.ts 및 cheongan.ts 기반)
    '솔직하고 직접적인 소통을 선호하는 경향이 있습니다': 'You tend to prefer honest and direct communication',
    '배려심이 깊고 공감 능력이 뛰어난 경향이 있습니다': 'You tend to have deep consideration and excellent empathy',
    '밝고 활발한 에너지로 주변을 즐겁게 하는 경향이 있습니다': 'You tend to brighten your surroundings with bright and active energy',
    '섬세하고 예의 바른 소통을 중시하는 경향이 있습니다': 'You tend to value delicate and courteous communication',
    '듬직하고 포용력 있는 소통 방식을 가진 경향이 있습니다': 'You tend to have a reliable and inclusive communication style',
    '꼼꼼하고 세심하게 상대방을 배려하는 경향이 있습니다': 'You tend to be meticulous and careful in considering others',
    '의리가 있고 원칙을 중시하는 소통을 선호하는 경향이 있습니다': 'You tend to prefer communication that values loyalty and principles',
    '세련되고 명확한 소통 방식을 가진 경향이 있습니다': 'You tend to have a refined and clear communication style',
    '깊이 있는 통찰을 바탕으로 지혜로운 소통을 하는 경향이 있습니다': 'You tend to engage in wise communication based on deep insight',
    '감수성이 풍부하고 공감 능력이 뛰어나 깊은 유대감을 형성하는 경향이 있습니다': 'You tend to be sensitive and empathetic, forming deep bonds',
    '따뜻하고 적극적으로 관계를 가꾸는 경향이 있습니다': 'You tend to nurture relationships warmly and actively',
  };

  return dict[text] || text;
}

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
  return calculateAdvancedSajuScore(saju);
}

function describeStrengthBand(strength: number, locale: string): string {
  if (locale === 'ko') {
    if (strength >= 68) return '신강에 가까운 구조';
    if (strength <= 40) return '신약에 가까운 구조';
    return '중화에 가까운 구조';
  }

  if (strength >= 68) return 'a stronger day-master structure';
  if (strength <= 40) return 'a weaker day-master structure';
  return 'a relatively balanced day-master structure';
}

function describeTenGodDominant(dominant: string, locale: string): string {
  const koMap: Record<string, string> = {
    비견: '비견 주도',
    겁재: '겁재 주도',
    식신: '식신 주도',
    상관: '상관 주도',
    편재: '편재 주도',
    정재: '정재 주도',
    편관: '편관 주도',
    정관: '정관 주도',
    편인: '편인 주도',
    정인: '정인 주도',
  };

  const enMap: Record<string, string> = {
    비견: 'Peer star dominant',
    겁재: 'Competitive star dominant',
    식신: 'Output star dominant',
    상관: 'Expressive star dominant',
    편재: 'Dynamic wealth star dominant',
    정재: 'Stable wealth star dominant',
    편관: 'Pressure star dominant',
    정관: 'Order star dominant',
    편인: 'Insight star dominant',
    정인: 'Resource star dominant',
  };

  return locale === 'ko'
    ? koMap[dominant] || `${dominant} 주도`
    : enMap[dominant] || `${dominant} dominant`;
}

// ===== 오행 균형 분석 섹션 =====
function buildOhaengAnalysis(saju: SajuResult, locale: string): ResultSection {
  const balance = analyzeOhaengBalance(saju);
  const strong = getStrongestOhaeng(balance);
  const weak = getWeakestOhaeng(balance);
  const strengthBand = describeStrengthBand(estimateDayMasterStrength(saju), locale);
  const tenGodLabel = describeTenGodDominant(analyzeTenGodProfile(saju).dominant, locale);
  const tenGodNarrative = describeTenGodNarrative(
    analyzeTenGodProfile(saju).dominant,
    locale,
  );
  const focus = determineSajuScoringFocus(saju);

  if (locale === 'ko') {
    const ohaengDescKo: Record<string, string> = {
      목: '목(木) 기운 - 성장, 창의, 확장',
      화: '화(火) 기운 - 열정, 표현, 추진',
      토: '토(土) 기운 - 균형, 안정, 신뢰',
      금: '금(金) 기운 - 원칙, 결단, 정리',
      수: '수(水) 기운 - 지혜, 유연, 통찰',
    };

    const yongshinDescKo: Record<string, { yongshin: string; desc: string }> = {
      목: { yongshin: '수(水)', desc: '수 기운이 목 기운을 북돋아 활력과 회복력을 보완합니다' },
      화: { yongshin: '목(木)', desc: '목 기운이 화 기운의 추진력과 표현력을 안정적으로 키워줍니다' },
      토: { yongshin: '화(火)', desc: '화 기운이 토 기운의 기반을 덥혀 실행력과 응집력을 강화합니다' },
      금: { yongshin: '토(土)', desc: '토 기운이 금 기운을 받쳐 주며 안정적인 성장 흐름을 만듭니다' },
      수: { yongshin: '금(金)', desc: '금 기운이 수 기운을 맑게 정리해 사고력과 통찰을 깊게 합니다' },
    };

    const subItemsKo = Object.entries(balance)
      .filter(([, v]) => v > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => ({
        label: ohaengDescKo[k] || k,
        value: '●'.repeat(v) + '○'.repeat(Math.max(0, 4 - v)),
      }));

    const yongKo = yongshinDescKo[weak] || {
      yongshin: '토(土)',
      desc: '토 기운을 보완하면 전체 균형을 안정시키는 데 도움이 됩니다',
    };

    const structureNoteKo = `${strengthBand} 흐름에서 ${tenGodLabel} 성향이 구조를 이끌고 있습니다. ${focus.usefulElement} 기운을 보강하면 전체 균형과 체감 안정감이 더 좋아지는 편입니다.`;
    const contentKo =
      `사주 오행 구성을 분석한 결과, ${ohaengDescKo[strong] || strong}이 가장 강한 축으로 나타납니다. ` +
      `이 기운은 전반적인 성향과 삶의 방향감에 비교적 큰 영향을 주는 편입니다. ` +
      `반대로 ${ohaengDescKo[weak] || weak}은 상대적으로 약한 편이어서, 용신(보완 요소)인 ${yongKo.yongshin} 기운을 활용하면 균형을 맞추는 데 도움이 됩니다. ${yongKo.desc}. ` +
      `일상에서는 이 기운과 연결되는 색상, 방향, 생활 리듬을 가까이하면 균형감을 유지하는 데 도움이 될 수 있습니다.`;

    return {
      icon: '⚖️',
      title: '오행 균형 분석',
      content: `${contentKo} ${structureNoteKo} ${tenGodNarrative}`,
      subItems: subItemsKo,
    };
  }

  const ohaengDesc: Record<string, string> = {
    목: locale === 'ko' ? '목(木)의 기운 - 성장, 창의, 인자함' : 'Wood (木) Energy - Growth, Creativity, Benevolence',
    화: locale === 'ko' ? '화(火)의 기운 - 열정, 표현, 예의' : 'Fire (火) Energy - Passion, Expression, Courtesy',
    토: locale === 'ko' ? '토(土)의 기운 - 균형, 신뢰, 포용' : 'Earth (土) Energy - Balance, Trust, Embrace',
    금: locale === 'ko' ? '금(金)의 기운 - 원칙, 결단, 의리' : 'Metal (金) Energy - Principle, Decisiveness, Loyalty',
    수: locale === 'ko' ? '수(水)의 기운 - 지혜, 유연, 학문' : 'Water (水) Energy - Wisdom, Flexibility, Learning',
  };

  const yongshinDesc: Record<string, { yongshin: string; desc: string }> = {
    목: { 
      yongshin: locale === 'ko' ? '수(水)' : 'Water (水)', 
      desc: locale === 'ko' ? '수 기운이 목을 키워주어 에너지를 보충합니다' : 'Water energy nourishes Wood, replenishing your vital energy' 
    },
    화: { 
      yongshin: locale === 'ko' ? '목(木)' : 'Wood (木)', 
      desc: locale === 'ko' ? '목 기운이 화를 살려 활력을 높여줍니다' : 'Wood energy fuels Fire, enhancing your vitality' 
    },
    토: { 
      yongshin: locale === 'ko' ? '화(火)' : 'Fire (火)', 
      desc: locale === 'ko' ? '화 기운이 토를 단단하게 해 기반을 강화합니다' : 'Fire energy strengthens Earth, consolidating your foundation' 
    },
    금: { 
      yongshin: locale === 'ko' ? '토(土)' : 'Earth (土)', 
      desc: locale === 'ko' ? '토 기운이 금을 낳아 안정적인 발전을 돕습니다' : 'Earth energy generates Metal, supporting steady growth' 
    },
    수: { 
      yongshin: locale === 'ko' ? '금(金)' : 'Metal (金)', 
      desc: locale === 'ko' ? '금 기운이 수를 생성해 깊은 통찰력을 더합니다' : 'Metal energy produces Water, deepening your insight' 
    },
  };

  const subItems = Object.entries(balance)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => ({ label: ohaengDesc[k] || k, value: '★'.repeat(v) + '☆'.repeat(Math.max(0, 4 - v)) }));

  const yong = yongshinDesc[weak] || { 
    yongshin: locale === 'ko' ? '토(土)' : 'Earth (土)', 
    desc: locale === 'ko' ? '토 기운으로 균형을 맞추면 좋습니다' : 'Earth energy helps balance your fortune' 
  };

  const structureNote = locale === 'ko'
    ? `${strengthBand}?대ŉ ${tenGodLabel} 諛⑺뼢?쇰줈 ?쇱깮 湲곗슫???곹깭媛 ?듭떖?낅땲?? ${focus.usefulElement} 湲곗슫??蹂닿컯?섎㈃ ?꾩껜 洹좏삎媛먯씠 ?붿슧 ?덉젙?곸씠寃?留욌뒿?덈떎.`
    : `The chart currently reads as ${strengthBand} with ${tenGodLabel} guiding the overall structure. Reinforcing ${translateData(focus.usefulElement, locale)} tends to stabilize the full balance.`;

  const content = locale === 'ko' 
    ? `사주의 오행 구성을 분석한 결과, ${ohaengDesc[strong] || strong}이 가장 강한 경향이 있습니다. ` +
      `이 기운이 삶의 전반적인 방향성에 영향을 미치는 경향이 있습니다. ` +
      `반면 ${ohaengDesc[weak] || weak}은 상대적으로 약한 편이어서, ` +
      `용신(用神)인 ${yong.yongshin}의 기운을 활용하면 균형을 맞추는 데 도움이 됩니다. ${yong.desc}. ` +
      `일상에서 용신 오행에 해당하는 색상, 방향, 음식 등을 가까이하면 기운의 균형을 높이는 데 도움이 될 수 있습니다.`
    : `Based on your Four Pillars analysis, ${ohaengDesc[strong] || strong} tends to be the strongest element. ` +
      `This energy significantly influences your overall life direction. ` +
      `Conversely, ${ohaengDesc[weak] || weak} is relatively weak, so utilizing the energy of your guardian element, ${yong.yongshin}, will help achieve balance. ${yong.desc}. ` +
      `Incorporating colors, directions, and foods associated with this element into your daily life can enhance your energy balance.`;

  return {
    icon: '⚖️',
    title: locale === 'ko' ? '오행 균형 분석' : 'Five Elements Balance Analysis',
    content: `${content} ${structureNote} ${tenGodNarrative}`,
    subItems,
  };
}

// ===== 일간(日干) 상세 분석 섹션 =====
function buildIlganAnalysis(saju: SajuResult, locale: string): ResultSection {
  const ilgan = saju.ilgan;
  const ilganKey = Object.keys(cheonganData).find(k => cheonganData[k].name === ilgan) || '';
  const data = ilganKey ? cheonganData[ilganKey] : null;
  const strength = estimateDayMasterStrength(saju);
  const focus = determineSajuScoringFocus(saju);
  const tenGod = analyzeTenGodProfile(saju);
  const tenGodNarrative = describeTenGodNarrative(tenGod.dominant, locale);

  const ilganDeep: Record<string, string> = {
    갑: locale === 'ko' 
      ? '갑목(甲木)은 양목(陽木)의 기운으로, 대나무나 큰 나무처럼 곧게 자라는 성질이 있습니다. 목표를 향해 직진하는 추진력이 강하고, 새로운 분야를 개척하는 것을 즐기는 경향이 있습니다. 리더십이 뛰어나고 인자한 마음을 가진 경향이 있으나, 고집이 강해질 때는 주변과 소통하는 것이 중요합니다. 봄의 기운처럼 항상 새로운 시작을 추구하는 경향이 있습니다.'
      : 'Gab-Wood (甲木) represents Yang Wood energy, like a tall tree growing straight and strong. You tend to have powerful drive toward goals and enjoy pioneering new fields. Leadership comes naturally, along with a kind heart. While your leadership is outstanding, staying open to communication is important. Like the energy of spring, you always seek new beginnings.',
    을: locale === 'ko'
      ? '을목(乙木)은 음목(陰木)의 기운으로, 풀이나 꽃처럼 유연하게 환경에 적응하는 성질이 있습니다. 섬세한 감수성과 뛰어난 적응력을 가진 경향이 있으며, 인간관계에서 따뜻하고 배려 깊은 모습을 보이는 경향이 있습니다. 예술적 감각이 발달하는 경향이 있고, 힘든 상황에서도 부드럽게 살아남는 생명력이 있습니다.'
      : 'Eul-Wood (乙木) represents Yin Wood energy, like grass or flowers adapting flexibly to the environment. You tend to have delicate sensitivity and excellent adaptability, showing warmth in relationships. Artistic talent is often well-developed, and you possess a resilient life force that thrives even in challenging situations.',
    병: locale === 'ko'
      ? '병화(丙火)는 양화(陽火)의 기운으로, 태양처럼 밝고 따뜻한 에너지를 가진 경향이 있습니다. 주변을 환하게 밝히는 사교성과 표현력이 뛰어난 경향이 있으며, 어디서나 중심이 되는 경향이 있습니다. 긍정적이고 열정적인 에너지로 사람들에게 활력을 불어넣는 경향이 있으나, 가끔 충동적인 면을 조절하는 것이 좋습니다.'
      : 'Byeong-Fire (丙火) represents Yang Fire energy, like the sun — bright and warm. You tend to have outstanding sociability and expressiveness, naturally becoming the center of attention. Your positive and passionate energy inspires others, though managing occasional impulsiveness is beneficial.',
    정: locale === 'ko'
      ? '정화(丁火)는 음화(陰火)의 기운으로, 촛불이나 등불처럼 은은하고 지속적인 불빛의 성질이 있습니다. 섬세하고 예의 바른 성품을 가진 경향이 있으며, 예술과 문학적 감각이 뛰어난 경향이 있습니다. 내면의 따뜻함으로 주변 사람들에게 꾸준한 위로와 빛이 되어주는 경향이 있습니다.'
      : 'Jeong-Fire (丁火) represents Yin Fire energy, like a candle or lantern — gentle and sustained. You tend to have a refined and courteous character with excellent artistic and literary sensibility. Your inner warmth provides steady comfort and guidance to those around you.',
    무: locale === 'ko'
      ? '무토(戊土)는 양토(陽土)의 기운으로, 큰 산처럼 묵직하고 안정적인 성질이 있습니다. 포용력이 크고 신뢰감을 주는 경향이 있으며, 어떤 상황에서도 중심을 잡는 능력이 있습니다. 조직을 이끌고 사람들을 품어주는 리더십이 강한 경향이 있으나, 때로는 변화를 유연하게 받아들이는 것이 성장에 도움이 됩니다.'
      : 'Mu-Earth (戊土) represents Yang Earth energy, like a great mountain — solid and stable. You tend to have great capacity for acceptance and inspire trust. Your ability to maintain focus in any situation is remarkable. While your leadership in guiding organizations is strong, embracing change flexibly will further your growth.',
    기: locale === 'ko'
      ? '기토(己土)는 음토(陰土)의 기운으로, 비옥한 밭처럼 모든 것을 키워주는 성질이 있습니다. 꼼꼼하고 성실한 성품을 가진 경향이 있으며, 사람들을 돌보고 화합을 이끄는 역할을 잘 하는 경향이 있습니다. 실용적이고 현실적인 판단력을 가진 경향이 있으며, 꾸준한 노력으로 탄탄한 기반을 만들어가는 경향이 있습니다.'
      : 'Gi-Earth (己土) represents Yin Earth energy, like fertile farmland — nurturing everything. You tend to be meticulous and diligent, skilled at caring for others and fostering harmony. Your practical and realistic judgment, combined with steady effort, allows you to build a solid foundation.',
    경: locale === 'ko'
      ? '경금(庚金)은 양금(陽金)의 기운으로, 단단한 바위나 원석처럼 강하고 직선적인 성질이 있습니다. 원칙을 중시하고 의리가 강하며, 강한 결단력과 추진력을 가진 경향이 있습니다. 정의감이 강하고 불의를 참지 못하는 경향이 있으나, 때로는 유연성을 발휘하는 것이 더 좋은 결과를 가져다줄 수 있습니다.'
      : 'Gyeong-Metal (庚金) represents Yang Metal energy, like solid rock or raw ore — strong and direct. You tend to prioritize principles, have strong loyalty, decisive determination and drive. Your strong sense of justice is a virtue, though applying flexibility occasionally can lead to even better outcomes.',
    신: locale === 'ko'
      ? '신금(辛金)은 음금(陰金)의 기운으로, 보석이나 날카로운 칼날처럼 정교하고 섬세한 성질이 있습니다. 예리한 분석력과 완벽주의적 성향을 가진 경향이 있으며, 높은 기준을 유지하는 경향이 있습니다. 깔끔하고 심미적인 감각이 발달하는 경향이 있으며, 자신만의 독특한 세계를 구축하는 것을 즐기는 경향이 있습니다.'
      : 'Sin-Metal (辛金) represents Yin Metal energy, like a jewel or sharp blade — precise and refined. You tend to have sharp analytical skills and a perfectionist streak, maintaining high standards. Your refined aesthetic sense is well-developed, and you enjoy building your own unique world.',
    임: locale === 'ko'
      ? '임수(壬수)는 양수(陽水)의 기운으로, 큰 강이나 바다처럼 넓고 깊은 성질이 있습니다. 뛰어난 통찰력과 전략적 사고를 가진 경향이 있으며, 큰 그림을 보는 능력이 있습니다. 지식과 학문에 대한 깊은 관심을 가진 경향이 있으며, 풍부한 상상력으로 창의적인 해결책을 찾는 경향이 있습니다.'
      : 'Im-Water (壬水) represents Yang Water energy, like a great river or ocean — broad and deep. You tend to have outstanding insight and strategic thinking, with the ability to see the big picture. Your deep interest in knowledge and academia, combined with rich imagination, helps you find creative solutions.',
    계: locale === 'ko'
      ? '계수(癸水)는 음수(陰水)의 기운으로, 이슬이나 샘물처럼 맑고 순수한 성질이 있습니다. 섬세한 감수성과 직관력이 뛰어난 경향이 있으며, 깊은 내면 세계를 가진 경향이 있습니다. 학문적 탐구심이 강하고 지적 호기심이 풍부한 경향이 있으며, 조용히 자신만의 방식으로 깊이 있는 성과를 내는 경향이 있습니다.'
      : 'Gye-Water (癸水) represents Yin Water energy, like dew or a spring — clear and pure. You tend to have delicate sensitivity and intuition with a rich inner world. Your strong academic curiosity and intellectual drive allow you to achieve deep results in your own quiet way.',
  };

  const desc = ilganDeep[ilgan] || (locale === 'ko' ? `${ilgan} 일간의 기운을 가지고 있습니다.` : `You possess the energy of ${getIlganHanja(ilgan)} Day Stem.`);
  const careerHint = data?.career?.map(c => translateData(c, locale)).join(', ') || (locale === 'ko' ? '다양한 분야' : 'Various fields');
  const relationHint = translateData(data?.relationship || '', locale) || (locale === 'ko' ? '진실한 소통을 중시하는 경향이 있습니다' : 'You tend to value sincere communication');

  const content = locale === 'ko'
    ? `${desc} 직업적으로는 ${careerHint} 분야에서 본연의 기운을 잘 발휘하는 경향이 있습니다. 대인관계에서는 ${relationHint}.`
    : `${desc} Professionally, you tend to express your natural energy well in ${careerHint}. In relationships, ${relationHint}.`;

  const structureNote = locale === 'ko'
    ? `${describeStrengthBand(strength, locale)}이며 ${describeTenGodDominant(tenGod.dominant, locale)} 흐름이 핵심입니다. ${focus.usefulElement} 기운을 보강하면 장점 유지가 더 안정적입니다.`
    : `This reads as ${describeStrengthBand(strength, locale)}, with ${describeTenGodDominant(tenGod.dominant, locale)} as the core structural flow. Reinforcing ${translateData(focus.usefulElement, locale)} helps your strengths stay consistent.`;
  const hanja = getIlganHanja(ilgan);
  return {
    icon: '🌟',
    title: locale === 'ko' ? `일간(日干) 분석 - ${ilgan}(${hanja})` : `Day Stem (日干) Analysis - ${hanja}`,
    content: `${content} ${structureNote} ${tenGodNarrative}`,
    subItems: data ? [
      { 
        label: locale === 'ko' ? '오행 속성' : 'Element', 
        value: locale === 'ko' ? (data.ohaeng + (data.eumsang === 'yang' ? ' 양(陽)' : ' 음(陰)')) : translateData(data.ohaeng, locale)
      },
      { 
        label: locale === 'ko' ? '핵심 기운' : 'Core Energy', 
        value: locale === 'ko' ? data.meaning : (data.meaningEn || translateData(data.meaning, locale))
      },
    ] : undefined,
  };
}

// ===== 직업·재능 섹션 =====
function buildCareerSection(ohaeng: string, locale: string, mbtiType?: string): ResultSection {
  const careerMap: Record<string, { main: string; fields: string[]; talent: string; advice: string }> = {
    목: {
      main: locale === 'ko' ? '성장과 창의를 중시하는 직업군에서 능력을 발휘하는 경향이 있습니다.' : 'You tend to excel in fields that value growth and creativity.',
      fields: locale === 'ko' ? ['교육·강의', '출판·저술', '환경·생태', '의료·치유', '컨설팅'] : ['Education & Coaching', 'Publishing & Writing', 'Environment & Ecology', 'Healthcare & Healing', 'Consulting'],
      talent: locale === 'ko' ? '새로운 아이디어를 현실로 만드는 창의적 실행력이 강한 경향이 있습니다. 사람들을 성장시키고 이끄는 역할에서 두각을 나타내는 경향이 있으며, 장기적인 비전을 세우고 추진하는 능력이 있습니다.' : 'You tend to have strong creative execution that turns new ideas into reality. You tend to stand out in roles that develop and lead others, with the ability to set and pursue long-term visions.',
      advice: locale === 'ko' ? '초반에 기반을 탄탄히 쌓는 것이 중요합니다. 서두르기보다는 꾸준히 전문성을 키워나가면 30대 후반부터 안정적인 성과를 거두는 경향이 있습니다. 수(水) 기운의 파트너나 멘토와 협력하면 시너지 효과가 나타나는 경향이 있습니다.' : 'Building a solid foundation early on is important. Rather than rushing, steadily developing expertise tends to bring stable results from your late 30s. Collaborating with Water-energy partners or mentors tends to create synergy.',
    },
    화: {
      main: locale === 'ko' ? '사람들과 소통하고 영향력을 발휘하는 분야에서 능력을 발휘하는 경향이 있습니다.' : 'You tend to excel in fields involving communication and influence with people.',
      fields: locale === 'ko' ? ['미디어·엔터테인먼트', '마케팅·PR', '서비스업', '요식업', '강연·코칭'] : ['Media & Entertainment', 'Marketing & PR', 'Service Industry', 'Food & Restaurant', 'Speaking & Coaching'],
      talent: locale === 'ko' ? '뛰어난 표현력과 에너지로 사람들의 마음을 움직이는 능력이 있습니다. 대중 앞에서 존재감을 발휘하고, 트렌드를 빠르게 캐치하여 새로운 기회를 만드는 경향이 있습니다.' : 'You have the ability to move people\'s hearts with outstanding expressiveness and energy. You tend to make your presence felt in public and quickly catch trends to create new opportunities.',
      advice: locale === 'ko' ? '충동적인 결정보다는 계획적인 접근이 장기적으로 유리합니다. 목(木) 기운의 조언자를 곁에 두면 방향성을 잡는 데 도움이 됩니다. 재물 관리에 특별히 신경 쓰는 것이 좋습니다.' : 'A planned approach rather than impulsive decisions tends to be advantageous long-term. Having a Wood-energy advisor nearby helps with direction. Special attention to financial management is advisable.',
    },
    토: {
      main: locale === 'ko' ? '안정성과 신뢰를 기반으로 하는 직업군에서 뛰어난 성과를 내는 경향이 있습니다.' : 'You tend to achieve excellent results in careers based on stability and trust.',
      fields: locale === 'ko' ? ['부동산·금융', '행정·공무원', '건설·인테리어', '농업·식품', 'HR·총무'] : ['Real Estate & Finance', 'Administration & Civil Service', 'Construction & Interior', 'Agriculture & Food', 'HR & General Affairs'],
      talent: locale === 'ko' ? '묵묵히 맡은 일을 해내는 성실함과 사람들에게 신뢰를 주는 포용력이 강한 경향이 있습니다. 조직의 중심을 잡고 오랫동안 안정적으로 성과를 쌓아가는 경향이 있습니다.' : 'You tend to have diligence in quietly accomplishing your duties and great capacity to inspire trust in others. You tend to remain the stable center of an organization and steadily build results over time.',
      advice: locale === 'ko' ? '새로운 변화나 도전에 조금 더 열린 자세를 취하면 더 큰 성과를 기대할 수 있습니다. 화(火) 기운의 에너지를 접하면 활력을 얻는 경향이 있습니다.' : 'Taking a more open attitude toward new changes and challenges can lead to greater achievements. Encountering Fire-energy tends to bring vitality.',
    },
    금: {
      main: locale === 'ko' ? '정확성과 원칙을 요구하는 분야에서 뛰어난 역량을 발휘하는 경향이 있습니다.' : 'You tend to demonstrate outstanding capabilities in fields requiring precision and principles.',
      fields: locale === 'ko' ? ['법조·법률', '군경·보안', '제조·엔지니어링', 'IT·개발', '금융·투자'] : ['Law & Legal', 'Military & Security', 'Manufacturing & Engineering', 'IT & Development', 'Finance & Investment'],
      talent: locale === 'ko' ? '냉철한 판단력과 강한 실행력을 가진 경향이 있습니다. 원칙에 따라 일을 처리하고, 어떤 상황에서도 흔들리지 않는 결단력으로 중요한 순간에 빛을 발하는 경향이 있습니다.' : 'You tend to have cold-headed judgment and strong execution. You tend to shine in critical moments with decisiveness that doesn\'t waver even in difficult situations.',
      advice: locale === 'ko' ? '지나친 완벽주의가 스트레스가 될 수 있습니다. 토(土) 기운의 안정감을 가진 파트너와 협업하면 균형 잡힌 성과를 거두는 경향이 있습니다.' : 'Excessive perfectionism can become stressful. Collaborating with Earth-energy partners who offer stability tends to produce balanced results.',
    },
    수: {
      main: locale === 'ko' ? '지식과 통찰을 바탕으로 하는 직업군에서 두각을 나타내는 경향이 있습니다.' : 'You tend to stand out in careers based on knowledge and insight.',
      fields: locale === 'ko' ? ['학문·연구', '철학·심리', '전략기획', '작가·저술', '외교·국제'] : ['Academia & Research', 'Philosophy & Psychology', 'Strategic Planning', 'Writing & Authorship', 'Diplomacy & International Affairs'],
      talent: locale === 'ko' ? '깊은 사색과 통찰력으로 남들이 보지 못하는 것을 발견하는 경향이 있습니다. 장기적인 전략을 수립하고 복잡한 문제를 해결하는 능력이 탁월한 경향이 있습니다.' : 'You tend to discover what others cannot see through deep contemplation and insight. You tend to excel at formulating long-term strategies and solving complex problems.',
      advice: locale === 'ko' ? '아이디어를 실행으로 연결하는 추진력을 기르는 것이 중요합니다. 금(金) 기운의 결단력 있는 파트너와 함께하면 큰 성과를 거둘 수 있는 경향이 있습니다.' : 'Developing execution to connect ideas into action is important. Working with a decisive Metal-energy partner tends to bring great achievements.',
    },
  };

  const data = careerMap[ohaeng] || careerMap['토'];
  
  const mbtiCareerFields = locale === 'ko'
    ? mbtiTypes[mbtiType || '']?.career?.slice(0, 2).join(', ')
    : (mbtiTypes[mbtiType || '']?.careerEn?.slice(0, 2).join(', ') || mbtiTypes[mbtiType || '']?.career?.slice(0, 2).join(', '));

  const mbtiAdd = mbtiType
    ? locale === 'ko'
      ? ` MBTI ${mbtiType}의 특성이 더해져 ${mbtiCareerFields} 분야에서도 유리한 기운이 있습니다.`
      : ` Combined with your MBTI ${mbtiType} characteristics, you also have favorable energy in fields such as ${mbtiCareerFields}.`
    : '';

  return {
    icon: '💼',
    title: locale === 'ko' ? '직업·재능 운세' : 'Career & Talent Fortune',
    content: `${data.main} ${data.talent} ${data.advice}${mbtiAdd}`,
    subItems: [
      { label: locale === 'ko' ? '유리한 직업군' : 'Favorable Career Fields', value: data.fields.join(', ') },
    ],
  };
}

// ===== 재물 섹션 =====
function buildWealthSection(saju: SajuResult, ohaeng: string, locale: string): ResultSection {
  const balance = analyzeOhaengBalance(saju);
  const geum = balance['금'] || 0;
  const to = balance['토'] || 0;

  const wealthMap: Record<string, { level: string; detail: string; advice: string }> = {
    high: {
      level: locale === 'ko' ? '안정적인 재물 기운' : 'Stable Wealth Energy',
      detail: locale === 'ko' 
        ? '금(金)과 토(土)의 기운이 충분하여 재물을 모으는 데 유리한 기운입니다. 성실한 노력이 결실로 이어지는 경향이 있으며, 꾸준히 축적하는 방식이 잘 맞는 경향이 있습니다.'
        : 'With sufficient Metal and Earth energy, you have favorable energy for accumulating wealth. Diligent effort tends to bear fruit, and a steady accumulation approach tends to suit you well.',
      advice: locale === 'ko'
        ? '단기적인 투기보다 장기적인 안정 투자가 더 유리한 경향이 있습니다. 부동산, 적금, 펀드 등 안정적인 재테크가 체질에 맞는 경향이 있습니다. 40대 이후 재물이 더욱 안정되는 경향이 있습니다.'
        : 'Long-term stable investment tends to be more favorable than short-term speculation. Real estate, savings, and funds tend to suit your constitution. Wealth tends to become more stable after your 40s.',
    },
    mid: {
      level: locale === 'ko' ? '중간 수준의 재물 기운' : 'Moderate Wealth Energy',
      detail: locale === 'ko'
        ? '재물 기운이 균형 잡혀 있습니다. 노력한 만큼 보상이 따르는 경향이 있으며, 무리한 욕심을 부리지 않으면 꾸준히 안정을 유지하는 경향이 있습니다.'
        : 'Your wealth energy is balanced. Rewards follow effort, and you maintain steady stability without excessive greed.',
      advice: locale === 'ko'
        ? '지출 관리에 특별히 신경 쓰는 것이 좋습니다. 충동적인 소비를 줄이고 비상금을 확보해두는 것이 안정에 도움이 됩니다. 금(金) 기운이 강한 파트너와의 사업이 유리한 경향이 있습니다.'
        : 'Special attention to expense management is advisable. Reducing impulsive spending and securing emergency funds helps maintain stability. Business with Metal-energy partners tends to be favorable.',
    },
    low: {
      level: locale === 'ko' ? '명예/학문에 유리한 기운' : 'Honor/Academic Fortune Favorable',
      detail: locale === 'ko'
        ? '재물보다는 명예나 학문적 성취에 더 강한 기운을 가진 경향이 있습니다. 돈을 위해 일하기보다 좋아하는 일에 집중할 때 결과적으로 풍요로움이 따르는 경향이 있습니다.'
        : 'You tend to have stronger energy for honor or academic achievement than for wealth. Wealth tends to follow when you focus on what you love rather than working solely for money.',
      advice: locale === 'ko'
        ? '전문성을 높이는 것이 장기적으로 재물과 연결되는 경향이 있습니다. 토(土) 기운을 보완하면 재물 기운이 높아질 수 있습니다. 파트너십을 통해 재물 기운을 보완하는 것도 좋은 방법입니다.'
        : 'Raising expertise tends to connect to wealth in the long run. Supplementing Earth energy can enhance wealth energy. Complementing wealth energy through partnerships is also a good approach.',
    },
  };

  const level = geum + to >= 3 ? 'high' : geum + to >= 1 ? 'mid' : 'low';
  const data = wealthMap[level];

  const ohaengMoneyTip: Record<string, string> = {
    목: locale === 'ko' ? '동쪽 방향의 사업이나 봄에 시작하는 프로젝트에서 재물 기운이 높은 경향이 있습니다.' : 'Business in the eastern direction or projects started in spring tend to have higher wealth energy.',
    화: locale === 'ko' ? '서비스업이나 사람을 많이 만나는 일에서 재물 기운이 활발해지는 경향이 있습니다.' : 'Wealth energy tends to be activated in service industries or work involving many people.',
    토: locale === 'ko' ? '부동산이나 실물 자산에서 안정적인 수익을 기대할 수 있는 경향이 있습니다.' : 'Stable returns can be expected from real estate or tangible assets.',
    금: locale === 'ko' ? 'IT, 제조, 금융 분야에서 재물 기운이 강하게 발휘되는 경향이 있습니다.' : 'Wealth energy tends to be strongly expressed in IT, manufacturing, and finance sectors.',
    수: locale === 'ko' ? '지식 기반의 수익(강의, 저술, 컨설팅)에서 장기적인 재물이 축적되는 경향이 있습니다.' : 'Long-term wealth tends to accumulate from knowledge-based income (teaching, writing, consulting).',
  };

  return {
    icon: '💰',
    title: locale === 'ko' ? '재물·경제 운세' : 'Wealth & Finance Fortune',
    content: `${data.detail} ${data.advice} ${ohaengMoneyTip[ohaeng] || ''}`,
    subItems: [
      { label: locale === 'ko' ? '재물 기운' : 'Wealth Energy', value: data.level },
    ],
  };
}

// ===== 연애·인연 섹션 =====
function buildLoveSection(ohaeng: string, locale: string, mbtiType?: string): ResultSection {
  const loveMap: Record<string, { style: string; ideal: string; tip: string; challenge: string }> = {
    목: {
      style: locale === 'ko' ? '성장을 함께 추구하는 관계를 중시하는 경향이 있습니다. 서로 발전시켜주는 파트너십을 원하는 경향이 있습니다.' : 'You tend to value relationships that pursue growth together. You tend to want partnerships that develop each other.',
      ideal: locale === 'ko' ? '지적이고 진취적인 파트너와 잘 맞는 경향이 있습니다. 함께 꿈을 향해 나아갈 수 있는 사람이 좋은 인연이 될 수 있습니다.' : 'You tend to match well with intellectual and progressive partners. Someone who can move forward toward dreams together can be a good match.',
      tip: locale === 'ko' ? '솔직한 표현이 관계를 더 깊게 만듭니다. 감정을 쌓아두지 말고 때맞게 대화하는 것이 좋습니다.' : 'Honest expression deepens the relationship. It\'s better to communicate in a timely manner rather than letting emotions build up.',
      challenge: locale === 'ko' ? '지나친 성장 욕구가 파트너에게 부담이 될 수 있어 상대방의 속도를 존중하는 것이 중요합니다.' : 'Excessive growth desire may burden the partner — respecting the other person\'s pace is important.',
    },
    화: {
      style: locale === 'ko' ? '열정적이고 표현력이 풍부한 연애 스타일을 가진 경향이 있습니다. 감정을 솔직하게 나누는 것을 중요하게 여기는 경향이 있습니다.' : 'You tend to have a passionate and expressive romantic style. You tend to value sharing feelings honestly.',
      ideal: locale === 'ko' ? '활동적이고 긍정적인 에너지의 파트너와 잘 맞는 경향이 있습니다. 함께 새로운 경험을 즐길 수 있는 사람이 좋은 인연입니다.' : 'You tend to match well with active, positive-energy partners. Someone who can enjoy new experiences together is a good match.',
      tip: locale === 'ko' ? '감정의 온도 차이를 인식하고, 상대방이 쉴 때는 공간을 주는 배려가 필요합니다.' : 'Being aware of emotional temperature differences and giving space when the other person needs rest shows consideration.',
      challenge: locale === 'ko' ? '감정 기복이 관계에 영향을 줄 수 있습니다. 안정적인 기반을 만들어가는 노력이 장기적인 관계에 중요합니다.' : 'Emotional fluctuations can affect the relationship. Building a stable foundation is important for long-term relationships.',
    },
    토: {
      style: locale === 'ko' ? '안정적이고 신뢰를 바탕으로 한 관계를 추구하는 경향이 있습니다. 천천히 쌓아가는 깊은 인연을 소중히 여기는 경향이 있습니다.' : 'You tend to pursue stable relationships based on trust. You tend to cherish deep connections built slowly over time.',
      ideal: locale === 'ko' ? '성실하고 책임감 있는 파트너와 잘 맞는 경향이 있습니다. 일상의 소소한 행복을 함께 나눌 수 있는 사람이 좋은 인연입니다.' : 'You tend to match well with diligent, responsible partners. Someone who can share the small joys of everyday life is a good match.',
      tip: locale === 'ko' ? '감정 표현을 조금 더 적극적으로 하는 것이 관계를 더 따뜻하게 만들 수 있습니다.' : 'Being a little more proactive in emotional expression can make the relationship warmer.',
      challenge: locale === 'ko' ? '변화를 두려워하면 관계가 정체될 수 있습니다. 때로는 새로운 것을 함께 시도하는 것이 좋습니다.' : 'Fear of change can cause relationships to stagnate. Trying new things together occasionally is good.',
    },
    금: {
      style: locale === 'ko' ? '진지하고 의리 있는 관계를 추구하는 경향이 있습니다. 한번 마음을 열면 깊고 변함없는 유대를 형성하는 경향이 있습니다.' : 'You tend to pursue serious and loyal relationships. Once your heart opens, you tend to form deep and unwavering bonds.',
      ideal: locale === 'ko' ? '신뢰할 수 있고 원칙이 있는 파트너와 잘 맞는 경향이 있습니다. 서로 존중하며 각자의 공간을 지켜주는 관계가 좋습니다.' : 'You tend to match well with trustworthy partners who have principles. A relationship where each respects the other\'s space is good.',
      tip: locale === 'ko' ? '감정을 조금 더 유연하게 표현하면 관계가 더 따뜻해질 수 있습니다. 완벽한 파트너를 찾기보다 함께 성장하는 과정을 즐기세요.' : 'Expressing emotions a bit more flexibly can warm the relationship. Enjoy the process of growing together rather than seeking a perfect partner.',
      challenge: locale === 'ko' ? '높은 기준이 때로 파트너에게 부담이 될 수 있습니다. 서로의 다름을 인정하는 유연성이 필요합니다.' : 'High standards may sometimes burden the partner. Flexibility in accepting differences is needed.',
    },
    수: {
      style: locale === 'ko' ? '지적 공감대를 나눌 수 있는 깊이 있는 관계를 원하는 경향이 있습니다. 표면적인 관계보다 진정성 있는 연결을 추구합니다.' : 'You tend to want deep relationships where intellectual empathy can be shared. You pursue genuine connection over superficial relationships.',
      ideal: locale === 'ko' ? '지적 호기심이 풍부하고 대화가 통하는 파트너와 잘 맞는 경향이 있습니다. 서로의 내면 세계를 이해해주는 사람이 좋은 인연입니다.' : 'You tend to match well with partners rich in intellectual curiosity and with whom conversation flows. Someone who understands your inner world is a good match.',
      tip: locale === 'ko' ? '감정보다 이성적 판단을 앞세우는 경향이 있을 수 있습니다. 상대방의 감정적 필요에도 귀 기울이는 노력이 관계를 깊게 만듭니다.' : 'You may tend to prioritize rational judgment over emotion. Making an effort to listen to the partner\'s emotional needs also deepens the relationship.',
      challenge: locale === 'ko' ? '내면을 잘 드러내지 않는 성향이 오해를 낳을 수 있습니다. 신뢰하는 사람에게는 감정을 조금 더 열어 보이는 것이 도움이 됩니다.' : 'Not revealing your inner self well can cause misunderstandings. Showing emotions a bit more openly to trusted people is helpful.',
    },
  };

  const data = loveMap[ohaeng] || loveMap['토'];
  const mbtiLoveAdd = mbtiType
    ? locale === 'ko'
      ? ` MBTI ${mbtiType}의 특성상 ${mbtiTypes[mbtiType]?.relation || '진실한 관계를 소중히 여기는 경향이 있습니다'}.`
      : ` Reflecting MBTI ${mbtiType} traits, ${mbtiTypes[mbtiType]?.relationEn || mbtiTypes[mbtiType]?.relation || 'you tend to value genuine relationships'}.`
    : '';

  return {
    icon: '❤️',
    title: locale === 'ko' ? '연애·인연 운세' : 'Love & Relationship Fortune',
    content: `${data.style} ${data.ideal} ${data.tip} ${data.challenge}${mbtiLoveAdd}`,
    subItems: [
      { label: locale === 'ko' ? '연애 스타일' : 'Relationship Style', value: data.style.split('.')[0] },
    ],
  };
}

// ===== 건강 섹션 =====
function buildHealthSection(ohaeng: string, locale: string): ResultSection {
  const healthMap: Record<string, { organ: string; risk: string; tip: string; food: string; exercise: string }> = {
    목: {
      organ: locale === 'ko' ? '간·담낭·근육·눈' : 'Liver, Gallbladder, Muscles, Eyes',
      risk: locale === 'ko' 
        ? '간 기능, 눈 피로, 근육 경직에 주의하는 것이 좋습니다. 스트레스가 쌓이면 간 기능에 영향을 줄 수 있습니다.'
        : 'It is advisable to pay attention to liver function, eye fatigue, and muscle stiffness. Stress buildup can affect liver function.',
      tip: locale === 'ko'
        ? '규칙적인 운동과 충분한 수면이 목(木) 기운을 건강하게 유지하는 데 도움이 됩니다. 녹색 채소를 자주 섭취하면 좋습니다.'
        : 'Regular exercise and sufficient sleep help maintain healthy Wood energy. Frequently consuming green vegetables is beneficial.',
      food: locale === 'ko' ? '브로콜리, 시금치, 녹차, 키위 등 녹색 식품이 도움이 됩니다.' : 'Green foods such as broccoli, spinach, green tea, and kiwi are helpful.',
      exercise: locale === 'ko' ? '요가, 스트레칭, 등산, 산책 등 몸을 유연하게 하는 운동이 좋습니다.' : 'Exercises that keep the body flexible such as yoga, stretching, hiking, and walking are good.',
    },
    화: {
      organ: locale === 'ko' ? '심장·소장·혈액순환·혀' : 'Heart, Small Intestine, Blood Circulation, Tongue',
      risk: locale === 'ko'
        ? '심장과 순환계에 주의가 필요합니다. 지나친 흥분이나 스트레스가 심장에 부담을 줄 수 있습니다.'
        : 'Attention to the heart and circulatory system is needed. Excessive excitement or stress can burden the heart.',
      tip: locale === 'ko'
        ? '적절한 휴식과 명상으로 마음의 열기를 식히는 것이 좋습니다. 붉은 식품이 심장 기운에 도움이 됩니다.'
        : 'Cooling the mind\'s heat through adequate rest and meditation is advisable. Red foods benefit heart energy.',
      food: locale === 'ko' ? '토마토, 딸기, 석류, 빨간 파프리카 등이 도움이 됩니다.' : 'Tomatoes, strawberries, pomegranates, and red peppers are helpful.',
      exercise: locale === 'ko' ? '수영, 가벼운 유산소 운동, 명상, 호흡 운동이 좋습니다.' : 'Swimming, light aerobic exercise, meditation, and breathing exercises are good.',
    },
    토: {
      organ: locale === 'ko' ? '위·비장·소화기계·입' : 'Stomach, Spleen, Digestive System, Mouth',
      risk: locale === 'ko'
        ? '소화 기능과 위장에 주의하는 것이 좋습니다. 스트레스가 소화에 영향을 줄 수 있으며, 과식을 피하는 것이 좋습니다.'
        : 'It is advisable to pay attention to digestive function and the stomach. Stress can affect digestion, and it is good to avoid overeating.',
      tip: locale === 'ko'
        ? '규칙적인 식사 시간과 균형 잡힌 식단이 중요합니다. 노란색 식품이 비장 기운을 돕습니다.'
        : 'Regular meal times and a balanced diet are important. Yellow foods support spleen energy.',
      food: locale === 'ko' ? '현미, 고구마, 호박, 생강 등이 소화기에 도움이 됩니다.' : 'Brown rice, sweet potatoes, pumpkin, and ginger are helpful for digestion.',
      exercise: locale === 'ko' ? '걷기, 타이치, 필라테스 등 균형 있는 운동이 좋습니다.' : 'Balanced exercises such as walking, tai chi, and pilates are good.',
    },
    금: {
      organ: locale === 'ko' ? '폐·대장·호흡기·피부·코' : 'Lungs, Large Intestine, Respiratory System, Skin, Nose',
      risk: locale === 'ko'
        ? '폐와 호흡기, 피부에 주의가 필요합니다. 건조한 환경에서는 호흡기 관리가 중요합니다.'
        : 'Attention to the lungs, respiratory system, and skin is needed. Respiratory care is important in dry environments.',
      tip: locale === 'ko'
        ? '신선한 공기와 규칙적인 호흡 운동이 금(金) 기운에 도움이 됩니다. 흰색 식품이 폐 기운을 보강합니다.'
        : 'Fresh air and regular breathing exercises benefit Metal energy. White foods strengthen lung energy.',
      food: locale === 'ko' ? '마늘, 양파, 배, 연근, 도라지 등이 호흡기에 도움이 됩니다.' : 'Garlic, onion, pear, lotus root, and bellflower root are helpful for the respiratory system.',
      exercise: locale === 'ko' ? '달리기, 수영, 호흡 운동, 유산소 운동이 좋습니다.' : 'Running, swimming, breathing exercises, and aerobic exercise are good.',
    },
    수: {
      organ: locale === 'ko' ? '신장·방광·뼈·귀·생식기' : 'Kidneys, Bladder, Bones, Ears, Reproductive System',
      risk: locale === 'ko'
        ? '신장과 방광, 뼈 건강에 주의가 필요합니다. 과로와 수분 부족이 신장에 영향을 줄 수 있습니다.'
        : 'Attention to kidney, bladder, and bone health is needed. Overwork and dehydration can affect the kidneys.',
      tip: locale === 'ko'
        ? '충분한 수분 섭취와 적절한 휴식이 수(水) 기운을 건강하게 유지합니다. 검은색 식품이 신장 기운에 도움이 됩니다.'
        : 'Sufficient water intake and adequate rest keep Water energy healthy. Black foods benefit kidney energy.',
      food: locale === 'ko' ? '검은콩, 흑미, 블루베리, 검은깨, 미역 등이 도움이 됩니다.' : 'Black beans, black rice, blueberries, black sesame, and seaweed are helpful.',
      exercise: locale === 'ko' ? '수영, 요가, 명상, 스트레칭 등이 좋습니다.' : 'Swimming, yoga, meditation, and stretching are good.',
    },
  };

  const data = healthMap[ohaeng] || healthMap['토'];

  return {
    icon: '🌿',
    title: locale === 'ko' ? '건강·체질 분석' : 'Health & Constitution Analysis',
    content: `${data.risk} ${data.tip}`,
    subItems: [
      { label: locale === 'ko' ? '유의 신체 부위' : 'Body Parts to Watch', value: data.organ },
      { label: locale === 'ko' ? '도움이 되는 식품' : 'Beneficial Foods', value: data.food },
      { label: locale === 'ko' ? '추천 운동' : 'Recommended Exercise', value: data.exercise },
    ],
  };
}

// ===== 개운법 섹션 =====
function buildLuckySection(ohaeng: string, guardian: Guardian, locale: string): ResultSection {
  const luckyMap: Record<string, { color: string; direction: string; season: string; tip: string[]; item: string }> = {
    목: {
      color: locale === 'ko' ? '초록, 청록, 파랑' : 'Green, Teal, Blue',
      direction: locale === 'ko' ? '동쪽' : 'East',
      season: locale === 'ko' ? '봄 (3~5월)' : 'Spring (March–May)',
      tip: locale === 'ko' ? [
        '초록색 소품이나 식물을 책상 위나 거실에 두면 기운이 높아지는 경향이 있습니다',
        '동쪽 방향으로 머리를 두고 자거나 동쪽 창문을 통해 아침 햇살을 받으면 좋습니다',
        '새로운 시작(창업, 이사, 새 프로젝트)은 봄에 하면 유리한 기운입니다',
        '나무와 관련된 것(목공, 가드닝, 등산)이 마음의 안정에 도움이 됩니다',
      ] : [
        'Placing green accessories or plants on your desk or in the living room tends to increase your energy',
        'Sleeping with your head facing east or receiving morning sunlight through eastern windows is beneficial',
        'New beginnings (starting a business, moving, new projects) in spring tend to have favorable energy',
        'Things related to wood (woodworking, gardening, hiking) help bring peace of mind'
      ],
      item: locale === 'ko' ? '초록색 식물, 나무 소품, 에메랄드 계열 액세서리' : 'Green plants, wooden accessories, emerald-toned jewelry',
    },
    화: {
      color: locale === 'ko' ? '빨강, 주황, 자주' : 'Red, Orange, Purple',
      direction: locale === 'ko' ? '남쪽' : 'South',
      season: locale === 'ko' ? '여름 (6~8월)' : 'Summer (June–August)',
      tip: locale === 'ko' ? [
        '밝은 색상의 인테리어가 활력과 긍정적 에너지를 높여줍니다',
        '남쪽 방향에 밝은 조명을 두면 기운이 활성화되는 경향이 있습니다',
        '중요한 발표나 미팅은 오전 10시~오후 2시 사이가 유리한 경향이 있습니다',
        '따뜻한 색상의 의상이 사람들에게 좋은 인상을 주는 경향이 있습니다',
      ] : [
        'Bright-colored interior decor increases vitality and positive energy',
        'Placing bright lighting in the southern direction tends to activate energy',
        'Important presentations or meetings between 10am–2pm tend to be more favorable',
        'Warm-colored clothing tends to make a good impression on people'
      ],
      item: locale === 'ko' ? '빨간 소품, 촛불, 따뜻한 색감의 액세서리' : 'Red accessories, candles, warm-toned jewelry',
    },
    토: {
      color: locale === 'ko' ? '황금, 노랑, 베이지, 갈색' : 'Gold, Yellow, Beige, Brown',
      direction: locale === 'ko' ? '중앙' : 'Center',
      season: locale === 'ko' ? '환절기 (3, 6, 9, 12월)' : 'Seasonal transitions (March, June, Sept, Dec)',
      tip: locale === 'ko' ? [
        '노란색이나 베이지 계열의 소품으로 공간을 정돈하면 안정감이 높아집니다',
        '흙과 관련된 취미(도예, 가드닝, 텃밭)가 심신 안정에 도움이 됩니다',
        '집 중앙을 깔끔하게 유지하면 기운이 고르게 퍼지는 경향이 있습니다',
        '규칙적인 생활 리듬이 토 기운을 강화시키는 경향이 있습니다',
      ] : [
        'Organizing the space with yellow or beige accessories increases the sense of stability',
        'Earth-related hobbies (pottery, gardening, home farming) help calm the mind and body',
        'Keeping the center of the home clean allows energy to spread evenly',
        'A regular daily rhythm tends to strengthen Earth energy'
      ],
      item: locale === 'ko' ? '황토색 도자기, 수정, 황금빛 소품' : 'Ochre-colored ceramics, crystals, golden accessories',
    },
    금: {
      color: locale === 'ko' ? '흰색, 은색, 금색' : 'White, Silver, Gold',
      direction: locale === 'ko' ? '서쪽' : 'West',
      season: locale === 'ko' ? '가을 (9~11월)' : 'Autumn (September–November)',
      tip: locale === 'ko' ? [
        '깔끔하고 미니멀한 공간 정돈이 금 기운을 높여줍니다',
        '서쪽 방향에 금속 소품이나 거울을 두면 좋습니다',
        '중요한 결단이나 계획 수립은 가을에 하면 좋은 기운입니다',
        '하얀색 의상이 청결하고 신뢰감 있는 이미지를 줍니다',
      ] : [
        'A clean and minimal space organization increases Metal energy',
        'Placing metallic accessories or mirrors in the western direction is good',
        'Autumn is favorable energy for important decisions or planning',
        'White clothing gives a clean and trustworthy image'
      ],
      item: locale === 'ko' ? '흰색 또는 은색 소품, 금속 액세서리, 수정 계열' : 'White or silver accessories, metal items, crystal-toned jewelry',
    },
    수: {
      color: locale === 'ko' ? '검정, 진남색, 짙은 파랑' : 'Black, Deep Navy, Dark Blue',
      direction: locale === 'ko' ? '북쪽' : 'North',
      season: locale === 'ko' ? '겨울 (12~2월)' : 'Winter (December–February)',
      tip: locale === 'ko' ? [
        '물 관련 소품(어항, 분수, 물 그림)이 수 기운을 높여줍니다',
        '북쪽 방향에 공부방이나 서재를 두면 집중력이 높아지는 경향이 있습니다',
        '명상이나 독서가 수 기운의 깊이를 더하는 경향이 있습니다',
        '감사 일기를 쓰거나 자기성찰의 시간을 갖는 것이 도움이 됩니다',
      ] : [
        'Water-related accessories (fish tanks, fountains, water paintings) increase Water energy',
        'Having a study or library in the northern direction tends to improve concentration',
        'Meditation or reading tends to deepen Water energy',
        'Writing a gratitude journal or having time for self-reflection is helpful'
      ],
      item: locale === 'ko' ? '검정 또는 남색 소품, 물 관련 아이템, 청금석 계열' : 'Black or navy accessories, water-related items, lapis lazuli-toned jewelry',
    },
  };

  const data = luckyMap[ohaeng] || luckyMap['토'];

  const luckyMsg = locale === 'ko'
    ? `수호신 ${guardian.nameKo}(${guardian.nameEn})의 기운을 받아 ${guardian.luckyMessage}`
    : `Receiving the energy of guardian ${guardian.nameEn} (${guardian.nameKo}), ${guardian.luckyMessageEn ?? guardian.luckyMessage}`;

  return {
    icon: '🎯',
    title: locale === 'ko' ? '개운법 & 행운 아이템' : 'Fortune Tips & Lucky Items',
    content: `${luckyMsg} ${data.tip.join(' ')}`,
    subItems: [
      { label: locale === 'ko' ? '행운 색상' : 'Lucky Color', value: data.color },
      { label: locale === 'ko' ? '행운 방향' : 'Lucky Direction', value: data.direction },
      { label: locale === 'ko' ? '행운 계절' : 'Lucky Season', value: data.season },
      { label: locale === 'ko' ? '추천 아이템' : 'Recommended Items', value: data.item },
      { label: locale === 'ko' ? '행운 숫자' : 'Lucky Numbers', value: guardian.luckyNumber.join(', ') },
    ],
  };
}

// ===== 성명학 상세 섹션 =====
function buildNameDetailSection(name: NameAnalysisResult, saju: SajuResult, locale: string): ResultSection {
  const ratingText: Record<string, string> = {
    great: locale === 'ko' ? '매우 좋은 기운(대길)' : 'Very auspicious energy (Great Fortune)',
    good: locale === 'ko' ? '좋은 기운(길)' : 'Auspicious energy (Fortune)',
    neutral: locale === 'ko' ? '무난한 기운(평)' : 'Neutral energy (Balanced)',
    caution: locale === 'ko' ? '주의가 필요한 기운(주의)' : 'Energy requiring caution (Caution)',
    avoid: locale === 'ko' ? '피하는 것이 좋은 기운(흉)' : 'Energy best avoided (Inauspicious)',
  };

  const soundDesc: Record<string, string> = {
    '상생': locale === 'ko' 
      ? '소리오행이 서로를 생해주는 관계(상생)로, 이름의 기운이 조화롭게 흐르는 경향이 있습니다.'
      : 'The sound elements support each other (Mutual Generation), indicating the name\'s energy flows harmoniously.',
    '중화': locale === 'ko'
      ? '소리오행이 균형을 이루는 중화 관계로, 이름이 안정적인 기운을 가지고 있습니다.'
      : 'The sound elements form a balanced neutral relationship, giving the name stable energy.',
    '상극': locale === 'ko'
      ? '소리오행이 서로 극하는 관계(상극)가 있어, 이름 기운에서 긴장감이 발생할 수 있습니다. 이를 보완하는 방법으로 유리한 오행의 색상이나 소품을 활용하면 도움이 됩니다.'
      : 'There is a conflicting relationship (Mutual Overcoming) among the sound elements, which may create tension. Using colors or accessories of favorable elements as a complement can be helpful.',
  };

  const wonRating = name.suriAnalysis?.wongyeok?.rating || 'neutral';
  const strengthBand = describeStrengthBand(estimateDayMasterStrength(saju), locale);
  const tenGodLabel = describeTenGodDominant(analyzeTenGodProfile(saju).dominant, locale);
  const focus = determineSajuScoringFocus(saju);
  const hyeongRating = name.suriAnalysis?.hyeongyeok?.rating || 'neutral';
  const soundRelation = name.soundOhaengRelation || '중화';
  const soundKey = soundRelation.includes('상생') ? '상생' : soundRelation.includes('상극') ? '상극' : '중화';

  const wonSummary = locale === 'ko'
    ? (name.suriAnalysis?.wongyeok?.summary || '')
    : (suriData[name.wongyeok]?.summaryEn || name.suriAnalysis?.wongyeok?.summary || '');

  // 성명+사주 오행 교차 분석
  const CG_OHAENG: Record<string, string> = {
    '갑': '목', '을': '목', '병': '화', '정': '화', '무': '토', '기': '토', '경': '금', '신': '금', '임': '수', '계': '수'
  };
  const sajuOhaeng = CG_OHAENG[saju.ilgan] || '목';
  const nameOhaeng = name.soundOhaengList?.[1] || name.soundOhaengList?.[0] || '토';
  const combo = NAME_SAJU_COMBO[sajuOhaeng]?.[nameOhaeng];
  const relationEn: Record<string, string> = {
    '상생': 'Mutual Generation',
    '상극': 'Mutual Overcoming',
    '비화': 'Same Element Amplification',
  };
  const relationLabel = locale === 'ko' ? (combo?.relation || '') : (relationEn[combo?.relation || ''] || combo?.relation || '');

  const comboContent = combo 
    ? (locale === 'ko'
      ? `\n\n[사주+성명 조합: ${combo.title}]\n${combo.effect}\n(조언) ${combo.advice}`
      : `\n\n[Saju + Name Synergy: ${combo.titleEn}]\n${combo.effectEn}\n(Advice) ${combo.adviceEn}`)
    : '';

  const content = locale === 'ko'
    ? `이름 "${name.name}"의 성명학 분석 결과입니다. ` +
      `원격(성+이름 전체) ${name.wongyeok}수는 ${ratingText[wonRating] || ''}을 나타내며, ` +
      `${name.suriAnalysis?.wongyeok?.summary || ''}. ` +
      `형격(이름만) ${name.hyeongyeok}수는 ${ratingText[hyeongRating] || ''}을 나타냅니다. ` +
      `소리오행은 ${name.soundOhaengList?.join('-') || ''} 구성으로, ` +
      `${soundDesc[soundKey] || '이름의 기운을 분석합니다.'}${comboContent}`
    : `Here is the name analysis result for "${name.name}". ` +
      `The Won-Gyeok (Total) count of ${name.wongyeok} indicates ${ratingText[wonRating] || ''}, ` +
      `showing that ${wonSummary}. ` +
      `The Hyeong-Gyeok (Name) count of ${name.hyeongyeok} indicates ${ratingText[hyeongRating] || ''}. ` +
      `The sound elements are composed as ${name.soundOhaengList?.join('-') || ''}, ` +
      `${soundDesc[soundKey] || 'analyzing the name\'s energy.'}${comboContent}`;

  const soundKeyEn: Record<string, string> = {
    '상생': 'Mutual Generation',
    '중화': 'Neutral',
    '상극': 'Mutual Overcoming',
  };

  return {
    icon: '✍️',
    title: locale === 'ko' ? '성명학 상세 분석' : 'Name Analysis Detail',
    content,
    subItems: [
      { label: locale === 'ko' ? '원격(원국)' : 'Won-Gyeok (Total)', value: `${name.wongyeok}수 - ${ratingText[wonRating] || ''}` },
      { label: locale === 'ko' ? '형격(성격)' : 'Hyeong-Gyeok (Name)', value: `${name.hyeongyeok}수 - ${ratingText[hyeongRating] || ''}` },
      { 
        label: locale === 'ko' ? '소리오행' : 'Sound Elements', 
        value: `${name.soundOhaengList?.join(' → ') || ''} (${locale === 'ko' ? soundKey : (soundKeyEn[soundKey] || soundKey)})` 
      },
      { label: locale === 'ko' ? '사주-성명 오행' : 'Saju-Name Elements', value: `${locale === 'ko' ? sajuOhaeng : translateData(sajuOhaeng, locale)} - ${locale === 'ko' ? nameOhaeng : translateData(nameOhaeng, locale)} (${relationLabel})` },
    ],
  };
}

// ===== MBTI + 사주 연계 섹션 =====
function buildMbtiSajuSection(mbtiType: string, ohaeng: string, locale: string): ResultSection {
  const mbtiInfo = mbtiTypes[mbtiType];
  if (!mbtiInfo) return {
    icon: '🧠',
    title: locale === 'ko' ? 'MBTI 연계 분석' : 'MBTI & Four Pillars Fusion Analysis',
    content: locale === 'ko' ? 'MBTI 정보를 기반으로 분석합니다.' : 'Analyzing based on MBTI information.',
  };

  const combinationDesc: Record<string, string> = {
    '금-금': locale === 'ko' ? '날카로운 분석력과 강한 원칙이 시너지를 이루는 경향이 있습니다. 목표 달성에 강력한 기운이 있으나, 유연성을 기르는 것이 좋습니다.' : 'Sharp analysis and strong principles create synergy. There tends to be powerful energy for goal achievement, but developing flexibility is advisable.',
    '금-목': locale === 'ko' ? '날카로운 금 기운과 창의적인 목 기운이 만나 독특한 균형을 이루는 경향이 있습니다. 분석력과 창의성이 함께 발휘될 때 큰 성과를 내는 경향이 있습니다.' : 'The sharp Metal energy and creative Wood energy tend to create a unique balance. Sharp analysis and creativity tend to produce great results when expressed together.',
    '금-화': locale === 'ko' ? '결단력 있는 금 기운과 열정적인 화 기운이 조합되어 추진력이 강한 경향이 있습니다. 이 에너지를 잘 조절하면 큰 성취를 이룰 수 있습니다.' : 'Decisive Metal energy combined with passionate Fire energy tends to create strong drive. Managing this energy well can lead to great achievements.',
    '금-토': locale === 'ko' ? '원칙적인 금 기운과 안정적인 토 기운이 조화를 이루어 신뢰받는 경향이 있습니다. 실용적이고 체계적인 일 처리 능력이 강한 경향이 있습니다.' : 'Principled Metal energy and stable Earth energy tend to harmonize, inspiring trust. Practical and systematic work abilities tend to be strong.',
    '금-수': locale === 'ko' ? '예리한 금 기운과 깊은 수 기운이 만나 통찰력이 뛰어난 경향이 있습니다. 학문이나 연구 분야에서 특히 두각을 나타내는 경향이 있습니다.' : 'Sharp Metal energy and deep Water energy tend to create outstanding insight. You tend to stand out particularly in academic or research fields.',
    '목-목': locale === 'ko' ? '성장 지향적인 기운이 더욱 강화되는 경향이 있습니다. 창의성과 인간애가 넘치지만 때로는 현실적인 판단도 중요합니다.' : 'Growth-oriented energy tends to be further amplified. Creativity and humanity abound, but realistic judgment is also important at times.',
    '목-화': locale === 'ko' ? '창의적인 목 기운과 열정적인 화 기운이 만나 강한 표현력을 가진 경향이 있습니다. 예술, 교육, 커뮤니케이션 분야에서 빛을 발하는 경향이 있습니다.' : 'Creative Wood energy and passionate Fire energy create strong expressiveness. You tend to shine in arts, education, and communication fields.',
    '목-토': locale === 'ko' ? '성장하는 목 기운과 안정적인 토 기운이 균형을 이루는 경향이 있습니다. 창의성과 현실감각이 조화롭게 발휘될 때 최고의 성과가 나옵니다.' : 'Growing Wood energy and stable Earth energy tend to balance. Best results emerge when creativity and practicality are harmoniously expressed.',
    '목-수': locale === 'ko' ? '창의적인 목 기운이 수 기운의 지원을 받아 더욱 강화되는 경향이 있습니다. 학습능력과 창의성이 함께 발달하는 경향이 있습니다.' : 'Creative Wood energy tends to be further strengthened with Water energy support. Learning ability and creativity tend to develop together.',
    '목-금': locale === 'ko' ? '자유로운 목 기운과 원칙적인 금 기운 사이의 균형이 독특한 개성을 만들어내는 경향이 있습니다.' : 'Free Wood energy and principled Metal energy tend to create a unique personality in the balance between them.',
    '화-화': locale === 'ko' ? '열정과 표현력이 극대화되는 경향이 있습니다. 사람들을 끌어당기는 카리스마가 강하지만 에너지 조절이 중요합니다.' : 'Passion and expressiveness tend to be maximized. Charisma that attracts people is strong, but managing energy is important.',
    '화-목': locale === 'ko' ? '열정적인 화 기운이 목 기운의 성장 에너지를 받아 더욱 발전하는 경향이 있습니다. 긍정적이고 성장 지향적인 에너지가 넘칩니다.' : 'Passionate Fire energy tends to develop further receiving Wood energy\'s growth power. Positive and growth-oriented energy abounds.',
    '화-토': locale === 'ko' ? '열정적인 화 기운과 안정적인 토 기운이 만나 균형 잡힌 에너지를 발휘하는 경향이 있습니다.' : 'Passionate Fire energy and stable Earth energy tend to combine to express balanced energy.',
    '화-금': locale === 'ko' ? '열정적인 화 기운이 원칙적인 금 기운과 만나 목표 지향적인 추진력을 발휘하는 경향이 있습니다.' : 'Passionate Fire energy and principled Metal energy tend to combine to express goal-oriented drive.',
    '화-수': locale === 'ko' ? '열정적인 화 기운과 사려 깊은 수 기운이 균형을 이루어 독특한 매력을 발휘하는 경향이 있습니다.' : 'Passionate Fire energy and thoughtful Water energy tend to balance, expressing unique charm.',
    '토-토': locale === 'ko' ? '안정감과 신뢰가 더욱 강화되는 경향이 있습니다. 조직에서 없어서는 안 될 존재가 되는 경향이 있습니다.' : 'Stability and trust tend to be further strengthened. You tend to become an indispensable presence in an organization.',
    '토-목': locale === 'ko' ? '안정적인 토 기운이 창의적인 목 기운을 만나 실용적인 창의성을 발휘하는 경향이 있습니다.' : 'Stable Earth energy meeting creative Wood energy tends to express practical creativity.',
    '토-화': locale === 'ko' ? '안정적인 토 기운이 활발한 화 기운을 받아 따뜻하고 포용력 있는 에너지를 발휘하는 경향이 있습니다.' : 'Stable Earth energy receiving active Fire energy tends to express warm and inclusive energy.',
    '토-금': locale === 'ko' ? '안정적인 토 기운과 원칙적인 금 기운이 만나 신뢰받는 리더십을 발휘하는 경향이 있습니다.' : 'Stable Earth energy and principled Metal energy tend to combine to express trusted leadership.',
    '토-수': locale === 'ko' ? '안정적인 토 기운과 지혜로운 수 기운이 조화를 이루어 실용적 지혜를 발휘하는 경향이 있습니다.' : 'Stable Earth energy and wise Water energy tend to harmonize to express practical wisdom.',
    '수-수': locale === 'ko' ? '지혜와 학문의 기운이 더욱 강화되는 경향이 있습니다. 깊이 있는 통찰력이 탁월하지만 실행력을 기르는 것이 중요합니다.' : 'The energy of wisdom and learning tends to be further amplified. Insight tends to be outstanding, but developing execution ability is important.',
    '수-목': locale === 'ko' ? '지혜로운 수 기운이 성장하는 목 기운을 만나 이상적인 학자형 타입의 경향이 있습니다.' : 'Wise Water energy meeting growing Wood energy tends to represent the ideal scholar type.',
    '수-화': locale === 'ko' ? '깊은 수 기운과 열정적인 화 기운이 만나 내면의 깊이와 외면의 활력을 동시에 가진 경향이 있습니다.' : 'Deep Water energy and passionate Fire energy tend to combine, having both inner depth and outward vitality.',
    '수-토': locale === 'ko' ? '지혜로운 수 기운과 안정적인 토 기운이 조화를 이루어 현명한 판단력을 발휘하는 경향이 있습니다.' : 'Wise Water energy and stable Earth energy tend to harmonize to express wise judgment.',
    '수-금': locale === 'ko' ? '지혜로운 수 기운이 금 기운의 지원을 받아 더욱 날카로워지는 경향이 있습니다.' : 'Wise Water energy tends to become sharper with Metal energy support.',
  };

  const combKey = `${ohaeng}-${mbtiInfo.ohaeng}`;
  const combDesc = combinationDesc[combKey] || (locale === 'ko' 
    ? `사주 ${ohaeng} 기운과 MBTI ${mbtiType}의 특성이 조화를 이루고 있습니다.`
    : `The energy of ${ohaeng} and MBTI ${mbtiType} characteristics are in harmony.`);

  const content = locale === 'ko'
    ? `MBTI ${mbtiType}(${mbtiInfo.nickname})의 특성과 사주 ${ohaeng} 기운의 교차 분석입니다. ${combDesc} ` +
      `${mbtiInfo.strengths?.[0] || ''} ${mbtiInfo.growthPoints?.[0] || ''}`
    : `This is a fusion analysis of MBTI ${mbtiType} (${mbtiInfo.nicknameEn || mbtiInfo.nickname}) traits and the ${ohaeng} energy from your Four Pillars. ${combDesc}`;

  return {
    icon: '🧠',
    title: locale === 'ko' ? `MBTI·사주 융합 분석 (${mbtiType} × ${ohaeng})` : `MBTI & Four Pillars Fusion Analysis (${mbtiType} × ${ohaeng})`,
    content,
    subItems: [
      { 
        label: locale === 'ko' ? 'MBTI 유형' : 'MBTI Type', 
        value: `${mbtiType} - ${locale === 'ko' ? mbtiInfo.nickname : (mbtiInfo.nicknameEn || mbtiInfo.nickname)}` 
      },
      { label: locale === 'ko' ? 'MBTI 오행' : 'MBTI Element', value: translateData(mbtiInfo.ohaeng, locale) },
      { label: locale === 'ko' ? '사주 일간 오행' : 'Day Stem Element', value: translateData(ohaeng, locale) },
      { label: locale === 'ko' ? '조합 특성' : 'Combination Trait', value: combDesc.split('.')[0] },
    ],
  };
}

// ===== 관상 복합 분석 섹션 =====
function buildFaceSection(face: FaceAnalysisResult, locale: string): ResultSection {
  const isKo = locale === 'ko';
  
  // Find matching combos
  const activeCombos = FACE_COMBOS.filter(combo => {
    return Object.values(combo.parts).every(part => face.mainFeatures.some(f => f.includes(part)));
  });

  const comboTexts = activeCombos.map(combo => {
    return `\n\n[복합 시너지: ${isKo ? combo.title : combo.titleEn}]\n${isKo ? combo.personality : combo.personalityEn}`;
  }).join('');

  const content = isKo
    ? `분석된 관상 특징(${face.mainFeatures.join(', ')})을 바탕으로 한 종합 해석입니다. ${face.summary}${comboTexts}`
    : `Based on your analyzed facial features (${face.mainFeatures.join(', ')}), here is the comprehensive interpretation. ${face.summary}${comboTexts}`;

  return {
    icon: '👤',
    title: isKo ? '관상 복합 시너지 분석' : 'Face Reading Synergy Analysis',
    content,
    subItems: [
      { label: isKo ? '주요 특징' : 'Main Features', value: face.mainFeatures.join(', ') },
    ]
  };
}

// ===== 메인 generateResult 함수 =====
export function generateResult(params: {
  saju: SajuResult;
  name: NameAnalysisResult;
  face?: FaceAnalysisResult;
  mbtiType?: string;
  mbtiClarity?: number;
  mbtiConfidence?: MbtiConfidence | null;
  locale?: string;
}): ComprehensiveResult {
  const { saju, name, face, mbtiType, mbtiClarity, mbtiConfidence } = params;
  const locale = params.locale || 'ko';

  const balance = analyzeOhaengBalance(saju);
  const strongOhaeng = getStrongestOhaeng(balance);

  const sajuScore = calcSajuScore(saju);
  const nameScore = name.score;
  const faceScore = face ? face.score : 75;
  const mbtiScore = calculateMbtiScore({
    mbtiType,
    clarity: mbtiClarity,
    confidence: mbtiConfidence,
  });

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
    ilgan: locale === 'ko' ? `일간: ${saju.ilgan}(${getIlganHanja(saju.ilgan)})` : `Day Stem: ${getIlganHanja(saju.ilgan)}`,
    wolji: locale === 'ko' ? `월지: ${saju.month.jiji}(${getJijiHanja(saju.month.jiji)})` : `Month Branch: ${getJijiHanja(saju.month.jiji)}`,
    wongyeok: name.wongyeok,
    hyeongyeok: name.hyeongyeok,
    soundOhaeng: (name.soundOhaengList?.join('-') || '') +
      (locale === 'ko' 
        ? (name.soundOhaengRelation?.includes('상생') ? ' (상생)' :
           name.soundOhaengRelation?.includes('중화') ? ' (중화)' : ' (상극)')
        : (name.soundOhaengRelation?.includes('상생') ? ' (Harmonious)' :
           name.soundOhaengRelation?.includes('중화') ? ' (Balanced)' : ' (Conflicting)')),
    mbtiOhaeng: mbtiType ? `MBTI: ${mbtiType} → ${locale === 'ko' ? '오행' : 'Element'} ${translateData(mbtiToOhaeng(mbtiType), locale)} ${locale === 'ko' ? '매핑' : 'Mapping'}` : undefined,
  };

  const wonRating = name.suriAnalysis?.wongyeok?.rating || 'neutral';
  const strengthBand = describeStrengthBand(estimateDayMasterStrength(saju), locale);
  const tenGodLabel = describeTenGodDominant(analyzeTenGodProfile(saju).dominant, locale);
  const focus = determineSajuScoringFocus(saju);
  const summaryLines = locale === 'ko' ? [
    `${saju.ilgan} 일간으로 ${strongOhaeng} 기운이 강한 경향이 있습니다`,
    `성명의 기운이 ${wonRating === 'great' || wonRating === 'good' ? '좋은' : '중립적인'} 방향으로 작용하는 경향이 있습니다`,
    `수호신 ${guardian.nameKo}(${guardian.emoji})의 기운이 함께합니다. ${guardian.luckyMessage}`,
  ] : [
    `${getIlganHanja(saju.ilgan)} Day Stem with a strong tendency toward ${translateData(strongOhaeng, locale)} energy`,
    `The energy of your name tends to work in a ${wonRating === 'great' || wonRating === 'good' ? 'positive' : 'neutral'} direction`,
    `Guardian ${guardian.nameEn} (${guardian.emoji}) is with you. ${guardian.luckyMessageEn ?? guardian.luckyMessage}`,
  ];

  const enhancedSummaryLines = locale === 'ko'
    ? [
        `${saju.ilgan} 일간은 ${translateData(strongOhaeng, locale)} 기운이 강하게 드러나는 편입니다.`,
        `${strengthBand}이며 ${tenGodLabel} 구조가 핵심입니다. ${focus.usefulElement} 기운을 보강하면 안정감이 올라갑니다.`,
        `이름 기운은 ${wonRating === 'great' || wonRating === 'good' ? '긍정적' : '중립적'} 방향이고, 수호신 ${guardian.nameKo}(${guardian.emoji})의 보완 흐름이 함께 작동합니다.`,
      ]
    : [
        `${getIlganHanja(saju.ilgan)} Day Stem currently shows a stronger pull toward ${translateData(strongOhaeng, locale)} energy.`,
        `The chart reads as ${strengthBand} with ${tenGodLabel}, and reinforcing ${translateData(focus.usefulElement, locale)} improves stability.`,
        `Your name energy stays ${wonRating === 'great' || wonRating === 'good' ? 'supportive' : 'neutral'}, while guardian ${guardian.nameEn} (${guardian.emoji}) adds a balancing layer.`,
      ];

  return {
    scores: { saju: sajuScore, name: nameScore, face: faceScore, mbti: mbtiScore, total },
    analysisBox,
    summaryLines: enhancedSummaryLines.length ? enhancedSummaryLines : summaryLines,
    ohaengAnalysis: buildOhaengAnalysis(saju, locale),
    ilganAnalysis: buildIlganAnalysis(saju, locale),
    careerSection: buildCareerSection(strongOhaeng, locale, mbtiType),
    wealthSection: buildWealthSection(saju, strongOhaeng, locale),
    loveSection: buildLoveSection(strongOhaeng, locale, mbtiType),
    healthSection: buildHealthSection(strongOhaeng, locale),
    luckySection: buildLuckySection(strongOhaeng, guardian, locale),
    nameDetailSection: buildNameDetailSection(name, saju, locale),
    mbtiSajuSection: mbtiType ? buildMbtiSajuSection(mbtiType, strongOhaeng, locale) : undefined,
    faceSection: face ? buildFaceSection(face, locale) : undefined,
    guardian,
    missingItems: {
      mbti: !mbtiType,
      time: !saju.hour,
      photo: !face,
    },
  };
}

