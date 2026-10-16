import type { SiteConfig } from '../data/site';
import en from '../i18n/en.json';

export const defaultUiLanguage = 'en';

const rawUiText = {
  en,
} as const;

type TemplateValues = Record<string, string | number>;
type Message = string | { one?: string; other: string };

type RawUiText = {
  locale: string;
  doing: {
    recently: string;
  };
  article: {
    metadata: string;
    readingTools: string;
    wordCount: Message;
    readingTime: Message;
  };
  toc: {
    title: string;
    open: string;
    close: string;
    expand: string;
    collapse: string;
    showAll: string;
    collapseButton: string;
  };
  search: {
    title: string;
    trigger: string;
    close: string;
    idle: string;
    loading: string;
    empty: string;
    unavailable: string;
    resultKinds: {
      vibe: string;
      project: string;
      page: string;
    };
    matchedPassage: string;
  };
};

export type UiLanguage = keyof typeof rawUiText;

export type UiText = Omit<RawUiText, 'article'> & {
  article: Omit<RawUiText['article'], 'wordCount' | 'readingTime'> & {
    wordCount: (count: number) => string;
    readingTime: (minutes: number) => string;
  };
};

function formatMessage(message: Message, values: TemplateValues = {}) {
  const template =
    typeof message === 'string'
      ? message
      : Number(values.count) === 1 && message.one
        ? message.one
        : message.other;

  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));
}

function formatNumber(value: number, locale: string) {
  return value.toLocaleString(locale);
}

function createUiText(raw: RawUiText): UiText {
  return {
    locale: raw.locale,
    doing: raw.doing,
    article: {
      ...raw.article,
      wordCount: (count) =>
        formatMessage(raw.article.wordCount, {
          count: formatNumber(count, raw.locale),
        }),
      readingTime: (minutes) => formatMessage(raw.article.readingTime, { minutes }),
    },
    toc: raw.toc,
    search: raw.search,
  };
}

const uiText = Object.fromEntries(
  Object.entries(rawUiText).map(([language, text]) => [language, createUiText(text)]),
) as Record<UiLanguage, UiText>;

export function normalizeUiLanguage(value: string | undefined): UiLanguage {
  const language = value?.trim().toLowerCase();

  return language && language.startsWith('en') ? 'en' : defaultUiLanguage;
}

export function getUiLanguage(config: SiteConfig): UiLanguage {
  return normalizeUiLanguage(config.theme.lang);
}

export function getUiText(config: SiteConfig): UiText {
  return uiText[getUiLanguage(config)];
}

export function getHtmlLang(config: SiteConfig): UiText['locale'] {
  return getUiText(config).locale;
}
