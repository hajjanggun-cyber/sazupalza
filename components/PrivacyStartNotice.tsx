import Link from 'next/link';
import { buildLocalizedHref } from '@/lib/seo';

interface PrivacyStartNoticeProps {
  locale: string;
  className?: string;
}

export default function PrivacyStartNotice({
  locale,
  className = '',
}: PrivacyStartNoticeProps) {
  const isKo = locale === 'ko';

  return (
    <div
      className={`rounded-xl border border-green-700/30 bg-green-900/15 px-4 py-3 text-center ${className}`.trim()}
    >
      <p className="text-green-300/90 text-sm font-medium">
        {isKo
          ? '개인 결과는 현재 기기에서만 임시 보관됩니다.'
          : 'Private results are stored only on this device for a limited time.'}
      </p>
      <p className="mt-1 text-green-200/70 text-xs">
        {isKo
          ? '공유 시에는 개인정보가 포함되지 않은 새 분석 페이지 링크만 전달됩니다.'
          : 'Sharing sends only a fresh analysis-page link without personal result data.'}
      </p>
      <div className="mt-3">
        <Link
          href={buildLocalizedHref(locale, '/about')}
          className="inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-900/20 px-3 py-1 text-xs font-medium text-green-200/80 hover:text-green-100 hover:border-green-400/40 transition-colors"
        >
          <span>{isKo ? '운영 원칙 보기' : 'View Editorial Policy'}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
