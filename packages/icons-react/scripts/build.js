const fs = require("fs").promises;
const camelcase = require("camelcase");
const svgr = require("@svgr/core").default;
const babel = require("@babel/core");
const { dirname } = require("path");
const assert = require("node:assert/strict");
const { normalizeThemeColors } = require("./normalizeThemeColors");
const { verifyThemeIcons, verifyComponent, verifyExports } = require("./verifyThemeIcons");

const reactTransform = async (svg, componentName) => {
  const component = await svgr(
    svg,
    { titleProp: true, svgProps: { "data-testid": componentName } },
    { componentName },
  );
  const { code } = await babel.transformAsync(component, {
    plugins: [
      [require("@babel/plugin-transform-react-jsx"), { useBuiltIns: true }],
      [require("./transformId"), { componentName }],
    ],
  });

  return code;
};

function toCommonJS(code) {
  return code
    .replace('import * as React from "react"', 'const React = require("react")')
    .replace("export default", "module.exports =");
}

async function getIcons(style) {
  const directory = `../icons/${style}`;
  const files = (await fs.readdir(directory)).filter((file) => file.endsWith(".svg")).sort();
  return Promise.all(
    files.map(async (file) => {
      const svg = await fs.readFile(`${directory}/${file}`, "utf8");
      return {
        file,
        ...normalizeThemeColors(svg, file),
        componentName: `${camelcase(file.replace(/\.svg$/, ""), {
          pascalCase: true,
        })}Icon`,
      };
    }),
  );
}

function exportAll(icons, format, includeExtension = true) {
  return icons
    .map(({ componentName }) => {
      let extension = includeExtension ? ".js" : "";
      if (format === "esm") {
        return `export { default as ${componentName} } from './${componentName}${extension}'`;
      }
      return `module.exports.${componentName} = require("./${componentName}${extension}")`;
    })
    .join("\n");
}

async function ensureWrite(file, text) {
  await fs.mkdir(dirname(file), { recursive: true });
  await fs.writeFile(file, text + "\n", "utf8");
}

async function ensureWriteJson(file, json) {
  await ensureWrite(file, JSON.stringify(json, null, 2));
}

async function buildIconsSrc(outDir, icons) {
  const esm = exportAll(icons, "esm");
  const cjs = exportAll(icons, "cjs");
  verifyExports(esm, cjs, icons);

  await Promise.all(
    icons.map(async (icon) => {
      const { svg, componentName, file } = icon;
      const esm = await reactTransform(svg, componentName);
      const cjs = toCommonJS(esm);
      assert.equal(
        verifyComponent(icon, esm),
        verifyComponent(icon, cjs),
        `${file}: ESM and CJS themed paint counts differ`,
      );
      await Promise.all([
        ensureWrite(`${outDir}/esm/${componentName}.js`, esm),
        ensureWrite(`${outDir}/cjs/${componentName}.js`, cjs),
      ]);
    }),
  );

  await Promise.all([
    ensureWrite(`${outDir}/esm/index.js`, esm),
    ensureWrite(`${outDir}/cjs/index.js`, cjs),
  ]);
}

async function buildIconsType(outDir, icons) {
  await Promise.all(
    icons.flatMap(async ({ componentName }) => {
      let types = `import * as React from 'react';\ndeclare const ${componentName}: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;\nexport default ${componentName};\n`;

      return [ensureWrite(`${outDir}/${componentName}.d.ts`, types)];
    }),
  );

  await ensureWrite(`${outDir}/index.d.ts`, exportAll(icons, "esm", false));
}

async function main() {
  console.log("Building icons-react package...");

  const icons = await getIcons("dist");
  verifyThemeIcons(icons);
  await Promise.all([
    buildIconsSrc("./dist", icons),
    buildIconsType("./dist", icons),
  ]);

  let packageJson = JSON.parse(await fs.readFile("./package.json", "utf8"));

  await ensureWriteJson("./package.json", packageJson);

  return console.log("Finished building icons-react package.");
}

main();
