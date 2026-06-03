"use client";

import { useTranslations } from "next-intl";
import { GlassCard } from "@/components/ui/glass-card";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { AnimatedSection } from "@/components/shared/animated-section";
import { IconBadge } from "@/components/shared/icon-badge";
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
    <section className="relative mx-auto w-full max-w-[1200px] overflow-hidden px-4 py-20 sm:px-6">
      <BackgroundGrid variant="dots" className="opacity-20" />

      <div className="relative z-10">
        <h2 className="flex items-center gap-4 text-3xl font-bold font-display tracking-tight text-white mb-10">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-accent-primary/40" />
          {t("title")}
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent-primary/40" />
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill, i) => (
            <AnimatedSection key={skill.key} delay={i * 0.05} className={skill.colSpan}>
              <GlassCard glow="accent" className="flex h-[340px] flex-col justify-between p-8 group">
                <div className="relative z-10">
                  <IconBadge icon={skill.Icon} size="lg" className="mb-6" />
                  <h3 className="mb-3 text-xl font-bold text-white">
                    {t(`items.${skill.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {t(`items.${skill.key}.description`)}
                  </p>
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
