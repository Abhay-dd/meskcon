"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Globe, Award, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Bringing together visionary researchers and delegates from 15+ countries for cross-cultural academic exchange.",
  },
  {
    icon: Users,
    title: "Interdisciplinary Exchange",
    desc: "Fostering rigorous dialogue across computing, natural sciences, humanities, commerce, and sustainable technologies.",
  },
  {
    icon: BookOpen,
    title: "Peer-Reviewed Excellence",
    desc: "Showcasing frontier research with publication opportunities in indexed conference proceedings and journals.",
  },
  {
    icon: Award,
    title: "IQAC Quality Benchmark",
    desc: "Spearheaded by the Internal Quality Assurance Cell (IQAC), adhering to premier international academic standards.",
  },
];

export default function AboutSection() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden" id="about">
      {/* Deep Charcoal Textured Background with Ambient Lighting */}
      <div className="absolute inset-0 bg-[#07080d]" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute inset-0 hero-grid opacity-25" />

      {/* Top Hairline Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Mission & Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <span className="section-label mb-3">Institutional Vision</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                A Premier Platform for{" "}
                <span className="gradient-gold">Global Academic</span> Exchange
              </h2>
            </div>

            <p className="text-white/70 text-base sm:text-lg font-body leading-relaxed">
              MES Kalladi College Mannarkkad (Autonomous), through its Internal Quality
              Assurance Cell (IQAC), instituted the international MESKCON symposium series to
              cultivate multidisciplinary inquiry and foster frontier academic collaborations.
            </p>

            <p className="text-white/60 text-sm sm:text-base font-body leading-relaxed">
              Under the 2027 theme,{" "}
              <strong className="text-amber-300 font-medium">
                "Bridging Knowledge for a Smarter, Sustainable and Inclusive World"
              </strong>
              , the symposium convenes thought leaders, doctoral candidates, and industry
              innovators to address critical global sustainability and technological paradigms.
            </p>

            <div className="pt-2">
              <Link
                href="/committee"
                className="btn-ghost px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2"
              >
                <span>Explore Organising Committee</span>
                <ArrowRight size={15} className="text-amber-400" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: 2x2 Pillar Cards with Hairline Borders */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-amber-400/30 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/15 to-amber-600/5 border border-amber-400/25 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-amber-400/50 transition-all shadow-md shadow-black/40">
                    <pillar.icon size={20} className="text-amber-300" />
                  </div>
                  <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-amber-200 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/55 leading-relaxed font-body">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Highlighted Theme Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 sm:mt-20 glass-card-gold p-8 sm:p-12 text-center rounded-3xl relative overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-bold mb-3">
            <Sparkles size={14} /> Official Symposium Theme 2027
          </div>
          <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight max-w-4xl mx-auto">
            "Bridging Knowledge for a{" "}
            <span className="gradient-gold glow-gold-text">Smarter, Sustainable</span>{" "}
            and Inclusive World"
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
