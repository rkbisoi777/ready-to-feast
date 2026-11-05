type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const MenuIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const CloseIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const PlusIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 5v14M5 12h14" /></svg>
);
export const MinusIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 12h14" /></svg>
);
export const CheckIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 12l5 5L20 7" /></svg>
);
export const BagPlusIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 7h12l1 13H5L6 7z" /><path d="M9 7a3 3 0 0 1 6 0" /><path d="M12 11v5M9.5 13.5h5" />
  </svg>
);
export const ArrowIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const StarIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 7-6.2-3.6L5.8 21l1.4-7L2 9.3l7-.8L12 2z" />
  </svg>
);
export const ChilliIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M14.5 6.5c3 .3 5.5 2.7 5.5 6 0 5-6 9.5-15 9.5 4-2.5 6-5.5 6.5-9.5.4-3.4 1.4-6.3 3-6z" />
    <path d="M15 6.5c0-2 1-3.5 3-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
export const WhatsAppIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
    <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.3.6 4.5 1.8 6.5L3 29l6.9-1.8c1.9 1 4 1.6 6.1 1.6 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.3 10 10.1 5.3 16 5.3S26.7 10 26.7 15.8 21.9 26.4 16 26.4zm5.9-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 .8.4 1.4.6 1.9.7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
  </svg>
);
export const InstagramIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
  </svg>
);
export const MailIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const BagIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M6 7h12l1 13H5L6 7z" /><path d="M9 7a3 3 0 0 1 6 0" /></svg>
);
export const TrashIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></svg>
);
