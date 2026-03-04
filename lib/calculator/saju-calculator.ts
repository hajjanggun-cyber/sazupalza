import KoreanLunarCalendar from 'korean-lunar-calendar';

export interface SajuResult {
  year: { cheongan: string; jiji: string };
  month: { cheongan: string; jiji: string };
  day: { cheongan: string; jiji: string };
  hour?: { cheongan: string; jiji: string };
  ilgan: string;
  ohaeng: { year: string; month: string; day: string; hour?: string };
}

const cheonganOrder = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const jijiOrder = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

const cheonganOhaeng: Record<string, string> = {
  갑: '목',
  을: '목',
  병: '화',
  정: '화',
  무: '토',
  기: '토',
  경: '금',
  신: '금',
  임: '수',
  계: '수',
};

const jijiOhaeng: Record<string, string> = {
  자: '수',
  축: '토',
  인: '목',
  묘: '목',
  진: '토',
  사: '화',
  오: '화',
  미: '토',
  신: '금',
  유: '금',
  술: '토',
  해: '수',
};

const hourToJiji: Record<number, string> = {
  23: '자',
  0: '자',
  1: '축',
  2: '축',
  3: '인',
  4: '인',
  5: '묘',
  6: '묘',
  7: '진',
  8: '진',
  9: '사',
  10: '사',
  11: '오',
  12: '오',
  13: '미',
  14: '미',
  15: '신',
  16: '신',
  17: '유',
  18: '유',
  19: '술',
  20: '술',
  21: '해',
  22: '해',
};

type NormalizedBirthDate = {
  year: number;
  month: number;
  day: number;
  hour?: number;
};

function isOnOrAfter(month: number, day: number, targetMonth: number, targetDay: number): boolean {
  return month > targetMonth || (month === targetMonth && day >= targetDay);
}

function getSolarTermMonthIndex(month: number, day: number): number {
  if (month === 1 && day < 6) return 11;
  if (!isOnOrAfter(month, day, 2, 4)) return 12;
  if (!isOnOrAfter(month, day, 3, 6)) return 1;
  if (!isOnOrAfter(month, day, 4, 5)) return 2;
  if (!isOnOrAfter(month, day, 5, 6)) return 3;
  if (!isOnOrAfter(month, day, 6, 6)) return 4;
  if (!isOnOrAfter(month, day, 7, 7)) return 5;
  if (!isOnOrAfter(month, day, 8, 8)) return 6;
  if (!isOnOrAfter(month, day, 9, 8)) return 7;
  if (!isOnOrAfter(month, day, 10, 8)) return 8;
  if (!isOnOrAfter(month, day, 11, 7)) return 9;
  if (!isOnOrAfter(month, day, 12, 7)) return 10;
  return 11;
}

function getYearPillarBaseYear(year: number, month: number, day: number): number {
  return isOnOrAfter(month, day, 2, 4) ? year : year - 1;
}

function normalizeBirthDate(input: SajuInput): NormalizedBirthDate {
  const calendar = new KoreanLunarCalendar();

  if (input.isLunar) {
    const isValid = calendar.setLunarDate(
      input.year,
      input.month,
      input.day,
      Boolean(input.isLeapMonth),
    );

    if (!isValid) {
      throw new Error('Invalid lunar birth date');
    }

    const solar = calendar.getSolarCalendar();
    return {
      year: solar.year,
      month: solar.month,
      day: solar.day,
      hour: input.hour,
    };
  }

  const isValid = calendar.setSolarDate(input.year, input.month, input.day);
  if (!isValid) {
    throw new Error('Invalid solar birth date');
  }

  return {
    year: input.year,
    month: input.month,
    day: input.day,
    hour: input.hour,
  };
}

function calcYearPillar(baseYear: number): { cheongan: string; jiji: string } {
  const cheonganIndex = (baseYear - 4) % 10;
  const jijiIndex = (baseYear - 4) % 12;

  return {
    cheongan: cheonganOrder[(cheonganIndex + 10) % 10],
    jiji: jijiOrder[(jijiIndex + 12) % 12],
  };
}

function calcMonthPillar(baseYear: number, solarMonthIndex: number): { cheongan: string; jiji: string } {
  const monthBranchIndex = (solarMonthIndex + 1) % 12;
  const yearCheonganIndex = (baseYear - 4) % 10;
  const startIndexMap = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
  const startIndex = startIndexMap[(yearCheonganIndex + 10) % 10];
  const cheonganIndex = (startIndex + (solarMonthIndex - 1)) % 10;

  return {
    cheongan: cheonganOrder[(cheonganIndex + 10) % 10],
    jiji: jijiOrder[(monthBranchIndex + 12) % 12],
  };
}

function calcDayPillar(year: number, month: number, day: number): { cheongan: string; jiji: string } {
  const a = Math.floor((14 - month) / 12);
  const y = year - a;
  const m = month + 12 * a - 2;
  const jd =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;

  const cheonganIndex = (jd + 9) % 10;
  const jijiIndex = (jd + 1) % 12;

  return {
    cheongan: cheonganOrder[(cheonganIndex + 10) % 10],
    jiji: jijiOrder[(jijiIndex + 12) % 12],
  };
}

function calcHourPillar(dayCheongan: string, hour: number): { cheongan: string; jiji: string } {
  const jiji = hourToJiji[hour] || '자';
  const jijiIndex = jijiOrder.indexOf(jiji);
  const dayCheonganIndex = cheonganOrder.indexOf(dayCheongan);
  const startIndexMap = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
  const startIndex = startIndexMap[dayCheonganIndex] || 0;
  const cheonganIndex = (startIndex + jijiIndex) % 10;

  return {
    cheongan: cheonganOrder[cheonganIndex],
    jiji,
  };
}

export interface SajuInput {
  year: number;
  month: number;
  day: number;
  hour?: number;
  isLunar?: boolean;
  isLeapMonth?: boolean;
}

export function calculateSaju(input: SajuInput): SajuResult {
  const normalized = normalizeBirthDate(input);
  const yearBase = getYearPillarBaseYear(normalized.year, normalized.month, normalized.day);
  const solarMonthIndex = getSolarTermMonthIndex(normalized.month, normalized.day);

  const yearPillar = calcYearPillar(yearBase);
  const monthPillar = calcMonthPillar(yearBase, solarMonthIndex);
  const dayPillar = calcDayPillar(normalized.year, normalized.month, normalized.day);

  const result: SajuResult = {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    ilgan: dayPillar.cheongan,
    ohaeng: {
      year: cheonganOhaeng[yearPillar.cheongan],
      month: cheonganOhaeng[monthPillar.cheongan],
      day: cheonganOhaeng[dayPillar.cheongan],
    },
  };

  if (normalized.hour !== undefined) {
    const hourPillar = calcHourPillar(dayPillar.cheongan, normalized.hour);
    result.hour = hourPillar;
    result.ohaeng.hour = cheonganOhaeng[hourPillar.cheongan];
  }

  return result;
}

export function cheonganToHanja(name: string): string {
  const map: Record<string, string> = {
    갑: '甲',
    을: '乙',
    병: '丙',
    정: '丁',
    무: '戊',
    기: '己',
    경: '庚',
    신: '辛',
    임: '壬',
    계: '癸',
  };

  return map[name] || name;
}

export function jijiToHanja(name: string): string {
  const map: Record<string, string> = {
    자: '子',
    축: '丑',
    인: '寅',
    묘: '卯',
    진: '辰',
    사: '巳',
    오: '午',
    미: '未',
    신: '申',
    유: '酉',
    술: '戌',
    해: '亥',
  };

  return map[name] || name;
}

export function getIljuName(cheongan: string, jiji: string): string {
  return `${cheongan}${jiji}`;
}

export function analyzeOhaengBalance(result: SajuResult): Record<string, number> {
  const balance: Record<string, number> = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
  const pillars = [result.year, result.month, result.day];

  if (result.hour) {
    pillars.push(result.hour);
  }

  pillars.forEach((pillar) => {
    const cheongan = cheonganOhaeng[pillar.cheongan];
    const jiji = jijiOhaeng[pillar.jiji];

    if (cheongan) {
      balance[cheongan] = (balance[cheongan] || 0) + 1;
    }

    if (jiji) {
      balance[jiji] = (balance[jiji] || 0) + 1;
    }
  });

  return balance;
}
