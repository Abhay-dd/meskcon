import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SpeakersPreviewSection from "@/components/sections/SpeakersPreviewSection";
import DatesPreviewSection from "@/components/sections/DatesPreviewSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SpeakersPreviewSection />
        <DatesPreviewSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
