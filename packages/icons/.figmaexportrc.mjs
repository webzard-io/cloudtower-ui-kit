// @ts-check

import fs from "fs";
import path from "path";
import crypto from "crypto";

const DEFAULT_FILE_ID = "8fqRbp9K817NpssBGJxmcr";

const ICON_SVG_DIR = "src";
const ICON_MAP_NAME = "icon-map.json";

/** @type { {[figma_node_id: string]: { componentSetName: string; name: string; svgFileName: string; existingSvgFileName?: string; hash: string; lastUpdated: string; }} } */
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
 * & 等符号会留在文件名里，生成的 React 组件名不合法，例如 Backup-&Dr24ColorfulIcon。
 * 生成 React 组件名时的 camelcase 只把空格、-、_、. 当作单词分隔符。
 */
const UNSAFE_FILE_NAME_CHAR = /[&+#@!$%^*=~`|\\:;"'<>?[\]{}]/g;

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
    .replace(UNSAFE_FILE_NAME_CHAR, " ")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.\(\)\（\）,\s]/g, "-")
    .replace(/-+/g, "-") // 合并连续的 -
    .replace(/^-+|-+$/g, ""); // 去除开头和结尾的 -

  if (!clearedBasename) return "";

  // 检查字符串是否以数字开头，是则开头添加 'i' 并返回
  const finalBasename = /^\d/.test(clearedBasename)
    ? "i" + clearedBasename
    : clearedBasename;

  return finalBasename;
}

/**
 * @type {string[]}
 */
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
    .replace(UNSAFE_FILE_NAME_CHAR, "-")
    .replace(/[.\(\)\（\）,]/g, "-")
    .replace(/[\s]/g, "")
    .replace(/-+/g, "-") // 合并连续的 -
    .replace(/^-+|-+$/g, "") // 去除开头和结尾的 -
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

  if (!svgFileName) {
    svgFileName = transformBaseName(variantName || "").toLowerCase();
  }

  return { componentSetName: componentSet?.name || "", svgFileName };
}

/**
 * @param {string | undefined} fileName
 * @returns {boolean}
 */
function svgFileExists(fileName) {
  if (!fileName) return false;

  return fs.existsSync(path.resolve(ICON_SVG_DIR, fileName));
}

/**
 * icon-map 的 hash 只表示见过这份导出，不表示仓库里的 SVG 已经是这份内容。
 * 强制同步写入前用文件内容判断，避免把没变的图标写成只改 lastUpdated 的提交。
 * @param {string} fileName
 * @param {string} content
 * @returns {boolean}
 */
function svgFileContentEquals(fileName, content) {
  const filePath = path.resolve(ICON_SVG_DIR, fileName);
  if (!fs.existsSync(filePath)) return false;

  return fs.readFileSync(filePath, "utf8") === content;
}

/**
 * @param {string | undefined} value
 * @returns {string[]}
 */
function parseIdList(value) {
  if (!value) return [];

  return value
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

const figmaNodeIds = parseIdList(process.env.FIGMA_NODE_ID);
const forceSyncIds = parseIdList(process.env.FIGMA_FORCE_SYNC_IDS);
const needExportNodeIds = [...new Set([...figmaNodeIds, ...forceSyncIds])];

/**
 * 记录 icon 文件已经在仓库里且没有被强制同步的图标信息，用于记录到 PR 和 slack 中，以提醒需要手动处理。
 * @type {{ id: string; svgFileName: string; nextSvgFileName?: string; existingSvgFileName?: string; }[]}
 */
const needManualSyncIcons = [];

/**
 * @type {import('@figma-export/types').ComponentsCommandOptions}
 * */
const componentsConfig = {
  fileId: process.env.FIGMA_FILE_ID || DEFAULT_FILE_ID,
  onlyFromPages: ["Icons"],
  ids: needExportNodeIds.length ? needExportNodeIds : undefined,
  outputters: [
    async (pages) => {
      /** @type {Set<string>} */
      const forcedSyncIdsSet = new Set();

      pages.forEach((page) => {
        page.components.forEach((component) => {
          const { id, name, svg, figmaExport } = component;

          if (!id || !svg || !figmaExport.id) return;

          const svgHash = generateIconHash(svg);
          const needForceSync = forceSyncIds.includes(id);

          // 定时同步用 hash 跳过未变化的图标。强制同步不看 hash，因为 hash 可能在只刷新 icon-map 时已经更新，SVG 仍是旧的。
          if (!needForceSync && iconMap[id]?.hash === svgHash) {
            return;
          }

          let { componentSetName, svgFileName } = getSvgFileName(figmaExport);

          if (!svgFileName) return;

          svgFileName += ".svg";

          const previous = iconMap[id];
          const fileNameChanged = Boolean(
            previous && previous.svgFileName !== svgFileName,
          );

          // 定时同步遇到文件名变化时不自动改名，避免新旧图标同时存在。
          // 用户已经指定强制同步时，只更新现有文件内容，仍保留仓库里的文件名。
          if (fileNameChanged && !needForceSync) {
            console.log(
              `\n⚠️  The old icon ${previous?.svgFileName} has been renamed to ${svgFileName}. To avoid mixing old and new icons, please handle this icon manually.`,
            );

            needManualSyncIcons.push({
              id,
              svgFileName: previous?.svgFileName || svgFileName,
              nextSvgFileName: svgFileName,
              existingSvgFileName: previous?.existingSvgFileName,
            });
            return;
          }

          // 如果图标文件已在仓库里，则使用原来的文件名，只更新原来的 SVG 文件。
          const targetFileName =
            previous?.existingSvgFileName &&
            svgFileExists(previous.existingSvgFileName)
              ? previous.existingSvgFileName
              : fileNameChanged
                ? previous?.svgFileName || svgFileName
                : svgFileName;
          const iconAlreadyExists =
            svgFileExists(svgFileName) ||
            svgFileExists(previous?.svgFileName) ||
            svgFileExists(previous?.existingSvgFileName);

          // 图标文件已经在仓库里且不需要强制同步时，只刷新 icon-map，不覆盖 SVG。
          if (iconAlreadyExists && !needForceSync) {
            console.log(
              `\n⚠️  ${targetFileName} already exists. Skip SVG rewrite because Figma export is unstable. Refresh hash in icon-map.json only. Update the SVG manually if the design changed.`,
            );

            needManualSyncIcons.push({
              id,
              svgFileName: previous?.svgFileName || svgFileName,
              existingSvgFileName: previous?.existingSvgFileName,
            });

            iconMap[id] = {
              componentSetName,
              name,
              svgFileName: previous?.svgFileName || svgFileName,
              ...(previous?.existingSvgFileName
                ? { existingSvgFileName: previous.existingSvgFileName }
                : {}),
              hash: svgHash,
              lastUpdated: new Date().toISOString(),
            };
            return;
          }

          const targetUnchanged = svgFileContentEquals(targetFileName, svg);

          // 文件已经是本次导出的内容，并且 hash 也一致时，不改 icon-map 。
          if (needForceSync && targetUnchanged && previous?.hash === svgHash) {
            console.log(`\nℹ️  ${id} is already up to date.`);
            forcedSyncIdsSet.add(id);
            return;
          }

          if (!targetUnchanged) {
            fs.mkdirSync(ICON_SVG_DIR, { recursive: true });
            fs.writeFileSync(path.resolve(ICON_SVG_DIR, targetFileName), svg);
          }

          if (needForceSync) {
            console.log(
              targetUnchanged
                ? `\nℹ️  ${targetFileName} (${id}) already matches the Figma export. Refresh hash in icon-map.json only.`
                : fileNameChanged
                  ? `\n✅ Force update ${targetFileName} (${id}). Figma name changed to ${svgFileName}; keep the existing filename.`
                  : `\n✅ Force update ${targetFileName} (${id}).`,
            );
          }

          forcedSyncIdsSet.add(id);

          iconMap[id] = {
            componentSetName,
            name,
            svgFileName: fileNameChanged
              ? previous?.svgFileName || svgFileName
              : svgFileName,
            ...(previous?.existingSvgFileName
              ? { existingSvgFileName: previous.existingSvgFileName }
              : {}),
            hash: svgHash,
            lastUpdated: new Date().toISOString(),
          };
        });
      });

      const missingForceSyncIconIds = forceSyncIds.filter(
        (id) => !forcedSyncIdsSet.has(id),
      );
      if (missingForceSyncIconIds.length) {
        console.warn(
          `\n⚠️  These Figma ids were not exported: ${missingForceSyncIconIds.join(", ")}`,
        );
      }

      try {
        fs.writeFileSync(
          ICON_MAP_NAME,
          JSON.stringify(iconMap, null, 2) + "\n",
          "utf-8",
        );
      } catch (err) {
        console.error(`\n❌ Failed to update icom-map.json:`, err);

        throw err;
      }

      console.log("\nstyleKeys", styleKeys);

      if (process.env.SYNC_ICON_RESULT_PATH) {
        fs.writeFileSync(
          process.env.SYNC_ICON_RESULT_PATH,
          JSON.stringify({ needManualSyncIcons, missingForceSyncIconIds }, null, 2),
          "utf-8",
        );
      }
    },
  ],
  concurrency: 3,
  retries: 1,
};

export default {
  commands: [["components", componentsConfig]],
};
