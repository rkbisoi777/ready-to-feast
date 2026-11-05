import { cooking, storage } from "@/data/content";

export default function CookingStorage({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-labelledby="cook-title" className={compact ? "" : "section bg-maroon text-white"}>
      <div className={compact ? "" : "container-x"}>
        {!compact && (
          <div className="mb-10 text-center">
            <p className="eyebrow mb-3 !text-mustard">Ready to cook marinade, fresh to your door</p>
            <h2 id="cook-title" className="text-4xl text-cream sm:text-5xl">Cooking &amp; storage</h2>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          <div className={`rounded-2xl p-7 ${compact ? "bg-cream" : "bg-white/5 ring-1 ring-white/15"}`}>
            <h3 id={compact ? "cook-title" : undefined} className={`text-3xl ${compact ? "" : "text-mustard"}`}>Cooking instructions</h3>
            <dl className="mt-4 space-y-4">
              {cooking.map((c) => (
                <div key={c.title}>
                  <dt className="font-semibold">{c.title}</dt>
                  <dd className={compact ? "text-muted" : "text-white/80"}>{c.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={`rounded-2xl p-7 ${compact ? "bg-cream" : "bg-white/5 ring-1 ring-white/15"}`}>
            <h3 className={`text-3xl ${compact ? "" : "text-mustard"}`}>Storage instructions</h3>
            <ul className={`mt-4 list-disc space-y-2 pl-5 ${compact ? "text-muted" : "text-white/80"}`}>
              {storage.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
