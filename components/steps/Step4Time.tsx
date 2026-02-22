'use client';

import { useTranslations } from 'next-intl';

const TIME_LIST = [
  { key: 'ja',   label: '자시', hour: 23, range: '23:00~01:00', hanja: '子時' },
  { key: 'chuk', label: '축시', hour: 1,  range: '01:00~03:00', hanja: '丑時' },
  { key: 'in',   label: '인시', hour: 3,  range: '03:00~05:00', hanja: '寅時' },
  { key: 'myo',  label: '묘시', hour: 5,  range: '05:00~07:00', hanja: '卯時' },
  { key: 'jin',  label: '진시', hour: 7,  range: '07:00~09:00', hanja: '辰時' },
  { key: 'sa',   label: '사시', hour: 9,  range: '09:00~11:00', hanja: '巳時' },
  { key: 'o',    label: '오시', hour: 11, range: '11:00~13:00', hanja: '午時' },
  { key: 'mi',   label: '미시', hour: 13, range: '13:00~15:00', hanja: '未時' },
  { key: 'sin',  label: '신시', hour: 15, range: '15:00~17:00', hanja: '申時' },
  { key: 'yu',   label: '유시', hour: 17, range: '17:00~19:00', hanja: '酉時' },
  { key: 'sul',  label: '술시', hour: 19, range: '19:00~21:00', hanja: '戌時' },
  { key: 'hae',  label: '해시', hour: 21, range: '21:00~23:00', hanja: '亥時' },
];

interface Props {
  value: number | null; // hour (0~23)
  onChange: (v: number | null) => void;
  onNext: () => void;
  onSkip: () => void;
  onPrev: () => void;
}

export default function Step4Time({ value, onChange, onNext, onSkip, onPrev }: Props) {
  const t = useTranslations('steps.step4');

  return (
    <div className="fade-in space-y-6">
      <div className="text-center">
        <span className="inline-block bg-yellow-900/60 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-yellow-600/30">
          {t('optional')} ○
        </span>
        <h2 className="text-2xl font-bold text-yellow-100">{t('title')}</h2>
        <p className="text-yellow-300/70 text-sm mt-2">{t('tip')}</p>
      </div>

      {/* 시(時) 리스트 */}
      <div className="grid grid-cols-2 gap-2">
        {TIME_LIST.map((time) => (
          <button
            key={time.key}
            className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all text-left ${
              value === time.hour
                ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 border-transparent text-black'
                : 'bg-white/5 border-yellow-700/30 text-yellow-100 hover:border-yellow-500/60 hover:bg-yellow-900/20'
            }`}
            onClick={() => onChange(value === time.hour ? null : time.hour)}
          >
            <div>
              <span className="font-bold">{time.hanja}</span>
              <span className="ml-2 text-sm opacity-80">{time.label}</span>
            </div>
            <span className="text-xs opacity-70">{time.range}</span>
          </button>
        ))}
      </div>

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
          disabled={value === null}
        >
          다음 단계 →
        </button>
      </div>
    </div>
  );
}
