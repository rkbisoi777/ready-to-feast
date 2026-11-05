"use client";

import Link from "next/link";
import { getProductSync } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import Sheet from "./Sheet";
import PackVisual from "./PackVisual";
import SpiceLevel from "./SpiceLevel";
import AddToCart from "./AddToCart";
import { ArrowIcon } from "./Icons";

export default function QuickView({ handle, onClose }: { handle: string | null; onClose: () => void }) {
  const p = handle ? getProductSync(handle) : undefined;
  return (
    <Sheet
      open={!!p}
      onClose={onClose}
      title={p?.title ?? "Product"}
      footer={p && <AddToCart key={p.handle} handle={p.handle} title={p.title} />}
    >
      {p && (
        <div className="px-5 py-5 sm:px-7">
          <div className="flex gap-5">
            <div className={`aspect-square h-36 shrink-0 overflow-hidden rounded-2xl bg-cream-light sm:h-44 ${p.images.length ? "" : "p-3"}`}>
              <PackVisual product={p} size="sm" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-3xl font-bold">{formatPrice(p.price)}</p>
              <p className="text-sm text-muted">
                {p.pack.pieces} · {p.pack.weight} · {p.pack.protein} protein
              </p>
              <div className="mt-2">
                <SpiceLevel level={p.spice} />
              </div>
              <p className="mt-2 font-medium">{p.tagline}</p>
            </div>
          </div>
          <p className="mt-5">{p.description}</p>
          <dl className="mt-4 space-y-1 text-sm">
            <div><dt className="inline font-semibold">Best paired with: </dt><dd className="inline">{p.pairings.join(", ")}</dd></div>
            <div><dt className="inline font-semibold">Allergens: </dt><dd className="inline">{p.allergens}</dd></div>
          </dl>
          <Link href={`/products/${p.handle}/`} onClick={onClose} className="mt-5 inline-flex items-center gap-1 font-display text-lg font-semibold uppercase text-ember hover:underline">
            View full details <ArrowIcon className="size-4" />
          </Link>
        </div>
      )}
    </Sheet>
  );
}
