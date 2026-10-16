import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

type CollectionSchemaFactory = Extract<
  Parameters<typeof defineCollection>[0]['schema'],
  (...args: any[]) => any
>;

const sidebarSchema = z
  .object({
    enable: z.boolean().optional(),
    toc: z.boolean().optional(),
  })
  .optional();

const remoteImageSchema = z
  .url()
  .refine((src) => /^https?:\/\//i.test(src), 'Remote images must start with http:// or https://');

const siteUrlSchema = z.preprocess((value) => {
  if (typeof value !== 'string') return value;

  const trimmed = value.trim();
  if (!trimmed || /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed)) return trimmed;

  return `https://${trimmed}`;
}, z.url());

const contentImageSchema = ({ image }: Parameters<CollectionSchemaFactory>[0]) =>
  z.union([image(), remoteImageSchema]);

const articleSchema = ({ image }: Parameters<CollectionSchemaFactory>[0]) =>
  z.object({
    title: z.string(),
    description: z.string(),
    // Creation date. Accepts ISO 8601 strings and plain dates such as YYYY-MM-DD.
    date: z.coerce.date(),
    draft: z.boolean().optional().default(false),
    heroImage: z.optional(contentImageSchema({ image })),
    showHeroImage: z.boolean().optional().default(true),
    tags: z.array(z.string()).optional().default([]),
    comments: z.boolean().optional().default(true),
    sidebar: sidebarSchema,
  });

const commentProviderSchema = z.enum(['giscus', 'utterances', 'waline', 'none']);
const paletteSchema = z.enum(['blue-soft']);

const collapseStyleSchema = z.enum([
  'github',
  'collapsible-start',
  'collapsible-end',
  'collapsible-auto',
]);

const defaultCodeConfig = {
  lightTheme: 'catppuccin-latte',
  darkTheme: 'catppuccin-macchiato',
  lineNumbers: true,
  wrap: true,
  preserveIndent: true,
  collapseStyle: 'github',
} as const;

const defaultFontConfig = {
  en: 'Maple Mono',
  code: 'Monaco',
};

const nonEmptyStringSchema = (fallback: string) =>
  z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.string().trim().min(1).optional().default(fallback),
  );

const defaultGiscusConfig = {
  repo: '',
  repo_id: '',
  category: '',
  category_id: '',
  mapping: 'pathname',
  strict: '0',
  reactions_enabled: '1',
  emit_metadata: '0',
  input_position: 'bottom',
  light_theme: 'github-light',
  dark_theme: 'github-dark',
  lang: 'en',
  loading: 'lazy',
};

const defaultUtterancesConfig = {
  repo: '',
  issue_term: 'pathname',
  label: 'comment',
  theme: 'github-light',
};

const defaultWalineConfig = {
  server_url: '',
  lang: 'en',
  dark: 'html.dark',
  pageview: true,
  comment: true,
};

const defaultCommentsConfig = {
  enabled: false,
  provider: 'none',
  show_on_posts: true,
  giscus: defaultGiscusConfig,
  utterances: defaultUtterancesConfig,
  waline: defaultWalineConfig,
} satisfies {
  enabled: boolean;
  provider: z.infer<typeof commentProviderSchema>;
  show_on_posts: boolean;
  giscus: typeof defaultGiscusConfig;
  utterances: typeof defaultUtterancesConfig;
  waline: typeof defaultWalineConfig;
};

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.string().optional(),
  disabled: z.boolean().optional().default(false),
});

const navigationItemSchema = z.object({
  icon: z.string(),
  title: z.string(),
  subtitle: z.string(),
  href: z.string(),
});

const homeLinkSchema = z.object({
  label: z.string(),
  icon: z.string(),
  tooltip: z.string().trim(),
  copy: z.boolean(),
});

const defaultPagesConfig = {
  projects: {
    title: 'Projects',
    kicker: 'Project shelf',
    subtitle: 'Small tools and site systems.',
    note: 'A compact shelf for implementation choices, releases, and publishing experiments.',
  },
  vibe: {
    title: 'vibe',
    kicker: '',
    subtitle: 'Life and coding fragments.',
    note: 'Not formal enough for a project writeup, but still part of the story.',
    showTrail: true,
  },
} as const;

const projectsPageSchema = z.object({
  title: z.string().optional().default(defaultPagesConfig.projects.title),
  kicker: z.string().optional().default(defaultPagesConfig.projects.kicker),
  subtitle: z.string().optional().default(defaultPagesConfig.projects.subtitle),
  note: z.string().optional().default(defaultPagesConfig.projects.note),
});

const vibePageSchema = z.object({
  title: z.string().optional().default(defaultPagesConfig.vibe.title),
  kicker: z.string().optional().default(defaultPagesConfig.vibe.kicker),
  subtitle: z.string().optional().default(defaultPagesConfig.vibe.subtitle),
  note: z.string().optional().default(defaultPagesConfig.vibe.note),
  showTrail: z.boolean().optional().default(defaultPagesConfig.vibe.showTrail),
});

const siteConfig = defineCollection({
  loader: file('./src/config/site.toml'),
  schema: z.object({
    site: z.object({
      title: z.string(),
      description: z.string(),
      pageTitle: z.string(),
      pageDescription: z.string(),
      url: siteUrlSchema,
      repository: z.url(),
      footerNote: z.string(),
    }),
    theme: z
      .object({
        palette: paletteSchema.optional().default('blue-soft'),
        lang: z.string().optional().default('en'),
      })
      .optional()
      .default({
        palette: 'blue-soft',
        lang: 'en',
      }),
    fonts: z
      .object({
        en: nonEmptyStringSchema(defaultFontConfig.en),
        code: nonEmptyStringSchema(defaultFontConfig.code),
      })
      .optional()
      .default(defaultFontConfig),
    code: z
      .object({
        lightTheme: z.string().optional().default(defaultCodeConfig.lightTheme),
        darkTheme: z.string().optional().default(defaultCodeConfig.darkTheme),
        lineNumbers: z.boolean().optional().default(defaultCodeConfig.lineNumbers),
        wrap: z.boolean().optional().default(defaultCodeConfig.wrap),
        preserveIndent: z.boolean().optional().default(defaultCodeConfig.preserveIndent),
        collapseStyle: collapseStyleSchema.optional().default(defaultCodeConfig.collapseStyle),
      })
      .optional()
      .default(defaultCodeConfig),
    format: z
      .object({
        dateFormat: nonEmptyStringSchema('yyyy-MM-dd'),
        metadataSeparator: nonEmptyStringSchema('icon'),
      })
      .optional()
      .default({
        dateFormat: 'yyyy-MM-dd',
        metadataSeparator: 'icon',
      }),
    comments: z
      .object({
        enabled: z.boolean().optional().default(false),
        provider: commentProviderSchema.optional().default('none'),
        show_on_posts: z.boolean().optional().default(true),
        giscus: z
          .object({
            repo: z.string().optional().default(''),
            repo_id: z.string().optional().default(''),
            category: z.string().optional().default(''),
            category_id: z.string().optional().default(''),
            mapping: z.string().optional().default('pathname'),
            strict: z.string().optional().default('0'),
            reactions_enabled: z.string().optional().default('1'),
            emit_metadata: z.string().optional().default('0'),
            input_position: z.string().optional().default('bottom'),
            light_theme: z.string().optional().default('light'),
            dark_theme: z.string().optional().default('dark'),
            lang: z.string().optional().default('en'),
            loading: z.string().optional().default('lazy'),
          })
          .optional()
          .default(defaultGiscusConfig),
        utterances: z
          .object({
            repo: z.string().optional().default(''),
            issue_term: z.string().optional().default('pathname'),
            label: z.string().optional().default('comment'),
            theme: z.string().optional().default('github-light'),
          })
          .optional()
          .default(defaultUtterancesConfig),
        waline: z
          .object({
            server_url: z.string().optional().default(''),
            lang: z.string().optional().default('en'),
            dark: z.string().optional().default('html.dark'),
            pageview: z.boolean().optional().default(true),
            comment: z.boolean().optional().default(true),
          })
          .optional()
          .default(defaultWalineConfig),
      })
      .optional()
      .default(defaultCommentsConfig),
    profile: z.object({
      name: z.string(),
      handle: z.string(),
      role: z.string(),
      email: z.email(),
      website: z.url(),
      github: z.url(),
      avatar: z.string(),
    }),
    topNav: z.object({
      links: z.array(linkSchema.omit({ icon: true })),
    }),
    search: z
      .object({
        enabled: z.boolean().optional().default(true),
        shortcut: z.enum(['mod+k']).optional().default('mod+k'),
        placeholder: z.string().optional().default('Search...'),
        maxResults: z.number().int().positive().optional().default(6),
      })
      .optional()
      .default({
        enabled: true,
        shortcut: 'mod+k',
        placeholder: 'Search...',
        maxResults: 6,
      }),
    pages: z
      .object({
        projects: projectsPageSchema.optional().default(defaultPagesConfig.projects),
        vibe: vibePageSchema.optional().default(defaultPagesConfig.vibe),
      })
      .optional()
      .default(defaultPagesConfig),
    home: z.object({
      quote: z.object({
        text: z.array(z.string()).min(1),
      }),
      intro: z.object({
        title: z.string(),
        name: z.string(),
        body: z.array(z.string()).min(1),
      }),
      navigation: z.array(navigationItemSchema),
      links: z.array(homeLinkSchema).optional().default([]),
      doing: z.array(
        z.object({
          text: z.string(),
          mark: z.string(),
        }),
      ),
    }),
  }),
});

const about = defineCollection({
  loader: glob({ base: './src/content', pattern: 'about.{md,mdx}' }),
  schema: articleSchema,
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: articleSchema,
});

const vibe = defineCollection({
  loader: glob({ base: './src/content/vibe', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().optional().default(false),
      type: z.enum(['text', 'photo', 'quote', 'code', 'mixed']).optional().default('text'),
      mood: z.string().optional(),
      location: z.string().optional(),
      images: z.array(contentImageSchema({ image })).optional().default([]),
      tags: z.array(z.string()).optional().default([]),
      align: z.enum(['left', 'right', 'center']).optional(),
      size: z.enum(['sm', 'md', 'lg']).optional().default('md'),
    }),
});

export const collections = { about, projects, vibe, siteConfig };
