import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import { buildLocaleAlternates, buildLocalizedHref } from '@/lib/seo';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isKo = locale === 'ko';

  return {
    title: isKo ? '운영 원칙 및 편집 기준 | 사주팔자닷컴' : 'About & Editorial Policy | SajuPalza',
    description: isKo
      ? '사주팔자닷컴의 운영 목적, 편집 기준, 개인정보 처리 방향, 광고 운영 원칙을 안내합니다.'
      : 'Learn how SajuPalza handles editorial review, privacy, analysis scope, and ad-supported operations.',
    alternates: buildLocaleAlternates(locale, '/about'),
  };
}

export default async function AboutPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const isKo = locale === 'ko';

  const principles = isKo
    ? [
        {
          title: '편집 기준',
          body: '콘텐츠는 전통 해석 개념을 현대 독자가 읽기 쉽게 재구성한 참고 자료입니다. 과장된 확정 표현보다는 경향성과 해석 중심 문장을 우선합니다.',
        },
        {
          title: '분석 결과 해석 범위',
          body: '분석 결과는 자기 이해와 비교 해석을 돕기 위한 참고 정보입니다. 건강, 법률, 투자, 진로와 같은 중요한 결정은 별도의 전문가 판단이 필요합니다.',
        },
        {
          title: '개인정보 처리 방향',
          body: '입력 정보와 결과 데이터는 서버에 저장하지 않으며, 현재 기기 브라우저에만 임시 보관될 수 있습니다. 공유 기능은 개인 결과가 아니라 새 분석 시작 페이지 링크만 전달합니다.',
        },
        {
          title: '광고 운영 원칙',
          body: '이 서비스는 광고 수익으로 운영되지만, 광고 노출보다 검색 신뢰와 콘텐츠 이해도를 우선합니다. 핵심 설명 영역을 가리는 방식의 공격적 광고 배치는 지양합니다.',
        },
      ]
    : [
        {
          title: 'Editorial Standard',
          body: 'Our guides reorganize traditional interpretation into readable reference content. We aim to present tendencies and interpretations rather than overconfident guarantees.',
        },
        {
          title: 'Scope of Analysis',
          body: 'Results are designed for reflection, comparison, and self-understanding. Important health, legal, financial, and career decisions should be reviewed with qualified professionals.',
        },
        {
          title: 'Privacy Direction',
          body: 'Input and result data are not stored on our servers. Temporary result data may stay only in the current device browser, and sharing sends only a fresh analysis start-page link.',
        },
        {
          title: 'Advertising Policy',
          body: 'This service is ad-supported, but search trust and content clarity come before aggressive ad placement. We avoid letting ads overshadow the core reading experience.',
        },
      ];

  const reviewPoints = isKo
    ? [
        '핵심 페이지는 발행일과 수정일을 함께 관리합니다.',
        '다국어 페이지는 ko / en / x-default 기준으로 메타를 맞춥니다.',
        '블로그 문구는 과장형 카피를 점진적으로 줄이고 있습니다.',
        '동적 대표 이미지를 사용해 글별 공유 품질을 유지합니다.',
      ]
    : [
        'Key pages track both published and updated dates.',
        'Localized pages follow ko / en / x-default metadata rules.',
        'Marketing-heavy phrasing is being gradually softened across blog content.',
        'Dynamic article covers are used to improve sharing quality per page.',
      ];

  const teamSignals = isKo
    ? [
        '운영 주체: 사주팔자닷컴 편집팀',
        '운영 목적: 검색 유입 기반 무료 분석 서비스 운영 및 광고 수익화',
        '콘텐츠 기준: 자동 생성 문구를 그대로 노출하지 않고 가독성과 과장 표현을 재검토',
      ]
    : [
        'Operating team: SajuPalza Editorial Team',
        'Primary goal: run a free search-driven analysis service supported by ads',
        'Content standard: generated phrasing is reviewed for readability and reduced overclaiming',
      ];

  const supportStandards = isKo
    ? [
        '문의 채널: Contact 페이지 이메일 접수',
        '1차 응답 목표: 영업일 기준 2~3일 이내',
        '정책 변경 시: Privacy, Terms, About 페이지를 함께 업데이트',
      ]
    : [
        'Support channel: email intake through the Contact page',
        'First response target: within 2-3 business days',
        'Policy changes: Privacy, Terms, and About pages are updated together',
      ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <header className="text-center mb-10">
          <p className="text-yellow-300 text-xs font-bold uppercase tracking-[0.18em] mb-3">
            {isKo ? 'About SajuPalza' : 'About SajuPalza'}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-100 mb-4">
            {isKo ? '운영 원칙 및 편집 기준' : 'About & Editorial Policy'}
          </h1>
          <p className="text-yellow-200/70 max-w-2xl mx-auto leading-relaxed">
            {isKo
              ? '검색 유입과 광고 수익은 중요하지만, 장기적으로는 신뢰 가능한 콘텐츠 구조가 먼저라는 기준으로 운영합니다.'
              : 'Search traffic and ad revenue matter, but long-term trust depends on a clearer content structure first.'}
          </p>
        </header>

        <section className="card-dark p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-yellow-300 mb-5">
            {isKo ? '핵심 운영 원칙' : 'Core Operating Principles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {principles.map((item) => (
              <div key={item.title} className="rounded-2xl border border-yellow-900/30 bg-yellow-900/10 p-5">
                <h3 className="text-yellow-200 font-bold mb-2">{item.title}</h3>
                <p className="text-yellow-100/70 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="card-dark p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-yellow-300 mb-4">
            {isKo ? '현재 적용 중인 품질 신호' : 'Current Quality Signals'}
          </h2>
          <ul className="space-y-3">
            {reviewPoints.map((item) => (
              <li key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-yellow-100/75">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="card-dark p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold text-yellow-300 mb-4">
                {isKo ? '운영자 및 편집 주체' : 'Operator & Editorial Ownership'}
              </h2>
              <ul className="space-y-3">
                {teamSignals.map((item) => (
                  <li key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-yellow-100/75">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-yellow-300 mb-4">
                {isKo ? '문의 응답 기준' : 'Support Response Standard'}
              </h2>
              <ul className="space-y-3">
                {supportStandards.map((item) => (
                  <li key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-yellow-100/75">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="card-dark p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-yellow-300 mb-4">
            {isKo ? '관련 안내' : 'Related Policies'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link href={buildLocalizedHref(locale, '/privacy')} className="rounded-xl border border-yellow-900/30 bg-yellow-900/10 p-4 hover:border-yellow-500/30 transition-colors">
              <p className="text-yellow-200 font-medium mb-1">{isKo ? '개인정보처리방침' : 'Privacy Policy'}</p>
              <p className="text-yellow-100/60 text-sm">{isKo ? '저장 방식과 보관 범위를 확인합니다.' : 'Review storage and retention behavior.'}</p>
            </Link>
            <Link href={buildLocalizedHref(locale, '/terms')} className="rounded-xl border border-yellow-900/30 bg-yellow-900/10 p-4 hover:border-yellow-500/30 transition-colors">
              <p className="text-yellow-200 font-medium mb-1">{isKo ? '이용약관' : 'Terms of Service'}</p>
              <p className="text-yellow-100/60 text-sm">{isKo ? '서비스 범위와 면책 기준을 확인합니다.' : 'Review service scope and disclaimers.'}</p>
            </Link>
            <Link href={buildLocalizedHref(locale, '/contact')} className="rounded-xl border border-yellow-900/30 bg-yellow-900/10 p-4 hover:border-yellow-500/30 transition-colors">
              <p className="text-yellow-200 font-medium mb-1">{isKo ? '문의 및 FAQ' : 'Contact & FAQ'}</p>
              <p className="text-yellow-100/60 text-sm">{isKo ? '운영 문의와 자주 묻는 질문을 확인합니다.' : 'Find support details and common questions.'}</p>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
