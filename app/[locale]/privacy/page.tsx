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
    title: isKo ? '개인정보처리방침 | 사주팔자 종합 컨설팅' : 'Privacy Policy | SajuPalza',
    description: isKo
      ? '사주팔자 종합 컨설팅 서비스의 개인정보처리방침입니다. 서버에 개인정보를 저장하지 않습니다.'
      : 'Privacy Policy for SajuPalza fortune reading service. We do not store personal information.',
  };
}

export default async function PrivacyPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const isKo = locale === 'ko';

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-yellow-100 mb-8">
          {isKo ? '개인정보처리방침' : 'Privacy Policy'}
        </h1>

        <div className="card-dark p-6 mb-6">
          <div className="flex items-start gap-3 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg mb-6">
            <span className="text-2xl">🔒</span>
            <p className="text-yellow-200/90 leading-relaxed">
              {isKo
                ? '본 서비스는 입력하신 모든 개인정보(이름, 생년월일, 사진 등)를 서버에 저장하지 않습니다. 모든 분석은 브라우저 내에서 처리되며 분석 완료 즉시 데이터가 삭제됩니다.'
                : 'This service does not store any personal information (name, date of birth, photos, etc.) on our servers. All analysis is processed within your browser and data is deleted immediately after analysis.'}
            </p>
          </div>

          <div className="space-y-8 text-yellow-200/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-yellow-300 mb-3">
                {isKo ? '1. 수집하는 정보' : '1. Information We Collect'}
              </h2>
              <p className="mb-2">
                {isKo
                  ? '본 서비스는 다음 정보를 분석 목적으로만 일시적으로 처리하며, 서버에 저장하지 않습니다:'
                  : 'This service temporarily processes the following information for analysis purposes only and does not store it on servers:'}
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>{isKo ? '이름 (분석 결과 표시용)' : 'Name (for displaying analysis results)'}</li>
                <li>{isKo ? '생년월일 (사주 계산용)' : 'Date of birth (for Four Pillars calculation)'}</li>
                <li>{isKo ? 'MBTI 유형 (선택사항, 성격 분석용)' : 'MBTI type (optional, for personality analysis)'}</li>
                <li>{isKo ? '태어난 시간 (선택사항, 시주 계산용)' : 'Birth time (optional, for hour pillar calculation)'}</li>
                <li>{isKo ? '얼굴 사진 (선택사항, 브라우저 내 관상 분석용)' : 'Face photo (optional, for face reading in browser only)'}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-yellow-300 mb-3">
                {isKo ? '2. 정보 처리 방법' : '2. How We Process Information'}
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>{isKo ? '모든 데이터는 사용자의 브라우저(기기)에서만 처리됩니다' : 'All data is processed only in your browser (device)'}</li>
                <li>{isKo ? '입력된 정보는 서버로 전송되지 않습니다' : 'Entered information is not transmitted to servers'}</li>
                <li>{isKo ? '얼굴 사진은 브라우저에서만 분석되며 서버로 전송되지 않습니다' : 'Face photos are analyzed only in the browser and not transmitted to servers'}</li>
                <li>{isKo ? '분석 완료 후 모든 입력 데이터는 즉시 삭제됩니다' : 'All input data is immediately deleted after analysis'}</li>
                <li>{isKo ? '결과 공유 시 URL에는 이름과 생년월일만 포함될 수 있습니다' : 'When sharing results, URLs may only contain name and date of birth'}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-yellow-300 mb-3">
                {isKo ? '3. 쿠키 및 분석 도구' : '3. Cookies and Analytics'}
              </h2>
              <p>
                {isKo
                  ? '본 서비스는 서비스 개선을 위해 Google Analytics(익명화된 통계)와 Google AdSense(광고 표시)를 사용할 수 있습니다. 이 도구들은 개인을 식별하지 않는 집계 데이터만 수집합니다.'
                  : 'This service may use Google Analytics (anonymized statistics) and Google AdSense (ad display) to improve the service. These tools only collect aggregated data that does not identify individuals.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-yellow-300 mb-3">
                {isKo ? '4. 제3자 제공' : '4. Third-Party Sharing'}
              </h2>
              <p>
                {isKo
                  ? '본 서비스는 사용자의 개인정보를 제3자에게 제공하거나 판매하지 않습니다. 서버에 저장되는 개인정보 자체가 없습니다.'
                  : 'This service does not provide or sell user personal information to third parties. There is no personal information stored on servers.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-yellow-300 mb-3">
                {isKo ? '5. 미성년자 보호' : '5. Protection of Minors'}
              </h2>
              <p>
                {isKo
                  ? '본 서비스는 13세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다. 본 서비스는 재미와 자기 이해를 위한 성인 대상 서비스입니다.'
                  : 'This service does not intentionally collect personal information from children under 13. This service is intended for adults for entertainment and self-understanding purposes.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-yellow-300 mb-3">
                {isKo ? '6. 문의' : '6. Contact'}
              </h2>
              <p>
                {isKo
                  ? '개인정보처리방침에 관한 문의사항은 '
                  : 'For inquiries regarding the privacy policy, please visit '}
                <Link href={`/${locale}/contact`} className="text-yellow-400 underline">
                  {isKo ? '문의하기' : 'Contact Us'}
                </Link>
                {isKo ? ' 페이지를 이용해 주세요.' : ' page.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-yellow-300 mb-3">
                {isKo ? '7. 방침 변경' : '7. Policy Changes'}
              </h2>
              <p>
                {isKo
                  ? '본 개인정보처리방침은 서비스 변경 시 업데이트될 수 있습니다. 최종 업데이트: 2024년 1월.'
                  : 'This privacy policy may be updated when the service changes. Last updated: January 2024.'}
              </p>
            </section>
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
