import { MetadataRoute } from 'next';
import { allPosts } from '@/lib/blog';

const BASE_URL = 'https://sajupalza.cc';
const locales = ['ko', 'en'];

const routes = [
  '', '/saju', '/mbti', '/privacy', '/terms', '/contact',
  '/saju-analysis', '/gwansang-analysis', '/seongmyeong-analysis', '/personality-analysis', '/combined',
  '/face-reading', '/name-reading', '/compatibility'
];

// localePrefix: 'as-needed' 설정으로 인해 기본 로케일(ko)은 prefix 없이 접근됨
// /ko/... → /... 로 리다이렉트되므로 실제 URL에는 /ko/ 없음
function getLocaleUrl(locale: string, path: string): string {
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

function getPostRoutePrefix(category: string): string {
  switch (category) {
    case 'saju': return '/saju';
    case 'face-reading': return '/face-reading';
    case 'seongmyeong': return '/name-reading';
    case 'mbti': return '/mbti';
    case 'bokhap': return '/compatibility';
    default: return `/${category}`;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      const isMain = route === '';
      entries.push({
        url: getLocaleUrl(locale, route),
        changeFrequency: isMain ? 'weekly' : 'monthly',
        priority: isMain ? 1.0 : locale === 'ko' ? 0.8 : 0.6,
        alternates: {
          languages: {
            ...Object.fromEntries(locales.map((l) => [l, getLocaleUrl(l, route)])),
            'x-default': getLocaleUrl('ko', route),
          },
        },
      });
    }
  }

  for (const post of allPosts) {
    const routePrefix = getPostRoutePrefix(post.category);
    const postRoute = `${routePrefix}/${post.slug}`;

    const blogLocales = ['ko', 'en'];

    for (const locale of blogLocales) {
      entries.push({
        url: getLocaleUrl(locale, postRoute),
        lastModified: new Date(post.updatedAt ?? post.publishedAt),
        changeFrequency: 'weekly',
        priority: locale === 'ko' ? 0.7 : 0.5,
        alternates: {
          languages: {
            ...Object.fromEntries(blogLocales.map((l) => [l, getLocaleUrl(l, postRoute)])),
            'x-default': getLocaleUrl('ko', postRoute),
          },
        },
      });
    }
  }

  return entries;
}
