import Link from "next/link";
import { deleteBook } from "@/actions/admin";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminBooksPage() {
  const books = await prisma.book.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-maroon">کتب</h1>
        <Link href="/admin/books/new" className="rounded-lg bg-maroon px-4 py-2 text-white">
          نئی کتاب
        </Link>
      </div>
      <div className="mt-6 space-y-3">
        {books.map((b) => (
          <div key={b.id} className="flex items-center justify-between rounded-xl border border-gold/40 bg-white p-4">
            <div>
              <p className="font-display text-lg">{b.title}</p>
              <p className="text-sm text-green">{formatPrice(b.price)}</p>
            </div>
            <div>
              <Link href={`/admin/books/${b.id}`} className="text-green underline">
                ترمیم
              </Link>
              <form action={deleteBook} className="inline">
                <input type="hidden" name="id" value={b.id} />
                <button className="mr-3 text-red-700 underline">حذف</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
