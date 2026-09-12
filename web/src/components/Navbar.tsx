"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { categoryLabel } from "@/lib/labels";
import { IconMenu } from "@/components/Icons";

type Item = { href: string; label: string };
type Cat = { slug: string; name: string };

export function Navbar({ links, categories }: { links: Item[]; categories: Cat[] }) {
  const [cats, setCats] = useState(false);
  const path = usePathname();

  return (
    <div className="bg-green">
      <div className="mx-auto flex max-w-[1400px] flex-col items-stretch sm:flex-row">
        <div className="relative shrink-0">
          <button
            type="button"
            className="btn-gold flex h-10 w-full justify-center gap-2 whitespace-nowrap px-3 text-[12px] sm:h-full sm:min-w-[200px] sm:px-4 sm:text-[13px]"
            onClick={() => setCats((v) => !v)}
          >
            <IconMenu /> Browse Categories
          </button>
          {cats ? (
            <div className="absolute left-0 z-50 max-h-[70vh] w-full overflow-auto border border-gray-100 bg-white py-2 shadow-lg sm:w-64">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/medicines?cat=${c.slug}`}
                  onClick={() => setCats(false)}
                  className="block px-4 py-2.5 text-sm text-[#222] hover:bg-[#f7f7f7] hover:text-green"
                >
                  {categoryLabel(c.slug, c.name)}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <nav className="min-w-0 flex-1">
          <ul className="flex h-full flex-wrap items-center justify-center sm:justify-start">
            {links.map((l) => {
              const active = path === l.href || (l.href !== "/" && path.startsWith(l.href));
              const short = l.label.replace(" Us", "");
              return (
                <li key={l.href} className="shrink-0">
                  <Link
                    href={l.href}
                    className={`block px-2.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-green-dark sm:px-5 sm:py-3.5 sm:text-sm ${active ? "bg-green-dark" : ""}`}
                  >
                    <span className="sm:hidden">{short}</span>
                    <span className="hidden sm:inline">{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
