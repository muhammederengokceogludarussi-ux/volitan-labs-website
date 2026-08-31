"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/shared/animated-section";
import { GlassCard } from "@/components/ui/glass-card";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { cn } from "@/lib/utils";
import { ArrowRight, Code2, Gamepad2, Plane } from "lucide-react";

const filters = ["all", "web", "engineering"] as const;
type Filter = (typeof filters)[number];

interface ProjectData {
  slug: string;
  title: { en: string; tr: string };
  description: { en: string; tr: string };
  tags: string[];
  category: Filter[];
  iconFallback: "plane" | "game" | "code";
  href?: string;
  featured?: boolean;
}

const projectsData: ProjectData[] = [
  {
    slug: "blue-rescue",
    title: { en: "Blue Rescue", tr: "Blue Rescue" },
    description: {
      en: "A one-touch browser game with helicopter physics, rescue combos, fuel management, and mobile QR access.",
      tr: "Helikopter fiziği, kurtarma komboları, yakıt yönetimi ve mobil QR erişimi sunan tek dokunuşlu tarayıcı oyunu.",
    },
    tags: ["JavaScript", "Canvas", "Game Design"],
    category: ["all", "web"],
    iconFallback: "game",
    href: "/projects/blue-rescue",
    featured: true,
  },
  {
    slug: "teknofest-drone",
    title: {
      en: "TEKNOFEST 2022 — Combat UAV",
      tr: "TEKNOFEST 2022 — Savaşan İHA",
    },
    description: {
      en: "Complete mechanical design, fabrication, and flight controller integration for autonomous operation.",
      tr: "Otonom operasyon için eksiksiz mekanik tasarım, üretim ve uçuş kontrolcüsü entegrasyonu.",
    },
    tags: ["UAV Design", "Siemens NX", "XFLR5"],
    category: ["all", "engineering"],
    iconFallback: "plane",
    href: "/projects/teknofest-combat-uav",
    featured: true,
  },
  {
    slug: "volitan-labs-website",
    title: { en: "Volitan Labs Website", tr: "Volitan Labs Web Sitesi" },
    description: {
      en: "A modern bilingual portfolio and app showcase website built with Next.js, Tailwind CSS, and Framer Motion.",
      tr: "Next.js, Tailwind CSS ve Framer Motion ile geliştirilmiş modern çift dilli portfolyo ve uygulama vitrin sitesi.",
    },
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    category: ["all", "web"],
    iconFallback: "code",
    href: "/projects/volitan-labs-website",
  },
];

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const locale = useLocale() as "en" | "tr";
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered = projectsData.filter((p) => p.category.includes(activeFilter));

  return (
    <div className="relative pt-40 pb-32 md:pt-48">
      <BackgroundGrid variant="dots" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 sm:px-6 lg:px-8">
        {/* Header with filters */}
        <header className="flex flex-col justify-between gap-6 border-b border-white/10 pb-12 md:flex-row md:items-end">
          <AnimatedSection>
            <div>
              <h1 className="mb-4 font-display text-5xl font-bold tracking-tighter text-white md:text-6xl">
                {t("title")}.
              </h1>
              <p className="text-xl text-zinc-400">{t("subtitle")}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                    activeFilter === filter
                      ? "bg-gradient-to-r from-accent-primary to-[#C084FC] text-white shadow-[0_0_15px_rgba(139,108,240,0.3)]"
                      : "glass text-zinc-400 hover:text-white hover:border-[var(--glass-border-hover)]"
                  )}
                >
                  {t(`filters.${filter}`)}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </header>

        {/* Project Grid */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((project, i) => (
            <AnimatedSection key={project.slug} delay={i * 0.1}>
              <Link href={project.href || "#"} className="group block h-full">
                <GlassCard glow="accent" className="flex h-full min-h-[390px] flex-col overflow-hidden rounded-[1.75rem]">
                  {/* Image area with logo */}
                  <div className="relative min-h-52 flex-1 overflow-hidden bg-gradient-to-br from-zinc-900/80 via-zinc-950 to-black">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(139,108,240,0.15),transparent_38%)]" />
                    <div className="absolute inset-0 bg-grid-dots opacity-40" />
                    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-[1.4rem] border border-white/10 bg-white/[0.05] shadow-2xl transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:border-accent-primary/30 group-hover:bg-accent-primary/10">
                        {project.iconFallback === "game" ? (
                          <Gamepad2 className="h-9 w-9 text-sky-300" />
                        ) : project.iconFallback === "code" ? (
                          <Code2 className="h-9 w-9 text-violet-300" />
                        ) : (
                          <Plane className="h-9 w-9 text-amber-300" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-zinc-500 font-display">
                        {project.title[locale]}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="border-t border-white/5 p-6 md:p-7">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="text-xl font-bold text-white">
                        {project.title[locale]}
                      </h3>
                      <ArrowRight className="h-5 w-5 text-zinc-500 transition-all group-hover:-rotate-45 group-hover:scale-110 group-hover:text-accent-primary" />
                    </div>
                    <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
                      {project.description[locale]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="glass rounded px-2 py-1 font-mono text-xs text-zinc-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </AnimatedSection>
          ))}
        </section>
      </div>
    </div>
  );
}
