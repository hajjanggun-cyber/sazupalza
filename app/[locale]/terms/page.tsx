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
    title: isKo ? '이용약관 (Terms of Service) | 사주팔자 무료 컨설팅' : 'Terms of Service | SajuPalza',
    description: isKo
      ? '사주팔자 무료 컨설팅 서비스의 이용약관입니다. 글로벌 표준 약관에 기반한 서비스 이용 규칙 및 면책 조항을 확인하세요.'
      : 'Terms of Service for SajuPalza fortune reading service. Check the rules and disclaimers based on global standard terms.',
    alternates: {
      canonical: `https://sajupalza.cc/${locale}/terms`,
    }
  };
}

export default async function TermsPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const isKo = locale === 'ko';

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <article className="prose prose-invert max-w-none">
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-100 mb-4">
              {isKo ? '이용약관' : 'Terms of Service'}
            </h1>
            <p className="text-yellow-200/70">
              {isKo ? '최종 업데이트: 2026년 3월 | 글로벌 서비스 표준 약관' : 'Last Updated: March 2026 | Global Service Standard Terms'}
            </p>
          </header>

          <div className="card-dark p-6 md:p-8 mb-8">
            <div className="space-y-10 text-yellow-200/80 leading-relaxed">
              
              <section>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-900/50 pb-2">
                  {isKo ? '제1조 (목적 및 수용)' : 'Article 1 (Purpose and Acceptance)'}
                </h3>
                <p>
                  {isKo
                    ? '본 약관은 사용자가 사주팔자 무료 컨설팅 서비스(이하 "서비스")를 이용함에 있어 필요한 조건, 절차 및 당사자의 권리와 의무를 규정함을 목적으로 합니다. 본 서비스에 접속하거나 이용함으로써 귀하는 본 약관에 동의하는 것으로 간주됩니다.'
                    : 'These terms govern the conditions, procedures, and rights and obligations of the parties regarding the use of the SajuPalza comprehensive fortune reading service (hereinafter "Service"). By accessing or using the Service, you agree to be bound by these Terms.'}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-900/50 pb-2">
                  {isKo ? '제2조 (서비스 내용 및 범위)' : 'Article 2 (Content and Scope of Service)'}
                </h3>
                <p className="mb-3">
                  {isKo
                    ? '본 서비스는 전통 동양철학과 현대적 분석 기법을 결합한 무료 참고 정보를 제공합니다:'
                    : 'This service provides free reference information combining traditional Eastern philosophy and modern analysis techniques:'}
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2 text-yellow-100/70">
                  <li>{isKo ? '사주팔자 분석 (생년월일시 기반)' : 'Four Pillars analysis (based on birth date and time)'}</li>
                  <li>{isKo ? '성명학 분석 (이름 획수 및 소리오행)' : 'Name numerology analysis (stroke count and sound elements)'}</li>
                  <li>{isKo ? '관상 분석 (브라우저 내장 AI 처리)' : 'Face reading analysis (processed by in-browser AI)'}</li>
                  <li>{isKo ? 'MBTI 연계 분석' : 'MBTI integrated analysis'}</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-900/50 pb-2">
                  {isKo ? '제3조 (중대한 면책 조항 및 책임의 한계)' : 'Article 3 (Disclaimer and Limitation of Liability)'}
                </h3>
                <div className="p-5 bg-yellow-900/20 border border-yellow-600/30 rounded-xl mt-2 mb-4">
                  <p className="mb-3 font-bold text-yellow-300 flex items-center gap-2">
                    <span className="text-2xl" aria-hidden="true">⚠️</span>
                    {isKo ? '법적 면책 조항 (Legal Disclaimer)' : 'Legal Disclaimer'}
                  </p>
                  <ul className="space-y-3 text-yellow-100/80">
                    <li>
                      {isKo
                        ? '1. 본 서비스는 전통 이론을 바탕으로 한 "엔터테인먼트 및 자기 성찰용" 참고 자료일 뿐입니다.'
                        : '1. This service is purely for "entertainment and self-reflection" purposes based on traditional theories.'}
                    </li>
                    <li>
                      {isKo
                        ? '2. 서비스에서 제공하는 결과는 어떠한 의학적, 법률적, 재무적, 심리적 전문 상담이나 진단을 대체할 수 없습니다.'
                        : '2. The results provided by the service cannot replace any professional medical, legal, financial, or psychological counseling or diagnosis.'}
                    </li>
                    <li>
                      {isKo
                        ? '3. 투자, 결혼, 취업, 이사 등 인생의 중대한 결정에 있어 본 서비스의 결과를 절대적인 기준으로 삼아서는 안 되며, 이로 인해 발생하는 모든 결과에 대한 책임은 전적으로 사용자 본인에게 있습니다.'
                        : '3. You should not use the results of this service as an absolute standard for major life decisions (investment, marriage, employment, moving, etc.), and you bear full responsibility for any consequences arising from doing so.'}
                    </li>
                    <li>
                      {isKo
                        ? '4. 당사는 서비스 결과의 정확성, 신뢰성, 완전성, 적합성에 대해 어떠한 명시적 또는 묵시적 보증도 하지 않습니다.'
                        : '4. We make no express or implied warranties regarding the accuracy, reliability, completeness, or suitability of the service results.'}
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-900/50 pb-2">
                  {isKo ? '제4조 (사용자 행동 규범 및 금지 행위)' : 'Article 4 (User Conduct and Prohibited Activities)'}
                </h3>
                <p className="mb-2">
                  {isKo ? '사용자는 다음 행위를 하여서는 안 됩니다:' : 'Users must not engage in the following activities:'}
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2 text-yellow-100/70">
                  <li>{isKo ? '타인의 개인정보(이름, 생년월일, 사진 등)를 본인의 동의 없이 무단으로 도용하여 분석하는 행위' : "Using others' personal information (name, birth date, photo, etc.) for analysis without their explicit consent"}</li>
                  <li>{isKo ? '서비스의 서버, 네트워크, 시스템에 부하를 주거나 해킹, 크래킹 등을 시도하는 행위' : 'Overloading, hacking, or cracking the service servers, networks, or systems'}</li>
                  <li>{isKo ? '서비스에서 제공하는 데이터베이스나 결과물을 자동화된 스크립트, 봇(Bot) 등을 통해 대량으로 수집하는 행위' : 'Mass collecting database or results provided by the service via automated scripts or bots'}</li>
                  <li>{isKo ? '기타 관련 법령이나 선량한 풍속에 위배되는 행위' : 'Any other activities that violate applicable laws or good public morals'}</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-900/50 pb-2">
                  {isKo ? '제5조 (지적재산권)' : 'Article 5 (Intellectual Property Rights)'}
                </h3>
                <p>
                  {isKo
                    ? '본 서비스 내의 모든 콘텐츠, 텍스트, 그래픽, UI/UX, 소프트웨어 코드 및 분석 알고리즘에 대한 저작권 및 지적재산권은 서비스 운영자에게 독점적으로 귀속됩니다. 사용자는 개인적인 목적으로만 서비스를 이용할 수 있으며, 영리적 목적으로 무단 복제, 배포, 2차적 저작물 작성을 할 수 없습니다.'
                    : 'All copyrights and intellectual property rights to the content, text, graphics, UI/UX, software code, and analysis algorithms within this service belong exclusively to the service operator. Users may only use the service for personal purposes and may not reproduce, distribute, or create derivative works for commercial purposes without permission.'}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-900/50 pb-2">
                  {isKo ? '제6조 (광고의 게재)' : 'Article 6 (Advertisement Display)'}
                </h3>
                <p>
                  {isKo
                    ? '본 서비스는 완전 무료로 제공되며, 그 유지 및 운영을 위해 타사 광고 플랫폼(예: Google AdSense)을 통한 광고가 게재될 수 있습니다. 사용자는 서비스 이용 시 노출되는 광고 게재에 동의하는 것으로 간주합니다.'
                    : 'This service is provided completely free of charge, and advertisements may be displayed through third-party advertising platforms (e.g., Google AdSense) for its maintenance and operation. Users are deemed to agree to the display of advertisements exposed while using the service.'}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 border-b border-yellow-900/50 pb-2">
                  {isKo ? '제7조 (준거법 및 관할법원)' : 'Article 7 (Governing Law and Jurisdiction)'}
                </h3>
                <p>
                  {isKo
                    ? '본 약관의 해석 및 적용에 관해서는 대한민국 법률을 준거법으로 합니다. 서비스 이용과 관련하여 분쟁이 발생할 경우, 관련 법령에 따른 관할 법원에 소를 제기할 수 있습니다. 단, 글로벌 사용자의 경우 각 국가의 강행법규가 우선 적용될 수 있습니다.'
                    : 'The interpretation and application of these Terms shall be governed by the laws of the Republic of Korea. In the event of a dispute arising in connection with the use of the Service, a lawsuit may be filed in the competent court in accordance with relevant laws. However, for global users, the mandatory laws of each country may take precedence.'}
                </p>
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
