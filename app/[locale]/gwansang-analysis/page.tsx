import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import AdSense from '../../../components/AdSense';
import GwansangForm from '../../../components/GwansangForm';
import Link from 'next/link';

interface Props {
    params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
    const isKo = locale === 'ko';
    return {
        title: isKo
            ? '관상 무료 분석 — 얼굴로 보는 운명과 성격'
            : 'Free Face Reading — Personality & Fortune Analysis',
        description: isKo
            ? '정면·측면 사진 한 장으로 얼굴형, 대칭도, 기운을 AI로 분석합니다. 관상학 기반 성격·재물운·연애운까지. 완전 무료!'
            : 'Upload your photo and discover your face shape, symmetry score, and personality traits through AI-powered face reading. Free & instant.',
        keywords: isKo
            ? ['관상 무료', '관상 분석', '얼굴 관상', '관상보기', '얼굴형 분석', '관상학']
            : ['face reading free', 'face shape analysis', 'physiognomy', 'face fortune', 'AI face reading'],
    };
}

export default async function GwansangAnalysisPage({ params: { locale } }: Props) {
    unstable_setRequestLocale(locale);
    const isKo = locale === 'ko';

    const baseUrl = 'https://sajupalza.com';
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: isKo ? '관상 무료 분석' : 'Free Face Reading Analysis',
        url: `${baseUrl}/${locale}/gwansang-analysis`,
        description: isKo
            ? '얼굴 사진으로 관상을 분석. AI 기반 얼굴형·대칭도·기운 판독'
            : 'AI-powered face reading: shape, symmetry, and fortune analysis',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web',
        inLanguage: locale,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    };

    const features = isKo
        ? [
            { icon: '🔺', label: '얼굴형 분석', desc: '타원형·둥근형·각진형·역삼각형 분류' },
            { icon: '⚖️', label: '대칭도 점수', desc: 'AI 랜드마크 기반 좌우 대칭 측정' },
            { icon: '🌊', label: '인상 에너지', desc: '표정 에너지로 기운 강도 분석' },
            { icon: '🎯', label: '95% 정확도', desc: '정면+측면 사진 함께 올리면 최고 정확도' },
        ]
        : [
            { icon: '🔺', label: 'Face Shape', desc: 'Oval / Round / Square / Triangle' },
            { icon: '⚖️', label: 'Symmetry Score', desc: 'AI landmark-based left-right balance' },
            { icon: '🌊', label: 'Expression Energy', desc: 'Dominant energy from facial expression' },
            { icon: '🎯', label: '95% Accuracy', desc: 'Front + Side photo = maximum precision' },
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
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 to-transparent pointer-events-none" />
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
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm border bg-orange-900/40 border-orange-600/40 text-orange-300">
                            <span>👁️</span>
                            <span>{isKo ? '관상 단독 분석' : 'AI Face Reading'}</span>
                        </div>

                        <h1 className="text-2xl md:text-4xl font-bold text-yellow-100 leading-tight mb-3">
                            {isKo
                                ? '얼굴 속에 담긴 운명의 기운\n관상 무료 분석'
                                : 'What Does Your Face Reveal?\nFree AI Face Reading'}
                        </h1>

                        <p className="text-yellow-200/70 text-base mb-6">
                            {isKo
                                ? 'AI가 얼굴형·대칭도·표정 에너지를 분석해 관상학적 운세를 알려드립니다'
                                : 'AI analyzes your face shape, symmetry & expression energy to reveal your fortune'}
                        </p>

                        {/* 신뢰 지표 */}
                        <div className="flex justify-center gap-5 text-sm flex-wrap">
                            <div className="flex items-center gap-1.5 text-yellow-300"><span>🆓</span><span>{isKo ? '완전 무료' : 'Free'}</span></div>
                            <div className="flex items-center gap-1.5 text-yellow-300"><span>🔒</span><span>{isKo ? '사진 서버 저장 없음' : 'Photos never stored'}</span></div>
                            <div className="flex items-center gap-1.5 text-yellow-300"><span>⚡</span><span>{isKo ? '즉시 결과' : 'Instant result'}</span></div>
                        </div>
                    </div>
                </section>

                {/* 입력 폼 */}
                <section className="max-w-xl mx-auto px-4 pb-10">
                    <div className="card-dark p-6 md:p-8">
                        <GwansangForm />
                    </div>
                </section>

                {/* 분석 항목 안내 */}
                <section className="max-w-3xl mx-auto px-4 pb-12">
                    <h2 className="text-xl font-bold text-center text-yellow-100 mb-6">
                        {isKo ? '📊 분석 결과에서 확인할 수 있는 것' : "📊 What You'll Get"}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {features.map((f) => (
                            <div key={f.label} className="card-dark p-4 text-center">
                                <div className="text-3xl mb-2">{f.icon}</div>
                                <div className="text-orange-400 font-bold text-sm mb-1">{f.label}</div>
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
                                        ? '사주팔자·성명학·성격유형까지 포함한 4가지 통합 분석을 받아보세요'
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
                        {isKo ? '📚 관상학 알아보기' : '📚 Learn About Face Reading'}
                    </h2>
                    {(() => {
                        const blogPosts = isKo
                            ? [
                                { slug: 'wealth-face', title: '재물운 좋은 관상의 특징 7가지', cat: 'face-reading' },
                                { slug: 'love-face', title: '연애운 좋은 관상 — 눈·코·입 분석', cat: 'face-reading' },
                                { slug: 'face-shape', title: '얼굴형별 관상 완전 가이드', cat: 'face-reading' },
                            ]
                            : [
                                { slug: 'wealth-face', title: '7 Signs of a Wealth Face in Physiognomy', cat: 'face-reading' },
                                { slug: 'love-face', title: 'Love Fortune Face Reading Guide', cat: 'face-reading' },
                                { slug: 'face-shape', title: 'Face Shape Physiognomy Complete Guide', cat: 'face-reading' },
                            ];
                        return (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {blogPosts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/${locale}/${post.cat}/${post.slug}`}
                                        className="card-dark p-4 hover:border-orange-500/50 transition-all hover:-translate-y-0.5"
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
        </div>
    );
}
