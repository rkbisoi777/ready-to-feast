import Link from "next/link";
import { site } from "@/data/site";
import { WhatsAppIcon } from "./Icons";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <div className="bg-cream-light">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.webp"
          alt="All eight Ready to Feast marinated chicken breast flavours"
          width={1376}
          height={768}
          fetchPriority="high"
          className="mx-auto aspect-[16/9] w-full max-w-[1600px] object-cover object-bottom sm:aspect-[21/9]"
        />
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
