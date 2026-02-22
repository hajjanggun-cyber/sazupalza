import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import Link from 'next/link';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isKo = locale === 'ko';
  return {
    title: isKo ? '문의하기 | 사주팔자 종합 컨설팅' : 'Contact Us | SajuPalza',
    description: isKo
      ? '사주팔자·관상·성명학·MBTI 무료 종합 분석 서비스 문의. 자주 묻는 질문과 이메일 문의 안내.'
      : 'Contact SajuPalza - Free Korean fortune reading service. FAQ and email inquiry for Four Pillars, Face Reading, Name Numerology, and MBTI analysis.',
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
          a: '결과 페이지의 URL을 복사하면 동일한 결과를 다시 볼 수 있습니다. 카카오톡 공유 기능도 지원합니다. 단, 서버에는 저장되지 않으므로 URL을 보관해 두시기 바랍니다.',
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
          a: 'Yes! You can copy the result page URL to revisit the same results anytime. KakaoTalk sharing is also supported. Note that results are not stored on our servers, so please keep the URL.',
        },
        {
          q: 'There are too many ads',
          a: 'This service is completely free and maintained through ad revenue. Disabling your ad blocker helps support the service.',
        },
      ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-yellow-100 mb-4">
          {isKo ? '문의하기' : 'Contact Us'}
        </h1>
        <p className="text-yellow-200/70 mb-8">
          {isKo
            ? '사주팔자·관상·성명학·MBTI 무료 종합 분석 서비스입니다. 서비스 이용 중 불편사항이나 개선 제안이 있으시면 아래 FAQ를 먼저 확인해 주세요.'
            : 'SajuPalza is a free comprehensive analysis service covering Four Pillars, Face Reading, Name Numerology, and MBTI. Please check the FAQ below before contacting us.'}
        </p>

        {/* 서비스 소개 */}
        <div className="card-dark p-6 mb-8">
          <h2 className="text-xl font-bold text-yellow-300 mb-4">
            {isKo ? '제공 서비스' : 'Our Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s) => (
              <div key={s.title} className="flex gap-3 p-3 bg-yellow-900/10 border border-yellow-900/30 rounded-lg">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-yellow-300 font-bold text-sm">{s.title}</p>
                  <p className="text-yellow-200/60 text-xs mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-yellow-200/50 text-xs mt-4 text-center">
            {isKo
              ? '모든 서비스는 완전 무료 · 회원가입 없음 · 개인정보 수집 없음'
              : 'All services are completely free · No sign-up · No personal data collected'}
          </p>
        </div>

        {/* FAQ 섹션 */}
        <div className="card-dark p-6 mb-8">
          <h2 className="text-xl font-bold text-yellow-300 mb-6">
            {isKo ? '자주 묻는 질문' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border-b border-yellow-900/30 pb-4 last:border-0 cursor-pointer">
                <summary className="text-yellow-200 font-medium flex justify-between items-center list-none">
                  Q. {faq.q}
                  <span className="text-yellow-500 group-open:rotate-180 transition-transform ml-2 flex-shrink-0">▼</span>
                </summary>
                <p className="mt-3 text-yellow-200/70 text-sm leading-relaxed">
                  A. {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* 이메일 문의 */}
        <div className="card-dark p-6 mb-8">
          <h2 className="text-xl font-bold text-yellow-300 mb-4">
            {isKo ? '이메일 문의' : 'Email Inquiry'}
          </h2>
          <p className="text-yellow-200/70 mb-4">
            {isKo
              ? '위 FAQ에서 해결되지 않은 문의사항은 이메일로 연락해 주세요. 영업일 기준 2~3일 내 답변드립니다.'
              : 'For inquiries not resolved in the FAQ above, please contact us by email. We will respond within 2-3 business days.'}
          </p>
          <div className="flex items-center gap-3 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
            <span className="text-2xl">✉️</span>
            <div>
              <p className="text-yellow-200/50 text-sm">
                {isKo ? '문의 제목에 "사주팔자 문의"를 포함해 주세요' : 'Please include "SajuPalza Inquiry" in the subject line'}
              </p>
            </div>
          </div>
        </div>

        {/* 개선 제안 */}
        <div className="card-dark p-6 mb-8">
          <h2 className="text-xl font-bold text-yellow-300 mb-4">
            {isKo ? '서비스 개선 제안' : 'Service Improvement Suggestions'}
          </h2>
          <p className="text-yellow-200/70 mb-4">
            {isKo
              ? '더 좋은 서비스를 만들기 위해 여러분의 의견이 필요합니다.'
              : 'We need your feedback to make a better service.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(isKo
              ? ['번역/다국어 개선', '분석 정확도 개선', '새로운 기능 제안', 'UI/UX 개선']
              : ['Translation improvement', 'Analysis accuracy', 'New feature suggestions', 'UI/UX improvement']
            ).map((item) => (
              <div key={item} className="flex items-center gap-2 p-3 bg-yellow-900/10 border border-yellow-900/30 rounded-lg text-yellow-200/70 text-sm">
                <span className="text-yellow-500">→</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href={`/${locale}`} className="btn-gold text-sm px-6 py-2">
            {isKo ? '← 메인으로 돌아가기' : '← Back to Main'}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
