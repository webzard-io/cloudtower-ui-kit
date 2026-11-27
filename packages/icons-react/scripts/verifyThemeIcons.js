const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const babel = require("@babel/core");
const manifest = require("./theme-icon-manifest.json");

const tokenDir = path.resolve(__dirname, "../../eagle/src/styles/token");
const tokens = new Set(
  [...fs.readFileSync(path.join(tokenDir, "color.css"), "utf8")
    .matchAll(/^\s*(--[\w-]+):/gm)].map(([, token]) => token),
);
const aliases = new Map(
  [...fs.readFileSync(path.join(tokenDir, "icons.css"), "utf8")
    .matchAll(/^\s*(--[\w-]+): var\((--[\w-]+)\);/gm)]
    .map(([, alias, token]) => [alias, token]),
);

function verifyThemeIcons(icons) {
  const byFile = new Map(icons.map((icon) => [icon.file, icon]));
  for (const [file, [componentName, token]] of Object.entries(manifest)) {
    const icon = byFile.get(file);
    assert.equal(icon?.componentName, componentName, `${file}: missing committed component`);
    assert.equal(icon?.token, token, `${file}: expected ${token}`);
  }

  const warnings = icons.flatMap(({ warnings = [] }) => warnings);
  if (warnings.length) {
    console.warn(`Theme icon review (${warnings.length} paints):\n${warnings.map((warning) => JSON.stringify(warning)).join("\n")}`);
  }
}

function verifyComponent(icon, code) {
  if (!icon.token) return 0;

  let hits = 0;
  babel.traverse(babel.parseSync(code), {
    ObjectExpression({ node }) {
      const props = new Map(
        node.properties.filter(({ type }) => type === "ObjectProperty")
          .map(({ key, value }) => [key.name ?? key.value, value.value]),
      );
      for (const attribute of ["fill", "stroke"]) {
        const variable = props.get(attribute)?.match?.(/^var\((--[\w-]+),/)?.[1];
        if (!variable) continue;
        const token = aliases.get(variable) || variable;
        assert(tokens.has(token), `${icon.file}: unknown CSS variable ${variable}`);
        assert.equal(token, icon.token, `${icon.file}: unexpected paint token`);
        assert(!props.has(`${attribute}Opacity`), `${icon.file}: residual ${attribute}Opacity`);
        hits++;
      }
    },
  });
  assert(hits > 0, `${icon.file}: no themed paint emitted`);
  return hits;
}

function verifyExports(esm, cjs, icons) {
  const esmNames = [...esm.matchAll(/^export \{ default as (\w+) \}/gm)].map(([, name]) => name);
  const cjsNames = [...cjs.matchAll(/^module\.exports\.(\w+) =/gm)].map(([, name]) => name);
  assert.deepEqual(esmNames, cjsNames, "ESM and CJS exports differ");
  assert.deepEqual(esmNames, icons.map(({ componentName }) => componentName));
  assert.equal(new Set(esmNames).size, esmNames.length, "Duplicate icon component names");
}

module.exports = { verifyThemeIcons, verifyComponent, verifyExports };
