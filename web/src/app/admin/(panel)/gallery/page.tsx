import { deleteGallery, saveGallery } from "@/actions/admin";
import { ImageField } from "@/components/ImageField";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function GalleryAdminPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="font-display text-3xl text-maroon">گیلری</h1>
      <p className="mt-2 text-sm">روز کی تصاویر یہاں اپلوڈ کریں۔</p>
      <form action={saveGallery} className="mt-6 max-w-xl space-y-3 rounded-2xl border border-gold/40 bg-white p-6">
        <ImageField name="imageUrl" label="تصویر" />
        <input name="caption" placeholder="کیپشن (اختیاری)" className="w-full rounded-lg border px-3 py-2" />
        <button className="rounded-lg bg-maroon px-4 py-2 text-white">اپلوڈ</button>
      </form>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {images.map((img) => (
          <figure key={img.id} className="overflow-hidden rounded-xl border border-gold/40 bg-white">
            <img src={img.imageUrl} alt="" className="h-40 w-full object-cover" />
            <figcaption className="flex items-center justify-between p-2 text-sm">
              <span>{img.caption}</span>
              <form action={deleteGallery}>
                <input type="hidden" name="id" value={img.id} />
                <button className="text-red-700">حذف</button>
              </form>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
