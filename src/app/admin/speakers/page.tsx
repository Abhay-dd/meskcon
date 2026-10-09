"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Mic,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  X,
  Check,
  Loader2,
  ExternalLink,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";
import type { Speaker } from "@/types";
import CloudinaryUploadButton from "@/components/admin/CloudinaryUploadButton";

export default function AdminSpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    institution: "",
    bio: "",
    topic: "",
    photo: "",
    category: "keynote",
    order: 0,
    isKeynote: true,
  });

  const fetchSpeakers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/speakers");
      const json = await res.json();
      if (json.success) setSpeakers(json.data);
    } catch {
      toast.error("Failed to load speakers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const openCreateModal = () => {
    setEditingSpeaker(null);
    setFormData({
      name: "",
      designation: "",
      institution: "",
      bio: "",
      topic: "",
      photo: "",
      category: "keynote",
      order: speakers.length,
      isKeynote: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (speaker: Speaker) => {
    setEditingSpeaker(speaker);
    setFormData({
      name: speaker.name || "",
      designation: speaker.designation || "",
      institution: speaker.institution || "",
      bio: speaker.bio || "",
      topic: speaker.topic || "",
      photo: speaker.photo || "",
      category: speaker.category || "keynote",
      order: speaker.order || 0,
      isKeynote: speaker.isKeynote ?? true,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.designation || !formData.institution) {
      toast.error("Please fill in all required fields (Name, Designation, Institution)");
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading(
      editingSpeaker ? "Updating speaker..." : "Adding speaker..."
    );

    try {
      const url = editingSpeaker
        ? `/api/speakers/${editingSpeaker._id}`
        : "/api/speakers";
      const method = editingSpeaker ? "PUT" : "POST";

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
        editingSpeaker ? "Speaker updated!" : "Speaker added successfully!",
        { id: toastId }
      );
      setModalOpen(false);
      fetchSpeakers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error submitting speaker";
      toast.error(msg, { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove speaker "${name}"?`)) {
      return;
    }

    const toastId = toast.loading("Deleting speaker...");
    try {
      const res = await fetch(`/api/speakers/${id}`, { method: "DELETE" });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to delete");
      }

      toast.success("Speaker deleted successfully", { id: toastId });
      setSpeakers((prev) => prev.filter((s) => s._id !== id));
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
          <span className="badge-gold mb-2 inline-block">Directory Control</span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Keynote & Invited <span className="gradient-gold">Speakers</span>
          </h1>
          <p className="text-white/50 text-xs sm:text-sm font-body mt-0.5">
            Manage keynote luminaries, session chairs, and guest scholars for MESKCON 2027.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSpeakers}
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
            <span>Add Speaker</span>
          </button>
        </div>
      </div>

      {/* Speakers Table / Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-44 rounded-2xl bg-surface-2 animate-pulse border border-white/5"
            />
          ))}
        </div>
      ) : speakers.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-surface-2 border border-white/5">
          <Mic size={36} className="text-white/20 mx-auto mb-3" />
          <h3 className="text-white font-display font-bold text-base">
            No Speakers Added Yet
          </h3>
          <p className="text-white/50 text-xs font-body mt-1 mb-4">
            Start building your conference directory by adding your first speaker.
          </p>
          <button onClick={openCreateModal} className="btn-gold px-4 py-2 text-xs">
            Add First Speaker
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {speakers.map((speaker) => (
            <div
              key={speaker._id}
              className="p-5 rounded-2xl bg-surface-2 border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/40 relative flex-shrink-0 border border-white/10">
                    {speaker.photo ? (
                      <Image
                        src={speaker.photo}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-amber-400 font-bold text-lg font-display">
                        {speaker.name[0]}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-grow">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-white text-base truncate">
                        {speaker.name}
                      </h3>
                      {speaker.isKeynote && (
                        <Star size={13} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-amber-400 text-xs font-medium truncate">
                      {speaker.designation}
                    </p>
                    <p className="text-white/50 text-[11px] truncate">
                      {speaker.institution}
                    </p>
                  </div>
                </div>

                {speaker.topic && (
                  <div className="p-2.5 rounded-lg bg-black/30 border border-white/5 text-[11px] text-white/70 font-body mb-3">
                    <span className="text-amber-400/90 font-semibold block text-[10px] uppercase tracking-wider">
                      Keynote Topic:
                    </span>
                    <span className="line-clamp-2">{speaker.topic}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/60 border border-white/10">
                  {speaker.category}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(speaker)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                    title="Edit speaker"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(speaker._id, speaker.name)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    title="Delete speaker"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative max-w-2xl w-full bg-[#121217] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h2 className="font-display font-bold text-xl text-white">
                  {editingSpeaker ? "Edit Speaker Profile" : "Add New Keynote Speaker"}
                </h2>
                <p className="text-white/40 text-xs font-body">
                  Configure directory details, institution, and Cloudinary portrait
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prof. Dr. Elena Rostova"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Designation / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Professor of Computational Intelligence"
                    value={formData.designation}
                    onChange={(e) =>
                      setFormData({ ...formData, designation: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Institution / University *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ETH Zurich, Switzerland"
                    value={formData.institution}
                    onChange={(e) =>
                      setFormData({ ...formData, institution: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Category Tier
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                  >
                    <option value="keynote">Keynote Speaker</option>
                    <option value="session_chair">Session Chair / Panellist</option>
                    <option value="invited">Invited Scholar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Keynote Topic / Session Focus
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sustainable AI & Green Computing Frontiers"
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Biography / Academic Overview
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief scholarly background, major honours, and research focus..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Speaker Portrait (Cloudinary / URL)
                </label>
                <CloudinaryUploadButton
                  folder="meskcon/speakers"
                  label="Upload Speaker Portrait"
                  currentValue={formData.photo}
                  onSuccess={(url) => setFormData({ ...formData, photo: url })}
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-white/80">
                  <input
                    type="checkbox"
                    checked={formData.isKeynote}
                    onChange={(e) =>
                      setFormData({ ...formData, isKeynote: e.target.checked })
                    }
                    className="rounded border-white/20 bg-black/40 text-amber-400 focus:ring-0"
                  />
                  <span>Feature as Keynote Luminary</span>
                </label>
              </div>

              {/* Submit Buttons */}
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
                      <span>{editingSpeaker ? "Update Speaker" : "Create Speaker"}</span>
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
