'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { storeResultPayload } from '@/lib/client/result-storage';
import { buildLocalizedHref } from '@/lib/seo';
import Step2Birth, { BirthData } from './steps/Step2Birth';

// ════════════════════════════════════════════
//  📌 공통 유틸
// ════════════════════════════════════════════
// ════════════════════════════════════════════
//  🇰🇷 한국어 성명학 관련 상수
// ════════════════════════════════════════════
const SOUND_OHAENG: Record<string, { ohaeng: string; color: string }> = {
    'ㄱ': { ohaeng: '목(木)', color: 'text-green-400' },
    'ㅋ': { ohaeng: '목(木)', color: 'text-green-400' },
    'ㄴ': { ohaeng: '화(火)', color: 'text-red-400' },
    'ㄷ': { ohaeng: '화(火)', color: 'text-red-400' },
    'ㄹ': { ohaeng: '화(火)', color: 'text-red-400' },
    'ㅌ': { ohaeng: '화(火)', color: 'text-red-400' },
    'ㅇ': { ohaeng: '토(土)', color: 'text-yellow-400' },
    'ㅎ': { ohaeng: '토(土)', color: 'text-yellow-400' },
    'ㅅ': { ohaeng: '금(金)', color: 'text-gray-300' },
    'ㅈ': { ohaeng: '금(金)', color: 'text-gray-300' },
    'ㅊ': { ohaeng: '금(金)', color: 'text-gray-300' },
    'ㅁ': { ohaeng: '수(水)', color: 'text-blue-400' },
    'ㅂ': { ohaeng: '수(水)', color: 'text-blue-400' },
    'ㅍ': { ohaeng: '수(水)', color: 'text-blue-400' },
};

const CHOSUNG_LIST = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

function extractChosung(char: string): string {
    const code = char.charCodeAt(0) - 0xAC00;
    if (code < 0 || code > 11171) return '';
    return CHOSUNG_LIST[Math.floor(code / 588)];
}

function getSoundOhaeng(char: string) {
    const chosung = extractChosung(char);
    return SOUND_OHAENG[chosung] || null;
}

const OHAENG_BOOST = [
    { key: '목', label: '목(木) — 성장·창의·추진력', icon: '🌳', color: 'border-green-500/60 bg-green-900/20 text-green-300' },
    { key: '화', label: '화(火) — 열정·표현·명성', icon: '🔥', color: 'border-red-500/60 bg-red-900/20 text-red-300' },
    { key: '토', label: '토(土) — 안정·신뢰·중심', icon: '⛰️', color: 'border-yellow-500/60 bg-yellow-900/20 text-yellow-300' },
    { key: '금', label: '금(金) — 결단·재물·정밀', icon: '💎', color: 'border-gray-400/60 bg-gray-800/30 text-gray-300' },
    { key: '수', label: '수(水) — 지혜·직관·유연', icon: '💧', color: 'border-blue-500/60 bg-blue-900/20 text-blue-300' },
];

const IMAGE_GOALS = [
    { key: 'wealth', labelKo: '재물운 강화', icon: '💰' },
    { key: 'career', labelKo: '직업·명예운', icon: '🏆' },
    { key: 'love', labelKo: '인연·결혼운', icon: '💕' },
    { key: 'health', labelKo: '건강·장수운', icon: '🌿' },
    { key: 'creative', labelKo: '창의·예술성', icon: '🎨' },
    { key: 'leader', labelKo: '리더십·통솔력', icon: '⚡' },
];

// ════════════════════════════════════════════
//  🇺🇸 피타고라스 수비학 계산 엔진
// ════════════════════════════════════════════
const PYTHAGOREAN: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};
const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

/** 숫자를 한 자리로 축약 (마스터 넘버 11, 22, 33 예외) */
function reduceToPrimary(n: number): number {
    if (n === 11 || n === 22 || n === 33) return n;
    while (n > 9) {
        n = String(n).split('').reduce((a, c) => a + Number(c), 0);
    }
    return n;
}

function calcLifePath(year: number, month: number, day: number): number {
    const digits = `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
    let sum = digits.split('').reduce((a, c) => a + Number(c), 0);
    return reduceToPrimary(sum);
}

interface NumerologyResult {
    expression: number;   // 운명수 (전체 합)
    soulUrge: number;     // 내면의 욕구 (모음 합)
    personality: number;  // 성격수 (자음 합)
}

function calcNumerology(name: string): NumerologyResult {
    const letters = name.toUpperCase().replace(/[^A-Z]/g, '').split('');
    let expSum = 0, soulSum = 0, persSum = 0;
    for (const l of letters) {
        const val = PYTHAGOREAN[l] || 0;
        expSum += val;
        if (VOWELS.has(l)) soulSum += val;
        else persSum += val;
    }
    return {
        expression: reduceToPrimary(expSum),
        soulUrge: reduceToPrimary(soulSum),
        personality: reduceToPrimary(persSum),
    };
}

const NUMBER_MEANINGS: Record<number, { title: string; desc: string; color: string }> = {
    1: { title: 'Leader', desc: 'Independent, ambitious, original — a born pioneer.', color: 'text-red-400' },
    2: { title: 'Diplomat', desc: 'Cooperative, sensitive, peacemaker — thrives in partnership.', color: 'text-pink-400' },
    3: { title: 'Creative', desc: 'Expressive, joyful, artistic — a natural communicator.', color: 'text-yellow-400' },
    4: { title: 'Builder', desc: 'Practical, disciplined, reliable — creates lasting foundations.', color: 'text-green-400' },
    5: { title: 'Freedom', desc: 'Adventurous, versatile, curious — seeks change and variety.', color: 'text-cyan-400' },
    6: { title: 'Nurturer', desc: 'Caring, responsible, home-loving — protects and guides others.', color: 'text-blue-400' },
    7: { title: 'Seeker', desc: 'Analytical, introspective, spiritual — pursues hidden truths.', color: 'text-indigo-400' },
    8: { title: 'Executive', desc: 'Powerful, goal-oriented, material success — born for authority.', color: 'text-amber-400' },
    9: { title: 'Humanitarian', desc: 'Compassionate, idealistic, global — serves the greater good.', color: 'text-purple-400' },
    11: { title: 'Intuitive', desc: 'Master Intuitive — highly spiritual, inspirational visionary.', color: 'text-violet-300' },
    22: { title: 'Master Builder', desc: 'Master Builder — turns grand dreams into tangible reality.', color: 'text-emerald-300' },
    33: { title: 'Master Teacher', desc: 'Master Teacher — embodies compassion, healing, and wisdom.', color: 'text-rose-300' },
};

// ════════════════════════════════════════════
//  🎛️ 메인 컴포넌트
// ════════════════════════════════════════════
export default function SeongmyeongForm() {
    const locale = useLocale();
    const router = useRouter();
    const isKo = locale === 'ko';

    // ── 공통 상태 ──
    const [step, setStep] = useState(0);
    const [birth, setBirth] = useState<BirthData | null>(null);

    // ── 한국어 전용 상태 ──
    const [familyName, setFamilyName] = useState('');
    const [givenName, setGivenName] = useState('');
    const [familyHanja, setFamilyHanja] = useState('');
    const [familyStrokes, setFamilyStrokes] = useState('');
    const [givenHanjaChars, setGivenHanjaChars] = useState<string[]>([]);
    const [givenStrokesChars, setGivenStrokesChars] = useState<string[]>([]);
    const [wantsRename, setWantsRename] = useState<boolean | null>(null);
    const [boostOhaeng, setBoostOhaeng] = useState<string[]>([]);
    const [imageGoal, setImageGoal] = useState<string[]>([]);

    // ── 영어 전용 상태 ──
    const [birthFullName, setBirthFullName] = useState('');   // 출생 이름 (분석의 핵심)
    const [currentName, setCurrentName] = useState('');       // 현재 이름 (사회적 에너지)

    // ── 스텝 설정 ──
    // 한국어: 0=이름 1=한자·획수 2=생년월일 3=개명희망
    // 영어:   0=이름 입력     1=생년월일    2=결과 미리보기
    const TOTAL_STEPS = isKo ? 4 : 3;

    const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
    const goPrev = () => setStep((s) => Math.max(s - 1, 0));

    // ── 이름 글자 수에 맞춰 한자 배열 동기화 ──
    const handleGivenNameChange = (v: string) => {
        setGivenName(v);
        const len = v.length;
        setGivenHanjaChars(prev => {
            const arr = [...prev];
            while (arr.length < len) arr.push('');
            return arr.slice(0, len);
        });
        setGivenStrokesChars(prev => {
            const arr = [...prev];
            while (arr.length < len) arr.push('');
            return arr.slice(0, len);
        });
    };

    // ── 소리오행 미리보기 (한국어) ──
    const fullNameKo = familyName + givenName;
    const soundPreview = useMemo(() =>
        fullNameKo ? fullNameKo.split('').map(char => ({ char, info: getSoundOhaeng(char) })) : [],
        [fullNameKo]
    );

    // ── 수비학 실시간 계산 (영어) ──
    const birthNumerology = useMemo(() =>
        birthFullName.trim() ? calcNumerology(birthFullName) : null,
        [birthFullName]
    );
    const currentNumerology = useMemo(() =>
        currentName.trim() ? calcNumerology(currentName) : null,
        [currentName]
    );
    const lifePath = useMemo(() =>
        birth ? calcLifePath(birth.year, birth.month, birth.day) : null,
        [birth]
    );

    // ── 제출 ──
    const handleSubmit = () => {
        if (!birth) return;
        let data: object;
        if (isKo) {
            if (!familyName || !givenName) return;
            data = {
                type: 'seongmyeong',
                locale: 'ko',
                familyName,
                givenName,
                name: fullNameKo,
                familyHanja: familyHanja || null,
                familyStrokes: familyStrokes ? Number(familyStrokes) : null,
                givenHanjaChars,
                givenStrokesChars: givenStrokesChars.map(Number).filter(Boolean),
                year: birth.year, month: birth.month, day: birth.day,
                lunar: birth.isLunar, leapMonth: birth.isLeapMonth,
                wantsRename: wantsRename ?? false,
                ...(wantsRename && { boostOhaeng, imageGoal }),
                hasPhoto: false,
            };
        } else {
            if (!birthFullName.trim()) return;
            data = {
                type: 'seongmyeong',
                locale: 'en',
                birthFullName: birthFullName.trim(),
                currentName: currentName.trim() || null,
                year: birth.year, month: birth.month, day: birth.day,
                lifePath,
                expressionNumber: birthNumerology?.expression,
                soulUrge: birthNumerology?.soulUrge,
                personalityNumber: birthNumerology?.personality,
                currentExpression: currentNumerology?.expression || null,
                hasPhoto: false,
            };
        }
        const token = storeResultPayload('seongmyeong', data);
        router.push(buildLocalizedHref(locale, `/seongmyeong-result/${token}`));
    };

    // ── 스텝 레이블 ──
    const stepLabels = isKo
        ? ['이름 입력', '한자·획수', '생년월일', '개명 희망']
        : ['Your Name', 'Birth Date', 'Preview'];

    // ── 유효성 ──
    const step0ValidKo = familyName.trim().length > 0 && givenName.trim().length > 0;
    const step0ValidEn = birthFullName.trim().length > 1;
    const canSubmit = !!birth && (isKo ? (familyName.trim().length > 0) : birthFullName.trim().length > 0);

    // ══════════════════════════════════════════
    return (
        <div>
            {/* 개인정보 안내 */}
            <div className="mb-6 bg-green-900/20 border border-green-700/30 rounded-lg px-4 py-3">
                <p className="text-green-300/80 text-sm text-center">
                    {isKo
                        ? '🔒 입력하신 정보는 서버에 저장되지 않습니다'
                        : '🔒 Your information is never stored on our servers'}
                </p>
            </div>

            {/* 진행 상태바 */}
            <div className="mb-8">
                <div className="flex items-center justify-center gap-1 mb-3">
                    {Array.from({ length: TOTAL_STEPS }, (_, i) => {
                        const isDone = step > i;
                        const isActive = step === i;
                        return (
                            <div key={i} className="flex items-center">
                                <div className={`progress-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}>
                                    {isDone ? '✓' : i + 1}
                                </div>
                                {i < TOTAL_STEPS - 1 && (
                                    <div className={`h-px w-8 mx-1 ${step > i ? 'bg-green-500' : 'bg-yellow-900/40'}`} />
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-center gap-4 text-xs text-yellow-200/50 flex-wrap">
                    {stepLabels.map((label, i) => (
                        <span key={label} className={step === i ? 'text-green-400 font-bold' : ''}>
                            {step > i ? '●' : step === i ? '●' : '○'} {label}
                        </span>
                    ))}
                </div>
            </div>

            <div className="min-h-[380px]">

                {/* ════════════ 한국어 플로우 ════════════ */}
                {isKo && (
                    <>
                        {/* KO Step 0: 이름 입력 */}
                        {step === 0 && (
                            <div className="fade-in space-y-5">
                                <div className="text-center">
                                    <span className="inline-block bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">필수 ●</span>
                                    <h2 className="text-2xl font-bold text-yellow-100">이름을 입력해 주세요</h2>
                                    <p className="text-yellow-300/70 text-sm mt-1">성씨와 이름을 구분하면 더 정확한 분석이 가능합니다</p>
                                </div>

                                <div>
                                    <label className="block text-yellow-200/80 text-sm mb-2">성씨 (한 글자)</label>
                                    <input id="ko-family-name" type="text" className="input-dark" placeholder="예) 김, 이, 박, 최…"
                                        value={familyName} maxLength={2} onChange={(e) => setFamilyName(e.target.value)} autoFocus />
                                </div>
                                <div>
                                    <label className="block text-yellow-200/80 text-sm mb-2">이름 (1~3글자)</label>
                                    <input id="ko-given-name" type="text" className="input-dark" placeholder="예) 민준, 서연, 지호…"
                                        value={givenName} maxLength={3} onChange={(e) => handleGivenNameChange(e.target.value)} />
                                </div>

                                {/* 소리오행 실시간 미리보기 */}
                                {soundPreview.length > 0 && (
                                    <div className="bg-yellow-900/10 border border-yellow-700/20 rounded-xl p-4">
                                        <p className="text-yellow-200/60 text-xs mb-3 text-center">✨ 소리오행 미리보기 (초성 기준)</p>
                                        <div className="flex justify-center gap-4 flex-wrap">
                                            {soundPreview.map(({ char, info }, idx) => (
                                                <div key={idx} className="flex flex-col items-center gap-1">
                                                    <span className="text-yellow-100 font-bold text-2xl">{char}</span>
                                                    {info
                                                        ? <span className={`text-xs font-medium ${info.color}`}>{info.ohaeng}</span>
                                                        : <span className="text-yellow-200/30 text-xs">-</span>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <button className="btn-primary w-full" disabled={!step0ValidKo} onClick={goNext}>
                                    다음 단계 →
                                </button>
                            </div>
                        )}

                        {/* KO Step 1: 한자·획수 */}
                        {step === 1 && (
                            <div className="fade-in space-y-5">
                                <div className="text-center">
                                    <span className="inline-block bg-yellow-900/60 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-yellow-600/30">
                                        선택 ○ (정확도 향상)
                                    </span>
                                    <h2 className="text-2xl font-bold text-yellow-100">한자와 획수를 입력해 주세요</h2>
                                    <p className="text-yellow-300/70 text-sm mt-1">모르시면 건너뛰어도 됩니다 (한글 기준으로 분석)</p>
                                </div>

                                {/* 성씨 한자 */}
                                <div className="bg-white/5 border border-yellow-700/20 rounded-xl p-4 space-y-3">
                                    <p className="text-yellow-300 font-bold text-sm">성씨 「{familyName}」</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-yellow-200/60 text-xs mb-1">한자</label>
                                            <input id="ko-family-hanja" type="text" className="input-dark text-center text-xl"
                                                placeholder="例) 金" value={familyHanja} maxLength={2}
                                                onChange={(e) => setFamilyHanja(e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-yellow-200/60 text-xs mb-1">획수</label>
                                            <input id="ko-family-strokes" type="number" min="1" max="64" className="input-dark text-center"
                                                placeholder="예) 8" value={familyStrokes}
                                                onChange={(e) => setFamilyStrokes(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                {/* 이름 글자별 한자 */}
                                {givenName.split('').map((char, idx) => (
                                    <div key={idx} className="bg-white/5 border border-yellow-700/20 rounded-xl p-4 space-y-3">
                                        <p className="text-yellow-300 font-bold text-sm">이름 {idx + 1}글자 「{char}」</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-yellow-200/60 text-xs mb-1">한자</label>
                                                <input id={`ko-given-hanja-${idx}`} type="text" className="input-dark text-center text-xl"
                                                    placeholder="例) 民" maxLength={1} value={givenHanjaChars[idx] || ''}
                                                    onChange={(e) => {
                                                        const arr = [...givenHanjaChars]; arr[idx] = e.target.value; setGivenHanjaChars(arr);
                                                    }} />
                                            </div>
                                            <div>
                                                <label className="block text-yellow-200/60 text-xs mb-1">획수</label>
                                                <input id={`ko-given-strokes-${idx}`} type="number" min="1" max="64"
                                                    className="input-dark text-center" placeholder="예) 5"
                                                    value={givenStrokesChars[idx] || ''}
                                                    onChange={(e) => {
                                                        const arr = [...givenStrokesChars]; arr[idx] = e.target.value; setGivenStrokesChars(arr);
                                                    }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg px-4 py-3">
                                    <p className="text-amber-300/80 text-xs text-center">
                                        💡 획수는 옥편 기준 원획(原劃)을 사용하세요. 네이버 한자사전에서 확인 가능합니다.
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <button className="btn-secondary flex-1" onClick={goPrev}>← 이전</button>
                                    <button className="btn-primary flex-1" onClick={goNext}>다음 →</button>
                                </div>
                            </div>
                        )}

                        {/* KO Step 2: 생년월일 */}
                        {step === 2 && (
                            <div className="fade-in">
                                <div className="text-center mb-4">
                                    <span className="inline-block bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">필수 ●</span>
                                    <p className="text-yellow-300/70 text-sm">
                                        사주와 이름의 오행 조화를 분석하기 위해 생년월일이 필요합니다
                                    </p>
                                </div>
                                <Step2Birth value={birth} onChange={setBirth} onNext={goNext} onPrev={goPrev} />
                            </div>
                        )}

                        {/* KO Step 3: 개명 희망 여부 */}
                        {step === 3 && (
                            <div className="fade-in space-y-5">
                                <div className="text-center">
                                    <span className="inline-block bg-yellow-900/60 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-yellow-600/30">선택 ○</span>
                                    <h2 className="text-2xl font-bold text-yellow-100">개명을 희망하시나요?</h2>
                                    <p className="text-yellow-300/70 text-sm mt-1">선택하지 않아도 현재 이름 분석이 진행됩니다</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button id="rename-no" type="button"
                                        onClick={() => { setWantsRename(false); setBoostOhaeng([]); setImageGoal([]); }}
                                        className={`py-6 rounded-xl border-2 font-bold transition-all text-center ${wantsRename === false
                                            ? 'border-yellow-500 bg-yellow-900/40 text-yellow-300'
                                            : 'border-yellow-700/30 bg-white/5 text-yellow-200/60 hover:border-yellow-600/50'
                                            }`}>
                                        <div className="text-3xl mb-2">✅</div>
                                        <span className="text-sm">현재 이름<br />분석만 원해요</span>
                                    </button>
                                    <button id="rename-yes" type="button"
                                        onClick={() => setWantsRename(true)}
                                        className={`py-6 rounded-xl border-2 font-bold transition-all text-center ${wantsRename === true
                                            ? 'border-green-500 bg-green-900/40 text-green-300'
                                            : 'border-yellow-700/30 bg-white/5 text-yellow-200/60 hover:border-green-600/50'
                                            }`}>
                                        <div className="text-3xl mb-2">✏️</div>
                                        <span className="text-sm">개명도<br />고려 중이에요</span>
                                    </button>
                                </div>

                                {/* 개명 희망 시 추가 선택 */}
                                {wantsRename === true && (
                                    <div className="space-y-5 fade-in">
                                        <div>
                                            <p className="text-yellow-200 font-bold text-sm mb-3">🔮 보완하고 싶은 오행 (복수 선택)</p>
                                            <div className="space-y-2">
                                                {OHAENG_BOOST.map((o) => (
                                                    <button key={o.key} type="button"
                                                        onClick={() => setBoostOhaeng(prev => prev.includes(o.key) ? prev.filter(x => x !== o.key) : [...prev, o.key])}
                                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${boostOhaeng.includes(o.key) ? `${o.color} border-current` : 'border-yellow-700/30 bg-white/5 text-yellow-200/60 hover:border-yellow-600/50'
                                                            }`}>
                                                        <span className="text-xl">{o.icon}</span>
                                                        <span className="text-sm">{o.label}</span>
                                                        {boostOhaeng.includes(o.key) && <span className="ml-auto">✓</span>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-yellow-200 font-bold text-sm mb-3">🌟 추구하는 이미지 (복수 선택)</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {IMAGE_GOALS.map((g) => (
                                                    <button key={g.key} type="button"
                                                        onClick={() => setImageGoal(prev => prev.includes(g.key) ? prev.filter(x => x !== g.key) : [...prev, g.key])}
                                                        className={`flex items-center gap-2 px-3 py-3 rounded-xl border-2 text-sm text-left transition-all ${imageGoal.includes(g.key) ? 'border-green-500 bg-green-900/30 text-green-300' : 'border-yellow-700/30 bg-white/5 text-yellow-200/60 hover:border-yellow-600/50'
                                                            }`}>
                                                        <span>{g.icon}</span>
                                                        <span>{g.labelKo}</span>
                                                        {imageGoal.includes(g.key) && <span className="ml-auto text-xs">✓</span>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <button className="btn-secondary flex-1" onClick={goPrev}>← 이전</button>
                                    <button className="btn-primary flex-1" onClick={handleSubmit} disabled={!canSubmit}>
                                        ✍️ 성명학 분석 시작
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* ════════════ 영어 플로우 (서양 수비학) ════════════ */}
                {!isKo && (
                    <>
                        {/* EN Step 0: 이름 입력 */}
                        {step === 0 && (
                            <div className="fade-in space-y-5">
                                <div className="text-center">
                                    <span className="inline-block bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">Required ●</span>
                                    <h2 className="text-2xl font-bold text-yellow-100">Enter Your Name</h2>
                                    <p className="text-yellow-300/70 text-sm mt-1">
                                        Western Numerology uses the <strong className="text-yellow-300">full birth name</strong> as its primary source
                                    </p>
                                </div>

                                {/* 출생 이름 */}
                                <div>
                                    <label className="block text-yellow-200/80 text-sm mb-1">
                                        Full Name at Birth <span className="text-yellow-500 text-xs">(include middle name)</span>
                                    </label>
                                    <input id="en-birth-full-name" type="text" className="input-dark"
                                        placeholder="e.g. John Michael Smith"
                                        value={birthFullName} onChange={(e) => setBirthFullName(e.target.value)} autoFocus />
                                    <p className="text-yellow-200/40 text-xs mt-1">
                                        This is the name on your birth certificate. Most important for analysis.
                                    </p>
                                </div>

                                {/* 현재 이름 (옵션) */}
                                <div>
                                    <label className="block text-yellow-200/80 text-sm mb-1">
                                        Current Name <span className="text-yellow-200/50 text-xs">(optional — if different from birth name)</span>
                                    </label>
                                    <input id="en-current-name" type="text" className="input-dark"
                                        placeholder="e.g. John Smith (if you dropped middle name)"
                                        value={currentName} onChange={(e) => setCurrentName(e.target.value)} />
                                </div>

                                {/* 실시간 수비학 미리보기 */}
                                {birthNumerology && (
                                    <div className="bg-yellow-900/10 border border-yellow-700/20 rounded-xl p-4">
                                        <p className="text-yellow-200/60 text-xs mb-3 text-center">✨ Live Numerology Preview</p>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { label: 'Expression', val: birthNumerology.expression, icon: '⭐' },
                                                { label: 'Soul Urge', val: birthNumerology.soulUrge, icon: '💜' },
                                                { label: 'Personality', val: birthNumerology.personality, icon: '🎭' },
                                            ].map(({ label, val, icon }) => {
                                                const m = NUMBER_MEANINGS[val];
                                                return (
                                                    <div key={label} className="text-center">
                                                        <div className="text-lg">{icon}</div>
                                                        <div className={`text-2xl font-bold ${m?.color ?? 'text-yellow-400'}`}>{val}</div>
                                                        <div className="text-yellow-200/50 text-xs">{label}</div>
                                                        {m && <div className={`text-xs font-medium mt-0.5 ${m.color}`}>{m.title}</div>}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                <button className="btn-primary w-full" disabled={!step0ValidEn} onClick={goNext}>
                                    Next →
                                </button>
                            </div>
                        )}

                        {/* EN Step 1: 생년월일 */}
                        {step === 1 && (
                            <div className="fade-in">
                                <div className="text-center mb-4">
                                    <span className="inline-block bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">Required ●</span>
                                    <p className="text-yellow-300/70 text-sm">
                                        Your birth date determines your <strong className="text-yellow-300">Life Path Number</strong> — the most important number in Numerology
                                    </p>
                                </div>
                                <Step2Birth value={birth} onChange={setBirth} onNext={goNext} onPrev={goPrev} />
                            </div>
                        )}

                        {/* EN Step 2: 결과 미리보기 + 분석 시작 */}
                        {step === 2 && (
                            <div className="fade-in space-y-5">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-yellow-100">Your Numerology Profile</h2>
                                    <p className="text-yellow-300/70 text-sm mt-1">Review your numbers before starting the full analysis</p>
                                </div>

                                {/* Life Path */}
                                {lifePath && (
                                    <div className="rounded-xl border border-yellow-600/30 bg-yellow-900/20 p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <div className={`text-4xl font-bold ${NUMBER_MEANINGS[lifePath]?.color ?? 'text-yellow-400'}`}>
                                                    {lifePath}
                                                </div>
                                                <div className="text-yellow-200/50 text-xs mt-1">Life Path</div>
                                            </div>
                                            <div>
                                                <p className={`font-bold ${NUMBER_MEANINGS[lifePath]?.color ?? 'text-yellow-300'}`}>
                                                    {NUMBER_MEANINGS[lifePath]?.title ?? 'Unique'}
                                                </p>
                                                <p className="text-yellow-200/70 text-xs leading-relaxed mt-1">
                                                    {NUMBER_MEANINGS[lifePath]?.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 이름 수비 요약 */}
                                {birthNumerology && (
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { label: 'Expression\n(Destiny)', val: birthNumerology.expression, desc: 'Your life purpose & talents' },
                                            { label: 'Soul Urge\n(Heart)', val: birthNumerology.soulUrge, desc: 'Your inner desires' },
                                            { label: 'Personality\n(Outer)', val: birthNumerology.personality, desc: 'How others see you' },
                                        ].map(({ label, val, desc }) => {
                                            const m = NUMBER_MEANINGS[val];
                                            return (
                                                <div key={label} className="rounded-xl border border-yellow-700/30 bg-white/5 p-3 text-center">
                                                    <div className={`text-2xl font-bold ${m?.color ?? 'text-yellow-400'}`}>{val}</div>
                                                    <div className="text-yellow-200/70 text-xs whitespace-pre-line mt-1">{label}</div>
                                                    <div className="text-yellow-200/40 text-xs mt-1">{desc}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* 현재 이름 수비 (옵션) */}
                                {currentNumerology && (
                                    <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4">
                                        <p className="text-blue-300 font-bold text-sm mb-2">Current Name · Social Energy</p>
                                        <p className="text-yellow-200/60 text-xs">
                                            Expression Number: <span className={`font-bold text-lg ${NUMBER_MEANINGS[currentNumerology.expression]?.color}`}>{currentNumerology.expression}</span>
                                            &nbsp;—&nbsp;{NUMBER_MEANINGS[currentNumerology.expression]?.title}
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <button className="btn-secondary flex-1" onClick={goPrev}>← Back</button>
                                    <button className="btn-primary flex-1" onClick={handleSubmit} disabled={!canSubmit}>
                                        ✍️ Start Name Analysis
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
