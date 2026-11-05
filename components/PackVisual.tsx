import type { Product } from "@/lib/types";

/**
 * Shows the product's first photo, or a styled placeholder pack until real
 * photography is added in data/products.ts.
 */
export default function PackVisual({
  product,
  index = 0,
  priority = false,
  size = "md",
}: {
  product: Product;
  index?: number;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const img = product.images[index];
  if (img) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={img.url}
        alt={img.alt}
        width={img.width}
        height={img.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="h-full w-full object-contain"
      />
    );
  }

  const t = {
    sm: { brand: "text-[0.6rem] sm:text-sm lg:text-base", name: "text-sm sm:text-base lg:text-lg", badge: "size-9 sm:size-12 lg:size-14 text-[0.55rem] sm:text-[0.65rem] lg:text-xs" },
    md: { brand: "text-sm sm:text-base", name: "text-lg sm:text-2xl", badge: "size-11 sm:size-14 text-[0.6rem] sm:text-xs" },
    lg: { brand: "text-xl", name: "text-4xl", badge: "size-20 text-sm" },
  }[size];

  return (
    <div
      role="img"
      aria-label={`${product.title} pack`}
      className="relative mx-auto flex aspect-[3/4] h-full max-w-full flex-col overflow-hidden rounded-[10%/7.5%] shadow-md shadow-black/15"
    >
      <div className="flex h-[38%] items-center justify-center bg-maroon px-2">
        <span className={`text-center font-display font-extrabold uppercase leading-[0.85] text-white ${t.brand}`}>
          Ready to
          <br />
          <span className="text-[1.6em] text-mustard">Feast</span>
        </span>
      </div>
      <div className="relative flex flex-1 flex-col justify-between p-[8%]" style={{ background: product.color, color: product.colorText }}>
        <span className={`font-display font-extrabold uppercase leading-[0.9] ${t.name}`}>{product.title}</span>
        <span
          className={`self-start grid place-items-center rounded-full border-2 border-white/80 bg-maroon text-center font-display font-bold leading-none text-white ${t.badge}`}
        >
          <span>
            {product.pack.protein}
            <br />
            <span className="uppercase">protein</span>
          </span>
        </span>
      </div>
    </div>
  );
}
