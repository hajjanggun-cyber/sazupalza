import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import AdSense from '../../../components/AdSense';
import Link from 'next/link';
import { gwansangPosts } from '@/lib/blog/gwansang-posts';
import { buildLocalizedHref } from '@/lib/seo';
import { buildLocaleAlternates } from '@/lib/seo';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isKo = locale === 'ko';
  return {
    title: isKo
      ? '관상 무료 분석 - 얼굴로 알아보는 운명 | 사주팔자 무료 컨설팅'
      : 'Free Korean Face Reading & Physiognomy Analysis | SajuPalza',
    description: isKo
      ? '관상(觀相) 무료 분석. 얼굴형, 이목구비의 특성으로 알아보는 타고난 성향과 기운. AI 기반 브라우저 내 분석 - 서버 저장 없음.'
      : 'Free Korean Face Reading (Gwansang) analysis. Discover your innate character through facial features. AI analysis in browser - no server storage.',
    keywords: isKo
      ? ['관상 무료', '관상 분석', '얼굴 운세', '인상학', '관상학', '무료 관상']
      : ['Korean face reading free', 'physiognomy', 'face fortune reading', 'Korean gwansang'],
    alternates: buildLocaleAlternates(locale, '/face'),
  };
}

export default async function FacePage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const isKo = locale === 'ko';

  const faceFeatures = isKo
    ? [
      { icon: '👁️', part: '눈', desc: '성격, 감수성, 직관력을 나타내는 경향이 있습니다' },
      { icon: '👃', part: '코', desc: '의지력, 재물운, 자존감을 나타내는 경향이 있습니다' },
      { icon: '👄', part: '입', desc: '언변, 대인관계, 표현력을 나타내는 경향이 있습니다' },
      { icon: '🦷', part: '이마', desc: '지성, 리더십, 사회운을 나타내는 경향이 있습니다' },
      { icon: '👂', part: '귀', desc: '건강, 수명, 지혜를 나타내는 경향이 있습니다' },
      { icon: '🎭', part: '얼굴형', desc: '전체적인 기운과 오행 성향을 나타내는 경향이 있습니다' },
    ]
    : [
      { icon: '👁️', part: 'Eyes', desc: 'Tends to represent character, sensitivity, and intuition' },
      { icon: '👃', part: 'Nose', desc: 'Tends to represent willpower, wealth fortune, and self-esteem' },
      { icon: '👄', part: 'Mouth', desc: 'Tends to represent speech, relationships, and expressiveness' },
      { icon: '🦷', part: 'Forehead', desc: 'Tends to represent intelligence, leadership, and social fortune' },
      { icon: '👂', part: 'Ears', desc: 'Tends to represent health, longevity, and wisdom' },
      { icon: '🎭', part: 'Face Shape', desc: 'Tends to represent overall energy and Five Element tendencies' },
    ];

  const faceShapes = isKo
    ? [
      { name: '계란형', ohaeng: '토(土)', desc: '균형과 조화를 중시하는 경향이 있습니다' },
      { name: '둥근형', ohaeng: '수(水)', desc: '온화하고 포용력 있는 경향이 있습니다' },
      { name: '사각형', ohaeng: '금(金)', desc: '강한 의지와 실행력의 경향이 있습니다' },
      { name: '역삼각형', ohaeng: '화(火)', desc: '총명하고 창의적인 경향이 있습니다' },
      { name: '하트형', ohaeng: '화(火)', desc: '감수성 풍부하고 예술적인 경향이 있습니다' },
    ]
    : [
      { name: 'Oval', ohaeng: 'Earth (土)', desc: 'Tends to value balance and harmony' },
      { name: 'Round', ohaeng: 'Water (水)', desc: 'Tends to be gentle and inclusive' },
      { name: 'Square', ohaeng: 'Metal (金)', desc: 'Tends toward strong will and execution' },
      { name: 'Inverted Triangle', ohaeng: 'Fire (火)', desc: 'Tends to be intelligent and creative' },
      { name: 'Heart', ohaeng: 'Fire (火)', desc: 'Tends to be emotionally rich and artistic' },
    ];

  const faqs = isKo
    ? [
      { q: '관상이란 무엇인가요?', a: '관상(觀相)은 얼굴의 형태와 기색을 통해 사람의 성격, 기질, 운세를 읽는 전통 동양 학문입니다. 얼굴의 각 부위는 오행(五行)의 기운과 연결되어 있으며, 타고난 성향을 파악하는 데 참고할 수 있습니다.' },
      { q: '사진은 안전한가요?', a: '업로드하신 사진은 브라우저에서만 분석됩니다. 서버로 전송되거나 저장되지 않습니다. face-api.js 라이브러리를 사용하여 기기 내에서만 처리하며, 분석 완료 즉시 데이터가 삭제됩니다.' },
      { q: '관상 분석은 선택사항인가요?', a: '네, 관상 분석은 완전히 선택사항입니다. 사진 없이도 이름·생년월일만으로 사주팔자와 성명학 분석을 받으실 수 있습니다. 사진을 추가하면 관상 항목까지 함께 참고해 더 풍부한 해석을 볼 수 있습니다.' },
    ]
    : [
      { q: 'What is Face Reading?', a: 'Face Reading (Gwansang) is a traditional Eastern discipline that reads character, temperament, and fortune through facial form and color. Each facial feature is connected to Five Element energy, providing reference for understanding innate tendencies.' },
      { q: 'Is my photo safe?', a: 'Your uploaded photo is analyzed only in your browser. It is not transmitted to or stored on servers. We use the face-api.js library for on-device processing, and data is deleted immediately after analysis.' },
      { q: 'Is face analysis optional?', a: 'Yes, face analysis is completely optional. You can still receive Four Pillars and Name analysis without a photo. Adding a photo simply gives the reading one more layer of face-based context.' },
    ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <AdSense slot="8899001122" format="horizontal" className="max-w-full" />

      <main>
        {/* 히어로 섹션 */}
        <section className="relative py-14 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-5xl mb-4">👁️</div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-100 mb-4">
              {isKo ? '관상 무료 분석' : 'Free Korean Face Reading & Physiognomy'}
            </h1>
            <p className="text-yellow-200/70 text-lg mb-4 leading-relaxed">
              {isKo
                ? '얼굴의 형태와 기색으로 알아보는 타고난 성향\nAI 기반 브라우저 내 분석 - 서버에 저장되지 않습니다'
                : 'Discover innate character through facial form and energy\nAI analysis in browser - not stored on servers'}
            </p>
            <div className="flex justify-center gap-4 mb-6 text-sm text-yellow-300">
              <span>🔒 {isKo ? '사진 서버 저장 없음' : 'No photo server storage'}</span>
              <span>⚡ {isKo ? '즉시 분석' : 'Instant analysis'}</span>
            </div>
            <Link href={buildLocalizedHref(locale, '/gwansang-analysis')} className="btn-gold text-lg px-8 py-4">
              {isKo ? '지금 바로 무료 분석 시작 →' : 'Start Free Analysis Now →'}
            </Link>
          </div>
        </section>

        {/* 관상 부위 설명 */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
            {isKo ? '관상에서 보는 6가지 부위' : '6 Key Features in Face Reading'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {faceFeatures.map((f) => (
              <div key={f.part} className="card-dark p-4 text-center">
                <div className="text-3xl mb-2">{f.icon}</div>
                <h3 className="text-yellow-400 font-bold mb-1">{f.part}</h3>
                <p className="text-yellow-200/60 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 얼굴형과 오행 */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
            {isKo ? '얼굴형과 오행의 기운' : 'Face Shapes and Five Element Energy'}
          </h2>
          <div className="card-dark p-6">
            <div className="space-y-3">
              {faceShapes.map((shape) => (
                <div key={shape.name} className="flex items-center justify-between p-3 border-b border-yellow-900/20 last:border-0">
                  <span className="text-yellow-200 font-medium">{shape.name}</span>
                  <span className="text-yellow-500 text-sm">{shape.ohaeng}</span>
                  <span className="text-yellow-200/60 text-sm hidden md:block">{shape.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 중간 광고 */}
        <AdSense slot="9900112233" format="rectangle" />

        {/* 보안 안내 */}
        <section className="max-w-3xl mx-auto px-4 py-8">
          <div className="card-dark p-6">
            <h2 className="text-xl font-bold text-yellow-300 mb-4 text-center">
              {isKo ? '개인정보 보호 안내' : 'Privacy Protection Notice'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              {(isKo
                ? [
                  { icon: '🔒', title: '서버 저장 없음', desc: '사진이 서버로 전송되거나 저장되지 않습니다' },
                  { icon: '💻', title: '브라우저 내 처리', desc: '모든 분석이 내 기기에서만 처리됩니다' },
                  { icon: '🗑️', title: '즉시 삭제', desc: '분석 완료 후 데이터가 자동 삭제됩니다' },
                ]
                : [
                  { icon: '🔒', title: 'No Server Storage', desc: 'Photos are not transmitted to or stored on servers' },
                  { icon: '💻', title: 'Browser Processing', desc: 'All analysis is processed on your device only' },
                  { icon: '🗑️', title: 'Immediate Deletion', desc: 'Data is automatically deleted after analysis' },
                ]
              ).map((item) => (
                <div key={item.title}>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h3 className="text-yellow-400 font-bold mb-1 text-sm">{item.title}</h3>
                  <p className="text-yellow-200/60 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Blog Posts */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-center text-yellow-400 mb-5">
            {isKo ? '관상 자세히 알아보기' : 'Explore Face Reading Articles'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {gwansangPosts.map((post) => (
              <Link
                key={post.slug}
                href={buildLocalizedHref(locale, `/face-reading/${post.slug}`)}
                className="card-dark p-4 flex items-center justify-between group border border-transparent hover:border-yellow-500/40 transition-colors"
              >
                <span className="text-yellow-200/80 text-sm leading-snug">{isKo ? (post.seoTitle || post.title) : (post.seoTitleEn || post.title)}</span>
                <span className="text-yellow-500 ml-3 shrink-0 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
            {isKo ? '자주 묻는 질문' : 'FAQ'}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="card-dark p-5 group cursor-pointer">
                <summary className="text-yellow-200 font-medium list-none flex justify-between items-center">
                  Q. {faq.q}
                  <span className="text-yellow-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-yellow-200/70 text-sm leading-relaxed">A. {faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-xl mx-auto px-4 pb-16 text-center">
          <div className="card-dark p-8">
            <p className="text-yellow-200/80 mb-6">
              {isKo ? '✅ 관상 분석을 포함한 종합 분석을 무료로 받아보세요' : '✅ Get comprehensive analysis including face reading for free'}
            </p>
            <Link href={buildLocalizedHref(locale, '/gwansang-analysis')} className="btn-gold text-lg px-8 py-4 inline-block">
              {isKo ? '관상 무료 분석 시작 →' : 'Start Free Face Analysis →'}
            </Link>
          </div>
        </section>

        <div className="flex justify-center py-4">
          <AdSense slot="0011223344" format="rectangle" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
