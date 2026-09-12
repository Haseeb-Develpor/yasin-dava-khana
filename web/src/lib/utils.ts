export function formatPrice(pkr: number) {
  if (!pkr || pkr <= 0) return "Ask price";
  return `Rs${pkr.toLocaleString("en-PK")}.00`;
}

export function slugify(input: string) {
  const en = input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
  if (en.length > 2) return en;
  return `item-${Date.now()}`;
}

export function waLink(digits: string, text: string) {
  const num = digits.replace(/[^\d]/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}

export function orderMessage(itemName: string, price: number) {
  return `Hello, Yasin Dava Khana Dunyapur. I want to order / ask about "${itemName}". ${formatPrice(price)}.`;
}

export function lines(text: string) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function productTitle(p: { name: string; nameEn?: string | null }) {
  return p.nameEn || p.name;
}
