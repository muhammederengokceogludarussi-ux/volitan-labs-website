"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center px-4 pt-32 pb-20 text-center sm:px-6">
      <m.div initial="hidden" animate="visible" variants={stagger}>
        {/* Status badge */}
        <m.div variants={fadeUp} className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-zinc-400 backdrop-blur-sm hover:border-white/20 transition-colors cursor-default">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-pulse" />
            {t("badge")}
          </div>
        </m.div>

        {/* Hero title */}
        <m.h1
          variants={fadeUp}
          className="mt-8 font-display text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl gradient-text-hero drop-shadow-2xl"
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
          <Link
            href="/projects"
            className="relative inline-flex h-14 w-full items-center justify-center rounded-full border border-white/20 bg-white px-8 font-medium text-black shadow-button transition-all hover:shadow-button-hover hover:scale-105 group sm:w-auto"
          >
            <span className="flex items-center gap-2">
              {t("cta_projects")}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            href="/contact"
            className="relative inline-flex h-14 w-full items-center justify-center rounded-full border border-white/10 bg-black/50 px-8 font-medium text-white backdrop-blur-xl transition-all hover:bg-white/5 sm:w-auto"
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
