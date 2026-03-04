const EN_REPLACEMENTS: Array<[RegExp, string]> = [
  [/shockingly accurate/gi, 'high-detail'],
  [/startling accuracy/gi, 'notable detail'],
  [/the ultimate weapon/gi, 'a strong advantage'],
  [/the ultimate marker of/gi, 'a commonly cited marker of'],
  [/the ultimate art of/gi, 'a detailed approach to'],
  [/the ultimate shortcut/gi, 'a useful shortcut'],
  [/the ultimate lifelong companion/gi, 'a lasting personal label'],
  [/the undisputed king of/gi, 'a widely favored pattern in'],
  [/virtually guaranteed to/gi, 'more likely to'],
  [/practically guarantees/gi, 'strongly supports'],
  [/guarantees profound attraction/gi, 'often indicates strong attraction'],
  [/\bguarantees\b/gi, 'can support'],
  [/\bguaranteed\b/gi, 'more likely'],
  [/death sentence/gi, 'serious warning sign'],
  [/absolute secrets/gi, 'core principles'],
  [/absolute capacity/gi, 'overall capacity'],
  [/absolute social harmony/gi, 'strong social harmony'],
  [/absolutely have the power to/gi, 'can choose to'],
  [/exactly where the potholes are and where the scenic routes lie/gi, 'where friction may arise and where things may flow more smoothly'],
  [/massive visible success/gi, 'major visible progress'],
  [/massive success/gi, 'strong success'],
  [/massive social and financial capital/gi, 'substantial social and financial capital'],
  [/massive social support/gi, 'broad social support'],
  [/massive, serendipitous luck/gi, 'strong, favorable momentum'],
  [/massive empire/gi, 'large-scale legacy'],
  [/supreme power/gi, 'greater control'],
  [/supreme dominance/gi, 'strong leadership'],
  [/explosive financial success/gi, 'strong financial momentum'],
  [/explosive wealth/gi, 'strong wealth momentum'],
  [/explosive growth/gi, 'strong growth'],
  [/explosive good luck/gi, 'strong favorable momentum'],
  [/explosive friction/gi, 'intense friction'],
  [/explosive competitive drive/gi, 'intense competitive drive'],
  [/untouchable leadership/gi, 'high leadership presence'],
  [/virtually impossible/gi, 'difficult'],
];

const KO_REPLACEMENTS: Array<[RegExp, string]> = [
  [/충격적으로 정확/g, '상세하게 해석'],
  [/사실상 보장/g, '강하게 시사'],
  [/거의 보장/g, '가능성을 높게 시사'],
  [/보장하는/g, '뒷받침하는'],
  [/보장받습니다/g, '기대할 수 있습니다'],
  [/보장됩니다/g, '가능성이 높습니다'],
  [/폭발적인/g, '강한'],
  [/폭발적/g, '강한'],
];

export function softenBlogMarketingCopy(content: string): string {
  if (!content) {
    return content;
  }

  let next = content;

  for (const [pattern, replacement] of [...EN_REPLACEMENTS, ...KO_REPLACEMENTS]) {
    next = next.replace(pattern, replacement);
  }

  return next;
}
