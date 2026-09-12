type Variant = "wide" | "portrait" | "photo";

export function ClearPhoto({
  src,
  alt,
  variant = "photo",
}: {
  src: string;
  alt: string;
  variant?: Variant;
}) {
  if (variant === "wide") {
    return (
      <figure className="w-full">
        <div className="overflow-x-auto overscroll-x-contain bg-white [-webkit-overflow-scrolling:touch]">
          <a href={src} target="_blank" rel="noreferrer" className="block">
            <img src={src} alt={alt} className="h-auto w-[760px] max-w-none object-contain sm:w-full" />
          </a>
        </div>
        <figcaption className="mt-2 text-center text-xs text-[#888] sm:hidden">Swipe sideways to read · tap to open full</figcaption>
      </figure>
    );
  }

  const size = variant === "portrait" ? "max-w-[240px] sm:max-w-[280px]" : "max-w-xl";
  return <img src={src} alt={alt} className={`mx-auto ${size} w-full bg-white object-contain`} />;
}
