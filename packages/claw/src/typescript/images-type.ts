import fs from "fs";
import path from "path";
import { PluginFunction } from "@graphql-codegen/plugin-helpers";

const generateType = (folderPath: string, pre?: string) => {
  let res = "";
  const dirNames = fs.readdirSync(folderPath);
  dirNames.forEach((name) => {
    const fileLstat = fs.lstatSync(path.join(folderPath, name));
    if (fileLstat.isDirectory()) {
      res += generateType(path.join(folderPath, name), `${name}/`);
    } else {
      const idx = name.indexOf(".");
      const realName = name.substring(0, idx);
      const format = name.substring(idx + 1);
      if (["jpg", "jpeg", "png", "svg"].includes(format)) {
        res += pre ? ` | "${pre}${realName}"` : ` | "${realName}"`;
      }
    }
  });
  return res;
};

export const plugin: PluginFunction = (schema, documents, config) => {
  const folderPath = path.resolve(process.cwd(), config.imagesPath);
  let output = "export type ImagesType =";
  output += generateType(folderPath);
  return output;
};
