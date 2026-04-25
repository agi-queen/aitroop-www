import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';
import type { Locale } from './i18n/utils';

function lp(locale: Locale, path: string): string {
  return locale === 'en' ? path : `/${locale}${path}`;
}

// ─── Header ──────────────────────────────────────────────────────────────────

function buildHeaderLinks(locale: Locale) {
  return {
    en: [
      { text: 'Platform', href: lp(locale, getPermalink('/blog/aitroop-platform-complete-guide')) },
      { text: 'Blog', href: lp(locale, getBlogPermalink()) },
    ],
    'zh-TW': [
      { text: '平台功能', href: lp(locale, getPermalink('/blog/aitroop-platform-complete-guide')) },
      { text: '部落格', href: lp(locale, getBlogPermalink()) },
    ],
    'zh-CN': [
      { text: '平台功能', href: lp(locale, getPermalink('/blog/aitroop-platform-complete-guide')) },
      { text: '博客', href: lp(locale, getBlogPermalink()) },
    ],
  }[locale];
}

const headerActions: Record<Locale, object[]> = {
  en: [{ text: 'Book a Demo', href: lp('en', getPermalink('/contact')), variant: 'primary' }],
  'zh-TW': [{ text: '預約示範', href: lp('zh-TW', getPermalink('/contact')), variant: 'primary' }],
  'zh-CN': [{ text: '预约演示', href: lp('zh-CN', getPermalink('/contact')), variant: 'primary' }],
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
      features: 'Features',
      pricing: 'Pricing',
      integrations: 'Integrations',
      security: 'Security',
      changelog: 'Changelog',
      solutions: 'Solutions',
      acquisition: 'Precision Acquisition',
      outreach: 'Scalable Outreach',
      intent: 'Intent & Conversion',
      retention: 'Customer Retention',
      support: 'Support',
      docs: 'Documentation',
      faq: 'FAQ',
      contact: 'Contact Us',
      status: 'System Status',
      company: 'Company',
      about: 'About',
      blog: 'Blog',
      careers: 'Careers',
      press: 'Press Kit',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      footNote: '© 2026 <a class="text-blue-600 underline dark:text-muted" href="https://aitroop.net">Aitroop</a> · All rights reserved.',
    },
    'zh-TW': {
      product: '產品',
      features: '功能特色',
      pricing: '定價方案',
      integrations: '整合工具',
      security: '安全性',
      changelog: '更新日誌',
      solutions: '解決方案',
      acquisition: '精準獲客',
      outreach: '規模化觸達',
      intent: '意圖識別與轉化',
      retention: '客戶留存與增長',
      support: '支援',
      docs: '使用文件',
      faq: '常見問題',
      contact: '聯絡客服',
      status: '系統狀態',
      company: '公司',
      about: '關於我們',
      blog: '部落格',
      careers: '加入我們',
      press: '媒體資源',
      terms: '服務條款',
      privacy: '隱私政策',
      footNote: '© 2026 <a class="text-blue-600 underline dark:text-muted" href="https://aitroop.net">Aitroop</a> · 保留所有權利。',
    },
    'zh-CN': {
      product: '产品',
      features: '功能特色',
      pricing: '定价方案',
      integrations: '集成工具',
      security: '安全性',
      changelog: '更新日志',
      solutions: '解决方案',
      acquisition: '精准获客',
      outreach: '规模化触达',
      intent: '意图识别与转化',
      retention: '客户留存与增长',
      support: '支持',
      docs: '使用文档',
      faq: '常见问题',
      contact: '联系客服',
      status: '系统状态',
      company: '公司',
      about: '关于我们',
      blog: '博客',
      careers: '加入我们',
      press: '媒体资源',
      terms: '服务条款',
      privacy: '隐私政策',
      footNote: '© 2026 <a class="text-blue-600 underline dark:text-muted" href="https://aitroop.net">Aitroop</a> · 保留所有权利。',
    },
  }[locale] ?? t['en' as Locale];

  return {
    links: [
      {
        title: t.product,
        links: [
          { text: t.features, href: p(getPermalink('/blog/aitroop-platform-complete-guide')) },
          { text: t.integrations, href: '#' },
          { text: t.security, href: '#' },
          { text: t.changelog, href: '#' },
        ],
      },
      {
        title: t.solutions,
        links: [
          { text: t.acquisition, href: p(getPermalink('/solutions')) },
          { text: t.outreach, href: p(getPermalink('/solutions')) },
          { text: t.intent, href: p(getPermalink('/solutions')) },
          { text: t.retention, href: p(getPermalink('/solutions')) },
        ],
      },
      {
        title: t.support,
        links: [
          { text: t.docs, href: '#' },
          { text: t.faq, href: '#' },
          { text: t.contact, href: p(getPermalink('/contact')) },
          { text: t.status, href: '#' },
        ],
      },
      {
        title: t.company,
        links: [
          { text: t.about, href: p(getPermalink('/blog/aitroop-platform-complete-guide')) },
          { text: t.blog, href: p(getBlogPermalink()) },
          { text: t.careers, href: '#' },
          { text: t.press, href: '#' },
        ],
      },
    ],
    secondaryLinks: [
      { text: t.terms, href: getPermalink('/terms') },
      { text: t.privacy, href: getPermalink('/privacy') },
    ],
    socialLinks: [
      { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
      { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
      { ariaLabel: 'WeChat', icon: 'tabler:brand-wechat', href: '#' },
      { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    ],
    footNote: t.footNote,
  };
}

// Backward-compatible exports (used by pages that haven't been migrated)
export const headerData = getHeaderData('en');
export const footerData = getFooterData('en');
