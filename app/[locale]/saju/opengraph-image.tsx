import { ImageResponse } from 'next/og';

export const alt = '사주팔자란? 완전 가이드 | Sajupalza';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = { params: { locale: string } };

const COPY = {
  ko: { title: '사주팔자 완전 가이드', subtitle: '천간 · 지지 · 오행 · 대운으로 읽는 나의 운명', badge: '사주 · 운명 · 분석' },
  en: { title: 'Four Pillars of Destiny', subtitle: 'Heavenly Stems · Earthly Branches · Five Elements', badge: 'Saju · Destiny · Analysis' },
} as const;

export default function OGImage({ params }: Props) {
  const copy = params.locale === 'en' ? COPY.en : COPY.ko;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'radial-gradient(circle at 80% 20%, rgba(212,175,55,0.15), transparent 40%), linear-gradient(160deg, #0d0b1e 0%, #1a1733 50%, #0f1620 100%)',
          color: '#F8E7A1', fontFamily: 'system-ui, sans-serif', position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 40, border: '1px solid rgba(212,175,55,0.18)', borderRadius: 28 }} />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 22px', borderRadius: 999,
          border: '1px solid rgba(212,175,55,0.35)', background: 'rgba(212,175,55,0.12)',
          color: '#FCD34D', fontSize: 22, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 28,
        }}>
          <span>☯️</span><span>{copy.badge}</span>
        </div>
        <div style={{ fontSize: 92, marginBottom: 18, lineHeight: 1 }}>🀄</div>
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>{copy.title}</div>
        <div style={{ fontSize: 28, color: 'rgba(248,231,161,0.74)', maxWidth: 860, textAlign: 'center', lineHeight: 1.4 }}>{copy.subtitle}</div>
        <div style={{ marginTop: 34, fontSize: 20, letterSpacing: '0.18em', color: 'rgba(212,175,55,0.7)' }}>SAJUPALZA.CC</div>
      </div>
    ),
    { ...size }
  );
}
