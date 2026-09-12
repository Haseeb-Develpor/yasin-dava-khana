import { addSiteImage, deleteSiteImage, saveItemPhoto, saveSiteImage } from "@/actions/admin";
import { ImageField } from "@/components/ImageField";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const groups: { key: string; title: string; note: string }[] = [
  { key: "header", title: "Banner & logo", note: "Home banner and the visiting-card logo." },
  { key: "hakeem", title: "Hakeem photos", note: "Home, About, and Meet Our Hakeem." },
  { key: "magazine", title: "Magazine & chart", note: "Monthly Mufred Aza pages and Qanoon chart." },
  { key: "purity", title: "Purity backgrounds", note: "Jari-booti backgrounds on the home comparison." },
  { key: "ingredients", title: "Premium Ingredients", note: "Round jari-booti pictures that move on Home. Add more below." },
  { key: "extra", title: "New extra pictures", note: "New photos you add here also appear on the Home page." },
];

function PicForm({
  id,
  label,
  imageUrl,
  canDelete,
}: {
  id: string;
  label: string;
  imageUrl: string;
  canDelete?: boolean;
}) {
  return (
    <form action={saveSiteImage} className="space-y-3 rounded-2xl border border-gold/40 bg-white p-4">
      <input type="hidden" name="id" value={id} />
      <input name="label" defaultValue={label} className="w-full rounded-lg border px-3 py-2 text-sm" />
      <ImageField
        name="imageUrl"
        defaultUrl={imageUrl}
        label="Change picture"
        previewClass="mt-2 h-40 w-full rounded-lg border border-gold/40 object-contain bg-[#faf7f0]"
      />
      <div className="flex flex-wrap gap-2">
        <button className="rounded-lg bg-maroon px-4 py-2 text-sm text-white">Save</button>
        {canDelete ? (
          <button formAction={deleteSiteImage} className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-700">
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}

function ItemForm({
  kind,
  id,
  name,
  imageUrl,
}: {
  kind: "product" | "book" | "blog" | "elder";
  id: string;
  name: string;
  imageUrl: string;
}) {
  return (
    <form action={saveItemPhoto} className="space-y-3 rounded-2xl border border-gold/40 bg-white p-4">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="id" value={id} />
      <p className="text-sm font-semibold text-maroon">{name}</p>
      <ImageField
        name="imageUrl"
        defaultUrl={imageUrl}
        label="Change picture"
        previewClass="mt-2 h-40 w-full rounded-lg border border-gold/40 object-contain bg-[#faf7f0]"
      />
      <button className="rounded-lg bg-maroon px-4 py-2 text-sm text-white">Save</button>
    </form>
  );
}

export default async function PicturesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const [images, products, books, posts, elders] = await Promise.all([
    prisma.siteImage.findMany({ orderBy: [{ group: "asc" }, { sortOrder: "asc" }] }),
    prisma.product.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.book.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.elder.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="font-display text-3xl text-maroon">Pictures</h1>
      <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/70">
        Is panel se website ki saari pictures change ho sakti hain. Nayi picture add karne ke liye neeche Add New
        Picture use karein.
      </p>
      {saved ? <p className="mt-3 rounded-md bg-green/10 p-3 text-green">Picture saved. Website updated.</p> : null}

      <section className="mt-8 rounded-2xl border border-gold/40 bg-white p-6">
        <h2 className="font-display text-2xl text-maroon">Add new picture</h2>
        <p className="mt-1 text-sm text-ink/60">
          Extra picture Home page par dikhe gi. Ingredient picture Premium Ingredients mein ghoomegi.
        </p>
        <form action={addSiteImage} className="mt-4 grid max-w-xl gap-3">
          <label className="text-sm">
            Where to show
            <select name="group" className="mt-1 w-full rounded-lg border px-3 py-2">
              <option value="extra">New extra picture (Home page)</option>
              <option value="ingredients">Premium Ingredient (round photo)</option>
            </select>
          </label>
          <input name="label" placeholder="Name / caption" className="rounded-lg border px-3 py-2" />
          <ImageField name="imageUrl" label="Upload picture" />
          <button className="w-fit rounded-lg bg-maroon px-5 py-2 text-white">Add picture</button>
        </form>
      </section>

      {groups.map((g) => {
        const rows = images.filter((img) => img.group === g.key);
        if (!rows.length && g.key !== "extra") return null;
        return (
          <section key={g.key} className="mt-10">
            <h2 className="font-display text-2xl text-maroon">{g.title}</h2>
            <p className="mt-1 text-sm text-ink/60">{g.note}</p>
            {rows.length ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {rows.map((img) => (
                  <PicForm
                    key={img.id}
                    id={img.id}
                    label={img.label}
                    imageUrl={img.imageUrl}
                    canDelete={img.group === "ingredients" || img.group === "extra"}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-ink/50">No extra pictures yet. Add one above.</p>
            )}
          </section>
        );
      })}

      <section className="mt-10">
        <h2 className="font-display text-2xl text-maroon">Medicines</h2>
        <p className="mt-1 text-sm text-ink/60">Shop and product page photos.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p) => (
            <ItemForm key={p.id} kind="product" id={p.id} name={p.name} imageUrl={p.imageUrl} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-maroon">Books</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {books.map((b) => (
            <ItemForm key={b.id} kind="book" id={b.id} name={b.title} imageUrl={b.imageUrl} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-maroon">Blogs</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((p) => (
            <ItemForm key={p.id} kind="blog" id={p.id} name={p.title} imageUrl={p.imageUrl} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-maroon">Hakeem records</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {elders.map((e) => (
            <ItemForm key={e.id} kind="elder" id={e.id} name={e.name} imageUrl={e.photoUrl} />
          ))}
        </div>
      </section>
    </div>
  );
}
