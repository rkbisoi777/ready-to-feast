import Link from "next/link";
import { site } from "@/data/site";
import { WhatsAppIcon } from "./Icons";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <div className="overflow-hidden bg-cream-light">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.webp"
          alt="All eight Ready to Feast marinated chicken breast flavours"
          width={1376}
          height={768}
          fetchPriority="high"
          className="mx-auto aspect-[16/9] w-full max-w-[1600px] animate-hero-zoom object-cover object-bottom sm:aspect-[21/9]"
        />
      </div>
      <div className="relative overflow-hidden bg-maroon py-12 text-center sm:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_20rem_at_50%_0%,rgb(242_179_61/0.12),transparent)]" />
        <div className="container-x relative">
          <h1 id="hero-title" className="text-5xl text-cream sm:text-7xl lg:text-8xl">
            <span className="block animate-fade-up [animation-delay:150ms]">House-made flavour.</span>
            <span className="block animate-fade-up [animation-delay:300ms]">Zero prep. Pure protein.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-lg font-medium text-mustard [animation-delay:450ms] sm:text-xl">
            Tender, juicy chicken breasts marinated in real spices and ready in 15 minutes. No chopping, no messy marinating, no flavour compromises.
          </p>
          <div className="mt-8 flex animate-fade-up flex-col items-center justify-center gap-3 [animation-delay:600ms] sm:flex-row">
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
