import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import AdSense from '../../../components/AdSense';
import Link from 'next/link';
import { sajuPosts } from '@/lib/blog/saju-posts';
import { buildLocalizedHref } from '@/lib/seo';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isKo = locale === 'ko';
  const BASE_URL = 'https://sajupalza.cc';
  const canonical = isKo ? `${BASE_URL}/saju` : `${BASE_URL}/en/saju`;
  return {
    title: isKo
      ? '2026 무료 사주 분석 | 생년월일로 보는 내 운세·직업운·연애운'
      : 'Free Korean Four Pillars of Destiny Analysis | SajuPalza',
    description: isKo
      ? '생년월일시를 바탕으로 2026 무료 사주 분석을 확인하세요. 내 사주팔자의 오행, 일간, 직업운, 재물운, 연애운 흐름을 쉽게 볼 수 있습니다.'
      : 'Free Korean Four Pillars of Destiny (Saju Palza) analysis. Discover your innate characteristics, career, wealth, love, and health fortune based on birth date and time.',
    keywords: isKo
      ? ['2026 무료 사주', '사주팔자 무료', '사주 분석', '직업운', '연애운', '생년월일 운세']
      : ['Korean Four Pillars', 'Saju Palza', 'Korean fortune reading free', 'Four Pillars of Destiny'],
    openGraph: {
      title: isKo ? '2026 무료 사주 분석' : 'Free Korean Four Pillars Analysis',
      description: isKo ? '생년월일로 보는 내 운세·직업운·연애운' : 'Discover your destiny through birth date analysis',
    },
    alternates: {
      canonical,
      languages: {
        ko: `${BASE_URL}/saju`,
        en: `${BASE_URL}/en/saju`,
        'x-default': `${BASE_URL}/saju`,
      },
    },
  };
}

export default async function SajuPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const isKo = locale === 'ko';
  const localePrefix = locale === 'ko' ? '' : '/en';

  const pillars = isKo
    ? [
      { name: '년주(年柱)', desc: '타고난 기질과 조상의 기운, 사회적 성향을 나타냅니다', icon: '🌱' },
      { name: '월주(月柱)', desc: '부모와의 관계, 성장 환경, 직업적 재능을 나타냅니다', icon: '🌿' },
      { name: '일주(日柱)', desc: '나 자신의 본질적인 특성, 배우자 인연을 나타냅니다', icon: '🌸' },
      { name: '시주(時柱)', desc: '자녀 운, 말년의 모습, 삶의 결실을 나타냅니다', icon: '🍂' },
    ]
    : [
      { name: 'Year Pillar', desc: 'Represents innate temperament, ancestral energy, and social tendencies', icon: '🌱' },
      { name: 'Month Pillar', desc: 'Represents parental relationships, growth environment, and career talents', icon: '🌿' },
      { name: 'Day Pillar', desc: 'Represents your essential self and destiny with a partner', icon: '🌸' },
      { name: 'Hour Pillar', desc: 'Represents children, later life, and life achievements', icon: '🍂' },
    ];

  const fiveElements = isKo
    ? [
      { name: '목(木)', color: 'text-green-400', desc: '성장, 창의, 인자함의 기운' },
      { name: '화(火)', color: 'text-red-400', desc: '열정, 표현, 예의의 기운' },
      { name: '토(土)', color: 'text-yellow-500', desc: '균형, 신뢰, 포용의 기운' },
      { name: '금(金)', color: 'text-gray-300', desc: '원칙, 결단, 의리의 기운' },
      { name: '수(水)', color: 'text-blue-400', desc: '지혜, 유연, 학문의 기운' },
    ]
    : [
      { name: 'Wood (木)', color: 'text-green-400', desc: 'Growth, creativity, benevolence' },
      { name: 'Fire (火)', color: 'text-red-400', desc: 'Passion, expression, propriety' },
      { name: 'Earth (土)', color: 'text-yellow-500', desc: 'Balance, trust, inclusiveness' },
      { name: 'Metal (金)', color: 'text-gray-300', desc: 'Principle, decisiveness, loyalty' },
      { name: 'Water (水)', color: 'text-blue-400', desc: 'Wisdom, flexibility, scholarship' },
    ];

  const faqs = isKo
    ? [
      { q: '사주팔자란 무엇인가요?', a: '사주팔자(四柱八字)는 태어난 년·월·일·시의 네 기둥(四柱)으로 이루어진 여덟 글자(八字)를 분석하는 전통 동양철학입니다. 각 글자는 천간(天干)과 지지(地支)로 구성되며, 오행(五行)의 조화를 통해 타고난 기질과 운명의 흐름을 읽습니다.' },
      { q: '음력과 양력 중 어느 것으로 입력해야 하나요?', a: '출생증명서나 주민등록증의 생년월일이 양력이면 양력으로, 음력이면 음력으로 선택하세요. 모르실 경우 양력으로 입력하시는 것이 일반적입니다.' },
      { q: '태어난 시간을 모르면 어떻게 하나요?', a: '태어난 시간을 모르셔도 분석이 가능합니다. 시간 없이는 6글자(년·월·일)로 분석하며, 시주(時柱)가 포함된 분석보다는 덜 상세하지만 주요 기질과 운세는 확인할 수 있습니다.' },
    ]
    : [
      { q: 'What is Four Pillars of Destiny?', a: 'Four Pillars of Destiny (Saju Palza) is a traditional Eastern philosophy that analyzes eight characters formed by the four pillars of birth year, month, day, and time. Each character consists of a Heavenly Stem and Earthly Branch, reading innate temperament and destiny through the harmony of Five Elements.' },
      { q: 'Should I enter solar or lunar calendar?', a: "If your birth date on official documents is in the solar calendar, choose solar. If it's lunar, choose lunar. When unsure, entering in solar calendar is generally recommended." },
      { q: "What if I don't know my birth time?", a: "You can still get an analysis without knowing your birth time. Without the time, we analyze using 6 characters (year, month, day), which is less detailed than the full 8-character analysis but still reveals key temperament and fortune." },
    ];

  const baseUrl = 'https://sajupalza.cc';
  const canonicalUrl = `${baseUrl}${localePrefix}/saju`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    headline: isKo ? '사주팔자 무료 분석 - 생년월일시로 알아보는 운명' : 'Free Korean Four Pillars of Destiny Analysis',
    description: isKo
      ? '사주팔자(四柱八字) 완전 무료 분석. 천간지지, 오행, 용신까지 정통 사주 분석.'
      : 'Free Korean Four Pillars of Destiny analysis based on birth date and time.',
    url: canonicalUrl,
    inLanguage: locale,
    author: { '@type': 'Organization', name: '사주팔자 무료 컨설팅' },
    publisher: { '@type': 'Organization', name: '사주팔자 무료 컨설팅', url: baseUrl },
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
      { '@type': 'ListItem', position: 1, name: '홈', item: `${baseUrl}${localePrefix}` },
      { '@type': 'ListItem', position: 2, name: isKo ? '사주팔자' : 'Four Pillars', item: canonicalUrl },
    ],
  };

  return (
    <div className="min-h-screen">
      {/* JSON-LD 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navigation />

      <AdSense slot="2233445566" format="horizontal" className="max-w-full" />

      <main>
        {/* 히어로 섹션 */}
        <section className="relative py-14 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-5xl mb-4">🌟</div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-100 mb-4">
              {isKo ? '사주팔자 무료 분석' : 'Free Korean Four Pillars of Destiny'}
            </h1>
            <p className="text-yellow-200/70 text-lg mb-6 leading-relaxed">
              {isKo
                ? '생년월일시 8글자로 알아보는 타고난 기질과 운명의 흐름\n삼명통회·자평진전·적천수 원리 기반의 정통 분석'
                : 'Discover innate temperament and destiny through 8-character birth analysis\nBased on classical Chinese astrology principles'}
            </p>
            <Link href={`/${locale}`} className="btn-gold text-lg px-8 py-4">
              {isKo ? '지금 바로 무료 분석 시작 →' : 'Start Free Analysis Now →'}
            </Link>
          </div>
        </section>

        {/* 사주의 4기둥 설명 */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
            {isKo ? '사주의 4기둥이란?' : 'What Are the Four Pillars?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((pillar) => (
              <div key={pillar.name} className="card-dark p-5 text-center">
                <div className="text-3xl mb-3">{pillar.icon}</div>
                <h3 className="text-yellow-400 font-bold mb-2">{pillar.name}</h3>
                <p className="text-yellow-200/70 text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 오행 설명 */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
            {isKo ? '오행(五行)의 기운' : 'Five Elements Energy'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {fiveElements.map((el) => (
              <div key={el.name} className="card-dark p-4 text-center">
                <p className={`text-xl font-bold mb-2 ${el.color}`}>{el.name}</p>
                <p className="text-yellow-200/60 text-xs">{el.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 중간 광고 */}
        <AdSense slot="3344556677" format="rectangle" />

        {/* 분석 내용 소개 */}
        <section className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
            {isKo ? '사주팔자로 알 수 있는 것들' : 'What You Can Learn from Four Pillars'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(isKo
              ? [
                { icon: '💼', title: '직업·재능', desc: '타고난 적성과 유리한 직업군의 경향' },
                { icon: '💰', title: '재물·경제', desc: '재물 기운과 경제적 패턴의 경향' },
                { icon: '❤️', title: '연애·인연', desc: '이성 인연과 부부 궁합의 경향' },
                { icon: '🌿', title: '건강·체질', desc: '오행으로 보는 건강 유의사항의 경향' },
                { icon: '🔮', title: '기질·성격', desc: '일간과 오행으로 보는 본성의 경향' },
                { icon: '🎯', title: '개운법', desc: '기운을 높이는 방법과 색깔의 경향' },
              ]
              : [
                { icon: '💼', title: 'Career & Talent', desc: 'Innate aptitude and favorable careers' },
                { icon: '💰', title: 'Wealth & Finance', desc: 'Wealth energy and financial patterns' },
                { icon: '❤️', title: 'Love & Relationships', desc: 'Romantic connections and compatibility' },
                { icon: '🌿', title: 'Health & Constitution', desc: 'Health considerations through Five Elements' },
                { icon: '🔮', title: 'Character & Nature', desc: 'Core personality through Day Stem and Elements' },
                { icon: '🎯', title: 'Fortune Enhancement', desc: 'Ways to boost your energy and lucky colors' },
              ]
            ).map((item) => (
              <div key={item.title} className="card-dark p-4 flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="text-yellow-400 font-bold mb-1">{item.title}</h3>
                  <p className="text-yellow-200/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Blog Posts */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-center text-yellow-400 mb-5">
            {isKo ? '사주 자세히 알아보기' : 'Explore Saju Articles'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sajuPosts.map((post) => (
              <Link
                key={post.slug}
                href={buildLocalizedHref(locale, `/saju/${post.slug}`)}
                className="card-dark p-4 flex items-center justify-between group border border-transparent hover:border-yellow-500/40 transition-colors"
              >
                <span className="text-yellow-200/80 text-sm leading-snug">{isKo ? (post.seoTitle || post.title) : (post.seoTitleEn || post.title)}</span>
                <span className="text-yellow-500 ml-3 shrink-0 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
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

        {/* CTA */}
        <section className="max-w-xl mx-auto px-4 pb-16 text-center">
          <div className="card-dark p-8">
            <p className="text-yellow-200/80 mb-2">
              {isKo ? '✅ 무료로 종합 분석 결과를 받아보세요' : '✅ Get your free comprehensive analysis'}
            </p>
            <p className="text-yellow-200/60 text-sm mb-6">
              {isKo ? '본 서비스는 입력하신 개인정보 및 사진을 수집·저장하지 않습니다.' : 'We do not collect or store your personal information or photos.'}
            </p>
            <Link href={`/${locale}`} className="btn-gold text-lg px-8 py-4 inline-block">
              {isKo ? '사주팔자 무료 분석 시작 →' : 'Start Free Four Pillars Analysis →'}
            </Link>
          </div>
        </section>

        {/* 하단 광고 */}
        <div className="flex justify-center py-4">
          <AdSense slot="4455667788" format="rectangle" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
