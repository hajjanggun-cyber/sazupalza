'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

interface Props {
  onPhotoCapture: (dataUrl: string | null) => void;
  onSkip: () => void;
  onPrev: () => void;
}

export default function Step5Photo({ onPhotoCapture, onSkip, onPrev }: Props) {
  const t = useTranslations('steps.step5');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [faceError, setFaceError] = useState(false);

  const accuracy = preview ? parseInt(t('accuracyWithPhoto')) : parseInt(t('accuracyNoPhoto'));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setFaceError(false);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreview(dataUrl);
      onPhotoCapture(dataUrl);
      setUploading(false);
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
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fade-in space-y-6">
      <div className="text-center">
        <span className="inline-block bg-yellow-900/60 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-yellow-600/30">
          {t('optional')} ○
        </span>
        <h2 className="text-2xl font-bold text-yellow-100">{t('title')}</h2>
      </div>

      {/* 분석 정확도 바 */}
      <div className="card-dark p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-yellow-200/80 text-sm">{t('accuracy')}</span>
          <span className="text-yellow-400 font-bold">{accuracy}%</span>
        </div>
        <div className="score-bar">
          <div className="score-fill" style={{ width: `${accuracy}%` }} />
        </div>
        {!preview && (
          <p className="text-yellow-200/50 text-xs mt-2 text-center">{t('noPhotoMsg')}</p>
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
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 transition-colors"
            aria-label="사진 삭제"
          >
            ✕
          </button>
        </div>
      )}

      {faceError && (
        <div className="text-center text-red-400 text-sm bg-red-900/20 rounded-lg p-3">
          {t('faceNotFound')}
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
            <span className="text-sm">{t('camera')}</span>
          </button>
          <button
            className="btn-secondary flex flex-col items-center gap-2 py-5"
            onClick={handleUpload}
            disabled={uploading}
          >
            <span className="text-2xl">🖼️</span>
            <span className="text-sm">{t('upload')}</span>
          </button>
        </div>
      )}

      {/* 보안 안내 */}
      <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3">
        <p className="text-green-300/80 text-xs text-center leading-relaxed">
          🔒 사진은 분석 즉시 자동 삭제됩니다. 서버에 저장되지 않습니다.
        </p>
      </div>

      {/* 사진 없이 분석 버튼 (가장 크게) */}
      <button
        className="w-full py-5 text-lg font-bold text-yellow-400 border-2 border-yellow-500/50 rounded-xl hover:bg-yellow-900/20 transition-colors"
        onClick={onSkip}
      >
        {t('skip')}
      </button>

      <div className="flex gap-3">
        <button className="btn-secondary flex-1" onClick={onPrev}>
          ← 이전
        </button>
        {preview && (
          <button className="btn-primary flex-1" onClick={() => onPhotoCapture(preview)}>
            사진으로 분석 →
          </button>
        )}
      </div>
    </div>
  );
}
