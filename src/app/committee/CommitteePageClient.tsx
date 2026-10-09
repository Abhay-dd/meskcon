"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, Mail, Building } from "lucide-react";
import type { CommitteeMember } from "@/types";

const CATEGORY_LABELS: Record<CommitteeMember["category"], string> = {
  patron: "Chief Patrons",
  advisory: "Advisory Board",
  chair: "Conference Chair",
  coordinator: "Coordinator",
  joint_coordinator: "Joint Coordinators",
  member: "Organising Committee Members",
};

const CATEGORY_ORDER: CommitteeMember["category"][] = [
  "patron",
  "advisory",
  "chair",
  "coordinator",
  "joint_coordinator",
  "member",
];

function MemberCard({ member, index }: { member: CommitteeMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="glass-card border border-white/8 hover:border-amber-400/15 p-5 group transition-all"
    >
      <div className="flex items-start gap-4">
        {member.image?.url ? (
          <Image
            src={member.image.url}
            alt={member.name}
            width={52}
            height={52}
            className="rounded-xl object-cover border border-white/10 shrink-0"
          />
        ) : (
          <div className="w-[52px] h-[52px] rounded-xl bg-gradient-to-br from-amber-400/10 to-amber-700/10 border border-amber-400/15 flex items-center justify-center shrink-0">
            <span className="text-xl font-bold text-amber-400/60 font-display">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-display font-bold text-sm text-white mb-0.5 group-hover:text-amber-400 transition-colors truncate">
            {member.name}
          </h3>
          <p className="text-xs text-amber-400/70 leading-snug mb-1.5">{member.role}</p>
          {member.institution && (
            <div className="flex items-center gap-1 text-[11px] text-white/40">
              <Building size={10} className="shrink-0" />
              <span className="truncate">{member.institution}</span>
            </div>
          )}
          <div className="flex items-center gap-3 mt-2">
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="text-[11px] text-white/30 hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                <Phone size={10} />
                {member.phone}
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="text-[11px] text-white/30 hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                <Mail size={10} />
                {member.email}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CategorySection({
  category,
  members,
}: {
  category: CommitteeMember["category"];
  members: CommitteeMember[];
}) {
  if (members.length === 0) return null;

  const isPatron = category === "patron";
  const isChair = category === "chair";

  return (
    <div className="mb-14">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-6"
      >
        <h2 className="font-display font-bold text-xl text-white">
          {CATEGORY_LABELS[category]}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-amber-400/20 to-transparent" />
        <span className="text-xs text-white/30 font-body">{members.length}</span>
      </motion.div>

      <div
        className={`grid gap-4 ${
          isChair || isPatron
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {members.map((member, i) => (
          <MemberCard key={member._id || i} member={member} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function CommitteePageClient() {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/committee")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setMembers(d.data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const grouped = CATEGORY_ORDER.reduce(
    (acc, cat) => {
      acc[cat] = members.filter((m) => m.category === cat);
      return acc;
    },
    {} as Record<CommitteeMember["category"], CommitteeMember[]>
  );

  if (isLoading) {
    return (
      <section className="py-12" style={{ background: "#06060f" }}>
        <div className="container-xl">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="mb-12">
              <div className="skeleton h-6 w-48 mb-6" />
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, j) => (
                  <div key={j} className="glass-card p-5 flex gap-4">
                    <div className="skeleton w-14 h-14 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="skeleton h-3 w-3/4" />
                      <div className="skeleton h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (members.length === 0) {
    return (
      <section className="py-20 text-center" style={{ background: "#06060f" }}>
        <div className="container-xl">
          <div className="glass-card p-12 max-w-md mx-auto">
            <p className="text-white/40">Committee details coming soon.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 pb-20" style={{ background: "#06060f" }}>
      <div className="container-xl">
        {CATEGORY_ORDER.map((cat) => (
          <CategorySection key={cat} category={cat} members={grouped[cat]} />
        ))}
      </div>
    </section>
  );
}
