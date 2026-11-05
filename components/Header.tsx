"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { BagIcon, CloseIcon, MenuIcon } from "./Icons";
import { useCart } from "./CartProvider";

const nav = [
  { href: "/", label: "Home" },
  { href: "/products/", label: "Shop" },
  { href: "/#why-us", label: "Why us" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`bg-maroon text-white transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-black/25" : ""}`}>
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        <button
          type="button"
          className="-ml-2 p-2 lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <MenuIcon />
        </button>

        <Link href="/" aria-label="Ready to Feast home" className="lg:mr-6">
          <Logo light />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 lg:block">
          <ul className="flex gap-7 font-display text-lg font-semibold uppercase tracking-wide">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="relative text-white/85 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-mustard after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
            className="relative -mr-2 rounded-full p-2 hover:bg-white/10"
          >
            <BagIcon className="size-7" />
            {count > 0 && (
              <span key={count} className="absolute -right-0.5 -top-0.5 grid animate-pop min-w-5 place-items-center rounded-full bg-ember px-1 text-xs font-bold leading-5 text-white ring-2 ring-maroon">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-ink/60 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <nav
          aria-label="Mobile"
          className={`absolute inset-y-0 left-0 flex w-4/5 max-w-xs flex-col bg-maroon p-6 transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button type="button" className="-ml-2 mb-6 self-start p-2" onClick={() => setOpen(false)} aria-label="Close menu" tabIndex={open ? 0 : -1}>
            <CloseIcon />
          </button>
          <ul className="space-y-4 font-display text-2xl font-bold uppercase">
            {nav.map((n, i) => (
              <li
                key={n.href}
                className={`transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
              >
                <Link href={n.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
