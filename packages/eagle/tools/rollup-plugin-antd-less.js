const fs = require("fs");
const path = require("path");

export default function antdLessPlugin() {
  return {
    name: "antd-less",
    async buildStart() {
      try {
        const { compileAntd4 } = require(
          path.resolve(__dirname, "tools/antd-theme"),
        );
        const light = JSON.parse(
          fs.readFileSync(
            path.resolve(__dirname, "src/styles/token/light.json"),
            "utf8",
          ),
        );
        const themes = {
          light,
          ...JSON.parse(
            fs.readFileSync(
              path.resolve(__dirname, "src/styles/themes.json"),
              "utf8",
            ),
          ),
        };
        const outputs = [];
        for (const [name, values] of Object.entries(themes)) {
          outputs.push(await compileAntd4(values, name, Object.keys(themes)));
        }
        fs.writeFileSync(
          path.resolve(__dirname, "src/styles/libs/antd.css"),
          outputs.join("\n"),
        );
      } catch (error) {
        this.error(`Error compiling Ant Design themes: ${error.message}`);
      }
    },
  };
}
