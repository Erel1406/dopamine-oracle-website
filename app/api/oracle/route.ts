import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { getSignById } from "@/lib/zodiac";
import { hasOracleCredentials, ORACLE_MODEL, oracleSystemPrompt } from "@/lib/oracle";
import { FREE_QUESTIONS } from "@/lib/plan";
import {
  freeQuestionsCookie,
  getPremiumUser,
  readFreeQuestionsUsed,
} from "@/lib/premium";
import { dailyLimitReached, recordTokens } from "@/lib/usage";

export const maxDuration = 30;

/** Keep requests small: the Oracle needs a question, not a novel. */
const MAX_MESSAGES = 20;
const MAX_TEXT_LENGTH = 1_000;

export async function POST(req: Request) {
  const { messages, sign: signId }: { messages: UIMessage[]; sign?: string } =
    await req.json();

  const sign = getSignById(signId ?? null);
  if (!sign) {
    return Response.json({ error: "Unknown zodiac sign." }, { status: 400 });
  }

  if (!hasOracleCredentials()) {
    return Response.json(
      { error: "The Oracle sleeps — no AI credentials configured." },
      { status: 503 }
    );
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "No message provided." }, { status: 400 });
  }
  const recent = messages.slice(-MAX_MESSAGES);
  const tooLong = recent.some((m) =>
    m.parts?.some(
      (p) => p.type === "text" && p.text.length > MAX_TEXT_LENGTH
    )
  );
  if (tooLong) {
    return Response.json(
      { error: "The stars prefer shorter questions." },
      { status: 413 }
    );
  }

  // Subscribers ask freely; everyone else spends the signed-cookie budget.
  // Counted only once the request is actually accepted, so failed calls
  // never burn a free question.
  const { userId, subscribed } = await getPremiumUser();
  let setCookie: string | null = null;
  if (!subscribed) {
    const used = readFreeQuestionsUsed(req);
    if (used >= FREE_QUESTIONS) {
      return Response.json(
        { error: "The Oracle's free counsel is spent." },
        { status: 402 }
      );
    }
    setCookie = freeQuestionsCookie(used + 1);
  }

  // Fair-use guard for logged-in users (incl. "unlimited" subscribers):
  // a per-user daily token cap. Anonymous users are already question-capped.
  if (userId && (await dailyLimitReached(userId))) {
    return Response.json(
      { error: "The stars need to rest — you've reached today's limit." },
      { status: 429 }
    );
  }

  const result = streamText({
    model: ORACLE_MODEL,
    system: oracleSystemPrompt(sign),
    messages: await convertToModelMessages(recent),
    maxOutputTokens: 400,
    onFinish: userId
      ? ({ usage }) => recordTokens(userId, usage?.totalTokens ?? 0)
      : undefined,
  });

  const response = createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
  if (setCookie) response.headers.append("Set-Cookie", setCookie);
  return response;
}
