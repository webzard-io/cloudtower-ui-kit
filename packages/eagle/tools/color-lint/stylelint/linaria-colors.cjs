module.exports = {
  extends: ['./colors.cjs'],
  overrides: [
    { files: ['**/*.{ts,tsx}'], customSyntax: '@linaria/postcss-linaria' },
    { files: ['**/*.{css,scss}'], customSyntax: 'postcss-scss' },
  ],
};
