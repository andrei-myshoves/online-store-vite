module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'selector-class-pattern': null,

    'rule-empty-line-before': null,
    'declaration-empty-line-before': null,

    'color-function-notation': null,
    'alpha-value-notation': null,
    'color-hex-length': null,
    'value-keyword-case': null,
  },
  ignoreFiles: ['**/node_modules/**'],
}