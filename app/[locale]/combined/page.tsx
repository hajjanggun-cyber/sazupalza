import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import AdSense from '../../../components/AdSense';
import AnalysisForm from '../../../components/AnalysisForm';
import PrivacyStartNotice from '../../../components/PrivacyStartNotice';
import Link from 'next/link';
import { SITE_URL, buildLocaleAlternates, buildLocalizedUrl } from '@/lib/seo';

interface Props {
    params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
    const isKo = locale === 'ko';
    return {
        title: isKo
            ? '사주팔자 4가지 통합 무료 분석 | 사주·관상·성명학·성격유형'
            : 'Combined Korean Fortune Reading | Four Pillars, Face Reading, Name, Personality',
        description: isKo
            ? '사주팔자·관상·성명학·성격유형을 한 번에! 회원가입 없음, 개인정보 수집 없음. 생년월일 입력 즉시 결과!'
            : 'Use one combined Korean fortune reading to compare Four Pillars, face reading, name numerology, and personality analysis in a single result page.',
        keywords: isKo
            ? ['사주팔자 무료', '무료 사주', '관상 분석', '성명학', '성격유형', '통합 운세']
            : ['combined Korean fortune reading', 'four pillars and face reading', 'Korean name numerology', 'saju personality analysis', 'Korean fortune reading'],
        alternates: buildLocaleAlternates(locale, '/combined'),
    };
}

export default async function CombinedPage({ params: { locale } }: Props) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations({ locale });
    const isKo = locale === 'ko';

    const baseUrl = SITE_URL;
    const webAppJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: isKo ? '사주팔자 4가지 통합 분석' : 'Korean Fortune Reading — 4-in-1',
        url: buildLocalizedUrl(locale, '/combined'),
        description: isKo
            ? '사주팔자·관상·성명학·성격유형 통합 무료 분석'
            : 'Combined Korean fortune reading — Four Pillars, Face, Name, Personality',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web',
        inLanguage: locale,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    };
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: isKo ? '홈' : 'Home', item: buildLocalizedUrl(locale) },
            { '@type': 'ListItem', position: 2, name: isKo ? '통합 분석' : 'Combined Reading', item: buildLocalizedUrl(locale, '/combined') },
        ],
    };
    const faqs = isKo
        ? [
            {
                q: '통합 분석은 무엇이 다른가요?',
                a: '사주, 관상, 성명학, 성격유형을 각각 따로 보는 대신 한 화면에서 함께 비교해 입력 조합에 따른 해석 흐름을 더 입체적으로 볼 수 있습니다.',
            },
            {
                q: '사진이나 MBTI 없이도 이용할 수 있나요?',
                a: '네. 선택 입력 항목은 비워둘 수 있으며, 제공된 정보 범위 안에서 결과를 생성합니다.',
            },
            {
                q: '결과 데이터는 서버에 저장되나요?',
                a: '아니요. 입력 정보와 결과 데이터는 서버에 저장하지 않으며 현재 기기 브라우저에만 임시 보관될 수 있습니다.',
            },
        ]
        : [
            {
                q: 'What makes the combined reading different?',
                a: 'It compares Four Pillars, face reading, name numerology, and personality analysis on one page so the final interpretation is easier to cross-check.',
            },
            {
                q: 'Can I use it without a photo or MBTI?',
                a: 'Yes. Optional inputs can be skipped, and the result is generated from the information you provide.',
            },
            {
                q: 'Is my result data stored on a server?',
                a: 'No. Input and result data are not stored on our servers and may remain temporarily only in the current device browser.',
            },
        ];
    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
    };
    const comparisonItems = isKo
        ? [
            {
                title: '사주팔자',
                body: '생년월일시를 기준으로 오행 구조, 일간, 직업·재물·연애 흐름을 읽습니다.',
            },
            {
                title: '관상',
                body: '사진을 제공한 경우 얼굴형과 주요 부위를 바탕으로 성향 해석을 더합니다.',
            },
            {
                title: '성명학',
                body: '이름의 획수와 소리오행을 통해 이름 에너지와 사주 보완 가능성을 함께 봅니다.',
            },
            {
                title: '성격유형',
                body: 'MBTI 또는 성격 입력을 바탕으로 행동 패턴과 관계 해석의 층을 추가합니다.',
            },
        ]
        : [
            {
                title: 'Four Pillars',
                body: 'Reads elemental structure, day stem, and timing patterns from birth date and time.',
            },
            {
                title: 'Face Reading',
                body: 'Adds facial tendency analysis when a photo is provided, using visible feature patterns.',
            },
            {
                title: 'Name Numerology',
                body: 'Reviews stroke-count and sound-element patterns in your name alongside your birth chart.',
            },
            {
                title: 'Personality',
                body: 'Adds behavioral and relationship context through MBTI or personality-type input.',
            },
        ];

    return (
        <div className="min-h-screen flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <Navigation />

            <div className="flex-1">
                <AdSense slot="1234567890" format="horizontal" className="max-w-full" />

                <main className="pt-4">
                {/* 헤더 */}
                <section className="relative py-10 px-4 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/10 to-transparent pointer-events-none" />
                    <div className="max-w-2xl mx-auto relative">

                        {/* 뒤로 가기 */}
                        <div className="mb-4">
                            <Link
                                href={`/${locale}`}
                                className="inline-flex items-center gap-1 text-yellow-500/70 hover:text-yellow-400 text-sm transition-colors"
                            >
                                ← {isKo ? '분석 유형 선택으로 돌아가기' : 'Back to service selection'}
                            </Link>
                        </div>

                        <div className="inline-flex items-center gap-2 bg-yellow-900/40 border border-yellow-600/30 rounded-full px-4 py-2 mb-4 text-sm text-yellow-300">
                            <span>⭐</span>
                            <span>{isKo ? '4가지 통합 분석 — 가장 완전한 운명 분석' : '4-in-1 — The Most Complete Reading'}</span>
                        </div>

                        <h1 className="text-2xl md:text-4xl font-bold text-yellow-100 leading-tight mb-3">
                            {t('home.heroTitle')}
                            <br />
                            <span className="text-yellow-400">{t('home.heroSub')}</span>
                        </h1>

                        <p className="text-yellow-200/70 text-base mb-2">
                            {t('home.heroDesc')}
                        </p>

                        {/* 신뢰 지표 */}
                        <div className="flex justify-center gap-6 my-6 text-sm flex-wrap">
                            <div className="flex items-center gap-2 text-yellow-300">
                                <span className="text-xl">🆓</span>
                                <span>{t('trust.free')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-yellow-300">
                                <span className="text-xl">🔒</span>
                                <span>{t('trust.privacy')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-yellow-300">
                                <span className="text-xl">⚡</span>
                                <span>{t('trust.instant')}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5단계 입력 폼 */}
                <section className="max-w-3xl mx-auto px-4 pb-8">
                    <PrivacyStartNotice locale={locale} />
                </section>

                <section className="max-w-xl mx-auto px-4 pb-12">
                    <div className="card-dark p-6 md:p-8">
                        <AnalysisForm />
                    </div>
                </section>

                <AdSense slot="0987654321" format="rectangle" />

                <section className="max-w-4xl mx-auto px-4 pb-12">
                    <div className="card-dark p-6 md:p-8">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-100 mb-4 text-center">
                            {isKo ? '통합 분석 페이지에서 확인할 수 있는 것' : 'What This Combined Reading Page Covers'}
                        </h2>
                        <p className="text-yellow-200/70 text-sm md:text-base leading-relaxed text-center max-w-3xl mx-auto mb-8">
                            {isKo
                                ? '이 페이지는 단순한 입력 폼이 아니라, 사주팔자와 관상, 이름, 성격 정보를 한 결과 안에서 함께 비교하기 위한 통합 분석 랜딩입니다. 개별 분석 페이지보다 입력 항목이 넓고, 서로 다른 해석 축이 같은 결과 화면에서 어떻게 만나는지 확인할 수 있습니다.'
                                : 'This page is not just a form. It is the combined entry point for comparing Four Pillars, face reading, name numerology, and personality analysis in one result flow, instead of checking each method separately.'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {comparisonItems.map((item) => (
                                <div key={item.title} className="rounded-2xl border border-yellow-900/30 bg-yellow-900/10 p-5">
                                    <h3 className="text-yellow-300 font-bold mb-2">{item.title}</h3>
                                    <p className="text-yellow-100/70 text-sm leading-relaxed">{item.body}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
                            <Link href={`/${locale}/saju`} className="rounded-full border border-yellow-700/30 px-4 py-2 text-yellow-200/80 hover:text-yellow-100 hover:border-yellow-500/40 transition-colors">
                                {isKo ? '사주 단독 분석 보기' : 'Explore Four Pillars Only'}
                            </Link>
                            <Link href={`/${locale}/face-reading`} className="rounded-full border border-yellow-700/30 px-4 py-2 text-yellow-200/80 hover:text-yellow-100 hover:border-yellow-500/40 transition-colors">
                                {isKo ? '관상 페이지 보기' : 'Explore Face Reading'}
                            </Link>
                            <Link href={`/${locale}/name-reading`} className="rounded-full border border-yellow-700/30 px-4 py-2 text-yellow-200/80 hover:text-yellow-100 hover:border-yellow-500/40 transition-colors">
                                {isKo ? '성명학 페이지 보기' : 'Explore Name Reading'}
                            </Link>
                            <Link href={`/${locale}/mbti`} className="rounded-full border border-yellow-700/30 px-4 py-2 text-yellow-200/80 hover:text-yellow-100 hover:border-yellow-500/40 transition-colors">
                                {isKo ? 'MBTI 페이지 보기' : 'Explore Personality Type'}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 샘플 결과 미리보기 */}
                <section className="max-w-3xl mx-auto px-4 pb-12">
                    <h2 className="text-xl font-bold text-center text-yellow-100 mb-6">
                        {t('home.previewTitle')}
                    </h2>
                    <div className="card-dark p-6 relative overflow-hidden">
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-yellow-200/80 text-sm">{t('home.previewScore')}</span>
                                <span className="text-yellow-400 font-bold text-2xl">82점</span>
                            </div>
                            {[t('result.saju'), t('result.name'), t('result.face'), isKo ? '성격유형' : 'Personality'].map((item, i) => (
                                <div key={item} className="mb-2">
                                    <div className="flex justify-between text-xs text-yellow-200/60 mb-1">
                                        <span>{item}</span>
                                        <span>{[85, 78, 80, 82][i]}점</span>
                                    </div>
                                    <div className="score-bar">
                                        <div className="score-fill" style={{ width: `${[85, 78, 80, 82][i]}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-yellow-200/70 text-sm space-y-2 border-t border-yellow-900/30 pt-4">
                            <p>{isKo ? '일간: 경금(庚金) | 월지: 계묘(癸卯)' : 'Day Stem: Gyeong-Metal(庚金) | Month: Gye-Myo(癸卯)'}</p>
                            <p>{isKo ? '수리: 원격28수(길) / 형격15수(대길)' : 'Suri: Won-Gyeok 28(Good) / Hyeong-Gyeok 15(Great)'}</p>
                            <p>{isKo ? '소리오행: 목-금-수 (상생) · 수호신: 백호 🐯' : 'Elements: Wood-Metal-Water (Harmonious) · Guardian: White Tiger 🐯'}</p>
                            <p className="text-yellow-400 font-medium">{t('home.previewNote')}</p>
                        </div>
                    </div>
                </section>

                <section className="max-w-3xl mx-auto px-4 pb-12">
                    <h2 className="text-xl font-bold text-center text-yellow-100 mb-6">
                        {isKo ? '자주 묻는 질문' : 'Frequently Asked Questions'}
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <details key={index} className="card-dark p-5 group cursor-pointer">
                                <summary className="text-yellow-200 font-medium list-none flex justify-between items-center">
                                    Q. {faq.q}
                                    <span className="text-yellow-500 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-3 text-yellow-200/70 text-sm leading-relaxed">A. {faq.a}</p>
                            </details>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
