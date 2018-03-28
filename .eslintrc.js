module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jest": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["./src"]
      }
    }
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "standard"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "babel"
  ],
  "rules": {
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-console": 0,
    "babel/no-invalid-this": 1
  }
};