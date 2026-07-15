"use client";

import { useState } from "react";
import LegalShell, { LegalH2 } from "@/components/legal/LegalShell";

type State =
  | { kind: "idle" }
  | { kind: "busy" }
  | { kind: "done"; accessUntil: string | null }
  | { kind: "error"; message: string };

/**
 * § 312k BGB Kündigungsseite ("Verträge hier kündigen" →
 * Bestätigungsschaltfläche "jetzt kündigen"). Cancels at period end via
 * /api/cancel; the portal button covers payment/invoice management.
 */
export default function CancelPage() {
  const [state, setState] = useState<State>({ kind: "idle" });

  const signInRedirect = () => {
    window.location.href = `/sign-in?redirect_url=${encodeURIComponent(
      window.location.href
    )}`;
  };

  const cancelNow = async () => {
    setState({ kind: "busy" });
    try {
      const res = await fetch("/api/cancel", { method: "POST" });
      if (res.status === 401) return signInRedirect();
      const data = await res.json().catch(() => null);
      if (res.ok) {
        setState({ kind: "done", accessUntil: data?.accessUntil ?? null });
      } else {
        setState({
          kind: "error",
          message:
            typeof data?.error === "string"
              ? data.error
              : "Kündigung fehlgeschlagen — bitte erneut versuchen.",
        });
      }
    } catch {
      setState({
        kind: "error",
        message: "Kündigung fehlgeschlagen — bitte erneut versuchen.",
      });
    }
  };

  const openPortal = async () => {
    try {
      const res = await fetch("/api/portal", { method: "POST" });
      if (res.status === 401) return signInRedirect();
      const data = await res.json().catch(() => null);
      if (res.ok && data?.url) window.location.href = data.url;
    } catch {
      // Fehlermeldung übernimmt der Kündigungspfad; Portal ist optional.
    }
  };

  return (
    <LegalShell title="Verträge hier kündigen">
      <p>
        Hier können Sie Ihr Oracle-Abonnement (9,99 €/Monat) jederzeit zum
        Ende des laufenden Abrechnungszeitraums kündigen. Ihr Zugang bleibt
        bis dahin bestehen; danach wird nichts mehr abgebucht.
      </p>
      <p className="text-sm text-white/50">
        Sie werden dafür kurz angemeldet, damit wir Ihr Abo eindeutig
        zuordnen können. Alternativ können Sie Ihre Kündigung formlos per
        E-Mail an [KONTAKT-E-MAIL] erklären — die Absendung wahrt die Frist.
      </p>

      {state.kind === "done" ? (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-emerald-200">
          <p className="font-medium">Ihre Kündigung ist eingegangen.</p>
          <p className="mt-1 text-sm text-emerald-200/80">
            {state.accessUntil
              ? `Ihr Zugang endet am ${state.accessUntil}. `
              : "Ihr Zugang endet zum Ablauf des bezahlten Zeitraums. "}
            Sie erhalten eine Bestätigung per E-Mail. Bitte sichern Sie
            zusätzlich diese Anzeige (Screenshot) als Nachweis.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <button
            type="button"
            onClick={cancelNow}
            disabled={state.kind === "busy"}
            className="btn-rune btn-rune-ember w-full px-6 py-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-noir-900 disabled:opacity-50 sm:w-auto"
          >
            {state.kind === "busy" ? "Wird verarbeitet…" : "Jetzt kündigen"}
          </button>
          {state.kind === "error" && (
            <p className="text-sm text-ember/90">{state.message}</p>
          )}
        </div>
      )}

      <LegalH2>Zahlungen &amp; Rechnungen verwalten</LegalH2>
      <p className="text-sm text-white/50">
        Zahlungsmethode ändern, Rechnungen einsehen oder die Kündigung
        zurücknehmen können Sie im Kundenportal unseres
        Zahlungsdienstleisters Stripe.
      </p>
      <button
        type="button"
        onClick={openPortal}
        className="btn-rune btn-rune-ghost px-6 py-3 text-sm text-white/80 hover:text-white"
      >
        Kundenportal öffnen
      </button>
    </LegalShell>
  );
}
