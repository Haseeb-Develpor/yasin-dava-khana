import { ProductCard } from "@/components/Cards";
import { Breadcrumb } from "@/components/shop/Breadcrumb";
import { ShopSidebar } from "@/components/shop/ShopSidebar";
import { categoryLabel } from "@/lib/labels";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";

export const metadata = { title: "Shop" };
export const dynamic = "force-dynamic";

export default async function MedicinesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const { q, cat } = await searchParams;
  const settings = await getSettings();
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(cat ? { category: { slug: cat } } : {}),
      ...(q
        ? {
            OR: [{ name: { contains: q } }, { nameEn: { contains: q } }, { description: { contains: q } }],
          }
        : {}),
    },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
  });

  const counts = Object.fromEntries(categories.map((c) => [c.slug, c._count.products]));
  const catRow = categories.find((c) => c.slug === cat);
  const catName = catRow ? categoryLabel(catRow.slug, catRow.name) : "";

  return (
    <div className="bg-white pb-16">
      <section className="bg-[#f6f1e8] py-8 text-center sm:py-12">
        <p className="text-xs font-semibold tracking-[0.2em] text-green">SHOP</p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl">{catName || "Herbal Medicines"}</h1>
        <p className="mx-auto mt-3 max-w-xl px-4 text-[#555]">Pure Unani medicines from Yasin Dava Khana, Dunyapur.</p>
      </section>
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:py-8">
        <Breadcrumb items={[{ href: "/medicines", label: "Shop" }, ...(catName ? [{ label: catName }] : [])]} />
        <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-10">
          <ShopSidebar categories={categories} active={cat} counts={counts} />
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3 text-sm text-[#777]">
              <p>Showing {products.length} results{q ? ` for “${q}”` : ""}</p>
              <p className="hidden sm:block">Default sorting</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} settings={settings} />
              ))}
            </div>
            {products.length === 0 ? <p className="mt-10 text-center text-[#777]">No products found.</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
