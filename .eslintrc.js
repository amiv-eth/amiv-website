module.exports = {
  extends: [
      'airbnb-base',
      "plugin:prettier/recommended"
  ],
  env: {
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'no-multi-str': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': ['warning', {'peerDependencies': true}],
    'camelcase': 0,
    'prettier/prettier': 'error',
  },
  plugins: ['prettier'],
  // Activate the resolver plugin, required to recognize the 'config' resolver
  settings: {
    'import/resolver': {
        webpack: {},
    },
  },
};
