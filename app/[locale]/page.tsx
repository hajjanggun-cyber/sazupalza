import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import AnalysisForm from '../../components/AnalysisForm';
import AdSense from '../../components/AdSense';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isKo = locale === 'ko';
  return {
    title: isKo
      ? '사주팔자 무료 종합 분석 - 관상·성명학·MBTI | 즉시 결과'
      : 'Free Korean Fortune Reading - Four Pillars, Face Reading, MBTI',
    description: isKo
      ? '사주팔자·관상·성명학·MBTI 완전 무료 종합 분석. 회원가입 없음, 개인정보 수집 없음. 생년월일만 입력하면 즉시 결과! 구글 애드센스 정책 준수.'
      : 'Free Korean Four Pillars of Destiny, Face Reading, Name Numerology, and MBTI analysis. No sign-up required. Instant results!',
    keywords: isKo
      ? ['사주팔자 무료', '무료 사주', '관상 분석', '성명학', 'MBTI 궁합', '사주 보기', '무료 운세']
      : ['Korean fortune reading', 'four pillars', 'face reading free', 'Korean numerology'],
  };
}

export default async function HomePage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const services = [
    {
      icon: '🌟',
      title: t('home.s1.title'),
      desc: t('home.s1.desc'),
      href: `/${locale}/saju`,
    },
    {
      icon: '✍️',
      title: t('home.s2.title'),
      desc: t('home.s2.desc'),
      href: `/${locale}/name`,
    },
    {
      icon: '👁️',
      title: t('home.s3.title'),
      desc: t('home.s3.desc'),
      href: `/${locale}/face`,
    },
    {
      icon: '🧠',
      title: t('home.s4.title'),
      desc: t('home.s4.desc'),
      href: `/${locale}/mbti`,
    },
  ];

  const reviews = [
    { name: t('home.r1.name'), text: t('home.r1.text'), rating: 5 },
    { name: t('home.r2.name'), text: t('home.r2.text'), rating: 5 },
    { name: t('home.r3.name'), text: t('home.r3.text'), rating: 4 },
  ];

  const baseUrl = 'https://sajupalza.com';
  const canonicalUrl = `${baseUrl}/${locale}`;

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: locale === 'ko' ? '사주팔자 종합 컨설팅' : 'Korean Fortune Reading',
    url: canonicalUrl,
    description: locale === 'ko' 
      ? '사주팔자·관상·성명학·MBTI 완전 무료 종합 분석. 회원가입 없음, 개인정보 수집 없음.'
      : 'Free Korean Four Pillars, Face Reading, Name Numerology, and MBTI analysis.',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    inLanguage: locale,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    publisher: {
      '@type': 'Organization',
      name: locale === 'ko' ? '사주팔자 종합 컨설팅' : 'Korean Fortune Reading',
      url: baseUrl,
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: t('faq.q1'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.a1'),
        },
      },
      {
        '@type': 'Question',
        name: t('faq.q2'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.a2'),
        },
      },
      {
        '@type': 'Question',
        name: t('faq.q3'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.a3'),
        },
      },
    ],
  };

  return (
    <div className="min-h-screen">
      {/* JSON-LD 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navigation />

      {/* 상단 광고 */}
      <div className="flex justify-center py-3 bg-[#0d0502]">
        <AdSense slot="1234567890" format="horizontal" className="max-w-full" />
      </div>

      <main>
        {/* HERO 섹션 */}
        <section className="relative py-16 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/10 to-transparent pointer-events-none" />
          <div className="max-w-3xl mx-auto relative">
            <div className="inline-flex items-center gap-2 bg-yellow-900/40 border border-yellow-600/30 rounded-full px-4 py-2 mb-6 text-sm text-yellow-300">
              <span>🎁</span>
              <span>{t('home.heroBadge')}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-yellow-100 leading-tight mb-4">
              {t('home.heroTitle')}
              <br />
              <span className="text-yellow-400">{t('home.heroSub')}</span>
            </h1>

            <p className="text-yellow-200/70 text-lg mb-2">
              {t('home.heroDesc')}
            </p>

            <div className="mt-4 mb-2 rounded-xl overflow-hidden">
              <Image
                src="/hero-banner.png"
                alt={locale === 'ko' ? '사주팔자 종합 분석' : 'Korean Fortune Reading'}
                width={800}
                height={300}
                className="w-full object-cover"
                priority
              />
            </div>

            <div className="flex justify-center gap-6 my-8 text-sm">
              <div className="flex items-center gap-2 text-yellow-300">
                <span className="text-xl">🆓</span>
                <span>{t('trust.free')}</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-300">
                <span className="text-xl">🔒</span>
                <span>{t('trust.privacy')}</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-300">
                <span className="text-xl">⚡</span>
                <span>{t('trust.instant')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5단계 입력 폼 */}
        <section className="max-w-xl mx-auto px-4 pb-12">
          <div className="card-dark p-6 md:p-8">
            <AnalysisForm />
          </div>
        </section>

        {/* 중간 광고 */}
        <div className="flex justify-center py-4">
          <AdSense slot="0987654321" format="rectangle" />
        </div>

        {/* 서비스 소개 */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
            {t('home.servicesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <Link key={service.title} href={service.href}>
                <div className="card-dark p-5 hover:border-yellow-500/50 transition-all hover:-translate-y-1 h-full">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-yellow-400 font-bold text-lg mb-1">{service.title}</h3>
                  <p className="text-yellow-200/70 text-sm">{service.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 샘플 결과 미리보기 */}
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
              {[t('result.saju'), t('result.name'), t('result.face'), 'MBTI'].map((item, i) => (
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
            {/* 분석 근거 샘플 */}
            <div className="mt-4 text-yellow-200/70 text-sm space-y-2 border-t border-yellow-900/30 pt-4">
              <p>일간: 경금(庚金) | 월지: 계묘(癸卯)</p>
              <p>수리: 원격28수(길) / 형격15수(대길)</p>
              <p>소리오행: 목-금-수 (상생) · 수호신: 백호 🐯</p>
              <p className="text-yellow-400 font-medium">{t('home.previewNote')}</p>
            </div>
          </div>
        </section>

        {/* 사용자 후기 */}
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
        <div className="flex justify-center py-4">
          <AdSense slot="1122334455" format="rectangle" />
        </div>

        {/* FAQ 섹션 */}
        <section className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
            {t('faq.title')}
          </h2>
          <div className="space-y-4">
            {[
              {
                q: t('faq.q1'),
                a: t('faq.a1'),
              },
              {
                q: t('faq.q2'),
                a: t('faq.a2'),
              },
              {
                q: t('faq.q3'),
                a: t('faq.a3'),
              },
            ].map((faq, i) => (
              <details key={i} className="card-dark p-5 group cursor-pointer">
                <summary className="text-yellow-200 font-medium text-base list-none flex justify-between items-center">
                  Q. {faq.q}
                  <span className="text-yellow-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-yellow-200/70 text-sm leading-relaxed">
                  A. {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
