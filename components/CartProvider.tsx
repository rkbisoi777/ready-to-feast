"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { LineItem } from "@/lib/types";
import { getProductSync } from "@/lib/catalog";
import CartSheet from "./CartSheet";
import QuickView from "./QuickView";

type View = { type: "cart" } | { type: "quick"; handle: string } | null;

type Ctx = {
  items: LineItem[];
  count: number;
  add: (handle: string, quantity?: number) => void;
  setQty: (handle: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  openQuickView: (handle: string) => void;
};

const CartContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "rtf-cart";

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<LineItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<View>(null);

  // Remember the cart between visits on this device (optional convenience).
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as LineItem[];
      setItems(saved.filter((i) => getProductSync(i.handle) && i.quantity > 0));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const setQty = useCallback((handle: string, quantity: number) => {
    setItems((prev) => {
      const q = Math.max(0, Math.min(20, quantity));
      if (q === 0) return prev.filter((i) => i.handle !== handle);
      return prev.some((i) => i.handle === handle)
        ? prev.map((i) => (i.handle === handle ? { ...i, quantity: q } : i))
        : [...prev, { handle, quantity: q }];
    });
  }, []);

  const add = useCallback(
    (handle: string, quantity = 1) => {
      setItems((prev) => {
        const current = prev.find((i) => i.handle === handle)?.quantity ?? 0;
        const q = Math.min(20, current + quantity);
        return current ? prev.map((i) => (i.handle === handle ? { ...i, quantity: q } : i)) : [...prev, { handle, quantity: q }];
      });
      setView({ type: "cart" });
    },
    []
  );

  const value = useMemo<Ctx>(
    () => ({
      items,
      count: items.reduce((s, i) => s + i.quantity, 0),
      add,
      setQty,
      clear: () => setItems([]),
      openCart: () => setView({ type: "cart" }),
      openQuickView: (handle) => setView({ type: "quick", handle }),
    }),
    [items, add, setQty]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <QuickView handle={view?.type === "quick" ? view.handle : null} onClose={() => setView((v) => (v?.type === "quick" ? null : v))} />
      <CartSheet open={view?.type === "cart"} onClose={() => setView((v) => (v?.type === "cart" ? null : v))} />
    </CartContext.Provider>
  );
}
