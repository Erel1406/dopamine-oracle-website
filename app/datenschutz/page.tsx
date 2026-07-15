import type { Metadata } from "next";
import LegalShell, { LegalH2 } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — AI Zodiac Engine",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <LegalShell title="Datenschutzerklärung" demo>
      <LegalH2>1. Verantwortlicher</LegalH2>
      <p>
        Verantwortlicher im Sinne der DSGVO: [VOR- UND NACHNAME], [ANSCHRIFT],
        E-Mail: [KONTAKT-E-MAIL].
      </p>

      <LegalH2>2. Hosting</LegalH2>
      <p>
        Diese Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf werden
        technisch notwendige Daten (IP-Adresse, Zeitpunkt, aufgerufene Seite,
        User-Agent) in Server-Logs verarbeitet (Art. 6 Abs. 1 lit. f DSGVO —
        sicherer Betrieb). Mit Vercel besteht ein Auftragsverarbeitungsvertrag;
        die Übermittlung in die USA stützt sich auf das EU-US Data Privacy
        Framework bzw. Standardvertragsklauseln.
      </p>

      <LegalH2>3. Konto und Anmeldung (Clerk)</LegalH2>
      <p>
        Für Premium-Funktionen ist ein Nutzerkonto erforderlich. Die
        Registrierung und Anmeldung erfolgt über Clerk Inc. (USA).
        Verarbeitet werden E-Mail-Adresse, Name (sofern angegeben) und
        Anmeldedaten (Art. 6 Abs. 1 lit. b DSGVO — Vertragserfüllung).
        Auftragsverarbeitungsvertrag und Standardvertragsklauseln liegen vor.
      </p>

      <LegalH2>4. Zahlungen (Stripe)</LegalH2>
      <p>
        Abonnements werden über Stripe Payments Europe Ltd. (Irland) bzw.
        Stripe Inc. (USA) abgewickelt. Zahlungsdaten (Kartendaten,
        Rechnungsdaten) werden direkt von Stripe verarbeitet; wir erhalten
        keine vollständigen Zahlungsdaten (Art. 6 Abs. 1 lit. b DSGVO).
      </p>

      <LegalH2>5. Oracle-Chat (Künstliche Intelligenz)</LegalH2>
      <p>
        Die Antworten des &bdquo;Oracle&ldquo; werden durch ein
        KI-Sprachmodell erzeugt. Ihre Chat-Eingaben werden zur Erzeugung der
        Antwort an unseren AI-Anbieter ([OPENROUTER INC. (USA) / VERCEL AI
        GATEWAY — ANPASSEN JE NACH KONFIGURATION]) übermittelt (Art. 6 Abs. 1
        lit. b DSGVO). Die Eingaben werden nicht zum Training von KI-Modellen
        verwendet. Bitte geben Sie im Chat keine sensiblen Daten (z. B.
        Gesundheitsdaten) ein — Eingaben erfolgen freiwillig. Chat-Verläufe
        werden von uns nicht dauerhaft gespeichert.
      </p>

      <LegalH2>6. Datenbank (Supabase)</LegalH2>
      <p>
        Zur Missbrauchsvermeidung speichern wir die tägliche Nutzungsmenge
        (Token-Anzahl) pro Nutzerkonto in einer Datenbank bei Supabase
        (Region: Frankfurt, EU) für maximal 30 Tage (Art. 6 Abs. 1 lit. f
        DSGVO — Schutz vor übermäßiger Nutzung).
      </p>

      <LegalH2>7. Cookies</LegalH2>
      <p>
        Wir verwenden ausschließlich technisch notwendige Cookies: das
        Sitzungs-Cookie der Anmeldung (Clerk) und ein signiertes Cookie, das
        die kostenlosen Oracle-Fragen zählt (§ 25 Abs. 2 TDDDG). Ein
        Einwilligungsbanner ist daher nicht erforderlich. Marketing- oder
        Tracking-Cookies setzen wir nicht ein.
      </p>

      <LegalH2>8. Ihre Rechte</LegalH2>
      <p>
        Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16),
        Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit
        (Art. 20) und Widerspruch (Art. 21 DSGVO) sowie das Recht auf
        Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO). Wenden Sie
        sich dazu an: [KONTAKT-E-MAIL].
      </p>

      <LegalH2>9. Speicherdauer und Änderungen</LegalH2>
      <p>
        Personenbezogene Daten werden gelöscht, sobald der Zweck entfällt und
        keine gesetzlichen Aufbewahrungspflichten (z. B. steuerrechtlich)
        entgegenstehen. Diese Erklärung wird bei Bedarf angepasst — Stand:
        [DATUM].
      </p>
    </LegalShell>
  );
}
