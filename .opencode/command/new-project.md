---
description: Scaffold a new project entry under src/content/projects
---

Create a new project entry in `src/content/projects/`.

Project name/slug: $ARGUMENTS

Steps:

1. Create `src/content/projects/<slug>.mdx` using the same frontmatter shape as the other
   project files: `title`, `description`, `date`, `draft: false`, `showHeroImage: false`,
   `tags`, `comments: false`, and `sidebar: { enable: false, toc: true }`.
2. Reuse the section structure from `example-project.mdx`: Problem, What I built,
   Key decisions, Result, Links.
3. Write the description for a recruiter skimming the projects index: what it is, who it is
   for, and the outcome.

Match the tone and formatting of the existing entries, then run `bun run format:check`.
