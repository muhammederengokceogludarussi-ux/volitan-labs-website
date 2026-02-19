# Volitan Labs Website - Project Plan

## Overview

Professional company website for Volitan Labs, showcasing mobile apps,
founder's engineering portfolio, and company information.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion + Magic UI + Aceternity UI
- **i18n**: next-intl (Turkish + English)
- **Theme**: next-themes (dark/light)
- **Content**: MDX + TypeScript data files
- **Deployment**: Vercel
- **Package Manager**: pnpm
- **Fonts**: Inter (body) + Space Grotesk (headings) + JetBrains Mono (code)

## Pages

1. **Home** - Hero + Highlights + Featured App + CTA
2. **Apps** - App showcase listing + detail page (Focus Space)
3. **About** - Company story + founder bio + values
4. **Blog** - MDX-based technical articles
5. **Privacy Policy** - Play Store compliance
6. **Contact** - Contact form + social links
7. **Career** - Founder's professional portfolio (for job applications)

## Design Principles

- Minimalist Apple-style aesthetic
- Dark/light mode support with toggle
- Bilingual (TR/EN) with toggle
- Animation-rich but tasteful (Framer Motion)
- Mobile-first responsive design
- Content easily editable via `content/` directory

## Phases

### Phase 1: MVP Foundation (Sessions 1-5)

- Session 1: Project scaffolding, Tailwind, fonts, i18n, themes, base layout
- Session 2: Home page (Hero, Highlights, Featured App, CTA)
- Session 3: Apps page + About page
- Session 4: Contact + Privacy Policy + Career pages
- Session 5: Blog system (MDX) + Vercel deploy

### Phase 2: Enhanced Experience (Sessions 6-8)

- Session 6: Premium animations (Magic UI, Aceternity UI, Lenis smooth scroll)
- Session 7: Interactive elements (carousel, animated skills, page transitions)
- Session 8: SEO optimization + performance audit

### Phase 3: Polish & Scale (Sessions 9-10)

- Session 9: Accessibility (WCAG 2.1 AA), cross-browser, responsive fine-tuning
- Session 10: Analytics, dynamic app system, final QA, documentation

## Color System

### Light Mode

- Background: #FFFFFF / #F9FAFB
- Foreground: #111827
- Muted: #6B7280

### Dark Mode

- Background: #09090B / #111113
- Foreground: #F9FAFB
- Muted: #9CA3AF

### Accent Colors (from Focus Space app)

- Cyan: #00D4FF
- Amber: #F59E0B
- Purple: #A78BFA

## Content Update Guide

| I want to...                  | Edit this file                                  |
| ----------------------------- | ----------------------------------------------- |
| Change site name/description  | `content/site.ts`                               |
| Update bio/skills/experience  | `content/founder.ts`                            |
| Add a new app                 | Create `content/apps/[name].ts`                 |
| Edit app info                 | `content/apps/focus-space.ts`                   |
| Write blog post (EN)          | Create `content/blog/en/[slug].mdx`             |
| Write blog post (TR)          | Create `content/blog/tr/[slug].mdx`             |
| Update privacy policy         | `content/pages/privacy-policy.[locale].mdx`     |
| Change button/UI text         | `messages/en.json` or `messages/tr.json`        |
| Add screenshots               | Drop images in `public/images/apps/[app-name]/` |
