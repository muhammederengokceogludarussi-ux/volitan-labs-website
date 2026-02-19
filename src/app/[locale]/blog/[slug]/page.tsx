"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { ScrollProgress } from "@/components/shared/scroll-progress";

interface BlogPostDetail {
  slug: string;
  title: { en: string; tr: string };
  description: { en: string; tr: string };
  content: { en: string; tr: string };
  date: string;
  readTime: number;
  tags: string[];
}

const postsData: Record<string, BlogPostDetail> = {
  "how-engineering-thinking-shapes-app-development": {
    slug: "how-engineering-thinking-shapes-app-development",
    title: {
      en: "How Engineering Thinking Shapes My App Development",
      tr: "Mühendislik Düşüncesi Uygulama Geliştirmemi Nasıl Şekillendiriyor",
    },
    description: {
      en: "How studying mechanical engineering at METU influences my approach to building mobile apps.",
      tr: "ODTÜ'de makine mühendisliği okumanın mobil uygulama geliştirme yaklaşımımı nasıl etkilediği.",
    },
    content: {
      en: "As a mechanical engineering student at METU, I spend my days learning about systems — understanding how individual components interact to create something greater than the sum of their parts. This systematic thinking is incredibly valuable when I sit down to build mobile apps in the evenings.\n\nThe parallels between mechanical engineering and mobile app development are more numerous than you might think. In both fields, you need to consider constraints, optimize for performance, and design systems that are both robust and elegant.\n\nWhen I first picked up Flutter, I was struck by how similar the widget tree was to an assembly in CAD software like Siemens NX. Each widget is like a component — it has properties, behaviors, and relationships with other widgets. The composition model felt natural to someone who spends time composing mechanical assemblies.\n\nMy TUSAŞ experience also plays a role. Working on the F-35 production line and GÖKBEY Helicopter prototype taught me the importance of precision and quality control — lessons that directly apply to writing clean, maintainable code.\n\nThe engineering mindset shapes my development approach in several key ways: I always start with requirements analysis (just like a design specification), I think about edge cases and failure modes, and I test rigorously before shipping.\n\nIf you're an engineering student considering mobile development as a creative outlet, I'd encourage you to try it. Your analytical skills and systematic thinking are superpowers in the software world.",
      tr: "ODTÜ'de makine mühendisliği öğrencisi olarak günlerimi sistemleri öğrenerek geçiriyorum — bireysel bileşenlerin nasıl etkileşime girerek parçaların toplamından daha büyük bir şey oluşturduğunu anlamak. Bu sistematik düşünme, akşamları mobil uygulama geliştirmeye oturduğumda inanılmaz değerli oluyor.\n\nMakine mühendisliği ile mobil uygulama geliştirme arasındaki paralellikler düşündüğünüzden daha fazla. Her iki alanda da kısıtlamaları dikkate almanız, performans için optimize etmeniz ve hem sağlam hem de zarif sistemler tasarlamanız gerekir.\n\nFlutter'ı ilk kez elime aldığımda, widget ağacının Siemens NX gibi CAD yazılımındaki montaja ne kadar benzediğine şaşırdım. Her widget bir bileşen gibidir — özellikleri, davranışları ve diğer widget'larla ilişkileri vardır.\n\nTUSAŞ deneyimim de büyük rol oynuyor. F-35 üretim hattında ve GÖKBEY Helikopter prototipinde çalışmak bana hassasiyetin ve kalite kontrolün önemini öğretti — temiz, sürdürülebilir kod yazmaya doğrudan uygulanan dersler.\n\nMühendislik zihniyeti geliştirme yaklaşımımı birkaç temel şekilde şekillendiriyor: Her zaman gereksinim analiziyle başlıyorum, uç vakaları ve arıza modlarını düşünüyorum ve göndermeden önce titizlikle test ediyorum.\n\nMobil geliştirmeyi yaratıcı bir çıkış olarak düşünen bir mühendislik öğrencisiyseniz, denemenizi tavsiye ederim. Analitik becerileriniz ve sistematik düşünceniz yazılım dünyasında süper güçler.",
    },
    date: "2025-01-15",
    readTime: 5,
    tags: ["Engineering", "Mobile", "Flutter"],
  },
  "building-focus-space-flutter-journey": {
    slug: "building-focus-space-flutter-journey",
    title: {
      en: "Building Focus Space: A Flutter Journey",
      tr: "Focus Space'i İnşa Etmek: Bir Flutter Yolculuğu",
    },
    description: {
      en: "Behind the scenes of creating a gamified productivity app with Flutter and AI assistance.",
      tr: "Flutter ve yapay zeka desteği ile oyunlaştırılmış verimlilik uygulaması oluşturmanın perde arkası.",
    },
    content: {
      en: "Focus Space started as a simple idea: what if staying focused could feel like playing a game? As an engineering student who struggles with maintaining deep focus during long study sessions, I wanted to build something that would make productivity feel rewarding.\n\nThe tech stack decision was straightforward — Flutter for cross-platform development, Firebase for backend services, and a clean architecture pattern to keep things maintainable.\n\nThe gamification system was the most challenging part to design. I needed to create a reward loop that was motivating without being distracting. After several iterations, I settled on an XP-based system where users earn experience points during focus sessions and use them to build a personal universe.\n\nAI played a significant role in the development process. From generating initial code scaffolding to helping debug complex state management issues, AI tools like Claude accelerated development significantly while maintaining code quality.\n\nThe app is currently in development under the Volitan Labs brand, and I'm excited to share it with the world soon. Stay tuned for updates!",
      tr: "Focus Space basit bir fikirle başladı: ya odaklı kalmak bir oyun oynamak gibi hissettirilebilseydi? Uzun çalışma seansları sırasında derin odaklanmayı sürdürmekte zorlanan bir mühendislik öğrencisi olarak, verimliliği ödüllendirici hissettirecek bir şey inşa etmek istedim.\n\nTeknoloji yığını kararı basitti — çoklu platform geliştirme için Flutter, backend servisleri için Firebase ve işleri sürdürülebilir tutmak için temiz mimari deseni.\n\nOyunlaştırma sistemi tasarlanması en zorlu kısımdı. Dikkat dağıtıcı olmadan motive edici bir ödül döngüsü oluşturmam gerekiyordu. Birkaç yinelemeden sonra, kullanıcıların odaklanma seansları sırasında deneyim puanları kazandığı ve bunları kişisel bir evren inşa etmek için kullandığı XP tabanlı bir sisteme karar verdim.\n\nYapay zeka geliştirme sürecinde önemli bir rol oynadı. Başlangıç kod iskelesinden karmaşık durum yönetimi sorunlarının hata ayıklamasına kadar, Claude gibi yapay zeka araçları kod kalitesini korurken geliştirmeyi önemli ölçüde hızlandırdı.\n\nUygulama şu anda Volitan Labs markası altında geliştirme aşamasında ve yakında dünya ile paylaşmayı düşünüyorum. Güncellemeler için takipte kalın!",
    },
    date: "2025-01-10",
    readTime: 8,
    tags: ["Flutter", "Productivity", "AI"],
  },
  "ai-augmented-development-workflow": {
    slug: "ai-augmented-development-workflow",
    title: {
      en: "AI-Augmented Development: My Workflow",
      tr: "Yapay Zeka Destekli Geliştirme: İş Akışım",
    },
    description: {
      en: "How I use AI tools to accelerate development without sacrificing code quality.",
      tr: "Kod kalitesinden ödün vermeden geliştirmeyi hızlandırmak için yapay zeka araçlarını nasıl kullanıyorum.",
    },
    content: {
      en: "AI-augmented development isn't about replacing developers — it's about amplifying their capabilities. Here's how I integrate AI tools into my daily workflow as a student developer.\n\nFirst, I use AI for code generation and scaffolding. When starting a new feature for Focus Space, I describe what I need and let AI generate the initial structure. This saves time on boilerplate while letting me focus on the unique logic.\n\nSecond, AI is invaluable for debugging. When I encounter a tricky bug, I can describe the symptoms and get suggestions for potential causes. This has saved me hours of debugging time.\n\nThird, I use AI for code review. Before committing, I ask AI to review my changes for potential issues, security vulnerabilities, and performance concerns.\n\nThe key is knowing when to use AI and when to rely on your own expertise. AI excels at pattern matching and generating common patterns, but it needs human guidance for architectural decisions and business logic.\n\nMy advice: embrace AI as a tool in your toolkit, but never stop learning the fundamentals. The best developers are those who can leverage AI while understanding the code it generates.",
      tr: "Yapay zeka destekli geliştirme, geliştiricilerin yerini almakla ilgili değil — yeteneklerini güçlendirmekle ilgili. Bir öğrenci geliştirici olarak yapay zeka araçlarını günlük iş akışıma nasıl entegre ettiğimi anlatayım.\n\nÖncelikle, kod üretimi ve iskele için yapay zeka kullanıyorum. Focus Space için yeni bir özellik başlatırken, neye ihtiyacım olduğunu tanımlıyorum ve yapay zekanın başlangıç yapısını oluşturmasına izin veriyorum.\n\nİkinci olarak, hata ayıklama için yapay zeka çok değerli. Zor bir hatayla karşılaştığımda, semptomları tanımlayabilir ve potansiyel nedenler için öneriler alabilirim.\n\nÜçüncü olarak, kod incelemesi için yapay zeka kullanıyorum. Commit etmeden önce, potansiyel sorunlar, güvenlik açıkları ve performans endişeleri için değişikliklerimi incelemesini istiyorum.\n\nAnahtar, yapay zekayı ne zaman kullanacağınızı ve kendi uzmanlığınıza ne zaman güveneceğinizi bilmek. Yapay zeka örüntü eşleştirme ve yaygın örüntüler oluşturmada üstündür, ancak mimari kararlar ve iş mantığı için insan rehberliğine ihtiyaç duyar.\n\nTavsiyem: yapay zekayı araç kutunuzdaki bir araç olarak benimseyin, ancak temelleri öğrenmeyi asla bırakmayın.",
    },
    date: "2025-01-05",
    readTime: 4,
    tags: ["AI", "Workflow", "Productivity"],
  },
};

export default function BlogPostPage() {
  const t = useTranslations("blog");
  const tCommon = useTranslations("common");
  const locale = useLocale() as "en" | "tr";
  const params = useParams();
  const slug = params.slug as string;

  const post = postsData[slug];

  if (!post) {
    return (
      <Section className="pt-20 md:pt-32">
        <Container className="text-center">
          <h1 className="font-display text-3xl font-bold">{t("noPosts")}</h1>
          <Link
            href="/blog"
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
      <ScrollProgress />
      <Section className="pt-20 md:pt-32">
        <Container>
          <article className="mx-auto max-w-3xl">
            <AnimatedSection>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {tCommon("backTo", { page: t("title") })}
              </Link>
            </AnimatedSection>

            {/* Header */}
            <AnimatedSection delay={0.1}>
              <div className="mt-8">
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

                <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  {post.title[locale]}
                </h1>

                <div className="mt-4 flex items-center gap-4 text-sm text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {post.readTime} {t("minRead")}
                  </span>
                </div>
              </div>
            </AnimatedSection>

            {/* Content */}
            <AnimatedSection delay={0.2}>
              <div className="prose-custom mt-10">
                {post.content[locale].split("\n\n").map((paragraph, i) => (
                  <p
                    key={i}
                    className="mb-6 text-text-secondary leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimatedSection>

            {/* Back */}
            <AnimatedSection delay={0.3}>
              <div className="mt-12 border-t border-border/30 pt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan transition-colors hover:text-accent-cyan/80"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {t("allPosts")}
                </Link>
              </div>
            </AnimatedSection>
          </article>
        </Container>
      </Section>
    </>
  );
}
