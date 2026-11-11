module.exports = {
  defaultSeverity: 'warning',
  rules: {
    'color-no-hex': true,
    'color-named': 'never',
    'declaration-property-value-disallowed-list': {
      '/./': [
        '/\\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|device-cmyk)\\(\\s*[-+.0-9]/i',
        '/\\bcolor\\(\\s*(?:srgb(?:-linear)?|display-p3|a98-rgb|prophoto-rgb|rec2020|xyz(?:-d50|-d65)?)\\s+[-+.0-9]/i',
      ],
    },
  },
};
