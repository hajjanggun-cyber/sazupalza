'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}

export default function Step1Name({ value, onChange, onNext }: Props) {
  const t = useTranslations('steps.step1');
  const [touched, setTouched] = useState(false);
  const hasError = touched && !value.trim();

  const handleNext = () => {
    setTouched(true);
    if (value.trim()) onNext();
  };

  return (
    <div className="fade-in space-y-6">
      <div className="text-center">
        <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
          {t('required')} ●
        </span>
        <h2 className="text-2xl font-bold text-yellow-100">{t('title')}</h2>
      </div>

      <div>
        <label className="block text-yellow-200/80 text-sm mb-2">{t('label')}</label>
        <input
          type="text"
          className={`input-dark ${hasError ? 'error' : ''}`}
          placeholder={t('placeholder')}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleNext()}
          autoFocus
          autoComplete="name"
          maxLength={20}
        />
        {hasError && (
          <p className="mt-2 text-red-400 text-sm">{t('error')}</p>
        )}
      </div>

      <button
        className="btn-primary"
        onClick={handleNext}
        disabled={!value.trim() && touched}
      >
        다음 단계 →
      </button>
    </div>
  );
}
