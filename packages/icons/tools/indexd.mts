import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import globby from "globby";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keyWords = ["delete"];

const convert = async () => {
  const paths = await globby([
    path.resolve(__dirname, "../src/images/**/*.svg"),
  ]);

  const values = paths.map((imagePath) => {
    const relativePath = path.relative(
      path.resolve(__dirname, "../src"),
      imagePath
    );
    const exportName = relativePath
      .substring(
        relativePath.indexOf("/") + 1,
        relativePath.includes(".svg")
          ? relativePath.indexOf(".svg")
          : relativePath.indexOf(".png")
      )
      .split("-")
      .reduce((p, v, i) => {
        if (i === 0) {
          const parsed = parseFloat(v);
          if (isNaN(parsed)) {
            return v;
          }
          return "number" + v.charAt(0).toUpperCase() + v.slice(1);
        } else {
          return p + v.charAt(0).toUpperCase() + v.slice(1);
        }
      }, "");

    return {
      exportName: keyWords.includes(exportName)
        ? exportName + "Str"
        : exportName,
    };
  });

  try {
    const result = await ejs.renderFile(
      path.resolve(__dirname, "./templates/indexd.ejs"),
      { values }
    );

    fs.writeFileSync(path.resolve(__dirname, `../dist/index.d.ts`), result);
  } catch (error) {}

  return;
};

Promise.resolve(convert());
