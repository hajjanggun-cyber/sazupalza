import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import AdSense from '../../../components/AdSense';
import Link from 'next/link';
import { seongmyeongPosts } from '@/lib/blog/seongmyeong-posts';
import { buildLocalizedHref } from '@/lib/seo';

const BASE_URL = 'https://sajupalza.cc';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isKo = locale === 'ko';
  const localePrefix = locale === 'ko' ? '' : `/${locale}`;
  const canonical = `${BASE_URL}${localePrefix}/name-reading`;
  return {
    title: isKo
      ? '성명학 무료 분석 - 이름의 획수와 소리오행 | 사주팔자 무료 컨설팅'
      : 'Free Korean Name Reading & Numerology Analysis | SajuPalza',
    description: isKo
      ? '성명학(姓名學) 무료 분석. 한글 이름의 획수(수리81수), 소리오행, 자원오행으로 알아보는 이름의 기운과 의미.'
      : 'Free Korean Name Reading and Numerology analysis. Discover the energy of your name through stroke count numerology and sound elements.',
    keywords: isKo
      ? ['성명학 무료', '이름 획수', '소리오행', '수리81', '이름 풀이', '작명', '무료 성명학']
      : ['Korean name reading', 'Korean numerology', 'name analysis free', 'Korean name meaning'],
    alternates: {
      canonical,
      languages: {
        ko: `${BASE_URL}/name-reading`,
        en: `${BASE_URL}/en/name-reading`,
        'x-default': `${BASE_URL}/name-reading`,
      },
    },
  };
}

export default async function NameReadingPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const isKo = locale === 'ko';

  const localePrefix = locale === 'ko' ? '' : `/${locale}`;
  const canonicalUrl = `${BASE_URL}${localePrefix}/name-reading`;

  const nameElements = isKo
    ? [
      { icon: '🔢', title: '수리(數理) 분석', desc: '이름 획수의 합산으로 알아보는 81가지 운세 수리. 원격·형격·이격·정격의 4가지 수리를 분석합니다.' },
      { icon: '🎵', title: '소리오행 분석', desc: '이름 자음의 소리가 나타내는 오행(木火土金水)의 기운과 상생·상극 관계를 분석합니다.' },
      { icon: '⚡', title: '획수 오행', desc: '이름 획수의 홀짝에 따른 음양 분류와 오행 속성을 분석합니다.' },
      { icon: '🔗', title: '사주 연계', desc: '사주 일간의 오행과 이름 오행의 조화를 분석하여 시너지를 확인합니다.' },
    ]
    : [
      { icon: '🔢', title: 'Numerology Analysis', desc: 'Analyzes 81 types of fortune through the sum of name strokes: Won, Hyeong, I, and Jeong patterns.' },
      { icon: '🎵', title: 'Sound Element Analysis', desc: 'Analyzes the Five Elements energy from the consonant sounds of the name and their mutual relationships.' },
      { icon: '⚡', title: 'Stroke Elements', desc: 'Analyzes Yin-Yang classification and Five Element attributes based on stroke count.' },
      { icon: '🔗', title: 'Four Pillars Integration', desc: 'Analyzes harmony between the Day Stem element and name elements.' },
    ];

  const suriExamples = [
    { num: 1, name: isKo ? '태초수' : 'Beginning', rating: isKo ? '대길' : 'Very Good', color: 'text-yellow-400' },
    { num: 8, name: isKo ? '발전수' : 'Development', rating: isKo ? '길' : 'Good', color: 'text-green-400' },
    { num: 13, name: isKo ? '지혜수' : 'Wisdom', rating: isKo ? '길' : 'Good', color: 'text-green-400' },
    { num: 23, name: isKo ? '위권수' : 'Authority', rating: isKo ? '길' : 'Good', color: 'text-green-400' },
    { num: 33, name: isKo ? '승천수' : 'Ascension', rating: isKo ? '대길' : 'Very Good', color: 'text-yellow-400' },
  ];

  const faqs = isKo
    ? [
      { q: '성명학이란 무엇인가요?', a: '성명학(姓名學)은 이름의 획수, 소리, 한자 자원 등을 분석하여 이름이 가진 기운과 의미를 알아보는 전통 학문입니다. 한국, 중국, 일본에서 오랫동안 이름을 지을 때 참고해온 방법론입니다.' },
      { q: '외국 이름도 분석이 되나요?', a: '본 서비스는 한글 이름을 중심으로 분석합니다. 한글로 표기된 이름이라면 소리오행 분석이 가능합니다. 외국 이름의 경우 분석 정확도가 제한될 수 있습니다.' },
      { q: '이름을 바꾸면 운이 바뀌나요?', a: '성명학은 이름이 가진 기운을 분석하는 참고 자료입니다. 중요한 결정은 전문가와 상담하시기 바랍니다. 본 서비스는 재미와 자기 이해를 위한 용도로만 활용해 주세요.' },
    ]
    : [
      { q: 'What is Korean Name Reading?', a: 'Korean Name Reading (Seongmyeonghak) is a traditional discipline that analyzes the energy and meaning of names through stroke count, sound, and Chinese character origins.' },
      { q: 'Can foreign names be analyzed?', a: 'This service primarily analyzes Korean names written in Hangul. Analysis accuracy may be limited for foreign names.' },
      { q: 'Will changing my name change my fortune?', a: 'Name reading provides reference information about the energy in names. Use this service for entertainment and self-understanding purposes only.' },
    ];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    headline: isKo ? '성명학 무료 분석 - 이름의 획수와 소리오행' : 'Free Korean Name Reading & Numerology',
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
      { '@type': 'ListItem', position: 2, name: isKo ? '성명학' : 'Name Reading', item: canonicalUrl },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Navigation />

      <AdSense slot="5566778899" format="horizontal" className="max-w-full" />

      <main>
        <section className="relative py-14 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-5xl mb-4">✍️</div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-100 mb-4">
              {isKo ? '성명학 무료 분석' : 'Free Korean Name Reading & Numerology'}
            </h1>
            <p className="text-yellow-200/70 text-lg mb-6 leading-relaxed">
              {isKo
                ? '이름의 획수와 소리오행으로 알아보는 이름의 기운과 의미\n수리81수 · 소리오행 · 자원오행 종합 분석'
                : 'Discover the energy and meaning of your name through stroke numerology and sound elements'}
            </p>
            <Link href={`/${locale}`} className="btn-gold text-lg px-8 py-4">
              {isKo ? '지금 바로 무료 분석 시작 →' : 'Start Free Analysis Now →'}
            </Link>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
            {isKo ? '성명학 분석 4가지 요소' : '4 Elements of Name Analysis'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nameElements.map((el) => (
              <div key={el.title} className="card-dark p-5 flex items-start gap-4">
                <span className="text-3xl">{el.icon}</span>
                <div>
                  <h3 className="text-yellow-400 font-bold mb-2">{el.title}</h3>
                  <p className="text-yellow-200/70 text-sm leading-relaxed">{el.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
            {isKo ? '수리81수 예시' : 'Numerology Examples'}
          </h2>
          <div className="card-dark p-6">
            <p className="text-yellow-200/70 text-sm mb-4 text-center">
              {isKo ? '이름 획수의 합으로 1~81의 수리가 결정됩니다' : 'The sum of stroke counts determines numerology from 1 to 81'}
            </p>
            <div className="grid grid-cols-1 gap-3">
              {suriExamples.map((s) => (
                <div key={s.num} className="flex items-center justify-between p-3 border border-yellow-900/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-yellow-500 font-bold text-xl w-8 text-center">{s.num}</span>
                    <span className="text-yellow-200/80">{s.name}</span>
                  </div>
                  <span className={`font-bold ${s.color}`}>{s.rating}</span>
                </div>
              ))}
              <p className="text-yellow-200/50 text-xs text-center mt-2">
                {isKo ? '* 81가지 수리 전체를 분석 결과에서 확인하세요' : '* See all 81 numerology types in your analysis result'}
              </p>
            </div>
          </div>
        </section>

        <AdSense slot="6677889900" format="rectangle" />

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-center text-yellow-400 mb-5">
            {isKo ? '성명학 자세히 알아보기' : 'Explore Name Reading Articles'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {seongmyeongPosts.map((post) => (
              <Link
                key={post.slug}
                href={buildLocalizedHref(locale, `/name-reading/${post.slug}`)}
                className="card-dark p-4 flex items-center justify-between group border border-transparent hover:border-yellow-500/40 transition-colors"
              >
                <span className="text-yellow-200/80 text-sm leading-snug">{isKo ? (post.seoTitle || post.title) : (post.seoTitleEn || post.title)}</span>
                <span className="text-yellow-500 ml-3 shrink-0 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-12">
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
            <p className="text-yellow-200/80 mb-6">
              {isKo ? '✅ 이름의 기운을 무료로 분석해보세요' : '✅ Analyze your name energy for free'}
            </p>
            <Link href={`/${locale}`} className="btn-gold text-lg px-8 py-4 inline-block">
              {isKo ? '성명학 무료 분석 시작 →' : 'Start Free Name Analysis →'}
            </Link>
          </div>
        </section>

        <div className="flex justify-center py-4">
          <AdSense slot="7788990011" format="rectangle" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
