module.exports = {
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^components/(.*)$',
    '^layouts/(.*)$',
    '^lib/(.*)$',
    '^pages/(.*)$',
    '^server/(.*)$',
    '^typings/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  tailwindConfig: './tailwind.config.js',
}
