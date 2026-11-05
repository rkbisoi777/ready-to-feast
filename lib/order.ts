import { site } from "@/data/site";
import { getProductSync } from "./catalog";
import { formatPrice } from "./format";
import type { LineItem, Order } from "./types";

export function orderTotal(items: LineItem[]): number {
  return items.reduce((sum, i) => sum + (getProductSync(i.handle)?.price.amount ?? 0) * i.quantity, 0);
}

export function orderText(order: Order): string {
  const c = order.customer;
  const lines = order.items.map((i) => `• ${getProductSync(i.handle)?.title ?? i.handle} × ${i.quantity}`);
  return [
    `*New order – ${site.name}*`,
    "",
    ...lines,
    "",
    `*Total:* ${formatPrice(orderTotal(order.items))}`,
    "",
    `*Name:* ${c.name}`,
    `*Phone:* ${c.phone}`,
    `*Address:* ${c.address}, ${c.area} - ${c.pincode}`,
    c.notes ? `*Notes:* ${c.notes}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export function whatsappLink(text: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

/**
 * Sends the order by email (Web3Forms) and returns the WhatsApp link to open.
 * To move to Shopify later, replace this with a cart/checkout creation call.
 */
export async function submitOrder(order: Order): Promise<{ emailed: boolean; whatsappUrl: string }> {
  const text = orderText(order);
  let emailed = false;
  if (site.web3formsKey) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject: `New order from ${order.customer.name} – ${formatPrice(orderTotal(order.items))}`,
          from_name: site.name,
          message: text.replace(/\*/g, ""),
        }),
      });
      emailed = res.ok;
    } catch {
      emailed = false;
    }
  }
  return { emailed, whatsappUrl: whatsappLink(text) };
}
