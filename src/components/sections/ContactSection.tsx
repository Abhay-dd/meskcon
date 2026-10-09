"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const contacts = [
  {
    name: "Dr. C. Rajesh",
    role: "General Convenor & Principal",
    icon: Mail,
    detail: "meskcon@meskc.ac.in",
    href: "mailto:meskcon@meskc.ac.in",
  },
  {
    name: "Dr. K. S. Sajan",
    role: "Organising Secretary & IQAC Coordinator",
    icon: Phone,
    detail: "+91 97478 88601",
    href: "tel:+919747888601",
  },
  {
    name: "Dr. M. S. Deepa",
    role: "Technical Committee Chair",
    icon: Phone,
    detail: "+91 99479 09216",
    href: "tel:+919947909216",
  },
  {
    name: "Dr. Abdul Rasheed",
    role: "Joint Secretary & Public Relations",
    icon: Phone,
    detail: "+91 94963 61545",
    href: "tel:+919496361545",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        toast.success("Enquiry submitted successfully to secretariat!");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error(data.error || "Failed to submit message.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden bg-[#05060a]" id="contact">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 hero-grid opacity-20" />

      {/* Top Hairline Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container-xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-20 max-w-2xl mx-auto"
        >
          <span className="section-label justify-center mb-3">Academic Secretariat</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Connect With <span className="gradient-gold">Organisers</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base font-body mt-2">
            Reach out regarding paper submissions, travel grants, accommodation, and institutional delegations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Venue & Contact Cards & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Campus Address Card */}
            <div className="glass-card p-6 rounded-2xl border border-white/8 hover:border-amber-400/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center shrink-0 shadow-lg shadow-black/40">
                  <MapPin size={18} className="text-amber-300" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white mb-1">
                    Symposium Venue
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-body">
                    MES Kalladi College (Autonomous)<br />
                    Kozhikode - Palakkad Hwy, Kunthipuzha<br />
                    Mannarkkad, Palakkad, Kerala — 678583
                  </p>
                </div>
              </div>
            </div>

            {/* Secretariats 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {contacts.map((c) => (
                <a
                  key={c.name}
                  href={c.href}
                  className="glass-card p-4 rounded-xl group hover:border-amber-400/30 transition-all block"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <c.icon size={13} className="text-amber-400" />
                    <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold font-display truncate">
                      {c.role}
                    </span>
                  </div>
                  <p className="font-display font-bold text-xs sm:text-sm text-white mb-0.5 truncate group-hover:text-amber-200 transition-colors">
                    {c.name}
                  </p>
                  <p className="text-xs text-amber-400/80 font-mono truncate">
                    {c.detail}
                  </p>
                </a>
              ))}
            </div>

            {/* Dark Styled Map Container */}
            <div className="glass-card rounded-2xl overflow-hidden border border-white/8 h-[220px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.9!2d76.457!3d10.987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7f1d8d80c7bc1%3A0xa25e8f9f99b7c3e!2sMES%20Kalladi%20College!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "invert(92%) hue-rotate(180deg) brightness(90%) contrast(110%)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MES Kalladi College Location"
              />
            </div>
          </motion.div>

          {/* Right Column: High-End Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shadow-xl shadow-emerald-950/40">
                    <CheckCircle2 size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    Enquiry Received
                  </h3>
                  <p className="text-sm text-white/60 max-w-sm leading-relaxed font-body">
                    Thank you for reaching out to MESKCON 2027. The academic secretariat will respond to your email promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-ghost px-6 py-2.5 text-xs font-semibold mt-2"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                      Direct Inbound Channel
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-1">
                      Send Secretariat Message
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">
                          Full Name <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Dr. Sarah Jenkins"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          className="form-input"
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">
                        Official Email <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="academic@university.edu"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label">Subject / Track Interest</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Paper submission inquiry for Track 1"
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="form-label">
                        Message Query <span className="text-amber-400">*</span>
                      </label>
                      <textarea
                        className="form-input min-h-[130px] resize-none"
                        placeholder="Provide details regarding your query, institution, or delegation..."
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-gold w-full py-4 text-sm font-bold flex items-center justify-center gap-2 rounded-xl shadow-xl shadow-amber-900/30 disabled:opacity-60 mt-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Submitting to Secretariat...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
