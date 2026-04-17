export type ColorTokenTree = {
  [key: string]: string | ColorTokenTree;
};

export type RgbaColor = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export type ColorDiffItem = {
  key: string;
  before: string;
  after: string;
};

export type ColorDiff = {
  currentCount: number;
  nextCount: number;
  added: string[];
  changed: ColorDiffItem[];
  removed: string[];
};

export declare function rgbaToHex(input: RgbaColor): string;
export declare function extractColorTokensFromDisplayDoc(
  rootNode: any,
): ColorTokenTree;
export declare function buildCssVariables(
  tokenObject: ColorTokenTree,
  isScss?: boolean,
): string;
export declare function buildColorDiff(nextColor: ColorTokenTree): ColorDiff;
export declare function writeColorArtifacts(tokenObject: ColorTokenTree): void;
export declare function summarizeColorDiff(diff: ColorDiff): {
  currentCount: number;
  nextCount: number;
  added: string[];
  changed: ColorDiffItem[];
  removed: string[];
};
