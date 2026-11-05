export default function SectionHeading({
  eyebrow,
  title,
  intro,
  center = true,
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className="text-4xl sm:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
    </div>
  );
}
