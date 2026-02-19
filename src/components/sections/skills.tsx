"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  Smartphone,
  Cpu,
  Cog,
  Brain,
  Code2,
} from "lucide-react";

const skills = [
  {
    key: "flutter",
    Icon: Smartphone,
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    key: "ai",
    Icon: Brain,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    key: "engineering",
    Icon: Cog,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    key: "fullstack",
    Icon: Code2,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    key: "systems",
    Icon: Cpu,
    className: "lg:col-span-1 lg:row-span-1",
  },
] as const;

export function Skills() {
  const t = useTranslations("home.skills");

  return (
    <Section>
      <Container>
        <AnimatedSection>
          <SectionHeading
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <BentoGrid className="mt-12 auto-rows-[14rem] grid-cols-1 lg:grid-cols-3">
            {skills.map((skill) => (
              <BentoCard
                key={skill.key}
                name={t(`items.${skill.key}.title`)}
                description={t(`items.${skill.key}.description`)}
                Icon={skill.Icon}
                className={skill.className}
              />
            ))}
          </BentoGrid>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
