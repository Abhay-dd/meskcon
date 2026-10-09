"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ExternalLink, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#040508] border-t border-white/5 pt-16 pb-8 text-white">
      <div className="container-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          {/* Col 1: Brand & Theme */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 p-1 border border-amber-400/30 flex items-center justify-center shadow-lg shadow-amber-900/30">
                <Image
                  src="/images/meskcon-logo.avif"
                  alt="MESKCON Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-display font-bold text-white text-base">
                  MESKCON <span className="text-amber-400">2027</span>
                </div>
                <div className="text-[10px] text-white/40 tracking-wider uppercase font-body">
                  MES Kalladi College Mannarkkad
                </div>
              </div>
            </div>

            <p className="text-white/60 text-xs sm:text-sm font-body leading-relaxed">
              "Bridging Knowledge for a Smarter, Sustainable and Inclusive World"
              — International multidisciplinary conference hosted by MES Kalladi
              College (Autonomous), Palakkad, Kerala.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/60 font-body">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/speakers"
                  className="hover:text-white transition-colors"
                >
                  Keynote Speakers
                </Link>
              </li>
              <li>
                <Link
                  href="/committee"
                  className="hover:text-white transition-colors"
                >
                  Organising Committee
                </Link>
              </li>
              <li>
                <Link
                  href="/important-dates"
                  className="hover:text-white transition-colors"
                >
                  Important Dates
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  className="hover:text-white transition-colors"
                >
                  Session Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-white transition-colors"
                >
                  Media Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Secretariat & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-amber-400">
              Secretariat Desk
            </h4>
            <div className="space-y-2.5 text-xs text-white/60 font-body">
              <div className="flex items-start gap-2.5">
                <MapPin
                  size={15}
                  className="text-amber-400/80 flex-shrink-0 mt-0.5"
                />
                <span>
                  MES Kalladi College, Kozhikode - Palakkad Hwy, Kunthipuzha,
                  Mannarkkad, Kerala 678583
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-amber-400/80 flex-shrink-0" />
                <a
                  href="mailto:meskcon@meskc.ac.in"
                  className="hover:text-amber-400 transition-colors"
                >
                  meskcon@meskc.ac.in
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-amber-400/80 flex-shrink-0" />
                <a
                  href="tel:+919747888601"
                  className="hover:text-amber-400 transition-colors"
                >
                  +91 97478 88601
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Institutional Portal */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-amber-400">
              Institution
            </h4>
            <a
              href="https://www.meskc.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-amber-300 transition-colors"
            >
              <span>meskc.ac.in</span>
              <ExternalLink size={12} />
            </a>
            <div className="pt-2">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/70 transition-colors border border-white/5 px-2.5 py-1 rounded-lg"
              >
                <Shield size={12} className="text-amber-400" />
                <span>Executive Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2027 MES Kalladi College Mannarkkad. All rights reserved.</p>
          <p className="font-mono text-[11px]">
            MESKCON International Academic Conference Series
          </p>
        </div>
      </div>
    </footer>
  );
}
