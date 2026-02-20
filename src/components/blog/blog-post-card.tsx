"use client";

import { Link } from "@/i18n/navigation";
import { Calendar, Clock, ArrowRight } from "lucide-react";

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
}: BlogPostCardProps) {
  const dateLocale = locale === "tr" ? "tr-TR" : "en-US";
  const formattedDate = new Date(date).toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="h-full rounded-xl border-l-2 border border-border/30 border-l-transparent bg-surface p-6 transition-all duration-300 hover:border-accent-cyan/30 hover:border-l-accent-cyan hover:shadow-lg">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent-purple/10 px-2.5 py-0.5 text-xs font-medium text-accent-purple"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="mt-4 font-display text-lg font-semibold transition-colors group-hover:text-accent-cyan">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-text-secondary line-clamp-3">
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

        {/* Read More */}
        <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan opacity-0 transition-all group-hover:opacity-100">
          {readMoreLabel}
          <ArrowRight className="h-3 w-3" />
        </div>
      </article>
    </Link>
  );
}
