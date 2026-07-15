import Stripe from "stripe";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { isClerkConfigured, isStripeConfigured } from "@/lib/premium";

export const maxDuration = 30;

/**
 * § 312k BGB cancel flow: sets the subscription to cancel at period end.
 * Access stays active until the paid period runs out; the Stripe webhook
 * flips the Clerk metadata once the subscription is actually deleted.
 */
export async function POST() {
  if (!isClerkConfigured() || !isStripeConfigured()) {
    return Response.json(
      { error: "Payments are not configured yet." },
      { status: 503 }
    );
  }

  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Sign in first." }, { status: 401 });
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const subscriptionId = user.privateMetadata?.stripeSubscriptionId;
  if (
    typeof subscriptionId !== "string" ||
    user.privateMetadata?.subscriptionActive !== true
  ) {
    return Response.json(
      { error: "No active subscription on this account." },
      { status: 404 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });

  const periodEnd =
    subscription.items?.data?.[0]?.current_period_end ?? null;

  return Response.json({
    cancelled: true,
    accessUntil: periodEnd
      ? new Date(periodEnd * 1000).toISOString().slice(0, 10)
      : null,
  });
}
