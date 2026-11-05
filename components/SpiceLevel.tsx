import { ChilliIcon } from "./Icons";

const labels = ["Mild", "Medium", "Hot", "Extra hot"];

export default function SpiceLevel({ level }: { level: 0 | 1 | 2 | 3 }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium text-muted" title={`Spice: ${labels[level]}`}>
      <span className="flex text-ember" aria-hidden>
        {[1, 2, 3].map((i) => (
          <ChilliIcon key={i} className={`size-4 ${i <= level ? "" : "opacity-20"}`} />
        ))}
      </span>
      <span>{labels[level]}</span>
    </span>
  );
}
