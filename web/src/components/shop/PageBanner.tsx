export function PageBanner({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="hero-panel">
      <div className="relative px-4 py-12 text-center">
        <p className="section-kicker text-gold-light">Yasin Dava Khana</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">{title}</h1>
        <div className="gold-line mx-auto mt-4" />
        {subtitle ? <p className="mt-3 text-white/80">{subtitle}</p> : null}
      </div>
    </div>
  );
}
