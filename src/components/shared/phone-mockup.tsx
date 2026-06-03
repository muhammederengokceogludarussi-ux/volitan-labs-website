"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  src: string;
  alt: string;
  maxWidth?: string;
  borderWidth?: number;
  hoverRotate?: boolean;
  className?: string;
}

export function PhoneMockup({
  src,
  alt,
  maxWidth = "300px",
  borderWidth = 6,
  hoverRotate = false,
  className,
}: PhoneMockupProps) {
  return (
    <div
      className={cn("relative flex w-full justify-center", className)}
      style={{ maxWidth, perspective: hoverRotate ? "1000px" : undefined }}
    >
      {/* Glow behind mockup */}
      <div className="absolute inset-[-15%] rounded-full bg-accent-primary/15 blur-[80px]" />
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,1)] aspect-[1/2]",
          hoverRotate &&
            "group-hover:[transform:rotateY(15deg)] group-hover:-translate-y-4 transition-all duration-700"
        )}
        style={{ borderWidth: `${borderWidth}px`, borderColor: "rgb(24 24 27)" }}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes={maxWidth} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
    </div>
  );
}
