"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Check, Lock, Sparkles } from "lucide-react";

const BULLETS = [
  "Reads your sign, your element, and your shadow",
  "Answers love, career, timing and fate",
  "Remembers the thread of your conversation",
];

export default function OracleShowcase() {
  return (
    <section
      id="oracle"
      className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-ember/80">
            The Oracle
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-white text-balance md:text-4xl">
            An Oracle that already
            <br /> knows your sign
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/55">
            Don&rsquo;t scroll a generic horoscope. Have a conversation. The
            Oracle studies your constellation before it speaks a single word —
            then you ask it anything.
          </p>

          <ul className="mt-7 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm text-white/70">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-ember/30 bg-ember/10 text-ember">
                  <Check size={12} />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <Link
            href="/map"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember-deep via-ember to-ember-soft px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.16em] text-noir-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,122,24,0.55)]"
          >
            <Sparkles size={16} />
            Wake the Oracle
          </Link>
        </motion.div>

        {/* Mock chat */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-card relative rounded-3xl p-5 md:p-6"
        >
          <div className="mb-4 flex items-center gap-2 text-ember/80">
            <Sparkles size={14} />
            <span className="text-[11px] font-medium uppercase tracking-[0.32em]">
              Oracle · Leo
            </span>
          </div>

          <div className="space-y-3">
            <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-ember/15 bg-ember/5 px-4 py-3 text-sm leading-relaxed text-white/80">
              The stars of Leo burn with pride and a quiet fear of being unseen.
              Ask, and I will tell you what they hide.
            </div>
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-white/10 px-4 py-2.5 text-sm text-white/90">
              Will this year bring me real love?
            </div>
            <div className="max-w-[90%]">
              <div className="relative overflow-hidden rounded-2xl rounded-bl-sm border border-ember/20 bg-ember/5 px-4 py-3">
                <p
                  aria-hidden
                  className="select-none text-sm leading-relaxed text-white/70 blur-[5px]"
                >
                  Yes — but not from the direction you are watching. A fire sign
                  enters in autumn, and the name carries the letter—
                </p>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-noir-900/40">
                  <Lock size={15} className="text-ember" />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-ember">
                    Unlock the full answer
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-noir-900/70 py-1.5 pl-4 pr-1.5">
            <span className="flex-1 text-sm text-white/35">
              Ask the Oracle about your sign…
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-ember to-ember-deep text-noir-900">
              <ArrowUp size={16} />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
