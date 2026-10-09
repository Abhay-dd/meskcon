import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SpeakersPageClient from "./SpeakersPageClient";

export const metadata: Metadata = {
  title: "Speakers",
  description:
    "Meet the distinguished keynote and invited international and national speakers at MESKCON 2027.",
};

export default function SpeakersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Page Header */}
        <div className="relative py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, #0b0e1a 0%, #06060f 100%)" }}>
          <div className="absolute inset-0 hero-grid opacity-30" />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(201,168,76,0.10) 0%, transparent 70%)",
            }}
          />
          <div className="container-xl relative z-10 text-center">
            <p className="section-label justify-center mb-4">Global Expertise</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="text-gradient-white">Conference</span>{" "}
              <span className="text-gradient-gold">Speakers</span>
            </h1>
            <p className="text-white/50 text-base mt-4 max-w-xl mx-auto font-body">
              Distinguished academics, researchers, and industry leaders from{" "}
              <span className="text-amber-400/80 font-medium">15+ countries</span> sharing
              groundbreaking insights at MESKCON 2027.
            </p>
          </div>
        </div>

        <SpeakersPageClient />
      </main>
      <Footer />
    </>
  );
}
