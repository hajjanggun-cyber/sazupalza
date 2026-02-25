import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import AdSense from '../../../components/AdSense';
import SeongmyeongForm from '../../../components/SeongmyeongForm';
import Link from 'next/link';

interface Props {
    params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
    const isKo = locale === 'ko';
    return {
        title: isKo
            ? '성명학 무료 분석 — 한자 획수·소리오행으로 보는 이름의 운'
            : 'Free Name Numerology — Soul Urge, Expression & Life Path Analysis',
        description: isKo
            ? '이름의 한자 획수와 소리오행을 분석해 드립니다. 원격·형격·이격·정격 4격과 81수리 해석, 개명 추천까지. 완전 무료!'
            : 'Discover your Expression Number, Soul Urge, Personality Number, and Life Path using Western Pythagorean Numerology. Free & instant.',
        keywords: isKo
            ? ['성명학 무료', '이름 획수 분석', '소리오행', '성명학 분석', '개명', '이름풀이', '81수리']
            : ['name numerology free', 'expression number', 'soul urge number', 'life path number', 'Pythagorean numerology'],
    };
}

export default async function SeongmyeongAnalysisPage({ params: { locale } }: Props) {
    unstable_setRequestLocale(locale);
    const isKo = locale === 'ko';

    const baseUrl = 'https://sajupalza.com';
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: isKo ? '성명학 무료 분석' : 'Free Name Numerology Analysis',
        url: `${baseUrl}/${locale}/seongmyeong-analysis`,
        description: isKo
            ? '한자 획수와 소리오행으로 이름의 운을 분석'
            : 'Pythagorean numerology: Soul Urge, Expression, Life Path',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web',
        inLanguage: locale,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    };

    // 특징 카드 데이터
    const features = isKo
        ? [
            { icon: '📐', label: '81수리 분석', desc: '원격·형격·이격·정격 4격 해석' },
            { icon: '🎵', label: '소리오행', desc: '초성의 목·화·토·금·수 상생 관계' },
            { icon: '漢', label: '한자 획수', desc: '원획 기준 정밀 획수 계산' },
            { icon: '✏️', label: '개명 가이드', desc: '보완할 오행과 추구 이미지 제안' },
        ]
        : [
            { icon: '⭐', label: 'Expression No.', desc: 'Your life purpose & destiny' },
            { icon: '💜', label: 'Soul Urge', desc: 'Your inner heart\'s desire' },
            { icon: '🎭', label: 'Personality No.', desc: 'How the world perceives you' },
            { icon: '🛤️', label: 'Life Path No.', desc: 'Your core life journey number' },
        ];

    return (
        <div className="min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <Navigation />

            {/* 상단 광고 */}
            <div className="flex justify-center py-3 bg-[#0d0502]">
                <AdSense slot="1234567890" format="horizontal" className="max-w-full" />
            </div>

            <main>
                {/* 헤더 */}
                <section className="relative py-10 px-4 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 to-transparent pointer-events-none" />
                    <div className="max-w-2xl mx-auto relative">

                        {/* 뒤로 가기 */}
                        <div className="mb-5">
                            <Link
                                href={`/${locale}`}
                                className="inline-flex items-center gap-1 text-yellow-500/70 hover:text-yellow-400 text-sm transition-colors"
                            >
                                ← {isKo ? '분석 유형 선택으로 돌아가기' : 'Back to service selection'}
                            </Link>
                        </div>

                        {/* 뱃지 */}
                        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm border ${isKo
                            ? 'bg-green-900/40 border-green-600/40 text-green-300'
                            : 'bg-purple-900/40 border-purple-600/40 text-purple-300'
                            }`}>
                            <span>✍️</span>
                            <span>{isKo ? '성명학 단독 분석' : 'Western Name Numerology'}</span>
                        </div>

                        <h1 className="text-2xl md:text-4xl font-bold text-yellow-100 leading-tight mb-3">
                            {isKo
                                ? '이름 속에 담긴 운명의 기운\n성명학 무료 분석'
                                : 'What Does Your Name Reveal?\nFree Numerology Analysis'}
                        </h1>

                        <p className="text-yellow-200/70 text-base mb-6">
                            {isKo
                                ? '한자 획수·소리오행·81수리로 이름의 기운을 정밀 해석합니다'
                                : 'Soul Urge · Expression · Life Path · Personality — analyzed instantly'}
                        </p>

                        {/* 신뢰 지표 */}
                        <div className="flex justify-center gap-5 text-sm flex-wrap">
                            <div className="flex items-center gap-1.5 text-yellow-300"><span>🆓</span><span>{isKo ? '완전 무료' : 'Free'}</span></div>
                            <div className="flex items-center gap-1.5 text-yellow-300"><span>🔒</span><span>{isKo ? '개인정보 저장 없음' : 'No data stored'}</span></div>
                            <div className="flex items-center gap-1.5 text-yellow-300"><span>⚡</span><span>{isKo ? '즉시 결과' : 'Instant result'}</span></div>
                        </div>
                    </div>
                </section>

                {/* 입력 폼 */}
                <section className="max-w-xl mx-auto px-4 pb-10">
                    <div className="card-dark p-6 md:p-8">
                        <SeongmyeongForm />
                    </div>
                </section>

                {/* 분석 항목 안내 */}
                <section className="max-w-3xl mx-auto px-4 pb-12">
                    <h2 className="text-xl font-bold text-center text-yellow-100 mb-6">
                        {isKo ? '📊 분석 결과에서 확인할 수 있는 것' : '📊 What You\'ll Get'}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {features.map((f) => (
                            <div key={f.label} className="card-dark p-4 text-center">
                                <div className="text-3xl mb-2">{f.icon}</div>
                                <div className="text-green-400 font-bold text-sm mb-1">{f.label}</div>
                                <div className="text-yellow-200/60 text-xs leading-relaxed">{f.desc}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 중간 광고 */}
                <div className="flex justify-center py-4">
                    <AdSense slot="0987654321" format="rectangle" />
                </div>

                {/* 통합 분석 유도 배너 */}
                <section className="max-w-3xl mx-auto px-4 pb-12">
                    <div className="rounded-xl border border-yellow-600/30 bg-gradient-to-r from-yellow-900/30 to-amber-900/20 p-5">
                        <div className="flex items-center gap-4">
                            <span className="text-4xl">⭐</span>
                            <div className="flex-1">
                                <p className="text-yellow-300 font-bold text-sm mb-1">
                                    {isKo ? '더 정확한 분석을 원하신다면?' : 'Want a more complete reading?'}
                                </p>
                                <p className="text-yellow-200/70 text-xs">
                                    {isKo
                                        ? '사주팔자·관상·성격유형까지 포함한 4가지 통합 분석을 받아보세요'
                                        : 'Try the combined analysis: Four Pillars + Face Reading + Numerology + Personality'}
                                </p>
                            </div>
                            <Link
                                href={`/${locale}/combined`}
                                className="shrink-0 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                            >
                                {isKo ? '통합 분석 →' : 'Combined →'}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 관련 블로그 */}
                <section className="max-w-3xl mx-auto px-4 pb-12">
                    <h2 className="text-xl font-bold text-yellow-100 mb-4">
                        {isKo ? '📚 성명학 알아보기' : '📚 Learn About Name Numerology'}
                    </h2>
                    {(() => {
                        const blogPosts = isKo
                            ? [
                                { slug: 'intro', title: '성명학 비기: 한자 획수의 비밀', cat: 'seongmyeong' },
                                { slug: 'name-creation', title: '작명의 기술: 계절에 맞는 이름 짓기', cat: 'seongmyeong' },
                                { slug: 'numerology-81', title: '성명학 수리 81수 완전정복', cat: 'seongmyeong' },
                            ]
                            : [
                                { slug: 'intro', title: 'Introduction to Korean Name Numerology', cat: 'seongmyeong' },
                                { slug: 'name-five-elements', title: 'Sound Elements in Korean Names', cat: 'seongmyeong' },
                                { slug: 'baby-naming', title: 'Baby Naming Guide', cat: 'seongmyeong' },
                            ];
                        return (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {blogPosts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/${locale}/${post.cat}/${post.slug}`}
                                        className="card-dark p-4 hover:border-green-500/50 transition-all hover:-translate-y-0.5"
                                    >
                                        <p className="text-yellow-300 text-sm font-medium line-clamp-2">{post.title}</p>
                                        <p className="text-yellow-200/40 text-xs mt-1">→ {isKo ? '읽어보기' : 'Read more'}</p>
                                    </Link>
                                ))}
                            </div>
                        );
                    })()}
                </section>
            </main>

            <Footer />
        </div >
    );
}
