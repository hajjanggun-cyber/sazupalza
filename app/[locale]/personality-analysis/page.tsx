import PersonalityForm from '@/components/PersonalityForm';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Metadata } from 'next';

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
    const isKo = locale === 'ko';
    return {
        title: isKo ? '성격 유형 자체 테스트 (20문항) | 사주팔자' : 'Personality Type Test | Sajupalza',
        description: isKo
            ? '정확하고 안전한 20문항 자체 성격 테스트로 16가지 나의 심리 유형을 분석해 보세요.'
            : 'Analyze your 16 cognitive types safely with our original 20-question personality test.',
    };
}

export default function PersonalityAnalysisPage({ params: { locale } }: Props) {
    setRequestLocale(locale);
    const t = useTranslations();
    const isKo = locale === 'ko';

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Sajupalza Personality Test Engine',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'All',
        url: `https://sajupalza.cc/${locale}/personality-analysis`,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="container-custom py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-10 fade-in-up">
                        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 mb-4 drop-shadow-sm">
                            {isKo ? '오리지널 성격 유형 테스트' : 'Original Personality Test'}
                        </h1>
                        <p className="text-yellow-100/80 text-lg">
                            {isKo
                                ? '단 20문항으로 나의 깊은 심리를 파악해 보세요.'
                                : 'Discover your deep psychology with just 20 questions.'}
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="card-dark p-6 md:p-10 mb-10 fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <PersonalityForm />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-purple-900/30 border border-purple-500/20 rounded-xl p-5 text-center">
                            <span className="text-3xl mb-2 block">⚖️</span>
                            <h3 className="font-bold text-yellow-100 mb-1">{isKo ? '저작권 안전' : 'Copyright Safe'}</h3>
                            <p className="text-xs text-yellow-100/60">
                                {isKo ? '자체 개발 문항으로 저작권 침해 요소가 전혀 없습니다.' : '100% original questions safely bypass copyright issues.'}
                            </p>
                        </div>
                        <div className="bg-purple-900/30 border border-purple-500/20 rounded-xl p-5 text-center">
                            <span className="text-3xl mb-2 block">🧭</span>
                            <h3 className="font-bold text-yellow-100 mb-1">{isKo ? '상세 해설' : 'Detailed Reading'}</h3>
                            <p className="text-xs text-yellow-100/60">
                                {isKo ? '테스트 완료 즉시 16가지 유형별 완벽 해설을 제공합니다.' : 'Direct insights into all 16 cognitive types upon completion.'}
                            </p>
                        </div>
                    </div>

                    {/* Blog Section link */}
                    <div className="card-glow p-8 text-center mt-12 fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3">
                            {isKo ? '성격 유형이 사주와 어떤 관계가 있을까?' : 'How does personality relate to fortune?'}
                        </h2>
                        <p className="text-yellow-100/80 text-sm md:text-base mb-6 max-w-lg mx-auto leading-relaxed">
                            {isKo
                                ? '동양의 명리학과 서양의 심리학은 신기하게도 맞닿아 있습니다.'
                                : 'Eastern astrology and Western psychology intersect in fascinating ways.'}
                        </p>
                        <Link
                            href={`/${locale}/mbti`}
                            className="inline-flex items-center gap-2 btn-gold py-3 px-8 text-sm md:text-base w-auto font-bold uppercase tracking-wider"
                        >
                            {isKo ? '성격유형 블로그 보기' : 'Read Personality Blog'}
                            <span>→</span>
                        </Link>
                    </div>

                </div>
            </main>
        </>
    );
}
