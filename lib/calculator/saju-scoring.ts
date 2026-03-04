import { analyzeOhaengBalance, type SajuResult } from './saju-calculator';

export type MbtiConfidence = 'high' | 'medium' | 'low';

type Element = '목' | '화' | '토' | '금' | '수';

export type TenGodKey =
  | '비견'
  | '겁재'
  | '식신'
  | '상관'
  | '편재'
  | '정재'
  | '편관'
  | '정관'
  | '편인'
  | '정인';

type TenGodProfile = {
  counts: Record<TenGodKey, number>;
  dominant: TenGodKey;
};

export function describeTenGodNarrative(
  dominant: TenGodKey | string,
  locale: string,
): string {
  const koMap: Record<string, string> = {
    '\ube44\uacac':
      '\ube44\uacac\uc774 \uac15\ud558\uba74 \uc790\uae30 \uc8fc\ub3c4\uc131\uacfc \ubc84\ud2f0\ub294 \ud798\uc740 \uc88b\uc9c0\ub9cc, \uace0\uc9d1\uc774 \uac15\ud574\uc9c8 \uc218 \uc788\uc2b5\ub2c8\ub2e4.',
    '\uac81\uc7ac':
      '\uac81\uc7ac\uac00 \ub4dc\ub7ec\ub098\uba74 \uacbd\uc7c1 \uc758\uc2dd\uacfc \ubaa8\ud5d8\uc131\uc774 \ucee4\uc9c0\ubbc0\ub85c, \uc18d\ub3c4 \uc870\uc808\uc774 \uc911\uc694\ud569\ub2c8\ub2e4.',
    '\uc2dd\uc2e0':
      '\uc2dd\uc2e0\uc774 \uac15\ud558\uba74 \uc0dd\uc0b0\uc131\uacfc \uc131\uc2e4\ud55c \uc2e4\ud589\ub825\uc774 \ub450\ub4dc\ub7ec\uc9d1\ub2c8\ub2e4.',
    '\uc0c1\uad00':
      '\uc0c1\uad00\uc774 \uc911\uc2ec\uc774\uba74 \ud45c\ud604\ub825\uacfc \ubc18\uc804 \uc5d0\ub108\uc9c0\uac00 \ud070 \ub300\uc2e0, \ucda9\ub3cc\uc131\uc744 \uad00\ub9ac\ud574\uc57c \ud569\ub2c8\ub2e4.',
    '\ud3b8\uc7ac':
      '\ud3b8\uc7ac\uac00 \ub3c4\ub4dc\ub77c\uc9c0\uba74 \uae30\ud68c \ud3ec\ucc29\uacfc \uc790\uae08 \ud68c\uc804\uc5d0 \uac15\ud55c \ud750\ub984\uc744 \ubcf4\uc785\ub2c8\ub2e4.',
    '\uc815\uc7ac':
      '\uc815\uc7ac\uac00 \uac15\ud558\uba74 \uc548\uc815\uc801\uc73c\ub85c \uc313\uc544 \uac00\ub294 \uc218\uc785 \uad6c\uc870\uc5d0 \uac15\uc810\uc774 \uc788\uc2b5\ub2c8\ub2e4.',
    '\ud3b8\uad00':
      '\ud3b8\uad00\uc774 \uac15\ud558\uba74 \uc555\ubc15 \uc18d\uc5d0\uc11c\ub3c4 \ub6ab\uace0 \ub098\uac00\ub294 \ucd94\uc9c4\ub825\uc774 \uc0b4\uc544\ub0a9\ub2c8\ub2e4.',
    '\uc815\uad00':
      '\uc815\uad00\uc774 \uc911\uc2ec\uc774\uba74 \uc9c8\uc11c, \ucc45\uc784, \uc2e0\ub8b0\ub97c \ubc14\ud0d5\uc73c\ub85c \ud55c \uc131\uc7a5\uc774 \uac15\ud574\uc9d1\ub2c8\ub2e4.',
    '\ud3b8\uc778':
      '\ud3b8\uc778\uc774 \uac15\ud558\uba74 \uc9c1\uad00\uacfc \ubc30\uc6c0\uc758 \ud761\uc218\ub825\uc740 \uc88b\uc9c0\ub9cc, \uace0\ub9bd \uacbd\ud5a5\uc740 \uacbd\uacc4\ud574\uc57c \ud569\ub2c8\ub2e4.',
    '\uc815\uc778':
      '\uc815\uc778\uc774 \ub4dc\ub7ec\ub098\uba74 \ubc30\uc6c0, \ubcf5\uae30, \uc815\ub9ac \ub2a5\ub825\uc744 \uae30\ubc18\uc73c\ub85c \uc548\uc815\uac10\uc744 \ub9cc\ub4ed\ub2c8\ub2e4.',
  };

  const enMap: Record<string, string> = {
    '\ube44\uacac':
      'A strong peer star increases self-direction and resilience, but stubbornness needs management.',
    '\uac81\uc7ac':
      'A strong competitive star raises risk-taking and rivalry, so pacing and control matter.',
    '\uc2dd\uc2e0':
      'A strong output star favors steady productivity, craft, and follow-through.',
    '\uc0c1\uad00':
      'A dominant expressive star sharpens creativity and breakthrough energy, but can create friction if unchecked.',
    '\ud3b8\uc7ac':
      'A dynamic wealth star supports fast opportunity capture and flexible money movement.',
    '\uc815\uc7ac':
      'A stable wealth star favors consistent income building and disciplined asset growth.',
    '\ud3b8\uad00':
      'A pressure star tends to perform well under challenge, turning stress into momentum.',
    '\uc815\uad00':
      'A strong order star reinforces structure, responsibility, and trust-based growth.',
    '\ud3b8\uc778':
      'A strong insight star boosts instinctive learning and pattern recognition, but can isolate the pace.',
    '\uc815\uc778':
      'A resource star supports recovery, study, and composure through methodical learning.',
  };

  return locale === 'ko'
    ? koMap[dominant] || `${dominant} \ud750\ub984\uc774 \ub450\ub4dc\ub7ec\uc9d1\ub2c8\ub2e4.`
    : enMap[dominant] || `${dominant} is the leading structural star.`;
}

const HIDDEN_STEMS: Record<string, Array<{ stem: string; weight: number }>> = {
  '\uc790': [{ stem: '\uacc4', weight: 1 }],
  '\ucd95': [
    { stem: '\uae30', weight: 0.6 },
    { stem: '\uacc4', weight: 0.25 },
    { stem: '\uc2e0', weight: 0.15 },
  ],
  '\uc778': [
    { stem: '\uac11', weight: 0.6 },
    { stem: '\ubcd1', weight: 0.25 },
    { stem: '\ubb34', weight: 0.15 },
  ],
  '\ubb18': [{ stem: '\uc744', weight: 1 }],
  '\uc9c4': [
    { stem: '\ubb34', weight: 0.6 },
    { stem: '\uc744', weight: 0.25 },
    { stem: '\uacc4', weight: 0.15 },
  ],
  '\uc0ac': [
    { stem: '\ubcd1', weight: 0.6 },
    { stem: '\ubb34', weight: 0.25 },
    { stem: '\uacbd', weight: 0.15 },
  ],
  '\uc624': [
    { stem: '\uc815', weight: 0.7 },
    { stem: '\uae30', weight: 0.3 },
  ],
  '\ubbf8': [
    { stem: '\uae30', weight: 0.6 },
    { stem: '\uc815', weight: 0.25 },
    { stem: '\uc744', weight: 0.15 },
  ],
  '\uc2e0': [
    { stem: '\uacbd', weight: 0.6 },
    { stem: '\uc784', weight: 0.25 },
    { stem: '\ubb34', weight: 0.15 },
  ],
  '\uc720': [{ stem: '\uc2e0', weight: 1 }],
  '\uc220': [
    { stem: '\ubb34', weight: 0.6 },
    { stem: '\uc2e0', weight: 0.25 },
    { stem: '\uc815', weight: 0.15 },
  ],
  '\ud574': [
    { stem: '\uc784', weight: 0.7 },
    { stem: '\uac11', weight: 0.3 },
  ],
};

const STEM_ELEMENTS: Record<string, Element> = {
  '\uac11': '\ubaa9',
  '\uc744': '\ubaa9',
  '\ubcd1': '\ud654',
  '\uc815': '\ud654',
  '\ubb34': '\ud1a0',
  '\uae30': '\ud1a0',
  '\uacbd': '\uae08',
  '\uc2e0': '\uae08',
  '\uc784': '\uc218',
  '\uacc4': '\uc218',
};

const STEM_POLARITY: Record<string, 'yang' | 'yin'> = {
  '\uac11': 'yang',
  '\uc744': 'yin',
  '\ubcd1': 'yang',
  '\uc815': 'yin',
  '\ubb34': 'yang',
  '\uae30': 'yin',
  '\uacbd': 'yang',
  '\uc2e0': 'yin',
  '\uc784': 'yang',
  '\uacc4': 'yin',
};

const BRANCH_ELEMENTS: Record<string, Element> = {
  '\uc790': '\uc218',
  '\ucd95': '\ud1a0',
  '\uc778': '\ubaa9',
  '\ubb18': '\ubaa9',
  '\uc9c4': '\ud1a0',
  '\uc0ac': '\ud654',
  '\uc624': '\ud654',
  '\ubbf8': '\ud1a0',
  '\uc2e0': '\uae08',
  '\uc720': '\uae08',
  '\uc220': '\ud1a0',
  '\ud574': '\uc218',
};

const GENERATES: Record<Element, Element> = {
  '\ubaa9': '\ud654',
  '\ud654': '\ud1a0',
  '\ud1a0': '\uae08',
  '\uae08': '\uc218',
  '\uc218': '\ubaa9',
};

const CONTROLS: Record<Element, Element> = {
  '\ubaa9': '\ud1a0',
  '\ud654': '\uae08',
  '\ud1a0': '\uc218',
  '\uae08': '\ubaa9',
  '\uc218': '\ud654',
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function elementThatGenerates(target: Element): Element {
  return (Object.entries(GENERATES).find(([, produced]) => produced === target)?.[0] as Element) || '\ud1a0';
}

function elementControlledBy(target: Element): Element {
  return (Object.entries(CONTROLS).find(([, controlled]) => controlled === target)?.[0] as Element) || '\ud1a0';
}

function pickLowerCountElement(
  balance: Record<string, number>,
  candidates: Element[],
): Element {
  return candidates
    .slice()
    .sort((left, right) => (balance[left] ?? 0) - (balance[right] ?? 0))[0];
}

function getMonthBranchElement(saju: SajuResult): Element {
  return BRANCH_ELEMENTS[saju.month.jiji] || '\ud1a0';
}

function getDayStemElement(saju: SajuResult): Element {
  return STEM_ELEMENTS[saju.ilgan] || '\ud1a0';
}

function getRelation(dayElement: Element, targetElement: Element) {
  if (dayElement === targetElement) {
    return 'same';
  }

  if (elementThatGenerates(dayElement) === targetElement) {
    return 'resource';
  }

  if (GENERATES[dayElement] === targetElement) {
    return 'output';
  }

  if (CONTROLS[dayElement] === targetElement) {
    return 'wealth';
  }

  if (elementControlledBy(dayElement) === targetElement) {
    return 'authority';
  }

  return 'same';
}

function getTenGodKey(dayStem: string, otherStem: string): TenGodKey {
  const dayElement = STEM_ELEMENTS[dayStem] || '\ud1a0';
  const otherElement = STEM_ELEMENTS[otherStem] || '\ud1a0';
  const samePolarity = STEM_POLARITY[dayStem] === STEM_POLARITY[otherStem];
  const relation = getRelation(dayElement, otherElement);

  if (relation === 'same') {
    return samePolarity ? '\ube44\uacac' : '\uac81\uc7ac';
  }

  if (relation === 'resource') {
    return samePolarity ? '\ud3b8\uc778' : '\uc815\uc778';
  }

  if (relation === 'output') {
    return samePolarity ? '\uc2dd\uc2e0' : '\uc0c1\uad00';
  }

  if (relation === 'wealth') {
    return samePolarity ? '\ud3b8\uc7ac' : '\uc815\uc7ac';
  }

  return samePolarity ? '\ud3b8\uad00' : '\uc815\uad00';
}

function addWeightedTenGod(
  counts: Record<TenGodKey, number>,
  dayStem: string,
  otherStem: string,
  weight: number,
) {
  counts[getTenGodKey(dayStem, otherStem)] += weight;
}

export function analyzeTenGodProfile(saju: SajuResult): TenGodProfile {
  const counts: Record<TenGodKey, number> = {
    '\ube44\uacac': 0,
    '\uac81\uc7ac': 0,
    '\uc2dd\uc2e0': 0,
    '\uc0c1\uad00': 0,
    '\ud3b8\uc7ac': 0,
    '\uc815\uc7ac': 0,
    '\ud3b8\uad00': 0,
    '\uc815\uad00': 0,
    '\ud3b8\uc778': 0,
    '\uc815\uc778': 0,
  };

  const visibleStems = [saju.year.cheongan, saju.month.cheongan];
  if (saju.hour) {
    visibleStems.push(saju.hour.cheongan);
  }

  for (const stem of visibleStems) {
    addWeightedTenGod(counts, saju.ilgan, stem, 1);
  }

  const branches = [saju.year.jiji, saju.month.jiji, saju.day.jiji];
  if (saju.hour) {
    branches.push(saju.hour.jiji);
  }

  for (const branch of branches) {
    const hiddenStems = HIDDEN_STEMS[branch] || [];
    for (const hidden of hiddenStems) {
      addWeightedTenGod(counts, saju.ilgan, hidden.stem, hidden.weight);
    }
  }

  const dominant =
    (Object.entries(counts).sort((left, right) => right[1] - left[1])[0]?.[0] as TenGodKey) ||
    '\ube44\uacac';

  return { counts, dominant };
}

export function estimateDayMasterStrength(saju: SajuResult): number {
  const balance = analyzeOhaengBalance(saju);
  const dayElement = getDayStemElement(saju);
  const resourceElement = elementThatGenerates(dayElement);
  const outputElement = GENERATES[dayElement];
  const authorityElement = elementControlledBy(dayElement);
  const wealthElement = CONTROLS[dayElement];
  const monthElement = getMonthBranchElement(saju);

  const sameSupport = balance[dayElement] ?? 0;
  const resourceSupport = balance[resourceElement] ?? 0;
  const outputDrain = balance[outputElement] ?? 0;
  const authorityDrain = balance[authorityElement] ?? 0;
  const wealthDrain = balance[wealthElement] ?? 0;

  let score = 50;
  score += sameSupport * 8;
  score += resourceSupport * 7;
  score -= outputDrain * 4;
  score -= authorityDrain * 5;
  score -= wealthDrain * 3;

  const monthRelation = getRelation(dayElement, monthElement);
  if (monthRelation === 'same') score += 10;
  if (monthRelation === 'resource') score += 8;
  if (monthRelation === 'output') score -= 6;
  if (monthRelation === 'wealth') score -= 5;
  if (monthRelation === 'authority') score -= 7;

  return clamp(Math.round(score), 12, 92);
}

export function determineSajuScoringFocus(saju: SajuResult): {
  strength: number;
  usefulElement: Element;
  pressureElement: Element;
} {
  const balance = analyzeOhaengBalance(saju);
  const dayElement = getDayStemElement(saju);
  const resourceElement = elementThatGenerates(dayElement);
  const outputElement = GENERATES[dayElement];
  const wealthElement = CONTROLS[dayElement];
  const authorityElement = elementControlledBy(dayElement);
  const strength = estimateDayMasterStrength(saju);

  if (strength >= 64) {
    return {
      strength,
      usefulElement: pickLowerCountElement(balance, [outputElement, wealthElement]),
      pressureElement: pickLowerCountElement(balance, [authorityElement, resourceElement]),
    };
  }

  if (strength <= 42) {
    return {
      strength,
      usefulElement: pickLowerCountElement(balance, [dayElement, resourceElement]),
      pressureElement: pickLowerCountElement(balance, [outputElement, authorityElement]),
    };
  }

  return {
    strength,
    usefulElement: pickLowerCountElement(balance, [wealthElement, outputElement, resourceElement]),
    pressureElement: pickLowerCountElement(balance, [authorityElement, dayElement]),
  };
}

export function calculateAdvancedSajuScore(saju: SajuResult): number {
  const balance = analyzeOhaengBalance(saju);
  const values = Object.values(balance);
  const nonZero = values.filter((value) => value > 0);
  const spread = nonZero.length > 0 ? Math.max(...nonZero) - Math.min(...nonZero) : 0;
  const balanceScore = clamp(
    82 - spread * 4 - Math.max(0, 5 - nonZero.length) * 3,
    50,
    88,
  );

  const focus = determineSajuScoringFocus(saju);
  const usefulCount = balance[focus.usefulElement] ?? 0;
  const usefulScore = clamp(60 + usefulCount * 8, 58, 92);
  const strengthScore = clamp(100 - Math.abs(focus.strength - 56) * 1.4, 50, 95);

  const tenGod = analyzeTenGodProfile(saju);
  const distinctTenGods = Object.values(tenGod.counts).filter((count) => count > 0).length;
  const structuralStars =
    tenGod.counts['\uc815\uad00'] +
    tenGod.counts['\ud3b8\uad00'] +
    tenGod.counts['\uc815\uc7ac'] +
    tenGod.counts['\ud3b8\uc7ac'] +
    tenGod.counts['\uc2dd\uc2e0'] +
    tenGod.counts['\uc815\uc778'];
  const tenGodScore = clamp(54 + distinctTenGods * 6 + structuralStars * 3, 54, 92);

  const finalScore =
    balanceScore * 0.18 +
    strengthScore * 0.42 +
    usefulScore * 0.2 +
    tenGodScore * 0.2;

  return clamp(Math.round(finalScore), 52, 96);
}

export function calculateMbtiScore(options: {
  mbtiType?: string;
  clarity?: number;
  confidence?: MbtiConfidence | null;
}): number {
  const { mbtiType, clarity, confidence } = options;
  if (!mbtiType) {
    return 0;
  }

  if (typeof clarity === 'number' && Number.isFinite(clarity)) {
    return clamp(Math.round(58 + clarity * 0.36), 58, 94);
  }

  if (confidence) {
    const byConfidence: Record<MbtiConfidence, number> = {
      high: 90,
      medium: 78,
      low: 64,
    };
    return byConfidence[confidence];
  }

  const letters = mbtiType.toUpperCase().split('');
  const letterWeight: Record<string, number> = {
    E: 3,
    I: 2,
    N: 4,
    S: 2,
    T: 3,
    F: 2,
    J: 3,
    P: 2,
  };
  const baseline = letters.reduce((sum, letter) => sum + (letterWeight[letter] ?? 2), 68);
  return clamp(baseline, 68, 84);
}
