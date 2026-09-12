import Link from "next/link";

export function PageHero({
  kicker = "Yasin Dava Khana · Dunyapur",
  title,
  text,
  image,
  actionHref = "/medicines",
  actionLabel = "Shop now",
}: {
  kicker?: string;
  title: string;
  text: string;
  image: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <section className="hero-panel">
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <p className="section-kicker text-gold-light">{kicker}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
          <div className="gold-line mt-4" />
          <p className="mt-4 max-w-xl text-lg leading-8 text-white/88">{text}</p>
          {actionHref.startsWith("http") ? (
            <a href={actionHref} target="_blank" rel="noreferrer" className="btn-gold mt-7">
              {actionLabel}
            </a>
          ) : (
            <Link href={actionHref} className="btn-gold mt-7">
              {actionLabel}
            </Link>
          )}
        </div>
        <div className="flex justify-center">
          <div className="rounded-[2rem] border border-gold/40 bg-white/95 p-4 shadow-2xl">
            <img src={image} alt={title} className="max-h-[380px] w-full max-w-md object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
