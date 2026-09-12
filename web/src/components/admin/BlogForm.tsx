import type { BlogPost } from "@/generated/prisma/client";
import { saveBlog } from "@/actions/admin";
import { ImageField } from "@/components/ImageField";

export function BlogForm({ post }: { post?: BlogPost | null }) {
  return (
    <form action={saveBlog} className="max-w-2xl space-y-4 rounded-2xl border border-gold/40 bg-white p-6">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      <label className="block">
        عنوان
        <input name="title" required defaultValue={post?.title} className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <label className="block">
        سلگ
        <input name="slug" defaultValue={post?.slug} className="mt-1 w-full rounded-lg border px-3 py-2" dir="ltr" />
      </label>
      <label className="block">
        قسم (طبی مشورہ / میگزین / حکمت)
        <input name="category" defaultValue={post?.category || "طبی مشورہ"} className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <ImageField name="imageUrl" defaultUrl={post?.imageUrl} label="تصویر" />
      <label className="block">
        مختصر
        <textarea name="excerpt" rows={2} defaultValue={post?.excerpt} className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <label className="block">
        مضمون
        <textarea name="content" rows={12} defaultValue={post?.content} className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? true} />
        شائع کریں
      </label>
      <button className="rounded-lg bg-maroon px-6 py-2 text-white">محفوظ کریں</button>
    </form>
  );
}
