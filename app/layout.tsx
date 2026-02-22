import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://sajupalza.vercel.app'),
  title: {
    default: '사주팔자 무료 종합 분석 - 관상·성명학·MBTI',
    template: '%s | 사주팔자 무료 분석',
  },
  description: '사주팔자·관상·성명학·MBTI 완전 무료 종합 분석. 회원가입 없음, 개인정보 수집 없음. 생년월일만 입력하면 즉시 결과!',
  keywords: ['사주팔자', '무료사주', '관상', '성명학', 'MBTI', '사주분석', '무료운세', '사주보기'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://sajupalza.vercel.app',
    title: '사주팔자 무료 종합 분석',
    description: '사주팔자·관상·성명학·MBTI 완전 무료 종합 분석',
    siteName: '사주팔자 종합 컨설팅',
  },
  twitter: {
    card: 'summary_large_image',
    title: '사주팔자 무료 종합 분석',
    description: '사주팔자·관상·성명학·MBTI 완전 무료 종합 분석',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta name="google-adsense-account" content="ca-pub-2524681039359256">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* AdSense 스크립트 */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2524681039359256"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
