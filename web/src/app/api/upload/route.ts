import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function POST(req: Request) {
  const token = req.headers
    .get("cookie")
    ?.split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith("ydk_admin="))
    ?.slice("ydk_admin=".length);

  if (!token) return NextResponse.json({ error: "لاگ ان ضروری ہے" }, { status: 401 });

  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.AUTH_SECRET || "yasin-dava-khana-change-this-secret-key-2026"),
    );
  } catch {
    return NextResponse.json({ error: "لاگ ان ضروری ہے" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "فائل منتخب کریں" }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "فائل 8MB سے بڑی ہے" }, { status: 400 });
  }

  const ext = path.extname(file.name || "").toLowerCase() || ".jpg";
  const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".jfif"];
  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: "صرف تصویر اپلوڈ کریں" }, { status: 400 });
  }

  const safeExt = ext === ".jfif" ? ".jpg" : ext;
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${safeExt}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, name), buf);

  return NextResponse.json({ url: `/uploads/${name}` });
}
