import { deleteElder, saveElder } from "@/actions/admin";
import { ImageField } from "@/components/ImageField";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EldersAdminPage() {
  const elders = await prisma.elder.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="font-display text-3xl text-maroon">ہمارے بزرگ</h1>
      <p className="mt-2 text-sm text-ink/70">فرنٹ پیج پر تصاویر۔ نام اور فوٹو یہاں بدلیں۔</p>
      <form action={saveElder} className="mt-6 max-w-xl space-y-3 rounded-2xl border border-gold/40 bg-white p-6">
        <h2 className="font-display text-xl">نیا بزرگ</h2>
        <input name="name" required placeholder="نام" className="w-full rounded-lg border px-3 py-2" />
        <input name="title" placeholder="لقب / رشتہ" className="w-full rounded-lg border px-3 py-2" />
        <ImageField name="photoUrl" label="تصویر" />
        <input name="sortOrder" type="number" defaultValue={0} className="w-full rounded-lg border px-3 py-2" dir="ltr" />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="published" defaultChecked />
          دکھائیں
        </label>
        <button className="rounded-lg bg-maroon px-4 py-2 text-white">شامل کریں</button>
      </form>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {elders.map((e) => (
          <form key={e.id} action={saveElder} className="space-y-2 rounded-xl border border-gold/40 bg-white p-4">
            <input type="hidden" name="id" value={e.id} />
            {e.photoUrl ? <img src={e.photoUrl} alt="" className="h-40 w-full rounded object-cover" /> : null}
            <input name="name" defaultValue={e.name} className="w-full rounded-lg border px-3 py-2" />
            <input name="title" defaultValue={e.title} className="w-full rounded-lg border px-3 py-2" />
            <ImageField name="photoUrl" defaultUrl={e.photoUrl} label="تصویر بدلیں" />
            <input name="sortOrder" type="number" defaultValue={e.sortOrder} className="w-full rounded-lg border px-3 py-2" dir="ltr" />
            <label className="flex items-center gap-2">
              <input type="checkbox" name="published" defaultChecked={e.published} />
              دکھائیں
            </label>
            <div className="flex gap-3">
              <button className="rounded-lg bg-green px-4 py-1 text-white">محفوظ</button>
            </div>
          </form>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {elders.map((e) => (
          <form key={`d-${e.id}`} action={deleteElder}>
            <input type="hidden" name="id" value={e.id} />
            <button className="text-sm text-red-700 underline">{e.name} حذف کریں</button>
          </form>
        ))}
      </div>
    </div>
  );
}
