"use client";

import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/shared/animated-section";

interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <AnimatedSection key={index} delay={0.1 * index}>
            <div
              className={cn(
                "relative flex flex-col md:flex-row md:items-start",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              {/* Dot */}
              <div className="absolute left-4 top-1 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent-cyan bg-background md:left-1/2" />

              {/* Content */}
              <div
                className={cn(
                  "ml-10 md:ml-0 md:w-1/2",
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                )}
              >
                <span className="inline-block rounded-full bg-accent-cyan/10 px-3 py-1 text-xs font-medium text-accent-cyan">
                  {item.period}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-text-secondary">
                  {item.subtitle}
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
