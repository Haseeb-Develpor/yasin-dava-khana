import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  await requireAdmin();
  const [products, books, posts, inquiries, gallery, pictures] = await Promise.all([
    prisma.product.count(),
    prisma.book.count(),
    prisma.blogPost.count(),
    prisma.inquiry.count({ where: { read: false } }),
    prisma.galleryImage.count(),
    prisma.siteImage.count(),
  ]);

  const cards = [
    { href: "/admin/pictures", label: "Pictures / تصاویر", n: pictures },
    { href: "/admin/products", label: "ادویات", n: products },
    { href: "/admin/books", label: "کتب", n: books },
    { href: "/admin/blog", label: "بلاگ", n: posts },
    { href: "/admin/gallery", label: "تصاویر", n: gallery },
    { href: "/admin/inquiries", label: "نئے پیغامات", n: inquiries },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-maroon">ڈیش بورڈ</h1>
      <p className="mt-2 text-sm text-ink/70">تصاویر، قیمتیں، آفرز اور مضامین یہاں سے تبدیل کریں۔</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-2xl border border-gold/40 bg-white p-6 hover:border-maroon">
            <p className="text-sm text-ink/60">{c.label}</p>
            <p className="mt-2 font-display text-4xl text-maroon">{c.n}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
