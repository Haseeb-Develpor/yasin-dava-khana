import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/Cards";
import { Breadcrumb } from "@/components/shop/Breadcrumb";
import { ProductBoxes } from "@/components/shop/ProductBoxes";
import { QtyBox } from "@/components/shop/QtyBox";
import { SectionHeading } from "@/components/shop/SectionHeading";
import { categoryLabel } from "@/lib/labels";
import { prisma } from "@/lib/prisma";
import { copyFor, formEn } from "@/lib/productEn";
import { getSettings } from "@/lib/settings";
import { formatPrice, lines, orderMessage, waLink } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function MedicineDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { slug, published: true },
    include: { category: true },
  });
  if (!product) notFound();
  const settings = await getSettings();
  const copy = copyFor(product);
  const benefits = lines(copy.benefits);
  const related = await prisma.product.findMany({
    where: { published: true, id: { not: product.id }, categoryId: product.categoryId },
    take: 4,
  });
  const catName = product.category ? categoryLabel(product.category.slug, product.category.name) : "";

  return (
    <div className="bg-white pb-16">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:py-8">
        <Breadcrumb
          items={[
            { href: "/medicines", label: "Shop" },
            ...(product.category ? [{ href: `/medicines?cat=${product.category.slug}`, label: catName }] : []),
            { label: copy.title },
          ]}
        />

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="border border-gray-100 p-4 sm:p-8">
            {product.featured ? <span className="hot-badge">Hot</span> : null}
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={copy.title} className="mx-auto max-h-[560px] w-full object-contain" />
            ) : (
              <div className="flex h-80 items-center justify-center text-[#999]">Photo coming soon</div>
            )}
          </div>

          <div>
            <h1 className="font-display text-3xl text-[#1a1a1a] sm:text-4xl">{copy.title}</h1>
            <p className="mt-2 text-[#d4a017]">★★★★★ <span className="text-sm text-[#888]">(Ask the Hakeem)</span></p>
            <p className="mt-4 text-2xl font-semibold text-[#3d8b5a] sm:text-3xl">{formatPrice(product.price)}</p>
            <p className="mt-4 leading-8 text-[#555]">{copy.description}</p>
            <p className="mt-5 text-sm text-[#777]">
              SKU: {product.slug.toUpperCase()} · {formEn(product.quantity)} · {formEn(product.form)}
            </p>
            {copy.takenWith ? <p className="mt-1 text-sm text-[#555]">Take with: {copy.takenWith}</p> : null}
            <p className="mt-2 text-sm">
              Category:{" "}
              {product.category ? (
                <Link href={`/medicines?cat=${product.category.slug}`} className="text-green">
                  {catName}
                </Link>
              ) : (
                "General"
              )}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <QtyBox />
              <a
                href={waLink(settings.whatsapp1, orderMessage(copy.title, product.price))}
                target="_blank"
                rel="noreferrer"
                className="btn-cart min-w-[160px] flex-1 py-3 sm:max-w-xs"
              >
                Add to cart
              </a>
            </div>
            <a href={`tel:${settings.phone1}`} className="mt-3 inline-block text-sm font-semibold text-green">
              Call {settings.phone1}
            </a>
          </div>
        </div>

        <ProductBoxes
          description={copy.description}
          benefits={benefits}
          usage={
            copy.takenWith && !copy.usage.toLowerCase().includes("take with")
              ? `${copy.usage}\nTake with: ${copy.takenWith}`
              : copy.usage
          }
          extra={[
            { label: "SKU", value: product.slug.toUpperCase() },
            { label: "Pack", value: formEn(product.quantity) },
            { label: "Form", value: formEn(product.form) },
            { label: "Category", value: catName || "General" },
            { label: "For", value: product.forWhom === "men" ? "Men" : product.forWhom === "women" ? "Women" : "Men & Women" },
            ...(product.unaniNote ? [{ label: "Unani note", value: product.unaniNote }] : []),
          ]}
        />

        {related.length ? (
          <div className="mt-14">
            <SectionHeading title="Related products" />
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} settings={settings} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
