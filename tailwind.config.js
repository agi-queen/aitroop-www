import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
      },
      fontFamily: {
        sans: ['var(--aw-font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif, ui-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
      },
      /* Peerlist-style letter-spacing scale */
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',   /* headings */
        tight: '-0.015em',    /* subheadings */
        normal: '-0.005em',   /* body */
        wide: '0.01em',
        wider: '0.05em',
        widest: '0.1em',
      },
      /* Peerlist uses a slightly tighter type scale */
      fontSize: {
        xs:   ['0.75rem',   { lineHeight: '1rem' }],
        sm:   ['0.8125rem', { lineHeight: '1.25rem' }],   /* 13px */
        base: ['0.9375rem', { lineHeight: '1.5rem' }],    /* 15px */
        lg:   ['1.0625rem', { lineHeight: '1.625rem' }],  /* 17px */
        xl:   ['1.1875rem', { lineHeight: '1.75rem' }],   /* 19px */
        '2xl':['1.375rem',  { lineHeight: '1.875rem' }],  /* 22px */
        '3xl':['1.75rem',   { lineHeight: '2.125rem' }],  /* 28px */
        '4xl':['2.25rem',   { lineHeight: '2.5rem' }],    /* 36px */
        '5xl':['3rem',      { lineHeight: '1.1' }],       /* 48px */
        '6xl':['3.75rem',   { lineHeight: '1.05' }],      /* 60px */
        '7xl':['4.5rem',    { lineHeight: '1' }],         /* 72px */
      },
      borderRadius: {
        sm:  '4px',
        DEFAULT: '6px',
        md:  '8px',
        lg:  '10px',
        xl:  '12px',
        '2xl':'16px',
        full:'9999px',
      },
      animation: {
        fade: 'fadeInUp 0.7s both',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: 0, transform: 'translateY(1.5rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
    }),
  ],
  darkMode: 'class',
};
