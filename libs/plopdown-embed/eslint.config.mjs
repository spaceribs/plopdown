import angular from 'angular-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import baseConfig from '../../eslint.config.mjs';
import nx from '@nx/eslint-plugin';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...compat
    .config({
      parserOptions: {
        project: ['libs/plopdown-embed/tsconfig.*?.json'],
      },
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts'],
      rules: {
        ...config.rules,
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'plopdown',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'plopdown',
            style: 'camelCase',
          },
        ],
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
          'off',
          {
            accessibility: 'explicit',
          },
        ],
        'id-blacklist': 'off',
        'id-match': 'off',
        'no-underscore-dangle': 'off',
        'rxjs/no-ignored-replay-buffer': 'error',
        'rxjs/no-index': 'error',
        'rxjs/no-internal': 'error',
        'rxjs/no-nested-subscribe': 'error',
        'rxjs/no-subject-unsubscribe': 'error',
        'rxjs/no-subject-value': 'error',
        'rxjs/no-unbound-methods': 'error',
        '@angular-eslint/prefer-standalone': 'off',
        '@angular-eslint/prefer-inject': 'off',
      },
    })),
  ...nx.configs['flat/angular-template'],
  ...angular.configs.templateRecommended.map((c) => ({
    ...c,
    files: ['**/*.html'],
  })),
  {
    files: ['**/*.html'],
    rules: {},
  },
  // Rules that angular-eslint 22 newly enables. Turning them on is refactor
  // work, not upgrade work, so they are deferred rather than done here.
  // prefer-on-push: the Angular 22 change-detection-eager migration marked 45
  // components Eager to preserve existing behaviour; moving them to OnPush is a
  // behavioural change that needs its own pass.
  // The three template rules are real accessibility findings on pre-existing
  // markup -- filed as a follow-up, not dismissed.
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/label-has-associated-control': 'off',
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
    },
  },
];
