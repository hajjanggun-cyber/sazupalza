import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import AnalysisForm from '../../components/AnalysisForm';
import AdSense from '../../components/AdSense';
import Link from 'next/link';

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
      title: '사주팔자',
      en: 'Four Pillars of Destiny',
      desc: '생년월일시 8글자로 알아보는 타고난 기질과 운명의 흐름',
      href: `/${locale}/saju`,
    },
    {
      icon: '✍️',
      title: '성명학',
      en: 'Name Reading & Numerology',
      desc: '이름의 획수와 소리오행으로 알아보는 이름의 기운',
      href: `/${locale}/name`,
    },
    {
      icon: '👁️',
      title: '관상',
      en: 'Face Reading & Physiognomy',
      desc: '얼굴의 형태와 기색으로 알아보는 타고난 성향',
      href: `/${locale}/face`,
    },
    {
      icon: '🧠',
      title: 'MBTI',
      en: 'Personality Analysis',
      desc: 'MBTI 유형과 사주 오행의 교차 분석으로 알아보는 성격',
      href: `/${locale}/mbti`,
    },
  ];

  const reviews = [
    { name: '김○○', text: '사주와 성명학이 이렇게 잘 맞는지 몰랐어요. 신기해요!', rating: 5 },
    { name: '이○○', text: '무료인데 이렇게 자세한 분석이 나오다니 놀랍네요.', rating: 5 },
    { name: '박○○', text: '평소 사주에 관심 있었는데 쉽게 볼 수 있어서 좋았어요.', rating: 4 },
  ];

  return (
    <div className="min-h-screen">
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
              <span>완전 무료 | 회원가입 없음</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-yellow-100 leading-tight mb-4">
              사주·관상·성명학·MBTI
              <br />
              <span className="text-yellow-400">종합 컨설팅</span>
            </h1>

            <p className="text-yellow-200/70 text-lg mb-2">
              광고 1회 시청 후 상세 리포트 무료 공개
            </p>

            <div className="flex justify-center gap-6 my-8 text-sm">
              <div className="flex items-center gap-2 text-yellow-300">
                <span className="text-xl">🆓</span>
                <span>완전 무료</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-300">
                <span className="text-xl">🔒</span>
                <span>개인정보 없음</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-300">
                <span className="text-xl">⚡</span>
                <span>즉시 결과</span>
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
            4가지 종합 분석 서비스
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <Link key={service.title} href={service.href}>
                <div className="card-dark p-5 hover:border-yellow-500/50 transition-all hover:-translate-y-1 h-full">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-yellow-400 font-bold text-lg mb-1">{service.title}</h3>
                  <p className="text-yellow-200/50 text-xs mb-2">{service.en}</p>
                  <p className="text-yellow-200/70 text-sm">{service.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 샘플 결과 미리보기 */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-6">
            결과 미리보기
          </h2>
          <div className="card-dark p-6 relative overflow-hidden">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-yellow-200/80 text-sm">종합 점수</span>
                <span className="text-yellow-400 font-bold text-2xl">82점</span>
              </div>
              {['사주', '성명학', '관상', 'MBTI'].map((item, i) => (
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
            {/* 흐릿한 상세 내용 */}
            <div className="locked-overlay mt-4 text-yellow-200/50 text-sm space-y-2">
              <p>일간: 경금(庚金) | 월지: 계묘(癸卯)</p>
              <p>수리: 원격28 / 형격15</p>
              <p>소리오행: 목-금-수 (상생)</p>
            </div>
            {/* 잠금 안내 오버레이 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2d1810] to-transparent pt-16 pb-6 text-center">
              <p className="text-yellow-400 font-bold mb-2">🎁 광고 1회만 보시면</p>
              <p className="text-yellow-200/80 text-sm">전체 리포트를 무료로 받으실 수 있어요!</p>
            </div>
          </div>
        </section>

        {/* 사용자 후기 */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-6">
            이용자 후기
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
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            {[
              {
                q: '정말 무료인가요?',
                a: '네, 완전히 무료입니다. 기본 분석은 즉시 제공되며, 광고 1회 시청 후 상세 리포트를 무료로 받으실 수 있습니다. 회원가입이나 결제가 필요하지 않습니다.',
              },
              {
                q: '개인정보는 안전한가요?',
                a: '입력하신 모든 정보는 분석 후 즉시 삭제되며 서버에 저장되지 않습니다. 사진은 브라우저에서만 분석되고 서버로 전송되지 않습니다.',
              },
              {
                q: '사주 분석이 얼마나 정확한가요?',
                a: '본 서비스는 전통 동양철학(삼명통회, 자평진전, 적천수) 원리를 기반으로 합니다. 재미와 자기 이해를 위한 참고 자료로 활용하시기 바랍니다. 같은 생년월일시로 분석하면 항상 동일한 결과가 나옵니다.',
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
