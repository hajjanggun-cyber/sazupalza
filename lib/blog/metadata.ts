import type { Metadata } from 'next';
import type { BlogPost } from './types';
import { buildLocalizedHref, buildLocalizedUrl } from '@/lib/seo';

const BLOG_LOCALES = ['ko', 'en'] as const;

const ROUTE_TO_POST_CATEGORY: Record<string, BlogPost['category']> = {
  saju: 'saju',
  'name-reading': 'seongmyeong',
  'face-reading': 'gwansang',
  mbti: 'mbti',
  compatibility: 'bokhap',
};

const CATEGORY_LABELS: Record<string, { ko: string; en: string }> = {
  saju: { ko: '사주', en: 'Four Pillars' },
  'name-reading': { ko: '성명학', en: 'Name Reading' },
  'face-reading': { ko: '관상', en: 'Face Reading' },
  mbti: { ko: 'MBTI', en: 'MBTI' },
  compatibility: { ko: '궁합', en: 'Compatibility' },
};

export function mapRouteCategoryToPostCategory(categoryPath: string): BlogPost['category'] {
  return ROUTE_TO_POST_CATEGORY[categoryPath] || 'saju';
}

export function getBlogCategoryLabel(categoryPath: string, locale: string): string {
  const labels = CATEGORY_LABELS[categoryPath] || CATEGORY_LABELS.saju;
  return locale === 'ko' ? labels.ko : labels.en;
}

export function getBlogPostUrl(locale: string, categoryPath: string, slug: string): string {
  return buildLocalizedUrl(locale, `/${categoryPath}/${slug}`);
}

export function getBlogCoverImagePath(locale: string, categoryPath: string, slug: string): string {
  return buildLocalizedHref(locale, `/blog-og/${categoryPath}/${slug}/opengraph-image`);
}

export function getBlogCoverImageUrl(locale: string, categoryPath: string, slug: string): string {
  return buildLocalizedUrl(locale, `/blog-og/${categoryPath}/${slug}/opengraph-image`);
}

export function createBlogMetadata(
  locale: string,
  categoryPath: string,
  post: BlogPost
): Metadata {
  const isKo = locale === 'ko';
  const title = isKo ? post.seoTitle : (post.seoTitleEn || post.seoTitle);
  const description = isKo ? post.description : (post.descriptionEn || post.description);
  const keywords = isKo ? post.keywords.join(', ') : ((post.keywordsEn || post.keywords).join(', '));
  const canonical = getBlogPostUrl(locale, categoryPath, post.slug);
  const imageUrl = getBlogCoverImageUrl(locale, categoryPath, post.slug);

  return {
    title,
    description,
    keywords,
    authors: [{ name: isKo ? '사주팔자닷컴 편집팀' : 'SajuPalza Editorial Team' }],
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(BLOG_LOCALES.map((targetLocale) => [targetLocale, getBlogPostUrl(targetLocale, categoryPath, post.slug)])),
        'x-default': getBlogPostUrl('ko', categoryPath, post.slug),
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      url: canonical,
      siteName: 'SajuPalza',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
