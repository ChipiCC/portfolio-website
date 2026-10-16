# AGENTS.md

Guidance for AI agents working in this repository.

## What this is

A static personal portfolio built with Astro 7. Content-first: most of the site is
Markdown/MDX plus a single TOML config file. Deployed to GitHub Pages.

Routes: `/` (dashboard), `/projects`, `/resume`, `/vibe`, `/about`, `404`.

## Toolchain

- **Bun** 1.4 (package manager + script runner)
- **Node.js 24 (LTS)**
- Pinned via `mise` in `.mise.toml`

No Python or other runtimes are required — the build is pure Bun/Astro/Pagefind.

## Commands

```sh
bun install          # install dependencies
bun run dev          # dev server at http://localhost:4321
bun run build        # astro build + pagefind index into dist/
bun run preview      # preview the production build
bun run lint         # eslint
bun run format       # prettier --write
bun run format:check # lint + prettier --check (also the lint-staged hook)
bun run vibe:new <name>  # scaffold a note in src/content/vibe
```

Always run `bun run format:check` (or `bun run format`) before committing; the pre-commit
hook runs it for staged files and then a full `bun run build`.

## Architecture

```text
src/
  components/
    cards/      Home dashboard cards
    article/    ArticleHeader, TableOfContents, TocTree
    comments/   Giscus / Utterances / Waline (disabled by default)
    layout/     DashboardFlow (home shell)
    widgets/    DoingCard
    TopNav, SiteSearch, BaseHead, Footer, SmartImage, Icon, ...
  config/site.toml   Single source of truth for identity, nav, and page copy
  content/           Markdown/MDX (about, projects, vibe)
  content.config.ts  Typed collection schemas (zod)
  data/resume.ts     Résumé data
  data/site.ts       Typed accessors for site.toml
  layouts/           BaseLayout (shell) + ArticleLayout (article pages)
  pages/             Route files
  styles/            global.css, palettes.css, fonts.css
  utils/             Runtime + build helpers
```

### Key concepts

- **`src/config/site.toml`** drives nearly all chrome: profile, nav links, home cards,
  contact links, page titles, comments, and search. Its shape is validated in
  `src/content.config.ts` (`siteConfig` collection) — update both when adding config.
- **Content collections** (`about`, `projects`, `vibe`) are schema-validated; invalid
  frontmatter fails the build. `projects/index.mdx` is the index intro, not a project.
- **`ArticleLayout`** is shared by About and Projects (and renders the optional TOC and
  comments). Page-specific copy comes from `site.toml`, not the layout.
- **Styling** is plain CSS with custom properties in `global.css`/`palettes.css` plus
  scoped `<style>` blocks. A single palette (`blue-soft`) is shipped.
- **Search** uses Pagefind, indexed from `dist/` at build time (`pagefind.yml`).

## Conventions

- TypeScript everywhere; content frontmatter is typed via zod.
- Prefer editing existing components/config over adding new abstractions.
- Keep user-facing copy out of components — put it in `site.toml` or content files.
- Match the surrounding code style; Prettier + ESLint are enforced.
- Don't commit secrets or local env files.

## Git workflow

`master` is protected by repository rulesets:

- No direct pushes, no force-pushes, no branch deletion.
- Every change must land through a **pull request**.
- A required status check named **`build`** must pass (runs the full build on PRs).

So: create a branch, commit, push, open a PR, and let the `build` check pass before
merging. The deploy job only runs on push to `master` (i.e. after a merge).

## Placeholders to replace

The site still ships template placeholders: `Your Name`, `hello@example.com`,
`Example Corp` in `src/data/resume.ts`, `yourhandle` LinkedIn URLs, `public/images/avatar.svg`,
and the favicons in `public/`.
