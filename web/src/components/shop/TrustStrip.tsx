export function TrustStrip() {
  const items = [
    ["Natural herbs", "Pure ingredients"],
    ["Tried formula", "Tibb-e-Sabir"],
    ["WhatsApp order", "Fast reply"],
    ["Ask the Hakeem", "Dunyapur"],
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-green/10 md:grid-cols-4 md:divide-y-0">
        {items.map(([a, b]) => (
          <div key={a} className="px-4 py-8 text-center">
            <p className="font-display text-xl text-green-dark">{a}</p>
            <p className="mt-1 text-sm text-ink/55">{b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
