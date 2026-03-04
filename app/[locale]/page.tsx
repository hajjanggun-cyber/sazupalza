import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import AdSense from '../../components/AdSense';
import PrivacyStartNotice from '../../components/PrivacyStartNotice';
import Link from 'next/link';
import Image from 'next/image';
import {
  sajuPosts,
  seongmyeongPosts,
  gwansangPosts,
  mbtiPosts,
  bokhapPosts,
} from '../../lib/blog';
import { buildLocaleAlternates } from '../../lib/seo';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isKo = locale === 'ko';
  return {
    title: isKo
      ? '사주팔자 무료 종합 분석 - 관상·성명학·성격유형 | 즉시 결과'
      : 'Free Korean Fortune Reading - Four Pillars, Face Reading, MBTI',
    description: isKo
      ? '사주팔자·관상·성명학·성격유형 완전 무료 분석. 회원가입 없음. 생년월일만 입력하면 즉시 결과!'
      : 'Free Korean Four Pillars, Face Reading, Name Numerology, and Personality analysis. No sign-up required. Instant results!',
    keywords: isKo
      ? ['사주팔자 무료', '무료 사주', '관상 분석', '성명학', '성격유형', '무료 운세']
      : ['Korean fortune reading', 'four pillars free', 'face reading', 'Korean numerology'],
    alternates: buildLocaleAlternates(locale),
  };
}

export default async function HomePage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const isKo = locale === 'ko';

  /* ── SEO 구조화 데이터 ── */
  const baseUrl = 'https://sajupalza.cc';
  const canonicalUrl = locale === 'ko' ? baseUrl : `${baseUrl}/${locale}`;

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: isKo ? '사주팔자 무료 컨설팅' : 'Korean Fortune Reading',
    url: canonicalUrl,
    description: isKo
      ? '사주팔자·관상·성명학·성격유형 완전 무료 종합 분석.'
      : 'Free Korean Four Pillars, Face Reading, Name Numerology, and Personality analysis.',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    inLanguage: locale,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    publisher: {
      '@type': 'Organization',
      name: isKo ? '사주팔자 무료 컨설팅' : 'Korean Fortune Reading',
      url: baseUrl,
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t('faq.q1'), acceptedAnswer: { '@type': 'Answer', text: t('faq.a1') } },
      { '@type': 'Question', name: t('faq.q2'), acceptedAnswer: { '@type': 'Answer', text: t('faq.a2') } },
      { '@type': 'Question', name: t('faq.q3'), acceptedAnswer: { '@type': 'Answer', text: t('faq.a3') } },
    ],
  };

  /* ── 서비스 카드 데이터 ── */
  const serviceCards = [
    {
      icon: '🌟',
      titleKo: '사주팔자 분석',
      titleEn: 'Four Pillars Reading',
      descKo: '생년월일로 보는 오행과 운명의 흐름',
      descEn: 'Elemental constitution from your birth data',
      href: `/${locale}/saju-analysis`,
      color: 'from-amber-900/40 to-yellow-900/20',
      border: 'border-amber-600/30 hover:border-amber-500/60',
      badge: null,
    },
    {
      icon: '👁️',
      titleKo: '관상 분석',
      titleEn: 'Face Reading',
      descKo: '얼굴에 새겨진 재물·건강·성격의 기운',
      descEn: 'Fortune written in your facial features',
      href: `/${locale}/gwansang-analysis`,
      color: 'from-blue-900/40 to-indigo-900/20',
      border: 'border-blue-600/30 hover:border-blue-500/60',
      badge: null,
    },
    {
      icon: '✍️',
      titleKo: '성명학 분석',
      titleEn: 'Name Numerology',
      descKo: '이름 획수와 소리 오행으로 보는 운',
      descEn: 'Fortune encoded in your name\'s strokes & sound',
      href: `/${locale}/seongmyeong-analysis`,
      color: 'from-green-900/40 to-emerald-900/20',
      border: 'border-green-600/30 hover:border-green-500/60',
      badge: null,
    },
    {
      icon: '🧠',
      titleKo: '성격유형 분석',
      titleEn: 'Personality Type',
      descKo: '동양 오행과 연결된 나의 심리 유형',
      descEn: 'Your cognitive type mapped to Eastern elements',
      href: `/${locale}/personality-analysis`,
      color: 'from-purple-900/40 to-violet-900/20',
      border: 'border-purple-600/30 hover:border-purple-500/60',
      badge: null,
    },
  ];

  /* ── 블로그 카테고리 데이터 ── */
  const blogCategories = [
    {
      nameKo: '사주팔자',
      nameEn: 'Saju',
      icon: '🌟',
      path: 'saju',
      posts: sajuPosts,
      colorBg: 'bg-amber-900/20',
      colorBorder: 'border-amber-700/30',
      colorText: 'text-amber-400',
    },
    {
      nameKo: '관상학',
      nameEn: 'Face Reading',
      icon: '👁️',
      path: 'face-reading',
      posts: gwansangPosts,
      colorBg: 'bg-blue-900/20',
      colorBorder: 'border-blue-700/30',
      colorText: 'text-blue-400',
    },
    {
      nameKo: '성명학',
      nameEn: 'Name Numerology',
      icon: '✍️',
      path: 'name-reading',
      posts: seongmyeongPosts,
      colorBg: 'bg-green-900/20',
      colorBorder: 'border-green-700/30',
      colorText: 'text-green-400',
    },
    {
      nameKo: '성격유형',
      nameEn: 'Personality',
      icon: '🧠',
      path: 'mbti',
      posts: mbtiPosts,
      colorBg: 'bg-purple-900/20',
      colorBorder: 'border-purple-700/30',
      colorText: 'text-purple-400',
    },
    {
      nameKo: '종합분석',
      nameEn: 'Combined',
      icon: '🔮',
      path: 'compatibility',
      posts: bokhapPosts,
      colorBg: 'bg-yellow-900/20',
      colorBorder: 'border-yellow-700/30',
      colorText: 'text-yellow-400',
    },
  ];

  const reviews = [
    { name: t('home.r1.name'), text: t('home.r1.text'), rating: 5 },
    { name: t('home.r2.name'), text: t('home.r2.text'), rating: 5 },
    { name: t('home.r3.name'), text: t('home.r3.text'), rating: 4 },
  ];

  return (
    <div className="min-h-screen">
      {/* JSON-LD 구조화 데이터 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <Navigation />

      {/* 상단 광고 */}
      <div className="flex flex-col items-center py-3 bg-[#0d0502]">
        <p className="text-yellow-200/30 text-xs mb-1">{isKo ? '광고' : 'Advertisement'}</p>
        <AdSense slot="1234567890" format="horizontal" className="max-w-full" />
      </div>

      <main>
        {/* ── HERO 섹션 ── */}
        <section className="relative py-12 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/10 to-transparent pointer-events-none" />
          <div className="max-w-3xl mx-auto relative">
            <div className="inline-flex items-center gap-2 bg-yellow-900/40 border border-yellow-600/30 rounded-full px-4 py-2 mb-5 text-sm text-yellow-300">
              <span>🎁</span>
              <span>{t('home.heroBadge')}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-yellow-100 leading-tight mb-4">
              {t('home.heroTitle')}
              <br />
              <span className="text-yellow-400">{t('home.heroSub')}</span>
            </h1>
            <p className="text-yellow-200/70 text-lg mb-6">
              {t('home.heroDesc')}
            </p>
            {/* 신뢰 지표 */}
            <div className="flex justify-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2 text-yellow-300"><span className="text-xl">🆓</span><span>{t('trust.free')}</span></div>
              <div className="flex items-center gap-2 text-yellow-300"><span className="text-xl">🔒</span><span>{t('trust.privacy')}</span></div>
              <div className="flex items-center gap-2 text-yellow-300"><span className="text-xl">⚡</span><span>{t('trust.instant')}</span></div>
            </div>
          </div>
        </section>

        {/* ── 福 배너 이미지 ── */}
        <section className="max-w-3xl mx-auto px-4 pb-8">
          <PrivacyStartNotice locale={locale} />
          <div className="mt-4 text-center">
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 rounded-full border border-yellow-700/30 bg-yellow-900/10 px-4 py-2 text-sm font-medium text-yellow-200/80 hover:text-yellow-100 hover:border-yellow-500/40 transition-colors"
            >
              <span>{isKo ? '편집 기준과 운영 원칙 확인' : 'Review Our Editorial Policy'}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 mb-8 rounded-2xl overflow-hidden">
          <Image
            src="/hero-banner.jpg"
            alt={isKo ? '복(福) — 사주팔자 종합 분석' : 'Fortune (福) — Korean Fortune Reading'}
            width={1200}
            height={450}
            className="w-full object-cover"
            priority
          />
        </div>

        {/* ── 분석 유형 선택 섹션 ── */}
        <section className="max-w-5xl mx-auto px-4 pb-4">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-2">
            {isKo ? '어떤 분석을 원하시나요?' : 'Choose Your Analysis'}
          </h2>
          <p className="text-center text-yellow-200/60 text-sm mb-8">
            {isKo
              ? '각 항목을 단독으로, 또는 4가지를 한 번에 통합 분석할 수 있습니다'
              : 'Explore each analysis individually or get all 4 in one combined reading'}
          </p>

          {/* 개별 분석 카드 4개 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {serviceCards.map((card) => (
              <Link key={card.titleKo} href={card.href}>
                <div className={`relative rounded-xl border p-5 bg-gradient-to-br ${card.color} ${card.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-900/20 cursor-pointer h-full`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-3xl">{card.icon}</div>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-yellow-300/80">
                      {isKo ? '확인' : 'Check'}
                    </span>
                  </div>
                  <h3 className="text-yellow-100 font-bold text-base mb-1">
                    {isKo ? card.titleKo : card.titleEn}
                  </h3>
                  <p className="text-yellow-200/60 text-xs leading-relaxed">
                    {isKo ? card.descKo : card.descEn}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* 통합 분석 CTA (강조) */}
          <Link href={`/${locale}/combined`}>
            <div className="relative rounded-xl border border-yellow-500/50 hover:border-yellow-400/80 p-6 bg-gradient-to-r from-yellow-900/50 to-amber-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-900/30 cursor-pointer">
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="text-5xl">⭐</div>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/40 rounded-full px-3 py-1 text-xs text-yellow-300 mb-2">
                    {isKo ? '🏆 가장 정확한 분석' : '🏆 Most Accurate'}
                  </div>
                  <h3 className="text-yellow-100 font-bold text-xl mb-1">
                    {isKo ? '4가지 통합 분석 (추천)' : 'Combined 4-in-1 Analysis (Recommended)'}
                  </h3>
                  <p className="text-yellow-200/70 text-sm">
                    {isKo
                      ? '사주팔자 + 관상 + 성명학 + 성격유형을 한 번에 입력하고, 가장 입체적인 운명 분석 결과를 받으세요'
                      : 'Enter all data once and receive the most comprehensive fate analysis combining all four systems'}
                  </p>
                </div>
                <div className="md:self-center">
                  <span className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg transition-colors text-sm whitespace-nowrap">
                    {isKo ? '지금 시작하기 →' : 'Start Now →'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* ── 블로그 카테고리 섹션 ── */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-2">
            {isKo ? '📚 운명을 읽는 지식 라이브러리' : '📚 Knowledge Library'}
          </h2>
          <p className="text-center text-yellow-200/60 text-sm mb-8">
            {isKo
              ? '전문 칼럼니스트가 작성한 30개 심층 아티클 — 분석 전에 읽어보세요'
              : '30 in-depth articles by expert columnists — read before your analysis'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {blogCategories.map((cat) => {
              const representativePost = cat.posts[0];
              const secondPost = cat.posts[1];
              return (
                <div key={cat.path} className={`rounded-xl border ${cat.colorBorder} ${cat.colorBg} p-4 flex flex-col`}>
                  {/* 카테고리 헤더 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{cat.icon}</span>
                      <span className={`font-bold text-sm ${cat.colorText}`}>
                        {isKo ? cat.nameKo : cat.nameEn}
                      </span>
                    </div>
                    <span className="text-yellow-200/40 text-xs">
                      {cat.posts.length}{isKo ? '편' : ' posts'}
                    </span>
                  </div>

                  {/* 대표글 1 */}
                  {representativePost && (
                    <Link
                      href={`/${locale}/${cat.path}/${representativePost.slug}`}
                      className="text-yellow-200/80 hover:text-yellow-300 text-xs leading-relaxed mb-2 line-clamp-2 transition-colors"
                    >
                      · {isKo ? representativePost.seoTitle : representativePost.seoTitleEn}
                    </Link>
                  )}
                  {/* 대표글 2 */}
                  {secondPost && (
                    <Link
                      href={`/${locale}/${cat.path}/${secondPost.slug}`}
                      className="text-yellow-200/60 hover:text-yellow-300 text-xs leading-relaxed mb-3 line-clamp-2 transition-colors"
                    >
                      · {isKo ? secondPost.seoTitle : secondPost.seoTitleEn}
                    </Link>
                  )}

                  {/* 전체 보기 */}
                  <div className="mt-auto">
                    <Link
                      href={`/${locale}/${cat.path}`}
                      className={`inline-flex items-center gap-1 text-xs ${cat.colorText} hover:opacity-80 transition-opacity font-medium`}
                    >
                      {isKo ? '전체 보기' : 'View all'} →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 샘플 결과 미리보기 ── */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-6">
            {t('home.previewTitle')}
          </h2>
          <div className="card-dark p-6 relative overflow-hidden">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-yellow-200/80 text-sm">{t('home.previewScore')}</span>
                <span className="text-yellow-400 font-bold text-2xl">82점</span>
              </div>
              {[t('result.saju'), t('result.name'), t('result.face'), isKo ? '성격유형' : 'Personality'].map((item, i) => (
                <div key={item} className="mb-2">
                  <div className="flex justify-between text-xs text-yellow-200/60 mb-1">
                    <span>{item}</span>
                    <span>{[85, 78, 80, 82][i]}점</span>
                  </div>
                  <div className="score-bar">
                    <div className="score-fill" style={{ width: `${[85, 78, 80, 82][i]}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-yellow-200/70 text-sm space-y-2 border-t border-yellow-900/30 pt-4">
              <p>{isKo ? '일간: 경금(庚金) | 월지: 계묘(癸卯)' : 'Day Stem: Gyeong-Metal(庚金) | Month: Gye-Myo(癸卯)'}</p>
              <p>{isKo ? '수리: 원격28수(길) / 형격15수(대길)' : 'Suri: Won-Gyeok 28(Good) / Hyeong-Gyeok 15(Great)'}</p>
              <p>{isKo ? '소리오행: 목-금-수 (상생) · 수호신: 백호 🐯' : 'Elements: Wood-Metal-Water (Harmonious) · Guardian: White Tiger 🐯'}</p>
              <p className="text-yellow-400 font-medium">{t('home.previewNote')}</p>
            </div>
            {/* 분석 시작 CTA */}
            <div className="mt-6 text-center">
              <Link
                href={`/${locale}/combined`}
                className="inline-block bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-yellow-900/30 hover:-translate-y-0.5"
              >
                {isKo ? '✨ 나도 분석받기 →' : '✨ Get My Reading →'}
              </Link>
            </div>
          </div>
        </section>

        {/* ── 사용자 후기 ── */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-6">
            {t('home.reviewsTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((review, i) => (
              <div key={i} className="card-dark p-5">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }, (_, j) => (
                    <span key={j} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-yellow-200/80 text-sm mb-3">&ldquo;{review.text}&rdquo;</p>
                <p className="text-yellow-200/50 text-xs">{review.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 하단 광고 */}
        <div className="flex flex-col items-center py-4">
          <p className="text-yellow-200/30 text-xs mb-1">{isKo ? '광고' : 'Advertisement'}</p>
          <AdSense slot="1122334455" format="rectangle" />
        </div>

        {/* ── FAQ 섹션 ── */}
        <section className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
            {t('faq.title')}
          </h2>
          <div className="space-y-4">
            {[
              { q: t('faq.q1'), a: t('faq.a1') },
              { q: t('faq.q2'), a: t('faq.a2') },
              { q: t('faq.q3'), a: t('faq.a3') },
            ].map((faq, i) => (
              <details key={i} className="card-dark p-5 group cursor-pointer">
                <summary className="text-yellow-200 font-medium text-base list-none flex justify-between items-center">
                  Q. {faq.q}
                  <span className="text-yellow-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-yellow-200/70 text-sm leading-relaxed">A. {faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
