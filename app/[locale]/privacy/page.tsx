import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
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
    title: isKo ? '개인정보처리방침 (Privacy Policy) | 사주팔자 무료 컨설팅' : 'Privacy Policy | SajuPalza',
    description: isKo
      ? '사주팔자 무료 컨설팅 서비스의 글로벌 표준(GDPR/CCPA 준수) 개인정보처리방침입니다. 서버에 개인정보를 저장하지 않으며 안전하게 보호합니다.'
      : 'Global standard Privacy Policy (GDPR/CCPA compliant) for SajuPalza fortune reading service. We do not store personal information.',
    alternates: {
      canonical: `https://sajupalza.cc/${locale}/privacy`,
    }
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
                    ? '본 서비스는 사용자님의 프라이버시를 최우선으로 합니다. 입력하신 모든 개인정보(이름, 생년월일, 사진 등)는 오직 사용자님의 브라우저 기기 내에서만 처리되며, 당사의 서버로 전송되거나 저장되지 않습니다. 분석이 완료되는 즉시 모든 데이터는 파기됩니다.'
                    : 'We prioritize your privacy. All personal information you enter (name, date of birth, photos, etc.) is processed exclusively within your browser/device and is NEVER transmitted to or stored on our servers. All data is destroyed immediately after analysis.'}
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
                    ? '당사는 "무저장(No-Log) 정책"을 엄격히 준수합니다. 사용자가 웹페이지를 닫거나 새로고침하면, 분석을 위해 입력했던 모든 정보는 즉시 그리고 영구적으로 브라우저 메모리에서 소멸됩니다. 당사의 데이터베이스나 서버에는 어떠한 개인 데이터도 남지 않습니다.'
                    : 'We strictly adhere to a "No-Log Policy." The moment you close or refresh the web page, all information entered for analysis is immediately and permanently erased from your browser\'s memory. No personal data is ever recorded in our databases or servers.'}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-900/50 pb-2">
                  {isKo ? '3. 제3자 정보 제공 및 국외 이전' : '3. Third-Party Sharing and International Transfers'}
                </h3>
                <p>
                  {isKo
                    ? '당사는 서버에 저장하는 개인정보가 없으므로, 원천적으로 제3자에게 개인정보를 제공하거나 국외로 이전할 데이터 자체가 존재하지 않습니다. 귀하의 데이터는 귀하의 기기를 벗어나지 않습니다.'
                    : 'Because we do not store any personal information on our servers, it is fundamentally impossible for us to share your personal data with third parties or transfer it internationally. Your data never leaves your device.'}
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
                    ? '사용자는 언제든지 자신의 개인정보에 대한 접근, 정정, 삭제, 처리 정지 등을 요구할 권리가 있습니다. 단, 당사는 어떠한 개인정보도 서버에 저장하지 않으므로, 사용자님의 데이터는 이미 귀하의 통제 하에 있으며 귀하의 브라우저 캐시 삭제를 통해 모든 흔적을 지울 수 있습니다.'
                    : 'You have the right to access, rectify, erase, or restrict the processing of your personal data. However, since we do NOT store any personal data on our servers, your data is already fully under your control. You can erase any traces by simply clearing your browser cache.'}
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
                    <Link href={`/${locale}/contact`} className="text-yellow-400 hover:underline">
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
          <Link href={`/${locale}`} className="btn-gold inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-transform hover:scale-105">
            <span>{isKo ? '← 메인으로 돌아가기' : '← Back to Main'}</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
