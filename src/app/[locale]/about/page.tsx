"use client";

import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Timeline } from "@/components/ui/timeline";

import { founder } from "../../../../content/founder";
import {
  Github,
  Linkedin,
  Cog,
  Code2,
  Wrench,
  GraduationCap,
  Heart,
  Lightbulb,
  Target,
  Users,
  Download,
  Award,
  Plane,
} from "lucide-react";

const values = [
  { key: "precision", icon: Target },
  { key: "innovation", icon: Lightbulb },
  { key: "quality", icon: Heart },
  { key: "collaboration", icon: Users },
] as const;

const skillCategories = [
  {
    key: "engineering",
    icon: Cog,
    skills: founder.skills.engineering,
  },
  {
    key: "software",
    icon: Code2,
    skills: founder.skills.software,
  },
  {
    key: "tools",
    icon: Wrench,
    skills: founder.skills.tools,
  },
] as const;

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale() as "en" | "tr";

  const timelineItems = Array.from({ length: 5 }, (_, i) => ({
    title: t(`timeline.item${i + 1}.title`),
    subtitle: t(`timeline.item${i + 1}.subtitle`),
    period: t(`timeline.item${i + 1}.period`),
    description: t(`timeline.item${i + 1}.description`),
  }));

  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden pt-20 md:pt-32">

        <Container className="relative z-10 text-center">
          <AnimatedSection>
            <p className="text-sm font-medium uppercase tracking-wider text-accent-cyan">
              {t("title")}
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {founder.title[locale]}
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
              {t("subtitle")}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Story */}
      <Section className="relative overflow-hidden">

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <SectionHeading
                label={t("story.title")}
                title={t("story.heading")}
                align="left"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="mt-6 text-text-secondary leading-relaxed">
                {t("story.content")}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <p className="mt-4 text-text-secondary leading-relaxed">
                {t("story.content2")}
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section className="relative overflow-hidden">

        <Container className="relative z-10">
          <AnimatedSection>
            <SectionHeading
              label={t("journey.label")}
              title={t("journey.title")}
              subtitle={t("journey.subtitle")}
            />
          </AnimatedSection>
          <div className="mt-12">
            <Timeline items={timelineItems} />
          </div>
        </Container>
      </Section>

      {/* Achievements */}
      <Section className="relative overflow-hidden">

        <Container className="relative z-10">
          <AnimatedSection>
            <SectionHeading
              label={t("achievements.label")}
              title={t("achievements.title")}
            />
          </AnimatedSection>
          <div className="mx-auto mt-8 max-w-2xl space-y-4">
            <AnimatedSection delay={0.1}>
              <div className="rounded-xl border border-accent-amber/20 bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-amber/10">
                    <Award className="h-6 w-6 text-accent-amber" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-semibold">
                        {t("achievements.teknofest.title")}
                      </h3>
                      <span className="rounded-full bg-accent-amber/10 px-2.5 py-0.5 text-xs font-semibold text-accent-amber">
                        {t("achievements.teknofest.badge")}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">
                      {t("achievements.teknofest.description")}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-surface-elevated px-2.5 py-0.5 text-xs text-text-muted">
                        <Plane className="h-3 w-3" />
                        {t("achievements.teknofest.role")}
                      </span>
                      <span className="rounded-full bg-surface-elevated px-2.5 py-0.5 text-xs text-text-muted">
                        ANATEK
                      </span>
                      <span className="rounded-full bg-surface-elevated px-2.5 py-0.5 text-xs text-text-muted">
                        2022
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="rounded-xl border border-border/30 bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-cyan/10">
                    <Plane className="h-6 w-6 text-accent-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold">
                      {t("achievements.drone.title")}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {t("achievements.drone.description")}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* Skills */}
      <Section className="relative overflow-hidden">

        <Container className="relative z-10">
          <AnimatedSection>
            <SectionHeading
              label={t("skills.label")}
              title={t("skills.title")}
              subtitle={t("skills.subtitle")}
            />
          </AnimatedSection>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {skillCategories.map((category, index) => (
              <AnimatedSection key={category.key} delay={0.1 * (index + 1)}>
                <div className="rounded-xl border border-border/30 bg-background p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-cyan/10">
                      <category.icon className="h-5 w-5 text-accent-cyan" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">
                      {t(`skills.${category.key}`)}
                    </h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-surface-elevated px-3 py-1 text-xs text-text-secondary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="relative overflow-hidden">

        <Container className="relative z-10">
          <AnimatedSection>
            <SectionHeading
              label={t("values.label")}
              title={t("values.title")}
            />
          </AnimatedSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <AnimatedSection key={value.key} delay={0.1 * (index + 1)}>
                <div className="rounded-xl border border-border/30 bg-surface p-6 text-center transition-all duration-300 hover:border-accent-cyan/30">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-cyan/10">
                    <value.icon className="h-6 w-6 text-accent-cyan" />
                  </div>
                  <h3 className="mt-4 font-display font-semibold">
                    {t(`values.${value.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    {t(`values.${value.key}.description`)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      {/* Education */}
      <Section className="relative overflow-hidden">

        <Container className="relative z-10">
          <AnimatedSection>
            <SectionHeading
              label={t("education.label")}
              title={t("education.title")}
            />
          </AnimatedSection>
          <div className="mx-auto mt-8 max-w-2xl space-y-4">
            {founder.education.map((edu, index) => (
              <AnimatedSection key={edu.school} delay={0.1 * (index + 1)}>
                <div className="rounded-xl border border-border/30 bg-background p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-purple/10">
                      <GraduationCap className="h-5 w-5 text-accent-purple" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold">
                        {edu.degree[locale]}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {edu.school}
                      </p>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="text-xs text-text-muted">
                          {edu.period}
                        </span>
                        <span className="rounded-full bg-accent-cyan/10 px-2 py-0.5 text-xs font-medium text-accent-cyan">
                          {edu.gpa}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA - Social */}
      <Section className="relative overflow-hidden">

        <Container className="relative z-10 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              {t("connect.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
              {t("connect.subtitle")}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-accent-cyan px-6 py-3 text-sm font-medium text-background transition-all hover:shadow-lg hover:shadow-accent-cyan/25"
              >
                <Download className="h-4 w-4" />
                {locale === "tr" ? "CV İndir" : "Download CV"}
              </a>
              <a
                href={founder.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/50 px-6 py-3 text-sm font-medium transition-all hover:border-accent-cyan/30 hover:bg-surface"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={founder.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/50 px-6 py-3 text-sm font-medium transition-all hover:border-accent-cyan/30 hover:bg-surface"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </AnimatedSection>
        </Container>
      </Section>
    </>
  );
}
