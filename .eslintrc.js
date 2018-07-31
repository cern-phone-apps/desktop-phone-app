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
  "overrides": [
    {
      "files": [ "bin/*.js", "lib/*.js" ],
      "excludedFiles": ["*.test.js"],
      "rules": {
        "quotes": [ 2, "single" ]
      }
    }
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "standard"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
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