import type { Book } from "@/generated/prisma/client";
import { saveBook } from "@/actions/admin";
import { ImageField } from "@/components/ImageField";

export function BookForm({ book }: { book?: Book | null }) {
  return (
    <form action={saveBook} className="max-w-2xl space-y-4 rounded-2xl border border-gold/40 bg-white p-6">
      {book ? <input type="hidden" name="id" value={book.id} /> : null}
      <label className="block">
        عنوان
        <input name="title" required defaultValue={book?.title} className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <label className="block">
        سلگ
        <input name="slug" defaultValue={book?.slug} className="mt-1 w-full rounded-lg border px-3 py-2" dir="ltr" />
      </label>
      <ImageField name="imageUrl" defaultUrl={book?.imageUrl} label="سرورق" />
      <label className="block">
        تفصیل
        <textarea name="description" rows={5} defaultValue={book?.description} className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <label className="block">
        قیمت (روپے)
        <input name="price" type="number" defaultValue={book?.price ?? 0} className="mt-1 w-full rounded-lg border px-3 py-2" dir="ltr" />
      </label>
      <label className="block">
        ترتیب
        <input name="sortOrder" type="number" defaultValue={book?.sortOrder ?? 0} className="mt-1 w-full rounded-lg border px-3 py-2" dir="ltr" />
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" name="featured" defaultChecked={book?.featured ?? false} />
        ہوم پر نمایاں
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" name="published" defaultChecked={book?.published ?? true} />
        شائع
      </label>
      <button className="rounded-lg bg-maroon px-6 py-2 text-white">محفوظ کریں</button>
    </form>
  );
}
