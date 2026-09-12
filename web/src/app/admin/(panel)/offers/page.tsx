import { deleteOffer, saveOffer } from "@/actions/admin";
import { ImageField } from "@/components/ImageField";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function OffersAdminPage() {
  const offers = await prisma.offer.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="font-display text-3xl text-maroon">نیو آفرز</h1>
      <p className="mt-2 text-sm">فرنٹ پیج پر سب سے نمایاں خانہ۔ روز تبدیل کر سکتے ہیں۔</p>
      <form action={saveOffer} className="mt-6 max-w-2xl space-y-3 rounded-2xl border border-gold/40 bg-white p-6">
        <h2 className="font-display text-xl">نئی آفر</h2>
        <input name="title" required placeholder="عنوان" className="w-full rounded-lg border px-3 py-2" />
        <textarea name="description" required rows={4} placeholder="تفصیل" className="w-full rounded-lg border px-3 py-2" />
        <ImageField name="imageUrl" label="بینر تصویر (اختیاری)" />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="active" defaultChecked />
          فرنٹ پیج پر دکھائیں
        </label>
        <button className="rounded-lg bg-maroon px-4 py-2 text-white">شامل کریں</button>
      </form>
      <div className="mt-8 space-y-6">
        {offers.map((o) => (
          <form key={o.id} action={saveOffer} className="max-w-2xl space-y-3 rounded-xl border border-gold/40 bg-white p-6">
            <input type="hidden" name="id" value={o.id} />
            <input name="title" defaultValue={o.title} className="w-full rounded-lg border px-3 py-2" />
            <textarea name="description" rows={5} defaultValue={o.description} className="w-full rounded-lg border px-3 py-2" />
            <ImageField name="imageUrl" defaultUrl={o.imageUrl} label="تصویر" />
            <input name="sortOrder" type="number" defaultValue={o.sortOrder} className="w-full rounded-lg border px-3 py-2" dir="ltr" />
            <label className="flex items-center gap-2">
              <input type="checkbox" name="active" defaultChecked={o.active} />
              فعال
            </label>
            <button className="rounded-lg bg-green px-4 py-2 text-white">محفوظ کریں</button>
          </form>
        ))}
      </div>
      {offers.map((o) => (
        <form key={`del-${o.id}`} action={deleteOffer} className="mt-2">
          <input type="hidden" name="id" value={o.id} />
          <button className="text-sm text-red-700 underline">{o.title} حذف</button>
        </form>
      ))}
    </div>
  );
}
