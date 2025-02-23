import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

// importing '@/config/tailwind' doesn't work here
import { animations, autofillOverride } from './src/config/tailwind';

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
            '--tw-prose-body': 'oklch(var(--color-neutral-700))',
            '--tw-prose-headings': 'oklch(var(--color-neutral-900))',
            '--tw-prose-lead': 'oklch(var(--color-neutral-600))',
            '--tw-prose-links': 'oklch(var(--color-neutral-900))',
            '--tw-prose-bold': 'oklch(var(--color-neutral-900))',
            '--tw-prose-counters': 'oklch(var(--color-neutral-500))',
            '--tw-prose-bullets': 'oklch(var(--color-neutral-300))',
            '--tw-prose-hr': 'oklch(var(--color-neutral-200))',
            '--tw-prose-quotes': 'oklch(var(--color-neutral-900))',
            '--tw-prose-quote-borders': 'oklch(var(--color-neutral-200))',
            '--tw-prose-captions': 'oklch(var(--color-neutral-500))',
            '--tw-prose-kbd': 'oklch(var(--color-neutral-900))',
            '--tw-prose-code': 'oklch(var(--color-neutral-900))',
            '--tw-prose-pre-code': 'oklch(var(--color-neutral-800))',
            '--tw-prose-pre-bg': 'oklch(var(--color-neutral-50))',
            '--tw-prose-th-borders': 'oklch(var(--color-neutral-300))',
            '--tw-prose-td-borders': 'oklch(var(--color-neutral-200))',
            '--tw-prose-invert-body': 'oklch(var(--color-neutral-300))',
            '--tw-prose-invert-headings': 'oklch(1 0 0)',
            '--tw-prose-invert-lead': 'oklch(var(--color-neutral-400))',
            '--tw-prose-invert-links': 'oklch(1 0 0)',
            '--tw-prose-invert-bold': 'oklch(1 0 0)',
            '--tw-prose-invert-counters': 'oklch(var(--color-neutral-400))',
            '--tw-prose-invert-bullets': 'oklch(var(--color-neutral-600))',
            '--tw-prose-invert-hr': 'oklch(var(--color-neutral-700))',
            '--tw-prose-invert-quotes': 'oklch(var(--color-neutral-100))',
            '--tw-prose-invert-quote-borders':
              'oklch(var(--color-neutral-700))',
            '--tw-prose-invert-captions': 'oklch(var(--color-neutral-400))',
            '--tw-prose-invert-kbd': 'oklch(1 0 0)',
            '--tw-prose-invert-code': 'oklch(1 0 0)',
            '--tw-prose-invert-pre-code': 'oklch(var(--color-neutral-300))',
            '--tw-prose-invert-pre-bg': 'oklch(var(--color-neutral-900))',
            '--tw-prose-invert-th-borders': 'oklch(var(--color-neutral-600))',
            '--tw-prose-invert-td-borders': 'oklch(var(--color-neutral-700))',

            code: {
              fontWeight: 'inherit',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              backgroundColor: 'oklch(var(--color-muted))',
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
              [shade]: `oklch(var(--color-${colorName}-${shade}) / <alpha-value>)`,
            }),
            {
              DEFAULT: `oklch(var(--color-${colorName}-main)  / <alpha-value>)`,
              active: `oklch(var(--color-${colorName}-active)  / <alpha-value>)`,
              foreground: `oklch(var(--color-${colorName}-foreground)  / <alpha-value>)`,
            }
          ),
        }),
        {}
      ),

      border: 'oklch(var(--color-border) / <alpha-value>)',
      ring: 'oklch(var(--color-ring) / <alpha-value>)',
      background: 'oklch(var(--color-background) / <alpha-value>)',
      foreground: 'oklch(var(--color-foreground) / <alpha-value>)',
      secondary: {
        DEFAULT: 'oklch(var(--color-secondary) / <alpha-value>)',
        foreground: 'oklch(var(--color-secondary-foreground) / <alpha-value>)',
      },
      muted: {
        DEFAULT: 'oklch(var(--color-muted) / <alpha-value>)',
        foreground: 'oklch(var(--color-muted-foreground) / <alpha-value>)',
      },
      accent: {
        DEFAULT: 'oklch(var(--color-accent) / <alpha-value>)',
        foreground: 'oklch(var(--color-accent-foreground) / <alpha-value>)',
      },
      popover: {
        DEFAULT: 'oklch(var(--color-popover) / <alpha-value>)',
        foreground: 'oklch(var(--color-popover-foreground) / <alpha-value>)',
      },
      card: {
        DEFAULT: 'oklch(var(--color-card) / <alpha-value>)',
        foreground: 'oklch(var(--color-card-foreground) / <alpha-value>)',
      },
      input: {
        DEFAULT: 'oklch(var(--color-input) / <alpha-value>)',
        hover: 'oklch(var(--color-input-hover) / <alpha-value>)',
        invalid: 'oklch(var(--color-input-invalid) / <alpha-value>)',
      },
    },
  },
  plugins: [animations, autofillOverride, typography],
} satisfies Config;

export default config;
