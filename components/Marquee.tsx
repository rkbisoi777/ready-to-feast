const items = ["30g+ protein", "Ready in 15 minutes", "Halal chicken", "No added preservatives", "Real spices", "Oil free", "Delivered chilled"];

/** Pure-CSS scrolling ticker. Content is duplicated so the loop is seamless. */
export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap px-6 font-display text-xl font-bold uppercase tracking-wide text-maroon sm:text-2xl">
          {t}
          <span className="ml-12 text-ember" aria-hidden>
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-maroon/10 bg-mustard py-3" aria-label="Highlights">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
