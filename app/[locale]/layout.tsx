import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales } from '../../i18n';

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const langMap: Record<string, string> = { ko: 'ko', en: 'en', ja: 'ja', zh: 'zh' };
  return {
    other: {
      'content-language': langMap[locale] ?? 'ko',
    },
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale as 'ko' | 'en' | 'ja' | 'zh')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
