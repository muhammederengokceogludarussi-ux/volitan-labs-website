"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ShimmerButton } from "@/components/ui/shimmer-button";
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
          <h1 className="font-display text-3xl font-bold">App not found</h1>
          <Link
            href="/apps"
            className="mt-4 inline-flex items-center gap-2 text-accent-cyan"
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
        {/* Background gradient */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${app.colors.primary}40, transparent)`,
          }}
        />

        <Container className="relative">
          <AnimatedSection>
            <Link
              href="/apps"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
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
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent-amber/10 px-3 py-1 text-xs font-medium text-accent-amber">
                    <Sparkles className="h-3 w-3" />
                    {t("comingSoon")}
                  </span>
                )}
                {app.status === "beta" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent-purple/10 px-3 py-1 text-xs font-medium text-accent-purple">
                    <Sparkles className="h-3 w-3" />
                    {t("beta")}
                  </span>
                )}
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="mt-4 flex items-center gap-4">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${app.colors.primary}, ${app.colors.accent})`,
                    }}
                  >
                    <span className="text-2xl font-bold text-white">F</span>
                  </div>
                  <div>
                    <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                      {app.name}
                    </h1>
                    <p className="mt-1 text-text-secondary">
                      {app.tagline[locale]}
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                  {app.description[locale]}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {app.status !== "published" ? (
                    <ShimmerButton className="text-sm font-medium">
                      <Bell className="mr-2 h-4 w-4" />
                      {t("notifyMe")}
                    </ShimmerButton>
                  ) : (
                    <>
                      {app.playStoreUrl && (
                        <a
                          href={app.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-accent-cyan px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
                        >
                          {t("downloadOn")} Google Play
                        </a>
                      )}
                      {app.appStoreUrl && (
                        <a
                          href={app.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-border/50 px-6 py-3 text-sm font-medium transition-all hover:border-accent-cyan/30 hover:bg-surface"
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
            <AnimatedSection delay={0.3}>
              <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px] rounded-[2.5rem] border-2 border-border/30 bg-surface-elevated p-3 shadow-2xl">
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
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* Features Grid */}
      <Section className="bg-surface">
        <Container>
          <AnimatedSection>
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-accent-cyan">
                {t("features")}
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
                {t("featuresTitle")}
              </h2>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Sparkles;
              return (
                <AnimatedSection key={index} delay={0.1 * (index + 1)}>
                  <div className="rounded-xl border border-border/30 bg-background p-6 transition-all duration-300 hover:border-accent-cyan/20 hover:shadow-lg">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-cyan/10"
                    >
                      <Icon className="h-5 w-5 text-accent-cyan" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Screenshots Placeholder */}
      <Section>
        <Container>
          <AnimatedSection>
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-accent-cyan">
                {t("screenshots")}
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
                {t("screenshotsTitle")}
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mt-12 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
              {app.screenshots.map((_, index) => (
                <div
                  key={index}
                  className="flex-none snap-center"
                >
                  <div
                    className="aspect-[9/16] w-[200px] rounded-2xl border border-border/30 md:w-[240px]"
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
      <Section className="bg-surface">
        <Container className="text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
              {t("ctaSubtitle")}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="mt-8">
              {app.status !== "published" ? (
                <ShimmerButton className="text-sm font-medium">
                  <Bell className="mr-2 h-4 w-4" />
                  {t("notifyMe")}
                </ShimmerButton>
              ) : (
                <Link href="/contact">
                  <ShimmerButton className="text-sm font-medium">
                    {t("learnMore")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </ShimmerButton>
                </Link>
              )}
            </div>
          </AnimatedSection>
        </Container>
      </Section>
    </>
  );
}
