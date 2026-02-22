// 신살(神殺) 주요 15개
export interface Sinsal {
  key: string;
  name: string;
  hanja: string;
  isGood: boolean;
  description: string;
  effect: string;
}

export const sinsalData: Sinsal[] = [
  { key: 'yeokma', name: '역마살', hanja: '驛馬殺', isGood: true, description: '이동과 변화', effect: '여행이나 이사, 직업 변화에 유리한 기운입니다' },
  { key: 'hwagae', name: '화개살', hanja: '華蓋殺', isGood: true, description: '예술과 종교', effect: '예술적 재능과 종교적 성향이 강해지는 경향이 있습니다' },
  { key: 'gwangwi', name: '관귀살', hanja: '官貴殺', isGood: true, description: '관직과 귀인', effect: '사회적 지위와 명예를 얻는 데 유리한 기운입니다' },
  { key: 'gisal', name: '기살', hanja: '奇殺', isGood: true, description: '특별한 재능', effect: '독특한 재능과 능력이 드러나는 경향이 있습니다' },
  { key: 'woljangsaeng', name: '월장생', hanja: '月將生', isGood: true, description: '월의 생기', effect: '해당 월에 좋은 기운이 강해지는 경향이 있습니다' },
  { key: 'seongin', name: '성인살', hanja: '聖人殺', isGood: true, description: '성인의 기운', effect: '지혜롭고 덕망 있는 기운이 강해지는 경향이 있습니다' },
  { key: 'dobak', name: '도박살', hanja: '賭博殺', isGood: false, description: '투기와 모험', effect: '충동적인 투자나 도박을 주의하는 것이 좋습니다' },
  { key: 'gosin', name: '고신살', hanja: '孤辰殺', isGood: false, description: '고독', effect: '혼자만의 시간이 많아지는 경향이 있습니다' },
  { key: 'gwamang', name: '과망살', hanja: '寡亡殺', isGood: false, description: '고독과 이별', effect: '인간관계에 각별한 주의가 필요합니다' },
  { key: 'baekho', name: '백호살', hanja: '白虎殺', isGood: false, description: '강한 에너지', effect: '과격한 행동을 자제하는 것이 좋습니다' },
  { key: 'geobsal', name: '겁살', hanja: '劫殺', isGood: false, description: '손실과 위험', effect: '갑작스러운 손실을 주의하는 것이 좋습니다' },
  { key: 'cheonsal', name: '천살', hanja: '天殺', isGood: false, description: '하늘의 시련', effect: '예상치 못한 어려움을 대비하는 것이 좋습니다' },
  { key: 'jisal', name: '지살', hanja: '地殺', isGood: false, description: '토지 관련 어려움', effect: '부동산 거래에 신중함이 필요합니다' },
  { key: 'yeonsal', name: '연살', hanja: '年殺', isGood: false, description: '연도 관련 어려움', effect: '해당 연도에 신중한 행동이 필요합니다' },
  { key: 'mangsin', name: '망신살', hanja: '亡身殺', isGood: false, description: '명예 손상 위험', effect: '언행에 각별히 주의하는 것이 좋습니다' },
];
