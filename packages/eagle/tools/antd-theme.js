const mapping = require("../src/styles/antd-theme-map.json");
const themes = require("../src/styles/antd-themes.json");
const { tokenName } = require("./utils/color-sync");

function resolveValue(values, name, seen = new Set()) {
  if (seen.has(name)) throw new Error(`Circular theme token: ${name}`);
  seen.add(name);
  const value = values[name];
  if (typeof value !== "string")
    throw new Error(`Missing theme token: ${name}`);
  const reference = /^var\((--[\w-]+)\)$/.exec(value);
  if (reference) {
    if (!reference[1].startsWith(tokenName("")))
      throw new Error(`Foreign theme token: ${value}`);
    return resolveValue(values, reference[1].slice(tokenName("").length), seen);
  }
  if (value.includes("var("))
    throw new Error(`Ant theme requires a literal value: ${name}`);
  return value;
}

function mapTheme(values, version, name = "light") {
  const native = themes[name]?.[version] ?? {};
  for (const [key, value] of Object.entries(native)) {
    if (typeof value === "string" && value.includes("var("))
      throw new Error(`Ant theme requires a literal value: ${name}.${key}`);
  }
  return {
    ...native,
    ...Object.fromEntries(
      mapping
        .filter((row) => row[version])
        .map((row) => [row[version], resolveValue(values, row.source)]),
    ),
  };
}

module.exports = { mapTheme, resolveValue };

async function compileAntd4(values, name, names) {
  const fs = require("fs");
  const path = require("path");
  const less = require("less");
  const { scopeTheme } = require("./scope-antd-theme");
  const entry = require.resolve("antd/dist/antd.less");
  let source = fs.readFileSync(entry, "utf8");
  if (name === "dark")
    source += `\n@import "${require.resolve("antd/lib/style/themes/dark.less")}";`;
  const result = await less.render(source, {
    javascriptEnabled: true,
    paths: [path.dirname(entry)],
    math: "always",
    modifyVars: {
      ...mapTheme(values, "antd4", name),
      "border-radius-base": "3px",
      "screen-xs": "1279px",
      "screen-sm": "1536px",
      "screen-md": "2176px",
      "screen-lg": "2304px",
    },
  });
  return scopeTheme(result.css, name, names);
}
module.exports.compileAntd4 = compileAntd4;
