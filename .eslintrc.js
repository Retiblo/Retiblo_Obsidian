module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        svelteFeatures: {
          /* -- Experimental Svelte Features -- */
          /* It may be changed or removed in minor versions without notice. */
          // Whether to parse the `generics` attribute.
          // See https://github.com/sveltejs/rfcs/pull/38
          experimentalGenerics: false,
        },
      },
    },
  ],
  env: { node: true, browser: true },
  plugins: ['@typescript-eslint', 'prettier', 'svelte'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
  ],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    indent: 'off',
  },
};
