"use client";

import { Fragment, useEffect, useState } from "react";
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
          className="btn-rune btn-rune-sm btn-rune-ghost pointer-events-auto flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white/70 transition-colors hover:text-white"
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
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-center">
            {/* Animate the inner pill, not the positioned wrapper — framer's
                inline transform would overwrite the -translate-y-1/2. */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/55 backdrop-blur-md"
            >
              <MousePointer2 size={13} className="text-ember" />
              Drag, scroll, or pick a sign below
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Skyrim-style skill bar ─────────────────────── */}
      <nav
        aria-label="Zodiac signs"
        className="absolute inset-x-0 bottom-0 z-20"
      >
        <div
          className={cn(
            "bg-gradient-to-t from-black/85 via-black/45 to-transparent pb-3 pt-10 transition-[padding] duration-500",
            // Keep the bar usable while the desktop info panel covers the
            // right edge: recentre it in the remaining space.
            activeSign && "md:pr-[440px]"
          )}
        >
          {/* Lore caption — the "school description" of the chosen house */}
          <AnimatePresence mode="wait">
            {activeSign && (
              <motion.p
                key={activeSign.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35 }}
                className="pointer-events-none mx-auto mb-4 max-w-xl px-6 text-center text-[13px] leading-relaxed text-cyan-50/75"
                style={{ textShadow: "0 1px 10px rgba(0,0,0,0.85)" }}
              >
                {activeSign.lore}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Engraved hairline above the bar */}
          <div className="mx-auto mb-2 h-px max-w-4xl bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          {/* Scroll container stays start-aligned (a centered flex container
              with overflow clips its leading items); the inner wrapper's
              auto-margins centre the bar only when everything fits. */}
          <div className="no-scrollbar flex overflow-x-auto px-4">
            <div className="mx-auto flex items-center">
            {ZODIAC_SIGNS.map((sign, i) => {
              const isActive = activeId === sign.id;
              return (
                <Fragment key={sign.id}>
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="h-[5px] w-[5px] shrink-0 rotate-45 bg-white/15"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveId(sign.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "group flex shrink-0 flex-col items-center gap-1 rounded-xl px-2.5 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ember/50",
                      isActive ? "bg-white/[0.07]" : "hover:bg-white/5"
                    )}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <motion.span
                      className="flex h-9 w-9 items-center justify-center"
                      animate={{ scale: isActive ? 1.15 : 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    >
                      <Constellation
                        sign={sign}
                        size={32}
                        active={isActive}
                        variant="mini"
                      />
                    </motion.span>
                    <span
                      className={cn(
                        "font-display text-[9px] uppercase tracking-[0.18em] transition-colors",
                        isActive
                          ? "text-ember/95 text-glow-ember"
                          : "text-white/45 group-hover:text-white/80"
                      )}
                    >
                      {sign.name}
                    </span>
                    {/* Gold underline flourish on the chosen sign */}
                    <span
                      className={cn(
                        "h-px w-8 bg-gradient-to-r from-transparent via-ember/80 to-transparent transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </button>
                </Fragment>
              );
            })}
            </div>
          </div>
        </div>
      </nav>

      <InfoPanel sign={activeSign} onClose={() => setActiveId(null)} />
    </main>
  );
}
