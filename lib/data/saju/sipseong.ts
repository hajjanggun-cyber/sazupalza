// 십성(十星) 10개
export interface Sipseong {
  key: string;
  name: string;
  hanja: string;
  description: string;
  traits: string[];
  career: string[];
}

export const sipseongData: Record<string, Sipseong> = {
  bigyeon: { key: 'bigyeon', name: '비견', hanja: '比肩', description: '같은 오행의 양', traits: ['독립심이 강한 경향이 있습니다', '경쟁심이 있는 경향이 있습니다'], career: ['창업', '독립적 직업'] },
  gebjae: { key: 'gebjae', name: '겁재', hanja: '劫財', description: '같은 오행의 음', traits: ['추진력이 강한 경향이 있습니다', '충동적일 수 있습니다'], career: ['영업', '스포츠'] },
  sikshin: { key: 'sikshin', name: '식신', hanja: '食神', description: '내가 생하는 오행의 음', traits: ['표현력이 풍부한 경향이 있습니다', '창의적인 경향이 있습니다'], career: ['예술', '교육', '요리'] },
  sanggwan: { key: 'sanggwan', name: '상관', hanja: '傷官', description: '내가 생하는 오행의 양', traits: ['재능이 많은 경향이 있습니다', '자유로운 경향이 있습니다'], career: ['예술', '연예', '전문직'] },
  pyeonjae: { key: 'pyeonjae', name: '편재', hanja: '偏財', description: '내가 극하는 오행의 양', traits: ['사업 감각이 있는 경향이 있습니다', '변화를 좋아하는 경향이 있습니다'], career: ['사업', '투자', '금융'] },
  jeongjae: { key: 'jeongjae', name: '정재', hanja: '正財', description: '내가 극하는 오행의 음', traits: ['성실한 경향이 있습니다', '안정을 중시하는 경향이 있습니다'], career: ['회계', '금융', '부동산'] },
  pyeongwan: { key: 'pyeongwan', name: '편관', hanja: '偏官', description: '나를 극하는 오행의 양', traits: ['강한 의지가 있는 경향이 있습니다', '책임감이 강한 경향이 있습니다'], career: ['군경', '법조', '경영'] },
  jeonggwan: { key: 'jeonggwan', name: '정관', hanja: '正官', description: '나를 극하는 오행의 음', traits: ['원칙을 중시하는 경향이 있습니다', '도덕적인 경향이 있습니다'], career: ['공직', '교육', '행정'] },
  pyeonin: { key: 'pyeonin', name: '편인', hanja: '偏印', description: '나를 생하는 오행의 양', traits: ['직관력이 뛰어난 경향이 있습니다', '독창적인 경향이 있습니다'], career: ['연구', '종교', '예술'] },
  jeongin: { key: 'jeongin', name: '정인', hanja: '正印', description: '나를 생하는 오행의 음', traits: ['학문을 좋아하는 경향이 있습니다', '인자한 경향이 있습니다'], career: ['교육', '학문', '종교'] },
};
