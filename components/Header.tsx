"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import OrderButton from "./OrderButton";
import { CloseIcon, MenuIcon } from "./Icons";

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-maroon text-white">
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
                <Link href={n.href} className="text-white/85 hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <OrderButton className="btn-primary !px-4 !py-2 !text-base sm:!px-5">Order now</OrderButton>
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
            {nav.map((n) => (
              <li key={n.href}>
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
