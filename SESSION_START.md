# Session Start Guide

Read this at the beginning of every coding session.

## Quick Orientation

- **Project**: Volitan Labs company website
- **Stack**: Next.js 15, Tailwind CSS v4, Framer Motion, next-intl, next-themes
- **Directory**: `c:\Users\Volitan\Desktop\web`

## Current State

- **Phase**: 1 (MVP Foundation)
- **Last completed**: Session 0 - Project planning
- **Next up**: Session 1 - Project scaffolding + base layout
- **Known issues**: None yet
- **Deploy status**: Not deployed yet

## Key File Locations

| Category          | Path                                      |
| ----------------- | ----------------------------------------- |
| Pages             | `src/app/[locale]/`                       |
| Components        | `src/components/`                         |
| Layout            | `src/components/layout/`                  |
| UI Primitives     | `src/components/ui/`                      |
| Animations        | `src/components/animations/`              |
| Page Sections     | `src/components/sections/`                |
| Content (EDIT)    | `content/`                                |
| Translations      | `messages/en.json`, `messages/tr.json`    |
| Global Styles     | `src/app/globals.css`                     |
| Theme Tokens      | `src/styles/theme.ts`                     |
| i18n Config       | `src/i18n/`                               |
| Utilities         | `src/lib/`                                |
| Types             | `src/types/`                              |
| Next.js Config    | `next.config.mjs`                         |
| Tailwind Config   | `tailwind.config.ts`                      |

## Conventions

- Use `"use client"` only when needed (prefer Server Components)
- All user-facing text must use `next-intl` `useTranslations()`
- Animations use components from `src/components/animations/`
- Every page needs `generateMetadata()` for SEO
- Mobile-first: design for mobile, then expand with `md:` and `lg:`
- Color tokens defined in `tailwind.config.ts` and `globals.css`
- TypeScript strict mode enabled

## Before Coding

1. Run: `pnpm dev` (starts at localhost:3000)
2. Check `DEVLOG.md` for recent decisions
3. Check `PLAN.md` for current phase goals
4. Test both `/en` and `/tr` routes
5. Test both light and dark mode

## Component Patterns

- Page sections: `src/components/sections/[page-name]/[section].tsx`
- Wrap animated content in `FadeIn`, `SlideUp`, etc. from `animations/`
- Use `Container` for max-width centering
- Use `Section` for consistent vertical padding
- All images via `next/image` with explicit width/height

## Adding a New App

1. Create `content/apps/[app-name].ts` with app data
2. Add screenshots to `public/images/apps/[app-name]/`
3. Add translation keys to `messages/en.json` and `messages/tr.json`
4. The app will auto-appear on the Apps page

## Adding a Blog Post

1. Create `content/blog/en/[slug].mdx` and `content/blog/tr/[slug].mdx`
2. Add frontmatter: title, date, description, tags
3. The post will auto-appear on the Blog page
