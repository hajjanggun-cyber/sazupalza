import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  // `as-needed` with a top-level `[locale]` app route can loop on localhost
  // by rewriting `/` -> `/ko` and then redirecting `/ko` -> `/` again.
  localePrefix: process.env.NODE_ENV === 'development' ? 'always' : 'as-needed',
  localeDetection: false,
});

export const config = {
  // Exclude face-api model assets (e.g. /models/*-shard1 has no dot in filename)
  matcher: ['/((?!api|_next|_vercel|models|.*\\..*).*)'],
};
