import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { buildLocalizedHref } from '@/lib/seo';
import { buildLocaleAlternates } from '@/lib/seo';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isKo = locale === 'ko';
  return {
    title: isKo ? '개인정보처리방침 (Privacy Policy) | 사주팔자 무료 컨설팅' : 'Privacy Policy | SajuPalza',
    description: isKo
      ? '사주팔자 서비스의 글로벌 표준(GDPR/CCPA 준수) 개인정보처리방침입니다. 개인정보는 서버에 저장하지 않으며, 현재 기기에서만 임시 보관됩니다.'
      : 'Global standard Privacy Policy (GDPR/CCPA compliant) for SajuPalza. Personal data is never stored on our servers and remains only on your current device for a limited time.',
    alternates: buildLocaleAlternates(locale, '/privacy'),
  };
}

export default async function PrivacyPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const isKo = locale === 'ko';

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <article className="prose prose-invert max-w-none">
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-100 mb-4">
              {isKo ? '개인정보처리방침' : 'Privacy Policy'}
            </h1>
            <p className="text-yellow-200/70">
              {isKo ? '최종 업데이트: 2026년 3월 | 글로벌 개인정보보호 규정(GDPR, CCPA) 준수' : 'Last Updated: March 2026 | Compliant with Global Privacy Regulations (GDPR, CCPA)'}
            </p>
          </header>

          <div className="card-dark p-6 md:p-8 mb-8">
            <div className="flex items-start gap-4 p-5 bg-yellow-900/20 border border-yellow-600/30 rounded-xl mb-8">
              <span className="text-3xl" aria-hidden="true">🔒</span>
              <div>
                <h2 className="text-xl font-bold text-yellow-300 mb-2 mt-0">
                  {isKo ? '핵심 요약 (Core Summary)' : 'Core Summary'}
                </h2>
                <p className="text-yellow-200/90 leading-relaxed mb-0">
                  {isKo
                    ? '본 서비스는 사용자님의 프라이버시를 최우선으로 합니다. 입력하신 개인정보(이름, 생년월일, 사진 등)는 사용자님의 현재 브라우저/기기에서만 처리되며, 당사 서버로 전송되거나 저장되지 않습니다. 분석 결과는 재확인을 위해 현재 기기 내 브라우저 저장소에만 임시 보관되며, 일정 시간이 지나거나 브라우저 저장소를 비우면 삭제됩니다.'
                    : 'We prioritize your privacy. Personal information you enter (name, date of birth, photos, etc.) is processed only on your current browser/device and is NEVER transmitted to or stored on our servers. Results are kept temporarily only in local browser storage on this device for revisit purposes, then disappear after expiry or when browser storage is cleared.'}
                </p>
              </div>
            </div>

            <div className="space-y-10 text-yellow-200/80 leading-relaxed">
              <section>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-900/50 pb-2">
                  {isKo ? '1. 수집하는 정보 및 수집 방법' : '1. Information We Collect and How'}
                </h3>
                <p className="mb-3">
                  {isKo
                    ? '본 서비스는 원활한 운세 분석을 위해 아래의 정보를 "브라우저 내 임시 메모리"에서만 처리합니다:'
                    : 'For the purpose of fortune analysis, we temporarily process the following information strictly within your browser\'s local memory:'}
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2 text-yellow-100/70">
                  <li><strong>{isKo ? '이름' : 'Name'}</strong>: {isKo ? '성명학 분석 및 결과 표시용' : 'For name numerology analysis and displaying results.'}</li>
                  <li><strong>{isKo ? '생년월일 및 태어난 시간' : 'Date and Time of Birth'}</strong>: {isKo ? '사주팔자 명식 계산용' : 'For calculating Four Pillars destiny charts.'}</li>
                  <li><strong>{isKo ? '얼굴 사진' : 'Facial Photos'}</strong>: {isKo ? '관상 분석용 (브라우저 내장 AI 모델을 통해 기기 내에서만 분석됨)' : 'For face reading (analyzed completely on-device via browser-based AI models).'}</li>
                  <li><strong>{isKo ? 'MBTI 유형' : 'MBTI Type'}</strong>: {isKo ? '성격 교차 분석용 (선택사항)' : 'For personality cross-analysis (Optional).'}</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-900/50 pb-2">
                  {isKo ? '2. 개인정보의 보유 및 이용 기간' : '2. Data Retention and Processing'}
                </h3>
                <p>
                  {isKo
                    ? '당사는 "서버 무저장(No Server Log)" 정책을 준수합니다. 개인정보는 당사 데이터베이스나 서버에 기록되지 않습니다. 다만 결과 재열람을 위해 현재 기기 브라우저의 로컬 저장소(localStorage / sessionStorage)에 임시 보관될 수 있으며, 저장된 결과는 최대 7일 이내 자동 만료되거나 사용자가 브라우저 저장소를 지우면 즉시 삭제됩니다.'
                    : 'We follow a strict "No Server Storage" policy. No personal data is recorded in our databases or servers. For revisit purposes, result data may be kept temporarily in your current browser storage (localStorage / sessionStorage), and those entries expire automatically within up to 7 days or disappear immediately when you clear browser storage.'}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-900/50 pb-2">
                  {isKo ? '3. 제3자 정보 제공 및 국외 이전' : '3. Third-Party Sharing and International Transfers'}
                </h3>
                <p>
                  {isKo
                    ? '당사는 서버에 저장하는 개인정보가 없으므로, 원천적으로 제3자에게 개인정보를 제공하거나 국외로 이전할 데이터 자체가 존재하지 않습니다. 귀하의 데이터는 귀하의 현재 기기를 벗어나지 않습니다. 또한 공유 기능은 개인 결과 자체가 아니라 새 분석 시작 페이지 링크만 전달합니다.'
                    : 'Because we do not store personal information on our servers, there is no server-side personal data to share with third parties or transfer internationally. Your data does not leave your current device. Our sharing features also send only a fresh analysis start-page link, not your private result data itself.'}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-900/50 pb-2">
                  {isKo ? '4. 쿠키(Cookies) 및 분석 도구' : '4. Cookies and Analytics Tools'}
                </h3>
                <p className="mb-3">
                  {isKo
                    ? '본 웹사이트는 서비스 최적화 및 광고 게재를 위해 다음과 같은 제휴사 도구를 사용합니다:'
                    : 'This website uses the following third-party tools for service optimization and advertising:'}
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2 text-yellow-100/70">
                  <li><strong>Google Analytics</strong>: {isKo ? '웹사이트 방문자 통계 분석 (IP 주소 익명화 처리)' : 'Website visitor statistics (IP addresses are anonymized).'}</li>
                  <li><strong>Google AdSense</strong>: {isKo ? '개인 맞춤형 또는 비맞춤형 광고 제공' : 'Serving personalized or non-personalized advertisements.'}</li>
                </ul>
                <p className="mt-3 text-sm text-yellow-200/60">
                  {isKo
                    ? '* 사용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.'
                    : '* You can refuse the use of cookies by selecting the appropriate settings on your browser.'}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-900/50 pb-2">
                  {isKo ? '5. 이용자의 권리 (GDPR / CCPA 등 글로벌 기준 준수)' : '5. User Rights (GDPR / CCPA Compliance)'}
                </h3>
                <p className="mb-3">
                  {isKo
                    ? '사용자는 언제든지 자신의 개인정보에 대한 접근, 정정, 삭제, 처리 정지 등을 요구할 권리가 있습니다. 단, 당사는 개인정보를 서버에 저장하지 않으므로, 사용자님의 데이터는 이미 귀하의 통제 하에 있습니다. 브라우저 캐시 또는 사이트 저장소(localStorage / sessionStorage)를 비우면 기기에 남아 있는 결과 데이터를 직접 삭제할 수 있습니다.'
                    : 'You have the right to access, rectify, erase, or restrict the processing of your personal data. Because we do not store personal data on our servers, your data is already under your direct control. You can remove any remaining result data on this device by clearing browser cache or site storage (localStorage / sessionStorage).'}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-900/50 pb-2">
                  {isKo ? '6. 아동의 개인정보 보호' : '6. Children\'s Privacy'}
                </h3>
                <p>
                  {isKo
                    ? '본 서비스는 만 13세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다. 만약 당사가 아동의 개인정보를 수집했다고 인지하게 되는 경우, 지체 없이 파기할 것입니다.'
                    : 'Our service does not knowingly collect personal information from children under 13. If we become aware that we have collected personal data from a child, we will take steps to delete that information immediately.'}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-900/50 pb-2">
                  {isKo ? '7. 문의처' : '7. Contact Information'}
                </h3>
                <p>
                  {isKo
                    ? '개인정보 보호와 관련된 문의, 불만 처리, 혹은 피해 구제 등에 관한 사항은 아래 채널을 통해 문의해 주시기 바랍니다.'
                    : 'For any questions, complaints, or inquiries regarding privacy protection, please contact us via the following:'}
                </p>
                <div className="mt-4 p-4 bg-yellow-900/10 rounded-lg border border-yellow-800/30">
                  <p className="flex items-center gap-2">
                    <span className="text-xl">✉️</span> 
                    <a href="mailto:ichungim4@gmail.com" className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium">
                      ichungim4@gmail.com
                    </a>
                  </p>
                  <p className="mt-2 text-sm text-yellow-200/60">
                    {isKo ? '또는 ' : 'Or visit our '}
                    <Link href={buildLocalizedHref(locale, '/contact')} className="text-yellow-400 hover:underline">
                      {isKo ? '문의하기 페이지' : 'Contact Us page'}
                    </Link>
                    {isKo ? '를 이용해 주세요.' : '.'}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </article>

        <div className="text-center mt-12">
          <Link href={buildLocalizedHref(locale)} className="btn-gold inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-transform hover:scale-105">
            <span>{isKo ? '← 메인으로 돌아가기' : '← Back to Main'}</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
