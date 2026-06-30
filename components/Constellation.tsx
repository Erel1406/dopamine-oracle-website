"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import type { Point, ZodiacSign } from "@/lib/zodiac";

const toPointsAttr = (stroke: Point[]) =>
  stroke.map(([x, y]) => `${x},${y}`).join(" ");

/**
 * A zodiac sign rendered as a luminous Skyrim-style constellation:
 * glowing line-art between haloed stars. Dormant signs glow faint icy
 * blue; the active sign ignites bright cyan-white with a single gold
 * "hero" star, and its lines draw themselves into being.
 */
export default function Constellation({
  sign,
  size = 190,
  active = false,
  dim = false,
  variant = "map",
}: {
  sign: ZodiacSign;
  size?: number;
  active?: boolean;
  dim?: boolean;
  variant?: "map" | "mini";
}) {
  const reduce = useReducedMotion();
  const uid = `${sign.id}-${variant}`;
  const lit = active || variant === "mini";

  const stars = useMemo(() => {
    const seen = new Map<string, Point>();
    for (const stroke of sign.strokes)
      for (const p of stroke) {
        const key = `${Math.round(p[0])},${Math.round(p[1])}`;
        if (!seen.has(key)) seen.set(key, p);
      }
    return Array.from(seen.values());
  }, [sign.strokes]);

  // The "hero" perk-star: the star nearest the figure's centroid.
  const heroIndex = useMemo(() => {
    if (stars.length === 0) return -1;
    const cx = stars.reduce((s, p) => s + p[0], 0) / stars.length;
    const cy = stars.reduce((s, p) => s + p[1], 0) / stars.length;
    let best = 0;
    let bestD = Infinity;
    stars.forEach((p, i) => {
      const d = (p[0] - cx) ** 2 + (p[1] - cy) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  }, [stars]);

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="overflow-visible"
      style={{ opacity: dim ? 0.45 : 1, transition: "opacity 0.6s ease" }}
      aria-hidden
    >
      <defs>
        <filter id={`glow-${uid}`} x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation={lit ? 2.4 : 1} result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={`star-${uid}`}>
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#cfeaff" />
          <stop offset="100%" stopColor="rgba(150,200,235,0)" />
        </radialGradient>
        <radialGradient id={`hero-${uid}`}>
          <stop offset="0%" stopColor="#fff4dc" />
          <stop offset="35%" stopColor="#ffb347" />
          <stop offset="100%" stopColor="rgba(255,140,40,0)" />
        </radialGradient>
      </defs>

      {/* Dormant body lines — always faintly present so the sky reads as sky */}
      {sign.strokes.map((stroke, i) =>
        stroke.length > 1 ? (
          <polyline
            key={`base-${i}`}
            points={toPointsAttr(stroke)}
            fill="none"
            stroke={lit ? "rgba(150,205,235,0.35)" : "rgba(150,190,215,0.22)"}
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null
      )}

      {/* Ignited lines that bloom + "form" when active */}
      <AnimatePresence>
        {active && (
          <g filter={`url(#glow-${uid})`} key={`live-${sign.id}`}>
            {sign.strokes.map((stroke, i) =>
              stroke.length > 1 ? (
                <g key={i}>
                  {/* soft wide halo of the line */}
                  <motion.polyline
                    points={toPointsAttr(stroke)}
                    fill="none"
                    stroke="rgba(120,205,240,0.55)"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ opacity: reduce ? 0.55 : 0 }}
                    animate={{ opacity: 0.55 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  />
                  {/* bright core that draws itself in */}
                  <motion.polyline
                    points={toPointsAttr(stroke)}
                    fill="none"
                    stroke="#eaf7ff"
                    strokeWidth={1.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: reduce ? 1 : 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      pathLength: {
                        duration: reduce ? 0 : 0.9,
                        delay: i * 0.12,
                        ease: "easeInOut",
                      },
                      opacity: { duration: 0.3, delay: i * 0.12 },
                    }}
                  />
                </g>
              ) : null
            )}
          </g>
        )}
      </AnimatePresence>

      {/* Stars — halo + core, with one gold hero star */}
      {stars.map((p, i) => {
        const isHero = lit && i === heroIndex;
        const haloR = isHero ? 7 : lit ? 4.5 : 3.2;
        const coreR = isHero ? 2.3 : lit ? 1.7 : 1.3;
        return (
          <g key={`star-${i}`}>
            <circle
              cx={p[0]}
              cy={p[1]}
              r={haloR}
              fill={`url(#${isHero ? "hero" : "star"}-${uid})`}
              opacity={lit ? 0.9 : 0.5}
            />
            <circle
              cx={p[0]}
              cy={p[1]}
              r={coreR}
              fill={isHero ? "#fff1d4" : lit ? "#f0faff" : "#c7e0f0"}
              filter={`url(#glow-${uid})`}
              style={
                reduce
                  ? undefined
                  : {
                      animation: `twinkle ${3 + (i % 4)}s ease-in-out ${
                        (i % 5) * 0.4
                      }s infinite`,
                    }
              }
            />
            {/* sparkle cross on the hero star */}
            {isHero && (
              <g
                stroke="#ffd789"
                strokeWidth={0.7}
                strokeLinecap="round"
                opacity={0.9}
              >
                <line x1={p[0] - 6} y1={p[1]} x2={p[0] + 6} y2={p[1]} />
                <line x1={p[0]} y1={p[1] - 6} x2={p[0]} y2={p[1] + 6} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
