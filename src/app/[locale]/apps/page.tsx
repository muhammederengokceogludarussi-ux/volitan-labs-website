"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import {
  ArrowRight,
  CloudSun,
  Gamepad2,
  QrCode,
  ShieldCheck,
} from "lucide-react";

export default function AppsPage() {
  const t = useTranslations("apps");
  const locale = useLocale() as "en" | "tr";

  const highlights = [
    { icon: Gamepad2, key: "instant" },
    { icon: ShieldCheck, key: "noAccount" },
    { icon: QrCode, key: "mobileReady" },
  ] as const;

  return (
    <div className="relative pb-32 pt-40 md:pt-48">
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <PageHeader title={t("title")} subtitle={t("subtitle")} />

        <AnimatedSection>
          <GlassCard
            glow="accent"
            className="grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="relative z-10 flex flex-col justify-center p-8 md:p-12">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-sky-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-300" />
                {t("blueRescue.badge")}
              </div>
              <h2 className="font-display text-5xl font-black tracking-[-0.06em] text-white md:text-6xl">
                BLUE <span className="text-sky-400">RESCUE</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
                {t("blueRescue.description")}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {highlights.map(({ icon: Icon, key }) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                  >
                    <Icon className="h-5 w-5 text-sky-300" />
                    <p className="mt-3 text-sm font-semibold text-white">
                      {t(`blueRescue.${key}`)}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href={`/${locale}/blue-rescue`}
                className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-7 py-3.5 text-sm font-black text-slate-950 transition-all hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(56,189,248,0.35)]"
              >
                {t("blueRescue.playNow")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative min-h-[380px] overflow-hidden border-t border-white/10 bg-gradient-to-b from-sky-500 via-cyan-100 to-emerald-700 lg:min-h-[560px] lg:border-l lg:border-t-0">
              <CloudSun className="absolute right-10 top-10 h-20 w-20 text-amber-100/90 drop-shadow-[0_0_28px_rgba(253,230,138,0.55)]" />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-emerald-950/80 [clip-path:polygon(0_52%,14%_20%,28%_58%,44%_8%,62%_62%,78%_22%,100%_52%,100%_100%,0_100%)]" />

              <div className="absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/20 bg-slate-950/75 p-6 text-center text-white shadow-2xl backdrop-blur-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-400/15 ring-1 ring-sky-300/25">
                  <Gamepad2 className="h-8 w-8 text-sky-300" />
                </div>
                <p className="mt-4 font-display text-xl font-black">ONE TOUCH</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/45">
                  rescue flight
                </p>
              </div>

              <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between rounded-2xl border border-white/20 bg-slate-950/80 px-5 py-4 text-xs text-white backdrop-blur-md">
                <span className="font-mono text-white/55">WEB · MOBILE · QR</span>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 font-semibold text-emerald-300">
                  LIVE
                </span>
              </div>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </div>
  );
}
