import Link from 'next/link';
import { buildLocalizedHref } from '@/lib/seo';

type ResultType = 'combined' | 'saju' | 'gwansang' | 'personality' | 'seongmyeong';

interface Props {
  locale: string;
  current: ResultType;
}

const ANALYSIS_LINKS = {
  combined: '/combined',
  saju: '/saju-analysis',
  gwansang: '/gwansang-analysis',
  personality: '/personality-analysis',
  seongmyeong: '/seongmyeong-analysis',
} as const;

export default function ResultNextSteps({ locale, current }: Props) {
  const isKo = locale === 'ko';

  const nextAnalyses = [
    {
      key: 'combined' as const,
      titleKo: '종합 분석 다시 보기',
      titleEn: 'Run Combined Analysis',
      descKo: '입력 항목을 함께 반영한 교차 해석을 확인합니다.',
      descEn: 'Cross-check multiple inputs in one combined reading.',
    },
    {
      key: 'saju' as const,
      titleKo: '사주 해석 이어보기',
      titleEn: 'Continue with Saju',
      descKo: '생년월일을 중심으로 시기와 흐름을 더 봅니다.',
      descEn: 'Review timing, cycles, and core chart patterns.',
    },
    {
      key: 'gwansang' as const,
      titleKo: '관상 분석 이어보기',
      titleEn: 'Continue with Face Reading',
      descKo: '사진 기반 해석을 추가로 확인합니다.',
      descEn: 'Add a face-based reading for visual traits.',
    },
    {
      key: 'personality' as const,
      titleKo: 'MBTI 성향 보기',
      titleEn: 'Review MBTI Profile',
      descKo: '성격 축과 오행 연결 해석을 확인합니다.',
      descEn: 'Check personality axes with Eastern element mapping.',
    },
    {
      key: 'seongmyeong' as const,
      titleKo: '성명학 분석 보기',
      titleEn: 'Review Name Reading',
      descKo: '이름의 수리와 발음 해석을 확인합니다.',
      descEn: 'Check name numbers and sound-based interpretation.',
    },
  ].filter((item) => item.key !== current);

  const guideLinks = [
    { href: buildLocalizedHref(locale, '/saju'), titleKo: '사주 가이드 모아보기', titleEn: 'Browse Saju Guides' },
    { href: buildLocalizedHref(locale, '/name-reading'), titleKo: '성명학 글 더보기', titleEn: 'Browse Name Reading Guides' },
    { href: buildLocalizedHref(locale, '/face-reading'), titleKo: '관상 글 더보기', titleEn: 'Browse Face Reading Guides' },
    { href: buildLocalizedHref(locale, '/mbti'), titleKo: 'MBTI 글 더보기', titleEn: 'Browse MBTI Guides' },
    { href: buildLocalizedHref(locale, '/compatibility'), titleKo: '궁합 글 더보기', titleEn: 'Browse Compatibility Guides' },
  ];

  return (
    <div className="card-dark p-5 mb-8">
      <div className="mb-5">
        <h2 className="text-base font-bold text-yellow-300 mb-1">
          {isKo ? '다음으로 이어서 보기' : 'Continue Exploring'}
        </h2>
        <p className="text-yellow-200/50 text-xs">
          {isKo
            ? '다른 분석과 가이드를 함께 보면 패턴 비교와 재방문 흐름이 더 자연스럽습니다.'
            : 'Move into another analysis or a guide to compare patterns and keep exploring.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        {nextAnalyses.map((item) => (
          <Link
            key={item.key}
            href={buildLocalizedHref(locale, ANALYSIS_LINKS[item.key])}
            className="rounded-xl border border-yellow-700/20 bg-yellow-900/10 p-4 hover:border-yellow-500/40 transition-colors"
          >
            <p className="text-yellow-200 text-sm font-bold mb-1">
              {isKo ? item.titleKo : item.titleEn}
            </p>
            <p className="text-yellow-100/60 text-xs leading-relaxed">
              {isKo ? item.descKo : item.descEn}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {guideLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-white/10 bg-white/5 p-3 hover:border-yellow-500/30 transition-colors"
          >
            <p className="text-white/80 text-sm">
              {isKo ? item.titleKo : item.titleEn}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-yellow-700/20 bg-yellow-900/10 p-4">
        <p className="text-yellow-200 text-sm font-medium mb-1">
          {isKo ? '운영 기준도 함께 확인하세요' : 'Review how this service is run'}
        </p>
        <p className="text-yellow-100/60 text-xs leading-relaxed mb-3">
          {isKo
            ? '편집 기준, 개인정보 처리 방향, 광고 운영 원칙을 보면 결과 해석의 기준도 더 쉽게 이해할 수 있습니다.'
            : 'Our editorial policy explains review standards, privacy handling, and ad-supported operation.'}
        </p>
        <Link
          href={buildLocalizedHref(locale, '/about')}
          className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-black/20 px-3 py-1.5 text-xs font-medium text-yellow-200/80 hover:text-yellow-100 hover:border-yellow-400/40 transition-colors"
        >
          <span>{isKo ? '운영 원칙 보기' : 'View Editorial Policy'}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
