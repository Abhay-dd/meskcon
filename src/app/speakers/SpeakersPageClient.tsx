"use client";

import { useEffect, useState } from "react";
import { SpeakerGrid } from "@/components/speakers/SpeakerCard";
import type { Speaker } from "@/types";

export default function SpeakersPageClient() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/speakers")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setSpeakers(d.data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="py-12" style={{ background: "#06060f" }}>
      <div className="container-xl">
        <SpeakerGrid speakers={speakers} isLoading={isLoading} />
      </div>
    </section>
  );
}
