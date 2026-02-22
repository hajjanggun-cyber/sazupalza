// 수호신(守護神) 데이터 - 오행별 5가지 신수
// 한국 전통 신수 + 현대적 재해석

export interface Guardian {
  key: string;
  ohaeng: string;
  nameKo: string;
  nameEn: string;
  emoji: string;
  imagePath: string;   // public/images/guardians/ 에 저장
  traits: string[];
  description: string; // 100자 내외
  luckyMessage: string; // 50자 내외
  luckyColor: string;
  luckyDirection: string;
  luckyNumber: number[];
}

export const guardians: Record<string, Guardian> = {
  mok: {
    key: 'mok',
    ohaeng: '목',
    nameKo: '청룡',
    nameEn: 'Azure Dragon',
    emoji: '🐉',
    imagePath: '/images/guardians/blue-dragon.webp',
    traits: ['성장', '창의', '생명력', '인자함'],
    description: '청룡은 목(木)의 기운을 상징하는 신수입니다. 동쪽을 수호하며 새로운 시작과 성장의 기운을 가져다주는 경향이 있습니다. 창의력과 인자한 마음이 삶을 풍요롭게 하는 경향이 있습니다.',
    luckyMessage: '새로운 시작을 두려워하지 마세요. 청룡이 함께합니다.',
    luckyColor: '초록, 청록, 파랑',
    luckyDirection: '동쪽',
    luckyNumber: [3, 8],
  },
  hwa: {
    key: 'hwa',
    ohaeng: '화',
    nameKo: '봉황',
    nameEn: 'Phoenix',
    emoji: '🦅',
    imagePath: '/images/guardians/phoenix.webp',
    traits: ['열정', '표현', '재생', '빛'],
    description: '봉황은 화(火)의 기운을 상징하는 신조입니다. 남쪽을 수호하며 불사의 상징으로 역경을 딛고 다시 날아오르는 힘을 주는 경향이 있습니다. 밝은 에너지로 주변을 빛나게 하는 경향이 있습니다.',
    luckyMessage: '당신 안의 불꽃이 세상을 밝힐 것입니다.',
    luckyColor: '빨강, 주황, 자주',
    luckyDirection: '남쪽',
    luckyNumber: [2, 7],
  },
  to: {
    key: 'to',
    ohaeng: '토',
    nameKo: '황룡',
    nameEn: 'Golden Dragon',
    emoji: '✨',
    imagePath: '/images/guardians/golden-dragon.webp',
    traits: ['균형', '신뢰', '포용', '안정'],
    description: '황룡은 토(土)의 기운을 상징하며 중앙을 수호합니다. 모든 오행의 조화를 이루는 중심 역할을 하며 안정과 신뢰의 기운을 가져다주는 경향이 있습니다. 꾸준한 노력이 결실을 맺는 경향이 있습니다.',
    luckyMessage: '흔들리지 않는 중심이 당신의 힘입니다.',
    luckyColor: '황금, 노랑, 베이지',
    luckyDirection: '중앙',
    luckyNumber: [5, 10],
  },
  geum: {
    key: 'geum',
    ohaeng: '금',
    nameKo: '백호',
    nameEn: 'White Tiger',
    emoji: '🐯',
    imagePath: '/images/guardians/white-tiger.webp',
    traits: ['결단', '의리', '원칙', '강인함'],
    description: '백호는 금(金)의 기운을 상징하는 신수입니다. 서쪽을 수호하며 강한 의지와 결단력으로 장애물을 헤쳐나가는 힘을 주는 경향이 있습니다. 원칙을 지키는 삶이 큰 신뢰를 쌓는 경향이 있습니다.',
    luckyMessage: '백호의 용기로 두려움 없이 앞으로 나아가세요.',
    luckyColor: '흰색, 은색, 금색',
    luckyDirection: '서쪽',
    luckyNumber: [4, 9],
  },
  su: {
    key: 'su',
    ohaeng: '수',
    nameKo: '현무',
    nameEn: 'Black Tortoise',
    emoji: '🐢',
    imagePath: '/images/guardians/black-tortoise.webp',
    traits: ['지혜', '인내', '학문', '깊이'],
    description: '현무는 수(水)의 기운을 상징하는 신수입니다. 북쪽을 수호하며 깊은 지혜와 학문의 기운을 가져다주는 경향이 있습니다. 조용히 준비하고 축적한 힘이 때가 되면 크게 발휘되는 경향이 있습니다.',
    luckyMessage: '깊은 물이 고요한 것처럼, 당신의 내면에 큰 힘이 있습니다.',
    luckyColor: '검정, 진남색, 짙은 파랑',
    luckyDirection: '북쪽',
    luckyNumber: [1, 6],
  },
};

export function getGuardianByOhaeng(ohaeng: string): Guardian {
  return guardians[ohaeng] || guardians['to'];
}
