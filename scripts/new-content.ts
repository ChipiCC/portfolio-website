import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

type ContentType = 'vibe';
type Extension = 'md' | 'mdx';

type ContentTypeConfig = {
  collectionName: ContentType;
  directory: string;
  defaultExtension: Extension;
  fileName: (slug: string, now: Date) => string;
  bodyTemplate: () => string;
  frontmatterTemplate: (title: string, isoDate: string) => string;
};

const CONTENT_TYPES = {
  vibe: {
    collectionName: 'vibe',
    directory: 'src/content/vibe',
    defaultExtension: 'md',
    fileName: (slug, now) => `${formatDatePrefix(now)}-${slug}`,
    bodyTemplate: createVibeBody,
    frontmatterTemplate: createVibeFrontmatter,
  },
} satisfies Record<ContentType, ContentTypeConfig>;

const args = process.argv.slice(2);
const contentTypeArg = args[0];
const filenameArg = args.find((arg, index) => index > 0 && arg !== '--mdx');

if (!isSupportedContentType(contentTypeArg)) {
  printUnsupportedContentType(contentTypeArg);
  process.exit(1);
}

if (filenameArg === undefined) {
  printMissingFilename();
  process.exit(1);
}

const slug = normalizeFilename(filenameArg);

if (!slug) {
  console.error('Invalid filename.');
  process.exit(1);
}

const now = new Date();
const isoDate = now.toISOString();
const config = CONTENT_TYPES[contentTypeArg];
const extension: Extension = args.includes('--mdx') ? 'mdx' : config.defaultExtension;
const title = createTitle(slug);
const baseName = config.fileName(slug, now);
const relativePath = path.join(config.directory, `${baseName}.${extension}`);
const targetPath = path.resolve(relativePath);

if (existsSync(targetPath)) {
  console.error(`File already exists: ${relativePath}`);
  process.exit(1);
}

mkdirSync(path.dirname(targetPath), { recursive: true });
writeFileSync(
  targetPath,
  `${config.frontmatterTemplate(title, isoDate)}\n\n${config.bodyTemplate()}\n`,
  'utf8',
);

console.log(`Created new ${config.collectionName} file:`);
console.log(relativePath);

function isSupportedContentType(value: string | undefined): value is ContentType {
  return value === 'vibe';
}

function normalizeFilename(value: string): string {
  return value
    .trim()
    .replace(/\.(mdx?|MDX?)$/, '')
    .replace(/\s+/g, '-')
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '')
    .replace(/\.+/g, '.')
    .replace(/^\.+|\.+$/g, '')
    .replace(/^-+|-+$/g, '');
}

function createTitle(slug: string): string {
  return slug
    .split(/[-_]+/g)
    .filter(Boolean)
    .map((part) => {
      if (!/[A-Za-z]/.test(part)) {
        return part;
      }

      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(' ');
}

function formatDatePrefix(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function createVibeFrontmatter(title: string, isoDate: string): string {
  return `---
title: "${escapeYamlString(title)}"
date: "${isoDate}"
updatedDate: "${isoDate}"
draft: true
type: text
mood: ""
location: ""
images: []
tags: []
align: left
size: md
---`;
}

function createVibeBody(): string {
  return 'A small note from today.';
}

function escapeYamlString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function printMissingFilename(): void {
  console.error(`Please provide a filename.

Examples:
bun run vibe:new today-cloud`);
}

function printUnsupportedContentType(contentType: string | undefined): void {
  console.error(`Unsupported content type: ${contentType ?? ''}

Supported types:
- vibe`);
}
