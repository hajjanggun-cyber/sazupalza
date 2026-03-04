export type SolarTermBoundaryKey =
  | 'minorCold'
  | 'ipchun'
  | 'gyeongchip'
  | 'cheongmyeong'
  | 'ipha'
  | 'mangjong'
  | 'soseo'
  | 'ipchu'
  | 'baekro'
  | 'hanro'
  | 'ipdong'
  | 'daeseol';

export type SolarTermAnchor = {
  key: SolarTermBoundaryKey;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

const DEFAULT_SOLAR_TERM_ANCHORS: SolarTermAnchor[] = [
  { key: 'minorCold', month: 1, day: 6, hour: 11, minute: 0 },
  { key: 'ipchun', month: 2, day: 4, hour: 10, minute: 0 },
  { key: 'gyeongchip', month: 3, day: 6, hour: 5, minute: 0 },
  { key: 'cheongmyeong', month: 4, day: 5, hour: 9, minute: 0 },
  { key: 'ipha', month: 5, day: 6, hour: 3, minute: 0 },
  { key: 'mangjong', month: 6, day: 6, hour: 7, minute: 0 },
  { key: 'soseo', month: 7, day: 7, hour: 18, minute: 0 },
  { key: 'ipchu', month: 8, day: 8, hour: 9, minute: 0 },
  { key: 'baekro', month: 9, day: 8, hour: 12, minute: 0 },
  { key: 'hanro', month: 10, day: 8, hour: 15, minute: 0 },
  { key: 'ipdong', month: 11, day: 7, hour: 18, minute: 0 },
  { key: 'daeseol', month: 12, day: 7, hour: 6, minute: 0 },
];

type SolarTermAnchorOverride = Partial<
  Record<SolarTermBoundaryKey, Partial<Pick<SolarTermAnchor, 'day' | 'hour' | 'minute'>>>
>;

const SOLAR_TERM_OVERRIDES: Record<number, SolarTermAnchorOverride> = {
  2024: {
    ipchun: { day: 4, hour: 16, minute: 27 },
    gyeongchip: { day: 5 },
    cheongmyeong: { day: 4 },
    ipha: { day: 5 },
    mangjong: { day: 5 },
    soseo: { day: 6 },
    ipchu: { day: 7 },
    baekro: { day: 7 },
    daeseol: { day: 6 },
  },
  2025: {
    ipchun: { day: 3, hour: 22, minute: 10 },
    gyeongchip: { day: 5 },
    cheongmyeong: { day: 4 },
    ipha: { day: 5 },
    mangjong: { day: 5 },
    ipchu: { day: 7 },
    baekro: { day: 7 },
    daeseol: { day: 6 },
  },
  2026: {
    ipchun: { day: 4, hour: 1, minute: 0 },
    gyeongchip: { day: 5 },
    ipha: { day: 5 },
    mangjong: { day: 5 },
    ipchu: { day: 7 },
    baekro: { day: 7 },
    daeseol: { day: 7 },
  },
  2027: {
    ipchun: { day: 4, hour: 6, minute: 0 },
    gyeongchip: { day: 6 },
    cheongmyeong: { day: 5 },
    ipha: { day: 6 },
    mangjong: { day: 6 },
    ipchu: { day: 8 },
    baekro: { day: 8 },
    ipdong: { day: 8 },
  },
  2028: {
    ipchun: { day: 4, hour: 11, minute: 0 },
    cheongmyeong: { day: 4 },
    ipha: { day: 5 },
    mangjong: { day: 5 },
    soseo: { day: 6 },
    ipchu: { day: 7 },
    baekro: { day: 7 },
    daeseol: { day: 6 },
  },
  2029: {
    ipchun: { day: 3, hour: 16, minute: 0 },
    gyeongchip: { day: 5 },
    cheongmyeong: { day: 4 },
    ipha: { day: 5 },
    mangjong: { day: 5 },
    ipchu: { day: 7 },
    baekro: { day: 7 },
    daeseol: { day: 6 },
  },
  2030: {
    ipchun: { day: 4, hour: 21, minute: 0 },
    gyeongchip: { day: 5 },
    cheongmyeong: { day: 5 },
    ipha: { day: 5 },
    mangjong: { day: 5 },
    ipchu: { day: 7 },
    baekro: { day: 7 },
    daeseol: { day: 7 },
  },
  2031: {
    ipchun: { day: 4, hour: 3, minute: 0 },
    gyeongchip: { day: 6 },
    cheongmyeong: { day: 5 },
    ipha: { day: 6 },
    mangjong: { day: 6 },
    ipchu: { day: 8 },
    baekro: { day: 8 },
    ipdong: { day: 8 },
  },
  2032: {
    ipchun: { day: 4, hour: 8, minute: 0 },
    cheongmyeong: { day: 4 },
    ipha: { day: 5 },
    mangjong: { day: 5 },
    soseo: { day: 6 },
    ipchu: { day: 7 },
    baekro: { day: 7 },
    daeseol: { day: 6 },
  },
  2033: {
    ipchun: { day: 3, hour: 13, minute: 0 },
    gyeongchip: { day: 5 },
    cheongmyeong: { day: 4 },
    ipha: { day: 5 },
    mangjong: { day: 5 },
    ipchu: { day: 7 },
    baekro: { day: 7 },
    daeseol: { day: 6 },
  },
  2034: {
    ipchun: { day: 4, hour: 18, minute: 0 },
    gyeongchip: { day: 5 },
    cheongmyeong: { day: 5 },
    ipha: { day: 5 },
    mangjong: { day: 5 },
    ipchu: { day: 7 },
    baekro: { day: 7 },
    daeseol: { day: 7 },
  },
  2035: {
    ipchun: { day: 4, hour: 0, minute: 0 },
    gyeongchip: { day: 6 },
    cheongmyeong: { day: 5 },
    ipha: { day: 6 },
    mangjong: { day: 6 },
    ipchu: { day: 8 },
    baekro: { day: 8 },
    ipdong: { day: 8 },
  },
};

const SOLAR_TERM_REFERENCE_START_YEAR = 2024;
const SOLAR_TERM_REFERENCE_SPAN = 12;

function isOnOrAfter(
  month: number,
  day: number,
  targetMonth: number,
  targetDay: number,
): boolean {
  return month > targetMonth || (month === targetMonth && day >= targetDay);
}

function isOnOrAfterAnchor(
  month: number,
  day: number,
  hour: number | undefined,
  anchor: SolarTermAnchor,
): boolean {
  if (month !== anchor.month || day !== anchor.day) {
    return isOnOrAfter(month, day, anchor.month, anchor.day);
  }

  if (typeof hour !== 'number') {
    return true;
  }

  const birthMinute = 30;
  return hour > anchor.hour || (hour === anchor.hour && birthMinute >= anchor.minute);
}

function getReferenceOverrideYear(year: number): number | null {
  if (SOLAR_TERM_OVERRIDES[year]) {
    return year;
  }

  if (year < 2012 || year > 2071) {
    return null;
  }

  const normalizedOffset =
    ((year - SOLAR_TERM_REFERENCE_START_YEAR) % SOLAR_TERM_REFERENCE_SPAN +
      SOLAR_TERM_REFERENCE_SPAN) %
    SOLAR_TERM_REFERENCE_SPAN;

  return SOLAR_TERM_REFERENCE_START_YEAR + normalizedOffset;
}

export function getSolarTermAnchors(year: number): SolarTermAnchor[] {
  const referenceYear = getReferenceOverrideYear(year);
  const overrides =
    (referenceYear ? SOLAR_TERM_OVERRIDES[referenceYear] : undefined) || {};

  return DEFAULT_SOLAR_TERM_ANCHORS.map((anchor) => ({
    ...anchor,
    day: overrides[anchor.key]?.day ?? anchor.day,
    hour: overrides[anchor.key]?.hour ?? anchor.hour,
    minute: overrides[anchor.key]?.minute ?? anchor.minute,
  }));
}

export function getSolarTermMonthIndexForDate(
  year: number,
  month: number,
  day: number,
  hour?: number,
): number {
  const anchors = getSolarTermAnchors(year);
  const [minorCold, ipchun, gyeongchip, cheongmyeong, ipha, mangjong, soseo, ipchu, baekro, hanro, ipdong, daeseol] =
    anchors;

  if (!isOnOrAfterAnchor(month, day, hour, minorCold)) return 11;
  if (!isOnOrAfterAnchor(month, day, hour, ipchun)) return 12;
  if (!isOnOrAfterAnchor(month, day, hour, gyeongchip)) return 1;
  if (!isOnOrAfterAnchor(month, day, hour, cheongmyeong)) return 2;
  if (!isOnOrAfterAnchor(month, day, hour, ipha)) return 3;
  if (!isOnOrAfterAnchor(month, day, hour, mangjong)) return 4;
  if (!isOnOrAfterAnchor(month, day, hour, soseo)) return 5;
  if (!isOnOrAfterAnchor(month, day, hour, ipchu)) return 6;
  if (!isOnOrAfterAnchor(month, day, hour, baekro)) return 7;
  if (!isOnOrAfterAnchor(month, day, hour, hanro)) return 8;
  if (!isOnOrAfterAnchor(month, day, hour, ipdong)) return 9;
  if (!isOnOrAfterAnchor(month, day, hour, daeseol)) return 10;
  return 11;
}

export function getYearPillarBaseYearForDate(
  year: number,
  month: number,
  day: number,
  hour?: number,
): number {
  const ipchun = getSolarTermAnchors(year).find((anchor) => anchor.key === 'ipchun');
  if (!ipchun) {
    return year;
  }

  return isOnOrAfterAnchor(month, day, hour, ipchun) ? year : year - 1;
}

export function getNextSolarTermAnchorDate(
  year: number,
  month: number,
  day: number,
  hour?: number,
): Date {
  const anchors = getSolarTermAnchors(year);
  const nextAnchor = anchors.find(
    (anchor) =>
      anchor.month > month ||
      (anchor.month === month &&
        (anchor.day > day ||
          (anchor.day === day &&
            (typeof hour !== 'number' ||
              hour < anchor.hour ||
              (hour === anchor.hour && anchor.minute > 30))))),
  );

  if (nextAnchor) {
    return new Date(
      Date.UTC(
        year,
        nextAnchor.month - 1,
        nextAnchor.day,
        nextAnchor.hour,
        nextAnchor.minute,
      ),
    );
  }

  const nextYearAnchor = getSolarTermAnchors(year + 1)[0];
  return new Date(
    Date.UTC(
      year + 1,
      nextYearAnchor.month - 1,
      nextYearAnchor.day,
      nextYearAnchor.hour,
      nextYearAnchor.minute,
    ),
  );
}
