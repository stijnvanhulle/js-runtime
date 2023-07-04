// prettier-ignore-start

/**
 * Configs
 */

// @ts-ignore
import eslint from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
// @ts-ignore
import prettier from 'eslint-config-prettier'

/**
 * Others
 */
import globals from 'globals'

// prettier-ignore-end

/** @type {import("eslint").Linter.FlatConfig[]} */
// @ts-ignore
export default [
  {
    files: ['**/*.{ts}'],
    rules: {
      ...eslint.configs.recommended.rules,
      ...prettier.rules,
      // @ts-ignore
      ...tsPlugin.configs['eslint-recommended'].overrides[0].rules,
      ...tsPlugin.configs['recommended'].rules,
      ...tsPlugin.configs['recommended-requiring-type-checking'].rules,
    },
    plugins: {
      // @ts-ignore
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals['node'],
        __dirname: true,
        NodeJS: true,
      },
      // @ts-ignore
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        tsconfigRootDir: process.cwd(),
        project: true,
        /**
         * Removes 'WARNING: You are currently running a version of TypeScript which is not officially supported by @typescript-eslint/typescript-estree.'
         */
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts'],
      },
    },
  },
]
