import fs from "fs";

const description = process.env.DESCRIPTION || "Scheduled sync";
const syncIconResultPath =
  process.env.SYNC_ICON_RESULT_PATH || "/tmp/sync-icon-result.json";
const prBodyPath = process.env.PR_BODY_PATH || "/tmp/pr-body.md";
const prDescriptionPath =
  process.env.PR_DESCRIPTION_PATH || "/tmp/sync-icon-pr-description.md";
const prDescriptionUrl = process.env.PR_DESCRIPTION_URL || "";
const slackDescriptionPath =
  process.env.SLACK_DESCRIPTION_PATH || "/tmp/slack-description.txt";

const PREVIEW_LIMIT = 10;

/** @type {{ id: string; svgFileName: string; nextSvgFileName?: string; existingSvgFileName?: string; }[]} */
let needManualSyncIcons = [];
/** @type {string[]} */
let missingForceSyncIconIds = [];

if (fs.existsSync(syncIconResultPath)) {
  const result = JSON.parse(fs.readFileSync(syncIconResultPath, "utf8"));
  needManualSyncIcons = result.needManualSyncIcons || [];
  missingForceSyncIconIds = result.missingForceSyncIconIds || [];
}

/**
 * @param {{ svgFileName: string; nextSvgFileName?: string; existingSvgFileName?: string; }} item
 * @returns {string}
 */
function formatFileLabel(item) {
  return item.existingSvgFileName &&
    item.existingSvgFileName !== item.svgFileName
    ? `${item.svgFileName}（仓库文件 ${item.existingSvgFileName}${item.nextSvgFileName ? ` ，最新文件名 ${item.nextSvgFileName}` : ""}）`
    : `${item.svgFileName}${item.nextSvgFileName ? `（最新文件名 ${item.nextSvgFileName}）` : ""}`;
}

const needManualSyncIconLines = needManualSyncIcons.map(
  (item) => `- \`${item.id}\` ${formatFileLabel(item)}`,
);
const missingForceSyncIconIdLines = missingForceSyncIconIds.map(
  (id) => `- \`${id}\``,
);

const needManualSyncIconsIntro = `以下 ${needManualSyncIcons.length} 个图标未同步，原因可能是文件名发生了变更或已存在该图标等。如需更新，请手动运行 Sync Icons workflow ，并在 figma_ids 中填写对应的 Figma 节点 id（取自 icon-map.json 的 key，多个 id 用英文逗号分隔）。`;
const missingForceSyncIconIntro = `以下 ${missingForceSyncIconIds.length} 个 Figma id 没完成强制同步，请检查 id 是否正确、仓库中对应的图标是否已是最新。`;

/**
 * @param {string} intro
 * @param {string[]} lines
 * @param {string} [trailingLine]
 * @returns {string}
 */
function buildSection(intro, lines, trailingLine = "") {
  const parts = ["", intro, "", ...lines];
  if (trailingLine) {
    parts.push(trailingLine);
  }
  parts.push("");
  return parts.join("\n");
}

/**
 * @param {number} omitted
 * @param {string} target
 * @returns {string}
 */
function omittedHint(omitted, target) {
  return omitted > 0 ? `… 另有 ${omitted} 个，请查看${target}。` : "";
}

const manualPreview = needManualSyncIconLines.slice(0, PREVIEW_LIMIT);
const manualOmitted = needManualSyncIconLines.length - manualPreview.length;
const missingPreview = missingForceSyncIconIdLines.slice(0, PREVIEW_LIMIT);
const missingOmitted =
  missingForceSyncIconIdLines.length - missingPreview.length;
const prLinkTarget = prDescriptionUrl
  ? `[链接内容](${prDescriptionUrl})`
  : "链接内容";

/**
 * @param {string} hintTarget
 * @returns {string}
 */
function buildPreviewDescription(hintTarget) {
  return [
    needManualSyncIcons.length
      ? buildSection(
          needManualSyncIconsIntro,
          manualPreview,
          omittedHint(manualOmitted, hintTarget),
        )
      : "",
    missingForceSyncIconIds.length
      ? buildSection(
          missingForceSyncIconIntro,
          missingPreview,
          omittedHint(missingOmitted, hintTarget),
        )
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

const prDescription = [
  needManualSyncIcons.length
    ? buildSection(needManualSyncIconsIntro, needManualSyncIconLines)
    : "",
  missingForceSyncIconIds.length
    ? buildSection(missingForceSyncIconIntro, missingForceSyncIconIdLines)
    : "",
]
  .filter(Boolean)
  .join("\n");
const prBodyDescription = buildPreviewDescription(prLinkTarget);
const prBody = [
  "Sync Icons from figma",
  `- ${description}`,
  "- @netweng @chenenpei @tanbowensg PTAL",
  ...(prBodyDescription.length ? [prBodyDescription] : []),
].join("\n");

console.log("prDescription", prDescription);

console.log("prBody", prBody);

const slackDescription = buildPreviewDescription(" PR");

console.log("slackDescription", slackDescription);

const hasOmitted = manualOmitted > 0 || missingOmitted > 0;
if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    `has_omitted=${hasOmitted ? "true" : "false"}\n`,
  );
}
if (hasOmitted) {
  fs.writeFileSync(prDescriptionPath, prDescription);
  console.log(
    `prDescription written to ${prDescriptionPath} (${prDescription.length} chars)`,
  );
} else if (fs.existsSync(prDescriptionPath)) {
  fs.unlinkSync(prDescriptionPath);
}

fs.writeFileSync(prBodyPath, prBody);
fs.writeFileSync(slackDescriptionPath, slackDescription);
