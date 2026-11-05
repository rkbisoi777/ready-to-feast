// TODO(owner): replace with the real logo (SVG in /public, rendered with <img>).
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`font-display font-extrabold uppercase leading-[0.8] tracking-tight ${light ? "text-white" : "text-maroon"}`}>
      <span className="block text-[1.35rem]">Ready to</span>
      <span className="block text-[1.75rem] text-mustard">Feast</span>
    </span>
  );
}
