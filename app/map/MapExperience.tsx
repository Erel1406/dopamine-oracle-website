"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, MousePointer2 } from "lucide-react";
import ConstellationMap from "@/components/ConstellationMap";
import InfoPanel from "@/components/InfoPanel";
import NebulaBackground from "@/components/NebulaBackground";
import Constellation from "@/components/Constellation";
import { getSignById, ZODIAC_SIGNS } from "@/lib/zodiac";
import { cn } from "@/lib/utils";

export default function MapExperience({
  initialSign = null,
}: {
  initialSign?: string | null;
}) {
  const [activeId, setActiveId] = useState<string | null>(
    getSignById(initialSign) ? initialSign : null
  );
  const activeSign = getSignById(activeId);

  // Lock body scroll while the immersive map is mounted.
  useEffect(() => {
    document.body.classList.add("map-locked");
    return () => document.body.classList.remove("map-locked");
  }, []);

  return (
    <main className="relative h-[100dvh] w-screen overflow-hidden bg-[#04060a] text-white">
      <NebulaBackground />

      <ConstellationMap activeId={activeId} onSelect={setActiveId} />

      {/* ── Slim top bar ───────────────────────────────── */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 p-5 md:p-6">
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white/70 backdrop-blur-md transition hover:border-ember/40 hover:text-white"
        >
          <ChevronLeft size={14} /> Home
        </Link>
        <span className="pointer-events-none hidden font-display text-xs uppercase tracking-[0.4em] text-white/50 sm:block">
          The Constellation Map
        </span>
      </header>

      {/* ── Drag hint (until a sign is chosen) ─────────── */}
      <AnimatePresence>
        {!activeSign && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-center"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/55 backdrop-blur-md">
              <MousePointer2 size={13} className="text-ember" />
              Drag, scroll, or pick a sign below
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Skyrim-style bottom sign rail ──────────────── */}
      <nav
        aria-label="Zodiac signs"
        className="absolute inset-x-0 bottom-0 z-20"
      >
        <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent pb-3 pt-8">
          <div className="no-scrollbar mx-auto flex max-w-5xl items-end gap-1 overflow-x-auto px-4 sm:justify-center">
            {ZODIAC_SIGNS.map((sign) => {
              const isActive = activeId === sign.id;
              return (
                <button
                  key={sign.id}
                  type="button"
                  onClick={() => setActiveId(sign.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "group flex shrink-0 flex-col items-center gap-1 rounded-xl px-2.5 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ember/50",
                    isActive ? "bg-white/10" : "hover:bg-white/5"
                  )}
                >
                  <span className="flex h-9 w-9 items-center justify-center">
                    <Constellation
                      sign={sign}
                      size={32}
                      active={isActive}
                      variant="mini"
                    />
                  </span>
                  <span
                    className={cn(
                      "font-display text-[9px] uppercase tracking-[0.18em] transition-colors",
                      isActive
                        ? "text-ember/90"
                        : "text-white/45 group-hover:text-white/80"
                    )}
                  >
                    {sign.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <InfoPanel sign={activeSign} onClose={() => setActiveId(null)} />
    </main>
  );
}
