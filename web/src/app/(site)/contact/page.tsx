import { submitInquiry } from "@/actions/inquiries";
import { CallButtons, WhatsAppButtons } from "@/components/WhatsAppButtons";
import { Breadcrumb } from "@/components/shop/Breadcrumb";
import { getSettings } from "@/lib/settings";

export const metadata = { title: "Contact Us" };
export const dynamic = "force-dynamic";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;
  const s = await getSettings();

  return (
    <div className="bg-white pb-16">
      <section className="bg-[#f6f1e8] py-8 text-center sm:py-12">
        <p className="text-xs font-semibold tracking-[0.2em] text-green">CONTACT US</p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl">We are in Dunyapur</h1>
        <p className="mx-auto mt-3 max-w-xl text-[#555]">Call or WhatsApp for order, price, and herbal advice.</p>
      </section>

      <div className="mx-auto max-w-[1100px] px-4 py-10">
        <Breadcrumb items={[{ label: "Contact Us" }]} />
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">Customer Support</h2>
            <p className="mt-4 leading-8">Yasin Dava Khana Dunyapur</p>
            <p className="text-[#666]">Dunyapur</p>
            <p className="mt-2">Daily 9:00 AM – 8:00 PM</p>
            <p className="mt-4 text-lg">{s.phone1}</p>
            <p className="text-lg">{s.phone2}</p>
            <div className="mt-6 space-y-3">
              <CallButtons settings={s} />
              <WhatsAppButtons settings={s} />
            </div>
          </div>
          <form action={submitInquiry} className="space-y-4 border border-gray-100 p-6">
            <h2 className="font-display text-3xl">Contact Form</h2>
            {sent ? <p className="bg-green/10 p-3 text-green">Message received. Thank you.</p> : null}
            <input required name="name" placeholder="Name" className="input-shop" />
            <input required name="phone" placeholder="Phone*" className="input-shop" />
            <textarea required name="message" rows={5} placeholder="Message" className="input-shop" />
            <button className="btn-cart">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
