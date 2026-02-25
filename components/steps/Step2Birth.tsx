'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';

export interface BirthData {
  year: number;
  month: number;
  day: number;
  isLunar: boolean;
  isLeapMonth: boolean; // 음력 윤달 여부
}

interface Props {
  value: BirthData | null;
  onChange: (v: BirthData) => void;
  onNext: () => void;
  onPrev: () => void;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

// 음력 타입: 'solar' | 'lunar' | 'lunar-leap'
type CalendarType = 'solar' | 'lunar' | 'lunar-leap';

export default function Step2Birth({ value, onChange, onNext, onPrev }: Props) {
  const t = useTranslations('steps');
  const locale = useLocale();
  const isKo = locale === 'ko';

  const initCalType = (): CalendarType => {
    if (!value?.isLunar) return 'solar';
    if (value?.isLeapMonth) return 'lunar-leap';
    return 'lunar';
  };

  const [calType, setCalType] = useState<CalendarType>(initCalType());
  const [year, setYear] = useState(value?.year ?? 1990);
  const [month, setMonth] = useState(value?.month ?? 1);
  const [day, setDay] = useState(value?.day ?? 1);
  const [touched, setTouched] = useState(false);

  const maxDay = getDaysInMonth(year, month);
  const days = Array.from({ length: maxDay }, (_, i) => i + 1);

  const isValid = year > 0 && month > 0 && day > 0;
  const hasError = touched && !isValid;

  const handleNext = () => {
    setTouched(true);
    if (isValid) {
      onChange({
        year,
        month,
        day: Math.min(day, maxDay),
        isLunar: isKo ? calType !== 'solar' : false,
        isLeapMonth: isKo ? calType === 'lunar-leap' : false,
      });
      onNext();
    }
  };

  const calendarOptions: { type: CalendarType; labelKo: string; labelEn: string }[] = [
    { type: 'solar', labelKo: '양력', labelEn: 'Solar' },
    { type: 'lunar', labelKo: '음력 (평달)', labelEn: 'Lunar' },
    { type: 'lunar-leap', labelKo: '음력 (윤달)', labelEn: 'Lunar Leap' },
  ];

  return (
    <div className="fade-in space-y-6">
      <div className="text-center">
        <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
          {t('step2.required')} ●
        </span>
        <h2 className="text-2xl font-bold text-yellow-100">{t('step2.title')}</h2>
      </div>

      {/* 양력/음력(평달)/음력(윤달) 토글 — 한국어만 표시 */}
      {isKo && (
        <div className="flex gap-2 justify-center flex-wrap">
          {calendarOptions.map((opt) => (
            <button
              key={opt.type}
              type="button"
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${calType === opt.type
                  ? 'bg-yellow-500 text-black shadow-md shadow-yellow-900/30'
                  : 'bg-transparent border border-yellow-600/40 text-yellow-300 hover:border-yellow-500/70 hover:text-yellow-200'
                }`}
              onClick={() => setCalType(opt.type)}
            >
              {opt.labelKo}
            </button>
          ))}
        </div>
      )}

      {/* 영어권 안내: 양력만 지원 */}
      {!isKo && (
        <p className="text-center text-yellow-200/60 text-sm">
          {t('step2.gregorianNote')}
        </p>
      )}

      {/* 음력 선택 시 안내 문구 */}
      {isKo && calType !== 'solar' && (
        <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg px-4 py-2 text-center">
          <p className="text-amber-300/80 text-xs">
            {calType === 'lunar-leap'
              ? '🌕 음력 윤달로 입력합니다. 윤달은 특정 해에만 존재합니다.'
              : '🌙 음력 평달로 입력합니다.'}
          </p>
        </div>
      )}

      {/* 날짜 선택 (연/월/일) */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-yellow-200/70 text-xs mb-1 text-center">{t('step2.year')}</label>
          <select
            className="input-dark text-center appearance-none"
            value={year}
            onChange={(e) => {
              setYear(Number(e.target.value));
              setDay(Math.min(day, getDaysInMonth(Number(e.target.value), month)));
            }}
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-yellow-200/70 text-xs mb-1 text-center">{t('step2.month')}</label>
          <select
            className="input-dark text-center appearance-none"
            value={month}
            onChange={(e) => {
              setMonth(Number(e.target.value));
              setDay(Math.min(day, getDaysInMonth(year, Number(e.target.value))));
            }}
          >
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-yellow-200/70 text-xs mb-1 text-center">{t('step2.day')}</label>
          <select
            className="input-dark text-center appearance-none"
            value={Math.min(day, maxDay)}
            onChange={(e) => setDay(Number(e.target.value))}
          >
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {hasError && (
        <p className="text-red-400 text-sm text-center">{t('step2.error')}</p>
      )}

      <div className="flex gap-3">
        <button className="btn-secondary flex-1" onClick={onPrev}>
          {t('prevStep')}
        </button>
        <button className="btn-primary flex-1" onClick={handleNext}>
          {t('nextStep')}
        </button>
      </div>
    </div>
  );
}
