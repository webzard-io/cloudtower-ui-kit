// shortcut: internal rule registry is unavailable; replace the rule snapshot when access is restored.
module.exports = {
  extends: ["./tools/color-lint/stylelint/linaria-colors.cjs"],
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      customSyntax: require.resolve("./tools/color-lint/linaria-scss.cjs"),
    },
  ],
  ignoreFiles: [
    "src/styles/token/**", // Generated theme definitions.
    "src/styles/common/palette.scss", // Private Sass helpers.
    "src/styles/libs/**", // Generated third-party styles.
    "src/**/__test__/**",
    "src/**/__tests__/**",
    "src/**/*.d.ts",
    "src/**/*.stories.*",
  ],
};
