"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Mic,
  Users,
  Calendar,
  Mail,
  ArrowUpRight,
  Plus,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { Speaker, CommitteeMember, ImportantDate, Enquiry } from "@/types";

export default function AdminDashboardPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [committee, setCommittee] = useState<CommitteeMember[]>([]);
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [spkRes, comRes, dtRes, enqRes] = await Promise.all([
        fetch("/api/speakers").then((r) => r.json()),
        fetch("/api/committee").then((r) => r.json()),
        fetch("/api/dates").then((r) => r.json()),
        fetch("/api/enquiries").then((r) => r.json()),
      ]);

      if (spkRes.success) setSpeakers(spkRes.data);
      if (comRes.success) setCommittee(comRes.data);
      if (dtRes.success) setDates(dtRes.data);
      if (enqRes.success) setEnquiries(enqRes.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const unreadEnquiries = enquiries.filter((e) => e.status === "new").length;

  const stats = [
    {
      title: "Keynote Speakers",
      count: speakers.length,
      href: "/admin/speakers",
      icon: Mic,
      color: "from-amber-500/20 to-yellow-500/5",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400",
    },
    {
      title: "Committee Members",
      count: committee.length,
      href: "/admin/committee",
      icon: Users,
      color: "from-blue-500/20 to-indigo-500/5",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400",
    },
    {
      title: "Timeline Dates",
      count: dates.length,
      href: "/admin/dates",
      icon: Calendar,
      color: "from-purple-500/20 to-pink-500/5",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400",
    },
    {
      title: "Delegate Enquiries",
      count: enquiries.length,
      badge: unreadEnquiries > 0 ? `${unreadEnquiries} new` : undefined,
      href: "/admin/enquiries",
      icon: Mail,
      color: "from-emerald-500/20 to-teal-500/5",
      borderColor: "border-emerald-500/30",
      iconColor: "text-emerald-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <span className="badge-gold mb-2 inline-block">MESKCON 2027</span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Executive <span className="gradient-gold">Dashboard</span>
          </h1>
          <p className="text-white/50 text-xs sm:text-sm font-body mt-0.5">
            Real-time conference management, speaker directory, and delegate inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="p-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-white/70 hover:text-white transition-colors"
            title="Refresh statistics"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin text-amber-400" : ""}
            />
          </button>

          <Link
            href="/admin/speakers"
            className="btn-gold px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-amber-900/20"
          >
            <Plus size={15} />
            <span>Add Speaker</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.title}
              href={s.href}
              className={`p-6 rounded-2xl bg-surface-2 border ${s.borderColor} hover:scale-[1.02] transition-all group relative overflow-hidden`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-40 group-hover:opacity-70 transition-opacity -z-10`}
              />
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center ${s.iconColor}`}
                >
                  <Icon size={20} />
                </div>
                {s.badge ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-black animate-pulse">
                    {s.badge}
                  </span>
                ) : (
                  <ArrowUpRight
                    size={18}
                    className="text-white/20 group-hover:text-white/60 transition-colors"
                  />
                )}
              </div>
              <div className="text-3xl font-display font-bold text-white mb-1">
                {loading ? "..." : s.count}
              </div>
              <div className="text-xs font-medium text-white/60 font-body">
                {s.title}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Grid: Recent Enquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 p-6 sm:p-7 rounded-2xl bg-surface-2 border border-white/5 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-lg text-white">
                Recent Delegate Inquiries
              </h2>
              <p className="text-white/40 text-xs font-body">
                Latest messages sent via public contact form
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              View All ({enquiries.length})
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-xl bg-black/30 animate-pulse"
                />
              ))}
            </div>
          ) : enquiries.length === 0 ? (
            <div className="p-8 text-center text-white/40 text-xs">
              No inquiries received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {enquiries.slice(0, 5).map((enq) => (
                <div
                  key={enq._id}
                  className="p-4 rounded-xl bg-black/30 border border-white/5 flex items-start justify-between gap-4 hover:border-white/10 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-xs truncate">
                        {enq.name}
                      </span>
                      <span className="text-white/40 text-[11px] truncate">
                        • {enq.email}
                      </span>
                    </div>
                    <div className="text-white/80 font-medium text-xs truncate">
                      {enq.subject}
                    </div>
                    <p className="text-white/50 text-[11px] line-clamp-1 font-body">
                      {enq.message}
                    </p>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ${
                      enq.status === "new"
                        ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                        : "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Launchpad & Status */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="p-6 rounded-2xl bg-surface-2 border border-white/5 space-y-4">
            <h3 className="font-display font-bold text-base text-white">
              Content Shortcuts
            </h3>
            <div className="space-y-2">
              <Link
                href="/admin/speakers"
                className="flex items-center justify-between p-3 rounded-xl bg-black/30 hover:bg-black/50 border border-white/5 text-xs text-white/80 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Mic size={15} className="text-amber-400" /> Manage Keynote
                  Speakers
                </span>
                <Plus size={14} className="text-white/40" />
              </Link>
              <Link
                href="/admin/committee"
                className="flex items-center justify-between p-3 rounded-xl bg-black/30 hover:bg-black/50 border border-white/5 text-xs text-white/80 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Users size={15} className="text-blue-400" /> Update
                  Organizing Committee
                </span>
                <Plus size={14} className="text-white/40" />
              </Link>
              <Link
                href="/admin/dates"
                className="flex items-center justify-between p-3 rounded-xl bg-black/30 hover:bg-black/50 border border-white/5 text-xs text-white/80 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Calendar size={15} className="text-purple-400" /> Add
                  Timeline Deadline
                </span>
                <Plus size={14} className="text-white/40" />
              </Link>
              <Link
                href="/admin/gallery"
                className="flex items-center justify-between p-3 rounded-xl bg-black/30 hover:bg-black/50 border border-white/5 text-xs text-white/80 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <RefreshCw size={15} className="text-emerald-400" /> Upload
                  Conference Media
                </span>
                <Plus size={14} className="text-white/40" />
              </Link>
            </div>
          </div>

          {/* System Health */}
          <div className="p-6 rounded-2xl bg-surface-2 border border-white/5 space-y-3">
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" /> Platform
              Status
            </h3>
            <div className="space-y-2 text-xs text-white/60 font-body">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span>Database</span>
                <span className="text-emerald-400 font-medium">Connected</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span>Cloudinary Storage</span>
                <span className="text-emerald-400 font-medium">Ready</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>NextAuth Session</span>
                <span className="text-amber-400 font-medium">Active (Admin)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
