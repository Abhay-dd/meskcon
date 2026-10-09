import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import GalleryPageClient from "./GalleryPageClient";

export const metadata: Metadata = {
  title: "Media & Event Gallery",
  description:
    "Explore highlights, photographic archives, and conference memories from previous editions of MESKCON and MES Kalladi College academic summits.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-obsidian">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Page Header */}
        <section className="relative py-16 lg:py-20 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent -z-10" />
          <div className="container-xl">
            <div className="max-w-3xl">
              <span className="badge-gold mb-3 inline-block">Visual Archives</span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
                Conference <span className="gradient-gold">Gallery</span>
              </h1>
              <p className="text-white/60 text-base sm:text-lg font-body leading-relaxed">
                Capturing transformative moments, keynote addresses, interdisciplinary
                symposia, and delegate interactions across our conference editions.
              </p>
            </div>
          </div>
        </section>

        <GalleryPageClient />
      </main>
      <Footer />
    </div>
  );
}
