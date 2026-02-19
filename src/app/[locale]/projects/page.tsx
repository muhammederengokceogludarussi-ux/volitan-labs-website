"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectGrid } from "@/components/projects/project-grid";
import { cn } from "@/lib/utils";

const filters = ["all", "mobile", "web", "engineering"] as const;
type Filter = (typeof filters)[number];

interface ProjectData {
  slug: string;
  title: { en: string; tr: string };
  description: { en: string; tr: string };
  tags: string[];
  category: Filter[];
  github?: string;
  live?: string;
  featured?: boolean;
}

const projectsData: ProjectData[] = [
  {
    slug: "focus-space",
    title: {
      en: "Focus Space",
      tr: "Focus Space",
    },
    description: {
      en: "A gamified productivity app where you earn XP by focusing, build your own universe, and track your growth. Built with Flutter.",
      tr: "Odaklanarak XP kazandığın, kendi evrenini inşa ettiğin ve gelişimini takip ettiğin oyunlaştırılmış verimlilik uygulaması. Flutter ile geliştirildi.",
    },
    tags: ["Flutter", "Dart", "Firebase", "Gamification"],
    category: ["all", "mobile"],
    featured: true,
  },
  {
    slug: "teknofest-combat-uav",
    title: {
      en: "TEKNOFEST 2022 — Combat UAV",
      tr: "TEKNOFEST 2022 — Savaşan İHA",
    },
    description: {
      en: "ANATEK Team's combat UAV project for TEKNOFEST 2022 Competition. Reached the finals as the team's Mechanical Coordinator — responsible for airframe design and structural analysis.",
      tr: "TEKNOFEST 2022 Yarışması için ANATEK Takımı'nın savaşan İHA projesi. Takımın Mekanik Koordinatörü olarak finale kaldı — gövde tasarımı ve yapısal analiz sorumlusu.",
    },
    tags: ["UAV Design", "XFLR5", "Siemens NX", "CAD/CAM", "TEKNOFEST"],
    category: ["all", "engineering"],
    featured: true,
  },
  {
    slug: "volitan-labs-website",
    title: {
      en: "Volitan Labs Website",
      tr: "Volitan Labs Web Sitesi",
    },
    description: {
      en: "A modern portfolio and app showcase website built with Next.js, Tailwind CSS, and Framer Motion. Bilingual, dark/light mode.",
      tr: "Next.js, Tailwind CSS ve Framer Motion ile geliştirilmiş modern portfolyo ve uygulama vitrin sitesi. Çift dilli, koyu/açık tema.",
    },
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    category: ["all", "web"],
    live: "https://volitanlabs.dev",
  },
];

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const locale = useLocale() as "en" | "tr";
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filteredProjects = projectsData
    .filter((p) => p.category.includes(activeFilter))
    .map((p) => ({
      slug: p.slug,
      title: p.title[locale],
      description: p.description[locale],
      tags: p.tags,
      github: p.github,
      live: p.live,
      featured: p.featured,
    }));

  return (
    <>
      <Section className="pt-20 md:pt-32">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title={t("title")}
              subtitle={t("subtitle")}
            />
          </AnimatedSection>

          {/* Filter Tabs */}
          <AnimatedSection delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    activeFilter === filter
                      ? "bg-accent-cyan text-background"
                      : "bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
                  )}
                >
                  {t(`filters.${filter}`)}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Project Grid */}
          <div className="mt-12">
            <ProjectGrid projects={filteredProjects} />
          </div>
        </Container>
      </Section>
    </>
  );
}
