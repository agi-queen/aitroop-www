import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary:   'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent:    'var(--aw-color-accent)',
        default:   'var(--aw-color-text-default)',
        muted:     'var(--aw-color-text-muted)',
      },
      fontFamily: {
        sans:    ['var(--aw-font-sans, ui-sans-serif)',    ...defaultTheme.fontFamily.sans],
        serif:   ['var(--aw-font-serif, ui-serif)',        ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
      },

      /* ── Type scale: 14px base — matches aitroop-system ── */
      fontSize: {
        xs:   ['0.6875rem', { lineHeight: '1rem' }],      /* 9.625px  → ~10px */
        sm:   ['0.75rem',   { lineHeight: '1.125rem' }],  /* 10.5px   → ~11px */
        base: ['0.875rem',  { lineHeight: '1.5rem' }],    /* 12.25px  → 14px  */
        lg:   ['1rem',      { lineHeight: '1.5rem' }],    /* 14px     → 16px  */
        xl:   ['1.125rem',  { lineHeight: '1.625rem' }],  /* 15.75px  → 18px  */
        '2xl':['1.25rem',   { lineHeight: '1.75rem' }],   /* 17.5px   → 20px  */
        '3xl':['1.5rem',    { lineHeight: '2rem' }],      /* 21px     → 24px  */
        '4xl':['1.875rem',  { lineHeight: '2.25rem' }],   /* 26.25px  → 30px  */
        '5xl':['2.25rem',   { lineHeight: '1.1' }],       /* 31.5px   → 36px  */
        '6xl':['3rem',      { lineHeight: '1.05' }],      /* 42px     → 48px  */
        '7xl':['3.75rem',   { lineHeight: '1' }],         /* 52.5px   → 60px  */
      },

      /* ── Letter-spacing — matches system usage ── */
      letterSpacing: {
        tightest: '-0.03em',
        tighter:  '-0.02em',   /* h1/h2 headings  */
        tight:    '-0.01em',   /* h3/subheadings  */
        normal:   '-0.003em',  /* body            */
        wide:     '0.01em',
        wider:    '0.05em',    /* uppercase labels */
        widest:   '0.1em',
      },

      /* ── Border radius — matches system tokens ── */
      borderRadius: {
        sm:      '4px',
        DEFAULT: '6px',    /* --radius-md: buttons, inputs */
        md:      '6px',
        lg:      '8px',    /* cards, code blocks           */
        xl:      '12px',   /* modals, larger containers    */
        '2xl':   '16px',
        full:    '9999px',
      },

      animation: {
        fade: 'fadeInUp 0.6s both',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: 0, transform: 'translateY(1rem)' },
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
