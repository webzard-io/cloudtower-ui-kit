const fs = require("fs");
const path = require("path");

const LAST_SYNC_STATE_PATH = path.resolve(
  __dirname,
  "../../src/styles/token/sync-baseline.json",
);
const COLOR_TS_PATH = path.resolve(
  __dirname,
  "../../src/styles/token/color.ts",
);
const GENERATED_SCSS_PATH = path.resolve(
  __dirname,
  "../../src/styles/token/color.scss",
);
const GENERATED_CSS_PATH = path.resolve(
  __dirname,
  "../../src/styles/token/color.css",
);

const toUpperHex = (value) => value.toString(16).padStart(2, "0").toUpperCase();

const rgbaToHex = ({ r, g, b, a = 1 }) => {
  const channels = [r, g, b].map((channel) =>
    toUpperHex(Math.max(0, Math.min(255, Math.round(channel * 255)))),
  );
  const alpha = Math.max(0, Math.min(255, Math.round(a * 255)));
  const hex = `#${channels.join("")}`;

  return alpha === 255 ? hex : `${hex}${toUpperHex(alpha)}`;
};

const normalizeSegments = (name) =>
  name
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => segment.toLowerCase());

const flattenColorObject = (input, prefix = []) =>
  Object.entries(input).reduce((acc, [key, value]) => {
    const pathKey = [...prefix, key];
    if (typeof value === "string") {
      acc[pathKey.join(".")] = value;
      return acc;
    }
    return {
      ...acc,
      ...flattenColorObject(value, pathKey),
    };
  }, {});

const setNestedValue = (target, segments, value) => {
  let cursor = target;
  segments.forEach((segment, index) => {
    if (index === segments.length - 1) {
      cursor[segment] = value;
      return;
    }
    if (!cursor[segment]) {
      cursor[segment] = {};
    }
    cursor = cursor[segment];
  });
};

const normalizeDisplayTokenName = (name) =>
  String(name)
    .toLowerCase()
    .replace(" (trans-2 hover)", "")
    .replace(" (trans-2 active)", "")
    .trim();

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

const extractColorTokensFromDisplayDoc = (rootNode) => {
  const result = {};

  const walk = (node) => {
    if (!node) {
      return;
    }

    if (node.type === "INSTANCE") {
      const textContent = collectTextContentByName(node);
      const tokenValue = textContent["{token-name}"] || textContent["Text Name"];
      const hexValue = textContent["{hex-value}"];

      if (typeof tokenValue === "string" && typeof hexValue === "string") {
        setNestedValue(
          result,
          normalizeSegments(normalizeDisplayTokenName(tokenValue)),
          hexValue.toUpperCase(),
        );
      }
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(walk);
    }
  };

  walk(rootNode);
  return result;
};

// These gradient tokens are intentionally kept from the existing local Color API.
// The current Figma color sync source does not expose equivalent gradient tokens,
// so we preserve them here to avoid deleting long-standing public tokens by mistake.
const GRADIENT_TOKENS = {
  loading: "linear-gradient(90deg, #0080ff 0%, #9ecfff 50%, #0080ff 100%)",
  "light-blue":
    "linear-gradient(180deg,rgba(0, 136, 255, 0.2) 0%,rgba(0, 136, 255, 0.6) 100%)",
  "dark-blue":
    "radial-gradient(133.15% 133.15% at 4.69% 7.03%, #5BCAFF 0%, #06F 100%)",
};

const buildColorModuleTs = (tokenObject) =>
  `export const Color = ${JSON.stringify(
    {
      ...tokenObject,
      gradient: GRADIENT_TOKENS,
    },
    null,
    2,
  )} as const;\n`;

const buildCssVariables = (tokenObject, isScss = false) => {
  const lines = [];

  const walk = (current, pathSegments = []) => {
    Object.entries(current).forEach(([key, value]) => {
      const nextSegments = [...pathSegments, key];
      if (typeof value === "string") {
        const prefix = isScss ? "$" : "--";
        lines.push(`${prefix}${nextSegments.join("-")}: ${value}`);
        return;
      }
      walk(value, nextSegments);
    });
  };

  walk(tokenObject);

  if (isScss) {
    return `${lines.join(";\n")};\n`;
  }

  return `:root {\n  ${lines.join(";\n  ")};\n}\n`;
};

const readCurrentGeneratedColor = () => {
  if (!fs.existsSync(LAST_SYNC_STATE_PATH)) {
    return {};
  }

  return JSON.parse(fs.readFileSync(LAST_SYNC_STATE_PATH, "utf8"));
};

const buildColorDiff = (nextColor) => {
  const current = flattenColorObject(readCurrentGeneratedColor());
  const next = flattenColorObject(nextColor);
  const added = [];
  const changed = [];
  const removed = [];

  Object.entries(next).forEach(([key, value]) => {
    if (!(key in current)) {
      added.push(key);
      return;
    }
    if (current[key] !== value) {
      changed.push({ key, before: current[key], after: value });
    }
  });

  Object.keys(current).forEach((key) => {
    if (!(key in next)) {
      removed.push(key);
    }
  });

  return {
    currentCount: Object.keys(current).length,
    nextCount: Object.keys(next).length,
    added,
    changed,
    removed,
  };
};

const writeColorArtifacts = (tokenObject) => {
  fs.mkdirSync(path.dirname(LAST_SYNC_STATE_PATH), { recursive: true });
  fs.writeFileSync(LAST_SYNC_STATE_PATH, `${JSON.stringify(tokenObject, null, 2)}\n`);
  fs.writeFileSync(COLOR_TS_PATH, buildColorModuleTs(tokenObject));
  fs.writeFileSync(GENERATED_SCSS_PATH, buildCssVariables(tokenObject, true));
  fs.writeFileSync(GENERATED_CSS_PATH, buildCssVariables(tokenObject, false));
};

const summarizeColorDiff = (diff) => ({
  currentCount: diff.currentCount,
  nextCount: diff.nextCount,
  added: diff.added,
  changed: diff.changed.map(({ key, before, after }) => ({
    key,
    before,
    after,
  })),
  removed: diff.removed,
});

module.exports = {
  rgbaToHex,
  extractColorTokensFromDisplayDoc,
  buildCssVariables,
  buildColorDiff,
  writeColorArtifacts,
  summarizeColorDiff,
};
