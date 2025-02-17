import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

// importing '@/config/tailwind' doesn't work here
import {
  animations,
  autofillOverride,
  stateLayer,
} from './src/config/tailwind';

const shades = [50, ...[...Array(9).keys()].map(key => (key + 1) * 100), 950];

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './content/**/*.mdx'],
  darkMode: [
    'variant',
    [
      "@media not print { @media (prefers-color-scheme: dark) { &:not(:is([data-theme='light'] *)) } }",
      "@media not print { &:is([data-theme='dark'] *) }",
    ],
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      borderRadius: {
        lg: 'var(--border-radius)',
        md: 'calc(var(--border-radius) - 2px)',
        sm: 'calc(var(--border-radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-family)', 'sans-serif'],
        mono: ['var(--font-family-mono)', 'monospace'],
      },
      maxWidth: { '8xl': '90rem' },
      screens: { '2xl': '1440px' },
      spacing: { em: '1em', inherit: 'inherit' },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(var(--color-neutral-700))',
            '--tw-prose-headings': 'rgb(var(--color-neutral-900))',
            '--tw-prose-lead': 'rgb(var(--color-neutral-700))',
            '--tw-prose-links': 'rgb(var(--color-neutral-900))',
            '--tw-prose-bold': 'rgb(var(--color-neutral-900))',
            '--tw-prose-counters': 'rgb(var(--color-neutral-500))',
            '--tw-prose-bullets': 'rgb(var(--color-neutral-300))',
            '--tw-prose-hr': 'rgb(var(--color-neutral-300))',
            '--tw-prose-quotes': 'rgb(var(--color-neutral-900))',
            '--tw-prose-quote-borders': 'rgb(var(--color-neutral-300))',
            '--tw-prose-captions': 'rgb(var(--color-neutral-600))',
            '--tw-prose-code': 'rgb(var(--color-neutral-900))',
            '--tw-prose-pre-code': 'rgb(var(--color-neutral-800))',
            '--tw-prose-pre-bg': 'rgb(var(--color-neutral-50))',
            '--tw-prose-th-borders': 'rgb(var(--color-neutral-300))',
            '--tw-prose-td-borders': 'rgb(var(--color-neutral-200))',
            '--tw-prose-invert-body': 'rgb(var(--color-neutral-200))',
            '--tw-prose-invert-headings': 'rgb(var(--color-neutral-50))',
            '--tw-prose-invert-lead': 'rgb(var(--color-neutral-200))',
            '--tw-prose-invert-links': 'rgb(var(--color-neutral-50))',
            '--tw-prose-invert-bold': 'rgb(var(--color-neutral-50))',
            '--tw-prose-invert-counters': 'rgb(var(--color-neutral-400))',
            '--tw-prose-invert-bullets': 'rgb(var(--color-neutral-600))',
            '--tw-prose-invert-hr': 'rgb(var(--color-neutral-700))',
            '--tw-prose-invert-quotes': 'rgb(var(--color-neutral-100))',
            '--tw-prose-invert-quote-borders': 'rgb(var(--color-neutral-700))',
            '--tw-prose-invert-captions': 'rgb(var(--color-neutral-400))',
            '--tw-prose-invert-code': 'rgb(var(--color-neutral-50))',
            '--tw-prose-invert-pre-code': 'rgb(var(--color-neutral-200))',
            '--tw-prose-invert-pre-bg': 'rgb(var(--color-neutral-900))',
            '--tw-prose-invert-th-borders': 'rgb(var(--color-neutral-600))',
            '--tw-prose-invert-td-borders': 'rgb(var(--color-neutral-700))',

            code: {
              fontWeight: 'inherit',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              backgroundColor: 'rgb(var(--color-accent))',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: { borderRadius: 'var(--border-radius)' },
          },
        },
      }),
    },
    colors: {
      inherit: 'inherit',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      transparent: 'transparent',

      ...['primary', 'neutral', 'danger'].reduce(
        (obj, colorName) => ({
          ...obj,
          [colorName]: [...shades].reduce(
            (obj, shade) => ({
              ...obj,
              [shade]: `rgb(var(--color-${colorName}-${shade}) / <alpha-value>)`,
            }),
            {
              DEFAULT: `rgb(var(--color-${colorName}-main))`,
              active: `rgb(var(--color-${colorName}-active))`,
              foreground: `rgb(var(--color-${colorName}-foreground))`,
            }
          ),
        }),
        {}
      ),

      border: 'rgb(var(--color-border))',
      ring: 'rgb(var(--color-ring))',
      background: 'rgb(var(--color-background))',
      foreground: 'rgb(var(--color-foreground))',
      secondary: {
        DEFAULT: 'rgb(var(--color-secondary))',
        foreground: 'rgb(var(--color-secondary-foreground))',
      },
      muted: {
        DEFAULT: 'rgb(var(--color-muted))',
        foreground: 'rgb(var(--color-muted-foreground))',
      },
      accent: {
        DEFAULT: 'rgb(var(--color-accent))',
        foreground: 'rgb(var(--color-accent-foreground))',
      },
      popover: {
        DEFAULT: 'rgb(var(--color-popover))',
        foreground: 'rgb(var(--color-popover-foreground))',
      },
      card: {
        DEFAULT: 'rgb(var(--color-card))',
        foreground: 'rgb(var(--color-card-foreground))',
      },
      input: {
        DEFAULT: 'rgb(var(--color-input))',
        hover: 'rgb(var(--color-input-hover))',
        invalid: 'rgb(var(--color-input-invalid))',
      },
    },
  },
  plugins: [animations, autofillOverride, stateLayer, typography],
} satisfies Config;

export default config;
