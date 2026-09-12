import { ProductForm } from "@/components/admin/ProductForm";
import { prisma } from "@/lib/prisma";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl text-maroon">نئی دوا</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
