"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Lock, Sparkles } from "lucide-react";
import type { ZodiacSign } from "@/lib/zodiac";

const SUGGESTIONS = [
  "Will I find love this year?",
  "What is my hidden shadow?",
  "Who is meant to find me?",
];

type Msg =
  | { role: "user"; text: string }
  | { role: "oracle"; locked: true };

/**
 * A teaser conversation with the Oracle. The user may ask anything; the
 * Oracle always begins to answer — then veils the truth behind the
 * premium reading. Pure freemium upsell, no backend required.
 */
export default function OracleChat({
  sign,
  onConsult,
}: {
  sign: ZodiacSign;
  onConsult: () => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const ask = (raw: string) => {
    const text = raw.trim();
    if (!text || thinking) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setThinking(true);
    window.setTimeout(() => {
      setThinking(false);
      setMessages((m) => [...m, { role: "oracle", locked: true }]);
    }, 1100);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-noir-800/60 p-5">
      <div className="mb-3 flex items-center gap-2 text-ember/80">
        <Sparkles size={14} />
        <span className="text-[11px] font-medium uppercase tracking-[0.32em]">
          The Oracle
        </span>
      </div>

      <p className="font-display text-[15px] leading-relaxed text-white/80">
        The Oracle has read the stars of {sign.name}. It already knows this
        about you —{" "}
        <span className="text-white/55">ask it anything.</span>
      </p>

      {/* What it already knows */}
      <ul className="mt-4 space-y-2">
        {sign.oracleKnows.map((line, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-white/65">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ember/80 shadow-[0_0_8px_rgba(255,122,24,0.9)]" />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {/* Conversation */}
      <div className="mt-5 space-y-3">
        <AnimatePresence initial={false}>
          {messages.map((m, i) =>
            m.role === "user" ? (
              <motion.div
                key={`u-${i}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-white/10 px-4 py-2.5 text-sm text-white/90"
              >
                {m.text}
              </motion.div>
            ) : (
              <motion.div
                key={`o-${i}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-[92%]"
              >
                <div className="relative overflow-hidden rounded-2xl rounded-bl-sm border border-ember/20 bg-ember/5 px-4 py-3">
                  {/* Blurred "answer" the user cannot read */}
                  <p
                    aria-hidden
                    className="select-none text-sm leading-relaxed text-white/70 blur-[5px]"
                  >
                    The stars align in your favour, yet a shadow crosses the
                    seventh house. What you seek is closer than the moon, and
                    the name begins with—
                  </p>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-noir-900/40 backdrop-blur-[1px]">
                    <Lock size={16} className="text-ember" />
                    <button
                      type="button"
                      onClick={onConsult}
                      className="text-xs font-medium uppercase tracking-[0.2em] text-ember underline-offset-4 hover:underline"
                    >
                      Unlock the Oracle&rsquo;s answer
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>

        {thinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 px-1 text-ember/70"
          >
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="h-1.5 w-1.5 rounded-full bg-ember/70"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
              />
            ))}
            <span className="ml-1 text-xs italic text-white/45">
              consulting the stars…
            </span>
          </motion.div>
        )}
      </div>

      {/* Suggestion chips (only before the first question) */}
      {messages.length === 0 && !thinking && (
        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => ask(s)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:border-ember/40 hover:text-ember"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Ask input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-noir-900/70 py-1.5 pl-4 pr-1.5 focus-within:border-ember/40"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask the Oracle about your ${sign.name}…`}
          className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Ask the Oracle"
          disabled={thinking}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ember to-ember-deep text-noir-900 transition hover:shadow-[0_0_16px_rgba(255,122,24,0.7)] disabled:opacity-50"
        >
          <ArrowUp size={16} />
        </button>
      </form>
    </div>
  );
}
