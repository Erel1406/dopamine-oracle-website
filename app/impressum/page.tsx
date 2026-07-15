import type { Metadata } from "next";
import LegalShell, { LegalH2 } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Impressum — AI Zodiac Engine",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <LegalShell title="Impressum" demo>
      <LegalH2>Angaben gemäß § 5 DDG</LegalH2>
      <p>
        [VOR- UND NACHNAME]
        <br />
        [STRASSE UND HAUSNUMMER]
        <br />
        [PLZ ORT]
        <br />
        Deutschland
      </p>

      <LegalH2>Kontakt</LegalH2>
      <p>
        E-Mail: [KONTAKT-E-MAIL]
        <br />
        Telefon: [TELEFONNUMMER — optional, aber empfohlen]
      </p>

      <LegalH2>Umsatzsteuer</LegalH2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [UST-IDNR — falls
        vorhanden. Bei Kleinunternehmerregelung nach § 19 UStG stattdessen:
        &bdquo;Gemäß § 19 UStG wird keine Umsatzsteuer ausgewiesen.&ldquo;]
      </p>

      <LegalH2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</LegalH2>
      <p>
        [VOR- UND NACHNAME]
        <br />
        [ANSCHRIFT WIE OBEN]
      </p>

      <LegalH2>EU-Streitschlichtung</LegalH2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          className="underline decoration-white/30 underline-offset-4 hover:text-white"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        . Wir sind nicht bereit oder verpflichtet, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>
    </LegalShell>
  );
}
