const fs = require("fs").promises;
const camelcase = require("camelcase");
const svgr = require("@svgr/core").default;
const babel = require("@babel/core");
const { dirname } = require("path");

const reactTransform = async (svg, componentName, format) => {
  let component = await svgr(
    svg,
    { ref: true, titleProp: true },
    { componentName }
  );
  let { code } = await babel.transformAsync(component, {
    plugins: [
      [require("@babel/plugin-transform-react-jsx"), { useBuiltIns: true }],
      [require("./transformId"), { componentName }],
    ],
  });

  if (format === "esm") {
    return code;
  }

  return code
    .replace('import * as React from "react"', 'const React = require("react")')
    .replace("export default", "module.exports =");
};

async function getIcons() {
  let files = await fs.readdir("../icons/src/images");
  return Promise.all(
    files.map(async (file) => ({
      svg: await fs.readFile(`../icons/src/images/${file}`, "utf8"),
      componentName: `${camelcase(file.replace(/\.svg$/, ""), {
        pascalCase: true,
      })}Icon`,
    }))
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

async function buildIcons(format) {
  let outDir = "./dist";
  if (format === "esm") {
    outDir += "/esm";
  }

  let icons = await getIcons();

  await Promise.all(
    icons.flatMap(async ({ componentName, svg }) => {
      let content = await reactTransform(svg, componentName, format);
      let types = `import * as React from 'react';\ndeclare const ${componentName}: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & { title?: string, titleId?: string }>;\nexport default ${componentName};\n`;

      return [
        ensureWrite(`${outDir}/${componentName}.js`, content),
        ...(types
          ? [ensureWrite(`${outDir}/${componentName}.d.ts`, types)]
          : []),
      ];
    })
  );

  await ensureWrite(`${outDir}/index.js`, exportAll(icons, format));

  await ensureWrite(`${outDir}/index.d.ts`, exportAll(icons, "esm", false));
}

async function main() {
  console.log("Building icons-react package...");

  await Promise.all([buildIcons("cjs"), buildIcons("esm")]);

  let packageJson = JSON.parse(await fs.readFile("./package.json", "utf8"));

  await ensureWriteJson("./package.json", packageJson);

  return console.log("Finished building icons-react package.");
}

main();
