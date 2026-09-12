import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-naskh",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-nastaliq",
});

export const metadata: Metadata = {
  title: {
    default: "Yasin Dava Khana | Dunyapur",
    template: "%s | Yasin Dava Khana",
  },
  description: "Herbal Unani medicines from Yasin Dava Khana, Dunyapur. Tibb-e-Sabir. Order on WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream text-ink">{children}</body>
    </html>
  );
}
