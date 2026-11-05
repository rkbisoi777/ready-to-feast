import { steps } from "@/data/content";
import { reveal } from "@/lib/reveal";
import SectionHeading from "./SectionHeading";

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section">
      <div className="container-x">
        <SectionHeading id="how-title" eyebrow="How it works" title="Three steps to your feast" />
        <ol className="relative grid gap-6 md:grid-cols-3 md:before:absolute md:before:left-[16%] md:before:right-[16%] md:before:top-[3.75rem] md:before:border-t-2 md:before:border-dashed md:before:border-maroon/20">
          {steps.map((s, i) => (
            <li key={s.title} {...reveal(i, 150)} className="relative rounded-2xl border border-ink/10 bg-white p-7 text-center transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-maroon/10">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-maroon font-display text-2xl font-bold text-white ring-8 ring-cream">{i + 1}</span>
              <h3 className="mt-5 text-3xl">{s.title}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
