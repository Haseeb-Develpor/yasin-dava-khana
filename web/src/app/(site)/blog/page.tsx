import Link from "next/link";
import { ClearPhoto } from "@/components/ClearPhoto";
import { Breadcrumb } from "@/components/shop/Breadcrumb";
import { prisma } from "@/lib/prisma";
import { getSiteImageMap, pic } from "@/lib/siteImages";

export const metadata = { title: "Blogs" };
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [posts, pics] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    }),
    getSiteImageMap(),
  ]);

  return (
    <div className="bg-white pb-16">
      <section className="bg-[#f6f1e8] py-8 text-center sm:py-12">
        <p className="text-xs font-semibold tracking-[0.2em] text-green">LATEST BLOGS</p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl">Hikmat & Health</h1>
        <p className="mx-auto mt-3 max-w-xl px-4 text-[#555]">
          Monthly Mufred Aza and simple Unani notes from Yasin Dava Khana, Dunyapur.
        </p>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 py-8">
        <Breadcrumb items={[{ label: "Blogs" }]} />

        <h2 className="font-display text-3xl">Monthly Mufred Aza</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">
          On mobile, swipe each page sideways to read, or tap to open the full picture. Phone: 0301-4185965 ·
          0344-7014392 · Email: mufradaza786@gmail.com
        </p>
        <div className="mt-6 space-y-6">
          <div className="border border-gray-100 bg-white p-2 sm:p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-green">Page 1 — Clinic &amp; hikmat</p>
            <ClearPhoto src={pic(pics, "magazine-1")} alt="Monthly Mufred Aza page 1" variant="wide" />
          </div>
          <div className="border border-gray-100 bg-white p-2 sm:p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-green">Page 2 — College &amp; contacts</p>
            <ClearPhoto src={pic(pics, "magazine-2")} alt="Monthly Mufred Aza page 2" variant="wide" />
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="shop-card overflow-hidden bg-white">
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-green">
                  {post.category} · {post.createdAt.toLocaleDateString("en-GB")}
                </p>
                <h2 className="mt-2 font-display text-2xl">{post.title}</h2>
                <p className="mt-2 leading-7 text-[#555]">{post.excerpt}</p>
                <p className="mt-3 text-sm font-semibold text-green">Read more</p>
              </div>
            </Link>
          ))}
        </div>
        {posts.length === 0 ? <p className="mt-10 text-center text-[#777]">No blogs yet.</p> : null}
      </div>
    </div>
  );
}
