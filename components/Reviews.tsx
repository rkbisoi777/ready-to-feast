import { reviews } from "@/data/content";
import SectionHeading from "./SectionHeading";
import { StarIcon } from "./Icons";
import { reveal } from "@/lib/reveal";

export default function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="section bg-cream-light">
      <div className="container-x">
        <SectionHeading id="reviews-title" eyebrow="Reviews" title="People are eating well." />
        <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {reviews.map((r, i) => (
            <li key={r.name} {...reveal(i, 150)}>
              <figure className="relative h-full overflow-hidden rounded-2xl bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-maroon/10 sm:p-9">
                <span aria-hidden className="pointer-events-none absolute -right-2 -top-8 font-display text-[10rem] leading-none text-cream">&rdquo;</span>
                <div className="relative flex text-mustard" role="img" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <StarIcon key={i} className="size-5" />
                  ))}
                </div>
                <blockquote className="relative mt-4 text-lg">&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption className="mt-5">
                  <span className="font-display text-xl font-bold uppercase text-maroon">{r.name}</span>
                  <span className="text-muted"> · {r.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
