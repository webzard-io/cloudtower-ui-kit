const fs = require("fs");
const path = require("path");

const LAST_SYNC_STATE_PATH = path.resolve(
  __dirname,
  "../../src/core/Typo/sync-baseline.json",
);
const TYPO_INDEX_PATH = path.resolve(
  __dirname,
  "../../src/core/Typo/index.ts",
);

const TYPOGRAPHY_TOKEN_PATTERN =
  /^(Display\/|Heading\/|Label\/|Footnote\/|Tabular Num\/)/;
const TYPOGRAPHY_GROUPS = ["Display", "Heading", "Label", "Footnote", "Tabular Num"];

const readGeneratedMeta = () => {
  if (!fs.existsSync(LAST_SYNC_STATE_PATH)) {
    return {};
  }

  return JSON.parse(fs.readFileSync(LAST_SYNC_STATE_PATH, "utf8"));
};

const normalizeTokenName = (name) => name.replace(/\s*\/\s*/g, "/").trim();

const normalizeWeight = (input) => {
  if (typeof input === "number") {
    if (input === 700) return "bold";
    if (input === 600) return "600";
    if (input === 500) return "500";
    return "regular";
  }

  const value = String(input || "").toLowerCase();
  if (value.includes("bold") && value.includes("semi")) return "600";
  if (value === "bold" || value.includes("700")) return "bold";
  if (value === "medium" || value.includes("500")) return "500";
  if (value === "semibold" || value === "semi bold" || value.includes("600")) {
    return "600";
  }
  return "regular";
};

const getLineHeight = (style, fontSize) => {
  if (typeof style.lineHeightPx === "number") {
    return style.lineHeightPx;
  }
  if (typeof style.lineHeightPercentFontSize === "number") {
    return Math.round((style.lineHeightPercentFontSize / 100) * fontSize);
  }
  if (typeof style.lineHeightPercent === "number") {
    return Math.round((style.lineHeightPercent / 100) * fontSize);
  }
  throw new Error("无法从 Figma 文本节点解析 lineHeight");
};

const inferFlagsFromTokenName = (tokenName) => {
  const flags = [];
  const lowerName = tokenName.toLowerCase();

  if (lowerName.includes("uppercase")) flags.push("uppercase");
  if (lowerName.includes("monospace")) flags.push("monospace");
  if (lowerName.includes("slashed0")) flags.push("slashed0");
  if (lowerName.includes("strikethrough")) flags.push("strikethrough");

  return flags;
};

const parsePxValue = (input, fieldName, tokenName) => {
  const match = String(input || "").match(/(\d+(?:\.\d+)?)px/i);
  if (!match) {
    throw new Error(`无法从 ${fieldName} 解析像素值: ${tokenName}`);
  }
  return Number(match[1]);
};

const findTypographyGroup = (ancestors) => {
  for (let index = ancestors.length - 1; index >= 0; index -= 1) {
    const candidate = ancestors[index];
    if (TYPOGRAPHY_GROUPS.includes(candidate)) {
      return candidate;
    }
  }
  return null;
};

const collectTextContentByName = (node, bucket = {}) => {
  if (!node) {
    return bucket;
  }

  if (node.type === "TEXT" && typeof node.name === "string") {
    bucket[node.name] = node.characters;
  }

  if (Array.isArray(node.children)) {
    node.children.forEach((child) => collectTextContentByName(child, bucket));
  }

  return bucket;
};

const figmaTypographyNameToTypoKey = (tokenName) => {
  const normalized = normalizeTokenName(tokenName);

  const displayMatch = normalized.match(/^Display\/display(\d+s?)-(regular|bold)-sc$/i);
  if (displayMatch) {
    return `d${displayMatch[1]}_${displayMatch[2].toLowerCase()}_title`;
  }

  const headingMatch = normalized.match(
    /^Heading\/h(\d)-(regular|bold)(?:-(uppercase))?-sc$/i,
  );
  if (headingMatch) {
    return `h${headingMatch[1]}_${headingMatch[2].toLowerCase()}_${headingMatch[3] ? "upper" : "title"}`;
  }

  const labelMatch = normalized.match(
    /^Label\/label(\d)-(regular|medium|bold|semibold)(?:-(uppercase|strikethrough))?-sc$/i,
  );
  if (labelMatch) {
    const [, level, weight, variant] = labelMatch;
    if (variant === "uppercase") {
      return `l${level}_${weight.toLowerCase()}_upper`;
    }
    if (variant === "strikethrough") {
      return `l${level}_${weight.toLowerCase()}_strikethrough`;
    }
    return `l${level}_${weight.toLowerCase()}`;
  }

  const footnoteMatch = normalized.match(/^Footnote\/footnote(\d)-regular-sc$/i);
  if (footnoteMatch) {
    return `f${footnoteMatch[1]}_regular`;
  }

  const tabularMatch = normalized.match(
    /^Tabular Num\/tnum(\d+)-(regular|medium|bold)-(monospace|slashed0)-sc$/i,
  );
  if (tabularMatch) {
    const [, size, weight, variant] = tabularMatch;
    const suffix = variant === "monospace" ? "mono" : "slash";
    return `t${size}_${weight.toLowerCase()}_${suffix}`;
  }

  throw new Error(`无法从 Figma Typography 名称推导 Typo key: ${tokenName}`);
};

const extractTypographyMetaFromFile = (fileJson, sourceConfig) => {
  const page = Array.isArray(fileJson?.document?.children)
    ? fileJson.document.children.find((item) => item.id === sourceConfig.pageId) ||
      fileJson.document.children.find((item) => item.name === sourceConfig.pageName)
    : fileJson;

  if (!page) {
    throw new Error("在 Figma 文件中找不到 Typography 源页面");
  }

  const meta = {};

  const walk = (node, ancestors = []) => {
    if (!node) return;

    if (
      node.type === "TEXT" &&
      typeof node.name === "string" &&
      TYPOGRAPHY_TOKEN_PATTERN.test(normalizeTokenName(node.name))
    ) {
      const normalizedName = normalizeTokenName(node.name);
      const fontSize = Number(node.style?.fontSize);

      if (!fontSize || !node.style) {
        throw new Error(`Typography 节点缺少 style 信息: ${normalizedName}`);
      }

      meta[normalizedName] = {
        typoKey: figmaTypographyNameToTypoKey(normalizedName),
        fontFamily: node.style.fontFamily || "Inter",
        weight: normalizeWeight(node.style.fontWeight),
        fontSize,
        lineHeight: getLineHeight(node.style, fontSize),
        flags: inferFlagsFromTokenName(normalizedName),
      };
    }

    if (node.type === "INSTANCE") {
      const textContent = collectTextContentByName(node);
      const tokenName = typeof textContent["Text Name"] === "string" ? textContent["Text Name"].trim() : "";
      const typographyGroup = findTypographyGroup(ancestors);

      if (tokenName && typographyGroup) {
        const normalizedName = `${typographyGroup}/${tokenName}`;

        meta[normalizedName] = {
          typoKey: figmaTypographyNameToTypoKey(normalizedName),
          fontFamily: textContent.Typeface || "Inter",
          weight: normalizeWeight(textContent.Weight),
          fontSize: parsePxValue(textContent.Size, "字号", normalizedName),
          lineHeight: parsePxValue(textContent["Line height"], "行高", normalizedName),
          flags: inferFlagsFromTokenName(normalizedName),
        };
      }
    }

    if (Array.isArray(node.children)) {
      node.children.forEach((child) => walk(child, [...ancestors, node.name].filter(Boolean)));
    }
  };

  walk(page, []);
  return meta;
};

const buildTypographyDiff = (nextMeta) => {
  const current = readGeneratedMeta();
  const added = [];
  const changed = [];
  const removedFromUpstream = [];

  Object.entries(nextMeta).forEach(([key, nextValue]) => {
    const currentValue = current[key];

    if (!currentValue) {
      added.push(key);
      return;
    }

    if (JSON.stringify(currentValue) !== JSON.stringify(nextValue)) {
      changed.push({
        key,
        before: currentValue,
        after: nextValue,
      });
    }
  });

  Object.keys(current).forEach((key) => {
    if (!(key in nextMeta)) {
      removedFromUpstream.push(key);
    }
  });

  return {
    currentCount: Object.keys(current).length,
    nextCount: Object.keys(nextMeta).length,
    added,
    changed,
    removedFromUpstream,
  };
};

const mergeTypographyMeta = (nextMeta) => {
  const current = readGeneratedMeta();
  return {
    ...current,
    ...nextMeta,
  };
};

const weightToMixinArg = (weight) => {
  if (weight === "bold") return "bold";
  if (weight === "500" || weight === "600") return weight;
  return "";
};

const buildCssBlock = (spec) => {
  const lines = ["const PLACEHOLDER = css`"];
  const interArg = weightToMixinArg(spec.weight);

  if (interArg) {
    lines.push(`  @include Inter(${interArg});`);
  } else {
    lines.push("  @include Inter();");
  }

  if (spec.flags.includes("uppercase")) lines.push("  @include Uppercase();");
  if (spec.flags.includes("monospace")) lines.push("  @include Monospace();");
  if (spec.flags.includes("slashed0")) lines.push("  @include Slashed();");
  if (spec.flags.includes("strikethrough")) {
    lines.push("  text-decoration-line: line-through;");
    lines.push("  text-decoration-style: solid;");
    lines.push("  text-decoration-skip-ink: none;");
  }

  lines.push(`  font-size: ${spec.fontSize}px;`);
  lines.push(`  line-height: ${spec.lineHeight}px;`);
  lines.push("`;");

  return lines.join("\n");
};

const compareTokenNames = (left, right) => left.localeCompare(right, "en");

const DISPLAY_ORDER = [
  "Display/display1-bold-sc",
  "Display/display1s-bold-sc",
  "Display/display1s-regular-sc",
  "Display/display1-regular-sc",
  "Display/display2-bold-sc",
  "Display/display2-regular-sc",
  "Display/display3-bold-sc",
  "Display/display3-regular-sc",
];
const HEADING_ORDER = [
  "Heading/h1-bold-sc",
  "Heading/h1-regular-sc",
  "Heading/h2-bold-sc",
  "Heading/h2-regular-sc",
  "Heading/h3-bold-sc",
  "Heading/h3-regular-sc",
  "Heading/h3-bold-uppercase-sc",
  "Heading/h3-regular-uppercase-sc",
];
const LABEL_ORDER = [
  "Label/label1-regular-sc",
  "Label/label1-bold-sc",
  "Label/label1-regular-uppercase-sc",
  "Label/label1-bold-uppercase-sc",
  "Label/label2-regular-sc",
  "Label/label2-medium-sc",
  "Label/label2-bold-sc",
  "Label/label2-bold-strikethrough-sc",
  "Label/label2-regular-uppercase-sc",
  "Label/label2-bold-uppercase-sc",
  "Label/label3-regular-sc",
  "Label/label3-semibold-sc",
  "Label/label3-bold-sc",
  "Label/label3-regular-uppercase-sc",
  "Label/label3-bold-uppercase-sc",
  "Label/label4-regular-sc",
  "Label/label4-medium-sc",
  "Label/label4-bold-sc",
  "Label/label4-regular-uppercase-sc",
  "Label/label4-bold-uppercase-sc",
];
const FOOTNOTE_ORDER = [
  "Footnote/footnote1-regular-sc",
  "Footnote/footnote2-regular-sc",
];
const TABULAR_ORDER = [
  "Tabular Num/tnum1-regular-monospace-sc",
  "Tabular Num/tnum1-regular-slashed0-sc",
  "Tabular Num/tnum2-regular-monospace-sc",
  "Tabular Num/tnum2-medium-monospace-sc",
  "Tabular Num/tnum2-regular-slashed0-sc",
  "Tabular Num/tnum2-medium-slashed0-sc",
  "Tabular Num/tnum16-bold-slashed0-sc",
];
const TOKEN_ORDER = [
  ...DISPLAY_ORDER,
  ...HEADING_ORDER,
  ...LABEL_ORDER,
  ...FOOTNOTE_ORDER,
  ...TABULAR_ORDER,
];
const GROUP_ORDER = ["Display", "Heading", "Label", "Footnote", "Tabular", "UNKNOWN"];
const LOCAL_ALIAS_KEYS_BY_GROUP = {
  Label: [
    "l1_bold_title",
    "l1_regular_title",
    "l2_bold_title",
    "l2_regular_title",
    "l3_bold_title",
    "l3_regular_title",
    "l3_semibold_title",
    "l4_bold_title",
    "l4_regular_title",
    "l4_medium_title",
  ],
  Footnote: ["f1_regular_title", "f2_regular_title"],
  UNKNOWN: ["u1"],
};

// These aliases are intentionally preserved from the existing local Typo API.
// The current Figma Typography sync source only provides the canonical token set,
// so we keep local compatibility aliases here to avoid removing public keys that
// are still used by existing application code.
const MANUAL_ALIAS_BLOCK = `
const l1_regular_title = css\`
  @include Inter();
  font-size: 16px;
  line-height: 24px;
\`;
const l1_bold_title = css\`
  @include Inter(bold);
  font-size: 16px;
  line-height: 24px;
\`;
const l2_regular_title = css\`
  @include Inter();
  font-size: 14px;
  line-height: 22px;
\`;
const l2_bold_title = css\`
  @include Inter(bold);
  font-size: 14px;
  line-height: 22px;
\`;
const l3_regular_title = css\`
  @include Inter();
  font-size: 13px;
  line-height: 20px;
\`;
const l3_semibold_title = css\`
  @include Inter(600);
  font-size: 13px;
  line-height: 20px;
\`;
const l3_bold_title = css\`
  @include Inter(bold);
  font-size: 13px;
  line-height: 20px;
\`;
const l4_regular_title = css\`
  @include Inter();
  font-size: 12px;
  line-height: 18px;
\`;
const l4_medium_title = css\`
  @include Inter(500);
  font-size: 12px;
  line-height: 18px;
\`;
const l4_bold_title = css\`
  @include Inter(bold);
  font-size: 12px;
  line-height: 18px;
\`;
const f1_regular_title = css\`
  @include Inter();
  font-size: 13px;
  line-height: 20px;
\`;
const f2_regular_title = css\`
  @include Inter();
  font-size: 12px;
  line-height: 18px;
\`;
const u1 = css\`
  @include Inter();
  font-size: 10px;
  line-height: 12px;
\`;
`.trim();

const buildTypographyModuleTs = (meta) => {
  const orderedNames = [
    ...TOKEN_ORDER,
    ...Object.keys(meta)
      .sort(compareTokenNames)
      .filter((name) => !TOKEN_ORDER.includes(name)),
  ].filter((name) => meta[name]);
  const typoGroups = orderedNames.reduce((acc, tokenName) => {
    const spec = meta[tokenName];

    if (!spec) {
      return acc;
    }

    const sourceGroup = normalizeTokenName(tokenName).split("/")[0];
    const groupName = sourceGroup === "Tabular Num" ? "Tabular" : sourceGroup;

    if (!acc[groupName]) {
      acc[groupName] = [];
    }

    acc[groupName].push(spec.typoKey);
    return acc;
  }, {});
  Object.entries(LOCAL_ALIAS_KEYS_BY_GROUP).forEach(([groupName, aliasKeys]) => {
    if (!typoGroups[groupName]) {
      typoGroups[groupName] = [];
    }

    typoGroups[groupName].push(...aliasKeys);
  });
  const orderedGroupNames = [
    ...GROUP_ORDER.filter((name) => Array.isArray(typoGroups[name])),
    ...Object.keys(typoGroups)
      .filter((name) => !GROUP_ORDER.includes(name))
      .sort(compareTokenNames),
  ];
  const formatGroupName = (name) =>
    /^[$A-Z_][0-9A-Z_$]*$/i.test(name) ? name : JSON.stringify(name);

  const lines = ['import { css } from "@linaria/core";', ""];

  orderedNames.forEach((tokenName) => {
    const spec = meta[tokenName];
    lines.push(buildCssBlock(spec).replace("PLACEHOLDER", spec.typoKey));
  });

  lines.push("");
  lines.push("// CLEAR UNKNOWN STYLES");
  lines.push(MANUAL_ALIAS_BLOCK);
  lines.push("");
  lines.push("export const Typo = {");
  orderedGroupNames.forEach((groupName) => {
    lines.push(`  ${formatGroupName(groupName)}: {`);
    typoGroups[groupName].forEach((typoKey) => {
      lines.push(`    ${typoKey},`);
    });
    lines.push("  },");
  });
  lines.push("} as const;");
  lines.push("");
  lines.push("export const FIGMA_TO_TYPO = {");
  orderedNames.forEach((tokenName) => {
    const spec = meta[tokenName];
    lines.push(`  ${JSON.stringify(tokenName)}: ${spec.typoKey},`);
  });
  lines.push("} as const;");
  lines.push("");
  lines.push("export type FigmaTypographyName = keyof typeof FIGMA_TO_TYPO;");
  lines.push("");

  return `${lines.join("\n")}\n`;
};

const writeTypographyArtifacts = (meta) => {
  fs.mkdirSync(path.dirname(LAST_SYNC_STATE_PATH), { recursive: true });
  fs.writeFileSync(LAST_SYNC_STATE_PATH, `${JSON.stringify(meta, null, 2)}\n`);
  fs.writeFileSync(TYPO_INDEX_PATH, buildTypographyModuleTs(meta));
};

const summarizeTypographyDiff = (diff) => ({
  currentCount: diff.currentCount,
  nextCount: diff.nextCount,
  added: diff.added,
  changed: diff.changed.map(({ key }) => key),
  removedFromUpstream: diff.removedFromUpstream,
});

module.exports = {
  buildTypographyModuleTs,
  figmaTypographyNameToTypoKey,
  extractTypographyMetaFromFile,
  buildTypographyDiff,
  mergeTypographyMeta,
  writeTypographyArtifacts,
  summarizeTypographyDiff,
};
