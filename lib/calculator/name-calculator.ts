// 성명학 계산기

import { soundOhaeng, extractChosung, soundOhaengMeaning } from '../data/name/orhaeng-sound';
import { suriData } from '../data/name/suri81';

export interface NameAnalysisResult {
  name: string;
  strokes: number[];
  totalStrokes: number;
  wongyeok: number;     // 원격 (성+이름 전체)
  hyeongyeok: number;   // 형격 (이름)
  igyeok: number;       // 이격 (성)
  jeonggyeok: number;   // 정격 (총획)
  soundOhaengList: string[];  // 소리오행 리스트
  soundOhaengRelation: string; // 상생/상극/중화
  suriAnalysis: {
    wongyeok: { number: number; name: string; rating: string; summary: string };
    hyeongyeok: { number: number; name: string; rating: string; summary: string };
  };
  score: number; // 0-100
  summary: string;
}

// 간단한 획수 계산 (한글 이름 기준)
function estimateStrokes(char: string): number {
  // 한글 음절의 획수 추정
  const strokeMap: Record<string, number> = {
    '가': 7, '각': 10, '간': 9, '강': 11,
    '나': 5, '남': 9,
    '다': 4, '달': 10,
    '라': 5, '람': 10,
    '마': 6, '만': 8, '명': 11,
    '바': 7, '박': 9,
    '사': 4, '산': 9, '상': 9, '석': 10, '선': 10, '성': 8, '수': 4, '순': 12, '승': 12, '신': 13, '심': 9,
    '아': 2, '안': 7, '양': 12, '연': 11, '영': 14, '오': 4, '우': 4, '원': 12, '유': 6, '윤': 11, '은': 10, '인': 6, '임': 9,
    '자': 4, '재': 6, '정': 8, '조': 7, '주': 6, '준': 7, '진': 10,
    '차': 5, '최': 12,
    '하': 3, '한': 9, '해': 12, '현': 11, '호': 8, '홍': 15, '황': 12, '혜': 16, '희': 17,
    '경': 15, '고': 5, '구': 5, '권': 10, '기': 8, '길': 10, '김': 7,
    '도': 7, '동': 12,
    '무': 7, '문': 4, '민': 5,
    '방': 7, '배': 8, '백': 9,
    '서': 7, '손': 10, '송': 11, '시': 6,
    '엄': 10,
    '장': 11, '전': 9, '지': 6,
    '태': 11, '이': 6,
    '노': 7,
    '류': 16, '리': 7,
    '봉': 11, '변': 9, '부': 5,
    '종': 11, '천': 9,
    '표': 9, '풍': 14,
    '팔': 8, '판': 10,
    '학': 16,
  };
  return strokeMap[char] || 8; // 기본값 8획
}

// 획수를 81수리로 변환
function toSuri81(n: number): number {
  if (n === 0) return 81;
  return ((n - 1) % 81) + 1;
}

// 소리오행 관계 분석
function analyzeSoundRelation(sounds: string[]): string {
  if (sounds.length < 2) return '중화';

  const ohaengList = sounds.filter(Boolean);
  if (ohaengList.length === 0) return '중화';

  // 상생 체크
  const sangsaeng: Record<string, string> = {
    '목': '화', '화': '토', '토': '금', '금': '수', '수': '목'
  };

  let sangsaengCount = 0;
  let sanggeukCount = 0;

  for (let i = 0; i < ohaengList.length - 1; i++) {
    if (sangsaeng[ohaengList[i]] === ohaengList[i + 1]) {
      sangsaengCount++;
    }
  }

  if (sangsaengCount >= ohaengList.length - 1) {
    return '상생(相生) - 서로 도움이 되는 관계';
  } else if (sanggeukCount >= ohaengList.length - 1) {
    return '상극(相剋) - 긴장 관계';
  }
  return '중화(中和) - 균형 잡힌 관계';
}

export function calculateName(name: string): NameAnalysisResult {
  const chars = name.split('');
  const strokes = chars.map(estimateStrokes);
  const totalStrokes = strokes.reduce((a, b) => a + b, 0);

  // 격 계산
  const wongyeok = toSuri81(totalStrokes);
  const hyeongyeok = strokes.length > 1 ? toSuri81(strokes.slice(1).reduce((a, b) => a + b, 0)) : wongyeok;
  const igyeok = toSuri81(strokes[0] || 0);
  const jeonggyeok = wongyeok;

  // 소리오행 분석
  const soundOhaengList = chars.map(char => {
    const chosung = extractChosung(char);
    return soundOhaeng[chosung] || '';
  }).filter(Boolean);

  const soundOhaengRelation = analyzeSoundRelation(soundOhaengList);

  // 수리 분석
  const wongyeokSuri = suriData[wongyeok] || { number: wongyeok, name: '미정', rating: 'neutral', summary: '분석 중' };
  const hyeongyeokSuri = suriData[hyeongyeok] || { number: hyeongyeok, name: '미정', rating: 'neutral', summary: '분석 중' };

  // 점수 계산
  const ratingScore: Record<string, number> = {
    great: 90, good: 75, neutral: 60, caution: 40, avoid: 20
  };
  const wonScore = ratingScore[wongyeokSuri.rating] || 60;
  const hyScore = ratingScore[hyeongyeokSuri.rating] || 60;
  const soundScore = soundOhaengRelation.includes('상생') ? 90 : soundOhaengRelation.includes('중화') ? 70 : 50;
  const score = Math.round((wonScore * 0.4 + hyScore * 0.4 + soundScore * 0.2));

  const summary = score >= 80 ? '이름의 기운이 매우 좋은 경향이 있습니다' :
    score >= 65 ? '이름의 기운이 좋은 경향이 있습니다' :
    score >= 50 ? '이름의 기운이 중립적인 경향이 있습니다' :
    '이름의 기운에 주의가 필요한 경향이 있습니다';

  return {
    name,
    strokes,
    totalStrokes,
    wongyeok,
    hyeongyeok,
    igyeok,
    jeonggyeok,
    soundOhaengList,
    soundOhaengRelation,
    suriAnalysis: {
      wongyeok: {
        number: wongyeokSuri.number,
        name: wongyeokSuri.name,
        rating: wongyeokSuri.rating,
        summary: wongyeokSuri.summary,
      },
      hyeongyeok: {
        number: hyeongyeokSuri.number,
        name: hyeongyeokSuri.name,
        rating: hyeongyeokSuri.rating,
        summary: hyeongyeokSuri.summary,
      },
    },
    score,
    summary,
  };
}
