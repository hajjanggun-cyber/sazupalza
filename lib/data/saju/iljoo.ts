// 주요 일주(日柱) 60갑자 - 핵심 특성
export interface Iljoo {
  key: string;
  name: string;
  hanja: string;
  nickname: string;
  traits: string[];
  strengths: string[];
  growthPoints: string[];
}

// 60갑자 중 주요 일주 데이터
export const iljooData: Record<string, Iljoo> = {
  '갑자': { key: '갑자', name: '갑자', hanja: '甲子', nickname: '천덕귀인', traits: ['총명하고 기억력이 좋은 경향이 있습니다', '지혜롭고 감수성이 풍부한 경향이 있습니다'], strengths: ['학문과 예술에 유리한 기운입니다'], growthPoints: ['감정 기복을 다스리는 연습이 도움이 될 수 있습니다'] },
  '갑오': { key: '갑오', name: '갑오', hanja: '甲午', nickname: '천복귀인', traits: ['열정적이고 추진력이 강한 경향이 있습니다'], strengths: ['목표 달성에 유리한 기운입니다'], growthPoints: ['인내심을 기르는 것이 좋습니다'] },
  '을축': { key: '을축', name: '을축', hanja: '乙丑', nickname: '학당귀인', traits: ['섬세하고 성실한 경향이 있습니다'], strengths: ['꾸준한 노력으로 성취하는 데 유리한 기운입니다'], growthPoints: ['자신감을 더 키우는 것이 좋습니다'] },
  '병자': { key: '병자', name: '병자', hanja: '丙子', nickname: '문창귀인', traits: ['총명하고 표현력이 뛰어난 경향이 있습니다'], strengths: ['소통과 표현에 유리한 기운입니다'], growthPoints: ['일관성을 유지하는 연습이 도움이 될 수 있습니다'] },
  '병오': { key: '병오', name: '병오', hanja: '丙午', nickname: '활화산형', traits: ['에너지가 넘치고 열정적인 경향이 있습니다'], strengths: ['추진력과 표현력에 유리한 기운입니다'], growthPoints: ['충동성을 조절하는 것이 중요합니다'] },
  '무술': { key: '무술', name: '무술', hanja: '戊戌', nickname: '안정형', traits: ['신뢰감 있고 책임감이 강한 경향이 있습니다'], strengths: ['조직 관리에 유리한 기운입니다'], growthPoints: ['변화를 더 적극적으로 수용하는 것이 좋습니다'] },
  '경금': { key: '경금', name: '경금', hanja: '庚金', nickname: '결단형', traits: ['결단력이 강하고 의리를 중시하는 경향이 있습니다'], strengths: ['리더십 발휘에 유리한 기운입니다'], growthPoints: ['유연성을 기르는 것이 좋습니다'] },
  '임수': { key: '임수', name: '임수', hanja: '壬水', nickname: '지혜형', traits: ['지혜롭고 통찰력이 뛰어난 경향이 있습니다'], strengths: ['학문과 연구에 유리한 기운입니다'], growthPoints: ['실천력을 높이는 것이 좋습니다'] },
};

// 일주에서 일간 추출
export function getIlgan(iljoo: string): string {
  return iljoo[0] || '';
}

// 일주에서 일지 추출
export function getIlji(iljoo: string): string {
  return iljoo[1] || '';
}
