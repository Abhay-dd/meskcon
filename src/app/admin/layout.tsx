"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  Mic,
  Calendar,
  Mail,
  Image as ImageIcon,
  Settings,
  ExternalLink,
  LogOut,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";

const sidebarNav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Speakers", href: "/admin/speakers", icon: Mic },
  { label: "Committee", href: "/admin/committee", icon: Users },
  { label: "Important Dates", href: "/admin/dates", icon: Calendar },
  { label: "Enquiries", href: "/admin/enquiries", icon: Mail },
  { label: "Media Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If on login page, render clean standalone view
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-white flex flex-col lg:flex-row">
      {/* Mobile Topbar */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-[#0e0e12] border-b border-white/5 sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/10 p-1 border border-amber-400/30 flex items-center justify-center">
            <Image
              src="/images/meskcon-logo.avif"
              alt="MESKCON Logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-display font-bold text-sm tracking-wide text-white">
              MESKCON
            </span>
            <span className="text-[10px] text-amber-400 block font-mono">
              CMS ADMIN
            </span>
          </div>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg border border-white/10 text-white/70 hover:text-white"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a0e] border-r border-white/5 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 lg:static ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Logo & Platform Info */}
          <div className="flex items-center gap-3 pb-6 border-b border-white/5">
            <div className="w-11 h-11 rounded-xl bg-white/10 p-1.5 border border-amber-400/30 flex items-center justify-center shadow-lg shadow-amber-900/30 flex-shrink-0">
              <Image
                src="/images/meskcon-logo.avif"
                alt="MESKCON Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <div className="font-display font-bold text-base tracking-wide text-white flex items-center gap-1.5">
                MESKCON <Shield size={13} className="text-amber-400" />
              </div>
              <div className="text-[10px] text-white/40 tracking-wider uppercase font-mono">
                Executive Portal
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            {sidebarNav.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin" || pathname === "/admin/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-amber-400/15 text-amber-300 border border-amber-400/30 shadow-sm font-semibold"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon
                    size={16}
                    className={isActive ? "text-amber-400" : "text-white/40"}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-white/5 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} /> Public Website
            </span>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow min-w-0 p-6 lg:p-10 bg-[#08080a] overflow-y-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
