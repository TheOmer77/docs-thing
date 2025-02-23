import type { Config } from 'tailwindcss';

const config = {
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--color-neutral-700)',
            '--tw-prose-headings': 'var(--color-neutral-900)',
            '--tw-prose-lead': 'var(--color-neutral-600)',
            '--tw-prose-links': 'var(--color-neutral-900)',
            '--tw-prose-bold': 'var(--color-neutral-900)',
            '--tw-prose-counters': 'var(--color-neutral-500)',
            '--tw-prose-bullets': 'var(--color-neutral-300)',
            '--tw-prose-hr': 'var(--color-neutral-200)',
            '--tw-prose-quotes': 'var(--color-neutral-900)',
            '--tw-prose-quote-borders': 'var(--color-neutral-200)',
            '--tw-prose-captions': 'var(--color-neutral-500)',
            '--tw-prose-kbd': 'var(--color-neutral-900)',
            '--tw-prose-code': 'var(--color-neutral-900)',
            '--tw-prose-pre-code': 'var(--color-neutral-800)',
            '--tw-prose-pre-bg': 'var(--color-neutral-50)',
            '--tw-prose-th-borders': 'var(--color-neutral-300)',
            '--tw-prose-td-borders': 'var(--color-neutral-200)',
            '--tw-prose-invert-body': 'var(--color-neutral-300)',
            '--tw-prose-invert-headings': 'oklch(1 0 0)',
            '--tw-prose-invert-lead': 'var(--color-neutral-400)',
            '--tw-prose-invert-links': 'oklch(1 0 0)',
            '--tw-prose-invert-bold': 'oklch(1 0 0)',
            '--tw-prose-invert-counters': 'var(--color-neutral-400)',
            '--tw-prose-invert-bullets': 'var(--color-neutral-600)',
            '--tw-prose-invert-hr': 'var(--color-neutral-700)',
            '--tw-prose-invert-quotes': 'var(--color-neutral-100)',
            '--tw-prose-invert-quote-borders': 'var(--color-neutral-700)',
            '--tw-prose-invert-captions': 'var(--color-neutral-400)',
            '--tw-prose-invert-kbd': 'oklch(1 0 0)',
            '--tw-prose-invert-code': 'oklch(1 0 0)',
            '--tw-prose-invert-pre-code': 'var(--color-neutral-300)',
            '--tw-prose-invert-pre-bg': 'var(--color-neutral-900)',
            '--tw-prose-invert-th-borders': 'var(--color-neutral-600)',
            '--tw-prose-invert-td-borders': 'var(--color-neutral-700)',

            code: {
              fontWeight: 'inherit',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              backgroundColor: 'var(--color-muted)',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: { borderRadius: 'var(--radius-lg)' },
          },
        },
      }),
    },
  },
} satisfies Config;

export default config;
