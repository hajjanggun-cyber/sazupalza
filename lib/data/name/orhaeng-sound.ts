// 소리오행(音五行) - 자음별 오행 분류
export const soundOhaeng: Record<string, string> = {
  // 목(木) - ㄱ, ㅋ
  'ㄱ': '목', 'ㄲ': '목', 'ㅋ': '목',
  // 화(火) - ㄴ, ㄷ, ㄹ, ㅌ
  'ㄴ': '화', 'ㄷ': '화', 'ㄸ': '화', 'ㄹ': '화', 'ㅌ': '화',
  // 토(土) - ㅇ, ㅎ
  'ㅇ': '토', 'ㅎ': '토',
  // 금(金) - ㅅ, ㅈ, ㅊ
  'ㅅ': '금', 'ㅆ': '금', 'ㅈ': '금', 'ㅉ': '금', 'ㅊ': '금',
  // 수(水) - ㅁ, ㅂ, ㅍ
  'ㅁ': '수', 'ㅂ': '수', 'ㅃ': '수', 'ㅍ': '수',
};

export const soundOhaengMeaning: Record<string, string> = {
  '목': '성장과 창조의 기운',
  '화': '열정과 표현의 기운',
  '토': '안정과 신뢰의 기운',
  '금': '결단과 의리의 기운',
  '수': '지혜와 유연함의 기운',
};

// 한글 음절에서 초성 추출
export function extractChosung(char: string): string {
  const code = char.charCodeAt(0) - 0xAC00;
  if (code < 0 || code > 11171) return '';
  const chosungIndex = Math.floor(code / 28 / 21);
  const chosungs = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  return chosungs[chosungIndex] || '';
}

// 오행 관계 분석
export function analyzeSoundOhaengRelation(sounds: string[]): string {
  const sangsaeng: Record<string, string> = {
    '목': '화', '화': '토', '토': '금', '금': '수', '수': '목',
  };
  const sanggeuk: Record<string, string> = {
    '목': '토', '토': '수', '수': '화', '화': '금', '금': '목',
  };

  if (sounds.length < 2) return '중화(中和)';

  let sangsaengCount = 0;
  let sanggeukCount = 0;

  for (let i = 0; i < sounds.length - 1; i++) {
    if (sangsaeng[sounds[i]] === sounds[i + 1]) sangsaengCount++;
    if (sanggeuk[sounds[i]] === sounds[i + 1]) sanggeukCount++;
  }

  if (sangsaengCount > 0 && sanggeukCount === 0) return '상생(相生)';
  if (sanggeukCount > 0 && sangsaengCount === 0) return '상극(相剋)';
  return '중화(中和)';
}
