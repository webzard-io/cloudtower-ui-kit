import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { globby } from "globby";
import generateType from "./generateType.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const convert = async () => {
  const paths = await globby([
    path.resolve(__dirname, "../src/components/images/**/*.svg"),
    path.resolve(__dirname, "../src/components/images/**/*.png"),
    path.resolve(__dirname, "../src/components/images/**/*.jpg"),
    path.resolve(__dirname, "../src/components/images/**/*.jpeg"),
  ]);

  const values = paths.map((imagePath) => {
    const relativePath = path.relative(
      path.resolve(__dirname, "../src/components/images"),
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
      relativePath,
      exportName,
    };
  });

  try {
    const result = await ejs.renderFile(
      path.resolve(__dirname, "./templates/index.ejs"),
      { values }
    );

    fs.writeFileSync(
      path.resolve(__dirname, `../src/components/images/index.ts`),
      result
    );
  } catch (error) {}

  try {
    const folderPath = path.resolve(__dirname, "../src/components/images");
    let output = "export type ImagesType =";
    output += generateType(folderPath);
    fs.mkdirSync(path.resolve(__dirname, `../src/generated`), {
      recursive: true,
    });
    fs.writeFileSync(
      path.resolve(__dirname, `../src/generated/images-type.ts`),
      output
    );
  } catch (error) {
    console.log(error);
  }

  return;
};

Promise.resolve(convert());
