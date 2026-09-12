"use client";

import { useState } from "react";

export function ProductTabs({
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
  const tabs = [
    { id: "desc", label: "Description" },
    { id: "ben", label: "Benefits" },
    { id: "use", label: "How to use" },
    { id: "info", label: "Additional information" },
  ];
  const [tab, setTab] = useState("desc");

  return (
    <div className="mt-12 border-t border-gray-200">
      <div className="flex flex-wrap gap-6 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`py-3 text-sm font-semibold uppercase ${tab === t.id ? "border-b-2 border-green text-green" : "text-[#777]"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="py-6 leading-8 text-[#555]">
        {tab === "desc" ? <p className="whitespace-pre-line">{description || "Description coming soon."}</p> : null}
        {tab === "ben" ? (
          benefits.length ? (
            <ul className="list-disc space-y-1 pl-5">
              {benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : (
            <p>Benefits coming soon.</p>
          )
        ) : null}
        {tab === "use" ? <p className="whitespace-pre-line">{usage || "Ask the Hakeem for dosage."}</p> : null}
        {tab === "info" ? (
          extra?.length ? (
            <table className="w-full max-w-lg text-sm">
              <tbody>
                {extra.map((row) => (
                  <tr key={row.label} className="border-b border-gray-100">
                    <th className="py-2 pr-6 text-left font-semibold text-[#333]">{row.label}</th>
                    <td className="py-2">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No extra details yet.</p>
          )
        ) : null}
      </div>
    </div>
  );
}
