//@ts-expect-error No type decleration
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';
//@ts-expect-error No type decleration
import toColorValue from 'tailwindcss/lib/util/toColorValue';
import plugin from 'tailwindcss/plugin';

export const bgMix = plugin(({ matchUtilities, theme }) => {
  const themeColors = flattenColorPalette(theme('colors'));
  matchUtilities(
    {
      'bg-mix': value => ({
        backgroundColor: `color-mix(in oklab, ${toColorValue(value)}, var(--tw-bg-mix-with, transparent) var(--tw-bg-mix-amount, 0%));`,
      }),
      'mix-with': value => ({ '--tw-bg-mix-with': toColorValue(value) }),
    },
    { values: themeColors, type: 'color' }
  );
  matchUtilities(
    {
      'mix-amount': value => ({
        '--tw-bg-mix-amount': `${(value * 100).toFixed()}%`,
      }),
    },
    { values: theme('opacity') }
  );
});
