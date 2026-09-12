"use client";

import { useState } from "react";

export function ImageField({
  name,
  defaultUrl = "",
  label = "تصویر",
  previewClass = "mt-2 h-36 w-auto rounded-lg border border-gold/40 object-cover",
}: {
  name: string;
  defaultUrl?: string;
  label?: string;
  previewClass?: string;
}) {
  const [url, setUrl] = useState(defaultUrl);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "اپلوڈ ناکام");
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "اپلوڈ ناکام");
    } finally {
      setBusy(false);
    }
  }

  return (
    <label className="block space-y-2">
      <span className="text-sm text-maroon">{label}</span>
      <input type="hidden" name={name} value={url} />
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="block w-full text-sm file:ml-3 file:rounded-lg file:border-0 file:bg-maroon file:px-3 file:py-1.5 file:text-white"
      />
      {busy ? <p className="text-sm text-gold">اپلوڈ ہو رہی ہے…</p> : null}
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {url ? (
        <img src={url} alt="" className={previewClass} />
      ) : null}
    </label>
  );
}
