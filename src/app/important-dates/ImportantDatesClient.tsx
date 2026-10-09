"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Calendar,
  CheckCircle,
  Clock,
  Zap,
  UserPlus,
  FileText,
  BookOpen,
  Star,
} from "lucide-react";
import type { ImportantDate } from "@/types";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Calendar,
  CheckCircle,
  Clock,
  Zap,
  UserPlus,
  FileText,
  BookOpen,
  Star,
};

function StatusBadge({ status }: { status: ImportantDate["status"] }) {
  if (status === "active") return <span className="tag-active">Active</span>;
  if (status === "upcoming") return <span className="tag-upcoming">Upcoming</span>;
  return <span className="tag-closed">Closed</span>;
}

export default function ImportantDatesClient() {
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dates")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setDates(d.data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <section className="py-16" style={{ background: "#06060f" }}>
        <div className="container-xl max-w-2xl">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-6 mb-8">
              <div className="skeleton w-12 h-12 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-1/2" />
                <div className="skeleton h-6 w-1/3" />
                <div className="skeleton h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 pb-24" style={{ background: "#06060f" }}>
      <div className="container-xl max-w-3xl">
        {/* Vertical Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(201,168,76,0.3) 10%, rgba(201,168,76,0.15) 90%, transparent)",
            }}
          />

          {dates.map((date, i) => {
            const IconComponent = ICON_MAP[date.icon || "Calendar"] || Calendar;
            const isLast = i === dates.length - 1;

            return (
              <motion.div
                key={date._id || i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex gap-6 ${isLast ? "mb-0" : "mb-8"}`}
              >
                {/* Node */}
                <div className="relative z-10 shrink-0">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                      date.status === "active"
                        ? "bg-green-400/10 border-green-400/30"
                        : date.status === "upcoming"
                        ? "bg-amber-400/10 border-amber-400/30"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <IconComponent
                      size={18}
                      className={
                        date.status === "active"
                          ? "text-green-400"
                          : date.status === "upcoming"
                          ? "text-amber-400"
                          : "text-white/25"
                      }
                    />
                  </div>
                  {date.status === "active" && (
                    <div className="absolute inset-0 rounded-xl bg-green-400/20 blur-lg -z-10 animate-pulse" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`flex-1 glass-card border p-5 pb-6 ${
                    date.status === "active"
                      ? "border-green-400/20"
                      : date.status === "upcoming"
                      ? "border-amber-400/20"
                      : "border-white/6 opacity-75"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <StatusBadge status={date.status} />
                    <span className="text-xs text-white/30 font-body">
                      {format(new Date(date.date), "EEEE, dd MMMM yyyy")}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-1">
                    {date.title}
                  </h3>
                  <p className="font-display font-bold text-2xl text-gradient-gold mb-2">
                    {format(new Date(date.date), "dd MMM yyyy")}
                  </p>
                  {date.description && (
                    <p className="text-sm text-white/50 leading-relaxed font-body">
                      {date.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {dates.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p className="text-white/40 text-sm">Dates will be announced soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}
