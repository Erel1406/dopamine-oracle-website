import type { Metadata, Viewport } from "next";
import { Cinzel, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

// Cinzel — an engraved, occult-leaning serif for headings & glyphs.
const display = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

// Inter — clean, modern body copy to keep the UI "adult" and legible.
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AI Zodiac Engine — Read the Night Sky",
  description:
    "An interactive constellation map. Navigate the night sky, awaken your sign, and consult the Oracle for your 5-page destiny reading.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // keep the touch-drag map from pinch-zooming the page
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const page = (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-noir font-sans antialiased">{children}</body>
    </html>
  );
  // The site must keep working before Clerk keys exist.
  return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
    <ClerkProvider>{page}</ClerkProvider>
  ) : (
    page
  );
}
