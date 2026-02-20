"use client";

import { cn } from "@/lib/utils";

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* Beam lines only — gradient orbs removed */}

      {/* Animated beam lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-cyan)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-accent-cyan)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--color-accent-purple)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-purple)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-accent-purple)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--color-accent-cyan)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="0%"
          y1="20%"
          x2="100%"
          y2="80%"
          stroke="url(#beam-gradient-1)"
          strokeWidth="1"
          className="animate-beam-1"
        />
        <line
          x1="20%"
          y1="0%"
          x2="80%"
          y2="100%"
          stroke="url(#beam-gradient-1)"
          strokeWidth="0.5"
          className="animate-beam-2"
        />
        <line
          x1="100%"
          y1="30%"
          x2="0%"
          y2="70%"
          stroke="url(#beam-gradient-2)"
          strokeWidth="1"
          className="animate-beam-3"
        />
        <line
          x1="60%"
          y1="0%"
          x2="40%"
          y2="100%"
          stroke="url(#beam-gradient-2)"
          strokeWidth="0.5"
          className="animate-beam-1"
        />
      </svg>
    </div>
  );
}
