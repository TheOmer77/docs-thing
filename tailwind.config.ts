import typography from '@tailwindcss/typography';
import plugin from 'tailwindcss/plugin';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';
import toColorValue from 'tailwindcss/lib/util/toColorValue';
import type { Config } from 'tailwindcss';

const shades = [50, ...[...Array(9).keys()].map(key => (key + 1) * 100), 950];

const stateLayer = plugin(({ addUtilities, matchUtilities, theme }) => {
  const themeColors = flattenColorPalette(theme('colors'));
  const colors = Object.fromEntries(
    Object.entries(themeColors).map(([k, v]) => [k, toColorValue(v)])
  );

  addUtilities({
    '.state-layer': {
      position: 'relative',
      overflow: 'hidden',
      '&.fixed': { position: 'fixed' },
      '&.absolute': { position: 'absolute' },
      '&::after': {
        content: '""',
        position: 'absolute',
        insetBlockStart: '0',
        insetInlineStart: '0',
        width: '100%',
        height: '100%',
        zIndex: '1',
        transition: 'background-color 100ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  });
  matchUtilities(
    { 'state-layer': value => ({ '&::after': { backgroundColor: value } }) },
    { values: colors, type: 'color' }
  );
});

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-family)', 'sans-serif'],
        mono: ['var(--font-family-mono)', 'monospace'],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(var(--color-neutral-800))',
            '--tw-prose-headings': 'rgb(var(--color-neutral-900))',
            '--tw-prose-lead': 'rgb(var(--color-neutral-700))',
            '--tw-prose-links': 'rgb(var(--color-neutral-900))',
            '--tw-prose-bold': 'rgb(var(--color-neutral-900))',
            '--tw-prose-counters': 'rgb(var(--color-neutral-600))',
            '--tw-prose-bullets': 'rgb(var(--color-neutral-400))',
            '--tw-prose-hr': 'rgb(var(--color-neutral-300))',
            '--tw-prose-quotes': 'rgb(var(--color-neutral-900))',
            '--tw-prose-quote-borders': 'rgb(var(--color-neutral-300))',
            '--tw-prose-captions': 'rgb(var(--color-neutral-700))',
            '--tw-prose-code': 'rgb(var(--color-neutral-900))',
            '--tw-prose-pre-code': 'rgb(var(--color-neutral-100))',
            '--tw-prose-pre-bg': 'rgb(var(--color-neutral-900))',
            '--tw-prose-th-borders': 'rgb(var(--color-neutral-300))',
            '--tw-prose-td-borders': 'rgb(var(--color-neutral-200))',
            '--tw-prose-invert-body': 'rgb(var(--color-neutral-200))',
            '--tw-prose-invert-headings': 'rgb(var(--color-neutral-50))',
            '--tw-prose-invert-lead': 'rgb(var(--color-neutral-300))',
            '--tw-prose-invert-links': 'rgb(var(--color-neutral-50))',
            '--tw-prose-invert-bold': 'rgb(var(--color-neutral-50))',
            '--tw-prose-invert-counters': 'rgb(var(--color-neutral-400))',
            '--tw-prose-invert-bullets': 'rgb(var(--color-neutral-600))',
            '--tw-prose-invert-hr': 'rgb(var(--color-neutral-700))',
            '--tw-prose-invert-quotes': 'rgb(var(--color-neutral-100))',
            '--tw-prose-invert-quote-borders': 'rgb(var(--color-neutral-700))',
            '--tw-prose-invert-captions': 'rgb(var(--color-neutral-400))',
            '--tw-prose-invert-code': 'rgb(var(--color-neutral-50))',
            '--tw-prose-invert-pre-code': 'rgb(var(--color-neutral-300))',
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': 'rgb(var(--color-neutral-600))',
            '--tw-prose-invert-td-borders': 'rgb(var(--color-neutral-700))',
          },
        },
      }),
    },
    colors: {
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
              main: `rgb(var(--color-${colorName}-main) / <alpha-value>)`,
              light: `rgb(var(--color-${colorName}-light) / <alpha-value>)`,
              dark: `rgb(var(--color-${colorName}-dark) / <alpha-value>)`,
              contrast: `rgb(var(--color-${colorName}-contrast) / <alpha-value>)`,
            }),
            {}
          ),
        }),
        {}
      ),
    },
  },
  plugins: [typography, stateLayer],
};

export default config;
