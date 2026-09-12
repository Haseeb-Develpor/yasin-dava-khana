export const catEn: Record<string, string> = {
  men: "Men's Health",
  women: "Women's Health",
  kidney: "Kidney Care",
  sugar: "Diabetes / Sugar",
  stones: "Stones",
  fever: "Fever Care",
  stomach: "Stomach Care",
  pain: "Pain & Joints",
};

export function categoryLabel(slug: string, fallback: string) {
  return catEn[slug] || fallback;
}
