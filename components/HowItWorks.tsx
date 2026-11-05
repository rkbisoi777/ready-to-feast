import { steps } from "@/data/content";
import SectionHeading from "./SectionHeading";

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section">
      <div className="container-x">
        <SectionHeading id="how-title" eyebrow="How it works" title="Three steps to your feast" />
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-ink/10 p-7 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-maroon font-display text-2xl font-bold text-white">{i + 1}</span>
              <h3 className="mt-5 text-3xl">{s.title}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
