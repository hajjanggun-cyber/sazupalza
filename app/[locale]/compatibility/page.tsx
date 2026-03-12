import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Footer from '../../../components/Footer';
import AdSense from '../../../components/AdSense';
import Link from 'next/link';
import { bokhapPosts } from '@/lib/blog/bokhap-posts';

const BASE_URL = 'https://sajupalza.cc';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isKo = locale === 'ko';
  const localePrefix = locale === 'ko' ? '' : `/${locale}`;
  const canonical = `${BASE_URL}${localePrefix}/compatibility`;
  return {
    title: isKo
      ? '종합 운명 분석 - 사주·관상·성명학·MBTI 통합 가이드 | 사주팔자 무료 컨설팅'
      : 'Combined Fortune Analysis - Four Pillars, Face Reading, Name & MBTI Guide | SajuPalza',
    description: isKo
      ? '사주팔자·관상·성명학·MBTI를 통합적으로 이해하는 심층 분석 아티클. 손금, 천생연분, 네 가지 분석법의 공통점과 차이점을 전문가 시각으로 풀어드립니다.'
      : 'In-depth articles integrating Four Pillars, Face Reading, Name Reading, and MBTI. Expert analysis on palm reading, soulmates, and comprehensive fortune systems.',
    keywords: isKo
      ? ['종합 운명 분석', '사주 MBTI', '천생연분', '손금 관상', '운명 통합 분석']
      : ['combined fortune analysis', 'Four Pillars MBTI', 'soulmate destiny', 'palm reading', 'comprehensive fate analysis'],
    alternates: {
      canonical,
      languages: {
        ko: `${BASE_URL}/compatibility`,
        en: `${BASE_URL}/en/compatibility`,
        'x-default': `${BASE_URL}/compatibility`,
      },
    },
  };
}

export default async function CompatibilityPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const isKo = locale === 'ko';

  const localePrefix = locale === 'ko' ? '' : `/${locale}`;
  const canonicalUrl = `${BASE_URL}${localePrefix}/compatibility`;

  const analysisTypes = isKo
    ? [
      { icon: '🌟', title: '사주팔자', desc: '생년월일시로 알아보는 타고난 운명의 기운' },
      { icon: '👁️', title: '관상·손금', desc: '얼굴과 손에 새겨진 성향과 기운의 흐름' },
      { icon: '✍️', title: '성명학', desc: '이름 획수와 소리오행으로 보는 이름의 기운' },
      { icon: '🧠', title: 'MBTI·성격유형', desc: '동양 오행과 연결된 심리 유형의 이해' },
    ]
    : [
      { icon: '🌟', title: 'Four Pillars', desc: 'Innate destiny energy from birth date and time' },
      { icon: '👁️', title: 'Face & Palm Reading', desc: 'Energy flow inscribed in face and hands' },
      { icon: '✍️', title: 'Name Numerology', desc: 'Name energy through stroke count and sound elements' },
      { icon: '🧠', title: 'MBTI & Personality', desc: 'Psychological types connected to Eastern Five Elements' },
    ];

  const faqs = isKo
    ? [
      { q: '네 가지 분석법을 함께 보는 이유가 무엇인가요?', a: '사주, 관상, 성명학, MBTI는 각각 다른 각도에서 한 사람의 기질과 운을 분석합니다. 하나의 분석법만으로는 놓칠 수 있는 부분을 나머지 세 가지가 보완해주어, 통합적으로 볼 때 가장 입체적인 이해가 가능합니다.' },
      { q: '손금은 사주팔자와 어떤 관계가 있나요?', a: '손금(수상학)은 관상학의 한 분야로, 손에 나타난 선을 통해 성격과 운세를 읽습니다. 사주의 일간 오행과 손금의 기운을 함께 분석하면 더욱 정확한 해석이 가능합니다.' },
      { q: '천생연분은 어떻게 알 수 있나요?', a: '사주의 일주와 배우자 궁, MBTI의 상호 보완적 유형을 함께 분석하면 인연의 방향성을 파악할 수 있습니다. 다만 운명적 만남은 노력과 선택으로도 만들어갈 수 있습니다.' },
    ]
    : [
      { q: 'Why look at all four analysis methods together?', a: 'Four Pillars, Face Reading, Name Reading, and MBTI each analyze a person\'s character and fortune from different angles. What one method misses, the others compensate, creating the most comprehensive understanding when viewed together.' },
      { q: 'How does palm reading relate to Four Pillars?', a: 'Palm reading is a branch of physiognomy that reads character and fortune through hand lines. Analyzing the Day Stem element alongside palm reading energy provides more accurate interpretation.' },
      { q: 'How can I find my soulmate destiny?', a: 'Analyzing the Day Pillar and spouse palace in Four Pillars together with complementary MBTI types helps identify the direction of your romantic destiny. However, meaningful connections can also be built through effort and choice.' },
    ];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    headline: isKo ? '종합 운명 분석 - 사주·관상·성명학·MBTI 통합 가이드' : 'Combined Fortune Analysis Guide',
    url: canonicalUrl,
    inLanguage: locale,
    author: { '@type': 'Organization', name: '사주팔자 무료 컨설팅' },
    publisher: { '@type': 'Organization', name: '사주팔자 무료 컨설팅', url: BASE_URL },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isKo ? '홈' : 'Home', item: `${BASE_URL}${localePrefix}` },
      { '@type': 'ListItem', position: 2, name: isKo ? '종합분석' : 'Combined Analysis', item: canonicalUrl },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="pt-16">
        <section className="relative py-14 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-5xl mb-4">🔮</div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-100 mb-4">
              {isKo ? '종합 운명 분석' : 'Combined Fortune Analysis'}
            </h1>
            <p className="text-yellow-200/70 text-lg mb-6 leading-relaxed">
              {isKo
                ? '사주팔자·관상·성명학·MBTI를 통합적으로 이해하는 심층 가이드\n네 가지 분석법이 교차하는 지점에서 가장 정확한 운명의 그림이 완성됩니다'
                : 'In-depth guide integrating Four Pillars, Face Reading, Name Reading, and MBTI\nA broader reading emerges when you compare all four systems together'}
            </p>
            <Link href={`/${locale}/combined`} className="btn-gold text-lg px-8 py-4">
              {isKo ? '4가지 통합 분석 시작 →' : 'Start Combined Analysis →'}
            </Link>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
            {isKo ? '4가지 분석법의 역할' : 'Role of Each Analysis Method'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisTypes.map((item) => (
              <div key={item.title} className="card-dark p-5 flex items-start gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="text-yellow-400 font-bold mb-2">{item.title}</h3>
                  <p className="text-yellow-200/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-center px-4 pb-8">
          <AdSense slot="2233445567" format="rectangle" />
        </div>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-center text-yellow-400 mb-5">
            {isKo ? '종합 분석 심층 아티클' : 'Combined Analysis Articles'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bokhapPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/compatibility/${post.slug}`}
                className="card-dark p-4 flex items-center justify-between group border border-transparent hover:border-yellow-500/40 transition-colors"
              >
                <span className="text-yellow-200/80 text-sm leading-snug">{isKo ? (post.seoTitle || post.title) : (post.seoTitleEn || post.title)}</span>
                <span className="text-yellow-500 ml-3 shrink-0 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
            {isKo ? '자주 묻는 질문' : 'FAQ'}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="card-dark p-5 group cursor-pointer">
                <summary className="text-yellow-200 font-medium list-none flex justify-between items-center">
                  Q. {faq.q}
                  <span className="text-yellow-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-yellow-200/70 text-sm leading-relaxed">A. {faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-xl mx-auto px-4 pb-16 text-center">
          <div className="card-dark p-8">
            <p className="text-yellow-200/80 mb-2">
              {isKo ? '✅ 4가지 분석을 한 번에 무료로 받아보세요' : '✅ Get all 4 analyses at once for free'}
            </p>
            <p className="text-yellow-200/60 text-sm mb-6">
              {isKo ? '사주 + 관상 + 성명학 + MBTI 통합 분석' : 'Four Pillars + Face Reading + Name + MBTI combined'}
            </p>
            <Link href={`/${locale}/combined`} className="btn-gold text-lg px-8 py-4 inline-block">
              {isKo ? '통합 분석 시작하기 →' : 'Start Combined Analysis →'}
            </Link>
          </div>
        </section>

        <div className="flex justify-center py-4">
          <AdSense slot="3344556678" format="rectangle" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
