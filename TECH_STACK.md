# Tech Stack — Volitan Labs Website

> Filled based on current project state. All AI sessions must follow these decisions.

## Language & Runtime

- **Language:** TypeScript
- **Version:** 5.7+
- **Why:** Type safety, better DX, Next.js native support

## Framework

- **Framework:** Next.js (App Router)
- **Version:** 15.x
- **Why:** SSR/SSG, file-based routing, Vercel deployment, React 19 support

## Database

- **Type:** None
- **Engine:** N/A (static content via Velite MDX)
- **ORM / Client:** N/A
- **Why:** Portfolio site — all content is MDX files processed at build time

## Authentication

- **Method:** None
- **Provider:** N/A
- **Why:** Public portfolio site, no user accounts needed

## Hosting & Deployment

- **Platform:** Vercel (free tier)
- **CI/CD:** Vercel auto-deploy on git push
- **Why:** Zero config for Next.js, free SSL, edge network, analytics

## Package Manager

- **Manager:** npm
- **Lock file:** package-lock.json

## Styling

- **Approach:** Tailwind CSS v4.1+ (CSS-first config via `@theme` in globals.css)
- **UI Library:** Custom components (glass cards, aurora backgrounds, etc.) — no shadcn/ui base components used currently

## Testing

- **Framework:** None yet
- **Strategy:** Manual + Lighthouse audits

## Key Libraries

| Library | Purpose | Why chosen |
|---------|---------|------------|
| next-intl 3.x | i18n (TR/EN) | Best Next.js App Router i18n solution |
| next-themes 0.4+ | Dark/light mode | Simple, SSR-safe theme switching |
| framer-motion 11.x | Animations | LazyMotion for small bundle, `m.` components |
| velite 0.2+ | MDX content | Type-safe content layer, build-time processing |
| lucide-react | Icons | Tree-shakeable, consistent icon set |
| rehype-pretty-code + shiki | Code syntax highlighting | Blog code blocks |
| @vercel/analytics | Analytics | Cookie-free, KVKK compliant |

## Constraints

- Free tier only (Vercel, no paid services)
- TypeScript strict mode
- LazyMotion mandatory (no full `motion` import — use `m.` components)
- `prefers-reduced-motion` must be respected for all animations
- Bilingual: every UI string must exist in both `messages/en.json` and `messages/tr.json`
- No external CSS files — all custom styles in `globals.css`
- Tailwind v4 CSS-first config — no `tailwind.config.js`

## Rejected Alternatives

| Rejected | Why |
|----------|-----|
| shadcn/ui components | Too generic looking, custom glass components preferred |
| Contentlayer | Abandoned/unmaintained, Velite is actively developed |
| styled-components | Not compatible with RSC, Tailwind is simpler |
| i18next | next-intl has better App Router integration |
| Chakra UI / MUI | Too opinionated, heavy bundle, doesn't match dark glassmorphic aesthetic |
| pnpm/bun | npm works fine, no team to coordinate with |
