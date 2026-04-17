const tokenSources = require("./figma-token-sources");
const { fetchNode } = require("./utils/figma-client");
const {
  extractColorTokensFromDisplayDoc,
  buildColorDiff,
  writeColorArtifacts,
  summarizeColorDiff,
} = require("./utils/color-sync");

const mode = process.argv.includes("--check") ? "check" : "write";

const main = async () => {
  const source = tokenSources.color.sourceOfTruth;
  console.error(`[sync:color] 正在读取 Figma 颜色展示节点: ${source.fileKey}#${source.pageId}`);
  const pageNode = await fetchNode(source.fileKey, source.pageId, source.depth);
  console.error("[sync:color] 已获取颜色展示节点，开始解析颜色 token");
  const nextColor = extractColorTokensFromDisplayDoc(pageNode);
  const diff = buildColorDiff(nextColor);
  const summary = summarizeColorDiff(diff);

  console.log(JSON.stringify(summary, null, 2));

  const hasDrift =
    diff.added.length > 0 || diff.changed.length > 0 || diff.removed.length > 0;

  if (mode === "check") {
    if (hasDrift) {
      process.exitCode = 1;
    }
    return;
  }

  console.error("[sync:color] 正在写入 color.ts / color.scss / color.css");
  writeColorArtifacts(nextColor);
};

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

module.exports = {
  main,
};
