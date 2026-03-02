import { ImageResponse } from 'next/og';

export const alt = '사주팔자 종합 분석 결과';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface InputData {
  name: string;
  year: number;
  month: number;
  day: number;
  mbti?: string;
  hour?: number;
  hasPhoto?: boolean;
}

function decodeInputData(id: string): InputData | null {
  try {
    const base64 = id.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    // Node.js 18+ 환경에서 atob 사용 가능
    const binStr = atob(base64 + padding);
    const bytes = Uint8Array.from(binStr, (c) => c.charCodeAt(0));
    const jsonStr = new TextDecoder().decode(bytes);
    return JSON.parse(jsonStr) as InputData;
  } catch {
    return null;
  }
}

// 연도 천간(天干) → 오행 → 수호신 결정 (OG 이미지용 간략 버전)
function getGuardianFromYear(year: number): {
  emoji: string;
  nameKo: string;
  color: string;
  ohaeng: string;
} {
  const stem = (year - 4 + 100) % 10; // 0=갑, 1=을, 2=병, ...
  if (stem < 2) return { emoji: '🐉', nameKo: '청룡', color: '#4ade80', ohaeng: '목(木)' };
  if (stem < 4) return { emoji: '🦅', nameKo: '봉황', color: '#f87171', ohaeng: '화(火)' };
  if (stem < 6) return { emoji: '✨', nameKo: '황룡', color: '#facc15', ohaeng: '토(土)' };
  if (stem < 8) return { emoji: '🐯', nameKo: '백호', color: '#e5e7eb', ohaeng: '금(金)' };
  return { emoji: '🐢', nameKo: '현무', color: '#93c5fd', ohaeng: '수(水)' };
}

type Props = {
  params: { id: string; locale: string };
};

export default function OGImage({ params }: Props) {
  const data = decodeInputData(params.id);
  const name = data?.name ?? '사주팔자';
  const year = data?.year ?? 1990;
  const month = data?.month ?? 1;
  const day = data?.day ?? 1;
  const guardian = getGuardianFromYear(year);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(160deg, #0F0C29 0%, #302B63 55%, #24243E 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 배경 장식 원 */}
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,134,10,0.08) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* 상단 레이블 */}
        <div
          style={{
            color: '#C8860A',
            fontSize: 22,
            letterSpacing: '0.3em',
            marginBottom: 28,
            fontWeight: 600,
          }}
        >
          사주팔자 종합 분석
        </div>

        {/* 수호신 이모지 */}
        <div style={{ fontSize: 96, marginBottom: 16, lineHeight: 1 }}>
          {guardian.emoji}
        </div>

        {/* 이름 */}
        <div
          style={{
            color: '#F5D77E',
            fontSize: 64,
            fontWeight: 'bold',
            marginBottom: 8,
            letterSpacing: '-0.02em',
          }}
        >
          {name}님
        </div>

        {/* 생년월일 */}
        <div
          style={{
            color: 'rgba(240,238,255,0.55)',
            fontSize: 26,
            marginBottom: 28,
          }}
        >
          {year}년 {month}월 {day}일생
        </div>

        {/* 수호신 배지 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(200,134,10,0.18)',
            border: '1px solid rgba(200,134,10,0.45)',
            borderRadius: 50,
            padding: '12px 36px',
          }}
        >
          <span style={{ color: guardian.color, fontSize: 26, fontWeight: 'bold' }}>
            수호신
          </span>
          <span style={{ color: '#F5D77E', fontSize: 26, fontWeight: 'bold' }}>
            {guardian.emoji} {guardian.nameKo}
          </span>
          <span style={{ color: 'rgba(240,238,255,0.5)', fontSize: 20 }}>
            ({guardian.ohaeng})
          </span>
        </div>

        {/* 구분선 */}
        <div
          style={{
            width: 200,
            height: 1,
            background: 'rgba(200,134,10,0.3)',
            marginTop: 32,
            marginBottom: 16,
          }}
        />

        {/* 사이트명 */}
        <div
          style={{
            color: 'rgba(200,134,10,0.6)',
            fontSize: 20,
            letterSpacing: '0.1em',
          }}
        >
          sajupalza.cc
        </div>
      </div>
    ),
    { ...size }
  );
}
