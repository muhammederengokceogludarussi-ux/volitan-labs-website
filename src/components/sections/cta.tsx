"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/shared/animated-section";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { ArrowRight } from "lucide-react";

export function CTA() {
  const t = useTranslations("home.cta");

  return (
    <section className="relative mx-auto w-full max-w-[1200px] overflow-hidden px-4 py-20 sm:px-6 text-center">
      <BackgroundGrid variant="lines" className="opacity-20" />

      <div className="relative z-10">
        <AnimatedSection>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl gradient-text-animated">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-zinc-400">
            {t("subtitle")}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-primary to-[#C084FC] px-8 py-4 text-base font-semibold text-white shadow-[0_0_20px_rgba(139,108,240,0.3)] transition-all hover:shadow-[0_0_40px_rgba(139,108,240,0.5)] hover:scale-[1.02]"
            >
              {t("button")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
