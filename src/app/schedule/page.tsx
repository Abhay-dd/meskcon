import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SchedulePageClient from "./SchedulePageClient";

export const metadata: Metadata = {
  title: "Conference Schedule",
  description:
    "Explore the comprehensive program schedule, keynote sessions, paper presentations, and track breakdowns for MESKCON 2027.",
};

export default function SchedulePage() {
  return (
    <div className="min-h-screen flex flex-col bg-obsidian">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Page Header */}
        <section className="relative py-16 lg:py-20 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent -z-10" />
          <div className="container-xl">
            <div className="max-w-3xl">
              <span className="badge-gold mb-3 inline-block">Program Flow</span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
                Conference <span className="gradient-gold">Schedule</span>
              </h1>
              <p className="text-white/60 text-base sm:text-lg font-body leading-relaxed">
                Two days of rigorous academic discourse, groundbreaking research
                presentations, and international keynote addresses. All times in IST (UTC+5:30).
              </p>
            </div>
          </div>
        </section>

        <SchedulePageClient />
      </main>
      <Footer />
    </div>
  );
}
