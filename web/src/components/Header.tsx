import Link from "next/link";
import { IconBag, IconCompare, IconHeart, IconSearch, IconUser, IconWhatsApp } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/Navbar";
import { categoryLabel } from "@/lib/labels";
import { navLinks } from "@/lib/nav";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { telHref, waLink } from "@/lib/utils";

const hello = "Hello, Yasin Dava Khana Dunyapur. I need information.";

export async function Header() {
  const s = await getSettings();
  const links = navLinks();
  const order = ["men", "women", "kidney", "sugar", "stones", "stomach", "pain", "fever"];
  const categories = (await prisma.category.findMany()).sort((a, b) => {
    const ia = order.indexOf(a.slug);
    const ib = order.indexOf(b.slug);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.name.localeCompare(b.name);
  });

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="bg-[#164f33] text-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-3 py-1.5 text-[11px] sm:px-4 sm:text-[13px]">
          <p className="hidden truncate sm:block">Pure Unani expertise · Yasin Dava Khana Dunyapur</p>
          <p className="sm:hidden">Yasin Dava Khana</p>
          <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-5">
            <a href={telHref(s.phone1)} className="hover:text-gold">
              {s.phone1}
            </a>
            <a href={telHref(s.phone2)} className="hover:text-gold">
              {s.phone2}
            </a>
            <span className="hidden sm:inline">English</span>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 px-3 py-2 sm:gap-4 sm:px-4 sm:py-4">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
            <Logo href={false} src={s.logoUrl || "/logo.jpg"} className="h-14 w-auto max-w-[88px] sm:h-20 sm:max-w-[140px] md:h-24 md:max-w-[168px]" />
            <span className="min-w-0">
              <span className="block font-display text-base leading-tight text-[#164f33] sm:text-xl md:text-2xl">
                Yasin Dava Khana
              </span>
              <span className="block text-[11px] text-[#666] sm:text-sm">Dunyapur</span>
            </span>
          </Link>

          <form action="/medicines" className="order-last flex h-10 min-w-0 w-full basis-full overflow-hidden rounded-full border border-gray-200 sm:h-12 md:order-none md:w-auto md:flex-1 md:basis-auto">
            <input name="q" placeholder="Search for products" className="h-full min-w-0 flex-1 px-3 text-sm outline-none sm:px-5" />
            <select name="cat" className="hidden h-full border-l border-gray-200 bg-white px-3 text-xs uppercase text-[#666] md:block">
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {categoryLabel(c.slug, c.name)}
                </option>
              ))}
            </select>
            <button className="flex h-full w-11 items-center justify-center bg-green text-white hover:bg-green-dark sm:w-14">
              <IconSearch />
            </button>
          </form>

          <div className="ms-auto flex items-center gap-3 text-[#333] sm:gap-4">
            <Link href="/contact" className="hidden sm:block" aria-label="Account">
              <IconUser />
            </Link>
            <a href={waLink(s.whatsapp1, hello)} target="_blank" rel="noreferrer" className="relative hidden sm:block" aria-label="Wishlist">
              <IconHeart />
              <span className="absolute -top-1 -right-2 rounded-full bg-green px-1 text-[10px] text-white">0</span>
            </a>
            <Link href="/medicines" className="relative hidden sm:block" aria-label="Compare">
              <IconCompare />
              <span className="absolute -top-1 -right-2 rounded-full bg-green px-1 text-[10px] text-white">0</span>
            </Link>
            <a href={waLink(s.whatsapp1, hello)} target="_blank" rel="noreferrer" className="relative" aria-label="Cart">
              <IconBag />
              <span className="absolute -top-1 -right-2 rounded-full bg-green px-1 text-[10px] text-white">0</span>
            </a>
          </div>
        </div>
      </div>

      <Navbar links={links} categories={categories} />
    </header>
  );
}

export async function Footer() {
  const s = await getSettings();
  const links = navLinks();

  return (
    <footer className="mt-auto bg-[#12261c] pb-20 text-white md:pb-0">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-10 sm:grid-cols-2 sm:py-14 lg:grid-cols-4">
        <div>
          <Logo href={false} src={s.logoUrl || "/logo.jpg"} className="mb-4 h-20 w-auto max-w-[160px] rounded-md" />
          <p className="font-display text-2xl">Yasin Dava Khana</p>
          <p className="mt-3 text-sm leading-7 text-white/70">
            Trusted Unani herbal medicines from Dunyapur. Tibb-e-Sabir. Order on WhatsApp.
          </p>
        </div>
        <div>
          <p className="mb-4 text-lg font-semibold">Quick Links</p>
          <ul className="space-y-2 text-sm text-white/80">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-lg font-semibold">Shop</p>
          <ul className="space-y-2 text-sm text-white/80">
            {["men", "women", "kidney", "sugar"].map((slug) => (
              <li key={slug}>
                <Link href={`/medicines?cat=${slug}`} className="hover:text-gold">
                  {categoryLabel(slug, slug)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-lg font-semibold">Customer Support</p>
          <p className="text-sm">{s.phone1}</p>
          <p className="text-sm">{s.phone2}</p>
          <p className="mt-2 text-sm text-white/70">Dunyapur</p>
          <p className="text-sm text-white/70">Daily 9:00 AM – 8:00 PM</p>
          <a href={waLink(s.whatsapp1, hello)} className="mt-4 inline-flex items-center gap-2 text-sm text-gold" target="_blank" rel="noreferrer">
            <IconWhatsApp /> WhatsApp order
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        Yasin Dava Khana Dunyapur. All Rights Reserved.
      </div>
    </footer>
  );
}
