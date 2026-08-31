"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ArrowRight, Fuel, Gamepad2, ShieldCheck } from "lucide-react";

export function FeaturedProject() {
  const t = useTranslations("home.featuredApp");

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6">
      <AnimatedSection>
        <GlassCard
          glow="accent"
          className="group grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-sky-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-300" />
              {t("label")}
            </div>

            <h2 className="font-display text-5xl font-black tracking-[-0.06em] text-white md:text-6xl">
              BLUE <span className="text-sky-400">RESCUE</span>
            </h2>
            <p className="mt-4 text-lg font-medium text-white/80">
              {t("tagline")}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
              {t("description")}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                { icon: Gamepad2, label: t("features.flight.title") },
                { icon: Fuel, label: t("features.rescue.title") },
                { icon: ShieldCheck, label: t("features.browser.title") },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-300"
                >
                  <Icon className="h-3.5 w-3.5 text-sky-300" />
                  {label}
                </span>
              ))}
            </div>

            <Link
              href="/blue-rescue"
              className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-6 py-3 font-bold text-slate-950 shadow-[0_0_24px_rgba(56,189,248,0.22)] transition-all hover:scale-[1.03] hover:shadow-[0_0_38px_rgba(56,189,248,0.4)]"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative min-h-[390px] overflow-hidden border-t border-white/10 bg-gradient-to-b from-sky-500 via-cyan-100 to-emerald-700 lg:min-h-[540px] lg:border-l lg:border-t-0">
            <div className="absolute right-10 top-10 h-20 w-20 rounded-full bg-amber-100/80 shadow-[0_0_60px_rgba(253,230,138,0.7)]" />
            <div className="absolute left-10 top-16 h-4 w-28 rounded-full bg-white/55 blur-[1px]" />
            <div className="absolute left-20 top-12 h-8 w-16 rounded-full bg-white/55 blur-[1px]" />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-emerald-950/80 [clip-path:polygon(0_46%,16%_10%,31%_52%,48%_3%,66%_58%,83%_16%,100%_45%,100%_100%,0_100%)]" />

            <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute left-1/2 top-[-24px] h-1 w-48 -translate-x-1/2 rounded-full bg-slate-900 shadow-[0_0_8px_rgba(15,23,42,0.45)] transition-transform duration-500 group-hover:scale-x-110" />
              <div className="absolute left-1/2 top-[-24px] h-7 w-1 -translate-x-1/2 bg-slate-800" />
              <div className="relative h-20 w-44 rounded-[52%_48%_42%_46%] border border-white/30 bg-gradient-to-br from-blue-500 via-sky-500 to-blue-800 shadow-2xl">
                <div className="absolute left-8 top-4 h-8 w-14 rounded-[60%_30%_45%_40%] bg-cyan-100/75" />
                <div className="absolute -right-20 top-6 h-4 w-24 -skew-y-6 bg-blue-800" />
                <div className="absolute -right-24 top-0 h-9 w-3 bg-blue-800" />
                <div className="absolute -bottom-4 left-8 h-1 w-28 rounded-full bg-slate-800" />
              </div>
              <div className="absolute left-1/2 top-24 h-24 w-40 -translate-x-1/2 bg-gradient-to-b from-white/35 to-transparent blur-md [clip-path:polygon(30%_0,70%_0,100%_100%,0_100%)]" />
            </div>

            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-2 rounded-2xl border border-white/20 bg-slate-950/75 p-4 text-white shadow-2xl backdrop-blur-md">
              <div>
                <p className="font-mono text-[10px] text-white/45">SCORE</p>
                <p className="font-display text-lg font-black">02480</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-white/45">RESCUED</p>
                <p className="font-display text-lg font-black text-sky-300">12</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-white/45">COMBO</p>
                <p className="font-display text-lg font-black text-amber-300">×4</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </AnimatedSection>
    </section>
  );
}
