import { sajuPosts } from './saju-posts';
import { seongmyeongPosts } from './seongmyeong-posts';
import { gwansangPosts } from './gwansang-posts';
import { mbtiPosts } from './mbti-posts';
import { bokhapPosts } from './bokhap-posts';
import { BlogPost } from './types';

export { sajuPosts, seongmyeongPosts, gwansangPosts, mbtiPosts, bokhapPosts };
export type { BlogPost };

export const allPosts: BlogPost[] = [
  ...sajuPosts,
  ...seongmyeongPosts,
  ...gwansangPosts,
  ...mbtiPosts,
  ...bokhapPosts,
];

export function getPostBySlug(category: string, slug: string): BlogPost | undefined {
  return allPosts.find(p => p.category === category && p.slug === slug);
}
