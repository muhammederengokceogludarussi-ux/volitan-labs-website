"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";

import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "../../../../content/site";

const contactLinks = [
  {
    key: "email",
    icon: Mail,
    label: siteConfig.social.email,
    href: `mailto:${siteConfig.social.email}`,
    color: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
    external: false,
  },
  {
    key: "github",
    icon: Github,
    label: "GitHub",
    href: siteConfig.social.github,
    color: "text-text-primary",
    bgColor: "bg-surface-elevated",
    external: true,
  },
  {
    key: "linkedin",
    icon: Linkedin,
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    color: "text-[#0A66C2]",
    bgColor: "bg-[#0A66C2]/10",
    external: true,
  },
];

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <Section className="relative overflow-hidden pt-20 md:pt-32">

      <Container className="relative z-10">
        <AnimatedSection>
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </AnimatedSection>

        <div className="mx-auto mt-12 max-w-lg space-y-4">
          {contactLinks.map((link, index) => (
            <AnimatedSection key={link.key} delay={0.1 * (index + 1)}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-xl border border-border/30 bg-surface p-5 transition-all duration-300 hover:border-accent-cyan/30 hover:shadow-lg cursor-pointer"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${link.bgColor}`}
                >
                  <link.icon className={`h-6 w-6 ${link.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold truncate">
                    {link.label}
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-cyan" />
              </a>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
