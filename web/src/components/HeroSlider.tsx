"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type Slide = {
  image: string;
  title: string;
  text: string;
  href: string;
};

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const list = slides.length ? slides : [];

  useEffect(() => {
    if (list.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % list.length), 5000);
    return () => clearInterval(t);
  }, [list.length]);

  if (!list.length) return null;
  const s = list[i];

  return (
    <section className="hero-panel">
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <p className="section-kicker text-gold-light">Yasin Dava Khana · Dunyapur</p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{s.title}</h1>
          <div className="gold-line mt-4" />
          <p className="mt-4 max-w-xl text-lg leading-8 text-white/88">{s.text}</p>
          <Link href={s.href} className="btn-gold mt-7">
            Shop now
          </Link>
          {list.length > 1 ? (
            <div className="mt-8 flex gap-2">
              {list.map((_, n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`Slide ${n + 1}`}
                  onClick={() => setI(n)}
                  className={`h-2.5 rounded-full transition-all ${n === i ? "w-10 bg-gold" : "w-6 bg-white/35"}`}
                />
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex justify-center">
          <div className="rounded-[2rem] border border-gold/40 bg-white/95 p-4 shadow-2xl">
            <img src={s.image} alt={s.title} className="max-h-[400px] w-full max-w-md object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
