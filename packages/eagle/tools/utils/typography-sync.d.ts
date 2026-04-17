export type TypographyFlag =
  | "uppercase"
  | "monospace"
  | "slashed0"
  | "strikethrough";

export type TypographyMetaEntry = {
  typoKey: string;
  fontFamily: string;
  weight: string;
  fontSize: number;
  lineHeight: number;
  flags: TypographyFlag[];
};

export type TypographyMeta = Record<string, TypographyMetaEntry>;

export type TypographyDiffItem = {
  key: string;
  before: TypographyMetaEntry;
  after: TypographyMetaEntry;
};

export type TypographyDiff = {
  currentCount: number;
  nextCount: number;
  added: string[];
  changed: TypographyDiffItem[];
  removedFromUpstream: string[];
};

export declare function figmaTypographyNameToTypoKey(tokenName: string): string;
export declare function buildTypographyModuleTs(meta: TypographyMeta): string;
export declare function extractTypographyMetaFromFile(
  fileJson: any,
  sourceConfig: {
    pageId?: string;
    pageName?: string;
  },
): TypographyMeta;
export declare function buildTypographyDiff(
  nextMeta: TypographyMeta,
): TypographyDiff;
export declare function mergeTypographyMeta(
  nextMeta: TypographyMeta,
): TypographyMeta;
export declare function writeTypographyArtifacts(meta: TypographyMeta): void;
export declare function summarizeTypographyDiff(diff: TypographyDiff): {
  currentCount: number;
  nextCount: number;
  added: string[];
  changed: string[];
  removedFromUpstream: string[];
};
