"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import { PageHeader } from "@/components/shared/page-header";
import { PhoneMockup } from "@/components/shared/phone-mockup";
import { GlassCard } from "@/components/ui/glass-card";
import { focusSpaceApp } from "../../../../content/apps/focus-space";
import { ArrowRight, Check, Gamepad2, QrCode } from "lucide-react";

const featureKeys = ["item1", "item2", "item3"] as const;

export default function AppsPage() {
  const t = useTranslations("apps");
  const locale = useLocale() as "en" | "tr";

  return (
    <div className="relative pt-40 pb-32 md:pt-48">

      <div className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col gap-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader title={t("title")} subtitle={t("subtitle")} />

        {/* Focus Space Feature Card */}
        <AnimatedSection>
          <GlassCard glow="accent" className="flex flex-col items-center gap-12 p-8 group md:p-12 lg:flex-row">
            {/* Left: Content */}
            <div className="order-2 w-full flex-1 lg:order-1 relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-primary/20 bg-accent-primary/5 px-3 py-1.5 font-mono text-xs tracking-wide text-accent-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-primary animate-pulse" />
                {t("badge")}
              </div>

              <h2 className="mb-6 text-4xl font-bold text-white font-display md:text-5xl">
                Focus Space
              </h2>

              <p className="mb-8 text-lg leading-relaxed text-zinc-400">
                {focusSpaceApp.description[locale]}
              </p>

              <ul className="mb-10 flex flex-col gap-4 text-sm text-zinc-300 md:text-base">
                {featureKeys.map((key) => (
                  <li
                    key={key}
                    className="flex cursor-default items-center gap-4 transition-transform hover:translate-x-1"
                  >
                    <div className="rounded bg-accent-primary/10 p-1">
                      <Check className="h-4 w-4 text-accent-primary" />
                    </div>
                    {t(`featureHighlights.${key}`)}
                  </li>
                ))}
              </ul>

              <Link
                href={`/${locale}/apps/focus-space`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-primary to-[#C084FC] px-6 py-3 text-sm font-medium text-white shadow-[0_0_20px_rgba(139,108,240,0.3)] hover:shadow-[0_0_40px_rgba(139,108,240,0.5)] hover:scale-[1.03] transition-all"
              >
                {t("viewFeatures")}
              </Link>
            </div>

            {/* Right: Phone mockup */}
            <div className="order-1 flex w-full flex-1 justify-center lg:order-2 relative z-10">
              <PhoneMockup
                src="/images/apps/focus-space/screenshot-cockpit.jpg"
                alt="Focus Space App Preview"
                hoverRotate
              />
            </div>
          </GlassCard>
        </AnimatedSection>

        {/* Blue Rescue playable game */}
        <AnimatedSection delay={0.1}>
          <GlassCard className="group grid overflow-hidden p-8 md:p-10 lg:grid-cols-[1fr_280px] lg:items-center lg:gap-12">
            <div className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1.5 font-mono text-xs tracking-wide text-sky-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-300" />
                {t("blueRescue.badge")}
              </div>
              <h2 className="font-display text-4xl font-black tracking-[-0.05em] text-white md:text-5xl">
                BLUE <span className="text-sky-400">RESCUE</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
                {t("blueRescue.description")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-300">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <Gamepad2 className="h-4 w-4 text-sky-300" />
                  {t("blueRescue.oneTouch")}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <QrCode className="h-4 w-4 text-sky-300" />
                  {t("blueRescue.mobileReady")}
                </span>
              </div>
              <Link
                href={`/${locale}/blue-rescue`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-6 py-3 text-sm font-bold text-slate-950 transition-all hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(56,189,248,0.35)]"
              >
                {t("blueRescue.playNow")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative mt-10 hidden min-h-64 overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-b from-sky-400 via-cyan-100 to-emerald-700 shadow-[0_0_60px_rgba(56,189,248,0.15)] sm:block lg:mt-0">
              <div className="absolute right-8 top-8 h-16 w-16 rounded-full bg-amber-200/80" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-emerald-900/70 [clip-path:polygon(0_40%,18%_0,40%_55%,58%_10%,78%_60%,100%_20%,100%_100%,0_100%)]" />
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-2xl border border-white/30 bg-slate-950/75 px-5 py-4 text-white shadow-xl backdrop-blur-md">
                <Gamepad2 className="h-7 w-7 text-sky-300" />
                <div>
                  <div className="font-display text-lg font-black">BLUE RESCUE</div>
                  <div className="text-xs text-white/60">VOLITAN LABS</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </div>
  );
}
