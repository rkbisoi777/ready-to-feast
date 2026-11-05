import type { Money } from "./types";

export function formatPrice(m: Money | number): string {
  const amount = typeof m === "number" ? m : m.amount;
  return "₹" + amount.toLocaleString("en-IN");
}
