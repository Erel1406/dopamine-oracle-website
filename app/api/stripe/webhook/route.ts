import Stripe from "stripe";
import { clerkClient } from "@clerk/nextjs/server";
import { isClerkConfigured } from "@/lib/premium";

export const maxDuration = 30;

async function setSubscription(
  userId: string,
  privateMetadata: Record<string, unknown>
) {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, { privateMetadata });
}

/**
 * Stripe → Clerk sync. Subscription status is stored in the user's
 * privateMetadata; everything else reads it from there.
 */
export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || !process.env.STRIPE_SECRET_KEY || !isClerkConfigured()) {
    return new Response("Not configured", { status: 503 });
  }
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret
    );
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.client_reference_id;
      if (userId && session.mode === "subscription") {
        await setSubscription(userId, {
          subscriptionActive: true,
          stripeCustomerId:
            typeof session.customer === "string"
              ? session.customer
              : session.customer?.id,
          stripeSubscriptionId:
            typeof session.subscription === "string"
              ? session.subscription
              : session.subscription?.id,
        });
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const userId = subscription.metadata?.userId;
      if (userId) {
        const active =
          event.type !== "customer.subscription.deleted" &&
          ["active", "trialing", "past_due"].includes(subscription.status);
        await setSubscription(userId, { subscriptionActive: active });
      }
      break;
    }
  }

  return Response.json({ received: true });
}
