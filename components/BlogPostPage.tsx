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
  saju: { ko: '?ъ＜?붿옄', en: 'Four Pillars' },
  seongmyeong: { ko: 'Name Reading', en: 'Name Reading' },
  'name-reading': { ko: 'Name Reading', en: 'Name Reading' },
  gwansang: { ko: '愿?곹븰', en: 'Face Reading' },
  'face-reading': { ko: '愿?곹븰', en: 'Face Reading' },
  mbti: { ko: 'MBTI', en: 'MBTI' },
  bokhap: { ko: '蹂듯빀遺꾩꽍', en: 'Compatibility' },
  compatibility: { ko: '沅곹빀遺꾩꽍', en: 'Compatibility' },
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

export default function BlogPostPage({ post, locale }: Props) {
  const isKo = locale === 'ko';
  const baseUrl = 'https://sajupalza.cc';
  const categoryPath = getCategoryPath(post.category);
  const postUrl = buildLocalizedUrl(locale, `/${categoryPath}/${post.slug}`);
  const coverImagePath = getBlogCoverImagePath(locale, categoryPath, post.slug);
  const coverImageUrl = getBlogCoverImageUrl(locale, categoryPath, post.slug);
  const homeHref = buildLocalizedHref(locale);
  const categoryHref = buildLocalizedHref(locale, `/${categoryPath}`);

  // ?몄뼱蹂??쒕ぉ ?좏깮 (蹂몃Ц??
  // ?곷Ц 紐⑤뱶????seoTitleEn???놁쑝硫?理쒖냼???곷Ц ?띿뒪?몃? 異쒕젰?섎룄濡?蹂닿컯
  const displayTitle = isKo ? (post.seoTitle || post.title) : (post.seoTitleEn || post.title);

  // ?몄뼱蹂?移댄뀒怨좊━紐??좏깮
  const displayCategory = isKo
    ? (categoryName[post.category]?.ko ?? post.category)
    : (categoryName[post.category]?.en ?? post.category);

  // ?몄뼱蹂?硫뷀??곗씠???좏깮
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
    author: { '@type': 'Organization', name: isKo ? '?ъ＜?붿옄?룹뺨' : 'SajuPalza.cc' },
    publisher: {
      '@type': 'Organization',
      name: isKo ? '?ъ＜?붿옄?룹뺨' : 'SajuPalza.cc',
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: buildLocalizedUrl(locale) },
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

        {/* ?곷떒 CTA 諛곕꼫 */}
        <Link href={homeHref} className="block card-glow p-4 mb-8 text-center hover:opacity-90 transition-opacity">
          <p className="text-yellow-300 font-bold">
            {isKo ? '??臾대즺 ?ъ＜ 醫낇빀 遺꾩꽍 ???앸뀈?붿씪留??낅젰?섎㈃ 利됱떆 ?꾩껜 寃곌낵 怨듦컻' : '??Free Saju Analysis ??Instant Results with Birth Date'}
          </p>
          <span className="inline-block mt-2 btn-gold text-sm px-6 py-2">
            {isKo ? 'Get Free Analysis Now' : 'Get Free Analysis Now'}
          </span>
        </Link>

        {/* 釉뚮젅?쒗겕??*/}
        <nav className="text-sm text-white/50 mb-4 flex gap-2">
          <Link href={homeHref} className="hover:text-yellow-300">{isKo ? 'Home' : 'Home'}</Link>
          <span>/</span>
          <Link href={categoryHref} className="hover:text-yellow-300">
            {displayCategory}
          </Link>
          <span>/</span>
          <span className="text-yellow-300/80">{displayTitle}</span>
        </nav>

        {/* ?쒕ぉ */}
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
                {isKo ? '?ъ＜?붿옄?룹뺨 ?몄쭛?' : 'SajuPalza Editorial Team'}
              </p>
              <p className="text-white/50 text-xs mt-1">
                {isKo
                  ? `理쒖쥌 寃?좎씪 ${post.updatedAt ?? post.publishedAt}`
                  : `Last reviewed ${post.updatedAt ?? post.publishedAt}`}
              </p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed md:max-w-md">
              {isKo
                ? '??湲? ?꾪넻 ?댁꽍 媛쒕뀗???꾨??곸쑝濡??뺣━??李멸퀬 媛?대뱶?낅땲?? 蹂몃Ц ?쒗쁽? 寃쏀뼢?깃낵 ?댁꽍 以묒떖?쇰줈 ?쎌뼱???섎ŉ ?뺤젙??蹂댁옣?쇰줈 諛쏆븘?ㅼ씠吏 ?딅뒗 寃껋씠 醫뗭뒿?덈떎.'
                : 'This guide summarizes traditional interpretation for modern readers. Read the language as tendency-based guidance, not as a guarantee of fixed outcomes.'}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-yellow-700/20 bg-yellow-900/10 px-3 py-1 text-xs text-yellow-200/80">
              {isKo ? 'Editorially reviewed for readability' : 'Editorially reviewed for readability'}
            </span>
            <span className="rounded-full border border-yellow-700/20 bg-yellow-900/10 px-3 py-1 text-xs text-yellow-200/80">
              {isKo ? 'Reference content based on traditional interpretation' : 'Reference content based on traditional interpretation'}
            </span>
          </div>
        </div>

        {/* 紐⑹감 */}
        {toc.length > 0 && (
          <div className="card-dark p-4 mb-8">
            <p className="text-yellow-300 font-bold mb-3 text-sm">{isKo ? '?뱥 紐⑹감' : '?뱥 Table of Contents'}</p>
            <ul className="space-y-1">
              {toc.map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-white/60 hover:text-yellow-300 text-sm transition-colors">
                    쨌 {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* AdSense ?곷떒 */}
        <AdSense slot="1111222233" format="horizontal" className="mb-8" />

        {/* 蹂몃Ц */}
        {(() => {
          // ?곗씠???좎떎 諛⑹?瑜??꾪븳 3以??꾪꽣
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
              {isKo ? '?뱷 肄섑뀗痢??곗씠?곕? 遺덈윭?ㅻ뒗 以묒엯?덈떎...' : '?뱷 Loading content data...'}
            </div>
          );
        })()}

        {/* CTA 踰꾪듉 */}
        <div className="card-glow p-6 mb-8 text-center">
          <p className="text-white font-bold text-lg mb-1">
            {isKo ? '?뵰 ?섏쓽 ?ъ＜ 醫낇빀 遺꾩꽍 諛쏆븘蹂닿린' : '?뵰 Get Your Comprehensive Saju Analysis'}
          </p>
          <p className="text-white/50 text-sm mb-4">
            {isKo ? 'Free integrated consulting with birth date, name, and photo' : 'Free integrated consulting with birth date, name, and photo'}
          </p>
          <Link href={homeHref} className="btn-primary inline-block w-auto px-8 py-3 text-base">
            {isKo ? 'Get Free Integrated Consulting' : 'Get Free Integrated Consulting'}
          </Link>
        </div>

        {/* AdSense 以묐떒 */}
        <AdSense slot="2222333344" format="rectangle" className="mb-8" />

        {/* FAQ */}
        {faq.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-yellow-300 mb-4">{isKo ? '?먯＜ 臾삳뒗 吏덈Ц' : 'Frequently Asked Questions'}</h2>
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

        {/* 愿??湲 */}
        {post.relatedPosts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-base font-bold text-white mb-3">{isKo ? '?뱨 愿??湲 ??蹂닿린' : '?뱨 Read More Related Posts'}</h3>
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
                    return <>??{relatedTitle}</>;
                  })()}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ?섎떒 CTA */}
        <div className="card-glow p-6 text-center">
          <p className="shimmer text-xl font-bold mb-2">{isKo ? '??吏湲?諛붾줈 臾대즺 遺꾩꽍 ?쒖옉' : '??Start Free Analysis Now'}</p>
          <p className="text-white/50 text-sm mb-4">
            {isKo ? '?ъ＜쨌愿?겶룹꽦紐낇븰쨌MBTI 臾대즺 醫낇빀 遺꾩꽍' : 'Free Saju, Face Reading, Numerology, and MBTI Analysis'}
          </p>
          <Link href={homeHref} className="btn-primary inline-block w-auto px-8 py-3 text-base">
            {isKo ? 'Start Free Analysis' : 'Start Free Analysis'}
          </Link>
        </div>

      </div>

      <Footer />
    </>
  );
}
