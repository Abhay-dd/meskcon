"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Shield, Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Verifying credentials...");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid email or password", { id: toastId });
      } else {
        toast.success("Welcome back, Administrator", { id: toastId });
        router.push("/admin");
        router.refresh();
      }
    } catch {
      toast.error("An error occurred during authentication", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-amber-900/40">
              <Shield size={28} className="text-black" />
            </div>
            <h1 className="font-display font-bold text-2xl text-white tracking-tight">
              MESKCON <span className="gradient-gold">Admin</span>
            </h1>
            <p className="text-white/40 text-xs font-body mt-1">
              Executive Conference Management Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@meskc.ac.in"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">
                Master Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400/50 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3.5 mt-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-xl shadow-amber-900/30 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Seed Notice */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[11px] text-white/30 font-body">
              Need initial seed data? Visit{" "}
              <code className="text-amber-400/80 bg-white/5 px-1.5 py-0.5 rounded font-mono">
                /api/seed
              </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
