import type { ReactNode } from "react";
import Link from "next/link";
import { logoutAction } from "@/actions/auth";
import { requireAdmin } from "@/lib/auth";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/pictures", label: "Pictures" },
  { href: "/admin/offers", label: "Offers" },
  { href: "/admin/elders", label: "Hakeem" },
  { href: "/admin/products", label: "Medicines" },
  { href: "/admin/books", label: "Books" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/inquiries", label: "Messages" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();
  return (
    <div className="flex min-h-screen flex-col bg-cream md:flex-row">
      <aside className="bg-maroon p-4 text-gold-light md:w-56 md:shrink-0">
        <p className="font-display text-xl text-white">Admin</p>
        <nav className="mt-4 grid grid-cols-2 gap-1 text-sm md:grid-cols-1">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-md px-3 py-2 hover:bg-maroon-dark hover:text-white">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 flex gap-4 px-3 text-sm">
          <Link href="/" className="hover:text-white">
            Website
          </Link>
          <form action={logoutAction}>
            <button className="hover:text-white">Log out</button>
          </form>
        </div>
      </aside>
      <div className="min-w-0 flex-1 p-4 md:p-6">{children}</div>
    </div>
  );
}
