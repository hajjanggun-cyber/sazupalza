import { MetadataRoute } from 'next';

const BASE_URL = 'https://sajupalza.cc';
const locales = ['ko', 'en', 'ja', 'zh'];

const routes = ['', '/saju', '/name', '/face', '/mbti', '/privacy', '/terms', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      const isMain = route === '';
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: isMain ? 'weekly' : 'monthly',
        priority: isMain ? 1.0 : locale === 'ko' ? 0.8 : 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}
