import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import PackVisual from "./PackVisual";
import QuickViewButton from "./QuickViewButton";
import { BagPlusIcon } from "./Icons";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden rounded-2xl bg-cream-light">
        <QuickViewButton handle={product.handle} label={`Quick view ${product.title}`} className={`block aspect-square w-full ${product.images.length ? "" : "p-[10%]"}`}>
          <div className="h-full transition-transform duration-300 group-hover:scale-[1.04]">
            <PackVisual product={product} />
          </div>
        </QuickViewButton>
        <QuickViewButton
          handle={product.handle}
          label={`Add ${product.title} to cart`}
          className="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full border border-maroon/15 bg-white text-maroon shadow-sm transition-colors hover:bg-maroon hover:text-white"
        >
          <BagPlusIcon />
        </QuickViewButton>
      </div>
      <div className="mt-3 text-center">
        <h3 className="text-xl sm:text-2xl">
          <Link href={`/products/${product.handle}/`} className="hover:text-ember">
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
