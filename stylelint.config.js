module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
    'no-empty-source': true,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'text-size-adjust',
          '-ms-text-size-adjust',
          '-moz-text-size-adjust',
          '-webkit-text-size-adjust',
        ],
      },
    ],
    'property-no-vendor-prefix': null,
    'declaration-block-no-duplicate-properties': null,
    'declaration-no-important': null,
    'font-family-name-quotes': null,
  },
  ignoreFiles: ['**/node_modules/**'],
}