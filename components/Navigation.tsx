'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { buildLocalizedHref } from '@/lib/seo';

function getPathWithoutLocale(pathname: string | null) {
  if (!pathname) return '/';
  if (pathname === '/en' || pathname === '/ko') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  if (pathname.startsWith('/ko/')) return pathname.slice(3);
  return pathname;
}

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const currentPath = getPathWithoutLocale(pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: buildLocalizedHref(locale, '/saju-analysis'), label: t('saju') },
    { href: buildLocalizedHref(locale, '/seongmyeong-analysis'), label: t('name') },
    { href: buildLocalizedHref(locale, '/gwansang-analysis'), label: t('face') },
    { href: buildLocalizedHref(locale, '/personality-analysis'), label: t('mbti') },
    { href: buildLocalizedHref(locale), label: t('compatibility') },
  ];

  const mobilePrimaryLinks = navLinks.slice(0, 4);
  const mobileSecondaryLinks = navLinks.slice(4);

  const localeLinks = [
    { locale: 'ko', label: 'KO' },
    { locale: 'en', label: 'EN' },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-[#1a0a02]/95 backdrop-blur-sm border-b border-yellow-900/40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={buildLocalizedHref(locale)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt={t('logo')} width={40} height={40} className="rounded-md" />
            <span className="text-xl font-bold text-yellow-400">
              {locale === 'ko' ? '사주팔자' : 'SAJUPALZA'}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors text-sm font-medium text-yellow-200/80 hover:text-yellow-400"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {localeLinks.map(({ locale: loc, label }) => (
              <Link
                key={loc}
                href={buildLocalizedHref(loc, currentPath)}
                className={`text-xs font-bold px-2 py-1 rounded transition-colors ${
                  locale === loc ? 'bg-yellow-500 text-black' : 'text-yellow-400 hover:text-yellow-300'
                }`}
              >
                {label}
              </Link>
            ))}

            {mobileSecondaryLinks.length > 0 && (
              <button
                className="md:hidden ml-2 text-yellow-400 hover:text-yellow-300"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={locale === 'ko' ? '메뉴' : 'Menu'}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="md:hidden pb-3">
          <div className="grid grid-cols-4 gap-2">
            {mobilePrimaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-yellow-700/30 bg-yellow-900/10 px-2 py-2 text-center text-[11px] font-semibold text-yellow-200/85 transition-colors hover:border-yellow-500/50 hover:text-yellow-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-yellow-900/40 py-4 space-y-2">
            {mobileSecondaryLinks.map((link) => (
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
