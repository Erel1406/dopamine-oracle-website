"use client";

import { useMemo } from "react";

/** Tiny deterministic PRNG so server & client render identical stars. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

/**
 * A subtle, twinkling star field painted across the full canvas.
 * Rendered once and memoised — it is purely decorative.
 */
export default function Starfield({
  width,
  height,
  count = 160,
}: {
  width: number;
  height: number;
  count?: number;
}) {
  const stars = useMemo<Star[]>(() => {
    const rand = mulberry32(0xc0ffee);
    return Array.from({ length: count }, () => ({
      left: rand() * 100,
      top: rand() * 100,
      size: rand() * 2 + 0.6,
      delay: rand() * 6,
      duration: rand() * 4 + 3,
      opacity: rand() * 0.6 + 0.2,
    }));
  }, [count]);

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ width, height }}
      aria-hidden
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.7)`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
