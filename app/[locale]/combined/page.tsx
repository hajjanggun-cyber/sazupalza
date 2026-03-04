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
            : 'Free 4-in-1 Korean Fortune Reading | Four Pillars, Face, Name, Personality',
        description: isKo
            ? '사주팔자·관상·성명학·성격유형을 한 번에! 회원가입 없음, 개인정보 수집 없음. 생년월일 입력 즉시 결과!'
            : 'Get Four Pillars, Face Reading, Name Numerology, and Personality all in one. No sign-up. Instant results!',
        keywords: isKo
            ? ['사주팔자 무료', '무료 사주', '관상 분석', '성명학', '성격유형', '통합 운세']
            : ['Korean fortune reading', 'four pillars free', 'saju analysis', 'face reading', 'name numerology'],
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

    return (
        <div className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
            />

            <Navigation />

            {/* 상단 광고 */}
            <div className="flex justify-center py-3 bg-[#0d0502]">
                <AdSense slot="1234567890" format="horizontal" className="max-w-full" />
            </div>

            <main>
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

                {/* 중간 광고 */}
                <div className="flex justify-center py-4">
                    <AdSense slot="0987654321" format="rectangle" />
                </div>

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
            </main>

            <Footer />
        </div>
    );
}
