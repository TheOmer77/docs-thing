import eslint from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import importX from 'eslint-plugin-import-x';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { checkFile } from './src/config/eslint/rules/check-file.mjs';
import { preferArrow } from './src/config/eslint/rules/prefer-arrow.mjs';
import { preferTemplate } from './src/config/eslint/rules/prefer-template.mjs';
import { restrictedImports } from './src/config/eslint/rules/restricted-imports.mjs';
import { sortImports } from './src/config/eslint/rules/sort-imports.mjs';

const config = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  prettier,

  checkFile,
  preferArrow,
  sortImports,
  preferTemplate,
  restrictedImports,

  {
    plugins: { '@next/next': pluginNext, 'react-hooks': reactHooks },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      ...reactHooks.configs.recommended.rules,
    },
    languageOptions: {
      parserOptions: {
        ...react.configs.flat['jsx-runtime'].languageOptions.parserOptions,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.browser,
    },
  }
);

export default config;
