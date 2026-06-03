"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  animated?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  align = "left",
  animated = true,
  className,
}: PageHeaderProps) {
  const content = (
    <header
      className={cn(
        "border-b border-white/10 pb-12",
        align === "center" ? "text-center" : "text-center md:text-left",
        className
      )}
    >
      <h1 className="mb-6 font-display text-5xl font-bold tracking-tighter text-white md:text-6xl gradient-text-animated">
        {title}.
      </h1>
      {subtitle && (
        <p className="max-w-2xl text-xl leading-relaxed text-zinc-400">
          {subtitle}
        </p>
      )}
    </header>
  );

  if (!animated) return content;

  return <AnimatedSection>{content}</AnimatedSection>;
}
