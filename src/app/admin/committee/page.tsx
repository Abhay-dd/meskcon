"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  X,
  Check,
  Loader2,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";
import type { CommitteeMember } from "@/types";
import CloudinaryUploadButton from "@/components/admin/CloudinaryUploadButton";

const categories = [
  { label: "All Roles", value: "all" },
  { label: "Patrons", value: "patrons" },
  { label: "Advisory", value: "advisory" },
  { label: "Organizing", value: "organizing" },
  { label: "Technical", value: "technical" },
  { label: "Secretaries", value: "secretaries" },
];

export default function AdminCommitteePage() {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    designation: "",
    institution: "",
    photo: "",
    category: "organizing",
    order: 0,
    email: "",
    phone: "",
  });

  const fetchCommittee = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/committee");
      const json = await res.json();
      if (json.success) setMembers(json.data);
    } catch {
      toast.error("Failed to load committee members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommittee();
  }, []);

  const openCreateModal = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      role: "",
      designation: "",
      institution: "MES Kalladi College, Mannarkkad",
      photo: "",
      category: "organizing",
      order: members.length,
      email: "",
      phone: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (m: CommitteeMember) => {
    setEditingMember(m);
    setFormData({
      name: m.name || "",
      role: m.role || "",
      designation: m.designation || "",
      institution: m.institution || "",
      photo: m.photo || "",
      category: m.category || "organizing",
      order: m.order || 0,
      email: m.email || "",
      phone: m.phone || "",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      toast.error("Please provide member name and committee role");
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading(
      editingMember ? "Updating member..." : "Adding member..."
    );

    try {
      const url = editingMember
        ? `/api/committee/${editingMember._id}`
        : "/api/committee";
      const method = editingMember ? "PUT" : "POST";

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
        editingMember ? "Member updated!" : "Member added successfully!",
        { id: toastId }
      );
      setModalOpen(false);
      fetchCommittee();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error submitting member";
      toast.error(msg, { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the committee?`)) {
      return;
    }

    const toastId = toast.loading("Removing member...");
    try {
      const res = await fetch(`/api/committee/${id}`, { method: "DELETE" });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to delete");
      }

      toast.success("Member removed successfully", { id: toastId });
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Deletion failed";
      toast.error(msg, { id: toastId });
    }
  };

  const filteredMembers = members.filter((m) => {
    if (selectedCat === "all") return true;
    return m.category === selectedCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <span className="badge-gold mb-2 inline-block">Governance & Desk</span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Organising <span className="gradient-gold">Committee</span>
          </h1>
          <p className="text-white/50 text-xs sm:text-sm font-body mt-0.5">
            Manage patrons, advisory boards, convenors, and organizing secretaries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCommittee}
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
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap pb-2">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setSelectedCat(c.value)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCat === c.value
                ? "bg-amber-400 text-black shadow-sm font-bold"
                : "bg-surface-2 text-white/60 hover:text-white border border-white/5"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-36 rounded-2xl bg-surface-2 animate-pulse border border-white/5"
            />
          ))}
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-surface-2 border border-white/5">
          <Users size={36} className="text-white/20 mx-auto mb-3" />
          <h3 className="text-white font-display font-bold text-base">
            No Committee Members In This Category
          </h3>
          <p className="text-white/50 text-xs font-body mt-1 mb-4">
            Add convenors, patrons, or chairs to display them on the website.
          </p>
          <button onClick={openCreateModal} className="btn-gold px-4 py-2 text-xs">
            Add Committee Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMembers.map((m) => (
            <div
              key={m._id}
              className="p-5 rounded-2xl bg-surface-2 border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 relative flex-shrink-0 border border-white/10">
                    {m.photo ? (
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-amber-400 font-bold text-base font-display">
                        {m.name[0]}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-grow">
                    <h3 className="font-display font-bold text-white text-sm truncate">
                      {m.name}
                    </h3>
                    <p className="text-amber-400 text-xs font-semibold truncate">
                      {m.role}
                    </p>
                    <p className="text-white/50 text-[11px] truncate">
                      {m.designation}
                    </p>
                  </div>
                </div>

                <p className="text-white/40 text-[11px] truncate mt-1">
                  {m.institution}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/60 border border-white/10">
                  {m.category}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(m)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                    title="Edit member"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(m._id || "", m.name)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    title="Delete member"
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
          <div className="relative max-w-xl w-full bg-[#121217] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h2 className="font-display font-bold text-xl text-white">
                  {editingMember ? "Edit Committee Member" : "Add Committee Member"}
                </h2>
                <p className="text-white/40 text-xs font-body">
                  Configure role tier, institution, and portrait
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Member Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. C. Rajesh"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Conference Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. General Convenor / Principal"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Designation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Associate Professor & IQAC Coordinator"
                    value={formData.designation}
                    onChange={(e) =>
                      setFormData({ ...formData, designation: e.target.value })
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
                    <option value="patrons">Chief Patron / Patron</option>
                    <option value="advisory">Advisory Board</option>
                    <option value="organizing">Organising Committee / Convenor</option>
                    <option value="technical">Technical Committee</option>
                    <option value="secretaries">Joint Secretary / Coordinator</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Institution / Department
                </label>
                <input
                  type="text"
                  placeholder="e.g. MES Kalladi College Mannarkkad"
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Member Portrait (Cloudinary / URL)
                </label>
                <CloudinaryUploadButton
                  folder="meskcon/committee"
                  label="Upload Portrait"
                  currentValue={formData.photo}
                  onSuccess={(url) => setFormData({ ...formData, photo: url })}
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
                      <span>{editingMember ? "Update Member" : "Save Member"}</span>
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
