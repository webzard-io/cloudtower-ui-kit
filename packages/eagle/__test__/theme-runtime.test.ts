import { Color } from "@src/styles/token";
import { resolveColorValue } from "@src/styles/token/resolveColorValue";
import {
  getLogViewTheme,
  getLogViewSearchOptions,
} from "@src/core/LogView/LogView.theme";

let originalStyle: string | null;
beforeEach(() => {
  originalStyle = document.documentElement.getAttribute("style");
});
afterEach(() => {
  if (originalStyle === null) document.documentElement.removeAttribute("style");
  else document.documentElement.setAttribute("style", originalStyle);
});

it("resolves terminal and search colors again after the theme tokens change", () => {
  const colors = [
    Color.gray["gray-120"],
    Color.text.neutral.ontint,
    Color.text.neutral.primary,
    Color.chart.yellow["yellow-5"],
    Color.chart.yellow["yellow-1"],
  ];
  for (const value of ["#112233", "#ddeeff"]) {
    for (const color of colors) {
      document.documentElement.style.setProperty(color.slice(4, -1), value);
    }
    expect(getLogViewTheme()).toEqual({
      background: value,
      foreground: value,
      cursor: value,
    });
    expect(getLogViewSearchOptions().decorations).toEqual({
      activeMatchColorOverviewRuler: "#000000",
      matchOverviewRuler: "#000000",
      activeMatchBackground: value,
      matchBackground: value,
    });
  }
});

it("rejects missing tokens and raw literals rather than falling back to light", () => {
  document.documentElement.style.removeProperty(
    Color.text.neutral.primary.slice(4, -1),
  );
  expect(() => resolveColorValue(Color.text.neutral.primary)).toThrow(
    /token.css/,
  );
  expect(() => resolveColorValue("#ffffff")).toThrow(/Cannot resolve/);
});

it("resolves a mounted consumer's token instead of the host root token", () => {
  const element = document.createElement("div");
  const name = Color.gray["gray-120"].slice(4, -1);
  document.documentElement.style.setProperty(name, "#abcdef");
  element.style.setProperty(name, "#123456");
  document.body.append(element);
  try {
    expect(resolveColorValue(Color.gray["gray-120"], element)).toBe("#123456");
    expect(resolveColorValue(Color.gray["gray-120"])).toBe("#abcdef");
  } finally {
    element.remove();
  }
});
