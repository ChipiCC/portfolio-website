# Portfolio

A personal portfolio built with [Astro](https://astro.build): a fast, content-first site
for selected projects, a résumé, and short notes. Static output, near-zero JavaScript on
content pages, and everything editable from Markdown/MDX plus one config file.

## Stack

- Astro 7 + TypeScript
- Tailwind CSS 4 (via Vite)
- MDX content collections with typed frontmatter
- Pagefind full-text search
- Font subsetting with FontTools (build-time)

## Requirements

- [Bun](https://bun.sh) 1.4+
- Node.js 24 (LTS)
- Python 3.12 with `fonttools` and `brotli` — needed for production builds only

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

`bun run dev` does not require Python. For a production build, create the virtualenv the
build script prefers:

```sh
python -m venv .venv
.venv/bin/python -m pip install fonttools brotli
PATH=.venv/bin:$PATH bun run build   # fonts + astro build + pagefind
bun run preview
```

## Personalize

Most content lives in two places.

### `src/config/site.toml`

- `[config.site]` — title, descriptions, canonical URL, repository, footer note
- `[config.profile]` — name, handle, role, email, website, GitHub, avatar
- `[config.theme]` — palette and UI language
- `[[config.topNav.links]]` — top navigation
- `[config.home]` — hero quote, intro, navigation cards, contact links, current focus
- `[config.pages.*]` — page copy for Projects, Vibe, and Notes

### `src/content/`

```text
src/content/about.mdx            About page
src/content/projects/index.mdx   Projects index intro
src/content/projects/*.mdx       One file per project
src/content/vibe/*.md            Short notes
src/content/blog/*.md            Notes (blog collection, hidden from nav)
```

Create content with the built-in scripts:

```sh
bun run post:new my-note
bun run vibe:new today
```

## Résumé

The résumé page is generated from typed data:

- `src/data/resume.ts` — experience, education, skills, certifications, languages
- `src/pages/resume.astro` — layout, print-to-PDF styling, and `Person` JSON-LD

Edit `src/data/resume.ts` to update the résumé; the page updates automatically. The
"Download PDF" button uses the browser's print dialog with a dedicated print stylesheet.

## Scripts

| Script                          | Description                                      |
| ------------------------------- | ------------------------------------------------ |
| `bun run dev`                   | Start the dev server                             |
| `bun run build`                 | Font subsetting, Astro build, and Pagefind index |
| `bun run preview`               | Preview the production build                     |
| `bun run lint`                  | ESLint                                           |
| `bun run format`                | Prettier                                         |
| `bun run format:check`          | Lint + Prettier check                            |
| `bun run post:new` / `vibe:new` | Scaffold new content                             |

## Deployment

The site is static and deploys anywhere. The included
`.github/workflows/deploy-pages.yml` publishes to GitHub Pages on push to `master`;
`astro.config.mjs` derives the site URL and base path from the repository automatically.

## Project structure

```text
public/                     Static assets (avatar, favicons, fonts)
src/
  components/               UI: cards, blog, article, widgets, comments
  config/site.toml          Site configuration
  content/                  Markdown/MDX content
  data/resume.ts            Résumé data
  layouts/                  Base and article layouts
  pages/                    Routes (/, /projects, /resume, /vibe, /about, /blog)
  styles/                   Global theme, palettes, typography
  utils/                    Build and runtime helpers
```
