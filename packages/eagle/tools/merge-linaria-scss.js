const rollupPluginutils = require("rollup-pluginutils");
const fs = require("fs");
const path = require("path");

function ensureParentDirsSync(dir) {
  if (fs.existsSync(dir)) {
    return;
  }
  try {
    fs.mkdirSync(dir);
  } catch (err) {
    if (err.code === "ENOENT") {
      ensureParentDirsSync(path.dirname(dir));
      ensureParentDirsSync(dir);
    }
  }
}

const mergeScss = (options) => {
  const filter = rollupPluginutils.createFilter(
    options.include || ["/**/*.css", "/**/*.scss", "/**/*.sass"],
    options.exclude,
  );
  const styles = {};
  return {
    name: "merge-linaria-scss",
    async transform(code, id) {
      if (!filter(id)) {
        return;
      }
      styles[id] = code;
      return "";
    },
    generateBundle() {
      const sortedStyles = Object.entries(styles).sort(([pathA], [pathB]) => {
        const isPathACore = pathA.includes("/core/");
        const isPathACoreX = pathA.includes("/coreX/");
        const isPathBCore = pathB.includes("/core/");
        const isPathBCoreX = pathB.includes("/coreX/");
        if (isPathACore && !isPathBCore) return -1;
        if (!isPathACore && isPathBCore) return 1;
        if (isPathACoreX && !isPathBCoreX) return 1;
        if (!isPathACoreX && isPathBCoreX) return -1;
        return 0;
      });
      const sortedCss = sortedStyles
        .map(([_, content]) => {
          return content;
        })
        .join("\n");
      ensureParentDirsSync(path.dirname(options.output));
      fs.writeFileSync(options.output, sortedCss);
    },
  };
};

export default mergeScss;
