'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useEffect, useState } from 'react';
import { calculateSaju } from '../../../../lib/calculator/saju-calculator';
import { generateSajuResult, SajuFullResult } from '../../../../lib/calculator/saju-result-generator';
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import AdSense from '../../../../components/AdSense';

// ════════ 디코딩 ════════
interface SajuInput {
    name: string; year: number; month: number; day: number;
    hour?: number; gender?: string; lunar?: boolean; leapMonth?: boolean;
}
function decodeInput(id: string): SajuInput | null {
    try {
        const base64 = id.replace(/-/g, '+').replace(/_/g, '/');
        const padding = '='.repeat((4 - (base64.length % 4)) % 4);
        const binStr = atob(base64 + padding);
        const bytes = Uint8Array.from(binStr, c => c.charCodeAt(0));
        return JSON.parse(new TextDecoder().decode(bytes)) as SajuInput;
    } catch { return null; }
}

// ════════ 오행 색상 ════════
const OHAENG_COLOR: Record<string, string> = {
    목: 'text-green-400', 화: 'text-red-400', 토: 'text-yellow-400',
    금: 'text-gray-300', 수: 'text-blue-400',
};
const OHAENG_BG: Record<string, string> = {
    목: 'bg-green-900/30 border-green-600/40', 화: 'bg-red-900/30 border-red-600/40',
    토: 'bg-yellow-900/30 border-yellow-600/40', 금: 'bg-gray-800/30 border-gray-500/40',
    수: 'bg-blue-900/30 border-blue-600/40',
};
const RATING_COLOR: Record<string, string> = {
    great: 'text-yellow-400', good: 'text-green-400',
    neutral: 'text-blue-400', caution: 'text-orange-400',
};

// ════════ 로딩 단계 ════════
const LOADING_STEPS = [
    '사주팔자 8글자 산출 중…',
    '오행 균형 분석 중…',
    '용신(用神) 도출 중…',
    '신살(神殺) 감별 중…',
    '대운(大運) 10년 흐름 계산 중…',
    '세운(歲運) 2025~2026 분석 중…',
    '맞춤 개운법 생성 중…',
];

function LoadingScreen({ name }: { name: string }) {
    const [step, setStep] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setStep(s => Math.min(s + 1, LOADING_STEPS.length - 1)), 400);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <div className="text-6xl mb-6 animate-pulse">🔮</div>
            <h2 className="text-xl font-bold text-yellow-100 mb-2">{name}님의 사주팔자 분석 중</h2>
            <p className="text-yellow-200/50 text-sm mb-10">잠시만 기다려 주세요</p>
            <div className="space-y-3 w-full max-w-xs">
                {LOADING_STEPS.map((s, i) => (
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

// ════════ 오행 게이지 ════════
function OhaengBar({ label, value, max }: { label: string; value: number; max: number }) {
    const pct = Math.round((value / Math.max(max, 1)) * 100);
    return (
        <div>
            <div className="flex justify-between text-xs mb-1">
                <span className={`font-bold ${OHAENG_COLOR[label]}`}>{label}(
                    {label === '목' ? '木' : label === '화' ? '火' : label === '토' ? '土' : label === '금' ? '金' : '水'})
                </span>
                <span className="text-yellow-200/60">{value}개</span>
            </div>
            <div className="h-2 bg-yellow-900/20 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-700 ${label === '목' ? 'bg-green-500' : label === '화' ? 'bg-red-500' : label === '토' ? 'bg-yellow-500' : label === '금' ? 'bg-gray-400' : 'bg-blue-500'
                        }`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

// ════════ 4주 카드 ════════
function PillarCard({ label, cg, jj, cgH, jjH, ohaeng }: {
    label: string; cg: string; jj: string; cgH: string; jjH: string; ohaeng: string;
}) {
    return (
        <div className={`rounded-xl border p-3 text-center ${OHAENG_BG[ohaeng] || 'bg-white/5 border-yellow-700/20'}`}>
            <p className="text-yellow-200/50 text-xs mb-2">{label}</p>
            <div className={`text-2xl font-bold ${OHAENG_COLOR[ohaeng]}`}>{cgH}</div>
            <div className="text-yellow-100 text-xl font-bold">{jjH}</div>
            <p className="text-yellow-200/40 text-xs mt-1">{cg}{jj}</p>
        </div>
    );
}

// ════════ 메인 ════════
export default function SajuResultPage() {
    const params = useParams();
    const router = useRouter();
    const locale = (params.locale as string) || 'ko';
    const id = params.id as string;
    const isKo = locale === 'ko';

    const inputData = useMemo(() => decodeInput(id), [id]);
    const [result, setResult] = useState<SajuFullResult | null>(null);
    const [loadingDone, setLoadingDone] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!inputData) { router.push(`/${locale}`); return; }
        try {
            const saju = calculateSaju({ year: inputData.year, month: inputData.month, day: inputData.day, hour: inputData.hour });
            const full = generateSajuResult(saju, { ...inputData, locale });
            setResult(full);
        } catch (e) { console.error(e); }
    }, [inputData, locale]);

    // 로딩 타이머 (3초)
    useEffect(() => {
        const t = setTimeout(() => setLoadingDone(true), 3200);
        return () => clearTimeout(t);
    }, []);

    if (!inputData) return null;
    if (!loadingDone || !result) return <LoadingScreen name={inputData.name} />;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const scoreColor = (s: number) => s >= 80 ? 'text-yellow-400' : s >= 65 ? 'text-green-400' : 'text-blue-400';

    return (
        <div className="min-h-screen">
            <Navigation />
            <div className="flex justify-center py-3 bg-black/20">
                <AdSense slot="2233445566" format="horizontal" />
            </div>

            <main className="max-w-2xl mx-auto px-4 py-8">

                {/* ── 헤더 ── */}
                <div className="text-center mb-8 fade-in-up">
                    <div className="text-5xl mb-3">🔮</div>
                    <h1 className="text-2xl md:text-3xl font-bold text-yellow-100 mb-2">
                        {isKo ? `${inputData.name}님의 사주팔자 분석 결과` : `Four Pillars Analysis for ${inputData.name}`}
                    </h1>
                    <p className="text-yellow-200/60 text-sm mb-4">
                        {inputData.year}년 {inputData.month}월 {inputData.day}일
                        {inputData.hour !== undefined && ` · ${inputData.hour}시생`}
                        {inputData.gender && ` · ${inputData.gender === 'male' ? '남성' : '여성'}`}
                    </p>
                    {/* 희소성 배지 */}
                    <div className="inline-flex items-center gap-2 bg-yellow-900/30 border border-yellow-600/30 rounded-full px-4 py-1.5 text-sm">
                        <span className="text-yellow-400">✦</span>
                        <span className="text-yellow-200">
                            {result.ilganName} 일간 · 전체 사주 유형 중 <strong className="text-yellow-400">상위 {result.rarityPercent}%</strong>
                        </span>
                    </div>
                </div>

                {/* ── 핵심 키워드 뱃지 ── */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {result.keywords.map(k => (
                        <span key={k} className="px-3 py-1 bg-yellow-900/30 border border-yellow-600/30 rounded-full text-yellow-300 text-sm font-medium">
                            🔖 {k}
                        </span>
                    ))}
                </div>

                {/* ── 사주 4주 표시 ── */}
                <div className="card-dark p-5 mb-6">
                    <h2 className="text-sm font-bold text-yellow-200/60 mb-4 text-center tracking-widest">四柱八字 (사주팔자)</h2>
                    <div className={`grid gap-3 ${result.pillarDisplay.hour ? 'grid-cols-4' : 'grid-cols-3'}`}>
                        <PillarCard label="연주(年柱)" {...result.pillarDisplay.year} />
                        <PillarCard label="월주(月柱)" {...result.pillarDisplay.month} />
                        <PillarCard label="일주(日柱)" {...result.pillarDisplay.day} />
                        {result.pillarDisplay.hour && <PillarCard label="시주(時柱)" {...result.pillarDisplay.hour} />}
                    </div>
                    {!result.pillarDisplay.hour && (
                        <p className="text-yellow-200/40 text-xs text-center mt-3">
                            💡 생시를 추가 입력하면 시주(時柱)까지 완성되어 더 정밀한 분석이 가능합니다
                        </p>
                    )}
                </div>

                {/* ── 종합 점수 ── */}
                <div className="card-glow p-6 mb-6 text-center">
                    <p className="text-yellow-200/60 text-xs mb-1 tracking-widest">TOTAL SCORE</p>
                    <div className="text-7xl font-bold mb-1 shimmer">{result.totalScore}</div>
                    <p className={`text-sm font-semibold mb-6 ${scoreColor(result.totalScore)}`}>
                        {result.totalScore >= 85 ? '매우 좋음' : result.totalScore >= 75 ? '좋음' : result.totalScore >= 65 ? '보통' : '개선 여지'}
                    </p>
                    <div className="space-y-3 text-left">
                        {[
                            { label: '일간(日干) 기운', score: Math.min(98, result.totalScore + 5) },
                            { label: '오행 균형도', score: Math.min(98, result.totalScore - 5) },
                            { label: '신살 가산점', score: result.sinsal.tags?.includes('귀인') ? 88 : 72 },
                        ].map(item => (
                            <div key={item.label}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-yellow-200/70">{item.label}</span>
                                    <span className={`font-bold ${scoreColor(item.score)}`}>{item.score}점</span>
                                </div>
                                <div className="score-bar">
                                    <div className="score-fill" style={{ width: `${item.score}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 오행 균형 ── */}
                <div className="card-dark p-5 mb-6">
                    <h2 className="text-base font-bold text-yellow-300 mb-4">🌀 오행(五行) 구성 현황</h2>
                    <div className="space-y-3">
                        {Object.entries(result.ohaengBalance).map(([k, v]) => (
                            <OhaengBar key={k} label={k} value={v} max={Math.max(...Object.values(result.ohaengBalance))} />
                        ))}
                    </div>
                    <div className="mt-4 flex gap-3 text-sm flex-wrap">
                        <span className="text-green-300">✦ 용신: {result.yongsin}</span>
                        <span className="text-red-300">✗ 기신: {result.gisin}</span>
                    </div>
                </div>

                {/* ── 핵심 요약 3줄 ── */}
                <div className="card-dark p-6 mb-6">
                    <h2 className="text-base font-bold text-yellow-400 mb-4">📝 핵심 요약</h2>
                    <div className="space-y-3">
                        {result.summaryLines.map((line, i) => (
                            <div key={i} className="flex gap-3 items-start">
                                <span className="text-yellow-500 font-bold shrink-0 mt-0.5">{i + 1}.</span>
                                <p className="text-yellow-200/90 text-sm leading-relaxed">{line}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center py-4 mb-2">
                    <AdSense slot="3344556677" format="rectangle" />
                </div>

                {/* ── 8개 분석 섹션 ── */}
                {result.sections.map((s, i) => (
                    <div key={i} className="result-section mb-4">
                        <div className="result-section-title">
                            <span>{s.icon}</span>{s.title}
                            {s.score && (
                                <span className={`ml-auto text-sm font-bold ${scoreColor(s.score)}`}>{s.score}점</span>
                            )}
                        </div>
                        {s.highlight && (
                            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg px-3 py-2 mb-3">
                                <p className="text-yellow-400 text-xs font-bold">✦ {s.highlight}</p>
                            </div>
                        )}
                        <p className="text-sm leading-relaxed whitespace-pre-line">{s.content}</p>
                        {s.tags && s.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {s.tags.map(t => (
                                    <span key={t} className="px-2 py-0.5 text-xs bg-yellow-900/30 text-yellow-300/80 rounded-full border border-yellow-700/30">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                <div className="flex justify-center py-4 mb-2">
                    <AdSense slot="4455667788" format="rectangle" />
                </div>

                {/* ── 대운 타임라인 ── */}
                <div className="card-dark p-5 mb-6">
                    <h2 className="text-base font-bold text-yellow-300 mb-1">🌊 대운(大運) 10년 흐름</h2>
                    <p className="text-yellow-200/50 text-xs mb-4">10년 단위로 바뀌는 삶의 큰 흐름</p>
                    <div className="overflow-x-auto pb-2">
                        <div className="flex gap-3 min-w-max">
                            {result.daewoon.map((d, i) => (
                                <div key={i} className={`rounded-xl border p-3 w-32 shrink-0 ${d.rating === 'great' ? 'border-yellow-500/50 bg-yellow-900/20' :
                                        d.rating === 'good' ? 'border-green-500/40 bg-green-900/20' :
                                            d.rating === 'caution' ? 'border-orange-500/40 bg-orange-900/20' :
                                                'border-yellow-700/20 bg-white/5'
                                    }`}>
                                    <p className={`text-xs font-bold mb-1 ${RATING_COLOR[d.rating]}`}>{d.age}</p>
                                    <div className="text-lg font-bold text-yellow-100 mb-1">{d.cheongan}{d.jiji}</div>
                                    <p className="text-yellow-300 text-xs font-medium mb-1">{d.theme}</p>
                                    <p className="text-yellow-200/50 text-xs leading-relaxed">{d.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── 세운 ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {[result.seWoon2025, result.seWoon2026].map((sw, i) => (
                        <div key={i} className="result-section">
                            <div className="result-section-title"><span>{sw.icon}</span>{sw.title}</div>
                            {sw.highlight && (
                                <div className="bg-blue-900/20 border border-blue-700/30 rounded px-3 py-1.5 mb-2">
                                    <p className="text-blue-300 text-xs font-bold">→ {sw.highlight}</p>
                                </div>
                            )}
                            <p className="text-sm leading-relaxed">{sw.content}</p>
                        </div>
                    ))}
                </div>

                {/* ── 신살 ── */}
                <div className="result-section mb-6">
                    <div className="result-section-title"><span>{result.sinsal.icon}</span>{result.sinsal.title}</div>
                    {result.sinsal.highlight && (
                        <div className="bg-purple-900/20 border border-purple-700/30 rounded px-3 py-1.5 mb-3">
                            <p className="text-purple-300 text-xs font-bold">✦ {result.sinsal.highlight}</p>
                        </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-line">{result.sinsal.content}</p>
                </div>

                {/* ── 행운 요소 ── */}
                <div className="card-dark p-5 mb-6">
                    <h2 className="text-base font-bold text-yellow-300 mb-4">🍀 {inputData.name}님의 행운 요소</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: '행운색', value: result.luckyElements.color.join(' · '), icon: '🎨' },
                            { label: '행운 방향', value: result.luckyElements.direction, icon: '🧭' },
                            { label: '행운 숫자', value: result.luckyElements.number.join(', '), icon: '🔢' },
                            { label: '행운 소재', value: result.luckyElements.material, icon: '💎' },
                        ].map(item => (
                            <div key={item.label} className="bg-yellow-900/10 border border-yellow-700/20 rounded-xl p-3 text-center">
                                <div className="text-2xl mb-1">{item.icon}</div>
                                <p className="text-yellow-200/50 text-xs">{item.label}</p>
                                <p className="text-yellow-300 font-bold text-sm mt-0.5">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center py-4 mb-2">
                    <AdSense slot="5566778800" format="rectangle" />
                </div>

                {/* ── 면책 ── */}
                <div className="bg-yellow-900/10 border border-yellow-900/20 rounded-xl p-4 mb-6">
                    <p className="text-yellow-200/40 text-xs leading-relaxed text-center">
                        본 분석은 전통 동양철학 이론을 기반으로 생성된 참고 자료입니다. 재미와 자기 이해를 위한 용도로 활용하시고, 중요한 결정은 전문가와 상담하시기 바랍니다.
                    </p>
                </div>

                {/* ── 공유 ── */}
                <div className="flex gap-3 mb-8">
                    <button className="share-btn share-link flex-1 justify-center" onClick={handleCopy}>
                        <span>{copied ? '✅' : '🔗'}</span>
                        <span>{copied ? '복사됨!' : '결과 링크 복사'}</span>
                    </button>
                    <button className="btn-secondary flex-1" onClick={() => router.push(`/${locale}/saju-analysis`)}>
                        🔄 다시 분석하기
                    </button>
                </div>

            </main>
            <Footer />
        </div>
    );
}
