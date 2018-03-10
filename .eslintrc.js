module.exports = {
  extends: [
      'airbnb-base',
      "plugin:prettier/recommended"
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-multi-str': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    'prettier/prettier': 'warn',
  },
  plugins: ['prettier'],
};
