"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight, CheckCircle, Clock, Zap } from "lucide-react";
import { format } from "date-fns";
import type { ImportantDate } from "@/types";

function StatusBadge({ status }: { status: ImportantDate["status"] }) {
  if (status === "active") return <span className="tag-active">Active / Open</span>;
  if (status === "upcoming") return <span className="tag-upcoming">Upcoming</span>;
  return <span className="tag-closed">Concluded</span>;
}

function StatusIcon({ status }: { status: ImportantDate["status"] }) {
  if (status === "active") return <Zap size={14} className="text-green-400" />;
  if (status === "upcoming") return <Clock size={14} className="text-amber-400" />;
  return <CheckCircle size={14} className="text-white/30" />;
}

export default function DatesPreviewSection() {
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dates")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setDates(d.data.slice(0, 6));
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden bg-[#07080d]" id="dates">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />
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
            <span className="section-label mb-3">Submission Timeline</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Important <span className="gradient-gold">Milestones</span>
            </h2>
            <p className="text-white/50 text-sm sm:text-base font-body mt-2 max-w-xl">
              Key deadlines for manuscript submissions, peer review notifications, and registration.
            </p>
          </div>

          <Link
            href="/important-dates"
            className="btn-ghost px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2 self-start sm:self-auto whitespace-nowrap shadow-lg"
          >
            <span>Full Timeline View</span>
            <ArrowRight size={15} className="text-amber-400" />
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card p-6 rounded-2xl space-y-4 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-1/3" />
                <div className="h-6 bg-white/15 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-full" />
              </div>
            ))}
          </div>
        ) : dates.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-3xl border border-white/5">
            <p className="text-white/40 text-sm font-body">
              Dates will be announced shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dates.map((date, i) => (
              <motion.div
                key={date._id || i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`glass-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between group hover:border-amber-400/30 transition-all duration-300 ${
                  date.status === "active"
                    ? "border-emerald-500/30 shadow-lg shadow-emerald-950/10"
                    : "border-white/8"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <StatusIcon status={date.status} />
                      <StatusBadge status={date.status} />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center text-amber-400/80">
                      <Calendar size={14} />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-amber-300 transition-colors leading-snug">
                    {date.title}
                  </h3>

                  <div className="font-display font-extrabold text-xl text-gradient-gold mb-2">
                    {format(new Date(date.date), "dd MMMM yyyy")}
                  </div>

                  {date.deadline && (
                    <p className="text-xs text-amber-400/70 font-mono mb-2">
                      Deadline: {date.deadline}
                    </p>
                  )}

                  {date.description && (
                    <p className="text-xs text-white/50 leading-relaxed font-body">
                      {date.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
