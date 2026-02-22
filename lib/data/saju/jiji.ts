// 지지(地支) 12개
export interface Jiji {
  key: string;
  name: string;
  hanja: string;
  animal: string;
  ohaeng: string;
  eumsang: 'eum' | 'yang';
  season: string;
  month: number;
  hour: string;
  traits: string[];
  strengths: string[];
  growthPoints: string[];
}

export const jijiData: Record<string, Jiji> = {
  ja: {
    key: 'ja', name: '자', hanja: '子', animal: '쥐', ohaeng: '수', eumsang: 'yang',
    season: '겨울', month: 11, hour: '23:00~01:00',
    traits: ['지혜롭고 영리한 경향이 있습니다', '적응력이 뛰어난 경향이 있습니다'],
    strengths: ['빠른 상황 파악에 유리한 기운입니다'],
    growthPoints: ['깊은 신뢰 관계를 쌓는 연습이 도움이 될 수 있습니다'],
  },
  chuk: {
    key: 'chuk', name: '축', hanja: '丑', animal: '소', ohaeng: '토', eumsang: 'eum',
    season: '겨울/봄', month: 12, hour: '01:00~03:00',
    traits: ['성실하고 인내심이 강한 경향이 있습니다', '신뢰할 수 있는 경향이 있습니다'],
    strengths: ['장기 프로젝트에 유리한 기운입니다'],
    growthPoints: ['변화에 적응하는 속도가 느릴 수 있습니다'],
  },
  in: {
    key: 'in', name: '인', hanja: '寅', animal: '호랑이', ohaeng: '목', eumsang: 'yang',
    season: '봄', month: 1, hour: '03:00~05:00',
    traits: ['용감하고 진취적인 경향이 있습니다', '리더십이 있는 경향이 있습니다'],
    strengths: ['새로운 일에 도전하는 데 유리한 기운입니다'],
    growthPoints: ['충동적인 면을 조절하는 연습이 도움이 될 수 있습니다'],
  },
  myo: {
    key: 'myo', name: '묘', hanja: '卯', animal: '토끼', ohaeng: '목', eumsang: 'eum',
    season: '봄', month: 2, hour: '05:00~07:00',
    traits: ['온화하고 섬세한 경향이 있습니다', '예술적 감각이 있는 경향이 있습니다'],
    strengths: ['예술과 미적 분야에 유리한 기운입니다'],
    growthPoints: ['결단력을 키우는 것이 좋습니다'],
  },
  jin: {
    key: 'jin', name: '진', hanja: '辰', animal: '용', ohaeng: '토', eumsang: 'yang',
    season: '봄/여름', month: 3, hour: '07:00~09:00',
    traits: ['카리스마가 있는 경향이 있습니다', '창의적인 경향이 있습니다'],
    strengths: ['큰 목표를 추구하는 데 유리한 기운입니다'],
    growthPoints: ['현실적인 계획 수립에 신경 쓰는 것이 좋습니다'],
  },
  sa: {
    key: 'sa', name: '사', hanja: '巳', animal: '뱀', ohaeng: '화', eumsang: 'eum',
    season: '여름', month: 4, hour: '09:00~11:00',
    traits: ['신중하고 지혜로운 경향이 있습니다', '통찰력이 있는 경향이 있습니다'],
    strengths: ['깊은 분석에 유리한 기운입니다'],
    growthPoints: ['타인과의 소통을 더 적극적으로 하는 것이 좋습니다'],
  },
  o: {
    key: 'o', name: '오', hanja: '午', animal: '말', ohaeng: '화', eumsang: 'yang',
    season: '여름', month: 5, hour: '11:00~13:00',
    traits: ['활기차고 자유로운 경향이 있습니다', '열정적인 경향이 있습니다'],
    strengths: ['사람들과 어울리는 데 유리한 기운입니다'],
    growthPoints: ['지속적인 집중력을 유지하는 연습이 도움이 될 수 있습니다'],
  },
  mi: {
    key: 'mi', name: '미', hanja: '未', animal: '양', ohaeng: '토', eumsang: 'eum',
    season: '여름/가을', month: 6, hour: '13:00~15:00',
    traits: ['온화하고 예술적인 경향이 있습니다', '배려심이 깊은 경향이 있습니다'],
    strengths: ['조화로운 관계를 만드는 데 강한 경향이 있습니다'],
    growthPoints: ['자신의 의견을 더 적극적으로 표현하는 연습이 도움이 될 수 있습니다'],
  },
  sin: {
    key: 'sin', name: '신', hanja: '申', animal: '원숭이', ohaeng: '금', eumsang: 'yang',
    season: '가을', month: 7, hour: '15:00~17:00',
    traits: ['기지가 넘치는 경향이 있습니다', '다재다능한 경향이 있습니다'],
    strengths: ['문제 해결에 유리한 기운입니다'],
    growthPoints: ['깊이 있는 관계를 추구하는 연습이 도움이 될 수 있습니다'],
  },
  yu: {
    key: 'yu', name: '유', hanja: '酉', animal: '닭', ohaeng: '금', eumsang: 'eum',
    season: '가을', month: 8, hour: '17:00~19:00',
    traits: ['꼼꼼하고 완벽주의적인 경향이 있습니다', '자기 관리에 철저한 경향이 있습니다'],
    strengths: ['정밀한 작업에 유리한 기운입니다'],
    growthPoints: ['완벽주의로 인한 스트레스를 관리하는 것이 중요합니다'],
  },
  sul: {
    key: 'sul', name: '술', hanja: '戌', animal: '개', ohaeng: '토', eumsang: 'yang',
    season: '가을/겨울', month: 9, hour: '19:00~21:00',
    traits: ['충성스럽고 의리 있는 경향이 있습니다', '신뢰할 수 있는 경향이 있습니다'],
    strengths: ['깊은 신뢰 관계를 쌓는 데 유리한 기운입니다'],
    growthPoints: ['자신의 필요도 돌아보는 연습이 도움이 될 수 있습니다'],
  },
  hae: {
    key: 'hae', name: '해', hanja: '亥', animal: '돼지', ohaeng: '수', eumsang: 'eum',
    season: '겨울', month: 10, hour: '21:00~23:00',
    traits: ['너그럽고 순수한 경향이 있습니다', '낙관적인 경향이 있습니다'],
    strengths: ['긍정적인 에너지를 주변에 전파하는 경향이 있습니다'],
    growthPoints: ['현실적인 판단력을 기르는 것이 좋습니다'],
  },
};
