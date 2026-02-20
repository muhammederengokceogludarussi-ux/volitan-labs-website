export const focusSpaceApp = {
  slug: "focus-space",
  name: "Focus Space",
  tagline: {
    en: "Reduce Screen Time. Build Focus Habits.",
    tr: "Ekran Süresini Azalt. Odaklanma Alışkanlığı Kazan.",
  },
  description: {
    en: "Focus Space is a digital detox and productivity app designed to help you reduce screen time and build healthy focus habits. Using space-themed gamification — XP, planet terraforming, and weekly leagues — it turns putting your phone down into a rewarding experience.",
    tr: "Focus Space, ekran süresini azaltmanıza ve sağlıklı odaklanma alışkanlıkları kazanmanıza yardımcı olmak için tasarlanmış bir dijital detoks ve verimlilik uygulamasıdır. Uzay temalı oyunlaştırma — XP, gezegen terraforming ve haftalık ligler — ile telefonunuzu bırakmayı ödüllendirici bir deneyime dönüştürür.",
  },
  icon: "/images/apps/focus-space/icon.png",
  playStoreUrl: null, // Will be updated when app is published
  appStoreUrl: null,
  status: "beta" as "published" | "beta" | "coming-soon",
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
        title: "Odaklanma Zamanlayıcısı",
        description:
          "Çalışma stilinize uygun Pomodoro, Derin Çalışma ve Flowtime modları.",
      },
      {
        icon: "trophy",
        title: "XP & Oyunlaştırma",
        description:
          "XP kazanın, seviye atlayın, başarımlar açın ve liderlik tablolarında yarışın.",
      },
      {
        icon: "globe",
        title: "Gezegen Terraforming",
        description:
          "Odaklanırken prosedüral oluşturulan gezegenlerin canlanmasını izleyin.",
      },
      {
        icon: "shield",
        title: "Uygulama Engelleyici",
        description:
          "Odaklanma seanslarında dikkat dağıtıcı uygulamaları engelleyin.",
      },
      {
        icon: "music",
        title: "Ortam Sesleri",
        description:
          "Yağmur, şömine, kuş sesleri ve derin odak için nöro ses modları.",
      },
      {
        icon: "users",
        title: "Sosyal & Ligler",
        description:
          "Arkadaşlarınıza meydan okuyun, haftalık liglere katılın ve sıralamada yükselin.",
      },
    ],
  },
  screenshots: [
    "/images/apps/focus-space/screenshot-cockpit.jpg",
    "/images/apps/focus-space/screenshot-starmap.jpg",
    "/images/apps/focus-space/screenshot-badges.jpg",
    "/images/apps/focus-space/screenshot-stats.jpg",
    "/images/apps/focus-space/screenshot-5.jpg",
    "/images/apps/focus-space/screenshot-6.jpg",
    "/images/apps/focus-space/screenshot-7.jpg",
    "/images/apps/focus-space/screenshot-8.jpg",
  ],
};
