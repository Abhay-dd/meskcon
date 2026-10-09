"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Globe, ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Speaker } from "@/types";

interface SpeakerCardProps {
  speaker: Speaker;
  index: number;
}

export function SpeakerCard({ speaker, index }: SpeakerCardProps) {
  const photoSrc =
    speaker.photo ||
    speaker.image?.url ||
    speaker.photoUrl ||
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80";

  const speakerRole = speaker.designation || speaker.role || "Keynote Luminary";
  const speakerOrg = speaker.institution || speaker.organization || "MESKCON 2027";
  const speakerId = speaker._id || `spk-${index + 1}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group rounded-3xl overflow-hidden glass-card border border-white/8 hover:border-amber-400/30 transition-all duration-300 flex flex-col justify-between"
    >
      <Link href={`/speakers/${speakerId}`} className="block">
        {/* Photo Container */}
        <div className="relative aspect-[4/4.5] w-full bg-slate-900 overflow-hidden">
          <Image
            src={photoSrc}
            alt={speaker.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06060f] via-black/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

          {/* Top Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
            <span className="badge-gold text-[10px] py-1 px-2.5 shadow-md">
              {speaker.isKeynote ? (
                <span className="flex items-center gap-1">
                  <Star size={11} className="fill-current text-amber-400" />
                  Keynote
                </span>
              ) : (
                speaker.category || "Invited"
              )}
            </span>

            {speaker.country && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white/80 border border-white/10 flex items-center gap-1">
                <Globe size={11} className="text-amber-400" />
                {speaker.country}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug group-hover:text-amber-300 transition-colors line-clamp-1">
              {speaker.name}
            </h3>
            <p className="text-xs font-semibold text-amber-400/90 mt-1 line-clamp-1 font-display">
              {speakerRole}
            </p>
            <p className="text-xs text-white/50 line-clamp-1 mt-0.5 font-body">
              {speakerOrg}
            </p>

            {speaker.topic && (
              <div className="mt-3 p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-white/70 font-body">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                  Keynote Topic:
                </span>
                <span className="line-clamp-2 leading-relaxed">
                  {speaker.topic}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-amber-400/80 group-hover:text-amber-300 pt-4 mt-2 border-t border-white/5">
            <span>View Full Profile</span>
            <ArrowRight
              size={14}
              className="transform group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function SpeakerCardSkeleton() {
  return (
    <div className="rounded-3xl glass-card border border-white/8 overflow-hidden animate-pulse">
      <div className="aspect-[4/4.5] bg-surface-2" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-white/10 rounded-md w-3/4" />
        <div className="h-3.5 bg-white/5 rounded-md w-1/2" />
        <div className="h-3 bg-white/5 rounded-md w-2/3" />
      </div>
    </div>
  );
}

interface SpeakerGridProps {
  speakers: Speaker[];
  isLoading?: boolean;
}

const PAGE_SIZE = 12;

export function SpeakerGrid({ speakers, isLoading }: SpeakerGridProps) {
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered = speakers.filter((s) => {
    if (activeTab === "all") return true;
    if (activeTab === "keynote") return s.isKeynote;
    if (activeTab === "international")
      return s.speakerType === "international" || s.country !== "India";
    if (activeTab === "national")
      return s.speakerType === "national" || s.country === "India";
    return s.category === activeTab;
  });

  const pages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const tabs = [
    { id: "all", label: `All (${speakers.length})` },
    { id: "keynote", label: `Keynote (${speakers.filter((s) => s.isKeynote).length})` },
    {
      id: "international",
      label: `International (${
        speakers.filter((s) => s.speakerType === "international" || s.country !== "India").length
      })`,
    },
    {
      id: "national",
      label: `National (${
        speakers.filter((s) => s.speakerType === "national" || s.country === "India").length
      })`,
    },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setPage(0);
            }}
            className={`text-xs px-4 py-2 rounded-xl font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-amber-400 text-black shadow-md shadow-amber-900/20 font-bold"
                : "glass-card border border-white/8 text-white/60 hover:text-white hover:border-white/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <SpeakerCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-3xl">
          <p className="text-white/40 text-sm">No speakers found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visible.map((speaker, i) => (
            <SpeakerCard
              key={speaker._id || i}
              speaker={speaker}
              index={i}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="glass-card border border-white/8 p-2.5 rounded-xl disabled:opacity-30 hover:border-amber-400/20 transition-all text-white"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs text-white/60 font-mono">
            Page {page + 1} of {pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            disabled={page === pages - 1}
            className="glass-card border border-white/8 p-2.5 rounded-xl disabled:opacity-30 hover:border-amber-400/20 transition-all text-white"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
