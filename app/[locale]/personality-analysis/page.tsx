import PersonalityForm from '@/components/PersonalityForm';
import PrivacyStartNotice from '@/components/PrivacyStartNotice';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Metadata } from 'next';
import { buildLocaleAlternates, buildLocalizedHref, buildLocalizedUrl } from '@/lib/seo';

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
        url: buildLocalizedUrl(locale, '/personality-analysis'),
    };

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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

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
