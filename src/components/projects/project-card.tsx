"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { TagList } from "@/components/shared/tag-list";
import { StatusBadge } from "@/components/shared/status-badge";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  href: string;
  github?: string;
  live?: string;
  featured?: boolean;
  status?: "beta" | "coming-soon";
  className?: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  href,
  github,
  live,
  featured,
  status,
  className,
}: ProjectCardProps) {
  const t = useTranslations("projects");
  const tApps = useTranslations("apps");

  return (
    <Link
      href={href}
      className={cn("group relative block", className)}
    >
      <GlassCard
        glow={featured ? "accent" : "subtle"}
        className={cn(
          "p-5 h-full",
          featured && "ring-1 ring-accent-secondary/20"
        )}
      >
        <div className="flex items-center gap-2">
          {featured && (
            <span className="absolute -top-2.5 right-4 rounded-full bg-accent-secondary/10 px-3 py-0.5 text-xs font-medium text-accent-secondary">
              {t("featured")}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <h3 className="font-display text-lg font-semibold tracking-[-0.03em] transition-[color] duration-200 group-hover:text-accent-primary">
            {title}
          </h3>
          {status === "beta" && (
            <StatusBadge label={tApps("beta")} variant="primary" />
          )}
          {status === "coming-soon" && (
            <StatusBadge label={tApps("comingSoon")} variant="secondary" />
          )}
        </div>

        <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-3">
          {description}
        </p>

        <TagList tags={tags} variant="muted" className="mt-4" />

        <div className="mt-5 flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary">
            {t("view_project")}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-[color,background-color] duration-200 hover:text-text-primary hover:bg-surface-elevated"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}

          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-[color,background-color] duration-200 hover:text-text-primary hover:bg-surface-elevated"
              aria-label="Live demo"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </GlassCard>
    </Link>
  );
}
