'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { RESULT_REVEAL_DELAY_MS } from '../../../../lib/constants/analysis-delay';
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import AdSense from '../../../../components/AdSense';

// ════════ 타입 ════════
interface GwansangInput {
    hasFront: boolean;
    hasSide: boolean;
    frontData: {
        shape: string;
        score: number;
        dominant: string;
    } | null;
    ts: number;
}

function decodeInput(id: string): GwansangInput | null {
    try {
        const base64 = id.replace(/-/g, '+').replace(/_/g, '/');
        const padding = '='.repeat((4 - (base64.length % 4)) % 4);
        const binStr = atob(base64 + padding);
        const bytes = Uint8Array.from(binStr, c => c.charCodeAt(0));
        return JSON.parse(new TextDecoder().decode(bytes));
    } catch { return null; }
}

// ════════ 로딩 ════════
const LOADING_STEPS = [
    '얼굴형 분류 중…',
    '좌우 대칭도 측정 중…',
    '이마·눈·코·입 관상점 분석 중…',
    '기운 에너지 판독 중…',
    '관상학 운세 생성 중…',
];

function LoadingScreen({ isKo }: { isKo: boolean }) {
    const steps = isKo ? LOADING_STEPS : [
        'Detecting face shape…',
        'Measuring symmetry score…',
        'Analyzing facial features…',
        'Reading expression energy…',
        'Generating fortune report…',
    ];
    const [step, setStep] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 550);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <div className="text-6xl mb-6 animate-pulse">👁️</div>
            <h2 className="text-xl font-bold text-yellow-100 mb-2">
                {isKo ? '관상 분석 중…' : 'Reading your face…'}
            </h2>
            <p className="text-yellow-200/50 text-sm mb-10">
                {isKo ? '잠시만 기다려 주세요' : 'Please wait a moment'}
            </p>
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

// ════════ 데이터: 얼굴형별 관상 해석 ════════
const FACE_SHAPE_DATA: Record<string, {
    nameKo: string; nameEn: string; icon: string;
    descKo: string; descEn: string;
    personality: string; personalityEn: string;
    wealth: string; wealthEn: string;
    love: string; loveEn: string;
    career: string; careerEn: string;
    lucky: string; luckyEn: string;
}> = {
    oval: {
        nameKo: '타원형(달걀형)', nameEn: 'Oval Face',
        icon: '🥚',
        descKo: '이마와 턱이 균형 잡힌 이상적인 얼굴형입니다. 동서양 관상학 모두에서 복이 많은 상으로 분류됩니다.',
        descEn: 'Balanced forehead and jaw — considered the ideal face shape in both Eastern and Western physiognomy.',
        personality: '온화하고 사교적이며 누구와도 잘 어울립니다. 직관력이 뛰어나고 상황 적응력이 강합니다. 내면에 강한 의지를 숨기고 있어 결정적인 순간에 빛을 발합니다.',
        personalityEn: 'Warm, sociable, and adaptable. You have strong intuition and hidden willpower that shines at decisive moments.',
        wealth: '35세 이후 안정적인 재물 흐름이 형성됩니다. 투자보다 꾸준한 저축과 업무 능력으로 재물을 쌓는 유형입니다.',
        wealthEn: 'Steady wealth accumulation after 35. Better suited to consistent effort than speculation.',
        love: '인연이 좋고 주변에 사람이 끊이지 않습니다. 배려심이 깊어 파트너에게 신뢰를 주며, 안정적이고 진지한 사랑을 추구합니다.',
        loveEn: 'Naturally attractive to others. Deep consideration for partners makes you a trustworthy lover.',
        career: '대인 관계가 핵심인 직업에서 두각을 나타냅니다. 교육·상담·영업·외교·의료 분야가 특히 잘 맞습니다.',
        careerEn: 'Excels in people-centered careers: education, counseling, sales, diplomacy, healthcare.',
        lucky: '파란색 계열의 옷, 북쪽 방향, 숫자 6',
        luckyEn: 'Blue tones, North direction, Number 6',
    },
    oval_long: {
        nameKo: '긴 타원형(장형)', nameEn: 'Long Oval Face',
        icon: '🎎',
        descKo: '얼굴 길이가 길고 이마가 넓은 형입니다. 지성과 사색이 깊은 관상으로, 전통 관상학에서 학문과 명예를 상징합니다.',
        descEn: 'Long face with wide forehead — symbolizes intellect and honor in traditional physiognomy.',
        personality: '사려 깊고 분석적이며 완벽주의 성향이 있습니다. 감정보다 이성을 따르며, 혼자 있는 시간을 통해 에너지를 충전합니다.',
        personalityEn: 'Thoughtful, analytical, and perfectionistic. You recharge best through solitary reflection.',
        wealth: '지식·전문성을 통해 재물을 만들어가는 유형입니다. 초반보다 중년 이후에 능력이 충분히 발휘됩니다.',
        wealthEn: 'Wealth through expertise. Your potential fully blooms from middle age.',
        love: '감정 표현이 내성적이어서 오해를 받기도 하지만, 한번 사랑하면 매우 깊고 진지합니다. 상대的 지적 대화를 중요시합니다.',
        loveEn: 'Reserved in expression but deeply devoted once committed. Intellectual connection is key.',
        career: '연구·학문·IT·법조·의학·금융 분야에서 뛰어난 성과를 냅니다. 전문직이 천직입니다.',
        careerEn: 'Thrives in research, academia, IT, law, medicine, and finance. Professional careers suit best.',
        lucky: '흰색·회색 계열, 서쪽 방향, 숫자 7',
        luckyEn: 'White & gray tones, West direction, Number 7',
    },
    round: {
        nameKo: '둥근형(원형)', nameEn: 'Round Face',
        icon: '🌕',
        descKo: '볼이 풍성하고 얼굴이 둥글고 부드러운 형입니다. 동양 관상에서 복이 많고 인덕이 있는 상으로 봅니다.',
        descEn: 'Full cheeks and soft contours — Eastern physiognomy sees this as a face of great fortune and virtue.',
        personality: '낙천적이고 따뜻하며 주변 사람들을 편안하게 만듭니다. 공감 능력이 뛰어나고 인간관계의 폭이 넓습니다.',
        personalityEn: 'Optimistic and warm-hearted. You have excellent empathy and a wide social circle.',
        wealth: '인맥과 인덕으로 재물이 들어오는 유형입니다. 혼자보다 팀·파트너십에서 더 큰 성과를 냅니다.',
        wealthEn: 'Fortune comes through connections and partnerships rather than solo effort.',
        love: '자연스럽게 사랑스러운 인상을 주어 연애운이 좋습니다. 가정적이고 따뜻한 파트너로 인기가 많습니다.',
        loveEn: 'Naturally loveable — strong romantic fortune. You make a warm, caring partner.',
        career: '사람을 상대하는 서비스업·요식업·유통·엔터테인먼트·복지 분야에서 빛납니다.',
        careerEn: 'Shines in service industries, food & beverage, distribution, entertainment, and welfare.',
        lucky: '노란색·주황색 계열, 중앙·남서 방향, 숫자 2와 5',
        luckyEn: 'Yellow & orange tones, South-West direction, Numbers 2 & 5',
    },
    square: {
        nameKo: '각진형(사각형)', nameEn: 'Square Face',
        icon: '🏛️',
        descKo: '턱이 각지고 얼굴 윤곽이 뚜렷한 형입니다. 강인한 의지와 리더십이 강한 관상으로 평가됩니다.',
        descEn: 'Strong jaw and defined contours — associated with powerful will and natural leadership.',
        personality: '의지가 강하고 책임감이 있으며 목표 지향적입니다. 어려운 상황에서도 흔들리지 않는 강한 멘탈의 소유자입니다.',
        personalityEn: 'Strong-willed, responsible, and goal-driven. You stay steady even under pressure.',
        wealth: '30대 이후 자신의 분야에서 두각을 나타내며 안정적인 재물을 쌓습니다. 사업가·전문직에 적합한 재물운입니다.',
        wealthEn: 'Steady wealth-building from the 30s, especially in entrepreneurship or specialist roles.',
        love: '진지하고 솔직하며 표현이 직접적입니다. 한번 마음을 열면 매우 헌신적인 파트너가 됩니다.',
        loveEn: 'Straightforward and sincere. Once committed, you are intensely devoted.',
        career: '군·경·법조·건설·공학·스포츠·경영 분야에서 강점을 발휘합니다. 통솔력이 뛰어납니다.',
        careerEn: 'Strong in military, law, construction, engineering, sports, and management. Natural authority.',
        lucky: '붉은색·갈색 계열, 남쪽 방향, 숫자 1과 8',
        luckyEn: 'Red & brown tones, South direction, Numbers 1 & 8',
    },
    triangle_inv: {
        nameKo: '역삼각형(하트형)', nameEn: 'Inverted Triangle Face',
        icon: '💎',
        descKo: '이마가 넓고 턱이 좁고 뾰족한 형입니다. 두뇌가 명석하고 창의성이 풍부한 관상으로 자주 언급됩니다.',
        descEn: 'Wide forehead and narrow jaw — associated with sharp intellect and creative brilliance.',
        personality: '창의적이고 독창적이며 새로운 것에 호기심이 왕성합니다. 유행을 이끄는 감각과 예술적 안목이 특별합니다.',
        personalityEn: 'Creative, original, and intensely curious. You have a unique sensibility that leads trends.',
        wealth: '창의성·아이디어를 통해 독특한 방식으로 재물을 만듭니다. 예술·콘텐츠·스타트업 분야에서 큰 성과 가능합니다.',
        wealthEn: 'Fortune through creativity and ideas. Arts, content, and startups hold your greatest potential.',
        love: '감수성이 풍부하고 낭만적입니다. 이상적인 사랑을 추구하며, 정신적 교감을 가장 중요시합니다.',
        loveEn: 'Sensitive and romantic. You seek ideal love with deep spiritual and emotional connection.',
        career: '예술·디자인·마케팅·스타트업·작가·뮤지션·영화·유튜버 등 창의적 직업이 천직입니다.',
        careerEn: 'Creative fields are your calling: art, design, marketing, startups, writing, music, film.',
        lucky: '보라색·초록색 계열, 동쪽 방향, 숫자 3과 9',
        luckyEn: 'Purple & green tones, East direction, Numbers 3 & 9',
    },
};

const DEFAULT_SHAPE = 'oval'; // 얼굴 미감지 시 기본값

// ════════ 대칭도별 해설 ════════
function getSymmetryComment(score: number, isKo: boolean): string {
    if (score >= 90) return isKo
        ? '매우 높은 대칭도입니다. 전통 관상학에서 이는 타고난 귀상(貴相)의 조건 중 하나로, 조화로운 기운이 얼굴 전체에 고루 흐르고 있습니다.'
        : 'Exceptional symmetry — a traditional mark of noble fortune. Harmonious energy flows evenly across your face.';
    if (score >= 80) return isKo
        ? '높은 대칭도를 보입니다. 좌뇌와 우뇌의 기운이 균형 잡혀 있어 판단력과 실행력이 균형 있게 발달해 있습니다.'
        : 'High symmetry — indicates balanced left and right brain energy, leading to balanced judgment and action.';
    if (score >= 70) return isKo
        ? '평균 이상의 대칭도입니다. 약간의 비대칭은 개성의 표현으로, 오히려 매력 포인트가 되는 경우가 많습니다.'
        : 'Above-average symmetry. Slight asymmetry adds character and is often perceived as charming.';
    return isKo
        ? '개성 있는 비대칭 얼굴입니다. 관상학에서는 비대칭이 강한 개성과 예술적 감각을 나타낸다고 봅니다.'
        : 'Distinctly asymmetric — associated with strong individuality and artistic sensibility in physiognomy.';
}

// ════════ 표정 에너지별 해설 ════════
const EXPRESSION_DATA: Record<string, { ko: string; en: string; icon: string }> = {
    neutral: { icon: '⚖️', ko: '평온한 기운', en: 'Calm Energy' },
    happy: { icon: '☀️', ko: '밝고 긍정적인 기운', en: 'Bright & Positive Energy' },
    sad: { icon: '💧', ko: '섬세하고 감성적인 기운', en: 'Sensitive & Emotional Energy' },
    angry: { icon: '🔥', ko: '강하고 주도적인 기운', en: 'Strong & Assertive Energy' },
    fearful: { icon: '🌊', ko: '직관이 강한 예민한 기운', en: 'Highly Intuitive Energy' },
    disgusted: { icon: '💎', ko: '원칙과 기준이 뚜렷한 기운', en: 'Principled & Discerning Energy' },
    surprised: { icon: '✨', ko: '호기심과 창의성이 넘치는 기운', en: 'Curious & Creative Energy' },
};

// ════════ 메인 ════════
export default function GwansangResultPage() {
    const params = useParams();
    const router = useRouter();
    const locale = (params.locale as string) || 'ko';
    const id = params.id as string;
    const isKo = locale === 'ko';

    const inputData = useMemo(() => decodeInput(id), [id]);
    const [loadingDone, setLoadingDone] = useState(false);
    const [copied, setCopied] = useState(false);
    const [frontImg, setFrontImg] = useState<string | null>(null);

    useEffect(() => {
        if (!inputData) { router.push(`/${locale}`); return; }
        // sessionStorage에서 이미지 복원
        const img = sessionStorage.getItem('gwansang_front');
        if (img) setFrontImg(img);
        const t = setTimeout(() => setLoadingDone(true), RESULT_REVEAL_DELAY_MS);
        return () => clearTimeout(t);
    }, [inputData, locale]);

    if (!inputData) return null;
    if (!loadingDone) return <LoadingScreen isKo={isKo} />;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    // 얼굴 데이터 추출
    const faceShape = inputData.frontData?.shape || DEFAULT_SHAPE;
    const shapeData = FACE_SHAPE_DATA[faceShape] || FACE_SHAPE_DATA[DEFAULT_SHAPE];
    const symmetryScore = inputData.frontData?.score ?? 72;
    const dominant = inputData.frontData?.dominant || 'neutral';
    const expressionData = EXPRESSION_DATA[dominant] || EXPRESSION_DATA['neutral'];

    // 총점 (대칭도 + 얼굴형 기본점)
    const baseScore = { oval: 82, oval_long: 78, round: 80, square: 76, triangle_inv: 75 }[faceShape] ?? 78;
    const totalScore = Math.round(baseScore * 0.4 + symmetryScore * 0.6);
    const accuracyPct = inputData.hasSide ? 95 : 75;

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
                    <div className="text-5xl mb-3">👁️</div>
                    <h1 className="text-2xl md:text-3xl font-bold text-yellow-100 mb-2">
                        {isKo ? '관상 분석 결과' : 'Face Reading Result'}
                    </h1>
                    <div className="inline-flex items-center gap-2 bg-orange-900/30 border border-orange-600/30 rounded-full px-4 py-1.5 text-sm mt-2">
                        <span className="text-orange-400">✦</span>
                        <span className="text-yellow-200">
                            {isKo ? `분석 정확도 ${accuracyPct}%` : `Analysis Accuracy ${accuracyPct}%`}
                        </span>
                    </div>
                </div>

                {/* ── 사진 미리보기 + 얼굴형 뱃지 ── */}
                <div className="card-dark p-5 mb-6">
                    <div className="flex gap-4 items-center">
                        {frontImg && (
                            <div className="shrink-0">
                                <img
                                    src={frontImg}
                                    alt="분석된 얼굴 사진"
                                    className="w-24 h-24 object-cover rounded-xl border border-orange-600/40"
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <p className="text-yellow-200/50 text-xs mb-1">{isKo ? '감지된 얼굴형' : 'Detected Face Shape'}</p>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-3xl">{shapeData.icon}</span>
                                <span className="text-xl font-bold text-orange-300">
                                    {isKo ? shapeData.nameKo : shapeData.nameEn}
                                </span>
                            </div>
                            <p className="text-yellow-200/60 text-xs leading-relaxed">
                                {isKo ? shapeData.descKo : shapeData.descEn}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── 종합 점수 ── */}
                <div className="card-glow p-6 mb-6 text-center">
                    <p className="text-yellow-200/60 text-xs mb-1 tracking-widest">TOTAL SCORE</p>
                    <div className="text-7xl font-bold mb-1 shimmer">{totalScore}</div>
                    <p className={`text-sm font-semibold mb-6 ${scoreColor(totalScore)}`}>
                        {totalScore >= 85 ? (isKo ? '매우 좋은 관상' : 'Excellent Fortune Face') :
                            totalScore >= 75 ? (isKo ? '좋은 기운의 관상' : 'Favorable Fortune Face') :
                                totalScore >= 65 ? (isKo ? '균형 잡힌 관상' : 'Balanced Fortune Face') :
                                    (isKo ? '독특한 개성의 관상' : 'Distinctive Character Face')}
                    </p>
                    <div className="space-y-3 text-left">
                        {[
                            { label: isKo ? '좌우 대칭도' : 'Facial Symmetry', score: symmetryScore },
                            { label: isKo ? '얼굴형 기운' : 'Face Shape Energy', score: baseScore },
                            { label: isKo ? '표정 에너지' : 'Expression Energy', score: Math.min(95, symmetryScore + 5) },
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

                {/* ── 대칭도 분석 ── */}
                <div className="result-section mb-4">
                    <div className="result-section-title"><span>⚖️</span>{isKo ? '좌우 대칭도 분석' : 'Facial Symmetry Analysis'}</div>
                    <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg px-3 py-2 mb-3">
                        <p className="text-yellow-400 text-xs font-bold">✦ {isKo ? `대칭도 점수: ${symmetryScore}점` : `Symmetry Score: ${symmetryScore}`}</p>
                    </div>
                    <p className="text-sm leading-relaxed">{getSymmetryComment(symmetryScore, isKo)}</p>
                </div>

                {/* ── 표정 에너지 ── */}
                <div className="result-section mb-4">
                    <div className="result-section-title"><span>{expressionData.icon}</span>{isKo ? '기운(氣運) 판독' : 'Energy Reading'}</div>
                    <p className="text-yellow-200/50 text-xs mb-3">
                        {isKo ? '얼굴의 표정 에너지에서 감지된 주요 기운입니다' : 'Dominant energy detected from your facial expression'}
                    </p>
                    <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg px-4 py-3 text-center mb-3">
                        <p className="text-orange-300 font-bold text-base">
                            {isKo ? expressionData.ko : expressionData.en}
                        </p>
                    </div>
                </div>

                {/* ── 성격 분석 ── */}
                <div className="result-section mb-4">
                    <div className="result-section-title"><span>🧠</span>{isKo ? '성격 분석' : 'Personality Analysis'}</div>
                    <p className="text-sm leading-relaxed">
                        {isKo ? shapeData.personality : shapeData.personalityEn}
                    </p>
                </div>

                <div className="flex justify-center py-4 mb-2">
                    <AdSense slot="3344556677" format="rectangle" />
                </div>

                {/* ── 재물운 ── */}
                <div className="result-section mb-4">
                    <div className="result-section-title"><span>💰</span>{isKo ? '재물운 분석' : 'Wealth Fortune'}</div>
                    <p className="text-sm leading-relaxed">
                        {isKo ? shapeData.wealth : shapeData.wealthEn}
                    </p>
                </div>

                {/* ── 연애운 ── */}
                <div className="result-section mb-4">
                    <div className="result-section-title"><span>💕</span>{isKo ? '인연운 & 연애운' : 'Love & Relationships'}</div>
                    <p className="text-sm leading-relaxed">
                        {isKo ? shapeData.love : shapeData.loveEn}
                    </p>
                </div>

                {/* ── 직업 적성 ── */}
                <div className="result-section mb-4">
                    <div className="result-section-title"><span>💼</span>{isKo ? '직업 적성 & 재능' : 'Career & Talents'}</div>
                    <p className="text-sm leading-relaxed">
                        {isKo ? shapeData.career : shapeData.careerEn}
                    </p>
                </div>

                <div className="flex justify-center py-4 mb-2">
                    <AdSense slot="4455667788" format="rectangle" />
                </div>

                {/* ── 행운 요소 ── */}
                <div className="card-dark p-5 mb-6">
                    <h2 className="text-base font-bold text-yellow-300 mb-4">🍀 {isKo ? '행운 요소' : 'Lucky Elements'}</h2>
                    <div className="bg-yellow-900/10 border border-yellow-700/20 rounded-xl p-4">
                        <p className="text-yellow-200/70 text-sm leading-relaxed">
                            {isKo ? shapeData.lucky : shapeData.luckyEn}
                        </p>
                    </div>
                </div>

                {/* ── 정확도 향상 안내 (정면만 있을 때) ── */}
                {!inputData.hasSide && (
                    <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 mb-6">
                        <p className="text-blue-300 text-sm font-bold mb-1">
                            💡 {isKo ? '측면 사진을 추가하면 정확도가 75% → 95%로 향상됩니다' : 'Add a side photo to boost accuracy from 75% → 95%'}
                        </p>
                        <button
                            onClick={() => router.push(`/${locale}/gwansang-analysis`)}
                            className="mt-2 text-xs text-blue-400 hover:text-blue-300 underline"
                        >
                            {isKo ? '측면 사진 추가하기 →' : 'Add side photo →'}
                        </button>
                    </div>
                )}

                <div className="flex justify-center py-4 mb-2">
                    <AdSense slot="5566778800" format="rectangle" />
                </div>

                {/* ── 면책 ── */}
                <div className="bg-yellow-900/10 border border-yellow-900/20 rounded-xl p-4 mb-6">
                    <p className="text-yellow-200/40 text-xs leading-relaxed text-center">
                        {isKo
                            ? '본 분석은 전통 관상학 이론과 AI 얼굴 인식 기술을 결합한 참고 자료입니다. 재미와 자기 이해를 위한 용도로 활용하시기 바랍니다.'
                            : 'This analysis combines traditional physiognomy theory with AI face detection. For entertainment and self-discovery purposes only.'}
                    </p>
                </div>

                {/* ── 공유 ── */}
                <div className="flex gap-3 mb-8">
                    <button className="share-btn share-link flex-1 justify-center" onClick={handleCopy}>
                        <span>{copied ? '✅' : '🔗'}</span>
                        <span>{copied ? (isKo ? '복사됨!' : 'Copied!') : (isKo ? '결과 링크 복사' : 'Copy Link')}</span>
                    </button>
                    <button className="btn-secondary flex-1" onClick={() => router.push(`/${locale}/gwansang-analysis`)}>
                        🔄 {isKo ? '다시 분석하기' : 'Analyze Again'}
                    </button>
                </div>

            </main>
            <Footer />
        </div>
    );
}
