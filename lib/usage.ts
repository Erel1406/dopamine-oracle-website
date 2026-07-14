import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Per-user daily token budget (fair use for the "unlimited" Oracle).
 *
 * Counting lives in Supabase Postgres, one row per [user_id, UTC day].
 * The increment is atomic via the `increment_token_usage` RPC (see
 * supabase/migrations/0001_token_usage.sql). Access uses the service-role
 * key, so this module is server-only. Without Supabase env vars the cap is
 * simply absent and the site keeps working.
 */

export const DAILY_TOKEN_LIMIT = 150_000;

const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isUsageTrackingConfigured = () => Boolean(url && serviceKey);

let client: SupabaseClient | null = null;
function db(): SupabaseClient | null {
  if (!isUsageTrackingConfigured()) return null;
  if (!client)
    client = createClient(url!, serviceKey!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  return client;
}

const today = () => new Date().toISOString().slice(0, 10);

/** Tokens spent by this user today (0 when tracking is off). */
export async function tokensUsedToday(userId: string): Promise<number> {
  const c = db();
  if (!c) return 0;
  try {
    const { data } = await c
      .from("token_usage")
      .select("tokens")
      .eq("user_id", userId)
      .eq("day", today())
      .maybeSingle();
    return data?.tokens ?? 0;
  } catch {
    return 0;
  }
}

/** True when the user has already spent their daily budget. */
export async function dailyLimitReached(userId: string): Promise<boolean> {
  if (!isUsageTrackingConfigured()) return false;
  return (await tokensUsedToday(userId)) >= DAILY_TOKEN_LIMIT;
}

/** Add the tokens a completed request actually spent (atomic upsert). */
export async function recordTokens(userId: string, tokens: number) {
  const c = db();
  if (!c || tokens <= 0) return;
  try {
    await c.rpc("increment_token_usage", {
      p_user_id: userId,
      p_day: today(),
      p_amount: Math.round(tokens),
    });
  } catch {
    // A tracking hiccup must never break the reply.
  }
}
