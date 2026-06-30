import NebulaBackground from "@/components/NebulaBackground";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import SignsGrid from "@/components/landing/SignsGrid";
import OracleShowcase from "@/components/landing/OracleShowcase";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      {/* Painterly cosmic backdrop, fixed behind the whole page */}
      <NebulaBackground />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Features />
        <SignsGrid />
        <OracleShowcase />
        <Pricing />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
