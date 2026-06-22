import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';
import type { Locale } from './i18n/utils';

function lp(locale: Locale, path: string): string {
  return locale === 'en' ? path : `/${locale}${path}`;
}

// ─── Header ──────────────────────────────────────────────────────────────────

interface HeaderLabels {
  home: string;
  useCases: string;
  blog: string;
  docs: string;
}

const headerLabels: Record<Locale, HeaderLabels> = {
  en: {
    home: 'Home',
    useCases: 'Use cases',
    blog: 'Blog',
    docs: 'Docs',
  },
  'zh-CN': {
    home: '主页',
    useCases: '案例',
    blog: '博客',
    docs: '文档',
  },
  'zh-TW': {
    home: '首頁',
    useCases: '案例',
    blog: '部落格',
    docs: '文件',
  },
};

function buildHeaderLinks(locale: Locale) {
  const t = headerLabels[locale] ?? headerLabels.en;
  const p = (path: string) => lp(locale, path);
  return [
    { text: t.home, href: p('/') },
    { text: t.useCases, href: p('/use-cases') },
    { text: t.blog, href: p(getBlogPermalink()) },
    { text: t.docs, href: p('/docs') },
  ];
}

const headerActions: Record<Locale, object[]> = {
  en: [{ text: 'Login', href: 'https://app.aitroop.net', variant: 'primary' }],
  'zh-TW': [{ text: '登入', href: 'https://app.aitroop.net', variant: 'primary' }],
  'zh-CN': [{ text: '登录', href: 'https://app.aitroop.net', variant: 'primary' }],
};

export function getHeaderData(locale: Locale = 'en') {
  return {
    links: buildHeaderLinks(locale) ?? buildHeaderLinks('en'),
    actions: headerActions[locale] ?? headerActions['en'],
  };
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export function getFooterData(locale: Locale = 'en') {
  const p = (path: string) => lp(locale, path);
  const t = {
    en: {
      product: 'Product',
      platform: 'Platform Guide',
      contact: 'Contact Us',
      slides: 'Slides',
      company: 'Company',
      about: 'About',
      blog: 'Blog',
      footNote: '© 2026 <a class="text-blue-600 underline" href="https://aitroop.net">Aitroop</a> · All rights reserved.',
    },
    'zh-TW': {
      product: '產品',
      platform: '平台指南',
      contact: '聯絡客服',
      slides: '簡報',
      company: '公司',
      about: '關於我們',
      blog: '部落格',
      footNote: '© 2026 <a class="text-blue-600 underline" href="https://aitroop.net">Aitroop</a> · 保留所有權利。',
    },
    'zh-CN': {
      product: '产品',
      platform: '平台指南',
      contact: '联系客服',
      slides: '幻灯片',
      company: '公司',
      about: '关于我们',
      blog: '博客',
      footNote: '© 2026 <a class="text-blue-600 underline" href="https://aitroop.net">Aitroop</a> · 保留所有权利。',
    },
  }[locale] ?? t['en' as Locale];

  return {
    links: [
      {
        title: t.product,
        links: [
          { text: t.platform, href: p(getPermalink('/blog/aitroop-platform-complete-guide')) },
          { text: t.contact, href: p(getPermalink('/contact')) },
          { text: t.slides, href: '/slide' },
        ],
      },
      {
        title: t.company,
        links: [
          { text: t.about, href: p(getPermalink('/blog/aitroop-platform-complete-guide')) },
          { text: t.blog, href: p(getBlogPermalink()) },
        ],
      },
    ],
    secondaryLinks: [
      { text: 'Privacy', href: getPermalink('/app-privacy') },
      { text: 'Terms', href: getPermalink('/app-terms') },
    ],
    socialLinks: [
      { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    ],
    footNote: t.footNote,
  };
}

// Backward-compatible exports (used by pages that haven't been migrated)
export const headerData = getHeaderData('en');
export const footerData = getFooterData('en');
