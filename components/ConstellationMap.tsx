"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, AnimatePresence, motion, useMotionValue } from "framer-motion";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  CONSTELLATION_SIZE,
  ZODIAC_SIGNS,
  type ZodiacSign,
} from "@/lib/zodiac";
import { clamp, cn } from "@/lib/utils";
import Starfield from "./Starfield";
import Constellation from "./Constellation";

const PANEL_WIDTH = 440; // keep in sync with InfoPanel (desktop)

type Size = { w: number; h: number };

const signPx = (s: ZodiacSign) => ({
  x: (s.x / 100) * CANVAS_WIDTH,
  y: (s.y / 100) * CANVAS_HEIGHT,
});

export default function ConstellationMap({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ w: 0, h: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const bounds = {
    left: Math.min(0, size.w - CANVAS_WIDTH),
    right: 0,
    top: Math.min(0, size.h - CANVAS_HEIGHT),
    bottom: 0,
  };

  // Track the viewport size.
  useEffect(() => {
    const measure = () => {
      const el = viewportRef.current;
      if (!el) return;
      setSize({ w: el.clientWidth, h: el.clientHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Where the canvas offset must sit so `sign` lands in the visual focus
  // (centre of the area left free by the desktop info panel).
  const signTarget = useCallback(
    (sign: ZodiacSign) => {
      const isWide = size.w >= 768;
      const focusX = isWide ? (size.w - PANEL_WIDTH) / 2 : size.w / 2;
      const p = signPx(sign);
      return {
        x: clamp(focusX - p.x, bounds.left, bounds.right),
        y: clamp(size.h / 2 - p.y, bounds.top, bounds.bottom),
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size.w, size.h]
  );

  // First paint: land directly on a deep-linked sign, otherwise centre the sky.
  const didCenter = useRef(false);
  useEffect(() => {
    if (didCenter.current || size.w === 0) return;
    const initial = activeId
      ? ZODIAC_SIGNS.find((s) => s.id === activeId)
      : null;
    if (initial) {
      const t = signTarget(initial);
      x.set(t.x);
      y.set(t.y);
    } else {
      x.set(clamp((size.w - CANVAS_WIDTH) / 2, bounds.left, bounds.right));
      y.set(clamp((size.h - CANVAS_HEIGHT) / 2, bounds.top, bounds.bottom));
    }
    didCenter.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.w, size.h]);

  // Wheel / trackpad scrolling pans the sky (non-passive so we can preventDefault).
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Kill any running centering spring first — otherwise it keeps
      // driving x/y and the wheel input feels delayed/laggy.
      x.stop();
      y.stop();
      x.set(clamp(x.get() - e.deltaX, bounds.left, bounds.right));
      y.set(clamp(y.get() - e.deltaY, bounds.top, bounds.bottom));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.w, size.h]);

  // Smoothly bring the selected constellation into the visible centre.
  const centerOnSign = useCallback(
    (sign: ZodiacSign) => {
      if (size.w === 0) return;
      const t = signTarget(sign);
      const opts = { type: "spring", stiffness: 90, damping: 20 } as const;
      animate(x, t.x, opts);
      animate(y, t.y, opts);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [signTarget]
  );

  useEffect(() => {
    if (!activeId) return;
    const sign = ZODIAC_SIGNS.find((s) => s.id === activeId);
    if (sign) centerOnSign(sign);
  }, [activeId, centerOnSign]);

  return (
    <div
      ref={viewportRef}
      className="absolute inset-0 overflow-hidden"
      style={{ touchAction: "none" }}
      // Any press freezes the sky where it is. Without this, a tap during a
      // centering spring (or leftover glide) lands on a moving canvas — the
      // first tap only stops the motion and the second one selects.
      onPointerDownCapture={() => {
        x.stop();
        y.stop();
      }}
    >
      <motion.div
        drag
        dragConstraints={bounds}
        dragElastic={0.04}
        dragMomentum={false}
        style={{ x, y, width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        className="relative cursor-grab active:cursor-grabbing"
      >
        <Starfield width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />

        {/* The 12 constellations */}
        {ZODIAC_SIGNS.map((sign) => {
          const isActive = activeId === sign.id;
          const isDimmed = activeId !== null && !isActive;
          return (
            <motion.button
              key={sign.id}
              type="button"
              // `onTap` (not onClick) — the parent canvas is a framer `drag`
              // surface which swallows native clicks; the tap gesture still
              // fires for press+release without a pan, including on touch.
              onTap={() => onSelect(sign.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(sign.id);
                }
              }}
              aria-label={`${sign.name} — ${sign.dates}`}
              aria-pressed={isActive}
              className="group absolute z-10 cursor-pointer rounded-2xl p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember/60"
              // Centering MUST go through framer's x/y, not Tailwind
              // -translate-* classes: whileTap writes an inline transform
              // that would wipe the CSS translation and make the whole
              // constellation jump by half its size on press.
              style={{
                left: `${sign.x}%`,
                top: `${sign.y}%`,
                x: "-50%",
                y: "-50%",
                width: CONSTELLATION_SIZE + 24,
                height: CONSTELLATION_SIZE + 48,
                WebkitTapHighlightColor: "transparent",
                touchAction: "none",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="flex flex-col items-center"
                animate={{ scale: isActive ? 1.18 : 1 }}
                whileHover={{ scale: isActive ? 1.18 : 1.06 }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
              >
                <Constellation
                  sign={sign}
                  size={CONSTELLATION_SIZE}
                  active={isActive}
                  dim={isDimmed}
                />
                <span
                  className={cn(
                    "mt-2 whitespace-nowrap font-display text-[10px] uppercase tracking-[0.34em] transition-all duration-500",
                    isActive
                      ? "opacity-0"
                      : "text-cyan-100/35 opacity-70 group-hover:text-cyan-100/90 group-hover:opacity-100 group-focus-visible:opacity-100"
                  )}
                >
                  {sign.name}
                </span>
              </motion.div>
            </motion.button>
          );
        })}

        {/* Large engraved sign-name beneath the active constellation */}
        <AnimatePresence>
          {ZODIAC_SIGNS.filter((s) => s.id === activeId).map((s) => (
            <motion.div
              key={s.id}
              className="pointer-events-none absolute z-0 flex flex-col items-center"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                x: "-50%",
                y: 150,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span
                className="font-display text-4xl uppercase tracking-[0.3em] text-white/90"
                style={{
                  textShadow:
                    "0 0 24px rgba(140,210,235,0.55), 0 0 50px rgba(90,160,200,0.4)",
                }}
              >
                {s.name}
              </span>
              <span className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent" />
              <span className="mt-2 text-[11px] uppercase tracking-[0.45em] text-cyan-100/45">
                {s.element}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
