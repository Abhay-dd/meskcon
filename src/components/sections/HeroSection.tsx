"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Calendar, Globe, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import CountdownTimer from "@/components/ui/CountdownTimer";
import type { SiteSettings } from "@/types";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({
    heroTitle: "International Conference 2027",
    heroSubtitle: "Bridging Knowledge for a Smarter, Sustainable and Inclusive World",
    heroTheme: "Bridging Knowledge for a Smarter, Sustainable and Inclusive World",
    conferenceDate: "January 29 - 30, 2027",
    conferenceVenue: "MES Kalladi College, Mannarkkad, Palakkad, Kerala",
    conferenceMode: "Hybrid (Online & In-Person)",
    registrationLink: "https://www.meskcon.in/register",
    countdownDate: "2027-01-29T09:00",
    showCountdown: true,
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        const json = await res.json();
        if (json.success && json.data) {
          setSettings(json.data);
        }
      } catch (err) {
        console.warn("Could not load dynamic settings in Hero:", err);
      }
    }
    loadSettings();
  }, []);

  const targetDate = settings.countdownDate
    ? new Date(settings.countdownDate)
    : new Date("2027-01-29T09:00:00+05:30");

  const regLink = settings.registrationLink || "https://www.meskcon.in/register";

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
      {/* Enhanced Clear Background Image Layer with Subtle Dark Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/conference-bg.avif"
          alt="MESKCON Conference Campus Background"
          fill
          priority
          className="object-cover object-center opacity-75 contrast-105 brightness-95"
          sizes="100vw"
        />
        {/* Subtle dark semi-transparent overlay for perfect typography contrast */}
        <div className="absolute inset-0 bg-black/45 backdrop-brightness-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050609] via-[#050609]/60 to-[#050609]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050609]/70 via-transparent to-[#050609]" />
      </div>

      <div className="container-xl relative z-10 pt-32 pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow label */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="glass-card-gold px-4 py-1.5 flex items-center gap-2.5 rounded-full shadow-lg">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-amber-300 font-display">
                MESKCON 2027 · MES Kalladi College, Mannarkkad
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-5 tracking-tight"
          >
            <span className="text-white drop-shadow-lg">
              {settings.heroTitle?.includes("2027")
                ? settings.heroTitle.replace("2027", "").trim()
                : settings.heroTitle?.includes("2026")
                ? settings.heroTitle.replace("2026", "").trim()
                : "International"}
            </span>
            <br />
            <span className="gradient-gold glow-gold-text">
              Conference 2027
            </span>
          </motion.h1>

          {/* Theme Statement */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-white/85 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl mx-auto font-body drop-shadow-md"
          >
            <em className="text-amber-200 not-italic font-semibold">
              "{settings.heroTheme || settings.heroSubtitle}"
            </em>
          </motion.p>

          {/* Event Metadata Badges */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            <div className="flex items-center gap-2 glass-card px-4 py-2.5 text-xs sm:text-sm text-white/90 rounded-xl shadow-lg border-white/10">
              <Calendar size={15} className="text-amber-400" />
              <span className="font-semibold">{settings.conferenceDate || "January 29–30, 2027"}</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2.5 text-xs sm:text-sm text-white/90 rounded-xl shadow-lg border-white/10">
              <MapPin size={15} className="text-amber-400" />
              <span className="font-semibold">{settings.conferenceVenue || "Mannarkkad, Kerala"}</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2.5 text-xs sm:text-sm text-white/90 rounded-xl shadow-lg border-white/10">
              <Globe size={15} className="text-amber-400" />
              <span className="font-semibold">{settings.conferenceMode || "Hybrid (Online & In-Person)"}</span>
            </div>
          </motion.div>

          {/* Countdown Timer (Controlled by Admin showCountdown toggle) */}
          {settings.showCountdown && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex justify-center mb-10"
            >
              <div className="flex flex-col items-center gap-3">
                <span className="badge-gold text-[10px] shadow-lg">
                  Countdown to Conference
                </span>
                <CountdownTimer targetDate={targetDate} />
              </div>
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={regLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold relative z-10 inline-flex items-center gap-2 px-8 py-4 text-sm font-bold rounded-2xl shadow-2xl shadow-amber-900/50"
            >
              <span className="relative z-10">Register as Delegate</span>
              <ExternalLink size={15} className="relative z-10" />
            </a>
            <Link
              href="/speakers"
              className="btn-ghost inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-2xl bg-black/40 backdrop-blur-md"
            >
              <span>Explore Speakers</span>
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        {/* Highlight Metrics */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto"
        >
          {[
            { number: "30+", label: "Distinguished Keynotes" },
            { number: "15+", label: "International Delegations" },
            { number: "500+", label: "Scholars & Attendees" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card-gold p-6 text-center rounded-2xl border border-amber-400/30 shadow-xl"
            >
              <div className="text-3xl sm:text-4xl font-extrabold gradient-gold font-display mb-1">
                {stat.number}
              </div>
              <div className="text-xs text-white/70 uppercase tracking-wider font-body font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
