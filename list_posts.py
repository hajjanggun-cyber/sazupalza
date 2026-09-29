# -*- coding: utf-8 -*-
import re, sys

path = r'c:\Users\홈_메인\Desktop\11  11 실전코딩\sajupalza\lib\blog\saju-posts.ts'
with open(path, 'r', encoding='utf-8') as f:
    t = f.read()

# Find each top-level post block by looking for the pattern: "{\n    slug: '...'"
# Then extract slug, seoTitle, category from that block
blocks = re.split(r'\n  \{', t)

posts = []
for block in blocks:
    slug_m  = re.search(r"slug: '([^']+)'", block)
    title_m = re.search(r"seoTitle: '([^']+)'", block)
    cat_m   = re.search(r"category: '([^']+)'", block)
    if slug_m and title_m:
        posts.append({
            'slug': slug_m.group(1),
            'seoTitle': title_m.group(1),
            'category': cat_m.group(1) if cat_m else '?',
        })

print(f"총 {len(posts)}개 포스트\n")
print(f"{'#':>3}  {'카테고리':<10}  {'slug':<25}  {'seoTitle'}")
print("-" * 100)
for i, p in enumerate(posts, 1):
    print(f"{i:>3}. [{p['category']:<8}]  {p['slug']:<25}  {p['seoTitle']}")
