import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/BlogForm";
import { prisma } from "@/lib/prisma";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const post = await prisma.blogPost.findUnique({ where: { id: (await params).id } });
  if (!post) notFound();
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl text-maroon">مضمون کی ترمیم</h1>
      <BlogForm post={post} />
    </div>
  );
}
