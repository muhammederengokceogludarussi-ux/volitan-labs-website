"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const placeholderPosts = [
  {
    key: "post1",
    date: "2025-01-15",
    readTime: 5,
  },
  {
    key: "post2",
    date: "2025-01-10",
    readTime: 8,
  },
  {
    key: "post3",
    date: "2025-01-05",
    readTime: 4,
  },
] as const;

export function BlogPreview() {
  const t = useTranslations("home.blog");
  const tBlog = useTranslations("blog");

  return (
    <Section className="bg-surface">
      <Container>
        <div className="flex items-end justify-between">
          <AnimatedSection>
            <SectionHeading
              label={t("label")}
              title={t("title")}
              subtitle={t("subtitle")}
              align="left"
            />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Link
              href="/blog"
              className="hidden items-center gap-1 text-sm font-medium text-accent-cyan transition-colors hover:text-accent-cyan/80 sm:inline-flex"
            >
              {tBlog("allPosts") ?? "All Posts"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {placeholderPosts.map((post, index) => (
            <AnimatedSection key={post.key} delay={0.1 * (index + 1)}>
              <article className="group rounded-xl border border-border/30 bg-background p-5 transition-all duration-300 hover:border-accent-cyan/30 hover:shadow-lg">
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
                <h3 className="mt-3 font-display text-lg font-semibold transition-colors group-hover:text-accent-cyan">
                  {t(`posts.${post.key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-text-secondary line-clamp-2">
                  {t(`posts.${post.key}.description`)}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan opacity-0 transition-all group-hover:opacity-100">
                  {tBlog("readMore")}
                  <ArrowRight className="h-3 w-3" />
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent-cyan"
            >
              {tBlog("allPosts") ?? "All Posts"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
