"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { NotFoundSection } from "@/components/shared/not-found-section";
import { BackLink } from "@/components/shared/back-link";
import { TagList } from "@/components/shared/tag-list";

import Image from "next/image";
import {
  ArrowRight,
  Github,
  ExternalLink,
} from "lucide-react";

interface ProjectDetail {
  slug: string;
  title: { en: string; tr: string };
  description: { en: string; tr: string };
  longDescription: { en: string; tr: string };
  tags: string[];
  github?: string;
  live?: string;
  icon?: string;
  screenshots?: string[];
  features: { en: string[]; tr: string[] };
}

const projectDetails: Record<string, ProjectDetail> = {
  "blue-rescue": {
    slug: "blue-rescue",
    title: { en: "Blue Rescue", tr: "Blue Rescue" },
    description: {
      en: "A lightweight one-touch rescue game that runs directly in the browser.",
      tr: "Doğrudan tarayıcıda çalışan hafif, tek dokunuşlu bir kurtarma oyunu.",
    },
    longDescription: {
      en: "Blue Rescue is a compact browser game built around a single interaction: hold to climb and release to descend. The challenge comes from balancing helicopter momentum, fuel, obstacles, and rescue timing. It includes combo scoring, shield and fuel pickups, day-to-night transitions, local high scores, and a QR flow designed for instant mobile play.",
      tr: "Blue Rescue, tek bir etkileşim üzerine kurulu kompakt bir tarayıcı oyunudur: yükselmek için basılı tutun, alçalmak için bırakın. Zorluk; helikopter ivmesini, yakıtı, engelleri ve kurtarma zamanlamasını dengelemekten gelir. Kombo puanlama, kalkan ve yakıt destekleri, gündüz-gece geçişi, yerel rekor kaydı ve telefonda anında oynamak için QR akışı içerir.",
    },
    tags: ["JavaScript", "Canvas", "Game Physics", "Responsive Web"],
    live: "https://www.volitanlabs.dev/games/blue-rescue/index.html",
    features: {
      en: [
        "One-touch helicopter controls with momentum-based flight",
        "Rescue chains and combo-driven scoring",
        "Fuel management with shield and fuel pickups",
        "Dynamic day-to-night environment transitions",
        "Local high scores without an account",
        "Responsive mobile play through a shareable QR link",
      ],
      tr: [
        "İvmeye dayalı tek dokunuşlu helikopter kontrolü",
        "Kurtarma zincirleri ve kombo odaklı puanlama",
        "Kalkan ve yakıt destekleriyle kaynak yönetimi",
        "Dinamik gündüz-gece ortam geçişleri",
        "Hesap gerektirmeyen yerel rekor kaydı",
        "Paylaşılabilir QR bağlantısıyla mobil uyumlu oyun",
      ],
    },
  },
  "teknofest-combat-uav": {
    slug: "teknofest-combat-uav",
    title: {
      en: "TEKNOFEST 2022 — Combat UAV",
      tr: "TEKNOFEST 2022 — Savaşan İHA",
    },
    description: {
      en: "ANATEK Team's combat UAV project that reached the TEKNOFEST 2022 finals.",
      tr: "TEKNOFEST 2022 finaline ulaşan ANATEK Takımı'nın savaşan İHA projesi.",
    },
    longDescription: {
      en: "As the Mechanical Coordinator of the ANATEK Team, I led the structural design and analysis of our combat UAV for the TEKNOFEST 2022 Savaşan İHA Competition. Our team successfully reached the finals — a significant achievement among hundreds of competing teams. My responsibilities included airframe design using Siemens NX, aerodynamic analysis with XFLR5, structural integrity validation, and coordinating the manufacturing process.",
      tr: "ANATEK Takımı'nın Mekanik Koordinatörü olarak, TEKNOFEST 2022 Savaşan İHA Yarışması için savaşan İHA'mızın yapısal tasarımını ve analizini yönettim. Takımımız yüzlerce rakip takım arasından başarıyla finale ulaştı. Sorumluluklarım arasında Siemens NX ile gövde tasarımı, XFLR5 ile aerodinamik analiz, yapısal bütünlük doğrulaması ve üretim sürecinin koordinasyonu vardı.",
    },
    tags: [
      "UAV Design",
      "Siemens NX",
      "XFLR5",
      "CAD/CAM",
      "Aerodynamics",
      "TEKNOFEST",
    ],
    features: {
      en: [
        "Airframe structural design (Siemens NX)",
        "Aerodynamic analysis and optimization (XFLR5)",
        "Composite material selection and analysis",
        "Manufacturing process coordination",
        "Weight optimization for flight performance",
        "TEKNOFEST 2022 Finalist — among top teams nationally",
      ],
      tr: [
        "Gövde yapısal tasarımı (Siemens NX)",
        "Aerodinamik analiz ve optimizasyon (XFLR5)",
        "Kompozit malzeme seçimi ve analizi",
        "Üretim sürecinin koordinasyonu",
        "Uçuş performansı için ağırlık optimizasyonu",
        "TEKNOFEST 2022 Finalisti — ulusal çapta en iyi takımlar arasında",
      ],
    },
  },
  "volitan-labs-website": {
    slug: "volitan-labs-website",
    title: { en: "Volitan Labs Website", tr: "Volitan Labs Web Sitesi" },
    description: {
      en: "A modern portfolio and app showcase website built with Next.js.",
      tr: "Next.js ile geliştirilmiş modern portfolyo ve uygulama vitrin sitesi.",
    },
    longDescription: {
      en: "This very website! Built as a bilingual, dark/light mode portfolio with rich animations. Features include internationalization with next-intl, theme switching, Magic UI components, and optimized performance with LazyMotion.",
      tr: "Şu anda baktığınız site! Zengin animasyonlarla çift dilli, koyu/açık temalı portfolyo olarak geliştirildi. next-intl ile uluslararasılaştırma, tema değiştirme, Magic UI bileşenleri ve LazyMotion ile optimize edilmiş performans içeriyor.",
    },
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Framer Motion"],
    live: "https://volitanlabs.dev",
    features: {
      en: [
        "Bilingual support (EN/TR)",
        "Dark and light mode",
        "Rich scroll animations",
        "Responsive design",
        "SEO optimized with JSON-LD",
        "Lighthouse score 90+",
      ],
      tr: [
        "Çift dil desteği (EN/TR)",
        "Koyu ve açık tema",
        "Zengin kaydırma animasyonları",
        "Duyarlı tasarım",
        "JSON-LD ile SEO optimize",
        "Lighthouse skoru 90+",
      ],
    },
  },
};

export default function ProjectDetailPage() {
  const t = useTranslations("projects");
  const tCommon = useTranslations("common");
  const locale = useLocale() as "en" | "tr";
  const params = useParams();
  const slug = params.slug as string;

  const project = projectDetails[slug];

  if (!project) {
    return (
      <NotFoundSection
        title={t("notFound")}
        backHref="/projects"
        backLabel={tCommon("backTo", { page: t("title") })}
      />
    );
  }

  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden pt-20 md:pt-32">
        <Container className="relative z-10">
          <AnimatedSection>
            <BackLink href="/projects" label={tCommon("backTo", { page: t("title") })} />

            <div className="mt-6 flex items-center gap-4">
              {project.icon && (
                <Image
                  src={project.icon}
                  alt={project.title[locale]}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-2xl"
                />
              )}
              <h1 className="font-display text-4xl font-bold tracking-[-0.03em] md:text-5xl">
                {project.title[locale]}
              </h1>
            </div>

            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-text-secondary">
              {project.longDescription[locale]}
            </p>

            <TagList tags={project.tags} variant="glass" className="mt-6" />

            {(project.github || project.live) && (
              <div className="mt-6 flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-[border-color,background-color] duration-200 hover:border-border-hover hover:bg-surface"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent-primary px-6 py-3 text-sm font-medium text-white shadow-button transition-[background-color,box-shadow] duration-200 hover:shadow-card-hover"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {t("liveDemo")}
                  </a>
                )}
              </div>
            )}
          </AnimatedSection>
        </Container>
      </Section>

      {/* Features */}
      <Section className="relative overflow-hidden bg-surface">
        <Container className="relative z-10">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-3xl">
              {t("features")}
            </h2>
          </AnimatedSection>

          <AnimatedSection variant="fade" delay={0.1}>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {project.features[locale].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 shadow-card">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-primary/10">
                    <ArrowRight className="h-3 w-3 text-accent-primary" />
                  </div>
                  <p className="text-sm leading-relaxed text-text-secondary">{feature}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Screenshots */}
      {project.screenshots && project.screenshots.length > 0 && (
        <Section className="relative overflow-hidden">
          <Container className="relative z-10">
            <AnimatedSection>
              <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-3xl">
                {t("screenshots")}
              </h2>
            </AnimatedSection>
            <AnimatedSection variant="fade" delay={0.1}>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
                {project.screenshots.map((src, index) => (
                  <div key={index} className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
                    <Image
                      src={src}
                      alt={`${project.title[locale]} screenshot ${index + 1}`}
                      width={390}
                      height={844}
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </Container>
        </Section>
      )}
    </>
  );
}
