import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: '功能特色',
      href: getPermalink('/services'),
    },
    {
      text: '解決方案',
      href: getPermalink('/solutions'),
    },
    {
      text: '定價方案',
      href: getPermalink('/pricing'),
    },
    {
      text: '部落格',
      href: getBlogPermalink(),
    },
    {
      text: '關於我們',
      href: getPermalink('/about'),
    },
  ],
  actions: [{ text: '預約示範', href: getPermalink('/contact'), variant: 'primary' }],
};

export const footerData = {
  links: [
    {
      title: '產品',
      links: [
        { text: '功能特色', href: getPermalink('/services') },
        { text: '定價方案', href: getPermalink('/pricing') },
        { text: '整合工具', href: '#' },
        { text: '安全性', href: '#' },
        { text: '更新日誌', href: '#' },
      ],
    },
    {
      title: '解決方案',
      links: [
        { text: '精準獲客', href: getPermalink('/solutions') },
        { text: '規模化觸達', href: getPermalink('/solutions') },
        { text: '意圖識別與轉化', href: getPermalink('/solutions') },
        { text: '客戶留存與增長', href: getPermalink('/solutions') },
      ],
    },
    {
      title: '支援',
      links: [
        { text: '使用文件', href: '#' },
        { text: '常見問題', href: '#' },
        { text: '聯絡客服', href: getPermalink('/contact') },
        { text: '系統狀態', href: '#' },
      ],
    },
    {
      title: '公司',
      links: [
        { text: '關於我們', href: getPermalink('/about') },
        { text: '部落格', href: getBlogPermalink() },
        { text: '加入我們', href: '#' },
        { text: '媒體資源', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: '服務條款', href: getPermalink('/terms') },
    { text: '隱私政策', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'WeChat', icon: 'tabler:brand-wechat', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    © 2026 <a class="text-blue-600 underline dark:text-muted" href="https://aitroop.net">Aitroop</a> · 保留所有權利。
  `,
};
