"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Layers,
  MessageCircleHeart,
  Moon,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
  href: string;
  cta: string;
};

const FEATURES: Feature[] = [
  {
    icon: Compass,
    title: "The Constellation Map",
    body: "Pan a living night sky like a Skyrim skill tree. Every sign is a constellation that ignites the moment you touch it.",
    href: "/map",
    cta: "Open the map",
  },
  {
    icon: Moon,
    title: "Daily Truth & Horoscope",
    body: "A short, cryptic reading for your sign, refreshed each day. The stars never repeat themselves.",
    href: "/map",
    cta: "Read today's sky",
  },
  {
    icon: Layers,
    title: "Tarot & Destiny Reading",
    body: "A full Tarot spread drawn for your sign and a 5-page destiny reading covering love, fate and your shadow.",
    href: "/#pricing",
    cta: "See the reading",
  },
  {
    icon: MessageCircleHeart,
    title: "Talk to the Oracle",
    body: "An AI Oracle that has already studied your sign. Ask it anything about love, purpose, or what's coming.",
    href: "/#oracle",
    cta: "Wake the Oracle",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative px-5 py-24 md:px-8 md:py-32">
      <SectionHeading
        eyebrow="What you can do"
        title="Four ways to read your stars"
        subtitle="The Zodiac Engine turns ancient astrology into an experience you can explore, feel, and talk to."
      />

      <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
          >
            <Link
              href={f.href}
              className="group flex h-full flex-col rounded-2xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ember/30 hover:shadow-[0_0_40px_-12px_rgba(255,122,24,0.45)]"
            >
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-ember/25 bg-ember/10 text-ember transition-colors group-hover:bg-ember/20">
                <f.icon size={22} />
              </span>
              <h3 className="font-display text-lg text-white">{f.title}</h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-white/55">
                {f.body}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-ember/90">
                {f.cta}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
