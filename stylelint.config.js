/** @type {import('stylelint').Config} */
export default {
  ignoreFiles: ['dist/**/*'],
  extends: [
    'stylelint-config-recess-order',
    'stylelint-config-recommended-vue/scss',
  ],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'at-rule-no-unknown': null,
  },
};
