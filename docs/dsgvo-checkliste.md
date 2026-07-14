# DSGVO-Checkliste — Dopamine Oracle

Keine Rechtsberatung, sondern eine projektspezifische Arbeitsliste. Stand: Auth (Clerk), Zahlung (Stripe), AI (Vercel AI Gateway → Anthropic), DB (Supabase), Token-Cap (Supabase).

## Verarbeitete personenbezogene Daten

| Datum | Quelle | Einstufung |
|---|---|---|
| E-Mail, Name | Clerk | normal (Art. 4) |
| Zahlungsdaten | Stripe | normal (Art. 4) |
| Geburtsdatum/-zeit/-ort *(geplant)* | Profil-Feature | normal (Art. 4) |
| Oracle-Chat-Inhalte | AI-Route → Anthropic | **potenziell besondere Kategorie (Art. 9)** — User schreiben freiwillig Gesundheit/Glaube/Sexualleben |
| Token-Nutzung pro Tag | Supabase | Nutzungsmetadaten |

## Rechtsgrundlagen (Art. 6)
- [ ] Vertragserfüllung (6 (1) b) für Abo, Profil, bestellte Readings
- [ ] Einwilligung (6 (1) a) für Marketing-Mail / optionale Verlauf-Speicherung
- [ ] Berechtigtes Interesse (6 (1) f) für Abuse-Schutz (Token-Cap) dokumentieren

## Pflichtdokumente
- [ ] Datenschutzerklärung (nennt alle unten stehenden Verarbeiter + Zwecke)
- [ ] Impressum
- [ ] Verzeichnis von Verarbeitungstätigkeiten (VVT, Art. 30)
- [ ] Cookie-/Consent-Hinweis (Clerk-Session-Cookie ist technisch notwendig; free-questions-Cookie ebenso)

## Auftragsverarbeiter — AVV abschließen (Art. 28)
- [ ] Clerk
- [ ] Stripe
- [ ] Vercel (Hosting + AI Gateway)
- [ ] Anthropic (LLM) — bestätigen: **kein Training auf API-Daten** (per Default so)
- [ ] Supabase

## Drittlandtransfer (USA, Art. 44 ff.)
- [ ] Supabase-Projekt in **EU-Region** (Frankfurt) anlegen → Ruhedaten bleiben in der EU
- [ ] Für US-Dienste (Clerk, Stripe, Vercel, Anthropic): SCCs / EU-US Data Privacy Framework prüfen
- [ ] In Datenschutzerklärung offenlegen

## Betroffenenrechte
- [ ] Auskunft/Export pro User (Profil + Verlauf + Nutzung)
- [ ] Löschung pro User ("Recht auf Vergessen") — Delete-Pfad von Anfang an einplanen
- [ ] Löschung muss auch Clerk-Metadata + Stripe-Kunde + Supabase-Zeilen umfassen

## Datenminimierung (Art. 5 (1) c)
- [ ] Geburtszeit/-ort nur optional erfassen (nur wenn Feature es wirklich braucht)
- [ ] Chat-Verlauf-Speicherung: **Opt-in** oder Retention-Limit statt "für immer"
- [ ] Token-Nutzungszeilen älter als N Tage prunen (siehe Migration: pg_cron-Hinweis)

## AI-spezifisch
- [ ] Klarstellen, dass Oracle-Fragen an einen US-LLM gehen (Transparenz)
- [ ] Kein Training auf Nutzerdaten (Anthropic/Vercel bestätigt)
- [ ] Prompt/Systemprompt speichert keine PII über das Nötige hinaus

## Technisch
- [ ] Supabase Row Level Security aktiv; Zugriff nur über service_role serverseitig
- [ ] `SUPABASE_SERVICE_ROLE_KEY` nur serverseitig, nie im Client-Bundle
- [ ] TLS überall (Standard bei Vercel/Supabase)
