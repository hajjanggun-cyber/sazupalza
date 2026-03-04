'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { storeResultPayload } from '@/lib/client/result-storage';
import { buildLocalizedHref } from '@/lib/seo';
import Step1Name from './steps/Step1Name';
import Step2Birth, { BirthData } from './steps/Step2Birth';

// TIME_LIST (12지신 시각)
const TIME_LIST = [
    { key: 'ja', label: '자시', hour: 23, range: '23:00~01:00', hanja: '子時', en: 'Rat' },
    { key: 'chuk', label: '축시', hour: 1, range: '01:00~03:00', hanja: '丑時', en: 'Ox' },
    { key: 'in', label: '인시', hour: 3, range: '03:00~05:00', hanja: '寅時', en: 'Tiger' },
    { key: 'myo', label: '묘시', hour: 5, range: '05:00~07:00', hanja: '卯時', en: 'Rabbit' },
    { key: 'jin', label: '진시', hour: 7, range: '07:00~09:00', hanja: '辰時', en: 'Dragon' },
    { key: 'sa', label: '사시', hour: 9, range: '09:00~11:00', hanja: '巳時', en: 'Snake' },
    { key: 'o', label: '오시', hour: 11, range: '11:00~13:00', hanja: '午時', en: 'Horse' },
    { key: 'mi', label: '미시', hour: 13, range: '13:00~15:00', hanja: '未時', en: 'Goat' },
    { key: 'sin', label: '신시', hour: 15, range: '15:00~17:00', hanja: '申時', en: 'Monkey' },
    { key: 'yu', label: '유시', hour: 17, range: '17:00~19:00', hanja: '酉時', en: 'Rooster' },
    { key: 'sul', label: '술시', hour: 19, range: '19:00~21:00', hanja: '戌時', en: 'Dog' },
    { key: 'hae', label: '해시', hour: 21, range: '21:00~23:00', hanja: '亥時', en: 'Pig' },
];

// 총 스텝: 0(성별) → 1(이름) → 2(생년월일) → 3(생시)
const TOTAL_STEPS = 4;

type Gender = 'male' | 'female';

export default function SajuForm() {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations();
    const isKo = locale === 'ko';

    // 스텝: 0=성별, 1=이름, 2=생년월일, 3=생시
    const [step, setStep] = useState(0);
    const [gender, setGender] = useState<Gender | null>(null);
    const [name, setName] = useState('');
    const [birth, setBirth] = useState<BirthData | null>(null);
    const [birthHour, setBirthHour] = useState<number | null>(null);
    const [dontKnowTime, setDontKnowTime] = useState(false);

    const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
    const goPrev = () => setStep((s) => Math.max(s - 1, 0));

    const handleSubmit = () => {
        if (!gender || !name || !birth) return;
        const data = {
            gender,
            name,
            year: birth.year,
            month: birth.month,
            day: birth.day,
            lunar: birth.isLunar,
            leapMonth: birth.isLeapMonth,
            ...(birthHour !== null && !dontKnowTime && { hour: birthHour }),
            hasPhoto: false,
        };
        const token = storeResultPayload('saju', data);
        router.push(buildLocalizedHref(locale, `/saju-result/${token}`));
    };

    // 진행 상태바 레이블 (총 4스텝)
    const stepLabels = isKo
        ? ['성별', '이름', '생년월일', '태어난 시']
        : ['Gender', 'Name', 'Birth Date', 'Birth Hour'];

    return (
        <div>
            {/* 개인정보 안내 */}
            <div className="mb-6 bg-green-900/20 border border-green-700/30 rounded-lg px-4 py-3">
                <p className="text-green-300/80 text-sm text-center">
                    {t('privacy.formTop')}
                </p>
            </div>

            {/* 4단계 진행 상태바 */}
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
                                    <div className={`h-px w-8 mx-1 ${step > i ? 'bg-yellow-500' : 'bg-yellow-900/40'}`} />
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-center gap-4 text-xs text-yellow-200/50 flex-wrap">
                    {stepLabels.map((label, i) => (
                        <span key={label} className={step === i ? 'text-yellow-400 font-bold' : ''}>
                            {step > i ? '●' : step === i ? '●' : '○'} {label}
                        </span>
                    ))}
                </div>
            </div>

            {/* 스텝 컴포넌트 */}
            <div className="min-h-[360px]">

                {/* ── Step 0: 성별 선택 ── */}
                {step === 0 && (
                    <div className="fade-in space-y-6">
                        <div className="text-center">
                            <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
                                {isKo ? '필수 ●' : 'Required ●'}
                            </span>
                            <h2 className="text-2xl font-bold text-yellow-100">
                                {isKo ? '성별을 선택해 주세요' : 'Select Your Gender'}
                            </h2>
                            <p className="text-yellow-300/70 text-sm mt-2">
                                {isKo
                                    ? '성별에 따라 대운(大運)의 흐름이 달라집니다'
                                    : 'Grand Luck Cycles differ depending on your gender'}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* 남성 */}
                            <button
                                type="button"
                                id="gender-male"
                                onClick={() => setGender('male')}
                                className={`flex flex-col items-center gap-3 py-8 rounded-2xl border-2 transition-all duration-200 ${gender === 'male'
                                    ? 'border-blue-400 bg-blue-900/40 shadow-lg shadow-blue-900/30 scale-[1.02]'
                                    : 'border-yellow-700/30 bg-white/5 hover:border-blue-500/50 hover:bg-blue-900/20'
                                    }`}
                            >
                                <span className="text-5xl">♂</span>
                                <span className={`font-bold text-lg ${gender === 'male' ? 'text-blue-300' : 'text-yellow-200'}`}>
                                    {isKo ? '남성' : 'Male'}
                                </span>
                                {gender === 'male' && (
                                    <span className="text-blue-400 text-xs">✓ {isKo ? '선택됨' : 'Selected'}</span>
                                )}
                            </button>

                            {/* 여성 */}
                            <button
                                type="button"
                                id="gender-female"
                                onClick={() => setGender('female')}
                                className={`flex flex-col items-center gap-3 py-8 rounded-2xl border-2 transition-all duration-200 ${gender === 'female'
                                    ? 'border-pink-400 bg-pink-900/40 shadow-lg shadow-pink-900/30 scale-[1.02]'
                                    : 'border-yellow-700/30 bg-white/5 hover:border-pink-500/50 hover:bg-pink-900/20'
                                    }`}
                            >
                                <span className="text-5xl">♀</span>
                                <span className={`font-bold text-lg ${gender === 'female' ? 'text-pink-300' : 'text-yellow-200'}`}>
                                    {isKo ? '여성' : 'Female'}
                                </span>
                                {gender === 'female' && (
                                    <span className="text-pink-400 text-xs">✓ {isKo ? '선택됨' : 'Selected'}</span>
                                )}
                            </button>
                        </div>

                        <button
                            className="btn-primary w-full"
                            disabled={!gender}
                            onClick={goNext}
                        >
                            {t('steps.nextStep')}
                        </button>
                    </div>
                )}

                {/* ── Step 1: 이름 ── */}
                {step === 1 && (
                    <div>
                        <Step1Name value={name} onChange={setName} onNext={goNext} />
                        {/* 이전 버튼 추가 */}
                        <button className="btn-secondary w-full mt-3" onClick={goPrev}>
                            {t('steps.prevStep')}
                        </button>
                    </div>
                )}

                {/* ── Step 2: 생년월일 (양력/음력 구분) ── */}
                {step === 2 && (
                    <Step2Birth
                        value={birth}
                        onChange={setBirth}
                        onNext={goNext}
                        onPrev={goPrev}
                    />
                )}

                {/* ── Step 3: 생시 (모르면 체크 후 바로 분석) ── */}
                {step === 3 && (
                    <div className="fade-in space-y-6">
                        <div className="text-center">
                            <span className="inline-block bg-yellow-900/60 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-yellow-600/30">
                                {isKo ? '선택 ○' : 'Optional ○'}
                            </span>
                            <h2 className="text-2xl font-bold text-yellow-100">
                                {isKo ? '태어난 시(時)를 알고 계신가요?' : 'Do you know your birth hour?'}
                            </h2>
                            <p className="text-yellow-300/70 text-sm mt-2">
                                {isKo
                                    ? '생시를 알면 사주팔자 8글자가 완성되어 더 정확한 분석이 가능합니다'
                                    : 'Knowing your birth hour completes your Four Pillars for a more accurate reading'}
                            </p>
                        </div>

                        {/* "모르겠다" 체크박스 */}
                        <label
                            htmlFor="dont-know-time"
                            className="flex items-center gap-3 p-4 rounded-xl border border-yellow-700/30 bg-yellow-900/10 cursor-pointer hover:bg-yellow-900/20 transition-colors"
                        >
                            <input
                                type="checkbox"
                                id="dont-know-time"
                                checked={dontKnowTime}
                                onChange={(e) => {
                                    setDontKnowTime(e.target.checked);
                                    if (e.target.checked) setBirthHour(null);
                                }}
                                className="w-5 h-5 accent-yellow-500 rounded"
                            />
                            <span className="text-yellow-200 text-sm">
                                {isKo
                                    ? '생시를 모르겠어요 — 이 항목을 건너뛸게요'
                                    : "I don't know my birth hour — skip this step"}
                            </span>
                        </label>

                        {/* 12지신 시각 선택 그리드 */}
                        {!dontKnowTime && (
                            <div className="grid grid-cols-2 gap-2">
                                {TIME_LIST.map((time) => (
                                    <button
                                        key={time.key}
                                        type="button"
                                        className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all text-left ${birthHour === time.hour
                                            ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 border-transparent text-black'
                                            : 'bg-white/5 border-yellow-700/30 text-yellow-100 hover:border-yellow-500/60 hover:bg-yellow-900/20'
                                            }`}
                                        onClick={() => setBirthHour(birthHour === time.hour ? null : time.hour)}
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm">
                                                {locale !== 'ko' ? `Hour of ${time.en}` : time.hanja}
                                            </span>
                                            <span className="text-xs opacity-80">
                                                {isKo ? time.label : time.en}
                                            </span>
                                        </div>
                                        <span className="text-[10px] opacity-60 shrink-0">{time.range}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* 이전 / 분석 시작 버튼 */}
                        <div className="flex gap-3">
                            <button className="btn-secondary flex-1" onClick={goPrev}>
                                {t('steps.prevStep')}
                            </button>
                            <button
                                className="btn-primary flex-1"
                                onClick={handleSubmit}
                                disabled={!dontKnowTime && birthHour === null}
                            >
                                🌟 {isKo ? '사주 분석 시작' : 'Start Saju Reading'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
