'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useEffect, useState } from 'react';
import { calculateSaju } from '../../../../lib/calculator/saju-calculator';
import { calculateName } from '../../../../lib/calculator/name-calculator';
import { generateResult, ComprehensiveResult, ResultSection } from '../../../../lib/calculator/result-generator';
import { RESULT_REVEAL_DELAY_MS } from '../../../../lib/constants/analysis-delay';
import { Guardian } from '../../../../lib/data/guardian';
import { readResultPayload } from '../../../../lib/client/result-storage';
import { getAnalysisStartPath, getAnalysisStartUrl } from '../../../../lib/client/share-links';
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import AdSense from '../../../../components/AdSense';
import AnalysisLoading from '../../../../components/AnalysisLoading';
import ResultNextSteps from '../../../../components/ResultNextSteps';
import ResultUnavailableState from '../../../../components/ResultUnavailableState';
import type { FaceAnalysisResult } from '../../../../components/steps/Step5Photo';

interface InputData {
  name: string;
  year: number;
  month: number;
  day: number;
  lunar?: boolean;
  leapMonth?: boolean;
  hour?: number;
  mbti?: string;
  mbtiClarity?: number | null;
  mbtiConfidence?: 'high' | 'medium' | 'low';
  hasPhoto: boolean;
}

function decodeInputData(id: string): InputData | null {
  return readResultPayload<InputData>('combined', id);
}

// Shared UI helpers

function SectionCard({ section }: { section: ResultSection }) {
  return (
    <div className="result-section">
      <div className="result-section-title">
        <span>{section.icon}</span>
        {section.title}
      </div>
      <p>{section.content}</p>
      {section.subItems && section.subItems.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-yellow-900/20 pt-3">
          {section.subItems.map((item) => (
            <div key={item.label} className="flex gap-2 text-sm flex-wrap">
              <span
                className="text-yellow-400/70 font-medium shrink-0"
                style={{ minWidth: '110px' }}
              >
                {item.label}
              </span>
              <span className="text-purple-100/90">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GuardianCard({ guardian, locale }: { guardian: Guardian; locale: string }) {
  return (
    <div className="guardian-card mb-6">
      <div className="text-6xl mb-3">{guardian.emoji}</div>
      <div className="flex justify-center mb-3">
        <span className={`ohaeng-badge ohaeng-${guardian.key}`}>
          {locale === 'ko' ? `${guardian.ohaeng} ?ㅽ뻾` : `${guardian.ohaeng} Element`}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-yellow-200 mb-1">
        {locale === 'ko' ? `?섏쓽 ?섑샇?? ${guardian.nameKo}` : `My Guardian: ${guardian.nameEn}`}
        <span className="text-sm font-normal text-yellow-200/60 ml-2">
          ({locale === 'ko' ? guardian.nameEn : guardian.nameKo})
        </span>
      </h3>
      <div className="flex flex-wrap justify-center gap-1.5 mb-4">
        {guardian.traits.map((trait) => (
          <span
            key={trait}
            className="px-2 py-0.5 text-xs bg-yellow-900/30 text-yellow-300/80 rounded-full border border-yellow-700/30"
          >
            {trait}
          </span>
        ))}
      </div>
      <p className="text-purple-200/80 text-sm leading-relaxed mb-4">
        {locale === 'ko' ? guardian.description : guardian.descriptionEn || guardian.description}
      </p>
      <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3">
        <p className="text-yellow-300 text-sm font-medium italic">
          &quot;{locale === 'ko' ? guardian.luckyMessage : (guardian.luckyMessageEn || guardian.luckyMessage)}&quot;
        </p>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-purple-200/60">
        <span>🎨 {locale === 'ko' ? '행운색' : 'Color'}: {locale === 'ko' ? guardian.luckyColor : guardian.luckyColorEn || guardian.luckyColor}</span>
        <span>🧭 {locale === 'ko' ? '방향' : 'Dir'}: {locale === 'ko' ? guardian.luckyDirection : guardian.luckyDirectionEn || guardian.luckyDirection}</span>
        <span>🔢 {locale === 'ko' ? '숫자' : 'Num'}: {guardian.luckyNumber.join(', ')}</span>
      </div>
    </div>
  );
}

// Main page

export default function ResultIdPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || 'ko';
  const id = params.id as string;
  const [mounted, setMounted] = useState(false);

  // Decode only after mount to avoid hydration mismatch.
  const inputData = useMemo(() => (mounted ? decodeInputData(id) : null), [id, mounted]);

  const [result, setResult] = useState<ComprehensiveResult | null>(null);
  const [loadingDone, setLoadingDone] = useState(false);
  const [minDelayDone, setMinDelayDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const analysisStartPath = getAnalysisStartPath(locale, 'combined');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMinDelayDone(true), RESULT_REVEAL_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    if (!inputData) return;

    try {
      const saju = calculateSaju({
        year: inputData.year,
        month: inputData.month,
        day: inputData.day,
        isLunar: inputData.lunar,
        isLeapMonth: inputData.leapMonth,
        hour: inputData.hour,
      });

      const nameResult = calculateName(inputData.name);

      const comprehensiveResult = generateResult({
        saju,
        name: nameResult,
        face: (() => {
          if (!inputData.hasPhoto) return undefined;
          try {
            const raw = sessionStorage.getItem('faceAnalysisResult');
            if (!raw) return undefined;
            const parsed = JSON.parse(raw) as FaceAnalysisResult;
            // Basic validity check for reused face analysis data.
            if (!parsed.faceShape || typeof parsed.score !== 'number') return undefined;
            return parsed;
          } catch {
            return undefined;
          }
        })(),
        mbtiType: inputData.mbti,
        mbtiClarity: inputData.mbtiClarity ?? undefined,
        mbtiConfidence: inputData.mbtiConfidence,
        locale,
      });

      setResult(comprehensiveResult);
    } catch (err) {
      console.error('寃곌낵 ?앹꽦 ?ㅻ쪟:', err);
    }
  }, [inputData, locale, mounted, router]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getAnalysisStartUrl(locale, 'combined'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore clipboard failures.
    }
  };

  const handleKakaoShare = () => {
    const win = window as any;
    if (win.Kakao?.Share) {
      win.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: locale === 'ko' ? '사주팔자 종합 분석 시작하기' : 'Start Your Sajupalza Analysis',
          description: locale === 'ko'
            ? '개인 결과는 이 기기에서만 확인되며, 공유 링크는 새 분석 페이지로 연결됩니다.'
            : 'Private results stay on this device. Shared links open a fresh analysis page.',
          imageUrl: `${window.location.origin}${window.location.pathname}/opengraph-image`,
          link: {
            mobileWebUrl: getAnalysisStartUrl(locale, 'combined'),
            webUrl: getAnalysisStartUrl(locale, 'combined'),
          },
        },
      });
    } else {
      // Fall back to copying the analysis link if Kakao SDK is unavailable.
      handleCopyLink();
    }
  };

  // If the token cannot be restored on this device, show the privacy-safe fallback state.
  if (mounted && !inputData) {
    return <ResultUnavailableState locale={locale} retryPath={analysisStartPath} />;
  }

  if (!inputData) return null;

  // Keep the loading animation until both the delay and generated result are ready.
  if (!loadingDone || !minDelayDone) {
    return (
      <AnalysisLoading
        hasMbti={!!inputData.mbti}
        hasPhoto={inputData.hasPhoto}
        hasTime={inputData.hour !== undefined}
        isKo={locale === 'ko'}
        onComplete={() => setLoadingDone(true)}
      />
    );
  }

  // Show a compact error state if result generation fails.
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <div className="text-4xl mb-4">?좑툘</div>
          <p className="text-yellow-200 mb-6">{locale === 'ko' ? '遺꾩꽍 以??ㅻ쪟媛 諛쒖깮?덉뒿?덈떎.' : 'Error during analysis.'}</p>
          <button
            className="btn-secondary"
            onClick={() => router.push(`/${locale}`)}
          >
            {locale === 'ko' ? '처음으로 돌아가기' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  const ratingColor = (score: number) =>
    score >= 80 ? 'text-yellow-400' : score >= 65 ? 'text-green-400' : 'text-blue-400';

  const scoreLabel = (score: number) => {
    if (locale === 'ko') {
      return score >= 85 ? '留ㅼ슦 醫뗭쓬' : score >= 75 ? '醫뗭쓬' : score >= 65 ? '蹂댄넻' : '媛쒖꽑 ?ъ?';
    } else {
      return score >= 85 ? 'Excellent' : score >= 75 ? 'Great' : score >= 65 ? 'Good' : 'Needs Improvement';
    }
  };

  const getSajuLabel = (label: string) => {
    if (locale === 'ko') return label;
    const map: Record<string, string> = {
      '사주팔자': 'Four Pillars',
      '성명학': 'Name Analysis',
      '관상': 'Face Reading',
      'MBTI 오행': 'MBTI Element'
    };
    return map[label] || label;
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Top ad */}
      <div className="flex justify-center py-3 bg-black/20">
        <AdSense slot="2233445566" format="horizontal" />
      </div>

      <main className="max-w-2xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="text-center mb-8 fade-in-up">
          <div className="text-5xl mb-3">?뵰</div>
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-100 mb-2">
            {locale === 'ko' ? `${inputData.name}?섏쓽 醫낇빀 遺꾩꽍 寃곌낵` : `Comprehensive Analysis for ${inputData.name}`}
          </h1>
          <p className="text-yellow-200/60 text-sm">
            {locale === 'ko' 
              ? `${inputData.year}년 ${inputData.month}월 ${inputData.day}일`
              : `${inputData.month}/${inputData.day}/${inputData.year}`}
            {inputData.hour !== undefined && (locale === 'ko' ? ` · ${inputData.hour}시` : ` · ${inputData.hour}:00`)}
            {inputData.mbti && ` · ${inputData.mbti}`}
          </p>
        </div>

        {/* Total score card */}
        <div className="card-glow p-6 mb-6 text-center fade-in-up">
          <p className="text-yellow-200/60 text-xs mb-1 tracking-widest">TOTAL SCORE</p>
          <div className="text-7xl font-bold mb-1 shimmer">{result.scores.total}</div>
          <p className={`text-sm font-semibold mb-6 ${ratingColor(result.scores.total)}`}>
            {scoreLabel(result.scores.total)}
          </p>

          <div className="space-y-3 text-left">
            {[
              { label: '사주팔자', score: result.scores.saju, show: true },
              { label: '성명학', score: result.scores.name, show: true },
              { label: '관상', score: result.scores.face, show: inputData.hasPhoto },
              { label: 'MBTI 오행', score: result.scores.mbti, show: !!inputData.mbti },
            ]
              .filter((item) => item.show)
              .map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-yellow-200/70">{getSajuLabel(item.label)}</span>
                    <span className={`font-bold ${ratingColor(item.score)}`}>
                      {item.score}{locale === 'ko' ? '점' : ' pts'}
                    </span>
                  </div>
                  <div className="score-bar">
                    <div className="score-fill" style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Guardian card */}
        <GuardianCard guardian={result.guardian} locale={locale} />

        {/* Core summary */}
        <div className="card-dark p-6 mb-6">
          <h2 className="text-lg font-bold text-yellow-400 mb-4">
            {locale === 'ko' ? '?뱷 ?듭떖 ?붿빟' : '?뱷 Core Summary'}
          </h2>
          <div className="space-y-3">
            {result.summaryLines.map((line, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-yellow-500 font-bold shrink-0 mt-0.5">{i + 1}.</span>
                <p className="text-yellow-200/90 text-sm leading-relaxed">{line}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis basis */}
        <div className="mb-6 bg-purple-900/20 border border-purple-700/30 rounded-xl p-4">
          <p className="text-purple-300/90 text-xs font-bold mb-2 tracking-wide">
            {locale === 'ko' ? '?뱤 遺꾩꽍 洹쇨굅' : '?뱤 Analysis Basis'}
          </p>
          <div className="space-y-1 text-xs text-purple-200/70">
            <p>{result.analysisBox.ilgan}</p>
            <p>{result.analysisBox.wolji}</p>
            <p>
              {locale === 'ko' 
                ? `수리: 원격 ${result.analysisBox.wongyeok} / 형격 ${result.analysisBox.hyeongyeok}`
                : `Suri: Won-Gyeok ${result.analysisBox.wongyeok} / Hyeong-Gyeok ${result.analysisBox.hyeongyeok}`}
            </p>
            <p>{locale === 'ko' ? '소리 오행: ' : 'Sound Elements: '}{result.analysisBox.soundOhaeng}</p>
            {result.analysisBox.mbtiOhaeng && (
              <p>{result.analysisBox.mbtiOhaeng}</p>
            )}
          </div>
        </div>

        {/* Ad slot */}
        <div className="flex justify-center py-4 mb-2">
          <AdSense slot="3344556677" format="rectangle" />
        </div>

        {/* Five-element balance */}
        <SectionCard section={result.ohaengAnalysis} />

        {/* Core day-master analysis */}
        <SectionCard section={result.ilganAnalysis} />

        {/* Ad slot */}
        <div className="flex justify-center py-4 mb-2">
          <AdSense slot="5566778800" format="rectangle" />
        </div>

        {/* Career and strengths */}
        <SectionCard section={result.careerSection} />

        {/* Wealth and finances */}
        <SectionCard section={result.wealthSection} />

        {/* Love and relationships */}
        <SectionCard section={result.loveSection} />

        {/* Ad slot */}
        <div className="flex justify-center py-4 mb-2">
          <AdSense slot="6677889911" format="rectangle" />
        </div>

        {/* Health and body */}
        <SectionCard section={result.healthSection} />

        {/* Lucky factors */}
        <SectionCard section={result.luckySection} />

        {/* Name details */}
        <SectionCard section={result.nameDetailSection} />

        {/* Optional MBTI cross-analysis */}
        {result.mbtiSajuSection && (
          <SectionCard section={result.mbtiSajuSection} />
        )}

        {/* Guidance for more precise analysis */}
        {(result.missingItems.mbti ||
          result.missingItems.time ||
          result.missingItems.photo) && (
          <div className="card-dark p-5 mb-6">
            <p className="text-yellow-300/90 text-sm font-bold mb-3">
              {locale === 'ko' ? '💡 더 정확한 분석을 원하신다면' : '💡 For More Precise Analysis'}
            </p>
            <div className="space-y-2">
              {result.missingItems.mbti && (
                <p className="text-yellow-200/60 text-sm">
                  {locale === 'ko' 
                    ? '· MBTI를 입력하면 성격-운세 교차 분석이 추가됩니다.'
                    : '쨌 Enter MBTI for personality-fortune cross analysis'}
                </p>
              )}
              {result.missingItems.time && (
                <p className="text-yellow-200/60 text-sm">
                  {locale === 'ko'
                    ? '쨌 ?쒖뼱???쒓컙???낅젰?섎㈃ ?쒖＜(?귝윶) ?몃? 遺꾩꽍??媛?ν빀?덈떎'
                    : '쨌 Enter birth time for detailed Pillar analysis'}
                </p>
              )}
              {result.missingItems.photo && (
                <p className="text-yellow-200/60 text-sm">
                  {locale === 'ko'
                    ? '· 사진을 추가하면 관상 분석이 포함됩니다.'
                    : '쨌 Add a photo for face reading analysis'}
                </p>
              )}
              <button
                className="btn-secondary w-full mt-3 text-sm"
                onClick={() => router.push(analysisStartPath)}
              >
                {locale === 'ko' ? '?ㅼ떆 遺꾩꽍?섍린' : 'Analyze Again'}
              </button>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-yellow-900/10 border border-yellow-900/20 rounded-xl p-4 mb-6">
          <p className="text-yellow-200/40 text-xs leading-relaxed text-center">
            {locale === 'ko' 
              ? '蹂?遺꾩꽍? ?꾪넻 ?숈뼇泥좏븰 ?대줎??湲곕컲?쇰줈 ?앹꽦??李멸퀬 ?먮즺?낅땲?? ?щ?? ?먭린 ?댄빐瑜??꾪븳 ?⑸룄濡??쒖슜?섏떆怨? 以묒슂??寃곗젙? ?꾨Ц媛? ?곷떞?섏떆湲?諛붾엻?덈떎. 媛숈? ?앸뀈?붿씪?쒕줈 遺꾩꽍?섎㈃ ??긽 ?숈씪??寃곌낵媛 ?섏샃?덈떎.'
              : 'This analysis is based on traditional Eastern philosophy. Please use it for entertainment and self-understanding. Consult a professional for important decisions. Same birth data always yields the same results.'}
          </p>
        </div>

        {/* Share actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <p className="w-full text-yellow-200/50 text-xs text-center mb-3">
            {locale === 'ko'
              ? '개인 결과는 이 기기에서만 보관됩니다. 공유 시에는 새 분석 페이지 링크만 전달됩니다.'
              : 'Private results stay on this device. Sharing only sends the analysis start page.'}
          </p>
          <button
            className="share-btn share-kakao flex-1 justify-center"
            onClick={handleKakaoShare}
          >
            <span>💬</span>
            <span>{locale === 'ko' ? '카카오톡 공유' : 'Share Kakao'}</span>
          </button>
          <button
            className="share-btn share-link flex-1 justify-center"
            onClick={handleCopyLink}
          >
            <span>{copied ? '✅' : '🔗'}</span>
            <span>{copied ? (locale === 'ko' ? '복사됨!' : 'Copied!') : (locale === 'ko' ? '분석 페이지 링크 복사' : 'Copy Analysis Link')}</span>
          </button>
        </div>

        <ResultNextSteps locale={locale} current="combined" />

        {/* Related articles */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-yellow-100 mb-4">
            {locale === 'ko' ? '관련 글 더보기' : 'More Related Articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { 
                titleKo: '?ъ＜?붿옄 湲곗큹: 泥쒓컙吏吏? 臾댁뾿?멸?', 
                titleEn: 'Four Pillars Basics: What is Cheongan Jiji?',
                href: `/${locale}/saju` 
              },
              { 
                titleKo: '?깅챸?숈쑝濡??대쫫 ?댁꽭 ?뚯븘蹂닿린', 
                titleEn: 'Learn Fortune through Name Analysis',
                href: `/${locale}/name` 
              },
              { 
                titleKo: '愿?곸쑝濡?蹂대뒗 ?깃꺽怨??대챸', 
                titleEn: 'Personality and Fate via Face Reading',
                href: `/${locale}/face` 
              },
              { 
                titleKo: 'MBTI와 사주를 함께 보는 이유',
                titleEn: 'Mysterious Link between MBTI and Saju',
                href: `/${locale}/mbti` 
              },
              { 
                titleKo: '?ㅽ뻾(雅붻죱) ?꾨꼍 ?댄빐 媛?대뱶', 
                titleEn: 'Perfect Guide to the Five Elements',
                href: `/${locale}/saju` 
              },
              { 
                titleKo: '?ъ＜濡??뚯븘蹂대뒗 吏곸뾽 ?곸꽦', 
                titleEn: 'Career Aptitude via Four Pillars',
                href: `/${locale}/saju` 
              },
            ].map((post, i) => (
              <a
                key={i}
                href={post.href}
                className="card-dark p-4 hover:border-yellow-500/40 transition-all group"
              >
                <p className="text-yellow-200/80 text-sm group-hover:text-yellow-300 transition-colors">
                  ?뱞 {locale === 'ko' ? post.titleKo : post.titleEn}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom ad */}
        <div className="flex justify-center py-4">
          <AdSense slot="4455667788" format="rectangle" />
        </div>
      </main>

      <Footer />
    </div>
  );
}

