import type { Options } from '@content-collections/mdx';
import rehypeShikiFromHighlighter, {
  type RehypeShikiCoreOptions,
} from '@shikijs/rehype/core';
import {
  type BundledLanguage,
  createHighlighter,
  type StringLiteralUnion,
} from 'shiki';
import { createCssVariablesTheme } from 'shiki/core';

const SHIKI_LANGS = [
  'html',
  'js',
  'json',
  'jsx',
  'md',
  'mdx',
  'ts',
  'tsx',
] satisfies StringLiteralUnion<BundledLanguage, string>[];

type Pluggable = NonNullable<Options['rehypePlugins']>[number];
type ParseMetaStringFn = RehypeShikiCoreOptions['parseMetaString'];

const cssVars = createCssVariablesTheme({
  name: 'css-variables',
  variablePrefix: '--shiki-',
  variableDefaults: {},
  fontStyle: true,
});
const highlighter = await createHighlighter({
  themes: [cssVars],
  langs: SHIKI_LANGS,
});
const parseMetaString: ParseMetaStringFn = meta => {
  const title = meta.match(/title="([^"]+)"/)?.[1];
  return { title };
};
const options = {
  theme: cssVars.name || '',
  parseMetaString,
} satisfies RehypeShikiCoreOptions;

export const rehypeShiki = [
  rehypeShikiFromHighlighter,
  highlighter,
  options,
] satisfies Pluggable;
