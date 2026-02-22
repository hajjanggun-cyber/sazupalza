'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
}

export default function AdSense({ slot, format = 'auto', className = '' }: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense 미승인 시 조용히 무시
    }
  }, []);

  // 개발 환경에서는 플레이스홀더 표시
  if (process.env.NODE_ENV === 'development') {
    const sizeMap = {
      auto: { w: '100%', h: '90px', label: '광고 영역 (자동)' },
      rectangle: { w: '336px', h: '280px', label: '광고 영역 (336x280)' },
      horizontal: { w: '728px', h: '90px', label: '광고 영역 (728x90)' },
    };
    const { w, h, label } = sizeMap[format];
    return (
      <div
        className={`flex items-center justify-center border border-dashed border-yellow-600/30 rounded-lg text-yellow-600/50 text-sm ${className}`}
        style={{ minWidth: w, minHeight: h, maxWidth: '100%' }}
      >
        {label}
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2524681039359256"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
