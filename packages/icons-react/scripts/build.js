const fs = require("fs").promises;
const camelcase = require("camelcase");
const svgr = require("@svgr/core").default;
const babel = require("@babel/core");
const { dirname } = require("path");

const reactTransform = async (svg, componentName, format) => {
  let component = await svgr(svg, { titleProp: true }, { componentName });
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

async function getIcons(style) {
  let files = await fs.readdir(`../icons/${style}`);
  return Promise.all(
    files.map(async (file) => ({
      svg: await fs.readFile(`../icons/${style}/${file}`, "utf8"),
      componentName: `${camelcase(file.replace(/\.svg$/, ""), {
        pascalCase: true,
      })}Icon`,
    })),
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

async function buildIconsSrc(style, format) {
  let outDir = `./${style}`;
  if (format === "esm") {
    outDir += "/esm";
  }
  if (format === "cjs") {
    outDir += "/cjs";
  }

  let icons = await getIcons(style);

  await Promise.all(
    icons.flatMap(async ({ componentName, svg }) => {
      let content = await reactTransform(svg, componentName, format);

      return [ensureWrite(`${outDir}/${componentName}.js`, content)];
    }),
  );

  await ensureWrite(`${outDir}/index.js`, exportAll(icons, format));
}

async function buildIconsType(style) {
  let outDir = `./${style}`;

  let icons = await getIcons(style);

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

  await Promise.all([
    buildIconsSrc("dist", "cjs"),
    buildIconsSrc("dist", "esm"),
    buildIconsType("dist"),
  ]);

  let packageJson = JSON.parse(await fs.readFile("./package.json", "utf8"));

  await ensureWriteJson("./package.json", packageJson);

  return console.log("Finished building icons-react package.");
}

main();
