import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import AdSense from '../../../components/AdSense';
import SajuForm from '../../../components/SajuForm';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
    const isKo = locale === 'ko';
    return {
        title: isKo
            ? '사주팔자 무료 분석 — 생년월일로 보는 오행과 운명'
            : 'Free Four Pillars Reading — Discover Your Saju Destiny',
        description: isKo
            ? '이름과 생년월일(음력/양력), 태어난 시간을 입력하면 무료로 사주팔자 분석! 천간·지지·오행·수호신까지 즉시 결과.'
            : 'Enter your name and birth date for a free Four Pillars (Saju) reading. Get your Heavenly Stems, Earthly Branches, and Five Elements instantly.',
        keywords: isKo
            ? ['사주팔자 무료', '사주 분석', '무료 사주', '오행 분석', '사주보기', '생년월일 운세']
            : ['four pillars free', 'saju reading', 'Korean fortune', 'birth chart Korean', 'five elements'],
    };
}

export default async function SajuAnalysisPage({ params: { locale } }: Props) {
    unstable_setRequestLocale(locale);
    const isKo = locale === 'ko';

    const baseUrl = 'https://sajupalza.cc';
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: isKo ? '사주팔자 무료 분석' : 'Free Four Pillars Saju Reading',
        url: `${baseUrl}/${locale}/saju-analysis`,
        description: isKo
            ? '생년월일·음력양력·생시 입력으로 즉시 사주팔자 분석'
            : 'Instant Saju Four Pillars reading using birth date and time',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web',
        inLanguage: locale,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    };

    const features = isKo
        ? [
            { icon: '🌳', label: '오행 분석', desc: '목·화·토·금·수의 균형과 용신' },
            { icon: '📅', label: '사주팔자', desc: '연·월·일·시주 8글자 완성' },
            { icon: '🐯', label: '수호신', desc: '청룡·백호·주작·현무 중 내 수호신' },
            { icon: '⭐', label: '운세 점수', desc: '종합 운세 점수 및 해석' },
        ]
        : [
            { icon: '🌳', label: 'Five Elements', desc: 'Balance of Wood, Fire, Earth, Metal, Water' },
            { icon: '📅', label: 'Four Pillars', desc: 'Year, Month, Day, Hour pillars revealed' },
            { icon: '🐯', label: 'Guardian Spirit', desc: 'Your protective deity (Dragon, Tiger, Phoenix, Tortoise)' },
            { icon: '⭐', label: 'Fortune Score', desc: 'Overall destiny score and interpretation' },
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
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent pointer-events-none" />
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

                        {/* 카테고리 뱃지 */}
                        <div className="inline-flex items-center gap-2 bg-amber-900/40 border border-amber-600/40 rounded-full px-4 py-2 mb-4 text-sm text-amber-300">
                            <span>🌟</span>
                            <span>{isKo ? '사주팔자 단독 분석' : 'Four Pillars Saju Analysis'}</span>
                        </div>

                        <h1 className="text-2xl md:text-4xl font-bold text-yellow-100 leading-tight mb-3">
                            {isKo
                                ? '이름과 생년월일로 보는\n사주팔자 운명 분석'
                                : 'Free Four Pillars Reading\nfrom Your Birth Data'}
                        </h1>

                        <p className="text-yellow-200/70 text-base mb-6">
                            {isKo
                                ? '음력·양력 모두 가능 · 생시를 모르셔도 괜찮습니다'
                                : 'Lunar or Solar calendar supported · Birth hour is optional'}
                        </p>

                        {/* 신뢰 지표 */}
                        <div className="flex justify-center gap-5 text-sm flex-wrap">
                            <div className="flex items-center gap-1.5 text-yellow-300"><span>🆓</span><span>{isKo ? '완전 무료' : 'Free'}</span></div>
                            <div className="flex items-center gap-1.5 text-yellow-300"><span>🔒</span><span>{isKo ? '개인정보 저장 없음' : 'No data stored'}</span></div>
                            <div className="flex items-center gap-1.5 text-yellow-300"><span>⚡</span><span>{isKo ? '즉시 결과' : 'Instant result'}</span></div>
                        </div>
                    </div>
                </section>

                {/* 분석 폼 */}
                <section className="max-w-xl mx-auto px-4 pb-10">
                    <div className="card-dark p-6 md:p-8">
                        <SajuForm />
                    </div>
                </section>

                {/* 분석 항목 안내 */}
                <section className="max-w-3xl mx-auto px-4 pb-12">
                    <h2 className="text-xl font-bold text-center text-yellow-100 mb-6">
                        {isKo ? '📊 분석 결과에서 확인할 수 있는 것' : '📊 What You\'ll Get in Your Reading'}
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
                                        ? '관상·성명학·성격유형까지 포함한 4가지 통합 분석을 받아보세요'
                                        : 'Try the combined analysis with Face Reading, Name Numerology, and Personality Type'}
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
                        {isKo ? '📚 사주팔자 알아보기' : '📚 Learn About Saju'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                            { slug: 'intro', titleKo: '사주팔자란 무엇인가?', titleEn: 'What Is Saju-Palza?' },
                            { slug: 'day-pillar', titleKo: '사주 일주 완전정복', titleEn: 'Mastering the Day Pillar' },
                            { slug: 'lucky-element', titleKo: '나의 용신 찾는 법', titleEn: 'How to Find Your Lucky Element' },
                        ].map((post) => (
                            <Link
                                key={post.slug}
                                href={`/${locale}/saju/${post.slug}`}
                                className="card-dark p-4 hover:border-amber-500/50 transition-all hover:-translate-y-0.5"
                            >
                                <p className="text-yellow-300 text-sm font-medium line-clamp-2">
                                    {isKo ? post.titleKo : post.titleEn}
                                </p>
                                <p className="text-yellow-200/40 text-xs mt-1">→ {isKo ? '읽어보기' : 'Read more'}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
