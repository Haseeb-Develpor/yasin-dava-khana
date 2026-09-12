import { notFound } from "next/navigation";
import { BookForm } from "@/components/admin/BookForm";
import { prisma } from "@/lib/prisma";

export default async function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  const book = await prisma.book.findUnique({ where: { id: (await params).id } });
  if (!book) notFound();
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl text-maroon">کتاب کی ترمیم</h1>
      <BookForm book={book} />
    </div>
  );
}
