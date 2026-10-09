"use client";

import { useState, useRef } from "react";
import { UploadCloud, Loader2, Check, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

interface CloudinaryUploadProps {
  onSuccess: (url: string, publicId?: string) => void;
  folder?: string;
  label?: string;
  currentValue?: string;
}

export default function CloudinaryUploadButton({
  onSuccess,
  folder = "meskcon",
  label = "Upload Image",
  currentValue,
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (< 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit");
      return;
    }

    setUploading(true);
    const toastId = toast.loading("Uploading to Cloudinary...");

    try {
      // 1. Get signed params
      const sigRes = await fetch(`/api/cloudinary/signature?folder=${folder}`);
      const sigData = await sigRes.json();

      if (!sigData.success || !sigData.cloudName || !sigData.apiKey) {
        throw new Error(
          sigData.error ||
            "Cloudinary credentials missing. Please enter image URL manually below."
        );
      }

      // 2. Upload to Cloudinary API
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", sigData.apiKey);
      formData.append("timestamp", sigData.timestamp.toString());
      formData.append("signature", sigData.signature);
      formData.append("folder", folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sigData.cloudName}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadData.error?.message || "Upload failed");
      }

      toast.success("Uploaded successfully!", { id: toastId });
      onSuccess(uploadData.secure_url, uploadData.public_id);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      toast.error(msg, { id: toastId });
      setShowUrlInput(true);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleManualApply = () => {
    if (!manualUrl.trim()) return;
    onSuccess(manualUrl.trim());
    toast.success("Image URL applied");
    setShowUrlInput(false);
    setManualUrl("");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,video/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all hover:border-amber-400/40 disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 size={16} className="animate-spin text-amber-400" />
          ) : (
            <UploadCloud size={16} className="text-amber-400" />
          )}
          <span>{uploading ? "Uploading..." : label}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="p-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-white/70 hover:text-white text-xs transition-colors"
          title="Enter direct image URL"
        >
          <LinkIcon size={16} />
        </button>
      </div>

      {showUrlInput && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-2 border border-white/10">
          <input
            type="url"
            placeholder="Paste image URL (https://...)"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            className="flex-grow bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50"
          />
          <button
            type="button"
            onClick={handleManualApply}
            className="px-3 py-1.5 rounded-lg bg-amber-400 text-black font-semibold text-xs hover:bg-amber-300 transition-colors"
          >
            Apply
          </button>
        </div>
      )}

      {currentValue && (
        <div className="flex items-center gap-3 text-xs text-white/60 bg-black/30 p-2.5 rounded-xl border border-white/5">
          <ImageIcon size={14} className="text-amber-400 flex-shrink-0" />
          <span className="truncate max-w-[280px] font-mono text-[11px]">
            {currentValue}
          </span>
          <span className="ml-auto text-emerald-400 flex items-center gap-1">
            <Check size={12} /> Set
          </span>
        </div>
      )}
    </div>
  );
}
