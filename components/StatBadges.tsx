import { stats } from "@/data/content";

export default function StatBadges() {
  return (
    <section aria-label="Highlights" className="border-b border-ink/10 bg-cream-light">
      <ul className="container-x grid grid-cols-3 gap-y-6 py-8 text-center md:grid-cols-6">
        {stats.map((s) => (
          <li key={s.label}>
            <p className="font-display text-3xl font-extrabold text-maroon sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-sm font-medium text-muted">{s.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
