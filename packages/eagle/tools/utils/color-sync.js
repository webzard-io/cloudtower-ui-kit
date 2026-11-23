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

const readSwatchHex = (instance) => {
  const card = instance.children?.find(
    (child) => child.type === "FRAME" && child.name === "Card",
  );
  const fills = card?.fills?.filter((fill) => fill.visible !== false);
  const fill = fills?.[0];
  if (
    fills?.length !== 1 ||
    fill?.type !== "SOLID" ||
    (fill.blendMode && fill.blendMode !== "NORMAL")
  ) {
    return undefined;
  }
  return rgbaToHex({
    ...fill.color,
    a: (fill.opacity ?? fill.color.a ?? 1) * (card.opacity ?? 1),
  });
};

const extractColorTokensFromDisplayDoc = (rootNode) => {
  const result = {};

  const walk = (node) => {
    if (!node) {
      return;
    }

    if (node.type === "INSTANCE") {
      const textContent = collectTextContentByName(node);
      const tokenValue =
        textContent["{token-name}"] || textContent["Text Name"];
      const hexValue = textContent["{hex-value}"];

      if (typeof tokenValue === "string" && typeof hexValue === "string") {
        setNestedValue(
          result,
          normalizeSegments(normalizeDisplayTokenName(tokenValue)),
          readSwatchHex(node) ?? hexValue.toUpperCase(),
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

// 默认值来自旧 Sass 和 Color API，Figma 来源及核对方法见 docs/theme.md。
// 纯色同步不会从 Figma 导入渐变，核对完整配方后在此更新。
const GRADIENT_TOKENS = {
  loading: "linear-gradient(90deg, #0080ff 0%, #9ecfff 50%, #0080ff 100%)",
  "light-blue":
    "linear-gradient(180deg,rgba(0, 136, 255, 0.2) 0%,rgba(0, 136, 255, 0.6) 100%)",
  "dark-blue":
    "radial-gradient(133.15% 133.15% at 4.69% 7.03%, #5BCAFF 0%, #06F 100%)",
  "blue-1": "radial-gradient(100% 100% at 0% 100%, #5BCAFF 0%, #0066FF 100%)",
  "blue-2": "linear-gradient(90deg, #0080FF 0%, #005ED1 100%)",
  "green-1": "radial-gradient(100% 100% at 0% 100%, #36E0A4 0%, #009449 100%)",
  "yellow-1": "radial-gradient(100% 100% at 0% 100%, #FFD505 0%, #F39600 100%)",
  "red-1": "radial-gradient(100% 100% at 0% 100%, #FF5C78 0%, #DC0000 100%)",
  "gray-1": "radial-gradient(100% 100% at 0% 100%, #CCD4E3 0%, #6B7D99 100%)",
  "white-to-gray-1":
    "radial-gradient(50% 100% at 50% 0%, #FFFFFF 0%, #EDF0F7 100%)",
  "white-to-gray-2": "linear-gradient(180deg, #FFFFFF 0%, #EDF0F7 100%)",
  "white-l100r60":
    "linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.6) 100%)",
  "white-l60r100":
    "linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, #FFFFFF 100%)",
  "purple-1": "radial-gradient(100% 100% at 0% 100%, #C67EFF 0%, #6A38FF 100%)",
};

const tokenName = (name) => `--${name}`;
const runtimeColor = (object, prefix = []) =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key,
      typeof value === "string"
        ? `var(${tokenName([...prefix, key].join("-"))})`
        : runtimeColor(value, [...prefix, key]),
    ]),
  );

// Widen values so declaration files do not promise build-specific literal strings.
const runtimeModule = (name, object, prefix = []) =>
  `export const ${name} = ${JSON.stringify(runtimeColor(object, prefix), null, 2).replace(/"(var\([^"\n]+\))"/g, '"$1" as string')} as const;\n`;
const buildColorModuleTs = (tokenObject) =>
  runtimeModule("Color", { ...tokenObject, gradient: GRADIENT_TOKENS });

const buildCssVariables = (tokenObject) => {
  const lines = [];

  const walk = (current, pathSegments = []) => {
    Object.entries(current).forEach(([key, value]) => {
      const nextSegments = [...pathSegments, key];
      if (typeof value === "string") {
        lines.push(`${tokenName(nextSegments.join("-"))}: ${value}`);
        return;
      }
      walk(value, nextSegments);
    });
  };

  walk(tokenObject);

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
  fs.writeFileSync(
    LAST_SYNC_STATE_PATH,
    `${JSON.stringify(tokenObject, null, 2)}\n`,
  );
  fs.writeFileSync(COLOR_TS_PATH, buildColorModuleTs(tokenObject));
  fs.writeFileSync(
    GENERATED_CSS_PATH,
    buildCssVariables({ ...tokenObject, gradient: GRADIENT_TOKENS }),
  );
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
  GRADIENT_TOKENS,
  tokenName,
  runtimeColor,
  runtimeModule,
  rgbaToHex,
  extractColorTokensFromDisplayDoc,
  buildCssVariables,
  buildColorDiff,
  writeColorArtifacts,
  summarizeColorDiff,
};
