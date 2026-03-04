import Link from 'next/link';
import Navigation from './Navigation';
import Footer from './Footer';
import { buildLocalizedHref } from '@/lib/seo';

interface Props {
  locale: string;
  retryPath: string;
}

export default function ResultUnavailableState({ locale, retryPath }: Props) {
  const isKo = locale === 'ko';

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl rounded-2xl border border-yellow-900/30 bg-black/20 p-8 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <p className="text-yellow-300 text-xs font-bold uppercase tracking-[0.18em] mb-3">
            {isKo ? 'Private Result' : 'Private Result'}
          </p>
          <h1 className="text-2xl font-bold text-yellow-100 mb-3">
            {isKo
              ? '이 결과는 원래 분석한 기기에서만 다시 열 수 있습니다'
              : 'This result can only be reopened on the device where it was created'}
          </h1>
          <p className="text-yellow-200/70 text-sm leading-relaxed mb-3">
            {isKo
              ? '공유 링크로 열었거나 브라우저 저장소가 지워져서 기존 개인 결과를 복원할 수 없습니다.'
              : 'This link was opened from a shared URL or the browser storage was cleared, so the original private result cannot be restored.'}
          </p>
          <div className="rounded-xl border border-yellow-900/20 bg-yellow-900/10 p-4 text-left mb-6">
            <p className="text-yellow-200/85 text-sm font-medium mb-2">
              {isKo ? '왜 이런가요?' : 'Why does this happen?'}
            </p>
            <ul className="space-y-2 text-yellow-100/65 text-xs leading-relaxed">
              <li>
                {isKo
                  ? '개인 결과 데이터는 개인정보 보호를 위해 서버에 저장되지 않습니다.'
                  : 'Private result data is not stored on our servers for privacy reasons.'}
              </li>
              <li>
                {isKo
                  ? '결과는 현재 기기 브라우저 저장소에만 임시 보관됩니다.'
                  : 'Results are kept only in the current device browser storage for a limited time.'}
              </li>
              <li>
                {isKo
                  ? '공유 링크는 저장된 결과를 여는 용도가 아니라 새 분석을 시작하는 용도입니다.'
                  : 'Shared links are meant to start a new analysis, not reopen a saved private result.'}
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={retryPath} className="btn-primary inline-flex items-center justify-center px-6 py-3">
              {isKo ? '새 분석 시작하기' : 'Start a New Analysis'}
            </Link>
            <Link
              href={buildLocalizedHref(locale)}
              className="btn-secondary inline-flex items-center justify-center px-6 py-3"
            >
              {isKo ? '메인으로 이동' : 'Go to Home'}
            </Link>
            <Link
              href={buildLocalizedHref(locale, '/about')}
              className="btn-secondary inline-flex items-center justify-center px-6 py-3"
            >
              {isKo ? '운영 원칙 보기' : 'View Editorial Policy'}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
