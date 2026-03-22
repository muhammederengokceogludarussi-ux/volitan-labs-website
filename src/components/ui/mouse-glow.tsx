"use client";

import { cn } from "@/lib/utils";
import { useRef, useCallback } from "react";

interface MouseGlowProps {
  children: React.ReactNode;
  className?: string;
}

export function MouseGlow({ children, className }: MouseGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("mouse-glow", className)}
    >
      {children}
    </div>
  );
}
