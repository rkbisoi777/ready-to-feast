import OrderButton from "./OrderButton";

export default function CTABanner() {
  return (
    <section aria-labelledby="cta-title" className="bg-ember py-14 text-center text-white sm:py-20">
      <div className="container-x">
        <h2 id="cta-title" className="text-5xl text-white sm:text-6xl">Your protein goals, minus the prep.</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">Choose your flavours and be ready to feast in 15 minutes.</p>
        <OrderButton className="btn-light mt-8">Order your feast</OrderButton>
      </div>
    </section>
  );
}
