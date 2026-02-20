"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

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
      className={cn(
        "group relative block rounded-xl border border-border/30 bg-surface p-5 transition-all duration-300 hover:border-accent-cyan/30 hover:shadow-lg hover-glow cursor-pointer",
        featured && "ring-1 ring-accent-amber/20",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {featured && (
          <span className="absolute -top-2.5 right-4 rounded-full bg-accent-amber/10 px-3 py-0.5 text-xs font-medium text-accent-amber">
            {t("featured")}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <h3 className="font-display text-lg font-semibold transition-colors group-hover:text-accent-cyan">
          {title}
        </h3>
        {status === "beta" && (
          <span className="rounded-full bg-accent-purple/10 px-2.5 py-0.5 text-xs font-medium text-accent-purple">
            {tApps("beta")}
          </span>
        )}
        {status === "coming-soon" && (
          <span className="rounded-full bg-accent-amber/10 px-2.5 py-0.5 text-xs font-medium text-accent-amber">
            {tApps("comingSoon")}
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-text-secondary line-clamp-3">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-surface-elevated px-2.5 py-0.5 text-xs text-text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan transition-colors group-hover:text-accent-cyan/80">
          {t("view_project")}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:text-text-primary hover:bg-surface-elevated"
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
            className="relative z-10 flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:text-text-primary hover:bg-surface-elevated"
            aria-label="Live demo"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </Link>
  );
}
