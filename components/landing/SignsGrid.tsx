"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Constellation from "@/components/Constellation";
import SectionHeading from "./SectionHeading";
import { ZODIAC_SIGNS } from "@/lib/zodiac";
import { cn } from "@/lib/utils";

const ELEMENT_STYLES: Record<string, string> = {
  Fire: "border-orange-400/30 bg-orange-400/10 text-orange-300",
  Earth: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Air: "border-cyan-300/30 bg-cyan-300/10 text-cyan-200",
  Water: "border-blue-400/30 bg-blue-400/10 text-blue-300",
};

export default function SignsGrid() {
  return (
    <section id="signs" className="relative px-5 py-24 md:px-8 md:py-32">
      <SectionHeading
        eyebrow="The Twelve Houses"
        title="Find your sign in the sky"
        subtitle="Tap any constellation to fly straight to it on the map and read what the stars know about you."
      />

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {ZODIAC_SIGNS.map((sign, i) => (
          <motion.div
            key={sign.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 4) * 0.06, duration: 0.5 }}
          >
            <Link
              href={`/map?sign=${sign.id}`}
              className="group flex h-full flex-col items-center rounded-2xl glass-card px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_0_40px_-14px_rgba(120,205,235,0.5)]"
            >
              <div className="flex h-24 w-24 items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <Constellation sign={sign} size={92} variant="mini" />
              </div>
              <h3 className="mt-3 font-display text-base tracking-wide text-white">
                {sign.name}
              </h3>
              <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-white/40">
                {sign.dates}
              </p>
              <span
                className={cn(
                  "mt-3 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em]",
                  ELEMENT_STYLES[sign.element]
                )}
              >
                {sign.element}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
