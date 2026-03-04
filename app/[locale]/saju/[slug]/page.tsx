import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { sajuPosts } from '@/lib/blog/saju-posts';
import { createBlogMetadata } from '@/lib/blog/metadata';
import BlogPostPage from '@/components/BlogPostPage';

const CATEGORY_PATH = 'saju';
const locales = ['ko', 'en'];

export function generateStaticParams() {
  return locales.flatMap(locale =>
    sajuPosts.map(post => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata(
  { params }: { params: { locale: string; slug: string } }
): Promise<Metadata> {
  const post = sajuPosts.find(p => p.slug === params.slug);
  if (!post) return {};
  return createBlogMetadata(params.locale, CATEGORY_PATH, post);
}

export default function Page({ params }: { params: { locale: string; slug: string } }) {
  unstable_setRequestLocale(params.locale);
  const post = sajuPosts.find(p => p.slug === params.slug);
  if (!post) notFound();
  return <BlogPostPage post={post} locale={params.locale} />;
}
