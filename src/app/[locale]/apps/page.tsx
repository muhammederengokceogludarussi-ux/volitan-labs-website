"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { focusSpaceApp } from "../../../../content/apps/focus-space";
import { Check } from "lucide-react";

const featureKeys = ["item1", "item2", "item3"] as const;

export default function AppsPage() {
  const t = useTranslations("apps");
  const locale = useLocale() as "en" | "tr";

  return (
    <div className="pt-40 pb-32 md:pt-48">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="border-b border-white/10 pb-12 text-center md:text-left">
          <AnimatedSection>
            <h1 className="mb-6 font-display text-5xl font-bold tracking-tighter text-white md:text-6xl">
              {t("title")}.
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed text-zinc-400">
              {t("subtitle")}
            </p>
          </AnimatedSection>
        </header>

        {/* Focus Space Feature Card */}
        <AnimatedSection>
          <SpotlightCard className="flex flex-col items-center gap-12 p-8 group md:p-12 lg:flex-row hover:border-white/10 transition-colors duration-500">
            {/* Left: Content */}
            <div className="order-2 w-full flex-1 lg:order-1 relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs tracking-wide text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
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
                    <div className="rounded bg-white/5 p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    {t(`featureHighlights.${key}`)}
                  </li>
                ))}
              </ul>

              <button className="rounded-full border border-white/10 bg-black/50 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-black group-hover:shadow-glow">
                {t("viewFeatures")}
              </button>
            </div>

            {/* Right: Phone mockup */}
            <div
              className="order-1 flex w-full max-w-[300px] flex-1 justify-center lg:order-2 relative z-10"
              style={{ perspective: "1000px" }}
            >
              <div className="w-full overflow-hidden rounded-[2.5rem] border-[6px] border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,1)] aspect-[1/2] group-hover:[transform:rotateY(15deg)] group-hover:-translate-y-4 transition-all duration-700 relative">
                <Image
                  src="/images/apps/focus-space/screenshot-cockpit.jpg"
                  alt="Focus Space App Preview"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>
          </SpotlightCard>
        </AnimatedSection>
      </div>
    </div>
  );
}
