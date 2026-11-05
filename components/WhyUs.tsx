import Link from "next/link";
import { whyUs } from "@/data/content";
import { reveal } from "@/lib/reveal";

export default function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="why-us-title" className="section bg-cream">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
        <div {...reveal()}>
          <p className="eyebrow mb-3">Why choose us</p>
          <h2 id="why-us-title" className="text-4xl sm:text-6xl">Cooking healthy shouldn&rsquo;t be a chore.</h2>
          <p className="mt-5 text-lg text-muted">
            Tired of bland chicken breast? Sick of spending 45 minutes prepping, marinating and cleaning up just to hit your protein goals? We did the
            hard part. We marinate fresh, lean chicken breasts the proper way and deliver them to your door. You just pan-sear, air-fry or grill.
          </p>
          <Link href="/products/" className="btn-primary mt-8">
            Pick your flavours
          </Link>
        </div>
        <ul className="grid gap-4">
          {whyUs.map((w, i) => (
            <li key={w.title} {...reveal(i + 1, 120)} className="flex gap-5 rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-maroon/10">
              <span className="font-display text-4xl font-extrabold text-ember">0{i + 1}</span>
              <div>
                <h3 className="text-2xl">{w.title}</h3>
                <p className="mt-1 text-muted">{w.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
