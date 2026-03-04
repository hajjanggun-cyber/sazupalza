import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { buildLocaleAlternates } from '@/lib/seo';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isKo = locale === 'ko';
  return {
    title: isKo ? '문의하기 및 FAQ | 사주팔자 무료 컨설팅' : 'Contact Us & FAQ | SajuPalza',
    description: isKo
      ? '사주팔자·관상·성명학·MBTI 무료 종합 분석 서비스 문의. 자주 묻는 질문(FAQ)과 이메일 고객지원 안내.'
      : 'Contact SajuPalza - Free Korean fortune reading service. FAQ and email support for Four Pillars, Face Reading, Name Numerology, and MBTI analysis.',
    alternates: buildLocaleAlternates(locale, '/contact'),
  };
}

export default async function ContactPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const isKo = locale === 'ko';

  const services = isKo
    ? [
        { icon: '🌟', title: '사주팔자', desc: '생년월일시 8글자로 타고난 기질, 직업 적성, 재물운, 연애운을 분석합니다.' },
        { icon: '✍️', title: '성명학', desc: '이름의 획수와 소리오행으로 이름이 가진 기운과 상생·상극 관계를 분석합니다.' },
        { icon: '👁️', title: '관상', desc: '얼굴 형태와 이목구비의 특징으로 타고난 성향과 운명의 흐름을 분석합니다.' },
        { icon: '🧠', title: 'MBTI', desc: 'MBTI 유형과 사주 오행을 교차 분석하여 성격과 대인관계 패턴을 파악합니다.' },
      ]
    : [
        { icon: '🌟', title: 'Four Pillars', desc: 'Analyzes innate nature, career aptitude, wealth, and romance through 8 characters of birth date and time.' },
        { icon: '✍️', title: 'Name Reading', desc: 'Analyzes the energy and elemental relationships of your name through stroke count and sound elements.' },
        { icon: '👁️', title: 'Face Reading', desc: 'Analyzes innate tendencies and life patterns through facial features and physiognomy.' },
        { icon: '🧠', title: 'MBTI', desc: 'Cross-analyzes MBTI personality type with Four Pillars Five Elements to understand personality patterns.' },
      ];

  const faqs = isKo
    ? [
        {
          q: '분석 결과가 이상하게 나왔어요',
          a: '생년월일을 다시 확인해 주세요. 음력/양력 선택이 맞는지도 확인해 주시기 바랍니다. 같은 생년월일시로 분석하면 항상 동일한 결과가 나옵니다.',
        },
        {
          q: '사진이 인식되지 않아요',
          a: '얼굴이 정면으로 잘 보이는 사진을 사용해 주세요. 밝은 조명에서 찍은 사진이 잘 인식됩니다. 관상 분석은 선택사항이므로 건너뛰기도 가능합니다.',
        },
        {
          q: 'MBTI를 모르면 분석이 안 되나요?',
          a: 'MBTI는 선택 사항입니다. 입력하지 않아도 사주, 성명학, 관상 분석은 정상적으로 진행됩니다. MBTI를 입력하면 성격 교차 분석이 추가됩니다.',
        },
        {
          q: '사주 분석 결과는 얼마나 정확한가요?',
          a: '본 서비스는 전통 동양철학(삼명통회, 자평진전, 적천수) 원리를 기반으로 합니다. 재미와 자기 이해를 위한 참고 자료로 활용하시기 바랍니다. 중요한 결정은 전문가와 상담하시길 권장합니다.',
        },
        {
          q: '여러 번 분석하면 결과가 달라지나요?',
          a: '아니요. 같은 생년월일시와 이름으로 분석하면 항상 동일한 결과가 나옵니다. 입력 데이터가 동일하면 결과도 동일합니다.',
        },
        {
          q: '결과를 저장하거나 공유할 수 있나요?',
          a: '개인 결과는 현재 기기에서만 확인할 수 있습니다. 공유 버튼은 개인정보가 포함되지 않은 새 분석 페이지 링크를 복사하거나 카카오톡으로 보냅니다.',
        },
        {
          q: '광고가 너무 많이 나와요',
          a: '본 서비스는 완전 무료로 운영되며 광고 수익으로 유지됩니다. 광고 차단기를 비활성화해 주시면 서비스 유지에 도움이 됩니다.',
        },
      ]
    : [
        {
          q: 'My analysis result seems incorrect',
          a: 'Please double-check your date of birth entry. Make sure to select the correct calendar type (Solar/Lunar). The same birth date and time will always produce the same result.',
        },
        {
          q: 'My photo is not being recognized',
          a: 'Please use a photo where your face is clearly visible from the front. Photos taken in good lighting work best. Face reading is optional and can be skipped.',
        },
        {
          q: 'Is MBTI required for analysis?',
          a: 'No, MBTI is completely optional. Four Pillars, Name Reading, and Face Reading analyses will proceed normally without it. Adding MBTI enables an additional personality cross-analysis.',
        },
        {
          q: 'How accurate is the analysis?',
          a: 'This service is based on traditional Eastern philosophy principles. Please use the results as a reference for self-understanding and entertainment. For important life decisions, we recommend consulting a professional.',
        },
        {
          q: 'Will results change if I analyze multiple times?',
          a: 'No. The same name and birth date will always produce the same results. Results are deterministic based on your input data.',
        },
        {
          q: 'Can I save or share my results?',
          a: 'Yes. Your private result stays available only on the current device. The share button copies a fresh analysis-page link or sends that same start page to KakaoTalk without exposing personal result data.',
        },
        {
          q: 'There are too many ads',
          a: 'This service is completely free and maintained through ad revenue. Disabling your ad blocker helps support the service.',
        },
      ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-100 mb-4">
            {isKo ? '고객 지원 및 문의하기' : 'Customer Support & Contact'}
          </h1>
          <p className="text-yellow-200/70">
            {isKo
              ? '사주팔자·관상·성명학·MBTI 종합 분석 서비스입니다. 서비스 이용 중 궁금한 점이 있으신가요?'
              : 'SajuPalza comprehensive analysis service. Have any questions while using our service?'}
          </p>
        </header>

        {/* FAQ 섹션 */}
        <section className="card-dark p-6 md:p-8 mb-8" aria-labelledby="faq-title">
          <h2 id="faq-title" className="text-2xl font-bold text-yellow-300 mb-6 flex items-center gap-2">
            <span aria-hidden="true">💡</span> {isKo ? '자주 묻는 질문 (FAQ)' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border-b border-yellow-900/30 pb-4 last:border-0 cursor-pointer">
                <summary className="text-yellow-200 font-medium flex justify-between items-center list-none text-lg">
                  <span className="pr-4">Q. {faq.q}</span>
                  <span className="text-yellow-500 group-open:rotate-180 transition-transform flex-shrink-0" aria-hidden="true">▼</span>
                </summary>
                <div className="mt-3 text-yellow-200/80 leading-relaxed bg-yellow-900/10 p-4 rounded-lg">
                  A. {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* 이메일 문의 */}
        <section className="card-dark p-6 md:p-8 mb-8" aria-labelledby="contact-title">
          <h2 id="contact-title" className="text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
            <span aria-hidden="true">✉️</span> {isKo ? '이메일 문의하기' : 'Contact via Email'}
          </h2>
          <p className="text-yellow-200/80 mb-6">
            {isKo
              ? '위 FAQ에서 해결되지 않은 문의사항, 제휴 제안, 혹은 서비스 불편사항이 있다면 아래 이메일로 연락해 주시기 바랍니다. 영업일 기준 2~3일 내에 정성껏 답변해 드리겠습니다.'
              : 'For inquiries, partnership proposals, or service issues not resolved in the FAQ above, please contact us by email. We will respond carefully within 2-3 business days.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-yellow-900/20 border border-yellow-600/30 rounded-xl justify-center">
            <a href="mailto:ichungim4@gmail.com" className="text-yellow-300 font-bold text-xl hover:text-yellow-100 transition-colors bg-yellow-900/40 px-6 py-3 rounded-lg border border-yellow-500/30 w-full sm:w-auto text-center">
              ichungim4@gmail.com
            </a>
            <p className="text-yellow-200/60 text-sm">
              {isKo ? '* 문의 제목에 "[사주팔자 문의]"를 포함해 주시면 더 빠른 처리가 가능합니다.' : '* Please include "[SajuPalza Inquiry]" in the subject line for faster processing.'}
            </p>
          </div>
        </section>

        {/* 서비스 소개 */}
        <section className="card-dark p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-yellow-300 mb-6">
            {isKo ? '제공 서비스 안내' : 'Our Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s) => (
              <div key={s.title} className="flex gap-4 p-4 bg-yellow-900/10 border border-yellow-900/30 rounded-xl hover:bg-yellow-900/20 transition-colors">
                <span className="text-3xl flex-shrink-0" aria-hidden="true">{s.icon}</span>
                <div>
                  <h3 className="text-yellow-300 font-bold text-base mb-1">{s.title}</h3>
                  <p className="text-yellow-200/70 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-yellow-900/30 text-center">
            <p className="text-yellow-200/60 text-sm font-medium">
              {isKo
                ? '본 서비스는 완전 무료로 운영되며, 회원가입이나 개인정보 저장을 일절 요구하지 않습니다.'
                : 'All services are operated completely free of charge, and we do not require sign-ups or store personal information.'}
            </p>
          </div>
        </section>

        <div className="text-center mt-12">
          <Link href={`/${locale}`} className="btn-gold inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-transform hover:scale-105">
            <span>{isKo ? '← 메인으로 돌아가기' : '← Back to Main'}</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
