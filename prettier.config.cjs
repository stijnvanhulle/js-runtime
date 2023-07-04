/** @typedef  {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig & Record<string,unknown> } */
const config = {
  tabWidth: 2,
  printWidth: 160,
  parser: 'typescript',
  singleQuote: true,
  semi: false,
  bracketSameLine: false,
  endOfLine: 'auto',
}

module.exports = config
