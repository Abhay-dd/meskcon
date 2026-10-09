import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Globe,
  Building,
  Mic,
  BookOpen,
  Calendar,
  Share2,
  Mail,
  ExternalLink,
  Award,
} from "lucide-react";
import { notFound } from "next/navigation";
import type { Speaker } from "@/types";

const fallbackSpeakers: Speaker[] = [
  {
    _id: "spk-1",
    name: "Dr. Elena Rostova",
    designation: "Professor of Computational Intelligence",
    institution: "ETH Zurich, Switzerland",
    bio: "Dr. Elena Rostova is a world-renowned authority on computational intelligence, specializing in energy-efficient deep learning architectures and low-carbon computing. She currently chairs the AI Sustainability Initiative at ETH Zurich and serves as a consultant to the European Union on green technology standards.",
    topic: "Sustainable AI & Green Computing Frontiers",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    category: "keynote",
    isKeynote: true,
    country: "Switzerland",
  },
  {
    _id: "spk-2",
    name: "Prof. Kenneth Sterling",
    designation: "Chair of Development Studies",
    institution: "University of Oxford, UK",
    bio: "Prof. Kenneth Sterling has spent over two decades researching macroeconomic resilience in emerging economies. His groundbreaking publications on micro-financial safety nets and equitable resource allocation have informed multilateral policy across Southeast Asia and the Commonwealth.",
    topic: "Global Economic Resilience in Developing Nations",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    category: "keynote",
    isKeynote: true,
    country: "United Kingdom",
  },
  {
    _id: "spk-3",
    name: "Dr. Rajeshwar Sharma",
    designation: "Director of Clean Energy Initiatives",
    institution: "IIT Bombay, India",
    bio: "Dr. Rajeshwar Sharma is a distinguished pioneer in green catalysis, nanomaterial synthesis, and circular polymer recycling. He holds 18 international patents and has led pivotal industrial decarbonization projects across South Asia.",
    topic: "Circular Economy & Renewable Materials",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    category: "keynote",
    isKeynote: true,
    country: "India",
  },
  {
    _id: "spk-4",
    name: "Dr. Amina Al-Mansoor",
    designation: "Head of Environmental Informatics",
    institution: "National University of Singapore",
    bio: "Dr. Amina Al-Mansoor is a leading expert in satellite remote sensing, ecological modeling, and marine biodiversity tracking across the Indo-Pacific corridor. Her research bridges sensor telemetry and AI-driven climate forecasting.",
    topic: "Geospatial Intelligence for Climate Action",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    category: "invited",
    isKeynote: false,
    country: "Singapore",
  },
];

async function getSpeaker(id: string): Promise<Speaker | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/speakers/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) return json.data;
    }
  } catch {}
  return fallbackSpeakers.find((s) => s._id === id) || fallbackSpeakers[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const speaker = await getSpeaker(id);
  if (!speaker) return { title: "Speaker Profile" };

  return {
    title: `${speaker.name} — Speaker Profile | MESKCON 2027`,
    description: `${speaker.name}, ${speaker.designation || speaker.role} at ${
      speaker.institution || speaker.organization
    }. Keynote Topic: ${speaker.topic}`,
  };
}

export default async function SpeakerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const speaker = await getSpeaker(id);

  if (!speaker) {
    notFound();
  }

  const photoSrc =
    speaker.photo ||
    speaker.image?.url ||
    speaker.photoUrl ||
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="min-h-screen flex flex-col bg-obsidian">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        {/* Breadcrumb Header */}
        <section className="border-b border-white/5 bg-gradient-to-b from-amber-500/5 to-transparent py-8">
          <div className="container-xl">
            <Link
              href="/speakers"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-amber-400 transition-colors mb-4"
            >
              <ArrowLeft size={14} /> Back to All Speakers
            </Link>
          </div>
        </section>

        {/* Profile Section */}
        <div className="container-xl mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Portrait & Quick Stats */}
            <div className="lg:col-span-4 space-y-6">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl">
                <Image
                  src={photoSrc}
                  alt={speaker.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="badge-gold">
                    {speaker.isKeynote ? "Keynote Luminary" : "Invited Scholar"}
                  </span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl space-y-4 border border-white/5">
                <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400">
                  Affiliation Details
                </h4>
                <div className="space-y-3 text-xs text-white/70">
                  <div className="flex items-start gap-2.5">
                    <Building size={15} className="text-amber-400/80 flex-shrink-0 mt-0.5" />
                    <span>
                      {speaker.institution || speaker.organization || "MESKCON International Council"}
                    </span>
                  </div>
                  {speaker.country && (
                    <div className="flex items-center gap-2.5">
                      <Globe size={15} className="text-amber-400/80 flex-shrink-0" />
                      <span>{speaker.country}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2.5">
                    <Calendar size={15} className="text-amber-400/80 flex-shrink-0" />
                    <span>Session Date: January 29–30, 2027</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <Link
                    href="https://www.meskcon.in/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <span>Register for this Keynote</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Bio, Topic, & Session Details */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <span className="badge-gold mb-3 inline-block">Speaker Profile</span>
                <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                  {speaker.name}
                </h1>
                <p className="text-amber-400 text-lg font-semibold mt-2 font-display">
                  {speaker.designation || speaker.role}
                </p>
                <p className="text-white/50 text-sm font-body mt-1">
                  {speaker.institution || speaker.organization}
                </p>
              </div>

              {/* Keynote Topic Highlight Box */}
              {speaker.topic && (
                <div className="p-6 sm:p-8 rounded-3xl glass-card border border-amber-400/20 bg-gradient-to-r from-amber-500/10 via-surface-2 to-surface-2 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 text-xs uppercase font-bold tracking-widest">
                    <Mic size={16} /> Keynote Presentation Focus
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    "{speaker.topic}"
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm font-body leading-relaxed">
                    Delivered in the Main Silver Jubilee Auditorium and broadcast live to virtual delegates.
                  </p>
                </div>
              )}

              {/* Biography */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                  <BookOpen size={18} className="text-amber-400" />
                  Scholarly Biography & Research Contributions
                </h3>
                <div className="text-white/70 text-sm sm:text-base font-body leading-relaxed space-y-4">
                  <p>
                    {speaker.bio ||
                      `${speaker.name} is an esteemed academic and researcher contributing significantly to the international scientific and interdisciplinary community.`}
                  </p>
                  <p className="text-white/50 text-sm">
                    For inquiries related to collaborative sessions, symposium workshops, or speaker interactions, please reach out to the MESKCON academic secretariat at{" "}
                    <a
                      href="mailto:meskcon@meskc.ac.in"
                      className="text-amber-400 hover:underline"
                    >
                      meskcon@meskc.ac.in
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
