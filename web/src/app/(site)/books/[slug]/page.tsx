import { notFound } from "next/navigation";
import { BookCard } from "@/components/Cards";
import { Breadcrumb } from "@/components/shop/Breadcrumb";
import { SectionHeading } from "@/components/shop/SectionHeading";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { formatPrice, orderMessage, waLink } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = await prisma.book.findFirst({ where: { slug, published: true } });
  if (!book) notFound();
  const settings = await getSettings();
  const related = await prisma.book.findMany({
    where: { published: true, id: { not: book.id } },
    take: 3,
  });

  return (
    <div className="bg-white pb-16">
      <div className="mx-auto max-w-[1400px] px-4 py-8">
        <Breadcrumb items={[{ href: "/books", label: "Books" }, { label: book.title }]} />
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <div className="flex min-h-64 items-center justify-center border border-gray-100 bg-[#f6f1e8] p-4 sm:min-h-80 sm:p-8">
            {book.imageUrl ? (
              <img src={book.imageUrl} alt={book.title} className="max-h-[480px] w-full object-contain" />
            ) : (
              <p className="text-center font-display text-3xl text-green">{book.title}</p>
            )}
          </div>
          <div>
            <p className="text-sm text-green">Books Library</p>
            <h1 className="font-display text-3xl sm:text-4xl">{book.title}</h1>
            <p className="mt-1 tracking-widest text-[#d4a017]">★★★★★</p>
            <p className="mt-3 text-3xl font-semibold text-[#3d8b5a]">{formatPrice(book.price)}</p>
            <p className="mt-5 whitespace-pre-line leading-8 text-[#555]">{book.description}</p>
            <a
              href={waLink(settings.whatsapp1, orderMessage(book.title, book.price))}
              target="_blank"
              rel="noreferrer"
              className="btn-cart mt-6 w-full py-3 sm:max-w-xs"
            >
              Add to cart
            </a>
          </div>
        </div>
        {related.length ? (
          <div className="mt-14">
            <SectionHeading title="Related books" />
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3">
              {related.map((b) => (
                <BookCard key={b.id} book={b} settings={settings} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
