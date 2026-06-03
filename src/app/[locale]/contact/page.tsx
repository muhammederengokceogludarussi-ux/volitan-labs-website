"use client";

import { useTranslations, useLocale } from "next-intl";
import { AnimatedSection } from "@/components/shared/animated-section";
import { PageHeader } from "@/components/shared/page-header";
import { IconBadge } from "@/components/shared/icon-badge";
import { GlassCard } from "@/components/ui/glass-card";
import { siteConfig } from "../../../../content/site";
import { Mail, Github, Linkedin } from "lucide-react";

const contactLinks = [
  {
    key: "email",
    Icon: Mail,
    title: { en: "Email", tr: "E-posta" },
    label: { en: siteConfig.social.email, tr: siteConfig.social.email },
    href: `mailto:${siteConfig.social.email}`,
  },
  {
    key: "github",
    Icon: Github,
    title: { en: "GitHub", tr: "GitHub" },
    label: { en: "@volitanlabs", tr: "@volitanlabs" },
    href: siteConfig.social.github,
  },
  {
    key: "linkedin",
    Icon: Linkedin,
    title: { en: "LinkedIn", tr: "LinkedIn" },
    label: { en: "Let's connect", tr: "Bağlantı kuralım" },
    href: siteConfig.social.linkedin,
  },
];

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale() as "en" | "tr";

  return (
    <div className="relative flex flex-1 flex-col justify-center pt-40 pb-32 md:pt-48">

      <div className="relative z-10 mx-auto w-full max-w-[800px] px-4 sm:px-6">
        <PageHeader
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
          className="mb-16"
        />

        <AnimatedSection delay={0.15}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {contactLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target={link.key !== "email" ? "_blank" : undefined}
                rel={link.key !== "email" ? "noopener noreferrer" : undefined}
              >
                <GlassCard glow="accent" className="flex flex-col items-center p-8 text-center group hover:-translate-y-2 transition-all duration-500">
                  <div className="mb-6">
                    <IconBadge icon={link.Icon} size="lg" />
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-white">
                    {link.title[locale]}
                  </h3>
                  <p className="font-mono text-sm text-zinc-500">
                    {link.label[locale]}
                  </p>
                </GlassCard>
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
