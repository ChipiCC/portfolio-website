# Portfolio

A personal portfolio built with [Astro](https://astro.build): a fast, content-first site
for selected projects, a résumé, and short notes. Static output, near-zero JavaScript on
content pages, and everything editable from Markdown/MDX plus one config file.

## Stack

- Astro 7 + TypeScript
- Tailwind CSS 4 (via Vite)
- MDX content collections with typed frontmatter
- Pagefind full-text search

## Requirements

- [Bun](https://bun.sh) 1.4+
- Node.js 24 (LTS)

The toolchain is pinned with [mise](https://mise.jdx.dev) in `.mise.toml`. If you use mise:

```sh
mise trust
mise install
```

## Setup

```sh
bun install
bun run dev        # http://localhost:4321
```

## Personalize

Most content lives in two places.

### `src/config/site.toml`

- `[config.site]` — title, descriptions, canonical URL, repository, footer note
- `[config.profile]` — name, handle, role, email, website, GitHub, avatar
- `[config.theme]` — palette and UI language
- `[config.format]` — date format and metadata separator
- `[[config.topNav.links]]` — top navigation
- `[config.home]` — hero quote, intro, navigation cards, contact links, current focus
- `[config.pages.*]` — page copy for Projects and Vibe

### `src/content/`

```text
src/content/about.mdx            About page
src/content/projects/index.mdx   Projects index intro
src/content/projects/*.mdx       One file per project
src/content/vibe/*.md            Short notes
```

Create a new note with the built-in script:

```sh
bun run vibe:new today
```

## Résumé

The résumé page is generated from typed data:

- `src/data/resume.ts` — experience, education, skills, certifications, languages
- `src/pages/resume.astro` — layout, print-to-PDF styling, and `Person` JSON-LD

Edit `src/data/resume.ts` to update the résumé; the page updates automatically. The
"Download PDF" button uses the browser's print dialog with a dedicated print stylesheet.

## Scripts

| Script                 | Description                  |
| ---------------------- | ---------------------------- |
| `bun run dev`          | Start the dev server         |
| `bun run build`        | Astro build + Pagefind index |
| `bun run preview`      | Preview the production build |
| `bun run lint`         | ESLint                       |
| `bun run format`       | Prettier                     |
| `bun run format:check` | Lint + Prettier check        |
| `bun run vibe:new`     | Scaffold a new note          |

## Deployment

The site is static and deploys anywhere. The included
`.github/workflows/deploy-pages.yml` publishes to GitHub Pages on push to `master`;
`astro.config.mjs` derives the site URL and base path from the repository automatically.

## Project structure

```text
public/                     Static assets (avatar, favicons, fonts)
src/
  components/               UI: cards, article, comments, widgets
  config/site.toml          Site configuration
  content/                  Markdown/MDX content
  data/resume.ts            Résumé data
  layouts/                  Base and article layouts
  pages/                    Routes (/, /projects, /resume, /vibe, /about)
  styles/                   Global theme, palette, typography
  utils/                    Build and runtime helpers
```
