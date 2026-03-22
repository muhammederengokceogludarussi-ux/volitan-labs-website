"use client";

import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  bgClassName?: string;
  href?: string;
}

export function MagneticButton({
  children,
  className,
  bgClassName,
  href,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const bg = el.querySelector<HTMLElement>(".magnetic-bg");
    const content = el.querySelector<HTMLElement>(".magnetic-content");
    if (bg) bg.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    if (content) content.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    const bg = el.querySelector<HTMLElement>(".magnetic-bg");
    const content = el.querySelector<HTMLElement>(".magnetic-content");
    if (bg) bg.style.transform = "";
    if (content) content.style.transform = "";
  }, []);

  return (
    <a
      ref={btnRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("magnetic-btn rounded-full", className)}
    >
      <div className={cn("magnetic-bg rounded-full", bgClassName)} />
      <span className="magnetic-content">{children}</span>
    </a>
  );
}
