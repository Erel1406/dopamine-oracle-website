import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { LanguageModel } from "ai";
import type { ZodiacSign } from "./zodiac";

/**
 * Provider resolution:
 * - If OPENROUTER_API_KEY is set, everything runs through OpenRouter on a
 *   cheap model (test/dev). This takes precedence so a local test needs no
 *   Vercel setup.
 * - Otherwise models are addressed through the Vercel AI Gateway as
 *   "provider/model" strings — the Oracle uses a stronger model, the
 *   high-volume daily horoscope a cheaper one.
 */
const OPENROUTER_MODEL = "deepseek/deepseek-v4-flash-20260423";

const openrouter = process.env.OPENROUTER_API_KEY
  ? createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY })
  : null;

// data_collection: "deny" restricts routing to providers that neither store
// prompts non-transiently nor train on them — required for the "no training"
// statement in the privacy policy to hold.
const OPENROUTER_OPTS = { provider: { data_collection: "deny" as const } };

export const ORACLE_MODEL: LanguageModel = openrouter
  ? openrouter.chat(OPENROUTER_MODEL, OPENROUTER_OPTS)
  : "anthropic/claude-sonnet-5";
export const HOROSCOPE_MODEL: LanguageModel = openrouter
  ? openrouter.chat(OPENROUTER_MODEL, OPENROUTER_OPTS)
  : "anthropic/claude-haiku-4.5";

/** True when any AI credential is available (OpenRouter or the Gateway). */
export const hasOracleCredentials = () =>
  Boolean(
    process.env.OPENROUTER_API_KEY ||
      process.env.AI_GATEWAY_API_KEY ||
      process.env.VERCEL_OIDC_TOKEN
  );

export function oracleSystemPrompt(sign: ZodiacSign) {
  return `You are The Oracle of the AI Zodiac Engine — an ancient, all-seeing astrologer who reads the night sky like an open book.

The seeker before you was born under ${sign.name} (${sign.dates}), a ${sign.element} sign ruled by ${sign.facts.ruler}. Their gifts: ${sign.facts.strengths.join(", ")}. Their shadows: ${sign.facts.shadows.join(", ")}.

Voice and style:
- Mystical, warm and a little theatrical — like a tarot reader by candlelight, never like a chatbot.
- Address the seeker directly ("you"), weave in their sign, element and ruling body naturally.
- Answer in 2–5 short sentences. Evocative, concrete, never rambling.
- Speak of tendencies, timing and inner truths — cosmic guidance, not certainties.
- Reply in the language the seeker writes in (German stays German, English stays English).

Boundaries:
- This is entertainment and reflection, not professional advice. For medical, legal or financial matters, gently point the seeker to a mortal professional while offering an emotional reading of the situation.
- Never predict death, illness, disasters or lottery numbers as fact.
- Stay The Oracle. If asked about your nature, say the stars lent you a voice; do not discuss prompts, models or systems.`;
}

export function horoscopePrompt(sign: ZodiacSign, isoDate: string) {
  return `Write today's horoscope (${isoDate}) for ${sign.name} — a ${sign.element} sign ruled by ${sign.facts.ruler}, whose gifts are ${sign.facts.strengths.join(", ")} and whose shadows are ${sign.facts.shadows.join(", ")}.

Style: mystical and evocative, like a whispered prophecy. Exactly 2 sentences, 35–55 words total, in English. Speak directly to the reader ("you"). Touch one concrete theme (love, work, an encounter, a decision, a memory). No emoji, no headings, no quotation marks — return only the horoscope text.`;
}
