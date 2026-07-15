import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { LegalH2 } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "AGB & Widerruf — AI Zodiac Engine",
  robots: { index: false },
};

export default function AgbPage() {
  return (
    <LegalShell title="Allgemeine Geschäftsbedingungen" demo>
      <LegalH2>1. Anbieter und Geltungsbereich</LegalH2>
      <p>
        Diese AGB gelten für die Nutzung der Website &bdquo;AI Zodiac
        Engine&ldquo; und den Abschluss von Abonnements durch Verbraucher.
        Anbieter: [VOR- UND NACHNAME, ANSCHRIFT — wie Impressum].
      </p>

      <LegalH2>2. Leistung — Unterhaltungsangebot</LegalH2>
      <p>
        Die Inhalte (Horoskope, Oracle-Chat, Readings) dienen ausschließlich
        der <strong>Unterhaltung und Selbstreflexion</strong>. Die Antworten
        des Oracle werden durch <strong>künstliche Intelligenz</strong>{" "}
        erzeugt. Sie stellen keine medizinische, rechtliche, finanzielle oder
        psychologische Beratung dar; ein Anspruch auf inhaltliche Richtigkeit
        besteht nicht.
      </p>

      <LegalH2>3. Kostenlose Nutzung und Abonnement</LegalH2>
      <p>
        Die Basisfunktionen sind kostenlos. Das Abonnement
        &bdquo;Oracle&ldquo; kostet <strong>9,99 € pro Monat</strong>{" "}
        [inkl. USt. — BEI KLEINUNTERNEHMERREGELUNG ANPASSEN], verlängert sich
        monatlich automatisch und ist jederzeit zum Ende des laufenden
        Abrechnungszeitraums kündbar. Es gilt ein Fair-Use-Limit (tägliches
        Nutzungskontingent); Einzelheiten auf der Preisseite.
      </p>

      <LegalH2>4. Vertragsschluss</LegalH2>
      <p>
        Der Vertrag kommt mit Abschluss des Bezahlvorgangs über unseren
        Zahlungsdienstleister Stripe zustande. Vertragssprache ist Deutsch
        [ODER: Englisch — ANPASSEN].
      </p>

      <LegalH2>5. Kündigung</LegalH2>
      <p>
        Sie können das Abonnement jederzeit zum Ende des laufenden
        Abrechnungszeitraums kündigen — über die Schaltfläche{" "}
        <Link
          href="/cancel"
          className="underline decoration-white/30 underline-offset-4 hover:text-white"
        >
          Verträge hier kündigen
        </Link>{" "}
        oder im Kundenportal. Bereits gezahlte Entgelte für den laufenden
        Zeitraum werden nicht erstattet; der Zugang bleibt bis zum Ende des
        Zeitraums bestehen.
      </p>

      <LegalH2>6. Widerrufsrecht</LegalH2>
      <p>
        Verbrauchern steht ein gesetzliches Widerrufsrecht von 14 Tagen zu.
        <br />
        <br />
        <strong>Widerrufsbelehrung:</strong> Sie haben das Recht, binnen
        vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
        Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des
        Vertragsschlusses. Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
        ([NAME, ANSCHRIFT, E-MAIL]) mittels einer eindeutigen Erklärung
        (z. B. E-Mail) über Ihren Entschluss informieren. Zur Wahrung der
        Frist reicht die rechtzeitige Absendung.
        <br />
        <br />
        <strong>Folgen des Widerrufs:</strong> Im Falle eines wirksamen
        Widerrufs erstatten wir alle erhaltenen Zahlungen unverzüglich,
        spätestens binnen vierzehn Tagen, über dasselbe Zahlungsmittel.
        <br />
        <br />
        <strong>Erlöschen:</strong> Das Widerrufsrecht erlischt bei Verträgen
        über digitale Inhalte, wenn Sie ausdrücklich zugestimmt haben, dass
        wir vor Ablauf der Widerrufsfrist mit der Ausführung beginnen, und
        Sie Ihre Kenntnis vom Erlöschen bestätigt haben (§ 356 Abs. 5 BGB).
        [HINWEIS: Diese Zustimmung muss im Checkout eingeholt werden.]
        <br />
        <br />
        <strong>Muster-Widerrufsformular</strong> (wenn Sie den Vertrag
        widerrufen wollen, füllen Sie bitte dieses Formular aus und senden
        Sie es zurück): An [NAME, ANSCHRIFT, E-MAIL] — Hiermit widerrufe(n)
        ich/wir den von mir/uns abgeschlossenen Vertrag über die Erbringung
        der folgenden Dienstleistung: [___]. Bestellt am [___], Name und
        Anschrift des/der Verbraucher(s) [___], Datum, Unterschrift (nur bei
        Mitteilung auf Papier).
      </p>

      <LegalH2>7. Haftung</LegalH2>
      <p>
        Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie
        bei Verletzung von Leben, Körper und Gesundheit. Bei einfacher
        Fahrlässigkeit haften wir nur für die Verletzung wesentlicher
        Vertragspflichten, begrenzt auf den vorhersehbaren, vertragstypischen
        Schaden. Im Übrigen ist die Haftung ausgeschlossen. Für
        Entscheidungen, die auf Grundlage der Unterhaltungsinhalte getroffen
        werden, übernehmen wir keine Verantwortung (siehe Ziffer 2).
      </p>

      <LegalH2>8. Schlussbestimmungen</LegalH2>
      <p>
        Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts; gegenüber
        Verbrauchern nur, soweit nicht zwingende Bestimmungen des Staates
        ihres gewöhnlichen Aufenthalts entgegenstehen. Sollten einzelne
        Bestimmungen unwirksam sein, bleibt der Vertrag im Übrigen wirksam.
      </p>
    </LegalShell>
  );
}
