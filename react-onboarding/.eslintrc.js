module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'cypress'],
  rules: {
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'eol-last': 'error',
    'default-param-last': 0,
  },
};
