import Link from "next/link";
import { BookCard, ProductCard } from "@/components/Cards";
import { ClearPhoto } from "@/components/ClearPhoto";
import { CategoryGrid } from "@/components/shop/CategoryGrid";
import { IngredientMarquee } from "@/components/IngredientMarquee";
import { SectionHeading } from "@/components/shop/SectionHeading";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { getExtraPics, getIngredientPics, getSiteImageMap, pic } from "@/lib/siteImages";
import { waLink } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const settings = await getSettings();
  const [products, posts, books, pics, ingredients, extras] = await Promise.all([
    prisma.product.findMany({
      where: { published: true },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
    }),
    prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.book.findMany({ where: { published: true }, orderBy: [{ featured: "desc" }, { sortOrder: "asc" }], take: 6 }),
    getSiteImageMap(),
    getIngredientPics(),
    getExtraPics(),
  ]);

  const best = products.slice(0, 5);

  return (
    <div className="bg-white">
      <section className="w-full bg-[#e8f3ea]">
        <img
          src={pic(pics, "hero")}
          alt="Yasin Dava Khana Dunyapur — Pure. Natural. Effective."
          className="mx-auto block h-auto w-full"
        />
        <div className="mx-auto max-w-[1400px] px-4 py-4 text-center sm:py-5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/medicines"
              className="inline-flex rounded-full bg-green px-6 py-3 text-sm font-semibold text-white hover:bg-green-dark"
            >
              Explore our medicines
            </Link>
            <a
              href={waLink(settings.whatsapp1, "Hello, I want to ask about your medicines.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-green px-6 py-3 text-sm font-semibold text-green hover:bg-white"
            >
              WhatsApp order
            </a>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-3 sm:px-4 md:-mt-8">
        <div className="grid grid-cols-2 rounded-xl bg-white py-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:py-7 md:grid-cols-4">
          {[
            ["Tibb-e-Sabir", "Pure herbal formula"],
            ["Quality Assured", "For assured authenticity"],
            ["WhatsApp Order", "Safe & fast reply"],
            ["Clinic Hours", "Daily 9 AM – 8 PM"],
          ].map(([a, b]) => (
            <div key={a} className="px-4 py-2 text-center">
              <p className="font-semibold text-[#222]">{a}</p>
              <p className="text-xs text-[#888]">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-10 sm:py-16">
        <SectionHeading title="Shop By Category" />
        <div className="mt-10">
          <CategoryGrid />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-10 sm:pb-16">
        <SectionHeading title="Best Sellers" />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {best.map((p) => (
            <ProductCard key={p.id} product={p} settings={settings} />
          ))}
        </div>
      </section>

      <section className="bg-[#e8f3ea] py-14">
        <div className="mx-auto max-w-[1400px] px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl">Premium Ingredients</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[#555]">
            Made with carefully selected, high-quality herbal ingredients for taste, freshness, and traditional care.
          </p>
          <IngredientMarquee items={ingredients.map((i) => ({ src: i.imageUrl, label: i.label }))} />
        </div>
      </section>

      <section className="relative overflow-hidden py-16">
        <img src={pic(pics, "purity-bg")} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-white/70" />
        <div className="relative mx-auto max-w-[1400px] px-4">
          <SectionHeading title="Purity Comparison" />
          <div className="mt-10 grid items-start gap-5 md:grid-cols-3">
            <div className="bg-white p-4 shadow-sm">
              <img
                src={pic(pics, "hakeem-yasin")}
                alt="Hakeem Muhammad Yasin Dunyapuri"
                className="mx-auto w-full max-w-sm object-contain"
              />
              <p className="mt-3 text-center font-display text-xl">Hakeem Muhammad Yasin Dunyapuri</p>
            </div>

            <div className="relative min-h-[380px] overflow-hidden">
              <img src={pic(pics, "purity-pure")} alt="Jari booti" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#164f33]/70 via-[#164f33]/25 to-transparent" />
              <div className="relative z-10 p-6 text-white">
                <h3 className="font-display text-2xl">Yasin Dava Khana Pure Products</h3>
                <ul className="mt-4 space-y-2 text-white">
                  <li>100% natural jari booti</li>
                  <li>No harmful chemicals</li>
                  <li>Tibb-e-Sabir formula</li>
                  <li>Prepared under the Hakeem’s care</li>
                </ul>
              </div>
            </div>

            <div className="relative min-h-[380px] overflow-hidden">
              <img src={pic(pics, "purity-fake")} alt="Jari booti" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-transparent" />
              <div className="relative z-10 p-6 text-white">
                <h3 className="font-display text-2xl">Artificial Products</h3>
                <ul className="mt-4 space-y-2 text-white">
                  <li>May contain chemicals</li>
                  <li>Artificial fragrance</li>
                  <li>Formula is often unclear</li>
                  <li>Side effects are more common</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-16">
        <SectionHeading title="Books Library" />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-3">
          {books.map((b) => (
            <BookCard key={b.id} book={b} settings={settings} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-16">
        <SectionHeading title="Qanoon-e-Mufrad Aaza" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-[#555]">
          The hikmat method of Yasin Dava Khana — brain, heart, and liver — in one clear chart.
        </p>
        <div className="mt-8 border border-gray-100 bg-white p-2 sm:p-4">
          <ClearPhoto src={pic(pics, "qanoon")} alt="Qanoon-e-Mufrad Aaza chart" variant="wide" />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-6 px-4 pb-16 md:grid-cols-2">
        <Link href="/about" className="overflow-hidden bg-[#1a3d2c] text-white">
          <div className="bg-white p-4">
            <ClearPhoto src={pic(pics, "sabir")} alt="Hazrat Dost Muhammad Sabir Multani" />
          </div>
          <div className="p-8 sm:p-10">
            <h3 className="font-display text-3xl sm:text-4xl">Hikmat</h3>
            <p className="mt-2 text-white/80">Tibb-e-Sabir and Qanoon-e-Mufrad Aaza from Dunyapur.</p>
            <ul className="mt-5 space-y-1 text-[#f4e7b5]">
              <li>Founder of the method</li>
              <li>Classical books</li>
              <li>Health articles</li>
            </ul>
            <span className="mt-8 inline-block bg-green px-5 py-2 text-sm font-semibold">Read About Us</span>
          </div>
        </Link>
        <Link href="/books" className="relative min-h-[300px] overflow-hidden bg-[#245c3d] p-10 text-white">
          <h3 className="font-display text-3xl sm:text-4xl">Books Library</h3>
          <p className="mt-2 text-white/80">Explore Unani healthcare for a healthier life.</p>
          <ul className="mt-5 space-y-1 text-[#f4e7b5]">
            {books.map((b) => (
              <li key={b.id}>{b.title}</li>
            ))}
          </ul>
          <span className="mt-8 inline-block bg-green px-5 py-2 text-sm font-semibold">Explore Books</span>
        </Link>
      </section>

      {posts.length ? (
        <section className="mx-auto max-w-[1400px] px-4 pb-16">
          <SectionHeading title="Latest Blogs" />
          <div className="mt-8 border border-gray-100 bg-white p-2 sm:p-4">
            <ClearPhoto src={pic(pics, "magazine-1")} alt="Monthly Mufred Aza" variant="wide" />
          </div>
          <p className="mt-3 text-center text-sm text-[#666]">
            <Link href="/blog" className="font-semibold text-green">
              Open both magazine pages
            </Link>
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="shop-card overflow-hidden">
                <div className="p-5">
                  <p className="text-xs uppercase text-green">{post.category}</p>
                  <h3 className="mt-2 font-display text-xl">{post.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#555]">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {extras.length ? (
        <section className="mx-auto max-w-[1400px] px-4 pb-16">
          <SectionHeading title="More Photos" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {extras.map((img) => (
              <figure key={img.id} className="overflow-hidden border border-gray-100 bg-white p-2">
                <ClearPhoto src={img.imageUrl} alt={img.label} />
                {img.label ? <figcaption className="mt-2 text-center text-sm text-[#666]">{img.label}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1400px] px-4 pb-16">
        <SectionHeading title="Meet Our Hakeem" />
        <div className="mt-10 grid items-start gap-8 md:grid-cols-2">
          <div className="border border-gray-100 bg-white p-6 text-center">
            <ClearPhoto src={pic(pics, "hakeem-yasin")} alt="Hakeem Muhammad Yasin Dunyapuri" variant="portrait" />
            <p className="mt-4 font-display text-2xl">Hakeem Muhammad Yasin Dunyapuri</p>
            <p className="text-sm text-[#777]">Yasin Dava Khana, Dunyapur</p>
          </div>
          <div className="border border-gray-100 bg-white p-6 text-center">
            <ClearPhoto src={pic(pics, "hakeem-yunus")} alt="Hakeem Yunus Yasin Dunyapuri" variant="portrait" />
            <p className="mt-4 font-display text-2xl">Hakeem Yunus Yasin Dunyapuri</p>
            <p className="text-sm text-[#777]">Karachi</p>
          </div>
        </div>
        <div className="mt-8 border border-gray-100 bg-white p-3">
          <ClearPhoto src={pic(pics, "hakeem-pair")} alt="Hakeem Yasin Dunyapuri and Hakeem Yunus Yasin Dunyapuri" />
        </div>
        <div className="mt-6 text-center">
          <a
            href={waLink(settings.whatsapp1, "Hello, I want to consult the Hakeem.")}
            className="btn-cart inline-flex w-auto px-8"
            target="_blank"
            rel="noreferrer"
          >
            Consult our Hakeem
          </a>
        </div>
      </section>
    </div>
  );
}
