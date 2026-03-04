import { buildLocalizedHref } from '@/lib/seo';

export type AnalysisShareKind =
  | 'combined'
  | 'saju'
  | 'gwansang'
  | 'personality'
  | 'seongmyeong';

const ANALYSIS_PATH_SUFFIX: Record<AnalysisShareKind, string> = {
  combined: '/combined',
  saju: '/saju-analysis',
  gwansang: '/gwansang-analysis',
  personality: '/personality-analysis',
  seongmyeong: '/seongmyeong-analysis',
};

export function getAnalysisStartPath(locale: string, kind: AnalysisShareKind): string {
  return buildLocalizedHref(locale, ANALYSIS_PATH_SUFFIX[kind]);
}

export function getAnalysisStartUrl(locale: string, kind: AnalysisShareKind): string {
  const path = getAnalysisStartPath(locale, kind);

  if (typeof window === 'undefined') {
    return path;
  }

  return `${window.location.origin}${path}`;
}
