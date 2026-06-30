"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Constellation from "@/components/Constellation";
import { getSignById } from "@/lib/zodiac";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  const leo = getSignById("leo")!;
  const scorpio = getSignById("scorpio")!;
  const aquarius = getSignById("aquarius")!;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-24 pt-32 md:px-8">
      {/* Decorative drifting constellations */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute right-[6%] top-[20%] opacity-40">
          <Constellation sign={leo} size={240} variant="mini" />
        </div>
        <div className="absolute left-[4%] top-[58%] opacity-20">
          <Constellation sign={aquarius} size={170} variant="mini" />
        </div>
        <div className="absolute right-[28%] top-[68%] opacity-15">
          <Constellation sign={scorpio} size={130} variant="mini" />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-3xl text-center">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-white/60 backdrop-blur-md"
        >
          <Sparkles size={13} className="text-ember" />
          Astrology · Tarot · Oracle
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-display text-4xl leading-[1.1] tracking-tight text-white text-balance sm:text-5xl md:text-6xl"
        >
          Your destiny is written
          <br className="hidden sm:block" /> in the{" "}
          <span className="text-ember text-glow-ember">stars</span>.
          <br /> Learn to read it.
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 md:text-lg"
        >
          Wander an interactive sky of all twelve zodiac constellations. Uncover
          your Daily Truth, draw your Tarot, and speak with an Oracle that
          already knows your sign.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/map"
            className="group flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-ember-deep via-ember to-ember-soft px-7 py-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-noir-900 transition-all duration-300 hover:shadow-[0_0_34px_rgba(255,122,24,0.6)] sm:w-auto"
          >
            Explore the Constellation Map
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/#oracle"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 sm:w-auto"
          >
            Talk to the Oracle
          </Link>
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex items-center justify-center gap-3 text-xs text-white/45"
        >
          <span className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="text-ember" fill="currentColor" />
            ))}
          </span>
          Trusted by 40,000+ seekers reading their stars
        </motion.div>
      </div>

      {/* fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#04060a]" />
    </section>
  );
}
