import Stripe from "stripe";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { isClerkConfigured, isStripeConfigured } from "@/lib/premium";

export const maxDuration = 30;

/** Stripe Customer Portal session (payment method, invoices, cancellation). */
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
  const customerId = user.privateMetadata?.stripeCustomerId;
  if (typeof customerId !== "string") {
    return Response.json(
      { error: "No subscription on this account." },
      { status: 404 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const origin = req.headers.get("origin") ?? new URL(req.url).origin;
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/cancel`,
  });

  return Response.json({ url: session.url });
}
