'use client';

import { useLocale } from 'next-intl';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

// ── 모델 로드 ──
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

// ── 얼굴형 분류 ──
function calcFaceShape(pts: { x: number; y: number }[]): string {
    const jawWidth = Math.abs(pts[16].x - pts[0].x);
    const cheekWidth = Math.abs(pts[14].x - pts[2].x);
    const foreheadWidth = Math.abs(pts[26].x - pts[17].x);
    const faceHeight = pts[8].y - (pts[19].y + pts[24].y) / 2;
    const ratio = faceHeight / jawWidth;
    if (ratio > 1.4) return 'oval_long';
    if (jawWidth > cheekWidth * 0.95) return 'square';
    if (foreheadWidth > jawWidth * 1.15) return 'triangle_inv';
    if (ratio < 1.0) return 'round';
    return 'oval';
}

// ── 대칭도 점수 ──
function calcSymmetryScore(pts: { x: number; y: number }[]): number {
    const centerX = (pts[0].x + pts[16].x) / 2;
    const pairs: [number, number][] = [[1, 15], [2, 14], [3, 13], [4, 12], [5, 11], [6, 10]];
    let totalAsym = 0;
    pairs.forEach(([l, r]) => {
        totalAsym += Math.abs(Math.abs(pts[l].x - centerX) - Math.abs(pts[r].x - centerX));
    });
    const faceWidth = Math.abs(pts[16].x - pts[0].x);
    const asymRatio = totalAsym / (faceWidth * pairs.length);
    return Math.round(Math.max(60, Math.min(95, 95 - asymRatio * 200)));
}

// ── Base64 URL 인코딩 ──
function encodeToBase64Url(data: object): string {
    const jsonStr = JSON.stringify(data);
    const bytes = new TextEncoder().encode(jsonStr);
    const binStr = Array.from(bytes, (b) => String.fromCharCode(b)).join('');
    return btoa(binStr)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

// ── 사진 업로드 박스 서브 컴포넌트 ──
interface PhotoBoxProps {
    label: string;
    sublabel: string;
    hint: string;
    required: boolean;
    preview: string | null;
    analyzing: boolean;
    faceError: boolean;
    faceOk: boolean;
    onCamera: () => void;
    onUpload: () => void;
    onRemove: () => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isKo: boolean;
}

function PhotoBox({
    label, sublabel, hint, required, preview, analyzing, faceError, faceOk,
    onCamera, onUpload, onRemove, fileInputRef, onFileChange, isKo,
}: PhotoBoxProps) {
    return (
        <div className={`rounded-2xl border-2 p-5 transition-all duration-300 ${preview && faceOk
            ? 'border-green-500/60 bg-green-900/10'
            : preview && faceError
                ? 'border-orange-500/40 bg-orange-900/10'
                : 'border-yellow-700/30 bg-white/3'
            }`}>
            {/* 헤더 */}
            <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${required
                    ? 'bg-yellow-500 text-black'
                    : 'bg-yellow-900/60 text-yellow-400 border border-yellow-600/30'
                    }`}>
                    {required ? (isKo ? '필수 ●' : 'Required ●') : (isKo ? '선택 ○' : 'Optional ○')}
                </span>
                <div>
                    <p className="text-yellow-100 font-bold text-sm">{label}</p>
                    <p className="text-yellow-200/50 text-xs">{sublabel}</p>
                </div>
            </div>

            {/* 미리보기 */}
            {preview ? (
                <div className="relative mb-3">
                    <NextImage
                        src={preview}
                        alt={label}
                        width={800}
                        height={176}
                        unoptimized
                        className="w-full h-44 object-cover rounded-xl border border-yellow-600/20"
                    />
                    {analyzing && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-xl">
                            <div className="text-3xl mb-2 animate-pulse">👁️</div>
                            <p className="text-yellow-300 text-sm font-medium">
                                {isKo ? '얼굴 분석 중…' : 'Analyzing face…'}
                            </p>
                        </div>
                    )}
                    {!analyzing && (
                        <button
                            onClick={onRemove}
                            className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-black/80 transition-colors text-sm"
                        >✕</button>
                    )}
                    {/* 상태 메시지 */}
                    {!analyzing && faceOk && (
                        <div className="absolute bottom-2 left-2 right-2 bg-green-900/80 border border-green-500/50 rounded-lg px-2 py-1 text-center">
                            <p className="text-green-300 text-xs font-bold">✓ {isKo ? '얼굴 감지 완료' : 'Face detected'}</p>
                        </div>
                    )}
                    {!analyzing && faceError && (
                        <div className="absolute bottom-2 left-2 right-2 bg-orange-900/80 border border-orange-500/50 rounded-lg px-2 py-1 text-center">
                            <p className="text-orange-300 text-xs font-bold">
                                ⚠ {isKo ? '얼굴 인식 실패 — 다시 촬영해 주세요' : 'Face not recognized - please retake'}
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-2 mb-3">
                    <button
                        onClick={onCamera}
                        className="flex flex-col items-center gap-1.5 py-4 rounded-xl border border-yellow-700/30 bg-white/3 hover:bg-yellow-900/20 hover:border-yellow-500/50 transition-all text-yellow-200 text-sm"
                    >
                        <span className="text-2xl">📷</span>
                        <span className="text-xs">{isKo ? '카메라' : 'Camera'}</span>
                    </button>
                    <button
                        onClick={onUpload}
                        className="flex flex-col items-center gap-1.5 py-4 rounded-xl border border-yellow-700/30 bg-white/3 hover:bg-yellow-900/20 hover:border-yellow-500/50 transition-all text-yellow-200 text-sm"
                    >
                        <span className="text-2xl">🖼️</span>
                        <span className="text-xs">{isKo ? '앨범' : 'Gallery'}</span>
                    </button>
                </div>
            )}

            <p className="text-yellow-200/40 text-xs text-center">{hint}</p>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
            />
        </div>
    );
}

// ── 메인 폼 ──
export default function GwansangForm() {
    const router = useRouter();
    const locale = useLocale();
    const isKo = locale === 'ko';

    // 정면
    const frontRef = useRef<HTMLInputElement>(null);
    const [frontPreview, setFrontPreview] = useState<string | null>(null);
    const [frontAnalyzing, setFrontAnalyzing] = useState(false);
    const [frontError, setFrontError] = useState(false);
    const [frontOk, setFrontOk] = useState(false);
    const [frontData, setFrontData] = useState<object | null>(null);

    // 측면
    const sideRef = useRef<HTMLInputElement>(null);
    const [sidePreview, setSidePreview] = useState<string | null>(null);
    const [sideAnalyzing, setSideAnalyzing] = useState(false);
    const [sideError, setSideError] = useState(false);
    const [sideOk, setSideOk] = useState(false);

    // 정확도 계산
    const accuracy = frontPreview && sidePreview ? 95 : frontPreview ? 75 : 50;

    // ── 공통 분석 함수 ──
    async function analyzePhoto(
        dataUrl: string,
        setAnalyzing: (v: boolean) => void,
        setError: (v: boolean) => void,
        setOk: (v: boolean) => void,
        onResult?: (data: object) => void,
    ) {
        setAnalyzing(true);
        setError(false);
        setOk(false);
        try {
            await loadFaceModels();
            const img = new Image();
            await new Promise<void>((res, rej) => {
                img.onload = () => res();
                img.onerror = () => rej(new Error('Image load failed'));
                img.src = dataUrl;
            });

            // Tiny Face Detector의 scoreThreshold 를 대폭 낮춰 약간 흐릿하거나 먼 사진도 감지하게 함 (기본 0.5 -> 0.1)
            // inputSize도 키워 큰 스마트폰 해상도에서도 얼굴을 더 잘 찾도록 보정 (416 -> 512)
            const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.1 });

            // 15초 타임아웃: face-api.js가 무한 대기하면 버튼이 영원히 비활성화되는 것을 방지
            const TIMEOUT_MS = 15000;
            const withTimeout = <T,>(promise: Promise<T>): Promise<T> =>
                Promise.race([
                    promise,
                    new Promise<T>((_, rej) =>
                        setTimeout(() => rej(new Error('Face detection timed out')), TIMEOUT_MS)
                    ),
                ]);

            type FaceDetectionResult = faceapi.WithFaceExpressions<
                faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }, faceapi.FaceLandmarks68>
            >;

            let detection: FaceDetectionResult | undefined = await withTimeout(
                faceapi.detectSingleFace(img, options).withFaceLandmarks(true).withFaceExpressions() as unknown as Promise<FaceDetectionResult | undefined>
            ) ?? undefined;

            // 단일 감지 실패 시 다중 감지로 폴백 후 가장 큰 얼굴을 사용
            if (!detection) {
                const detections: FaceDetectionResult[] = await withTimeout(
                    faceapi.detectAllFaces(img, options).withFaceLandmarks(true).withFaceExpressions() as unknown as Promise<FaceDetectionResult[]>
                );
                if (detections.length > 0) {
                    detection = detections.sort((a, b) => {
                        const areaA = a.detection.box.width * a.detection.box.height;
                        const areaB = b.detection.box.width * b.detection.box.height;
                        return areaB - areaA;
                    })[0];
                }
            }

            if (!detection) {
                // 얼굴이라고 판단하기 힘든 경우
                setError(true);
                setOk(false);
            } else {
                const pts = detection.landmarks.positions;
                const shape = calcFaceShape(pts);
                const score = calcSymmetryScore(pts);
                const expressions = detection.expressions as unknown as Record<string, number>;
                const dominant = Object.entries(expressions).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'neutral';
                const result = { shape, score, dominant };
                setOk(true);
                setError(false);
                onResult?.(result);
            }
        } catch (err) {
            console.error('Gwansang face analysis failed:', err);
            setError(true);
        } finally {
            setAnalyzing(false);
        }
    }

    // ── 정면 파일 변경 ──
    const handleFrontFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (ev) => {
            const dataUrl = ev.target?.result as string;
            setFrontPreview(dataUrl);
            await analyzePhoto(dataUrl, setFrontAnalyzing, setFrontError, setFrontOk, (data) => setFrontData(data));
        };
        reader.readAsDataURL(file);
    };

    // ── 측면 파일 변경 ──
    const handleSideFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (ev) => {
            const dataUrl = ev.target?.result as string;
            setSidePreview(dataUrl);
            await analyzePhoto(dataUrl, setSideAnalyzing, setSideError, setSideOk);
        };
        reader.readAsDataURL(file);
    };

    // ── 정면 카메라/앨범 ──
    const openFrontCamera = () => { frontRef.current?.setAttribute('capture', 'user'); frontRef.current?.click(); };
    const openFrontGallery = () => { frontRef.current?.removeAttribute('capture'); frontRef.current?.click(); };
    const removeFront = () => { setFrontPreview(null); setFrontOk(false); setFrontError(false); setFrontData(null); if (frontRef.current) frontRef.current.value = ''; };

    const openSideCamera = () => { sideRef.current?.setAttribute('capture', 'environment'); sideRef.current?.click(); };
    const openSideGallery = () => { sideRef.current?.removeAttribute('capture'); sideRef.current?.click(); };
    const removeSide = () => { setSidePreview(null); setSideOk(false); setSideError(false); if (sideRef.current) sideRef.current.value = ''; };

    // ── 제출 ──
    const handleSubmit = () => {
        const data = {
            hasFront: !!frontPreview,
            hasSide: !!sidePreview,
            frontData: frontData || null,
            // 실제 이미지는 URL에 담지 않음 (용량 문제) → sessionStorage 활용
            ts: Date.now(),
        };
        // 이미지 데이터는 sessionStorage에 저장 (용량 초과 시 무시 — 결과는 항상 표시)
        try {
            if (frontPreview) sessionStorage.setItem('gwansang_front', frontPreview);
            else sessionStorage.removeItem('gwansang_front');
            if (sidePreview) sessionStorage.setItem('gwansang_side', sidePreview);
            else sessionStorage.removeItem('gwansang_side');
        } catch {
            // QuotaExceededError: 고해상도 사진은 5MB sessionStorage 한도 초과 가능
            // 이미지 미리보기 없이 결과를 표시 (분석 데이터는 URL에 있으므로 결과는 정상 출력)
        }

        const encoded = encodeToBase64Url(data);
        router.push(`/${locale}/gwansang-result/${encoded}`);
    };

    const canSubmit = !!frontData && !frontAnalyzing && !sideAnalyzing;

    return (
        <div className="space-y-6">
            {/* 개인정보 안내 */}
            <div className="bg-green-900/20 border border-green-700/30 rounded-lg px-4 py-3">
                <p className="text-green-300/80 text-sm text-center">
                    🔒 {isKo
                        ? '사진은 분석 후 즉시 폐기되며 서버에 저장되지 않습니다'
                        : 'Photos are processed locally and never uploaded to any server'}
                </p>
            </div>

            {/* 정확도 표시 */}
            <div className="card-dark p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-yellow-200/80 text-sm">
                        {isKo ? '입력 완성도' : 'Input Coverage'}
                    </span>
                    <span className={`font-bold text-lg ${accuracy >= 90 ? 'text-yellow-400' : accuracy >= 70 ? 'text-green-400' : 'text-blue-400'}`}>
                        {accuracy}%
                    </span>
                </div>
                <div className="score-bar">
                    <div className="score-fill transition-all duration-700" style={{ width: `${accuracy}%` }} />
                </div>
                <p className="text-yellow-200/40 text-xs mt-2 text-center">
                    {accuracy >= 90
                        ? (isKo ? '✦ 정면 + 측면으로 가장 풍부한 해석' : '✦ Front + Side — fullest reading')
                        : accuracy >= 70
                            ? (isKo ? '정면 사진으로 기본 해석 가능 · 측면 추가 시 해석 폭이 넓어집니다' : 'Front only — add a side photo for more context')
                            : (isKo ? '사진을 추가할수록 해석 정보가 늘어납니다' : 'More photo detail gives more context')}
                </p>
            </div>

            {/* 사진 업로드 — 2컬럼 (모바일은 1컬럼) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PhotoBox
                    label={isKo ? '정면 사진' : 'Front Face'}
                    sublabel={isKo ? '눈, 코, 입이 잘 보이는 사진' : 'Clear view of eyes, nose, mouth'}
                    hint={isKo ? '정면을 바라보고 촬영해 주세요' : 'Look straight at the camera'}
                    required={true}
                    preview={frontPreview}
                    analyzing={frontAnalyzing}
                    faceError={frontError}
                    faceOk={frontOk}
                    onCamera={openFrontCamera}
                    onUpload={openFrontGallery}
                    onRemove={removeFront}
                    fileInputRef={frontRef}
                    onFileChange={handleFrontFile}
                    isKo={isKo}
                />
                <PhotoBox
                    label={isKo ? '측면 사진' : 'Side Profile'}
                    sublabel={isKo ? '코와 턱선이 잘 보이는 옆모습' : 'Profile showing nose & jawline'}
                    hint={isKo ? '입력 정보 보강용 (없어도 분석 가능)' : 'Adds more context — optional'}
                    required={false}
                    preview={sidePreview}
                    analyzing={sideAnalyzing}
                    faceError={sideError}
                    faceOk={sideOk}
                    onCamera={openSideCamera}
                    onUpload={openSideGallery}
                    onRemove={removeSide}
                    fileInputRef={sideRef}
                    onFileChange={handleSideFile}
                    isKo={isKo}
                />
            </div>

            {/* 측면 안내 (정면만 있을 때) */}
            {frontPreview && !sidePreview && !sideAnalyzing && (
                <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 text-center">
                    <p className="text-blue-300 text-xs font-bold">
                        💡 {isKo ? '측면 사진을 추가하면 해석 정보가 더 풍부해집니다' : 'Add a side profile for a more complete reading'}
                    </p>
                </div>
            )}

            {/* 정면 인식 실패 시 재촬영 안내 */}
            {frontError && !frontAnalyzing && (
                <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-3 text-center">
                    <p className="text-orange-300 text-xs font-bold">
                        {isKo
                            ? '⚠ 정면 얼굴 인식이 어렵습니다. 밝은 곳에서 얼굴이 크게 나오도록 정면으로 다시 촬영해 주세요.'
                            : '⚠ Front face could not be recognized. Please retake in good lighting, facing the camera, with your face filling the frame.'}
                    </p>
                </div>
            )}

            {sideError && !sideAnalyzing && (
                <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-3 text-center">
                    <p className="text-orange-300 text-xs font-bold">
                        {isKo
                            ? '⚠ 측면 얼굴 인식이 어렵습니다. 얼굴 윤곽(코끝~턱선)이 선명하게 보이도록 옆으로 돌아서 다시 촬영해 주세요.'
                            : '⚠ Side profile could not be recognized. Please retake from the side so your nose tip and jawline are clearly visible.'}
                    </p>
                </div>
            )}

            {/* 제출 버튼 */}
            <div className="pt-4 flex flex-col gap-3">
                <button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className="btn-primary w-full py-4 text-lg"
                >
                    🌟 {isKo ? '관상 분석 시작' : 'Start Face Reading'}
                </button>
                {/* 돌아가기 (선택) */}
                <button
                    onClick={() => router.push(`/${locale}`)}
                    className="w-full text-center text-yellow-200/50 hover:text-yellow-200 text-sm transition-colors py-2"
                >
                    {isKo ? '← 뒤로 가기' : '← Go back'}
                </button>
            </div>
        </div>
    );
}
