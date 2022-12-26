import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let locales = ["en-US", "zh-CN"];

const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );

Promise.allSettled(
  locales.map(async (locale) => {
    const relativePath = `../src/locales/${locale}`;
    const fileNames = fs.readdirSync(path.resolve(__dirname, relativePath));

    const names = fileNames
      .filter((name) => !name.includes(".ts"))
      .map((filename) => {
        const name = filename.replace(".json", "");
        const camelCase = snakeToCamel(name);
        return {
          originCase: name,
          camelCase: camelCase === "enum" ? "enumObj" : camelCase,
        };
      });

    try {
      const result = await ejs.renderFile(
        path.resolve(__dirname, "./templates/index.ejs"),
        { names }
      );

      fs.writeFileSync(
        path.resolve(__dirname, `${relativePath}/index.ts`),
        result
      );
      return;
    } catch (error) {}
  })
);
