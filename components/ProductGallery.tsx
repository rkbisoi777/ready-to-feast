"use client";

import { useRef, useState } from "react";
import type { Product } from "@/lib/types";
import PackVisual from "./PackVisual";

/** Swipeable gallery using CSS scroll-snap — no carousel library. */
export default function ProductGallery({ product }: { product: Product }) {
  const slides = Math.max(product.images.length, 1);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function onScroll() {
    const el = track.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  }

  function go(i: number) {
    const el = track.current;
    el?.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="bg-cream-light lg:rounded-l-3xl">
      <div ref={track} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto" aria-label={`${product.title} images`}>
        {Array.from({ length: slides }).map((_, i) => (
          <div key={i} className="aspect-square w-full shrink-0 snap-center p-10 sm:p-16">
            <PackVisual product={product} index={i} priority={i === 0} size="lg" />
          </div>
        ))}
      </div>
      {slides > 1 && (
        <div className="flex justify-center gap-2 pb-5">
          {Array.from({ length: slides }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={active === i}
              className={`size-2.5 rounded-full ${active === i ? "bg-maroon" : "bg-maroon/25"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
