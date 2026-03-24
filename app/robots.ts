import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/result/',
          '/saju-result/',
          '/gwansang-result/',
          '/personality-result/',
          '/seongmyeong-result/',
          '/en/result/',
          '/en/saju-result/',
          '/en/gwansang-result/',
          '/en/personality-result/',
          '/en/seongmyeong-result/',
        ],
      },
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
    ],
    sitemap: 'https://sajupalza.cc/sitemap.xml',
    host: 'https://sajupalza.cc',
  };
}
