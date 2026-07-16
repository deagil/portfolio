## Learned User Preferences

- When comparing or updating the site, treat their resume as the reference for roles, dates, and narrative alignment.
- Prefer internal role detail pages at `/work/[slug]` for important jobs instead of sending timeline rows straight to external company URLs.
- Show organization logos from `public/logos` immediately before timeline titles; render marks on the page background without a boxed or card-style wrapper around icons; honor specified asset files when they name them (for example PNG versus SVG).
- When they ask for resume alignment on the home page, limit the career timeline to jobs and education; keep writing, projects, and highlights out of that list unless they ask otherwise.
- Home timeline rows lead with the organization icon, title in the middle, and dates right-aligned; no cursor-following preview tooltip and no title underline on hover.
- Jobs may optionally show a media row of screenshots/gifs under the title; thumbs open a lightbox with close/back-out and a path through to the role detail page, while the title row still navigates directly.
- Keep the hero and opening copy aligned with resume positioning (for example software and product engineer, platform systems, fintech and accelerator arc) rather than alternate framings unless they request a change.
- Prefer work detail pages to match the home page’s plain spacing (no separators): company external link and date on the top row, title, short context paragraph, unfaded technology logos from `public/logos`, then resume-style bullets instead of narrative copy; keep outcome citations factual rather than promotional.
- On work detail pages, lead the top meta row with the company name as an external link (no arrow or underline), then the date range, both left-aligned.
- Prefer date ranges as abbreviated forms like `Jan '22`; for ongoing roles show the current month/year instead of `Present`; style the current role with darker text rather than bold.
- Prefer home timeline job links to open role details in a route-driven overlay: a wide, internally scrollable dialog on desktop and a swipe-dismissable bottom sheet on mobile, while preserving direct full-page visits.

## Learned Workspace Facts

- This site is a Next.js portfolio; job pages live under `/work/{slug}` with long-form content in `content/work/` and structured fields in `lib/jobs.ts`.
- The home timeline is built from jobs and education data; timeline rows can carry `icon` paths and optional `screenshots` pointing at assets under `public`.
- Optional job media expands via `components/timeline/timeline-media-row.tsx` and shared `components/media-lightbox.tsx` (also used by highlights).
- Date range formatting is centralized in `lib/date-format.ts` (`Jan '22` style; current month/year for ongoing roles).
- Work pages can show an Open Graph–style citation strip of press/external links with fetched preview images via `components/work-citation-strip.tsx` and `lib/work-citations.ts`.
- Homepage highlight photos are sourced from `public/photos/` (including year subfolders) and configured in `lib/highlights.ts`.
- Work-link overlays use a Next.js intercepted `@modal` route with shared content in `components/work-article.tsx` and responsive dialog/drawer behavior in `components/work-preview.tsx`.
