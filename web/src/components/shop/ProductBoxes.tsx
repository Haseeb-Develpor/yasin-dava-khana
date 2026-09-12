export function ProductBoxes({
  description,
  benefits,
  usage,
  extra,
}: {
  description: string;
  benefits: string[];
  usage?: string;
  extra?: { label: string; value: string }[];
}) {
  return (
    <div className="mt-10 space-y-5">
      <article className="overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-[#fdf6e8]">
        <h2 className="bg-[#6b1c22] px-4 py-3 font-display text-xl text-white sm:px-5 sm:text-2xl">Description</h2>
        <p className="whitespace-pre-line p-5 leading-8 text-[#444]">{description || "Description coming soon."}</p>
      </article>

      <div className="grid gap-5 md:grid-cols-2">
        <article className="overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-[#fdf6e8]">
          <h2 className="bg-[#6b1c22] px-4 py-3 font-display text-xl text-white sm:px-5 sm:text-2xl">Benefits</h2>
          {benefits.length ? (
            <ul className="space-y-3 p-5">
              {benefits.map((b) => (
                <li key={b} className="flex gap-3 leading-7 text-[#333]">
                  <span className="mt-0.5 shrink-0 text-[#1e6b45]">●</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-5">Benefits coming soon.</p>
          )}
        </article>

        <article className="overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-[#fdf6e8]">
          <h2 className="bg-[#6b1c22] px-4 py-3 font-display text-xl text-white sm:px-5 sm:text-2xl">How to use</h2>
          <p className="whitespace-pre-line p-5 leading-8 text-[#333]">{usage || "Ask the Hakeem for dosage."}</p>
        </article>
      </div>

      {extra?.length ? (
        <article className="overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-[#fdf6e8]">
          <h2 className="bg-[#6b1c22] px-4 py-3 font-display text-xl text-white sm:px-5 sm:text-2xl">Additional information</h2>
          <table className="w-full text-sm">
            <tbody>
              {extra.map((row) => (
                <tr key={row.label} className="border-b border-[#ead9b0] last:border-0">
                  <th className="px-5 py-3 text-left font-semibold text-[#6b1c22]">{row.label}</th>
                  <td className="px-5 py-3 text-[#444]">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      ) : null}

      <p className="text-center text-xs leading-6 text-[#777]">
        Traditional hikmat information from Yasin Dava Khana, Dunyapur. Ask the Hakeem before use. This is not a hospital
        diagnosis.
      </p>
    </div>
  );
}
