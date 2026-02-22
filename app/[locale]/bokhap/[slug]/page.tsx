import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { bokhapPosts } from '@/lib/blog/bokhap-posts';
import BlogPostPage from '@/components/BlogPostPage';

const locales = ['ko', 'en', 'ja', 'zh'];

export function generateStaticParams() {
  return locales.flatMap(locale =>
    bokhapPosts.map(post => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata(
  { params }: { params: { locale: string; slug: string } }
): Promise<Metadata> {
  const post = bokhapPosts.find(p => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.description,
    keywords: post.keywords.join(', '),
    openGraph: { title: post.seoTitle, description: post.description, type: 'article', publishedTime: post.publishedAt },
  };
}

export default function Page({ params }: { params: { locale: string; slug: string } }) {
  unstable_setRequestLocale(params.locale);
  const post = bokhapPosts.find(p => p.slug === params.slug);
  if (!post) notFound();
  return <BlogPostPage post={post} locale={params.locale} />;
}
