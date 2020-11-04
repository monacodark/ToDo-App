'use strict'

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'google',
  ],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    'react-native/style-sheet-object-names': [
      'EStyleSheet',
      'OtherStyleSheet',
      'PStyleSheet',
    ],
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'semi': ['error', 'never'],
    'curly': ['error', 'multi'],
  },
}
