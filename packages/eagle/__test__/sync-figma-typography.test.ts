import fs from "fs";
import path from "path";

import {
  buildTypographyDiff,
  buildTypographyModuleTs,
  extractTypographyMetaFromFile,
  figmaTypographyNameToTypoKey,
  mergeTypographyMeta,
  writeTypographyArtifacts,
} from "../tools/utils/typography-sync";

afterEach(() => {
  vi.restoreAllMocks();
});

const fixture = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "./fixtures/figma-typography-file.json"),
    "utf8",
  ),
);
const currentTypographyState = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../src/core/Typo/sync-baseline.json"),
    "utf8",
  ),
);

describe("sync-figma-typography", () => {
  it("maps figma typography names to Typo keys", () => {
    expect(figmaTypographyNameToTypoKey("Display/display1-bold-sc")).toBe(
      "d1_bold_title",
    );
    expect(figmaTypographyNameToTypoKey("Label/label4-bold-uppercase-sc")).toBe(
      "l4_bold_upper",
    );
    expect(
      figmaTypographyNameToTypoKey("Tabular Num/tnum2-medium-slashed0-sc"),
    ).toBe("t2_medium_slash");
  });

  it("extracts typography meta from figma file json", () => {
    expect(
      extractTypographyMetaFromFile(fixture, {
        pageId: "0:1",
        pageName: "Styles",
      }),
    ).toEqual({
      "Display/display1-bold-sc": {
        typoKey: "d1_bold_title",
        fontFamily: "Inter",
        weight: "bold",
        fontSize: 32,
        lineHeight: 40,
        flags: [],
      },
      "Label/label4-regular-sc": {
        typoKey: "l4_regular",
        fontFamily: "Inter",
        weight: "regular",
        fontSize: 12,
        lineHeight: 18,
        flags: [],
      },
      "Label/label4-bold-uppercase-sc": {
        typoKey: "l4_bold_upper",
        fontFamily: "Inter",
        weight: "bold",
        fontSize: 12,
        lineHeight: 18,
        flags: ["uppercase"],
      },
      "Tabular Num/tnum2-medium-slashed0-sc": {
        typoKey: "t2_medium_slash",
        fontFamily: "Inter",
        weight: "500",
        fontSize: 12,
        lineHeight: 18,
        flags: ["slashed0"],
      },
    });
  });

  it("extracts typography meta from a page node payload", () => {
    expect(
      extractTypographyMetaFromFile(fixture.document.children[0], {
        pageId: "0:1",
        pageName: "Styles",
      }),
    ).toEqual({
      "Display/display1-bold-sc": {
        typoKey: "d1_bold_title",
        fontFamily: "Inter",
        weight: "bold",
        fontSize: 32,
        lineHeight: 40,
        flags: [],
      },
      "Label/label4-regular-sc": {
        typoKey: "l4_regular",
        fontFamily: "Inter",
        weight: "regular",
        fontSize: 12,
        lineHeight: 18,
        flags: [],
      },
      "Label/label4-bold-uppercase-sc": {
        typoKey: "l4_bold_upper",
        fontFamily: "Inter",
        weight: "bold",
        fontSize: 12,
        lineHeight: 18,
        flags: ["uppercase"],
      },
      "Tabular Num/tnum2-medium-slashed0-sc": {
        typoKey: "t2_medium_slash",
        fontFamily: "Inter",
        weight: "500",
        fontSize: 12,
        lineHeight: 18,
        flags: ["slashed0"],
      },
    });
  });

  it("extracts typography meta from display doc instances", () => {
    const displayDocFixture = {
      id: "1315:10680",
      name: "Typography",
      type: "SECTION",
      children: [
        {
          id: "1528:4376",
          name: "Text Styles",
          type: "FRAME",
          children: [
            {
              id: "1528:4377",
              name: "Display",
              type: "FRAME",
              children: [
                {
                  id: "1528:4380",
                  name: "Section",
                  type: "FRAME",
                  children: [
                    {
                      id: "instance:1",
                      name: "Text component",
                      type: "INSTANCE",
                      children: [
                        {
                          type: "TEXT",
                          name: "Text Name",
                          characters: "display1-bold-sc",
                        },
                        { type: "TEXT", name: "Typeface", characters: "Inter" },
                        { type: "TEXT", name: "Weight", characters: "Bold" },
                        { type: "TEXT", name: "Size", characters: "32px" },
                        {
                          type: "TEXT",
                          name: "Line height",
                          characters: "40px",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    expect(
      extractTypographyMetaFromFile(displayDocFixture, {
        pageId: "1315:10680",
        pageName: "Typography",
      }),
    ).toEqual({
      "Display/display1-bold-sc": {
        typoKey: "d1_bold_title",
        fontFamily: "Inter",
        weight: "bold",
        fontSize: 32,
        lineHeight: 40,
        flags: [],
      },
    });
  });

  it("builds Typo module from minimal meta without requiring every hardcoded group member", () => {
    const moduleText = buildTypographyModuleTs({
      "Display/display1-bold-sc": {
        typoKey: "d1_bold_title",
        fontFamily: "Inter",
        weight: "bold",
        fontSize: 32,
        lineHeight: 40,
        flags: [],
      },
      "Label/label4-regular-sc": {
        typoKey: "l4_regular",
        fontFamily: "Inter",
        weight: "regular",
        fontSize: 12,
        lineHeight: 18,
        flags: [],
      },
    });

    expect(moduleText).toContain("export const Typo = {");
    expect(moduleText).toContain("Display: {");
    expect(moduleText).toContain("Label: {");
    expect(moduleText).toContain("d1_bold_title,");
    expect(moduleText).toContain("l4_regular,");
    expect(moduleText).not.toContain("Heading: {");
  });

  it("reports upstream removals but merge keeps existing keys", () => {
    const nextMeta = {
      "Display/display1-bold-sc": {
        typoKey: "d1_bold_title",
        fontFamily: "Inter",
        weight: "bold",
        fontSize: 32,
        lineHeight: 40,
        flags: [],
      },
    };
    const currentMeta = {
      "Display/display1-bold-sc": {
        typoKey: "d1_bold_title",
        fontFamily: "Inter",
        weight: "bold",
        fontSize: 32,
        lineHeight: 40,
        flags: [],
      },
      "Label/label4-regular-sc": {
        typoKey: "l4_regular",
        fontFamily: "Inter",
        weight: "regular",
        fontSize: 12,
        lineHeight: 18,
        flags: [],
      },
    };

    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify(currentMeta));

    const diff = buildTypographyDiff(nextMeta);
    const merged = mergeTypographyMeta(nextMeta);

    expect(diff.removedFromUpstream).toContain("Label/label4-regular-sc");
    expect(merged["Label/label4-regular-sc"]).toEqual(
      currentMeta["Label/label4-regular-sc"],
    );
  });

  it("writes full Typo content directly into Typo/index.ts", () => {
    const mkdirSpy = vi
      .spyOn(fs, "mkdirSync")
      .mockImplementation(() => undefined as never);
    const writeSpy = vi
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => undefined as never);

    writeTypographyArtifacts(currentTypographyState);

    expect(mkdirSpy).toHaveBeenCalled();
    const indexWrite = writeSpy.mock.calls.find(([target]) =>
      String(target).endsWith("src/core/Typo/index.ts"),
    );

    expect(indexWrite).toBeDefined();
    expect(String(indexWrite?.[1])).toContain("export const Typo = {");
    expect(String(indexWrite?.[1])).toContain("export const FIGMA_TO_TYPO = {");
    expect(String(indexWrite?.[1])).not.toContain('from "./generated/tokens"');
  });
});
