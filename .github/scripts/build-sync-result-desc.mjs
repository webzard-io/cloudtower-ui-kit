import fs from "fs";

const description = process.env.DESCRIPTION || "Scheduled sync";
const syncIconResultPath =
  process.env.SYNC_ICON_RESULT_PATH || "/tmp/sync-icon-result.json";
const prBodyPath = process.env.PR_BODY_PATH || "/tmp/pr-body.md";
const slackDescriptionPath =
  process.env.SLACK_DESCRIPTION_PATH || "/tmp/slack-description.txt";

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

const prDescription = [
  needManualSyncIcons.length
    ? ["", needManualSyncIconsIntro, "", ...needManualSyncIconLines, ""].join(
        "\n",
      )
    : "",
  missingForceSyncIconIds.length
    ? [
        "",
        missingForceSyncIconIntro,
        "",
        ...missingForceSyncIconIdLines,
        "",
      ].join("\n")
    : "",
]
  .filter(Boolean)
  .join("\n");
const prBody = [
  "Sync Icons from figma",
  `- ${description}`,
  "- @netweng @chenenpei @tanbowensg PTAL",
  ...(prDescription.length ? [prDescription] : []),
].join("\n");

console.log("prBody", prBody);

// build slack description
const slackLines = needManualSyncIconLines.slice(0, 30);
const omitted = needManualSyncIconLines.length - slackLines.length;
const slackMissingLines = missingForceSyncIconIdLines.slice(0, 30);
const omittedMissing =
  missingForceSyncIconIdLines.length - slackMissingLines.length;
const slackDescription = [
  needManualSyncIcons.length
    ? [
        "",
        needManualSyncIconsIntro,
        ...slackLines,
        omitted > 0 ? `… 另有 ${omitted} 个，请查看 PR。` : "",
      ]
        .filter(Boolean)
        .join("\n")
    : "",
  missingForceSyncIconIds.length
    ? [
        "",
        missingForceSyncIconIntro,
        ...slackMissingLines,
        omittedMissing > 0 ? `… 另有 ${omittedMissing} 个，请查看 PR。` : "",
      ]
        .filter(Boolean)
        .join("\n")
    : "",
]
  .filter(Boolean)
  .join("\n");
  
console.log("slackDescription", slackDescription);

fs.writeFileSync(prBodyPath, prBody);
fs.writeFileSync(slackDescriptionPath, slackDescription);
