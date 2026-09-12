import { ClearPhoto } from "@/components/ClearPhoto";
import { Breadcrumb } from "@/components/shop/Breadcrumb";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { getSiteImageMap, pic } from "@/lib/siteImages";
import { waLink } from "@/lib/utils";

export const metadata = { title: "About Us" };
export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const s = await getSettings();
  const [elders, pics] = await Promise.all([
    prisma.elder.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    getSiteImageMap(),
  ]);

  return (
    <div className="bg-white pb-16">
      <section className="bg-[#f6f1e8]">
        <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-4 py-10 sm:gap-10 sm:py-14 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-3xl leading-tight text-[#1a1a1a] sm:text-5xl">
              Rooted in Unani wisdom.
              <span className="mt-1 block text-green">Committed to your wellness.</span>
            </h1>
            <p className="mt-5 max-w-xl leading-8 text-[#555]">
              Yasin Dava Khana, Dunyapur prepares herbal medicines on Qanoon-e-Mufrad Aaza and Tibb-e-Sabir. Ask the
              Hakeem before using any medicine.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              {["Natural herbal formula", "Hakeem supervised", "WhatsApp orders", "Clinic in Dunyapur"].map((t) => (
                <p key={t} className="border border-[#e6dcc8] bg-white px-3 py-3">
                  {t}
                </p>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 shadow-sm">
            <ClearPhoto src={pic(pics, "hakeem-yasin")} alt="Hakeem Muhammad Yasin Dunyapuri" variant="portrait" />
            <p className="mt-4 text-center font-display text-2xl">Hakeem Muhammad Yasin Dunyapuri</p>
            <p className="text-center text-sm text-[#777]">Yasin Dava Khana, Dunyapur</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1100px] px-4 py-10">
        <Breadcrumb items={[{ label: "About Us" }]} />

        <p className="text-center text-xs font-semibold tracking-[0.2em] text-green">FOUNDER OF THE METHOD</p>
        <h2 className="section-rule mt-2 text-center font-display text-3xl sm:text-4xl">Hazrat Dost Muhammad Sabir Multani</h2>
        <div className="mx-auto mt-8 max-w-lg border border-gray-100 bg-white p-4">
          <ClearPhoto src={pic(pics, "sabir")} alt="Hazrat Dost Muhammad Sabir Multani" />
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center leading-8 text-[#555]">
          Aristotle of the age. Ibn Sina of the time. Teacher of hakeems, Father of Healing, and the founder of
          Tibb-e-Sabir and Qanoon-e-Mufrad Aaza.
        </p>

        <p className="mt-16 text-center text-xs font-semibold tracking-[0.2em] text-green">OUR METHOD</p>
        <h2 className="section-rule mt-2 text-center font-display text-3xl sm:text-4xl">Qanoon-e-Mufrad Aaza</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center leading-8 text-[#555]">
          A hikmat method that focuses on simple organs — brain, heart, and liver. On mobile, swipe the chart sideways
          to read every line, or tap to open it full size.
        </p>
        <div className="mt-8 border border-gray-100 bg-white p-2 sm:p-4">
          <ClearPhoto src={pic(pics, "qanoon")} alt="Qanoon-e-Mufrad Aaza chart" variant="wide" />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {[
            ["Tibb-e-Sabir", "Tried herbal formula"],
            ["Qanoon-e-Mufrad Aaza", "Our special method"],
            ["Dunyapur", "Visit or WhatsApp"],
          ].map(([a, b]) => (
            <div key={a} className="border border-gray-100 p-6 text-center">
              <p className="font-display text-2xl">{a}</p>
              <p className="mt-1 text-sm text-[#777]">{b}</p>
            </div>
          ))}
        </div>

        <p className="mt-16 text-center text-xs font-semibold tracking-[0.2em] text-green">OUR VALUES</p>
        <h2 className="section-rule mt-2 text-center font-display text-3xl sm:text-4xl">The Principles That Guide Us</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {[
            ["Natural & Safe", "We use natural herbal ingredients."],
            ["Quality First", "Every medicine is prepared with care."],
            ["Authentic Unani", "Rooted in Tibb-e-Sabir."],
            ["Patient-Centric", "Ask the Hakeem before you start."],
            ["Knowledge", "Traditional hikmat and experience."],
            ["Community", "Serving families in Dunyapur."],
          ].map(([a, b]) => (
            <div key={a} className="border border-gray-100 p-6">
              <h3 className="font-display text-2xl">{a}</h3>
              <p className="mt-2 text-sm leading-6 text-[#666]">{b}</p>
            </div>
          ))}
        </div>

        <p className="mt-16 text-center text-xs font-semibold tracking-[0.2em] text-green">OUR HAKEEM</p>
        <h2 className="section-rule mt-2 text-center font-display text-3xl sm:text-4xl">Meet Our Hakeem</h2>
        <div className="mt-10 grid items-start gap-8 md:grid-cols-2">
          <div className="border border-gray-100 bg-white p-6 text-center">
            <ClearPhoto src={pic(pics, "hakeem-yasin")} alt="Hakeem Muhammad Yasin Dunyapuri" variant="portrait" />
            <p className="mt-4 font-display text-xl">Hakeem Muhammad Yasin Dunyapuri</p>
            <p className="text-sm text-[#777]">Yasin Dava Khana, Dunyapur</p>
          </div>
          <div className="border border-gray-100 bg-white p-6 text-center">
            <ClearPhoto src={pic(pics, "hakeem-yunus")} alt="Hakeem Yunus Yasin Dunyapuri" variant="portrait" />
            <p className="mt-4 font-display text-xl">Hakeem Yunus Yasin Dunyapuri</p>
            <p className="text-sm text-[#777]">Karachi</p>
          </div>
        </div>
        <div className="mt-8 border border-gray-100 bg-white p-3">
          <ClearPhoto src={pic(pics, "hakeem-pair")} alt="Hakeem Yasin Dunyapuri and Hakeem Yunus Yasin Dunyapuri" />
        </div>
        {elders.length ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {elders.map((e) => (
              <div key={e.id} className="border border-gray-100 p-6 text-center">
                <p className="font-display text-xl">{/[ء-ی]/.test(e.name) ? "Hakeem" : e.name}</p>
                <a
                  href={waLink(s.whatsapp1, "Hello, I want to consult the Hakeem.")}
                  className="mt-3 inline-block text-sm text-green"
                  target="_blank"
                  rel="noreferrer"
                >
                  Consult
                </a>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
