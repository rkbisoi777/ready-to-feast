"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { getProductSync } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { orderTotal, submitOrder } from "@/lib/order";
import type { Customer } from "@/lib/types";
import { useCart } from "./CartProvider";
import Sheet from "./Sheet";
import QtyStepper from "./QtyStepper";
import { CheckIcon, TrashIcon, WhatsAppIcon } from "./Icons";

type Step = "cart" | "checkout" | "done";
const emptyCustomer: Customer = { name: "", phone: "", address: "", area: "", pincode: "", notes: "" };

export default function CartSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, count, setQty, clear } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ emailed: boolean; whatsappUrl: string; total: number } | null>(null);

  // Start at the cart each time it is reopened after an order or with an empty cart.
  useEffect(() => {
    if (open && (step === "done" || items.length === 0)) setStep("cart");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const total = orderTotal(items);

  function validate(): boolean {
    const e: typeof errors = {};
    const phone = customer.phone.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
    if (customer.name.trim().length < 2) e.name = "Please enter your name";
    if (!/^[6-9]\d{9}$/.test(phone)) e.phone = "Enter a valid 10-digit mobile number";
    if (customer.address.trim().length < 8) e.address = "Please enter your full address";
    if (!site.serviceAreas.includes(customer.area)) e.area = "Please choose your area";
    if (!/^4\d{5}$/.test(customer.pincode.trim())) e.pincode = "Enter a valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function placeOrder(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate() || items.length === 0) return;
    setSubmitting(true);
    const res = await submitOrder({ items, customer });
    setResult({ ...res, total });
    setSubmitting(false);
    setStep("done");
    clear();
  }

  const input = (key: keyof Customer) => ({
    id: `co-${key}`,
    name: key,
    value: customer[key] ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setCustomer((c) => ({ ...c, [key]: e.target.value })),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `co-${key}-error` : undefined,
    className: "input",
  });
  const FieldError = ({ k }: { k: keyof Customer }) =>
    errors[k] ? (
      <p id={`co-${k}-error`} className="mt-1 text-sm text-red-700">
        {errors[k]}
      </p>
    ) : null;

  const title = step === "cart" ? "Your cart" : step === "checkout" ? "Delivery details" : "Order placed!";
  const eyebrow = step === "cart" ? `${count} ${count === 1 ? "item" : "items"}` : step === "checkout" ? "Checkout" : undefined;

  /* ---------- Cart ---------- */
  if (step === "cart") {
    return (
      <Sheet
        open={open}
        onClose={onClose}
        title={title}
        eyebrow={eyebrow}
        footer={
          items.length > 0 && (
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted">Subtotal</p>
                <p className="font-display text-2xl font-bold">{formatPrice(total)}</p>
              </div>
              <button type="button" className="btn-primary" onClick={() => setStep("checkout")}>
                Checkout
              </button>
            </div>
          )
        }
      >
        {items.length === 0 ? (
          <div className="px-5 py-12 text-center sm:px-7">
            <p className="text-lg text-muted">Your cart is empty.</p>
            <Link href="/products/" onClick={onClose} className="btn-primary mt-6">
              Shop flavours
            </Link>
          </div>
        ) : (
          <div className="px-5 sm:px-7">
            <ul className="divide-y divide-ink/10">
              {items.map((i) => {
                const p = getProductSync(i.handle);
                if (!p) return null;
                return (
                  <li key={i.handle} className="flex items-center gap-3 py-4">
                    <span className="size-10 shrink-0 rounded-lg ring-1 ring-ink/15" style={{ background: p.color }} aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-lg font-semibold uppercase leading-tight">{p.title}</p>
                      <p className="text-sm text-muted">
                        {formatPrice(p.price)} × {i.quantity} = <span className="font-semibold text-ink">{formatPrice(p.price.amount * i.quantity)}</span>
                      </p>
                    </div>
                    <QtyStepper value={i.quantity} onChange={(v) => setQty(i.handle, v)} min={1} label={p.title} />
                    <button type="button" onClick={() => setQty(i.handle, 0)} className="rounded-full p-2 text-muted hover:bg-cream hover:text-red-700" aria-label={`Remove ${p.title}`}>
                      <TrashIcon />
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="pb-4 text-sm text-muted">We deliver across {site.serviceAreas.join(", ").replace(/, ([^,]*)$/, " & $1")}. Delivery is confirmed on WhatsApp.</p>
          </div>
        )}
      </Sheet>
    );
  }

  /* ---------- Checkout ---------- */
  if (step === "checkout") {
    return (
      <Sheet
        open={open}
        onClose={onClose}
        title={title}
        eyebrow={eyebrow}
        footer={
          <div className="flex items-center justify-between gap-3">
            <button type="button" className="font-display text-lg font-semibold uppercase text-maroon underline-offset-4 hover:underline" onClick={() => setStep("cart")}>
              Back
            </button>
            <button type="submit" form="checkout-form" className="btn-primary" disabled={submitting}>
              {submitting ? "Placing…" : `Place order · ${formatPrice(total)}`}
            </button>
          </div>
        }
      >
        <form id="checkout-form" onSubmit={placeOrder} noValidate className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-7">
          <div className="sm:col-span-2">
            <label htmlFor="co-name" className="mb-1 block font-medium">Full name *</label>
            <input {...input("name")} autoComplete="name" required />
            <FieldError k="name" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="co-phone" className="mb-1 block font-medium">Mobile / WhatsApp number *</label>
            <input {...input("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" required />
            <FieldError k="phone" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="co-address" className="mb-1 block font-medium">Delivery address *</label>
            <textarea {...input("address")} rows={2} autoComplete="street-address" placeholder="Flat / building, street, landmark" required />
            <FieldError k="address" />
          </div>
          <div>
            <label htmlFor="co-area" className="mb-1 block font-medium">Area *</label>
            <select {...input("area")} required>
              <option value="">Select area</option>
              {site.serviceAreas.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            <FieldError k="area" />
          </div>
          <div>
            <label htmlFor="co-pincode" className="mb-1 block font-medium">Pincode *</label>
            <input {...input("pincode")} inputMode="numeric" maxLength={6} autoComplete="postal-code" required />
            <FieldError k="pincode" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="co-notes" className="mb-1 block font-medium">Notes (optional)</label>
            <input {...input("notes")} placeholder="Preferred delivery time, etc." />
          </div>
          <p className="text-sm text-muted sm:col-span-2">We currently deliver only in {site.serviceAreas.join(", ")}.</p>
        </form>
      </Sheet>
    );
  }

  /* ---------- Done ---------- */
  return (
    <Sheet open={open} onClose={onClose} title={title}>
      {result && (
        <div className="px-5 py-8 text-center sm:px-7">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-green-100 text-green-700">
            <CheckIcon className="size-8" />
          </span>
          <p className="mx-auto mt-5 max-w-md text-lg">
            {result.emailed
              ? `We've received your order of ${formatPrice(result.total)}. Tap below to send it on WhatsApp so we can confirm delivery and payment faster.`
              : `Almost done! Tap below to send your order of ${formatPrice(result.total)} on WhatsApp and we'll confirm delivery and payment.`}
          </p>
          <a href={result.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6">
            <WhatsAppIcon className="size-6" /> Send order on WhatsApp
          </a>
        </div>
      )}
    </Sheet>
  );
}
