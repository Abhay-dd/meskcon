import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact & Secretariat",
  description:
    "Get in touch with the MESKCON 2027 organizing committee, conference coordinators, and academic secretariat at MES Kalladi College Mannarkkad.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-obsidian">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Page Header */}
        <section className="relative py-16 lg:py-20 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent -z-10" />
          <div className="container-xl">
            <div className="max-w-3xl">
              <span className="badge-gold mb-3 inline-block">Secretariat & Desk</span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
                Connect With <span className="gradient-gold">Us</span>
              </h1>
              <p className="text-white/60 text-base sm:text-lg font-body leading-relaxed">
                Have questions regarding paper submission, registration packages,
                accommodation, or sponsorship opportunities? Our organizing desk is here to assist.
              </p>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
