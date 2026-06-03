"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { PostMeta } from "@/components/shared/post-meta";
import { TagList } from "@/components/shared/tag-list";
import { ReadMoreLink } from "@/components/shared/read-more-link";

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
          <TagList tags={tags} variant="accent" />

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
          <PostMeta
            date={date}
            readingTime={readingTime}
            minReadLabel={minReadLabel}
            locale={locale}
            className="mt-4"
          />

          {/* Read More — always visible */}
          <ReadMoreLink label={readMoreLabel} className="mt-4" />
        </div>
      </GlassCard>
    </Link>
  );
}
