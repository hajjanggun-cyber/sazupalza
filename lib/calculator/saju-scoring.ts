import { analyzeOhaengBalance, type SajuResult } from './saju-calculator';

export type MbtiConfidence = 'high' | 'medium' | 'low';

type Element = '목' | '화' | '토' | '금' | '수';

type TenGodKey =
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

  const stems = [saju.year.cheongan, saju.month.cheongan];
  if (saju.hour) {
    stems.push(saju.hour.cheongan);
  }

  for (const stem of stems) {
    counts[getTenGodKey(saju.ilgan, stem)] += 1;
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
