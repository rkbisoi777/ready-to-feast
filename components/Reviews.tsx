import { reviews } from "@/data/content";
import SectionHeading from "./SectionHeading";
import { StarIcon } from "./Icons";

export default function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="section bg-cream-light">
      <div className="container-x">
        <SectionHeading id="reviews-title" eyebrow="Reviews" title="People are eating well." />
        <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {reviews.map((r) => (
            <li key={r.name}>
              <figure className="h-full rounded-2xl bg-white p-7 shadow-sm">
                <div className="flex text-mustard" role="img" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <StarIcon key={i} className="size-5" />
                  ))}
                </div>
                <blockquote className="mt-4 text-lg">&ldquo;{r.quote}&rdquo;</blockquote>
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
