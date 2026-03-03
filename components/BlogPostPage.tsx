import Link from 'next/link';
import AdSense from './AdSense';
import Navigation from './Navigation';
import Footer from './Footer';
import { BlogPost, getPostBySlug } from '@/lib/blog';

const categoryName: Record<string, Record<string, string>> = {
  saju: { ko: '사주팔자', en: 'Four Pillars' },
  seongmyeong: { ko: '성명학', en: 'Name Reading' },
  'name-reading': { ko: '성명학', en: 'Name Reading' },
  gwansang: { ko: '관상학', en: 'Face Reading' },
  'face-reading': { ko: '관상학', en: 'Face Reading' },
  mbti: { ko: 'MBTI', en: 'MBTI' },
  bokhap: { ko: '복합분석', en: 'Compatibility' },
  compatibility: { ko: '궁합분석', en: 'Compatibility' },
};

interface Props {
  post: BlogPost;
  locale: string;
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
  const localePrefix = locale === 'ko' ? '' : '/en';
  const postUrl = `${baseUrl}${localePrefix}/${categoryPath}/${post.slug}`;

  // 언어별 제목 선택 (본문용)
  // 영문 모드일 때 seoTitleEn이 없으면 최소한 영문 텍스트를 출력하도록 보강
  const displayTitle = isKo ? (post.seoTitle || post.title) : (post.seoTitleEn || post.title);

  // 언어별 카테고리명 선택
  const displayCategory = isKo
    ? (categoryName[post.category]?.ko ?? post.category)
    : (categoryName[post.category]?.en ?? post.category);

  // 언어별 메타데이터 선택
  const seoTitle = (isKo ? post.seoTitle : (post.seoTitleEn || post.seoTitle));
  const description = (isKo ? post.description : (post.descriptionEn || post.description));
  const keywords = (isKo ? post.keywords : (post.keywordsEn || post.keywords));
  const toc = (isKo ? post.toc : (post.tocEn || post.toc));
  const faq = (isKo ? post.faq : (post.faqEn || post.faq));

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: seoTitle,
    description: description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { '@type': 'Organization', name: isKo ? '사주팔자닷컴' : 'SajuPalza.cc' },
    publisher: { '@type': 'Organization', name: isKo ? '사주팔자닷컴' : 'SajuPalza.cc' },
    url: postUrl,
    keywords: keywords.join(', '),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isKo ? '홈' : 'Home', item: `${baseUrl}${localePrefix}` },
      { '@type': 'ListItem', position: 2, name: displayCategory, item: `${baseUrl}${localePrefix}/${categoryPath}` },
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

        {/* 상단 CTA 배너 */}
        <Link href={`/${locale}`} className="block card-glow p-4 mb-8 text-center hover:opacity-90 transition-opacity">
          <p className="text-yellow-300 font-bold">
            {isKo ? '✨ 무료 사주 종합 분석 — 생년월일만 입력하면 즉시 전체 결과 공개' : '✨ Free Saju Analysis — Instant Results with Birth Date'}
          </p>
          <span className="inline-block mt-2 btn-gold text-sm px-6 py-2">
            {isKo ? '지금 무료 분석 받기 →' : 'Get Free Analysis Now →'}
          </span>
        </Link>

        {/* 브레드크럼 */}
        <nav className="text-sm text-white/50 mb-4 flex gap-2">
          <Link href={`/${locale}`} className="hover:text-yellow-300">{isKo ? '홈' : 'Home'}</Link>
          <span>/</span>
          <Link href={`/${locale}/${categoryPath}`} className="hover:text-yellow-300">
            {displayCategory}
          </Link>
          <span>/</span>
          <span className="text-yellow-300/80">{displayTitle}</span>
        </nav>

        {/* 제목 */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-snug">{displayTitle}</h1>

        {/* 목차 */}
        {toc.length > 0 && (
          <div className="card-dark p-4 mb-8">
            <p className="text-yellow-300 font-bold mb-3 text-sm">{isKo ? '📋 목차' : '📋 Table of Contents'}</p>
            <ul className="space-y-1">
              {toc.map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-white/60 hover:text-yellow-300 text-sm transition-colors">
                    · {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* AdSense 상단 */}
        <AdSense slot="1111222233" format="horizontal" className="mb-8" />

        {/* 본문 */}
        {(() => {
          // 데이터 유실 방지를 위한 3중 필터
          const content = isKo
            ? (post.contentKo || (post as any).content || (post as any).contentKo)
            : (post.contentEn || post.contentKo || (post as any).content);

          return content ? (
            <div className="prose-blog mb-8" dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <div className="card-dark p-8 mb-8 text-center text-white/40">
              {isKo ? '📝 콘텐츠 데이터를 불러오는 중입니다...' : '📝 Loading content data...'}
            </div>
          );
        })()}

        {/* CTA 버튼 */}
        <div className="card-glow p-6 mb-8 text-center">
          <p className="text-white font-bold text-lg mb-1">
            {isKo ? '🔮 나의 사주 종합 분석 받아보기' : '🔮 Get Your Comprehensive Saju Analysis'}
          </p>
          <p className="text-white/50 text-sm mb-4">
            {isKo ? '생년월일·이름·사진으로 무료 통합 컨설팅' : 'Free integrated consulting with birth date, name, and photo'}
          </p>
          <Link href={`/${locale}`} className="btn-primary inline-block w-auto px-8 py-3 text-base">
            {isKo ? '무료 통합 컨설팅 받아보기 →' : 'Get Free Integrated Consulting →'}
          </Link>
        </div>

        {/* AdSense 중단 */}
        <AdSense slot="2222333344" format="rectangle" className="mb-8" />

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

        {/* 관련 글 */}
        {post.relatedPosts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-base font-bold text-white mb-3">{isKo ? '📎 관련 글 더 보기' : '📎 Read More Related Posts'}</h3>
            <div className="space-y-2">
              {post.relatedPosts.map(related => (
                <Link
                  key={`${related.category}-${related.slug}`}
                  href={`/${locale}/${getCategoryPath(related.category)}/${related.slug}`}
                  className="block card-dark p-3 hover:border-yellow-600/60 transition-colors text-white/70 hover:text-yellow-300 text-sm"
                >
                  {(() => {
                    const fullPost = getPostBySlug(related.category, related.slug);
                    const relatedTitle = fullPost
                      ? (isKo ? (fullPost.seoTitle || fullPost.title) : (fullPost.seoTitleEn || fullPost.seoTitle || fullPost.title))
                      : related.title;
                    return <>→ {relatedTitle}</>;
                  })()}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 하단 CTA */}
        <div className="card-glow p-6 text-center">
          <p className="shimmer text-xl font-bold mb-2">{isKo ? '✨ 지금 바로 무료 분석 시작' : '✨ Start Free Analysis Now'}</p>
          <p className="text-white/50 text-sm mb-4">
            {isKo ? '사주·관상·성명학·MBTI 무료 종합 분석' : 'Free Saju, Face Reading, Numerology, and MBTI Analysis'}
          </p>
          <Link href={`/${locale}`} className="btn-primary inline-block w-auto px-8 py-3 text-base">
            {isKo ? '무료 분석 시작하기 →' : 'Start Free Analysis →'}
          </Link>
        </div>

      </div>

      <Footer />
    </>
  );
}
