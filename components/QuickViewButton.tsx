"use client";

import { useCart } from "./CartProvider";

export default function QuickViewButton({ handle, className, label, children }: { handle: string; className?: string; label: string; children: React.ReactNode }) {
  const { openQuickView } = useCart();
  return (
    <button type="button" className={className} aria-label={label} onClick={() => openQuickView(handle)}>
      {children}
    </button>
  );
}
