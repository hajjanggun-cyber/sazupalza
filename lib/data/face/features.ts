// 관상 부위별 해석 데이터
// 외모 비하 절대 금지, 모든 표현은 중립적이고 긍정적으로

export interface FaceFeature {
  part: string;       // 부위명
  descriptions: {
    type: string;     // 유형 설명
    ohaeng: string;   // 오행
    traits: string[]; // 성격 경향
    summary: string;  // 요약
  }[];
}

export const faceFeatures: Record<string, FaceFeature> = {
  forehead: {
    part: '이마',
    descriptions: [
      {
        type: '넓은 이마',
        ohaeng: '화',
        traits: ['총명함', '리더십', '선견지명', '사회성'],
        summary: '지적 능력과 리더십의 기운이 있는 경향이 있습니다',
      },
      {
        type: '표준 이마',
        ohaeng: '토',
        traits: ['균형감', '실용성', '안정성', '현실감'],
        summary: '균형 잡힌 사고와 현실적인 판단력이 있는 경향이 있습니다',
      },
    ],
  },
  eyes: {
    part: '눈',
    descriptions: [
      {
        type: '크고 또렷한 눈',
        ohaeng: '화',
        traits: ['표현력', '감수성', '직관력', '열정'],
        summary: '풍부한 감성과 표현력의 기운이 있는 경향이 있습니다',
      },
      {
        type: '가는 눈',
        ohaeng: '금',
        traits: ['분석력', '집중력', '신중함', '통찰력'],
        summary: '날카로운 분석력과 집중력의 기운이 있는 경향이 있습니다',
      },
    ],
  },
  nose: {
    part: '코',
    descriptions: [
      {
        type: '높은 콧대',
        ohaeng: '금',
        traits: ['자존감', '독립성', '추진력', '목표의식'],
        summary: '강한 의지와 자존감의 기운이 있는 경향이 있습니다',
      },
      {
        type: '부드러운 코',
        ohaeng: '토',
        traits: ['친화력', '포용력', '사교성', '배려심'],
        summary: '따뜻한 친화력과 포용의 기운이 있는 경향이 있습니다',
      },
    ],
  },
  mouth: {
    part: '입',
    descriptions: [
      {
        type: '도톰한 입술',
        ohaeng: '수',
        traits: ['감수성', '표현력', '언변', '친근함'],
        summary: '풍부한 표현력과 언변의 기운이 있는 경향이 있습니다',
      },
      {
        type: '단정한 입',
        ohaeng: '금',
        traits: ['절제', '신중함', '원칙', '의리'],
        summary: '절제와 신중한 판단력의 기운이 있는 경향이 있습니다',
      },
    ],
  },
  ears: {
    part: '귀',
    descriptions: [
      {
        type: '귓바퀴가 발달한 귀',
        ohaeng: '수',
        traits: ['지혜', '청취력', '사려깊음', '학습능력'],
        summary: '지혜와 학습 능력의 기운이 있는 경향이 있습니다',
      },
      {
        type: '표준형 귀',
        ohaeng: '토',
        traits: ['균형감', '안정성', '성실함', '현실적'],
        summary: '균형 잡힌 현실적인 기운이 있는 경향이 있습니다',
      },
    ],
  },
  eyebrows: {
    part: '눈썹',
    descriptions: [
      {
        type: '진하고 뚜렷한 눈썹',
        ohaeng: '목',
        traits: ['활력', '결단력', '패기', '리더십'],
        summary: '강한 활력과 결단력의 기운이 있는 경향이 있습니다',
      },
      {
        type: '부드러운 눈썹',
        ohaeng: '화',
        traits: ['온화함', '감수성', '공감능력', '섬세함'],
        summary: '온화하고 섬세한 감성의 기운이 있는 경향이 있습니다',
      },
    ],
  },
};

// 부위별 점수 계산 (face-api.js 결과 활용)
export function calcFaceFeatureScore(detectedFeatures: string[]): number {
  if (!detectedFeatures || detectedFeatures.length === 0) return 75;
  // 감지된 특성 수에 따라 기본 점수 반환 (75~90 범위)
  const baseScore = 75 + Math.min(15, detectedFeatures.length * 3);
  return Math.min(90, baseScore);
}
