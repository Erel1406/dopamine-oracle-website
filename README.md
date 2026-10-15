# dopamine.oracle — Website

Web companion to the [dopamine.oracle](https://www.instagram.com/dopamine.oracle/) zodiac account:
an interactive constellation map, AI-generated daily horoscopes and a chat with "the Oracle",
behind a freemium subscription.

## Features

- **Constellation Map:** animated starfield and an explorable map of all twelve signs (Framer Motion)
- **Daily horoscopes:** generated per sign by an LLM and served via `app/api/horoscope/[sign]`
- **Oracle chat:** streaming AI chat (Vercel AI SDK) with a few free questions, tracked by a signed cookie
- **Premium subscription:** Stripe Checkout and webhooks, with auth by Clerk
- **Cost control:** daily per-user token cap stored in Supabase (`supabase/migrations`)
- **Provider switch:** OpenRouter for cheap local testing, Vercel AI Gateway in production (`lib/oracle.ts`)
- **GDPR checklist:** `docs/dsgvo-checkliste.md`

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Vercel AI SDK ·
Clerk · Stripe · Supabase

## Getting started

```bash
cp .env.example .env.local   # fill in the keys (see comments in the file)
npm install
npm run dev                  # http://localhost:3000
```

Without AI credentials the app still runs; the Oracle chat and horoscopes are disabled.

## Authors

[Erel Acmi](https://github.com/Erel1406) · Christopher Spachtholz
