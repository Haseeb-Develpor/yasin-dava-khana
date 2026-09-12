"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

function str(form: FormData, key: string) {
  return String(form.get(key) || "").trim();
}
function num(form: FormData, key: string) {
  const n = Number(form.get(key) || 0);
  return Number.isFinite(n) ? Math.max(0, Math.round(n)) : 0;
}
function bool(form: FormData, key: string) {
  return form.get(key) === "on" || form.get(key) === "true" || form.get(key) === "1";
}

function revalidatePublic() {
  revalidatePath("/", "layout");
  revalidatePath("/medicines");
  revalidatePath("/books");
  revalidatePath("/blog");
  revalidatePath("/gallery");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admin", "layout");
}

export async function saveSettings(formData: FormData) {
  await requireAdmin();
  await prisma.setting.upsert({
    where: { id: "main" },
    update: {
      clinicNameUrdu: str(formData, "clinicNameUrdu"),
      clinicNameEn: str(formData, "clinicNameEn"),
      tagline: str(formData, "tagline"),
      phone1: str(formData, "phone1"),
      phone2: str(formData, "phone2"),
      whatsapp1: str(formData, "whatsapp1"),
      whatsapp2: str(formData, "whatsapp2"),
      address: str(formData, "address"),
      hours: str(formData, "hours"),
      aboutText: str(formData, "aboutText"),
      mapUrl: str(formData, "mapUrl"),
      logoUrl: str(formData, "logoUrl") || "/logo.jpg",
      heroIntro: str(formData, "heroIntro"),
      footerDisclaimer: str(formData, "footerDisclaimer"),
      navHome: str(formData, "navHome"),
      navAbout: str(formData, "navAbout"),
      navMedicines: str(formData, "navMedicines"),
      navBooks: str(formData, "navBooks"),
      navBlog: str(formData, "navBlog"),
      navGallery: str(formData, "navGallery"),
      navContact: str(formData, "navContact"),
      eldersHeading: str(formData, "eldersHeading"),
      eldersText: str(formData, "eldersText"),
      offersHeading: str(formData, "offersHeading"),
      medicinesHeading: str(formData, "medicinesHeading"),
      booksHeading: str(formData, "booksHeading"),
      blogHeading: str(formData, "blogHeading"),
      galleryHeading: str(formData, "galleryHeading"),
      whatsappLabel: str(formData, "whatsappLabel"),
      callLabel: str(formData, "callLabel"),
      footerPagesTitle: str(formData, "footerPagesTitle"),
      footerContactTitle: str(formData, "footerContactTitle"),
    },
    create: { id: "main" },
  });
  const logoUrl = str(formData, "logoUrl") || "/logo.jpg";
  await prisma.siteImage.updateMany({ where: { slot: "logo" }, data: { imageUrl: logoUrl } });
  revalidatePublic();
  redirect("/admin/settings?saved=1");
}

export async function saveProduct(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const name = str(formData, "name");
  const givenSlug = str(formData, "slug");
  const slug = givenSlug || slugify(str(formData, "nameEn") || name);
  const data = {
    name,
    nameEn: str(formData, "nameEn"),
    slug,
    description: str(formData, "description"),
    benefits: str(formData, "benefits"),
    usage: str(formData, "usage"),
    takenWith: str(formData, "takenWith"),
    form: str(formData, "form") || "ٹیبلٹ",
    quantity: str(formData, "quantity"),
    price: num(formData, "price"),
    imageUrl: str(formData, "imageUrl"),
    forWhom: str(formData, "forWhom") || "both",
    unaniNote: str(formData, "unaniNote"),
    featured: bool(formData, "featured"),
    published: bool(formData, "published"),
    sortOrder: num(formData, "sortOrder"),
    categoryId: str(formData, "categoryId") || null,
  };
  if (id) await prisma.product.update({ where: { id }, data });
  else await prisma.product.create({ data });
  revalidatePublic();
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  await prisma.product.delete({ where: { id: str(formData, "id") } });
  revalidatePublic();
  redirect("/admin/products");
}

export async function saveBook(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const title = str(formData, "title");
  const slug = str(formData, "slug") || slugify(title);
  const data = {
    title,
    slug,
    description: str(formData, "description"),
    price: num(formData, "price"),
    imageUrl: str(formData, "imageUrl"),
    featured: bool(formData, "featured"),
    published: bool(formData, "published"),
    sortOrder: num(formData, "sortOrder"),
  };
  if (id) await prisma.book.update({ where: { id }, data });
  else await prisma.book.create({ data });
  revalidatePublic();
  redirect("/admin/books");
}

export async function deleteBook(formData: FormData) {
  await requireAdmin();
  await prisma.book.delete({ where: { id: str(formData, "id") } });
  revalidatePublic();
  redirect("/admin/books");
}

export async function saveBlog(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const title = str(formData, "title");
  const slug = str(formData, "slug") || slugify(title);
  const data = {
    title,
    slug,
    excerpt: str(formData, "excerpt"),
    content: str(formData, "content"),
    imageUrl: str(formData, "imageUrl"),
    category: str(formData, "category") || "طبی مشورہ",
    published: bool(formData, "published"),
  };
  if (id) await prisma.blogPost.update({ where: { id }, data });
  else await prisma.blogPost.create({ data });
  revalidatePublic();
  redirect("/admin/blog");
}

export async function deleteBlog(formData: FormData) {
  await requireAdmin();
  await prisma.blogPost.delete({ where: { id: str(formData, "id") } });
  revalidatePublic();
  redirect("/admin/blog");
}

export async function saveElder(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    name: str(formData, "name"),
    title: str(formData, "title"),
    photoUrl: str(formData, "photoUrl"),
    sortOrder: num(formData, "sortOrder"),
    published: bool(formData, "published"),
  };
  if (id) await prisma.elder.update({ where: { id }, data });
  else await prisma.elder.create({ data });
  revalidatePublic();
  redirect("/admin/elders");
}

export async function deleteElder(formData: FormData) {
  await requireAdmin();
  await prisma.elder.delete({ where: { id: str(formData, "id") } });
  revalidatePublic();
  redirect("/admin/elders");
}

export async function saveOffer(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    title: str(formData, "title"),
    description: str(formData, "description"),
    imageUrl: str(formData, "imageUrl"),
    active: bool(formData, "active"),
    sortOrder: num(formData, "sortOrder"),
  };
  if (id) await prisma.offer.update({ where: { id }, data });
  else await prisma.offer.create({ data });
  revalidatePublic();
  redirect("/admin/offers");
}

export async function deleteOffer(formData: FormData) {
  await requireAdmin();
  await prisma.offer.delete({ where: { id: str(formData, "id") } });
  revalidatePublic();
  redirect("/admin/offers");
}

export async function saveGallery(formData: FormData) {
  await requireAdmin();
  const imageUrl = str(formData, "imageUrl");
  if (!imageUrl) redirect("/admin/gallery");
  await prisma.galleryImage.create({
    data: {
      imageUrl,
      caption: str(formData, "caption"),
      sortOrder: num(formData, "sortOrder"),
    },
  });
  revalidatePublic();
  redirect("/admin/gallery");
}

export async function deleteGallery(formData: FormData) {
  await requireAdmin();
  await prisma.galleryImage.delete({ where: { id: str(formData, "id") } });
  revalidatePublic();
  redirect("/admin/gallery");
}

export async function markInquiryRead(formData: FormData) {
  await requireAdmin();
  await prisma.inquiry.update({
    where: { id: str(formData, "id") },
    data: { read: true },
  });
  revalidatePath("/admin/inquiries");
  redirect("/admin/inquiries");
}

export async function deleteInquiry(formData: FormData) {
  await requireAdmin();
  await prisma.inquiry.delete({ where: { id: str(formData, "id") } });
  revalidatePath("/admin/inquiries");
  redirect("/admin/inquiries");
}

export async function saveSiteImage(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const imageUrl = str(formData, "imageUrl");
  const label = str(formData, "label");
  if (!id || !imageUrl) redirect("/admin/pictures");
  await prisma.siteImage.update({
    where: { id },
    data: { imageUrl, ...(label ? { label } : {}) },
  });
  const row = await prisma.siteImage.findUnique({ where: { id } });
  if (row?.slot === "logo") {
    await prisma.setting.update({ where: { id: "main" }, data: { logoUrl: imageUrl } });
  }
  revalidatePublic();
  redirect("/admin/pictures?saved=1");
}

export async function addSiteImage(formData: FormData) {
  await requireAdmin();
  const imageUrl = str(formData, "imageUrl");
  const label = str(formData, "label") || "New picture";
  const group = str(formData, "group") || "ingredients";
  if (!imageUrl) redirect("/admin/pictures");
  const last = await prisma.siteImage.findFirst({
    where: { group },
    orderBy: { sortOrder: "desc" },
  });
  await prisma.siteImage.create({
    data: {
      slot: `${group}-${Date.now()}`,
      group,
      label,
      imageUrl,
      sortOrder: (last?.sortOrder || 0) + 1,
    },
  });
  revalidatePublic();
  redirect("/admin/pictures?saved=1");
}

export async function deleteSiteImage(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const row = await prisma.siteImage.findUnique({ where: { id } });
  if (row && (row.group === "ingredients" || row.slot.startsWith("extra-") || row.group === "extra")) {
    await prisma.siteImage.delete({ where: { id } });
  }
  revalidatePublic();
  redirect("/admin/pictures");
}

export async function saveItemPhoto(formData: FormData) {
  await requireAdmin();
  const kind = str(formData, "kind");
  const id = str(formData, "id");
  const imageUrl = str(formData, "imageUrl");
  if (!id || !imageUrl) redirect("/admin/pictures");
  if (kind === "product") await prisma.product.update({ where: { id }, data: { imageUrl } });
  if (kind === "book") await prisma.book.update({ where: { id }, data: { imageUrl } });
  if (kind === "blog") await prisma.blogPost.update({ where: { id }, data: { imageUrl } });
  if (kind === "elder") await prisma.elder.update({ where: { id }, data: { photoUrl: imageUrl } });
  revalidatePublic();
  redirect("/admin/pictures?saved=1");
}

export async function saveCategory(formData: FormData) {
  await requireAdmin();
  const name = str(formData, "name");
  await prisma.category.create({ data: { name, slug: slugify(str(formData, "slug") || name) } });
  revalidatePublic();
  redirect("/admin/products");
}
