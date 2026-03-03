import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
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
