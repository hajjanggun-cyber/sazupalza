import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import AdSense from '../../../components/AdSense';
import Link from 'next/link';
import { mbtiPosts } from '@/lib/blog/mbti-posts';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isKo = locale === 'ko';
  return {
    title: isKo
      ? 'MBTI 사주 분석 - 16유형과 오행 연계 | 사주팔자 종합 컨설팅'
      : 'MBTI & Korean Four Pillars Integration Analysis | SajuPalza',
    description: isKo
      ? 'MBTI 16유형과 사주 오행을 연계하여 분석하는 무료 서비스. MBTI 궁합, 성격 분석, 직업 적성. 특정 유형 우월 표현 없이 균형있는 분석.'
      : 'Free MBTI personality analysis integrated with Korean Four Pillars Five Elements. MBTI compatibility, career aptitude. Balanced analysis without superiority claims.',
    keywords: isKo
      ? ['MBTI 사주', 'MBTI 궁합', 'MBTI 무료 분석', 'MBTI 오행', '16유형 분석', 'MBTI 직업']
      : ['MBTI Korean fortune', 'MBTI compatibility', 'MBTI analysis free', 'MBTI four pillars'],
  };
}

const MBTI_LIST = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

const MBTI_OHAENG: Record<string, { ohaeng: string; ohaengEn: string; color: string }> = {
  INTJ: { ohaeng: '금(金)', ohaengEn: 'Metal (金)', color: 'text-gray-300' },
  INTP: { ohaeng: '금(金)', ohaengEn: 'Metal (金)', color: 'text-gray-300' },
  ENTJ: { ohaeng: '금(金)', ohaengEn: 'Metal (金)', color: 'text-gray-300' },
  ENTP: { ohaeng: '금(金)', ohaengEn: 'Metal (金)', color: 'text-gray-300' },
  INFJ: { ohaeng: '목(木)', ohaengEn: 'Wood (木)', color: 'text-green-400' },
  INFP: { ohaeng: '목(木)', ohaengEn: 'Wood (木)', color: 'text-green-400' },
  ENFJ: { ohaeng: '목(木)', ohaengEn: 'Wood (木)', color: 'text-green-400' },
  ENFP: { ohaeng: '목(木)', ohaengEn: 'Wood (木)', color: 'text-green-400' },
  ISTJ: { ohaeng: '토(土)', ohaengEn: 'Earth (土)', color: 'text-yellow-500' },
  ISFJ: { ohaeng: '토(土)', ohaengEn: 'Earth (土)', color: 'text-yellow-500' },
  ESTJ: { ohaeng: '토(土)', ohaengEn: 'Earth (土)', color: 'text-yellow-500' },
  ESFJ: { ohaeng: '토(土)', ohaengEn: 'Earth (土)', color: 'text-yellow-500' },
  ISTP: { ohaeng: '수(水)', ohaengEn: 'Water (水)', color: 'text-blue-400' },
  ISFP: { ohaeng: '화(火)', ohaengEn: 'Fire (火)', color: 'text-red-400' },
  ESTP: { ohaeng: '화(火)', ohaengEn: 'Fire (火)', color: 'text-red-400' },
  ESFP: { ohaeng: '화(火)', ohaengEn: 'Fire (火)', color: 'text-red-400' },
};

export default async function MbtiPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const isKo = locale === 'ko';

  const groups = isKo
    ? [
      { name: 'NT 분석가형', types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'], ohaeng: '금(金)', color: 'text-gray-300', desc: '논리적 사고와 전략적 분석을 즐기는 경향이 있습니다' },
      { name: 'NF 외교관형', types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'], ohaeng: '목(木)', color: 'text-green-400', desc: '공감 능력과 이상을 추구하는 경향이 있습니다' },
      { name: 'SJ 관리자형', types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'], ohaeng: '토(土)', color: 'text-yellow-500', desc: '안정과 질서를 중시하는 경향이 있습니다' },
      { name: 'SP 탐험가형', types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'], ohaeng: '화(火)/수(水)', color: 'text-red-400', desc: '현재를 즐기고 유연하게 행동하는 경향이 있습니다' },
    ]
    : [
      { name: 'NT Analyst', types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'], ohaeng: 'Metal (金)', color: 'text-gray-300', desc: 'Tends to enjoy logical thinking and strategic analysis' },
      { name: 'NF Diplomat', types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'], ohaeng: 'Wood (木)', color: 'text-green-400', desc: 'Tends to have empathy and pursue ideals' },
      { name: 'SJ Sentinel', types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'], ohaeng: 'Earth (土)', color: 'text-yellow-500', desc: 'Tends to value stability and order' },
      { name: 'SP Explorer', types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'], ohaeng: 'Fire (火)/Water (水)', color: 'text-red-400', desc: 'Tends to enjoy the present and act flexibly' },
    ];

  const faqs = isKo
    ? [
      { q: 'MBTI와 사주는 어떻게 연결되나요?', a: 'MBTI의 사고 패턴과 행동 방식은 전통 동양철학의 오행(五行)과 흥미로운 연결점이 있습니다. NT형(분석가)은 금(金)의 날카로운 판단력, NF형(외교관)은 목(木)의 성장 추구, SJ형(관리자)은 토(土)의 안정성, SP형(탐험가)은 화(火)/수(水)의 활동성과 유연함에 대응하는 경향이 있습니다.' },
      { q: '어떤 MBTI가 가장 좋은가요?', a: '모든 MBTI 유형에는 장점과 성장 포인트가 있으며, 우월한 유형은 없습니다. 사주와 마찬가지로 각 유형의 특성을 잘 이해하고 자신의 강점을 발휘하는 것이 중요합니다. 상황에 따라 모든 유형이 다른 가치를 발휘할 수 있습니다.' },
      { q: 'MBTI를 모르면 어떻게 하나요?', a: 'MBTI 분석은 선택사항입니다. MBTI 없이도 이름과 생년월일만으로 사주팔자·성명학 분석을 받으실 수 있습니다. MBTI를 아시는 경우 더 풍부한 성격 분석 결과를 받으실 수 있습니다.' },
    ]
    : [
      { q: 'How is MBTI connected to Four Pillars?', a: "MBTI's thinking patterns and behavioral tendencies have interesting connections with the Five Elements of traditional Eastern philosophy. NT (Analyst) types correspond to Metal's sharp judgment, NF (Diplomat) to Wood's growth pursuit, SJ (Sentinel) to Earth's stability, and SP (Explorer) to Fire/Water's activity and flexibility." },
      { q: 'Which MBTI type is best?', a: 'All MBTI types have strengths and growth points - no type is superior. Just like Four Pillars, understanding your type characteristics and utilizing your strengths is key. All types can provide different value depending on the situation.' },
      { q: "What if I don't know my MBTI?", a: "MBTI analysis is optional. You can receive Four Pillars and Name analysis using just your name and birth date without MBTI. Knowing your MBTI provides richer personality analysis results." },
    ];

  const baseUrl = 'https://sajupalza.cc';
  const canonicalUrl = `${baseUrl}/${locale}/mbti`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isKo ? 'MBTI 사주 분석 - 16유형과 오행 연계' : 'MBTI & Korean Four Pillars Integration',
    url: canonicalUrl,
    inLanguage: locale,
    author: { '@type': 'Organization', name: '사주팔자 종합 컨설팅' },
    publisher: { '@type': 'Organization', name: '사주팔자 종합 컨설팅', url: baseUrl },
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
      { '@type': 'ListItem', position: 1, name: '홈', item: `${baseUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'MBTI', item: canonicalUrl },
    ],
  };

  return (
    <div className="min-h-screen">
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

      <div className="flex justify-center py-3 bg-[#0d0502]">
        <AdSense slot="1122334455" format="horizontal" className="max-w-full" />
      </div>


      <main>
        {/* 히어로 섹션 */}
        <section className="relative py-14 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-5xl mb-4">🧠</div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-100 mb-4">
              {isKo ? 'MBTI 사주 연계 분석' : 'MBTI & Korean Four Pillars Integration'}
            </h1>
            <p className="text-yellow-200/70 text-lg mb-6 leading-relaxed">
              {isKo
                ? 'MBTI 16유형과 사주 오행을 교차 분석하여\n더 풍부한 성격과 운세 분석을 제공합니다'
                : 'Cross-analyzing MBTI 16 types with Four Pillars Five Elements\nfor richer personality and fortune insights'}
            </p>
            <Link href={`/${locale}`} className="btn-gold text-lg px-8 py-4">
              {isKo ? '지금 바로 무료 분석 시작 →' : 'Start Free Analysis Now →'}
            </Link>
          </div>
        </section>

        {/* MBTI 유형 그리드 */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
            {isKo ? 'MBTI 16유형과 오행 매핑' : 'MBTI 16 Types and Five Element Mapping'}
          </h2>
          <div className="grid grid-cols-4 gap-2 mb-6">
            {MBTI_LIST.map((type) => {
              const { ohaeng, ohaengEn, color } = MBTI_OHAENG[type];
              return (
                <div key={type} className="card-dark p-3 text-center">
                  <div className="font-bold text-yellow-200 mb-1">{type}</div>
                  <div className={`text-xs ${color}`}>{isKo ? ohaeng : ohaengEn}</div>
                </div>
              );
            })}
          </div>
          <p className="text-yellow-200/50 text-xs text-center">
            {isKo ? '* 오행 매핑은 참고 자료이며 절대적인 분류가 아닙니다' : '* Element mapping is reference material, not absolute classification'}
          </p>
        </section>

        {/* 4그룹 설명 */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
            {isKo ? '4가지 유형 그룹과 오행' : '4 Type Groups and Five Elements'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups.map((group) => (
              <div key={group.name} className="card-dark p-5">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-yellow-400 font-bold text-lg">{group.name}</h3>
                  <span className={`text-sm font-bold ${group.color}`}>{group.ohaeng}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {group.types.map((t) => (
                    <span key={t} className="bg-yellow-900/30 border border-yellow-700/30 text-yellow-300 text-xs px-2 py-1 rounded">{t}</span>
                  ))}
                </div>
                <p className="text-yellow-200/70 text-sm">{group.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 중간 광고 */}
        <div className="flex justify-center py-4">
          <AdSense slot="2233445500" format="rectangle" />
        </div>

        {/* Related Blog Posts */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-center text-yellow-400 mb-5">
            {isKo ? 'MBTI 자세히 알아보기' : 'Explore MBTI Articles'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mbtiPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/mbti/${post.slug}`}
                className="card-dark p-4 flex items-center justify-between group border border-transparent hover:border-yellow-500/40 transition-colors"
              >
                <span className="text-yellow-200/80 text-sm leading-snug">
                  {isKo ? (post.seoTitle || post.title) : (post.seoTitleEn || post.title)}
                </span>
                <span className="text-yellow-500 ml-3 shrink-0 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
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

        {/* CTA */}
        <section className="max-w-xl mx-auto px-4 pb-16 text-center">
          <div className="card-dark p-8">
            <p className="text-yellow-200/80 mb-6">
              {isKo ? '✅ MBTI + 사주 종합 분석을 무료로 받아보세요' : '✅ Get free MBTI + Four Pillars comprehensive analysis'}
            </p>
            <Link href={`/${locale}`} className="btn-gold text-lg px-8 py-4 inline-block">
              {isKo ? 'MBTI 사주 무료 분석 시작 →' : 'Start Free MBTI + Four Pillars Analysis →'}
            </Link>
          </div>
        </section>

        <div className="flex justify-center py-4">
          <AdSense slot="3344556600" format="rectangle" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
