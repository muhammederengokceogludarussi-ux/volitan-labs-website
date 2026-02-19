"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import {
  ArrowLeft,
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
  features: { en: string[]; tr: string[] };
}

const projectDetails: Record<string, ProjectDetail> = {
  "focus-space": {
    slug: "focus-space",
    title: { en: "Focus Space", tr: "Focus Space" },
    description: {
      en: "A gamified productivity app where you earn XP by focusing, build your own universe, and track your growth.",
      tr: "Odaklanarak XP kazandığın, kendi evrenini inşa ettiğin ve gelişimini takip ettiğin oyunlaştırılmış verimlilik uygulaması.",
    },
    longDescription: {
      en: "Focus Space reimagines productivity by turning deep work into an engaging experience. Start a focus session, earn XP as you concentrate, and use your progress to build and expand a personal universe. With ambient sounds, Pomodoro timing, and gamification mechanics, staying focused has never been this rewarding.",
      tr: "Focus Space, derin çalışmayı ilgi çekici bir deneyime dönüştürerek üretkenliği yeniden hayal eder. Bir odaklanma oturumu başlat, konsantre oldukça XP kazan ve ilerlemenle kişisel bir evren inşa et ve genişlet. Ortam sesleri, Pomodoro zamanlayıcısı ve oyunlaştırma mekanikleri ile odaklanmak hiç bu kadar ödüllendirici olmamıştı.",
    },
    tags: ["Flutter", "Dart", "Firebase", "Gamification", "Productivity"],
    features: {
      en: [
        "Pomodoro timer with customizable intervals",
        "XP and leveling system",
        "Personal universe builder",
        "Ambient sound library",
        "App blocker during focus sessions",
        "Detailed analytics and progress tracking",
      ],
      tr: [
        "Özelleştirilebilir aralıklarla Pomodoro zamanlayıcısı",
        "XP ve seviye atlama sistemi",
        "Kişisel evren inşa edici",
        "Ortam sesleri kütüphanesi",
        "Odak oturumlarında uygulama engelleyici",
        "Detaylı analitik ve ilerleme takibi",
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
      <Section className="pt-20 md:pt-32">
        <Container className="text-center">
          <h1 className="font-display text-3xl font-bold">
            {t("notFound")}
          </h1>
          <Link
            href="/projects"
            className="mt-4 inline-flex items-center gap-2 text-accent-cyan"
          >
            <ArrowLeft className="h-4 w-4" />
            {tCommon("backTo", { page: t("title") })}
          </Link>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* Hero */}
      <Section className="pt-20 md:pt-32">
        <Container>
          <AnimatedSection>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {tCommon("backTo", { page: t("title") })}
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl">
              {project.title[locale]}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mt-4 max-w-3xl text-lg text-text-secondary">
              {project.longDescription[locale]}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface px-3 py-1 text-sm text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {(project.github || project.live) && (
            <AnimatedSection delay={0.4}>
              <div className="mt-6 flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border/50 px-5 py-2.5 text-sm font-medium transition-all hover:border-accent-cyan/30 hover:bg-surface"
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
                    className="inline-flex items-center gap-2 rounded-full bg-accent-cyan px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {t("liveDemo")}
                  </a>
                )}
              </div>
            </AnimatedSection>
          )}
        </Container>
      </Section>

      {/* Features */}
      <Section className="bg-surface">
        <Container>
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              {t("features")}
            </h2>
          </AnimatedSection>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {project.features[locale].map((feature, index) => (
              <AnimatedSection key={index} delay={0.1 * (index + 1)}>
                <div className="flex items-start gap-3 rounded-xl border border-border/30 bg-background p-4">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-cyan/10">
                    <ArrowRight className="h-3 w-3 text-accent-cyan" />
                  </div>
                  <p className="text-sm text-text-secondary">{feature}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
