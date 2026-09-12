"use client";

import { useState } from "react";

export function QtyBox() {
  const [n, setN] = useState(1);
  return (
    <div className="flex h-12 w-28 overflow-hidden border border-gray-200">
      <button type="button" className="w-10 text-lg" onClick={() => setN((v) => Math.max(1, v - 1))}>
        −
      </button>
      <input readOnly value={n} className="w-8 border-x border-gray-200 text-center text-sm" />
      <button type="button" className="w-10 text-lg" onClick={() => setN((v) => v + 1)}>
        +
      </button>
    </div>
  );
}
