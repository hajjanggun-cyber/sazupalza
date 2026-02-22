export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;       // 60자 이내 SEO 제목
  description: string;    // 160자 이내 메타 디스크립션
  keywords: string[];     // 핵심 키워드 5개
  publishedAt: string;    // YYYY-MM-DD
  category: 'saju' | 'seongmyeong' | 'gwansang' | 'mbti' | 'bokhap';
  contentKo: string;      // 한국어 HTML 본문
  contentEn: string;      // 영어 HTML 본문
  toc: { id: string; title: string }[];
  faq: { q: string; a: string }[];
  relatedPosts: { slug: string; title: string; category: string }[];
}
