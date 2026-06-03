"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { staggerContainer, fadeUp } from "@/lib/animations";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-20 text-center sm:px-6">
      <BackgroundGrid variant="dots" className="opacity-30" />

      <m.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10">
        {/* Status badge */}
        <m.div variants={fadeUp} className="flex justify-center">
          <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-zinc-400 hover:border-white/20 transition-colors cursor-default">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(139,108,240,0.6)] animate-pulse" />
            {t("badge")}
          </div>
        </m.div>

        {/* Hero title — animated gradient */}
        <m.h1
          variants={fadeUp}
          className="mt-8 font-display text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl gradient-text-animated"
        >
          {t("title")}
        </m.h1>

        {/* Description */}
        <m.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-zinc-400 sm:text-xl"
        >
          {t("description")}
        </m.p>

        {/* CTA Buttons */}
        <m.div
          variants={fadeUp}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
        >
          {/* Primary: gradient + glow */}
          <Link
            href="/projects"
            className="relative inline-flex h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-accent-primary to-[#C084FC] px-8 font-medium text-white shadow-[0_0_20px_rgba(139,108,240,0.3)] transition-all hover:shadow-[0_0_40px_rgba(139,108,240,0.5)] hover:scale-[1.03] group sm:w-auto"
          >
            <span className="flex items-center gap-2">
              {t("cta_projects")}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          {/* Secondary: glassmorphic */}
          <Link
            href="/contact"
            className="glass relative inline-flex h-14 w-full items-center justify-center rounded-full px-8 font-medium text-white transition-all hover:border-[var(--glass-border-hover)] hover:shadow-[var(--shadow-glow)] hover:bg-white/5 sm:w-auto"
          >
            <span className="flex items-center gap-2">
              {t("cta_contact")}
            </span>
          </Link>
        </m.div>
      </m.div>
    </section>
  );
}
