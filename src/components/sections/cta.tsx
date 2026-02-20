"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ShimmerButton } from "@/components/ui/shimmer-button";

import { AnimatedSection } from "@/components/shared/animated-section";
import { ArrowRight } from "lucide-react";

export function CTA() {
  const t = useTranslations("home.cta");

  return (
    <Section className="relative overflow-hidden">

      <Container className="relative z-10 text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
            {t("subtitle")}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mt-10 flex justify-center">
            <Link href="/contact">
              <ShimmerButton className="text-sm font-medium">
                {t("button")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </ShimmerButton>
            </Link>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
