"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  X,
  Check,
  Loader2,
  Clock,
  CheckCircle,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";
import type { ImportantDate } from "@/types";

export default function AdminDatesPage() {
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDate, setEditingDate] = useState<ImportantDate[] | null>(null);
  const [currentEdit, setCurrentEdit] = useState<ImportantDate | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    deadline: "",
    status: "upcoming",
    description: "",
    order: 0,
    isActive: true,
  });

  const fetchDates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dates");
      const json = await res.json();
      if (json.success) setDates(json.data);
    } catch {
      toast.error("Failed to load timeline dates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDates();
  }, []);

  const openCreateModal = () => {
    setCurrentEdit(null);
    setFormData({
      title: "",
      date: new Date().toISOString().split("T")[0],
      deadline: "11:59 PM IST",
      status: "upcoming",
      description: "",
      order: dates.length,
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (d: ImportantDate) => {
    setCurrentEdit(d);
    const dateStr = d.date ? new Date(d.date).toISOString().split("T")[0] : "";
    setFormData({
      title: d.title || "",
      date: dateStr,
      deadline: d.deadline || "",
      status: d.status || "upcoming",
      description: d.description || "",
      order: d.order || 0,
      isActive: d.isActive ?? true,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) {
      toast.error("Please fill in event title and deadline date");
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading(
      currentEdit ? "Updating timeline item..." : "Adding timeline item..."
    );

    try {
      const url = currentEdit ? `/api/dates/${currentEdit._id}` : "/api/dates";
      const method = currentEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Operation failed");
      }

      toast.success(
        currentEdit ? "Timeline date updated!" : "Timeline date added!",
        { id: toastId }
      );
      setModalOpen(false);
      fetchDates();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving date";
      toast.error(msg, { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    const toastId = toast.loading("Deleting date...");
    try {
      const res = await fetch(`/api/dates/${id}`, { method: "DELETE" });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to delete");
      }

      toast.success("Date deleted successfully", { id: toastId });
      setDates((prev) => prev.filter((d) => d._id !== id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Deletion failed";
      toast.error(msg, { id: toastId });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <span className="badge-gold mb-2 inline-block">Milestones</span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Important <span className="gradient-gold">Dates</span>
          </h1>
          <p className="text-white/50 text-xs sm:text-sm font-body mt-0.5">
            Maintain paper submission deadlines, review notifications, and registration dates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDates}
            disabled={loading}
            className="p-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-white/70 hover:text-white transition-colors"
            title="Refresh list"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin text-amber-400" : ""}
            />
          </button>
          <button
            onClick={openCreateModal}
            className="btn-gold px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-amber-900/20"
          >
            <Plus size={16} />
            <span>Add Milestone</span>
          </button>
        </div>
      </div>

      {/* Timeline List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 rounded-2xl bg-surface-2 animate-pulse border border-white/5"
            />
          ))}
        </div>
      ) : dates.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-surface-2 border border-white/5">
          <Calendar size={36} className="text-white/20 mx-auto mb-3" />
          <h3 className="text-white font-display font-bold text-base">
            No Important Dates Listed
          </h3>
          <p className="text-white/50 text-xs font-body mt-1 mb-4">
            Add key deadlines to inform authors and participants.
          </p>
          <button onClick={openCreateModal} className="btn-gold px-4 py-2 text-xs">
            Add First Milestone
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {dates.map((d) => (
            <div
              key={d._id}
              className="p-5 rounded-2xl bg-surface-2 border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Calendar size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-white text-base">
                      {d.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        d.status === "active"
                          ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                          : d.status === "completed"
                          ? "bg-white/10 text-white/40 border border-white/10"
                          : "bg-blue-400/20 text-blue-300 border border-blue-400/30"
                      }`}
                    >
                      {d.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/60 mt-1">
                    <span className="font-mono text-amber-400/90 font-semibold">
                      {new Date(d.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {d.deadline && <span>• {d.deadline}</span>}
                  </div>
                  {d.description && (
                    <p className="text-white/40 text-xs font-body mt-1">
                      {d.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => openEditModal(d)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  title="Edit date"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDelete(d._id || "", d.title)}
                  className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  title="Delete date"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative max-w-lg w-full bg-[#121217] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h2 className="font-display font-bold text-xl text-white">
                  {currentEdit ? "Edit Milestone Date" : "Add Milestone Date"}
                </h2>
                <p className="text-white/40 text-xs font-body">
                  Configure submission deadline or notification milestone
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Milestone Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Full Paper Submission Deadline"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Calendar Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Status Lifecycle
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="active">Active (Open Now)</option>
                    <option value="completed">Completed / Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Time / Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. 11:59 PM IST (Strict Deadline)"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Brief Instruction / Subtext
                </label>
                <input
                  type="text"
                  placeholder="e.g. Papers must adhere to IEEE/Springer template guidelines"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>{currentEdit ? "Update Milestone" : "Save Milestone"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
