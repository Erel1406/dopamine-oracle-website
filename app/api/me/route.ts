import {
  getPremiumUser,
  isClerkConfigured,
  isStripeConfigured,
  readFreeQuestionsUsed,
} from "@/lib/premium";

export const dynamic = "force-dynamic";

/** Client-facing view of auth + subscription + free-question budget. */
export async function GET(req: Request) {
  const { userId, subscribed } = await getPremiumUser();
  return Response.json({
    signedIn: Boolean(userId),
    subscribed,
    used: readFreeQuestionsUsed(req),
    paymentsConfigured: isClerkConfigured() && isStripeConfigured(),
  });
}
