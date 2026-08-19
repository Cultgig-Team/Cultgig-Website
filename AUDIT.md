# Cultgig Phase 0 Audit

Audit date: 2026-08-19
Repository: `Cultgig-Team/Cultgig-Website`

## A. Stack And Architecture

- **Framework:** React 18.3 with TypeScript 7 and Vite 8.2. The app has one root at `src/main.tsx` and one Vite configuration.
- **Rendering:** Pure client-side rendering. `src/app/App.tsx` selects pages from `location.pathname` after the browser loads the Vite shell. There is no SSR, SSG, ISR, or prerendering pipeline.
- **Router:** A small in-house History API layer. `Link` intercepts internal anchors, `history.pushState` updates routes, and `popstate` handles browser navigation. The public routes are listed in `src/app/routes.ts`.
- **Styling:** Tailwind CSS is configured, but the primary production styling lives in `src/styles/globals.css` and `src/styles/visual.css`, with CSS custom properties consumed by Tailwind aliases. There are no CSS modules or styled-components.
- **Design tokens:** Existing tokens include Cultgig plum `#6B2C63`, dark plum `#551F4F`, blush `#E9C2E0`, white/surface neutrals, text/border colors, semantic success/error colors, and soft/raised/floating shadows. Typography is Poppins for headings and Inter for body/UI.
- **State:** React context and local component state. `src/state/onboardingContext.tsx` owns onboarding data; there is no Redux, Zustand, React Query, or server-state library.
- **Backend:** Appwrite browser SDK. `src/lib/appwrite.ts` configures the public endpoint/project; `appwriteAuth.ts` handles email OTP sessions; `appwriteSubmissions.ts` writes onboarding documents; `appwriteStorage.ts` uploads media.
- **Animation:** Framer Motion with shared primitives in `src/components/motion/MotionPrimitives.tsx` and named values in `src/styles/motion.ts`. Reduced-motion handling exists for reveal, tilt, parallax, and floating effects.
- **Tests/tooling:** `package.json` currently defines `dev`, `build`, and `preview` only. No test runner, ESLint config, Prettier config, or CI workflow is present in the inspected repository.
- **Deployment:** The repo contains Vite static-hosting artifacts (`public/robots.txt`, `public/sitemap.xml`) and no `vercel.json`, server entrypoint, or framework deployment adapter. Hosting must provide SPA history fallback for direct routes.

## B. Brand Truth

- **Name and positioning:** Cultgig is a platform/community for independent artists, creative talent, freelancers, venues, brands, organizers, and businesses to create structured profiles and build toward better creative discovery.
- **Tagline:** `Where Artists & Gigs Get Discovered.`
- **Brand mark:** No separate logo image or SVG mark was found. The current wordmark is rendered as styled text (`Cultgig`) in the shared header/footer.
- **Palette:** The repository confirms a plum/blush light-first identity, not the reference brief's lime/near-black system. Primary `#6B2C63`; dark primary `#551F4F`; secondary blush `#E9C2E0`; light tint `#F4E9F2`; white and soft neutral surfaces; near-black text. The redesign must preserve this identity.
- **Typography:** Poppins is loaded for display headings and Inter for body/UI through `src/styles/globals.css`. Kanit is not part of Cultgig's existing brand and must not be introduced merely to copy the reference.
- **Voice:** Direct, human, creator-focused, transparent, and careful not to promise capabilities that are not implemented. Existing copy repeatedly describes the marketplace as in progress and distinguishes profile creation from future discovery/booking.
- **Business model confirmed by repo:** Artists and clients/businesses complete role-specific profile onboarding. Email verification is implemented. Profile/media data is saved to Appwrite. Public browse/search, booking, payments, messaging, and guaranteed work are explicitly future scope or unavailable in the current codebase. No public pricing or fee structure is present.

## C. Site Structure

### Public routes

| Route | Current implementation | Audience |
| --- | --- | --- |
| `/` | `HomePage` with hero, audience split, workflow, categories, creator showcase, trust, FAQ preview, CTA | Public |
| `/about` | Shared `InfoPage` with Cultgig mission copy and image | Public |
| `/how-it-works` | Shared `InfoPage` with honest current/future workflow copy | Public |
| `/for-artists` | Shared `InfoPage` with artist CTA and image | Artists |
| `/for-businesses` | Shared `InfoPage` with client CTA and image | Businesses/venues |
| `/faq` | FAQ page with animated accessible accordion | Public |
| `/contact` | Shared info page with deployment-configured contact email | Public |
| `/privacy` | Shared legal page | Public/legal |
| `/terms` | Shared legal page | Public/legal |
| unknown path | `NotFoundPage` | Public |

There are no authenticated dashboards, artist profile detail routes, gig listing/search routes, booking routes, payments, or messaging routes in this repository. Those must not be fabricated as part of a visual redesign.

### Shared architecture

- Layout: `src/components/layout/Header.tsx` and `Footer.tsx`.
- Motion: `src/components/motion/MotionPrimitives.tsx`.
- UI: `Button.tsx`, `CategoryCard.tsx`, and `HumanImageCard.tsx`.
- Onboarding: `OnboardingModal.tsx`, `onboardingContext.tsx`, Appwrite libraries, and typed onboarding models.
- Content: `src/content/home.ts`, `faq.ts`, `images.ts`, and `testimonials.ts`.
- Page composition: currently centralized in `src/routes/Pages.tsx` and selected from `App.tsx`.

## SEO, Accessibility, Security, And Performance

- **SEO today:** `usePageMeta()` sets title, description, canonical, Open Graph, and Twitter/X tags in the browser. `index.html` has static home metadata. `public/robots.txt`, `public/sitemap.xml`, and `public/og-image.jpg` exist.
- **SEO limitation:** All public pages are pure CSR, so crawlers that do not execute JavaScript receive the Vite shell and home metadata rather than route-specific content. This is a known architectural limitation and a framework/prerendering decision, not something to silently rewrite during this design pass.
- **Structured data:** No JSON-LD Organization, WebSite, FAQPage, Person, Event, or LocalBusiness schema is currently present. Organization/WebSite/FAQPage are reasonable additions only where supported by real data.
- **Accessibility strengths:** Semantic links/buttons, visible `:focus-visible` states, mobile focus trap, dialog semantics, labelled form controls, `aria-current` navigation state, FAQ `aria-expanded`/`aria-controls`, and reduced-motion branches are present.
- **Accessibility risks to address:** Header active state reads `location.pathname` directly rather than reactive route state; motion-heavy decorative effects need mobile/reduced-motion QA; large display type and image overlays need contrast checks at every breakpoint; the onboarding dialog should receive an explicit initial focus target and robust labelled heading.
- **Security strengths:** Appwrite endpoint/project configuration is public client configuration by design; no dangerous HTML APIs or secrets are expected in source; `.env` is gitignored; `npm audit` was clean in the previous pass.
- **Security manual blocker:** Appwrite collection and bucket permissions cannot be verified from this repo. Guest users must have only the required create/upload permissions, while read access to personal submissions must be restricted to authenticated admin/team roles. This remains a pre-launch check documented in `SECURITY.md`.
- **Performance baseline:** Local JPEGs are imported through Vite from `src/assets/images`, emitted with hashed filenames, and noncritical images are lazy-loaded. Hero imagery is eager. Existing scroll work uses Framer Motion transforms and passive listeners where applicable. There is no automated Lighthouse budget, responsive screenshot suite, or route-level code splitting yet.

## D. Design Token Proposal

The reference brief contributes composition, typography scale, section rhythm, numbered lists, sticky-card ideas, and restrained motion. Its literal Jack identity, Kanit font, lime accent, dark-only theme, remote imagery, project names, and service copy are rejected.

```css
--color-bg-dark: #1c0e1a;        /* Cultgig dark plum canvas */
--color-bg-light: #ffffff;       /* Existing primary surface */
--color-bg-soft: #faf7fa;        /* Existing soft surface */
--color-brand-accent: #e9c2e0;   /* Blush accent on dark sections */
--color-brand-primary: #6b2c63;  /* Existing Cultgig plum */
--color-brand-deep: #551f4f;     /* Existing dark plum */
--color-text-on-dark: #ffffff;
--color-text-on-light: #1a1a1a;
--color-text-muted: #6f6f76;
--color-border: #e6e1e5;
--color-focus: #d9a0cb;
--color-success: #22a06b;
--color-error: #e24c4c;
--radius-pill: 9999px;
--radius-section-mobile: 40px;
--radius-section-tablet: 50px;
--radius-section-desktop: 60px;
```

### Proposed shared primitives

1. Keep and strengthen `Reveal`, `StaggerReveal`, `StaggerItem`, `TiltCard`, and `ParallaxImage`.
2. Add a typed `MagneticElement` only for noninteractive decorative/hero visuals, disabled for touch and reduced motion.
3. Add `ScrollRevealText` for one short mission statement per page, with readable text always present in the DOM.
4. Add `ScrollMarquee` only with real Cultgig image/category data; do not use reference GIF URLs.
5. Add `StickyStackCards` for the existing representative creator/profile showcase, clearly labelled as illustrative rather than live listings.
6. Use shared pill button variants and a gradient heading utility backed by Cultgig plum/blush tokens.

## Recommended Execution Boundary

- **Safe in this redesign:** shared tokens, header/footer polish, homepage section composition, page-specific layouts using existing content/images, motion primitives, FAQ presentation, responsive/accessibility improvements, and metadata/schema improvements supported by real data.
- **Requires explicit product/architecture approval:** migrating Vite CSR to Next.js/SSR, adding dynamic listing/profile routes, implementing booking/payments/messaging, changing Appwrite permissions/schema, rewriting legal copy, or introducing a CMS.
- **First implementation checkpoint:** redesign the shared shell and homepage using Cultgig's current content, then validate desktop/mobile/reduced-motion before propagating the visual system to the remaining public pages.
