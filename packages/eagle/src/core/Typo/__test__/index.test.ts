import { describe, expect, it } from "vitest";

import { FIGMA_TO_TYPO, Typo } from "../index";

describe("Typo compatibility", () => {
  it("keeps existing public exports stable", () => {
    expect(Typo.Label.l4_bold).toBeTypeOf("string");
    expect(Typo.Label.l2_regular_title).toBeTypeOf("string");
    expect(Typo.Display.d1s_bold_title).toBeTypeOf("string");
  });

  it("exposes the newly added typo styles", () => {
    expect(Typo.Display.d1s_regular_title).toBeTypeOf("string");
    expect(Typo.Label.l2_bold_strikethrough).toBeTypeOf("string");
  });

  it("maps representative Figma names to Typo class names", () => {
    expect(FIGMA_TO_TYPO["Display/display1-bold-sc"]).toBe(
      Typo.Display.d1_bold_title
    );
    expect(FIGMA_TO_TYPO["Label/label2-medium-sc"]).toBe(
      Typo.Label.l2_medium
    );
  });
});
