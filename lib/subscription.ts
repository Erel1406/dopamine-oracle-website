"use client";

import { useCallback, useEffect, useState } from "react";
import { FREE_QUESTIONS } from "./plan";

export { FREE_QUESTIONS, MONTHLY_PRICE } from "./plan";

/**
 * Client view of the premium state. The server (/api/me) is the source of
 * truth: subscription status comes from Clerk metadata, the free-question
 * count from the signed HttpOnly cookie set by /api/oracle.
 *
 * subscribe() → Stripe Checkout; signs the visitor in first if needed.
 */

type Status = {
  signedIn: boolean;
  subscribed: boolean;
  used: number;
  paymentsConfigured: boolean;
};

const INITIAL: Status = {
  signedIn: false,
  subscribed: false,
  used: 0,
  paymentsConfigured: false,
};

export function useSubscription() {
  const [status, setStatus] = useState<Status>(INITIAL);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/me", { cache: "no-store" });
      if (res.ok) setStatus(await res.json());
    } catch {
      // keep last known state
    }
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [refresh]);

  const subscribe = useCallback(async () => {
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      if (res.status === 401) {
        window.location.href = `/sign-in?redirect_url=${encodeURIComponent(
          window.location.href
        )}`;
        return;
      }
      const data = await res.json().catch(() => null);
      if (res.ok && data?.url) {
        window.location.href = data.url;
        return;
      }
      setCheckoutError(
        typeof data?.error === "string"
          ? data.error
          : "Checkout failed — try again."
      );
    } catch {
      setCheckoutError("Checkout failed — try again.");
    }
  }, []);

  return {
    subscribed: status.subscribed,
    used: status.used,
    remaining: Math.max(0, FREE_QUESTIONS - status.used),
    locked: !status.subscribed && status.used >= FREE_QUESTIONS,
    subscribe,
    refresh,
    checkoutError,
  };
}
