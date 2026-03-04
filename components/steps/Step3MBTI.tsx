'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

const MBTI_LIST = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

type MbtiConfidence = 'high' | 'medium' | 'low';

interface Props {
  value: string | null;
  onChange: (v: string | null) => void;
  confidence: MbtiConfidence | null;
  onConfidenceChange: (v: MbtiConfidence | null) => void;
  onNext: () => void;
  onSkip: () => void;
  onPrev: () => void;
}

export default function Step3MBTI({
  value,
  onChange,
  confidence,
  onConfidenceChange,
  onNext,
  onSkip,
  onPrev,
}: Props) {
  const t = useTranslations('steps');
  const locale = useLocale();
  const isKo = locale === 'ko';

  return (
    <div className="fade-in space-y-6">
      <div className="text-center">
        <span className="inline-block bg-yellow-900/60 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-yellow-600/30">
          {t('step3.optional')} ○
        </span>
        <h2 className="text-2xl font-bold text-yellow-100">{t('step3.title')}</h2>
      </div>

      {/* MBTI 4x4 그리드 */}
      <div className="mbti-grid">
        {MBTI_LIST.map((mbti) => (
          <button
            key={mbti}
            className={`mbti-btn ${value === mbti ? 'selected' : ''}`}
            onClick={() => {
              const nextValue = value === mbti ? null : mbti;
              onChange(nextValue);
              if (!nextValue) {
                onConfidenceChange(null);
              }
            }}
          >
            {mbti}
          </button>
        ))}
      </div>

      {value && (
        <div className="text-center">
          <span className="text-yellow-400 text-sm font-medium">
            {t('step3.selected')}: {value}
          </span>
        </div>
      )}

      {value && (
        <div className="space-y-3">
          <p className="text-center text-yellow-200/70 text-xs font-medium">
            {isKo
              ? '선택한 MBTI의 확신도도 함께 반영됩니다'
              : 'Confidence in your selected MBTI also affects the score'}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                key: 'high' as const,
                ko: '확신 높음',
                en: 'High',
              },
              {
                key: 'medium' as const,
                ko: '보통',
                en: 'Medium',
              },
              {
                key: 'low' as const,
                ko: '경계선',
                en: 'Borderline',
              },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => onConfidenceChange(item.key)}
                className={`rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${
                  confidence === item.key
                    ? 'border-yellow-400 bg-yellow-500/10 text-yellow-200'
                    : 'border-yellow-700/30 bg-white/5 text-yellow-200/70 hover:border-yellow-500/40'
                }`}
              >
                {isKo ? item.ko : item.en}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 건너뛰기 버튼 */}
      <button
        className="w-full py-4 text-yellow-300/70 hover:text-yellow-300 text-sm border border-dashed border-yellow-700/40 rounded-lg transition-colors"
        onClick={onSkip}
      >
        {t('step3.skip')}
      </button>

      <div className="flex gap-3">
        <button className="btn-secondary flex-1" onClick={onPrev}>
          {t('prevStep')}
        </button>
        <button
          className="btn-primary flex-1"
          onClick={onNext}
          disabled={!value || !confidence}
        >
          {t('nextStep')}
        </button>
      </div>
    </div>
  );
}
