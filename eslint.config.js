import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    plugins: {
      react: reactPlugin,
      prettier: prettier,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      'prettier/prettier': 'error',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: 'last',
          ignoreCase: true,
          reservedFirst: true,
        },
      ],
      // Tailwind CSS specific rules
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-custom-classname': 'warn',
      'tailwindcss/no-contradicting-classname': 'error'
    },
    settings: {
      react: {
        version: 'detect',
      },
      tailwindcss: {
        config: './tailwind.config.js',
        cssFiles: ['**/*.css'],
        whitelist: [],
      },
    },
  },
  {
    plugins: {
      'react-hooks': hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    ignores: ['.next/*', 'node_modules/*'],
  },
];