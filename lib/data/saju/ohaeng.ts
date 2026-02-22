// 오행(五行) 데이터
export interface Ohaeng {
  key: string;
  name: string;
  hanja: string;
  direction: string;
  season: string;
  color: string;
  organ: string;
  emotion: string;
  traits: string[];
  strengths: string[];
  growthPoints: string[];
  career: string[];
  luckyColor: string;
  luckyNumber: number[];
}

export const ohaengData: Record<string, Ohaeng> = {
  mok: {
    key: 'mok', name: '목', hanja: '木', direction: '동쪽', season: '봄',
    color: '파란색/초록색', organ: '간/담', emotion: '인(仁) - 어짊',
    traits: ['성장을 추구하는 경향이 있습니다', '창의적인 경향이 있습니다', '진취적인 경향이 있습니다'],
    strengths: ['새로운 시작과 창조에 유리한 기운입니다', '리더십 발휘에 유리한 기운입니다'],
    growthPoints: ['유연성을 기르면 더 좋은 결과를 얻을 수 있습니다'],
    career: ['교육', '출판', '환경', '스타트업'],
    luckyColor: '초록색', luckyNumber: [3, 8],
  },
  hwa: {
    key: 'hwa', name: '화', hanja: '火', direction: '남쪽', season: '여름',
    color: '빨간색', organ: '심장/소장', emotion: '예(禮) - 예의',
    traits: ['열정적인 경향이 있습니다', '표현력이 풍부한 경향이 있습니다'],
    strengths: ['표현과 소통에 유리한 기운입니다', '열정적인 추진력에 유리한 기운입니다'],
    growthPoints: ['충동성을 조절하는 연습이 도움이 될 수 있습니다'],
    career: ['연예', '마케팅', '식음료', '패션'],
    luckyColor: '빨간색', luckyNumber: [2, 7],
  },
  to: {
    key: 'to', name: '토', hanja: '土', direction: '중앙', season: '환절기',
    color: '노란색/갈색', organ: '비장/위', emotion: '신(信) - 믿음',
    traits: ['안정적인 경향이 있습니다', '신뢰감을 주는 경향이 있습니다'],
    strengths: ['조직 관리에 유리한 기운입니다'],
    growthPoints: ['변화를 더 적극적으로 수용하는 연습이 도움이 될 수 있습니다'],
    career: ['부동산', '금융', '행정', '건설'],
    luckyColor: '노란색', luckyNumber: [5, 10],
  },
  geum: {
    key: 'geum', name: '금', hanja: '金', direction: '서쪽', season: '가을',
    color: '흰색/금색', organ: '폐/대장', emotion: '의(義) - 의리',
    traits: ['결단력이 있는 경향이 있습니다', '원칙을 중시하는 경향이 있습니다'],
    strengths: ['분석과 판단에 유리한 기운입니다'],
    growthPoints: ['융통성을 기르는 연습이 도움이 될 수 있습니다'],
    career: ['법조', '의료', '금융', '군경'],
    luckyColor: '흰색', luckyNumber: [4, 9],
  },
  su: {
    key: 'su', name: '수', hanja: '水', direction: '북쪽', season: '겨울',
    color: '검은색/파란색', organ: '신장/방광', emotion: '지(智) - 지혜',
    traits: ['지혜롭고 사려 깊은 경향이 있습니다', '직관력이 뛰어난 경향이 있습니다'],
    strengths: ['학문과 연구에 유리한 기운입니다'],
    growthPoints: ['결단력을 기르는 연습이 도움이 될 수 있습니다'],
    career: ['학문', 'IT', '철학', '전략기획'],
    luckyColor: '검은색/파란색', luckyNumber: [1, 6],
  },
};

// 오행 상생(相生) 관계
export const ohaengSangsaeng: Record<string, string> = {
  mok: 'hwa', hwa: 'to', to: 'geum', geum: 'su', su: 'mok',
};

// 오행 상극(相剋) 관계
export const ohaengSanggeuk: Record<string, string> = {
  mok: 'to', to: 'su', su: 'hwa', hwa: 'geum', geum: 'mok',
};
