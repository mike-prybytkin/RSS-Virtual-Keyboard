module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 'off', // Неправильно работает в Windows.
    allowKeywords: 0,
    'arrow-parens': 'off', // Несовместимо с prettier
    'object-curly-newline': 'off', // Несовместимо с prettier
    'no-mixed-operators': 'off', // Несовместимо с prettier
    'arrow-body-style': 'off', // Это - не наш стиль?
    'function-paren-newline': 'off', // Несовместимо с prettier
    'no-plusplus': 'off',
    'space-before-function-paren': 0, // Несовместимо с prettier

    'max-len': ['error', 100, 2, { ignoreUrls: true }],
    // airbnb позволяет некоторые пограничные случаи
    'no-console': 'error', // airbnb использует предупреждение
    'no-alert': 'error', // airbnb использует предупреждение

    'no-param-reassign': 'off', // Это - не наш стиль?
    radix: 'off', // parseInt, parseFloat и radix выключены. Мне это не нравится.

    'prefer-destructuring': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
      },
    ],
  },
};
