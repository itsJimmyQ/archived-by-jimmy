// @ts-check

/**
 * @typedef {import('prettier').Config} PrettierConfig
 * @property {string[]} ImportOrder
 * @typedef {PrettierConfig & { importOrder?: string[] }} Prettier
 */

/** @type {Prettier} */
module.exports = {
  trailingComma: 'all',
  arrowParens: 'always',
  singleQuote: true,
  printWidth: 100,
  importOrder: [
    '^types$',
    '^(react|react-dom)$',
    '^next(.*)$',
    '<THIRD_PARTY_MODULES>',
    '<BLANK_LINE>',
    '^(src|vectors|images|services|hooks|queries|store|styles|config|navigators|screens|static)(/.*|$)',
    '^(pages|layouts|modules|common|general)(/.*|$)',
    '<BLANK_LINE>',
    '^[./]',
  ],
};
