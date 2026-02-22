// 기색(氣色) 데이터 - 5가지 오행 기운
// 전통 관상학에서 얼굴의 기운(色)을 통해 현재 상태를 읽는 이론

export interface FaceColor {
  key: string;
  ohaeng: string;
  name: string;
  meaning: string;
  currentState: string;
  advice: string;
}

export const faceColors: Record<string, FaceColor> = {
  mok: {
    key: 'mok',
    ohaeng: '목',
    name: '청록빛 기색',
    meaning: '목(木) 기운이 활성화된 상태',
    currentState: '성장과 발전의 기운이 활발한 경향이 있습니다. 새로운 시작이나 도전에 유리한 시기의 경향이 있습니다.',
    advice: '창의적인 프로젝트나 학습에 집중하면 좋은 결실을 맺을 가능성이 있습니다. 간 건강에 주의를 기울이는 것이 좋습니다.',
  },
  hwa: {
    key: 'hwa',
    ohaeng: '화',
    name: '붉은빛 기색',
    meaning: '화(火) 기운이 활성화된 상태',
    currentState: '에너지와 열정이 넘치는 경향이 있습니다. 사회적 활동이나 소통에 활발한 시기의 경향이 있습니다.',
    advice: '자신의 에너지를 잘 활용하되, 과열을 주의하는 것이 좋습니다. 심장과 순환계 건강에 관심을 갖는 것이 도움이 됩니다.',
  },
  to: {
    key: 'to',
    ohaeng: '토',
    name: '황금빛 기색',
    meaning: '토(土) 기운이 중심을 잡은 상태',
    currentState: '안정적이고 균형 잡힌 상태의 경향이 있습니다. 현실적인 문제 해결에 유리한 시기의 경향이 있습니다.',
    advice: '꾸준히 노력하는 것이 좋은 결과로 이어질 가능성이 있습니다. 소화기계 건강을 챙기는 것이 좋습니다.',
  },
  geum: {
    key: 'geum',
    ohaeng: '금',
    name: '흰빛 기색',
    meaning: '금(金) 기운이 활성화된 상태',
    currentState: '명확한 판단력과 결단력이 발휘되는 경향이 있습니다. 원칙과 기준이 분명해지는 시기의 경향이 있습니다.',
    advice: '중요한 결정이나 계획을 세우기에 좋은 기운의 경향이 있습니다. 폐와 호흡기 건강에 주의하는 것이 좋습니다.',
  },
  su: {
    key: 'su',
    ohaeng: '수',
    name: '어두운 기색',
    meaning: '수(水) 기운이 활성화된 상태',
    currentState: '내면의 성찰과 지혜가 깊어지는 경향이 있습니다. 조용히 준비하고 축적하는 시기의 경향이 있습니다.',
    advice: '학습과 자기계발에 집중하면 좋은 성과를 거둘 가능성이 있습니다. 충분한 휴식과 수분 섭취가 건강에 도움이 됩니다.',
  },
};

// 기색 판별 (face-api.js의 표현 분석 결과 활용)
export function detectFaceColor(expression: string): FaceColor {
  const expressionMap: Record<string, string> = {
    happy: 'hwa',
    neutral: 'to',
    surprised: 'mok',
    fearful: 'su',
    angry: 'geum',
    disgusted: 'geum',
    sad: 'su',
  };
  const colorKey = expressionMap[expression] || 'to';
  return faceColors[colorKey];
}
