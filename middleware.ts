import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  localePrefix: 'as-needed',
  localeDetection: false,
});

export const config = {
  // Exclude face-api model assets (e.g. /models/*-shard1 has no dot in filename)
  matcher: ['/((?!api|_next|_vercel|models|.*\\..*).*)'],
};
