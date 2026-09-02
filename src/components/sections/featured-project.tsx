"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ArrowRight, Fuel, Gamepad2, ShieldCheck } from "lucide-react";
import Image from "next/image";

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

          <div className="relative min-h-[390px] overflow-hidden border-t border-white/10 bg-[#06192d] lg:min-h-[540px] lg:border-l lg:border-t-0">
            <Image
              src="/images/games/blue-rescue/menu.png"
              alt="Blue Rescue güncel ana menüsü"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/35 via-transparent to-sky-400/5" />
          </div>
        </GlassCard>
      </AnimatedSection>
    </section>
  );
}
