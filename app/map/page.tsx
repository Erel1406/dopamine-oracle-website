import type { Metadata } from "next";
import MapExperience from "./MapExperience";

export const metadata: Metadata = {
  title: "The Constellation Map — AI Zodiac Engine",
  description:
    "Wander an interactive night sky of all twelve zodiac constellations. Touch a sign to read its Daily Truth and wake the Oracle.",
};

export default function MapPage({
  searchParams,
}: {
  searchParams: { sign?: string };
}) {
  return <MapExperience initialSign={searchParams?.sign ?? null} />;
}
