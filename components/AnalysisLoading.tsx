'use client';

import { useEffect, useState } from 'react';

interface Props {
  hasMbti: boolean;
  hasPhoto: boolean;
  hasTime: boolean;
  onComplete: () => void;
}

interface Step {
  icon: string;
  label: string;
  duration: number;
}

export default function AnalysisLoading({ hasMbti, hasPhoto, hasTime, onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [doneSteps, setDoneSteps] = useState<number[]>([]);

  const steps: Step[] = [
    { icon: '🌟', label: '사주 팔자 계산 중...', duration: 900 },
    { icon: '✍️', label: '성명학 획수 분석 중...', duration: 700 },
    ...(hasPhoto ? [{ icon: '👁️', label: '관상 데이터 매핑 중...', duration: 800 }] : []),
    ...(hasMbti  ? [{ icon: '🧠', label: 'MBTI 오행 교차 분석 중...', duration: 600 }] : []),
    ...(hasTime  ? [{ icon: '⏰', label: '시주(時柱) 세밀 분석 중...', duration: 500 }] : []),
    { icon: '🔮', label: '수호신 매핑 중...', duration: 700 },
    { icon: '✨', label: '종합 리포트 생성 중...', duration: 600 },
  ];

  useEffect(() => {
    let totalDelay = 0;

    steps.forEach((step, idx) => {
      // 해당 스텝 활성화
      setTimeout(() => {
        setCurrentStep(idx);
      }, totalDelay);

      totalDelay += step.duration;

      // 해당 스텝 완료 처리
      setTimeout(() => {
        setDoneSteps((prev) => [...prev, idx]);
      }, totalDelay - 100);
    });

    // 전체 완료 후 콜백
    setTimeout(() => {
      onComplete();
    }, totalDelay + 300);
  }, []);

  const totalDuration = steps.reduce((sum, s) => sum + s.duration, 0);
  const elapsed = doneSteps.length > 0 ? (doneSteps.length / steps.length) * 100 : 0;

  return (
    <div className="loading-screen">
      <div className="w-full max-w-sm px-6 py-10">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4 animate-pulse">🔮</div>
          <h2 className="text-xl font-bold text-yellow-200 mb-1">종합 분석 중</h2>
          <p className="text-purple-200/60 text-sm">잠시만 기다려 주세요</p>
        </div>

        {/* 단계별 스텝 */}
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
                  {isDone ? '✓' : isActive ? step.icon : '○'}
                </span>
                <span
                  className={`text-sm font-medium transition-colors ${
                    isDone    ? 'text-yellow-300/90' :
                    isActive  ? 'text-purple-200' :
                    'text-white/30'
                  }`}
                >
                  {isDone ? step.label.replace('중...', '완료') : step.label}
                </span>
                {isActive && (
                  <span className="ml-auto">
                    <span className="inline-flex gap-0.5">
                      {[0,1,2].map((i) => (
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

        {/* 진행 바 */}
        <div className="score-bar h-2">
          <div
            className="score-fill"
            style={{ width: `${elapsed}%`, transition: 'width 0.5s ease' }}
          />
        </div>
        <p className="text-right text-xs text-purple-200/40 mt-1">
          {Math.round(elapsed)}%
        </p>
      </div>
    </div>
  );
}
