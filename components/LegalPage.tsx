export type LegalSection = { title: string; body: (string | string[])[] };

export default function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <section className="bg-maroon py-12 text-center sm:py-16">
        <div className="container-x">
          <h1 className="text-5xl text-cream sm:text-6xl">{title}</h1>
          <p className="mt-3 text-mustard">Last updated: {updated}</p>
        </div>
      </section>
      <article className="container-x max-w-3xl py-12 sm:py-16">
        <p className="text-lg">{intro}</p>
        {sections.map((s, i) => (
          <section key={s.title} className="mt-10">
            <h2 className="text-3xl">
              {i + 1}. {s.title}
            </h2>
            {s.body.map((b, j) =>
              Array.isArray(b) ? (
                <ul key={j} className="mt-3 list-disc space-y-1 pl-6 text-muted">
                  {b.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              ) : (
                <p key={j} className="mt-3 text-muted">
                  {b}
                </p>
              )
            )}
          </section>
        ))}
      </article>
    </>
  );
}
