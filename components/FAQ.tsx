import { faqs } from "@/data/content";
import SectionHeading from "./SectionHeading";
import { PlusIcon } from "./Icons";

export default function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="container-x max-w-3xl">
        <SectionHeading id="faq-title" eyebrow="FAQ" title="Frequently asked questions" />
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-xl font-semibold uppercase text-maroon [&::-webkit-details-marker]:hidden">
                {f.q}
                <PlusIcon className="size-5 shrink-0 transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-5 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
