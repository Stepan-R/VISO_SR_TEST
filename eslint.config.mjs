module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-unused-vars": "warn",
    "no-console": "warn",
    "prettier/prettier": "error",
  },
  ignorePatterns: ["node_modules", "dist"],
};
