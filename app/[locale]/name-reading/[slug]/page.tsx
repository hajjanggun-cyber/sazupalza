import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { seongmyeongPosts } from '@/lib/blog/seongmyeong-posts';
import BlogPostPage from '@/components/BlogPostPage';

const BASE_URL = 'https://sajupalza.cc';
const CATEGORY_PATH = 'name-reading';
const locales = ['ko', 'en', 'ja', 'zh'];
const blogLocales = ['ko', 'en'];

function getPostUrl(locale: string, slug: string) {
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  return `${BASE_URL}${prefix}/${CATEGORY_PATH}/${slug}`;
}

export function generateStaticParams() {
  return locales.flatMap(locale =>
    seongmyeongPosts.map(post => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata(
  { params }: { params: { locale: string; slug: string } }
): Promise<Metadata> {
  const post = seongmyeongPosts.find(p => p.slug === params.slug);
  if (!post) return {};

  const isKo = params.locale === 'ko';
  const title = isKo ? post.seoTitle : (post.seoTitleEn || post.seoTitle);
  const description = isKo ? post.description : (post.descriptionEn || post.description);
  const keywords = isKo ? post.keywords.join(', ') : ((post.keywordsEn || post.keywords).join(', '));
  const canonical = getPostUrl(params.locale, params.slug);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        blogLocales.map((l) => [l, getPostUrl(l, params.slug)])
      ),
    },
    openGraph: { title, description, type: 'article', publishedTime: post.publishedAt, url: canonical },
  };
}

export default function Page({ params }: { params: { locale: string; slug: string } }) {
  unstable_setRequestLocale(params.locale);
  const post = seongmyeongPosts.find(p => p.slug === params.slug);
  if (!post) notFound();
  return <BlogPostPage post={post} locale={params.locale} />;
}
