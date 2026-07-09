"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Mock subscription state, kept in localStorage until real auth + Stripe
 * land. The paywall UX (free questions → lock → subscribe → unlimited) is
 * fully wired so swapping in Stripe later only replaces these primitives.
 *
 * TODO(stripe): replace with real subscription status from the backend.
 */

const SUB_KEY = "zodiac_subscribed";
const USED_KEY = "zodiac_oracle_questions_used";
const CHANGE_EVENT = "zodiac:subscription-change";

export const FREE_QUESTIONS = 3;
export const MONTHLY_PRICE = "€9.99";

export function isSubscribed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SUB_KEY) === "true";
}

export function subscribeMock() {
  window.localStorage.setItem(SUB_KEY, "true");
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function questionsUsed(): number {
  if (typeof window === "undefined") return 0;
  return Number(window.localStorage.getItem(USED_KEY) ?? "0") || 0;
}

export function recordQuestion(): number {
  const next = questionsUsed() + 1;
  window.localStorage.setItem(USED_KEY, String(next));
  window.dispatchEvent(new Event(CHANGE_EVENT));
  return next;
}

/** Reactive view of the mock subscription + free-question budget. */
export function useSubscription() {
  const [subscribed, setSubscribed] = useState(false);
  const [used, setUsed] = useState(0);

  useEffect(() => {
    const sync = () => {
      setSubscribed(isSubscribed());
      setUsed(questionsUsed());
    };
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const subscribe = useCallback(() => subscribeMock(), []);

  return {
    subscribed,
    used,
    remaining: Math.max(0, FREE_QUESTIONS - used),
    locked: !subscribed && used >= FREE_QUESTIONS,
    subscribe,
  };
}
