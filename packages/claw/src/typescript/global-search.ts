import { PluginFunction } from "@graphql-codegen/plugin-helpers";

import { getConfig, setPluralize } from "../common";

export const plugin: PluginFunction = (schema, documents, config) => {
  const { globalSearch, pluralizes } = getConfig(config);
  const pluralize = setPluralize(pluralizes);

  let output = "import { SearchAllQuery } from './react-hooks';";
  output += "\n\n";

  output += "export type UnionDataMap = ";
  globalSearch.forEach((r, idx) => {
    output += "{";
    output += `type: '${r.type}';`;
    output += `data: NonNullable<SearchAllQuery["${pluralize(r.type)}"]>[0]`;
    output += "}";
    if (idx !== globalSearch.length - 1) {
      output += "|";
    }
  });
  output += "\n\n";

  const resources = globalSearch.map((r) => `'${r.type}'`).join(" | ");
  output += `export type Resources = ${resources}`;
  output += "\n\n";

  output += "export const singularMap: Record<string, Resources> = {";
  output += globalSearch
    .map((r) => `${pluralize(r.type)}: '${r.type}'`)
    .join(",");
  output += "}";
  output += "\n\n";

  output += "export const pluralizeMap: Record<Resources, string> = {";
  output += globalSearch
    .map((r) => `${r.type}: '${pluralize(r.type)}'`)
    .join(",");
  output += "}";

  return output;
};
