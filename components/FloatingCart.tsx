"use client";

import { useCart } from "./CartProvider";
import { BagIcon } from "./Icons";

export default function FloatingCart() {
  const { count, openCart } = useCart();
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="fixed bottom-5 left-5 z-30 grid size-14 place-items-center rounded-full bg-maroon text-white shadow-lg shadow-black/25 transition-transform hover:scale-105"
    >
      <BagIcon className="size-7" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid min-w-6 place-items-center rounded-full bg-ember px-1.5 py-0.5 text-xs font-bold text-white ring-2 ring-white">
          {count}
        </span>
      )}
    </button>
  );
}
