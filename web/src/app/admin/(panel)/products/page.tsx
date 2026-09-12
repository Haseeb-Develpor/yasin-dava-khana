import Link from "next/link";
import { deleteProduct, saveCategory } from "@/actions/admin";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { sortOrder: "asc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-maroon">ادویات</h1>
        <Link href="/admin/products/new" className="rounded-lg bg-maroon px-4 py-2 text-white">
          نئی دوا
        </Link>
      </div>
      <form action={saveCategory} className="mt-4 flex flex-wrap gap-2">
        <input name="name" required placeholder="نئی قسم کا نام" className="rounded-lg border px-3 py-2" />
        <button className="rounded-lg border border-maroon px-3 py-2">قسم شامل کریں</button>
      </form>
      <p className="mt-2 text-xs text-ink/50">موجودہ اقسام: {categories.map((c) => c.name).join("، ")}</p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-gold/40 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-parchment">
            <tr>
              <th className="p-3 text-right">تصویر</th>
              <th className="p-3 text-right">نام</th>
              <th className="p-3 text-right">قیمت</th>
              <th className="p-3 text-right">شائع</th>
              <th className="p-3 text-right">عمل</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-gold/30">
                <td className="p-3">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt="" className="h-16 w-12 rounded object-cover" />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">{formatPrice(p.price)}</td>
                <td className="p-3">{p.published ? "ہاں" : "نہیں"}</td>
                <td className="p-3">
                  <Link href={`/admin/products/${p.id}`} className="text-green underline">
                    ترمیم
                  </Link>
                  <form action={deleteProduct} className="inline">
                    <input type="hidden" name="id" value={p.id} />
                    <button className="mr-3 text-red-700 underline">حذف</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
