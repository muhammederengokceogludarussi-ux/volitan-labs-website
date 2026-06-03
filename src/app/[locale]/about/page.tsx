"use client";

import { useTranslations, useLocale } from "next-intl";
import { AnimatedSection } from "@/components/shared/animated-section";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { founder } from "../../../../content/founder";
import Image from "next/image";

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
    <div className="relative pt-40 pb-32 md:pt-48">

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col gap-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader title={t("title")} subtitle={t("subtitle")} />

        {/* Profile + Story */}
        <section className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <AnimatedSection className="md:col-span-1">
            <div className="aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-card grayscale transition-all duration-700 hover:grayscale-0 hover:shadow-[var(--shadow-glow-strong)]">
              <Image
                src={founder.photo}
                alt={founder.name}
                width={400}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </AnimatedSection>
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-zinc-300 md:col-span-2">
            <AnimatedSection delay={0.1}>
              <p>{t("story.content")}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p>{t("story.content2")}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <GlassCard glow="subtle" className="p-4">
                  <h4 className="mb-2 font-mono text-xs text-accent-primary">
                    {t("skills.software")}
                  </h4>
                  <p className="text-sm font-medium">
                    {founder.skills.software.slice(0, 4).join(", ")}
                  </p>
                </GlassCard>
                <GlassCard glow="subtle" className="p-4">
                  <h4 className="mb-2 font-mono text-xs text-accent-primary">
                    {t("skills.engineering")}
                  </h4>
                  <p className="text-sm font-medium">
                    {founder.skills.engineering.slice(0, 3).join(", ")}
                  </p>
                </GlassCard>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Timeline */}
        <section className="mt-10">
          <AnimatedSection>
            <h2 className="mb-10 text-3xl font-bold tracking-tight text-white">
              {t("journey.title")}
            </h2>
          </AnimatedSection>

          <div className="relative flex flex-col gap-10 border-l border-accent-primary/20 pl-6">
            {timelineItems.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="relative transition-transform hover:-translate-y-1">
                  {/* Timeline dot — gradient */}
                  <div
                    className={`absolute -left-[30px] top-1 h-3 w-3 rounded-full border-[3px] border-black ${
                      i === 0
                        ? "bg-accent-primary shadow-[0_0_12px_rgba(139,108,240,0.5)]"
                        : "bg-zinc-600"
                    }`}
                  />
                  <div className="mb-2 font-mono text-xs uppercase text-accent-primary/60">
                    {item.period}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-400">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
