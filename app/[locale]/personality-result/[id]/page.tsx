'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useEffect, useState } from 'react';
import { SINGLE_RESULT_REVEAL_DELAY_MS } from '../../../../lib/constants/analysis-delay';
import { readResultPayload } from '../../../../lib/client/result-storage';
import { getAnalysisStartUrl } from '../../../../lib/client/share-links';
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import AdSense from '../../../../components/AdSense';
import { mbtiTypes } from '../../../../lib/data/mbti/types';
import ResultNextSteps from '../../../../components/ResultNextSteps';
import ResultUnavailableState from '../../../../components/ResultUnavailableState';
import { buildLocalizedHref } from '@/lib/seo';

interface PersonalityInput {
    mbti: string;
    ts: number;
}

function decodeInput(id: string): PersonalityInput | null {
    return readResultPayload<PersonalityInput>('personality', id);
}

const KO_STEPS = ['응답 패턴 분석 중...', '심리 축(E/I, S/N) 결정 중...', '판단 기준(T/F, J/P) 연산 중...', '사주 오행 매핑 중...', '나의 최종 유형 도출 중...'];
const EN_STEPS = ['Analyzing response patterns...', 'Determining cognitive axes...', 'Calculating decision frameworks...', 'Mapping to Eastern elements...', 'Finalizing your profile...'];

function LoadingScreen({ isKo }: { isKo: boolean }) {
    const steps = isKo ? KO_STEPS : EN_STEPS;
    const [step, setStep] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 500);
        return () => clearInterval(t);
    }, [steps.length]);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <div className="text-6xl mb-6 animate-pulse">🧠</div>
            <h2 className="text-xl font-bold text-yellow-100 mb-2">
                {isKo ? '오리지널 성격 유형 분석 중...' : 'Analyzing Original Personality Type...'}
            </h2>
            <p className="text-yellow-200/50 text-sm mb-10">{isKo ? '잠시만 기다려 주세요' : 'Please wait a moment'}</p>
            <div className="space-y-3 w-full max-w-xs">
                {steps.map((s, i) => (
                    <div key={s} className={`flex items-center gap-3 text-sm transition-opacity duration-300 ${i <= step ? 'opacity-100' : 'opacity-20'}`}>
                        <span className={i < step ? 'text-green-400' : i === step ? 'text-yellow-400 animate-pulse' : 'text-gray-600'}>
                            {i < step ? '✓' : i === step ? '▶' : '○'}
                        </span>
                        <span className={i <= step ? 'text-yellow-200' : 'text-yellow-700'}>{s}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function PersonalityResultPage() {
    const params = useParams();
    const router = useRouter();
    const locale = (params.locale as string) || 'ko';
    const id = params.id as string;
    const isKo = locale === 'ko';
    const [mounted, setMounted] = useState(false);

    const inputData = useMemo(() => (mounted ? decodeInput(id) : null), [id, mounted]);
    const [loadingDone, setLoadingDone] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        if (!inputData || !inputData.mbti) {
            return;
        }
        const t = setTimeout(() => setLoadingDone(true), SINGLE_RESULT_REVEAL_DELAY_MS);
        return () => clearTimeout(t);
    }, [inputData, locale, mounted, router]);

    if (mounted && (!inputData || !inputData.mbti)) {
        return <ResultUnavailableState locale={locale} retryPath={buildLocalizedHref(locale, '/personality-analysis')} />;
    }

    if (!inputData) return null;

    if (!loadingDone) return <LoadingScreen isKo={isKo} />;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(getAnalysisStartUrl(locale, 'personality')).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const typeData = mbtiTypes[inputData.mbti];
    if (!typeData) {
        return <ResultUnavailableState locale={locale} retryPath={buildLocalizedHref(locale, '/personality-analysis')} />;
    }

    return (
        <div className="min-h-screen">
            <Navigation />
            <div className="flex justify-center py-3 bg-black/20">
                <AdSense slot="1122334455" format="horizontal" />
            </div>

            <main className="max-w-2xl mx-auto px-4 py-8">
                {/* 헤더 */}
                <div className="text-center mb-8 fade-in-up">
                    <p className="text-yellow-200/60 font-medium mb-2 tracking-widest text-sm uppercase">MY PERSONALITY TYPE</p>
                    <div className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 mb-2 shimmer">
                        {typeData.type}
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-yellow-100 mb-1">
                        {isKo ? typeData.nickname : (typeData.nicknameEn || typeData.nickname)}
                    </div>
                </div>

                <div className="card-glow p-6 mb-6 flex flex-col items-center justify-center text-center fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <p className="text-yellow-200/50 text-xs mb-1 uppercase tracking-widest">EASTERN ELEMENT</p>
                    <div className="text-5xl mb-2">{typeData.ohaeng === '목' ? '🌳' : typeData.ohaeng === '화' ? '🔥' : typeData.ohaeng === '토' ? '⛰️' : typeData.ohaeng === '금' ? '💎' : '💧'}</div>
                    <h2 className="text-lg font-bold text-yellow-300">{isKo ? `${typeData.ohaeng} 오행 매핑` : `${typeData.ohaeng} Element Mapping`}</h2>
                    <p className="text-sm text-yellow-100/80 mt-2 max-w-sm">
                        {isKo ? typeData.sajuNote : 'This type mirrors the energy of this Eastern element, emphasizing similar strengths and paths.'}
                    </p>
                </div>

                {/* 특성 태그 */}
                <div className="flex flex-wrap justify-center gap-2 mb-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {typeData.traits.map(t => (
                        <span key={t} className="bg-purple-900/40 border border-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm font-medium">#{t}</span>
                    ))}
                </div>

                {/* 강점 */}
                <div className="result-section mb-5 fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="result-section-title"><span>✨</span>{isKo ? '핵심 강점' : 'Core Strengths'}</div>
                    <ul className="space-y-3">
                        {typeData.strengths.map((str, i) => (
                            <li key={i} className="flex gap-2 text-sm leading-relaxed text-yellow-100/90">
                                <span className="text-yellow-400">✓</span> {str}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 성장 포인트 */}
                <div className="result-section mb-5 fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="result-section-title"><span>🌱</span>{isKo ? '성장 방향성' : 'Growth Points'}</div>
                    <ul className="space-y-3">
                        {typeData.growthPoints.map((gp, i) => (
                            <li key={i} className="flex gap-2 text-sm leading-relaxed text-yellow-100/90">
                                <span className="text-green-400">➢</span> {gp}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex justify-center py-4 mb-2">
                    <AdSense slot="2233445566" format="rectangle" />
                </div>

                {/* 직업 및 대인관계 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <div className="card-dark p-5">
                        <h3 className="font-bold text-yellow-300 mb-3 flex items-center gap-2"><span>💼</span>{isKo ? '추천 분야' : 'Ideal Career Fields'}</h3>
                        <div className="flex flex-wrap gap-2">
                            {(isKo ? typeData.career : typeData.careerEn || typeData.career).map((c, idx) => (
                                <span key={idx} className="bg-white/5 border border-white/10 text-yellow-100/80 px-2 py-1 text-xs rounded-md">{c}</span>
                            ))}
                        </div>
                    </div>
                    <div className="card-dark p-5">
                        <h3 className="font-bold text-yellow-300 mb-3 flex items-center gap-2"><span>🤝</span>{isKo ? '인간관계 특성' : 'Relationship Traits'}</h3>
                        <p className="text-sm leading-relaxed text-yellow-100/80">
                            {isKo ? typeData.relation : (typeData.relationEn || typeData.relation)}
                        </p>
                    </div>
                </div>

                {/* 공유 버튼 */}
                <div className="flex flex-wrap gap-3 mb-8 fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <p className="w-full text-yellow-200/50 text-xs text-center mb-3">
                        {isKo
                            ? '개인 결과는 이 기기에서만 보관됩니다. 공유 시에는 새 분석 페이지 링크만 전달됩니다.'
                            : 'Private results stay on this device. Sharing only sends the analysis start page.'}
                    </p>
                    <button className="share-btn share-link flex-1 justify-center" onClick={handleCopy}>
                        <span>{copied ? '✅' : '🔗'}</span>
                        <span>{copied ? (isKo ? '복사됨!' : 'Copied!') : (isKo ? '분석 페이지 링크 복사' : 'Copy Analysis Link')}</span>
                    </button>
                    <button className="btn-secondary flex-1" onClick={() => router.push(buildLocalizedHref(locale, '/personality-analysis'))}>
                        🔄 {isKo ? '다시 테스트하기' : 'Test Again'}
                    </button>
                </div>
                <ResultNextSteps locale={locale} current="personality" />
            </main>
            <Footer />
        </div>
    );
}
