export const SITE_URL = 'https://sajupalza.cc';

function normalizePath(path: string): string {
  if (!path || path === '/') {
    return '';
  }

  return path.startsWith('/') ? path : `/${path}`;
}

export function buildLocalizedHref(locale: string, path = ''): string {
  const normalizedPath = normalizePath(path);
  if (locale === 'ko') {
    return normalizedPath || '/';
  }

  return `/${locale}${normalizedPath}`;
}

export function buildLocalizedUrl(locale: string, path = ''): string {
  const href = buildLocalizedHref(locale, path);
  return href === '/' ? SITE_URL : `${SITE_URL}${href}`;
}

export function buildLocaleAlternates(locale: string, path = '') {
  return {
    canonical: buildLocalizedUrl(locale, path),
    languages: {
      ko: buildLocalizedUrl('ko', path),
      en: buildLocalizedUrl('en', path),
      'x-default': buildLocalizedUrl('ko', path),
    },
  };
}
