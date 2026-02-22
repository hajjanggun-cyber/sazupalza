'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';

export interface BirthData {
  year: number;
  month: number;
  day: number;
  isLunar: boolean;
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

export default function Step2Birth({ value, onChange, onNext, onPrev }: Props) {
  const t = useTranslations('steps');
  const locale = useLocale();
  const isKo = locale === 'ko';

  const [isLunar, setIsLunar] = useState(value?.isLunar ?? false);
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
      onChange({ year, month, day: Math.min(day, maxDay), isLunar: isKo ? isLunar : false });
      onNext();
    }
  };

  return (
    <div className="fade-in space-y-6">
      <div className="text-center">
        <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
          {t('step2.required')} ●
        </span>
        <h2 className="text-2xl font-bold text-yellow-100">{t('step2.title')}</h2>
      </div>

      {/* 양력/음력 토글 (한국어만) */}
      {isKo && (
        <div className="flex gap-2 justify-center">
          <button
            className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
              !isLunar ? 'bg-yellow-500 text-black' : 'bg-transparent border border-yellow-600/40 text-yellow-300'
            }`}
            onClick={() => setIsLunar(false)}
          >
            {t('step2.solar')}
          </button>
          <button
            className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
              isLunar ? 'bg-yellow-500 text-black' : 'bg-transparent border border-yellow-600/40 text-yellow-300'
            }`}
            onClick={() => setIsLunar(true)}
          >
            {t('step2.lunar')}
          </button>
        </div>
      )}

      {/* 비한국어 안내 */}
      {!isKo && (
        <p className="text-center text-yellow-200/60 text-sm">
          {t('step2.gregorianNote')}
        </p>
      )}

      {/* 날짜 선택 */}
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
