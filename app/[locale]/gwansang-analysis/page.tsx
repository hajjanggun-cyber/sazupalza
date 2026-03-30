import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import AdSense from '../../../components/AdSense';
import GwansangForm from '../../../components/GwansangForm';
import PrivacyStartNotice from '../../../components/PrivacyStartNotice';
import Link from 'next/link';
import { SITE_URL, buildLocaleAlternates, buildLocalizedHref, buildLocalizedUrl } from '@/lib/seo';

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
        alternates: buildLocaleAlternates(locale, '/gwansang-analysis'),
        openGraph: {
            title: isKo ? '관상 무료 분석 — 얼굴로 보는 운명과 성격' : 'Free Face Reading — Personality & Fortune Analysis',
            description: isKo
                ? '사진 한 장으로 얼굴형·대칭도·기운을 AI 분석! 완전 무료.'
                : 'Upload your photo for AI-powered face reading. Free & instant.',
            type: 'website',
            url: buildLocalizedUrl(locale, '/gwansang-analysis'),
            siteName: isKo ? '사주팔자 무료 컨설팅' : 'Korean Fortune Reading',
        },
        twitter: {
            card: 'summary_large_image',
            title: isKo ? '관상 무료 분석' : 'Free Face Reading',
            description: isKo
                ? '사진 한 장으로 얼굴형·대칭도·기운을 AI 분석! 완전 무료.'
                : 'Upload your photo for AI-powered face reading. Free & instant.',
        },
    };
}

export default async function GwansangAnalysisPage({ params: { locale } }: Props) {
    unstable_setRequestLocale(locale);
    const isKo = locale === 'ko';

    const baseUrl = SITE_URL;
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: isKo ? '관상 무료 분석' : 'Free Face Reading Analysis',
        url: buildLocalizedUrl(locale, '/gwansang-analysis'),
        description: isKo
            ? '얼굴 사진으로 관상을 분석. AI 기반 얼굴형·대칭도·기운 판독'
            : 'AI-powered face reading: shape, symmetry, and fortune analysis',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web',
        inLanguage: locale,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: isKo
            ? [
                { '@type': 'Question', name: '관상 분석은 어떤 결과를 알려주나요?', acceptedAnswer: { '@type': 'Answer', text: 'AI가 사진을 분석하여 얼굴형(타원형·둥근형·각진형·역삼각형), 좌우 대칭도 점수, 인상 에너지 강도를 측정하고 관상학적 해석을 제공합니다. 전통 관상학의 이목구비 특징과 현대 AI 분석을 결합한 결과입니다.' } },
                { '@type': 'Question', name: '사진이 서버에 저장되나요?', acceptedAnswer: { '@type': 'Answer', text: '아니요, 사진은 서버에 전송되거나 저장되지 않습니다. 모든 AI 분석은 브라우저(로컬)에서 처리되며 분석 완료 후 자동으로 삭제됩니다.' } },
                { '@type': 'Question', name: '어떤 사진이 좋은 결과를 얻나요?', acceptedAnswer: { '@type': 'Answer', text: '정면을 바라보는 밝은 조명의 사진이 가장 정확합니다. 모자나 선글라스를 착용하지 않은 상태, 화장이 너무 짙지 않은 상태가 좋습니다. 정면 사진 1장 필수, 측면 사진을 함께 올리면 더 풍부한 분석을 받을 수 있습니다.' } },
                { '@type': 'Question', name: '관상이란 무엇인가요?', acceptedAnswer: { '@type': 'Answer', text: '관상(觀相)은 얼굴의 형태와 이목구비의 특징으로 그 사람의 성격, 운세, 건강 경향을 읽는 동양의 전통 학문입니다. 이마(관운), 눈(판단력), 코(재운), 입(복), 귀(수명) 등 각 부위가 서로 다른 의미를 담고 있습니다.' } },
            ]
            : [
                { '@type': 'Question', name: 'What does the face reading analysis include?', acceptedAnswer: { '@type': 'Answer', text: 'Our AI detects face shape (oval, round, square, triangle), measures left-right symmetry score, reads expression energy, and provides traditional physiognomy interpretations for each facial feature.' } },
                { '@type': 'Question', name: 'Is my photo stored on a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. Photos are never uploaded to any server. All AI processing runs entirely in your browser and the image data is discarded immediately after analysis.' } },
                { '@type': 'Question', name: 'What makes a good photo for analysis?', acceptedAnswer: { '@type': 'Answer', text: 'A front-facing photo in good lighting gives the most accurate result. Avoid hats, sunglasses, or heavy makeup. One front-facing photo is required; adding a side-profile photo enriches the reading.' } },
            ],
    };

    const features = isKo
        ? [
            { icon: '🔺', label: '얼굴형 분석', desc: '타원형·둥근형·각진형·역삼각형 분류' },
            { icon: '⚖️', label: '대칭도 점수', desc: 'AI 랜드마크 기반 좌우 대칭 측정' },
            { icon: '🌊', label: '인상 에너지', desc: '표정 에너지로 기운 강도 분석' },
            { icon: '🎯', label: '풍부한 해석', desc: '정면+측면 사진을 함께 올리면 참고 정보가 더 늘어납니다' },
        ]
        : [
            { icon: '🔺', label: 'Face Shape', desc: 'Oval / Round / Square / Triangle' },
            { icon: '⚖️', label: 'Symmetry Score', desc: 'AI landmark-based left-right balance' },
            { icon: '🌊', label: 'Expression Energy', desc: 'Dominant energy from facial expression' },
            { icon: '🎯', label: 'Richer Reading', desc: 'Front + side photos provide fuller context' },
        ];

    return (
        <div className="min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

            <Navigation />

            <div className="flex justify-center px-4">
                <div className="w-full max-w-5xl">
                    <AdSense slot="1234567890" format="horizontal" className="max-w-full" />
                </div>
            </div>

            <main>
                {/* 헤더 */}
                <section className="relative py-10 px-4 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 to-transparent pointer-events-none" />
                    <div className="max-w-2xl mx-auto relative">

                        {/* 뒤로 가기 */}
                        <div className="mb-5">
                            <Link
                                href={buildLocalizedHref(locale)}
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
                <section className="max-w-3xl mx-auto px-4 pb-8">
                    <PrivacyStartNotice locale={locale} />
                </section>

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

                <AdSense slot="0987654321" format="rectangle" />

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
                                href={buildLocalizedHref(locale, '/combined')}
                                className="shrink-0 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                            >
                                {isKo ? '통합 분석 →' : 'Combined →'}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="max-w-3xl mx-auto px-4 pb-12">
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
                                        href={buildLocalizedHref(locale, `/${post.cat}/${post.slug}`)}
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
