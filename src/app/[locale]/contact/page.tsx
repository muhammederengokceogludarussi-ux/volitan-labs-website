"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { siteConfig } from "../../../../content/site";
import { Mail, Github, Linkedin } from "lucide-react";

const contactLinks = [
  {
    key: "email",
    Icon: Mail,
    title: "Email",
    label: siteConfig.social.email,
    href: `mailto:${siteConfig.social.email}`,
    hoverBg: "group-hover:bg-white group-hover:border-white group-hover:text-black",
  },
  {
    key: "github",
    Icon: Github,
    title: "GitHub",
    label: "@volitanlabs",
    href: siteConfig.social.github,
    hoverBg: "group-hover:bg-white group-hover:border-white group-hover:text-black",
  },
  {
    key: "linkedin",
    Icon: Linkedin,
    title: "LinkedIn",
    label: "Let's connect",
    href: siteConfig.social.linkedin,
    hoverBg: "group-hover:bg-[#0a66c2] group-hover:border-[#0a66c2] group-hover:text-white",
  },
];

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="flex flex-1 flex-col justify-center pt-40 pb-32 md:pt-48">
      <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
        <AnimatedSection>
          <header className="mb-16 text-center">
            <h1 className="mb-6 font-display text-5xl font-bold tracking-tighter text-white md:text-6xl">
              {t("title")}.
            </h1>
            <p className="mx-auto max-w-lg text-xl leading-relaxed text-zinc-400">
              {t("subtitle")}
            </p>
          </header>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {contactLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target={link.key !== "email" ? "_blank" : undefined}
                rel={link.key !== "email" ? "noopener noreferrer" : undefined}
              >
                <SpotlightCard className="flex flex-col items-center p-8 text-center group hover:border-white/20 hover:-translate-y-2 transition-all duration-500">
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-all ${link.hoverBg}`}
                  >
                    <link.Icon className="h-[22px] w-[22px]" />
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-white">
                    {link.title}
                  </h3>
                  <p className="font-mono text-sm text-zinc-500">
                    {link.label}
                  </p>
                </SpotlightCard>
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
