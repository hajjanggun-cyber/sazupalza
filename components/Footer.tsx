'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-[#0d0502] border-t border-yellow-900/30 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-yellow-400 font-bold text-lg mb-1">{locale === 'ko' ? '✨ 사주팔자 무료 컨설팅' : '✨ SajuPalza Free Consulting'}</p>
            <p className="text-yellow-200/50 text-sm">{t('privacyNote')}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href={`/${locale}/privacy`}
              className="text-yellow-200/60 hover:text-yellow-400 transition-colors"
            >
              {t('privacy')}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-yellow-200/60 hover:text-yellow-400 transition-colors"
            >
              {t('terms')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-yellow-200/60 hover:text-yellow-400 transition-colors"
            >
              {t('contact')}
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-yellow-900/20 text-center">
          <p className="text-yellow-200/40 text-xs">{t('copyright')}</p>
          <p className="text-yellow-200/30 text-xs mt-2">{t('disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
