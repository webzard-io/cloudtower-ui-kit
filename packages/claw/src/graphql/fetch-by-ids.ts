import { getConfig, setPluralize, upperFirst } from "../common";
import { PluginFunction } from "../types";
import { stringifyColumns } from "./document";

export const plugin: PluginFunction = (schema, documents, config) => {
  const { fetchByIds, pluralizes } = getConfig(config);
  const pluralize = setPluralize(pluralizes);
  let outPut = "";

  fetchByIds.forEach((r) => {
    const uf = upperFirst(r.type);
    const pl = pluralize(r.type);
    outPut += `query fetch${uf}ByIds($where: ${uf}WhereInput) {`;
    outPut += `${pl}(where: $where) {`;
    outPut += `
        ${stringifyColumns(r.fields, true)}
      }
    }
    `;
  });

  return outPut;
};
