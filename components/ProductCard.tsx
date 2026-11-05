import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import PackVisual from "./PackVisual";
import OrderButton from "./OrderButton";
import { BagPlusIcon } from "./Icons";

export default function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.handle}/`;
  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-2xl bg-cream-light">
        <Link href={href} className="block aspect-square p-[10%]" tabIndex={-1} aria-hidden>
          <div className="h-full transition-transform duration-300 group-hover:scale-[1.04]">
            <PackVisual product={product} />
          </div>
        </Link>
        <OrderButton
          handle={product.handle}
          label={`Order ${product.title}`}
          className="absolute bottom-3 right-3 z-10 grid size-11 place-items-center rounded-full border border-maroon/15 bg-white text-maroon shadow-sm transition-colors hover:bg-maroon hover:text-white"
        >
          <BagPlusIcon />
        </OrderButton>
      </div>
      <div className="mt-3 text-center">
        <h3 className="text-xl sm:text-2xl">
          <Link href={href} className="after:absolute after:inset-x-0 after:top-0 after:bottom-0 hover:text-ember">
            {product.title}
          </Link>
        </h3>
        <p className="mt-1 hidden text-sm text-muted sm:block">{product.tagline}</p>
        <p className="mt-1 font-display text-lg font-semibold text-ink">{formatPrice(product.price)}</p>
      </div>
      <span className="mx-auto mt-2 h-1 w-10 rounded-full" style={{ background: product.colorText === "#FFFFFF" ? product.color : product.colorText }} aria-hidden />
    </article>
  );
}
