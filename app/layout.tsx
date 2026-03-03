import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sajupalza.cc'),
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
    url: 'https://sajupalza.cc',
    title: '사주팔자 무료 종합 분석',
    description: '사주팔자·관상·성명학·MBTI 완전 무료 종합 분석',
    siteName: '사주팔자 무료 컨설팅',
    images: [
      {
        url: '/hero-banner.png',
        width: 1200,
        height: 630,
        alt: '사주팔자 무료 종합 분석',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '사주팔자 무료 종합 분석',
    description: '사주팔자·관상·성명학·MBTI 완전 무료 종합 분석',
    images: ['/hero-banner.png'],
  },
};

// html/body는 app/[locale]/layout.tsx에서 lang={locale}로 동적 렌더링
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return children;
}
