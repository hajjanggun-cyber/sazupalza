'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
}

const LIVE_AD_SLOT = '3446997082';

export default function AdSense({ slot, format = 'auto', className = '' }: AdSenseProps) {
  const locale = useLocale();
  const label = locale === 'ko' ? '광고' : 'Advertisement';
  const adRef = useRef<HTMLModElement | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const maxWidthMap = {
    auto: '100%',
    rectangle: '336px',
    horizontal: '728px',
  } as const;
  const maxWidth = maxWidthMap[format];

  useEffect(() => {
    const adElement = adRef.current;
    if (!adElement) return;

    let cancelled = false;

    const updateVisibility = () => {
      if (cancelled) return;

      const adStatus = adElement.getAttribute('data-ad-status');
      const iframe = adElement.querySelector('iframe');
      const iframeHeight = iframe instanceof HTMLElement ? iframe.offsetHeight : 0;
      const hasVisibleFrame = Boolean(iframe) && iframeHeight > 0;

      if (adStatus === 'unfilled') {
        setIsHidden(true);
        setIsFilled(false);
        return;
      }

      if (adStatus === 'filled' || hasVisibleFrame) {
        setIsFilled(true);
        setIsHidden(false);
      }
    };

    const observer = new MutationObserver(() => {
      updateVisibility();
    });

    observer.observe(adElement, {
      attributes: true,
      attributeFilter: ['data-ad-status', 'style'],
      childList: true,
      subtree: true,
    });

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      setIsHidden(true);
    }

    const fallbackTimer = window.setTimeout(() => {
      updateVisibility();

      const adStatus = adElement.getAttribute('data-ad-status');
      const iframe = adElement.querySelector('iframe');
      if (adStatus !== 'filled' && !iframe) {
        setIsHidden(true);
      }
    }, 2500);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, [slot]);

  if (process.env.NODE_ENV === 'development') {
    const sizeMap = {
      auto: { w: '100%', h: '90px', devLabel: '광고 영역 (자동)' },
      rectangle: { w: '336px', h: '280px', devLabel: '광고 영역 (336x280)' },
      horizontal: { w: '728px', h: '90px', devLabel: '광고 영역 (728x90)' },
    };
    const { w, h, devLabel } = sizeMap[format];
    return (
      <div className={`w-full flex justify-center ${className}`}>
        <div
          className="flex items-center justify-center border border-dashed border-yellow-600/30 rounded-lg text-yellow-600/50 text-sm w-full"
          style={{ minWidth: w, minHeight: h, maxWidth }}
        >
          {devLabel}
        </div>
      </div>
    );
  }

  if (isHidden) {
    return null;
  }

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {isFilled ? <p className="text-center text-xs text-white/20 mb-1">{label}</p> : null}
      <div className="w-full" style={{ maxWidth }}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-2524681039359256"
          data-ad-slot={LIVE_AD_SLOT}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
