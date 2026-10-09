"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Coffee,
  Mic,
  Award,
  BookOpen,
  Download,
  Filter,
} from "lucide-react";

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  type: "inauguration" | "keynote" | "track" | "break" | "valedictory";
  speaker?: string;
  affiliation?: string;
  venue: string;
  track?: string;
  description?: string;
}

const day1Schedule: ScheduleItem[] = [
  {
    id: "d1-1",
    time: "09:00 AM - 10:00 AM",
    title: "Registration & Morning Networking Refreshments",
    type: "break",
    venue: "Main Foyer & Reception Area",
    description: "Delegate badge collection, kit distribution, and informal networking breakfast.",
  },
  {
    id: "d1-2",
    time: "10:00 AM - 11:15 AM",
    title: "Grand Inaugural Ceremony & Presidential Address",
    type: "inauguration",
    speaker: "Dignitaries, Management & Principal",
    affiliation: "MES Kalladi College & Calicut University",
    venue: "Main Auditorium (Silver Jubilee Hall)",
    description:
      "Formal lamp lighting, inaugural invocation, keynote address by Chief Guest, and release of the Conference Abstract Proceedings.",
  },
  {
    id: "d1-3",
    time: "11:15 AM - 11:30 AM",
    title: "Tea & Networking Break",
    type: "break",
    venue: "Auditorium Promenade",
  },
  {
    id: "d1-4",
    time: "11:30 AM - 12:45 PM",
    title: "Keynote Address: Sustainable AI & Green Computing Frontiers",
    type: "keynote",
    speaker: "Dr. Elena Rostova",
    affiliation: "Professor of Computational Intelligence, ETH Zurich",
    venue: "Main Auditorium",
    track: "Science & Technology",
    description:
      "An in-depth exploration of algorithmic efficiency, carbon footprints in modern deep learning models, and decentralized eco-architectures.",
  },
  {
    id: "d1-5",
    time: "12:45 PM - 01:45 PM",
    title: "Conference Luncheon",
    type: "break",
    venue: "College Dining Pavilion",
  },
  {
    id: "d1-6",
    time: "01:45 PM - 03:30 PM",
    title: "Parallel Technical Session Track 1A: Smart Computing & IoT",
    type: "track",
    venue: "Seminar Hall 1",
    track: "Track 1: Computing & Data Science",
    description:
      "Oral presentations of peer-reviewed papers on edge intelligence, sensor networks, and blockchain applications in agriculture.",
  },
  {
    id: "d1-7",
    time: "01:45 PM - 03:30 PM",
    title: "Parallel Technical Session Track 2A: Social Transformation & Inclusion",
    type: "track",
    venue: "Seminar Hall 2",
    track: "Track 2: Humanities & Social Sciences",
    description:
      "Presentations on digital divide bridging, gender parity in tertiary education, and indigenous cultural preservation.",
  },
  {
    id: "d1-8",
    time: "03:30 PM - 03:45 PM",
    title: "Afternoon High Tea",
    type: "break",
    venue: "Promenade Area",
  },
  {
    id: "d1-9",
    time: "03:45 PM - 05:00 PM",
    title: "Plenary Session: Global Economic Resilience in Developing Nations",
    type: "keynote",
    speaker: "Prof. Kenneth Sterling",
    affiliation: "Senior Economist & Chair of Development Studies, Oxford",
    venue: "Main Auditorium",
    track: "Commerce & Economics",
    description:
      "Strategic perspectives on supply chain resilience, micro-finance interventions, and sustainable development goals (SDGs).",
  },
];

const day2Schedule: ScheduleItem[] = [
  {
    id: "d2-1",
    time: "09:30 AM - 10:45 AM",
    title: "Keynote Address: Circular Economy & Renewable Materials",
    type: "keynote",
    speaker: "Dr. Rajeshwar Sharma",
    affiliation: "Director of Clean Energy Initiatives, IIT Bombay",
    venue: "Main Auditorium",
    track: "Chemical & Physical Sciences",
    description:
      "Novel synthesis of biodegradable polymers, nanomaterial catalysts, and battery recycling paradigms.",
  },
  {
    id: "d2-2",
    time: "10:45 AM - 11:00 AM",
    title: "Morning Refreshment Break",
    type: "break",
    venue: "Auditorium Promenade",
  },
  {
    id: "d2-3",
    time: "11:00 AM - 01:00 PM",
    title: "Parallel Technical Session Track 3A: Applied Commerce & Fintech",
    type: "track",
    venue: "Seminar Hall 1",
    track: "Track 3: Commerce & Management",
    description:
      "Research papers on algorithmic trading ethics, cashless rural economies, and ESG compliance in corporate India.",
  },
  {
    id: "d2-4",
    time: "11:00 AM - 01:00 PM",
    title: "Parallel Technical Session Track 4A: Bio-Diversity & Ecological Modeling",
    type: "track",
    venue: "Seminar Hall 2",
    track: "Track 4: Biological & Environmental Sciences",
    description:
      "Studies on Western Ghats biodiversity corridors, climate adaptation indices, and water table rejuvenation.",
  },
  {
    id: "d2-5",
    time: "01:00 PM - 02:00 PM",
    title: "Conference Luncheon",
    type: "break",
    venue: "College Dining Pavilion",
  },
  {
    id: "d2-6",
    time: "02:00 PM - 03:30 PM",
    title: "Poster Session & Interactive Research Exhibition",
    type: "track",
    venue: "Open Quadrangle & Exhibition Gallery",
    track: "All Disciplines",
    description:
      "Interactive poster displays and prototype demonstrations evaluated by the International Review Jury.",
  },
  {
    id: "d2-7",
    time: "03:30 PM - 04:45 PM",
    title: "Valedictory Ceremony & Best Paper Awards Conferment",
    type: "valedictory",
    speaker: "Chief Guest & Patrons",
    affiliation: "MES State Committee & International Advisory Council",
    venue: "Main Auditorium",
    description:
      "Conferment of Best Paper and Young Researcher awards, feedback synthesis, and formal vote of thanks.",
  },
];

export default function SchedulePageClient() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const currentSchedule = activeDay === 1 ? day1Schedule : day2Schedule;

  const filteredSchedule = currentSchedule.filter((item) => {
    if (typeFilter === "all") return true;
    return item.type === typeFilter;
  });

  const getTypeBadge = (type: ScheduleItem["type"]) => {
    switch (type) {
      case "inauguration":
        return "bg-amber-400/10 text-amber-300 border-amber-400/30";
      case "keynote":
        return "bg-purple-400/10 text-purple-300 border-purple-400/30";
      case "track":
        return "bg-blue-400/10 text-blue-300 border-blue-400/30";
      case "break":
        return "bg-emerald-400/10 text-emerald-300 border-emerald-400/30";
      case "valedictory":
        return "bg-yellow-400/10 text-yellow-300 border-yellow-400/30";
      default:
        return "bg-white/10 text-white/70 border-white/20";
    }
  };

  const getTypeIcon = (type: ScheduleItem["type"]) => {
    switch (type) {
      case "keynote":
        return <Mic size={14} />;
      case "track":
        return <BookOpen size={14} />;
      case "break":
        return <Coffee size={14} />;
      case "valedictory":
      case "inauguration":
        return <Award size={14} />;
      default:
        return <Calendar size={14} />;
    }
  };

  return (
    <div className="container-xl py-12 lg:py-16">
      {/* Day Selector & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 mb-10 border-b border-white/5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveDay(1)}
            className={`px-6 py-3 rounded-xl font-display font-semibold text-sm transition-all flex items-center gap-2 ${
              activeDay === 1
                ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-amber-900/30"
                : "bg-surface-2 text-white/70 hover:text-white border border-white/5 hover:border-white/10"
            }`}
          >
            <Calendar size={16} />
            <span>Day 1 — Jan 29, 2027</span>
          </button>
          <button
            onClick={() => setActiveDay(2)}
            className={`px-6 py-3 rounded-xl font-display font-semibold text-sm transition-all flex items-center gap-2 ${
              activeDay === 2
                ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-amber-900/30"
                : "bg-surface-2 text-white/70 hover:text-white border border-white/5 hover:border-white/10"
            }`}
          >
            <Calendar size={16} />
            <span>Day 2 — Jan 30, 2027</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white/40 text-xs font-body flex items-center gap-1.5 mr-1">
            <Filter size={13} /> Filter:
          </span>
          {[
            { label: "All Sessions", value: "all" },
            { label: "Keynotes", value: "keynote" },
            { label: "Paper Tracks", value: "track" },
            { label: "Ceremonies", value: "inauguration" },
            { label: "Breaks", value: "break" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setTypeFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                typeFilter === f.value
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                  : "bg-surface text-white/60 hover:text-white border border-white/5"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Timeline Grid */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeDay}-${typeFilter}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {filteredSchedule.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className={`glass-card p-6 sm:p-7 rounded-2xl border transition-all duration-300 hover:border-amber-400/20 ${
                  item.type === "keynote"
                    ? "bg-gradient-to-r from-purple-950/10 via-surface to-surface border-purple-500/20"
                    : item.type === "inauguration" || item.type === "valedictory"
                    ? "bg-gradient-to-r from-amber-950/15 via-surface to-surface border-amber-500/20"
                    : "bg-surface border-white/5"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left Column: Time & Badge */}
                  <div className="lg:w-64 flex-shrink-0">
                    <div className="flex items-center gap-2 text-amber-400 font-mono text-sm font-semibold mb-2">
                      <Clock size={15} />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${getTypeBadge(
                          item.type
                        )}`}
                      >
                        {getTypeIcon(item.type)}
                        {item.type}
                      </span>
                      {item.track && (
                        <span className="text-white/40 text-xs font-body truncate max-w-[140px]">
                          {item.track}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Title, Details & Venue */}
                  <div className="flex-grow space-y-3">
                    <h3 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                      {item.title}
                    </h3>

                    {item.speaker && (
                      <div className="flex items-center gap-2 text-white/80 text-sm font-body">
                        <User size={14} className="text-amber-400 flex-shrink-0" />
                        <span className="font-semibold text-white">{item.speaker}</span>
                        {item.affiliation && (
                          <span className="text-white/50 text-xs truncate">
                            — {item.affiliation}
                          </span>
                        )}
                      </div>
                    )}

                    {item.description && (
                      <p className="text-white/60 text-sm font-body leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-white/45 text-xs font-body pt-1">
                      <MapPin size={13} className="text-amber-400/70" />
                      <span>{item.venue}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Download Agenda Callout */}
      <div className="mt-16 p-8 rounded-2xl glass-card border border-amber-400/20 bg-gradient-to-r from-amber-500/10 via-surface-2 to-surface-2 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-display font-bold text-white mb-1">
            Need the Offline Program Brochure?
          </h3>
          <p className="text-white/60 text-sm font-body">
            Download the official PDF schedule handbook with track chair details and venue map.
          </p>
        </div>
        <a
          href="https://www.meskcon.in"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold px-6 py-3 text-sm flex items-center gap-2 whitespace-nowrap shadow-xl"
        >
          <Download size={16} />
          <span>Download PDF Schedule</span>
        </a>
      </div>
    </div>
  );
}
