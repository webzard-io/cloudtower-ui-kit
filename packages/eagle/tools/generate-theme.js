const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const {
  tokenName,
  runtimeModule,
  buildCssVariables,
  writeColorArtifacts,
} = require("./utils/color-sync");
const root = path.resolve(__dirname, "..");

function themeCss(tokens, themes) {
  const declarations = (values) =>
    Object.entries(values)
      .map(([key, value]) => `  ${tokenName(key)}: ${value};`)
      .join("\n");
  let css = `:root, :root[data-theme="light"] {\n${declarations(tokens)}\n}\n`;
  for (const [name, values] of Object.entries(themes)) {
    if (!/^[a-z][a-z0-9-]*$/.test(name) || name === "light")
      throw new Error(`Invalid theme: ${name}`);
    const missing = Object.keys(tokens).filter((key) => !(key in values));
    const extra = Object.keys(values).filter((key) => !(key in tokens));
    if (missing.length || extra.length)
      throw new Error(
        `${name}: missing ${missing.join(", ")}; unknown ${extra.join(", ")}`,
      );
    css += `:root[data-theme="${name}"] {\n${declarations(values)}\n}\n`;
  }
  return css;
}

function generate() {
  const color = require("../src/styles/token/sync-baseline.json");
  const effects = require("../src/styles/effects.json");
  writeColorArtifacts(color);
  const tokens = {};
  postcss
    .parse(
      fs.readFileSync(path.join(root, "src/styles/token/color.css"), "utf8"),
    )
    .walkDecls((decl) => {
      tokens[decl.prop.slice(tokenName("").length)] = decl.value;
    });
  postcss.parse(buildCssVariables({ effect: effects })).walkDecls((decl) => {
    tokens[decl.prop.slice(tokenName("").length)] = decl.value;
  });
  const directory = path.join(root, "src/styles/token");
  fs.writeFileSync(
    path.join(directory, "effect.ts"),
    runtimeModule("Effect", effects, ["effect"]),
  );
  fs.writeFileSync(
    path.join(directory, "effect.scss"),
    buildCssVariables({ effect: effects }, true),
  );
  const { mapTheme } = require("./antd-theme");
  const themes = { light: tokens, ...require("../src/styles/themes.json") };
  fs.writeFileSync(
    path.join(directory, "antd.ts"),
    `export const antdTokens = ${JSON.stringify(Object.fromEntries(Object.entries(themes).map(([name, values]) => [name, mapTheme(values, "antd5", name)])), null, 2)} as const;\n`,
  );
  fs.writeFileSync(
    path.join(directory, "light.json"),
    JSON.stringify(tokens, null, 2) + "\n",
  );
  fs.writeFileSync(
    path.join(directory, "color.css"),
    themeCss(tokens, require("../src/styles/themes.json")),
  );
  const rows = [];
  function catalog(object, api, segments = []) {
    for (const [name, value] of Object.entries(object)) {
      const keys = [...segments, name];
      if (typeof value !== "string") {
        catalog(value, api, keys);
        continue;
      }
      const key = [...(api === "Effect" ? ["effect"] : []), ...keys].join("-");
      const access =
        api +
        keys
          .map((part) =>
            /^[a-zA-Z_$][\w$]*$/.test(part)
              ? `.${part}`
              : `[${JSON.stringify(part)}]`,
          )
          .join("");
      rows.push(
        `| \`${access}\` | \`$${key}\` | \`--${key}\` | \`${value}\` |`,
      );
    }
  }
  // Keep the historical gradient API in the unified catalog.
  const { GRADIENT_TOKENS } = require("./utils/color-sync");
  catalog({ ...color, gradient: GRADIENT_TOKENS }, "Color");
  catalog(effects, "Effect");
  fs.writeFileSync(
    path.join(root, "docs/theme-tokens.md"),
    "# Eagle 统一主题 token 清单\n\n由 `yarn generate:theme` 生成，不手工编辑。Color、内部 Sass 和 CSS 使用同一键名；变量名不带包名或版本号；由接入方既有作用域负责隔离。Sass 文件不对消费方发布。\n基础色板与语义色均来自设计系统。只做等值替换，并在等值 token 中按用途选择 text/link/fill/stroke/pagebackground/dim 或已有基础色板；无等值项时保留原值，记录给设计确认。\n\n| TypeScript API | 内部 Sass | CSS 自定义属性 | 默认浅色值 |\n| --- | --- | --- | --- |\n" +
      rows.join("\n") +
      "\n",
  );
}
if (require.main === module) generate();
module.exports = { themeCss, generate };
