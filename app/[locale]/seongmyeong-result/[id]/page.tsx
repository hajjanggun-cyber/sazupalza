'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useEffect, useState } from 'react';
import { calculateName } from '../../../../lib/calculator/name-calculator';
import { suriData } from '../../../../lib/data/name/suri81';
import { soundOhaeng, extractChosung, analyzeSoundOhaengRelation } from '../../../../lib/data/name/orhaeng-sound';
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import AdSense from '../../../../components/AdSense';

// ════════ 타입 ════════
interface SeongmyeongInput {
    type: string; locale: string;
    // 한국어
    familyName?: string; givenName?: string; name?: string;
    familyStrokes?: number | null; givenStrokesChars?: number[];
    wantsRename?: boolean; boostOhaeng?: string[]; imageGoal?: string[];
    year?: number; month?: number; day?: number;
    // 영어
    birthFullName?: string; currentName?: string | null;
    lifePath?: number; expressionNumber?: number; soulUrge?: number;
    personalityNumber?: number; currentExpression?: number | null;
}

function decodeInput(id: string): SeongmyeongInput | null {
    try {
        const base64 = id.replace(/-/g, '+').replace(/_/g, '/');
        const padding = '='.repeat((4 - (base64.length % 4)) % 4);
        const binStr = atob(base64 + padding);
        const bytes = Uint8Array.from(binStr, c => c.charCodeAt(0));
        return JSON.parse(new TextDecoder().decode(bytes));
    } catch { return null; }
}

// ════════ 오행 설정 ════════
const OHAENG_COLOR: Record<string, string> = {
    목: 'text-green-400', 화: 'text-red-400', 토: 'text-yellow-400',
    금: 'text-gray-300', 수: 'text-blue-400',
};
const OHAENG_ICON: Record<string, string> = { 목: '🌳', 화: '🔥', 토: '⛰️', 금: '💎', 수: '💧' };

// ════════ 수비학 (영어) ════════
const NUMBER_MEANINGS: Record<number, { title: string; desc: string; career: string; love: string; color: string }> = {
    1: { title: 'Leader', desc: 'Independent, ambitious, original — born to initiate and lead.', career: 'Entrepreneurship, management, sports, military, politics', love: 'You need an equal partner who respects your independence.', color: 'text-red-400' },
    2: { title: 'Diplomat', desc: 'Cooperative, sensitive, peacemaker — thrives in partnership.', career: 'Counseling, diplomacy, music, healing arts', love: 'Partnership is your strength — you bloom in loving relationships.', color: 'text-pink-400' },
    3: { title: 'Creative', desc: 'Expressive, joyful, artistic — a natural communicator.', career: 'Writing, acting, design, teaching, marketing', love: 'You love deeply and expressively; you need fun and creativity in love.', color: 'text-yellow-400' },
    4: { title: 'Builder', desc: 'Practical, disciplined, reliable — creates lasting foundations.', career: 'Engineering, finance, law, architecture, medicine', love: 'You build love slowly and steadily — loyalty is your love language.', color: 'text-green-400' },
    5: { title: 'Freedom', desc: 'Adventurous, versatile, curious — seeks change and variety.', career: 'Travel, journalism, sales, entertainment, innovation', love: 'You need freedom in love — commitment comes once trust is built.', color: 'text-cyan-400' },
    6: { title: 'Nurturer', desc: 'Caring, responsible, home-loving — protects and guides.', career: 'Healthcare, teaching, social work, hospitality', love: 'You are devoted and caring — the ultimate family person.', color: 'text-blue-400' },
    7: { title: 'Seeker', desc: 'Analytical, introspective, spiritual — pursues hidden truths.', career: 'Research, philosophy, science, spirituality, writing', love: 'You need intellectual and spiritual connection with your partner.', color: 'text-indigo-400' },
    8: { title: 'Executive', desc: 'Powerful, goal-oriented — born for authority and success.', career: 'Business, finance, real estate, law, executive roles', love: 'You love powerfully but need a partner who handles your drive.', color: 'text-amber-400' },
    9: { title: 'Humanitarian', desc: 'Compassionate, idealistic, global — serves the greater good.', career: 'Arts, medicine, activism, international work', love: 'You love universally — your ideal partner shares your values.', color: 'text-purple-400' },
    11: { title: 'Intuitive', desc: 'Master Intuitive — highly spiritual, inspirational visionary.', career: 'Spiritual leadership, psychology, art, counseling', love: 'Deep soul connections matter most to you.', color: 'text-violet-300' },
    22: { title: 'Master Builder', desc: 'Master Builder — turns grand dreams into tangible reality.', career: 'Large-scale business, architecture, world-changing ventures', love: 'You seek a life partner who matches your vision.', color: 'text-emerald-300' },
    33: { title: 'Master Teacher', desc: 'Master Teacher — embodies compassion, healing, and wisdom.', career: 'Healing arts, education, spiritual guidance', love: 'Love for you is sacred — you give selflessly.', color: 'text-rose-300' },
};

// ════════ 로딩 ════════
const KO_STEPS = ['이름 획수 분석 중…', '소리오행 관계 산출 중…', '81수리 배치 해석 중…', '4격(원형이정) 계산 중…', '개운법 생성 중…'];
const EN_STEPS = ['Calculating Expression Number…', 'Analyzing Soul Urge…', 'Computing Personality Number…', 'Life Path Harmony Check…', 'Generating Personal Insights…'];

function LoadingScreen({ name, isKo }: { name: string; isKo: boolean }) {
    const steps = isKo ? KO_STEPS : EN_STEPS;
    const [step, setStep] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 500);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <div className="text-6xl mb-6 animate-pulse">✍️</div>
            <h2 className="text-xl font-bold text-yellow-100 mb-2">
                {isKo ? `「${name}」 성명학 분석 중` : `Analyzing "${name}"…`}
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

// ════════ 수리 배지 ════════
function SuriBadge({ number, label }: { number: number; label: string }) {
    const suri = suriData[number];
    const colors: Record<string, string> = {
        great: 'border-yellow-500/60 bg-yellow-900/30 text-yellow-300',
        good: 'border-green-500/50 bg-green-900/20 text-green-300',
        neutral: 'border-blue-500/40 bg-blue-900/20 text-blue-300',
        caution: 'border-orange-500/40 bg-orange-900/20 text-orange-300',
        avoid: 'border-red-500/40 bg-red-900/20 text-red-300',
    };
    const rating = suri?.rating || 'neutral';
    return (
        <div className={`rounded-xl border p-4 text-center ${colors[rating]}`}>
            <p className="text-xs opacity-70 mb-1">{label}</p>
            <div className="text-3xl font-bold mb-1">{number}</div>
            <p className="text-xs font-bold">{suri?.name}</p>
            <p className="text-xs opacity-70 mt-1">{suri?.summary}</p>
        </div>
    );
}

// ════════ 메인 ════════
export default function SeongmyeongResultPage() {
    const params = useParams();
    const router = useRouter();
    const locale = (params.locale as string) || 'ko';
    const id = params.id as string;
    const isKo = locale === 'ko';

    const inputData = useMemo(() => decodeInput(id), [id]);
    const [loadingDone, setLoadingDone] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!inputData) router.push(`/${locale}`);
        const t = setTimeout(() => setLoadingDone(true), 3000);
        return () => clearTimeout(t);
    }, [inputData, locale]);

    if (!inputData) return null;

    const displayName = isKo ? (inputData.name || '') : (inputData.birthFullName || '');
    if (!loadingDone) return <LoadingScreen name={displayName} isKo={isKo} />;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    // ── 한국어 계산 ──
    const koResult = isKo && inputData.name ? calculateName(inputData.name) : null;
    const soundList = isKo && inputData.name
        ? inputData.name.split('').map(c => soundOhaeng[extractChosung(c)]).filter(Boolean)
        : [];
    const soundRelation = analyzeSoundOhaengRelation(soundList);

    // 오행별 콘텐츠 (이름 기반)
    const mainOhaeng = soundList[0] || '목';
    const koContent = {
        career: {
            목: `교육·출판·기획·법조계에서 두각. 성장과 창의성이 핵심인 분야에서 타고난 잠재력을 발휘합니다.`,
            화: `예술·방송·마케팅·강사·외교 분야에서 빛남. 사람들 앞에 서는 것을 두려워하지 않는 강렬한 존재감이 무기입니다.`,
            토: `금융·부동산·의료·행정·요식업에서 안정. 신뢰와 안정감을 주는 성품이 조직과 사람을 이끕니다.`,
            금: `군·경·법조·공학·금융에서 강점. 원칙과 결단력이 강해 전문직에서 특히 빛을 발합니다.`,
            수: `연구·IT·심리·철학·예술에서 깊이. 남들이 보지 못하는 것을 먼저 읽어내는 통찰력이 강점입니다.`,
        }[mainOhaeng] || '',
        wealth: {
            목: `초기보다 3~5년 후 급격히 상승하는 패턴. 서두르지 않고 차근차근 쌓는 것이 재물의 지름길입니다.`,
            화: `이름과 명성이 재물을 불러오는 유형. 알려질수록 수익이 늘어나는 구조가 잘 맞습니다.`,
            토: `중년 이후 두텁고 안정적인 재산 형성. 부동산·저축 위주의 안전 자산 전략이 잘 맞습니다.`,
            금: `전문직·고수익 직군으로 규모 있는 재물. 철저한 재무 계획과 원칙 있는 투자가 성공 열쇠입니다.`,
            수: `지식·정보·트렌드를 먼저 읽어 재물 창출. IT나 주식 등 정보 기반 수익 구조가 유리합니다.`,
        }[mainOhaeng] || '',
        love: {
            목: `헌신적이고 한번 빠지면 깊은 사랑. 독립성을 존중해주는 파트너와 가장 잘 맞습니다.`,
            화: `열정적이고 설레는 감정을 중시. 따뜻하게 감정을 함께 나눌 수 있는 파트너가 이상형입니다.`,
            토: `신중하고 신뢰를 쌓아가는 사랑. 가정적이고 안정감 있는 파트너와 오래 함께 갑니다.`,
            금: `진지하고 약속을 소중히 여기는 사랑. 의리 있고 솔직한 파트너와 깊은 관계를 맺습니다.`,
            수: `정신적 교감을 중시하는 깊은 감성의 사랑. 지적 대화가 가능한 파트너와 최고의 궁합입니다.`,
        }[mainOhaeng] || '',
    };

    // 개명 가이드
    const renameGuide = inputData.wantsRename ? {
        boost: (inputData.boostOhaeng || []).map(o => ({
            목: '이름에 ㄱ,ㅋ 초성(목 오행) 글자 추가 권장 (예: 구,기,강)',
            화: '이름에 ㄴ,ㄷ,ㄹ,ㅌ 초성(화 오행) 글자 추가 권장 (예: 나,다,라)',
            토: '이름에 ㅇ,ㅎ 초성(토 오행) 글자 추가 권장 (예: 아,하,오)',
            금: '이름에 ㅅ,ㅈ,ㅊ 초성(금 오행) 글자 추가 권장 (예: 사,자,차)',
            수: '이름에 ㅁ,ㅂ,ㅍ 초성(수 오행) 글자 추가 권장 (예: 마,바,미)',
        }[o] || o)),
        goalText: (inputData.imageGoal || []).map(g => ({
            wealth: '재물운은 획수 합이 24수(입신수), 29수(성공수), 39수(부귀수)인 이름이 유리합니다.',
            career: '직업·명예운은 획수 합이 21수(두령수), 23수(공명수), 37수(인덕수)인 이름이 좋습니다.',
            love: '인연운은 획수 합이 6수(안락수), 15수(복록수), 32수(행운수)인 이름이 유리합니다.',
            health: '건강운은 획수 합이 5수(오행수), 16수(덕망수), 45수(대지수)인 이름이 도움됩니다.',
            creative: '창의·예술운은 획수 합이 3수(명예수), 33수(지도수), 38수(예술수)인 이름이 잘 맞습니다.',
            leader: '리더십·통솔력은 획수 합이 1수(태초수), 21수(두령수), 41수(최귀수)가 강합니다.',
        }[g] || g)),
    } : null;

    const totalScore = koResult ? koResult.score : 70;

    return (
        <div className="min-h-screen">
            <Navigation />
            <div className="flex justify-center py-3 bg-black/20">
                <AdSense slot="2233445566" format="horizontal" />
            </div>

            <main className="max-w-2xl mx-auto px-4 py-8">

                {/* ── 헤더 ── */}
                <div className="text-center mb-8 fade-in-up">
                    <div className="text-5xl mb-3">✍️</div>
                    <h1 className="text-2xl md:text-3xl font-bold text-yellow-100 mb-2">
                        {isKo
                            ? `「${inputData.name}」 성명학 분석 결과`
                            : `Numerology Report for "${inputData.birthFullName}"`}
                    </h1>
                    {isKo && inputData.year && (
                        <p className="text-yellow-200/60 text-sm">
                            {inputData.year}년 {inputData.month}월 {inputData.day}일생
                        </p>
                    )}
                    {!isKo && (
                        <p className="text-yellow-200/60 text-sm">
                            {inputData.year}/{inputData.month}/{inputData.day}
                            {inputData.currentName && ` · Current: ${inputData.currentName}`}
                        </p>
                    )}
                </div>

                {/* ════════ 한국어 성명학 ════════ */}
                {isKo && koResult && (
                    <>
                        {/* 종합 점수 */}
                        <div className="card-glow p-6 mb-6 text-center">
                            <p className="text-yellow-200/60 text-xs mb-1 tracking-widest">TOTAL SCORE</p>
                            <div className="text-7xl font-bold mb-1 shimmer">{totalScore}</div>
                            <p className={`text-sm font-semibold mb-2 ${totalScore >= 80 ? 'text-yellow-400' : totalScore >= 65 ? 'text-green-400' : 'text-blue-400'}`}>
                                {totalScore >= 80 ? '이름의 기운이 매우 좋습니다' : totalScore >= 65 ? '이름의 기운이 좋은 경향입니다' : '이름의 기운이 보통입니다'}
                            </p>
                            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-600/30 rounded-full px-4 py-1 text-sm">
                                <span className="text-green-300">
                                    소리오행: <strong>{soundRelation}</strong>
                                </span>
                            </div>
                        </div>

                        {/* 소리오행 흐름 */}
                        <div className="card-dark p-5 mb-6">
                            <h2 className="text-base font-bold text-yellow-300 mb-4">🎵 소리오행(音五行) 흐름</h2>
                            <div className="flex items-center justify-center gap-1 flex-wrap">
                                {inputData.name?.split('').map((char, i) => {
                                    const cho = extractChosung(char);
                                    const ohaeng = soundOhaeng[cho];
                                    return (
                                        <div key={i} className="flex flex-col items-center">
                                            <div className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center ${ohaeng ? `${OHAENG_COLOR[ohaeng]} bg-${ohaeng === '목' ? 'green' : ohaeng === '화' ? 'red' : ohaeng === '토' ? 'yellow' : ohaeng === '금' ? 'gray' : 'blue'}-900/20 border-current/40` : 'border-yellow-700/20 bg-white/5'
                                                }`}>
                                                <span className="text-xl font-bold text-yellow-100">{char}</span>
                                                {ohaeng && <span className={`text-xs ${OHAENG_COLOR[ohaeng]}`}>{ohaeng}</span>}
                                            </div>
                                            {i < (inputData.name?.length || 0) - 1 && (
                                                <span className={`text-lg mt-1 ${soundRelation.includes('상생') ? 'text-green-400' : soundRelation.includes('상극') ? 'text-red-400' : 'text-yellow-600'}`}>
                                                    {soundRelation.includes('상생') ? '→' : soundRelation.includes('상극') ? '╳' : '—'}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={`mt-4 rounded-lg px-4 py-3 text-center text-sm ${soundRelation.includes('상생') ? 'bg-green-900/20 border border-green-700/30 text-green-300' :
                                    soundRelation.includes('상극') ? 'bg-red-900/20 border border-red-700/30 text-red-300' :
                                        'bg-yellow-900/20 border border-yellow-700/30 text-yellow-300'
                                }`}>
                                <strong>{soundRelation}</strong> —
                                {soundRelation.includes('상생') ? ' 이름의 소리가 서로 힘을 더해주는 이상적인 관계입니다' :
                                    soundRelation.includes('상극') ? ' 이름의 소리에 긴장이 있으나, 강한 추진력의 원천이 되기도 합니다' :
                                        ' 이름의 소리가 균형 잡힌 중립적인 관계입니다'}
                            </div>
                        </div>

                        {/* 자원오행 흐름 */}
                        <div className="card-dark p-5 mb-6">
                            <h2 className="text-base font-bold text-yellow-300 mb-1">✏️ 자원오행(字源五行) 흐름</h2>
                            <p className="text-yellow-200/50 text-xs mb-4">각 글자의 획수 끝자리로 결정되는 오행입니다</p>
                            <div className="flex items-center justify-center gap-1 flex-wrap">
                                {inputData.name?.split('').map((char, i) => {
                                    const stroke = koResult!.strokes[i] || 0;
                                    const ohaeng = koResult!.jawonohaengList[i];
                                    return (
                                        <div key={i} className="flex flex-col items-center">
                                            <div className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center ${
                                                ohaeng === '목' ? 'text-green-400 bg-green-900/20 border-green-500/40' :
                                                ohaeng === '화' ? 'text-red-400 bg-red-900/20 border-red-500/40' :
                                                ohaeng === '토' ? 'text-yellow-400 bg-yellow-900/20 border-yellow-500/40' :
                                                ohaeng === '금' ? 'text-gray-300 bg-gray-800/30 border-gray-500/40' :
                                                ohaeng === '수' ? 'text-blue-400 bg-blue-900/20 border-blue-500/40' :
                                                'border-yellow-700/20 bg-white/5 text-yellow-100'
                                            }`}>
                                                <span className="text-xl font-bold text-yellow-100">{char}</span>
                                                <span className="text-xs">{ohaeng || '—'}</span>
                                            </div>
                                            <span className="text-yellow-200/50 text-xs mt-1">{stroke}획</span>
                                            {i < (inputData.name?.length || 0) - 1 && (
                                                <span className={`text-lg mt-1 ${
                                                    koResult!.jawonohaengRelation.includes('상생') ? 'text-green-400' :
                                                    koResult!.jawonohaengRelation.includes('상극') ? 'text-red-400' :
                                                    'text-yellow-600'
                                                }`}>
                                                    {koResult!.jawonohaengRelation.includes('상생') ? '→' :
                                                     koResult!.jawonohaengRelation.includes('상극') ? '╳' : '—'}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={`mt-4 rounded-lg px-4 py-3 text-center text-sm ${
                                koResult!.jawonohaengRelation.includes('상생') ? 'bg-green-900/20 border border-green-700/30 text-green-300' :
                                koResult!.jawonohaengRelation.includes('상극') ? 'bg-red-900/20 border border-red-700/30 text-red-300' :
                                'bg-yellow-900/20 border border-yellow-700/30 text-yellow-300'
                            }`}>
                                <strong>{koResult!.jawonohaengRelation}</strong> —
                                {koResult!.jawonohaengRelation.includes('상생') ? ' 획수 기운이 서로 보완하는 이상적인 흐름입니다' :
                                 koResult!.jawonohaengRelation.includes('상극') ? ' 획수 기운에 긴장이 있으나 강한 의지력의 원천이 됩니다' :
                                 ' 획수 기운이 균형 잡힌 중립적인 관계입니다'}
                            </div>
                        </div>

                        {/* 4격 수리 */}
                        <div className="card-dark p-5 mb-6">
                            <h2 className="text-base font-bold text-yellow-300 mb-4">📐 4격(格) 수리 배치</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <SuriBadge number={koResult.wongyeok} label="원격(元格) 총합수" />
                                <SuriBadge number={koResult.hyeongyeok} label="형격(亨格) 이름수" />
                                <SuriBadge number={koResult.igyeok} label="이격(利格) 성씨수" />
                                <SuriBadge number={koResult.jeonggyeok} label="정격(貞格) 정합수" />
                            </div>
                            <div className="mt-4 bg-yellow-900/10 border border-yellow-700/20 rounded-lg p-3">
                                <p className="text-yellow-200/60 text-xs leading-relaxed">
                                    💡 <strong className="text-yellow-400">원격</strong>은 이름의 총 기운, <strong className="text-yellow-400">형격</strong>은 사회적 활동 에너지,
                                    <strong className="text-yellow-400"> 이격</strong>은 성씨의 뿌리 에너지, <strong className="text-yellow-400">정격</strong>은 전체 기운의 완성입니다.
                                </p>
                            </div>
                        </div>

                        {/* 원격 상세 해설 */}
                        <div className="result-section mb-4">
                            <div className="result-section-title"><span>⭐</span>원격(元格) {koResult.wongyeok}수 — {suriData[koResult.wongyeok]?.name}</div>
                            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg px-3 py-2 mb-3">
                                <p className="text-yellow-400 text-xs font-bold">✦ {suriData[koResult.wongyeok]?.summary}</p>
                            </div>
                            <p className="text-sm leading-relaxed">{suriData[koResult.wongyeok]?.description}</p>
                            <p className="text-yellow-200/60 text-sm mt-3 leading-relaxed">
                                원격 {koResult.wongyeok}수를 가진 {inputData.name}님은 이름 전체의 기운이
                                <strong className="text-yellow-300"> {suriData[koResult.wongyeok]?.summary}</strong>을 향해 흐릅니다.
                                이 기운은 타고난 방향성으로, 삶의 선택과 환경이 자연스럽게 이 에너지를 중심으로 전개됩니다.
                            </p>
                        </div>

                        <div className="flex justify-center py-4 mb-2">
                            <AdSense slot="3344556677" format="rectangle" />
                        </div>

                        {/* 형격 */}
                        <div className="result-section mb-4">
                            <div className="result-section-title"><span>💼</span>형격(亨格) {koResult.hyeongyeok}수 — 사회적 활동 에너지</div>
                            <p className="text-sm leading-relaxed">
                                형격 {koResult.hyeongyeok}수({suriData[koResult.hyeongyeok]?.name})는 {inputData.name}님이 사회에서 활동할 때 나타나는 에너지를 나타냅니다.
                                {suriData[koResult.hyeongyeok]?.description} 직장이나 사업에서 이 기운이 가장 두드러지게 표현됩니다.
                            </p>
                        </div>

                        {/* 직업·재물·연애 */}
                        {[
                            { icon: '💼', title: '직업 적성 & 재능', content: `${koContent.career}\n\n이름 「${inputData.name}」의 소리오행은 ${soundRelation} 관계로, ${soundRelation.includes('상생') ? '직업에서 꾸준히 성장하고 주변의 협력을 얻는' : soundRelation.includes('상극') ? '역경을 딛고 일어서는 강한 추진력의' : '안정적이고 균형 있는'} 에너지를 발휘합니다.` },
                            { icon: '💰', title: '재물운 분석', content: `${koContent.wealth}\n\n원격 ${koResult.wongyeok}수의 기운이 재물에 미치는 영향: ${suriData[koResult.wongyeok]?.rating === 'great' || suriData[koResult.wongyeok]?.rating === 'good' ? '재물과의 인연이 깊어 꾸준한 노력이 좋은 결실로 이어지는 경향이 있습니다.' : '재물보다는 경험과 인간관계에서 더 큰 풍요를 발견하는 타입입니다.'}` },
                            { icon: '💕', title: '인간관계 & 연애운', content: `${koContent.love}\n\n이름의 소리오행 ${soundRelation} 특성상 ${soundRelation.includes('상생') ? '인간관계에서도 자연스럽게 상대에게 에너지를 주는 따뜻한 사람으로 인식됩니다.' : soundRelation.includes('상극') ? '강한 인상을 주지만, 깊이 알수록 매력을 발견하게 되는 타입입니다.' : '균형 잡힌 관계를 유지하며 폭넓은 인간관계를 만들어갑니다.'}` },
                        ].map((s, i) => (
                            <div key={i} className="result-section mb-4">
                                <div className="result-section-title"><span>{s.icon}</span>{s.title}</div>
                                <p className="text-sm leading-relaxed whitespace-pre-line">{s.content}</p>
                            </div>
                        ))}

                        <div className="flex justify-center py-4 mb-2">
                            <AdSense slot="4455667788" format="rectangle" />
                        </div>

                        {/* 이름 오행 개운법 */}
                        <div className="result-section mb-6">
                            <div className="result-section-title"><span>✨</span>이름 오행 개운법</div>
                            <div className="grid grid-cols-1 gap-3 mt-2">
                                {soundList.length > 0 && (() => {
                                    const gaeunMap: Record<string, { tip: string; color: string }> = {
                                        목: { tip: '초록색 소품·식물 키우기, 동쪽 방향 활동, 봄에 중요 결정', color: 'text-green-300 bg-green-900/20 border-green-700/30' },
                                        화: { tip: '밝은 조명 환경, 빨간·주황 계열 사용, 여름에 중요 결정', color: 'text-red-300 bg-red-900/20 border-red-700/30' },
                                        토: { tip: '황토색 소품, 땅과 관련된 취미(텃밭·도예), 가을 초 활동', color: 'text-yellow-300 bg-yellow-900/20 border-yellow-700/30' },
                                        금: { tip: '금속 장신구 착용, 흰색 옷 즐겨 입기, 서쪽 방향 활동', color: 'text-gray-300 bg-gray-800/30 border-gray-600/30' },
                                        수: { tip: '물·유리 인테리어, 남색·검정 활용, 겨울이 가장 강한 시기', color: 'text-blue-300 bg-blue-900/20 border-blue-700/30' },
                                    };
                                    const dominant = soundList[0];
                                    const g = gaeunMap[dominant];
                                    return (
                                        <div className={`border rounded-xl p-4 ${g.color}`}>
                                            <p className="font-bold text-sm mb-1">{OHAENG_ICON[dominant]} {dominant} 오행 개운법</p>
                                            <p className="text-sm opacity-80">{g.tip}</p>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>

                        {/* 개명 가이드 */}
                        {renameGuide && (
                            <div className="card-dark border border-green-700/30 p-5 mb-6">
                                <h2 className="text-base font-bold text-green-300 mb-4">✏️ 개명 가이드</h2>
                                <div className="space-y-3">
                                    <p className="text-yellow-200/80 text-sm">
                                        {inputData.name}님의 이름 에너지를 보완하기 위한 개명 방향입니다:
                                    </p>
                                    {renameGuide.boost.length > 0 && (
                                        <div>
                                            <p className="text-green-400 text-xs font-bold mb-2">🔮 보완 오행</p>
                                            {renameGuide.boost.map((b, i) => (
                                                <div key={i} className="text-yellow-200/70 text-sm py-1 border-b border-yellow-900/20">• {b}</div>
                                            ))}
                                        </div>
                                    )}
                                    {renameGuide.goalText.length > 0 && (
                                        <div>
                                            <p className="text-green-400 text-xs font-bold mb-2">🌟 추구 방향별 수리 가이드</p>
                                            {renameGuide.goalText.map((g, i) => (
                                                <div key={i} className="text-yellow-200/70 text-sm py-1 border-b border-yellow-900/20">• {g}</div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3 mt-2">
                                        <p className="text-amber-300 text-xs">
                                            ⚠️ 개명은 전문 성명학자와의 상담을 통해 진행하시길 권장합니다. 위 내용은 참고용입니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* ════════ 영어 수비학 결과 ════════ */}
                {!isKo && (
                    <>
                        {/* 핵심 4수 카드 */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {[
                                { label: 'Life Path', val: inputData.lifePath, desc: 'Your core life journey' },
                                { label: 'Expression', val: inputData.expressionNumber, desc: 'Your life purpose' },
                                { label: 'Soul Urge', val: inputData.soulUrge, desc: "Your heart's desire" },
                                { label: 'Personality', val: inputData.personalityNumber, desc: 'How others see you' },
                            ].filter(x => x.val != null).map(({ label, val, desc }) => {
                                const m = NUMBER_MEANINGS[val!];
                                return (
                                    <div key={label} className="card-dark p-4 text-center">
                                        <p className="text-yellow-200/50 text-xs mb-1">{label}</p>
                                        <div className={`text-4xl font-bold ${m?.color || 'text-yellow-400'}`}>{val}</div>
                                        {m && <p className={`text-sm font-bold mt-1 ${m.color}`}>{m.title}</p>}
                                        <p className="text-yellow-200/40 text-xs mt-1">{desc}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Life Path 상세 */}
                        {inputData.lifePath && NUMBER_MEANINGS[inputData.lifePath] && (() => {
                            const m = NUMBER_MEANINGS[inputData.lifePath];
                            return (
                                <>
                                    <div className="result-section mb-4">
                                        <div className="result-section-title">
                                            <span>🛤️</span>Life Path {inputData.lifePath} — {m.title}
                                        </div>
                                        <div className={`border rounded-lg px-3 py-2 mb-3 ${m.color.replace('text-', 'border-').replace('400', '500/40').replace('300', '400/40')} bg-white/5`}>
                                            <p className={`text-xs font-bold ${m.color}`}>✦ Your Core Life Theme</p>
                                        </div>
                                        <p className="text-sm leading-relaxed">{m.desc}</p>
                                        <p className="text-yellow-200/70 text-sm mt-3 leading-relaxed">
                                            As a Life Path {inputData.lifePath}, {inputData.birthFullName?.split(' ')[0]} is here to embody the energy of the <strong className={m.color}>{m.title}</strong>.
                                            This doesn&apos;t mean your path is fixed — it means your greatest fulfillment comes when you align with this core energy.
                                        </p>
                                    </div>
                                    <div className="result-section mb-4">
                                        <div className="result-section-title"><span>💼</span>Career & Purpose</div>
                                        <p className="text-sm leading-relaxed">{m.career}</p>
                                    </div>
                                    <div className="result-section mb-4">
                                        <div className="result-section-title"><span>💕</span>Love & Relationships</div>
                                        <p className="text-sm leading-relaxed">{m.love}</p>
                                    </div>
                                </>
                            );
                        })()}

                        <div className="flex justify-center py-4 mb-2">
                            <AdSense slot="3344556677" format="rectangle" />
                        </div>

                        {/* Expression & Soul Urge */}
                        {[
                            { key: 'expressionNumber', icon: '⭐', label: 'Expression / Destiny Number', subLabel: 'Your life purpose encoded in your full birth name' },
                            { key: 'soulUrge', icon: '💜', label: 'Soul Urge / Heart\'s Desire', subLabel: 'The deeper yearning behind your outer personality (vowels only)' },
                            { key: 'personalityNumber', icon: '🎭', label: 'Personality Number', subLabel: 'How others perceive you in the world (consonants only)' },
                        ].map(({ key, icon, label, subLabel }) => {
                            const val = inputData[key as keyof SeongmyeongInput] as number;
                            if (!val) return null;
                            const m = NUMBER_MEANINGS[val];
                            return m ? (
                                <div key={key} className="result-section mb-4">
                                    <div className="result-section-title"><span>{icon}</span>{label}: {val} — {m.title}</div>
                                    <p className="text-yellow-200/50 text-xs mb-3">{subLabel}</p>
                                    <p className="text-sm leading-relaxed">{m.desc}</p>
                                    <p className="text-yellow-200/70 text-sm mt-2">
                                        With {key === 'soulUrge' ? 'a Soul Urge' : key === 'personalityNumber' ? 'a Personality Number' : 'an Expression Number'} of {val},
                                        {inputData.birthFullName?.split(' ')[0]} {key === 'soulUrge' ? 'secretly yearns for' : key === 'personalityNumber' ? 'comes across to others as' : 'is destined to express'}
                                        {' '}the qualities of the <strong className={m.color}>{m.title}</strong>.
                                    </p>
                                </div>
                            ) : null;
                        })}

                        {/* Personal Year */}
                        {inputData.year && (() => {
                            const py = ((2025 + inputData.month! + inputData.day!) % 9) || 9;
                            const m = NUMBER_MEANINGS[py];
                            return (
                                <div className="result-section mb-6">
                                    <div className="result-section-title"><span>📅</span>2025 Personal Year Number: {py}</div>
                                    <p className="text-yellow-200/70 text-sm mb-2">
                                        Your Personal Year reveals the overarching theme of what 2025 holds for {inputData.birthFullName?.split(' ')[0]}.
                                    </p>
                                    <p className={`font-bold ${m?.color}`}>{m?.title}</p>
                                    <p className="text-sm leading-relaxed mt-1">{m?.desc}</p>
                                </div>
                            );
                        })()}

                        {/* Current name */}
                        {inputData.currentName && inputData.currentExpression && NUMBER_MEANINGS[inputData.currentExpression] && (
                            <div className="result-section mb-6">
                                <div className="result-section-title"><span>🔄</span>Current Name Energy: &quot;{inputData.currentName}&quot;</div>
                                <p className="text-sm leading-relaxed">
                                    Your current name &quot;{inputData.currentName}&quot; carries an Expression Number of <strong className={NUMBER_MEANINGS[inputData.currentExpression].color}>{inputData.currentExpression} ({NUMBER_MEANINGS[inputData.currentExpression].title})</strong>.
                                    This is the social energy you project every time someone calls your name.
                                    {inputData.currentExpression === inputData.expressionNumber
                                        ? ' Great news — it aligns with your birth name energy, creating a cohesive personal brand.'
                                        : ` This differs from your birth name Expression (${inputData.expressionNumber}), which means your public persona and your core nature may feel different at times.`}
                                </p>
                            </div>
                        )}
                    </>
                )}

                <div className="flex justify-center py-4 mb-2">
                    <AdSense slot="5566778800" format="rectangle" />
                </div>

                {/* 면책 */}
                <div className="bg-yellow-900/10 border border-yellow-900/20 rounded-xl p-4 mb-6">
                    <p className="text-yellow-200/40 text-xs leading-relaxed text-center">
                        {isKo
                            ? '본 분석은 전통 성명학 이론을 기반으로 한 참고 자료입니다. 중요한 결정 전 전문가와 상담하시기 바랍니다.'
                            : 'This numerology report is for entertainment and self-discovery purposes. For major life decisions, please consult a professional.'}
                    </p>
                </div>

                {/* 공유 */}
                <div className="flex gap-3 mb-8">
                    <button className="share-btn share-link flex-1 justify-center" onClick={handleCopy}>
                        <span>{copied ? '✅' : '🔗'}</span>
                        <span>{copied ? (isKo ? '복사됨!' : 'Copied!') : (isKo ? '결과 링크 복사' : 'Copy Link')}</span>
                    </button>
                    <button className="btn-secondary flex-1" onClick={() => router.push(`/${locale}/seongmyeong-analysis`)}>
                        🔄 {isKo ? '다시 분석하기' : 'Analyze Again'}
                    </button>
                </div>

            </main>
            <Footer />
        </div>
    );
}
