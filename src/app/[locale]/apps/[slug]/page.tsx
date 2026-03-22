"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlassCard } from "@/components/ui/glass-card";

import { focusSpaceApp } from "../../../../../content/apps/focus-space";
import {
  ArrowLeft,
  ArrowRight,
  Timer,
  Trophy,
  Globe,
  Shield,
  Music,
  Users,
  Sparkles,
  Bell,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  timer: Timer,
  trophy: Trophy,
  globe: Globe,
  shield: Shield,
  music: Music,
  users: Users,
};

const appsMap: Record<string, typeof focusSpaceApp> = {
  "focus-space": focusSpaceApp,
};

export default function AppDetailPage() {
  const t = useTranslations("apps");
  const tCommon = useTranslations("common");
  const locale = useLocale() as "en" | "tr";
  const params = useParams();
  const slug = params.slug as string;

  const app = appsMap[slug];

  if (!app) {
    return (
      <Section className="pt-20 md:pt-32">
        <Container className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-[-0.03em]">App not found</h1>
          <Link
            href="/apps"
            className="mt-4 inline-flex items-center gap-2 text-accent-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {tCommon("backTo", { page: t("title") })}
          </Link>
        </Container>
      </Section>
    );
  }

  const features = app.features[locale];

  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden pt-20 md:pt-32">
        <AuroraBackground intensity="medium" />
        <Container className="relative z-10">
          <AnimatedSection>
            <Link
              href="/apps"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-[color] duration-200 hover:text-text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {tCommon("backTo", { page: t("title") })}
            </Link>
          </AnimatedSection>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Info */}
            <div>
              <AnimatedSection delay={0.1}>
                {app.status === "coming-soon" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent-secondary/10 px-3 py-1 text-xs font-medium text-accent-secondary">
                    <Sparkles className="h-3 w-3" />
                    {t("comingSoon")}
                  </span>
                )}
                {app.status === "beta" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent-primary/10 px-3 py-1 text-xs font-medium text-accent-primary">
                    <Sparkles className="h-3 w-3" />
                    {t("beta")}
                  </span>
                )}

                <div className="mt-4 flex items-center gap-4">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-floating"
                    style={{
                      background: `linear-gradient(135deg, ${app.colors.primary}, ${app.colors.accent})`,
                    }}
                  >
                    <span className="text-2xl font-bold text-white">F</span>
                  </div>
                  <div>
                    <h1 className="font-display text-3xl font-bold tracking-[-0.03em] md:text-4xl lg:text-5xl">
                      {app.name}
                    </h1>
                    <p className="mt-1 text-text-secondary">
                      {app.tagline[locale]}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                  {app.description[locale]}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {app.status !== "published" ? (
                    <button className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-primary to-[#A78BFA] px-7 py-3 text-sm font-medium text-white shadow-button transition-[box-shadow,transform] duration-200 hover:shadow-[0_0_30px_rgba(139,108,240,0.3)] hover:scale-[1.02]">
                      <Bell className="mr-2 h-4 w-4" />
                      {t("notifyMe")}
                    </button>
                  ) : (
                    <>
                      {app.playStoreUrl && (
                        <a
                          href={app.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-primary to-[#A78BFA] px-6 py-3 text-sm font-medium text-white shadow-button transition-[box-shadow,transform] duration-200 hover:shadow-[0_0_30px_rgba(139,108,240,0.3)] hover:scale-[1.02]"
                        >
                          {t("downloadOn")} Google Play
                        </a>
                      )}
                      {app.appStoreUrl && (
                        <a
                          href={app.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[border-color,background-color] duration-200 hover:border-border-hover hover:bg-surface"
                        >
                          {t("downloadOn")} App Store
                        </a>
                      )}
                    </>
                  )}
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Phone Mockup */}
            <AnimatedSection delay={0.2}>
              <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px]">
                {/* Glow behind mockup */}
                <div className="absolute inset-[-20%] rounded-full bg-accent-primary/15 blur-[80px]" />
                <div className="relative rounded-[2.5rem] border-2 border-border bg-surface-elevated p-3 shadow-floating">
                  <div
                    className="flex h-full w-full flex-col items-center justify-center rounded-[2rem]"
                    style={{ backgroundColor: app.colors.background }}
                  >
                    <div
                      className="h-20 w-20 rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${app.colors.primary}, ${app.colors.accent})`,
                      }}
                    />
                    <p className="mt-4 font-display text-xl font-bold text-white">
                      {app.name}
                    </p>
                    <p className="mt-1 text-sm" style={{ color: `${app.colors.primary}cc` }}>
                      {app.tagline[locale]}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* Features Grid */}
      <Section className="relative overflow-hidden bg-surface">
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-accent-primary">
                {t("features")}
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] md:text-4xl">
                {t("featuresTitle")}
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fade" delay={0.1}>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = iconMap[feature.icon] || Sparkles;
                return (
                  <GlassCard key={index} glow="subtle" className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent-primary/20 to-accent-primary/5">
                      <Icon className="h-5 w-5 text-accent-primary" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold tracking-[-0.03em]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {feature.description}
                    </p>
                  </GlassCard>
                );
              })}
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Screenshots Placeholder */}
      <Section className="relative overflow-hidden">
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-accent-primary">
                {t("screenshots")}
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] md:text-4xl">
                {t("screenshotsTitle")}
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fade" delay={0.1}>
            <div className="mt-12 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
              {app.screenshots.map((_, index) => (
                <div
                  key={index}
                  className="flex-none snap-center"
                >
                  <div
                    className="aspect-[9/16] w-[200px] rounded-2xl border border-border shadow-card md:w-[240px]"
                    style={{ backgroundColor: app.colors.background }}
                  >
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl">
                      <div
                        className="h-12 w-12 rounded-xl opacity-30"
                        style={{
                          background: `linear-gradient(135deg, ${app.colors.primary}, ${app.colors.accent})`,
                        }}
                      />
                      <p className="mt-3 text-xs text-text-muted">
                        Screenshot {index + 1}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="relative overflow-hidden bg-surface">
        <Container className="relative z-10 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] md:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-text-secondary">
              {t("ctaSubtitle")}
            </p>
            <div className="mt-8">
              {app.status !== "published" ? (
                <button className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-primary to-[#A78BFA] px-7 py-3 text-sm font-medium text-white shadow-button transition-[box-shadow,transform] duration-200 hover:shadow-[0_0_30px_rgba(139,108,240,0.3)] hover:scale-[1.02]">
                  <Bell className="mr-2 h-4 w-4" />
                  {t("notifyMe")}
                </button>
              ) : (
                <Link href="/contact">
                  <button className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-primary to-[#A78BFA] px-7 py-3 text-sm font-medium text-white shadow-button transition-[box-shadow,transform] duration-200 hover:shadow-[0_0_30px_rgba(139,108,240,0.3)] hover:scale-[1.02]">
                    {t("learnMore")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
              )}
            </div>
          </AnimatedSection>
        </Container>
      </Section>
    </>
  );
}
