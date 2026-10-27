"use client";

import { Menu as MenuIcon, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CartButton } from "@/components/cart-button";

const links = [
  { label: "Menu", href: "/menu" },
  { label: "Our story", href: "/about" },
  { label: "Recipes", href: "/recipes" },
  { label: "Offers", href: "/offers" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/[0.06] bg-cream/95 backdrop-blur-md">
      <div className="page-shell flex h-[76px] items-center justify-between gap-4">
        <Link
          aria-label="Goodfire Burger Co. home"
          className="focus-ring flex shrink-0 items-center gap-2 rounded-lg"
          href="/"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-ink text-lg text-orange">✳</span>
          <span className="font-display text-[1.25rem] font-bold leading-[0.88] tracking-[-0.06em]">
            goodfire<span className="block font-body text-[0.53rem] font-bold tracking-[0.21em] text-orange">BURGER CO.</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              className="focus-ring rounded py-2 text-sm font-semibold text-ink/75 transition hover:text-orange"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <form action="/menu" className="relative">
            <label className="sr-only" htmlFor="site-search">Search the menu</label>
            <input
              className="focus-ring h-11 w-40 rounded-full border border-ink/10 bg-white/60 py-2 pl-4 pr-10 text-sm placeholder:text-muted/70"
              id="site-search"
              name="q"
              placeholder="Find a favorite"
              type="search"
            />
            <Search aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" size={17} />
          </form>
          <CartButton />
          <Link
            className="focus-ring rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-orange"
            href="/contact"
          >
            Book a table
          </Link>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <CartButton />
          <button
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-ink/10"
            onClick={() => setMobileOpen((open) => !open)}
            type="button"
          >
            {mobileOpen ? <X aria-hidden="true" size={20} /> : <MenuIcon aria-hidden="true" size={20} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="border-t border-ink/10 bg-cream px-5 pb-6 pt-3 md:hidden">
          <nav aria-label="Mobile navigation" className="page-shell flex flex-col">
            {links.map((link) => (
              <Link
                className="focus-ring border-b border-ink/10 py-4 font-semibold"
                href={link.href}
                key={link.href}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <form action="/menu" className="relative mt-4">
              <label className="sr-only" htmlFor="mobile-search">Search the menu</label>
              <input
                className="focus-ring h-12 w-full rounded-full border border-ink/15 bg-white px-4 pr-11"
                id="mobile-search"
                name="q"
                placeholder="Find a favorite"
                type="search"
              />
              <Search aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            </form>
            <Link
              className="mt-4 rounded-full bg-ink px-5 py-3 text-center font-bold text-white"
              href="/contact"
              onClick={() => setMobileOpen(false)}
            >
              Book a table
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
