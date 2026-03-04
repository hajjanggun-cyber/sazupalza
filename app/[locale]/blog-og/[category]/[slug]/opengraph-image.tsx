import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';
import {
  getBlogCategoryLabel,
  mapRouteCategoryToPostCategory,
} from '@/lib/blog/metadata';

export const alt = 'SajuPalza guide cover';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = {
  params: { locale: string; category: string; slug: string };
};

export default function BlogOgImage({ params }: Props) {
  const post = getPostBySlug(mapRouteCategoryToPostCategory(params.category), params.slug);
  const isKo = params.locale === 'ko';
  const title = post
    ? (isKo ? (post.seoTitle || post.title) : (post.seoTitleEn || post.seoTitle || post.title))
    : (isKo ? '사주팔자 가이드' : 'SajuPalza Guide');
  const category = getBlogCategoryLabel(params.category, params.locale);
  const description = isKo
    ? '전통 해석을 현대적으로 정리한 참고 가이드'
    : 'Reference guide based on traditional interpretation and modern editorial review';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'radial-gradient(circle at top right, rgba(217, 119, 6, 0.30), transparent 32%), linear-gradient(145deg, #0f172a 0%, #1f2937 45%, #111827 100%)',
          color: '#fef3c7',
          padding: '54px 64px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 18px',
              borderRadius: 999,
              border: '1px solid rgba(251, 191, 36, 0.35)',
              background: 'rgba(251, 191, 36, 0.10)',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            <span>{category}</span>
          </div>
          <div style={{ fontSize: 20, letterSpacing: '0.16em', color: 'rgba(253, 224, 71, 0.72)' }}>
            SAJUPALZA
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
              maxWidth: '92%',
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 26, color: 'rgba(254, 243, 199, 0.72)', maxWidth: '82%', lineHeight: 1.4 }}>
            {description}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(251, 191, 36, 0.18)',
            paddingTop: 22,
            fontSize: 20,
            color: 'rgba(254, 243, 199, 0.64)',
          }}
        >
          <span>{isKo ? '편집 검토 및 참고 가이드' : 'Editorially reviewed reference guide'}</span>
          <span>1200x630 SEO Cover</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
