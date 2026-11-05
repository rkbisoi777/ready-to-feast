"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { orderTotal, submitOrder } from "@/lib/order";
import type { Customer, LineItem } from "@/lib/types";
import { CheckIcon, CloseIcon, MinusIcon, PlusIcon, WhatsAppIcon } from "./Icons";

type Request = { handle?: string; box?: boolean; id: number } | null;
type Step = "pick" | "details" | "done";

const emptyCustomer: Customer = { name: "", phone: "", email: "", address: "", city: site.city, pincode: "", date: "", notes: "" };

export default function OrderModal({ request, onClose }: { request: Request; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>("pick");
  const [qty, setQty] = useState<Record<string, number>>({});
  const [boxMode, setBoxMode] = useState(false);
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ emailed: boolean; whatsappUrl: string } | null>(null);

  // Open / close the native dialog when a request comes in.
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (request) {
      if (step === "done") {
        setStep("pick");
        setQty({});
        setResult(null);
      }
      if (request.box !== undefined) setBoxMode(request.box);
      if (request.handle) {
        const h = request.handle;
        setQty((q) => ({ ...(step === "done" ? {} : q), [h]: Math.max(q[h] ?? 0, 1) }));
      }
      if (!d.open) d.showModal();
      document.body.style.overflow = "hidden";
    } else if (d.open) {
      d.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  const items: LineItem[] = useMemo(
    () => Object.entries(qty).filter(([, n]) => n > 0).map(([handle, quantity]) => ({ handle, quantity })),
    [qty]
  );
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const total = orderTotal(items);
  const boxFull = count === site.boxSize;
  const canContinue = boxMode ? boxFull : count > 0;

  function change(handle: string, delta: number) {
    setQty((q) => {
      const next = Math.max(0, (q[handle] ?? 0) + delta);
      if (boxMode && delta > 0 && count >= site.boxSize) return q;
      return { ...q, [handle]: next };
    });
  }

  function handleClose() {
    document.body.style.overflow = "";
    onClose();
  }

  function validate(): boolean {
    const e: typeof errors = {};
    const phone = customer.phone.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
    if (customer.name.trim().length < 2) e.name = "Please enter your name";
    if (!/^[6-9]\d{9}$/.test(phone)) e.phone = "Enter a valid 10-digit mobile number";
    if (customer.email && !/^\S+@\S+\.\S+$/.test(customer.email)) e.email = "Enter a valid email";
    if (customer.address.trim().length < 8) e.address = "Please enter your full address";
    if (customer.city.trim().length < 2) e.city = "Please enter your city";
    if (!/^\d{6}$/.test(customer.pincode.trim())) e.pincode = "Enter a 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const res = await submitOrder({ items, boxMode, customer });
    setResult(res);
    setSubmitting(false);
    setStep("done");
  }

  const field = (key: keyof Customer) => ({
    id: `order-${key}`,
    name: key,
    value: customer[key] ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setCustomer((c) => ({ ...c, [key]: e.target.value })),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `order-${key}-error` : undefined,
    className: "input",
  });

  const FieldError = ({ k }: { k: keyof Customer }) =>
    errors[k] ? (
      <p id={`order-${k}-error`} className="mt-1 text-sm text-red-700">
        {errors[k]}
      </p>
    ) : null;

  const today = new Date().toISOString().slice(0, 10);

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={(e) => e.target === ref.current && handleClose()}
      aria-labelledby="order-title"
      className="m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-hidden rounded-t-3xl bg-white p-0 text-ink sm:m-auto sm:max-w-2xl sm:rounded-3xl"
    >
      <div className="flex max-h-[92dvh] flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4 sm:px-7">
          <div>
            <p className="eyebrow">{step === "pick" ? "Step 1 of 2" : step === "details" ? "Step 2 of 2" : "Order placed"}</p>
            <h2 id="order-title" className="text-3xl">
              {step === "pick" ? "Build your order" : step === "details" ? "Delivery details" : "Thank you!"}
            </h2>
          </div>
          <button type="button" onClick={handleClose} className="-mr-2 rounded-full p-2 hover:bg-cream" aria-label="Close order form">
            <CloseIcon />
          </button>
        </div>

        {/* Step 1: products */}
        {step === "pick" && (
          <>
            <div className="overflow-y-auto px-5 py-5 sm:px-7">
              <div role="radiogroup" aria-label="Order type" className="grid grid-cols-2 gap-2 rounded-full bg-cream p-1">
                {[
                  { v: false, label: "Individual packs" },
                  { v: true, label: `Custom ${site.boxSize}-pack box` },
                ].map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    role="radio"
                    aria-checked={boxMode === o.v}
                    onClick={() => setBoxMode(o.v)}
                    className={`rounded-full px-3 py-2 font-display text-base font-semibold uppercase tracking-wide transition-colors ${
                      boxMode === o.v ? "bg-maroon text-white" : "text-maroon"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              {boxMode && (
                <p className={`mt-3 text-center text-sm font-medium ${boxFull ? "text-green-700" : "text-muted"}`} aria-live="polite">
                  {boxFull ? "Your box is full!" : `${count} of ${site.boxSize} slots filled — mix any flavours.`}
                </p>
              )}

              <ul className="mt-4 divide-y divide-ink/10">
                {products.map((p) => {
                  const n = qty[p.handle] ?? 0;
                  return (
                    <li key={p.handle} className="flex items-center gap-3 py-3">
                      <span className="size-4 shrink-0 rounded-full ring-1 ring-ink/20" style={{ background: p.color }} aria-hidden />
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-lg font-semibold uppercase leading-tight">{p.title}</p>
                        <p className="text-sm text-muted">
                          {formatPrice(p.price)} · {p.pack.weight}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 rounded-full border border-ink/15">
                        <button
                          type="button"
                          onClick={() => change(p.handle, -1)}
                          disabled={n === 0}
                          className="grid size-9 place-items-center rounded-full disabled:opacity-30"
                          aria-label={`Remove one ${p.title}`}
                        >
                          <MinusIcon />
                        </button>
                        <span className="w-6 text-center font-semibold tabular-nums" aria-live="polite">
                          {n}
                        </span>
                        <button
                          type="button"
                          onClick={() => change(p.handle, 1)}
                          disabled={boxMode && count >= site.boxSize}
                          className="grid size-9 place-items-center rounded-full disabled:opacity-30"
                          aria-label={`Add one ${p.title}`}
                        >
                          <PlusIcon />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-ink/10 bg-cream-light px-5 py-4 sm:px-7">
              <div>
                <p className="text-sm text-muted">
                  {count} {count === 1 ? "pack" : "packs"}
                </p>
                <p className="font-display text-2xl font-bold">{formatPrice(total)}</p>
              </div>
              <button type="button" className="btn-primary" disabled={!canContinue} onClick={() => setStep("details")}>
                Continue
              </button>
            </div>
          </>
        )}

        {/* Step 2: details */}
        {step === "details" && (
          <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-col">
            <div className="grid gap-4 overflow-y-auto px-5 py-5 sm:grid-cols-2 sm:px-7">
              <div className="sm:col-span-2">
                <label htmlFor="order-name" className="mb-1 block font-medium">Full name *</label>
                <input {...field("name")} autoComplete="name" required />
                <FieldError k="name" />
              </div>
              <div>
                <label htmlFor="order-phone" className="mb-1 block font-medium">WhatsApp number *</label>
                <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" required />
                <FieldError k="phone" />
              </div>
              <div>
                <label htmlFor="order-email" className="mb-1 block font-medium">Email (optional)</label>
                <input {...field("email")} type="email" autoComplete="email" />
                <FieldError k="email" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="order-address" className="mb-1 block font-medium">Delivery address *</label>
                <textarea {...field("address")} rows={2} autoComplete="street-address" required />
                <FieldError k="address" />
              </div>
              <div>
                <label htmlFor="order-city" className="mb-1 block font-medium">City *</label>
                <input {...field("city")} autoComplete="address-level2" required />
                <FieldError k="city" />
              </div>
              <div>
                <label htmlFor="order-pincode" className="mb-1 block font-medium">Pincode *</label>
                <input {...field("pincode")} inputMode="numeric" maxLength={6} autoComplete="postal-code" required />
                <FieldError k="pincode" />
              </div>
              <div>
                <label htmlFor="order-date" className="mb-1 block font-medium">Preferred delivery date</label>
                <input {...field("date")} type="date" min={today} />
              </div>
              <div>
                <label htmlFor="order-notes" className="mb-1 block font-medium">Notes</label>
                <input {...field("notes")} placeholder="Delivery time, landmark…" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-ink/10 bg-cream-light px-5 py-4 sm:px-7">
              <button type="button" className="font-display text-lg font-semibold uppercase text-maroon underline-offset-4 hover:underline" onClick={() => setStep("pick")}>
                Back
              </button>
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? "Placing…" : `Place order · ${formatPrice(total)}`}
              </button>
            </div>
          </form>
        )}

        {/* Done */}
        {step === "done" && result && (
          <div className="overflow-y-auto px-5 py-8 text-center sm:px-7">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-green-100 text-green-700">
              <CheckIcon className="size-8" />
            </span>
            <p className="mx-auto mt-5 max-w-md text-lg">
              {result.emailed
                ? "We've received your order. Tap below to send it on WhatsApp so we can confirm delivery and payment faster."
                : "Almost done! Tap below to send your order on WhatsApp and we'll confirm delivery and payment."}
            </p>
            <a href={result.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6">
              <WhatsAppIcon className="size-6" /> Send order on WhatsApp
            </a>
            <p className="mt-6 text-sm text-muted">
              Questions? Email us at{" "}
              <a href={`mailto:${site.email}`} className="underline">
                {site.email}
              </a>
            </p>
          </div>
        )}
      </div>
    </dialog>
  );
}
