import Link from "next/link";
import { deleteBlog } from "@/actions/admin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-maroon">بلاگ / میگزین</h1>
        <Link href="/admin/blog/new" className="rounded-lg bg-maroon px-4 py-2 text-white">
          نیا مضمون
        </Link>
      </div>
      <div className="mt-6 space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded-xl border border-gold/40 bg-white p-4">
            <div>
              <p className="font-display text-lg">{p.title}</p>
              <p className="text-xs text-green">{p.category}</p>
            </div>
            <div>
              <Link href={`/admin/blog/${p.id}`} className="text-green underline">
                ترمیم
              </Link>
              <form action={deleteBlog} className="inline">
                <input type="hidden" name="id" value={p.id} />
                <button className="mr-3 text-red-700 underline">حذف</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
