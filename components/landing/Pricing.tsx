"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Gem, ScrollText } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { cn } from "@/lib/utils";

const FREE = [
  "The interactive Constellation Map",
  "Your Daily Truth, refreshed each day",
  "A glimpse of what the Oracle knows",
];

const PREMIUM = [
  "Everything in Free",
  "5-page personalised Destiny reading",
  "Full Tarot spread drawn for your sign",
  "Unlimited Oracle conversations",
  "Your year ahead — love, fate & shadow",
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative px-5 py-24 md:px-8 md:py-32">
      <SectionHeading
        eyebrow="Pricing"
        title="Begin free. Unlock your destiny."
        subtitle="Read the sky for nothing. When you're ready for the full revelation, consult the Oracle."
      />

      <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
        {/* Free */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col rounded-3xl glass-card p-8"
        >
          <h3 className="font-display text-xl text-white">Seeker</h3>
          <p className="mt-1 text-sm text-white/50">For the curious</p>
          <div className="mt-5 flex items-baseline gap-1">
            <span className="font-display text-4xl text-white">€0</span>
            <span className="text-sm text-white/45">/ forever</span>
          </div>
          <ul className="mt-7 flex-1 space-y-3">
            {FREE.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-white/65">
                <Check size={16} className="mt-0.5 shrink-0 text-white/40" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/map"
            className="mt-8 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-center font-display text-sm font-semibold uppercase tracking-[0.16em] text-white/85 transition hover:border-white/30 hover:bg-white/10"
          >
            Enter the Map
          </Link>
        </motion.div>

        {/* Premium */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-ember/30 p-[1px]"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(255,122,24,0), rgba(255,122,24,0.5), rgba(140,60,255,0.4), rgba(255,122,24,0))",
            }}
          />
          <div className="relative flex h-full flex-col rounded-3xl bg-noir-800/90 p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-white">Oracle</h3>
              <span className="rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ember">
                Most chosen
              </span>
            </div>
            <p className="mt-1 text-sm text-white/50">For the destined</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="font-display text-4xl text-ember text-glow-ember">
                €19
              </span>
              <span className="text-sm text-white/45">/ one-time</span>
            </div>
            <ul className="mt-7 flex-1 space-y-3">
              {PREMIUM.map((f, i) => (
                <li
                  key={f}
                  className={cn(
                    "flex items-start gap-3 text-sm",
                    i === 0 ? "text-white/45" : "text-white/80"
                  )}
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-ember" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="#"
              className="group relative mt-8 flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-ember-deep via-ember to-ember-soft px-6 py-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-noir-900 transition-all duration-300 hover:shadow-[0_0_34px_rgba(255,122,24,0.6)]"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full"
              />
              <ScrollText size={16} className="relative" />
              <span className="relative">Consult the Oracle — 19€</span>
            </Link>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-white/35">
              <Gem size={11} /> Instant access · No subscription
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
