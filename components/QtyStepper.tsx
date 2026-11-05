"use client";

import { MinusIcon, PlusIcon } from "./Icons";

export default function QtyStepper({
  value,
  onChange,
  label,
  min = 0,
  size = "sm",
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
  min?: number;
  size?: "sm" | "lg";
}) {
  const btn = size === "lg" ? "size-12" : "size-9";
  return (
    <div className="inline-flex items-center rounded-full border border-ink/15 bg-white">
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} className={`grid ${btn} place-items-center rounded-full disabled:opacity-30`} aria-label={`Decrease ${label} quantity`}>
        <MinusIcon />
      </button>
      <span className="w-7 text-center font-semibold tabular-nums" aria-live="polite" aria-label={`${label} quantity`}>
        {value}
      </span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= 20} className={`grid ${btn} place-items-center rounded-full disabled:opacity-30`} aria-label={`Increase ${label} quantity`}>
        <PlusIcon />
      </button>
    </div>
  );
}
