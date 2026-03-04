'use client';

import { useLocale, useTranslations } from 'next-intl';

const MBTI_LIST = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
];

type MbtiConfidence = 'high' | 'medium' | 'low';

type RecentMbtiResult = {
  mbti: string;
  clarity?: number;
  ts: number;
};

interface Props {
  value: string | null;
  onChange: (v: string | null) => void;
  confidence: MbtiConfidence | null;
  onConfidenceChange: (v: MbtiConfidence | null) => void;
  recentResult: RecentMbtiResult | null;
  onUseRecent: () => void;
  onNext: () => void;
  onSkip: () => void;
  onPrev: () => void;
}

export default function Step3MBTI({
  value,
  onChange,
  confidence,
  onConfidenceChange,
  recentResult,
  onUseRecent,
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
        <span className="mb-3 inline-block rounded-full border border-yellow-600/30 bg-yellow-900/60 px-3 py-1 text-xs font-bold text-yellow-400">
          {t('step3.optional')} *
        </span>
        <h2 className="text-2xl font-bold text-yellow-100">{t('step3.title')}</h2>
      </div>

      {recentResult && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-900/10 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">
                {isKo ? '최근 28문항 결과' : 'Latest 28-question result'}
              </p>
              <p className="mt-1 text-sm text-yellow-100">
                {recentResult.mbti}
                {typeof recentResult.clarity === 'number' &&
                  ` · ${isKo ? `명확도 ${recentResult.clarity}점` : `Clarity ${recentResult.clarity}`}`}
              </p>
            </div>
            <button
              type="button"
              onClick={onUseRecent}
              className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 hover:border-emerald-300/60"
            >
              {value === recentResult.mbti
                ? isKo
                  ? '최근 결과 적용 중'
                  : 'Using Latest Result'
                : isKo
                  ? '이 결과 사용'
                  : 'Use This Result'}
            </button>
          </div>
        </div>
      )}

      <div className="mbti-grid">
        {MBTI_LIST.map((mbti) => (
          <button
            key={mbti}
            type="button"
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
          <span className="text-sm font-medium text-yellow-400">
            {t('step3.selected')}: {value}
          </span>
        </div>
      )}

      {value && (
        <div className="space-y-3">
          <p className="text-center text-xs font-medium text-yellow-200/70">
            {isKo
              ? '선택한 MBTI의 확신도도 종합 점수에 함께 반영됩니다.'
              : 'Confidence in your selected MBTI also affects the combined score.'}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'high' as const, ko: '확신 높음', en: 'High' },
              { key: 'medium' as const, ko: '보통', en: 'Medium' },
              { key: 'low' as const, ko: '경계형', en: 'Borderline' },
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

      <button
        type="button"
        className="w-full rounded-lg border border-dashed border-yellow-700/40 py-4 text-sm text-yellow-300/70 transition-colors hover:text-yellow-300"
        onClick={onSkip}
      >
        {t('step3.skip')}
      </button>

      <div className="flex gap-3">
        <button type="button" className="btn-secondary flex-1" onClick={onPrev}>
          {t('prevStep')}
        </button>
        <button
          type="button"
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
