import type { CSSProperties } from "react";

/** Props for a scroll-reveal element, with an optional stagger index. */
export function reveal(i = 0, step = 90) {
  return { "data-reveal": "", style: { "--d": `${i * step}ms` } as CSSProperties };
}
