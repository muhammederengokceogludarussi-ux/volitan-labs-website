"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";
import { ArrowRight, Plane } from "lucide-react";
import Image from "next/image";

const filters = ["all", "mobile", "web", "engineering"] as const;
type Filter = (typeof filters)[number];

interface ProjectData {
  slug: string;
  title: { en: string; tr: string };
  description: { en: string; tr: string };
  tags: string[];
  category: Filter[];
  icon?: string;
  iconFallback?: "plane";
  href?: string;
  featured?: boolean;
}

const projectsData: ProjectData[] = [
  {
    slug: "focus-space",
    title: { en: "Focus Space", tr: "Focus Space" },
    description: {
      en: "AI-powered mobile productivity companion with cosmic interfaces. Coming to stores soon.",
      tr: "Kozmik arayüzlere sahip yapay zeka destekli mobil verimlilik uygulaması. Yakında mağazalarda.",
    },
    tags: ["Flutter", "AI"],
    category: ["all", "mobile"],
    icon: "/images/apps/focus-space/icon.png",
    href: "/apps",
    featured: true,
  },
  {
    slug: "teknofest-drone",
    title: { en: "Teknofest Drone", tr: "Teknofest Drone" },
    description: {
      en: "Complete mechanical design, fabrication, and flight controller integration for autonomous operation.",
      tr: "Otonom operasyon için eksiksiz mekanik tasarım, üretim ve uçuş kontrolcüsü entegrasyonu.",
    },
    tags: ["Hardware", "C++"],
    category: ["all", "engineering"],
    iconFallback: "plane",
    featured: true,
  },
];

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const locale = useLocale() as "en" | "tr";
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered = projectsData.filter((p) => p.category.includes(activeFilter));

  return (
    <div className="pt-40 pb-32 md:pt-48">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 sm:px-6 lg:px-8">
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
                    "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-transform hover:scale-105",
                    activeFilter === filter
                      ? "bg-white text-black"
                      : "border border-white/10 text-zinc-400 hover:text-white"
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
              <Link href={project.href || "#"} className="group block">
                <SpotlightCard className="flex h-[400px] flex-col hover:border-white/10">
                  {/* Image area with logo */}
                  <div className="relative flex-1 overflow-hidden bg-zinc-900/80">
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                      {project.icon ? (
                        <Image
                          src={project.icon}
                          alt={project.title[locale]}
                          width={80}
                          height={80}
                          className="rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                          <Plane className="h-9 w-9 text-zinc-400" />
                        </div>
                      )}
                      <span className="text-sm font-medium text-zinc-500 font-display">
                        {project.title[locale]}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                  </div>

                  {/* Info */}
                  <div className="border-t border-white/5 bg-surface p-6 transition-colors hover:bg-surface-elevated">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="text-xl font-bold text-white">
                        {project.title[locale]}
                      </h3>
                      <ArrowRight className="h-5 w-5 text-zinc-500 transition-all group-hover:-rotate-45 group-hover:scale-110 group-hover:text-white" />
                    </div>
                    <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
                      {project.description[locale]}
                    </p>
                    <div className="flex gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-white/5 bg-white/5 px-2 py-1 font-mono text-xs text-zinc-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            </AnimatedSection>
          ))}
        </section>
      </div>
    </div>
  );
}
