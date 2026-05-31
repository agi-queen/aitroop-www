export const locales = ['en', 'zh-TW', 'zh-CN'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/zh-TW')) return 'zh-TW';
  if (pathname.startsWith('/zh-CN')) return 'zh-CN';
  return 'en';
}

export function getLocalePath(pathname: string, targetLocale: Locale): string {
  // Strip existing locale prefix
  const clean = pathname.replace(/^\/(zh-TW|zh-CN)(\/|$)/, '/') || '/';
  if (targetLocale === defaultLocale) return clean;
  return `/${targetLocale}${clean === '/' ? '' : clean}`;
}

export const localeLabels: Record<Locale, { native: string; short: string }> = {
  en: { native: 'English', short: 'EN' },
  'zh-TW': { native: '繁體中文', short: 'TW' },
  'zh-CN': { native: '简体中文', short: 'CN' },
};
