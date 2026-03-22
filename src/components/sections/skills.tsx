"use client";

import { useTranslations } from "next-intl";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Smartphone, Cog, Brain } from "lucide-react";

const skills = [
  {
    key: "flutter",
    Icon: Smartphone,
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    key: "engineering",
    Icon: Cog,
    colSpan: "col-span-1",
  },
  {
    key: "ai",
    Icon: Brain,
    colSpan: "col-span-1",
  },
] as const;

export function Skills() {
  const t = useTranslations("home.skills");

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6">
      <h2 className="flex items-center gap-4 text-3xl font-bold font-display tracking-tight text-white mb-10">
        <span className="h-px w-12 bg-white/20" />
        {t("title")}
        <span className="h-px w-12 bg-white/20" />
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {skills.map((skill, i) => (
          <AnimatedSection key={skill.key} delay={i * 0.05}>
            <SpotlightCard
              className={`${skill.colSpan} flex h-[340px] flex-col justify-between p-8 group hover:border-white/10`}
            >
              <div className="relative z-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                  <skill.Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">
                  {t(`items.${skill.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {t(`items.${skill.key}.description`)}
                </p>
              </div>
            </SpotlightCard>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
