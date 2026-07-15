"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Gem, Lock, Sparkles } from "lucide-react";
import type { ZodiacSign } from "@/lib/zodiac";
import {
  FREE_QUESTIONS,
  MONTHLY_PRICE,
  useSubscription,
} from "@/lib/subscription";

const SUGGESTIONS = [
  "Will I find love this year?",
  "What is my hidden shadow?",
  "Who is meant to find me?",
];

/**
 * A live conversation with the Oracle (streamed from /api/oracle).
 * Visitors get FREE_QUESTIONS for free; after that the chat locks and
 * offers the monthly subscription (mocked until Stripe lands).
 *
 * Mount with `key={sign.id}` so the conversation resets per sign.
 */
export default function OracleChat({
  sign,
  onConsult,
}: {
  sign: ZodiacSign;
  onConsult: () => void;
}) {
  const [input, setInput] = useState("");
  const { subscribed, remaining, locked, subscribe, refresh, checkoutError } =
    useSubscription();
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/oracle",
      body: { sign: sign.id },
    }),
    // /api/oracle counts the question server-side (signed cookie);
    // re-sync the budget after every attempt, successful or not.
    onFinish: () => refresh(),
    onError: () => refresh(),
  });

  const busy = status === "submitted" || status === "streaming";

  const ask = (raw: string) => {
    const text = raw.trim();
    if (!text || busy || locked) return;
    setInput("");
    sendMessage({ text });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-noir-800/60 p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-ember/80">
          <Sparkles size={14} />
          <span className="text-[11px] font-medium uppercase tracking-[0.32em]">
            The Oracle
          </span>
        </div>
        {!subscribed && !locked && (
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            {remaining} of {FREE_QUESTIONS} free
          </span>
        )}
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
          {messages.map((m) => {
            const text = m.parts
              .map((p) => (p.type === "text" ? p.text : ""))
              .join("");
            if (!text) return null;
            return m.role === "user" ? (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-white/10 px-4 py-2.5 text-sm text-white/90"
              >
                {text}
              </motion.div>
            ) : (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-[92%]"
              >
                <div className="rounded-2xl rounded-bl-sm border border-ember/20 bg-ember/5 px-4 py-3">
                  <p className="text-sm leading-relaxed text-white/85">
                    {text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {status === "submitted" && (
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

        {error && (
          <p className="px-1 text-xs italic text-white/45">
            The Oracle&rsquo;s sight is clouded — the connection to the stars
            failed. Try again in a moment.
          </p>
        )}
      </div>

      {/* Suggestion chips (only before the first question) */}
      {messages.length === 0 && !busy && !locked && (
        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => ask(s)}
              className="btn-rune btn-rune-xs btn-rune-ghost px-3.5 py-1.5 text-xs text-white/60 transition-colors hover:text-ember"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Ask input — or the paywall once the free questions are spent */}
      {locked ? (
        <div className="mt-5 rounded-2xl border border-ember/25 bg-noir-900/70 p-5 text-center">
          <Lock size={18} className="mx-auto text-ember" />
          <p className="mt-3 font-display text-[15px] leading-snug text-white/85">
            The Oracle has spoken freely {FREE_QUESTIONS} times. To continue,
            bind your stars to it.
          </p>
          <button
            type="button"
            onClick={subscribe}
            className="btn-rune btn-rune-ember mt-4 w-full px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.16em] text-noir-900"
          >
            Join the Oracle — {MONTHLY_PRICE}/mo
          </button>
          {checkoutError && (
            <p className="mt-2.5 text-[11px] text-ember/90">{checkoutError}</p>
          )}
          <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-white/35">
            <Gem size={11} /> Cancel anytime · Secure checkout via Stripe
          </p>
          <button
            type="button"
            onClick={onConsult}
            className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ember/80 underline-offset-4 hover:underline"
          >
            See everything included
          </button>
        </div>
      ) : (
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
            disabled={busy}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ember to-ember-deep text-noir-900 transition hover:shadow-[0_0_16px_rgba(255,122,24,0.7)] disabled:opacity-50"
          >
            <ArrowUp size={16} />
          </button>
        </form>
      )}

      {/* Art. 50 AI Act: discreet but always visible at the interaction. */}
      <p className="mt-3 text-center text-[10px] tracking-wide text-white/25">
        The Oracle is AI-generated · for entertainment, not advice
      </p>
    </div>
  );
}
