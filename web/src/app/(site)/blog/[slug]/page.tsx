import { notFound } from "next/navigation";
import { ClearPhoto } from "@/components/ClearPhoto";
import { Breadcrumb } from "@/components/shop/Breadcrumb";
import { prisma } from "@/lib/prisma";
import { getSiteImageMap, pic } from "@/lib/siteImages";

export const dynamic = "force-dynamic";

const extraSlots: Record<string, { slot: string; alt: string }[]> = {
  "monthly-mufred-aza": [
    { slot: "magazine-1", alt: "Monthly Mufred Aza page 1" },
    { slot: "magazine-2", alt: "Monthly Mufred Aza page 2" },
  ],
  "qanoon-e-mufrad-aaza-kya-hai": [{ slot: "qanoon", alt: "Qanoon-e-Mufrad Aaza chart" }],
  "herbal-medicine-se-faida": [{ slot: "magazine-2", alt: "Monthly Mufred Aza" }],
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, pics] = await Promise.all([
    prisma.blogPost.findFirst({ where: { slug, published: true } }),
    getSiteImageMap(),
  ]);
  if (!post) notFound();

  const extras = extraSlots[slug]?.map((img) => ({ src: pic(pics, img.slot), alt: img.alt }));

  return (
    <article className="bg-white py-10">
      <div className="mx-auto max-w-3xl px-4">
        <Breadcrumb items={[{ href: "/blog", label: "Blogs" }, { label: post.title }]} />
        <p className="text-sm uppercase tracking-wide text-green">
          {post.category} · {post.createdAt.toLocaleDateString("en-GB")}
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">{post.title}</h1>
        {extras ? (
          <div className="mt-6 space-y-6">
            {extras.map((img) => (
              <div key={img.src} className="border border-gray-100 bg-white p-2">
                <ClearPhoto src={img.src} alt={img.alt} variant="wide" />
              </div>
            ))}
          </div>
        ) : post.imageUrl ? (
          <div className="mt-6 border border-gray-100 bg-[#f6f1e8] p-2">
            <ClearPhoto src={post.imageUrl} alt={post.title} />
          </div>
        ) : null}
        <div className="mt-8 whitespace-pre-line leading-9 text-[#555]">{post.content}</div>
      </div>
    </article>
  );
}
