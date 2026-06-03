"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedSection } from "@/components/shared/animated-section";
import { PhoneMockup } from "@/components/shared/phone-mockup";
import { ArrowRight } from "lucide-react";

export function FeaturedProject() {
  const t = useTranslations("home.featuredApp");

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6">
      <AnimatedSection>
        <GlassCard glow="accent" className="flex flex-col items-center gap-12 p-10 group md:p-14 lg:flex-row">
          {/* Text content */}
          <div className="relative z-10 order-2 w-full flex-1 lg:order-1">
            <div className="mb-4 h-0.5 w-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full" />
            <h2 className="mb-6 text-5xl font-black font-display tracking-tight text-white">
              Focus Space
            </h2>
            <p className="mt-4 text-xl font-light leading-relaxed text-zinc-400 mb-8">
              {t("description")}
            </p>
            <Link
              href="/apps"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-primary to-[#C084FC] px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(139,108,240,0.3)] hover:shadow-[0_0_40px_rgba(139,108,240,0.5)] hover:scale-[1.03] transition-all"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Phone mockup with glow */}
          <div className="relative z-10 order-1 flex w-full max-w-[320px] flex-1 justify-center lg:order-2">
            <PhoneMockup
              src="/images/apps/focus-space/screenshot-cockpit.jpg"
              alt="Focus Space"
              maxWidth="320px"
              borderWidth={8}
              hoverRotate
            />
          </div>
        </GlassCard>
      </AnimatedSection>
    </section>
  );
}
