'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Step1Name from './steps/Step1Name';
import Step2Birth, { BirthData } from './steps/Step2Birth';

// TIME_LIST (Step4Time과 동일)
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

const TOTAL_STEPS = 3;

function encodeToBase64Url(data: object): string {
    const jsonStr = JSON.stringify(data);
    const bytes = new TextEncoder().encode(jsonStr);
    const binStr = Array.from(bytes, (b) => String.fromCharCode(b)).join('');
    return btoa(binStr)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

export default function SajuForm() {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations();
    const isKo = locale === 'ko';

    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [birth, setBirth] = useState<BirthData | null>(null);
    const [birthHour, setBirthHour] = useState<number | null>(null);
    const [dontKnowTime, setDontKnowTime] = useState(false);

    const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    const goPrev = () => setStep((s) => Math.max(s - 1, 1));

    const handleSubmit = () => {
        if (!name || !birth) return;
        const data = {
            name,
            year: birth.year,
            month: birth.month,
            day: birth.day,
            lunar: birth.isLunar,
            ...(birthHour !== null && !dontKnowTime && { hour: birthHour }),
            hasPhoto: false,
        };
        const encoded = encodeToBase64Url(data);
        router.push(`/${locale}/result/${encoded}`);
    };

    const stepLabels = isKo
        ? ['이름', '생년월일', '태어난 시']
        : ['Name', 'Birth Date', 'Birth Hour'];

    return (
        <div>
            {/* 개인정보 안내 */}
            <div className="mb-6 bg-green-900/20 border border-green-700/30 rounded-lg px-4 py-3">
                <p className="text-green-300/80 text-sm text-center">
                    {t('privacy.formTop')}
                </p>
            </div>

            {/* 3단계 진행 상태바 */}
            <div className="mb-8">
                <div className="flex items-center justify-center gap-2 mb-3">
                    {Array.from({ length: TOTAL_STEPS }, (_, i) => {
                        const stepNum = i + 1;
                        const isDone = step > stepNum;
                        const isActive = step === stepNum;
                        return (
                            <div key={stepNum} className="flex items-center">
                                <div className={`progress-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}>
                                    {isDone ? '✓' : stepNum}
                                </div>
                                {stepNum < TOTAL_STEPS && (
                                    <div className={`h-px w-10 mx-1 ${step > stepNum ? 'bg-yellow-500' : 'bg-yellow-900/40'}`} />
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-center gap-6 text-xs text-yellow-200/50">
                    {stepLabels.map((label, i) => (
                        <span
                            key={label}
                            className={step === i + 1 ? 'text-yellow-400 font-bold' : ''}
                        >
                            {i < 2 ? '●' : '○'} {label}
                        </span>
                    ))}
                </div>
            </div>

            {/* 스텝 컴포넌트 */}
            <div className="min-h-[360px]">
                {/* Step 1: 이름 */}
                {step === 1 && (
                    <Step1Name value={name} onChange={setName} onNext={goNext} />
                )}

                {/* Step 2: 생년월일 (음력/양력 포함) */}
                {step === 2 && (
                    <Step2Birth
                        value={birth}
                        onChange={setBirth}
                        onNext={goNext}
                        onPrev={goPrev}
                    />
                )}

                {/* Step 3: 생시 (모르면 체크 후 바로 분석) */}
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
                        <label className="flex items-center gap-3 p-4 rounded-xl border border-yellow-700/30 bg-yellow-900/10 cursor-pointer hover:bg-yellow-900/20 transition-colors">
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
                                {isKo ? '생시를 모르겠어요 — 이 항목을 건너뛸게요' : "I don't know my birth hour — skip this step"}
                            </span>
                        </label>

                        {/* 생시 선택 그리드 (모르면 비활성화) */}
                        {!dontKnowTime && (
                            <div className="grid grid-cols-2 gap-2">
                                {TIME_LIST.map((time) => (
                                    <button
                                        key={time.key}
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
