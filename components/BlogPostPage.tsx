import Link from 'next/link';
import AdSense from './AdSense';
import { BlogPost } from '@/lib/blog/types';

const categoryName: Record<string, string> = {
  saju: '사주팔자',
  seongmyeong: '성명학',
  gwansang: '관상학',
  mbti: 'MBTI',
  bokhap: '복합분석',
};

interface Props {
  post: BlogPost;
  locale: string;
}

export default function BlogPostPage({ post, locale }: Props) {
  const baseUrl = 'https://sajupalza.vercel.app';
  const postUrl = `${baseUrl}/${locale}/${post.category}/${post.slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.seoTitle,
    description: post.description,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: '사주팔자닷컴' },
    publisher: { '@type': 'Organization', name: '사주팔자닷컴' },
    url: postUrl,
    keywords: post.keywords.join(', '),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${baseUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: categoryName[post.category], item: `${baseUrl}/${locale}/${post.category}` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };

  const faqJsonLd = post.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map(item => ({
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

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* 상단 CTA 배너 */}
        <Link href={`/${locale}`} className="block card-glow p-4 mb-8 text-center hover:opacity-90 transition-opacity">
          <p className="text-yellow-300 font-bold">✨ 무료 사주 종합 분석 — 생년월일만 입력하면 즉시 전체 결과 공개</p>
          <span className="inline-block mt-2 btn-gold text-sm px-6 py-2">지금 무료 분석 받기 →</span>
        </Link>

        {/* 브레드크럼 */}
        <nav className="text-sm text-white/50 mb-4 flex gap-2">
          <Link href={`/${locale}`} className="hover:text-yellow-300">홈</Link>
          <span>/</span>
          <Link href={`/${locale}/${post.category}`} className="hover:text-yellow-300">{categoryName[post.category]}</Link>
          <span>/</span>
          <span className="text-yellow-300/80">{post.title}</span>
        </nav>

        {/* 제목 + 날짜 */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-snug">{post.title}</h1>
        <p className="text-white/40 text-xs mb-8">{post.publishedAt} · {categoryName[post.category]}</p>

        {/* 목차 */}
        {post.toc.length > 0 && (
          <div className="card-dark p-4 mb-8">
            <p className="text-yellow-300 font-bold mb-3 text-sm">📋 목차</p>
            <ul className="space-y-1">
              {post.toc.map(item => (
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
          const content = locale === 'ko' ? post.contentKo : (post.contentEn || post.contentKo);
          return content ? (
            <div className="prose-blog mb-8" dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <div className="card-dark p-8 mb-8 text-center text-white/40">
              📝 콘텐츠 준비 중입니다.
            </div>
          );
        })()}

        {/* CTA 버튼 */}
        <div className="card-glow p-6 mb-8 text-center">
          <p className="text-white font-bold text-lg mb-1">🔮 나의 사주 종합 분석 받아보기</p>
          <p className="text-white/50 text-sm mb-4">생년월일·이름·사진으로 무료 통합 컨설팅</p>
          <Link href={`/${locale}`} className="btn-primary inline-block w-auto px-8 py-3 text-base">
            무료 통합 컨설팅 받아보기 →
          </Link>
        </div>

        {/* AdSense 중단 */}
        <AdSense slot="2222333344" format="rectangle" className="mb-8" />

        {/* FAQ */}
        {post.faq.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-yellow-300 mb-4">자주 묻는 질문</h2>
            <div className="space-y-3">
              {post.faq.map((item, i) => (
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
            <h3 className="text-base font-bold text-white mb-3">📎 관련 글 더 보기</h3>
            <div className="space-y-2">
              {post.relatedPosts.map(related => (
                <Link
                  key={`${related.category}-${related.slug}`}
                  href={`/${locale}/${related.category}/${related.slug}`}
                  className="block card-dark p-3 hover:border-yellow-600/60 transition-colors text-white/70 hover:text-yellow-300 text-sm"
                >
                  → {related.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 하단 CTA */}
        <div className="card-glow p-6 text-center">
          <p className="shimmer text-xl font-bold mb-2">✨ 지금 바로 무료 분석 시작</p>
          <p className="text-white/50 text-sm mb-4">사주·관상·성명학·MBTI 무료 종합 분석</p>
          <Link href={`/${locale}`} className="btn-primary inline-block w-auto px-8 py-3 text-base">
            무료 분석 시작하기 →
          </Link>
        </div>

      </div>
    </>
  );
}
