import Link from "next/link";
import { ChevronLeft, TriangleAlert } from "lucide-react";

/**
 * Shared shell for the legal pages (/impressum, /datenschutz, /agb, /cancel).
 * `demo` renders a loud placeholder warning so nobody ships the sample texts.
 */
export default function LegalShell({
  title,
  demo = false,
  children,
}: {
  title: string;
  demo?: boolean;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-noir px-5 py-16 text-white md:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
        >
          <ChevronLeft size={14} /> Home
        </Link>

        <h1 className="mt-8 font-display text-3xl text-white">{title}</h1>

        {demo && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            <TriangleAlert size={18} className="mt-0.5 shrink-0" />
            <p>
              <strong>Demo-Text.</strong> Platzhalter in [KLAMMERN] ersetzen und
              den Inhalt rechtlich prüfen lassen, bevor die Seite live geht.
              Diesen Hinweis danach entfernen.
            </p>
          </div>
        )}

        <div className="legal-prose mt-8 space-y-6 text-[15px] leading-relaxed text-white/70">
          {children}
        </div>

        <nav className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-xs text-white/40">
          <Link href="/impressum" className="hover:text-white">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-white">Datenschutz</Link>
          <Link href="/agb" className="hover:text-white">AGB & Widerruf</Link>
          <Link href="/cancel" className="hover:text-white">Verträge hier kündigen</Link>
        </nav>
      </div>
    </main>
  );
}

/** Section heading used inside the legal pages. */
export function LegalH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="pt-4 font-display text-xl text-white">{children}</h2>
  );
}
