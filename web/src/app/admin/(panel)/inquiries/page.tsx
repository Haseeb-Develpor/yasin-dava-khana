import { deleteInquiry, markInquiryRead } from "@/actions/admin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  const rows = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="font-display text-3xl text-maroon">پیغامات</h1>
      <div className="mt-6 space-y-4">
        {rows.length === 0 ? <p>ابھی کوئی پیغام نہیں۔</p> : null}
        {rows.map((r) => (
          <article key={r.id} className={`rounded-xl border p-4 ${r.read ? "border-gold/30 bg-white" : "border-maroon bg-gold-light/40"}`}>
            <p className="font-display text-lg">{r.name}</p>
            <p className="text-sm" dir="ltr">
              {r.phone}
            </p>
            <p className="mt-2 leading-7">{r.message}</p>
            <p className="mt-2 text-xs text-ink/50">{r.createdAt.toLocaleString("ur-PK")}</p>
            <div className="mt-3 flex gap-3">
              {!r.read ? (
                <form action={markInquiryRead}>
                  <input type="hidden" name="id" value={r.id} />
                  <button className="text-green underline">پڑھا ہوا</button>
                </form>
              ) : null}
              <form action={deleteInquiry}>
                <input type="hidden" name="id" value={r.id} />
                <button className="text-red-700 underline">حذف</button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
