"use client";

import { useState, useEffect } from "react";
import type { CountdownTime } from "@/types";

interface CountdownTimerProps {
  targetDate: Date | string;
}

function getTimeLeft(targetDate: Date | string): CountdownTime {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
}

function pad(num: number): string {
  return String(num).padStart(2, "0");
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(
    getTimeLeft(targetDate)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  const segments = [
    { value: pad(timeLeft.days), label: "Days" },
    { value: pad(timeLeft.hours), label: "Hours" },
    { value: pad(timeLeft.minutes), label: "Min" },
    { value: pad(timeLeft.seconds), label: "Sec" },
  ];

  const isPast = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isPast) {
    return (
      <div className="flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-xl px-4 py-2">
        <span className="text-amber-400 font-display font-bold text-sm">
          Conference Concluded
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {segments.map((seg, i) => (
        <div key={seg.label} className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-center">
            <div className="glass-card w-14 sm:w-16 h-14 sm:h-16 flex items-center justify-center border-amber-400/10">
              <span className="countdown-digit text-2xl sm:text-3xl">
                {seg.value}
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest mt-1 font-body">
              {seg.label}
            </span>
          </div>
          {i < segments.length - 1 && (
            <span className="text-amber-400/50 font-bold text-xl mb-4">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
