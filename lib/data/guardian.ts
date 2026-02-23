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
  descriptionEn?: string;
  luckyMessage: string; // 50자 내외
  luckyMessageEn?: string;
  luckyColor: string;
  luckyColorEn?: string;
  luckyDirection: string;
  luckyDirectionEn?: string;
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
    descriptionEn: 'The Azure Dragon is a guardian beast representing the energy of Wood (木). Guarding the east, it tends to bring the energy of new beginnings and growth. Your creativity and benevolent heart tend to enrich your life.',
    luckyMessage: '새로운 시작을 두려워하지 마세요. 청룡이 함께합니다.',
    luckyMessageEn: 'Do not fear new beginnings. The Azure Dragon is with you.',
    luckyColor: '초록, 청록, 파랑',
    luckyColorEn: 'Green, Teal, Blue',
    luckyDirection: '동쪽',
    luckyDirectionEn: 'East',
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
    descriptionEn: 'The Phoenix is a mythical bird representing the energy of Fire (火). Guarding the south, it is a symbol of immortality that tends to give you the strength to rise again from adversity. Your bright energy tends to make your surroundings shine.',
    luckyMessage: '당신 안의 불꽃이 세상을 밝힐 것입니다.',
    luckyMessageEn: 'The spark within you will light up the world.',
    luckyColor: '빨강, 주황, 자주',
    luckyColorEn: 'Red, Orange, Purple',
    luckyDirection: '남쪽',
    luckyDirectionEn: 'South',
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
    descriptionEn: 'The Golden Dragon represents the energy of Earth (土) and guards the center. It acts as a pivot that harmonizes all five elements, tending to bring energy of stability and trust. Your steady efforts tend to bear fruit.',
    luckyMessage: '흔들리지 않는 중심이 당신의 힘입니다.',
    luckyMessageEn: 'Your unwavering center is your strength.',
    luckyColor: '황금, 노랑, 베이지',
    luckyColorEn: 'Gold, Yellow, Beige',
    luckyDirection: '중앙',
    luckyDirectionEn: 'Center',
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
    descriptionEn: 'The White Tiger is a guardian beast representing the energy of Metal (金). Guarding the west, it tends to give you the strength to overcome obstacles with strong will and decisiveness. A life of principle tends to build great trust.',
    luckyMessage: '백호의 용기로 두려움 없이 앞으로 나아가세요.',
    luckyMessageEn: 'Move forward without fear with the courage of the White Tiger.',
    luckyColor: '흰색, 은색, 금색',
    luckyColorEn: 'White, Silver, Gold',
    luckyDirection: '서쪽',
    luckyDirectionEn: 'West',
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
    description: '현무는 수(수)의 기운을 상징하는 신수입니다. 북쪽을 수호하며 깊은 지혜와 학문의 기운을 가져다주는 경향이 있습니다. 조용히 준비하고 축적한 힘이 때가 되면 크게 발휘되는 경향이 있습니다.',
    descriptionEn: 'The Black Tortoise is a guardian beast representing the energy of Water (水). Guarding the north, it tends to bring the energy of deep wisdom and academia. Strength quietly prepared and accumulated tends to manifest greatly when the time is right.',
    luckyMessage: '깊은 물이 고요한 것처럼, 당신의 내면에 큰 힘이 있습니다.',
    luckyMessageEn: 'Like deep water is still, there is great strength within you.',
    luckyColor: '검정, 진남색, 짙은 파랑',
    luckyColorEn: 'Black, Navy, Deep Blue',
    luckyDirection: '북쪽',
    luckyDirectionEn: 'North',
    luckyNumber: [1, 6],
  },
};

export function getGuardianByOhaeng(ohaeng: string): Guardian {
  return guardians[ohaeng] || guardians['to'];
}
