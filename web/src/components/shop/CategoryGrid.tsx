import Link from "next/link";
import { shopCategories } from "@/lib/shopCategories";

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-5">
      {shopCategories.map((c) => (
        <Link key={c.slug} href={c.href} className="group text-center">
          <div className="mx-auto flex h-[96px] w-[96px] items-center justify-center overflow-hidden rounded-full border border-[#e6efe8] bg-[#eef6ef] p-2 shadow-sm transition group-hover:border-green group-hover:shadow-md sm:h-[130px] sm:w-[130px] sm:p-3">
            <img src={c.icon} alt="" className="h-full w-full object-contain" />
          </div>
          <p className="mt-3 text-sm font-semibold text-[#333] group-hover:text-green">{c.label}</p>
        </Link>
      ))}
    </div>
  );
}
