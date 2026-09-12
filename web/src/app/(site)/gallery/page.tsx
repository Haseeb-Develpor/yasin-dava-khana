import { Breadcrumb } from "@/components/shop/Breadcrumb";
import { PageBanner } from "@/components/shop/PageBanner";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";

export const metadata = { title: "تصاویر" };
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const settings = await getSettings();
  const images = await prisma.galleryImage.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="bg-muted pb-14">
      <PageBanner title={settings.galleryHeading} subtitle="Gallery" />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Breadcrumb items={[{ label: "تصاویر" }]} />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {images.map((img) => (
            <figure key={img.id} className="shop-card overflow-hidden rounded-xl bg-white">
              <img src={img.imageUrl} alt={img.caption || settings.galleryHeading} className="w-full object-contain" />
              {img.caption ? <figcaption className="p-3 text-center">{img.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
