import Link from "next/link";
import type { Category } from "@/generated/prisma/client";
import { categoryLabel } from "@/lib/labels";

export function ShopSidebar({
  categories,
  active,
  counts,
}: {
  categories: Category[];
  active?: string;
  counts?: Record<string, number>;
}) {
  return (
    <aside className="space-y-5 lg:space-y-8">
      <form action="/medicines" className="hidden lg:block">
        <p className="mb-3 text-lg font-semibold">Search</p>
        <div className="flex border border-gray-200">
          <input name="q" placeholder="Search for products" className="h-10 min-w-0 flex-1 px-3 text-sm" />
          <button className="h-10 bg-green px-3 text-xs font-semibold uppercase text-white">Go</button>
        </div>
      </form>

      <div>
        <p className="mb-3 text-lg font-semibold">Categories</p>
        <ul className="flex flex-wrap gap-2 lg:block lg:divide-y lg:divide-gray-100 lg:text-sm">
          <li>
            <Link
              href="/medicines"
              className={`inline-flex rounded-full border px-3 py-1.5 text-xs lg:flex lg:justify-between lg:rounded-none lg:border-0 lg:px-0 lg:py-2.5 lg:text-sm ${!active ? "border-green bg-[#eef6ef] font-semibold text-green lg:bg-transparent" : "border-gray-200 hover:text-green"}`}
            >
              All medicines
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/medicines?cat=${c.slug}`}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs lg:flex lg:justify-between lg:rounded-none lg:border-0 lg:px-0 lg:py-2.5 lg:text-sm ${active === c.slug ? "border-green bg-[#eef6ef] font-semibold text-green lg:bg-transparent" : "border-gray-200 hover:text-green"}`}
              >
                <span>{categoryLabel(c.slug, c.name)}</span>
                {counts?.[c.slug] != null ? <span className="text-[#999]">({counts[c.slug]})</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
