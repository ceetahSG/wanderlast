<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlast

Early-stage travel landing site: Next.js 16 (App Router, Turbopack), React 19, Tailwind v4, shadcn `base-nova` UI. All code lives in `src/`; `src/app/page.tsx` is still a placeholder.

## Commands

- `npm run dev` — dev server on :3000. Cache Components, Partial Prefetching and React Compiler are already enabled in `next.config.ts`.
- `npm run build` — production build; it type-checks but does **not** lint.
- `npm run lint` — runs `eslint` directly (`next lint` no longer exists in Next 16).
- `npx tsc --noEmit` — standalone typecheck.
- No test runner, CI, or pre-commit hooks are configured. Full verification is `npm run lint && npx tsc --noEmit && npm run build`.

Typecheck depends on generated route types: `LayoutProps<"/">` / `PageProps<"/route">` come from `.next/dev/types/routes.d.ts`. After cloning or adding/renaming routes, run `npm run dev` (or `npm run build`) before `tsc`. `next-env.d.ts` is gitignored and regenerated.

Known lint baseline (pre-existing, in generated shadcn files): `react-hooks/set-state-in-effect` errors at `src/components/ui/carousel.tsx:98` and `src/hooks/use-mobile.ts:14`. Don't treat them as regressions.

## Framework gotchas

- Read `node_modules/next/dist/docs/` for the installed version before using Next APIs; training data is likely older.
- With `cacheComponents: true`, uncached data or runtime API access (cookies, headers, searchParams) must be inside `<Suspense>` or wrapped with `"use cache"`; otherwise dev shows a blocking-route error and the build fails. `partialPrefetching: true` also changes `<Link>` prefetch behavior (App Shell only by default).
- Next 16 renamed `middleware.ts` to `proxy.ts` and made request APIs async (`params`/`searchParams` are Promises).

## UI and styling

- Tailwind v4 has no `tailwind.config.*`. Theme tokens, radii and dark-mode variants live in `src/app/globals.css` (`@theme inline` + oklch CSS vars). Tailwind is loaded through the `@tailwindcss/turbopack` rule in `next.config.ts`.
- `src/components/ui/*` are shadcn `base-nova` components built on **Base UI** (`@base-ui/react`), not Radix — APIs, `render` props and `data-open`/`data-closed` variants differ from Radix examples. Prefer `npx shadcn add <component>` over hand-writing them.
- Those generated files import `cn` from the `cn` package; `src/lib/utils.ts` is only a re-export. Don't "fix" the imports to `@/lib/utils`.
- Images are imported from `src/assets/` as modules. `public/` still holds unused create-next-app SVGs.
- Shiki highlighting (`src/lib/highlighter.tsx`) only supports the languages listed in its `languages` map; add a lazy import there for new ones.

## Conventions

- Import alias: `@/*` → `src/*`.
- UI primitives are client components marked with `"use client"`; keep pages/layouts server components unless interactivity requires otherwise.
