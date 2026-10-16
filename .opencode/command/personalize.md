---
description: Replace the remaining template placeholders with real personal details
---

Replace the remaining placeholders across the site with real details.

Files to update:

- `src/config/site.toml`
  - `[config.site]`: `pageTitle`, `pageDescription`, `url`, `repository`
  - `[config.profile]`: `name`, `handle`, `role`, `email`, `website`, `github`
  - `[config.home]`: intro, quote, `doing` items, contact links, LinkedIn URLs
- `src/data/resume.ts`: experience, education, skills, certifications, languages
- `src/content/about.mdx`: bio
- `src/content/projects/*`: real projects
- `public/images/avatar.svg` and the favicons in `public/`

Ask for any values you cannot infer, then apply them consistently. Run
`bun run format:check` and `bun run build` when done.
