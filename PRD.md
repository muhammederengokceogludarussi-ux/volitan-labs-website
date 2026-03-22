# PRD: Volitan Labs — Personal Portfolio & App Showcase

> Filled based on project goals. Guides all development decisions.

## Problem

Engineering students and indie developers struggle to stand out in job applications with generic LinkedIn profiles. A custom portfolio website with app showcase demonstrates technical skill, design taste, and initiative — differentiating from other candidates.

## Target User

- **Primary:** Recruiters, hiring managers, potential collaborators viewing the portfolio
- **Secondary:** App users discovering Focus Space through the website
- **Owner:** Mechanical engineering student + Flutter developer (the site owner)

## Core Features (MVP)

- [x] Bilingual support (Turkish/English with toggle)
- [x] Dark/light mode
- [x] Homepage with hero, skills, featured project, blog preview, CTA
- [x] About page (story, timeline, skills, education, achievements)
- [x] Projects page with filtering
- [x] Apps page + Focus Space detail page
- [x] Blog with MDX support and syntax highlighting
- [x] Contact page with social links
- [x] Privacy policy (KVKK compliant)
- [x] SEO (JSON-LD, sitemap, OG images)
- [ ] Contact form with spam protection (Cloudflare Turnstile)
- [ ] CV download (PDF)

## Out of Scope (v1)

- Not: User accounts or authentication
- Not: CMS or admin panel (content via MDX files)
- Not: E-commerce or payments
- Not: App store submission automation
- Not: Newsletter/email subscription system
- Not: Comments on blog posts
- Not: Multi-author support

## User Flows

### Flow 1: Recruiter Views Portfolio
1. Recruiter lands on homepage via LinkedIn link
2. Sees hero with role description + skills overview
3. Navigates to About for detailed background
4. Checks Projects for technical work samples
5. Downloads CV or contacts via social links

### Flow 2: User Discovers Focus Space
1. Visitor lands on Apps page
2. Sees Focus Space card with "Coming Soon" badge
3. Clicks through to detail page
4. Views features, screenshots, tech stack
5. (Future: downloads from app store)

### Flow 3: Reader Finds Blog Post
1. Visitor arrives via search engine or social share
2. Reads blog post with syntax-highlighted code
3. Explores other posts or navigates to portfolio sections

## Success Criteria

- [ ] Lighthouse score >= 90 in all categories
- [ ] Full bilingual content (TR + EN)
- [ ] All pages responsive (375px to 1440px+)
- [ ] Visually distinctive — not "AI-generated looking"
- [ ] Deployed and accessible at volitanlabs.dev
- [ ] Loads in < 3s on mobile 3G
- [ ] Zero accessibility violations (axe-core)

## Research Findings

### What exists already?
- edqe.me — liked visual style (aurora gradients, glassmorphic effects)
- linear.app — clean dark UI, subtle animations
- vercel.com — polished product feel

### Key decisions from research
- Purple (#8B6CF0) + Amber (#E8A040) accent palette
- Sora + Inter + JetBrains Mono font stack
- Floating pill navbar design
- Aurora gradient backgrounds + glassmorphic cards as design language
- Gemini handles visual design (HTML mockups) → Claude converts to Next.js

### Open questions
- Final contact form email service (Resend vs alternatives)
- Focus Space app store links (when app launches)

## Non-Functional Requirements

- **Performance:** FCP < 1.5s, LCP < 2.5s, CLS < 0.1
- **Security:** No user data stored, spam protection on contact form, no secrets in client bundle
- **Scalability:** Static site — scales infinitely on Vercel CDN
- **Accessibility:** WCAG 2.1 AA compliance, reduced motion support, semantic HTML, keyboard navigable

## Milestones

| Phase | Scope | Definition of Done |
|-------|-------|--------------------|
| Design | Gemini creates HTML mockups for all pages | All 5 page designs approved |
| Build | Claude converts designs to Next.js | All pages functional, bilingual, responsive |
| Content | Real content (TR + EN) for all pages | No placeholder text remaining |
| Polish | Animations, performance, a11y | Lighthouse >= 90, zero a11y violations |
| Launch | Deploy to Vercel, domain setup | Live at volitanlabs.dev |
