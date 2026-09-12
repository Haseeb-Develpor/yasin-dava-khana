"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function submitInquiry(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const message = String(formData.get("message") || "").trim();
  if (!name || !phone || !message) redirect("/contact");
  await prisma.inquiry.create({ data: { name, phone, message } });
  redirect("/contact?sent=1");
}
