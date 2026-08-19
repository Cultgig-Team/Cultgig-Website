# Cultgig Website

Cultgig is the web entry point for a two-sided creative marketplace. This MVP lets independent artists and businesses create a real profile through an email-verified onboarding flow.

## Scope

Built now: marketing pages, responsive navigation, profile onboarding, Appwrite email-token verification, uploads, and one onboarding collection. Not built: search, public profiles, sign-in sessions, bookings, payments, messaging, gig posts, or notifications.

## Stack

React 18, TypeScript (strict), Vite, Tailwind CSS, CSS design tokens, Framer Motion, lucide-react, and Appwrite. Routing is a small in-house History API layer in `src/app/App.tsx`.

## Routes

`/`, `/about`, `/how-it-works`, `/for-artists`, `/for-businesses`, `/faq`, `/contact`, `/privacy`, `/terms`, plus an on-brand 404.

## Architecture

- `src/app` — application shell and routing
- `src/components` — UI, layout, and onboarding components
- `src/config` / `src/content` — site settings, navigation, and FAQ content
- `src/lib` — isolated Appwrite client, auth, storage, and submission modules
- `src/state` / `src/types` — reducer-backed onboarding state and typed data contracts
- `src/routes` / `src/styles` — pages and global design tokens

## Onboarding

Artist flow: email → OTP → role → name → location/travel → optional bio → category → optional portfolio/social → budget → optional experience/interests → submission.

Business flow: email → OTP → role → name → optional contact details → location → optional business story → business type → optional social/photos → submission.

Profiles are saved into one Appwrite collection. Artist/client submissions preserve the field contract in `src/types/onboarding.ts`.

## Appwrite setup

Create an Appwrite web platform for your deployed domain, an onboarding database/collection, and an `onboarding-media` storage bucket. Configure collection attributes for the documented submission fields: email, role, fullName, photoUrl, city, bio, category, portfolioUrls, social links, artist budget/travel/experience/interests, and client business details.

Copy `.env.example` to `.env` and set:

```env
VITE_APPWRITE_ENDPOINT=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_ONBOARDING_COLLECTION_ID=
VITE_APPWRITE_MEDIA_BUCKET_ID=
```

Never commit `.env`. Without Appwrite values, production email verification reports a configuration error; local development has a clearly labelled dev-only OTP preview.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

Deploy the generated `dist/` directory to static hosting with SPA history fallback enabled.

## Design and accessibility

The exact Cultgig plum/blush token palette, Poppins headings, Inter UI/body text, rounded pill buttons, and rounded cards are defined in `src/styles/globals.css` and exposed to Tailwind. Navigation and modal controls include accessible names, keyboard focus handling, Escape support, focus trapping, visible focus states, responsive drawer navigation, labelled form controls, and reduced-motion support.

## Known limitations and roadmap

Photography is now stored in `public/images` and referenced through `src/content/images.ts`; replace these curated placeholders with approved production photography before launch. Replace the support/legal/social placeholders in `src/config/site.ts` before launch. The live site’s deployed metadata may come from a separate pipeline; verify deployment ownership before release. Client-side metadata now includes canonical and OG image tags, but static hosting still serves the Vite shell before JavaScript executes, so a prerendering step remains a deployment consideration for crawler/social-scraper coverage.

The motion system uses named `micro`, `fast`, `standard`, `reveal`, and `emphasis` durations plus the shared spring token in `src/styles/motion.ts`. `HumanImageCard` supports `rect`, `circular`, `offset`, and `overlap` compositions for representative creator imagery.

Future work, explicitly not included here: browse/search, public profiles, real login/session management, bookings, messaging, and gig posting.
