import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ImportantDatesClient from "./ImportantDatesClient";

export const metadata: Metadata = {
  title: "Important Dates",
  description:
    "Key milestones and deadlines for MESKCON 2027 — abstract submission, registration, paper submission, and conference dates.",
};

export default function ImportantDatesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div
          className="relative py-16 overflow-hidden"
          style={{ background: "linear-gradient(180deg, #0b0e1a 0%, #06060f 100%)" }}
        >
          <div className="absolute inset-0 hero-grid opacity-30" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(201,168,76,0.10) 0%, transparent 70%)",
            }}
          />
          <div className="container-xl relative z-10 text-center">
            <p className="section-label justify-center mb-4">Timeline</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="text-gradient-white">Important</span>{" "}
              <span className="text-gradient-gold">Dates</span>
            </h1>
            <p className="text-white/50 text-base mt-4 max-w-xl mx-auto font-body">
              Track all critical submission deadlines and conference milestones.
            </p>
          </div>
        </div>
        <ImportantDatesClient />
      </main>
      <Footer />
    </>
  );
}
