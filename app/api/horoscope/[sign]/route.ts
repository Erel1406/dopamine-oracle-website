import { unstable_cache } from "next/cache";
import { generateText } from "ai";
import { getSignById } from "@/lib/zodiac";
import {
  hasOracleCredentials,
  HOROSCOPE_MODEL,
  horoscopePrompt,
} from "@/lib/oracle";

export const maxDuration = 30;

const DAY_SECONDS = 60 * 60 * 24;

/**
 * One AI generation per sign per UTC day. `unstable_cache` keys on
 * [signId, isoDate], so a new day naturally produces a fresh reading while
 * repeat visitors share the cached one.
 */
const getDailyHoroscope = unstable_cache(
  async (signId: string, isoDate: string) => {
    const sign = getSignById(signId);
    if (!sign) return null;
    const { text } = await generateText({
      model: HOROSCOPE_MODEL,
      prompt: horoscopePrompt(sign, isoDate),
      maxOutputTokens: 200,
    });
    return text.trim();
  },
  ["daily-horoscope"],
  { revalidate: DAY_SECONDS }
);

export async function GET(
  _req: Request,
  { params }: { params: { sign: string } }
) {
  const sign = getSignById(params.sign);
  if (!sign) {
    return Response.json({ error: "Unknown zodiac sign." }, { status: 404 });
  }

  const isoDate = new Date().toISOString().slice(0, 10);

  // Without credentials (or on any generation failure) fall back to the
  // sign's static Daily Truth so the free feature never breaks.
  if (!hasOracleCredentials()) {
    return Response.json({ sign: sign.id, date: isoDate, text: sign.dailyTruth, source: "static" });
  }

  try {
    const text = await getDailyHoroscope(sign.id, isoDate);
    return Response.json({
      sign: sign.id,
      date: isoDate,
      text: text ?? sign.dailyTruth,
      source: text ? "oracle" : "static",
    });
  } catch {
    return Response.json({ sign: sign.id, date: isoDate, text: sign.dailyTruth, source: "static" });
  }
}
