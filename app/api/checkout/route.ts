import Stripe from "stripe";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { isClerkConfigured, isStripeConfigured } from "@/lib/premium";

export const maxDuration = 30;

/** Creates a Stripe Checkout session (subscription) for the signed-in user. */
export async function POST(req: Request) {
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
  if (user.privateMetadata?.subscriptionActive === true) {
    return Response.json({ error: "Already subscribed." }, { status: 409 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const origin = req.headers.get("origin") ?? new URL(req.url).origin;
  const existingCustomerId = user.privateMetadata?.stripeCustomerId;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    client_reference_id: userId,
    // The webhook needs the Clerk user id on subscription events too.
    subscription_data: { metadata: { userId } },
    ...(typeof existingCustomerId === "string"
      ? { customer: existingCustomerId }
      : { customer_email: user.emailAddresses[0]?.emailAddress }),
    success_url: `${origin}/?checkout=success#pricing`,
    cancel_url: `${origin}/#pricing`,
  });

  return Response.json({ url: session.url });
}
