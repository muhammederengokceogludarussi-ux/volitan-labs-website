"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ArrowRight } from "lucide-react";

export function CTA() {
  const t = useTranslations("home.cta");

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 text-center">
      <AnimatedSection>
        <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
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
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black shadow-button transition-all hover:scale-105 hover:shadow-button-hover"
          >
            {t("button")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </AnimatedSection>
    </section>
  );
}
