import type { Category, Product } from "@/generated/prisma/client";
import { saveProduct } from "@/actions/admin";
import { ImageField } from "@/components/ImageField";

export function ProductForm({
  product,
  categories,
}: {
  product?: Product | null;
  categories: Category[];
}) {
  return (
    <form action={saveProduct} className="max-w-2xl space-y-4 rounded-2xl border border-gold/40 bg-white p-6">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}
      <label className="block">
        <span>نام (اردو)</span>
        <input name="name" required defaultValue={product?.name} className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <label className="block">
        <span>انگریزی نام / سلگ</span>
        <input name="nameEn" defaultValue={product?.nameEn} className="mt-1 w-full rounded-lg border px-3 py-2" dir="ltr" />
      </label>
      <label className="block">
        <span>سلگ (خالی چھوڑیں تو خود بنے گی)</span>
        <input name="slug" defaultValue={product?.slug} className="mt-1 w-full rounded-lg border px-3 py-2" dir="ltr" />
      </label>
      <label className="block">
        <span>قسم</span>
        <select name="categoryId" defaultValue={product?.categoryId || ""} className="mt-1 w-full rounded-lg border px-3 py-2">
          <option value="">—</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <ImageField name="imageUrl" defaultUrl={product?.imageUrl} label="تصویر" />
      <label className="block">
        <span>تفصیل</span>
        <textarea name="description" rows={3} defaultValue={product?.description} className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <label className="block">
        <span>فوائد (ہر فائدہ نئی لائن)</span>
        <textarea name="benefits" rows={5} defaultValue={product?.benefits} className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <label className="block">
        <span>طریقہ استعمال</span>
        <textarea name="usage" rows={3} defaultValue={product?.usage} className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <label className="block">
        <span>ہمراہ</span>
        <input name="takenWith" defaultValue={product?.takenWith} className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          شکل
          <input name="form" defaultValue={product?.form || "ٹیبلٹ"} className="mt-1 w-full rounded-lg border px-3 py-2" />
        </label>
        <label>
          مقدار
          <input name="quantity" defaultValue={product?.quantity} className="mt-1 w-full rounded-lg border px-3 py-2" />
        </label>
        <label>
          قیمت (روپے، 0 = پوچھیں)
          <input name="price" type="number" defaultValue={product?.price ?? 0} className="mt-1 w-full rounded-lg border px-3 py-2" dir="ltr" />
        </label>
        <label>
          ترتیب
          <input name="sortOrder" type="number" defaultValue={product?.sortOrder ?? 0} className="mt-1 w-full rounded-lg border px-3 py-2" dir="ltr" />
        </label>
      </div>
      <label className="block">
        کس کے لیے
        <select name="forWhom" defaultValue={product?.forWhom || "both"} className="mt-1 w-full rounded-lg border px-3 py-2">
          <option value="both">مرد و خواتین</option>
          <option value="men">مرد</option>
          <option value="women">خواتین</option>
        </select>
      </label>
      <label className="block">
        یونانی نوٹ
        <input name="unaniNote" defaultValue={product?.unaniNote} className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" name="featured" defaultChecked={product?.featured ?? false} />
        ہوم پیج پر نمایاں
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" name="published" defaultChecked={product?.published ?? true} />
        ویب سائٹ پر دکھائیں
      </label>
      <button className="rounded-lg bg-maroon px-6 py-2 text-white">محفوظ کریں</button>
    </form>
  );
}
