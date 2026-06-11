@AGENTS.md

# Yago Calomino — Portfolio

## Owner
Yago Calomino — Data Engineer, Full-Stack Developer, Process Automation specialist (Lean Six Sigma).

## Identity
Dual professional identity: **primary** Data Engineering / Data Analysis / Process Automation; **secondary** Full-Stack Development. Both must be visible and credibly represented.

## Hard Constraints
- **Static vitrine only** — no databases, no backend, no server-side AI integrations. `output: 'export'` in next.config.ts. GitHub Pages deployment.
- **Social links**: GitHub and LinkedIn ONLY. No Instagram, Twitter, or any other platform.
- **Must have**: Resume PDF download section + professional contact area.
- **Image optimization**: use `images: { unoptimized: true }` because Next.js default image optimizer is incompatible with static export.
- **Contact email**: `yagoferrocalomino@gmail.com`

## Stack
- Next.js 16.2.7 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (`@import "tailwindcss"` syntax — NOT v3 config)
- shadcn/ui (Tailwind v4 compatible variant)
- Geist Sans + Geist Mono fonts (already in layout)

## Tailwind v4 Rules
- Config is `postcss.config.mjs` only — no `tailwind.config.js`.
- Theme tokens go inside `@theme { }` block in `globals.css`.
- Use `@import "tailwindcss"` at top of CSS — NOT `@tailwind base/components/utilities`.

## Design Direction
Dark-first analytical aesthetic: near-black background, slate grays for surfaces, electric indigo/teal accent (`#6366f1` / `#14b8a6`), monospace accents for data-flavored elements.

## Planning
GSD workflow — see `.planning/ROADMAP.md` for phase breakdown.
Active state tracked in `STATE.md`.
