export const focusSpaceApp = {
  slug: "focus-space",
  name: "Focus Space",
  tagline: {
    en: "Your Space-Themed Productivity Companion",
    tr: "Uzay Temali Verimlilik Yoldasiniz",
  },
  description: {
    en: "Stay focused, earn XP, and build your own universe. Focus Space combines gamification with proven productivity techniques to help you achieve deep focus.",
    tr: "Odaklan, XP kazan ve kendi evrenini insaa et. Focus Space, derin odaklanma elde etmenize yardimci olmak icin oyunlastirmayi kanitlanmis verimlilik teknikleriyle birlestir.",
  },
  icon: "/images/apps/focus-space/icon.png",
  playStoreUrl: null, // Will be updated when app is published
  appStoreUrl: null,
  status: "coming-soon" as const, // "published" | "coming-soon"
  colors: {
    primary: "#00D4FF",
    secondary: "#F59E0B",
    accent: "#A78BFA",
    background: "#08081A",
  },
  features: {
    en: [
      {
        icon: "timer",
        title: "Focus Timer",
        description:
          "Pomodoro, Deep Work, and Flowtime modes to match your work style.",
      },
      {
        icon: "trophy",
        title: "XP & Gamification",
        description:
          "Earn XP, level up, unlock achievements, and compete on leaderboards.",
      },
      {
        icon: "globe",
        title: "Planet Terraforming",
        description:
          "Watch procedurally generated planets come alive as you focus.",
      },
      {
        icon: "shield",
        title: "App Blocker",
        description: "Block distracting apps during focus sessions.",
      },
      {
        icon: "music",
        title: "Ambient Sounds",
        description:
          "Rain, fireplace, bird sounds, and neuro audio modes for deep focus.",
      },
      {
        icon: "users",
        title: "Social & Leagues",
        description:
          "Challenge friends, join weekly leagues, and climb the ranks.",
      },
    ],
    tr: [
      {
        icon: "timer",
        title: "Odaklanma Zamanlayicisi",
        description:
          "Calisma stilinize uygun Pomodoro, Derin Calisma ve Flowtime modlari.",
      },
      {
        icon: "trophy",
        title: "XP & Oyunlastirma",
        description:
          "XP kazanin, seviye atlayin, basarimlar acin ve liderlik tablolarinda yarisin.",
      },
      {
        icon: "globe",
        title: "Gezegen Terraforming",
        description:
          "Odaklanirken prosedural olusturulan gezegenlerin canlanmasini izleyin.",
      },
      {
        icon: "shield",
        title: "Uygulama Engelleyici",
        description:
          "Odaklanma seanslarinda dikkat dagitici uygulamalari engelleyin.",
      },
      {
        icon: "music",
        title: "Ortam Sesleri",
        description:
          "Yagmur, somine, kus sesleri ve derin odak icin noro ses modlari.",
      },
      {
        icon: "users",
        title: "Sosyal & Ligler",
        description:
          "Arkadaslariniza meydan okuyun, haftalik liglere katilsin ve siralamada yuksel.",
      },
    ],
  },
  screenshots: [
    "/images/apps/focus-space/screenshot-1.png",
    "/images/apps/focus-space/screenshot-2.png",
    "/images/apps/focus-space/screenshot-3.png",
  ],
};
