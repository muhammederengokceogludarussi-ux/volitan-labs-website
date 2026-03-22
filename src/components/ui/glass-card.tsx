"use client";

import { cn } from "@/lib/utils";
import { useRef, useCallback } from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "none" | "subtle" | "accent";
  as?: "div" | "article";
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = "subtle",
  as = "div",
}: GlassCardProps) {
  const elRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = elRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  const classes = cn(
    "relative rounded-2xl border backdrop-blur-[12px] backdrop-saturate-[1.2]",
    "bg-[var(--glass-bg)] border-[var(--glass-border)]",
    hover && [
      "mouse-glow",
      "transition-[transform,box-shadow,border-color] duration-300 ease-out",
      "hover:-translate-y-0.5 hover:border-[var(--glass-border-hover)]",
      glow === "subtle" && "hover:shadow-[var(--shadow-glow)]",
      glow === "accent" && "hover:shadow-[var(--shadow-glow-strong)]",
    ],
    className
  );

  const refCallback = useCallback((node: HTMLElement | null) => {
    elRef.current = node;
  }, []);

  if (as === "article") {
    return (
      <article
        ref={refCallback as React.RefCallback<HTMLElement>}
        onMouseMove={hover ? handleMouseMove : undefined}
        className={classes}
      >
        {children}
      </article>
    );
  }

  return (
    <div
      ref={refCallback as React.RefCallback<HTMLDivElement>}
      onMouseMove={hover ? handleMouseMove : undefined}
      className={classes}
    >
      {children}
    </div>
  );
}
