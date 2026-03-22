"use client";

import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "a";
  href?: string;
}

export function SpotlightCard({
  children,
  className,
  as: Tag = "div",
  href,
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  const props = {
    ref: ref as React.Ref<HTMLDivElement>,
    onMouseMove: handleMouseMove,
    className: cn(
      "spotlight-card overflow-hidden rounded-[2rem] bg-surface border border-white/5 shadow-card transition-all duration-500",
      className
    ),
    ...(Tag === "a" ? { href } : {}),
  };

  return <Tag {...(props as React.HTMLAttributes<HTMLElement>)}>{children}</Tag>;
}
