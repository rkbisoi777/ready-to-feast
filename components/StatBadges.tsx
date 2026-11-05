import { stats } from "@/data/content";
import { reveal } from "@/lib/reveal";

export default function StatBadges() {
  return (
    <section aria-label="Highlights" className="border-b border-ink/10 bg-cream-light">
      <ul className="container-x grid grid-cols-3 gap-y-8 py-10 text-center md:grid-cols-6 md:divide-x md:divide-maroon/10">
        {stats.map((s, i) => (
          <li key={s.label} {...reveal(i, 70)}>
            <p className="font-display text-3xl font-extrabold text-maroon sm:text-5xl">{s.value}</p>
            <p className="mt-1 text-sm font-medium text-muted">{s.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
