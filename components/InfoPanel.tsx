"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Gem, Lock, ScrollText, Sparkles, Star, X } from "lucide-react";
import type { ZodiacSign } from "@/lib/zodiac";
import Constellation from "./Constellation";
import OracleChat from "./OracleChat";

const PREMIUM_FEATURES = [
  "A 5-page personalised Destiny reading",
  "Full Tarot spread, drawn for your sign",
  "Your year ahead — love, fate & shadow",
];

export default function InfoPanel({
  sign,
  onClose,
}: {
  sign: ZodiacSign | null;
  onClose: () => void;
}) {
  const scrollToOracle = () => {
    document
      .getElementById("oracle-cta")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <AnimatePresence>
      {sign && (
        <>
          {/* Mobile-only backdrop — tap to dismiss. Desktop keeps the map live. */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-[2px] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            key="panel"
            role="dialog"
            aria-label={`${sign.name} reading`}
            className="glass no-scrollbar fixed right-0 top-0 z-40 flex h-full w-full max-w-[440px] flex-col overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 32 }}
          >
            {/* Ember edge light */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-px"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(255,122,24,0.6), transparent)",
              }}
            />

            {/* ── Header ───────────────────────────────── */}
            <header className="flex items-start justify-between gap-4 px-7 pt-7">
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-noir-900/60">
                  <Constellation sign={sign} size={52} active variant="mini" />
                </div>
                <div>
                  <h2 className="font-display text-2xl leading-none tracking-wide text-white">
                    {sign.name}
                  </h2>
                  <p className="mt-1.5 text-xs uppercase tracking-[0.25em] text-white/45">
                    {sign.dates} · {sign.element}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="rounded-full p-2 text-white/50 transition hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>
            </header>

            {/* ── Daily Truth ──────────────────────────── */}
            <section className="px-7 pt-8">
              <div className="mb-3 flex items-center gap-2 text-ember/80">
                <Sparkles size={14} />
                <span className="text-[11px] font-medium uppercase tracking-[0.35em]">
                  Daily Truth
                </span>
              </div>
              <p className="font-display text-lg italic leading-relaxed text-white/85 text-balance">
                &ldquo;{sign.dailyTruth}&rdquo;
              </p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </section>

            {/* ── Oracle teaser (ask away) ─────────────── */}
            <section className="px-7 pt-7">
              <OracleChat sign={sign} onConsult={scrollToOracle} />
            </section>

            {/* ── Premium Upsell Card ──────────────────── */}
            <section id="oracle-cta" className="px-7 pb-7 pt-7">
              <div className="relative overflow-hidden rounded-2xl border border-ember/25 p-[1px]">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-60"
                  style={{
                    background:
                      "conic-gradient(from 0deg, rgba(255,122,24,0.0), rgba(255,122,24,0.55), rgba(140,60,255,0.4), rgba(255,122,24,0.0))",
                  }}
                />
                <div className="relative rounded-2xl bg-noir-800/85 p-6 backdrop-blur-xl">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-ember">
                      <Lock size={11} /> Premium
                    </span>
                  </div>

                  <h3 className="font-display text-xl leading-snug text-white">
                    Unlock your{" "}
                    <span className="text-ember text-glow-ember">
                      5-Page Destiny
                    </span>{" "}
                    &amp; Tarot Reading
                  </h3>

                  <ul className="mt-5 space-y-3">
                    {PREMIUM_FEATURES.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-white/70"
                      >
                        <Star
                          size={15}
                          className="mt-0.5 shrink-0 text-ember/80"
                          fill="currentColor"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#"
                    className="group relative mt-7 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-ember-deep via-ember to-ember-soft px-6 py-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-noir-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,122,24,0.6)]"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full"
                    />
                    <ScrollText size={16} className="relative" />
                    <span className="relative">Consult the Oracle — 19€</span>
                    <ArrowRight
                      size={16}
                      className="relative transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>

                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-white/35">
                    <Gem size={11} /> One-time payment · Instant revelation
                  </p>
                </div>
              </div>
            </section>

            <div className="mt-auto px-7 pb-7 text-center text-[10px] uppercase tracking-[0.3em] text-white/20">
              AI Zodiac Engine
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
