"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { focusSpaceApp } from "../../../../content/apps/focus-space";
import { ArrowRight, Sparkles } from "lucide-react";

const apps = [focusSpaceApp];

export default function AppsPage() {
  const t = useTranslations("apps");
  const locale = useLocale() as "en" | "tr";

  return (
    <>
      <Section className="pt-20 md:pt-32">
        <Container>
          <AnimatedSection>
            <SectionHeading title={t("title")} subtitle={t("subtitle")} />
          </AnimatedSection>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {apps.map((app, index) => (
              <AnimatedSection key={app.slug} delay={0.1 * (index + 1)}>
                <Link href={`/apps/${app.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-surface p-6 transition-all duration-300 hover:border-accent-cyan/30 hover:shadow-xl">
                    {/* Status Badge */}
                    {app.status === "coming-soon" && (
                      <div className="absolute right-4 top-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent-amber/10 px-3 py-1 text-xs font-medium text-accent-amber">
                          <Sparkles className="h-3 w-3" />
                          {t("comingSoon")}
                        </span>
                      </div>
                    )}
                    {app.status === "beta" && (
                      <div className="absolute right-4 top-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent-purple/10 px-3 py-1 text-xs font-medium text-accent-purple">
                          <Sparkles className="h-3 w-3" />
                          {t("beta")}
                        </span>
                      </div>
                    )}

                    {/* App Icon */}
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${app.colors.primary}, ${app.colors.accent})`,
                      }}
                    >
                      <span className="text-2xl font-bold text-white">
                        {app.name.charAt(0)}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="mt-4 font-display text-xl font-bold transition-colors group-hover:text-accent-cyan">
                      {app.name}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">
                      {app.tagline[locale]}
                    </p>
                    <p className="mt-3 text-sm text-text-secondary line-clamp-3">
                      {app.description[locale]}
                    </p>

                    {/* CTA */}
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan transition-transform group-hover:translate-x-1">
                      {t("learnMore")}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
