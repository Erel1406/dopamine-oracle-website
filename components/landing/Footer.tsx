import Link from "next/link";
import { Moon } from "lucide-react";

const COLS = [
  {
    title: "Explore",
    links: [
      { label: "Constellation Map", href: "/map" },
      { label: "The Signs", href: "/#signs" },
      { label: "The Oracle", href: "/#oracle" },
    ],
  },
  {
    title: "Unlock",
    links: [
      { label: "Tarot Reading", href: "/#pricing" },
      { label: "Destiny Reading", href: "/#pricing" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Engine",
    links: [
      { label: "About", href: "/#features" },
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "AGB & Widerruf", href: "/agb" },
      { label: "Verträge hier kündigen", href: "/cancel" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-5 py-14 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <Moon size={20} className="text-ember" />
            <span className="font-display text-sm uppercase tracking-[0.3em] text-white/90">
              Zodiac Engine
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
            Read the stars. Know yourself. An interactive astrology, tarot and
            Oracle experience.
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-xs uppercase tracking-[0.25em] text-white/70">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/45 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-center text-xs text-white/30 sm:flex-row sm:text-left">
        <span>
          © {new Date().getFullYear()} AI Zodiac Engine. The stars owe you
          nothing. Readings are AI-generated, for entertainment only.
        </span>
        <span className="uppercase tracking-[0.3em]">Cinematic · Neo-Occult</span>
      </div>
    </footer>
  );
}
