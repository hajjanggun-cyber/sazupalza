import PersonalityForm from '@/components/PersonalityForm';
import PrivacyStartNotice from '@/components/PrivacyStartNotice';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Metadata } from 'next';
import { buildLocaleAlternates, buildLocalizedHref, buildLocalizedUrl, SITE_URL } from '@/lib/seo';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
    const isKo = locale === 'ko';
    return {
        title: isKo ? '성격 유형 자체 테스트 (28문항) | 사주팔자' : 'Personality Type Test | Sajupalza',
        description: isKo
            ? '정확하고 안전한 28문항 자체 성격 테스트로 16가지 나의 심리 유형을 분석해 보세요.'
            : 'Analyze your 16 cognitive types safely with our original 28-question personality test.',
        alternates: buildLocaleAlternates(locale, '/personality-analysis'),
        openGraph: {
            title: isKo ? '성격 유형 자체 테스트 (28문항)' : 'Personality Type Test (28 Questions)',
            description: isKo
                ? '28문항으로 16가지 심리 유형을 분석! 완전 무료.'
                : 'Analyze your 16 cognitive types with our 28-question test. Free!',
            type: 'website',
            url: buildLocalizedUrl(locale, '/personality-analysis'),
            siteName: isKo ? '사주팔자 무료 컨설팅' : 'Korean Fortune Reading',
        },
        twitter: {
            card: 'summary_large_image',
            title: isKo ? '성격 유형 테스트' : 'Personality Type Test',
            description: isKo
                ? '28문항으로 16가지 심리 유형을 분석! 완전 무료.'
                : 'Analyze your 16 cognitive types. Free & instant.',
        },
    };
}

export default function PersonalityAnalysisPage({ params: { locale } }: Props) {
    setRequestLocale(locale);
    const t = useTranslations();
    const isKo = locale === 'ko';

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: isKo ? '오리지널 성격 유형 테스트' : 'Original Personality Type Test',
        description: isKo
            ? '28문항으로 16가지 심리 유형 분석 및 사주 오행 연계 해설'
            : '28-question test revealing 16 personality types with Five Elements correlation',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'All',
        url: buildLocalizedUrl(locale, '/personality-analysis'),
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: isKo
            ? [
                { '@type': 'Question', name: '이 성격 유형 테스트는 MBTI와 다른가요?', acceptedAnswer: { '@type': 'Answer', text: '네, 자체 개발한 28문항으로 구성된 독자적 테스트입니다. MBTI와 동일한 16가지 유형 체계를 사용하지만, 저작권 이슈가 없는 오리지널 문항으로 구성되어 있으며, 사주 오행과의 연계 해설이 포함됩니다.' } },
                { '@type': 'Question', name: '테스트 결과가 저장되나요?', acceptedAnswer: { '@type': 'Answer', text: '아니요, 개인 정보는 서버에 저장되지 않습니다. 결과는 브라우저 URL에 인코딩되어 처리되며, 언제든지 삭제할 수 있습니다.' } },
                { '@type': 'Question', name: '성격 유형과 사주는 어떤 연관이 있나요?', acceptedAnswer: { '@type': 'Answer', text: '사주의 일간(日干)과 오행 균형은 개인의 기질·성향과 연결됩니다. 예를 들어 목(木) 오행이 강한 사람은 INFP·ENFP 성향을 보이는 경우가 많습니다. 테스트 결과에서 오행 연계 분석을 확인하실 수 있습니다.' } },
                { '@type': 'Question', name: '28문항은 얼마나 걸리나요?', acceptedAnswer: { '@type': 'Answer', text: '평균 3~5분 정도 소요됩니다. 직관적으로 답하실 수 있도록 질문을 설계했습니다.' } },
            ]
            : [
                { '@type': 'Question', name: 'Is this test different from official MBTI?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. This is an original 28-question test with its own copyright-safe questions. It uses the same 16-type framework but adds Five Elements (Saju) correlation insights not found in standard MBTI tests.' } },
                { '@type': 'Question', name: 'Is my data stored?', acceptedAnswer: { '@type': 'Answer', text: 'No. Your answers are never sent to a server. Results are encoded directly in the browser URL and can be cleared anytime.' } },
                { '@type': 'Question', name: 'How do personality types connect to Saju?', acceptedAnswer: { '@type': 'Answer', text: 'The Day Stem (Ilgan) and Five Elements balance in your Saju chart correlate with personality tendencies. For example, strong Wood element individuals often show INFP or ENFP patterns. Your result will include this correlation analysis.' } },
            ],
    };

    const features = isKo
        ? [
            { icon: '🧠', label: '16가지 유형', desc: 'INTJ·ENFP 등 16가지 심리 유형 분류' },
            { icon: '🌳', label: '오행 연계', desc: '목·화·토·금·수와 성격의 연결 분석' },
            { icon: '💡', label: '강점·약점', desc: '유형별 핵심 강점과 주의해야 할 점' },
            { icon: '❤️', label: '인간관계', desc: '나와 잘 맞는 유형 및 갈등 유형 안내' },
        ]
        : [
            { icon: '🧠', label: '16 Types', desc: 'INTJ, ENFP and all 16 cognitive types' },
            { icon: '🌳', label: 'Five Elements', desc: 'Wood/Fire/Earth/Metal/Water personality link' },
            { icon: '💡', label: 'Strengths', desc: 'Core strengths and caution points per type' },
            { icon: '❤️', label: 'Compatibility', desc: 'Best match types and conflict patterns' },
        ];

    const blogPosts = isKo
        ? [
              { slug: 'intro', title: 'MBTI와 사주를 함께 보면 보이는 것들' },
              { slug: 'saju-five-elements', title: '오행과 MBTI의 연결 고리 완전 해설' },
              { slug: 'mbti-compatibility', title: 'MBTI 궁합이 말해주는 것과 한계' },
          ]
        : [
              { slug: 'intro', title: 'How MBTI and Saju Work Together' },
              { slug: 'saju-five-elements', title: 'How the Five Elements Connect to MBTI' },
              { slug: 'mbti-compatibility', title: 'What MBTI Compatibility Can and Cannot Tell You' },
          ];

    return (
        <div className="min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

            <Navigation />

            <main className="container-custom py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-10 fade-in-up">
                        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 mb-4 drop-shadow-sm">
                            {isKo ? '오리지널 성격 유형 테스트' : 'Original Personality Test'}
                        </h1>
                        <p className="text-yellow-100/80 text-lg">
                            {isKo
                                ? '단 28문항으로 나의 깊은 심리를 파악해 보세요.'
                                : 'Discover your deep psychology with just 28 questions.'}
                        </p>
                    </div>

                    <PrivacyStartNotice locale={locale} className="mb-10" />

                    <div className="card-dark p-6 md:p-10 mb-10 fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <PersonalityForm />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-purple-900/30 border border-purple-500/20 rounded-xl p-5 text-center">
                            <span className="text-3xl mb-2 block">🛡️</span>
                            <h3 className="font-bold text-yellow-100 mb-1">{isKo ? '저작권 안전' : 'Copyright Safe'}</h3>
                            <p className="text-xs text-yellow-100/60">
                                {isKo
                                    ? '자체 개발 문항을 사용해 저작권 충돌 가능성을 낮췄습니다.'
                                    : 'Built with original questions to reduce copyright risk.'}
                            </p>
                        </div>
                        <div className="bg-purple-900/30 border border-purple-500/20 rounded-xl p-5 text-center">
                            <span className="text-3xl mb-2 block">🧠</span>
                            <h3 className="font-bold text-yellow-100 mb-1">{isKo ? '상세 해설' : 'Detailed Reading'}</h3>
                            <p className="text-xs text-yellow-100/60">
                                {isKo
                                    ? '테스트 완료 즉시 16가지 유형별 핵심 해설을 제공합니다.'
                                    : 'Direct insights into all 16 cognitive types upon completion.'}
                            </p>
                        </div>
                    </div>

                    {/* 분석 항목 안내 */}
                    <section className="mb-10 fade-in-up" style={{ animationDelay: '0.25s' }}>
                        <h2 className="text-xl font-bold text-center text-yellow-100 mb-6">
                            {isKo ? '📊 테스트 결과에서 확인할 수 있는 것' : '📊 What You\'ll Get'}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {features.map((f) => (
                                <div key={f.label} className="card-dark p-4 text-center">
                                    <div className="text-3xl mb-2">{f.icon}</div>
                                    <div className="text-yellow-400 font-bold text-sm mb-1">{f.label}</div>
                                    <div className="text-yellow-200/60 text-xs leading-relaxed">{f.desc}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="mb-10 fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <h2 className="text-xl font-bold text-yellow-300 mb-4">
                            {isKo ? '자주 묻는 질문' : 'Frequently Asked Questions'}
                        </h2>
                        <div className="space-y-3">
                            {(faqJsonLd.mainEntity as any[]).map((item: any, i: number) => (
                                <div key={i} className="card-dark p-4">
                                    <p className="text-yellow-400 font-bold mb-2 text-sm">Q. {item.name}</p>
                                    <p className="text-white/70 text-sm leading-relaxed">A. {item.acceptedAnswer.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-12 fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-4 text-center">
                            {isKo ? '📚 성격유형 알아보기' : '📚 Learn About Personality Types'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {blogPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={buildLocalizedHref(locale, `/mbti/${post.slug}`)}
                                    className="card-dark p-4 hover:border-purple-500/50 transition-all hover:-translate-y-0.5"
                                >
                                    <p className="text-yellow-300 text-sm font-medium line-clamp-2">{post.title}</p>
                                    <p className="text-yellow-200/40 text-xs mt-1">→ {isKo ? '읽어보기' : 'Read more'}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
