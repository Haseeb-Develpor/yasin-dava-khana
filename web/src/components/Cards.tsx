import Link from "next/link";
import type { Book, Product, Setting } from "@/generated/prisma/client";
import { copyFor, formEn } from "@/lib/productEn";
import { formatPrice, orderMessage, waLink } from "@/lib/utils";

export function ProductCard({
  product,
  settings,
}: {
  product: Product;
  settings: Setting;
}) {
  const copy = copyFor(product);
  const title = copy.title;
  return (
    <article className="shop-card group relative flex flex-col bg-white p-3">
      {product.featured ? <span className="hot-badge absolute top-3 left-3 z-10">Hot</span> : null}
      <Link href={`/medicines/${product.slug}`} className="block">
        <div className="flex h-40 items-center justify-center bg-white p-2 sm:h-56">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={title} className="max-h-36 w-full object-contain sm:max-h-52" />
          ) : (
            <span className="text-sm text-[#999]">Photo coming soon</span>
          )}
        </div>
        <div className="px-1 pt-3 text-center">
          <h3 className="min-h-10 text-[15px] font-semibold text-[#222]">{title}</h3>
          <p className="mt-1 text-[12px] text-[#aaa]">★★★★★</p>
          <p className="mt-1 text-[15px] font-semibold text-[#3d8b5a]">{formatPrice(product.price)}</p>
          <p className="mt-1 text-[11px] text-[#888]">{formEn(product.quantity)}</p>
        </div>
      </Link>
      <div className="mt-3">
        <a
          href={waLink(settings.whatsapp1, orderMessage(title, product.price))}
          target="_blank"
          rel="noreferrer"
          className="btn-cart"
        >
          Add to cart
        </a>
      </div>
    </article>
  );
}

export function BookCard({ book, settings }: { book: Book; settings: Setting }) {
  return (
    <article className="shop-card flex flex-col bg-white p-3">
      <Link href={`/books/${book.slug}`} className="block">
        <div className="flex h-40 items-center justify-center bg-[#f6f6f6] p-3 sm:h-52">
          {book.imageUrl ? <img src={book.imageUrl} alt={book.title} className="max-h-36 object-contain sm:max-h-48" /> : <p>{book.title}</p>}
        </div>
        <h3 className="mt-3 text-center text-[15px] font-semibold">{book.title}</h3>
        <p className="mt-1 text-center text-[12px] text-[#aaa]">★★★★★</p>
        <p className="mt-1 text-center font-semibold text-[#3d8b5a]">{formatPrice(book.price)}</p>
      </Link>
      <a href={waLink(settings.whatsapp1, orderMessage(book.title, book.price))} className="btn-cart mt-3" target="_blank" rel="noreferrer">
        Add to cart
      </a>
    </article>
  );
}
