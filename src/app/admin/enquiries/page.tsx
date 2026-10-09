"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Clock,
  Archive,
  Phone,
  User,
  Filter,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";
import type { Enquiry } from "@/types";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries");
      const json = await res.json();
      if (json.success) setEnquiries(json.data);
    } catch {
      toast.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const toastId = toast.loading("Updating status...");
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error("Update failed");

      toast.success(`Marked as ${newStatus}`, { id: toastId });
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus as Enquiry["status"] } : e))
      );
      if (selectedEnquiry?._id === id) {
        setSelectedEnquiry((prev) =>
          prev ? { ...prev, status: newStatus as Enquiry["status"] } : null
        );
      }
    } catch {
      toast.error("Failed to update enquiry status", { id: toastId });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry message?")) {
      return;
    }

    const toastId = toast.loading("Deleting message...");
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error("Delete failed");

      toast.success("Enquiry deleted", { id: toastId });
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
    } catch {
      toast.error("Failed to delete enquiry", { id: toastId });
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (statusFilter === "all") return true;
    return e.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <span className="badge-gold mb-2 inline-block">Inbound Desk</span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Delegate <span className="gradient-gold">Enquiries</span>
          </h1>
          <p className="text-white/50 text-xs sm:text-sm font-body mt-0.5">
            Review inquiries submitted via the public contact form and respond to delegates.
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
          disabled={loading}
          className="p-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-white/70 hover:text-white transition-colors self-start sm:self-center"
          title="Refresh enquiries"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin text-amber-400" : ""}
          />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap pb-2">
        {[
          { label: "All Inquiries", value: "all" },
          { label: "New (Unread)", value: "new" },
          { label: "Replied", value: "replied" },
          { label: "Archived", value: "archived" },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === f.value
                ? "bg-amber-400 text-black shadow-sm font-bold"
                : "bg-surface-2 text-white/60 hover:text-white border border-white/5"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 2-Column Split View: List on left, Details on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Enquiries List */}
        <div className="lg:col-span-5 space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl bg-surface-2 animate-pulse border border-white/5"
                />
              ))}
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="p-10 text-center rounded-2xl bg-surface-2 border border-white/5 text-white/40 text-xs">
              No enquiries found in this view.
            </div>
          ) : (
            filteredEnquiries.map((enq) => (
              <div
                key={enq._id}
                onClick={() => setSelectedEnquiry(enq)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedEnquiry?._id === enq._id
                    ? "bg-surface-3 border-amber-400/40 shadow-lg shadow-amber-900/10"
                    : "bg-surface-2 border-white/5 hover:border-white/15"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-display font-semibold text-white text-sm truncate">
                    {enq.name}
                  </h4>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      enq.status === "new"
                        ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                        : enq.status === "replied"
                        ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>
                <p className="text-white/80 font-medium text-xs truncate mb-1">
                  {enq.subject}
                </p>
                <p className="text-white/40 text-[11px] font-body line-clamp-2">
                  {enq.message}
                </p>
                <div className="text-[10px] text-white/30 font-mono mt-2 flex items-center justify-between">
                  <span>{enq.email}</span>
                  <span>
                    {enq.createdAt
                      ? new Date(enq.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Enquiry Details Card */}
        <div className="lg:col-span-7">
          {selectedEnquiry ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-surface-2 border border-white/10 space-y-6 sticky top-8">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                    Subject / Topic
                  </span>
                  <h3 className="font-display font-bold text-xl text-white mt-0.5">
                    {selectedEnquiry.subject}
                  </h3>
                </div>

                <button
                  onClick={() => handleDelete(selectedEnquiry._id)}
                  className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  title="Delete message"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Sender Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-white/5 text-xs">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">
                    Delegate Name
                  </span>
                  <span className="text-white font-semibold">
                    {selectedEnquiry.name}
                  </span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="text-amber-400 font-semibold hover:underline"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
                {selectedEnquiry.phone && (
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">
                      Phone / Mobile
                    </span>
                    <a
                      href={`tel:${selectedEnquiry.phone}`}
                      className="text-white/80 font-medium"
                    >
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                )}
                {selectedEnquiry.affiliation && (
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">
                      Affiliation / College
                    </span>
                    <span className="text-white/80 font-medium">
                      {selectedEnquiry.affiliation}
                    </span>
                  </div>
                )}
              </div>

              {/* Message Body */}
              <div>
                <span className="text-white/40 block text-[10px] uppercase mb-2">
                  Message Content
                </span>
                <div className="p-4 rounded-xl bg-black/30 border border-white/5 text-sm text-white/80 font-body leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10 flex-wrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateStatus(selectedEnquiry._id, "replied")}
                    className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 size={14} /> Mark Replied
                  </button>
                  <button
                    onClick={() => updateStatus(selectedEnquiry._id, "archived")}
                    className="px-4 py-2 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Archive size={14} /> Archive
                  </button>
                </div>

                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Re: [MESKCON 2027] ${selectedEnquiry.subject}`}
                  className="btn-gold px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-amber-900/20"
                >
                  <Mail size={14} />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="h-96 rounded-2xl bg-surface-2 border border-white/5 flex flex-col items-center justify-center text-center p-8">
              <MessageSquare size={36} className="text-white/20 mb-3" />
              <h3 className="text-white font-display font-semibold text-base">
                Select an Inquiry
              </h3>
              <p className="text-white/40 text-xs font-body mt-1 max-w-xs">
                Click on any message on the left to read details, view contact details, or reply directly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
