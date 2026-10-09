"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  RefreshCw,
  X,
  Check,
  Loader2,
  Play,
} from "lucide-react";
import toast from "react-hot-toast";
import type { MediaItem } from "@/types";
import CloudinaryUploadButton from "@/components/admin/CloudinaryUploadButton";

export default function AdminGalleryPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    mediaType: "image" as "image" | "video",
    url: "",
    public_id: "",
    category: "sessions",
    eventYear: "2027",
  });

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      const json = await res.json();
      if (json.success) setMediaItems(json.data);
    } catch {
      toast.error("Failed to load gallery items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const openCreateModal = () => {
    setFormData({
      title: "",
      mediaType: "image",
      url: "",
      public_id: "media-" + Date.now(),
      category: "sessions",
      eventYear: "2027",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) {
      toast.error("Please provide a title and upload/enter a media URL");
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading("Saving media asset...");

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Save failed");

      toast.success("Media added to gallery!", { id: toastId });
      setModalOpen(false);
      fetchMedia();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error adding media";
      toast.error(msg, { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    const toastId = toast.loading("Deleting media...");
    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error("Delete failed");

      toast.success("Media deleted", { id: toastId });
      setMediaItems((prev) => prev.filter((m) => m._id !== id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete";
      toast.error(msg, { id: toastId });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <span className="badge-gold mb-2 inline-block">Cloudinary Assets</span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Media <span className="gradient-gold">Gallery</span>
          </h1>
          <p className="text-white/50 text-xs sm:text-sm font-body mt-0.5">
            Upload and manage photo archives and video reels for the public conference gallery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchMedia}
            disabled={loading}
            className="p-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-white/70 hover:text-white transition-colors"
            title="Refresh gallery"
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
            <span>Upload Media</span>
          </button>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-surface-2 animate-pulse border border-white/5"
            />
          ))}
        </div>
      ) : mediaItems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-surface-2 border border-white/5">
          <ImageIcon size={36} className="text-white/20 mx-auto mb-3" />
          <h3 className="text-white font-display font-bold text-base">
            No Media Uploaded Yet
          </h3>
          <p className="text-white/50 text-xs font-body mt-1 mb-4">
            Upload conference photos and keynote highlights to display them on the gallery page.
          </p>
          <button onClick={openCreateModal} className="btn-gold px-4 py-2 text-xs">
            Upload First Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mediaItems.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl bg-surface-2 border border-white/5 overflow-hidden group hover:border-white/15 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full bg-black/40">
                {item.mediaType === "video" ? (
                  <div className="w-full h-full flex items-center justify-center bg-black/60">
                    <Play size={24} className="text-amber-400" />
                  </div>
                ) : (
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-black/70 backdrop-blur-md text-amber-300 border border-white/10">
                  {item.category}
                </span>
              </div>

              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-semibold text-white text-xs line-clamp-2 mb-1">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-white/40 font-mono">
                    Edition: {item.eventYear || "2027"}
                  </span>
                </div>

                <div className="flex items-center justify-end pt-3 border-t border-white/5 mt-3">
                  <button
                    onClick={() => handleDelete(item._id || "", item.title)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors text-xs flex items-center gap-1"
                    title="Delete media"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative max-w-lg w-full bg-[#121217] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h2 className="font-display font-bold text-xl text-white">
                  Upload Conference Media
                </h2>
                <p className="text-white/40 text-xs font-body">
                  Save media to Cloudinary storage and link to gallery
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
                  Media Caption / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inaugural Lamp Lighting Ceremony"
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
                    Category Tag
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                  >
                    <option value="inauguration">Inauguration</option>
                    <option value="keynote">Keynotes</option>
                    <option value="sessions">Paper Sessions</option>
                    <option value="networking">Networking & Lunch</option>
                    <option value="campus">Campus & Surroundings</option>
                    <option value="valedictory">Valedictory & Awards</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Event Edition
                  </label>
                  <input
                    type="text"
                    placeholder="2027"
                    value={formData.eventYear}
                    onChange={(e) =>
                      setFormData({ ...formData, eventYear: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                  />
                </div>
              </div>

              {/* Cloudinary Upload */}
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Upload Asset *
                </label>
                <CloudinaryUploadButton
                  folder="meskcon/gallery"
                  label="Select File for Cloudinary"
                  currentValue={formData.url}
                  onSuccess={(url, publicId) =>
                    setFormData({
                      ...formData,
                      url,
                      public_id: publicId || "media-" + Date.now(),
                    })
                  }
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
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>Add to Gallery</span>
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
