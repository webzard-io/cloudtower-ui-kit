import { CaretTriangleDown16Icon } from "@cloudtower/icons-react";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const {
  normalizeThemeColors,
} = require("../../icons-react/scripts/normalizeThemeColors");

const wrap = (paint: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" fill="none">${paint}</svg>`;
const normalize = (paint: string, file = "test.svg") =>
  normalizeThemeColors(wrap(paint), file);

describe("themed icon SVG normalization", () => {
  it("replaces inherited fill and paired stroke and preserves overall opacity", () => {
    const { svg, token } = normalize(
      '<g fill="#2C3852" fill-opacity=".6"><path stroke="#2c3852" stroke-opacity="0.6"/></g>',
    );
    expect(token).toBe("--text-neutral-tertiary");
    expect(svg).toContain(
      '<g fill="var(--text-neutral-tertiary, rgba(44, 56, 82, 0.6))">',
    );
    expect(svg).toContain(
      'stroke="var(--text-neutral-tertiary, rgba(44, 56, 82, 0.6))"',
    );
    expect(svg).not.toMatch(/(?:fill|stroke)-opacity/);
    expect(
      normalize('<g opacity=".6"><path fill="#00122e"/></g>').svg,
    ).toContain('opacity=".6"');
  });

  it.each([
    [
      'fill="#2c3852" fill-opacity=".75"',
      "secondary",
      "rgba(44, 56, 82, 0.75)",
    ],
    ['fill="#2c3852bf"', "secondary", "#2C3852BF"],
    ['fill="#2c385299"', "tertiary", "#2C385299"],
    ['fill="#0015404d"', "quaternary", "#0015404D"],
  ])(
    "normalizes %s with its original paint as fallback",
    (paint, level, fallback) => {
      expect(normalize(`<path ${paint}/>`).svg).toContain(
        `fill="var(--text-neutral-${level}, ${fallback})"`,
      );
    },
  );

  it("preserves functional SVG definitions", () => {
    const mask = '<mask id="m"><path fill="#3E4652"/></mask>';
    const { svg } = normalize(`${mask}<path mask="url(#m)" fill="#00122E"/>`);
    expect(svg).toContain(mask);
    expect(svg).toContain("var(--text-neutral-primary, #00122E)");
  });

  it.each([
    ['<path fill="#00122E"/><path fill="white"/>', "test.svg"],
    ['<path fill="#00122E"/>', "os-example.svg"],
    [
      '<path fill="#031E4F" fill-opacity=".18"/>',
      "info-i-circle-fill-16-quaternary.svg",
    ],
    [
      '<g opacity=".6"><path fill="#2C3852" fill-opacity=".6"/></g>',
      "test.svg",
    ],
    ['<g fill-opacity=".6"><path fill="#2C3852"/></g>', "test.svg"],
  ])("keeps excluded paint intact for %s", (paint, file) => {
    expect(normalize(paint, file).svg).toBe(wrap(paint));
  });

  it("generates a React icon that can render without token.css", () => {
    const view = renderToStaticMarkup(<CaretTriangleDown16Icon />);
    expect(view).toContain(
      'fill="var(--text-neutral-tertiary, rgba(44, 56, 82, 0.6))"',
    );
    expect(view).not.toContain("fill-opacity=");
  });
});
