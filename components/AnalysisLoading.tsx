'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { RESULT_REVEAL_DELAY_MS } from '../lib/constants/analysis-delay';

interface Props {
  hasMbti: boolean;
  hasPhoto: boolean;
  hasTime: boolean;
  isKo: boolean;
  onComplete: () => void;
}

interface Step {
  icon: string;
  label: string;
  doneLabel: string;
  duration: number;
}

export default function AnalysisLoading({ hasMbti, hasPhoto, hasTime, isKo, onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [doneSteps, setDoneSteps] = useState<number[]>([]);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const steps = useMemo<Step[]>(() => {
    if (!isKo) {
      return [
        { icon: '🔮', label: 'Calculating Four Pillars...', doneLabel: 'Four Pillars calculated', duration: 900 },
        { icon: '✍️', label: 'Analyzing name numerology...', doneLabel: 'Name numerology analyzed', duration: 700 },
        ...(hasPhoto ? [{ icon: '👁️', label: 'Mapping face-reading data...', doneLabel: 'Face data mapped', duration: 800 }] : []),
        ...(hasMbti ? [{ icon: '🧠', label: 'Cross-checking MBTI and elements...', doneLabel: 'MBTI cross-check complete', duration: 600 }] : []),
        ...(hasTime ? [{ icon: '⏰', label: 'Running hour-pillar refinement...', doneLabel: 'Hour-pillar refinement complete', duration: 500 }] : []),
        { icon: '🛡️', label: 'Matching guardian profile...', doneLabel: 'Guardian profile matched', duration: 700 },
        { icon: '📜', label: 'Generating comprehensive report...', doneLabel: 'Comprehensive report ready', duration: 600 },
      ];
    }

    return [
      { icon: '🔮', label: '사주 팔자 계산 중...', doneLabel: '사주 팔자 계산 완료', duration: 900 },
      { icon: '✍️', label: '성명학 획수 분석 중...', doneLabel: '성명학 획수 분석 완료', duration: 700 },
      ...(hasPhoto ? [{ icon: '👁️', label: '관상 데이터 매핑 중...', doneLabel: '관상 데이터 매핑 완료', duration: 800 }] : []),
      ...(hasMbti ? [{ icon: '🧠', label: 'MBTI 오행 교차 분석 중...', doneLabel: 'MBTI 오행 교차 분석 완료', duration: 600 }] : []),
      ...(hasTime ? [{ icon: '⏰', label: '시주(時柱) 세밀 분석 중...', doneLabel: '시주(時柱) 세밀 분석 완료', duration: 500 }] : []),
      { icon: '🛡️', label: '수호신 매핑 중...', doneLabel: '수호신 매핑 완료', duration: 700 },
      { icon: '📜', label: '종합 리포트 생성 중...', doneLabel: '종합 리포트 생성 완료', duration: 600 },
    ];
  }, [hasMbti, hasPhoto, hasTime, isKo]);

  useEffect(() => {
    setCurrentStep(0);
    setDoneSteps([]);

    const timers: ReturnType<typeof setTimeout>[] = [];
    let totalDelay = 0;

    steps.forEach((step, idx) => {
      timers.push(setTimeout(() => setCurrentStep(idx), totalDelay));
      totalDelay += step.duration;
      timers.push(setTimeout(() => {
        setDoneSteps((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
      }, Math.max(0, totalDelay - 100)));
    });

    const completionDelay = Math.max(totalDelay + 300, RESULT_REVEAL_DELAY_MS);
    timers.push(setTimeout(() => onCompleteRef.current(), completionDelay));

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [steps]);

  const elapsed = doneSteps.length > 0 ? (doneSteps.length / steps.length) * 100 : 0;

  return (
    <div className="loading-screen">
      <div className="w-full max-w-sm px-6 py-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4 animate-pulse">🛡️</div>
          <h2 className="text-xl font-bold text-yellow-200 mb-1">
            {isKo ? '종합 분석 중' : 'Running Comprehensive Analysis'}
          </h2>
          <p className="text-purple-200/60 text-sm">
            {isKo ? '잠시만 기다려 주세요' : 'Please wait a moment'}
          </p>
        </div>

        <div className="space-y-1 mb-8">
          {steps.map((step, idx) => {
            const isDone = doneSteps.includes(idx);
            const isActive = currentStep === idx && !isDone;
            const isPending = idx > currentStep;

            return (
              <div
                key={idx}
                className={`loading-step ${!isPending ? 'visible' : ''}`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <span className="step-icon text-xl w-8 flex-shrink-0">
                  {isDone ? '✅' : isActive ? step.icon : '⏳'}
                </span>
                <span
                  className={`text-sm font-medium transition-colors ${
                    isDone
                      ? 'text-yellow-300/90'
                      : isActive
                        ? 'text-purple-200'
                        : 'text-white/30'
                  }`}
                >
                  {isDone ? step.doneLabel : step.label}
                </span>
                {isActive && (
                  <span className="ml-auto">
                    <span className="inline-flex gap-0.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1 h-1 rounded-full bg-purple-400 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </span>
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="score-bar h-2">
          <div
            className="score-fill"
            style={{ width: `${elapsed}%`, transition: 'width 0.5s ease' }}
          />
        </div>
        <p className="text-right text-xs text-purple-200/40 mt-1">{Math.round(elapsed)}%</p>
      </div>
    </div>
  );
}
