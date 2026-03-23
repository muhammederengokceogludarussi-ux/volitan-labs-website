"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const placeholderPosts = [
  { key: "post1", date: "2025-01-15", readTime: 5 },
  { key: "post2", date: "2025-01-10", readTime: 8 },
  { key: "post3", date: "2025-01-05", readTime: 4 },
] as const;

export function BlogPreview() {
  const t = useTranslations("home.blog");
  const tBlog = useTranslations("blog");

  return (
    <Section className="relative overflow-hidden">
      <AuroraBackground intensity="subtle" />

      <Container className="relative z-10">
        <div className="flex items-end justify-between">
          <AnimatedSection>
            <SectionHeading
              title={t("title")}
              subtitle={t("subtitle")}
              align="left"
            />
          </AnimatedSection>
          <AnimatedSection delay={0.1} variant="fade">
            <Link
              href="/blog"
              className="hidden items-center gap-1 text-sm font-medium text-accent-primary transition-colors duration-200 hover:text-accent-primary/80 sm:inline-flex"
            >
              {tBlog("allPosts")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {placeholderPosts.map((post, i) => (
            <AnimatedSection key={post.key} delay={i * 0.05}>
              <GlassCard
                as="article"
                glow="subtle"
                className="p-5 h-full"
              >
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime} {tBlog("minRead")}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold transition-colors duration-200 group-hover:text-accent-primary">
                  {t(`posts.${post.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-2">
                  {t(`posts.${post.key}.description`)}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-primary">
                  {tBlog("readMore")}
                  <ArrowRight className="h-3 w-3" />
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent-primary"
          >
            {tBlog("allPosts")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
