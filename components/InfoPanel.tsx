"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Gem,
  Lock,
  Moon,
  ScrollText,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import type { ZodiacSign } from "@/lib/zodiac";
import { MONTHLY_PRICE, useSubscription } from "@/lib/subscription";
import Constellation from "./Constellation";
import OracleChat from "./OracleChat";

const PREMIUM_FEATURES = [
  "Unlimited Oracle conversations",
  "Personalised Destiny & Tarot readings",
  "Your year ahead — love, fate & shadow",
];

/**
 * Today's AI-written horoscope for the sign; starts with the static Daily
 * Truth and swaps in the Oracle's reading once /api/horoscope answers.
 */
function DailyTruth({ sign }: { sign: ZodiacSign }) {
  const [text, setText] = useState(sign.dailyTruth);

  useEffect(() => {
    let alive = true;
    setText(sign.dailyTruth);
    fetch(`/api/horoscope/${sign.id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && typeof d?.text === "string" && d.text) setText(d.text);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [sign.id, sign.dailyTruth]);

  return (
    <p className="font-display text-lg italic leading-relaxed text-white/85 text-balance">
      &ldquo;{text}&rdquo;
    </p>
  );
}

export default function InfoPanel({
  sign,
  onClose,
}: {
  sign: ZodiacSign | null;
  onClose: () => void;
}) {
  const { subscribed, subscribe, checkoutError } = useSubscription();
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
              <DailyTruth sign={sign} />
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </section>

            {/* ── Sign Lore (free facts) ───────────────── */}
            <section className="px-7 pt-7">
              <div className="mb-4 flex items-center gap-2 text-cyan-200/80">
                <Moon size={14} />
                <span className="text-[11px] font-medium uppercase tracking-[0.35em]">
                  Sign Lore
                </span>
              </div>

              <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  ["Ruled by", sign.facts.ruler],
                  ["Symbol", sign.facts.symbol],
                  ["Modality", sign.facts.modality],
                  ["Lucky day", sign.facts.luckyDay],
                  ["Lucky numbers", sign.facts.luckyNumbers.join(" · ")],
                  ["Allied signs", sign.facts.allies.join(", ")],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5"
                  >
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      {label}
                    </dt>
                    <dd className="mt-1 font-display text-[13px] text-white/85">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4 space-y-2.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 text-[10px] uppercase tracking-[0.2em] text-cyan-200/60">
                    Gifts
                  </span>
                  {sign.facts.strengths.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-2.5 py-0.5 text-[11px] text-cyan-100/85"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 text-[10px] uppercase tracking-[0.2em] text-ember/60">
                    Shadows
                  </span>
                  {sign.facts.shadows.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-ember/20 bg-ember/[0.07] px-2.5 py-0.5 text-[11px] text-ember/85"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </section>

            {/* ── Oracle teaser (ask away) ─────────────── */}
            <section className="px-7 pt-7">
              <OracleChat key={sign.id} sign={sign} onConsult={scrollToOracle} />
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
                    Unlimited{" "}
                    <span className="text-ember text-glow-ember">
                      Oracle readings
                    </span>
                    , every day
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

                  {subscribed ? (
                    <p className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-ember/40 bg-ember/10 px-6 py-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-ember">
                      <Star size={15} fill="currentColor" /> Bound to the
                      Oracle
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={subscribe}
                      className="btn-rune btn-rune-ember group mt-7 flex w-full items-center justify-center gap-2 overflow-hidden px-6 py-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-noir-900"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full"
                      />
                      <ScrollText size={16} className="relative" />
                      <span className="relative">
                        Join the Oracle — {MONTHLY_PRICE}/mo
                      </span>
                      <ArrowRight
                        size={16}
                        className="relative transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  )}

                  {checkoutError && (
                    <p className="mt-3 text-center text-[11px] text-ember/90">
                      {checkoutError}
                    </p>
                  )}
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-white/35">
                    <Gem size={11} /> Cancel anytime · Secure checkout via
                    Stripe
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
