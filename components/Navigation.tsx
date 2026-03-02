'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}/saju`, label: t('saju') },
    { href: `/${locale}/name-reading`, label: t('name') },
    { href: `/${locale}/face-reading`, label: t('face') },
    { href: `/${locale}/mbti`, label: t('mbti') },
    { href: `/${locale}/compatibility`, label: t('compatibility') },
  ];

  const localeLinks = [
    { locale: 'ko', label: 'KO', active: true },
    { locale: 'en', label: 'EN', active: true },
    { locale: 'ja', label: 'JP', active: false },
    { locale: 'zh', label: 'ZH', active: false },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#1a0a02]/95 backdrop-blur-sm border-b border-yellow-900/40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href={`/${locale}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt={t('logo')} width={40} height={40} className="rounded-md" />
            <span className="text-xl font-bold text-yellow-400">
              {locale === 'ko' ? '사주팔자' : 'SAJUPALZA'}
            </span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-yellow-200/80 hover:text-yellow-400 transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* 언어 선택 */}
          <div className="flex items-center gap-2">
            {localeLinks.map(({ locale: loc, label, active }) =>
              active ? (
                <Link
                  key={loc}
                  href={`/${loc}`}
                  className={`text-xs font-bold px-2 py-1 rounded transition-colors ${
                    locale === loc
                      ? 'bg-yellow-500 text-black'
                      : 'text-yellow-400 hover:text-yellow-300'
                  }`}
                >
                  {label}
                </Link>
              ) : (
                <span
                  key={loc}
                  className="text-xs font-bold px-2 py-1 text-gray-600 cursor-not-allowed"
                  title="준비 중"
                >
                  {label}
                </span>
              )
            )}

            {/* 모바일 메뉴 버튼 */}
            <button
              className="md:hidden ml-2 text-yellow-400 hover:text-yellow-300"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="메뉴"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {menuOpen && (
          <div className="md:hidden border-t border-yellow-900/40 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-yellow-200/80 hover:text-yellow-400 hover:bg-yellow-900/20 rounded transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
