import type { ReactNode } from "react";
import { Footer, Header } from "@/components/Header";
import { IconWhatsApp } from "@/components/Icons";
import { getSettings } from "@/lib/settings";
import { waLink } from "@/lib/utils";

const hello = "Hello, Yasin Dava Khana Dunyapur. I need information.";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const s = await getSettings();

  return (
    <div className="flex min-h-full flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />

      <div className="fixed top-1/3 left-0 z-40 hidden flex-col md:flex">
        <a href="/contact" className="bg-[#f1c40f] px-2 py-6 text-[11px] font-bold tracking-wide text-[#222] [writing-mode:vertical-rl]">
          Contact Us
        </a>
        <a href={waLink(s.whatsapp1, hello)} target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center bg-[#25d366] text-white">
          <IconWhatsApp />
        </a>
        <a href={waLink(s.whatsapp2, hello)} target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center bg-[#128c7e] text-white">
          <IconWhatsApp />
        </a>
      </div>

      <a
        href={waLink(s.whatsapp1, hello)}
        target="_blank"
        rel="noreferrer"
        className="fixed right-3 z-40 flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-3 text-sm font-semibold text-white shadow-lg [bottom:calc(0.75rem+env(safe-area-inset-bottom))] md:hidden"
      >
        <IconWhatsApp /> WhatsApp
      </a>
    </div>
  );
}
