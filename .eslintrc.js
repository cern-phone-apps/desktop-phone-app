module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src']
      }
    }
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  plugins: ['react', 'babel'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-console': 0,
    'babel/no-invalid-this': 1
  }
};
