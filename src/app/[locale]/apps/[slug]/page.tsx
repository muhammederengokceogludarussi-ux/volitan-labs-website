"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { NotFoundSection } from "@/components/shared/not-found-section";
import { BackLink } from "@/components/shared/back-link";
import { StatusBadge } from "@/components/shared/status-badge";
import { IconBadge } from "@/components/shared/icon-badge";
import { GlassCard } from "@/components/ui/glass-card";

import { focusSpaceApp } from "../../../../../content/apps/focus-space";
import {
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
      <NotFoundSection
        title={locale === "tr" ? "Uygulama bulunamadı" : "App not found"}
        backHref="/apps"
        backLabel={tCommon("backTo", { page: t("title") })}
      />
    );
  }

  const features = app.features[locale];

  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden pt-20 md:pt-32">
        <Container className="relative z-10">
          <AnimatedSection>
            <BackLink href="/apps" label={tCommon("backTo", { page: t("title") })} />
          </AnimatedSection>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Info */}
            <div>
              <AnimatedSection delay={0.1}>
                {app.status === "coming-soon" && (
                  <StatusBadge label={t("comingSoon")} variant="secondary" />
                )}
                {app.status === "beta" && (
                  <StatusBadge label={t("beta")} variant="primary" />
                )}

                <div className="mt-4 flex items-center gap-4">
                  <Image
                    src={app.icon}
                    alt={app.name}
                    width={64}
                    height={64}
                    className="rounded-2xl shadow-floating"
                  />
                  <div>
                    <h1 className="font-display text-3xl font-bold tracking-[-0.03em] md:text-4xl lg:text-5xl gradient-text-animated">
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
                    <button className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-primary to-[#A78BFA] px-7 py-3 text-sm font-medium text-white shadow-[0_0_20px_rgba(139,108,240,0.3)] transition-all hover:shadow-[0_0_40px_rgba(139,108,240,0.5)] hover:scale-[1.02]">
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
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-primary to-[#A78BFA] px-6 py-3 text-sm font-medium text-white shadow-[0_0_20px_rgba(139,108,240,0.3)] transition-all hover:shadow-[0_0_40px_rgba(139,108,240,0.5)] hover:scale-[1.02]"
                        >
                          {t("downloadOn")} Google Play
                        </a>
                      )}
                      {app.appStoreUrl && (
                        <a
                          href={app.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all hover:border-[var(--glass-border-hover)]"
                        >
                          {t("downloadOn")} App Store
                        </a>
                      )}
                    </>
                  )}
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Phone Mockup with real screenshot */}
            <AnimatedSection delay={0.2}>
              <div className="relative mx-auto w-full max-w-[300px]">
                {/* Glow behind mockup */}
                <div className="absolute inset-[-20%] rounded-full bg-accent-primary/15 blur-[80px]" />
                <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-zinc-900 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
                  <Image
                    src={app.screenshots[0]}
                    alt={`${app.name} screenshot`}
                    width={300}
                    height={650}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* Features Grid */}
      <Section className="relative overflow-hidden">
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
                  <GlassCard key={index} glow="accent" className="p-6 group">
                    <IconBadge icon={Icon} size="md" />
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

      {/* Screenshots — Real images */}
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
              {app.screenshots.map((src, index) => (
                <div key={index} className="flex-none snap-center">
                  <div className="overflow-hidden rounded-[2rem] border-[4px] border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.6)] w-[200px] md:w-[240px] transition-transform hover:scale-[1.02] hover:-translate-y-1">
                    <Image
                      src={src}
                      alt={`${app.name} screenshot ${index + 1}`}
                      width={240}
                      height={520}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="relative overflow-hidden">
        <Container className="relative z-10 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] md:text-4xl gradient-text-animated">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-text-secondary">
              {t("ctaSubtitle")}
            </p>
            <div className="mt-8">
              {app.status !== "published" ? (
                <button className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-primary to-[#A78BFA] px-7 py-3 text-sm font-medium text-white shadow-[0_0_20px_rgba(139,108,240,0.3)] transition-all hover:shadow-[0_0_40px_rgba(139,108,240,0.5)] hover:scale-[1.02]">
                  <Bell className="mr-2 h-4 w-4" />
                  {t("notifyMe")}
                </button>
              ) : (
                <Link href="/contact">
                  <button className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-primary to-[#A78BFA] px-7 py-3 text-sm font-medium text-white shadow-[0_0_20px_rgba(139,108,240,0.3)] transition-all hover:shadow-[0_0_40px_rgba(139,108,240,0.5)] hover:scale-[1.02]">
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
