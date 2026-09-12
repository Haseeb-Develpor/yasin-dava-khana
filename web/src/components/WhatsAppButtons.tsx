import { orderMessage, telHref, waLink } from "@/lib/utils";
import type { Setting } from "@/generated/prisma/client";

export function WhatsAppButtons({
  settings,
  itemName,
  price = 0,
}: {
  settings: Setting;
  itemName?: string;
  price?: number;
}) {
  const text = itemName
    ? orderMessage(itemName, price)
    : "Hello, Yasin Dava Khana Dunyapur. I need information.";

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={waLink(settings.whatsapp1, text)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-green px-4 py-2 text-sm text-white hover:bg-green-dark"
      >
        WhatsApp {settings.phone1}
      </a>
      <a
        href={waLink(settings.whatsapp2, text)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-green px-4 py-2 text-sm text-white hover:bg-green-dark"
      >
        WhatsApp {settings.phone2}
      </a>
    </div>
  );
}

export function CallButtons({ settings }: { settings: Setting }) {
  return (
    <div className="flex flex-wrap gap-2">
      <a href={telHref(settings.phone1)} className="inline-flex min-h-11 items-center rounded-md bg-green px-4 py-2 text-sm text-white hover:bg-green-dark">
        Call {settings.phone1}
      </a>
      <a href={telHref(settings.phone2)} className="inline-flex min-h-11 items-center rounded-md border border-green px-4 py-2 text-sm text-green">
        Call {settings.phone2}
      </a>
    </div>
  );
}
