"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WordRotate } from "@/components/ui/word-rotate";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ArrowRight, Mail } from "lucide-react";

export function Hero() {
  const t = useTranslations("home.hero");

  const roles = t("roles").split("|");

  return (
    <Section className="relative overflow-hidden pt-24 pb-16 md:pt-36 md:pb-24">
      <BackgroundBeams />
      <Container className="relative z-10 text-center">
        <AnimatedSection>
          <p className="text-sm font-medium uppercase tracking-wider text-accent-cyan">
            {t("greeting")}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight gradient-text-animated sm:text-5xl md:text-6xl lg:text-7xl">
            {t("name")}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mt-4 flex items-center justify-center">
            <WordRotate
              words={roles}
              duration={2500}
              className="font-display text-2xl font-semibold gradient-text md:text-3xl"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary md:text-xl">
            {t("description")}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-accent-cyan px-6 py-3 text-sm font-medium text-background transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent-cyan/20"
            >
              {t("cta_projects")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-text-primary transition-all hover:bg-surface-elevated"
            >
              <Mail className="h-4 w-4" />
              {t("cta_contact")}
            </Link>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
