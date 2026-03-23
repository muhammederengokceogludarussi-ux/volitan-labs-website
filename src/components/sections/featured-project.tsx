"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedSection } from "@/components/shared/animated-section";
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
          <div className="relative z-10 order-1 flex w-full max-w-[320px] flex-1 justify-center lg:order-2" style={{ perspective: "1000px" }}>
            {/* Glow behind mockup */}
            <div className="absolute inset-[-15%] rounded-full bg-accent-primary/15 blur-[80px]" />
            <div className="relative w-full overflow-hidden rounded-[2.5rem] border-[8px] border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,1)] aspect-[1/2] group-hover:[transform:rotateY(10deg)] group-hover:-translate-y-4 transition-all duration-700">
              <Image
                src="/images/apps/focus-space/screenshot-cockpit.jpg"
                alt="Focus Space"
                fill
                className="object-cover"
                sizes="320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </GlassCard>
      </AnimatedSection>
    </section>
  );
}
