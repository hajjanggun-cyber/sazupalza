'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

// ── 모델 로드 (모듈 레벨 - 재마운트 시 재로드 방지) ──
let modelsLoaded = false;

async function loadFaceModels() {
  if (modelsLoaded) return;
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  ]);
  modelsLoaded = true;
}

// ── 랜드마크로 얼굴형 분류 ──
function calcFaceShape(pts: { x: number; y: number }[]): string {
  const jawWidth      = Math.abs(pts[16].x - pts[0].x);
  const cheekWidth    = Math.abs(pts[14].x - pts[2].x);
  const foreheadWidth = Math.abs(pts[26].x - pts[17].x);
  const faceHeight    = pts[8].y - (pts[19].y + pts[24].y) / 2;
  const ratio         = faceHeight / jawWidth;

  if (ratio > 1.4)                      return '계란형';
  if (jawWidth > cheekWidth * 0.95)     return '각진형';
  if (foreheadWidth > jawWidth * 1.15)  return '역삼각형';
  if (ratio < 1.0)                      return '둥근형';
  return '타원형';
}

// ── 좌우 대칭도 → 점수(60~95) ──
function calcSymmetryScore(pts: { x: number; y: number }[]): number {
  const centerX = (pts[0].x + pts[16].x) / 2;
  const pairs: [number, number][] = [[1,15],[2,14],[3,13],[4,12],[5,11],[6,10]];
  let totalAsym = 0;
  pairs.forEach(([l, r]) => {
    totalAsym += Math.abs(
      Math.abs(pts[l].x - centerX) - Math.abs(pts[r].x - centerX)
    );
  });
  const faceWidth  = Math.abs(pts[16].x - pts[0].x);
  const asymRatio  = totalAsym / (faceWidth * pairs.length);
  return Math.round(Math.max(60, Math.min(95, 95 - asymRatio * 200)));
}

// ── 얼굴형 + 지배 표정 → 관상 특징 & 요약 ──
function buildFaceFeatures(
  shape: string,
  expressions: Record<string, number>
): { mainFeatures: string[]; summary: string } {
  const shapeFeatures: Record<string, string[]> = {
    타원형:   ['균형 잡힌 이목구비', '우아한 인상'],
    둥근형:   ['온화한 인상', '친근감 있는 얼굴'],
    각진형:   ['의지 있는 인상', '강인한 이미지'],
    역삼각형: ['지적인 인상', '날카로운 이목구비'],
    계란형:   ['세련된 인상', '이상적인 비율'],
  };

  const shapeDesc: Record<string, string> = {
    타원형:   '균형 잡힌 관상으로 대인관계에 유리한 기운이 있습니다',
    둥근형:   '온화하고 원만한 인상으로 주변에 좋은 기운을 주는 경향이 있습니다',
    각진형:   '결단력과 의지력이 강하게 드러나는 관상입니다',
    역삼각형: '총명하고 예리한 기운이 강한 지적 인상입니다',
    계란형:   '전반적으로 균형 잡힌 기운을 가진 이상적인 관상입니다',
  };

  const expressionFeature: Record<string, string> = {
    happy:     '밝고 긍정적인 에너지',
    neutral:   '차분하고 신뢰감 있는 인상',
    surprised: '생기 있고 호기심 넘치는 눈빛',
    sad:       '감수성이 풍부한 섬세한 인상',
    angry:     '강한 카리스마와 존재감',
    fearful:   '예민한 감각과 직관력',
    disgusted: '뚜렷한 자기 기준과 원칙',
  };

  const dominant = Object.entries(expressions).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'neutral';

  return {
    mainFeatures: [
      ...(shapeFeatures[shape] ?? ['균형 잡힌 이목구비']),
      expressionFeature[dominant] ?? '안정적인 인상',
    ],
    summary: shapeDesc[shape] ?? '균형 잡힌 관상으로 대인관계에 유리한 기운이 있습니다',
  };
}

// ── 저장 타입 (sessionStorage → result 페이지에서 사용) ──
export interface FaceAnalysisResult {
  faceShape: string;
  mainFeatures: string[];
  score: number;
  summary: string;
}

// ────────────────────────────────────────────────────
interface Props {
  onPhotoCapture: (dataUrl: string | null) => void;
  onSkip: () => void;
  onPrev: () => void;
}

export default function Step5Photo({ onPhotoCapture, onSkip, onPrev }: Props) {
  const t = useTranslations('steps');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview]   = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [faceError, setFaceError] = useState(false);

  const accuracy = preview ? parseInt(t('step5.accuracyWithPhoto')) : parseInt(t('step5.accuracyNoPhoto'));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setFaceError(false);

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreview(dataUrl);
      setUploading(false);
      setAnalyzing(true);

      try {
        // 1) 모델 로드
        await loadFaceModels();

        // 2) img 엘리먼트 생성 (face-api.js는 HTMLImageElement를 입력으로 받음)
        const img = new Image();
        img.src = dataUrl;
        await new Promise<void>((res) => { img.onload = () => res(); });

        // 3) 얼굴 감지 + 랜드마크 + 표정
        const detection = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks(true)   // true = tiny landmark model
          .withFaceExpressions();

        if (!detection) {
          // 얼굴 미감지 → faceError 표시, 분석 없이 사진만 전달
          setFaceError(true);
          sessionStorage.removeItem('faceAnalysisResult');
        } else {
          const pts   = detection.landmarks.positions;
          const shape = calcFaceShape(pts);
          const score = calcSymmetryScore(pts);
          const { mainFeatures, summary } = buildFaceFeatures(
            shape,
            detection.expressions as unknown as Record<string, number>
          );

          const result: FaceAnalysisResult = { faceShape: shape, mainFeatures, score, summary };
          sessionStorage.setItem('faceAnalysisResult', JSON.stringify(result));
        }
      } catch (err) {
        console.error('관상 분석 오류:', err);
        sessionStorage.removeItem('faceAnalysisResult');
      } finally {
        setAnalyzing(false);
        onPhotoCapture(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'user');
      fileInputRef.current.click();
    }
  };

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onPhotoCapture(null);
    sessionStorage.removeItem('faceAnalysisResult');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fade-in space-y-6">
      <div className="text-center">
        <span className="inline-block bg-yellow-900/60 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-yellow-600/30">
          {t('step5.optional')} ○
        </span>
        <h2 className="text-2xl font-bold text-yellow-100">{t('step5.title')}</h2>
      </div>

      {/* 분석 정확도 바 */}
      <div className="card-dark p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-yellow-200/80 text-sm">{t('step5.accuracy')}</span>
          <span className="text-yellow-400 font-bold">{accuracy}%</span>
        </div>
        <div className="score-bar">
          <div className="score-fill" style={{ width: `${accuracy}%` }} />
        </div>
        {!preview && (
          <p className="text-yellow-200/50 text-xs mt-2 text-center">{t('step5.noPhotoMsg')}</p>
        )}
      </div>

      {/* 사진 미리보기 */}
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="업로드된 사진"
            className="w-full max-h-64 object-cover rounded-xl border border-yellow-600/30"
          />
          {/* 분석 중 오버레이 */}
          {analyzing && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-xl">
              <div className="text-3xl mb-2 animate-pulse">👁️</div>
              <p className="text-yellow-300 text-sm font-medium">{t('step5.analyzing')}</p>
            </div>
          )}
          {!analyzing && (
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 transition-colors"
              aria-label={t('step5.removePhoto')}
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* 얼굴 미감지 에러 */}
      {faceError && (
        <div className="text-center text-yellow-400 text-sm bg-yellow-900/20 rounded-lg p-3">
          {t('step5.faceNotFound')}
          <p className="text-yellow-200/60 text-xs mt-1">{t('step5.noPhotoNote')}</p>
        </div>
      )}

      {/* 얼굴 감지 성공 */}
      {preview && !analyzing && !faceError && (
        <div className="text-center text-green-400 text-sm bg-green-900/20 rounded-lg p-3">
          {t('step5.analysisDone')}
        </div>
      )}

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* 카메라/업로드 버튼 */}
      {!preview && (
        <div className="grid grid-cols-2 gap-3">
          <button
            className="btn-secondary flex flex-col items-center gap-2 py-5"
            onClick={handleCamera}
            disabled={uploading}
          >
            <span className="text-2xl">📷</span>
            <span className="text-sm">{t('step5.camera')}</span>
          </button>
          <button
            className="btn-secondary flex flex-col items-center gap-2 py-5"
            onClick={handleUpload}
            disabled={uploading}
          >
            <span className="text-2xl">🖼️</span>
            <span className="text-sm">{t('step5.upload')}</span>
          </button>
        </div>
      )}

      {/* 보안 안내 */}
      <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3">
        <p className="text-green-300/80 text-xs text-center leading-relaxed">
          {t('step5.privacyNote')}
        </p>
      </div>

      {/* 사진 없이 분석 버튼 */}
      <button
        className="w-full py-5 text-lg font-bold text-yellow-400 border-2 border-yellow-500/50 rounded-xl hover:bg-yellow-900/20 transition-colors"
        onClick={onSkip}
      >
        {t('step5.skip')}
      </button>

      <div className="flex gap-3">
        <button className="btn-secondary flex-1" onClick={onPrev}>
          {t('prevStep')}
        </button>
        {preview && !analyzing && (
          <button className="btn-primary flex-1" onClick={() => onPhotoCapture(preview)}>
            {t('step5.analyzeWithPhoto')}
          </button>
        )}
        {analyzing && (
          <button className="btn-primary flex-1 opacity-50" disabled>
            {t('step5.analyzing')}
          </button>
        )}
      </div>
    </div>
  );
}
