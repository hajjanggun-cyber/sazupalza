'use client';

export const dynamic = 'force-dynamic';

import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { calculateSaju } from '../../../lib/calculator/saju-calculator';
import { calculateName } from '../../../lib/calculator/name-calculator';
import { generateResult, ComprehensiveResult } from '../../../lib/calculator/result-generator';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import AdSense from '../../../components/AdSense';

function ResultContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const [result, setResult] = useState<ComprehensiveResult | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);

  const name = searchParams.get('name') || '';
  const year = parseInt(searchParams.get('year') || '1990');
  const month = parseInt(searchParams.get('month') || '1');
  const day = parseInt(searchParams.get('day') || '1');
  const hourParam = searchParams.get('hour');
  const mbtiParam = searchParams.get('mbti') || undefined;
  const hasPhoto = searchParams.get('hasPhoto') === '1';

  useEffect(() => {
    if (!name || !year) {
      router.push(`/${locale}`);
      return;
    }

    try {
      const saju = calculateSaju({
        year, month, day,
        hour: hourParam !== null ? parseInt(hourParam) : undefined,
      });

      const nameResult = calculateName(name);

      const comprehensiveResult = generateResult({
        saju,
        name: nameResult,
        face: hasPhoto ? {
          faceShape: '타원형',
          mainFeatures: ['균형 잡힌 이목구비', '온화한 인상'],
          score: 82,
          summary: '균형 잡힌 관상으로 대인관계에 유리한 기운이 있습니다',
        } : undefined,
        mbtiType: mbtiParam,
      });

      setResult(comprehensiveResult);
    } catch (err) {
      console.error('결과 생성 오류:', err);
    }
  }, []);

  const handleUnlock = () => {
    // 애드센스 광고 표시 후 잠금 해제
    // 실제 구현 시 광고 완료 콜백 후 setUnlocked(true)
    setUnlocked(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleKakaoShare = () => {
    // 카카오 SDK 연동 (추후 구현)
    alert('카카오톡 공유 기능은 카카오 개발자 등록 후 사용 가능합니다.');
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-400 text-4xl mb-4 animate-spin">✨</div>
          <p className="text-yellow-200">분석 중...</p>
        </div>
      </div>
    );
  }

  const ratingColor = (score: number) =>
    score >= 80 ? 'text-yellow-400' : score >= 65 ? 'text-green-400' : 'text-blue-400';

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* 상단 광고 */}
      <div className="flex justify-center py-3 bg-[#0d0502]">
        <AdSense slot="2233445566" format="horizontal" />
      </div>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-100">
            {name}님의 종합 분석 결과
          </h1>
          <p className="text-yellow-200/60 text-sm mt-2">
            {year}년 {month}월 {day}일
            {hourParam !== null && ` · ${hourParam}시`}
            {mbtiParam && ` · ${mbtiParam}`}
          </p>
        </div>

        {/* 종합 점수 */}
        <div className="card-dark p-6 mb-6 text-center">
          <p className="text-yellow-200/70 text-sm mb-2">종합 점수</p>
          <div className={`text-6xl font-bold mb-4 ${ratingColor(result.scores.total)}`}>
            {result.scores.total}
            <span className="text-2xl text-yellow-200/60">점</span>
          </div>

          {/* 4가지 점수 바 */}
          <div className="space-y-3">
            {[
              { label: '사주', score: result.scores.saju },
              { label: '성명학', score: result.scores.name },
              { label: '관상', score: result.scores.face, hidden: !hasPhoto },
              { label: 'MBTI', score: result.scores.mbti, hidden: !mbtiParam },
            ].filter(item => !item.hidden).map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-yellow-200/80">{item.label}</span>
                  <span className={`font-bold ${ratingColor(item.score)}`}>{item.score}점</span>
                </div>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 분석 근거 박스 */}
        <div className="analysis-box mb-6">
          <p className="text-yellow-400/90 mb-2 text-xs font-bold">📊 분석 근거</p>
          <p className="text-yellow-200/80">{result.analysisBox.ilgan}</p>
          <p className="text-yellow-200/80">{result.analysisBox.wolji}</p>
          <p className="text-yellow-200/80">수리: 원격{result.analysisBox.wongyeok} / 형격{result.analysisBox.hyeongyeok}</p>
          <p className="text-yellow-200/80">소리오행: {result.analysisBox.soundOhaeng}</p>
          {result.analysisBox.mbtiOhaeng && (
            <p className="text-yellow-200/80">{result.analysisBox.mbtiOhaeng}</p>
          )}
        </div>

        {/* 3줄 요약 (무료 공개) */}
        <div className="card-dark p-6 mb-6">
          <h2 className="text-lg font-bold text-yellow-400 mb-4">📝 3줄 요약</h2>
          <div className="space-y-3">
            {result.summaryLines.map((line, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-yellow-500 font-bold shrink-0">{i + 1}.</span>
                <p className="text-yellow-200/90 text-sm leading-relaxed">{line}</p>
              </div>
            ))}
          </div>

          {/* 누락 항목 안내 */}
          {result.missingItems.mbti && (
            <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg text-xs text-yellow-300/70">
              💡 MBTI 입력 시 성격 분석 추가
            </div>
          )}
          {result.missingItems.time && (
            <div className="mt-2 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg text-xs text-yellow-300/70">
              💡 시간 입력 시 더 정확한 사주 분석 가능
            </div>
          )}
          {result.missingItems.photo && (
            <div className="mt-2 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg text-xs text-yellow-300/70">
              💡 사진 추가 시 관상 분석 포함
            </div>
          )}
        </div>

        {/* 중간 광고 */}
        <div className="flex justify-center py-4">
          <AdSense slot="3344556677" format="rectangle" />
        </div>

        {/* 상세 리포트 잠금/해제 */}
        <div className="card-dark mb-6 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-bold text-yellow-400 mb-4">📋 상세 리포트</h2>
            <p className="text-yellow-200/60 text-xs mb-4">직업 / 재물 / 연애 / 건강 / 개운법</p>
          </div>

          {unlocked ? (
            // 잠금 해제된 상세 내용
            <div className="px-6 pb-6 space-y-5 fade-in">
              {[
                { icon: '💼', title: '직업 운세', content: result.detailedReport.career },
                { icon: '💰', title: '재물 운세', content: result.detailedReport.wealth },
                { icon: '💕', title: '연애 운세', content: result.detailedReport.love },
                { icon: '🏥', title: '건강 운세', content: result.detailedReport.health },
                { icon: '🍀', title: '개운법', content: result.detailedReport.luckyCharm },
              ].map((item) => (
                <div key={item.title} className="border-t border-yellow-900/30 pt-4">
                  <h3 className="text-yellow-300 font-bold mb-2">
                    {item.icon} {item.title}
                  </h3>
                  <p className="text-yellow-200/80 text-sm leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          ) : (
            // 잠금 화면
            <div className="relative">
              <div className="locked-overlay px-6 pb-6 space-y-4">
                {['직업 운세', '재물 운세', '연애 운세'].map((item) => (
                  <div key={item} className="border-t border-yellow-900/30 pt-3">
                    <p className="text-yellow-300/40 font-bold text-sm mb-1">{item}</p>
                    <p className="text-yellow-200/30 text-sm">
                      ████████████████████████████████████████
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-gradient-to-t from-[#2d1810] to-transparent">
                <div className="text-center">
                  <p className="text-yellow-400 font-bold text-lg mb-1">
                    🎁 광고 1회만 보시면
                  </p>
                  <p className="text-yellow-200/70 text-sm mb-4">
                    전체 리포트를 무료로 받으실 수 있어요!
                  </p>
                  <p className="text-yellow-200/50 text-xs mb-4">
                    ✅ 본 서비스는 입력하신 개인정보 및 사진을 수집·저장하지 않습니다.
                  </p>
                  <button className="btn-primary" onClick={handleUnlock}>
                    무료로 전체 결과 보기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 면책 문구 */}
        <div className="bg-yellow-900/10 border border-yellow-900/30 rounded-lg p-4 mb-6">
          <p className="text-yellow-200/50 text-xs leading-relaxed text-center">
            본 분석은 전통 동양철학 이론을 기반으로 AI가 생성한 참고 자료입니다.
            재미와 자기 이해를 위한 용도로 활용하시고 중요한 결정은 전문가와 상담하시기 바랍니다.
            같은 생년월일시로 분석하면 항상 동일한 결과가 나옵니다.
          </p>
        </div>

        {/* 공유 버튼 */}
        <div className="flex gap-3 mb-8">
          <button
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
            onClick={handleKakaoShare}
          >
            <span>💬</span>
            <span>카카오톡 공유</span>
          </button>
          <button
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
            onClick={handleCopyLink}
          >
            <span>{copied ? '✅' : '🔗'}</span>
            <span>{copied ? '복사됨!' : '링크 복사'}</span>
          </button>
        </div>

        {/* 관련 글 더보기 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-yellow-100 mb-4">관련 글 더보기</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { title: '사주팔자 기초: 천간지지란 무엇인가', href: `/${locale}/saju` },
              { title: '성명학으로 이름 운세 알아보기', href: `/${locale}/name` },
              { title: '관상으로 보는 성격과 운명', href: `/${locale}/face` },
              { title: 'MBTI와 사주의 신기한 연관성', href: `/${locale}/mbti` },
              { title: '오행(五行) 완벽 이해 가이드', href: `/${locale}/saju` },
              { title: '사주로 알아보는 직업 적성', href: `/${locale}/saju` },
            ].map((post, i) => (
              <a
                key={i}
                href={post.href}
                className="card-dark p-4 hover:border-yellow-500/40 transition-all group"
              >
                <p className="text-yellow-200/80 text-sm group-hover:text-yellow-300 transition-colors">
                  📄 {post.title}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* 하단 광고 */}
        <div className="flex justify-center py-4">
          <AdSense slot="4455667788" format="rectangle" />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-yellow-200">분석 중...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
