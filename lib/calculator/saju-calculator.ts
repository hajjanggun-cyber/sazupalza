// 사주 계산기 - 생년월일시 → 천간지지 8글자

export interface SajuResult {
  year: { cheongan: string; jiji: string };
  month: { cheongan: string; jiji: string };
  day: { cheongan: string; jiji: string };
  hour?: { cheongan: string; jiji: string };
  ilgan: string; // 일간 (나를 나타내는 천간)
  ohaeng: { year: string; month: string; day: string; hour?: string };
}

// 천간 순서
const cheonganOrder = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const cheonganKeys = ['gap', 'eul', 'byeong', 'jeong', 'mu', 'gi', 'gyeong', 'sin', 'im', 'gye'];

// 지지 순서
const jijiOrder = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
const jijiKeys = ['ja', 'chuk', 'in', 'myo', 'jin', 'sa', 'o', 'mi', 'sin', 'yu', 'sul', 'hae'];

// 천간 오행
const cheonganOhaeng: Record<string, string> = {
  '갑': '목', '을': '목',
  '병': '화', '정': '화',
  '무': '토', '기': '토',
  '경': '금', '신': '금',
  '임': '수', '계': '수',
};

// 지지 오행
const jijiOhaeng: Record<string, string> = {
  '자': '수', '축': '토', '인': '목', '묘': '목',
  '진': '토', '사': '화', '오': '화', '미': '토',
  '신': '금', '유': '금', '술': '토', '해': '수',
};

// 시지 계산 (태어난 시간 → 지지)
const hourToJiji: Record<number, string> = {
  23: '자', 0: '자', 1: '축', 2: '축',
  3: '인', 4: '인', 5: '묘', 6: '묘',
  7: '진', 8: '진', 9: '사', 10: '사',
  11: '오', 12: '오', 13: '미', 14: '미',
  15: '신', 16: '신', 17: '유', 18: '유',
  19: '술', 20: '술', 21: '해', 22: '해',
};

// 연주(年柱) 계산
function calcYearPillar(year: number): { cheongan: string; jiji: string } {
  const cheonganIndex = (year - 4) % 10;
  const jijiIndex = (year - 4) % 12;
  return {
    cheongan: cheonganOrder[(cheonganIndex + 10) % 10],
    jiji: jijiOrder[(jijiIndex + 12) % 12],
  };
}

// 월주(月柱) 계산
function calcMonthPillar(year: number, month: number): { cheongan: string; jiji: string } {
  // 지지: 인월(1월)부터 시작 (인묘진사오미신유술해자축)
  const jijiIndex = (month + 1) % 12;

  // 천간: 연간에 따라 결정
  const yearCheonganIndex = (year - 4) % 10;
  // 갑기년 → 병인월 시작 (2), 을경년 → 무인월 (4), 병신년 → 경인월 (6), 정임년 → 임인월 (8), 무계년 → 갑인월 (0)
  const startIndexMap = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
  const startIndex = startIndexMap[yearCheonganIndex];
  const cheonganIndex = (startIndex + (month - 1)) % 10;

  return {
    cheongan: cheonganOrder[cheonganIndex],
    jiji: jijiOrder[jijiIndex],
  };
}

// 일주(日柱) 계산
function calcDayPillar(year: number, month: number, day: number): { cheongan: string; jiji: string } {
  // 율리우스 적일수를 이용한 계산
  const a = Math.floor((14 - month) / 12);
  const y = year - a;
  const m = month + 12 * a - 2;
  const jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  const cheonganIndex = (jd + 9) % 10;
  const jijiIndex = (jd + 1) % 12;

  return {
    cheongan: cheonganOrder[(cheonganIndex + 10) % 10],
    jiji: jijiOrder[(jijiIndex + 12) % 12],
  };
}

// 시주(時柱) 계산
function calcHourPillar(dayCheongan: string, hour: number): { cheongan: string; jiji: string } {
  const jiji = hourToJiji[hour] || '자';
  const jijiIndex = jijiOrder.indexOf(jiji);

  // 일간에 따른 자시 천간
  const dayCheonganIndex = cheonganOrder.indexOf(dayCheongan);
  const startIndexMap = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
  const startIndex = startIndexMap[dayCheonganIndex] || 0;
  const cheonganIndex = (startIndex + jijiIndex) % 10;

  return {
    cheongan: cheonganOrder[cheonganIndex],
    jiji: jiji,
  };
}

export interface SajuInput {
  year: number;
  month: number;
  day: number;
  hour?: number; // 0~23, undefined면 시주 없음
  isLunar?: boolean;
}

export function calculateSaju(input: SajuInput): SajuResult {
  const { year, month, day, hour } = input;

  const yearPillar = calcYearPillar(year);
  const monthPillar = calcMonthPillar(year, month);
  const dayPillar = calcDayPillar(year, month, day);

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

  if (hour !== undefined) {
    const hourPillar = calcHourPillar(dayPillar.cheongan, hour);
    result.hour = hourPillar;
    result.ohaeng.hour = cheonganOhaeng[hourPillar.cheongan];
  }

  return result;
}

// 천간 한자 변환
export function cheonganToHanja(name: string): string {
  const map: Record<string, string> = {
    '갑': '甲', '을': '乙', '병': '丙', '정': '丁', '무': '戊',
    '기': '己', '경': '庚', '신': '辛', '임': '壬', '계': '癸',
  };
  return map[name] || name;
}

// 지지 한자 변환
export function jijiToHanja(name: string): string {
  const map: Record<string, string> = {
    '자': '子', '축': '丑', '인': '寅', '묘': '卯', '진': '辰',
    '사': '巳', '오': '午', '미': '未', '신': '申', '유': '酉',
    '술': '戌', '해': '亥',
  };
  return map[name] || name;
}

// 일주 60갑자 이름 반환
export function getIljuName(cheongan: string, jiji: string): string {
  return `${cheongan}${jiji}`;
}

// 오행 균형 분석
export function analyzeOhaengBalance(result: SajuResult): Record<string, number> {
  const balance: Record<string, number> = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };

  const pillars = [result.year, result.month, result.day];
  if (result.hour) pillars.push(result.hour);

  pillars.forEach(pillar => {
    const cg = cheonganOhaeng[pillar.cheongan];
    const jj = jijiOhaeng[pillar.jiji];
    if (cg) balance[cg] = (balance[cg] || 0) + 1;
    if (jj) balance[jj] = (balance[jj] || 0) + 1;
  });

  return balance;
}
