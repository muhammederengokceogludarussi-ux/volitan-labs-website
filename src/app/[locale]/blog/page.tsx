"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  slug: string;
  title: { en: string; tr: string };
  description: { en: string; tr: string };
  date: string;
  readTime: number;
  tags: string[];
}

const posts: BlogPost[] = [
  {
    slug: "how-engineering-thinking-shapes-app-development",
    title: {
      en: "How Engineering Thinking Shapes My App Development",
      tr: "Mühendislik Düşüncesi Uygulama Geliştirmemi Nasıl Şekillendiriyor",
    },
    description: {
      en: "How studying mechanical engineering at METU influences my approach to building mobile apps — from CAD to code.",
      tr: "ODTÜ'de makine mühendisliği okumanın mobil uygulama geliştirme yaklaşımımı nasıl etkilediği — CAD'den koda.",
    },
    date: "2025-01-15",
    readTime: 5,
    tags: ["Engineering", "Mobile", "Flutter"],
  },
  {
    slug: "building-focus-space-flutter-journey",
    title: {
      en: "Building Focus Space: A Flutter Journey",
      tr: "Focus Space'i İnşa Etmek: Bir Flutter Yolculuğu",
    },
    description: {
      en: "Behind the scenes of creating a gamified productivity app with Flutter and AI assistance.",
      tr: "Flutter ve yapay zeka desteği ile oyunlaştırılmış verimlilik uygulaması oluşturmanın perde arkası.",
    },
    date: "2025-01-10",
    readTime: 8,
    tags: ["Flutter", "Productivity", "AI"],
  },
  {
    slug: "ai-augmented-development-workflow",
    title: {
      en: "AI-Augmented Development: My Workflow",
      tr: "Yapay Zeka Destekli Geliştirme: İş Akışım",
    },
    description: {
      en: "How I use AI tools to accelerate development without sacrificing code quality.",
      tr: "Kod kalitesinden ödün vermeden geliştirmeyi hızlandırmak için yapay zeka araçlarını nasıl kullanıyorum.",
    },
    date: "2025-01-05",
    readTime: 4,
    tags: ["AI", "Workflow", "Productivity"],
  },
];

export default function BlogPage() {
  const t = useTranslations("blog");
  const locale = useLocale() as "en" | "tr";

  return (
    <Section className="pt-20 md:pt-32">
      <Container>
        <AnimatedSection>
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </AnimatedSection>

        {posts.length === 0 ? (
          <AnimatedSection delay={0.2}>
            <p className="mt-12 text-center text-text-secondary">
              {t("noPosts")}
            </p>
          </AnimatedSection>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <AnimatedSection key={post.slug} delay={0.1 * (index + 1)}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="h-full rounded-xl border-l-2 border border-border/30 border-l-transparent bg-surface p-6 transition-all duration-300 hover:border-accent-cyan/30 hover:border-l-accent-cyan hover:shadow-lg">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-accent-purple/10 px-2.5 py-0.5 text-xs font-medium text-accent-purple"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="mt-4 font-display text-lg font-semibold transition-colors group-hover:text-accent-cyan">
                      {post.title[locale]}
                    </h2>

                    {/* Description */}
                    <p className="mt-2 text-sm text-text-secondary line-clamp-3">
                      {post.description[locale]}
                    </p>

                    {/* Meta */}
                    <div className="mt-4 flex items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime} {t("minRead")}
                      </span>
                    </div>

                    {/* Read More */}
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan opacity-0 transition-all group-hover:opacity-100">
                      {t("readMore")}
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
