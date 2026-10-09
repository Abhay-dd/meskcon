"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Speakers", href: "/speakers" },
  { label: "Committee", href: "/committee" },
  { label: "Important Dates", href: "/important-dates" },
  { label: "Schedule", href: "/schedule" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [regLink, setRegLink] = useState("https://www.meskcon.in/register");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    async function loadRegLink() {
      try {
        const res = await fetch("/api/settings");
        const json = await res.json();
        if (json.success && json.data?.registrationLink) {
          setRegLink(json.data.registrationLink);
        }
      } catch {}
    }
    loadRegLink();
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-black/85 border-b border-white/8 shadow-2xl shadow-black/60"
            : "bg-transparent"
        }`}
      >
        <div className="container-xl">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/10 p-1 border border-amber-400/30 flex items-center justify-center shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-all">
                <Image
                  src="/images/meskcon-logo.avif"
                  alt="MESKCON Official Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <div className="font-display font-bold text-white text-sm sm:text-base leading-none tracking-wide flex items-center gap-1.5">
                  MESKCON <span className="text-amber-400 font-extrabold">2027</span>
                </div>
                <div className="text-[10px] text-white/50 font-body leading-none mt-1 tracking-widest uppercase">
                  MES Kalladi College
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    pathname === item.href ? "active bg-white/5 font-semibold text-amber-300" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href={regLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold relative z-10 hidden sm:flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-lg shadow-amber-900/30"
              >
                <span className="relative z-10">Register Now</span>
                <ExternalLink size={13} className="relative z-10" />
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-colors"
                aria-label="Toggle navigation"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 backdrop-blur-2xl bg-black/95 border-b border-white/10"
          >
            <nav className="container-xl py-5 flex flex-col gap-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === item.href
                      ? "bg-amber-400/15 text-amber-300 border border-amber-400/30 font-bold"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={regLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold relative z-10 flex items-center justify-center gap-1.5 px-5 py-3 text-sm mt-3"
              >
                <span className="relative z-10">Register Now</span>
                <ExternalLink size={14} className="relative z-10" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
