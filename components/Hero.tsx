import Link from "next/link";
import type { Product } from "@/lib/types";
import PackVisual from "./PackVisual";
import { site } from "@/data/site";
import { WhatsAppIcon } from "./Icons";

// TODO(owner): swap the pack row for a real hero photo (e.g. /images/hero.webp, ~1600px wide).
export default function Hero({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="hero-title">
      <div className="bg-gradient-to-b from-cream-light to-cream">
        <div className="container-x grid grid-cols-4 items-end gap-2 pt-8 pb-2 sm:grid-cols-6 sm:gap-4 lg:grid-cols-8 lg:max-w-6xl">
          {products.map((p, i) => (
            <div
              key={p.handle}
              className={`aspect-[3/4] ${i % 2 ? "mb-3 sm:mb-6" : ""} ${i > 5 ? "hidden lg:block" : i > 3 ? "hidden sm:block" : ""}`}
            >
              <PackVisual product={p} size="sm" priority />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-maroon py-12 text-center sm:py-16">
        <div className="container-x">
          <h1 id="hero-title" className="text-5xl text-cream sm:text-7xl lg:text-8xl">
            House-made flavour.
            <br />
            Zero prep. Pure protein.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-medium text-mustard sm:text-xl">
            Tender, juicy chicken breasts marinated in real spices and ready in 15 minutes. No chopping, no messy marinating, no flavour compromises.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/products/" className="btn-light">
              Shop flavours now
            </Link>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border-2 border-white/70 text-white hover:bg-white hover:text-maroon"
            >
              <WhatsAppIcon className="size-5" /> Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
