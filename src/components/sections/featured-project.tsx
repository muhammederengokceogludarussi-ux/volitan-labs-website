"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  ArrowRight,
  Focus,
  Trophy,
  Timer,
  Sparkles,
} from "lucide-react";

const features = [
  { icon: Focus, key: "focus" },
  { icon: Trophy, key: "gamification" },
  { icon: Timer, key: "pomodoro" },
  { icon: Sparkles, key: "universe" },
] as const;

export function FeaturedProject() {
  const t = useTranslations("home.featuredApp");

  return (
    <Section className="bg-surface">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Phone mockup with real screenshot */}
          <AnimatedSection>
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-[2.5rem] border-2 border-border/30 bg-surface-elevated p-3 shadow-2xl">
              <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/apps/focus-space/screenshot-cockpit.jpg"
                  alt="Focus Space — Cockpit Timer"
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Info */}
          <div>
            <AnimatedSection>
              <SectionHeading
                label={t("label")}
                title="Focus Space"
                subtitle={t("description")}
                align="left"
              />
            </AnimatedSection>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <AnimatedSection key={feature.key} delay={0.1 * (index + 1)}>
                  <div className="flex items-start gap-3 rounded-xl border border-border/30 bg-background p-4 transition-colors hover:border-border/60">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-cyan/10">
                      <feature.icon className="h-4 w-4 text-accent-cyan" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {t(`features.${feature.key}.title`)}
                      </p>
                      <p className="mt-1 text-xs text-text-secondary">
                        {t(`features.${feature.key}.description`)}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.5}>
              <div className="mt-8">
                <Link
                  href="/projects/focus-space"
                  className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 px-6 py-3 text-sm font-medium text-accent-cyan transition-all hover:bg-accent-cyan/10"
                >
                  {t("cta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </Section>
  );
}
