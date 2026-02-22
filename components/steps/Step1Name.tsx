'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}

export default function Step1Name({ value, onChange, onNext }: Props) {
  const t = useTranslations('steps');
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
          {t('step1.required')} ●
        </span>
        <h2 className="text-2xl font-bold text-yellow-100">{t('step1.title')}</h2>
      </div>

      <div>
        <label className="block text-yellow-200/80 text-sm mb-2">{t('step1.label')}</label>
        <input
          type="text"
          className={`input-dark ${hasError ? 'error' : ''}`}
          placeholder={t('step1.placeholder')}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleNext()}
          autoFocus
          autoComplete="name"
          maxLength={20}
        />
        {hasError && (
          <p className="mt-2 text-red-400 text-sm">{t('step1.error')}</p>
        )}
      </div>

      <button
        className="btn-primary"
        onClick={handleNext}
        disabled={!value.trim() && touched}
      >
        {t('nextStep')}
      </button>
    </div>
  );
}
