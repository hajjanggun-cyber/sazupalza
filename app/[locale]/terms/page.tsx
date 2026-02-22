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
    title: isKo ? '이용약관 | 사주팔자 종합 컨설팅' : 'Terms of Service | SajuPalza',
    description: isKo
      ? '사주팔자 종합 컨설팅 서비스 이용약관입니다.'
      : 'Terms of Service for SajuPalza fortune reading service.',
  };
}

export default async function TermsPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const isKo = locale === 'ko';

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-yellow-100 mb-8">
          {isKo ? '이용약관' : 'Terms of Service'}
        </h1>

        <div className="card-dark p-6 mb-6">
          <div className="space-y-8 text-yellow-200/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-yellow-300 mb-3">
                {isKo ? '제1조 (목적)' : 'Article 1 (Purpose)'}
              </h2>
              <p>
                {isKo
                  ? '본 약관은 사주팔자 종합 컨설팅 서비스(이하 "서비스")의 이용 조건 및 절차, 기타 필요한 사항을 규정함을 목적으로 합니다.'
                  : 'These terms govern the conditions and procedures for using the SajuPalza comprehensive fortune reading service (hereinafter "Service").'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-yellow-300 mb-3">
                {isKo ? '제2조 (서비스 내용)' : 'Article 2 (Service Content)'}
              </h2>
              <p className="mb-2">
                {isKo
                  ? '본 서비스는 전통 동양철학(사주팔자, 성명학, 관상, MBTI)을 기반으로 한 무료 참고 정보 서비스입니다:'
                  : 'This service provides free reference information based on traditional Eastern philosophy (Four Pillars, Name Numerology, Face Reading, MBTI):'}
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>{isKo ? '사주팔자 분석 (생년월일시 기반)' : 'Four Pillars analysis (based on birth date and time)'}</li>
                <li>{isKo ? '성명학 분석 (이름 획수 및 소리오행)' : 'Name numerology analysis (stroke count and sound elements)'}</li>
                <li>{isKo ? '관상 분석 (선택사항, 브라우저 내 처리)' : 'Face reading analysis (optional, processed in browser)'}</li>
                <li>{isKo ? 'MBTI 연계 분석 (선택사항)' : 'MBTI integrated analysis (optional)'}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-yellow-300 mb-3">
                {isKo ? '제3조 (면책 조항)' : 'Article 3 (Disclaimer)'}
              </h2>
              <div className="p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                <p className="mb-2 font-medium text-yellow-300">
                  {isKo ? '⚠️ 중요 안내' : '⚠️ Important Notice'}
                </p>
                <ul className="space-y-2">
                  <li>
                    {isKo
                      ? '• 본 서비스는 전통 동양철학 이론을 기반으로 AI가 생성한 참고 자료입니다'
                      : '• This service provides AI-generated reference material based on traditional Eastern philosophy theory'}
                  </li>
                  <li>
                    {isKo
                      ? '• 재미와 자기 이해를 위한 용도로만 활용하시기 바랍니다'
                      : '• Please use only for entertainment and self-understanding purposes'}
                  </li>
                  <li>
                    {isKo
                      ? '• 중요한 결정(투자, 결혼, 취업 등)은 반드시 전문가와 상담하시기 바랍니다'
                      : '• For important decisions (investment, marriage, employment, etc.), please consult with professionals'}
                  </li>
                  <li>
                    {isKo
                      ? '• 같은 생년월일시로 분석하면 항상 동일한 결과가 나옵니다'
                      : '• The same birth date and time will always produce the same result'}
                  </li>
                  <li>
                    {isKo
                      ? '• 본 서비스는 점술, 신점, 무속 서비스가 아닙니다'
                      : '• This service is not a fortune-telling, psychic, or shamanistic service'}
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-yellow-300 mb-3">
                {isKo ? '제4조 (이용자 의무)' : 'Article 4 (User Obligations)'}
              </h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>{isKo ? '허위 정보를 입력하지 않습니다' : 'Do not enter false information'}</li>
                <li>{isKo ? '타인의 개인정보를 무단으로 이용하지 않습니다' : "Do not use others' personal information without permission"}</li>
                <li>{isKo ? '서비스를 법령 위반 목적으로 이용하지 않습니다' : 'Do not use the service for purposes that violate laws'}</li>
                <li>{isKo ? '서비스의 정상적인 운영을 방해하지 않습니다' : 'Do not interfere with the normal operation of the service'}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-yellow-300 mb-3">
                {isKo ? '제5조 (광고)' : 'Article 5 (Advertising)'}
              </h2>
              <p>
                {isKo
                  ? '본 서비스는 Google AdSense를 통한 광고를 표시합니다. 광고 수익은 서비스 유지 및 발전을 위해 사용됩니다. 광고 클릭은 자유의사이며 강제되지 않습니다.'
                  : 'This service displays ads through Google AdSense. Ad revenue is used to maintain and develop the service. Clicking ads is voluntary and not forced.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-yellow-300 mb-3">
                {isKo ? '제6조 (저작권)' : 'Article 6 (Copyright)'}
              </h2>
              <p>
                {isKo
                  ? '본 서비스의 콘텐츠(텍스트, 디자인, 로직 등)에 대한 저작권은 서비스 운영자에게 있습니다. 무단 복제 및 배포를 금합니다.'
                  : "Copyright for the service's content (text, design, logic, etc.) belongs to the service operator. Unauthorized reproduction and distribution is prohibited."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-yellow-300 mb-3">
                {isKo ? '제7조 (약관 변경)' : 'Article 7 (Terms Changes)'}
              </h2>
              <p>
                {isKo
                  ? '본 약관은 서비스 변경 시 업데이트될 수 있습니다. 변경 시 서비스 내에 공지합니다. 최종 업데이트: 2024년 1월.'
                  : 'These terms may be updated when the service changes. Changes will be announced within the service. Last updated: January 2024.'}
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
