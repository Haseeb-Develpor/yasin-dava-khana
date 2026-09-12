const defaults = [
  { src: "/ingredients/booti-01.png", label: "Chamomile" },
  { src: "/ingredients/booti-02.png", label: "Dried flowers" },
  { src: "/ingredients/booti-03.png", label: "Herbal roots" },
  { src: "/ingredients/booti-04.png", label: "Dried stems" },
  { src: "/ingredients/booti-05.png", label: "Jari booti" },
  { src: "/ingredients/booti-06.png", label: "Fresh & dry herbs" },
  { src: "/ingredients/booti-08.png", label: "Honeycomb" },
  { src: "/ingredients/booti-09.png", label: "Medicinal herbs" },
  { src: "/ingredients/booti-10.png", label: "Rose petals" },
  { src: "/ingredients/booti-11.png", label: "Red booti" },
];

export function IngredientMarquee({
  items = defaults,
}: {
  items?: { src: string; label: string }[];
}) {
  const list = items.length ? items : defaults;
  const row = [...list, ...list];
  return (
    <div className="ingredient-marquee mt-10">
      <div className="ingredient-track">
        {row.map((item, i) => (
          <figure key={`${item.src}-${i}`} className="ingredient-item">
            <div className="ingredient-circle">
              <img src={item.src} alt={item.label} />
            </div>
            <figcaption>{item.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
