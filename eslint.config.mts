import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  /* ---------------- Ignore Files ---------------- */
  {
    ignores: ['node_modules', 'dist', 'build', '*.js', '*.cjs', '*.mjs'],
  },

  /* ---------------- TypeScript Rules ---------------- */
  {
    files: ['**/*.ts'],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },

      globals: globals.node,
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier,
      import: importPlugin,
    },

    rules: {
      /* Base Recommended */
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended[0].rules,

      /* -------- Prettier -------- */
      'prettier/prettier': 'error',

      /* -------- TypeScript -------- */
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',

      /* -------- Import Order -------- */
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal'],
          alphabetize: { order: 'asc' },
          'newlines-between': 'always',
        },
      ],

      /* -------- Code Quality -------- */
      'no-console': 'warn',
      'no-unused-vars': 'off',
    },
  },
]);
