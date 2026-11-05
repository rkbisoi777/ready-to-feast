"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import QtyStepper from "./QtyStepper";
import { BagPlusIcon } from "./Icons";

export default function AddToCart({ handle, title, onAdded }: { handle: string; title: string; onAdded?: () => void }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  return (
    <div className="flex gap-3">
      <QtyStepper value={qty} onChange={setQty} min={1} label={title} size="lg" />
      <button
        type="button"
        className="btn-primary flex-1"
        onClick={() => {
          onAdded?.();
          add(handle, qty);
          setQty(1);
        }}
      >
        <BagPlusIcon /> Add to cart
      </button>
    </div>
  );
}
