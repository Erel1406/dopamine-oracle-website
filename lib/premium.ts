import { createHmac } from "crypto";
import { auth, clerkClient } from "@clerk/nextjs/server";

/**
 * Server-side premium state.
 *
 * - Subscription status lives in Clerk `privateMetadata` (written by the
 *   Stripe webhook) — no own database needed.
 * - The free-question budget for non-subscribers is counted in a signed
 *   HttpOnly cookie. Tampering resets the count; the hard wall is the
 *   subscription check, the cookie is only the soft free tier.
 */

export const isClerkConfigured = () =>
  Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY
  );

export const isStripeConfigured = () =>
  Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PRICE_ID);

const COOKIE_NAME = "oracle_used";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const cookieSecret = () =>
  process.env.FREE_QUESTIONS_COOKIE_SECRET ?? "dev-only-insecure-secret";

const mac = (count: number) =>
  createHmac("sha256", cookieSecret())
    .update(String(count))
    .digest("hex")
    .slice(0, 32);

export function readFreeQuestionsUsed(req: Request): number {
  const cookies = req.headers.get("cookie") ?? "";
  const match = cookies.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  if (!match) return 0;
  const [countStr, sig] = decodeURIComponent(match[1]).split(".");
  const count = Number(countStr);
  if (!Number.isInteger(count) || count < 0 || sig !== mac(count)) return 0;
  return count;
}

export function freeQuestionsCookie(count: number): string {
  return `${COOKIE_NAME}=${count}.${mac(count)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`;
}

/** Clerk user id + subscription status; safe to call when Clerk is absent. */
export async function getPremiumUser(): Promise<{
  userId: string | null;
  subscribed: boolean;
}> {
  if (!isClerkConfigured()) return { userId: null, subscribed: false };
  try {
    const { userId } = await auth();
    if (!userId) return { userId: null, subscribed: false };
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    return {
      userId,
      subscribed: user.privateMetadata?.subscriptionActive === true,
    };
  } catch {
    return { userId: null, subscribed: false };
  }
}
