import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CommitteePageClient from "./CommitteePageClient";

export const metadata: Metadata = {
  title: "Organising Committee",
  description:
    "Meet the distinguished organising committee, patrons, chairs, and coordinators of MESKCON 2027.",
};

export default function CommitteePage() {
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
            <p className="section-label justify-center mb-4">Leadership</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="text-gradient-white">Organising</span>{" "}
              <span className="text-gradient-gold">Committee</span>
            </h1>
            <p className="text-white/50 text-base mt-4 max-w-xl mx-auto font-body">
              The dedicated team of academicians and administrators driving MESKCON 2027.
            </p>
          </div>
        </div>
        <CommitteePageClient />
      </main>
      <Footer />
    </>
  );
}
