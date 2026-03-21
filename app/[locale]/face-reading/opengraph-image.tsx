import { ImageResponse } from 'next/og';

export const alt = '관상 분석 완전 가이드 | Sajupalza';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = { params: { locale: string } };

const COPY = {
  ko: { title: '관상 분석 가이드', subtitle: '얼굴 형태 · 이목구비로 읽는 성격과 운세', badge: '관상 · 인상 · 운세' },
  en: { title: 'Face Reading Guide', subtitle: 'Personality & Fortune from Your Facial Features', badge: 'Face · Fortune · Reading' },
} as const;

export default function OGImage({ params }: Props) {
  const copy = params.locale === 'en' ? COPY.en : COPY.ko;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'radial-gradient(circle at 70% 30%, rgba(212,175,55,0.2), transparent 40%), linear-gradient(160deg, #0f0c29 0%, #1e1b3b 50%, #111827 100%)',
          color: '#F8E7A1', fontFamily: 'system-ui, sans-serif', position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 40, border: '1px solid rgba(212,175,55,0.18)', borderRadius: 28 }} />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 22px', borderRadius: 999,
          border: '1px solid rgba(212,175,55,0.35)', background: 'rgba(212,175,55,0.12)',
          color: '#FCD34D', fontSize: 22, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 28,
        }}>
          <span>👁️</span><span>{copy.badge}</span>
        </div>
        <div style={{ fontSize: 92, marginBottom: 18, lineHeight: 1 }}>🌟</div>
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>{copy.title}</div>
        <div style={{ fontSize: 28, color: 'rgba(248,231,161,0.74)', maxWidth: 860, textAlign: 'center', lineHeight: 1.4 }}>{copy.subtitle}</div>
        <div style={{ marginTop: 34, fontSize: 20, letterSpacing: '0.18em', color: 'rgba(212,175,55,0.7)' }}>SAJUPALZA.CC</div>
      </div>
    ),
    { ...size }
  );
}
