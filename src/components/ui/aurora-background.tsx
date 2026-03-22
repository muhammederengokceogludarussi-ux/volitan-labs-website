"use client";

import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

const intensityMap = {
  subtle: 0.5,
  medium: 1,
  strong: 1.5,
};

export function AuroraBackground({
  className,
  intensity = "medium",
}: AuroraBackgroundProps) {
  const mul = intensityMap[intensity];

  return (
    <div
      aria-hidden="true"
      data-aurora
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {/* Purple orb */}
      <div
        className="absolute -top-[20%] -left-[10%] h-[60vw] w-[60vw] min-h-[500px] min-w-[500px] rounded-full blur-[80px] will-change-transform"
        style={{
          background: `radial-gradient(circle, rgba(139,108,240,${0.3 * mul}) 0%, transparent 70%)`,
          animation: "aurora-drift-1 20s ease-in-out infinite alternate",
        }}
      />
      {/* Amber orb */}
      <div
        className="absolute -bottom-[15%] -right-[15%] h-[50vw] w-[50vw] min-h-[400px] min-w-[400px] rounded-full blur-[100px] will-change-transform"
        style={{
          background: `radial-gradient(circle, rgba(232,160,64,${0.15 * mul}) 0%, transparent 70%)`,
          animation: "aurora-drift-2 25s ease-in-out infinite alternate-reverse",
        }}
      />
      {/* Blue orb */}
      <div
        className="absolute top-[30%] left-[40%] h-[40vw] w-[40vw] min-h-[350px] min-w-[350px] rounded-full blur-[120px] will-change-transform"
        style={{
          background: `radial-gradient(circle, rgba(100,180,255,${0.12 * mul}) 0%, transparent 70%)`,
          animation: "aurora-drift-3 30s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}
