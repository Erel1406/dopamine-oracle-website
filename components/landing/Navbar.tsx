"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Moon, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Features", href: "/#features" },
  { label: "The Signs", href: "/#signs" },
  { label: "The Oracle", href: "/#oracle" },
  { label: "Pricing", href: "/#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-card border-b border-white/10 py-3"
          : "border-b border-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Moon size={20} className="text-ember" />
          <span className="font-display text-sm uppercase tracking-[0.35em] text-white/90">
            Zodiac&nbsp;Engine
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/map"
            className="rounded-full bg-gradient-to-r from-ember-deep via-ember to-ember-soft px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-noir-900 transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,122,24,0.55)]"
          >
            Enter the Map
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="rounded-lg p-2 text-white/80 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass-card mt-3 flex flex-col gap-1 px-5 py-4 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm text-white/75 hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/map"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-gradient-to-r from-ember-deep via-ember to-ember-soft px-5 py-3 text-center font-display text-xs font-semibold uppercase tracking-[0.18em] text-noir-900"
          >
            Enter the Map
          </Link>
        </div>
      )}
    </header>
  );
}
