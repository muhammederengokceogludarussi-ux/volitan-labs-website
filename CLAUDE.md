# CLAUDE.md — Volitan Labs Web Sitesi Proje Talimatları

## Bu Dosya Nedir?

Bu dosya, **Volitan Labs** kişisel portfolyo ve uygulama vitrin web sitesinin tüm teknik ve tasarım kararlarını içerir. Claude Code agent'ı bu dosyayı okuyarak projeyi sıfırdan inşa edecektir. Tüm araştırma yapılmış, kararlar kesinleşmiştir — uygulamaya geçilecektir.

---

## Proje Özeti

| Alan | Detay |
|------|-------|
| **Proje** | Volitan Labs — kişisel portfolyo + uygulama vitrin sitesi |
| **Sahip** | Makine mühendisi + Flutter mobil uygulama geliştirici (AI-augmented) |
| **Amaç** | İş başvurularında öne çıkma, LinkedIn paylaşımı, uygulama tanıtımı, marka oluşturma |
| **Öncelik** | Kariyer portfolyo odaklı (uygulama vitrini ikincil) |
| **Diller** | Türkçe + İngilizce (çift dilli, toggle ile) |
| **Tema** | Minimalist, Apple tarzı, çok animasyonlu, dark/light mode |
| **Zaman** | 1-2 hafta içinde yayına alınacak |
| **Deploy** | Vercel (ücretsiz katman) |

---

## Kesinleşmiş Tech Stack

```
Framework:        Next.js 15.x (App Router, Turbopack)
React:            React 19
Styling:          Tailwind CSS v4.1+
Animasyon:        Motion (Framer Motion) 11.x — LazyMotion ile
UI Kütüphaneleri: Magic UI + Aceternity UI (copy-paste components)
Base UI:          shadcn/ui (cn() utility, temel primitives)
i18n:             next-intl 3.x
Tema:             next-themes 0.4+
İçerik:           Velite 0.2+ (MDX → type-safe content)
Tipografi:        next/font (self-hosted Google Fonts)
TypeScript:       5.7+
Analytics:        Vercel Analytics (çerez yok, KVKK uyumlu)
Spam Koruması:    Cloudflare Turnstile + honeypot
Deploy:           Vercel
```

### Paket Kurulumu

```bash
npx create-next-app@latest volitan-labs --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd volitan-labs

# Core
npm install next-intl next-themes framer-motion velite

# UI (shadcn)
npx shadcn@latest init

# Utilities
npm install clsx tailwind-merge class-variance-authority lucide-react

# Blog
npm install rehype-pretty-code shiki rehype-slug rehype-autolink-headings

# Analytics & Forms
npm install @vercel/analytics

# Dev
npm install -D @tailwindcss/postcss velite
```

> **NOT:** Magic UI ve Aceternity UI bileşenleri npm paketi DEĞİL — kaynak kodları `src/components/ui/` klasörüne copy-paste edilir. Her bileşeni ihtiyaç oldukça resmi sitelerinden (magicui.design, ui.aceternity.com) alıp ekle.

---

## Proje Klasör Yapısı

```
volitan-labs/
├── public/
│   ├── fonts/                    # Lokal font dosyaları (JetBrains Mono)
│   ├── images/                   # Statik görseller
│   │   ├── projects/             # Proje ekran görüntüleri
│   │   ├── apps/                 # Uygulama mockup'ları
│   │   └── og/                   # Statik OG görselleri (fallback)
│   ├── favicon.svg               # SVG favicon (dark mode desteği)
│   ├── favicon.ico               # ICO fallback
│   ├── apple-touch-icon.png      # 180x180
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── [locale]/             # ← next-intl dinamik dil segmenti
│   │   │   ├── layout.tsx        # Dil bazlı layout (metadata, hreflang)
│   │   │   ├── page.tsx          # Ana sayfa
│   │   │   ├── about/
│   │   │   │   └── page.tsx      # Hakkımda / Portfolyo
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx      # Projeler listesi
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Proje detay
│   │   │   ├── apps/
│   │   │   │   ├── page.tsx      # Uygulamalar listesi
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Uygulama detay (Focus Space)
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx      # Blog listesi
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Blog yazısı
│   │   │   ├── contact/
│   │   │   │   └── page.tsx      # İletişim formu
│   │   │   └── privacy/
│   │   │       └── page.tsx      # Gizlilik politikası
│   │   ├── layout.tsx            # Root layout (html, body, providers)
│   │   ├── globals.css           # Tailwind v4 imports + custom properties
│   │   ├── not-found.tsx         # 404 sayfası
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts      # Contact form API endpoint
│   ├── components/
│   │   ├── ui/                   # shadcn + Magic UI + Aceternity bileşenleri
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── word-rotate.tsx         # Magic UI
│   │   │   ├── number-ticker.tsx       # Magic UI
│   │   │   ├── marquee.tsx             # Magic UI
│   │   │   ├── shimmer-button.tsx      # Magic UI
│   │   │   ├── bento-grid.tsx          # Magic UI
│   │   │   ├── background-beams.tsx    # Aceternity
│   │   │   ├── 3d-card.tsx             # Aceternity
│   │   │   ├── timeline.tsx            # Aceternity
│   │   │   ├── floating-dock.tsx       # Aceternity
│   │   │   ├── typewriter-effect.tsx   # Aceternity
│   │   │   ├── sticky-scroll-reveal.tsx # Aceternity
│   │   │   └── hero-parallax.tsx       # Aceternity
│   │   ├── layout/
│   │   │   ├── header.tsx        # Navbar + dil/tema toggle
│   │   │   ├── footer.tsx        # Footer + sosyal linkler
│   │   │   ├── mobile-nav.tsx    # Mobil hamburger menü
│   │   │   └── providers.tsx     # ThemeProvider, next-intl provider, LazyMotion
│   │   ├── sections/             # Ana sayfa bölümleri
│   │   │   ├── hero.tsx
│   │   │   ├── featured-project.tsx
│   │   │   ├── skills.tsx
│   │   │   ├── app-showcase.tsx
│   │   │   ├── blog-preview.tsx
│   │   │   └── cta.tsx
│   │   ├── blog/
│   │   │   ├── blog-card.tsx
│   │   │   ├── mdx-components.tsx  # MDX custom renderers
│   │   │   └── table-of-contents.tsx
│   │   ├── projects/
│   │   │   ├── project-card.tsx
│   │   │   └── project-grid.tsx
│   │   └── shared/
│   │       ├── animated-section.tsx   # whileInView wrapper
│   │       ├── theme-toggle.tsx
│   │       ├── locale-toggle.tsx
│   │       ├── back-to-top.tsx
│   │       └── section-heading.tsx
│   ├── content/                  # ← Velite tarafından işlenen içerik
│   │   ├── blog/
│   │   │   ├── en/
│   │   │   │   └── hello-world.mdx
│   │   │   └── tr/
│   │   │       └── merhaba-dunya.mdx
│   │   ├── projects/
│   │   │   ├── en/
│   │   │   │   └── focus-space.mdx
│   │   │   └── tr/
│   │   │       └── focus-space.mdx
│   │   └── apps/
│   │       ├── en/
│   │       │   └── focus-space.mdx
│   │       └── tr/
│   │           └── focus-space.mdx
│   ├── i18n/
│   │   ├── request.ts            # next-intl server config
│   │   └── routing.ts            # Locale routing config
│   ├── messages/                 # ← UI çeviri dosyaları
│   │   ├── en.json
│   │   └── tr.json
│   ├── lib/
│   │   ├── utils.ts              # cn() helper
│   │   ├── fonts.ts              # Font configuration
│   │   └── content.ts            # Velite content query helpers
│   └── middleware.ts             # next-intl middleware
├── velite.config.ts              # Velite MDX content schemas
├── next.config.ts                # Next.js config (velite plugin)
├── tailwind.config.ts            # Eğer v4 CSS-first yetmezse fallback
├── postcss.config.mjs            # @tailwindcss/postcss
├── tsconfig.json
└── package.json
```

---

## Tasarım Sistemi

### Renk Paleti

Tailwind v4 CSS-first konfigürasyonuyla `globals.css` içinde tanımlanacak:

```css
/* src/app/globals.css */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Dark Mode Renkleri (varsayılan) */
  --color-background: #0A0A0F;
  --color-surface: #141419;
  --color-surface-elevated: #1E1E26;
  --color-border: #1F1F2A;
  --color-text-primary: #F0F0F5;
  --color-text-secondary: #8A8A9A;
  --color-text-muted: #5A5A6A;

  /* Aksan Renkleri — Her iki modda aynı kalabilir, gerekirse override */
  --color-accent-cyan: #00C8F0;
  --color-accent-amber: #E8910A;
  --color-accent-purple: #9B7BF0;
  --color-accent-green: #0FAA74;
  --color-accent-red: #EF4444;

  /* Gradient */
  --gradient-primary: linear-gradient(135deg, #00C8F0, #9B7BF0);
  --gradient-warm: linear-gradient(135deg, #E8910A, #00C8F0);

  /* Fontlar */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;
}

/* Light mode overrides */
.light {
  --color-background: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-surface-elevated: #F5F5F7;
  --color-border: #E5E5EA;
  --color-text-primary: #111118;
  --color-text-secondary: #6B6B7B;
  --color-text-muted: #9A9AAA;

  /* Light mode accent overrides (erişilebilirlik için daha koyu) */
  --color-accent-cyan: #0090B0;
  --color-accent-amber: #D97706;
  --color-accent-purple: #7C5CD6;
  --color-accent-green: #059669;
}
```

### Renk Kullanım Kuralları

| Renk | Ne Zaman Kullanılır |
|------|---------------------|
| **Cyan** (`accent-cyan`) | Birincil CTA'lar, aktif durumlar, linkler, hover efektleri, navigasyon vurgusu |
| **Amber** (`accent-amber`) | İkincil CTA'lar, "öne çıkan" rozetleri, dikkat çekme, uyarılar |
| **Mor** (`accent-purple`) | Dekoratif etiketler, blog kategorileri, üçüncül vurgular |
| **Yeşil** (`accent-green`) | Başarı durumları, "aktif" göstergeleri, onay mesajları |
| **Gradient** | Hero başlığı vurgusu, büyük CTA butonları, ayırıcı çizgiler |

### Tipografi

```typescript
// src/lib/fonts.ts
import { Inter, Space_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
  subsets: ['latin', 'latin-ext'], // ← latin-ext = Türkçe karakterler (ş, ğ, ı, ö, ü, ç)
  display: 'swap',
  variable: '--font-inter',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

// JetBrains Mono — lokal dosya (sadece kod blokları için yüklenir)
export const jetbrainsMono = localFont({
  src: [
    { path: '../../public/fonts/JetBrainsMono-Regular.woff2', weight: '400' },
    { path: '../../public/fonts/JetBrainsMono-Bold.woff2', weight: '700' },
  ],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});
```

**Tipografi hiyerarşisi:**

| Öğe | Font | Boyut (desktop) | Boyut (mobil) | Ağırlık |
|-----|------|-----------------|---------------|---------|
| Hero başlık | Space Grotesk | 64-72px (4-4.5rem) | 36-40px | 700 |
| h1 | Space Grotesk | 48px (3rem) | 32px | 700 |
| h2 | Space Grotesk | 36px (2.25rem) | 28px | 600 |
| h3 | Space Grotesk | 24px (1.5rem) | 22px | 600 |
| Gövde metin | Inter | 16-18px (1-1.125rem) | 16px | 400 |
| Küçük metin | Inter | 14px (0.875rem) | 14px | 400 |
| Buton | Inter | 15-16px | 15px | 500 |
| Kod | JetBrains Mono | 14px (0.875rem) | 13px | 400 |
| Navbar | Inter | 15px | 15px | 500 |

---

## Animasyon Sistemi

### Temel Kurulum — LazyMotion (ZORUNLU)

```typescript
// src/components/layout/providers.tsx
'use client';

import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';

export function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <LazyMotion features={domAnimation}>
          <MotionConfig reducedMotion="user">
            {children}
          </MotionConfig>
        </LazyMotion>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
```

> **KRİTİK:** `<LazyMotion features={domAnimation}>` kullan — bundle boyutunu ~34KB'den ~4.6KB'ye düşürür. Tüm animasyonlarda `motion.div` yerine `m.div` kullan.

### AnimatedSection Wrapper (Tekrar kullanılabilir)

```typescript
// src/components/shared/animated-section.tsx
'use client';

import { m } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
    },
  }),
};

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      custom={delay}
      variants={variants}
      className={className}
    >
      {children}
    </m.div>
  );
}
```

### Animasyon Kuralları

1. **Yalnızca `transform` ve `opacity`** animate et — GPU hızlandırmalı, layout thrashing yok
2. **`once: true`** kullan — `whileInView` animasyonları tekrar tetiklenmesin
3. **Süreler:** Mikro etkileşimler 200-300ms, büyük geçişler 300-500ms
4. **Spring tercih et:** `{ type: "spring", stiffness: 300, damping: 20 }` doğal hissettir
5. **Viewport'ta tek odak:** Aynı anda birden fazla büyük animasyon çalıştırma
6. **Stagger:** Sıralı öğeler (kartlar, liste) için 0.1s stagger delay
7. **`reducedMotion="user"`** ile erişilebilirlik sağla

### Sayfa Bazlı Animasyon Planı

**Hero Section:**
- Navbar: fade-in (0ms delay)
- Başlık: yukarı kayarak fade-in (200ms delay), gradient text shimmer
- Alt başlık: yukarı kayarak fade-in (400ms delay)
- CTA butonlar: scale + fade-in (600ms delay)
- Arka plan: subtle gradient shift animasyonu (CSS keyframes, infinite)

**Proje/Uygulama Kartları:**
- Scroll'da `whileInView` fade-up (stagger 0.1s)
- Hover: `y: -4, scale: 1.02, boxShadow: "..."` (200ms spring)

**Blog Kartları:**
- Hover: sol kenarda cyan border grow animasyonu
- Tarih/etiket: fade-in

**App Showcase (Focus Space):**
- Telefon mockup: parallax scroll efekti
- Özellik satırları: sağ-sol değişimli slide-in
- Ekran görüntüleri: carousel veya horizontal scroll

---

## i18n Konfigürasyonu (next-intl)

### Routing

```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'tr'],
  defaultLocale: 'tr',  // ← Türk pazarı öncelikli
  localePrefix: 'always', // /en/... ve /tr/... her zaman gösterilir
});
```

### Request Config

```typescript
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
```

### Middleware

```typescript
// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(tr|en)/:path*'],
};
```

### UI Çeviri Dosyaları

```json
// src/messages/en.json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "projects": "Projects",
    "apps": "Apps",
    "blog": "Blog",
    "contact": "Contact"
  },
  "hero": {
    "greeting": "Hi, I'm",
    "name": "Volitan Labs",
    "role": "Mechanical Engineer & Mobile App Developer",
    "description": "Building thoughtful mobile experiences with Flutter, powered by engineering mindset and AI-augmented development.",
    "cta_projects": "View Projects",
    "cta_contact": "Get in Touch"
  },
  "about": {
    "title": "About Me",
    "subtitle": "From mechanical systems to mobile apps — engineering-driven development."
  },
  "projects": {
    "title": "Projects",
    "featured": "Featured",
    "view_all": "View All",
    "view_project": "View Project"
  },
  "apps": {
    "title": "Apps",
    "coming_soon": "Coming Soon",
    "download": "Download",
    "learn_more": "Learn More"
  },
  "blog": {
    "title": "Blog",
    "read_more": "Read More",
    "min_read": "min read",
    "all_posts": "All Posts"
  },
  "contact": {
    "title": "Get in Touch",
    "name": "Name",
    "email": "Email",
    "message": "Message",
    "send": "Send Message",
    "success": "Message sent successfully!",
    "error": "Something went wrong. Please try again."
  },
  "footer": {
    "rights": "All rights reserved.",
    "privacy": "Privacy Policy",
    "built_with": "Built with Next.js & Tailwind CSS"
  },
  "common": {
    "dark_mode": "Dark Mode",
    "light_mode": "Light Mode",
    "language": "Language",
    "back": "Back",
    "loading": "Loading..."
  }
}
```

```json
// src/messages/tr.json
{
  "nav": {
    "home": "Ana Sayfa",
    "about": "Hakkımda",
    "projects": "Projeler",
    "apps": "Uygulamalar",
    "blog": "Blog",
    "contact": "İletişim"
  },
  "hero": {
    "greeting": "Merhaba, ben",
    "name": "Volitan Labs",
    "role": "Makine Mühendisi & Mobil Uygulama Geliştirici",
    "description": "Flutter ile düşünceli mobil deneyimler oluşturuyorum — mühendislik bakış açısı ve yapay zeka destekli geliştirme ile.",
    "cta_projects": "Projeleri Gör",
    "cta_contact": "İletişime Geç"
  },
  "about": {
    "title": "Hakkımda",
    "subtitle": "Mekanik sistemlerden mobil uygulamalara — mühendislik odaklı geliştirme."
  },
  "projects": {
    "title": "Projeler",
    "featured": "Öne Çıkan",
    "view_all": "Tümünü Gör",
    "view_project": "Projeyi Gör"
  },
  "apps": {
    "title": "Uygulamalar",
    "coming_soon": "Yakında",
    "download": "İndir",
    "learn_more": "Daha Fazla"
  },
  "blog": {
    "title": "Blog",
    "read_more": "Devamını Oku",
    "min_read": "dk okuma",
    "all_posts": "Tüm Yazılar"
  },
  "contact": {
    "title": "İletişime Geç",
    "name": "İsim",
    "email": "E-posta",
    "message": "Mesaj",
    "send": "Mesaj Gönder",
    "success": "Mesajınız başarıyla gönderildi!",
    "error": "Bir hata oluştu. Lütfen tekrar deneyin."
  },
  "footer": {
    "rights": "Tüm hakları saklıdır.",
    "privacy": "Gizlilik Politikası",
    "built_with": "Next.js & Tailwind CSS ile yapıldı"
  },
  "common": {
    "dark_mode": "Koyu Tema",
    "light_mode": "Açık Tema",
    "language": "Dil",
    "back": "Geri",
    "loading": "Yükleniyor..."
  }
}
```

---

## Velite İçerik Konfigürasyonu

```typescript
// velite.config.ts
import { defineConfig, defineCollection, s } from 'velite';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s.object({
    slug: s.path(),
    locale: s.enum(['en', 'tr']),
    title: s.string().max(120),
    description: s.string().max(300),
    date: s.isodate(),
    updated: s.isodate().optional(),
    published: s.boolean().default(true),
    tags: s.array(s.string()).optional(),
    image: s.string().optional(),
    readingTime: s.number().optional(), // dakika cinsinden
    body: s.mdx(),
  }),
});

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s.object({
    slug: s.path(),
    locale: s.enum(['en', 'tr']),
    title: s.string(),
    description: s.string(),
    date: s.isodate(),
    published: s.boolean().default(true),
    featured: s.boolean().default(false),
    image: s.string().optional(),
    tags: s.array(s.string()).optional(),
    links: s.object({
      github: s.string().optional(),
      live: s.string().optional(),
      playstore: s.string().optional(),
      appstore: s.string().optional(),
    }).optional(),
    body: s.mdx(),
  }),
});

const apps = defineCollection({
  name: 'App',
  pattern: 'apps/**/*.mdx',
  schema: s.object({
    slug: s.path(),
    locale: s.enum(['en', 'tr']),
    title: s.string(),
    description: s.string(),
    tagline: s.string().optional(),
    status: s.enum(['coming-soon', 'beta', 'live']).default('coming-soon'),
    icon: s.string().optional(),
    screenshots: s.array(s.string()).optional(),
    features: s.array(s.object({
      title: s.string(),
      description: s.string(),
      icon: s.string().optional(),
    })).optional(),
    links: s.object({
      playstore: s.string().optional(),
      appstore: s.string().optional(),
      website: s.string().optional(),
    }).optional(),
    colors: s.object({
      primary: s.string().optional(),
      secondary: s.string().optional(),
    }).optional(),
    body: s.mdx(),
  }),
});

export default defineConfig({
  root: 'src/content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts, projects, apps },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: 'github-dark-dimmed' }],
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
});
```

### Next.js Config (Velite Entegrasyonu)

```typescript
// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Velite webpack plugin
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

class VeliteWebpackPlugin {
  static started = false;
  apply(compiler: any) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === 'development';
      const { build } = await import('velite');
      await build({ watch: dev, clean: !dev });
    });
  }
}

export default withNextIntl(nextConfig);
```

---

## Sayfa Düzenleri ve İçerik Planı

### 1. Ana Sayfa (`/[locale]/page.tsx`)

```
┌─────────────────────────────────────────────────┐
│ HEADER: Logo | Nav links | Dil toggle | Tema    │
├─────────────────────────────────────────────────┤
│                                                 │
│ HERO SECTION                                    │
│ ┌─────────────────────────────────────────────┐ │
│ │ "Merhaba, ben"                              │ │
│ │ [WordRotate: "Makine Mühendisi",            │ │
│ │  "Mobil Geliştirici", "Problem Çözücü"]     │ │
│ │                                             │ │
│ │ Kısa açıklama paragrafı                     │ │
│ │                                             │ │
│ │ [Projeleri Gör]  [İletişime Geç]           │ │
│ │                                             │ │
│ │ ← BackgroundBeams veya subtle gradient →    │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ FEATURED PROJECT                                │
│ ┌─────────────────────────────────────────────┐ │
│ │ Focus Space telefon mockup │ Özellik listesi│ │
│ │ (parallax scroll efekti)   │ + CTA buton    │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ SKILLS / TECH STACK (Bento Grid)                │
│ ┌────────┬────────┬────────┐                    │
│ │Flutter │ AI Dev │ Mech.  │                    │
│ ├────────┴────────┤Eng.    │                    │
│ │ Mobil Apps      │        │                    │
│ └─────────────────┴────────┘                    │
│                                                 │
│ RECENT BLOG POSTS (2-3 kart)                    │
│ ┌────────┐ ┌────────┐ ┌────────┐               │
│ │ Post 1 │ │ Post 2 │ │ Post 3 │               │
│ └────────┘ └────────┘ └────────┘               │
│                                                 │
│ CTA SECTION                                     │
│ "Birlikte çalışalım" + gradient CTA buton       │
│                                                 │
│ FOOTER                                          │
└─────────────────────────────────────────────────┘
```

### 2. Hakkımda (`/[locale]/about`)

**Yapı:**
1. Hero: İsim + "Makine Mühendisi → Mobil Geliştirici" + kısa intro
2. Hikaye: Kariyer yolculuğu (Timeline bileşeni — Aceternity)
3. Teknik beceriler: İki sütun — Mühendislik + Yazılım
4. Geliştirme yaklaşımı: "AI-Augmented Engineering" açıklaması
5. Eğitim + sertifikalar
6. CV indirme butonu (PDF)
7. Sosyal linkler (GitHub, LinkedIn)

### 3. Projeler (`/[locale]/projects`)

Grid layout — kartlarda: görsel/ekran görüntüsü, başlık, açıklama, tech stack etiketleri, linkler (GitHub, canlı). Filtreleme: "Tümü", "Mobil", "Mühendislik", "Web" etiketleri.

### 4. Uygulamalar (`/[locale]/apps`)

Şu an tek uygulama (Focus Space) ama genişletilebilir yapıda. Her uygulama kartı ayrı detay sayfasına yönlendirir.

### 5. Focus Space Detay (`/[locale]/apps/focus-space`)

**Yapı — Uygulama landing page formatında:**
1. Hero: Uygulama ikonu + isim + tagline + telefon mockup + Store badge'leri (veya "Coming Soon" badge)
2. Özellik bölümleri: Sağ-sol değişimli (telefon screenshot | özellik açıklaması)
3. Bento grid: Temel özellikler ikonlu kartlarla
4. Ekran görüntüleri carousel
5. Teknik bilgi: Flutter, kullanılan teknolojiler
6. CTA: Bildirim almak için e-posta toplama (uygulama "coming soon" iken) VEYA Store linkleri

**Focus Space Renkleri (uygulama sayfasında kullanılabilir):**
- Ana arka plan: `#08081A`
- Cyan: `#00D4FF`
- Amber: `#F59E0B`
- Mor: `#A78BFA`
- Yeşil: `#10B981`

### 6. Blog (`/[locale]/blog`)

Grid veya liste layout — her kart: başlık, açıklama, tarih, okuma süresi, etiketler. Blog yazısı sayfasında: prose styling, kod blokları (shiki ile syntax highlighting), TOC (table of contents), paylaşım linkleri.

### 7. İletişim (`/[locale]/contact`)

Form alanları: İsim, E-posta, Mesaj. Spam koruması: Cloudflare Turnstile + gizli honeypot alanı. Sosyal linkler: GitHub, LinkedIn, e-posta. Form gönderimi: Next.js API route → e-posta servisi (Resend veya basit e-posta forwarding).

### 8. Gizlilik Politikası (`/[locale]/privacy`)

KVKK + Google Play Store uyumlu. Çift dilli. MDX ile statik içerik.

---

## SEO Konfigürasyonu

### Root Metadata

```typescript
// src/app/[locale]/layout.tsx içinde
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL('https://volitanlabs.dev'),
    title: {
      default: 'Volitan Labs — Mechanical Engineer & Mobile Developer',
      template: '%s | Volitan Labs',
    },
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        tr: '/tr',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      siteName: 'Volitan Labs',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
```

### JSON-LD Structured Data

```typescript
// Her sayfanın head'ine script olarak ekle

// Ana sayfa — WebSite + Person
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Volitan Labs",
  "url": "https://volitanlabs.dev",
  "inLanguage": ["en", "tr"],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "{{KULLANICININ_ADI}}",
  "jobTitle": "Mechanical Engineer & Mobile App Developer",
  "url": "https://volitanlabs.dev",
  "sameAs": [
    "https://github.com/{{USERNAME}}",
    "https://linkedin.com/in/{{USERNAME}}"
  ],
  "knowsAbout": ["Flutter", "Mobile Development", "Mechanical Engineering", "AI-Augmented Development"],
};

// Uygulama sayfası — SoftwareApplication
const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Focus Space",
  "applicationCategory": "ProductivityApplication",
  "operatingSystem": "Android, iOS",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
  },
  "author": {
    "@type": "Organization",
    "name": "Volitan Labs",
  },
};

// Blog yazısı — BlogPosting
const blogPostSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{TITLE}}",
  "datePublished": "{{DATE}}",
  "author": { "@type": "Person", "name": "{{NAME}}" },
  "inLanguage": "{{LOCALE}}",
};
```

### Sitemap

```typescript
// src/app/sitemap.ts
import { posts, projects, apps } from '@/.velite';

export default async function sitemap() {
  const baseUrl = 'https://volitanlabs.dev';
  const locales = ['en', 'tr'];

  const staticPages = ['', '/about', '/projects', '/apps', '/blog', '/contact', '/privacy'];

  const staticEntries = locales.flatMap(locale =>
    staticPages.map(page => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}${page}`])
        ),
      },
    }))
  );

  const blogEntries = posts
    .filter(p => p.published)
    .map(post => ({
      url: `${baseUrl}/${post.locale}/blog/${post.slug}`,
      lastModified: new Date(post.updated || post.date),
    }));

  return [...staticEntries, ...blogEntries];
}
```

---

## Contact Form API

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message, token, honeypot } = body;

  // Honeypot check — bot'lar doldurur, insanlar görmez
  if (honeypot) {
    return NextResponse.json({ success: true }); // Sessizce başarılı döndür
  }

  // Turnstile doğrulama
  const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: TURNSTILE_SECRET,
      response: token,
    }),
  });

  const turnstileData = await turnstileRes.json();
  if (!turnstileData.success) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  }

  // Basit validasyon
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // E-posta gönderimi — Resend veya alternatif
  // TODO: Resend API entegrasyonu
  // await resend.emails.send({ ... });

  return NextResponse.json({ success: true });
}
```

---

## Dark Mode Konfigürasyonu

### next-themes + Tailwind v4

```typescript
// src/app/layout.tsx (root layout)
import { inter, spaceGrotesk, jetbrainsMono } from '@/lib/fonts';
import { Providers } from '@/components/layout/providers';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-background text-text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

Tailwind v4'te dark mode CSS ile:
```css
/* globals.css'te zaten tanımlı */
@custom-variant dark (&:where(.dark, .dark *));
```

next-themes `attribute="class"` kullanarak `<html class="dark">` ekler → Tailwind v4 `@custom-variant` bunu okur.

---

## Performans Kontrol Listesi

- [ ] `LazyMotion` + `m` bileşenleri (Framer Motion bundle azaltma)
- [ ] `next/font` ile self-hosted fontlar (`latin-ext` subset dahil)
- [ ] `next/image` tüm görsellerde + `priority` hero görselleri için
- [ ] Hero görsellerde `placeholder="blur"` (CLS azaltma)
- [ ] Server Components varsayılan, Client Components minimum
- [ ] `dynamic(() => import(...))` ağır bileşenler için (Aceternity arka plan efektleri)
- [ ] Statik sayfalar SSG (blog, hakkımda, gizlilik)
- [ ] `<link rel="preconnect">` harici kaynaklar için
- [ ] Bundle analyzer ile kontrol: `@next/bundle-analyzer`
- [ ] Lighthouse skoru ≥ 90 tüm kategorilerde

---

## Erişilebilirlik (a11y) Kontrol Listesi

- [ ] Semantik HTML: `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, `<article>`
- [ ] Skip-to-content bağlantısı (sayfa başında gizli, focus'ta görünür)
- [ ] Tüm görsellerde anlamlı `alt` metni
- [ ] Klavye erişilebilirliği: Tab navigasyonu + görünür focus göstergeleri
- [ ] `<html lang="...">` dinamik dil attribute'ı (next-intl otomatik yapar)
- [ ] Form etiketleri: her input'a `<label>`, hata mesajlarında `aria-describedby`
- [ ] Renk kontrastı: minimum 4.5:1 normal metin, 3:1 büyük metin
- [ ] `<MotionConfig reducedMotion="user">` animasyon erişilebilirliği
- [ ] Focus trap: modal/dropdown açıkken focus sayfaya kaçmasın

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://volitanlabs.dev
NEXT_PUBLIC_TURNSTILE_SITE_KEY=xxx        # Cloudflare Turnstile
TURNSTILE_SECRET_KEY=xxx                    # Server-only
RESEND_API_KEY=xxx                          # E-posta gönderimi (opsiyonel)
```

---

## Figma İş Akışı

### Genel Yaklaşım

Bu projede Figma üç şekilde kullanılacak:

1. **Figma → Kod:** Community'den şablon/template alınıp Claude'a verilerek koda çevrilecek
2. **Figma'da tasarım → Claude Code'a talimat:** Kendi çizimler yapılıp referans olarak verilecek
3. **Referans/İlham:** Beğenilen tasarımlar incelenip kodlama kararlarına yön verecek

### Claude Chat'te Figma Kullanımı (Bu Konuşmada)

Claude Chat'in Figma MCP entegrasyonu aktif. Şu araçlar kullanılabilir:

| Araç | Ne Yapar | Ne Zaman Kullanılır |
|------|----------|---------------------|
| `get_screenshot` | Figma node'unun ekran görüntüsünü çeker | Tasarımı görmek, incelemek |
| `get_design_context` | Node'un kodunu üretir (renk, spacing, tipografi dahil) | Tasarımı koda çevirmek |
| `get_metadata` | Dosya/sayfa yapısını XML olarak döndürür | Büyük dosyada hangi frame'ler var görmek |
| `get_variable_defs` | Tasarım değişkenlerini çeker | Renk/spacing token'larını almak |

**Kullanım:** Herhangi bir Figma dosya/frame linkini (`https://figma.com/design/FILE_KEY/...?node-id=X-Y`) Claude Chat'e atman yeterli.

### Figma Community Şablon Arama Stratejisi

Aşağıdaki arama terimlerini Figma Community'de (figma.com/community) kullanarak projeye uygun şablonlar bul:

**Portfolyo/Kişisel Site:**
- "developer portfolio website"
- "personal website dark mode"
- "minimal portfolio landing page"
- "dark theme portfolio"
- "engineer portfolio website"

**Uygulama Vitrini / Landing Page:**
- "mobile app landing page"
- "app showcase website"
- "SaaS landing page dark"
- "product launch landing page"
- "app store screenshot mockup"

**Bileşen Kütüphaneleri:**
- "website UI kit dark light mode"
- "landing page components"
- "blog design system"
- "contact form UI"

**Telefon Mockup'ları (Focus Space için):**
- "phone mockup template"
- "mobile app presentation"
- "device mockup clay"
- "app screenshot frame"

### Figma → Kod Çevirme İş Akışı

Bir Figma tasarımını koda çevirmek için şu adımları izle:

```
1. Figma Community'den şablon bul veya kendi tasarımını yap
2. Beğendiğin frame/section'ın linkini kopyala
   (Figma'da frame'e sağ tıkla → "Copy link to selection")
3. Linki Claude Chat'e at → Claude şunları yapar:
   a. get_screenshot ile görsel olarak inceler
   b. get_design_context ile yapısal bilgiyi (kod, renkler, spacing) çıkarır
   c. Volitan Labs renk paletine ve tasarım sistemine uyarlar
   d. Next.js + Tailwind v4 + Framer Motion kodu üretir
4. Üretilen kodu Claude Code'a talimat olarak ver
   veya doğrudan proje dosyasına yapıştır
```

**Önemli:** Figma'dan alınan tasarım birebir kopyalanmaz — Volitan Labs'ın renk paleti, tipografisi ve animasyon sistemine uyarlanır. Figma tasarımı bir **başlangıç noktası ve yapısal referans** olarak kullanılır.

### Aceternity UI & Magic UI Figma Referansları

Bu kütüphanelerin resmi Figma dosyaları yok, ama bileşenlerini kullanmadan önce nasıl görüneceklerini anlamak için:

**Aceternity UI bileşen önizlemeleri:**
- ui.aceternity.com/components → her bileşenin canlı demo'su var
- Beğendiğin bileşenin sayfasındaki demo'yu referans al
- Claude Chat'e "Aceternity'nin [bileşen adı] bileşenini Volitan Labs renkleriyle uyarla" de

**Magic UI bileşen önizlemeleri:**
- magicui.design → canlı demo'lar
- Pro şablonlar: pro.magicui.design (ücretli ama ilham için incele)

**Strateji:** Figma'da genel sayfa layout'unu tasarla → belirli bölümlere hangi Aceternity/Magic UI bileşeninin geleceğini not olarak yaz → Claude Code bu notlara göre ilgili bileşeni entegre eder.

### Figma'da Kendi Tasarımını Yaparken Kurallar

Eğer Figma'da kendi layout'larını çizeceksen, şu ayarları kullan:

**Frame boyutları:**
- Desktop: 1440 × 900 (veya 1440 × auto)
- Tablet: 768 × 1024
- Mobil: 375 × 812 (iPhone 13/14 oranı)

**Renk stilleri (Figma'da tanımla):**
```
Background:       #0A0A0F (dark) / #FAFAFA (light)
Surface:          #141419 (dark) / #FFFFFF (light)
Surface Elevated: #1E1E26 (dark) / #F5F5F7 (light)
Text Primary:     #F0F0F5 (dark) / #111118 (light)
Text Secondary:   #8A8A9A (dark) / #6B6B7B (light)
Accent Cyan:      #00C8F0 (dark) / #0090B0 (light)
Accent Amber:     #E8910A (dark) / #D97706 (light)
Accent Purple:    #9B7BF0 (dark) / #7C5CD6 (light)
Accent Green:     #0FAA74 (dark) / #059669 (light)
Border:           #1F1F2A (dark) / #E5E5EA (light)
```

**Font ayarları:**
- Başlıklar: Space Grotesk (Bold 700, SemiBold 600)
- Gövde: Inter (Regular 400, Medium 500)
- Kod: JetBrains Mono (Regular 400)

**Spacing sistemi (8px grid):**
- Section padding: 80-120px (desktop), 48-64px (mobil)
- Bileşenler arası: 24-48px
- İç padding: 16-32px
- Max içerik genişliği: 1200px (container)

### Örnek: Figma Linkini Claude Chat'e Verme

```
Kullanıcı: "Bu Figma tasarımını incele ve hero section'ı kodla"
          + https://figma.com/design/ABC123/Template?node-id=1-2

Claude Chat:
  1. get_screenshot → tasarımı görsel olarak inceler
  2. get_design_context → yapısal kodu çıkarır
  3. Volitan Labs paletine uyarlar
  4. React + Tailwind + Framer Motion kodu üretir
  5. Claude Code'a verilebilecek hazır talimat çıkarır
```

### Figma ile Claude Code Arasında Köprü

Claude Chat'te Figma analizi yapıldıktan sonra, Claude Code'a verilecek talimat formatı:

```markdown
## Figma Referansı: [Sayfa/Bölüm Adı]

**Kaynak:** [Figma linki]
**Claude Chat analizi:** [tarih]

### Yapısal Bilgi
- Layout: [grid/flex/etc]
- Sütun sayısı: [x]
- Max genişlik: [px]
- Spacing: [px değerleri]

### Bileşen Eşleştirmesi
- Hero arka plan → Aceternity BackgroundBeams
- Başlık animasyonu → Magic UI WordRotate
- Kart grid → Magic UI BentoGrid
- [vs.]

### Renk Uyarlamaları
- Figma'daki #XXXX → Volitan Labs accent-cyan
- Figma'daki #YYYY → Volitan Labs accent-amber
- [vs.]

### Üretilen Kod Taslağı
[Claude Chat'in ürettiği kod buraya]
```

Bu format sayesinde Claude Code, Figma'dan gelen tasarım kararlarını doğrudan uygulayabilir.

---

## Geliştirme Sırası (Önerilen)

### Hafta 1 — Temel Altyapı
1. `create-next-app` + paket kurulumu
2. Tailwind v4 + renk sistemi (`globals.css`)
3. Font konfigürasyonu (`lib/fonts.ts`)
4. next-intl kurulumu (routing, middleware, messages)
5. next-themes kurulumu (providers)
6. Layout bileşenleri (Header, Footer, Providers)
7. Ana sayfa (Hero + Sections)
8. Hakkımda sayfası
9. Vercel'e deploy

### Hafta 2 — İçerik ve Cilalama
10. Velite kurulumu + blog altyapısı
11. Focus Space uygulama vitrini
12. Projeler sayfası
13. İletişim formu (Turnstile + honeypot)
14. Gizlilik politikası
15. JSON-LD + sitemap + robots.txt
16. OG görselleri (next/og)
17. Animasyon ince ayar (scroll, hover, geçişler)
18. Lighthouse testi + düzeltmeler
19. Gerçek içerik girişi (Türkçe + İngilizce)
20. Son kontrol + lansman

---

## Önemli Notlar

1. **"Coming Soon" yaklaşımı:** Focus Space henüz yayında değil → Store badge'leri yerine "Yakında" rozeti + "Bildirim al" e-posta formu kullan. Uygulama yayına alındığında basit bir içerik güncellemesiyle badge'lere geçiş yapılır.

2. **Genişletilebilirlik:** Gelecekte yeni uygulamalar eklenecek → `src/content/apps/` altına yeni MDX dosyası eklemek yeterli. Yeni sayfa türleri → Velite'a yeni collection ekle.

3. **Vibe coder dostu:** Tüm içerik MDX dosyalarında → Git üzerinden düzenle ve push et, site otomatik güncellenir. Kod yapısı modüler → her bileşen bağımsız düzenlenebilir.

4. **GitHub açık kaynak:** Projeyi public repo olarak paylaşmak LinkedIn'de avantaj sağlar. `.env.local` gitignore'da olmalı. README'de kurulum talimatları olmalı. MIT lisansı ile "İlham alabilirsiniz ama birebir kopyalamayın" notu.

5. **Tailwind v4 dikkat:** `tailwind.config.js` yerine CSS-first konfigürasyon kullanılıyor. Aceternity/Magic UI bileşenlerini kopyalarken eski `tailwind.config.js` referanslarını CSS `@theme` direktifine çevirmek gerekebilir.

6. **Motion (Framer Motion) isim değişikliği:** Kütüphanenin resmi adı artık "Motion" — `framer-motion` paketi hâlâ kullanılıyor ama güncel docs motion.dev'de.
