// lib/calculator/saju-result-generator.ts
// 사주 단독 결과 전용 풍성한 텍스트 생성기

import { SajuResult, analyzeOhaengBalance } from './saju-calculator';
import { ILJOO_PROFILES } from '../data/saju/iljoo-profiles';
import { DAEWOON_SEWOON_CROSS } from '../data/saju/daewoon-sewoon';
import { SINSAL_COMBOS } from '../data/saju/sinsal-combo';

export interface SajuSection {
    icon: string;
    title: string;
    content: string;
    highlight?: string; // 강조 문구
    score?: number;
    tags?: string[];
}

export interface DaewoonItem {
    age: string;
    cheongan: string;
    jiji: string;
    theme: string;
    detail: string;
    rating: 'great' | 'good' | 'neutral' | 'caution';
}

export interface SajuFullResult {
    // 헤더
    ilganName: string;       // e.g. "甲木(갑목)"
    iljanHanja: string;      // e.g. "甲"
    ilganOhaeng: string;     // e.g. "목"
    totalScore: number;
    keywords: string[];
    rarityPercent: number;   // "상위 X%"
    pillarDisplay: {         // 4주 표시용
        year: { cg: string; jj: string; cgH: string; jjH: string; ohaeng: string };
        month: { cg: string; jj: string; cgH: string; jjH: string; ohaeng: string };
        day: { cg: string; jj: string; cgH: string; jjH: string; ohaeng: string };
        hour?: { cg: string; jj: string; cgH: string; jjH: string; ohaeng: string };
    };
    ohaengBalance: Record<string, number>;
    yongsin: string;         // 용신 오행
    gisin: string;           // 기신 오행
    summaryLines: string[];  // 핵심 요약 3줄
    sections: SajuSection[]; // 12개 섹션
    daewoon: DaewoonItem[];  // 대운 타임라인
    seWoon2025: SajuSection; // 2025년 세운
    seWoon2026: SajuSection; // 2026년 세운
    sinsal: SajuSection;     // 신살 분석
    luckyElements: {
        color: string[]; direction: string; number: number[]; material: string;
    };
}

// ── 한자 맵 ──
const CG_HANJA: Record<string, string> = {
    '갑': '甲', '을': '乙', '병': '丙', '정': '丁', '무': '戊', '기': '己', '경': '庚', '신': '辛', '임': '壬', '계': '癸'
};
const JJ_HANJA: Record<string, string> = {
    '자': '子', '축': '丑', '인': '寅', '묘': '卯', '진': '辰', '사': '巳', '오': '午', '미': '未', '신': '申', '유': '酉', '술': '戌', '해': '亥'
};
const JJ_OHAENG: Record<string, string> = {
    '자': '수', '축': '토', '인': '목', '묘': '목', '진': '토', '사': '화', '오': '화', '미': '토', '신': '금', '유': '금', '술': '토', '해': '수'
};
const CG_OHAENG: Record<string, string> = {
    '갑': '목', '을': '목', '병': '화', '정': '화', '무': '토', '기': '토', '경': '금', '신': '금', '임': '수', '계': '수'
};

// ── 일간별 핵심 성격 (바넘 효과 + 구체성) ──
const ILGAN_PROFILE: Record<string, {
    name: string; hanja: string; element: string; title: string;
    personality: string; strength: string; weakness: string;
    keywords: string[];
}> = {
    '갑': {
        name: '갑목', hanja: '甲', element: '목',
        title: '곧은 대나무형 — 리더이자 개척자',
        personality: '甲木(갑목)은 봄의 새싹이자 곧게 솟는 나무의 기운입니다. 겉으로는 자신감 넘치고 당당해 보이지만, 내면에는 타인의 인정을 갈망하는 섬세한 면이 있습니다. 한번 목표를 세우면 굽히지 않는 고집이 때로는 강점이, 때로는 발목을 잡는 요소가 됩니다.',
        strength: '탁월한 추진력과 리더십. 어떤 상황에서도 포기하지 않는 불굴의 의지. 새로운 것을 시작하는 창의적 에너지.',
        weakness: '자기 주장이 너무 강해 협력이 어려울 때가 있음. 고집으로 인한 관계 마찰. 타인의 의견을 수용하는 유연성 부족.',
        keywords: ['리더형', '개척자', '추진력', '독립적', '고집'],
    },
    '을': {
        name: '을목', hanja: '乙', element: '목',
        title: '유연한 덩굴형 — 적응력의 달인',
        personality: '乙木(을목)은 담쟁이덩굴처럼 어떤 환경에도 적응하는 유연한 기운입니다. 표면상 온순하고 부드러워 보이지만, 내면에는 놀랄 만큼 강한 생존 본능이 숨어 있습니다. 사람들과의 관계에서 탁월한 눈치와 공감 능력을 발휘합니다.',
        strength: '뛰어난 공감 능력과 사교성. 어떤 환경에서도 살아남는 적응력. 섬세한 감수성과 예술적 재능.',
        weakness: '결단력 부족으로 선택 장면에서 흔들림. 타인의 눈치를 과도하게 살핌. 자기 주장을 드러내기 어려워 억울함이 쌓임.',
        keywords: ['적응력', '공감형', '사교적', '유연함', '감수성'],
    },
    '병': {
        name: '병화', hanja: '丙', element: '화',
        title: '태양형 — 밝고 따뜻한 에너지의 중심',
        personality: '丙火(병화)는 한낮의 태양처럼 밝고 강렬한 기운입니다. 어디에 있든 자연스럽게 눈에 띄고, 주변을 밝히는 존재감을 가집니다. 적극적이고 솔직한 성격으로 인기를 끌지만, 과도한 자기 표현이 때로 오해를 낳기도 합니다.',
        strength: '강렬한 존재감과 카리스마. 주변을 따뜻하게 만드는 에너지. 적극적이고 행동력 있는 추진력.',
        weakness: '감정 기복이 심하고 속을 숨기지 못함. 과도한 자기 표현으로 오해 유발. 흥미가 식으면 금세 포기하는 경향.',
        keywords: ['카리스마', '태양형', '존재감', '열정', '표현력'],
    },
    '정': {
        name: '정화', hanja: '丁', element: '화',
        title: '촛불형 — 섬세한 내면의 불꽃',
        personality: '丁火(정화)는 어둠 속 촛불처럼 섬세하고 지속적인 기운입니다. 겉으로는 차분해 보이지만 내면에는 끊임없이 타오르는 열정과 집착이 있습니다. 특히 관심 분야에서는 타인이 따라올 수 없는 깊이의 몰입을 보여줍니다.',
        strength: '한 분야에 대한 깊은 집중력과 전문성. 섬세한 감수성과 예리한 관찰력. 진정성 있는 인간관계.',
        weakness: '집착과 감정 기복. 에너지 소모가 빠르고 번아웃 위험. 지나친 완벽주의로 인한 스트레스.',
        keywords: ['집중력', '전문가형', '섬세함', '예술적', '내면폭발'],
    },
    '무': {
        name: '무토', hanja: '戊', element: '토',
        title: '산악형 — 흔들리지 않는 안정의 기둥',
        personality: '戊土(무토)는 거대한 산처럼 변함없이 안정적인 기운입니다. 주변의 변화에 쉽게 흔들리지 않고 묵묵히 자신의 자리를 지킵니다. 포용력이 뛰어나 주변 사람들의 의지처가 되지만, 변화를 받아들이는 데 시간이 걸립니다.',
        strength: '흔들리지 않는 안정감과 포용력. 맡은 바를 끝까지 완수하는 책임감. 신뢰를 주는 진중한 성품.',
        weakness: '변화와 새로운 것에 대한 저항. 결단이 느리고 때를 놓치는 경향. 고집스러운 면이 관계 마찰로 이어짐.',
        keywords: ['안정형', '포용력', '책임감', '신뢰', '중심'],
    },
    '기': {
        name: '기토', hanja: '己', element: '토',
        title: '대지형 — 풍요를 일구는 섬세한 흙',
        personality: '己土(기토)는 비옥한 대지처럼 모든 것을 품어 기르는 기운입니다. 무토(戊土)의 웅장함과 달리 섬세하고 실용적입니다. 현실 감각이 뛰어나고 타인의 필요를 먼저 파악하는 능력이 있습니다.',
        strength: '뛰어난 현실 감각과 실용적 사고. 타인의 감정을 잘 읽는 공감 능력. 꾸준한 노력으로 결과를 만들어내는 성실함.',
        weakness: '우유부단한 면이 있어 결단이 어려움. 지나치게 남의 눈을 의식함. 자기 자신은 돌보지 않고 남만 챙기는 경향.',
        keywords: ['실용형', '공감력', '성실함', '현실감각', '조화'],
    },
    '경': {
        name: '경금', hanja: '庚', element: '금',
        title: '원석형 — 강인한 의지의 결단력',
        personality: '庚金(경금)은 갓 캐낸 광석처럼 강하고 날카로운 기운입니다. 원칙과 규율을 중시하며 불의를 보면 참지 못하는 정의감이 있습니다. 겉으로는 차갑고 강해 보이지만, 한번 인정한 사람에게는 의외로 따뜻하고 헌신적입니다.',
        strength: '확고한 원칙과 정의감. 강인한 결단력과 추진력. 어렵고 힘든 일도 마다하지 않는 의지력.',
        weakness: '타협을 모르는 경직성이 인간관계를 어렵게 만듦. 감정 표현이 서툴러 차갑게 오해받음. 지나친 완벽주의.',
        keywords: ['원칙주의', '결단력', '정의감', '강인함', '의지'],
    },
    '신': {
        name: '신금', hanja: '辛', element: '금',
        title: '보석형 — 예리한 감각의 완벽주의자',
        personality: '辛金(신금)은 반짝이는 보석처럼 섬세하고 날카로운 감각의 기운입니다. 미적 감각이 뛰어나고 디테일에 강한 완벽주의자입니다. 예민한 만큼 상처받기 쉽지만 그 상처를 자양분으로 더 빛을 발하는 경향이 있습니다.',
        strength: '탁월한 심미안과 예술적 감각. 날카로운 분석력과 판단력. 작은 것도 놓치지 않는 디테일 능력.',
        weakness: '과도한 예민함으로 인한 감정 소모. 타인의 말 한마디에 오래 상처받음. 완벽주의로 인한 만성 스트레스.',
        keywords: ['완벽주의', '섬세함', '예술감각', '날카로움', '예민'],
    },
    '임': {
        name: '임수', hanja: '壬', element: '수',
        title: '대해형 — 넓고 지혜로운 물의 기운',
        personality: '壬水(임수)는 넓은 바다처럼 포용력 있고 지혜로운 기운입니다. 다양한 아이디어와 사람을 품을 수 있는 넓은 그릇을 가졌습니다. 직관력이 뛰어나고 상황 파악이 빠르며, 어떤 상황에서도 길을 찾아내는 유연함이 있습니다.',
        strength: '넓은 시야와 탁월한 직관력. 다양한 사람을 아우르는 포용력. 유연하게 상황에 적응하는 능력.',
        weakness: '집중력 부족으로 한 곳에 오래 머물지 못함. 감정이 가라앉으면 무기력해지는 경향. 지나치게 많은 것을 동시에 추구함.',
        keywords: ['직관형', '포용력', '지혜', '유연함', '넓은시야'],
    },
    '계': {
        name: '계수', hanja: '癸', element: '수',
        title: '이슬형 — 깊은 내면의 감성과 직관',
        personality: '癸水(계수)는 이슬비처럼 침묵 속에 스며드는 섬세하고 깊은 기운입니다. 말보다 관찰로 세상을 이해하며, 타인이 눈치채지 못하는 것들을 먼저 감지합니다. 풍부한 내면세계를 가졌지만 그것을 밖으로 표현하는 것을 어려워합니다.',
        strength: '탁월한 공감 능력과 섬세한 감수성. 깊은 직관력과 영성. 한번 집중하면 타의 추종을 불허하는 몰입력.',
        weakness: '내성적인 성격으로 자기 PR이 어려움. 감정에 쉽게 흔들리고 회복이 오래 걸림. 우울감에 빠지는 경향.',
        keywords: ['감성형', '직관력', '내면탐구', '공감', '섬세함'],
    },
};

// ── 오행별 직업운 ──
const OHAENG_CAREER: Record<string, { main: string; good: string[]; caution: string }> = {
    '목': { main: '교육·언론·기획·스타트업·법조계 분야에서 두각을 나타내는 경향', good: ['교사', '기자', '작가', '변호사', '창업가'], caution: '규칙이 많고 창의성이 제한된 환경에서는 잠재력 발휘 어려움' },
    '화': { main: '예술·엔터테인먼트·마케팅·IT·외교 분야에서 빛나는 경향', good: ['배우', '마케터', '디자이너', '외교관', '강사'], caution: '단순 반복 업무나 창의성이 없는 환경은 에너지 고갈 원인' },
    '토': { main: '금융·부동산·행정·의료·요식업 분야에서 안정적 성과를 내는 경향', good: ['의사', '공무원', '부동산', '요리사', '경영자'], caution: '리스크가 크거나 변동이 심한 업종에서는 심리적 부담이 큼' },
    '금': { main: '군·경·법조·금융·공학 분야에서 탁월한 성과를 내는 경향', good: ['군인', '판사', '엔지니어', '회계사', '외과의'], caution: '감성이 중시되는 서비스업에서는 대인 마찰 가능성' },
    '수': { main: '연구·철학·IT·심리·여행 분야에서 깊이 있는 성과를 내는 경향', good: ['연구원', '심리상담사', '작가', '철학자', '여행사'], caution: '빠른 결과와 실적 압박이 높은 환경에서는 스트레스 증폭' },
};

// ── 오행별 재물운 ──
const OHAENG_WEALTH: Record<string, { main: string; method: string; caution: string }> = {
    '목': { main: '성장 과정에서 재물이 따라오는 유형. 사업 초기보다 3~5년 안정화 이후 급성장하는 패턴', method: '지식·콘텐츠 기반 수익, 교육 사업, 창업 투자', caution: '서두르거나 욕심내면 오히려 손실. 꾸준함이 핵심' },
    '화': { main: '인기와 명성이 재물을 끌어당기는 유형. 이름이 알려질수록 수익이 늘어나는 패턴', method: '브랜드 가치 높이기, 강렬한 인상 마케팅, 엔터 투자', caution: '과시욕과 충동 지출이 재물 유출의 주원인' },
    '토': { main: '안정적으로 쌓이는 자산 형성 유형. 빠른 부자는 없지만 중년 이후 두텁고 안정적인 재산', method: '부동산·예금·정기적 저축, 안정 자산 위주 포트폴리오', caution: '보수적인 성향으로 투자 타이밍을 자주 놓침' },
    '금': { main: '규모 있는 재물과 권력이 함께 오는 유형. 조직 내 승진이나 전문직으로 고수입 가능', method: '전문직 자격증 취득, 고수익 직군 진입, 재무 계획 철저', caution: '완벽주의와 경직성으로 유연한 투자 기회를 놓침' },
    '수': { main: '지혜와 정보로 재물을 모으는 유형. 트렌드를 먼저 읽고 투자하는 선구자형', method: 'IT·주식·암호화폐 등 정보 기반 투자, 지식 콘텐츠 수익', caution: '변덕스러운 투자로 자금이 분산되는 경향' },
};

// ── 오행별 연애/결혼운 ──
const OHAENG_LOVE: Record<string, { style: string; ideal: string; caution: string }> = {
    '목': { style: '헌신적이고 열정적인 사랑. 한번 빠지면 깊게 빠지는 타입', ideal: '나를 있는 그대로 인정해주는 파트너, 독립적인 면을 존중해주는 사람', caution: '자기 주장이 강해 상대의 의견과 충돌하는 경우 多. 조화를 위해 경청 연습 필요' },
    '화': { style: '열정적이고 로맨틱한 사랑. 설레는 감정을 중시하는 타입', ideal: '감정을 함께 나눌 수 있는 따뜻한 파트너, 내 세계를 이해해주는 사람', caution: '감정 기복이 관계를 흔들 수 있음. 열정이 식으면 관계 유지 동기를 잃는 경향' },
    '토': { style: '신중하고 믿음 있는 사랑. 천천히 신뢰를 쌓아가는 타입', ideal: '가정적이고 안정감을 주는 파트너, 함께 미래를 설계할 수 있는 사람', caution: '표현이 부족해 상대에게 무관심으로 오해받기 쉬움. 감사 표현 습관화 필요' },
    '금': { style: '진지하고 원칙 있는 사랑. 관계에서도 솔직함을 중시하는 타입', ideal: '의리 있고 약속을 지키는 파트너, 내 기준을 이해하고 존중하는 사람', caution: '지나친 원칙주의가 상대를 압박. 완벽한 관계를 기대하다 실망하는 경우 多' },
    '수': { style: '깊고 감성적인 사랑. 정신적인 연결을 중시하는 타입', ideal: '지적 대화가 가능한 파트너, 나의 내면세계를 이해해주는 사람', caution: '감수성이 예민해 작은 말에도 상처. 상처를 혼자 삭이다 관계가 어긋나는 경향' },
};

// ── 오행별 건강 ──
const OHAENG_HEALTH: Record<string, { organ: string; risk: string; care: string }> = {
    '목': { organ: '간·담낭·눈·근육·힘줄', risk: '스트레스성 간 피로, 안구 건조증, 근육 긴장', care: '新선한 채소·녹색 식품 섭취, 규칙적인 유산소 운동, 충분한 수면' },
    '화': { organ: '심장·소장·혀·혈관·정신', risk: '심혈관 질환, 불면증, 감정적 소진', care: '카페인·자극성 음식 절제, 명상·호흡 수련, 규칙적인 충전 시간 확보' },
    '토': { organ: '위·비장·췌장·입·살', risk: '소화기 장애, 비만, 과식으로 인한 위장 문제', care: '규칙적인 식사, 과식 주의, 가벼운 산책으로 소화 촉진' },
    '금': { organ: '폐·대장·코·피부·기관지', risk: '호흡기 질환, 피부 트러블, 변비', care: '도시보다 자연 속 활동, 심호흡 운동, 수분 섭취 충분히' },
    '수': { organ: '신장·방광·귀·뼈·생식기', risk: '신장·방광 약화, 만성 피로, 냉증', care: '따뜻한 음식, 족욕·온욕, 충분한 휴식과 수분 섭취' },
};

// ── 신살 데이터 ──
const SINSAL_DATA: Record<string, { emoji: string; meaning: string; desc: string }> = {
    '도화살': { emoji: '🌸', meaning: '도화살(桃花殺)', desc: '인기와 매력의 기운. 이성과 대중의 시선을 끄는 강한 끌림의 에너지. 예술·방송·서비스업에서 두각을 나타내는 경향이 있습니다.' },
    '역마살': { emoji: '🐎', meaning: '역마살(驛馬殺)', desc: '이동과 변화의 기운. 한 곳에 정착하기보다 끊임없이 움직이며 경험을 쌓는 유형. 해외 진출, 출장, 이직이 잦은 편입니다.' },
    '화개살': { emoji: '🎭', meaning: '화개살(華蓋殺)', desc: '예술과 영성의 기운. 종교·철학·예술 분야와 인연이 깊습니다. 혼자 있는 시간을 즐기며, 독창적인 세계관을 가집니다.' },
    '공망': { emoji: '🌫️', meaning: '공망(空亡)', desc: '비어있는 공간의 기운. 특정 영역에서는 기운이 약해지는 현상. 단, 공망된 오행을 보완하면 오히려 강한 성취가 가능합니다.' },
    '천을귀인': { emoji: '⭐', meaning: '천을귀인(天乙貴人)', desc: '귀인의 도움을 받는 길한 기운. 어렵고 힘들 때 반드시 도움의 손길이 나타나는 행운의 기운을 가졌습니다.' },
    '백호대살': { emoji: '🐅', meaning: '백호대살(白虎大殺)', desc: '폭발적인 에너지와 카리스마. 위기 상황에서 강한 돌파력을 발휘하며 큰 성취를 이룰 수 있는 기운입니다.' },
    '괴강살': { emoji: '⚡', meaning: '괴강살(魁罡殺)', desc: '강력한 리더십과 굽히지 않는 주관. 극한의 상황을 이겨내고 만인을 통솔하는 강력한 권력의 기운입니다.' },
    '홍염살': { emoji: '💘', meaning: '홍염살(紅艶殺)', desc: '은근하고 친근한 매력으로 사람을 끄는 기운. 대인관계에서 큰 호감을 얻으며 타인의 사랑을 받습니다.' },
    '양인살': { emoji: '🗡️', meaning: '양인살(羊刃殺)', desc: '모든 것을 휩쓰는 강력한 기운. 생사를 오가는 환경이나 치열한 경쟁에서 타의 추종을 불허하는 능력을 발휘합니다.' },
    '문창귀인': { emoji: '📜', meaning: '문창귀인(文昌貴人)', desc: '천재적인 두뇌와 뛰어난 학구열. 학문, 연구, 예술 분야에서 탁월한 성취를 이루는 길한 기운입니다.' },
    '건록': { emoji: '🏛️', meaning: '건록(建祿)', desc: '스스로의 힘으로 일어서는 자수성가의 기운. 안정적인 직위와 재물을 성취하며 조직에서 인정받습니다.' },
    '현침살': { emoji: '🪡', meaning: '현침살(懸針殺)', desc: '바늘처럼 예리하고 날카로운 직관력. 사물의 본질을 꿰뚫어보며 정밀한 작업이나 활인업에 유리합니다.' },
    '귀문관살': { emoji: '🔮', meaning: '귀문관살(鬼門關殺)', desc: '영적인 감각과 직관이 발달한 기운. 남들이 보지 못하는 것을 감지하며 심리, 예술, 명리 등에 뛰어난 소질이 있습니다.' },
    '고신살/과숙살': { emoji: '🌙', meaning: '고신/과숙살', desc: '고독과 깊은 내면의 사색. 세속적인 것보다 정신적이고 철학적인 가치를 추구하며 깊이를 더합니다.' },
    '식신': { emoji: '🍚', meaning: '식신(食神)', desc: '평생 먹을 복과 재주가 따르는 기운. 창의적인 활동과 베푸는 마음으로 안정적인 삶을 누립니다.' },
    '지살': { emoji: '👣', meaning: '지살(地殺)', desc: '역마살과 함께 활동 범위가 넓어지는 기운. 새로운 환경에 빠르게 적응하며 이동을 통해 발전합니다.' },
};

// ── 오행별 용신 판단 (간략화) ──
function determineYongsin(balance: Record<string, number>, ilgan: string): { yongsin: string; gisin: string } {
    const ilOhaeng = CG_OHAENG[ilgan] || '목';
    // 가장 부족한 오행 → 용신, 가장 많은 오행 → 기신
    const sorted = Object.entries(balance).sort((a, b) => a[1] - b[1]);
    const yongsin = sorted[0][0]; // 가장 적은 오행
    const gisin = sorted[sorted.length - 1][0]; // 가장 많은 오행
    return { yongsin, gisin };
}

// ── 용신별 개운법 ──
const YONGSIN_GAEUN: Record<string, { color: string[]; direction: string; number: number[]; material: string; tips: string }> = {
    '목': { color: ['초록', '청색', '연두'], direction: '동쪽', number: [3, 8], material: '나무·목재', tips: '동쪽 방 배치, 식물 키우기, 초록 소품 활용, 봄에 중요한 일 시작' },
    '화': { color: ['빨강', '주황', '분홍'], direction: '남쪽', number: [2, 7], material: '촛불·조명', tips: '밝은 조명 환경, 붉은 계열 인테리어, 여름에 중요 결정, 햇볕을 자주 쬠' },
    '토': { color: ['황색', '갈색', '베이지'], direction: '중앙', number: [5, 10], material: '도자기·황토', tips: '흙 관련 취미(도예·텃밭), 노란색 지갑, 중앙 위치에 집이나 사무실 배치' },
    '금': { color: ['흰색', '은색', '회색'], direction: '서쪽', number: [4, 9], material: '금속·은·보석', tips: '금속 장신구 착용, 서쪽 방향 외출, 가을에 중요 계획, 흰 옷 자주 착용' },
    '수': { color: ['검정', '남색', '보라'], direction: '북쪽', number: [1, 6], material: '유리·물', tips: '수족관이나 분수 인테리어, 물을 자주 마심, 겨울이 가장 강한 시기, 북향 공간 활용' },
};

// ── 연도별 간지 오행 ──
function getYearOhaeng(year: number): string {
    const cg = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'][(year - 4 + 1000) % 10];
    return CG_OHAENG[cg] || '목';
}

// ── 신살 판단 (지지 기반 간략 로직) ──
function determineSinsal(saju: SajuResult): string[] {
    const jijis = [saju.year.jiji, saju.month.jiji, saju.day.jiji];
    if (saju.hour) jijis.push(saju.hour.jiji);
    const iljoo = `${saju.ilgan}${saju.day.jiji}`;
    const sinsal: string[] = [];

    // 도화살: 자·오·묘·유
    if (jijis.some(j => ['자', '오', '묘', '유'].includes(j))) sinsal.push('도화살');
    // 역마살: 인·신·사·해
    if (jijis.some(j => ['인', '신', '사', '해'].includes(j))) sinsal.push('역마살');
    // 화개살: 진·술·축·미
    if (jijis.some(j => ['진', '술', '축', '미'].includes(j))) sinsal.push('화개살');
    
    // 천을귀인: 일간에 따라
    const guiin: Record<string, string[]> = {
        '갑': ['축', '미'], '무': ['축', '미'], '기': ['자', '신'],
        '을': ['자', '신'], '경': ['축', '미'], '신': ['인', '오'],
        '병': ['해', '유'], '정': ['해', '유'], '임': ['묘', '사'], '계': ['묘', '사'],
    };
    if (jijis.some(j => (guiin[saju.ilgan] || []).includes(j))) sinsal.push('천을귀인');

    // 백호대살
    if (['갑진', '을미', '병술', '정축', '무진', '임술', '계축'].includes(iljoo)) sinsal.push('백호대살');
    // 괴강살
    if (['무진', '무술', '경진', '경술', '임진', '임술'].includes(iljoo)) sinsal.push('괴강살');
    // 홍염살
    if (['갑오', '병인', '정미', '무진', '경술', '신유', '임자'].includes(iljoo)) sinsal.push('홍염살');
    // 양인살
    if (['병오', '무오', '임자'].includes(iljoo)) sinsal.push('양인살');
    // 문창귀인
    if (['병신', '정유', '무신', '기유', '임인', '계묘'].includes(iljoo)) sinsal.push('문창귀인');
    // 건록
    if (['갑인', '을묘', '경신', '신유'].includes(iljoo)) sinsal.push('건록');

    // 현침살
    const hyeonchimCount = [saju.year.cheongan, saju.year.jiji, saju.month.cheongan, saju.month.jiji, saju.day.cheongan, saju.day.jiji].filter(c => ['갑', '신', '묘', '오', '辛'].includes(c)).length;
    if (hyeonchimCount >= 2) sinsal.push('현침살');

    // 귀문관살
    const jijiStr = jijis.join('');
    if (/(자유|유자|축오|오축|인미|미인|묘신|신묘|진해|해진|사술|술사)/.test(jijiStr)) sinsal.push('귀문관살');

    // 고신/과숙살
    if (jijis.includes('술') || jijis.includes('진') || jijis.includes('축') || jijis.includes('미')) sinsal.push('고신살/과숙살');

    // 식신 (간략히 추가)
    sinsal.push('식신');
    // 지살 (간략히 역마와 함께 부여)
    if (sinsal.includes('역마살')) sinsal.push('지살');

    if (sinsal.length === 0) sinsal.push('공망');
    return sinsal;
}

// ── 대운 생성 (간략화: 10년 주기 6개) ──
function generateDaewoon(birthYear: number, ilgan: string, gender: string): DaewoonItem[] {
    const baseAge = 5; // 5세부터 대운 시작
    const ohaengs = ['목', '화', '토', '금', '수'];
    const themes = [
        { theme: '학습·성장기', detail: '기초를 닦고 역량을 키우는 시간. 배움과 준비에 집중할수록 이후가 빛납니다.' },
        { theme: '도전·확장기', detail: '새로운 기회와 만남이 풍성한 시기. 주저하지 말고 도전하세요.' },
        { theme: '전성·성취기', detail: '노력의 결실이 맺히는 황금기. 중요한 결정을 과감히 내리십시오.' },
        { theme: '안정·수확기', detail: '꾸준히 쌓아온 것들이 빛을 발하는 시기. 재물과 명예가 함께합니다.' },
        { theme: '전환·심화기', detail: '내면을 돌아보고 방향을 재정립하는 시기. 변화를 두려워 말고 받아들이세요.' },
        { theme: '완성·지혜기', detail: '경험과 지혜가 진정한 힘이 되는 시기. 후배를 이끄는 역할이 어울립니다.' },
    ];
    const ratings: Array<'great' | 'good' | 'neutral' | 'caution'> = ['good', 'great', 'great', 'good', 'neutral', 'good'];
    return themes.map((t, i) => ({
        age: `${baseAge + i * 10}~${baseAge + i * 10 + 9}세`,
        cheongan: ['갑', '병', '무', '경', '임', '갑'][i],
        jiji: ['인', '오', '술', '진', '자', '인'][i],
        theme: t.theme,
        detail: t.detail,
        rating: ratings[i],
    }));
}

// ── 키워드 생성 ──
function buildKeywords(ilgan: string, ohaengBalance: Record<string, number>, sinsal: string[]): string[] {
    const profile = ILGAN_PROFILE[ilgan];
    const keywords = [...(profile?.keywords.slice(0, 3) || [])];
    if (sinsal.includes('도화')) keywords.push('인기운');
    if (sinsal.includes('역마')) keywords.push('해외운');
    if (sinsal.includes('귀인')) keywords.push('귀인덕');
    const max = Object.entries(ohaengBalance).sort((a, b) => b[1] - a[1])[0]?.[0];
    if (max) keywords.push(`${max}기운 왕성`);
    return keywords.slice(0, 6);
}

// ── 희소성 계산 ──
function calcRarity(ilgan: string, sinsal: string[]): number {
    const base: Record<string, number> = { '갑': 12, '을': 15, '병': 10, '정': 11, '무': 9, '기': 13, '경': 8, '신': 7, '임': 14, '계': 11 };
    let r = base[ilgan] || 10;
    if (sinsal.includes('귀인')) r = Math.min(r, 7);
    if (sinsal.includes('도화') && sinsal.includes('역마')) r = Math.min(r, 5);
    return r;
}

// ── 메인 생성 함수 ──
export function generateSajuResult(
    saju: SajuResult,
    input: { name: string; year: number; month: number; day: number; hour?: number; gender?: string; locale: string }
): SajuFullResult {
    const { name, year, month, day, hour, gender = 'unknown', locale } = input;
    const isKo = locale === 'ko';
    const ilgan = saju.ilgan;
    const profile = ILGAN_PROFILE[ilgan] || ILGAN_PROFILE['갑'];
    const iljoo = `${ilgan}${saju.day.jiji}`;
    const iljooProfile = ILJOO_PROFILES[iljoo];
    const ohaengBalance = analyzeOhaengBalance(saju);
    const { yongsin, gisin } = determineYongsin(ohaengBalance, ilgan);
    const sinsal = determineSinsal(saju);
    const keywords = buildKeywords(ilgan, ohaengBalance, sinsal);
    const rarityPercent = calcRarity(ilgan, sinsal);
    const gaeun = YONGSIN_GAEUN[yongsin];
    const career = OHAENG_CAREER[profile.element];
    const wealth = OHAENG_WEALTH[profile.element];
    const love = OHAENG_LOVE[profile.element];
    const health = OHAENG_HEALTH[profile.element];

    // 4주 display
    const makePillar = (cg: string, jj: string) => ({
        cg, jj, cgH: CG_HANJA[cg] || cg, jjH: JJ_HANJA[jj] || jj, ohaeng: CG_OHAENG[cg] || ''
    });
    const pillarDisplay = {
        year: makePillar(saju.year.cheongan, saju.year.jiji),
        month: makePillar(saju.month.cheongan, saju.month.jiji),
        day: makePillar(saju.day.cheongan, saju.day.jiji),
        ...(saju.hour ? { hour: makePillar(saju.hour.cheongan, saju.hour.jiji) } : {}),
    };

    // 점수 계산 (오행 균형도 + 일간 기본 + 신살)
    const balanceScore = (() => {
        const vals = Object.values(ohaengBalance);
        const max = Math.max(...vals); const min = Math.min(...vals);
        return Math.round(80 - (max - min) * 5); // 균형이 좋을수록 높은 점수
    })();
    const ilganBase: Record<string, number> = { '갑': 78, '을': 75, '병': 80, '정': 77, '무': 73, '기': 74, '경': 79, '신': 76, '임': 77, '계': 74 };
    const sinsalBonus = sinsal.includes('귀인') ? 5 : sinsal.includes('도화') ? 3 : 0;
    const totalScore = Math.min(98, Math.max(55, Math.round((balanceScore + (ilganBase[ilgan] || 75) + sinsalBonus) / 2)));

    const summaryLines = [
        `${name}님의 일주는 ${iljooProfile ? iljooProfile.hanja : profile.hanja}(${iljoo})으로, 전체 사주 유형 중 상위 ${rarityPercent}%에 해당하는 특별한 기운입니다.`,
        `오행 분포에서 ${yongsin}(${yongsin === '목' ? '木' : yongsin === '화' ? '火' : yongsin === '토' ? '土' : yongsin === '금' ? '金' : '水'})이 보강되면 삶의 에너지가 크게 상승합니다.`,
        sinsal.includes('귀인')
            ? `천을귀인(天乙貴人)의 기운을 가져, 어렵고 힘든 순간마다 반드시 귀인의 도움이 나타납니다.`
            : `${sinsal[0] ? SINSAL_DATA[sinsal[0]]?.meaning : ''}의 기운이 강해 독특하고 매력적인 삶의 궤적을 그립니다.`,
    ];

    // 누락 정보 안내
    const hasTime = hour !== undefined;

    const sections: SajuSection[] = [
        // 1. 일간/일주 핵심 성격
        {
            icon: '🌟', title: iljooProfile ? `${iljooProfile.hanja}(${iljoo}) — ${iljooProfile.nickname}` : `${profile.hanja}(${profile.name}) — ${profile.title}`,
            content: iljooProfile ? iljooProfile.personality : profile.personality,
            highlight: iljooProfile ? iljooProfile.special : `${name}님의 핵심 에너지는 "${profile.element}" 기운입니다`,
            tags: profile.keywords,
        },
        // 2. 강점과 약점
        {
            icon: '⚖️', title: '강점과 성장 포인트',
            content: iljooProfile ? `【강점】 ${iljooProfile.strength}\n\n【성장 포인트】 ${iljooProfile.weakness}` : `【강점】 ${profile.strength}\n\n【성장 포인트】 ${profile.weakness}`,
            highlight: '강점을 살리고 약점을 보완할 때 진정한 잠재력이 드러납니다',
        },
        // 3. 오행 균형
        {
            icon: '🌀', title: '오행 균형 분석',
            content: `현재 ${name}님의 사주에서 ${yongsin}(${yongsin})이 가장 약하게 작용합니다. ${yongsin} 오행을 보강하는 것이 인생의 핵심 과제입니다. 반면 ${gisin}이 과도하게 강해 ${gisin} 관련 충동이나 집착이 삶을 흔들 수 있습니다.`,
            highlight: `용신(用神): ${yongsin} · 기신(忌神): ${gisin}`,
            tags: Object.entries(ohaengBalance).map(([k, v]) => `${k}${v}`),
        },
        // 4. 직업·재능
        {
            icon: '💼', title: '직업 적성과 재능',
            content: iljooProfile ? `${name}님은 ${career.main}이 있습니다.\n\n【추천 분야】 ${career.good.join(' · ')}\n\n【일주 특성】 ${iljooProfile.career}\n\n【주의사항】 ${career.caution}` : `${name}님은 ${career.main}이 있습니다.\n\n추천 분야: ${career.good.join(' · ')}\n\n주의사항: ${career.caution}`,
            highlight: `${name}님의 타고난 재능이 가장 빛나는 분야`,
            score: Math.min(95, totalScore + 5),
        },
        // 5. 재물운
        {
            icon: '💰', title: '재물운과 경제 패턴',
            content: `${name}님의 재물 패턴: ${wealth.main}\n\n추천 재테크: ${wealth.method}\n\n주의사항: ${wealth.caution}`,
            highlight: '재물은 방법보다 타이밍이 중요합니다',
            score: Math.min(95, totalScore - 3),
        },
        // 6. 연애·인연
        {
            icon: '💕', title: '연애·결혼운',
            content: iljooProfile ? `【사랑 스타일】 ${love.style}\n\n【일주 특성】 ${iljooProfile.love}\n\n【이상적 파트너】 ${love.ideal}\n\n【주의사항】 ${love.caution}` : `사랑 스타일: ${love.style}\n\n이상적 파트너: ${love.ideal}\n\n주의사항: ${love.caution}`,
            highlight: `${name}님과 가장 잘 맞는 인연의 유형`,
            score: Math.min(95, totalScore + 3),
        },
        // 7. 건강
        {
            icon: '🌿', title: '건강·체질 분석',
            content: `주요 관련 장기: ${health.organ}\n\n주의 질환: ${health.risk}\n\n건강 관리법: ${health.care}`,
            highlight: `${ilgan}${saju.day.jiji} 일주의 체질적 특성`,
        },
        // 8. 개운법
        {
            icon: '✨', title: `용신(${yongsin}) 기반 개운법`,
            content: `${name}님의 용신은 ${yongsin}입니다. 다음 방법으로 삶의 균형을 맞추세요.\n\n${gaeun?.tips}`,
            highlight: `행운 방향: ${gaeun?.direction} · 행운색: ${gaeun?.color.join(', ')}`,
            tags: gaeun?.color,
        },
    ];

    const daewoonList = generateDaewoon(year, ilgan, gender);
    const currentYear = new Date().getFullYear();
    const currentAge = currentYear - year + 1;
    
    let currentDaewoon = daewoonList[0];
    for (const dw of daewoonList) {
        const [start, end] = dw.age.replace('세', '').split('~').map(Number);
        if (currentAge >= start && currentAge <= end) {
            currentDaewoon = dw;
            break;
        } else if (currentAge > end) {
             currentDaewoon = dw;
        }
    }
    const currentDaewoonOhaeng = CG_OHAENG[currentDaewoon.cheongan] || '목';

    // 세운 2025
    const y2025Ohaeng = '목'; // 2025년 을사년
    const y2026Ohaeng = '화'; // 2026년 병오년
    
    const combo2025 = DAEWOON_SEWOON_CROSS[currentDaewoonOhaeng]?.[y2025Ohaeng];
    const seWoon2025: SajuSection = {
        icon: '📅', title: `2025년 을사년(乙巳年) 운세 - ${combo2025?.theme || '성장의 시기'}`,
        content: combo2025 ? `현재 ${name}님의 대운 오행(${currentDaewoonOhaeng})과 2025년 세운 오행(${y2025Ohaeng})이 만나는 시기입니다.\n\n${combo2025.detail}` : `2025년은 을목(乙木)과 사화(巳火)의 해입니다. 새로운 기회를 향해 도약하는 한 해가 될 것입니다.`,
        highlight: combo2025 ? combo2025.advice : '상반기 준비, 하반기 실행',
    };

    const combo2026 = DAEWOON_SEWOON_CROSS[currentDaewoonOhaeng]?.[y2026Ohaeng];
    const seWoon2026: SajuSection = {
        icon: '🗓️', title: `2026년 병오년(丙午年) 운세 - ${combo2026?.theme || '열정의 시기'}`,
        content: combo2026 ? `현재 ${name}님의 대운 오행(${currentDaewoonOhaeng})과 2026년 세운 오행(${y2026Ohaeng})이 만나는 시기입니다.\n\n${combo2026.detail}` : `2026년은 병화(丙火)와 오화(午火)의 해로 화(火) 기운이 강한 해입니다. 열정을 발휘하여 성과를 내는 시기입니다.`,
        highlight: combo2026 ? combo2026.advice : '변화와 에너지 관리가 핵심',
    };

    // 신살
    let sinsalDesc = sinsal.map(s => {
        const d = SINSAL_DATA[s];
        return d ? `${d.emoji} ${d.meaning}: ${d.desc}` : '';
    }).filter(Boolean).join('\n\n');

    // 신살 조합 시너지 체크
    const activeCombos = SINSAL_COMBOS.filter(combo => {
        return combo.combo.every(n => sinsal.includes(n));
    });

    if (activeCombos.length > 0) {
        const comboText = activeCombos.map(c => `\n\n[특별한 기운의 조합: ${c.title}]\n${isKo ? c.effect : c.effectEn}`).join('');
        sinsalDesc += comboText;
    }

    const sinsal_section: SajuSection = {
        icon: '🔯', title: '신살(神殺) 분석',
        content: sinsalDesc || '특별한 신살 없이 균형 잡힌 기운을 가졌습니다.',
        highlight: `${name}님의 사주에 담긴 특별한 기운`,
        tags: sinsal,
    };

    const luckyElements = {
        color: gaeun?.color || ['금색'],
        direction: gaeun?.direction || '동쪽',
        number: gaeun?.number || [1, 6],
        material: gaeun?.material || '나무',
    };

    return {
        ilganName: `${profile.hanja}(${profile.name})`,
        iljanHanja: profile.hanja,
        ilganOhaeng: profile.element,
        totalScore,
        keywords,
        rarityPercent,
        pillarDisplay,
        ohaengBalance,
        yongsin,
        gisin,
        summaryLines,
        sections,
        daewoon: generateDaewoon(year, ilgan, gender),
        seWoon2025,
        seWoon2026,
        sinsal: sinsal_section,
        luckyElements,
    };
}
