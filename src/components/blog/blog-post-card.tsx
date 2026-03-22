"use client";

import { Link } from "@/i18n/navigation";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";

interface BlogPostCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: number;
  tags: string[];
  readMoreLabel: string;
  minReadLabel: string;
  locale?: string;
  featured?: boolean;
}

export function BlogPostCard({
  slug,
  title,
  description,
  date,
  readingTime,
  tags,
  readMoreLabel,
  minReadLabel,
  locale = "en",
  featured,
}: BlogPostCardProps) {
  const dateLocale = locale === "tr" ? "tr-TR" : "en-US";
  const formattedDate = new Date(date).toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <GlassCard
        as="article"
        glow="subtle"
        className={cn(
          "h-full p-6",
          featured && "md:flex md:items-start md:gap-8"
        )}
      >
        <div className={cn(featured && "flex-1")}>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent-primary/10 px-2.5 py-0.5 text-xs font-medium text-accent-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2
            className={cn(
              "mt-4 font-display font-semibold tracking-[-0.03em] transition-[color] duration-200 group-hover:text-accent-primary",
              featured ? "text-xl md:text-2xl" : "text-lg"
            )}
          >
            {title}
          </h2>

          {/* Description */}
          <p
            className={cn(
              "mt-2 text-sm leading-relaxed text-text-secondary",
              featured ? "line-clamp-4" : "line-clamp-3"
            )}
          >
            {description}
          </p>

          {/* Meta */}
          <div className="mt-4 flex items-center gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readingTime} {minReadLabel}
            </span>
          </div>

          {/* Read More — always visible */}
          <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-primary">
            {readMoreLabel}
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
