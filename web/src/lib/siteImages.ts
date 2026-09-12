import { prisma } from "@/lib/prisma";

export const SITE_FALLBACKS: Record<string, string> = {
  hero: "/hero-banner.png",
  logo: "/logo.jpg",
  "hakeem-yasin": "/elders/hakeem-yasin-oval.png",
  "hakeem-yunus": "/elders/hakeem-yunus.png",
  "hakeem-pair": "/elders/hakeems.png",
  sabir: "/elders/sabir-multani.png",
  "magazine-1": "/magazine/mufred-aza.png",
  "magazine-2": "/magazine/mufred-aza-2.png",
  qanoon: "/qanoon-chart.jpg",
  "purity-bg": "/ingredients/jari-booti-fresh.png",
  "purity-pure": "/ingredients/jari-booti-fresh.png",
  "purity-fake": "/ingredients/jari-booti-dried.png",
};

export function pic(map: Record<string, string>, slot: string, fallback?: string) {
  return map[slot] || fallback || SITE_FALLBACKS[slot] || "";
}

export async function getSiteImageMap() {
  const rows = await prisma.siteImage.findMany({ orderBy: { sortOrder: "asc" } });
  return Object.fromEntries(rows.map((r) => [r.slot, r.imageUrl]));
}

export async function getIngredientPics() {
  return prisma.siteImage.findMany({
    where: { group: "ingredients" },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getExtraPics() {
  return prisma.siteImage.findMany({
    where: { group: "extra" },
    orderBy: { sortOrder: "asc" },
  });
}
