"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  Save,
  Loader2,
  RefreshCw,
  Globe,
  Mail,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Clock,
  ExternalLink,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import toast from "react-hot-toast";
import type { SiteSettings } from "@/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({
    heroTitle: "International Conference 2027",
    heroSubtitle:
      "Bridging Knowledge for a Smarter, Sustainable and Inclusive World",
    heroTheme:
      "Bridging Knowledge for a Smarter, Sustainable and Inclusive World",
    conferenceDate: "January 29 - 30, 2027",
    conferenceVenue: "MES Kalladi College, Mannarkkad, Palakkad, Kerala",
    conferenceMode: "Hybrid (Online & In-Person)",
    aboutText:
      "MES Kalladi College Mannarkkad (Autonomous), through IQAC, launched the global MESKCON conference series to promote interdisciplinary dialogue among researchers, academicians, and students.",
    contactEmail: "meskcon@meskc.ac.in",
    contactAddress:
      "Kozhikode - Palakkad Hwy, Kunthipuzha, College PO, Mannarkkad, Kerala 678583",
    registrationLink: "https://www.meskcon.in/register",
    brochureUrl: "",
    countdownDate: "2027-01-29T09:00",
    showCountdown: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings");
      const json = await res.json();
      if (json.success && json.data) {
        setSettings(json.data);
      }
    } catch {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const toastId = toast.loading("Updating global site settings...");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Update failed");

      toast.success("Site settings updated successfully!", { id: toastId });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update settings";
      toast.error(msg, { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <span className="badge-gold mb-2 inline-block">Global Parameters</span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Site <span className="gradient-gold">Settings</span>
          </h1>
          <p className="text-white/50 text-xs sm:text-sm font-body mt-0.5">
            Manage countdown timer dates, enable/disable toggle, registration links, and conference info.
          </p>
        </div>

        <button
          onClick={fetchSettings}
          disabled={loading}
          className="p-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-white/70 hover:text-white transition-colors self-start sm:self-center"
          title="Reload settings"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin text-amber-400" : ""}
          />
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-36 rounded-2xl bg-surface-2 animate-pulse border border-white/5"
            />
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Registration Link & Countdown Control (Top Priority) */}
          <div className="p-6 sm:p-7 rounded-2xl bg-surface-2 border border-amber-400/30 space-y-5 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
                  <Clock size={18} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    Countdown Timer & Registration Portal
                  </h3>
                  <p className="text-white/40 text-xs">
                    Controls the live countdown clock and registration button actions across the entire site
                  </p>
                </div>
              </div>
            </div>

            {/* Countdown Enable/Disable Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 gap-4">
              <div>
                <span className="text-white font-semibold text-sm block">
                  Show Live Countdown on Homepage
                </span>
                <span className="text-white/40 text-xs">
                  Toggle on to display the interactive live countdown clock in the hero section.
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSettings({
                    ...settings,
                    showCountdown: !settings.showCountdown,
                  })
                }
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  settings.showCountdown
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-red-500/20 text-red-300 border border-red-500/40"
                }`}
              >
                {settings.showCountdown ? (
                  <>
                    <CheckCircle2 size={15} /> Enabled
                  </>
                ) : (
                  <>
                    <ToggleLeft size={15} /> Disabled (Hidden)
                  </>
                )}
              </button>
            </div>

            {/* Countdown Target Date Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Countdown Target Date & Time (ISO / Local)
                </label>
                <input
                  type="datetime-local"
                  value={settings.countdownDate || "2027-01-29T09:00"}
                  onChange={(e) =>
                    setSettings({ ...settings, countdownDate: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Registration Portal URL *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    required
                    placeholder="https://forms.gle/... or https://www.meskcon.in/register"
                    value={settings.registrationLink || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        registrationLink: e.target.value,
                      })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-3.5 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                  />
                  {settings.registrationLink && (
                    <a
                      href={settings.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-300"
                      title="Test registration link"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Hero & Theme */}
          <div className="p-6 sm:p-7 rounded-2xl bg-surface-2 border border-white/5 space-y-4">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Globe size={17} className="text-amber-400" />
              Conference Identity & Theme
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Conference Title
                </label>
                <input
                  type="text"
                  value={settings.heroTitle || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, heroTitle: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Conference Dates Tagline
                </label>
                <input
                  type="text"
                  value={settings.conferenceDate || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, conferenceDate: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">
                Official Theme Statement
              </label>
              <input
                type="text"
                value={settings.heroTheme || ""}
                onChange={(e) =>
                  setSettings({ ...settings, heroTheme: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">
                About Conference Synopsis
              </label>
              <textarea
                rows={3}
                value={settings.aboutText || ""}
                onChange={(e) =>
                  setSettings({ ...settings, aboutText: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
              />
            </div>
          </div>

          {/* Section 3: Venue & Contact */}
          <div className="p-6 sm:p-7 rounded-2xl bg-surface-2 border border-white/5 space-y-4">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <MapPin size={17} className="text-amber-400" />
              Venue & Secretariat Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Venue Name
                </label>
                <input
                  type="text"
                  value={settings.conferenceVenue || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      conferenceVenue: e.target.value,
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Conference Mode
                </label>
                <input
                  type="text"
                  value={settings.conferenceMode || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      conferenceMode: e.target.value,
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Full Physical Address
                </label>
                <input
                  type="text"
                  value={settings.contactAddress || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contactAddress: e.target.value,
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contactEmail: e.target.value,
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/50"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="btn-gold px-8 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-xl shadow-amber-900/30 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving Settings...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save All Settings</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
