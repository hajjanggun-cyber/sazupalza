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
      ? '사주팔자 종합 컨설팅 서비스에 문의하세요.'
      : 'Contact SajuPalza fortune reading service.',
  };
}

export default async function ContactPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const isKo = locale === 'ko';

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
          q: '광고가 너무 많이 나와요',
          a: '본 서비스는 완전 무료로 운영되며 광고 수익으로 유지됩니다. 광고 차단기를 비활성화해 주시면 서비스 유지에 도움이 됩니다.',
        },
        {
          q: '다국어 번역이 어색해요',
          a: '번역 개선을 위해 노력하고 있습니다. 불편하신 부분이 있으시면 알려주시면 개선하겠습니다.',
        },
      ]
    : [
        {
          q: 'My analysis result seems incorrect',
          a: 'Please double-check your date of birth entry. Make sure to select the correct calendar type. The same birth date and time will always produce the same result.',
        },
        {
          q: 'My photo is not being recognized',
          a: 'Please use a photo where your face is clearly visible from the front. Photos taken in good lighting work best. Face reading is optional and can be skipped.',
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
            ? '서비스 이용 중 불편사항이나 개선 제안이 있으시면 알려주세요.'
            : 'Please let us know if you have any issues or suggestions for improvement.'}
        </p>

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
