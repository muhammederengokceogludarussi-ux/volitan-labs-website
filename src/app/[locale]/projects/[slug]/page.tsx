"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import Image from "next/image";
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
  icon?: string;
  screenshots?: string[];
  features: { en: string[]; tr: string[] };
}

const projectDetails: Record<string, ProjectDetail> = {
  "focus-space": {
    slug: "focus-space",
    title: { en: "Focus Space", tr: "Focus Space" },
    description: {
      en: "A digital detox and productivity app designed to reduce screen time through space-themed gamification.",
      tr: "Uzay temalı oyunlaştırma ile ekran süresini azaltmak için tasarlanmış dijital detoks ve verimlilik uygulaması.",
    },
    longDescription: {
      en: "Focus Space is a digital detox app that helps you reduce screen time and build healthier focus habits. Instead of mindlessly scrolling, start a focus session — the app rewards you with XP for every minute you stay off your phone. Use your XP to terraform planets, unlock achievements, and compete in weekly leagues. With Pomodoro timing, ambient sounds, and an app blocker, Focus Space makes putting your phone down genuinely rewarding.",
      tr: "Focus Space, ekran süresini azaltmanıza ve daha sağlıklı odaklanma alışkanlıkları kazanmanıza yardımcı olan bir dijital detoks uygulamasıdır. Anlamsızca kaydırmak yerine bir odak oturumu başlatın — uygulama telefondan uzak kaldığınız her dakika için sizi XP ile ödüllendirir. XP'nizi gezegen terraforming, başarım açma ve haftalık liglerde yarışma için kullanın. Pomodoro zamanlayıcı, ortam sesleri ve uygulama engelleyici ile Focus Space, telefonunuzu bırakmayı gerçekten ödüllendirici kılar.",
    },
    tags: ["Flutter", "Dart", "Supabase", "Digital Detox", "Productivity"],
    icon: "/images/apps/focus-space/icon.png",
    screenshots: [
      "/images/apps/focus-space/screenshot-cockpit.jpg",
      "/images/apps/focus-space/screenshot-starmap.jpg",
      "/images/apps/focus-space/screenshot-badges.jpg",
      "/images/apps/focus-space/screenshot-stats.jpg",
      "/images/apps/focus-space/screenshot-5.jpg",
      "/images/apps/focus-space/screenshot-6.jpg",
    ],
    features: {
      en: [
        "Reduces screen time with rewarding focus sessions",
        "Pomodoro timer with customizable work/break intervals",
        "XP system — earn rewards for staying off your phone",
        "Planet terraforming — visualize your progress as a growing universe",
        "Ambient sounds (rain, fireplace, birds) for deep focus",
        "App blocker to eliminate distractions during sessions",
      ],
      tr: [
        "Ödüllendirici odak oturumlarıyla ekran süresini azaltır",
        "Özelleştirilebilir çalışma/mola aralıklarıyla Pomodoro zamanlayıcı",
        "XP sistemi — telefondan uzak kalarak ödül kazanın",
        "Gezegen terraforming — ilerlemenizi büyüyen bir evren olarak görselleştirin",
        "Derin odak için ortam sesleri (yağmur, şömine, kuş sesleri)",
        "Oturumlar sırasında dikkat dağıtıcıları ortadan kaldıran uygulama engelleyici",
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
              <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                {project.title[locale]}
              </h1>
            </div>
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

      {/* Screenshots */}
      {project.screenshots && project.screenshots.length > 0 && (
        <Section>
          <Container>
            <AnimatedSection>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                {locale === "tr" ? "Ekran Görüntüleri" : "Screenshots"}
              </h2>
            </AnimatedSection>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
              {project.screenshots.map((src, index) => (
                <AnimatedSection key={index} delay={0.1 * (index + 1)}>
                  <div className="overflow-hidden rounded-2xl border border-border/30 bg-surface">
                    <Image
                      src={src}
                      alt={`${project.title[locale]} screenshot ${index + 1}`}
                      width={390}
                      height={844}
                      className="h-auto w-full"
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
