import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ko', 'en', 'ja', 'zh'],
  defaultLocale: 'ko',
  localePrefix: 'as-needed',
  localeDetection: false,
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
