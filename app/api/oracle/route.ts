import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { getSignById } from "@/lib/zodiac";
import { hasOracleCredentials, ORACLE_MODEL, oracleSystemPrompt } from "@/lib/oracle";

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

  const result = streamText({
    model: ORACLE_MODEL,
    system: oracleSystemPrompt(sign),
    messages: await convertToModelMessages(recent),
    maxOutputTokens: 400,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
