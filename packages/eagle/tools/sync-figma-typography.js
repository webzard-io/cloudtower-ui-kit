const tokenSources = require("./figma-token-sources");
const { fetchNode } = require("./utils/figma-client");
const {
  extractTypographyMetaFromFile,
  buildTypographyDiff,
  mergeTypographyMeta,
  writeTypographyArtifacts,
  summarizeTypographyDiff,
} = require("./utils/typography-sync");

const mode = process.argv.includes("--check") ? "check" : "write";

const main = async () => {
  const source = tokenSources.typography.sourceOfTruth;
  console.error(
    `[sync:typography] 正在读取 Figma Typography 页面节点: ${source.fileKey}#${source.pageId}`,
  );
  const pageNode = await fetchNode(source.fileKey, source.pageId, source.depth);
  console.error("[sync:typography] 已获取 Typography 页面节点，开始解析");
  const nextMeta = extractTypographyMetaFromFile(pageNode, source);
  const diff = buildTypographyDiff(nextMeta);
  const summary = summarizeTypographyDiff(diff);

  console.log(JSON.stringify(summary, null, 2));

  const hasDrift =
    diff.added.length > 0 ||
    diff.changed.length > 0 ||
    diff.removedFromUpstream.length > 0;

  if (mode === "check") {
    if (hasDrift) {
      process.exitCode = 1;
    }
    return;
  }

  console.error("[sync:typography] 正在写入 Typo/index.ts");
  const mergedMeta = mergeTypographyMeta(nextMeta);
  writeTypographyArtifacts(mergedMeta);
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
