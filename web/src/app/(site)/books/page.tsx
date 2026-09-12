import { BookCard } from "@/components/Cards";
import { Breadcrumb } from "@/components/shop/Breadcrumb";
import { ShopSidebar } from "@/components/shop/ShopSidebar";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";

export const metadata = { title: "Books" };
export const dynamic = "force-dynamic";

export default async function BooksPage() {
  const settings = await getSettings();
  const [books, categories] = await Promise.all([
    prisma.book.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { products: true } } },
    }),
  ]);
  const counts = Object.fromEntries(categories.map((c) => [c.slug, c._count.products]));

  return (
    <div className="bg-white pb-16">
      <section className="bg-[#f6f1e8] py-8 text-center sm:py-12">
        <p className="text-xs font-semibold tracking-[0.2em] text-green">BOOKS LIBRARY</p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl">Hikmat Books</h1>
        <p className="mx-auto mt-3 max-w-xl text-[#555]">Unani books from Yasin Dava Khana. Ask price on WhatsApp.</p>
      </section>
      <div className="mx-auto max-w-[1400px] px-4 py-8">
        <Breadcrumb items={[{ label: "Books" }]} />
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <ShopSidebar categories={categories} counts={counts} />
          <div>
            <div className="mb-5 border-b border-gray-100 pb-3 text-sm text-[#777]">Showing {books.length} results</div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
              {books.map((b) => (
                <BookCard key={b.id} book={b} settings={settings} />
              ))}
            </div>
            {books.length === 0 ? <p className="mt-10 text-center text-[#777]">No books found.</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
