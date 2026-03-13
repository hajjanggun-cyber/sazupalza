import Image from 'next/image';
import Link from 'next/link';
import AdSense from './AdSense';
import Navigation from './Navigation';
import Footer from './Footer';
import { BlogPost, getPostBySlug } from '@/lib/blog';
import { softenBlogMarketingCopy } from '@/lib/blog/content-sanitizer';
import {
  getBlogCoverImagePath,
  getBlogCoverImageUrl,
} from '@/lib/blog/metadata';
import { buildLocalizedHref, buildLocalizedUrl } from '@/lib/seo';

const categoryName: Record<string, Record<string, string>> = {
  saju: { ko: '사주', en: 'Four Pillars' },
  seongmyeong: { ko: '성명학', en: 'Name Reading' },
  'name-reading': { ko: '성명학', en: 'Name Reading' },
  gwansang: { ko: '관상', en: 'Face Reading' },
  'face-reading': { ko: '관상', en: 'Face Reading' },
  mbti: { ko: 'MBTI', en: 'MBTI' },
  bokhap: { ko: '궁합', en: 'Compatibility' },
  compatibility: { ko: '궁합', en: 'Compatibility' },
};

interface Props {
  post: BlogPost;
  locale: string;
}

const internalRoutePrefixes = [
  '/saju',
  '/name-reading',
  '/face-reading',
  '/compatibility',
  '/mbti',
  '/contact',
  '/about',
  '/privacy',
  '/terms',
  '/combined',
  '/saju-analysis',
  '/gwansang-analysis',
  '/seongmyeong-analysis',
  '/personality-analysis',
  '/face',
  '/name',
];

function normalizeInternalHref(href: string, locale: string): string {
  const localePrefix = locale === 'ko' ? '' : `/${locale}`;
  let normalizedPath = href;

  if (normalizedPath === '/ko') {
    normalizedPath = '/';
  } else if (normalizedPath.startsWith('/ko/')) {
    normalizedPath = normalizedPath.slice(3);
  } else if (normalizedPath === '/en') {
    normalizedPath = '/';
  } else if (normalizedPath.startsWith('/en/')) {
    normalizedPath = normalizedPath.slice(3);
  }

  const isInternalPath =
    normalizedPath === '/' ||
    internalRoutePrefixes.some((prefix) => normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`));

  if (!isInternalPath) {
    return href;
  }

  if (normalizedPath === '/') {
    return locale === 'ko' ? '/' : `/${locale}`;
  }

  return `${localePrefix}${normalizedPath}`;
}

function normalizeBlogHtmlLinks(content: string, locale: string): string {
  return content.replace(/href=(["'])(\/(?!\/)[^"']*)\1/g, (_match, quote: string, href: string) => {
    const normalizedHref = normalizeInternalHref(href, locale);
    return `href=${quote}${normalizedHref}${quote}`;
  });
}

function getCategoryPath(category: string): string {
  const map: Record<string, string> = {
    gwansang: 'face-reading',
    seongmyeong: 'name-reading',
    bokhap: 'compatibility',
  };
  return map[category] || category;
}

function getAnalysisHref(locale: string, category: string): string {
  const analysisPathMap: Record<string, string> = {
    saju: '/saju-analysis',
    seongmyeong: '/seongmyeong-analysis',
    gwansang: '/gwansang-analysis',
    mbti: '/personality-analysis',
  };

  const path = analysisPathMap[category];
  return path ? buildLocalizedHref(locale, path) : buildLocalizedHref(locale);
}

export default function BlogPostPage({ post, locale }: Props) {
  const isKo = locale === 'ko';
  const baseUrl = 'https://sajupalza.cc';
  const categoryPath = getCategoryPath(post.category);
  const postUrl = buildLocalizedUrl(locale, `/${categoryPath}/${post.slug}`);
  const coverImagePath = getBlogCoverImagePath(locale, categoryPath, post.slug);
  const coverImageUrl = getBlogCoverImageUrl(locale, categoryPath, post.slug);
  const homeHref = buildLocalizedHref(locale);
  const analysisHref = getAnalysisHref(locale, post.category);
  const categoryHref = buildLocalizedHref(locale, `/${categoryPath}`);

  // Choose the visible title. In English mode, fall back to a Korean title if needed.
  const displayTitle = isKo ? (post.seoTitle || post.title) : (post.seoTitleEn || post.title);

  // Choose the localized category label.
  const displayCategory = isKo
    ? (categoryName[post.category]?.ko ?? post.category)
    : (categoryName[post.category]?.en ?? post.category);

  // Choose localized SEO metadata.
  const seoTitle = (isKo ? post.seoTitle : (post.seoTitleEn || post.seoTitle));
  const description = softenBlogMarketingCopy(isKo ? post.description : (post.descriptionEn || post.description));
  const keywords = (isKo ? post.keywords : (post.keywordsEn || post.keywords));
  const toc = (isKo ? post.toc : (post.tocEn || post.toc));
  const faq = (isKo ? post.faq : (post.faqEn || post.faq)).map((item) => ({
    q: item.q,
    a: softenBlogMarketingCopy(item.a),
  }));

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: seoTitle,
    description: description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { '@type': 'Organization', name: isKo ? '사주팔자닷컴' : 'SajuPalza.cc' },
    publisher: {
      '@type': 'Organization',
      name: isKo ? '사주팔자닷컴' : 'SajuPalza.cc',
      url: baseUrl,
    },
    url: postUrl,
    keywords: keywords.join(', '),
    image: [coverImageUrl],
    articleSection: displayCategory,
    inLanguage: locale,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isKo ? '홈' : 'Home', item: buildLocalizedUrl(locale) },
      { '@type': 'ListItem', position: 2, name: displayCategory, item: buildLocalizedUrl(locale, `/${categoryPath}`) },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: postUrl },
    ],
  };

  const faqJsonLd = faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <Navigation />

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Top CTA */}
        <Link href={analysisHref} className="block card-glow p-4 mb-8 text-center hover:opacity-90 transition-opacity">
          <p className="text-yellow-300 font-bold">
            {isKo ? '무료 사주 종합 분석, 생년월일만 입력하면 즉시 전체 결과 확인' : 'Free Saju Analysis - Instant Results with Birth Date'}
          </p>
          <span className="inline-block mt-2 btn-gold text-sm px-6 py-2">
            {isKo ? '지금 무료 분석 받기' : 'Get Free Analysis Now'}
          </span>
        </Link>

        {/* Breadcrumb */}
        <nav className="text-sm text-white/50 mb-4 flex gap-2">
          <Link href={homeHref} className="hover:text-yellow-300">{isKo ? '홈' : 'Home'}</Link>
          <span>/</span>
          <Link href={categoryHref} className="hover:text-yellow-300">
            {displayCategory}
          </Link>
          <span>/</span>
          <span className="text-yellow-300/80">{displayTitle}</span>
        </nav>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-snug">{displayTitle}</h1>

        <div className="mb-8 overflow-hidden rounded-2xl border border-yellow-700/20 bg-black/20">
          <Image
            src={coverImagePath}
            alt={`${displayTitle} cover`}
            width={1200}
            height={630}
            className="w-full h-auto block"
            priority
            unoptimized
          />
        </div>

        <div className="card-dark p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <p className="text-yellow-300 text-xs font-bold uppercase tracking-wider mb-1">
                Editorial Review
              </p>
              <p className="text-white/80 text-sm font-medium">
                {isKo ? '사주팔자닷컴 편집팀' : 'SajuPalza Editorial Team'}
              </p>
              <p className="text-white/50 text-xs mt-1">
                {isKo
                  ? `최종 검토일 ${post.updatedAt ?? post.publishedAt}`
                  : `Last reviewed ${post.updatedAt ?? post.publishedAt}`}
              </p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed md:max-w-md">
              {isKo
                ? '이 글은 전통 해석을 현대 독자 기준으로 정리한 참고 가이드입니다. 본문 표현은 경향성과 해석 중심으로 읽어야 하며, 확정적 보장으로 받아들이지 않는 것이 좋습니다.'
                : 'This guide summarizes traditional interpretation for modern readers. Read the language as tendency-based guidance, not as a guarantee of fixed outcomes.'}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-yellow-700/20 bg-yellow-900/10 px-3 py-1 text-xs text-yellow-200/80">
              {isKo ? '가독성 기준 편집 검토' : 'Editorially reviewed for readability'}
            </span>
            <span className="rounded-full border border-yellow-700/20 bg-yellow-900/10 px-3 py-1 text-xs text-yellow-200/80">
              {isKo ? '전통 해석 기반 참고 콘텐츠' : 'Reference content based on traditional interpretation'}
            </span>
          </div>
        </div>

        {/* Table of contents */}
        {toc.length > 0 && (
          <div className="card-dark p-4 mb-8">
            <p className="text-yellow-300 font-bold mb-3 text-sm">{isKo ? '목차' : 'Table of Contents'}</p>
            <ul className="space-y-1">
              {toc.map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-white/60 hover:text-yellow-300 text-sm transition-colors">
                    • {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* AdSense ?곷떒 */}
        <AdSense slot="1234567890" format="horizontal" className="mb-8" />

        {/* Content */}
        {(() => {
          // Fallback across legacy content field names.
          const content = isKo
            ? (post.contentKo || (post as any).content || (post as any).contentKo)
            : (post.contentEn || post.contentKo || (post as any).content);

          return content ? (
            <div
              className="prose-blog mb-8"
              dangerouslySetInnerHTML={{ __html: normalizeBlogHtmlLinks(softenBlogMarketingCopy(content), locale) }}
            />
          ) : (
            <div className="card-dark p-8 mb-8 text-center text-white/40">
              {isKo ? '콘텐츠 데이터를 불러오는 중입니다...' : 'Loading content data...'}
            </div>
          );
        })()}

        {/* Mid CTA */}
        <div className="card-glow p-6 mb-8 text-center">
          <p className="text-white font-bold text-lg mb-1">
            {isKo ? '내 사주 종합 분석 받아보기' : 'Get Your Comprehensive Saju Analysis'}
          </p>
          <p className="text-white/50 text-sm mb-4">
            {isKo ? '생년월일, 이름, 사진으로 무료 종합 해석 제공' : 'Free integrated consulting with birth date, name, and photo'}
          </p>
          <Link href={analysisHref} className="btn-primary inline-block w-auto px-8 py-3 text-base">
            {isKo ? '무료 종합 분석 시작하기' : 'Get Free Integrated Consulting'}
          </Link>
        </div>

        {/* AdSense 以묐떒 */}
        <AdSense slot="1122334455" format="rectangle" className="mb-8" />

        {/* FAQ */}
        {faq.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-yellow-300 mb-4">{isKo ? '자주 묻는 질문' : 'Frequently Asked Questions'}</h2>
            <div className="space-y-3">
              {faq.map((item, i) => (
                <div key={i} className="card-dark p-4">
                  <p className="text-yellow-400 font-bold mb-2 text-sm">Q. {item.q}</p>
                  <p className="text-white/70 text-sm leading-relaxed">A. {item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related posts */}
        {post.relatedPosts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-base font-bold text-white mb-3">{isKo ? '관련 글 더 보기' : 'Read More Related Posts'}</h3>
            <div className="space-y-2">
              {post.relatedPosts.map(related => (
                <Link
                  key={`${related.category}-${related.slug}`}
                  href={buildLocalizedHref(locale, `/${getCategoryPath(related.category)}/${related.slug}`)}
                  className="block card-dark p-3 hover:border-yellow-600/60 transition-colors text-white/70 hover:text-yellow-300 text-sm"
                >
                  {(() => {
                    const fullPost = getPostBySlug(related.category, related.slug);
                    const relatedTitle = fullPost
                      ? (isKo ? (fullPost.seoTitle || fullPost.title) : (fullPost.seoTitleEn || fullPost.seoTitle || fullPost.title))
                      : related.title;
                    return <>• {relatedTitle}</>;
                  })()}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="card-glow p-6 text-center">
          <p className="shimmer text-xl font-bold mb-2">{isKo ? '지금 바로 무료 분석 시작' : 'Start Free Analysis Now'}</p>
          <p className="text-white/50 text-sm mb-4">
            {isKo ? '사주, 관상, 성명학, MBTI 무료 종합 분석' : 'Free Saju, Face Reading, Numerology, and MBTI Analysis'}
          </p>
          <Link href={analysisHref} className="btn-primary inline-block w-auto px-8 py-3 text-base">
            {isKo ? '무료 분석 시작하기' : 'Start Free Analysis'}
          </Link>
        </div>

      </div>

      <Footer />
    </>
  );
}
