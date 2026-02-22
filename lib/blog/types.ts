export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;       // 60자 이내 SEO 제목
  seoTitleEn?: string;    // English SEO Title
  description: string;    // 160자 이내 메타 디스크립션
  descriptionEn?: string; // English Meta Description
  keywords: string[];     // 핵심 키워드 5개
  keywordsEn?: string[];  // English Keywords
  publishedAt: string;    // YYYY-MM-DD
  category: 'saju' | 'name-reading' | 'face-reading' | 'mbti' | 'compatibility';
  contentKo: string;      // 한국어 HTML 본문
  contentEn: string;      // 영어 HTML 본문
  toc: { id: string; title: string }[];
  tocEn?: { id: string; title: string }[];
  faq: { q: string; a: string }[];
  faqEn?: { q: string; a: string }[];
  relatedPosts: { slug: string; title: string; category: string }[];
}
