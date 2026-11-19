import { execFileSync } from "node:child_process";
import { relative } from "node:path";
import { fileURLToPath } from "node:url";
import { colord, extend } from "colord";
import hwb from "colord/plugins/hwb";
import names from "colord/plugins/names";
import valueParser from "postcss-value-parser";
import stylelint from "stylelint";
import tokens from "../../src/styles/token/light.json" with { type: "json" };
import legacyColors from "./legacy-sass-colors.json" with { type: "json" };

extend([names, hwb]);

const ruleName = "eagle/equivalent-fixed-color";
const message = stylelint.utils.ruleMessages(ruleName, {
  fixed: (color, names) =>
    color +
    " has an equivalent Eagle token: " +
    names.join(", ") +
    ". Use a runtime CSS variable.",
}).fixed;

const sassVariable = /^\$[\w-]+$/;
const colorFunction =
  /^(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|device-cmyk)$/i;
const namedColorProperty =
  /(?:^[$]|^--|color|background|border|shadow|^outline|^fill$|^stroke$|^filter$|^column-rule|^text-decoration)/i;

function colorKey(value) {
  const hex = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.exec(value);
  if (hex) {
    // Colord rounds hex alpha while parsing, so decode it before comparison.
    let digits = hex[1];
    if (digits.length <= 4) digits = digits.replace(/./g, "$&$&");
    const [red, green, blue, alpha = 255] = digits
      .match(/../g)
      .map((byte) => parseInt(byte, 16));
    return [red, green, blue, alpha / 255].map(channelKey).join(",");
  }
  if (/^(?:transparent|currentcolor)$/i.test(value)) return;
  const srgb =
    /^color\(\s*srgb\s+([-\d.e+]+%?)\s+([-\d.e+]+%?)\s+([-\d.e+]+%?)(\s*\/\s*[-\d.e+]+%?)?\s*\)$/i.exec(
      value,
    );
  if (srgb) {
    const channels = srgb
      .slice(1, 4)
      .map((part) => (part.endsWith("%") ? part : Number(part) * 100 + "%"));
    value = "rgb(" + channels.join(" ") + (srgb[4] ?? "") + ")";
  }
  const color = colord(value);
  if (!color.isValid()) return;
  const { r, g, b, a } = color.rgba;
  return [r, g, b, a].map(channelKey).join(",");
}

function channelKey(channel) {
  return Math.round(channel * 1e12) / 1e12;
}

const tokenNamesByColor = new Map();
for (const [name, value] of Object.entries(tokens)) {
  const color = colorKey(value);
  if (!color) continue;
  const names = tokenNamesByColor.get(color) ?? [];
  names.push("--" + name);
  tokenNamesByColor.set(color, names);
}

function tokenMatches(value, allowNamed, resolveSass = () => undefined) {
  const matches = new Map();
  const parsed = valueParser(value.replace(/#\{([^{}]+)\}/g, "$1"));
  parsed.walk((node) => {
    if (node.type === "function" && node.value.toLowerCase() === "url") {
      return false;
    }
    const isColorFunction =
      node.type === "function" && colorFunction.test(node.value);
    const isWord =
      node.type === "word" &&
      (/^#/.test(node.value) || allowNamed || sassVariable.test(node.value));
    if (isColorFunction || isWord) {
      const source = valueParser.stringify(node);
      let fixedColor = sassVariable.test(source) ? resolveSass(source) : source;
      const sassRgba = /^rgba?\(\s*(\$[\w-]+)\s*,\s*([.\d]+%?)\s*\)$/i.exec(
        source,
      );
      if (sassRgba) {
        const base = colorKey(resolveSass(sassRgba[1]) ?? "");
        if (base) {
          const rgb = base.split(",").slice(0, 3);
          fixedColor = "rgba(" + [...rgb, sassRgba[2]].join(",") + ")";
        }
      }
      const names = tokenNamesByColor.get(colorKey(fixedColor ?? ""));
      if (names) matches.set(source, names);
      if (isColorFunction) return false;
    }
  });
  return matches;
}

function checkDeclarations(enabled) {
  return (root, result) => {
    if (!enabled) return;
    const variables = new WeakMap();
    root.walk((node) => {
      const declaration = node.type === "decl";
      if (
        !declaration &&
        !(node.type === "atrule" && node.name === "include")
      ) {
        return;
      }
      const resolveSass = (name) => {
        const variable = name.replaceAll("_", "-");
        for (let scope = node.parent; scope; scope = scope.parent) {
          const values = variables.get(scope);
          if (values?.has(variable)) return values.get(variable);
        }
        return Object.hasOwn(legacyColors, variable)
          ? legacyColors[variable]
          : undefined;
      };
      const value = declaration
        ? node.value.replace(/\s+!(?:default|global)\b/g, "")
        : node.params;
      for (const [color, names] of tokenMatches(
        value,
        declaration && namedColorProperty.test(node.prop),
        resolveSass,
      )) {
        stylelint.utils.report({
          message: message(color, names),
          node,
          start: node.source.start,
          end: node.source.end,
          result,
          ruleName,
        });
      }
      if (declaration && sassVariable.test(node.prop)) {
        const scope = node.parent;
        if (!variables.has(scope)) variables.set(scope, new Map());
        variables
          .get(scope)
          .set(
            node.prop.replaceAll("_", "-"),
            sassVariable.test(value) ? resolveSass(value) : value,
          );
      }
    });
  };
}

export default stylelint.createPlugin(ruleName, checkDeclarations);

export async function scanEquivalentColors(files) {
  const cwd = process.cwd();
  const styles = await stylelint.lint({
    cwd,
    files: files.map((file) => file.replace(/[\\*?[\]{}()!]/g, "\\$&")),
    config: {
      extends: [
        fileURLToPath(new URL("../../stylelint.config.cjs", import.meta.url)),
      ],
      plugins: [fileURLToPath(import.meta.url)],
      // Collect matches here. The full lint commands enforce source severity.
      defaultSeverity: "warning",
      rules: { [ruleName]: true },
      ignoreDisables: true,
    },
    formatter: "string",
  });
  if (styles.errored) throw new Error(styles.report);

  const diagnostics = styles.results.flatMap(({ source, warnings }) =>
    warnings
      .filter(({ rule }) => rule === ruleName)
      .map(({ line, endLine, text }) => ({
        file: relative(cwd, source),
        start: line,
        end: endLine ?? line,
        message: text,
      })),
  );

  const scripts = styles.results
    .filter(
      ({ source, ignored }) => !ignored && source && /\.tsx?$/.test(source),
    )
    .map(({ source }) => relative(cwd, source));
  if (scripts.length === 0) return diagnostics;

  const config = fileURLToPath(new URL("../../sgconfig.yml", import.meta.url));
  const output = execFileSync(
    "ast-grep",
    ["scan", "--config", config, "--warning", "--json=compact", "--", ...scripts],
    { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
  );
  for (const { text, range, file } of JSON.parse(output)) {
    for (const [color, names] of tokenMatches(text, true)) {
      diagnostics.push({
        file,
        start: range.start.line + 1,
        end: range.end.line + 1,
        message: message(color, names),
      });
    }
  }
  return diagnostics;
}
