import Link from "next/link";

export default function CTABanner() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-ember py-16 text-center text-white sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-white/10" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-20 size-96 rounded-full bg-maroon/20" />
      <div className="container-x relative" data-reveal>
        <h2 id="cta-title" className="text-5xl text-white sm:text-6xl">Your protein goals, minus the prep.</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">Choose your flavours and be ready to feast in 15 minutes.</p>
        <Link href="/products/" className="btn-light mt-8">Order your feast</Link>
      </div>
    </section>
  );
}
