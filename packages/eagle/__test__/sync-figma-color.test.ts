import fs from "fs";
import path from "path";

import {
  buildColorDiff,
  buildCssVariables,
  extractColorTokensFromDisplayDoc,
  rgbaToHex,
  writeColorArtifacts,
} from "../tools/utils/color-sync";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("sync-figma-color", () => {
  it("converts rgba values to uppercase hex", () => {
    expect(rgbaToHex({ r: 1, g: 1, b: 1, a: 0.6 })).toBe("#FFFFFF99");
    expect(rgbaToHex({ r: 0, g: 0.5019607843, b: 1, a: 1 })).toBe("#0080FF");
  });

  it("extracts color tokens from display doc instances", () => {
    const displayDocFixture = {
      type: "SECTION",
      name: "Color",
      children: [
        {
          type: "INSTANCE",
          children: [
            {
              type: "FRAME",
              name: "Card",
              children: [
                {
                  type: "TEXT",
                  name: "{token-name}",
                  characters: "Text/Colorful/Outstanding",
                },
                { type: "TEXT", name: "{hex-value}", characters: "#0080FF" },
              ],
            },
          ],
        },
      ],
    };

    expect(extractColorTokensFromDisplayDoc(displayDocFixture)).toEqual({
      text: {
        colorful: {
          outstanding: "#0080FF",
        },
      },
    });
  });

  it("reports added and changed keys", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify({}));

    const diff = buildColorDiff({
      text: {
        neutral: {
          primary: "#00122E",
        },
      },
    });

    expect(diff.nextCount).toBe(1);
    expect(diff.added).toContain("text.neutral.primary");
  });

  it("builds scss and css variable strings", () => {
    const sample = {
      text: { neutral: { primary: "#00122E" } },
    };

    expect(buildCssVariables(sample, true)).toContain(
      "$text-neutral-primary: #00122E;",
    );
    expect(buildCssVariables(sample, false)).toContain(
      "--text-neutral-primary: #00122E;",
    );
  });

  it("writes synced color tokens directly into color.ts", () => {
    const mkdirSpy = vi
      .spyOn(fs, "mkdirSync")
      .mockImplementation(() => undefined as never);
    const writeSpy = vi
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => undefined as never);

    writeColorArtifacts({
      text: {
        neutral: {
          primary: "#00122E",
        },
      },
    });

    expect(mkdirSpy).toHaveBeenCalled();
    expect(
      writeSpy.mock.calls.some(([target]) =>
        String(target).endsWith("src/styles/token/color.ts"),
      ),
    ).toBe(true);
    expect(
      writeSpy.mock.calls.some(([target]) =>
        String(target).includes("/generated/tokens.ts"),
      ),
    ).toBe(false);
  });
});
