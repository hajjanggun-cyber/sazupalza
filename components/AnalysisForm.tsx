'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import Step1Name from './steps/Step1Name';
import Step2Birth, { BirthData } from './steps/Step2Birth';
import Step3MBTI from './steps/Step3MBTI';
import Step4Time from './steps/Step4Time';
import Step5Photo from './steps/Step5Photo';

const TOTAL_STEPS = 5;

const stepLabels = ['이름', '생일', 'MBTI', '시간', '사진'];

export default function AnalysisForm() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [birth, setBirth] = useState<BirthData | null>(null);
  const [mbti, setMbti] = useState<string | null>(null);
  const [birthHour, setBirthHour] = useState<number | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const goPrev = () => setStep((s) => Math.max(s - 1, 1));
  const skipToNext = () => goNext();

  const handleSubmit = () => {
    if (!name || !birth) return;

    // URL 파라미터로 결과 페이지에 데이터 전달
    const params = new URLSearchParams({
      name,
      year: String(birth.year),
      month: String(birth.month),
      day: String(birth.day),
      lunar: String(birth.isLunar),
      ...(mbti && { mbti }),
      ...(birthHour !== null && { hour: String(birthHour) }),
      ...(photo && { hasPhoto: '1' }),
    });

    // 사진은 sessionStorage에 저장
    if (photo) {
      try {
        sessionStorage.setItem('facePhoto', photo);
      } catch {
        // sessionStorage 용량 초과 시 무시
      }
    }

    router.push(`/${locale}/result?${params.toString()}`);
  };

  return (
    <div>
      {/* 개인정보 안내 */}
      <div className="mb-6 bg-green-900/20 border border-green-700/30 rounded-lg px-4 py-3">
        <p className="text-green-300/80 text-sm text-center">
          {t('privacy.formTop')}
        </p>
      </div>

      {/* 진행 상태바 */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const stepNum = i + 1;
            const isRequired = stepNum <= 2;
            const isDone = step > stepNum;
            const isActive = step === stepNum;

            return (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`progress-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                >
                  {isDone ? '✓' : stepNum}
                </div>
                {stepNum < TOTAL_STEPS && (
                  <div className={`h-px w-8 mx-1 ${step > stepNum ? 'bg-yellow-500' : 'bg-yellow-900/40'}`} />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-4 text-xs text-yellow-200/50">
          {stepLabels.map((label, i) => (
            <span
              key={label}
              className={`${step === i + 1 ? 'text-yellow-400 font-bold' : ''} ${i < 2 ? '' : 'opacity-70'}`}
            >
              {i < 2 ? '●' : '○'} {label}
            </span>
          ))}
        </div>
      </div>

      {/* 스텝 컴포넌트 */}
      <div className="min-h-[400px]">
        {step === 1 && (
          <Step1Name value={name} onChange={setName} onNext={goNext} />
        )}
        {step === 2 && (
          <Step2Birth value={birth} onChange={setBirth} onNext={goNext} onPrev={goPrev} />
        )}
        {step === 3 && (
          <Step3MBTI
            value={mbti}
            onChange={setMbti}
            onNext={goNext}
            onSkip={skipToNext}
            onPrev={goPrev}
          />
        )}
        {step === 4 && (
          <Step4Time
            value={birthHour}
            onChange={setBirthHour}
            onNext={goNext}
            onSkip={skipToNext}
            onPrev={goPrev}
          />
        )}
        {step === 5 && (
          <Step5Photo
            onPhotoCapture={setPhoto}
            onSkip={handleSubmit}
            onPrev={goPrev}
          />
        )}
      </div>

      {/* 최종 분석 버튼 (Step 5에서 사진 업로드 후) */}
      {step === 5 && photo && (
        <div className="mt-4">
          <p className="text-center text-yellow-200/70 text-sm mb-3">
            ✅ 무료로 종합 분석 결과를 받아보세요
            <br />
            <span className="text-xs text-yellow-200/50">(광고 1회 시청 후 전체 리포트 공개)</span>
          </p>
          <button className="btn-primary" onClick={handleSubmit}>
            🎁 무료 분석 시작하기
          </button>
        </div>
      )}
    </div>
  );
}
