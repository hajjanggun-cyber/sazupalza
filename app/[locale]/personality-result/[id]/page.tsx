'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useEffect, useState } from 'react';
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import AdSense from '../../../../components/AdSense';
import { mbtiTypes } from '../../../../lib/data/mbti/types';

interface PersonalityInput {
    mbti: string;
    ts: number;
}

function decodeInput(id: string): PersonalityInput | null {
    try {
        const base64 = id.replace(/-/g, '+').replace(/_/g, '/');
        const padding = '='.repeat((4 - (base64.length % 4)) % 4);
        const binStr = atob(base64 + padding);
        const bytes = Uint8Array.from(binStr, c => c.charCodeAt(0));
        return JSON.parse(new TextDecoder().decode(bytes));
    } catch { return null; }
}

const KO_STEPS = ['응답 패턴 분석 중...', '심리 축(E/I, S/N) 결정 중...', '판단 기준(T/F, J/P) 연산 중...', '사주 오행 매핑 중...', '나의 최종 유형 도출 중...'];
const EN_STEPS = ['Analyzing response patterns...', 'Determining cognitive axes...', 'Calculating decision frameworks...', 'Mapping to Eastern elements...', 'Finalizing your profile...'];

function LoadingScreen({ isKo }: { isKo: boolean }) {
    const steps = isKo ? KO_STEPS : EN_STEPS;
    const [step, setStep] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 500);
        return () => clearInterval(t);
    }, []);
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

    const inputData = useMemo(() => decodeInput(id), [id]);
    const [loadingDone, setLoadingDone] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!inputData || !inputData.mbti) {
            // Wait briefly before redirecting to avoid hydration mismatch
            const t = setTimeout(() => router.push(`/${locale}`), 100);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => setLoadingDone(true), 3000);
        return () => clearTimeout(t);
    }, [inputData, locale, router]);

    if (!inputData) return null;

    if (!loadingDone) return <LoadingScreen isKo={isKo} />;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const typeData = mbtiTypes[inputData.mbti];
    if (!typeData) {
        return <div className="text-center py-20 text-white">Invalid type data.</div>;
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
                <div className="flex gap-3 mb-8 fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <button className="share-btn share-link flex-1 justify-center" onClick={handleCopy}>
                        <span>{copied ? '✅' : '🔗'}</span>
                        <span>{copied ? (isKo ? '복사됨!' : 'Copied!') : (isKo ? '결과 링크 복사' : 'Copy Link')}</span>
                    </button>
                    <button className="btn-secondary flex-1" onClick={() => router.push(`/${locale}/personality-analysis`)}>
                        🔄 {isKo ? '다시 테스트하기' : 'Test Again'}
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
