// @ts-check

import fs from "fs";
import path from "path";
import crypto from "crypto";

const DEFAULT_FILE_ID = "8fqRbp9K817NpssBGJxmcr";

const ICON_SVG_DIR = "src";
const ICON_MAP_NAME = "icon-map.json";

/** @type { {[figma_node_id: string]: { componentSetName: string; name: string; svgFileName: string; hash: string; lastUpdated: string; }} } */
let iconMap = {};
try {
  if (fs.existsSync(ICON_MAP_NAME)) {
    iconMap = JSON.parse(fs.readFileSync(ICON_MAP_NAME, "utf-8"));
  }
} catch (e) {
  console.warn("⚠️ Failed to read icom-map.json, will recreate.");
}

/**
 * @param {string} content
 * @returns {string}
 */
function generateIconHash(content) {
  return crypto.createHash("md5").update(content).digest("hex");
}

/**
 * @param {string} basename
 * @returns {string}
 */
function transformBaseName(basename) {
  if (!basename) return "";

  const splitedBasename = basename.includes("/")
    ? basename.split("/")[1]
    : basename;

  if (!splitedBasename) return "";

  const clearedBasename = splitedBasename
    .replace(/[*]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.\(\)\（\）\s]/g, "-");

  // 检查字符串是否以数字开头，是则开头添加 'i' 并返回
  const finalBasename = /^\d/.test(clearedBasename)
    ? "i" + clearedBasename
    : clearedBasename;

  return finalBasename;
}

const styleKeys = [];

/**
 * @param {string} str
 * @returns {Record<string, string | string[]>} keyValuePairs
 */
function stringToObject(str) {
  const keyValuePairs = str?.replace(/[\s]/g, "").toLowerCase().split(","); // 首先根据逗号和空格分割字符串

  /** @type {Record<string, string | string[]>}  */
  const resultObject = {};
  keyValuePairs.forEach((pair) => {
    if (pair.includes("=")) {
      const [key, value] = pair.split("=");

      if (key.startsWith("property")) {
        resultObject["properties"] = [
          ...(resultObject["properties"] || []),
          value,
        ];
      } else resultObject[key] = value;

      if (!styleKeys.includes(key)) styleKeys.push(key);
    }
  });

  if (JSON.stringify(resultObject) === "{}" && keyValuePairs.length) {
    resultObject["other"] = keyValuePairs.join("-");
  }

  return resultObject;
}

/**
 * @param {string} basename
 * @param {Record<string, string | string[]>} styles
 * @returns {string} svgFileName
 */
function generateSvgFileName(basename, styles) {
  const parts = [
    basename,
    // on or off
    styles.star,
    styles.status,
    styles.enabled,
    styles.smallcaps,
    // contents
    styles.type,
    styles.outline,
    styles.content,
    ...(styles.properties || []),
    // styles
    styles.size,
    styles.fill,
    styles.style,
    styles.weight,

    styles.other,
  ];

  const filteredParts = [...new Set(parts.filter((part) => part))];

  const fileName = filteredParts
    .join("-")
    .replace(/[.\(\)\（\）,]/g, "-")
    .replace(/[\s]/g, "")
    .toLowerCase();

  return fileName;
}

/**
 * @param {import('@figma-export/types').ComponentExtras} figmaExport
 * @returns {{ componentSetName: string; svgFileName: string }}
 */
function getSvgFileName(figmaExport) {
  const { pathToComponent, basename: variantName } = figmaExport;

  const componentSet = pathToComponent?.find(
    (item) => item.type === "COMPONENT_SET",
  );

  let svgFileName = "";

  if (componentSet) {
    const transformedBaseName = transformBaseName(componentSet.name);

    const styles = stringToObject(variantName);

    svgFileName = generateSvgFileName(transformedBaseName, styles);
  }

  if (!svgFileName) svgFileName = variantName;

  return { componentSetName: componentSet?.name || "", svgFileName };
}

/**
 * @type {import('@figma-export/types').ComponentsCommandOptions}
 * */
const componentsConfig = {
  fileId: process.env.FIGMA_FILE_ID || DEFAULT_FILE_ID,
  onlyFromPages: ["Icons"],
  ids: process.env.FIGMA_NODE_ID
    ? process.env.FIGMA_NODE_ID.split(",")
    : undefined,
  outputters: [
    async (pages) => {
      pages.forEach((page) => {
        page.components.forEach((component) => {
          const { id, name, svg, figmaExport } = component;

          if (!id || !svg || !figmaExport.id) return;

          const svgHash = generateIconHash(svg);

          if (iconMap[id]?.hash === svgHash) return;

          let { componentSetName, svgFileName } = getSvgFileName(figmaExport);

          if (!svgFileName) return;

          svgFileName += ".svg";

          if (fs.existsSync(path.resolve(ICON_SVG_DIR, svgFileName))) {
            console.log(
              `\n⚠️  There exists a file with the same name: ${componentSetName} + ${figmaExport.basename} -> ${svgFileName}`,
            );
          }

          if (iconMap[id] && iconMap[id].svgFileName !== svgFileName) {
            console.log(
              `\n⚠️  The old icon ${iconMap[id].svgFileName} has been renamed to ${svgFileName}. To avoid mixing old and new icons, please handle this icon manually.`,
            );
            return;
          }

          fs.mkdirSync(ICON_SVG_DIR, { recursive: true });
          fs.writeFileSync(path.resolve(ICON_SVG_DIR, svgFileName), svg);

          iconMap[id] = {
            componentSetName,
            name,
            svgFileName,
            hash: svgHash,
            lastUpdated: new Date().toISOString(),
          };
        });
      });

      try {
        fs.writeFileSync(
          ICON_MAP_NAME,
          JSON.stringify(iconMap, null, 2),
          "utf-8",
        );
      } catch (err) {
        console.error(`\n❌ Failed to update icom-map.json:`, err);

        throw err;
      }

      console.log("\nstyleKeys", styleKeys);
    },
  ],
  concurrency: 3,
  retries: 1,
};

export default {
  commands: [["components", componentsConfig]],
};
