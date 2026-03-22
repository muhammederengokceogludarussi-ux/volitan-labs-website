# GEMINI.md — Design Instructions for Volitan Labs Website

## Your Role
You are the **visual designer** for this project. Your job is to create stunning, production-ready HTML page designs that will later be converted to Next.js by another AI (Claude). Focus purely on **visual design and frontend code** — not architecture, routing, or backend logic.

## Output Rules
- Save each page design as a separate HTML file inside the `designs/` folder in this project root
- File naming: `designs/homepage.html`, `designs/about.html`, `designs/projects.html`, etc.
- Each file must be a **complete, standalone HTML page** that opens directly in a browser
- Use Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Use Google Fonts via CDN links
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- All styles inline or in `<style>` tags — no external CSS files
- Mobile responsive (test at 375px, 768px, 1440px mentally)

## Project Context

**Volitan Labs** — personal portfolio + app showcase website for a mechanical engineering student who also develops Flutter mobile apps with AI-augmented workflow.

**Key facts about the person:**
- Mechanical engineering student (senior year)
- Flutter mobile app developer (AI-augmented development)
- Building a productivity app called "Focus Space" (coming soon to app stores)
- Won finalist award at Teknofest (Turkey's biggest tech competition) for a drone project
- Built a custom drone from scratch
- Based in Turkey, bilingual Turkish/English
- University: studying mechanical engineering, high GPA
- Social: GitHub + LinkedIn active
- Values: precision engineering, innovation, quality craftsmanship, collaboration

## Design Direction

### Vibe
Think **linear.app meets vercel.com meets edqe.me** — dark, polished, layered, alive. Not a generic template. Not "AI-generated looking." It should feel like a premium product site, not a student portfolio.

### Must-Have Visual Elements
- **Aurora/gradient backgrounds** — large, slow-moving blurred color orbs behind content
- **Glassmorphic cards** — semi-transparent, backdrop-blur, subtle borders
- **Glowing accents** — colored box-shadows on hover, gradient borders
- **Background patterns** — subtle dot grids or line grids with edge fade
- **Micro-animations** — hover lifts, gradient shifts, smooth transitions on everything
- **Layered depth** — surfaces at different z-levels, not everything on the same flat plane
- **Mouse-responsive elements** — CSS hover effects that feel alive

### CRITICAL: Homepage Must Be Highly Interactive
The homepage is the most important page. It must feel **alive and interactive**, not like a static poster. Requirements:
- **Every card/element should react to hover** — lift, glow, tilt, border light, scale, or spotlight effect
- **Mouse-tracking effects** — gradient glow that follows cursor on cards, spotlight on hero
- **Scroll-triggered animations** — elements should animate in as user scrolls (fade up, blur-to-sharp, scale in)
- **Staggered entrances** — groups of cards/items should appear one by one, not all at once
- **Animated text** — hero title should have gradient animation or typing/reveal effect
- **Button interactions** — shimmer, glow pulse, scale on hover, not just color change
- **Background that moves** — aurora orbs should drift slowly, not be static
- **3D depth on cards** — subtle perspective tilt on mouse move (CSS transform: perspective + rotateX/Y)
- Think of it like **linear.app** or **stripe.com** — every pixel responds to the user

### Color Palette

```
Background:          #0A0A0F (deep dark, not pure black)
Surface:             #141419
Surface Elevated:    #1E1E26
Border:              rgba(255, 255, 255, 0.06)
Border Hover:        rgba(139, 108, 240, 0.3)

Text Primary:        #F0F0F5
Text Secondary:      #8A8A9A
Text Muted:          #5A5A6A

Accent Primary:      #8B6CF0 (purple)
Accent Secondary:    #E8A040 (amber)
Accent Tertiary:     #64B4FF (blue, for subtle background orbs)

Glass BG:            rgba(255, 255, 255, 0.03)
Glass Border:        rgba(255, 255, 255, 0.06)
Glow:                rgba(139, 108, 240, 0.15)
Strong Glow:         rgba(139, 108, 240, 0.25)
```

### Typography
- **Headings:** "Sora" (Google Font) — bold, tight tracking (-0.03em)
- **Body:** "Inter" (Google Font) — regular weight, generous line-height (1.7)
- **Code/Mono:** "JetBrains Mono" (Google Font) — for any tech labels or code snippets
- Hero title: 64-80px desktop, 36-40px mobile
- Section titles: 36-48px desktop
- Body: 16-18px
- Small/labels: 14px

### Anti-Generic Rules (CRITICAL)
- **NO** default Tailwind colors (blue-500, indigo-600, gray-800). Use the custom palette above.
- **NO** flat `shadow-md`. Use layered, color-tinted shadows: `shadow-[0_0_30px_rgba(139,108,240,0.15)]`
- **NO** `transition-all`. Only transition specific properties.
- **NO** boring cards. Every card should have glass effect + glow on hover.
- **NO** plain buttons. Primary = gradient bg + glow shadow hover. Secondary = glass + border glow hover.
- **NO** empty backgrounds. Every section should have at least a subtle gradient, dot pattern, or aurora orb.
- **EVERY** clickable element needs hover, focus-visible, and active states.

## Pages to Design

### Page 1: Homepage (`designs/homepage.html`) — START WITH THIS
Sections in order:
1. **Navbar** — floating pill shape, centered, glass background, blur. Links: Home, About, Projects, Apps, Blog, Contact. Right side: language toggle (TR/EN icon), theme toggle (sun/moon icon)
2. **Hero** — "Hi, I'm" small text, "Volitan Labs" large gradient-animated text, "Mechanical Engineer & Mobile App Developer" subtitle, short description paragraph, 2 CTA buttons (gradient primary + glass secondary), right side: abstract glowing orb/visual element, aurora gradient background
3. **Skills** — bento grid layout (one card spanning 2 cols for Flutter as the main skill), 5 cards total: Flutter/Mobile, AI/ML, Mechanical Engineering, Full-Stack Web, Systems/Embedded. Each card: glass card with icon, title, short description
4. **Featured Project** — Focus Space app showcase. Left: phone mockup area with glow behind it. Right: app name, tagline, feature list, CTA button. Glass cards for features.
5. **Blog Preview** — section heading + 2-3 blog post cards (glass cards, with date, title, description, tags, read more link)
6. **CTA** — "Let's work together" section, gradient animated heading, description text, big gradient CTA button, aurora background
7. **Footer** — logo, navigation links, social icons (GitHub, LinkedIn, Email), copyright text, "Built with Next.js" note

### Page 2: About (`designs/about.html`)
1. Hero — name + title + subtitle
2. Story — 2 paragraphs about the journey from mechanical engineering to app development
3. Timeline — career/education milestones (vertical timeline with gradient line and dots)
4. Achievements — Teknofest award card (prominent, accent glow), drone project card
5. Skills — 3-column grid: Engineering skills, Software skills, Tools. Each as glass card with skill tags inside
6. Values — 4 small cards: Precision, Innovation, Quality, Collaboration
7. Education — university cards with degree, school name, GPA badge
8. Connect — social links + CV download button

### Page 3: Projects (`designs/projects.html`)
1. Header — "Projects" title + filter tabs (All, Mobile, Engineering, Web)
2. Project grid — glass cards with: image placeholder, title, description, tech tags, GitHub/live links
3. Background grid pattern

### Page 4: Contact (`designs/contact.html`)
1. Hero — "Get in Touch" + subtitle
2. Contact cards — Email card, GitHub card, LinkedIn card (each as glass card with icon)
3. Aurora background

### Page 5: Apps (`designs/apps.html`)
1. Hero — "Apps" title
2. App card(s) — Focus Space showcase card (large, featured, glass card with app icon, description, status badge "Coming Soon", features preview)

## Iteration Workflow
1. Design the homepage first
2. Wait for feedback
3. Iterate until approved
4. Move to next page

## What NOT to Do
- Don't worry about Next.js, React, routing, or i18n — that's Claude's job
- Don't add real images — use placehold.co
- Don't add JavaScript interactivity beyond CSS hover/transitions — keep it pure HTML+CSS+Tailwind
- Don't create a design system document — just design the pages
- Don't be conservative — go bold with effects, glows, gradients. More is more for this project.
