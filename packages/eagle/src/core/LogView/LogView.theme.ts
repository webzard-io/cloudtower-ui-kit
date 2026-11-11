import { Color } from "@src/styles/token/color";
import { resolveColorValue } from "@src/styles/token/resolveColorValue";

export const getLogViewTheme = (element?: Element) => ({
  background: resolveColorValue(Color.gray["gray-120"], element),
  foreground: resolveColorValue(Color.text.neutral.ontint, element),
  cursor: resolveColorValue(Color.text.neutral.ontint, element),
});

export const getLogViewSearchOptions = (element?: Element) => ({
  caseSensitive: false,
  decorations: {
    activeMatchColorOverviewRuler: "#000000",
    matchOverviewRuler: "#000000",
    activeMatchBackground: resolveColorValue(Color.chart.yellow["yellow-5"], element),
    matchBackground: resolveColorValue(Color.chart.yellow["yellow-1"], element),
  },
});
