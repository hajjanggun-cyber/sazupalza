'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

const MBTI_LIST = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

interface Props {
  value: string | null;
  onChange: (v: string | null) => void;
  onNext: () => void;
  onSkip: () => void;
  onPrev: () => void;
}

export default function Step3MBTI({ value, onChange, onNext, onSkip, onPrev }: Props) {
  const t = useTranslations('steps.step3');

  return (
    <div className="fade-in space-y-6">
      <div className="text-center">
        <span className="inline-block bg-yellow-900/60 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-yellow-600/30">
          {t('optional')} ○
        </span>
        <h2 className="text-2xl font-bold text-yellow-100">{t('title')}</h2>
      </div>

      {/* MBTI 4x4 그리드 */}
      <div className="mbti-grid">
        {MBTI_LIST.map((mbti) => (
          <button
            key={mbti}
            className={`mbti-btn ${value === mbti ? 'selected' : ''}`}
            onClick={() => onChange(value === mbti ? null : mbti)}
          >
            {mbti}
          </button>
        ))}
      </div>

      {value && (
        <div className="text-center">
          <span className="text-yellow-400 text-sm font-medium">
            선택됨: {value}
          </span>
        </div>
      )}

      {/* 건너뛰기 버튼 */}
      <button
        className="w-full py-4 text-yellow-300/70 hover:text-yellow-300 text-sm border border-dashed border-yellow-700/40 rounded-lg transition-colors"
        onClick={onSkip}
      >
        {t('skip')}
      </button>

      <div className="flex gap-3">
        <button className="btn-secondary flex-1" onClick={onPrev}>
          ← 이전
        </button>
        <button
          className="btn-primary flex-1"
          onClick={onNext}
          disabled={!value}
        >
          다음 단계 →
        </button>
      </div>
    </div>
  );
}
