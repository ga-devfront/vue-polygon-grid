module.exports = {
  root: true,
  env: {
    node: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  plugins: ['jest'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-style': 'off',
    semi: 'off',
    'max-len': 'off',
  },
};
