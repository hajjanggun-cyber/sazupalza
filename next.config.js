const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://adservice.google.com https://fundingchoicesmessages.google.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self'",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://fundingchoicesmessages.google.com https://adservice.google.com",
      "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://fundingchoicesmessages.google.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google",
    ].join('; '),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/seongmyeong/:slug',
        destination: '/name-reading/:slug',
        permanent: true,
      },
      {
        source: '/en/seongmyeong/:slug',
        destination: '/en/name-reading/:slug',
        permanent: true,
      },
      // /name → /name-reading, /face → /face-reading 중복 콘텐츠 제거
      {
        source: '/name',
        destination: '/name-reading',
        permanent: true,
      },
      {
        source: '/en/name',
        destination: '/en/name-reading',
        permanent: true,
      },
      {
        source: '/face',
        destination: '/face-reading',
        permanent: true,
      },
      {
        source: '/en/face',
        destination: '/en/face-reading',
        permanent: true,
      },
      // zh/ja 로케일 제거 후 301 리다이렉트 (구글 de-index 가속)
      {
        source: '/zh/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/ja/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      encoding: false,
      ...(isServer ? {} : { fs: false }),
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      encoding: false,
    };
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
