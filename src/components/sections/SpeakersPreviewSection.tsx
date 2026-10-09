"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mic, Sparkles } from "lucide-react";
import { SpeakerCard, SpeakerCardSkeleton } from "@/components/speakers/SpeakerCard";
import type { Speaker } from "@/types";

export default function SpeakersPreviewSection() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/speakers")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setSpeakers(d.data.slice(0, 8));
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden bg-[#06070b]" id="speakers">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-yellow-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute inset-0 hero-grid opacity-20" />

      {/* Top Hairline Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container-xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <span className="section-label mb-3">Distinguished Luminary Faculty</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Featured <span className="gradient-gold">Keynote Speakers</span>
            </h2>
            <p className="text-white/50 text-sm sm:text-base font-body mt-2 max-w-xl">
              World-renowned scholars, research pioneers, and thought leaders addressing frontier symposium tracks.
            </p>
          </div>

          <Link
            href="/speakers"
            className="btn-ghost px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2 self-start sm:self-auto whitespace-nowrap shadow-lg"
          >
            <span>View All Speakers</span>
            <ArrowRight size={15} className="text-amber-400" />
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SpeakerCardSkeleton key={i} />
            ))}
          </div>
        ) : speakers.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-3xl border border-white/5">
            <Mic size={36} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/50 text-sm font-body">
              Keynote announcements are currently being finalized.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {speakers.map((speaker, i) => (
              <SpeakerCard
                key={speaker._id || i}
                speaker={speaker}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
