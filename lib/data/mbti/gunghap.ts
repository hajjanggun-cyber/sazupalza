// MBTI 16x16 궁합 데이터 (256가지)
// 특정 조합이 절대적으로 좋거나 나쁘다는 단정 표현 없이
// 각 조합의 특성과 조화 가능성을 경향으로 서술

export interface MbtiGunghap {
  typeA: string;
  typeB: string;
  score: number;        // 0~100 (참고용)
  summary: string;      // 궁합 요약
  harmony: string;      // 조화 포인트
  challenge: string;    // 성장 포인트
}

// 궁합 점수 매트릭스 (참고용, 절대적 수치 아님)
const gunghapScores: Record<string, Record<string, number>> = {
  INTJ: { INTJ: 75, INTP: 82, ENTJ: 80, ENTP: 78, INFJ: 85, INFP: 72, ENFJ: 78, ENFP: 70, ISTJ: 72, ISFJ: 65, ESTJ: 68, ESFJ: 60, ISTP: 70, ISFP: 65, ESTP: 62, ESFP: 58 },
  INTP: { INTJ: 82, INTP: 72, ENTJ: 75, ENTP: 85, INFJ: 78, INFP: 75, ENFJ: 70, ENFP: 72, ISTJ: 65, ISFJ: 62, ESTJ: 60, ESFJ: 58, ISTP: 78, ISFP: 68, ESTP: 65, ESFP: 60 },
  ENTJ: { INTJ: 80, INTP: 75, ENTJ: 72, ENTP: 78, INFJ: 75, INFP: 65, ENFJ: 82, ENFP: 72, ISTJ: 75, ISFJ: 68, ESTJ: 80, ESFJ: 70, ISTP: 68, ISFP: 62, ESTP: 75, ESFP: 65 },
  ENTP: { INTJ: 78, INTP: 85, ENTJ: 78, ENTP: 70, INFJ: 80, INFP: 72, ENFJ: 75, ENFP: 78, ISTJ: 62, ISFJ: 60, ESTJ: 65, ESFJ: 62, ISTP: 75, ISFP: 68, ESTP: 72, ESFP: 65 },
  INFJ: { INTJ: 85, INTP: 78, ENTJ: 75, ENTP: 80, INFJ: 72, INFP: 82, ENFJ: 85, ENFP: 80, ISTJ: 68, ISFJ: 72, ESTJ: 65, ESFJ: 70, ISTP: 65, ISFP: 75, ESTP: 60, ESFP: 65 },
  INFP: { INTJ: 72, INTP: 75, ENTJ: 65, ENTP: 72, INFJ: 82, INFP: 70, ENFJ: 80, ENFP: 82, ISTJ: 62, ISFJ: 70, ESTJ: 58, ESFJ: 65, ISTP: 65, ISFP: 78, ESTP: 58, ESFP: 68 },
  ENFJ: { INTJ: 78, INTP: 70, ENTJ: 82, ENTP: 75, INFJ: 85, INFP: 80, ENFJ: 72, ENFP: 82, ISTJ: 70, ISFJ: 78, ESTJ: 72, ESFJ: 80, ISTP: 62, ISFP: 72, ESTP: 68, ESFP: 75 },
  ENFP: { INTJ: 70, INTP: 72, ENTJ: 72, ENTP: 78, INFJ: 80, INFP: 82, ENFJ: 82, ENFP: 70, ISTJ: 62, ISFJ: 68, ESTJ: 62, ESFJ: 72, ISTP: 65, ISFP: 75, ESTP: 70, ESFP: 78 },
  ISTJ: { INTJ: 72, INTP: 65, ENTJ: 75, ENTP: 62, INFJ: 68, INFP: 62, ENFJ: 70, ENFP: 62, ISTJ: 75, ISFJ: 82, ESTJ: 85, ESFJ: 80, ISTP: 78, ISFP: 70, ESTP: 72, ESFP: 68 },
  ISFJ: { INTJ: 65, INTP: 62, ENTJ: 68, ENTP: 60, INFJ: 72, INFP: 70, ENFJ: 78, ENFP: 68, ISTJ: 82, ISFJ: 75, ESTJ: 80, ESFJ: 85, ISTP: 70, ISFP: 78, ESTP: 65, ESFP: 72 },
  ESTJ: { INTJ: 68, INTP: 60, ENTJ: 80, ENTP: 65, INFJ: 65, INFP: 58, ENFJ: 72, ENFP: 62, ISTJ: 85, ISFJ: 80, ESTJ: 72, ESFJ: 82, ISTP: 75, ISFP: 65, ESTP: 80, ESFP: 72 },
  ESFJ: { INTJ: 60, INTP: 58, ENTJ: 70, ENTP: 62, INFJ: 70, INFP: 65, ENFJ: 80, ENFP: 72, ISTJ: 80, ISFJ: 85, ESTJ: 82, ESFJ: 72, ISTP: 65, ISFP: 75, ESTP: 72, ESFP: 80 },
  ISTP: { INTJ: 70, INTP: 78, ENTJ: 68, ENTP: 75, INFJ: 65, INFP: 65, ENFJ: 62, ENFP: 65, ISTJ: 78, ISFJ: 70, ESTJ: 75, ESFJ: 65, ISTP: 72, ISFP: 75, ESTP: 82, ESFP: 72 },
  ISFP: { INTJ: 65, INTP: 68, ENTJ: 62, ENTP: 68, INFJ: 75, INFP: 78, ENFJ: 72, ENFP: 75, ISTJ: 70, ISFJ: 78, ESTJ: 65, ESFJ: 75, ISTP: 75, ISFP: 72, ESTP: 72, ESFP: 80 },
  ESTP: { INTJ: 62, INTP: 65, ENTJ: 75, ENTP: 72, INFJ: 60, INFP: 58, ENFJ: 68, ENFP: 70, ISTJ: 72, ISFJ: 65, ESTJ: 80, ESFJ: 72, ISTP: 82, ISFP: 72, ESTP: 70, ESFP: 82 },
  ESFP: { INTJ: 58, INTP: 60, ENTJ: 65, ENTP: 65, INFJ: 65, INFP: 68, ENFJ: 75, ENFP: 78, ISTJ: 68, ISFJ: 72, ESTJ: 72, ESFJ: 80, ISTP: 72, ISFP: 80, ESTP: 82, ESFP: 70 },
};

export function getMbtiGunghap(typeA: string, typeB: string): MbtiGunghap {
  const score = gunghapScores[typeA]?.[typeB] ?? 70;

  // 유형별 특성 그룹
  const ntTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP'];
  const nfTypes = ['INFJ', 'INFP', 'ENFJ', 'ENFP'];
  const sjTypes = ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'];
  const spTypes = ['ISTP', 'ISFP', 'ESTP', 'ESFP'];

  function getGroup(type: string): string {
    if (ntTypes.includes(type)) return 'NT';
    if (nfTypes.includes(type)) return 'NF';
    if (sjTypes.includes(type)) return 'SJ';
    return 'SP';
  }

  const groupA = getGroup(typeA);
  const groupB = getGroup(typeB);

  // 같은 유형
  if (typeA === typeB) {
    return {
      typeA, typeB, score,
      summary: '같은 유형끼리는 서로를 잘 이해하는 경향이 있습니다',
      harmony: '같은 방식으로 세상을 바라보기 때문에 소통이 편한 경향이 있습니다',
      challenge: '서로의 단점도 공유하는 경향이 있어 상호 보완적인 노력이 도움이 됩니다',
    };
  }

  // 그룹 조합별 설명
  const groupPairKey = [groupA, groupB].sort().join('-');
  const harmonyMap: Record<string, string> = {
    'NT-NT': '논리적 사고와 전략적 관점을 공유하여 지적 대화가 풍부한 경향이 있습니다',
    'NF-NF': '감성적 공감과 이상을 함께 추구하여 깊은 유대감을 형성하는 경향이 있습니다',
    'SJ-SJ': '안정과 질서를 함께 중시하여 든든한 신뢰 관계를 쌓는 경향이 있습니다',
    'SP-SP': '현재를 즐기고 자유로운 생활 방식을 공유하여 활동적인 관계를 이어가는 경향이 있습니다',
    'NF-NT': '직관적 통찰을 공유하며 서로 다른 방식으로 보완하는 경향이 있습니다',
    'NF-SJ': '감성과 안정을 조화롭게 추구하는 과정에서 서로를 성장시키는 경향이 있습니다',
    'NF-SP': '감성적 깊이와 현재를 즐기는 자유로움이 만나 새로운 활력을 얻는 경향이 있습니다',
    'NT-SJ': '논리와 현실적 안정이 만나 탄탄한 기반을 함께 만들어가는 경향이 있습니다',
    'NT-SP': '분석력과 실행력이 만나 효과적으로 문제를 해결하는 경향이 있습니다',
    'SJ-SP': '현실적이고 실용적인 관점을 공유하여 일상에서 잘 호흡하는 경향이 있습니다',
  };

  const challengeMap: Record<string, string> = {
    'NT-NT': '감정적 표현이 부족할 수 있어 서로의 마음을 더 자주 나누면 좋습니다',
    'NF-NF': '현실적인 문제 해결에 함께 집중하는 연습이 도움이 됩니다',
    'SJ-SJ': '변화와 새로운 시도에 함께 열린 마음을 갖는 것이 성장에 도움이 됩니다',
    'SP-SP': '장기적인 계획과 미래에 대해 함께 이야기하는 시간을 갖는 것이 좋습니다',
    'NF-NT': '감정과 논리의 균형을 찾는 과정에서 서로를 이해하는 노력이 필요합니다',
    'NF-SJ': '이상과 현실 사이의 간극을 함께 좁혀나가는 소통이 중요합니다',
    'NF-SP': '감성적 깊이와 자유로움 사이에서 균형을 찾는 노력이 도움이 됩니다',
    'NT-SJ': '유연성과 안정 사이에서 서로의 방식을 존중하는 것이 중요합니다',
    'NT-SP': '장기적 비전과 즉각적 행동을 조화롭게 결합하는 소통이 도움이 됩니다',
    'SJ-SP': '계획과 즉흥성 사이의 균형을 함께 찾아가는 과정이 관계를 성장시킵니다',
  };

  const summaryMap: Record<string, string> = {
    'NT-NT': '지적 탐구를 함께 즐기는 관계의 경향이 있습니다',
    'NF-NF': '감성적으로 깊이 공감하는 관계의 경향이 있습니다',
    'SJ-SJ': '서로 믿고 의지할 수 있는 안정적인 관계의 경향이 있습니다',
    'SP-SP': '함께 현재를 즐기는 활동적인 관계의 경향이 있습니다',
    'NF-NT': '직관을 공유하며 서로를 성장시키는 관계의 경향이 있습니다',
    'NF-SJ': '감성과 안정이 균형을 이루는 관계의 경향이 있습니다',
    'NF-SP': '자유롭고 따뜻한 에너지가 만나는 관계의 경향이 있습니다',
    'NT-SJ': '논리와 현실이 탄탄하게 결합하는 관계의 경향이 있습니다',
    'NT-SP': '분석과 행동이 만나 효율적인 관계의 경향이 있습니다',
    'SJ-SP': '실용적인 가치를 함께 추구하는 관계의 경향이 있습니다',
  };

  return {
    typeA,
    typeB,
    score,
    summary: summaryMap[groupPairKey] || '서로 다른 강점으로 보완할 수 있는 관계의 경향이 있습니다',
    harmony: harmonyMap[groupPairKey] || '서로의 다른 점에서 새로운 관점을 얻는 경향이 있습니다',
    challenge: challengeMap[groupPairKey] || '서로의 차이를 이해하고 존중하는 노력이 관계를 성장시킵니다',
  };
}
