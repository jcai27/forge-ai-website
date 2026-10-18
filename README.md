# Forge AI — Website

Marketing site for Forge AI. Built with Vite, React, TypeScript, React Router, and Framer Motion.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

## Pages

| Route           | File                        |
| --------------- | --------------------------- |
| `/`             | `src/pages/Home.tsx`        |
| `/platform`     | `src/pages/Platform.tsx`    |
| `/solutions`    | `src/pages/Solutions.tsx`   |
| `/how-it-works` | `src/pages/HowItWorks.tsx`  |
| `/about`        | `src/pages/About.tsx`       |
| `/contact`      | `src/pages/Contact.tsx`     |
| `/privacy`      | `src/pages/Privacy.tsx`     |

## Design system

Tokens (color, type scale, spacing, radii, shadows, motion) live in `src/styles/tokens.css` and are the
primary source of design values. Styles are layered: `tokens` → `base` (type, layout primitives) →
`components` (buttons, nav, forms) → `mockups` (product UI) → `sections` (homepage) → `pages`.

- Light "paper" surfaces with dark "night" sections for contrast; Forge ember (`--ember`) is used sparingly.
- Type: Geist + Geist Mono. Radii stay between 4px and 14px.
- Motion: reveals on scroll once; ambient loops only inside product illustrations, paused off-screen,
  and disabled under `prefers-reduced-motion`.

## Editing content

- **Contact details, booking link, form endpoint, site URL:** `src/config/site.ts` and `.env` (see `.env.example`).
- **Solutions** (homepage showcase, Solutions page, footer): `src/data/solutions.ts`.
- **Animated workflows** (hero command center and Platform demo): `src/data/flows.ts`.
- **Process stages and engagement phases:** `src/data/process.ts`.
- **Product illustrations:** `src/components/mockups/`. All are illustrative and labeled as such;
  sample figures are marked "Sample data".

## Contact form

- If `VITE_CONTACT_ENDPOINT` is set, the form POSTs JSON to it (works with Formspree, Basin, or your own API).
- If it is not set, submitting opens the visitor's email client with the message pre-filled, addressed to `site.email`.
- If `VITE_BOOKING_URL` is set (e.g. Calendly or Cal.com), every "Book a Consultation" button links to it. Otherwise those buttons go to `/contact?intent=consultation`.

## Deploy

**GitHub Pages (current):** every push to `main` builds and deploys via `.github/workflows/deploy.yml`.
The workflow sets `BASE_PATH` to `/<repo-name>/` and copies `index.html` to `404.html` so deep links work.
To configure the contact form or booking link there, add `VITE_CONTACT_ENDPOINT` / `VITE_BOOKING_URL`
as repository **variables** (Settings → Secrets and variables → Actions → Variables).

This is a static single-page app, so `dist/` also deploys to any other static host. SPA fallbacks are included for
Netlify (`public/_redirects`) and Vercel (`vercel.json`).

## Before launch

- Replace the placeholder email in `src/config/site.ts`.
- Set `VITE_CONTACT_ENDPOINT` and, if you want, `VITE_BOOKING_URL`.
- Have the privacy notice (`src/pages/Privacy.tsx`) reviewed.
